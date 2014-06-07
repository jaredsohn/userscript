// ==UserScript==
// @name           Ustream Japanese Chat
// @namespace      http://www.ohaco.jp
// @include        http://www.ustream.tv/channel/*
// ==/UserScript==

location.href = "javascript:" + function () {
	(function chatCheck() {
		if($('#chatContent').get(0)) {
			$('#chatContent').html($('#chatContent').html().replace('transparent','')); 
		} else {
			setTimeout(chatCheck, 250);
		}
	})();
}.toSource() + "();";