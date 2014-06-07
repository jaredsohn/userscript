// ==UserScript==

// @name          MySpace Rich Edit

// @description	  Adds a simple rich edit interface (Italic, Bold, Blockquote, Center, Link) to any comment or bulletin textarea on MySpace.

// @namespace     http://www.myspace.com/sean_is_a_bamf

// @include       http://*myspace.com/*
// @include       http*://*blogger.com*comment*
// @include       http://*typepad.com*comments*

// @exclude       http://*profileedit.myspace.com*
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// @include	  http://www.flickr.com/photos/

// ==/UserScript==



unsafeWindow.tagIt = function (tagOpen,tagClose,i) {

	// most of this bit is from http://placenamehere.com/photographica/js_textareas.html

	var ta = unsafeWindow.textArray[i];

	var st = ta.scrollTop;

		

	if (ta.selectionStart | ta.selectionStart == 0) { // Mozzzzzzila relies on builds post bug #88049

		// work around Mozilla Bug #190382

		if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }



		// decide where to add it and then add it

		var firstPos = ta.selectionStart;

		var secondPos = ta.selectionEnd+tagOpen.length; // cause we're inserting one at a time



		ta.value=ta.value.slice(0,firstPos)+tagOpen+ta.value.slice(firstPos);

		ta.value=ta.value.slice(0,secondPos)+tagClose+ta.value.slice(secondPos);

		

		// reset selection & focus... after the first tag and before the second 

		ta.selectionStart = firstPos+tagOpen.length;

		ta.selectionEnd = secondPos;

		//ta.focus();

		ta.scrollTop=st;

	}	

}



unsafeWindow.linkIt = function (i) {

	var myLink = prompt("Enter URL:","http://");
	var name = prompt("Enter the name of the website:");

	if (myLink != null) {

		unsafeWindow.tagIt('<a href="' +myLink+ '" target="_blank">','' +name+ '</a>', i);

	}

}

unsafeWindow.linkImg = function (i) {

	var myImg = prompt("Enter Image URL:","http://");

	if (myImg != null) {

		unsafeWindow.tagIt('<img src="' +myImg+ '">','', i);

	}

}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

unsafeWindow.textArray = new Array();unsafeWindow.textArray = new Array();



for (i=0; i<textareas.snapshotLength; i++) {

	// if this is not the extra special hidden textarea from the "invite to group" widget

	if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){

		unsafeWindow.textArray[i] = textareas.snapshotItem(i);

		var accessBar = document.createElement("div");

		accessBar.setAttribute('style','');

		accessBar.innerHTML = "<a href=\"javascript:tagIt('<i>','</i>',"+ i +")\"><i>italic</i></a> " +

			"<a href=\"javascript:tagIt('<b>','</b>',"+ i +")\"><b>bold</b></a> " +
			"<a href=\"javascript:tagIt('<s>','</s>',"+ i +")\"><b>strikeout</b></a> " +
			"<a href=\"javascript:tagIt('<u>','</u>',"+ i +")\"><b>underline</b></a> " +
			"<a href=\"javascript:tagIt('[QUOTE]','[/QUOTE]',"+ i +")\">[quote]</a> " +

			"<a href=\"javascript:tagIt('<blockquote>','</blockquote>',"+ i +")\">blockquote</a> " +			
			"<a href=\"javascript:tagIt('<center>','</center>',"+ i +")\">center</a> " +
			"<a href=\"javascript:linkIt("+i+")\">URL</a>"; +
		unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
	}

}

for (i=0; i<textareas.snapshotLength; i++) {

	// if this is not the extra special hidden textarea from the "invite to group" widget

	if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){

		unsafeWindow.textArray[i] = textareas.snapshotItem(i);

		var accessBar = document.createElement("div");

		accessBar.setAttribute('style','');

		accessBar.innerHTML = "<a href=\"javascript:linkImg("+i+")\">image</a>"; +

		unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
	}

}
