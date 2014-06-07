// ==UserScript==
// @name           S-DeN
// @namespace      klinifini.livejournal.com
// @description    Старая форма поиска
// @include        http://vkontakte.ru/audio.php*
// ==/UserScript==

unsafeWindow.gotoAudioSearch = function (e) {
	if (!e) return true;
	if (e.keyCode != 13) {
		return true;
	}
	
	var qi = document.getElementById('quickquery').value;
	if (!qi.length) {
		return false;
	}
	
	window.location = 'http://vkontakte.ru/audiosearch.php?q='+qi;
}

