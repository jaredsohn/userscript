// ==UserScript==
// @name           digg-history-submissions
// @namespace      digg
// @description    Adds "My Comments" and "My Submissions" link
// @include        http://digg.com/*
// @author 		T.J. leahy
// ==/UserScript==
(function(){
  function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
	  window.setTimeout(GM_wait,100); 
	} else { 
	  $ = unsafeWindow.jQuery; letsJQuery(); 
	}
  }
  GM_wait();
  function letsJQuery() {
	var firstlink = $('#section-profile');
	var basehref = firstlink.attr('href')+"/history/";
	var comments = basehref+ "comments";
	var submissions = basehref+ "submissions";
	
	firstlink.after("<a href='"+submissions+"'>My Submissions</a>");
	firstlink.after("<a href='"+comments+"'>My Comments</a>");
	
  }
})();

