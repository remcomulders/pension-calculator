package com.befrank.pension_calculator.service;

import com.befrank.pension_calculator.entity.Participant;
import com.befrank.pension_calculator.entity.PensionAccount;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PensionServiceTest {

    private PensionService pensionService;
    private Participant employedParticipant;
    private Participant unemployedParticipant;

    @BeforeEach
    void setUp() {
        pensionService = new PensionService();

        PensionAccount pensionAccount = new PensionAccount();
        pensionAccount.setCurrentInvestmentValue(10000000L); // 100,000.00 in cents

        // Employed participant
        employedParticipant = new Participant();
        employedParticipant.setFullTimeSalary(6000000L); // 60,000.00 in cents
        employedParticipant.setPartTimePercentage(0.8);
        employedParticipant.setEmployed(true);
        employedParticipant.setBirthDate(LocalDate.of(1964, 5, 10));
        employedParticipant.setPensionAccount(pensionAccount);

        // Unemployed participant
        unemployedParticipant = new Participant();
        unemployedParticipant.setFullTimeSalary(6000000L);
        unemployedParticipant.setPartTimePercentage(0.8);
        unemployedParticipant.setEmployed(false); // Not employed
        unemployedParticipant.setBirthDate(LocalDate.of(1964, 5, 10));
        unemployedParticipant.setPensionAccount(pensionAccount);
    }

    @Test
    void calculateAnnualContribution_ShouldReturnCorrectContribution_WhenEmployed() {
        long expectedContribution = Math.round((6000000L - 1559900L) * 0.8 * 0.05);
        long actualContribution = pensionService.calculateAnnualContribution(employedParticipant);

        assertEquals(expectedContribution, actualContribution);
    }

    @Test
    void calculateAnnualContribution_ShouldReturnZero_WhenUnemployed() {
        long actualContribution = pensionService.calculateAnnualContribution(unemployedParticipant);

        assertEquals(0L, actualContribution);
    }

    @Test
    void calculateProjectedPensionValue_ShouldReturnCorrectProjectedValue_OneYearToRetirement() {
        // Retirement age 61, current age 60 (1 year to retirement)
        long expectedValue = 10480268L;
        long actualValue = pensionService.calculateProjectedPensionValue(employedParticipant, 61);

        assertEquals(expectedValue, actualValue);
    }

    @Test
    void calculateProjectedPensionValue_ShouldReturnCorrectProjectedValue_FiveYearsToRetirement() {
        // Retirement age 65, current age 60 (5 years to retirement)
        long expectedValue = 12549808L;
        long actualValue = pensionService.calculateProjectedPensionValue(employedParticipant, 65);

        assertEquals(expectedValue, actualValue);
    }
}
