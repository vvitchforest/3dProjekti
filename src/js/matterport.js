import '../styles/main.scss';
import * as bootstrap from 'bootstrap';

const model = document.getElementById("mp-model");
const url = "https://my.matterport.com/show/?m=aHJHNA6KFk5&play=1";
model.src = url;

//Check if DOM is loaded
let domReady = (cb) => {
    document.readyState === 'interactive' || document.readyState === 'complete'
      ? cb()
      : document.addEventListener('DOMContentLoaded', cb);
  };
  
  domReady(() => {
    // Display body when DOM is loaded. This is to prevent the flash of unstyled html content on load
    document.body.style.visibility = 'visible';
  });
  