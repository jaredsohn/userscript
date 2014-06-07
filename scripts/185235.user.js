// ==UserScript==
// @author    	bodinho
// @name        Teracod - Nagyobb üzenőfal
// @description Az főoldalon lévő üzenőfal méretét növeli 600px magasra
// @include     http://teracod.com/main
// @version     1.1
// @grant       none
// ==/UserScript==




function addGlobalStyle(css){

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	
}

addGlobalStyle('[style="height:300px;overflow-y:scroll;"]{height: 600px !important;}')

