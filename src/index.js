import "./styles.css";
import { taskApp } from "./taskApp.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('-------------------------------------');
    console.log('Sup boi, we are in DEVELOPMENT MODE !');
    console.log('-------------------------------------');
}

(function () {

    function header() {
        const nav = document.createElement('nav');
        const title = document.createElement('h1');
        title.innerHTML = 'To-do List';
        nav.appendChild(title);

        const hr = document.createElement('hr');
        nav.appendChild(hr);

        const projectDisplay = document.createElement('div');
        projectDisplay.setAttribute('id', 'projectDisplay')
        nav.appendChild(projectDisplay);

        const credits = document.createElement('div');
        credits.setAttribute('id', 'credits');
        credits.innerHTML = `made by <a href="https://github.com/cahdmus">@Cahdmus</a>`;
        nav.appendChild(credits);

        return nav;
    }

    function main() {
        const tasks = document.createElement('main');
        return tasks;
    }

    const content = document.querySelector('#content');
    content.appendChild(header());
    content.appendChild(main());
    taskApp.init();

})();
