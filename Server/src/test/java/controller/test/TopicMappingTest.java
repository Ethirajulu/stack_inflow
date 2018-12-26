package controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.stackroute.qna.QnAApp;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=QnAApp.class)
@AutoConfigureMockMvc
public class TopicMappingTest {
	
	@Autowired
	MockMvc mvc;
	
	@Test
	public void getTopics() throws Exception {
		MvcResult result = mvc.perform(get("/getTopics")).andExpect(status().isOk()).andReturn();
		String body = result.getResponse().getContentAsString();
		System.out.println(body);
	}

}
