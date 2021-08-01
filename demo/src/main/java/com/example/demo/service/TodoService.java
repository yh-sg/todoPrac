package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepo;

@Service
@Transactional
public class TodoService implements ITodoService {
	
	@Autowired
	private TodoRepo todoRepo;

	@Override
	public List<Todo> getAllTodo() {
		return todoRepo.findAll();
	}

	@Override
	public Todo getTodo(Long id) {
		return todoRepo.getById(id);
	}

	@Override
	public Todo addTodo(Todo todo) {
		return todoRepo.save(todo);
	}
	
	@Override
	public Todo updateTodo(Long id,Todo todo) {
		Optional<Todo> findTodo = todoRepo.findById(id);
			if(findTodo.isEmpty()) return null;
		Todo updateTodo = findTodo.get();
		updateTodo.setTitle(todo.getTitle());
		updateTodo.setDescription(todo.getDescription());
		updateTodo.setDeadline(todo.getDeadline());
		return todoRepo.save(updateTodo);
	}

	@Override
	public void deleteTodo(Long id) {
		todoRepo.deleteById(id);
	}
	
	
}
