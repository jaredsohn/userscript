// ==UserScript==
// @name           LazyGrils.info Navigator Extender
// @namespace      faleij
// @description    extends the navigator
// @include        http*//*.lazygirls.info/*loc=*
// ==/UserScript==
var insertAfter = function (oldNode,newNode) { oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling); }

var loc = window.location.search.substr(1).split("&");
for(var x in loc)
{
	if(loc[x].substr(0,3) == "loc")
	{
		loc = parseInt(loc[x].split("=")[1]);
		break;
	}
}

var lastLink = document.querySelector("table:nth-of-type(4) nobr>a[href='?loc="+(loc+8)+"']");
var firstLink = lastLink.previousSibling.previousSibling;
var endLink = lastLink.nextSibling.nextSibling;
var startLink = firstLink.previousSibling.previousSibling;
var end = parseInt(endLink.innerHTML);
var start = parseInt(startLink.innerHTML);

for(var i = 2; i < 6; i++)
{
    if(parseInt(lastLink.innerHTML)+1 != end)
	{
	var link = document.createElement("a");
	var text = document.createTextNode(",");
	
	link.setAttribute("href", "?loc="+(loc+(i*8)));
	link.innerHTML = parseInt(lastLink.innerHTML)+1;
	
    insertAfter(lastLink,link);
	lastLink = link;
	lastLink.parentNode.insertBefore(text,lastLink);
	}
	
	if(loc>=(8*6) && parseInt(firstLink.innerHTML)-1 != start)
	{
	
	var plink = document.createElement("a");
	var ptext = document.createTextNode(",");
	
	plink.setAttribute("href", "?loc="+(loc-(i*8)));
	plink.innerHTML = parseInt(firstLink.innerHTML)-1;
    firstLink.parentNode.insertBefore(plink,firstLink);
	firstLink = plink;
	insertAfter(firstLink,ptext);
	}
}