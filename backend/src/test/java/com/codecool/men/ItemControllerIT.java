package com.codecool.men;

import com.codecool.men.controller.dto.shoppinglist.NewItemDTO;
import com.codecool.men.repository.ShoppingListRepository;
import com.codecool.men.repository.UserRepository;
import com.codecool.men.repository.model.ShoppingListItem;
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
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ItemControllerIT {

    // /api/shopping/{userId}
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @BeforeEach
    public void setUp() {
        shoppingListRepository.deleteAll();
        userRepository.deleteAll();


        // Create a user for the test
        UserEntity user = new UserEntity();
        user.setUsername("user");
        user.setPassword("password"); // Ensure the password matches your security configuration
        userRepository.save(user);
    }

    @Test
    @WithMockUser(username = "user", roles = {"PREMIUM"})
    public void addItem() throws Exception {

        UserEntity user = userRepository.findByUsername("user").orElseThrow();
        NewItemDTO newItemDTO = new NewItemDTO("item");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/shopping/" + user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newItemDTO)))
                .andExpect(status().isOk());

        List<ShoppingListItem> shoppingListItems = shoppingListRepository.findByUserEntityId(user.getId());
        assert (shoppingListItems.size() == 1);
    }




}
