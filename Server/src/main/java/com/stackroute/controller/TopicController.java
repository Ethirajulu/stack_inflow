/**
 * 
 */
package com.stackroute.controller;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.entity.Topic;
import com.stackroute.repo.AnswerRepo;
import com.stackroute.repo.TopicRepo;

/**
 * @author 509181
 *
 */
@RestController
public class TopicController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TopicController.class);

	@Autowired
	TopicRepo topicRepo;

	@Autowired
	AnswerRepo answerRepo;
	
	@PostConstruct
	public void init() {
		List<Topic> topics = topicRepo.findAll();
		if(topics.isEmpty()) {
			Topic topic = new Topic();
			topic.setTopic("Java");
			topic.setDescription("Mind bloggler");
			topicRepo.save(topic);
			topic = new Topic();
			topic.setTopic("Java Script");
			topic.setDescription("Streamer");
			topicRepo.save(topic);
			topic = new Topic();
			topic.setTopic("Python");
			topic.setDescription("Snake charmer");
			topicRepo.save(topic);
			topic = new Topic();
			topic.setTopic("React");
			topic.setDescription("On a action react to it!");
			topicRepo.save(topic);
			topic = new Topic();
			topic.setTopic("Angular");
			topic.setDescription("In a leaner way!!");
			topicRepo.save(topic);
		}
	}

	@CrossOrigin
	@GetMapping("/getTopics")
	public List<Topic> getTopics() {
		List<Topic> topics = topicRepo.findAll();
		if(topics.isEmpty()) {
			LOGGER.debug("No topics were found");
			throw new NoResultException();
		}
		return topicRepo.findAll();
	}

}
