package ru.skillbox.ifomkin.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.skillbox.ifomkin.todolist.entity.Task;
import ru.skillbox.ifomkin.todolist.service.TaskService;

import java.util.List;

@Controller
@RequestMapping
public class MainController {
    @Autowired
    TaskService service;

    @GetMapping("/")
    public String mainPage(Model model) {
        return "index";
    }

    @GetMapping("/thymeleaf")
    public String thymeLeaf(Model model) {
        List<Task> taskList = service.getAll();
        model.addAttribute("taskList", taskList);
        return "thymeleaf";
    }
}
