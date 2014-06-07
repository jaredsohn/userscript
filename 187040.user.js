// ==UserScript==
// @name			Open Discuz Link in new tab
// @description		Discuz论坛链接默认新链接打开,支持autopager和Super_preloader等
// @include			http://*/forum-*-*
// @include			http://*/forum-*-*.html
// @include			http://*/showforum-*.html
// @include			http://*/forum.php?mod=forumdisplay*
// @include			http://*/forum/viewforum.php?f=*
// @include			http://*/forum/search.php?*
// @include			https://*/forum-*-*
// @include			https://*/forum-*-*.html
// @include			https://*/showforum-*.html
// @include			https://*/forum.php?mod=forumdisplay*
// @include			https://*/forum/viewforum.php?f=*
// @include			https://*/forum/search.php?*
// @namespace		Lkytal
// @require			http://code.jquery.com/jquery-2.1.0.min.js
// @version			1.2.6
// @icon			http://lkytal.qiniudn.com/ic.ico
// @grant			unsafeWindow
// @updateURL		https://userscripts.org/scripts/source/187040.meta.js
// @downloadURL		https://userscripts.org/scripts/source/187040.user.js
// ==/UserScript==

if (window != window.top || window.document.title == "") {
	return;
}

var x = document.getElementById('atarget');

if( x )
{
	//x.click();
	unsafeWindow.setatarget(1);
}
else
{
	$('#threadlist').filter('tbody a').attr("target", "_blank").removeAttr("onClick");

	/*document.addEventListener('DOMNodeInserted',function()
		{
			LinkNew();
		}
	);

	observer = new window.MutationObserver(LinkNew);
	observer.observe(document.body, {childList: true, subtree: true});*/
}
