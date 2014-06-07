// ==UserScript==
// @name        Google Scholar BibTeX to clipboard
// @namespace   gerhard
// @description Adds button to copy bibtex entry to clipboard
// @include     *scholar.google.*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1.01
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}

function ButtonClickAction (event)
{
	copyToClipboard($.ajax({type: "GET", url: $(this).prev().attr('href'), async: false}).responseText);
}

var $citediv = $("div.gs_fl");
var $links = $citediv.find("a:contains('Import into BibTeX')");

if($links.size() == 0) {
	var $resultbox = $('#gs_ccl');
	var $instruct = $('<div class="gs_r" id="usInstruct"> \
		To enable the extra functionality of the \
		"Google Scholar BibTeX to clipboard" user script, click "Cite",</br> \
		then tick "Remember my bibliography manager and show import \
		 links on search result pages." and click "Import into BibTeX".</br> \
		If you reload the results page you should now see the \
		 "Copy BibTeX to clipboard" buttons. \
		</div>');
	$resultbox.prepend($instruct);
} else {

	$citediv.each(function() {
		//find link and hide it
		var $link = $(this).find("a:contains('Import into BibTeX')");
		$link.hide();

		//create button and bind it to function
		var $button = $("<button class='bibButton'>Copy BibTeX to clipboard</button>")
		$link.after($button);
		$button.bind("click", ButtonClickAction);

	});
}

GM_addStyle (" \
     	button.bibButton { \
        	cursor:		pointer; \
		padding: 	0px 5px 0px 5px; \
		margin-right:	5px; \
		color: 		#1155CC; \
    	} \
	#usInstruct { \
		color:		#DD4B39; \
	} \
");
