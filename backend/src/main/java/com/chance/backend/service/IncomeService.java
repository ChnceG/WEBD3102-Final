package com.chance.backend.service;

import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Account;
import com.chance.backend.model.Category;
import com.chance.backend.model.Income;
import com.chance.backend.repository.AccountRepository;
import com.chance.backend.repository.CategoryRepository;
import com.chance.backend.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Income saveIncome(Income income) {
        return incomeRepository.save(income);
    }

    public Income addIncome(String name, double amount, long accountId, CategoryType categoryType, Date date) {

        Category category = findCategoryByType(categoryType);

        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isEmpty()) {
            throw new IllegalArgumentException("Account not found");
        }
        Account account = optionalAccount.get();

        Income income = new Income();
        income.setAmount(amount);
        income.setAccount(account);
        income.setDescription(name);
        income.setCategory(category);
        income.setDate(date);

        double currentBalance = account.getBalance();
        double newBalance = currentBalance + amount;
        account.setBalance(newBalance);

        incomeRepository.save(income);
        accountRepository.save(account);

        return income;
    }

    private Category findCategoryByType(CategoryType categoryType) {
        return categoryRepository.findByType(categoryType);
    }

    public List<Income> getIncomesForUser(Long userId) {
        return incomeRepository.findByAccountUserUserId(userId);
    }
}
