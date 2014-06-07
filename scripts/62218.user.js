// ==UserScript==
// @name           Reddit Google Search
// @namespace      http://ineedattention.com/
// @description    Replaces the reddit search box with a Google custom search engine
// @include        http://*.reddit.com/*
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

(function() {
	if(redditsearch = document.getElementById("search"))
	{
		redditsearch.action = "http://www.google.com/cse"; 
		redditsearch.id = "cse-search-box";
		redditsearch.innerHTML = "<div><input type='hidden' name='cx' value='partner-pub-6674924043194384:7tuh4myfr0g' /><input type='hidden' name='ie' value='ISO-8859-1' /><input type='text' name='q' size='32' /><input type='submit' name='sa' value='Search' /></div><script type='text/javascript' src='http://www.google.com/cse/brand?form=cse-search-box&amp;lang=en'></script>";
	}
})();