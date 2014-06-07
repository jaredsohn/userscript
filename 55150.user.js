// ==UserScript==
// @name           EVE Online - Forums - Auto External Link
// @namespace      http://userscripts.org/users/10789
// @include        http://www.eveonline.com/*
// ==/UserScript==

//window.location = URLDecode(window.location.href.split("=",2)[1]);


var allLinks, thisLink;
allLinks = document.evaluate(
             '//a[@href]',
             document,
             null,
             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
             null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if (thisLink.href.indexOf("http://www.eveonline.com/externalLink.aspx?") != -1)
	{
		var temp = thisLink.href.split("=",2)[1];
		var another = "" + temp;
		thisLink.href = URLDecode(another);
	}
}

function URLDecode(myurl)
{
   // Replace + with ' '
   // Replace %xx with equivalent character
   // Put [ERROR] in output if %xx is invalid.
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var encoded = myurl;//document.URLForm.F2.value;
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
