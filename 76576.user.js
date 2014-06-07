// ==UserScript==
// @name           Adsense cleanup
// @author         Fedmich
// @include        https://www.google.com/adsense/report/overview*
// @description    Removes messages table if you dont have any message and those green boxes that are clutterring the page. Removes the Google Analytics link. and also adds clickable links for the different time periods (Today/Yesterday/Last Payment) which would save you at least one click :)
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	$('.announcement-box-text a')
		.each(function(){
		var u = this.href;
		switch(u){
		case 'https://www.google.com/adsense/support/bin/topic.py?topic=23494&sourceid=aso&subid=ww-ww-et-asui&medium=link':
		case 'https://www.google.com/adsense/support/bin/answer.py?answer=93462':
			$(this).parents('.announcement-box').hide();
			break;
		}
		});
	$('select#timePeriod').after(
		$('<span class="">'	
		+'<a href="https://www.google.com/adsense/report/overview?timePeriod=today">Today</a>'
		+',<a href="https://www.google.com/adsense/report/overview?timePeriod=yesterday">Yesterday</a>'
		+',<a target="_blank" href="https://www.google.com/adsense/report/view-custom.do?reportId=333874271">7 days</a>'
		+',<a href="https://www.google.com/adsense/report/overview?timePeriod=sincelastpayment">Last Pay</a>'
		+'</span>'));
	$('a.analyticslink').hide();
}
