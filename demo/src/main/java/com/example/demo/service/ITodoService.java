package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Todo;

public interface ITodoService {
	public List<Todo> getAllTodo();
	public Todo getTodo(Long id);
	public Todo addTodo(Todo todo);
	public Todo updateTodo(Long id,Todo todo);
	public void deleteTodo(Long id);
}
