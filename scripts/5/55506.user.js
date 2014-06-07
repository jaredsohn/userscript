// ==UserScript==
// @name           Gobi 3 Enhancer MHC
// @namespace      http://www.mtholyoke.edu/lits
// @description    Adds links, highlighting, and quick notes to Gobi 3 for Mount Holyoke College users
// @include        http://*.gobi3.com/*
// ==/UserScript==

// Updates:
//
// 2011-04-12
// - Added a tweet button
//
// 2010-09-09
// - Modified to add series highlights and add code 1970 to login screen
//
// 2009-08-11
// - Modified from Gobi 3 Enhancer (for Williams College)
//
// 2008-05-01
// - Updated to show in the brief display as well, made it easier to 
//   change the default quick note.
//
// 2008-04-29
// - Updated to fit with latest change from Gobi.
// - Consolidated from Quick Notes (http://userscripts.org/scripts/show/23656)
//   and Link Inserter (http://userscripts.org/scripts/show/23271)
//
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/55506

/* -- Preferences -------------------------------------------------------------- */



var QuickNoteDefaultOption = "REJECT";



var QuickNotes = new Array(
	"REJECT", 
	"REJECT - HELD IN THE 5 COLLEGES",
	"DN - DEMONSTRATED NEED"
	);

var gmStyleSheet = 'http://library.williams.edu/assets/styles/gobi.css';


var gmSearchPattern = /^(.+:<\/span>)(<span>(.+?)<\/span>)(.*)$/im;
// 1 - start, 2 - replace, 3 - search term, 4 - end

/* -- Links and Highlighting ----------------------------------------------------------- */

// Add our own style sheet
if(document.createStyleSheet) {
	document.createStyleSheet(gmStyleSheet);
} else {
	var newSS=document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href='data:text/css,'+escape("@import url(' " + gmStyleSheet + " ');");
	document.getElementsByTagName("head")[0].appendChild(newSS);
}

// Add the twitter script
var twitter_script = document.createElement('script');
twitter_script.type = 'text/javascript';
twitter_script.src = 'http://platform.twitter.com/widgets.js';
document.getElementsByTagName("head")[0].appendChild(twitter_script);

// add group code to login screen
if(document.getElementById("gbase")) {
	if(document.getElementById("gbase").value == "") {
		document.getElementById("gbase").value = "1970";
		document.getElementById("gbase").select();
	}
}

// Helper functions to find and replace the searchterm in a field
var gmGetSearchTerm = function(html) {
	var searchterm = '';
	var matches = html.match(gmSearchPattern);
	if(matches) { searchterm = matches[3]; }
	//GM_log('search term: ' + searchterm);
	return searchterm;
}
var gmReplaceSearchTerm = function(html, newcode) {
	if(html.match(gmSearchPattern)) {
		return html.replace(gmSearchPattern, "$1" + newcode + "$4");
	} else {
		return html;
	}
}

// Takes HTML, finds the search term, and replaces it with a link
var gmGetNewCode = function(html) {
	var searchTerm = gmGetSearchTerm(html);
	if(searchTerm == "") { return html + '<!-- greasemonkey code -->'; }
	
	var newcode = '<a href="' + this.getPrefix() + 
		escape(searchTerm.replace(/\:/, '')) + this.getSuffix() +
		'" target="_blank" class="francisLink">' + searchTerm + '</a>' +
		'<!-- greasemonkey code -->';
	return gmReplaceSearchTerm(html, newcode);
}


// Takes HTML, finds the given string and makes it red
var gmHighlight = function(html, ToFlag) {
	html = html.replace(/\s+/g, " ");
	for(var i=0; i<ToFlag.length; i++) {
		html = html.replace(ToFlag[i], 
			'<span style="color:#f00">' + ToFlag[i] + '</span>');
	}
	return html + '<!-- greasemonkey code -->';
}

// Takes HTML, finds the given string and adds the annotation
var gmAnnotate = function(html, toFind, annotation) {
	html = html.replace(/\s+/g, " ");
	html = html.replace(toFind, toFind + ' <span style="color:#3c0">(' + annotation + ')</span>' );
	return html; // + '<!-- greasemonkey code -->';
}

// Takes HTML, finds the given string and adds the annotation
var gmAppend = function(html, annotation) {
	return html + ' ' + annotation + '<!-- greasemonkey code -->';
}




// Handles replacements for each type of field
function whichFieldIsThis(fieldText) {

	// Title
	if(fieldText.indexOf("Title:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-a&find_code=WTI&request='; },
		getSuffix: function() { return ''; },
		getNewCode: gmGetNewCode
	}

	// Author
	if(fieldText.indexOf("Author:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-e&find_scan_code=SCAN_AUT&request='; },
		getSuffix: function() { return ''; },
		getNewCode: function(html) {
			var searchTerm = gmGetSearchTerm(html);
			var newcode = '<a href="' + this.getPrefix() + 
				escape(searchTerm.replace(/\:/, '')) + this.getSuffix() +
				'" target="_blank" class="francisLink">' + searchTerm + '</a>' +
				'<!-- img src="http://library.williams.edu/gobi/author.php?a=' +
				escape(searchTerm.replace(/\:/, '')) + '" align="absmiddle" hspace="5" / -->' +
				'<!-- greasemonkey code -->';
			return gmReplaceSearchTerm(html, newcode);
		}
	}

	// LC Class
	if(fieldText.indexOf("LC Class:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-e&find_scan_code=SCAN_LCI2&request='; },
		getSuffix: function() { return ''; },
		getNewCode: gmGetNewCode
	}

	// Editor
	if(fieldText.indexOf("Editor:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-e&find_scan_code=SCAN_AUT&request='; },
		getSuffix: function() { return ''; },
		getNewCode: function(html) { 
			
			var searchTerm = gmGetSearchTerm(html);
			
			// Flip editor names around for searching
			if(searchTerm.match(/^.+\s\w+$/)) {
				newTerm = searchTerm.replace(/^(.+)\s(\w+)$/, "$2, $1");
			} else {
				newTerm = searchTerm;
			}
			
			newcode = '<a href="' + this.getPrefix() + escape(newTerm) + this.getSuffix() +
				'" target="_blank" class="francisLink">' + searchTerm + '</a>' +
				'<!-- img src="http://library.williams.edu/gobi/author.php?a=' +
				escape(newTerm) + '" align="absmiddle" hspace="5" / -->';
				
			return gmReplaceSearchTerm(html, newcode);
		}
	}

	// Subject Headings
	if(fieldText.indexOf("Subject Headings:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-a&find_code=WSU&request='; },
		getSuffix: function() { return ''; },
		getFullTerm: function(term) { 
			term = term.replace(/CRIT\./, "CRITICISM");
			term = term.replace(/CENT\./, "CENTURY");
			term = term.replace(/HIST\./, "HISTORY");
			term = term.replace(/INTERPR\./, "INTERPRETATION");
			term = term.replace(/\&amp;/, "AND");
			return term; 
		},
		getNewCode: function(html) { 
		
			var searchTerm = gmGetSearchTerm(html);
			if(searchTerm.indexOf("1.") == 0) {
				
				searchTerm = ' ' + searchTerm;
				var parts = searchTerm.split(/\s\d\.\s/);
				newcode = '';
				for(var i=1; i<parts.length; i++) {
					parts[i] = parts[i].replace(/\.\s*$/, "");
					newcode += i + '. ' + '<a href="' + this.getPrefix() + 
						escape(this.getFullTerm(parts[i])) + this.getSuffix() +
						'" target="_blank" class="francisLink">' + 
						parts[i] + '</a> ';
				}
				
			} else {
				newcode = '<a href="' + this.getPrefix() + 
					escape(this.getFullTerm(searchTerm)) + this.getSuffix() +
					'" target="_blank" class="francisLink">' + searchTerm + '</a>';
			}
			return gmReplaceSearchTerm(html, newcode);
		}
	}
	
	// Approval Note
	if(fieldText.indexOf("Approval Note:") == 0) return {
		getNewCode: function(html) { 
		
			html = gmAnnotate(html, "VOL. SET", "Use 1970-09 or -10 to order all at once");
			html = gmAnnotate(html, "VOLUME SET", "Use 1970-09 or -10 to order all at once");
		
			var ToFlag = new Array(
				"EXHIBITION CATALOG", "EXHIBITION CAT", "EXHIB. CAT", "EXHIB", 
				"PREVIOUSLY PUBLISHED", "PREV. PUBLISHED", "PREV. PUB", 
				"REVISED DISSERTATION", "REV. DISSERTATION", "REV. DISS", 
				"CONFERENCE", "CONF.", "PAPERS", "POETRY", "FIRM"
				);
			
			return gmHighlight(html, ToFlag);
		}
	}

	// Geographic Focus	
	if(fieldText.indexOf("Geographic Focus:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("Canada");
			return gmHighlight(html, ToFlag);
		}
	}

	// Series Type
	if(fieldText.indexOf("Series Type:") == 0) return {
		getNewCode: function(html) { 
		
			html = gmAnnotate(html, "Numbered Set", "Use 1970-08 ByPass");
			//html = gmAnnotate(html, "Numbered Series", "Use 1970-09 or -10");
	
			var ToFlag = new Array("Numbered Set");
			return gmHighlight(html, ToFlag);
		}
	}
	// Series Volume
	if(fieldText.indexOf("Series Volume:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
			return gmHighlight(html, ToFlag);
		}
	}
	// Volumes
	if(fieldText.indexOf("Volumes:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
			return gmHighlight(html, ToFlag);
		}
	}
	// US Import
	if(fieldText.indexOf("US Status:") == 0) return {
		getNewCode: function(html) { 
		
			html = gmAnnotate(html, "Import Only", "Use 1970-60 L&C Firm Orders UK");
	
			var ToFlag = new Array("Import Only");
			return gmHighlight(html, ToFlag);
		}
	}
	
	// Content Level
	if(fieldText.indexOf("Content Level:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("POP");
			return gmHighlight(html, ToFlag);
		}
	}

	// YBP Select
	if(fieldText.indexOf("YBP Select:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("Essential", "Supplementary");
			return gmHighlight(html, ToFlag);
		}
	}

	// Literary Type	
	if(fieldText.indexOf("Literary Type:") == 0) return {
		getNewCode: function(html) { 
			var ToFlag = new Array("Poetry", "Playscript");
			return gmHighlight(html, ToFlag);
		}
	}

	// ISBN
	if(fieldText.indexOf("ISBN:") == 0) return {
		getPrefix: function() { return 'http://fcaw.library.umass.edu:8991/F?func=find-e&find_scan_code=SCAN_STIDN&request='; },
		getSuffix: function() { return ''; },
		getNewCode: function(html) { 
		
			/*rft.isbn=0909952396&amp;rft.date=2010&amp;rft.btitle=IMAGES+OF+THE+PACIFIC+RIM*/

			var isbnSearchPattern = /rft\.isbn=([a-zA-Z0-9\-]{10,20})\&/im;
			var titleSearchPattern = /rft\.btitle=([a-zA-Z0-9\-\+]+)/im;

			var isbn = '';
			var matches = html.match(isbnSearchPattern);
			if(matches) { isbn = matches[1]; }
			
			
			var title = 'Just bought another book%21';
			var matches = html.match(titleSearchPattern);
			if(matches) { 
				title = matches[1].replace(/\+/g, " ");
				// uc first
				title = title.toLowerCase().replace(/\b([a-z])/gi,function(c){return c.toUpperCase()});
				// except some words
				title = title.replace(/(\s(of|the|an|a|and)\b)/gi,function(c){return c.toLowerCase()});
				
				title = "Just bought '" + title + "'";
			}
			
			if(isbn != '') {
				return gmAppend(html, '<a href="http://cogulus.com/i/' + escape(isbn) + 
					'" target="_blank" title="Look up on Amazon.com">' +
					'<img src="http://www.amazon.com/favicon.ico" border="0" /></a> ' +
					'<a href="http://twitter.com/share?url=http%3A%2F%2Fcogulus.com%2Fi%2F' +
					escape(isbn) + '&text=' + escape(title) + '" class="twitter-share-button" ' +
					'data-count="none" target="_blank" title="Tweet this book purchase!">Tweet</a>');
			}
			//GM_log('search term: ' + searchterm);
			//return searchterm;

			//var searchTerm = gmGetSearchTerm(html);
			
			
			
			//newcode = '<a href="' + this.getPrefix() + escape(searchTerm) + this.getSuffix() +
			//	'" target="_blank" class="francisLink">' + searchTerm + '</a> ' +
			//	'<!-- img src="http://library.williams.edu/gobi/isbn.php?isbn=' +
			//	escape(searchTerm) + '" width="16" height="16" align="absmiddle" / -->';
			//return gmReplaceSearchTerm(html, newcode);
			//return html + " isbn:'" + isbn + "' " + " title:'" + title + "' "; 
			return html;
		}
	}

	// Library Note
	if(fieldText.indexOf("Library Note:") == 0) return {
		getNewCode: function(html) {

			// Find the Add Note Link
			var matches = html.match(/<span[^>]+class="NoteLink".+?<\/span>/im);
			if(matches) {
				var addLink = matches[0];
				//GM_log('addlink ' + addLink);
				
				// find the id in the function
				matches = addLink.match(/id=(.+?)['&]/);
				if(matches) {
					idString = matches[1];
					//GM_log('id ' + idString);
					
					// find the contained item
					matches = addLink.match(/containeditem=(.+?)['&]/);
					if(matches) {
						containedItem = matches[1];
						//GM_log('item ' + containedItem);
					
						// Change it from saying Add to Reject
						var label = QuickNoteDefaultOption.substr(0,1).toUpperCase() +
							QuickNoteDefaultOption.substr(1).toLowerCase() + "..."
						addLink = addLink.replace("Add...", label);
						
						// Add the "save" command as a SetTimeout - so it runs after the window opens
						addLink = addLink.replace(');"', '); setTimeout(\'SendModalDialog(' +
							'\\\'librarynotes\\\',\\\'&buttonname=savesubmit' +
							'&containeditem=' + containedItem + 
							'&id=' + idString + '\\\', \\\'\\\')\',2500);"');
			
						return html + ' &nbsp; ' + addLink + '<!-- greasemonkey code -->';
						
						//GM_log('newlink ' + addLink);
					}
					
				}
				
			}
			
			return html; // if the link insertion fails
			
		}
	}

	// Title selected or Shipped to Library
	if(fieldText.match(/GobiTween/i)) return {
		getNewCode: function(html) {
			var ToFlag = new Array(
				"title selected", 
				"shipped to library", 
				"library open order", 
				"exported",
				"1 Book",
				"2 Books",
				"3 Books",
				"4 Books",
				"5 Books",
				"Books");
			return gmHighlight(html, ToFlag);
		}
	}
	
	// If not matching, return nothing
	return null;
}

// Function to add the links when the page is loaded or refreshed
function GmAddLinks() {

	// Get the container for the slips
	var container = document.getElementById("containeritems");
	
	if(container) {

		// If there is greasemonkey code present, stop checking.
		if(container.innerHTML.match("greasemonkey code")) {
			//alert('greasemonkey code found');
			
		} else {
		//if(true) {
			
			// Find all the table cells in the container
			var Cells = container.getElementsByTagName("td");
			
			// Cycle through all cells in the item table
			for(i=0; i<Cells.length; i++) {
				var cell = Cells[i];
				
				// Skip cells that contain whole tables
				if(cell.innerHTML.match("<table")) { continue; }
				
				// Skip cells that contain previously modified code
				//if(cell.innerHTML.match("greasemonkey code")) { continue; }
				
				// Check each field
				var ReplaceFunc = whichFieldIsThis(cell.textContent);
				
				// If it matches one of ours, update the code
				if(ReplaceFunc) {
					//GM_log('cell ' + cell.textContent);
					cell.innerHTML = ReplaceFunc.getNewCode(cell.innerHTML);
				
					//break; // debuggin
				}
				
			}			
		}
	} 

	setTimeout(GmAddLinks, 1000);

}

// Start the link and highlight inserstion
GmAddLinks();


/* -- Quick Notes -------------------------------------------------------------- */

// Define code for note controls
var gmQuickNoteCode = '<b>Quick Notes</b>';

for(var j=0; j < QuickNotes.length; j++) {
	gmQuickNoteCode += ' &nbsp; <a href="javascript:void(0)" ' +
		'onclick="document.getElementById(\'note\').value=\'' + QuickNotes[j] + '\'; ' +
		'document.getElementById(\'note\').select()">' +
		QuickNotes[j].replace(/REJECT - /, "") + '</a>';
}


// Create a layer to hold note controls
var gmQuickNoteDiv=document.createElement('div');
gmQuickNoteDiv.id="gmQuickNoteDiv";
gmQuickNoteDiv.style.display = 'none';
gmQuickNoteDiv.innerHTML = gmQuickNoteCode;

document.getElementsByTagName("body")[0].appendChild(gmQuickNoteDiv);

// Create a function that will look for the notes dialog, and add the quick notes
function gmQuickNotes() {
	if(document.getElementById("note") && document.getElementById("PriorLibraryNotes") ) {
		
		// Add quick notes
		if(document.getElementById("PriorLibraryNotes").innerHTML.indexOf('QuickNotes') < 0) {
			document.getElementById("PriorLibraryNotes").innerHTML += 
				'<div class="QuickNotes">' +
				document.getElementById("gmQuickNoteDiv").innerHTML + '</div>';
		}
		
		// Set default value
		if(document.getElementById("note").value == '') {
			document.getElementById("note").value = QuickNoteDefaultOption;
			document.getElementById("note").select();
		}
		
	}
	setTimeout(gmQuickNotes, 500);
}

// Start the Quick Notes
gmQuickNotes();
