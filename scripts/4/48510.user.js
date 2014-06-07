// --------------------------------------------------------------------------------
// Copyright (C) 2008  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei Silent Announcement
// @namespace       http://cuimingda.com
// @description     trim marquee animation of the announcement in dian.koubei.com
// @include         http://dian.koubei.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// 0.1 @ 2009/05/07 # Initial Release
// --------------------------------------------------------------------------------

;(function() {

  var reLocation = /^http:\/\/dian\.koubei\.com\/\d+$/;
  if(!reLocation.test(location.href)) {
    return;
  }

  var oMarquee = $("marquee:first"),
  reTags = /<\/?[^>]+>[^<]*/g,
  reTag = /<(\/?\w+)\s*[^>]*>([^<]*)/,
  results = oMarquee.html().match(reTags),
  results_length = results.length,
  permissible_tags = ["p", "\/p"],
  i, tag, converted = "";
  
  for(i = 0; i < results_length; i++) {
    if(reTag.test(results[i])) {
      if($.inArray(RegExp.$1, permissible_tags) !== -1) {
        converted = converted.concat("<" + RegExp.$1 + ">");
      }
      
      if(RegExp.$2 !== "") {
        converted = converted.concat(RegExp.$2);
      }
    }
  }
  
  oMarquee.replaceWith("<div>" + converted +"</div>");
  
})();