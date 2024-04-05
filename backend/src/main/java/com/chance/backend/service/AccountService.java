package com.chance.backend.service;

import com.chance.backend.model.Account;
import com.chance.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account getAccountById(long accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }
}
