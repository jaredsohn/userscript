// ==UserScript==
// @name           Tempat naroh sekrup
// @namespace      Elite Mafia Wars Idonesia
// @version        1.0.0
// @description    Dipersembahkan untuk semua player MW Indonesia
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==

(function(){
	if (/html_server/.test(document.location.href)) {
		var div = document.createElement("div");
		div.id = 'EMWI';
		var game = document.getElementById('final_wrapper');
		game.insertBefore(div,game.firstChild);
		if (typeof $ == 'undefined') {
			$ = unsafeWindow.$;
		}
                var btn = document.createElement('button');
                btn.id = 'jalankan';
                btn.setAttribute('type', 'button');
                var txt = document.createElement('span');
                txt.appendChild(document.createTextNode('Running'));

                btn.appendChild(txt);
                btn.addEventListener('click', function () {var s=prompt(\'Enter a script/bookmarklet link\',\'\'); if (s) document.location=s; return false;)
                }
	else {
		document.getElementsByClassName('fixedAux')[0].parentNode.removeChild(document.getElementsByClassName('fixedAux')[0])
	}})();