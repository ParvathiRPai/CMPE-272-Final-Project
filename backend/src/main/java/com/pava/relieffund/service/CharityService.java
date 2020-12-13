package com.pava.relieffund.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.pava.relieffund.datastore.CharityRepository;
import com.pava.relieffund.datastore.DonationRepository;
import com.pava.relieffund.dto.CharityDto;
import com.pava.relieffund.dto.DonationDto;
import com.pava.relieffund.model.Charity;
import com.pava.relieffund.model.Donation;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

@Slf4j
@Service
public class CharityService {

  private final CharityRepository charityRepository;
  private final DonationRepository donationRepository;

  public CharityService(CharityRepository charityRepository,
      DonationRepository donationRepository) {
    this.charityRepository = charityRepository;
    this.donationRepository = donationRepository;
  }

  private CharityDto convert(Charity charity) {
    return CharityDto.builder()
        .id(charity.getId())
        .approved(charity.isApproved())
        .cname(charity.getCharityName())
        .description(charity.getDescription())
        .email(charity.getEmail())
        .fileLink(charity.getFileLink())
        .location(charity.getLocation())
        .build();
  }


  private DonationDto convert(Donation donation) {
    return DonationDto.builder()
        .amount(donation.getAmount())
        .email(donation.getEmail())
        .id(donation.getId())
        .paypalId(donation.getPaypalId())
        .build();
  }

  public CharityDto registerCharity(CharityDto dto) {

    log.info("Register Req " + dto.toString());
    String key = (dto.getCname() + "_" + dto.getEmail() + "_" + dto.getFile()
        .getOriginalFilename()).replaceAll("\\s+", "_");
    ;

    Charity charity = Charity.builder()
        .charityName(dto.getCname())
        .approved(false)
        .description(dto.getDescription())
        .email(dto.getEmail())
        .location(dto.getLocation())
        .fileLink(AWSService.cloudFrontUrl + "/" + key)
        .build();

    boolean uploadSuccess = AWSService.uploadFile(key, dto.getFile());

    if (uploadSuccess) {
      Charity registeredCharity = charityRepository.save(charity);
      log.info("Saved " + registeredCharity);
      CharityDto saved = convert(charity);
      AWSService.pubMessageToAdmin(saved);
      return saved;
    } else {
      throw HttpServerErrorException.InternalServerError.create(HttpStatus.INTERNAL_SERVER_ERROR,
          "Cannot Upload",
          HttpHeaders.EMPTY,
          null,
          null);
    }
  }

  public List<CharityDto> getAllCharities() {
    return charityRepository.findAll().stream().map(this::convert).collect(Collectors.toList());
  }

  public List<CharityDto> getApprovedCharities() {
    return charityRepository.findAll().stream().filter(Charity::isApproved).map(this::convert)
        .collect(Collectors.toList());
  }

  public boolean approveCharity(long id) {
    Optional<Charity> charityOptional = charityRepository.findById(id);

    if (charityOptional.isPresent()) {
      Charity charity = charityOptional.get();
      charity.setApproved(true);
      charityRepository.save(charity);
    }

    return true;
  }

  public List<DonationDto> getDonations() {
    return donationRepository.findAll().stream().map(this::convert).collect(Collectors.toList());
  }

  public boolean addDonation(String paypal) {

    log.info(paypal);

    JsonObject convertedObject = new Gson().fromJson(paypal, JsonObject.class);

    Donation donation = Donation.builder()
        .paypalId(convertedObject.get("id").getAsString())
        .amount(convertedObject.get("purchase_units").getAsJsonArray().get(0).getAsJsonObject()
            .get("amount").getAsJsonObject().get("value").getAsDouble())
        .email(convertedObject.get("payer").getAsJsonObject().get("email_address").getAsString())
        .build();

    log.info("Saving donation" + donation.toString());
    Donation donationSaved = donationRepository.save(donation);
    log.info("Saved Donation " + donationSaved);

    return true;
  }
}
