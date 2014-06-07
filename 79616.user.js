// ==UserScript==
// @name          amazon_auto_afi
// @namespace     http://userscripts.org/users/kawaz
// @description   アマゾンで買い物する際に自動でアフィIDを挿入する
// @include       http://www.amazon.co.jp/*
// ==/UserScript==
(function(){
	var AFI_ID = 'kawazjp-22';

	function getCookie(name) {
		var cookieValue = '';
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/^\s*/, '').replace(/\s*$/, '');
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	if(!getCookie('UserPref') && !/[\?&]tag=/.test(location.href)) {
		location.href += (/\?/.test(location.href)?'&':'?') + "tag=" + AFI_ID;
	}
})();
