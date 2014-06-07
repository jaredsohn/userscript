// ==UserScript==
// @name pomagajonline automatyczny klikacz
// ==/UserScript==
var klik = function(count){
    var list = document.getElementsByClassName("links-link-title")[count].click();
}

$(document).ready(function() {
    if (localStorage.count > 11)
    {
        localStorage.count = 0;
        return;
    }
    if(!localStorage.count) {
        localStorage.count = 0;   
    }
    var num = localStorage.count;
   
    klik(num);
    localStorage.count++;
    
});