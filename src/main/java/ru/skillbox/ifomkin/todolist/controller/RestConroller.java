package ru.skillbox.ifomkin.todolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.skillbox.ifomkin.todolist.entity.Task;
import ru.skillbox.ifomkin.todolist.repository.TaskRepository;
import ru.skillbox.ifomkin.todolist.service.TaskService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("task")
public class RestConroller {

    @Autowired
    TaskRepository repository;
    @Autowired
    TaskService service;

    @GetMapping
    public List<Task> getAll() {
        return service.getAll();
    }

    @GetMapping("{id}")
    public Task taskById(@PathVariable int id) {
        return repository.findById(id);
    }

    @PostMapping
    public Task add(@RequestBody Task newTask) {
        newTask.setCreationDate(new Date());
        repository.save(newTask);
        return newTask;
    }

    @PutMapping("{id}")
    public Task update(@RequestBody Task task, @PathVariable int id) {
        return service.updateTask(task, id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable int id) {
        repository.deleteById(id);
    }

}
