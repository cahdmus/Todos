import { isThisSecond } from "date-fns";
import { Project, Task } from "./constructors";
import { format } from "date-fns";

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
    formatDate(date) {
        return format(new Date(date), 'eee dd MMM')
    },
    render(task)  {
        const newTask = document.createElement('li');
        newTask.classList.add('task');

        const colorBox = document.createElement('div');
        colorBox.classList.add('colorBox');
        newTask.appendChild(colorBox);
        
        const checkboxContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        checkboxContainer.classList.add('checkbox');
        checkbox.setAttribute('type', 'checkbox')
        checkboxContainer.appendChild(checkbox);
        newTask.appendChild(checkboxContainer);
        
        const title = document.createElement('p');
        title.classList.add('title');
        title.innerHTML = task.title;
        newTask.appendChild(title);
        
        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.innerHTML = (task._desc) ? task._desk : 'filler';
        newTask.appendChild(desc);
        
        const duedate = document.createElement('p');
        duedate.classList.add('dueDate');
        duedate.innerHTML = (task.duedate) ? task.duedate : this.formatDate('1995, 9, 2');
        newTask.appendChild(duedate);
        
        this.tasksContainer.appendChild(newTask);
    }
}

export { displayTasks }