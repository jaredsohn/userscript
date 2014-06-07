// ==UserScript==
// @name           Boards Begone
// @namespace      pendevin
// @description    Replaces the boards with a friendly reminder to resist temptation
// @include        http://endoftheinter.net/main.php
// @include        https://endoftheinter.net/main.php
// @include        http://boards.endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// @include        http://archives.endoftheinter.net/*
// @include        https://archives.endoftheinter.net/*
// ==/UserScript==

//returns a new element with (tag, id(optional), classname(optional), innerHTML(optional))
//if you want any other attributes, add arrays to the end of the arguments with [attribute,value]
//this might be cooler using JSON, but i could be wrong---probably
//for the attributes, use the html versions not the dom versions
function addElm(tag,id,className,innerHTML){
	var newElm=document.createElement(tag);
	if(id!=undefined&&id!=null)newElm.id=id;
	if(className!=undefined&&className!=null)newElm.className=className;
	if(innerHTML!=undefined&&innerHTML!=null)typeof innerHTML=="string"?newElm.innerHTML=innerHTML:newElm.appendChild(innerHTML);
	for(var i=4;i<arguments.length;i++)newElm.setAttribute(arguments[i][0],arguments[i][1]);
	return newElm;
}

if(window.location=="http://endoftheinter.net/main.php"||window.location=="https://endoftheinter.net/main.php"){document.getElementsByClassName("grid")[0].style.display="none";}
else{
	var body=document.getElementsByClassName("body")[0];
	for(var i=1;i<body.children.length;i++){body.children[i].style.display="none";}
	var warning=addElm("h2",null,null,"You probably shouldn't be going to the boards right now. Try the <a href='http://links.endoftheinter.net/links.php?mode=new'>links</a>.");
	body.appendChild(warning);
}