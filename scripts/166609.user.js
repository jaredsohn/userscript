// ==UserScript==
// @name          zamunda.se XXX links
// @namespace     http://zamunda.se/tnt
// @description   Remove onclick attribute from zamunda.se XXX links.
// @icon          https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include       http://zamunda.se/*
// @include       http://*.zamunda.se/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @author        TNT
// @run-at        document-start
// @version       1.0
// ==/UserScript==

$(document).ready(function(){
	table=jQuery('.main .test');
	links=table.find('tbody > tr > td:nth-child(2) > a[href^="javascript:"]');
	links.each(function(index, el){
		url = null;
		$el=jQuery(el);
		str=$el.attr('href');
		url=str.match(/(details[^'\)]+)/g);
		if(url != null){ //found
			$el.attr('href', url);
		}
		else{
			url=str.match(/(download[^'\)]+)/g);
			if(url != null){
				$el.attr('href', url);
			}
		}
	});
});