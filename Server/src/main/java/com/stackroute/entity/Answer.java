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
@Table(name="answers")
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ans_id")
	private long ans_id;
	
	@NotNull
	@ManyToOne
	@OnDelete(action=OnDeleteAction.CASCADE)
	@JsonIgnore
	@JoinColumn(name="qstn_id")
	private Question qstn;
	
	@NotNull
	@NotEmpty
	@Length(max=200)
	@Column(name="ans")
	private String ans;
	
	@NotNull
	@Column(name="date")
	private LocalDate date;

	public long getAns_id() {
		return ans_id;
	}

	public void setAns_id(long ans_id) {
		this.ans_id = ans_id;
	}

	public Question getQstn() {
		return qstn;
	}

	public void setQstn(Question qstn) {
		this.qstn = qstn;
	}

	public String getAns() {
		return ans;
	}

	public void setAns(String ans) {
		this.ans = ans;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
}
