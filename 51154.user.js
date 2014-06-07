// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Google your offer
// @namespace       http://userscripts.org/scripts/show/51154
// @description     add a google link in the offer page
// @include         *.koubei.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
  if($("div.offer-basic-info").length === 0) {
    return false;
  }
  
  var offerTitle = $("h1:first");
  var contact = $("div.contact-card dd:first");
  var shop = $("div.hd-shop-info h2:first");
  
  var trim = function(str) {
    return str.replace(/^\s+|\s+$/, "");
  };
  
  var googleLink = function(obj) {
    var linkText = trim(obj.text());
    return "<p style=\"margin:5px 0;\"><a target=\"_blank\" href=\"http://www.google.cn/search?hl=zh-CN&q=" + encodeURI(linkText) + "\">用Google搜索<strong style=\"color:#c30;font-weight:bold;\">“" + linkText + "”</strong></a></p>"
  };

  $(document.createElement("div"))
    .css({
      "border" : "1px solid #ccc",
      "margin" : "10px 0",
      "padding" : "5px 10px",
      "line-height" : "19px",
      "-moz-border-radius" : "5px"
    })
    .attr("id", "google-your-offer")
    .prependTo($("div.yui-cn-t3>div.yui-b"));
    
  if(offerTitle.length === 1) {
    $("#google-your-offer").append(googleLink(offerTitle));
  }
  
  if(contact.length === 1) {
    $("#google-your-offer").append(googleLink(contact));
  }
  
  if(shop.length === 1) {
    $("#google-your-offer").append(googleLink(shop));
  }
  
  
})();

/* Update History
 * 0.1 @ 2009/06/10 # Initial Release
 * 0.2 @ 2009/06/10 # Add contact search and shop name search
 */