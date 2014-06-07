// ==UserScript==
// @name           Laptopmag - gallery cleanup
// @namespace      http://userscripts.org/users/lorriman
// @description    Makes awkward galleries easier to view on smaller screens
// @include        http://www.laptopmag.com/review/newgallery.aspx*
// @version        .1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getById(id){
	return document.getElementById(id);
}

function ifId(id,func){
	if(element=getById(id)){
		return func(element);
	}else{
		return null;
	}	
}

function displayNone(item){
	item.style.display='none';
}

ifId('imagewrapper',displayNone);

imagewrapper=document.getElementById('imagewrapper');

div=imagewrapper.nextSibling.nextSibling;
div.setAttribute('style','float: left; width: 775px; vertical-align: middle; margin-top: 0px;');

displayNone(document.getElementById('hlLogo').parentNode.parentNode);
h1=document.getElementsByTagName('h1')[0];
bc=document.getElementsByClassName('bc')[0].style.display='none';

//this code to strip out text elements and restore title, for the future
for(i=0;i<bc.childNodes.length;i++){
	child=bc.childNodes[i];
	bc.removeChild(child);
}

h1.style.display='true';
