package com.codecool.men.dao;

import com.codecool.men.dtos.UserOperationsDTO;
import com.codecool.men.model.User;

import java.util.UUID;

public interface UserDAO {
  User getUserByName(String name);
  void deleteUser(int userId);
  void addUser(UserOperationsDTO userOperationsDTO);
}
