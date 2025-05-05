import { Project, Task } from "./constructors";
import { makeDOM } from "./utils";
import { projectsModule } from "./projectsModule";

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

const taskApp = {

    userProjects: [],
    init() {
        if (storageAvailable("localStorage") && localStorage.getItem('userProjects')) {
            // console.log(JSON.parse(localStorage.getItem('userProjects')))
            this.userProjects = JSON.parse(localStorage.getItem('userProjects'));
        } else {
            this.defaultProject();
            console.log('nothing in local storage')
        }
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
        let task1 = new Task(`I'm a simple checked task`, '', '', '', true);
        let task2 = new Task(`I'm a task with a priority and a due date`, '', 'Low', '09-02-1995', false);
        let task3 = new Task(`I'm a task with a description and a different priority`, `Double click on a task to edit it !`, 'High', '', false);
        const defaultTasks = [task1, task2, task3];
        defaultProject.tasks = defaultTasks;
        this.userProjects.push(defaultProject);
    }
}

export { taskApp };