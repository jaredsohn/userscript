 // ==UserScript==
 // @name           nemexia learning
 // @namespace      thanks to Insomniac http://insomniac-blog.net
 // @description    this script is a modification from modification from another modification of some other script.
 // @include        http://*.nemexia.com/*
 // ==/UserScript==

 //Configuration
var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'http://yanislav-ivanov.com/js/laboratory.js';
GM_JQ.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
 var links = [
     ['Spy scan'     , ''],
          
 ];
 //Code
 var menu = document.getElementById('hotLinksMenu');

 menu.appendChild(document.createElement('br'));

 var elemB, elemUL, elemLI, elemA;

 /* Links Menu */
 elemB  = document.createElement('b');
 elemB.appendChild(document.createTextNode('Links'));
 menu.appendChild(elemB)

 elemUL = document.createElement('ul');
 elemUL.setAttribute('class','dl');
 menu.appendChild(elemUL)

 for each ( var link in links ){
     elemLI = document.createElement('li');
     elemLI.setAttribute('class','dl');
	 elemA = document.createElement('a');
	 elemA.setAttribute('href','javascript:void(0);');
     elemA.setAttribute('onclick','startScan();');
	 elemA.setAttribute('class','action');
	 elemA.appendChild(document.createTextNode(link[0]));
     elemLI.appendChild(elemA);
     elemUL.appendChild(elemLI);
 }

obj=document.getElementById("premiumShield");
obj.id='';
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			return els[i];
		}
	}
}
obj=getElementsByClass("premiumButton");
obj.setAttribute("class", '');