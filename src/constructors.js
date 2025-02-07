class Project {
    constructor(title) {
        this.title = title;
        this.tasks = {}
    }

    get title() {
        return this._title;
    }
    set title(value) {
        (value.length >= 3) ? 
        this._title = value : alert('Too long or too short');
    }

    // get tasks() {
    //     return this.tasks;
    // }
    // set tasks(value) {
    //     this.tasks.push(new Task(value));
    // }
}

class Task extends Project {
    constructor(desc) {
        this.desc = desc;
        this.isDone = false;
        // this.dueDate = dueDate;
        // this.priority = priority;
        // this.notes = notes;
    }

    get desc() {
        return this._desc;
    }
    set desc(value) {
        this._desc = value;
    }
    
    // get dueDate() {
    //     return this._dueDate;
    // }
    // set dueDate(value) {
    //     this._dueDate = value;
    // }

    // get priority() {
    //     return this._priority;
    // }
    // set priority(value) {
    //     this._priority = value;
    // }

    // get notes() {
    //     return this._notes;
    // }
    // set notes(value) {
    //     this._notes = value;
    // }

}

export { Project, Task }