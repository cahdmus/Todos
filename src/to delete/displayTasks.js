import { Project, Task } from "../constructors";
import { changeTab } from "../changeTab";
import { makeDOM, formater } from "../utils";
import { renderTask, renderTaskContainer } from "./renders";


const displayTasks = {
    init(project) {
        this.project = project;
        this.myTasks = project.tasks,
        this.cacheDOM();
        renderTaskContainer.init(this.project);
        // this.appendDOM();
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






// const taskApp = {

//     myProjects: [],
//     init() {
//         this.cacheDOM();
//         this.appendDOM();
//         this.defaultProjects();
//         displayTasks.init(this.myProjects[0]);
//         this.bindAddBtn();
//     },
//     cacheDOM() {
//         this.projectDisplay = document.querySelector('#projectDisplay');
//     },
//     appendDOM() {
//         this.projectContainer = document.createElement('ul');
//         this.projectContainer.setAttribute('id', 'projectContainer');
//         this.projectDisplay.appendChild(this.projectContainer);
        
//         this.hr = document.createElement('hr');
//         this.projectDisplay.appendChild(this.hr);
        
//         this.addBtn = document.createElement('button');
//         this.addBtn.setAttribute('id', 'addBtn');
//         this.addBtn.innerHTML = 'New Project';
//         this.projectDisplay.appendChild(this.addBtn);
//     },
//     bindEvents(project, tab, delBtn) {
//         tab.addEventListener('dblclick', () => {
//             this.renameProject(project, tab);
//         });

//         tab.addEventListener('click', () => {
//             displayTasks.init(project);
//         });
        
//         delBtn.addEventListener('click', () => {
//             this.removeProject(project, tab);
//         });
//     },
//     bindAddBtn() {        
//         this.addBtn.addEventListener('click', () => {
//             this.addProject();
//         });
//     },
//     addProject() {
//         const title = prompt('Name of new project', 'enter name');
//         const id = Project.projectCount;
//         const newProject = new Project(title, id);
//         this.myProjects.push(newProject);
//         this.render(newProject);
//     },
//     removeProject(project, tab) {
//         this.projectContainer.removeChild(tab);
//         this.myProjects.splice(project.id, 1)
//         this.cacheDOM();
//     },
//     renameProject(project, tab) {
//         const newTitle = prompt('New Title', 'Enter new title');
//         project.title = newTitle;
//         tab.innerHTML = newTitle;
//         // I should be able to just do render but the way I wrote render
//         // makes it "impossible" but it should be easy to rewroke adding
//         // a "createTab" function then rendering it
//     },
//     render(project) {
//         const tab = document.createElement('li');
//         tab.classList.add('project');
//         tab.innerHTML = project.title;
        
//         const delBtn = document.createElement('button');
//         delBtn.classList.add('delBtn');
//         delBtn.innerHTML = 'delete';
//         tab.appendChild(delBtn);

//         this.projectContainer.appendChild(tab);
//         this.bindEvents(project, tab, delBtn);
//         this.cacheDOM();
//     },
//     defaultProjects() {
//         const project1 = new Project('Irving B. is the best', 0)
//         const defaultTasks = [new Task('sup'), new Task('Test test test')];
//         project1.tasks = defaultTasks;
//         this.myProjects.push(project1);
       
//         const project2 = new Project('my baby boi', 1);
//         const defaultTasks2 = [new Task('Kylo Ren'), new Task('Is this working ?')];
//         project2.tasks = defaultTasks2;
//         this.myProjects.push(project2);

//         this.myProjects.push(new Project('so sad', 2));
//         this.myProjects.forEach((project) => {
//             this.render(project);
//         })
//     },
// }