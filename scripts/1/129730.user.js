// ==UserScript==
// @name           Codeforce Page Expand
// @namespace      Darkpi
// @description    Expand Codeforce's Problemset 1 2 ... 7 8
// @include        http://www.codeforces.com/problemset*
// @include        http://codeforces.com/problemset*
// ==/UserScript==

// Add jQuery
//var GM_JQ = document.createElement('script');
//GM_JQ.src = 'http://code.jquery.com/jquery-1.7.2.min.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
 
// All your GM code must be inside this function
function letsJQuery() {
	//alert($); // check if the dollar (jquery) function works
	var s = $('.pagination');
	if(s.length == 0) return;
	var lis = $('li', s[0]);
	var np = -1;
	for(var i = 0; i < lis.length; i++){
		if(lis[i].innerHTML.indexOf('...') != -1){
			np = i; // Should never be 0 or lis.length - 1
			break;
		}
	}
	if(np != -1){
		var pe = $(lis[np-1]);
		var pa = $('a', lis[np-1]);
		var ne = $(lis[np]);
		var pat = pa.text();
		var r1 = parseInt(pat);
		var r2 = parseInt($('a', lis[np+1]).text());
		// Assume that r1 is not focused
		var href = pa.attr('href');
		for(var i = r1 + 1; i < r2; i++){
			var ee = pe.clone();
			$('span', ee).attr('pageindex', i.toString());
			$('a', ee).attr('href', href.replace(/\/page\/\d*/, "/page/" + i.toString()));
			$('a', ee).text(i.toString());
			ee.insertBefore(ne);
		}
		ne.remove();
	}
	$('.pagination').clone().insertBefore($('.datatable'));
}