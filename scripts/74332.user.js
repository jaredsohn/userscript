// ==UserScript==
// @name           Whatlock
// @namespace      http://what.cd
// @description    Accompanying userscript for the Whatlock theme by karlbright
// @include        https://ssl.what.cd/*
// @include        http://what.cd/*
// @include        http://www.what.cd/*
// @require http://code.jquery.com/jquery-1.4.1.min.js
// ==/UserScript==

(function() {
  
  
  // Unified searchbar
  $("#searchbars ul").remove();
  $("#searchbars").prepend('<div id="searchselect"><form id="searchselectform" action="#" method="get">\
    <input type="hidden" name="action" class="action" />\
    <span id="searchselectcore">\
      <ul>\
        <li><a href="torrents.php" rel="advanced">Torrents</a> / </li>\
        <li><a href="artist.php">Artists</a> / </li>\
        <li><a href="requests.php">Requests</a> / </li>\
        <li><a href="forums.php" rel="search">Forums</a> / </li>\
        <li><a href="log.php">Log</a> / </li>\
        <li><a href="user.php" rel="search">Users</a></li>\
      </ul>\
      <input type="text" />\
    </span>\
    <button type="submit" id="searchselectsubmit">Submit</button>\
  </form></div>');
  $("#searchselectcore li a").click(function(){
    $("#searchselectcore ul").hide();
    $("#searchselectcore input").show().focus().val("");
    $("#searchselectform").attr("action",$(this).attr("href"));
    if($(this).attr("rel")) {
      $("#searchselectform input.action").val($(this).attr("rel"));
    }
    return false;
  });
  $("#searchselectcore input").blur(function(){
    $("#searchselectcore ul").show();
    $("#searchselectcore input").hide();
  });
  
  
}());