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
    }
}


import { format } from "date-fns";
const formater = {
    date(date) {
        // 'year, month, day'
        // '1995, 9, 2'
        return (date === undefined) ? 'no due date' 
            : format(new Date(date), 'eee dd MMM');
    }
}

export { makeDOM, formater }
