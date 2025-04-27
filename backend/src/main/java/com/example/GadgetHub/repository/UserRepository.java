package com.example.GadgetHub.repository;
import java.time.LocalDateTime;

import com.example.GadgetHub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUid(String uid);
}
