// ==UserScript==
// @name           twitter soft unfollow
// @namespace      kej.tw
// @description    twitter soft unfollow
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// you MUST edit the line below, just put the twitter id (whick you want to unfollow) into this array
// example:
// var unfollow_id = new Array('id1', 'id2', 'id3');
var unfollow_id = new Array();

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    jQuery = unsafeWindow.jQuery;
    unfollow();
  }
}

function unfollow(){
  if(unfollow_id.length > 0){
    jQuery('.hentry strong a').livequery(function(){
      if(jQuery.inArray(jQuery.trim(jQuery(this).text()), unfollow_id) > -1){
        jQuery(this).parents('.hentry').remove();
      }
    });
  }
}

GM_wait();