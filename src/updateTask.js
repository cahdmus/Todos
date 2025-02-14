import { Project, Task } from "./constructors";
import { makeDOM, formater } from "./utils";

const updateTask = {
    init(task) {
        this.cacheDOM()
        this.loadTab(task)
    },
    cacheDOM() {
        this.container = document.querySelector('main');
        
    },
    loadTab(task) {
        this.updateTab = makeDOM.id('updateTab', 'div');
        this.updateTab.appendChild(this.title(task.title))
        // this.updateTab.innerHTML = 'sup';
        this.container.appendChild(this.updateTab);
    },
    title(title) {
        return makeDOM.id('projectTitle', 'h1', title)
    }
}

export { updateTask }