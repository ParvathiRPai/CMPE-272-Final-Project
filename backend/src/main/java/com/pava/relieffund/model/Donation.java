package com.pava.relieffund.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Builder
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "donation")
public class Donation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "paypal_id", nullable = false)
  private String paypalId;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private double amount;
}
