import { Project, Task } from "./constructors";
import { makeDOM, formater } from "./utils";

const renderTask = {
    init(task) {
        this.cacheDOM();
        const newTask = makeDOM.class('task', 'li');
        newTask.appendChild(this.colorBox());
        newTask.appendChild(this.checkbox());
        newTask.appendChild(this.content(task.title, task._desc));
        newTask.appendChild(this.dueDate(task.duedate));

        this.bindEvents(newTask);
        this.tasksContainer.appendChild(newTask);
    },
    cacheDOM() {
        this.tasksContainer = document.querySelector('#tasksContainer');
    },
    bindEvents(container) {
        container.addEventListener('dblclick', () => {
            console.log(`Updating`)
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
        this.cacheDOM();
        this.projectDisplay.innerHTML = '';
        this.projectDisplay.appendChild(this.title(project._title));
        this.projectDisplay.appendChild(this.tasksContainer());
        this.projectDisplay.appendChild(this.addNewTask());
        this.displayTasks(project);
    },
    cacheDOM() {
        this.projectDisplay = document.querySelector('main');
    },
    bindEvents(tab) {
        tab.addEventListener('click', () => {
            console.log(`add task`)
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
    addNewTask() {
        const addNewTask = makeDOM.id('addNewTask', 'id');
        const newTaskInput = makeDOM.id('newTaskInput', 'input');
        newTaskInput.setAttribute('placeholder', 'add new task');
        newTaskInput.setAttribute('type', 'text');

        addNewTask.appendChild(newTaskInput);

        const newTaskBtn = makeDOM.id('newTaskBtn', 'button', '+');
        addNewTask.appendChild(newTaskBtn);

        this.bindEvents(newTaskBtn)

        return addNewTask
    }
}

export { tasksModule }