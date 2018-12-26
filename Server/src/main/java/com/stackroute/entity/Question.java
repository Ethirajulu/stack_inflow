/**
 * 
 */
package com.stackroute.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author 509181
 *
 */
@Entity
@Table(name="qustns")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="qstn_id")
	private long qstn_id;
	
	@NotNull
	@ManyToOne
	@OnDelete(action=OnDeleteAction.CASCADE)
	@JsonIgnore
	@JoinColumn(name="topic_id")
	private Topic topic;
	
	@NotNull
	@NotEmpty
	@Length(max=200)
	@Column(name="qstn")
	private String qstn;
	
	@NotNull
	@Column(name="date")
	private LocalDate date;

	public long getQstn_id() {
		return qstn_id;
	}

	public void setQstn_id(long qstn_id) {
		this.qstn_id = qstn_id;
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}

	public String getQstn() {
		return qstn;
	}

	public void setQstn(String qstn) {
		this.qstn = qstn;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
}
