// ==UserScript==
// @name          Google Link Information
// @namespace     http://radiozz.freeblog.hu/
// @description   Adds description to links pointing to a Google Search Result.
// @include       *
// ==/UserScript==

var as=document.getElementsByTagName("a");
var link;

for (i=0;i<as.length;i++) {
	link=as[i].getAttribute("href");
	if (link!=null && link.search("http://www.google.")>-1) {
		start=link.search("&q=");
		if (start==-1) start=link.search("?q=");
		resz=link.substr(start+3);
		veg=resz.search("&");
		resz=URLDecode(resz.substr(0, veg));
		
		as[i].setAttribute("title", 'Google Search: "'+resz+'"');
	}
}

function URLDecode(instr)
{
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var encoded = instr;
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	}
   return plaintext;
};