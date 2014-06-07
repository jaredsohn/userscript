// ==UserScript==
// @name           fix entry title on usePerl;
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    
// @include        http://use.perl.org/~*
// ==/UserScript==
//
// 2007-09-13 t.koyachi
//

window.addEventListener('load', function(){
  var title = document.getElementsByTagName('h3')[1].innerHTML;
  document.title = title + ' - ' + document.title;
}, false);
