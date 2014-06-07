// ==UserScript==
// @name         Dark Night Reader
// @description  Easing colors for readers eyes
// @include      *wikipedia.org* *google.com*
// @exclude      *facebook*
// ==/UserScript==

(function(){
  var css
  ,   style='* {background:#333!important; color:#ccc!important }'
  +   ':link, :link * {color:#88f!important } '
  +   ':visited, :visited * { color: #d8d!important } ';

  if(document.createStyleSheet) {
     document.createStyleSheet("javascript:'"+style+"'");
  } else {
     css=document.createElement('link');
     css.rel='stylesheet';
     css.href='data:text/css,'+escape(style);
     document.getElementsByTagName("head")[0].appendChild(css);
  }
})();