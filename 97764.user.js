// ==UserScript==
// @name           Show Threads
// @namespace      cs.odu.edu
// @description    Shows locked for Professors Zeils CS pages at Old Dominion University (ODU)
// @include        https://secweb.cs.odu.edu/%7Ezeil/*/displayThread.cgi*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var i = 1;
var f = 1;
for (x in divs){
y = divs[x];
if(/_quotable_/g.test(y.id)){
y.style.removeProperty("display");
y.style.setProperty("border","3px solid",null);
y.style.setProperty("padding","3px",null);
y.style.setProperty("background-color",(i==1)?"#CCF":"#CFC",null);
y.style.setProperty("width","100px",null);
i = (i==1)?2:1;
}

if(/_quotable_\d/g.test(y.id)){
y.style.removeProperty("display");
y.style.setProperty("border","3px solid",null);
y.style.setProperty("padding","3px",null);
y.style.setProperty("margin","-3px 0px 5px 0px",null);
y.style.setProperty("background-color",(f==1)?"#CCF":"#CFC",null);
f = (f==1)?2:1;
}
}



