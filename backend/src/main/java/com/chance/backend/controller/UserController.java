package com.chance.backend.controller;

import com.chance.backend.DTO.AuthRequest;
import com.chance.backend.DTO.TransferRequest;
import com.chance.backend.model.Account;
import com.chance.backend.repository.AccountRepository;
import com.chance.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AuthRequest authRequest) {
        try {
            String username = authRequest.getUsername();
            String password = authRequest.getPassword();
            userService.registerUser(username, password);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Long> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            String username = authRequest.getUsername();
            String password = authRequest.getPassword();

            boolean isValid = userService.validateCredentials(username, password);

            if (isValid) {
                Long userId = userService.getUserId(username);
                return ResponseEntity.ok(userId);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<List<Account>> getUserAccounts(@PathVariable Long userId) {
        List<Account> userAccounts = userService.getUserAccounts(userId);
        return ResponseEntity.ok(userAccounts);
    }

    @PostMapping("/{userId}/transfers")
    public ResponseEntity<String> addTransfer(@PathVariable Long userId, @RequestBody TransferRequest transferRequest) {
        try {
            Long sourceAccountId = transferRequest.getSourceAccountId();
            Long destinationAccountId = transferRequest.getDestinationAccountId();
            double amount = transferRequest.getAmount();
            String description = transferRequest.getDescription();

            userService.addTransfer(userId, sourceAccountId, destinationAccountId, amount, description);

            return ResponseEntity.status(HttpStatus.CREATED).body("Transfer added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid transfer request");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding transfer");
        }
    }
}
