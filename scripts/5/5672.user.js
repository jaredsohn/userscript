// ==UserScript==
// @name           travian
// @namespace      
// @description    Travian Tool
// @author     	   Ankur Saxena
// @include        *travian.com*
// @version			1.0
// ==/UserScript==

/**
	-- Version 1.0 --
	Adds an attack link to the links of the villages on all the pages. In effect one click attack.

 **/

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?d=");
    if (linkdata.match("karte.") == "karte." ) {
	    var s = i[j].innerHTML;
	    var s1 = s.indexOf('<');
	    if( s1 < 0 ){
        var attklink = document.createElement("a");
        attklink.href="a2b.php"+"?z="+linkparts[1];
        attklink.appendChild(document.createTextNode(" [X] "));
        
        i[j].parentNode.insertBefore( attklink ,i[j].nextSibling);
    	}
        }
    }

})();