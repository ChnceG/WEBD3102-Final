package com.chance.backend.controller;

import com.chance.backend.DTO.TransactionRequest;
import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Account;
import com.chance.backend.model.Category;
import com.chance.backend.model.Income;
import com.chance.backend.service.AccountService;
import com.chance.backend.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private AccountService accountService;

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @PostMapping
    public ResponseEntity<?> createIncome(@RequestBody TransactionRequest request, @RequestParam Long accountId) throws ParseException {

        Account account = accountService.getAccountById(accountId);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }

        Income income = new Income();
        income.setAmount(request.getAmount());
        income.setDescription(request.getDescription());
        income.setDate(formatter.parse(request.getDate()));
        income.setAccount(account);
        Category category = new Category();
        category.setCategoryId(request.getCategory().getCategoryId());
        category.setName(request.getCategory().getName());
        category.setDescription(request.getCategory().getDescription());
        category.setType(CategoryType.valueOf(request.getCategory().getType()));
        income.setCategory(category);

        Income savedIncome = incomeService.saveIncome(income);
        double newBalance = account.getBalance() + savedIncome.getAmount();
        account.setBalance(newBalance);
        accountService.updateAccount(account);

        return ResponseEntity.ok(savedIncome);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getIncomesForUser(@PathVariable Long userId) {
        List<Income> incomes = incomeService.getIncomesForUser(userId);
        if (incomes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No recent income");
        } else {
            return ResponseEntity.ok(incomes);
        }
    }
}
