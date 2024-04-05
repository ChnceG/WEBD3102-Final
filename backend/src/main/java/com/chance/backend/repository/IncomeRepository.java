package com.chance.backend.repository;

import com.chance.backend.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByAccountUserUserId(Long userId);
}
