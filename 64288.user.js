// ==UserScript==
// @name           HUKD Google Search
// @version        0.0.2
// @namespace      http://pgregg.com/projects/greasemonkey/hukd
// @description    Replaces the HUKD search box with a Google custom search engine.  By pgregg, with props gary_rip for the google custom search and to the userscripts.org and the Redditsearch mod
// @include        http://*.hotukdeals.com/*
// @exclude        http://*.hotukdeals.com/*action=advanced_search
// @exclude        http://*.hotukdeals.com/*showpost.php*
// @author         Paul Gregg
// @contributor    gary_rip @ HUKD
// @contributor    Peter U @ http://userscripts.org/scripts/show/62218
// ==/UserScript==

(function() {
	if(hukd_search = document.forms[0])
	{
		hukd_search.action = "http://www.google.com/cse";
		hukd_search.id = "cse-search-box";
		hukd_search.innerHTML = "<div><input type='hidden' name='cx' value='010913867792815667723:lzppjyzyz8i' /><input type='hidden' name='cof' value='FORID:9' /><input type='hidden' name='ie' value='UTF-8' /><input type='text' name='q' size='16' /><input type='submit' id='top-search-go' value='Go&gt;' name='sa' /></div><script type='text/javascript' src='http://www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en'></script>";
	}
})();