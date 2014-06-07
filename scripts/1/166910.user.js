// ==UserScript==
// @name           Path Converter
// @namespace      Path Converter
// @description    Convert compressed url to uncompressed url.
// @include        http:*
// ==/UserScript==

var url = document.URL;

if(url.indexOf('.min.') > 0){
    location.href = url.replace('.min', '');
}

