package com.befrank.pension_calculator.entity;

import jakarta.persistence.*;

@Entity
public class PensionAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private Long currentInvestmentValue; // investment in cents

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getCurrentInvestmentValue() {
        return currentInvestmentValue;
    }

    public void setCurrentInvestmentValue(Long currentInvestmentValue) {
        this.currentInvestmentValue = currentInvestmentValue;
    }
}
