package com.chance.backend.controller;

import com.chance.backend.DTO.TransactionRequest;
import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Account;
import com.chance.backend.model.Category;
import com.chance.backend.model.Expense;
import com.chance.backend.service.AccountService;
import com.chance.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private AccountService accountService;

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @PostMapping
    public ResponseEntity<?> createIncome(@RequestBody TransactionRequest request, @RequestParam Long accountId) throws ParseException {

        Account account = accountService.getAccountById(accountId);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }

        Expense expense = new Expense();
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(formatter.parse(request.getDate()));
        expense.setAccount(account);
        Category category = new Category();
        category.setCategoryId(request.getCategory().getCategoryId());
        category.setName(request.getCategory().getName());
        category.setDescription(request.getCategory().getDescription());
        category.setType(CategoryType.valueOf(request.getCategory().getType()));
        expense.setCategory(category);

        Expense savedExpense = expenseService.saveExpense(expense);
        double newBalance = account.getBalance() - savedExpense.getAmount();
        account.setBalance(newBalance);
        accountService.updateAccount(account);

        return ResponseEntity.ok(savedExpense);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getExpensesForUser(@PathVariable Long userId) {
        List<Expense> expenses = expenseService.getExpensesForUser(userId);
        if (expenses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No recent expenses");
        } else {
            return ResponseEntity.ok(expenses);
        }
    }
}
