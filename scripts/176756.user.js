// ==UserScript==
// @name        Block AD in jandan 煎蛋
// @namespace   Block AD in jandan 煎蛋
// @description Block AD in jandan 煎蛋
// @include     http://jandan.net/*
// @version     1.0
// @grant       none
// @author      loms126
// ==/UserScript==

arry_Node=document.querySelectorAll('h3')

for (i=0;i<arry_Node.length;i++)
{
	if(arry_Node[i].innerText=="SPONSORS")
	{
		arry_Node[i].nextSibling.nextSibling.remove()
		arry_Node[i].remove()	
	}

}
