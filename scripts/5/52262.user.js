// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei Feedback List
// @namespace       http://userscripts.org/scripts/show/
// @description     a list
// @include         http://www.koubei.com/cate/newfeedbacklist.html
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
  
  function fillData(page) {
    $.get("http://www.koubei.com/cate/newfeedbacklisttatus.html?type=4&pageNo=" + page, function(data) {
      $("p.suggest", data).each(function() {
        $("#test").append("<li style=\"margin-bottom:5px;\">" + $(this).text().replace(/^\[[^\]]+\]/, "").replace(/\d+-\d+-\d+$/, "") + "</li>");
      });
    });

  }
  
  var suggestions = [];
  
  $("body>*").remove();
  $("body:first").append("<div class=\"yui-d1f\"><div><input id=\"op\"></div><ul id=\"test\"></ul></div>");
  
  for(var i=1; i<=30; i++) {
    (function(f) {
      
      setTimeout(function() {
        fillData(f);
      }, 0);
    })(i);

  }
  
  $("#op").keyup(function() {
    var opt = $(this).val();
    
    if(opt.length < 2) {
      return;
    }
    
    $("li").each(function() {
      
      if($(this).text().indexOf(opt) !== -1) {
        $(this).html($(this).text());
        $(this).html($(this).html().replace(opt, "<span style=\"color:red;font-weight:bold;\">" + opt + "</span>"));
        $(this).show();
      }
      else {
        $(this).hide();
      }
      
    });
  });
})();

/* Update History
 * 0.1 @ 2009/06/23 # Initial Release
 */