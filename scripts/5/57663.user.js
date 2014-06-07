// ==UserScript==
// @name           Google Resizer
// @namespace      GIJoe - http://userscripts.org/users/65048
// @description    Makes the Google Search bar normal again. VIA http://userscripts.org/topics/34933
// @include        http://www.google.*
// @include        http://google.*
// ==/UserScript==
function addGlobalStyle(css) {
  var head_elem=document.evaluate('//head',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  if (!head_elem) { return; }
  var style_elem=document.createElement('style');
  style_elem.setAttribute('type','text/css');
  style_elem.textContent=css;
  head_elem.appendChild(style_elem);
}

addGlobalStyle(''
+' .lst { font-size:13px; margin:0.1em; }'
+' .lsb { font-size:13px; margin:0.1em; padding-bottom:0.2em; height:24px;}'
);