// ==UserScript==
// @name           twitter hide replies
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://www.twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
  $ = unsafeWindow.jQuery;

var clearReplies = function() {

  $(".status").each(function() {
		if($(this).text().match(/in reply to/)){
		$(this).css("display", "none" );
		}
   });
   
}


if (/twitter.com/.test(location.href)) {
   $(document).ajaxComplete(clearReplies);
}
clearReplies();