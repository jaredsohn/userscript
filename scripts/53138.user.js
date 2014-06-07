// ==UserScript==
// @name           what.cd: log linkifier
// @namespace      http://what.cd
// @description    makes torrent/request/collage ids into links
// @include        https://ssl.what.cd/log.php*
// @include        http://*what.cd/log.php*
// ==/UserScript==

var spans = document.getElementsByTagName('span');
var regd = new RegExp("(automatically|was) deleted (by|for)");
var regt = new RegExp("^Torrent ");
var regr = new RegExp("^Request ");
var regc = new RegExp("^Collage ");
var regi = new RegExp("\\d+");
for (i=0; i<spans.length; i++) {
	if (regd.test(spans[i].innerHTML)) continue;
	if (regt.test(spans[i].innerHTML)) {
		var id = regi.exec(spans[i].innerHTML);
		spans[i].innerHTML = spans[i].innerHTML.replace(regi, "<a href=\"torrents.php?torrentid=" + id + "\">" + id + "</a>");
	} else if (regr.test(spans[i].innerHTML)) {
		var id = regi.exec(spans[i].innerHTML);
		spans[i].innerHTML = spans[i].innerHTML.replace(regi, "<a href=\"requests.php?action=viewrequest&id=" + id + "\">" + id + "</a>");
	} else if (regc.test(spans[i].innerHTML)) {
		var id = regi.exec(spans[i].innerHTML);
		spans[i].innerHTML = spans[i].innerHTML.replace(regi, "<a href=\"collage.php?id=" + id + "\">" + id + "</a>");
	}
 }