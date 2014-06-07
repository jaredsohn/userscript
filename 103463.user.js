// ==UserScript==
// @name           Search Kongregate Forum
// @namespace      http://userscripts.org/user100
// @include        http://www.kongregate.com/forums/*
// ==/UserScript==

addSearchBox();
changeTarget(document.body);
document.addEventListener("DOMNodeInserted",function(e){changeTarget(e.target);},false);

function addSearchBox()
{
	var form=document.createElement("form");
	form.id="search";
	form.method="GET";
	form.target="_blank";
	form.action="http://www.google.com/search";
	form.setAttribute("style","border:1px solid black;padding:1px;");
	form.innerHTML="<dl><dt><input type='text' name='q' tabindex='1' class='hintable' style='font-size:11px;'/><input type='hidden' name='as_q' value='site:"+location.host+location.pathname+"' /><input type='hidden' name='num' value='100'/><input type='hidden' name='newwindow' value='1'/></dt><dd><input type='submit' value='Search' tabindex='2' class='spritesite'/></dd></dl>";
	var el=document.getElementById("sidebar");
	el.insertBefore(form,el.firstChild);
}

function changeTarget(container)
{
	var text=location.host+location.pathname;
	Array.forEach(container.getElementsByTagName("a"),function(l){if (l.href.indexOf(text)!=-1) l.target="_blank";});
}