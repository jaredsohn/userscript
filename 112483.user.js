// ==UserScript==
// @name           Subscribe to all threads you've posted in
// @namespace      http://userscripts.org
// @description    Subscribe to all threads you've posted in
// @include        http://what.cd/userhistory.php*
// @include        https://ssl.what.cd/userhistory.php*
// ==/UserScript==

var notSubscribed = document.querySelectorAll("a[href][class^=subscribelink][onclick^=Subscribe]");
for (var i = 0; i < notSubscribed.length; i++) {
	unsafeWindow.Subscribe(notSubscribed[i].className.split('subscribelink')[1]);
	unsafeWindow.$('.subscribelink' + notSubscribed[i].className.split('subscribelink')[1]).remove();
}
window.location = document.querySelectorAll('.pager_next')[0].href;

// By amareus