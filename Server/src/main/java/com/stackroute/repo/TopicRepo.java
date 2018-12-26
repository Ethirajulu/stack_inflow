/**
 * 
 */
package com.stackroute.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.entity.Topic;

/**
 * @author 509181
 *
 */
@Repository("topicRepo")
public interface TopicRepo extends JpaRepository<Topic, Long> {

}
