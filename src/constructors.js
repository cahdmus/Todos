class Project {
    static projectCount = 0;

    constructor(title, id) {
        Project.projectCount++;
        this.title = title;
        this.id = id;
        this.tasks = [];
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
    constructor(title, desc, priority, dueDate) {
        super(title);
        this.desc = desc;
        this.priority = priority;
        this.dueDate = dueDate;
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