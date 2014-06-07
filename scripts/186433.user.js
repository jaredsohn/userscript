// ==UserScript==
// @name        N_G shoutbox
// @author      tonyviroos
// @description Czat sojuszu N_G Wasat
// @version     1.0
// @include     *s123-pl.ogame.gameforge.com*
// ==/UserScript==


if (window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet1" && window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet2" && window.location != "http://s123-pl.ogame.gameforge.com/game/index.php?page=fleet3"){var div=document.createElement("div");div.id="chatdiv";div.style.paddingTop="500";div.style.height = 150;var iframe = document.createElement("iframe");iframe.id = "chat_iframe";iframe.src = "http://tonyviroos.freeshoutbox.net/";iframe.height = 340;iframe.width =400;iframe.scrolling = "no";iframe.noResize = true;div.appendChild(iframe);document.body.appendChild(div);}

