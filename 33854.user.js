// ==UserScript==
// @name           HatebuPendingTag
// @namespace      http://www.madin.jp/
// @description    Add pending tag (for example "[*]") to new bookmark comment.
// @include        http://b.hatena.ne.jp/add?mode=confirm*
// ==/UserScript==

var DEFAULT_TAG_STRING = '[*]';

function _HatebuPendingTag_exec () {
	var field = document.getElementById('comment');
	if (''==field.value) field.value = DEFAULT_TAG_STRING;
}

_HatebuPendingTag_exec();