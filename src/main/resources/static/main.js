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
        '<div>' +
        '<input type="text" placeholder = "Name" v-model="name" />' +
        '<input type="text" placeholder = "Description" v-model="description" />' +
        '<input type="text" placeholder = "Author" v-model="author" />' +
        '<input type="button" value="Save task" v-on:click="save" />' +
        '</div>',
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
    template: '<div>' +
        '<i>{{task.id}}</i> {{task.name}} <strong>{{task.description}}</strong> {{task.author}}' +
        '<span>' +
        '<input type="button" value="Edit" v-on:click="edit"/>' +
        '<input type="button" value="Delete" v-on:click="del"/>' +
        '</span>' +
        '</div>',
    methods: {
        edit: function () {
            this.editTask(this.task);
        },
        del: function() {
            taskApi.remove({id: this.task.id}).then(result => {
                if (result.ok) {
                    this.tasks.splice(this.tasks.indexOf(this.task), 1)
                }
            })
        }
    }
});

Vue.component('task-table-header', { //Временная шапка таблицы
    template: '<div><i>ID</i> <strong>Description</strong> Author</div>'
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
        '<task-table-header />' +
        '<task-row v-for="task in tasks" v-bind:key="task.id" :tasks="tasks" :task="task" :editTask="editTask"/>' +
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