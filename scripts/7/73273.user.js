// ==UserScript==
// @name           Minecraft - Stretch to full window
// @namespace      http://userscripts.org/users/144413
// @description    Modifies the page layout so that the Minecraft applet stretches to fit the screen. Works with Indev.
// @include        http://minecraft.net/indev/
// @include        http://minecraft.net/infdev/
// @include        http://minecraft.net/survivaltest/
// @include        http://minecraft.net/game/
// @include        http://minecraft.net/play.jsp*
// ==/UserScript==

var percentFilled = '100%';

var applets = document.getElementsByTagName('applet');
applets[0].height = percentFilled;
applets[0].width = percentFilled;

var div = document.getElementById('content');
div.style.marginLeft = 0;
div.style.marginRight = 0;
div.style.height = percentFilled;
div.style.width = percentFilled;
