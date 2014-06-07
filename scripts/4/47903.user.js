// ==UserScript==
// @name           Nuke the Page
// @namespace      Nuke the Page
// @description    Based upon a parameter passed in from another (related) script, finds a particular post on the page and sets it up for editing.
// @include        http://www.notebookforums.com/thread*
// @include        http://www.notebookforums.com/showthread.php?p=*
// ==/UserScript==

// Note: This script is set up to work when the browser is pointing to www.notebookforums.com/thread* or /post*, where * is anything past the "thread" or "post" text.
// This means that this script will only operate on thread  or post views. 

window.setTimeout( function() {

	// find parameter passed in from the other page
	var hash = document.location.hash;
	if (hash == "") {
	} else {
		nukeMessage(hash);
	}
	closeTab();
	
	
	
	function nukeMessage(hash) {
		var regex = '[0-9]+'
		var ID= "editpost&p="+(hash.match(regex));
		var ID1= "vB::QuickEdit::"+hash.match(regex);
		var ID2= "newreply&p="+hash.match(regex);
		//	  alert(divID);
		// Now, find and press the "quickedit" button, or equivalent action
		// Find the Quickedit button
		var allButton = document.getElementsByTagName("A");
		for (var i = allButton.length - 1; i >= 0; i--) {
			var thisElement = allButton[i];
		
			if (thisElement.name.match(ID1)) {
				// put in a special hash message
				thisElement.href = thisElement.href + "#nuke_message"
				GM_openInTab(thisElement.href);
			}
				
		}	
	}
	
	
	function closeTab(){
		window.open('', '_self', '');
		window.close();
	}

	
	
},2000);

