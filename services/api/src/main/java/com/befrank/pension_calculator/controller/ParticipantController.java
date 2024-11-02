package com.befrank.pension_calculator.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.befrank.pension_calculator.entity.Participant;
import com.befrank.pension_calculator.repository.ParticipantRepository;
import com.befrank.pension_calculator.service.PensionService;

@RestController
@RequestMapping("/participant")
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private PensionService pensionService;

    @GetMapping("/{email}")
    public ResponseEntity<Participant> getParticipant(@PathVariable String email) {
        Optional<Participant> participant = participantRepository.findByEmail(email);
        return participant.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{email}/calculate")
    public ResponseEntity<Long> calculatePension(@PathVariable String email, @RequestParam int retirementAge) {
        Optional<Participant> participant = participantRepository.findByEmail(email);
        if (participant.isPresent()) {
            long projectedValue = pensionService.calculateProjectedPensionValue(participant.get(), retirementAge);
            return ResponseEntity.ok(projectedValue);
        }
        return ResponseEntity.notFound().build();
    }

}
