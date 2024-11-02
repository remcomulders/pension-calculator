package com.befrank.pension_calculator.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Long fullTimeSalary; // salary in cents
    private Double partTimePercentage;
    private boolean isEmployed;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pension_account_id", referencedColumnName = "id")
    private PensionAccount pensionAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getFullTimeSalary() {
        return fullTimeSalary;
    }

    public void setFullTimeSalary(Long fullTimeSalary) {
        this.fullTimeSalary = fullTimeSalary;
    }

    public Double getPartTimePercentage() {
        return partTimePercentage;
    }

    public void setPartTimePercentage(Double partTimePercentage) {
        this.partTimePercentage = partTimePercentage;
    }

    public boolean isEmployed() {
        return isEmployed;
    }

    public void setEmployed(boolean isEmployed) {
        this.isEmployed = isEmployed;
    }

    public PensionAccount getPensionAccount() {
        return pensionAccount;
    }

    public void setPensionAccount(PensionAccount pensionAccount) {
        this.pensionAccount = pensionAccount;
    }
}
