// ==UserScript==
// @name          TGP Direct Linker
// @description	  Bypasses bounces for TGP links, and always takes you direct to the destination.
// @include       http://*
// ==/UserScript==

var allHrefs, thisHref;
var numHtmls = 0;
allHrefs = document.getElementsByTagName('a');

var regexp, ar;
for (var i = 0; i < allHrefs.length; i++) {
    thisHref = allHrefs[i];
    var url = thisHref.href;

    regexp = /url=([^&>"']+)/i;
    ar = regexp.exec(url);
    if( ar ) {
	thisHref.href = URLDecode(ar[1]);
    }

    regexp = /[?&]u=([^&>"']+)/i;
    ar = regexp.exec(url);
    if( ar ) {
	thisHref.href = URLDecode(ar[1]);
    }

}
function URLDecode(encoded)
{
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
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
				alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext;
};
