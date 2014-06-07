// ==UserScript==
// @name           What.CD replace subscription with posts history
// @namespace      http://www.google.com
// @description    What.CD replace subscription with posts history
// @include        http*://*what.cd*
// ==/UserScript==

var userId = document.getElementsByClassName('username')[0].href.split('=')[1];


(function() {
	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User menu */

	target[4].innerHTML = ' <a href="/userhistory.php?action=posts&userid=' + userId + '&showunread=1\">Posts</a>';
})();

