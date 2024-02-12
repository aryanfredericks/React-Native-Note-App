package com.aryan.rn.recat_native_todo.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.aryan.rn.recat_native_todo.models.User;
import com.aryan.rn.recat_native_todo.repositories.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserRepository userRep;

    @GetMapping("/users")
    public ArrayList<User> getAllUsers() {
        return (ArrayList<User>) userRep.findAll();
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(
            @RequestBody User user) {

        System.out.println(user.getEmail());
        Optional<User> u = userRep.findByEmail(user.getEmail());
        if (u.isPresent()) {
            return new ResponseEntity<>("User Exists", HttpStatus.OK);
        } else {
            User user2 = userRep.save(user);
            return new ResponseEntity<>(user2, HttpStatus.OK);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody HashMap<String, String> user) {
        Optional<User> u = userRep.findByEmail(user.get("email"));
        if (u.isPresent()) {
            if (u.get().getPassword().equals(user.get("password"))) {
                HashMap<String, Object> res = new HashMap<>();
                res.put("todo", u.get());
                res.put("status", "success");
                return new ResponseEntity<>(res, HttpStatus.OK);
            } else {
                HashMap<String, Object> res = new HashMap<>();
                res.put("todo", "not found");
                res.put("status", "failed");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
