// ==UserScript==
// @name           skyrates.com shrink carriers.php
// @namespace      http://userscripts.org/scripts/show/83173
// @include        http://skyrates.net/carriers.php
// @version        1.0
// ==/UserScript==

// Add CSS

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.odd { background-color: #ddd; }');
addGlobalStyle('.even { background-color: #fff; }');
addGlobalStyle('h1,h2,h3,center,div { font-size: smaller; }');
addGlobalStyle('table { border-collapse: collapse; }');

// Add js 
var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'http://skyrates.zo.com/sortable_us.js';
GM_JQ.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(GM_JQ); 

(function(){
    var l = document.getElementsByTagName("table");
    var i = l.length; 
    while (i--) {
        l[i].setAttribute("cellpadding", "0");
        l[i].setAttribute("class", "sortable");
	l[i].setAttribute("id", "sortabletable");
    }
    
    var ltd = l[0].getElementsByTagName("td");
    var itd = ltd.length; 
    while (itd--) {
        ltd[itd].setAttribute("align", "center");
    }
    
})();
