package com.codecool.men.model;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class User {
  private final int userId;
  private static final AtomicInteger count = new AtomicInteger(0);
  private String username;
  private String password;

  public User(String username, String password) {
    this.userId = count.incrementAndGet();
    this.username = username;
    this.password = password;
  }

  public int getUserId() {
    return userId;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }
}
