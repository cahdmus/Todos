import "./styles.css";
import { taskApp } from "./taskApp.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('-------------------------------------');
    console.log('Sup boi, we are in DEVELOPMENT MODE !');
    console.log('-------------------------------------');
}

const content = document.querySelector('#content');

function header() {
    const nav = document.createElement('nav');
    const title = document.createElement('h1');
    title.innerHTML = 'To-do List';
    nav.appendChild(title);

    const hr = document.createElement('hr');
    nav.appendChild(hr);
    
    nav.appendChild(taskApp.displayNav());
    // projects.addProject();
    
    const credits = document.createElement('div');
    credits.setAttribute('id', 'credits');
    credits.innerHTML = 'made by @Cahdmus';
    nav.appendChild(credits);
    
    return nav;
}
content.appendChild(header());

function main() {
    const tasks = document.createElement('main');
    const title = document.createElement('h1');
    title.innerHTML = 'Project Name';
    tasks.appendChild(title);
    const text = document.createElement('p');
    text.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elit leo, lacinia quis eleifend non, tristique a velit. Sed sit amet imperdiet dolor. Etiam maximus nunc ligula, ut dictum odio fringilla eget. Praesent gravida turpis velit, ut maximus diam malesuada ut. Praesent condimentum vulputate magna, eu maximus nibh tempus sed. Phasellus lacinia vel metus ut bibendum. Etiam semper blandit vulputate. Pellentesque ac urna libero. Pellentesque at justo erat. Proin ut porttitor felis. Phasellus ut faucibus ante. Nullam et purus eu urna rutrum efficitur et vel lorem. Praesent malesuada purus nec metus sodales, id tempus mi bibendum. Duis eu augue ex. ';
    tasks.appendChild(text);

    return tasks;
}
content.appendChild(main());
