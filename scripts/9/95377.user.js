// ==UserScript==
// @name           google
// @namespace      http://userscripts.org/users/berlin
// @include        http://www.google.it/
// ==/UserScript==

var url = "http://www.http://www.google.it/#hl=it&source=hp&biw=1045&bih=506&q=testo&aq=f&aqi=g10&aql=&oq=&fp=6e488ba7b7b3fe34";
var xmlhttp = false;
try {
   xmlhttp=new XMLHttpRequest();
   alert("Problema");
  } catch (E) {
   xmlhttp = false;
  }

if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		xmlhttp=false;
	}
}
if (!xmlhttp && window.createRequest) {
	try {
		xmlhttp = window.createRequest();
	} catch (e) {
		xmlhttp=false;
	}
}
  xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
   alert(xmlhttp.responseText())
  }
 }
 xmlhttp.send(null)
 alert("Hello world");
}
var strRc = xmlhttp.responseText(); 
