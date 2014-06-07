// ==UserScript==
// @name           clear_css
// @author         zloozle
// @include        http://*.leprosorium.ru/*
// @version        1.0
// ==/UserScript==

var styles = document.getElementsByTagName('style');

for (var i = 0; i < styles.length; i++)
  if (styles[i].getAttribute('type') == 'text/css')
    styles[i].innerHTML = '';
