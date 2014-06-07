// ==UserScript==
// @name          Clien Google Search
// @namespace     http://www.clien.net
// @description   클리앙에 구글검색 버튼을 달아줍니다.
// @version       1.0.0
// @author        NuRi
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://www.clien.net/cs2/bbs/board.php?bo_table=*
// @include       http://www.clien.net/cs2/bbs/board.php*
// @include       http://www.clien.net/
// ==/UserScript==

// ...script by NuRi

// Add jQuery
/*
var GM_JQ = document.createElement('script');
GM_JQ.type = 'text/javascript';
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
*/
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(letsAddGoogleSearch);

function letsAddGoogleSearch() {
(function(){
  if(typeof jQuery == 'undefined'){
    return;
  }
  jQuery.noConflict();
  var $ = jQuery;
  $(document).ready(function() {
 	 try {
 	 if (!$("#header") && !$("#gnb")) {
 	 	 return;
 	 }

  // add css
  // from http://twitter.github.com/bootstrap/
  $("<style type='text/css'>.gsearchButton { display: inline-block; *display: inline; /* IE7 inline-block hack */ *zoom: 1; padding: 4px 10px 4px; margin-bottom: 0; font-size: 13px; line-height: 18px; color: #333333; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle; background-color: #f5f5f5; background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6); background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6); background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6)); background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6); background-image: -o-linear-gradient(top, #ffffff, #e6e6e6); background-image: linear-gradient(top, #ffffff, #e6e6e6); background-repeat: repeat-x; filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#e6e6e6', GradientType=0); border-color: #e6e6e6 #e6e6e6 #bfbfbf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:dximagetransform.microsoft.gradient(enabled=false); border: 1px solid #cccccc; border-bottom-color: #b3b3b3; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); cursor: pointer; *margin-left: .3em; }</style>").appendTo("head");

 	 var search = '<div style="float:right;margin:3px 15px;"><form method="get" action="http://www.google.co.kr/search"><input type="text" name="q" maxlength="255" value="" style="border: 1px solid #CCCCCC;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;-moz-transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;padding-left: 14px;padding-right: 14px;margin-bottom: 0;-webkit-border-radius: 14px;-moz-border-radius: 14px;border-radius: 14px;display: inline-block;width: 100px;font-size: 12px;height: 15px;line-height: 15px;" /> <input type="submit" value="Google!" class="gsearchButton" style="padding: 2px 6px;font-size: 11px;line-height: 14px;" /><input type="hidden" name="sitesearch" value="www.clien.net" /></form></div>';

 	 $("#gnb").after(search);
 	 }
 	 catch(err) {
 	 }
 });

})();
}
