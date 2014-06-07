// ==UserScript==
// @name           NeoGAF - Intergrated Google Search
// @version        1.1.0
// @namespace      http://www.neogaf.com/
// @description    Adds Google Custom Search To NeoGAF
// @include        http://www.neogaf.com/forum/*
// @include        http://www.neogaf.net/forum/*
// ==/UserScript==

var js = '<!-- Use of this code assumes agreement with the Google Custom Search Terms of Service. -->\
<!-- The terms of service are available at /cse/docs/tos.html -->\
<form name="cse" id="searchbox_demo" action="http://www.google.com/search" method="get">\
  <input type="hidden" name="cref" value="http://www.google.com/cse/tools/makecse?url=www.neogaf.com%2Fforum%2F" />\
  <input type="hidden" name="ie" value="utf-8" />\
  <input type="hidden" name="hl" value="" />\
  <input style="border: 1px solid rgb(126, 157, 185); padding: 2px; background: url(http://www.google.com/cse/intl/en/images/google_custom_search_watermark.gif) no-repeat scroll left center rgb(255, 255, 255); text-align: right" name="q" type="text" size="40" />\
  <input type="hidden" name="sa" value="Search" />\
</form>\
<!-- <script type="text/javascript" src="http://www.google.com/cse/tools/onthefly?form=searchbox_demo&lang="></script> -->\
';

//create div
var sp = document.createElement('div');
sp.setAttribute('style','text-align: right;margin: -10px 0px 2px 0px;width:300px;position:absolute;top:116px;right:10px;z-index:99');
sp.innerHTML = js;
sp.id ='goo';

var place = document.getElementById('header');
place.parentNode.insertBefore(sp,place.nextSibling);