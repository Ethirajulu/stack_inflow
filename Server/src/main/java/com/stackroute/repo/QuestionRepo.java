/**
 * 
 */
package com.stackroute.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stackroute.entity.Question;

/**
 * @author 509181
 *
 */
@Repository("questionRepo")
public interface QuestionRepo extends JpaRepository<Question, Long> {

	@Query("SELECT q from Question q where q.topic.topic_id = :id")
	public List<Question> getQstns(@Param("id") long id);

}
