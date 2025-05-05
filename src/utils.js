const makeDOM = {
    class(name, type, value) {
        const el = this.element(type, value);
        el.classList.add(name);
        return el;
    },
    id(name, type, value) {
        const el = this.element(type, value);
        el.setAttribute('id', name);
        return el
    },
    element(type, value) {
        const el = document.createElement(type);
        (value === undefined) ? el : el.innerHTML = value;
        return el;
    },
    hr(container) {
        const hr = document.createElement('hr');
        container.appendChild(hr);
    },
    br(container) {
        const br = document.createElement('br');
        container.appendChild(br);
    },
    formItem(name, type, value, container) {
        const label = this.element('label', value);
        label.setAttribute('for', name);
        const input = this.id(name, 'input');
        input.setAttribute('type', type)
        input.setAttribute('name', name)

        container.appendChild(label)
        return { input }
        // container.appendChild(input)
    }, 
    formRadio(legend, radioItems) {
        const fieldset = this.element('fieldset');

        Array.from(radioItems).forEach(item => {
            const display = this.formItem(item, 'radio', item, fieldset)
            display.input.setAttribute('name', legend)
            fieldset.appendChild(display.input)
        });

        return fieldset
    }
}

const saveLocal = {
    project(project) {
        const projectsSave = JSON.stringify(project);
        // console.log(this.userProjects);
        // console.log(JSON.parse(projectsSave));
        localStorage.setItem("userProjects", projectsSave);
    }
}


import { format } from "date-fns";
const formater = {
    date(date) {
        // 'year, month, day'
        // '1995, 9, 2'
        
        return (date === undefined || date.length === 0) ? 'no due date' 
            : format(new Date(date.replace(/-/g, ", ")), 'eee dd MMM');
    }
}

export { makeDOM, formater, saveLocal }
