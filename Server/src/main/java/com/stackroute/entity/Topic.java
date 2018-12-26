/**
 * 
 */
package com.stackroute.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

/**
 * @author 509181
 *
 */
@Entity
@Table(name="topics")
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="topic_id")
	private long topic_id;
	
	@Column(name="topic")
	@NotNull
	@NotEmpty
	@Length(max=45)
	private String topic;
	
	@Column(name="description")
	@NotNull
	@NotEmpty
	@Length(max=120)
	private String description;

	public long getTopic_id() {
		return topic_id;
	}

	public void setTopic_id(long topic_id) {
		this.topic_id = topic_id;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
