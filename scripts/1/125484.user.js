// ==UserScript==
// @name           DTD 1.5 - Kongregate
// @namespace      arreloco
// @include        http://www.kongregate.com/games/preecep/desktop-tower-defense-1-5*
// ==/UserScript==
game = document.getElementById('game_wrapper');
new_game = '<object width="700" height="500" align="middle" id="gamefile" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="http://www.armorgames.com/files/games/desktop-tower-defens-1128.swf" name="movie"><param value="high" name="quality"><param value="window" name="wmode"><param value="false" name="allowfullscreen"><param value="" name="flashvars"><embed width="700" height="500" align="middle" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash" flashvars="" allowfullscreen="false" wmode="window" name="gamefile" quality="high" src="http://www.armorgames.com/files/games/desktop-tower-defens-1128.swf"></object>'
game.innerHTML = new_game;
//Enjoy your Kong :)