// ==UserScript==
// @name           chinaunix shell 版发送表情补丁
// @include        http://bbs.chinaunix.net/redirect.php*
// @include        http://bbs.chinaunix.net/forum-24-1.html
// @include        http://bbs.chinaunix.net/thread*
// @include        http://bbs.chinaunix.net/post.php*
// @include        http://bbs.chinaunix.net/viewthread.php*
// ==/UserScript==

backup_seditor_insertunit = unsafeWindow.seditor_insertunit;
checkFocus = unsafeWindow.checkFocus;
$ = unsafeWindow.$;
wysiwyg = unsafeWindow.wysiwyg;
insertText = unsafeWindow.insertText;
strlen = unsafeWindow.strlen;
unsafeWindow.seditor_insertunit = function (a, b) {
	backup_seditor_insertunit(a, "[img]" + document.evaluate('//*[@alt="' + b + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).src + "[/img]");
}
if (unsafeWindow.insertSmiley) {
	eval("unsafeWindow.insertSmiley = " + String(unsafeWindow.insertSmiley).replace("insertText(code, strlen(code)", "insertText('[img]' + src + '[/img]', strlen(src) + 11").replace("function insertSmiley", "function"));
}