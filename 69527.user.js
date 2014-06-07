// ==UserScript==
// @name           Send Massage!
// @namespace      http://userscripts.org/users/52197
// @description    Changes Send Message text to Send Massage
// @author         darkip
// @version        0.2
// @include        http*://*what.cd/user.php?id=*
// @include        http*://*what.cd/inbox.php?action=compose*
// @include        http*://*what.cd/inbox.php?action=viewconv*
// ==/UserScript==

if(window.location.href.indexOf('user.php') != -1) {
	document.getElementById('content').getElementsByTagName('a')[0].innerHTML = 'Send Massage';
} else {
	document.getElementById('buttons').getElementsByTagName('input')[1].value = 'Send massage';
}