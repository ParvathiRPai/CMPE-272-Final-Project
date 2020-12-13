package com.pava.relieffund.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@AllArgsConstructor
@ToString
@Builder
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "charity", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Charity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "charity_name")
  private String charityName;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String location;

  @Column(columnDefinition = "boolean default false", nullable = false)
  boolean approved;

  @Column(columnDefinition = "text", nullable = false)
  String description;

  @Column(nullable = false)
  private String fileLink;
  
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Charity charity = (Charity) o;
    return id.equals(charity.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
