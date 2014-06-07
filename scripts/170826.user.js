// ==UserScript==
// @name			kutup sozluk icin spoiler gizleme scripti
// @description		        kutup sozluk icin spoiler gizleme scripti
// @include			http://kutupsozluk.com/sozluk.php?*
// @include			http://kutupsozluk.com/index.php?*
// @include			http://kutupsozluk.com/*
// @include			http://www.kutupsozluk.com/*
// @include			http://kutupsozluk.com/sozluk.php*
// @include			http://www.kutupsozluk.com/sozluk.php*
// @author			Tanaydın 'HuzursuZ' ŞİRİN, düzenleme: kokakirec
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var entries = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < entries.snapshotLength; i++) {
			if (entries.snapshotItem(i).innerHTML.match(/--- spoiler ---/)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler görmek için eklentiyi devre dışı bırakın.</button>";
			}
            else if (entries.snapshotItem(i).innerHTML.match(/>spoiler</)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler görmek için eklentiyi devre dışı bırakın.</button>";
			}
	 	}
	},
false);