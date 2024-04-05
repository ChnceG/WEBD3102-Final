package com.chance.backend.service;

import com.chance.backend.DTO.TransferRequest;
import com.chance.backend.model.Account;
import com.chance.backend.model.User;
import com.chance.backend.repository.AccountRepository;
import com.chance.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Username is already taken");
        }
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);

        Account chequing = new Account();
        chequing.setName("Chequing");
        chequing.setBalance(0.0);
        chequing.setUser(newUser);

        Account savings = new Account();
        savings.setName("Savings");
        savings.setBalance(0.0);
        savings.setUser(newUser);

        newUser.getAccounts().add(chequing);
        newUser.getAccounts().add(savings);

        return userRepository.save(newUser);
    }

    public boolean validateCredentials(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }

    private String hashPassword(String password) {
        // TODO: Hash the password
        return password;
    }

    private boolean verifyPassword(String inputPassword, String hashedPassword) {
        return inputPassword.equals(hashedPassword);
    }

    public List<Account> getUserAccounts(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getAccounts();
    }

    public Long getUserId(String username) {
        User user = userRepository.findByUsername(username);
        return user.getUserId();
    }

    public ResponseEntity<String> addTransfer(Long userId, Long sourceAccountId, Long destinationAccountId, double amount, String description) {
        Optional<Account> sourceAccountOptional = accountRepository.findById(sourceAccountId);
        Optional<Account> destinationAccountOptional = accountRepository.findById(destinationAccountId);

        if (sourceAccountOptional.isEmpty() || destinationAccountOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Source or destination account not found");
        }

        Account sourceAccount = sourceAccountOptional.get();
        Account destinationAccount = destinationAccountOptional.get();

        if (sourceAccount.getBalance() < amount) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance in the source account");
        }

        double sourceBalance = sourceAccount.getBalance() - amount;
        double destinationBalance = destinationAccount.getBalance() + amount;
        sourceAccount.setBalance(sourceBalance);
        destinationAccount.setBalance(destinationBalance);

        accountRepository.save(sourceAccount);
        accountRepository.save(destinationAccount);

        return ResponseEntity.status(HttpStatus.OK).body("Transfer completed successfully");
    }
}
