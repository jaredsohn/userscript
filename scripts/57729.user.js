// ==UserScript==
// @name copyEnable
// @description	Private script.
// @include http://gg
// @include http://gg
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#overlay{display: none !important;}')

window.addEventListener('load',function(){
 var dhref = document.location.href;
 if(dhref=='http://gg') { document.forms[0].submit(); }
}, false); 

window.addEventListener('load',function(){
 var dhref = document.location.href;
 if(dhref=='http://gg') { document.forms[0].submit(); }
}, false); 