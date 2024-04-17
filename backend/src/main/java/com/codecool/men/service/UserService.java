package com.codecool.men.service;

import com.codecool.men.dao.UserDAO;
import com.codecool.men.dtos.UserIDDTO;
import com.codecool.men.dtos.UserOperationsDTO;
import com.codecool.men.model.User;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
  private final UserDAO userDAO;

  public UserService(UserDAO userDAO) {
    this.userDAO = userDAO;
  }

  public UserIDDTO loginUser(UserOperationsDTO userOperationsDTO) {
     // Optional<User> user = Optional.ofNullable(userDAO.getUserByName(userOperationsDTO.name()));
//      boolean userNameCheck = false;
//      boolean passwordCheck = false;
//      if(user.isEmpty()){
//        return new UserIDDTO(null, true, false);
//      }
//      if(Objects.equals(user.get().getPassword(), userOperationsDTO.password())){
//        passwordCheck = true;
//      }
//      return new UserIDDTO(user.get().getUserId(), passwordCheck, userNameCheck);
      User user = userDAO.getUserByName(userOperationsDTO.name());
      if (user != null){
          if (Objects.equals(user.getPassword(), userOperationsDTO.password())){
              return new UserIDDTO(user.getUserId());
          }
      }
      return null;

  }

  public User editUser(User user) {
    throw new RuntimeException();
  }

  public void deleteUser(int userId) {
    userDAO.deleteUser(userId);
  }

  public void addUser(UserOperationsDTO newUser) {
    userDAO.addUser(newUser);
  }

}
