import { Project, Task } from "./constructors";
import { displayTasks } from "./displayTasks";

const taskApp = {

    myProjects: [],
    init() {
        this.cacheDOM();
        this.appendDOM();
        this.defaultProjects();
        displayTasks.init(this.myProjects[0]);
        this.bindAddBtn();
    },
    cacheDOM() {
        this.projectDisplay = document.querySelector('#projectDisplay');
    },
    appendDOM() {
        this.projectContainer = document.createElement('ul');
        this.projectContainer.setAttribute('id', 'projectContainer');
        this.projectDisplay.appendChild(this.projectContainer);
        
        this.hr = document.createElement('hr');
        this.projectDisplay.appendChild(this.hr);
        
        this.addBtn = document.createElement('button');
        this.addBtn.setAttribute('id', 'addBtn');
        this.addBtn.innerHTML = 'New Project';
        this.projectDisplay.appendChild(this.addBtn);
    },
    bindEvents(project, tab, delBtn) {
        tab.addEventListener('dblclick', () => {
            this.renameProject(project, tab);
        });

        tab.addEventListener('click', () => {
            displayTasks.init(project);
        });
        
        delBtn.addEventListener('click', () => {
            this.removeProject(project, tab);
        });
    },
    bindAddBtn() {        
        this.addBtn.addEventListener('click', () => {
            this.addProject();
        });
    },
    addProject() {
        const title = prompt('Name of new project', 'enter name');
        const id = Project.projectCount;
        const newProject = new Project(title, id);
        this.myProjects.push(newProject);
        this.render(newProject);
    },
    removeProject(project, tab) {
        this.projectContainer.removeChild(tab);
        this.myProjects.splice(project.id, 1)
        this.cacheDOM();
    },
    renameProject(project, tab) {
        const newTitle = prompt('New Title', 'Enter new title');
        project.title = newTitle;
        tab.innerHTML = newTitle;
        // I should be able to just do render but the way I wrote render
        // makes it "impossible" but it should be easy to rewroke adding
        // a "createTab" function then rendering it
    },
    render(project) {
        const tab = document.createElement('li');
        tab.classList.add('project');
        tab.innerHTML = project.title;
        
        const delBtn = document.createElement('button');
        delBtn.classList.add('delBtn');
        delBtn.innerHTML = 'delete';
        tab.appendChild(delBtn);

        this.projectContainer.appendChild(tab);
        this.bindEvents(project, tab, delBtn);
        this.cacheDOM();
    },
    defaultProjects() {
        const project1 = new Project('Irving B. is the best', 0)
        const defaultTasks = [new Task('sup'), new Task('Test test test')];
        project1.tasks = defaultTasks;
        this.myProjects.push(project1);
        this.myProjects.push(new Project('my baby boi', 1));
        this.myProjects.push(new Project('so sad', 2));
        this.myProjects.forEach((project) => {
            this.render(project);
        })
    },
}

export { taskApp };