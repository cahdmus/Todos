import { Project, Task } from "./constructors";
import { makeDOM, formater } from "./utils";

const updateTask = {
    init(task) {
        this.cacheDOM();
        this.task = task;
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
    updateTaskDisplay() {
        this.closeTab();
        this.loadTab();
    },
    closeTab() {
        this.container.removeChild(this.updateTab)
    },
    closeBtn() {
        const closeBtn = makeDOM.id('closeUpdateTabBtn', 'button', 'x');
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
        form.appendChild(title.input)
        makeDOM.br(form);
        const desc = makeDOM.formItem('desc', 'text', 'Description', form);
        form.appendChild(desc.input)
        makeDOM.hr(form);
        form.appendChild(makeDOM.element('legend', 'Priority'))
        const priority = makeDOM.formRadio('Priority', ['None', 'Low', 'Medium', 'High'])
        form.appendChild(priority)

        const dueDate = makeDOM.formItem('dueDate', 'date', 'Task due', form);
        form.appendChild(dueDate.input)
        makeDOM.hr(form);

        const notes = makeDOM.element('textarea', 'Notes');
        form.appendChild(notes)
        makeDOM.br(form);
        // add checklist - I don't think I'll do it now 
        const updateTaskBtn = makeDOM.id('updateTaskBtn', 'button', 'Update Task');

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
        console.log(this.task.title);
        this.closeTab();
    }
    // delete task
}

export { updateTask }