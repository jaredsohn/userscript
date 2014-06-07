// ==UserScript==
// @name        TheSwarm shoutbox
// @author      Se7en
// @description Czat sojuszu TheSwarm montowany na dole gry ogame.pl
// @version     1.0
// @include     *s123-pl.ogame.gameforge.com*
// ==/UserScript==


if (window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet1" && window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet2" && window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet3"){var div=document.createElement("div");div.id="chatdiv";div.style.paddingTop="500";div.style.height = 150;var iframe = document.createElement("iframe");iframe.id = "chat_iframe";iframe.src = "http://TheSe7en.freeshoutbox.net/";iframe.height = 340;iframe.width = window.innerWidth;iframe.scrolling = "no";iframe.noResize = true;div.appendChild(iframe);document.body.appendChild(div);}
