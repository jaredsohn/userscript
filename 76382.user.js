// ==UserScript==
// @name           Visited images
// @namespace	   Paul Balchin
// @description    Visited image links are made 20% transparent
// @version	   0.14
// @include        *
// ==/UserScript==

(function(){
    var css, head, style;
    css  = 'a:visited img{background-color:#fff!important;-moz-opacity:0.2!important;opacity:0.2!important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)"!important;filter:alpha(opacity=20)!important;}';
    css += 'a:hover img{-moz-opacity:1.0!important;opacity:1.0!important;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";filter:alpha(opacity=100);!important}';
    style = document.createElement('style'); 
    style.setAttribute('type','text/css'); 
    style.appendChild(document.createTextNode(css));
    head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
})();
