package main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {

    @RequestMapping("/")
    public int index() {
        return (int) (Math.random() * 1_000_000);
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
}
