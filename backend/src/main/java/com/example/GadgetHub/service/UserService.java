package com.example.GadgetHub.service;

import com.example.GadgetHub.dto.FirebaseUserDto;
import com.example.GadgetHub.model.User;
import com.example.GadgetHub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User syncUser(FirebaseUserDto firebaseUser) {
        return userRepository.findByEmail(firebaseUser.getEmail()).orElseGet(() -> {
            User newUser = new User();
            newUser.setName(firebaseUser.getName());
            newUser.setEmail(firebaseUser.getEmail());
            newUser.setUid(firebaseUser.getUid());
            newUser.setRole("student"); // default role
            return userRepository.save(newUser);
        });
    }

    public Optional<User> getUserByUid(String uid) {
        return userRepository.findByUid(uid);
    }
}
