// ==UserScript==
// @name           Auto convert old ogame board links
// @namespace      qdscripter
// @include        http://board.ogame.ru/index.php*
// ==/UserScript==
(function()
{
	window.setTimeout(function()
	{
		var area = document.getElementById("mce_editor_0_codeview");
		if (!area || !area.value) return;
		area.value = area.value.replace(
			/http:\/\/board\.ogame\.ru\/thread\.php\?threadid=/g,
			"http://board.ogame.ru/index.php?page=Thread&threadID=").replace(
			/http:\/\/board\.ogame\.ru\/thread\.php\?postid=/g,
			"http://board.ogame.ru/index.php?page=Thread&postID=").replace(
			/http:\/\/board\.ogame\.ru\/profile\.php\?userid=/g,
			"http://board.ogame.ru/index.php?page=User&userID=");
	}, 0);
}
)();