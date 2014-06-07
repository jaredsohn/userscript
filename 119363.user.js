// ==UserScript==
// @name           www.drive2.ru show folded photos
// @author         George L. Yermulnik
// @homepage       http://userscripts.org/scripts/show/119363
// @namespace      http://userscripts.org/
// @description    show folded photos at http://www.drive2.ru/ by default
// @include        http://www.drive2.ru/*
// ==/UserScript==

function main() {
  var options = document.getElementsByTagName('span');
  for (i = 0; i < options.length; i++) {
       if (options[i].getAttribute('class') == 'd2cuttitle') {
            options[i].setAttribute('style', 'display: none;');
       }
  }

  var options = document.getElementsByTagName('div');
  for (i = 0; i < options.length; i++) {
       if (options[i].getAttribute('class') == 'd2cutbody') {
            options[i].setAttribute('style', 'display: block;');
       }
  }

  var options = document.getElementsByTagName('img');
  for (i = 0; i < options.length; i++) {
       if (options[i].getAttribute('src') == '/images/1.gif') {
            var src = options[i].getAttribute('title');
            options[i].setAttribute('src', src);
       }
  }
}
main();