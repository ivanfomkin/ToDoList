package ru.skillbox.ifomkin.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import ru.skillbox.ifomkin.todolist.entity.Task;
import ru.skillbox.ifomkin.todolist.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class TaskService {
    @Autowired
    TaskRepository repository;

    public List<Task> getAll() {
        Iterable<Task> taskIterable = repository.findAll();
        List<Task> tasks = new ArrayList<>();
        for (Task task : taskIterable) {
            tasks.add(task);
        }
        return tasks;
    }

    public Task updateTask(Task task, int id) {
        Task currentTask = repository.findById(id);
        currentTask.setAuthor(task.getAuthor());
        currentTask.setDescription(task.getDescription());
        currentTask.setName(task.getName());
        repository.save(currentTask);
        return currentTask;
    }
}
