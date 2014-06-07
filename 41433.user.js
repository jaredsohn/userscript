// ==UserScript==
// @name           twitter highlight replies
// @namespace      kej.tw
// @description    twitter highlight replies function
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    jQuery = unsafeWindow.jQuery;
    highlight();
  }
}

function highlight(){
  var username = jQuery.trim(jQuery('#me_name').text());
  if(username){
    jQuery('span.entry-content').each(function(){
      if(jQuery(this).text().indexOf('@' + username) != -1){
        jQuery(this).parents('.hentry').css('background', '#d7ffd7').mouseover(function(){jQuery(this).css('background', '#bfffbf')}).mouseout(function(){jQuery(this).css('background', '#d7ffd7')});
      }
    });
  }
}

GM_wait();