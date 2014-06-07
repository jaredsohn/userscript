// ==UserScript==
// @name           minecraftWide
// @namespace      http://goodsoul.de
// @description    on minecraft game website sizes applet and content div somewhat bigger
// @include        http://*minecraft.net/game*
// ==/UserScript==

contentBlock = document.getElementById('content')
contentBlock.style.width = '1280px';

applet = document.getElementsByTagName('applet');
applet[0].setAttribute('width', '1280');
applet[0].setAttribute('height', '768');