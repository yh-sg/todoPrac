package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "todo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Todo {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(nullable=false)
	private String title;
	@Column(nullable=false)
	private String description;
	@Column(nullable=false)
	private Date deadline;
	@CreationTimestamp
	private Timestamp CREATED_DATE;
	@UpdateTimestamp
	private Timestamp UPDATED_DATE;
	
	public Todo() {
		super();
	}

	public Todo(String title, String description, Date deadline, Timestamp CREATED_DATE, Timestamp UPDATED_DATE) {
		super();
		this.title = title;
		this.description = description;
		this.deadline = deadline;
		this.CREATED_DATE = CREATED_DATE;
		this.UPDATED_DATE = UPDATED_DATE;
	}
	
	
}
