package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;

@RestController
@RequestMapping("todo")
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Todo>> getAllTodo(){
		List<Todo> todos = todoService.getAllTodo();
		return new ResponseEntity<List<Todo>>(todos, HttpStatus.OK);
	}
	
	@GetMapping(path = "/find/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Todo> getOneTodo(@PathVariable("id") Long id){
		Todo todo = todoService.getTodo(id);
		return new ResponseEntity<>(todo, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Todo> getOneTodo(@RequestBody Todo todo){
		Todo addTodo = todoService.addTodo(todo);
		return new ResponseEntity<>(addTodo, HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Todo> updateOneTodo(@PathVariable("id") Long id, @RequestBody Todo todo){
		Todo updateTodo = todoService.updateTodo(id, todo);
		return new ResponseEntity<>(updateTodo, HttpStatus.OK);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<Todo> deleteOneTodo(@PathVariable("id") Long id){
		todoService.deleteTodo(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
	