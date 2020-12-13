package com.pava.relieffund.datastore;

import com.pava.relieffund.model.Charity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharityRepository extends JpaRepository<Charity, Long> {

}
