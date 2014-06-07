// ==UserScript==
// @name           Pixiv Search Filter
// @namespace      http://www.cathodemusic.net/apps/greasemonkey/
// @description    Pixiv search filter.
// @include        http://www.pixiv.net/search.php?*
// ==/UserScript==

// ここにNGワードを追加。　例）var ngwords = ["ネタバレ","etc1","etc2"];
var ngwords = ["ネタバレ","ネタばれ","ねたばれ","ねたバレ"];
var pixiv = document.getElementById("pixiv");
var items = pixiv.getElementsByTagName('li');
var removed = 0;
for (var i in items) for (var j in ngwords)
if (items[i] && items[i].textContent.match(ngwords[j])) {
	items[i].parentNode.removeChild(items[i]);
	++removed; break;
}
pixiv.innerHTML = pixiv.innerHTML.replace(/検索結果：(\d+?)件/,"検索結果：$1件　除外：" + removed + "件");