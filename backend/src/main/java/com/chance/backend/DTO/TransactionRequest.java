package com.chance.backend.DTO;


public class TransactionRequest {
    private int amount;
    private String description;
    private String date;
    private AccountDTO account;
    private CategoryDTO category;

    public int getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public AccountDTO getAccount() {
        return account;
    }

    public CategoryDTO getCategory() {
        return category;
    }
}

