package com.codecool.men;

import com.codecool.men.controller.dto.note.NewNoteDTO;
import com.codecool.men.repository.NoteRepository;
import com.codecool.men.repository.UserRepository;
import com.codecool.men.repository.model.Note;
import com.codecool.men.repository.model.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class NoteControllerIT {
    //add note endpoint

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        noteRepository.deleteAll();
        userRepository.deleteAll();


        // Create a user for the test
        UserEntity user = new UserEntity();
        user.setUsername("user");
        user.setPassword("password"); // Ensure the password matches your security configuration
        userRepository.save(user);
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void addNote() throws Exception {

        UserEntity user = userRepository.findByUsername("user").orElseThrow();

        NewNoteDTO newNoteDTO = new NewNoteDTO("Test Title", "Test Text", user.getId(), LocalDate.now());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/note/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newNoteDTO)))
                .andExpect(status().isOk());

        // Check that the note was added to the repository
        List<Note> savedNote = noteRepository.findByUserEntityId(user.getId());
        assert (savedNote.size() == 1);
    }


}
