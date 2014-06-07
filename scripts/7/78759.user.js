// ==UserScript==
// @name           hide Slayer
// @namespace      hide_Slayer
// @description    hide all threads created by Slayer
// @include        http://www.tagz.com/forum_room.asp*
// ==/UserScript==

var allB = document.getElementsByTagName("b");

for ( var i in allB)
{
    var b=allB[i];
    if (b.innerHTML=="slayer1974"){

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