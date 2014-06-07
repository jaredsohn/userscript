// --[greasemonkey meta data start]--
// title: Puretna Show Popular
// version: 1.0
// created: 2007-05-04
// copyright: (c) 2007, genneth; 2006, reddwarf
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
// description: [url=Puretna]http://www.puretna.com[/url] is a members only **ahem** adult site. Use this script to show only torrents with high seedcount.
// --[greasemonkey meta data stop]--
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Puretna Show Popular
// @description   Shows only popular torrents with more than "threshold" seeds. You can change threshold of course.
// @include       *http://www.puretna.com/*
// @exclude       http://forum.puretna.com/*
// ==/UserScript==

(
  function() {
   
	if(document.location.href.indexOf("browse.php") >= 0) {
   		var newCode = ""; // new HTML code for table
		var threshold = 100; // threshold for seedcount, lower than this will not be showed
      
   		var tables = document.getElementsByTagName("TABLE");        

		var row = tables[12].rows; //this table contains the torrentslisting
		var rowLength = row.length;
   		
		newCode+='<tr>' + row[0].innerHTML + '</tr>'; // row contains type etc
		
		for (var i=1; i < rowLength; i+=2) {
			var cell = row[i].cells;
			var seeders = Number(cell[7].textContent);
			var leechers = Number(cell[8].textContent);
			if (seeders+leechers >= threshold) {
				newCode+='<tr>' + row[i].innerHTML + '</tr>';
				newCode+='<tr>' + row[i+1].innerHTML + '</tr>';
			}
		}

		tables[12].innerHTML = newCode;
		
    }
  }
)();
