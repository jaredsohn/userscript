// ==UserScript==
// @name           Throne link for Utopia
// @namespace      http://www.last.fm/user/Quirinus42
// @description    Adds a link to the Throne room to the server chooser page.
// @include        http://utopia-game.com/shared/lobby/*
// ==/UserScript==

var linkz=document.getElementById('navigation').getElementsByTagName('ul')[0]
linkz.innerHTML="<li><a href=\"http://utopia-game.com/wol/game/throne\">Throne&nbsp;Room</a></li>"+linkz.innerHTML