package controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
@SpringBootTest(classes = QnAApp.class)
@AutoConfigureMockMvc
public class QuestionMappingTest {

	@Autowired
	MockMvc mvc;

	@Test
	public void getTopicDetails() throws Exception {
		MvcResult result = mvc.perform(get("/getTopicDetails/1")).andExpect(status().isOk()).andReturn();
		String body = result.getResponse().getContentAsString();
		System.out.println(body);
	}

	@Test
	public void insertQuestion() throws Exception {
		MvcResult result = mvc.perform(post("/saveQstn/1").content("Test")).andDo(print()).andExpect(status().isOk()).andReturn();
		String body = result.getResponse().getContentAsString();
		System.out.println(body);
	}

	@Test
	public void delQstn() throws Exception {
		mvc.perform(delete("/delQstn/5")).andDo(print()).andExpect(status().isOk()).andReturn();
	}
}
