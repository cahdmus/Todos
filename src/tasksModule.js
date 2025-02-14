import { Task } from "./constructors";
import { makeDOM, formater } from "./utils";
import { updateTask } from "./updateTask";

const renderTask = {
    init(task) {
        this.cacheDOM();
        const newTask = makeDOM.class('task', 'li');
        newTask.appendChild(this.colorBox());
        newTask.appendChild(this.checkbox());
        newTask.appendChild(this.content(task.title, task._desc));
        newTask.appendChild(this.dueDate(task.duedate));

        this.bindEvents(newTask, task);
        this.tasksContainer.appendChild(newTask);
    },
    cacheDOM() {
        this.tasksContainer = document.querySelector('#tasksContainer');
    },
    bindEvents(container, task) {
        container.addEventListener('dblclick', () => {
            updateTask.init(task)
        });
    },
    colorBox() {
        return makeDOM.class('colorBox', 'div')
    },
    checkbox() {
        const checkboxContainer = makeDOM.class('checkbox', 'div');
        const checkbox = makeDOM.class('input', 'input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxContainer.appendChild(checkbox);
        return checkboxContainer
    },
    content(title, desc) {
        const taskContent = makeDOM.class('taskContent', 'div');
        const taskTitle = makeDOM.class('title', 'p', title);
        taskContent.appendChild(taskTitle);

        if (desc !== undefined) {
            const desc = makeDOM.class('desc', 'p', desc);
            taskContent.appendChild(desc);
        }
        return taskContent
    },
    dueDate(duedate) {
        return makeDOM.class('dueDate', 'p', formater.date(duedate))
    }
}

const tasksModule = {
    init(project) {
        this.tasks = project.tasks;
        this.cacheDOM();
        this.projectDisplay = makeDOM.id('projectDisplay', 'div')
        this.main.appendChild(this.projectDisplay);
        this.projectDisplay.innerHTML = '';
        this.projectDisplay.appendChild(this.title(project._title));
        this.projectDisplay.appendChild(this.tasksContainer());
        this.projectDisplay.appendChild(this.displayAddNew());
        this.displayTasks(project);
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    bindEvents(input, tab) {
        tab.addEventListener('click', () => {
            this.addTask(input.value);
            input.value = '';
        });
    },
    title(title) {
        return makeDOM.id('projectTitle', 'h1', title)
    },
    tasksContainer() {
        return makeDOM.id('tasksContainer', 'ul')
    },
    displayTasks(project) {
        const tasks = project.tasks;
        tasks.forEach(task => {
            renderTask.init(task);
        });
    },
    displayAddNew() {
        const addNewTask = makeDOM.id('addNewTask', 'id');
        const newTaskInput = makeDOM.id('newTaskInput', 'input');
        newTaskInput.setAttribute('placeholder', 'add new task');
        newTaskInput.setAttribute('type', 'text');

        addNewTask.appendChild(newTaskInput);

        const newTaskBtn = makeDOM.id('newTaskBtn', 'button', '+');
        addNewTask.appendChild(newTaskBtn);

        this.bindEvents(newTaskInput, newTaskBtn)

        return addNewTask
    },
    addTask(title) {
        const newTask = new Task(title);
        this.tasks.push(newTask);
        renderTask.init(newTask);
    }
}

export { tasksModule }