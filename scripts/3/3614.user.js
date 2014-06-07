/* FacebookAge
Created : 07/17/2005
Modified: 3/22/2006 by Justin Ormont as Facebook updated their search urls.
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This script is a hybrid of code from Thomas Stewart's
IMDBAge script, code from Ed Hager's 'Netflix Links in IMDB', and
my my tweaks to bring those scripts together to display ages for
Facebook users.
*/

// ==UserScript==
// @name          Facebook Age Checker 1.0.2
// @namespace     http://cybernetek.com/firefox
// @description	Displays the age of Facebook users
// @include       *.thefacebook.com/profile.php*
// @include        *.facebook.com/profile.php*
// ==/UserScript==

insertAge();

function insertAge() {

	var hyperlinks = document.getElementsByTagName("a");
	for (var i = 0; i < hyperlinks.length; ++i) {
		var node = hyperlinks[i];
		var href = node.getAttribute("href");
		if (isBirthdayUrl(href)) {
			//var link = makeAgeNode(getNodeText(node, true));
			var link = makeAgeNode(href);
			if (link != null) {
				if (node.nextSibling == null) {
					node.parentNode.appendChild(link);
				} else {
					node.parentNode.insertBefore(link, node.nextSibling);
				}
			}
		}
	}
}

function isBirthdayUrl(theUrl) {

	if (theUrl == null) {
		return(false);
	}

	// http://wisc.facebook.com/s.php?k=10010&n=-1&15=08%2F24%2F1985
	var searchStr = "s.php?k=10010&n=-1&15=";
	var pos = theUrl.indexOf(searchStr);
	if (pos >= 0) {
		return (true);
	}

	// http://okstate.facebook.com/p.php?s&x=birthday&c=172&q=05.01.85&h=ca8106b9d88233e908b974478feab919
        var searchStr = "x=birthday";
	var pos = theUrl.indexOf(searchStr);
	if (pos >= 0) {
		return (true);
	}
}

function getNodeText(node, goDeep) {
	var nodeText = node.nodeValue;
	if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0) {
		nodeText = "";
		
		for (var i=0; i < node.childNodes.length; ++i) {
			nodeText += getNodeText(node.childNodes.item(i), goDeep);
		}

	}
	return (nodeText == null ? "" : nodeText);
}

function makeAgeNode(theUrl) {
	if(theUrl != null && theUrl.length > 0) {
		var container = document.createElement("span");
	
		// DETERMINE AGE
				if (theUrl.indexOf('&q=') > 0) {
					var pos = theUrl.indexOf('&q=');
					var dateindex = theUrl.substring(pos + 3);
				}
				else {
					var pos = theUrl.indexOf('&15=');
					var dateindex = theUrl.substring(pos + 4);
				}

				// SPLIT dateindex
				dateindex = dateindex.replace(/\./g,"%2F");
				dateindex = dateindex.replace(/-/g,"%2F");
				date_array = dateindex.split("%2F");
				var month = date_array[0];
				var day = date_array[1];
				var year = date_array[2];
				
				// ADDED 11/24/2005 -- Facebook started appending &h= to the end of the birthday, which ends up in the year variable.  This strips off that extra data.
				year_array = year.split("&");
				year = year_array[0];
						
				var born = new Date(0);
				
				if (born.getTime() == 0) {
					born.setDate(day);
					born.setMonth(month - 1);  // setMonth months are 0-11
					born.setYear(year);
				}
				
				// find the differance between two times
				var age = new String();
				var age = new Date() - born.getTime();

				// convert difference into days
				age = age / (1000*60*60*24*365.25);
					
				// get nice values
				var years =  Math.floor( age );
				var months = Math.floor( (age - years) * 12 );
	
				var dispAge = " (Age: " + years + ")";
				//var dispAge = month + " | " + day + " | " + year;
	
		container.appendChild(document.createTextNode(dispAge));
		return (container);
	}
	
	return(null);
}
