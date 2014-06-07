// ==UserScript==
// @name           Tw sneltoetsen
// @namespace      TW
// @description    kaart bewegen met toetsenbod
// @include        http://nl*.tribalwars.nl/game.php*
// @exclude        http://nl*.tribalwars.nl/game.php*&screen=mail&mode=new*
// @exclude        http://nl*.tribalwars.nl/game.php*&screen=memo*
// @exclude        http://nl*.tribalwars.nl/game.php*&screen=ranking*
// @exclude        http://nl*.tribalwars.nl/game.php*&screen=serrings*
// @exclude        http://nl*.tribalwars.nl/game.php*&screen=buddies
// ==/UserScript==

(function(){
var imgs = document.getElementsByTagName("img");
var letterM = "109";
var letterR = "114";
var letterV = "118";
var letterO = "111";
var letterF = "102";

document.addEventListener("keypress",function(event){
	var key = event.which.toString();
	switch(key){

		case letterM: location.href = "javascript:var url = document.URL;var spliturl = url.split

('screen');window.location=spliturl[0] + 'screen=main';"; break
		case letterR: location.href = "javascript:var url = document.URL;var spliturl = url.split

('screen');window.location=spliturl[0] + 'screen=train&mode=mass&';"; break
		case letterV: location.href = "javascript:var url = document.URL;var spliturl = url.split

('screen');window.location=spliturl[0] + 'screen=place';"; break
		case letterO: location.href = "javascript:var url = document.URL;var spliturl = url.split

('screen');window.location=spliturl[0] + 'screen=overvieuw';"; break
		case letterF: location.href = "javascript:var url = document.URL;var spliturl = url.split

('screen');window.location=spliturl[0] + 'screen=ally&mode=forum'"; break
		default: break;
	}
},false);
})();