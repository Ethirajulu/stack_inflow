package com.stackroute.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.entity.Question;
import com.stackroute.entity.Topic;
import com.stackroute.repo.QuestionRepo;
import com.stackroute.repo.TopicRepo;

@RestController
public class QuestionController {

	private static final Logger LOGGER = LoggerFactory.getLogger(QuestionController.class);

	@Autowired
	TopicRepo topicRepo;

	@Autowired
	QuestionRepo questionRepo;

	@CrossOrigin
	@GetMapping("/getTopicDetails/{id}")
	public List<Question> getTopicDetails(@PathVariable(value = "id") String id) {
		List<Question> questions = questionRepo.getQstns(Long.parseLong(id));
		if (questions.isEmpty()) {
			LOGGER.debug("No questions found");
			throw new NoResultException();
		}
		return questions;
	}

	@CrossOrigin
	@PostMapping("/saveQstn/{id}")
	public Question insertQuestion(@PathVariable(value = "id") String id, @RequestBody String newQstn) {
		Question qst = new Question();
		Optional<Topic> topic = topicRepo.findById(Long.parseLong(id));
		if (topic.isPresent()) {
			qst.setQstn(newQstn);
			qst.setTopic(topic.get());
			qst.setDate(LocalDate.now());
			qst = questionRepo.save(qst);
		} else {
			LOGGER.debug("Invalid topic ID");
			throw new NoResultException();
		}
		return qst;
	}

	@CrossOrigin
	@DeleteMapping("/delQstn/{id}")
	public void delQstn(@PathVariable(value = "id") String id) {
		questionRepo.deleteById(Long.parseLong(id));
	}

}
