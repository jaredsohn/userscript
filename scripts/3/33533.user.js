// ==UserScript==
// @name           Dosug fix bug
// @namespace      http://ya.ru
// @description    fix bug
// @include        http://*dosug.cz*
// @include        http://*elitegirls.cz*

// ==/UserScript==

function all_click(){
  unsafeWindow.show_all_img();
  unsafeWindow.switchVis('girl_services');
  unsafeWindow.switchVis('girl_sticker');
}
embedFunction(all_click());