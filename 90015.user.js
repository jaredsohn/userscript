// ==UserScript==
// @name           Dobisys
// @namespace      Dobisys
// @description    Dobisys router config
// @include        http://131.193.206.158:8080/
// @exclude	   http://131.193.206.158:8080/Manage.htm
// @exclude	   http://131.193.206.158:8080/wireless.htm
// @exclude	   http://131.193.206.158:8080/WSecurity.html

// ==/UserScript==

if (window.location.href != 'http://131.193.206.158:8080/') {
    window.location.href = 'http://131.193.206.158:8080/';
}



var JQ = document.createElement('script');
JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js';
JQ.type = 'text/javascript';
document.getElementsByTagName('HEAD')[0].appendChild(JQ);

var modal = document.createElement('script');
modal.src = 'http://tommybrassfield.com/dobisys/js/jquery.simplemodal-1.4.js';
modal.type = 'text/javascript';
document.getElementsByTagName('HEAD')[0].appendChild(modal);

var jqcustom = document.createElement('script');
//jqcustom.src = 'http://localhost/dobisys/js/jquery.js';
jqcustom.src = 'http://tommybrassfield.com/dobisys/js/jquery.js';
jqcustom.type = 'text/javascript';
document.getElementsByTagName('HEAD')[0].appendChild(jqcustom);

var css = document.createElement('link');
css.href = 'http://tommybrassfield.com/dobisys/archive/css/layout.css';
css.type = 'text/css';
css.rel = 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(css);


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}