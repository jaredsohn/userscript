// ==UserScript==
// @name           Error modal
// @namespace      http://userscripts.org/users/138558
// @description    Error modal
// ==/UserScript==

var i = document.getElementsByTagName('div').length
while(i--){
    if(document.getElementsByTagName('div')[i].innerHTML.match(/license error/)){
        var parent = document.getElementsByTagName('div')[i].parentNode;
        if(parent.style.zIndex == 30000){
            parent.parentNode.removeChild(parent);
            i--;
        }
    }
}