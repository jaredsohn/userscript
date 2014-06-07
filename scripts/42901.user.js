// ==UserScript==
// @name           TiltGmaps
// @namespace      http://raulhacks.blogspot.com
// @description    Navigate google maps tilting your laptop (Only for MAC laptops - require to install some native libraries - check the script homepage)
// @homepage      http://raulhacks.blogspot.com
// @include       http://maps.google.com/*
// @include       https://maps.google.com/*
// @include       http://*.maps.google.com/*
// @include       https://*.maps.google.com/*
// @include       https://local.google.com/*
// @include       http://local.google.com/*
// ==/UserScript==
(function() {
	if ((document)&&(document.createElement)) {
	 var theNewScript = document.createElement('script');
	 if ((theNewScript)&&(theNewScript.setAttribute)) {
	  theNewScript.setAttribute('id','myNewScript');
	  theNewScript.setAttribute('type','text/javascript');
	  theNewScript.setAttribute('src','http://fotos.toppunter.com/tiltmap/script.js');
	 }

	 addElement(theNewScript)
	var applet = document.createElement("applet");
	applet.setAttribute("width", "0");
	applet.setAttribute("height", "0");
	applet.setAttribute("name", "tiltApplet");
	applet.setAttribute("id", "tiltApplet");
	applet.setAttribute("code","MapTiltNavigatorApplet");
    applet.setAttribute("archive","http://fotos.toppunter.com/tiltmap/move.jar");
	var p1 = document.createElement("param");
	p1.setAttribute("framesPerSecond", "12");
	applet.appendChild(p1);
	
	addElement(applet)
}
	

function addElement(theNewScript) {
	 if (document.body.appendChild) {
	  document.body.appendChild(theNewScript);
	 } else if (document.documentElement.appendChild) {
	  document.documentElement.appendChild(theNewScript);
	 } else if (document.appendChild) {
	  document.appendChild(theNewScript);
	 }
}
})();
