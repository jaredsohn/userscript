// ==UserScript==
// @name        Hide Every Image
// @namespace   http://userscripts.org
// @description hides all images, makes bg black in google image search
// @version     2
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    console.log('run');
}
addGlobalStyle (
'img { display:none !important; }'
); 
addGlobalStyle (
'.rg_l { background-color:black; }'
); 
var di=document.images;
di.style.display='none!important';
var elmModify = document.getElementsByClassName("rg_1");
elmModify.style.backgroundColor = 'black';