import { makeDOM, formater } from "./utils";

const renderTask = {
    init(task) {
        const newTask = makeDOM.class('task', 'li')
        newTask.appendChild(this.colorBox());
        newTask.appendChild(this.checkbox());
        newTask.appendChild(this.content(task.title, task._desc));
        newTask.appendChild(this.dueDate(task.duedate));
        
        this.bindEvents(newTask)
        return newTask
    },
    bindEvents(container) {
        container.addEventListener('dblclick', () => {
            updateTask.init()
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

const renderTaskContainer = {
    init(project) {
        this.projectDisplay.innerHTML = '';
        this.title(project.title);
        this.tasksContainer();
        this.addNewTask();
    },
    title(title) {
        this.projectTitle = makeDOM.id('projectTitle', 'h1', title);
        this.projectDisplay.appendChild(this.projectTitle);
    },
    tasksContainer() {
        this.tasksContainer = makeDOM.id('tasksContainer', 'ul');
        this.projectDisplay.appendChild(this.tasksContainer);
    },
    addNewTask() {
        this.addNewTask = makeDOM.id('addNewTask', 'id')
        this.newTaskInput = makeDOM.id('newTaskInput', 'input')
        this.newTaskInput.setAttribute('placeholder', 'add new task');
        this.newTaskInput.setAttribute('type', 'text')
    
        this.addNewTask.appendChild(this.newTaskInput);
    
        this.newTaskBtn = makeDOM.id('newTaskBtn', 'button', '+')
        this.addNewTask.appendChild(this.newTaskBtn);
        this.projectDisplay.appendChild(this.addNewTask);
    }   
}

export { renderTask, renderTaskContainer }