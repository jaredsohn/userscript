//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//

// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Drudge Report
// @namespace     http://localhost
// @description   Removes the bunch of links.
// @include       http://www.drudgereport.com/
// @version       0.0.5
// ==/UserScript==

(function() 
{
	
	var src = document.body.innerHTML;

	// Fix page height
	src = src.replace("2500","400");
	src = src.replace("2500","400");
	src = src.replace("2500","400");

	// Fix links
	var buffer = "";
	var first  = src.indexOf("<!-- FIRST COLUMN STARTS HERE-->");
	var second = src.indexOf("<!-- SECOND COLUMN BEGINS HERE-->");
	var third  = src.indexOf("<!-- THIRD COLUMN-->");
	var firstlinks  = src.indexOf("<!--    L I N K S    F I R S T    C O L U M N-->");
	var secondlinks = src.indexOf("<!-- L I N K S      S E C O N D     C O L U M N-->");
	var thirdlinks  = src.indexOf("<!-- L I N K S    A N D   S E A R C H E S     3 R D    C O L U M N-->");
	buffer = src.substring(0,firstlinks) + src.substring(second,secondlinks) + src.substring(third,thirdlinks);
	
	document.body.innerHTML = buffer;
	return;
})();

// 0.0.1		Initial release.
// 0.0.2		Future releases.
