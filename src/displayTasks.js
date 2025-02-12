import { Project, Task } from "./constructors";
import { changeTab } from "./changeTab";
import { makeDOM, formater } from "./utils";
import { renderTask } from "./render";


const displayTasks = {
    init(project) {
        this.project = project;
        this.myTasks = project.tasks,
        this.cacheDOM();
        this.appendDOM();
        this.displayTask();
        this.bindEvents();
    },
    cacheDOM() {
        this.projectDisplay = document.querySelector('main');
    },
    appendDOM() {
        // I'm rewriting this bit in render.js to make this easier to read and stuff
        this.projectDisplay.innerHTML = '';

        this.projectTitle = makeDOM.id('projectTitle', 'h1', this.project.title);
        this.projectDisplay.appendChild(this.projectTitle);
        
        this.tasksContainer = makeDOM.id('tasksContainer', 'ul');
        this.projectDisplay.appendChild(this.tasksContainer);


        this.addNewTask = makeDOM.id('addNewTask', 'id')
        this.newTaskInput = makeDOM.id('newTaskInput', 'input')
        this.newTaskInput.setAttribute('placeholder', 'add new task');
        this.newTaskInput.setAttribute('type', 'text')

        this.addNewTask.appendChild(this.newTaskInput);


        this.newTaskBtn = makeDOM.id('newTaskBtn', 'button', '+')
        this.addNewTask.appendChild(this.newTaskBtn);

        this.projectDisplay.appendChild(this.addNewTask);
    },
    bindEvents() {
        this.newTaskBtn.addEventListener('click', () => {
            this.addTask(this.newTaskInput.value);
            this.newTaskInput.value = '';
        })
    },
    displayTask() {
        if (this.myTasks.length > 0) {
            this.myTasks.forEach((task) => {
                this.tasksContainer.appendChild(renderTask.init(task))
            });
        }
    },
    addTask(title) {
        const newTask = new Task(title);
        this.myTasks.push(newTask);
        this.tasksContainer.appendChild(renderTask.init(newTask))
    }
}

export { displayTasks }