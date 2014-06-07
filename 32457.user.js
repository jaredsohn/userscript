// ==UserScript==
// @name           UserScript Finder
// @namespace      *
// @include        *
// ==/UserScript==

if(location.href.indexOf("http://")+1)
{

	var input1=document.createElement("input");
	input1.setAttribute("type","button");
	input1.setAttribute("value","Find Script");
	input1.setAttribute("onClick","var searchPath=\"http://userscripts.org/scripts/search?q=\";var q=location.href.split(\"/\")[2].split(\".\");window.open(searchPath+q[q.length-2]);");

	var input2=document.createElement("input");
	input2.setAttribute("type","button");
	input2.setAttribute("value","X");
	input2.setAttribute("onClick","document.getElementById(\"UFdiv\").style.display=\"none\"");

	var ediv=document.createElement("div");
	ediv.setAttribute("id","UFdiv");
	ediv.setAttribute("style","position:fixed;bottom:0px;right:0px;z-index:10001;");
	ediv.appendChild(input1);
	ediv.appendChild(input2);
	document.documentElement.appendChild(ediv);

}