package com.example.GadgetHub.controller;

import com.example.GadgetHub.dto.FirebaseUserDto;
import com.example.GadgetHub.model.User;
import java.time.LocalDateTime;
import com.example.GadgetHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sync")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public User syncUser(@RequestBody FirebaseUserDto firebaseUserDto) {
        return userService.syncUser(firebaseUserDto);
    }
}
