import '../styles/main.scss';
import '../modules/nav-loading.js';
import * as bootstrap from 'bootstrap';

const model = document.getElementById("mp-model");
const url = "https://my.matterport.com/show/?m=aHJHNA6KFk5&play=1";
model.src = url;