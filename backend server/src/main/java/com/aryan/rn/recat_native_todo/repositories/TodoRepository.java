package com.aryan.rn.recat_native_todo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aryan.rn.recat_native_todo.models.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("select t from Todo t where t.userId=:userId")
    public List<Todo> findTodosByUserId(@Param("userId") Long userId);
}
