// ==UserScript==
// @name           RS - Enable World Links
// @namespace      frostedfreeze@gmail.com
// @description    Full worlds have links. Works with HD mode, safe mode, the Java type you set, and German servers.
// @include        http://*runescape.com/*sl*.ws*
// ==/UserScript==

td=document.getElementsByTagName('td');

javaTypes=['LC','9s','B8','XH','kK','yf','cW','Vv','Cn','rf','ZS'] // First two letters scraped from a cookie test. Not the whole cookie itself, but enough to determine which Java type the person's using.

l="";
p=0; // Java is set to default if it can't be determined.
g="";
s="";

if(window.location.href.indexOf("l=1")>-1) {
	l="l=1/";
}

if(window.location.href.indexOf("safe")>-1) {
	s=",s1"
}

if(window.location.href.indexOf("opengl")>-1) {
	g=",g1";
}

javaType=readCookie("settings").substring(0, 2);

for(i=0;i<javaTypes.length;i++) {
	if(javaType==javaTypes[i]) {
		if(i>4) {
			p+=1;
		}
		if(i>7) {
			p+=1;
		}
	}
}

for(i=0;i<td.length;i++) {
	if(td[i].innerHTML=="FULL"||td[i].innerHTML=="VOLL"||td[i].innerHTML=="OFFLINE") {
		td[i].innerHTML=td[i].innerHTML.replace("FULL","1981 Players");
		td[i].innerHTML=td[i].innerHTML.replace("VOLL","1981 Spieler");
		worldNumber=parseInt(td[i-1].innerHTML.substring(td[i-1].innerHTML.indexOf(" ")+1));
		td[i-1].innerHTML="<a href=\"http://world"+worldNumber+".runescape.com/"+l+"p"+p+g+s+"\">"+td[i-1].innerHTML+"</a>";
	}
}

function readCookie(name) { // I got this from ajaxtutorial.net; not mine.
  var ca = document.cookie.split(';');
  var nameEQ = name + "=";
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length); //delete spaces
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
  return "";
}