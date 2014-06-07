// ==UserScript==
// @name           GReader Group Entries
// @namespace      http://www.drop-in-ocean.com/greader/groupentries
// @include        htt*://www.google.*/reader/view*
//
// @version        0.6
// @author         Guillaume Darmont (guillaume@drop-in-ocean.com)
// ==/UserScript==

const GE_GROUP_SIZE = 4;
const GE_SEPARATOR_CSS =
".ge-separator\
{\
	background-color: #EBEFF9;\
	border-bottom: 1px solid #CCCCCC;\
	width: auto;\
	height: 7px;\
	cursor: pointer;\
}\
.ge-separator:hover\
{\
	background-color: #C2CFF1;\
}";


var entriesCount;
var entries;

function addEntryToGroup(event) {
	var addedEntry = event.target;
	
	// Don't count <div id="scroll-filler" /> as an entry
	if (addedEntry.id != 'scroll-filler') {
		entriesCount++;                        
		//alert('entriesCount : '+entriesCount);
		if (entriesCount % GE_GROUP_SIZE == 1) {
			// Don't listen to my own insertion
			entries.removeEventListener( "DOMNodeInserted", addEntryToGroup, false );
			
			var newSeparator = createSeparator();
			entries.insertBefore(newSeparator, addedEntry);
			
			// Reactivate listening
			entries.addEventListener( "DOMNodeInserted", addEntryToGroup, false );
		}
	}
}

function createSeparator() {
	var newSeparator = document.createElement("div");
	newSeparator.className = 'ge-separator';
	newSeparator.title = 'Click to mark as read the '+GE_GROUP_SIZE+' articles below';
	newSeparator.addEventListener( "click", markGroupAsRead, false );
	return newSeparator;
}


function markGroupAsRead() {
	// Start with the node following the separator
	var nodeToMarkAsRead = this.nextElementSibling;
	var atEndOfList = false;
	
	for (var i = 0; !atEndOfList; i++) {
		var notRead = nodeToMarkAsRead.className.match('read') == null;
		if (notRead) {
			simulateClick(nodeToMarkAsRead);
		}
		
		// Check for the end of entries list
		if (i == GE_GROUP_SIZE - 1 || 
			nodeToMarkAsRead.nextElementSibling == null || 
			nodeToMarkAsRead.nextElementSibling.className.match('entry ') == null ) {
			atEndOfList = true;
			
			// Reclick on last clicked node to close details
			closeLastOpenEntry(nodeToMarkAsRead);
		} else {
			// Jump to next node 
			nodeToMarkAsRead = nodeToMarkAsRead.nextElementSibling;
		}
	}
	
	// For some still unknown reason, triggering a click event seems to remove 
	// DOMNodeInserted on "entries" div.
	addDOMListeners();
	this.focus();
}

function closeLastOpenEntry(startEntry) {
	var currentEntry = startEntry;
	while (currentEntry.className.match('entry ') != null) {
		if (currentEntry.className.match('expanded') == null) {
			currentEntry = currentEntry.previousElementSibling;
		} else {
			simulateClick(currentEntry);
			break;
		}
	}
}

// Reset entries
function resetEntries() {
	entriesCount = 0;
}

function simulateClick(node) {
	//alert('Marking as read : '+node.classList);
	// Get entry-icons div as click listener is set on this div
	var entryIcon = getEntryIconDiv(node);		
	var event = document.createEvent("MouseEvents");
	event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	entryIcon.dispatchEvent(event);
}

function getEntryIconDiv(entry){
	var divs = entry.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		if(typeof(divs[i].className) != 'undefined' &&
				divs[i].className == 'entry-icons')
			return divs[i];
	}
	return null;
}

function addDOMListeners() {
	entries.addEventListener( "DOMNodeRemoved", resetEntries, false );
	entries.addEventListener( "DOMNodeInserted", addEntryToGroup, false );
}

// Main part

entriesCount = 0;
entries = document.getElementById('entries');
GM_addStyle(GE_SEPARATOR_CSS);
addDOMListeners();
entries.addEventListener( "click", addDOMListeners, false );