// ==UserScript==
// @name           sme.sk
// @description    Znevýrazní linky netýkajúce sa správ na stránkach sme.sk
// @namespace      k2s
// @include        http://www.sme.sk/
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	//alert($().jquery); // check jQuery version
	//$('a').not('[href*="/c/"]').parent().toggle();
	$('a').not('[href*="/c/"]').fadeTo(0, 0.1);

	var re = new RegExp(/\/c\/(\d*)/);
	var res = "";
	$('a[href*="/c/"]').each(function (index, el) {
		var m = re.exec($(el).attr("href"));
		res = res + m[1] + "|";
	});
	//alert(res);		
}