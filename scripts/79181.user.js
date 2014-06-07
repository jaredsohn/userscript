// ==UserScript==

// @name           Gazelle :: Sentbox Link
// @namespace      http://google.com
// @description    Insert link for sentbox into main menu
// @include        http://what.cd*
// @include        https://ssl.what.cd*
// @include        https://passthepopcorn.me*
// @include        http://passthepopcorn.me*
// @author         carlosr+amareus
// ==/UserScript==



(function() {


	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User menu */

if (location.host != "passthepopcorn.me") {

if (location.protocol != "https:") {
	target[0].innerHTML += ' / <a href=\"http://what.cd/inbox.php?action=sentbox\">Sentbox</a>';
}
else {
	target[0].innerHTML += ' / <a href=\"https://ssl.what.cd/inbox.php?action=sentbox\">Sentbox</a>';
}
}
else {
if (location.protocol != "https:") {

	target[0].innerHTML += ' / <a href=\"http://passthepopcorn.me/inbox.php?action=sentbox\">Sentbox</a>';
}
else {
	target[0].innerHTML += ' / <a href=\"https://passthepopcorn.me/inbox.php?action=sentbox\">Sentbox</a>';
}
}

})();