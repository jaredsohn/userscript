// ==UserScript==
// @name          UFzoneMessage+
// @description	  +/-19 cols +/-6 rows à chaque clic sur "Message".
// @author        Al`
// @include       http://www.underfoule.net/*
// ==/UserScript==

var $;
(function(){
	$ = unsafeWindow.jQuery;
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;
	GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	GM_wait();
})();

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery.noConflict(true);
		bonus();
	}
}

function bonus() {
	var t = $j("textarea");
	if(t.size() == 1) {
		$j(".postblock").each(function (i) {
			if($j(this).html().trim() == "Message") {
				$j(this).prepend('<span id="moins" style="cursor:pointer">-</span>');
				$j(this).append('<span id="plus" style="cursor:pointer">+</span>');
			}
		});
		$j("#plus").live("click",function(e) {
				t.attr("cols",parseInt(t.attr("cols")+19));
				t.attr("rows",parseInt(t.attr("rows")+6));
		});
		$j("#moins").live("click",function(e) {
				t.attr("cols",parseInt(t.attr("cols")-19));
				t.attr("rows",parseInt(t.attr("rows")-6));
		});
	}
}

String.prototype.trim = function() {
	a = this.replace(/^\s+/, '');
	return a.replace(/\s+$/, '');
};