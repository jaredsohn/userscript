// ==UserScript==
// @name           Reload Every
// @namespace      http://www.dp.cx/userscripts
// @include        http://www.goblinz.net/bank
// ==/UserScript==

var thepage = location.href;
var timeout = GM_getValue('timeout'+thepage, 3600); // this value is in seconds
var timeoutset = GM_getValue('timeoutset'+thepage,0);

if (!timeoutset) {
	timeout = prompt('How often would you like your page to reload?  This number is in seconds.', timeout);
	GM_setValue('timeout'+thepage, timeout);
	GM_setValue('timeoutset'+thepage,1);
}

setTimeout("window.location.reload()",timeout * 1000);
for(var i = timeout; i > 0; i--) {
	setTimeout("window.status='"+i+" seconds remaining'", (timeout-i)*1000);	
}

document.addEventListener('keypress', function(event) {
	// Everything is a shift combo. Ignore the search field.
	if (!event.shiftKey || event.metaKey || event.altKey || (event.target.type && event.target.type.match(/text/))) {
		return;
	}
	
	// Shift+T
	if (event.charCode == 83) {
		timeout = prompt('How often would you like your page to reload?  This number is in seconds.', timeout);
		GM_setValue('timeout'+thepage, timeout);
		GM_setValue('timeoutset'+thepage,1);
	}
}, false);