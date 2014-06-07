// ==UserScript== 
// @name Clean Bing Home Page
// @namespace http://www.yaelkmillerdemo.com
// @description Cleans up Bing's home page so you can search without distractions.
// @include     http://www.bing.com/
// @include     https://www.bing.com/
// @version 2.0
// ==/UserScript==
function clean(first) {
    var child = document.getElementById(first);
    child.parentNode.removeChild(child);
}

function deleteClass(names) {
    var x = document.getElementsByClassName(names);
    for(var i = 0; i<names.length; i++) {
        if(names[i].parentNode){
            names[i].parentNode.removeChild(names[i]);
        }
    }
}

window.addEventListener('DOMContentLoaded', function(){
    clean("bgDiv");
    clean("hp_ctrls");
    setTimeout(function(){
        clean("hp_tbar");
        deleteClass("sh_hst");
        deleteClass("pluginConnectButtonLayoutRoot");
    }, 1000);
}, false);