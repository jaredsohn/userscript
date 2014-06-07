// ==UserScript==
// @name          Hootsuite ＫＫゴシック V1.0
// @description	  Use a ＫＫ ゴシック font in Hootsuite.
// @include       http://hootsuite.com/*
// @include       http://www.hootsuite.com/*
// @include       https://hootsuite.com/*
// @include       https://www.hootsuite.com/*
// ==/UserScript==

(function () {
	var styles = ".ui-input,input,select,textarea,select.clean:focus,input,textarea,select,html,.ac_results li,.ui-inline-menu li,.ui-autocomplete.ui-menu li,.pickList,.moreOptionsMenu h5,.moreOptionsMenu .option,.message .networkName,.message .creatorName,.message .messageComments .arrow,.message .messageComments .comment .networkName,.message .promotePostSection .reachText,.message .promoteMessage,.stream.update .header .streamName,.uploadOptionsMenu h5,.uploadOptionsMenu .option,.page.report .documentTitle,.page.report .documentTitle input,.analytics.ui-dialog-section {font-family:'ＫＫゴシック';line-height:1.2;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();