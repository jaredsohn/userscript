// ==UserScript==

// @name           oc.at

// @namespace      oc

// @include        http://www.overclockers.at/*

// ==/UserScript==

 var css =

     // Changes quick reply box background and text color
     "TEXTAREA { background-color: #426289 !important; color: #ffffff !important; border: thin solid black !important;}"+

// Changes the select objects
	"select {background-color: #EBF1F7 !important; border: thin solid black !important;}"+

     "";

 function addGlobalStyle(cssstyle)
 {
     var head, style;
     head = document.getElementsByTagName('head')[0];
     if (!head) { return; }
     style = document.createElement('style');
     style.type = 'text/css';
     style.innerHTML = cssstyle;
     head.appendChild(style);
 }

 addGlobalStyle(css);