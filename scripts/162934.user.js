// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.TinyAutoRefresh
// @name           Tiny Tiny RSS: Auto Refresh
// @version        2014.3.15
// @author         kuehlschrank
// @homepage       http://userscripts.org/scripts/show/162934
// @description    Switches to unread articles when tab regains focus after leaving it for more than one minute.
// @include        *://reader.*
// ==/UserScript==

(function() {

	function onFocus(e) {
		if(e.target.tagName || typeof unsafeWindow.feeds_found != 'number' || document.getElementById('cancel_search')) {
			return;
		}
		if(Date.now() - timeLeft > 60000) {
			window.location.href = 'javascript:viewfeed(-3);';
		}
		timeLeft = 0;
	}

	function onBlur(e) {
		if(!e.target.tagName) {
			timeLeft = Date.now();
		}
	}

	var timeLeft = 0;
	window.addEventListener('focus', onFocus, false);
	window.addEventListener('blur', onBlur, true);

})();
