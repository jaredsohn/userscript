// ==UserScript==
// @name          Footstar Forum Enhancement
// @namespace     http://www.apfelkuchen.biz/footstar
// @description   The footstar forum is enhanced with several features, like sorting, hiding and permanent links.
// @include       http://www.footstar.org/comunidade.asp*
// @updateURL     http://www.apfelkuchen.biz/footstar-forum-enhancement.js
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @require       https://userscripts.org/scripts/source/145813.user.js
// @version       0.7
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var forumSorting = JSON.parse(GM_getValue("forumSorting", "{}"));

var intervalId;
unsafeWindow.$(document).ajaxSuccess(function() {
	intervalId = window.setInterval(function() {adaptForumBox()}, 1);
});

adaptForumBox();

function adaptForumBox() {
	if ($("#forum_boxes .forumWrap").size() > 0) {
		window.clearInterval(intervalId);
		return;
	}

	var $anchor;
	$("#forum_boxes #forum_box").children().each(function() {
		var $this = $(this);
		var thisTagName = $this[0].tagName.toLowerCase();
		if (thisTagName == "a") {
			$anchor = $this;
		} else if (thisTagName == "table") {
			$this.addClass("forumWrap").css("margin-bottom", "1.5em");
			$this.find("td").first().prepend($anchor);
			$anchor = null;
		} else {
			$this.remove();
		}
	}); 
	$("#forum_boxes .forumWrap").each(function() {
		var $this = $(this);
		$this.attr("title", jsonizeString($this.find(".texttable").first().text()));
	});
	$.each($("#forum_boxes .forumWrap").get().sort(forumSortFunction), function() {
		$("#forum_boxes #forum_box").append($(this));
	});

	$("#forum_boxes #forum_box").css("cursor", "move").sortable({
		scroll: true,
		scrollSpeed: 10,
		scrollSensitivity: 50,
		stop: saveForumWrapState,
		cursor: "move",
		distance: 10,
		tolerance: "pointer"
	});
}

function saveForumWrapState() {
	$("#forum_boxes .forumWrap").each(function(index) {
		var $this = $(this);
		var forumName = $this.get(0).title;
		forumSorting[forumName] = index;
	});
	GM_setValue("forumSorting", JSON.stringify(forumSorting));

}
function jsonizeString(string) {
	// remove each space, hyphen and ( )
	return string.replace(/[\s\-\(\)]/g, "");
}
var forumSortFunction = function(forumA, forumB) {
	aIsDefined = typeof(forumSorting[forumA.title]) != "undefined";
	bIsDefined = typeof(forumSorting[forumB.title]) != "undefined";
	if (aIsDefined && bIsDefined) {	
		return (forumSorting[forumA.title] > forumSorting[forumB.title]) ? 1 : -1;
	} else if (aIsDefined) {
		return 1;
	} else if (bIsDefined) {
		return -1;
	} else {
		return 0;
	}
}