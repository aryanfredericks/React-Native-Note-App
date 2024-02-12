package com.aryan.rn.recat_native_todo.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.Delimiter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aryan.rn.recat_native_todo.models.Todo;
import com.aryan.rn.recat_native_todo.repositories.TodoRepository;
import com.aryan.rn.recat_native_todo.repositories.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class TodoController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TodoRepository todoRepository;

    // Creating a Todo
    @PostMapping("/todo")
    public ResponseEntity<?> createTodo(
            @RequestBody Todo todo) {

        System.out.println(todo.toString());
        todo.setCreatedAt(new Date(System.currentTimeMillis()));
        Todo t = todoRepository.save(todo);
        return new ResponseEntity<>(t, HttpStatus.OK);
    }

    // fetching all todos from a user
    @PostMapping("/todos/{userId}")
    public ResponseEntity<?> getTodosByUserId(
            @PathVariable("userId") Long userId) {
        ArrayList<Todo> t = (ArrayList<Todo>) todoRepository.findTodosByUserId(userId);
        if (t.isEmpty()) {
            return new ResponseEntity<>("No todos found", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
    }

    @PutMapping("/todos/{noteId}")
    public ResponseEntity<?> updateUserTodo(
            @PathVariable("noteId") Long noteId,
            @RequestBody Todo todo) {
        Optional<Todo> t = todoRepository.findById(noteId);
        if (t.isPresent()) {
            Todo updatedTodo = t.get();
            updatedTodo.setTitle(todo.getTitle());
            updatedTodo.setDescription(todo.getDescription());
            updatedTodo.setCompleted(todo.isCompleted());
            updatedTodo.setCreatedAt(new Date(System.currentTimeMillis()));
            todoRepository.save(updatedTodo);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        }
        return new ResponseEntity<>("Todo Not Found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/todos/{noteId}")
    public ResponseEntity<?> deleteTodo(
            @PathVariable("noteId") Long noteId) {
        Optional<Todo> t = todoRepository.findById(noteId);
        if (t.isPresent()) {
            todoRepository.deleteById(noteId);
            return new ResponseEntity<>("Todo Deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Todo Not Found", HttpStatus.NOT_FOUND);
    }

}
