/**
 * 
 */
package com.stackroute.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stackroute.entity.Answer;

/**
 * @author 509181
 *
 */
@Repository("answerRepo")
public interface AnswerRepo extends JpaRepository<Answer, Long> {

	/**
	 * @param topicId
	 * @param qstnId
	 * @return
	 */
	@Query("SELECT a from Answer a where a.qstn.qstn_id = :id")
	public List<Answer> getComments(@Param("id") long id);
}
