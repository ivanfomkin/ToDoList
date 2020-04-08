package ru.skillbox.ifomkin.todolist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.skillbox.ifomkin.todolist.entity.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
    Task findById(int id);
}
