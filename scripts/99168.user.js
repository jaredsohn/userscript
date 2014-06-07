// ==UserScript==
// @name			Facebook Comment Button Restorer
// @author			Bhuwan Khattar
// @namespace		http://www.BhuwanKhattar.com/projects/fbcmntbtn
// @description		Restores the "Comment" Button and disables new feature that sends comments on pressing enter key.
// @include			http://*facebook.com*
// @include         http://facebook.com/*
// @include         http://*.facebook.com/*
// @include         https://facebook.com/*
// @include         https://*.facebook.com/*
// @version			1.05
// ==/UserScript==

function loadJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "$.noConflict(); (" + callback.toString() + ")();"; // jQuery shouldn't cause any conflict with Facebook
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function fixComments() {
	jQuery(".enter_submit").removeClass("enter_submit"); // Remove class to disable submit on pressing enter
	jQuery(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").removeClass("hidden_elem"); // Display the Comment button.
	jQuery(".uiUfiAddTip.sendOnEnterTip.fss.fcg, .uiUfiAddTip.commentUndoTip.fss.fcg").hide(); // Remove the "Press Enter to post your comment." and "Press Shift+Enter to start a new line." messages
}

loadJQuery(fixComments);