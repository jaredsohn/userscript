// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Stop 58 Cheat You
// @namespace       http://userscripts.org/scripts/show/51182
// @description     view  the true amount of visitors and offers
// @include         http://www.58.com/changecity.aspx
// @include         http://58.com/
// @include         http://www.58.com/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version         0.2
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
 
  var infoAmount = $("#total_info");
  var userAmount = $("#total_user");
  
  infoAmount.attr("id", "stop-cheat-me-when-view-info");
  userAmount.attr("id", "stop-cheat-me-when-view-user");

  var changeInfo = parseInt(GM_getValue("infoAmount")) - parseInt(infoAmount.text());
  var changeUser = parseInt(GM_getValue("userAmount")) - parseInt(userAmount.text());
  
  $("#todaynum").html($("#todaynum").html().replace("今日发布", "总发布").replace("今日有", "总共有"));
  $("#todaynum").append("；和上次访问时相比，信息数增加了<strong>" + changeInfo + "</strong>条，用户数增加了<strong>" + changeUser + "</strong>位。");
  
  $("#announcementbody").css({
    "border" : "1px solid #ccc",
    "height" : "720px",
    "top" : "180px",
    "padding" : "10px",
    "-moz-border-radius" : "5px"
  });
  $(".c_btop:first").remove();
  $("div.c_b>span.fr").remove();
  $("#header").css("background", "none");
  
  $("#citylist").css({
    "border" : "1px solid #ccc",
    "float" : "left",
    "width" : "538px",
    "padding" : "10px",
    "-moz-border-radius" : "5px"
  });
  $("#citylist dd").find("a:gt(13)").remove();
  
  GM_setValue("infoAmount", infoAmount.text());
  GM_setValue("userAmount", userAmount.text());

})();