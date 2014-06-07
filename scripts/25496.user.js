// ==UserScript==
// @name           Enhance Userscripts forums
// @namespace      http://userscripts.org/users/28612
//@description   Removes the right sidebar giving more space to the forum content and changes all the links to open in a new page
//@version        0.01.00
// @include        http://userscripts.org/forums*
// ==/UserScript==

enhanceForums();

function enhanceForums()
{
	var div1=document.getElementById("content");
	var div2=document.getElementById("right");
	
	div1.setAttribute("style","width:100%");
	div2.parentNode.removeChild(div2);
	while(div2.childNodes.length!=0)
	{
		var element1=div2.firstChild;
		div2.removeChild(element1);
		if (element1.nodeType==1 && element1.getElementsByTagName("INPUT").length!=0)
		{
			div1.insertBefore(element1,div1.firstChild);
			element1.setAttribute("style","float:right; padding: 0px 0px 0px 10px;");
		}
	}
	
	var links=div1.getElementsByTagName("A");
	for (var num1=0;num1<links.length;num1++)
	{
		var link1=links[num1];
		if (link1.href && link1.href.indexOf("/forums/")!=-1) link1.setAttribute("target","_blank");
	}
}