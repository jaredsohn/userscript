// ==UserScript==
// @name        IHNED.cz Plus
// @namespace   www.ihned.cz
// @include     http://*ihned.cz/*
// @version     v0.1
// ==/UserScript==

var IHNplus = IHNplus || {};

IHNplus.Gallery = (function($, window, undefined) {
  var public = {};

  var REPAIR_DELAY  = 500,
      GALLERY       = '[id$=gallery]',
      GALLERY_INNER = '> div',
      PHOTO_TAB     = '#photo-tab',
      MAIN_PHOTO    = '.mainlink',
      THUMBS        = '.thumbs a';
  
  var gallery,
      repairSlideshowTimer;
  
  /**
   *  Repairs gallery Lytebox by unifying the 'rel' properties.
   */
  var repairSlideshow = function() {
    var galleryId = $(GALLERY_INNER, gallery).prop('id');
    
    $(MAIN_PHOTO, gallery).prop('rel', 'lytebox[' + galleryId + ']');
    
    $(THUMBS, gallery).each(function() {
      $(this).prop('rel', '!lytebox[' + galleryId + ']');
    });
    
    myLytebox.updateLyteboxItems();
  }
  
  /**
   *  Waits until gallery is injected into page by original scripts.
   */
  public.timeSlideshowRepair = function() {
    gallery = $(GALLERY);
    if (!gallery.length) return;
  
    repairSlideshowTimer = window.setInterval(function() {
      // Article without gallery -> exit the waiting routine.
      if ($(PHOTO_TAB).css('display') == 'none') {
        window.clearInterval(repairSlideshowTimer);
      } else {
        // Thumbnails appeared in gallery -> repair gallery and stop waiting.
        if ($(THUMBS, gallery).length) {
          repairSlideshow();
          window.clearInterval(repairSlideshowTimer);
        // Wait more.
        } else {
          timeSlideshowRepair();
        }
      }
    }, REPAIR_DELAY);
  }

  return public;
  
})(jQuery, window);

IHNplus.Gallery.timeSlideshowRepair();
