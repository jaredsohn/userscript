// ==UserScript==
// @name        Bukkit Search fix
// @namespace   http://userscripts.org/users/503363
// @include     http://dev.bukkit.org*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     1.0
// ==/UserScript==

$("form.global-search").prop({
	"action": "/bukkit-plugins/"
});
