package com.pava.relieffund.datastore;

import com.pava.relieffund.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<Donation, Long> {

}
