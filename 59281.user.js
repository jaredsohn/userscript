// ==UserScript==
// @name			searchtwitter2googlereader
// @namespace		http://hrd.slack77.net/
// @description		search.twitter.com to googlereader
// @include			http://search.twitter.com/search*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function($){
	st2gr();
	function st2gr(){
		var url = encodeURIComponent("http://"+location.host+$('#share ul li:first a').attr("href"));
		var feedurl = "http://www.google.com/reader/view/#stream/feed%2F" + url;
		$('#share ul li:first').after('<li><img src="http://www.google.com/reader/ui/favicon.ico" class="rss greader" alt="google reader"/> <a href="'+feedurl+'" target="_blank">Add to Greader</a></li>');
	}

})(jQuery);
