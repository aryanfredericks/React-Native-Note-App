package com.aryan.rn.recat_native_todo.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private boolean completed;

    @Column
    private Date createdAt;

    @Column
    private Long userId;

    public Todo() {
    }

    public Todo(Long id, String title, String description, boolean completed, Date createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    public Todo(String title, String description, boolean completed, Date createdAt) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    public Todo(String title, String description, boolean completed, Long userId) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.userId = userId;
    }

    @Override
    public String toString() {
        if (id == null) {
            return "Todo [ title=" + title + ", description=" + description + ", completed=" + completed
                    + ", createdAt=" + createdAt + ", userId=" + userId + "]";

        }
        return "Todo [id=" + id + ", title=" + title + ", description=" + description + ", completed=" + completed
                + ", createdAt=" + createdAt + ", userId=" + userId + "]";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
