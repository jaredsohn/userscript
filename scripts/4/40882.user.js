// ==UserScript==
// @name			eksi sozluk icin spoiler gizleme tekrar gösterme scripti
// @namespace		http://www.huzursuz.com
// @description		eksi sozluk icin spoiler gizleme tekrar gösterme scripti
// @include			http://sozluk.sourtimes.org/show.asp?t=*
// @include			http://www.eksisozluk.com/show.asp?t=*
// @include			http://eksisozluk.com/show.asp?t=*
// @include			http://sourtimes.org/show.asp?t=*
// @include			http://www.sourtimes.org/show.asp?t=*
// @include			http://84.44.114.44/show.asp?t=*
// @author			Tanaydın 'HuzursuZ' ŞİRİN
// @version			0.0.1
// @release			21.01.2009
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var entries = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < entries.snapshotLength; i++) {
			if (entries.snapshotItem(i).innerHTML.match(/--- .*?spoiler.*? ---/)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler göster</button>";
			}
		}
	},
false);