// ==UserScript==
// @name           RexLifeTracker
// @namespace      http://hobowars.com
// @include        http://www.hobowars.com/game/game.php?sr=*&cmd=mines&do=enter
// ==/UserScript==

life_left = 0;
fonts = document.getElementsByTagName("font");
for (var i = 0; i < fonts.length; i++) {
	if(fonts[i].innerHTML.search("Bite in Half") > -1) {
		life_left = fonts[i-1].innerHTML;
		break;
	}
}


if (life_left != 0) {

setTimeout(function() { rex_update(); }, 0);

function rex_update() {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://alphasite.x10hosting.com/rex/append.php?l="+life_left,
  onload: function(response) {
    alert(response.responseText);
  }
});
}}