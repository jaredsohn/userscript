// ==UserScript==
// @name			Facepunch Avatar UnCache
// @description		        Makes avatars update automatically when you change yours (clientside)
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==


(function() {
	var time = new Date().getTime(),
		timestamp = time - time % 86400,
		imgs1 = document.getElementsByClassName('userinfo');
	for (var i = 0, len = imgs1.length; i < len; i++) {
		imgs1[i].getElementsByTagName('img')[0].src += "?timestamp=" + timestamp;
	}
})();