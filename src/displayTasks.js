import { isThisSecond } from "date-fns";
import { Project, Task } from "./constructors";

const displayTasks = {

    init(project) {
        this.project = project;
        this.myTasks = this.project.tasks,
        this.cacheDOM();
        this.appendDOM();
        this.displayTask();
    },
    cacheDOM() {
        this.projectDisplay = document.querySelector('main');
    },
    appendDOM() {
        this.projectDisplay.innerHTML = '';
        this.title = document.createElement('h1');
        this.title.innerHTML = this.project.title;
        this.projectDisplay.appendChild(this.title);
        this.tasksContainer = document.createElement('ul');
        this.tasksContainer.setAttribute('id', 'tasksContainer');
        this.projectDisplay.appendChild(this.tasksContainer);
    },
    displayTask() {
        if (this.myTasks.length > 0) {
            this.myTasks.forEach((task) => {
                this.render(task)
            });
        }
        
    },
    render(task)  {
        const newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.innerHTML = task.title;
        this.tasksContainer.appendChild(newTask);
    }
}

export { displayTasks }