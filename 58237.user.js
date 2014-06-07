// pap.fr with googlemap
// version 0.1 BETA!
// 21-02-2009
// Copyright (c) 2009, Marc Powell <marc DOT powell AT yahoo DOT com>
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "pap.fr with googlemap", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          pap.fr with googlemap
// @namespace     http://caliparisien.com/dev/greasemonkey/
// @description   Add google map to announcment descriptions
// @include       http://www.pap.fr/annonce/*
// @exclude       
// ==/UserScript==
//
// Version history:
//  Version 0.2:
//   - Update for new PAP site changes
//  Version 0.1:
//   - Initial version!

var debug = true;
if(debug) GM_log("starting pap.fr googlemap");

// for browsers that don't support this function
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}
	
// Append style to page
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}	
	
// create gmap link
function createMap(block, address)
{
	// create map link
	var map = document.createElement('li');
	map.innerHTML = '<a href="#" onclick="window.open(\'http://maps.google.com/?q='+escape(address)+'&mrt=loc&lci=transit\', \'gmap\', \'menubar=no,toolbar=no,resizable=yes,location=no,status=no,directories=no,width=500,height=500\'); return false;" rel="nofollow" title="'+address+'">Map!</a>';
	map.className = "gmap";
	
	var list = block.getElementsByTagName("ul")[0];
	list.insertBefore(map,list.firstChild);
	
	return map;
}

// extract  location
function getAddress(block)
{
	// grab  announcment text
	var ttags = block.getElementsByClassName("annonce-resume-texte");
	if(ttags==null) return;
	var text = ttags[0].textContent;
//	var ptags = block.getElementsByTagName("p");
//	var text = ptags[1].textContent;
	if(debug) GM_log("text: "+text);

	// extract address
	var re = new RegExp("(\\d)*(\\s)*(rue|pl|place|blv|boulevard|ave|avenue|quartier)(\\s)+([^,.]*)","i");
	var m = re.exec(text);
	
	// extract metro
	if(m==null)
	{
		if(debug) GM_log("No address, try transport.");
		re = new RegExp("(metro|métro|rer)(\\s)+(?!ligne)([^,.]*)","i");
		m = re.exec(text);
	}
	
	// extract location (text from first link)
//	var anchors = block.getElementsByTagName("a");
	var anchors = ttags[0].getElementsByTagName("b");
	var location = anchors[0].textContent;
	var pos = location.lastIndexOf(".");
	if(pos>0) location = location.substring(0,pos);
	if(debug) GM_log("Location: "+location);
	
	// add additional location info
	var reArrond = new RegExp("(\\d)+e","i");
	if(reArrond.test(location))
		location += " arrondissement";
	location += ", France";

	if (m != null) 
	    return m[0]+", "+location;
	else
		return location;			
}

addGlobalStyle('.gmap { background: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIAQgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzssLzM1ODg4ISo9QTw2QTI3ODUBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTUpNTU1NTU1NTU1NTU1KTU1NSk1NTU1NTU1NTU1NTU1KTU1NTU1Nf/AABEIABAAEAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAGBf/EACcQAAICAQEFCQAAAAAAAAAAAAECAwQGEQAFEjGBByEiQUNRUmGC/8QAFQEBAQAAAAAAAAAAAAAAAAAABAP/xAAZEQEBAQADAAAAAAAAAAAAAAACAQMAETH/2gAMAwEAAhEDEQA/AFuQ2rVnIbaZxLNGK8gWGNZGUKugIYaHme869PLZfjFue5j1abtPYtIwYB25uoYhW6gA7S8z3Q163up8XrtKZLAr2Cg9IgseL68On6PvtXr7rbiEmaudfivIbSJsVtvFa7B5AE9We3n/2Q==) no-repeat scroll 0 4px transparent; }');

// parse all "annonce_resume" blocks
var blocks = document.getElementsByClassName("annonce");
for(var ix=0; ix<blocks.length; ix++)
{
	if(debug) GM_log("Found "+blocks[ix].id);

	// extract location
	var location = getAddress(blocks[ix]);
	if(debug) GM_log( "address: " + location );

	// add map link
	createMap(blocks[ix], location);
}