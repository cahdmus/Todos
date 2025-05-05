import { Project, Task } from "./constructors";
import { makeDOM, formater } from "./utils";
import { tasksModule } from "./tasksModule";

const updateTask = {
    init(task, project, userProjects) {
        this.cacheDOM();
        this.userProjects = userProjects;
        this.project = project;
         (task === undefined) ? this.task = {} : this.task = task;
        // this.task = task;
        (this.container.contains(this.updateTab)) ? this.updateTaskDisplay()
            : this.loadTab();
    },
    cacheDOM() {
        this.container = document.querySelector('main');
    },
    // bindEvents() {
    //     this.closeBtn.addEventListener('click', () => {
    //         this.closeTab();
    //     });
    // },
    loadTab() {
        this.updateTab = makeDOM.id('updateTab', 'div');
        this.updateTab.appendChild(this.title());
        this.updateTab.appendChild(this.closeBtn());
        this.updateTab.appendChild(this.displayForm());
        this.updateTab.appendChild(this.deleteBtn());
        this.container.appendChild(this.updateTab);
    },
    updateTask() {
        this.task.title = this.titleInput.value;
        this.task.desc = this.descInput.value;
        this.task.priority = document.querySelector('input[name="priority"]:checked').id;
        this.task.dueDate = this.dateInput.value;

        this.updateTaskDisplay();
        tasksModule.init(this.project);

        const projectsSave = JSON.stringify(this.userProjects);
        // console.log(this.userProjects);
        console.log(JSON.parse(projectsSave));
        localStorage.setItem("userProjects", projectsSave);
    },
    getPriority() {
        const priority = this.task.priority;
        switch (priority) {
            case 'Low':
                this.priorityLow.input.checked = true
                break
            case 'Medium':
                this.priorityMedium.input.checked = true
                break
            case 'High':
                this.priorityHigh.input.checked = true
                break
            case 'None':
            case 'undefined':
            default:
                this.priorityNone.input.checked = true
        }
    },
    updateTaskDisplay() {
        this.closeTab();
        this.loadTab();
    },
    closeTab() {
        this.container.removeChild(this.updateTab)
    },
    closeBtn() {
        const closeBtn = makeDOM.id('closeUpdateTabBtn', 'button');
        closeBtn.addEventListener('click', () => {
            this.closeTab();
        });
        return closeBtn;
    },
    title() {
        return makeDOM.id('projectTitle', 'h1', this.task.title)
    },
    // form for it all
    displayForm() {
        const form = makeDOM.id('taskForm', 'form')

        const title = makeDOM.formItem('title', 'text', 'Change title', form);
        this.titleInput = title.input;
        this.titleInput.value = this.task.title;
        form.appendChild(this.titleInput);
        makeDOM.br(form);

        const desc = makeDOM.formItem('desc', 'text', 'Description', form);
        this.descInput = desc.input;
        (this.task.desc === undefined) ? false : this.descInput.value = this.task.desc;
        form.appendChild(this.descInput)
        makeDOM.hr(form);

        form.appendChild(makeDOM.element('legend', 'Priority'))

        // const priority = makeDOM.formRadio('Priority', ['None', 'Low', 'Medium', 'High'])

        const priority = makeDOM.element('fieldset');
        form.appendChild(priority)
        this.priorityNone = makeDOM.formItem('priority', 'radio', 'None', priority);
        this.priorityNone.input.setAttribute('id', 'None');
        priority.appendChild(this.priorityNone.input);
        this.priorityLow = makeDOM.formItem('priority', 'radio', 'Low', priority);
        this.priorityLow.input.setAttribute('id', 'Low');
        priority.appendChild(this.priorityLow.input);
        this.priorityMedium = makeDOM.formItem('priority', 'radio', 'Medium', priority);
        this.priorityMedium.input.setAttribute('id', 'Medium');
        priority.appendChild(this.priorityMedium.input);
        this.priorityHigh = makeDOM.formItem('priority', 'radio', 'High', priority);
        this.priorityHigh.input.setAttribute('id', 'High');
        priority.appendChild(this.priorityHigh.input);

        this.getPriority();

        const dueDate = makeDOM.formItem('dueDate', 'date', 'Task due', form);
        this.dateInput = dueDate.input;
        this.dateInput.value = this.task.dueDate;
        form.appendChild(this.dateInput);

        // makeDOM.hr(form);
        // const notes = makeDOM.element('textarea', 'Notes');
        // form.appendChild(notes)
        // makeDOM.br(form);
        // add checklist - I don't think I'll do it now 

        const updateTaskBtn = makeDOM.id('updateTaskBtn', 'button', 'Update Task');
        updateTaskBtn.addEventListener('click', () => {
            this.updateTask();
        });

        form.appendChild(updateTaskBtn);

        return form
    },
    deleteBtn() {
        const deleteBtn = makeDOM.id('deleteTaskBtn', 'button', 'Delete Task');
        deleteBtn.addEventListener('click', () => {
            this.deleteTask();
        });
        return deleteBtn;
    },
    deleteTask() {
        const index = this.project.tasks.indexOf(this.task)
        this.project.tasks.splice(index, 1)
        this.updateTask();
        this.closeTab();
    }
}

export { updateTask }