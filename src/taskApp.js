import { Project, Task } from "./constructors";
import { makeDOM } from "./utils";
import { projectsModule } from "./projectsModule";

const taskApp = {

    userProjects: [],
    init() {
        this.defaultProject();
        this.cacheDOM();
        this.displayPage();
    },
    cacheDOM() {
        this.content = document.querySelector('#content');
    },
    displayPage() {
        this.nav = makeDOM.element('nav');
        this.title = makeDOM.id('title', 'h1', 'To-do List');
        this.nav.appendChild(this.title);
        makeDOM.hr(this.nav);
        
        this.content.appendChild(this.nav);
        this.displayMain();
        this.nav.appendChild(projectsModule.init(this.userProjects));
        
        this.credits = makeDOM.id('credits', 'div', `made by <a href="https://github.com/cahdmus">@Cahdmus</a>`)
        this.nav.appendChild(this.credits);
    },
    displayMain() {
        this.main = makeDOM.element('main');
        this.projectDisplay = makeDOM.id('projectDisplay', 'div')
        this.main.appendChild(this.projectDisplay);
        this.content.appendChild(this.main);
    },
    defaultProject() {
        const defaultProject = new Project('Default Project', 0);
        const defaultTasks = [new Task('Irving B. is the best'), new Task('My baby boi'), new Task('so sad')];
        defaultProject.tasks = defaultTasks;
        this.userProjects.push(defaultProject);
        
        const defaultProject2 = new Project('Kylo Ren', 1);
        const defaultTasks2 = [new Task('Sup my boy'), new Task('test test')];
        defaultProject2.tasks = defaultTasks2;
        this.userProjects.push(defaultProject2);
    }
}

export { taskApp };