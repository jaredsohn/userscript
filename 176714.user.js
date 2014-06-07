// ==UserScript==
// @name        WhySoSirius shoutbox
// @author      Hilary Jendrasiak
// @description Czat sojuszu WhySoSirius montowany na dole gry ogame.pl
// @version     1.0
// @grant       http://youtu.be/3a7cHPy04s8
// @include     *uni119.ogame.pl/game/index.php*
// ==/UserScript==


if (window.location != "http://uni119.ogame.pl/game/index.php?page=fleet1" && window.location != "http://uni119.ogame.pl/game/index.php?page=fleet2" && window.location != "http://uni119.ogame.pl/game/index.php?page=fleet3"){var div=document.createElement("div");div.id="chatdiv";div.style.paddingTop="500";div.style.height = 150;var iframe = document.createElement("iframe");iframe.id = "chat_iframe";iframe.src = "http://hilary.freeshoutbox.net/";iframe.height = 340;iframe.width = window.innerWidth;iframe.scrolling = "no";iframe.noResize = true;div.appendChild(iframe);document.body.appendChild(div);}
