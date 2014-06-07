// ==UserScript==
// @name           Redirect google-search
// @namespace      http://rokdd.de/eml
// @include        http://*.google.de/search*
// @include        http://google.de/search*
// @include        http://google.de/
// @include        http://*.google.com
// @include        http://*.google.com/search*
// @include        http://google.com/search*
// ==/UserScript==


//modified: http://www.mozdev.org/pipermail/greasemonkey/2005-April/001570.html

var rules = new Array(
     [/(google\.com)(\/.*)$/, 'cuil.com$2'],
     [/(google\.de)(\/.*)$/, 'cuil.com$2']
);

var href = window.location.href;

for (i = 0; i < rules.length; i++){
     var replaced = href.replace(rules[i][0], rules[i][1]);
     if (replaced != href){
         window.location.href = replaced;
         return;
     }
}