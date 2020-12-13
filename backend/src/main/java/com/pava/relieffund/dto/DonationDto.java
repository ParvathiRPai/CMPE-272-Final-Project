package com.pava.relieffund.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Getter
@Setter
@NoArgsConstructor
@ToString
public class DonationDto {

  private Long id;
  private String paypalId;
  private String email;
  private double amount;
}
