// ==UserScript==
// @name           hide kourie
// @namespace      hide_kourie
// @description    hide all threads created by kourie
// @include        http://www.tagz.com/*
// ==/UserScript==

var allB = document.getElementsByTagName("b");

for ( var i in allB)
{
    var b=allB[i];
    if (b.innerHTML=="kourie"){

        var td=b.parentNode
            .parentNode
            .parentNode
            .parentNode
            .parentNode
            .parentNode
            .parentNode;
        tr=td.parentNode ;     
        td2=tr.childNodes[11];

        if (td2 != td){ 
           tr.style.display="none";
        }
    }
}