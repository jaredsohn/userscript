// CleanMail
// version 1.0
// 2007-04-04
// Copyright (c) 2007, Brajesh Sachan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          CleanMail
// @description   Removes ads from Gmail, widens email body
// @author        Brajesh
// @version       1.0
// @include       http://mail.google.com/*
// @include       https://mail.google/com/*
// ==/UserScript==

// removing ads & making email body wider
if(document.getElementById("rh")!=null)
	document.getElementById("rh").parentNode.removeChild(document.getElementById("rh"));

if(document.getElementById("ra")!=null)
	document.getElementById("ra").parentNode.removeChild(document.getElementById("ra"));
	
if(document.getElementById("rb")!=null)
	document.getElementById("rb").parentNode.removeChild(document.getElementById("rb"));
	
if(document.getElementById("fic")!=null)	
	document.getElementById("fic").style.width="100%";