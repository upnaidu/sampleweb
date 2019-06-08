/**
 * 
 */
package com.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author pentayya.u
 *
 */
@Controller
public class WebController {

	private static final Logger logger = LoggerFactory.getLogger(WebController.class);

	@GetMapping("/login")
	public String login() {
		logger.info("Inside login() method ");
		return "login";
	}
}
