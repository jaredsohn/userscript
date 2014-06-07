// ==UserScript==
// @name          mixiIgnoreAssistance
// @namespace     http://d.hatena.ne.jp/porkbits/
// @description   The specific user's remark is made non-display with mixi.
// @include       http://mixi.jp/view_diary.pl?id=*
// @include       http://mixi.jp/view_bbs.pl?id=*
// @include       http://mixi.jp/view_event.pl?id=*
// @include       http://mixi.jp/recent_echo.pl
// ==/UserScript==
//
// ==OriginalCopyRight==
// mixiKLintBlocker
// version 0.1
// 2005-10-31
// Copyright (c) 2005, Piroli YUKARINOMIYA
// @see http://www.magicvox.net/archive/2005/10302305.php
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==/OriginalCopyRight==

var blockedUID = new Array();

blockedUID.push(0);

var blockedElement = new Array();
var nodeLink = document.getElementsByTagName("a");

// エコーとそれ以外で該当ノード取得処理を振り分ける
if (location.href.search("recent_echo.pl") > -1) {
	for (var uid = 0; uid < blockedUID.length; uid++) {
		for (var link = 0; link < nodeLink.length; link++) {
			if (nodeLink[link].href.indexOf("list_echo.pl?id=" + blockedUID[uid], 0) != -1){
				var nodeName = nodeLink[link].parentNode;
				if (nodeName) blockedElement.push(nodeName);

				// 1POSTあたり、アンカーが2つあるので片方は飛ばす
				// （綺麗な書き方が浮かばないのでとりあえず）
				link++;
			}
		}
	}
}
else {
	for (var uid = 0; uid < blockedUID.length; uid++) {
		for (var link = 0; link < nodeLink.length; link++) {
			if (nodeLink[link].href.indexOf("show_friend.pl?id=" + blockedUID[uid], 0) != -1){
				var nodeName = nodeLink[link].parentNode;
				if (nodeName) blockedElement.push(nodeName);

				var nodeArticle = nodeName.parentNode;
				if (nodeArticle) nodeArticle = nodeArticle.nextSibling;
				if (nodeArticle) nodeArticle = nodeArticle.nextSibling;
				if (nodeArticle) nodeArticle = nodeArticle.childNodes[1];
				if (nodeArticle) blockedElement.push(nodeArticle);
			}
		}
	}
}

for (var element = 0; element < blockedElement.length; element++) {
	if (location.href.search("view_diary.pl") > -1) {
		var commentTitleDate = blockedElement[element].parentNode.parentNode.getElementsByClassName("commentTitleDate")[0].innerHTML;
		blockedElement[element].parentNode.parentNode.parentNode.innerHTML = '<dl class="commentList01"><dt class="commentTitle"><span class="commentTitleDate">' + commentTitleDate + '</span></dt></dl>';
	}
	else if  (location.href.search("view_bbs.pl") > -1) {
		blockedElement[element].parentNode.parentNode.innerHTML = '';
	}
	else if  (location.href.search("view_event.pl") > -1) {
		blockedElement[element].parentNode.parentNode.innerHTML = '';
	}
	else if  (location.href.search("recent_echo.pl") > -1) {
		blockedElement[element].parentNode.innerHTML = '';
	}
}