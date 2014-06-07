// ==UserScript==
// @name           Odreklamovac na mapy.sk
// @namespace      http://dobryobchod.com
// @description    Odstrani z tlacenej verzie horny pre tlac nepodstatny obsah
// @include        http://mapy.atlas.sk/print.php
// ==/UserScript==
divy = document.getElementsByTagName('div');
divy[0].removeChild(divy[1]);
