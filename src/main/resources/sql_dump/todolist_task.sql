create table task
(
    id            int          not null
        primary key,
    author        varchar(255) null,
    creation_date datetime(6)  null,
    description   varchar(255) null,
    name          varchar(255) null
);

INSERT INTO todolist.task (id, author, creation_date, description, name) VALUES (1, 'Иван Фомкин', '2020-04-06 23:44:49', 'Помыть машину на мойке', 'Авто1');
INSERT INTO todolist.task (id, author, creation_date, description, name) VALUES (2, 'Евгения Алексеева', '2020-04-06 22:44:26', 'Стать хорошим руководителем', 'Работа');
INSERT INTO todolist.task (id, author, creation_date, description, name) VALUES (3, 'Иван Фомкин', '2020-04-06 23:46:00', 'Изучить Spring и JS, чтобы сдать задание на Skillbox и повысить скилл', 'ДЗ');
INSERT INTO todolist.task (id, author, creation_date, description, name) VALUES (24, 'Сергей', '2020-04-07 14:37:32.652000000', 'Подготовить документы к отправке', 'Документы');