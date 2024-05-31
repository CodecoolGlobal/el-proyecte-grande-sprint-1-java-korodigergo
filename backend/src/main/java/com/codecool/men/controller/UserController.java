package com.codecool.men.controller;

import com.codecool.men.controller.dto.user.NewUserDTO;
import com.codecool.men.controller.dto.user.UserNameDTO;
import com.codecool.men.controller.dto.user.UserPasswordDTO;
import com.codecool.men.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody NewUserDTO newUserDTO) {
        return userService.loginUser(newUserDTO);
  }
//web security config fájl átírása, login, register endpointok permitAll a többi user role
  @PatchMapping("/edit/username/{userId}")
  public UserNameDTO editUsername(@RequestBody UserNameDTO username, @PathVariable int userId) {
    return userService.editUsername(username, userId);
  }

  @PatchMapping("/edit/password/{userId}")
  public boolean editUserPassword(@RequestBody UserPasswordDTO password, @PathVariable long userId) {
    return userService.editUserPassword(password, userId);
  }

  @PatchMapping("/subscribe/{userId}")
  public boolean addPremiumToUser(@PathVariable long userId){
    return userService.addPremiumToUser(userId);
  }


  @DeleteMapping("/delete/{userId}")
  public boolean delete(@PathVariable long userId) {
    return userService.deleteUser(userId);
  }

  @PostMapping("/register")
  public boolean registerUser(@RequestBody NewUserDTO newUser) {
    return userService.addUser(newUser);
  }
}
