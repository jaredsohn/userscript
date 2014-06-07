// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Homepage BBS Viewer
// @namespace       http://userscripts.org/scripts/show/51094
// @description     view various BBS box in the homepage at the same time
// @include         http://www.koubei.com/city/home.html?city=2595
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
 
  $("#categories,#promotions,#requests,#providers,#dianping,#pd1,#pd2,#commu").remove();
  $("div[id=ad2]").remove();
  
  var container = $(".yui-main .yui-b:first"),
      cities = ["99", "2076", "2595"],
      selector = "#commu",
      i = 0,
      cityAmount = cities.length;
  
  for(; i<cityAmount; i++) {
    $(document.createElement("div"))
      .load("/city/home.html?city=" + cities[i].toString() + " " + selector)
      .appendTo(container);  
  }


})();

/* Update History
 * 0.1 @ 2009/06/09 # Initial Release
 */