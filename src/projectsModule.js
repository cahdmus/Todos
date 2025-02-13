import { makeDOM } from "./utils";
import { Project, Task } from "./constructors";
import { tasksModule } from "./tasksModule";

const projectsModule = {

    init(projects) {
        this.projects = projects;
        this.navModule = makeDOM.id('navModule', 'div');
        this.displayProjects();
        this.addBtn();
        tasksModule.init(this.projects[0]);
        return this.navModule
    },

    displayProjects() {
        this.projectContainer = makeDOM.id('projectContainer', 'ul');

        this.projects.forEach((project) => {
            this.render(project);
        })

        this.navModule.appendChild(this.projectContainer);
        makeDOM.hr(this.navModule);
    },

    addBtn() {
        this.addBtn = makeDOM.id('addBtn', 'button', 'New Project');
        this.navModule.appendChild(this.addBtn);
        this.addBtn.addEventListener('click', () => {
            console.log('adding project');
        });
    },

    deleteBtn(project) {
        const delBtn = makeDOM.class('delBtn', 'button', 'delete');
        delBtn.addEventListener('click', () => {
            console.log(`deleting "${project._title}"`);
        });
        return delBtn
    },

    bindEvents(project, tab) {
        tab.addEventListener('dblclick', () => {
            console.log(`renaming "${project._title}"`)
        });

        tab.addEventListener('click', () => {
            tasksModule.init(project);
            console.log(`displaying "${project._title}"`)
        });
    },
    
    render(project) {
        const tab = makeDOM.class('project', 'li', project.title);
        tab.appendChild(this.deleteBtn(project));
        this.bindEvents(project, tab);
        this.projectContainer.appendChild(tab);
    }
}

export { projectsModule }