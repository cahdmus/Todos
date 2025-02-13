import "./styles.css";
import { taskApp } from "./taskApp.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('-------------------------------------');
    console.log('Sup boi, we are in DEVELOPMENT MODE !');
    console.log('-------------------------------------');
}

taskApp.init();