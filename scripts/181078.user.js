// ==UserScript==
// @name           openSSinNewTab
// @namespace      http://www.somethingselse.com
// @description    OpenScreenShot(SS)inNewTab Script for Pink Lover :P
// @include        *hai.com/details.php*
// ==/UserScript==

if(document.getElementsByTagName('td')[23].innerHTML == "Description")	
    var element_num = 24;
else
    var element_num = 26;

function openss(event){
    var descnode = document.getElementsByTagName('td')[element_num];
    for(i=0;i<descnode.childNodes.length;i++){
        urlvar=descnode.childNodes[i].innerHTML;
        if(urlvar==null || urlvar=="")
            continue;
        else 
            GM_openInTab(urlvar);
        
    }
}

var tElem = document.getElementsByTagName('td')[23];
tElem.innerHTML = tElem.innerHTML + " <a href='#' id='openallss'><img src='http://image.ohozaa.com/i/2d4/pJXF1O.gif' style='border:none;'></a>";

document.getElementById('openallss').addEventListener("click", openss, true);