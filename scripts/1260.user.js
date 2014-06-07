// ==UserScript==
// @name          GM UserScripts Wiki
// @namespace     http://loucypher.cjb.net/
// @include       http://*.dunck.us/collab/*
// @include       http://dunck.us/collab/*
// @exclude       http://dunck.us/collab/*?action=edit*
// @description	  Iconbar & username fixed position
// ==/UserScript==

(function() {
  var dt = {
    injectcss:function(css) {
      head = document.getElementsByTagName('head')[0];
      script = document.createElement('style');
      script.setAttribute('type', 'text/css');
      script.innerHTML = css;
      head.appendChild(script);
    }
  }

  var a = ('' +
    '#username,\n' +
    '#iconbar {\n' +
    '  position: fixed;\n' +
    '  top: 0;\n' +
    '  right: 0;\n' +
    '  margin: 0;\n' +
    '  border-bottom: 1px solid black;\n' +
    '  border-left: 1px solid black;\n' +
    '  -moz-border-radius-bottomleft: .5em;\n' +
    '  -moz-opacity: .1;\n' +
    '}\n\n' +
    '#username:hover,\n' +
    '#iconbar:hover {\n' +
    '  background-color: #edd097;\n' +
    '  color: maroon;\n' +
    '  -moz-opacity: 1;\n' +
    '}\n\n' +
    '#iconbar {\n' +
    '  width: 170px;\n' +
    '  padding: .25em 1em;\n' +
    '}\n\n' +
    '#username {\n' +
    '  border-top: 1px solid black;\n' +
    '  margin-top: 23px;\n' +
    '  padding: 0 1em .5em;\n' +
    '}\n\n' +
    '#username a {\n' +
    '  font-weight: bold;\n' +
    '}\n\n' +
  '');
  dt.injectcss(a);
})();
