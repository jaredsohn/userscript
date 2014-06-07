// ==UserScript==
// @name           Gmail: Make images fixed with + individual scrollbars
//
// @description    When there are extra-wide inline images in the message body, it stretches the
//                 message area to fit the image. The problem is, sometimes it stretches that
//                 area so wide that it no longer fits entirely in your browser window. The
//                 message text, of course, flows to fill the whole width of that area, meaning
//                 that each line of text is only partially visible on the screen and you have
//                 to move the page scrollbar back and forth for each line just to read it.
//                 Very annoying.
//
//                 This script aims to work around that problem by forcing each extra-wide image
//                 in the message to be a certain fixed width (800 px unless you change it) and
//                 adding a scrollbar to the bottom of it so that you can still scroll over to
//                 see any part of it that is chopped off.
//
//                 How does it work?
//
//                 Every 2 seconds, it looks for img tags that are wider than your maximum (800 px
//                 unless you change it). Each extra-wide img tag that is found is wrapped in a
//                 div that has a fixed width and has "overflow: auto", which causes the scrollbars
//                 to appear because its contents is wider than its own width.
//
// @namespace      http://userscripts.org/users/129191
// @include        http*://mail.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// (For whatever reason, http://code.jquery.com/jquery-latest.js (1.4.1) doesn't work)

// ==/UserScript==
//

//unsafeWindow.console.log(window.location.href, jQuery('#canvas_frame'));
//if(jQuery('#canvas_frame').size() > 0) {
//  GM_log(jQuery('div').size() + ' divs on page');
//}

// Somehow referencing here is necessary to prevent ugly errors from occuring when we try to call it from setTimeout callback
//unsafeWindow.console.log;

if (unsafeWindow.console) {
  log = unsafeWindow.console.log;
} else {
  log = GM_log;
}

  var max_image_width = GM_getValue('max_image_width') || 800;
  var img_container_class = "wide_img_container";
  var gmail = null;
  var interval_id;

  jQuery(function() {
    //GM_log('loaded');
//    if (unsafeWindow.gmonkey) {
//      unsafeWindow.gmonkey.load('1.0', function(g) {
//        gmail = g;
//        window.setTimeout(registerCallback, 500);
//      });
//    }


      GM_addStyle('.'+img_container_class+' { border: 1px dashed green ! important; width: '+max_image_width+'px; overflow: auto;}');

      setTimeout(make_images_fixed_width, 2000);
  });

//  function registerCallback() {
//      //gmail.registerViewChangeCallback(view_change_callback);
//      view_change_callback();
//  }

//  function view_change_callback() {
////    if (gmail.getActiveViewType() == 'cv') {
////      GM_log('in conversation view');
////    } else {
////      return;
////    }
//
//    setTimeout(make_images_fixed_width, 1000);
//  }

  function make_images_fixed_width() {
    //unsafeWindow.console.log(jQuery('#canvas_frame').contents().find('img[width=904]')); 
    //GM_log('here');

    //var imgs = document.getElementsByTagName('iframe')[3].contentWindow.document.getElementsByTagName('img');
    //jQuery("iframe").size();
    var imgs = jQuery("#canvas_frame").contents().find("img").
                filter(function(i) {return jQuery(this).attr('width') > max_image_width});
    if (imgs.size() > 0) {
      //log(jQuery('#canvas_frame').contents().find('img[width=904]')); 
      imgs.each(function(i) {
        //log(i, this);
        if (jQuery(this).parent('.wide_img_container').size() == 0) {
          //log('wrapping');
          jQuery(this).wrap('<div class="wide_img_container"></div>');
          log(jQuery("#canvas_frame").contents().find('.wide_img_container')); 
        }
      })
      //log(imgs.size() + " images found.");
    } else {
      //log("no images");
    }
    setTimeout(make_images_fixed_width, 2000);
  }
