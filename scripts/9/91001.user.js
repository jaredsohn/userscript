// ==UserScript==
// @name           WikipediaDonationEverywhereJAJP
// @namespace      http://anond.hatelabo.jp
// @include        *
// @exclude        http://*.wikipedia.org http://*.wikimedia.org http://wikimediafoundation.org
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @version        0.0.1
// ==/UserScript==


(function(){
	 var ref = document.getElementsByTagName('body')[0];
	 var node = document.createElement('div');
	 var baseUrl = 'http://wikimediafoundation.org/wiki/Special:LandingCheck';
	 var queryString = jQuery.param( { 'landing_page': 'WMFJA1', 'language': 'ja', 'country': 'JP', 'utm_source':location.href, 'utm_medium': 'sitenotice', 'utm_campaign':'fridayOpening' } );
	 var url = baseUrl + '?' + queryString;
	 node.innerHTML = "\
<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js\"></script>\
<style type=\"text/css\">\
 #centralNotice.collapsed #JA1banner3{\
  display: none;\
 }\
\
 #JA1banner3{\
  position: absolute;\
  width: 95%;\
  border: solid 1px silver;\
  background-color: #1e1e1e;\
  height: 172px;\
  background-image: url(http://upload.wikimedia.org/centralnotice/images/Jimmy-window-light.jpg) !important;\
  background-position: right top;\
  background-repeat: no-repeat;\
  margin-bottom: 0.5em !important;\
  z-index: 1001;\
 }\
\
 #JA1banner3-text {\
  padding: 1.25em 50px .75em .75em !important;\
  overflow: visible;\
  color: #333333;\
  font-family: helvetica, arial, monospace;\
  font-weight: normal;\
  text-align: left;\
  font-size: 2.25em;\
  line-height: 1.125em;\
  cursor: pointer;\
  width: 60%;\
  background-color: transparent;\
 }\
\
 #cn-toggle-box {\
  position: absolute;\
  z-index: 1000;\
  top: .2em;\
  right: .2em;\
 }\
\
 #JA1banner3 a:hover {\
  text-decoration: underline;\
  color: #333333;\
 }\
</style>\
\
\
<div id=\"JA1banner3\">\
\
<a class=\"variable_lp cn-full-banner-click\" href=\""+url+"\">\
\
\
<div id=\"JA1banner3-text\">\
\
   <span> ウィキペディア創設者<br />ジミー・ウェールズからの<br />メッセージをお読みください</span>\
     \
</div>\
\
</a>\
\
 <div id=\"cn-toggle-box\">\
 <a href=\"#\" onclick=\"jQuery('#JA1banner3').attr('style', 'display: none !important');return false\">[X]</a>\
 </div>\
</div>\
  "; 
 ref.parentNode.insertBefore(node, ref);
})();

