package com.chance.backend.repository;

import com.chance.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByAccountUserUserId(Long userId);
}
