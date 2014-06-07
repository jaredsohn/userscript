// ==UserScript==
// @name           heise.de no fixed width
// @namespace      http://manuelseeger.de
// @description    Expands heise.de to fill the browser window
// @include        http://www.heise.de/
// @include        http://www.heise.de/news*
// ==/UserScript==

(function(){

// remove ads and sitemap
var container = document.getElementById('container');
var bannerzone = document.getElementById('bannerzone');
container.removeChild(bannerzone);
var sitemap = document.getElementById('sitemap');
container.removeChild(sitemap);


// reset styles to expand page
style=document.createElement("style");

style.innerHTML="#container{width:auto !important; margin-top:0 !important;}#mitte{width:auto !important;background: none !Important;}#container_content{width: auto !important;top:0!important;}#mitte_links{width: auto !important;padding-right:30%!important;}#mitte_rechts{background-color:#eee !important;width:28% !important;position:absolute !important;top:120px !important;right:0em !important;float:none !important;}#sitemap{display: none !important;}#navi_bottom{clear:both;!important;padding-right:30%!important;}"
document.getElementsByTagName("head")[0].appendChild(style);

})();

