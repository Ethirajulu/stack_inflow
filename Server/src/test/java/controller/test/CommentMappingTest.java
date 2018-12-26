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
public class CommentMappingTest {

	@Autowired
	MockMvc mvc;
	
	@Test
	public void getComments() throws Exception {
		MvcResult result = mvc.perform(get("/getCmts/48")).andExpect(status().isOk()).andReturn();
		String body = result.getResponse().getContentAsString();
		System.out.println(body);
	}
	
	@Test
	public void insertComment() throws Exception {
		MvcResult result = mvc.perform(post("/saveCmt/38").content("Test")).andExpect(status().isOk()).andReturn();
		String body = result.getResponse().getContentAsString();
		System.out.println(body);
	}
	
	@Test
	public void delComment() throws Exception {
		mvc.perform(delete("/delCmt/16")).andDo(print()).andExpect(status().isOk()).andReturn();
	}
}
