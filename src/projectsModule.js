import { makeDOM, saveLocal } from "./utils";
import { Project } from "./constructors";
import { tasksModule } from "./tasksModule";

const projectsModule = {

    init(projects) {
        this.projects = projects;
        this.navModule = makeDOM.id('navModule', 'div');
        this.displayProjects();
        this.addBtn();
        tasksModule.init(this.projects[0], this.projects);
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
            this.addProject();
            saveLocal.project(this.projects)
        });
    },
    deleteBtn(project, tab) {
        const delBtn = makeDOM.class('delBtn', 'button', 'delete');
        delBtn.addEventListener('click', () => {
            this.deleteProject(project, tab);
        });
        return delBtn
    },
    bindEvents(project, tab) {
        tab.addEventListener('dblclick', () => {
            this.renameProject(project, tab);
        });

        this.tabTitle.addEventListener('click', () => {
            tasksModule.init(project, this.projects);
        });
    },
    render(project) {
        const tab = makeDOM.class('project', 'li');
        this.populateTab(project, tab);
        this.projectContainer.appendChild(tab);
    },
    populateTab(project, tab) {
        tab.innerHTML = '';
        this.tabTitle = tab.appendChild(makeDOM.element('p', project._title))
        tab.appendChild(this.deleteBtn(project, tab));
        this.bindEvents(project, tab);
    },
    renameProject(project, tab) {
        project._title = prompt('New Title', 'Enter new title');
        this.populateTab(project, tab);
        saveLocal.project(this.projects)
    },
    addProject() {
        const title = prompt('Name of new project', 'enter name');
        const id = Project.projectCount;
        const newProject = new Project(title, id);
        this.projects.push(newProject);
        this.render(newProject);
        tasksModule.init(newProject, this.projects);
    },
    deleteProject(project, tab) {
        tasksModule.init(this.projects[0], this.projects);
        this.projectContainer.removeChild(tab);
        let index = this.projects.indexOf(project)
        this.projects.splice(index, 1);
        saveLocal.project(this.projects)
    },
}

export { projectsModule }