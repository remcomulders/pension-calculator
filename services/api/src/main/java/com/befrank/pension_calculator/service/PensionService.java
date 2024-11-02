package com.befrank.pension_calculator.service;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.stereotype.Service;

import com.befrank.pension_calculator.entity.Participant;

@Service
public class PensionService {

    private static final long FRANCHISE = 1559900L;
    private static final double PREMIUM_PERCENTAGE = 0.05;
    private static final double INVESTMENT_RETURN_RATE = 0.03;

    public long calculateAnnualContribution(Participant participant) {
        if (!participant.isEmployed()) {
            return 0L;
        }
        long adjustedSalaryInCents = participant.getFullTimeSalary() - FRANCHISE;
        long contributionInCents = Math
                .round(adjustedSalaryInCents * participant.getPartTimePercentage() * PREMIUM_PERCENTAGE);
        return contributionInCents;
    }

    public long calculateProjectedPensionValue(Participant participant, int retirementAge) {
        long currentInvestmentValue = participant.getPensionAccount().getCurrentInvestmentValue();
        long annualContribution = calculateAnnualContribution(participant);

        int currentAge = Period.between(participant.getBirthDate(), LocalDate.now()).getYears();
        int yearsUntilRetirement = retirementAge - currentAge;

        long projectedValue = currentInvestmentValue;
        for (int i = 0; i < yearsUntilRetirement; i++) {
            projectedValue += annualContribution;
            long returnOnInvestment = Math
                    .round((projectedValue - (annualContribution / 2.0)) * INVESTMENT_RETURN_RATE);
            projectedValue += returnOnInvestment;
        }

        return projectedValue;
    }

}
