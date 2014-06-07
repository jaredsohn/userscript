// ==UserScript==
// @name          VK share button for Habrahabr
// @namespace     http://chuddesnov.ru
// @description   Retains text entered into textareas.
// @include       http://habrahabr.ru/*
// @author        Alexander Chudesnov
// @version       1.0
// ==/UserScript==

var nfo=document.querySelectorAll(".entry-info"), dl=document.location, vkb=function(el){
  var vk_button=document.createElement('div'), un=el.getElementsByClassName("facebook")[0];
  vk_button.className="vkontakte";
  vk_button.innerHTML='<a href="http://www.vk.com/share.php?url=http://'+dl.host+dl.pathname+'" title="ВКонтакте" onclick="window.open(this.href, \'Поделиться ссылкой ВКонтакте\', \'width=800,height=300\'); return false"></a>';
  un.parentNode.insertBefore(vk_button,un);
};
for (key = 0; key<nfo.length;key++){
vkb(nfo[key])
}
document.head.innerHTML+='<style>.entry-info .vkontakte a {\n\tbackground: url(http://favicon.yandex.ru/favicon/www.vkontakte.ru) no-repeat -1px 0px;\n\tdisplay: inline-block;\n\theight: 16px;\n\tposition: relative;\n\ttop: 1px;\n\twidth: 14px;\n}\n.entry-info .vkontakte {\n\topacity:0.5;\n\tmargin-right:-2px !important;\n}\n.entry-info .vkontakte:hover{\n\topacity:1;\n}</style>';