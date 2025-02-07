import { Project, Task } from "./constructors";

const taskApp = {
    myProjects: [],
    init() {

    },
    cacheDOM() {
        const container = document.createElement('div');
        container.setAttribute('id', 'projects');

        const projectContainer = document.createElement('ul');
        projectContainer.setAttribute('id', 'projectContainer');

        const hr = document.createElement('hr');

        const addBtn = document.createElement('button');
        addBtn.setAttribute('id', 'addBtn');
        addBtn.innerHTML = 'New Project';

        return { container, projectContainer, hr, addBtn }
    },
    defaultProjects() {
        this.myProjects.push(new Project('Irving B. is the best'));
        this.myProjects.push(new Project('my baby boi'));
        this.myProjects.push(new Project('so sad'));
        return this.myProjects;
    },
    displayNav() {
        const container = this.cacheDOM().container
        const projectContainer = this.displayProjects()
        const hr = this.cacheDOM().hr
        const addBtn = this.addProject();

        container.innerHTML = "";
        container.appendChild(projectContainer);
        container.appendChild(hr);
        container.appendChild(addBtn);

        return container
    },
    displayProjects() {
        const projectContainer = this.cacheDOM().projectContainer;

        this.defaultProjects();
        this.myProjects.forEach((project) => {
            const display = document.createElement('li');
            display.innerHTML = project.title;
            projectContainer.appendChild(display);
        })

        return projectContainer
    },
    addProject() {
        const addBtn = this.cacheDOM().addBtn;
        addBtn.addEventListener('click', () => {
            const newProject = prompt('Name of new project', 'enter name');
            this.myProjects.push(new Project(newProject));
        })

        return addBtn
    },

}

export { taskApp };