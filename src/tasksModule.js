import { Task } from "./constructors";
import { makeDOM, formater, saveLocal } from "./utils";
import { updateTask } from "./updateTask";

const renderTask = {
    init(task, project, userProjects) {
        // console.log(task)
        this.cacheDOM();
        this.project = project;
        this.userProjects = userProjects;
        const newTask = makeDOM.class('task', 'li');
        newTask.appendChild(this.colorBox(task.priority));
        newTask.appendChild(this.checkbox(task, task.status));
        newTask.appendChild(this.content(task._title, task._desc));
        newTask.appendChild(this.dueDate(task.dueDate));

        this.bindEvents(newTask, task);
        this.tasksContainer.appendChild(newTask);
    },
    cacheDOM() {
        this.tasksContainer = document.querySelector('#tasksContainer');
    },
    bindEvents(container, task) {
        container.addEventListener('dblclick', () => {
            updateTask.init(task, this.project, this.userProjects)
        });
    },
    colorBox(priority) {
        const colorBox = makeDOM.class('colorBox', 'div');
        let newClass;

        if (priority == undefined) {
            newClass = 'defaultPriority'
        } else if (priority == 'Low') {
            newClass = 'lowPriority'
        } else if (priority == 'Medium') {
            newClass = 'mediumPriority'
        } else if (priority == 'High') {
            newClass = 'highPriority'
        }

        colorBox.classList.add(newClass);
        return colorBox;
    },
    checkbox(task, status) {
        const checkboxContainer = makeDOM.class('checkbox', 'div');
        const checkbox = makeDOM.class('input', 'input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxContainer.appendChild(checkbox);

        checkbox.checked = status;
        
        checkboxContainer.addEventListener('click', () => {
            task.status = checkbox.checked
            saveLocal.project(this.userProjects)
        });

        return checkboxContainer
    },
    content(title, desc) {
        const taskContent = makeDOM.class('taskContent', 'div');
        const taskTitle = makeDOM.class('title', 'p', title);
        taskContent.appendChild(taskTitle);

        if (desc !== undefined) {
            const taskDesc = makeDOM.class('desc', 'p', desc);
            taskContent.appendChild(taskDesc);
        }
        return taskContent
    },
    dueDate(duedate) {
        return makeDOM.class('dueDate', 'p', formater.date(duedate))
    }
}

const tasksModule = {
    init(project, userProjects) {
        this.project = project;
        this.userProjects = userProjects;
        this.tasks = project.tasks;
        this.cacheDOM();
        this.projectDisplay.innerHTML = '';
        this.projectDisplay.appendChild(this.title(project._title));
        this.projectDisplay.appendChild(this.tasksContainer());
        this.projectDisplay.appendChild(this.displayAddNew());
        this.displayTasks(project);
    },
    cacheDOM() {
        this.projectDisplay = document.querySelector('#projectDisplay');
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
            renderTask.init(task, this.project, this.userProjects);
        });
        // To remove later
        // updateTask.init(tasks[0], this.project)
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
        renderTask.init(newTask, this.project);
        saveLocal.project(this.userProjects)
    }
}

export { tasksModule }