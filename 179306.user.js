// ==UserScript==
// @name        Hide Script Posts [FACEBOOK / KITCHEN STUFF]
// @namespace   http://localhost
// @include     http://userscripts.org/
// @include     http://userscripts.org/scripts*
// @version     1.1
// @grant       none
// ==/UserScript==



for(var i=0; i<30; i++){
    x=document.querySelectorAll('td.script-meat');
    
    if(x[i].innerHTML.toString().match(/facebook|kitchen/ig)){
        x[i].parentNode.style.display='none';   
    }   

}

