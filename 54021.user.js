// ==UserScript==
// @name           ebay_sort_items
// @namespace  lopelex.xxxx.xx
// @include        http://*ebay.*/items*
// @include        http://*.ebay.*/i.html*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// @require        http://benalman.com/code/javascript/jquery/jquery.ba-url.js
// ==/UserScript==

(function() {

	var url = document.URL;
	var refresh = false;

	if( /^(http|https):\/\/.*?(|\.)ebay\..*?\/items/.test(url)  ||  /^(http|https):\/\/.*?(|\.)ebay\..*?\/i.html.*/.test(url) ){

		if( !/_sop\=1/g.test(url) ){
			url = jQuery.queryString (url, {
				"_sop": 1
			});
			refresh = true;
		}

		if( !/_ipg\=200/g.test(url) ){
			url = jQuery.queryString (url, {
				"_ipg": 200
			});
			refresh = true;
		}

		if(refresh) {
			location.href = url;
		}
	}
}) ();