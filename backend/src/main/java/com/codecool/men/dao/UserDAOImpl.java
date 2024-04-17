package com.codecool.men.dao;

import com.codecool.men.dtos.UserOperationsDTO;
import com.codecool.men.model.User;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Repository
public class UserDAOImpl implements UserDAO{
  private final Set<User> users;

  public UserDAOImpl() {
    this.users = new HashSet<>();
  }

  @Override
  public User getUserByName(String name) {
    return users.stream().filter(user -> user.getUsername().equals(name)).toList().getFirst();
  }

  @Override
  public void deleteUser(int userId) {
    User toBeDeleted = users.stream().filter(user -> user.getUserId() == userId).toList().getFirst();
    users.remove(toBeDeleted);
  }

  @Override
  public void addUser(UserOperationsDTO userOperationsDTO) {
    users.add(new User(userOperationsDTO.name(), userOperationsDTO.password()));
  }
}
