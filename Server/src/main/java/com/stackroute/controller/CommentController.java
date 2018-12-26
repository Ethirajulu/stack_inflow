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

import com.stackroute.entity.Answer;
import com.stackroute.entity.Question;
import com.stackroute.repo.AnswerRepo;
import com.stackroute.repo.QuestionRepo;

@RestController
public class CommentController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);

	@Autowired
	QuestionRepo questionRepo;
	
	@Autowired
	AnswerRepo answerRepo;

	@CrossOrigin
	@GetMapping("/getCmts/{id}")
	public List<Answer> getComments(@PathVariable(value = "id") String id) {
		List<Answer> answers = answerRepo.getComments(Long.parseLong(id));
		if (answers.isEmpty()) {
			LOGGER.debug("No comments available");
			throw new NoResultException();
		}
		return answers;
	}

	@CrossOrigin
	@PostMapping("/saveCmt/{id}")
	public Answer insertComment(@PathVariable(value = "id") String id, @RequestBody String newComment) {
		Answer ans = new Answer();
		Optional<Question> qstn = questionRepo.findById(Long.parseLong(id));
		if(qstn.isPresent()) {
			ans.setAns(newComment);
			ans.setQstn(qstn.get());
			ans.setDate(LocalDate.now());
			ans = answerRepo.save(ans);
		}else {
			LOGGER.debug("Invalid question ID");
			throw new NoResultException();
		}
		return ans;
	}

	@CrossOrigin
	@DeleteMapping("/delCmt/{id}")
	public void delComment(@PathVariable(value = "id") String id) {
		answerRepo.deleteById(Long.parseLong(id));
	}
}
