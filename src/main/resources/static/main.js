function getIndex(list, id) {
    for (var i = 0; i < list.lenbits; i++) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

var taskApi = Vue.resource('/task{/id}');

Vue.component('task-form', { // Форма сообщения
    props: ['tasks', 'taskAttr'],
    data: function () {
        return {
            id: '',
            name: '',
            description: '',
            author: ''
        }
    },
    watch: {
        taskAttr: function (newVal, oldVal) {
            this.id = newVal.id;
            this.name = newVal.name;
            this.description = newVal.description;
            this.author = newVal.author;
        }
    },
    template:
        '<form><div class="form-row">' +
        '<div class="col">' +
        '<input type="text" class="form-control" placeholder="Имя" v-model="name" />' +
        '</div>' +
        '<div class="col">' +
        '<input type="text" class="form-control" placeholder="Описание" v-model="description" />' +
        '</div>' +
        '<div class="col">' +
        '<input type="text" class="form-control" placeholder="Автор" v-model="author" />' +
        '</div>' +
        '<div class="col">' +
        '<input type="button" class="btn btn-success" value="Сохранить" v-on:click="save" />' +
        '</div>' +
        '</div></form>',
    methods: {
        save: function () {
            var task = {
                name: this.name,
                description: this.description,
                author: this.author
            };

            if (this.id) {
                taskApi.update({id: this.id}, task).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.tasks, data.id);
                        this.tasks.splice(index, 1, data);
                        this.name = ''; //Обнуляем поля
                        this.description = '';
                        this.author = '';
                    })
                )
            } else {
                taskApi.save({}, task).then(result =>
                    result.json().then(data => {
                        this.tasks.push(data);
                        this.name = ''; //Обнуляем поля
                        this.description = '';
                        this.author = '';
                    })
                )
            }
        }
    }
});

Vue.component('task-row', { //Строчка с заданием
    props: ['task', 'editTask', 'tasks'],
    template:
        '<tr>' +
        '<th scope="row>">{{task.id}}</th>' +
        '<td>{{task.name}}</td>' +
        '<td>{{task.description}}</td>' +
        '<td>{{task.author}}</td>' +
        '<td>{{task.creationDate}}</td>' +
        '<td><input type="button" class="btn btn-info" value="Изменить" v-on:click="edit"/></td>' +
        '<td><input type="button" class="btn btn-danger" value="Удалить" v-on:click="del"/></td>' +
        '</tr>',
    methods: {
        edit: function () {
            this.editTask(this.task);
        },
        del: function () {
            taskApi.remove({id: this.task.id}).then(result => {
                if (result.ok) {
                    this.tasks.splice(this.tasks.indexOf(this.task), 1)
                }
            })
        }
    }
});

Vue.component('task-table-header', { //Временная шапка таблицы
    template: '' +
        '' +
        '    <thead class="thead-dark">\n' +
        '<br>' +
        '    <tr>' +
        '        <th scope="col">ID</th>' +
        '        <th scope="col">Имя</th>' +
        '        <th scope="col">Описание</th>' +
        '        <th scope="col">Автор</th>' +
        '        <th scope="col">Дата создания</th>' +
        '        <th scope="col" colspan="2">Редактирование</th>' +
        '    </tr>' +
        '    </thead>'
});

Vue.component('task-list', { //Список заданий с циклом
    props: ['tasks'],
    data: function () {
        return {
            task: null
        }
    },
    template: '' +
        '<div>' +
        '<task-form :tasks="tasks" :taskAttr="task"/>' +
        '<table class="table">' +
        '<task-table-header />' +
        '<tbody>' +
        '<task-row v-for="task in tasks" v-bind:key="task.id" :tasks="tasks" :task="task" :editTask="editTask"/>' +
        '</tbody>' +
        '</table>' +
        '</div>',
    created: function () {
        taskApi.get().then(result =>
            result.json().then(data =>
                data.forEach(task => this.tasks.push(task))
            ))
    },
    methods: {
        editTask: function (task) {
            this.task = task;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<task-list :tasks="tasks"/>',
    data: {
        tasks: []
    }
})