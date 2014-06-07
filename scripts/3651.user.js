// --[greasemonkey meta data start]--
// title: Empornium Show Popular
// version: 1.1 beta
// created: 2006-03-25
// copyright: (c) 2006, reddwarf
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
// description: [url=Empornium]http://empornium.us[/url] is a members only **ahem** adult site. Use this script to show only torrents with high seedcount. Thx 2 Shannon 4 layout.
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
// @name          Empornium Show Popular
// @description   Shows only popular torrents with more than "threshold" seeds. You can change threshold ofcourse.
// @include       *empornium.us/*
// @exclude       http://forums.empornium.us/*
// ==/UserScript==

(
   function() {
   	if(document.location.href.indexOf("browse.php") >= 0) {
   		var newCode = ""; // new HTML code for table
		var threshold = 50; // threshold for seedcount, lower than this will not be showed
      
   		var tables = document.getElementsByTagName("TABLE");        
	
		if(tables.length == 4) {
			var row = tables[3].rows; //this table contains the torrentslisting
			var rowLength = row.length;
		
			newCode+='<table border="1" cellspacing=0 cellpadding=5>';
			newCode+='<tr style="background-color:#7698B5;">';
			newCode+=row[0].innerHTML; // row contains type etc
			newCode+='</tr>';
			newCode+='<tr>';
			newCode+=row[1].innerHTML; // row contains torrents added date
			newCode+='</tr>';
		
			for (var i=2; i< rowLength;i++) {
				if (row[i].cells.length != 10) {
					newCode+='<tr>';
					newCode+=row[i].innerHTML; // row contains torrents added date
					newCode+='</tr>';
				}
				if (row[i].cells.length == 10) {
					if (row[i].cells[7].textContent >= threshold) { //cells[7] contains seedcount
						newCode+='<tr class="highlight">';
						newCode+=row[i].innerHTML;
						newCode+='</tr>';
					}
				}
			}
			newCode+= '</table>';
			tables[3].innerHTML = newCode;
     		}
     	}
   }
   )();
