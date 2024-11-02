package com.befrank.pension_calculator.controller;

import com.befrank.pension_calculator.entity.Participant;
import com.befrank.pension_calculator.entity.PensionAccount;
import com.befrank.pension_calculator.repository.ParticipantRepository;
import com.befrank.pension_calculator.service.PensionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class ParticipantControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ParticipantRepository participantRepository;

    private ParticipantController participantController;

    private Participant participant;

    private static class StubbedPensionService extends PensionService {
        @Override
        public long calculateProjectedPensionValue(Participant participant, int retirementAge) {
            return 12549808L; // Return a stubbed value
        }
    }

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);

        // Initialize the controller and stubbed service
        participantController = new ParticipantController();
        PensionService pensionService = new StubbedPensionService();

        // Use reflection to inject dependencies
        Field participantRepoField = ParticipantController.class.getDeclaredField("participantRepository");
        participantRepoField.setAccessible(true);
        participantRepoField.set(participantController, participantRepository);

        Field pensionServiceField = ParticipantController.class.getDeclaredField("pensionService");
        pensionServiceField.setAccessible(true);
        pensionServiceField.set(participantController, pensionService);

        // Initialize MockMvc
        mockMvc = MockMvcBuilders.standaloneSetup(participantController).build();

        // Set up a mock PensionAccount
        PensionAccount pensionAccount = new PensionAccount();
        pensionAccount.setAccountNumber("ACC123456");
        pensionAccount.setCurrentInvestmentValue(10000000L); // 100,000.00 in cents

        // Set up a mock Participant with the PensionAccount
        participant = new Participant();
        participant.setName("John Doe");
        participant.setEmail("johndoe@befrank.nl");
        participant.setBirthDate(LocalDate.of(1964, 5, 10));
        participant.setFullTimeSalary(6000000L); // 60,000.00 in cents
        participant.setPartTimePercentage(0.8);
        participant.setEmployed(true);
        participant.setPensionAccount(pensionAccount);
    }

    @Test
    void testGetParticipant_ShouldReturnParticipant_WhenExists() throws Exception {
        when(participantRepository.findByEmail("johndoe@befrank.nl")).thenReturn(Optional.of(participant));

        mockMvc.perform(get("/participant/johndoe@befrank.nl")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("johndoe@befrank.nl"))
                .andExpect(jsonPath("$.birthDate").value("1964-05-10"))
                .andExpect(jsonPath("$.fullTimeSalary").value(6000000))
                .andExpect(jsonPath("$.partTimePercentage").value(0.8))
                .andExpect(jsonPath("$.employed").value(true))
                .andExpect(jsonPath("$.pensionAccount.accountNumber").value("ACC123456"))
                .andExpect(jsonPath("$.pensionAccount.currentInvestmentValue").value(10000000));
    }

    @Test
    void testGetParticipant_ShouldReturnNotFound_WhenNotExists() throws Exception {
        when(participantRepository.findByEmail("nonexistent@befrank.nl")).thenReturn(Optional.empty());

        mockMvc.perform(get("/participant/nonexistent@befrank.nl")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCalculatePension_ShouldReturnProjectedValue_WhenParticipantExists() throws Exception {
        when(participantRepository.findByEmail("johndoe@befrank.nl")).thenReturn(Optional.of(participant));

        mockMvc.perform(post("/participant/johndoe@befrank.nl/calculate")
                .param("retirementAge", "65")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("12549808"));
    }

    @Test
    void testCalculatePension_ShouldReturnNotFound_WhenParticipantDoesNotExist() throws Exception {
        when(participantRepository.findByEmail("nonexistent@befrank.nl")).thenReturn(Optional.empty());

        mockMvc.perform(post("/participant/nonexistent@befrank.nl/calculate")
                .param("retirementAge", "65")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
