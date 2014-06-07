// ==UserScript==
// @name           Document Start Test
// @namespace      vidzbigger.com
// @description    This scrip tests document-start
// @include        http://www.google.com/
// @run-at         document-start
// ==/UserScript==

function onDomContentLoaded(){
	document.body.appendChild(document.createTextNode('Code that executes at DOMContentLoaded'));
}

if( !document.body ){
	alert(' Hello!  You are now running at document start! ');
}else{
	alert(' Hello!  Script is running at domContentLoaded ' );
}

document.addEventListener('DOMContentLoaded',onDomContentLoaded,true);