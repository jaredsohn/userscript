// ==UserScript==
// @name           HtmlWebUIMininovaSearch
// @namespace      http://userscripts.org/people/35269
// @include        http://*:6886/*
// @description	  Script adds a search link to mininova for a downloading item from the Azureus HTMLWebUI interface
// @date          2006-10-17
// @version       0.1
// @GM_version    0.6.4
// ==/UserScript==

var elements=document.getElementsByTagName('span'); 
  var i=0;
  while (elements[i]){
	if (elements[i].className.match('a1')) {
		var theTD = elements[i].parentNode;
		
		var newButton=document.createElement('span');
		var theTarget = "http://www.mininova.org/search/?search=";
		theTarget = theTarget + elements[i].firstChild.firstChild.nodeValue;
		newButton.innerHTML='<a href="'+theTarget+'">Mininova</a>';
		//theTD.insertBefore(newButton,elements[i]);
		theTD.appendChild(newButton);
	
	
	}
	i++; 
	
  }
	