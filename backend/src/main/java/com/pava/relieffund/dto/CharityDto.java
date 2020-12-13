package com.pava.relieffund.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Getter
@Setter
@NoArgsConstructor
@ToString
public class CharityDto {

  private String cname;
  private String location;
  private String email;
  String description;
  MultipartFile file;
  boolean approved;
  String fileLink;
  Long id;

}
