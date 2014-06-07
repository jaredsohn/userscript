// ==UserScript==
// @name			Facebook Comment Button Restorer
// @author			Bhuwan Khattar
// @namespace		http://www.BhuwanKhattar.com/projects/fbcmntbtn
// @description		Restores the "Comment" Button and disables new feature that sends comments on pressing enter key.
// @include			http://*facebook.com*
// @include			https://*facebook.com*
// @version			1.20
// ==/UserScript==
/*
	Changelog
	v1.20 (January 25, 2012)
		- NEW: Added support for the sidebar ticker.
		- Improved implementation.
	v1.11 (March 25, 2011)
		- Added https support.
	v1.10 (March 17, 2011)
		- NEW: Facebook resized the comment box to allow one line. Added functionality to dynamically resize the comment box.
		- BUGFIX: Sometimes, the script used run too early and comment boxes didn't get changed. Added live binding of focus and blur events to comment boxes.
	v1.05 (March 16, 2011)
		- First public release
*/

function fixComments() {
	jQuery(".textBox").live("focus blur", function(event) {
		jQuery(".uiUfiAddTip.sendOnEnterTip.fss.fcg, .uiUfiAddTip.commentUndoTip.fss.fcg").hide();
		if(event.type=="focusin"){
			jQuery(this).css({"height": "auto", "min-height": "28px"});
			jQuery(this).removeClass("enter_submit");
			jQuery(this).parents(".commentArea").children(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").removeClass("hidden_elem");
			jQuery(this).parents(".commentArea").children(".commentBtn").css("display", "block");
		}
		if(event.type=="focusout" && jQuery(this).val()==""){
			jQuery(this).css({"height": "14px", "min-height": "14px"});
			jQuery(this).addClass("enter_submit");
			jQuery(this).parents(".commentArea").children(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").addClass("hidden_elem");
			jQuery(this).parents(".commentArea").children(".commentBtn").css("display", "none");
		}
	});
}

function loadJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "$.noConflict(); (" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

loadJQuery(fixComments);