// ==UserScript==
// @name           Facepunch -- No-Ratings
// @namespace      http://greasemonkey.megagamer.net/
// @description    Hide FP Ratings completely
// @include        http://www.facepunch.com/showthread.php?t=*
// ==/UserScript==

if (typeof(google) == 'undefined')
{
    ChromeKludge();
}
else
{
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')();'));
    document.head.appendChild(script);
}
function ChromeKludge() {
	function hideRatings($) {
		$('.postratingresults').hide();
		$('.postrating').hide();
		$('.postbitold').attr({onmouseover:"return;",onmouseout:"return;"});
		$('.postbitnew').attr({onmouseover:"return;",onmouseout:"return;"});
	}
	hideRatings(typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery);
}