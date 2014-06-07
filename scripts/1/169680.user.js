// ==UserScript==
// @name         Slashdot Quote Selection Button
// @description  Adds a "quote selection" button to Slashdot reply forms
// @namespace    http://userscripts.org/users/drnick
// @updateURL    https://userscripts.org/scripts/source/169680.meta.js
// @downloadURL  https://userscripts.org/scripts/source/169680.user.js
// @include      /^https?://.*slashdot\.org/story//
// @include      /^https?://.*slashdot\.org/comments/
// @include      /^https?://slashdot\.org/pollBooth\.pl/
// @include      /^https?://slashdot\.org/poll//
// @version      1.0.3
// @grant        none
// ==/UserScript==

var $ = null;

function insertTextAtCursor(element, text) {
    var val = element.value;
	var endIndex = element.selectionEnd;
	
	element.value = val.substring(0, endIndex) + text + val.substring(endIndex);
	element.focus();
	
	var newPos = endIndex + text.length;
	element.setSelectionRange(newPos, newPos);
}

function getSelectionHtml() {
    var html = "";
	var sel = window.getSelection();
	
	if (sel.rangeCount) {
		var container = document.createElement("div");
		for (var i = 0, len = sel.rangeCount; i < len; ++i) {
			container.appendChild(sel.getRangeAt(i).cloneContents());
		}
		html = container.innerHTML;
	}
	
    return html;
}

function changeHandler()
{
	$commentListing.unbind(".gmQuote");	
	$boxes = $("div.inline_comment");
	
	if ($boxes.length != 0)
	{
		$boxes.each(function() {
			$box = $(this);
			
			if ($box.find(".selectQuote").length == 0)
			{
				var textarea = $box.find("textarea").get(0);
			
				$newButton = $("<span class='selectQuote'><a class='btn' href='#'>Quote Selection</a></span>");
				$newButton.find("a").click(function() {
					//var text = window.getSelection();
					var text = getSelectionHtml();
					
					if (text) {
						// change <div> quote blocks into <quote> blocks
						text = text.replace(/<div class="quote"[^>]*>(.*?)<\/div>/ig, "<quote>$1</quote>");
					
						insertTextAtCursor(textarea, "<quote>" + text + "</quote>");
					}
					
					return false;
				});
			
				$buttons = $box.find("div.replyto_buttons");
				$quoteButton = $buttons.find("a:contains(Quote)");
				$quoteButton.parent().before($newButton);
			}
		});
	}
	
	$commentListing.bind("DOMSubtreeModified.gmQuote", changeHandler);
}


(function() {

	if (typeof jQuery == "undefined") throw "jQuery not found";
	if (window.top != window.self) return;
	
	this.$ = jQuery;

	$commentListing = $("#commentlisting");
	$commentListing.bind("DOMSubtreeModified.gmQuote", changeHandler);

})();