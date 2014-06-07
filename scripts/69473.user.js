// ==UserScript==
// @name			sinema sozluk icin spoiler gizleme tekrar gösterme scripti
// @namespace		http://www.ssradyo.com
// @description		sinema sozluk icin spoiler gizleme tekrar gösterme scripti
// @include			http://ffsozluk.com/nedir.php?q=*
// @include			http://www.ffsozluk.com/nedir.php?q=*
// @include			http://filmfabrikasisozluk.com/nedir.php?q=*
// @include			http://www.filmfabrikasisozluk.com/nedir.php?q=*
// @include			http://www.sinemasozluk.com/nedir.php?q=*
// @include			http://sinemasozluk.com/nedir.php?q=*
// @author			Çağdaş 'i double dare you motherfucker' SALUR
// @version			1.0.0
// @release			20.02.2010
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var entries = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < entries.snapshotLength; i++) {
			if (entries.snapshotItem(i).innerHTML.match(/spoiler/)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler göster</button>";
			}
		}
	},
false);