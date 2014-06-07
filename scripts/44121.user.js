// ==UserScript==
// @name           Retweet Highlight
// @namespace      penkapp.com
// @description    twitter highlight retweets function
// @include        https://twitter.com/*
// @include        http://twitter.com/*
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
      if(jQuery(this).text().indexOf('RT') != -1){
        jQuery(this).parents('.hentry').css('background', '#FFE2DF').mouseover(function(){jQuery(this).css('background', '#FFCFCF')}).mouseout(function(){jQuery(this).css('background', '#FFE2DF')});
      }
    });
  }
}

GM_wait();