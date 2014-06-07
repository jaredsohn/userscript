// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei Dianping Tale
// @namespace       http://userscripts.org/scripts/show/51008
// @description     Add a button to comment tale page, help you back to the shop.
// @include         http://*.koubei.com/editcate/postpkappraisementsuccess.html?storeId=*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
  if(!location.href.match(/storeId=([^&]+)&/)) {
    return false;
  }
  
  var storeId = location.href.match(/storeId=([^&]+)&/)[1];
  var backButton = "<p class=\"toolBar\"><a class=\"yk-btn yk-btn-style-c yk-m\" href=\"http://hangzhou.koubei.com/store/detail--storeId-" + storeId + "\"><b><b>返回点评的店铺</b></b></a><p>";
  
  $(backButton).insertAfter("p.toolBar");
  
})();

/* Update History
 * 0.1 @ 2009/06/06 # Initial Release
 */