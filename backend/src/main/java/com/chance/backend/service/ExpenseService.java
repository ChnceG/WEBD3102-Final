package com.chance.backend.service;

import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Account;
import com.chance.backend.model.Category;
import com.chance.backend.model.Expense;
import com.chance.backend.repository.AccountRepository;
import com.chance.backend.repository.CategoryRepository;
import com.chance.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense addExpense(String name, double amount, long accountId, CategoryType categoryType, Date date) {

        Category category = findCategoryByType(categoryType);

        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isEmpty()) {
            throw new IllegalArgumentException("Account not found");
        }
        Account account = optionalAccount.get();

        Expense expense = new Expense();
        expense.setAmount(amount);
        expense.setAccount(account);
        expense.setDescription(name);
        expense.setCategory(category);
        expense.setDate(date);

        double currentBalance = account.getBalance();
        double newBalance = currentBalance - amount;
        account.setBalance(newBalance);

        expenseRepository.save(expense);
        accountRepository.save(account);

        return expense;
    }

    private Category findCategoryByType(CategoryType categoryType) {
        return categoryRepository.findByType(categoryType);
    }

    public List<Expense> getExpensesForUser(Long userId) {
        return expenseRepository.findByAccountUserUserId(userId);
    }
}
