// ==UserScript==
// @name          MMU Bulletin
// @author         Dineshmike
// @include       http://bulletin.mmu.edu.my/v3/view/*
// ==/UserScript==

var link;
var a;
var b;
var index1;
var index2;
var str;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    
    str = link[i].href;
    if(str.indexOf("javascript:open_att") != -1)
   {
   	index1 = str.indexOf("'",0) + 1;
	str = str.substr(index1);
    	index2 = str.indexOf("'",0);
     	a = str.substring(0,index2);
     	str = str.substr(index2+3);
    	index2 = str.indexOf("'",0);
    	b = str.substring(0,index2);

    	link[i].href = "http://bulletin.mmu.edu.my/v3/view/download.mmu?a=" + a + "&b=" + b;
     }
}
