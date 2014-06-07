// ==UserScript==
// @name           twitter highlight myself
// @namespace      kej.tw
// @description    twitter highlight myself function
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
    jQuery('.hentry strong a').each(function(){
      if(jQuery(this).text() == username){
        jQuery(this).parents('.hentry').css('background', '#e6edff').mouseover(function(){jQuery(this).css('background', '#e1eaff')}).mouseout(function(){jQuery(this).css('background', '#e6edff')});
      }
    });
  }
}

GM_wait();