// ==UserScript==
// @name           nlog - linki edycji
// @description    Dodaje do każdego postu link edycji
// @include        http://nlog.org/view.php*
// @include        http://www.nlog.org/*
// ==/UserScript==

(function(){

var www = document.location.href.match(/^http:\/\/www\.(.*)/);
if (www) {
    document.location.href = 'http://' + www[1];
    return;
}
var autor = document.location.href.match(/user=([^&]+)/);
var gosc = document.cookie.match(/nlog=([^;]+)/);

if (autor && gosc && autor[1] && gosc[1] && autor[1] === gosc[1]) {
	var links = document.evaluate("//a[contains(@href,'view.php?user="+autor[1]+"&id=')]", document, null, 7, null);
	if (links.snapshotLength === 0) {
		links = document.evaluate("//a[contains(@href,'comment.php?id=')]", document, null, 7, null);
	}
	else {
		var font = document.evaluate(".//font/@color", links.snapshotItem(0), null, 9, null).singleNodeValue;
		if (font) {
			var fontColor = font.textContent;
		}
	}
	for (var i = 0; i < links.snapshotLength; i++) {
		var match, link = links.snapshotItem(i);
		if ((match = link.href.match(/id=(\d+)$/))) {
			var a = document.createElement('a');
			a.href = '/login/index.php?what=edit&act=edit&mid='+match[1];
			a.textContent = 'edytuj';
			if (fontColor) {
				a.style.color = fontColor;
			}
			link.parentNode.insertBefore(a, link);
			link.parentNode.insertBefore(document.createTextNode(' '), link);
		}
	}
}

}());
