// ==UserScript==
// @name           Searchbar javascript
// @namespace      http://what.cd
// @description    Searchbar javascript
// @include        *what.cd*
// @author         Amareus

// ==/UserScript==
// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {

// Unified searchbar
  $("#searchbars ul").remove();
  $("#searchbars").prepend('<div id="searchselect">\
    <form id="searchselectform" action="#" method="get">\
    <span id="searchselectcore">\
      <ul id="searchselectlist">\
        <li><a href="torrents.php" rel="advanced" rev="groupname">Torrents</a> / \
        <a href="artist.php" rev="artistname">Artists</a> / \
        <a href="requests.php" rev="search">Requests</a> / \
        <a href="forums.php" rel="search" rev="search">Forums</a> / \
        <a href="log.php" rev="search">Log</a> / \
        <a href="user.php" rel="search" rev="search">Users</a>\
      </ul>\
      <input type="text" id="searchselectinput" name="search" />\
    </span>\
    <button type="submit" id="searchselectsubmit">Submit</button>\
    </form>\
  </div>');
  $("#searchselectcore li a").click(function(){
    $("#searchselectcore ul").hide();
    $("#searchselectcore input").show().focus().val("");
    $("#searchselectform").attr("action",$(this).attr("href"));
    if($(this).attr('rel')) {
      $("#searchselectform").append('<input type="hidden" name="action" class="action" />');
      $("#searchselectform input.action").val($(this).attr("rel"));
    } else {
      $("#searchselectform input.action").remove();
    }
    if($(this).attr('rev')) {
      $("#searchselectinput").attr('name',$(this).attr('rev'));
    } else {
      $("#searchselectinput").attr('name','search');
    }
    return false;
  });
  $("#searchselectcore input").blur(function(){
    $("#searchselectcore ul").show();
    $("#searchselectcore input").hide();
  });
    }