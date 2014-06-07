// ==UserScript==
// @name            Pipermail fold
// @namespace       http://jotarp.org/node/80
// @description     Pliega las líneas de los archivos de pipermail
// @include         */pipermail/*
// ==/UserScript==

(function(){ 
	
  var cssStyle  = 'pre {'
                    + 'white-space: pre-wrap;'
                    + 'white-space: -moz-pre-wrap;'
                    + '}';

  var head = document.getElementsByTagName("HEAD")[0];
  var css  = window.document.createElement('link');
  css.rel  = 'stylesheet';
  css.type = 'text/css';
  css.href = 'data:text/css;charset=utf-8,'+escape(cssStyle);
  head.appendChild(css);
	
})()