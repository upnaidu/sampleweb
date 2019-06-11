package com.app;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import java.util.logging.Logger;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.app.controller.WebController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebControllerTest {

	public static final Logger logger = Logger.getLogger(WebControllerTest.class.getName());

	@InjectMocks
	private WebController webController;

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() {

		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
		MockitoAnnotations.initMocks(this);

	}

	@Test
	public void testLogin() throws Exception {
		this.mockMvc.perform(get("/login")).andDo(print()).andExpect(status().isOk()).andExpect(view().name("login"))
				.andExpect(forwardedUrl("/WEB-INF/views/login.jsp"));
	}

	@After
	public void tearDown() {
		mockMvc = null;
	}

}
