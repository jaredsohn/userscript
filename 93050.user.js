// ==UserScript==
// @name           Allegro - Szybszy podglad
// @namespace      Allegro
// @description    Skrypt przyspiesza wyswietlanie powiekszonych zdjec (po najechaniu myszka) na liscie aukcji.
// @include        http*://*allegro.pl/*
// @exclude        http*://*allegro.pl/show_user.php?*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
                GM_JQ.src = 'http://allegro.pl/js/jquery-1.4.2.min.js';
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
/*    function letsJQuery() {
        alert($); // check if the dollar (jquery) function works
        alert($().jquery); // check jQuery version
    }
  */  
    
    


function letsJQuery() {
  $.fn.itemPopup = function(){
    function showPopup(popup){
      var link = popup.find('.imgContainer'),
      img = $('<img class="popupThumb" />'),
      trigger = popup.parents('tr').find('.popupTrigger')
      thumbs = popup.find('.popupThumbsGallery > a'),
      t = trigger.position().top,
      p = popup.height(); //popup.hasClass('withoutThumb') ? 60 : 372,
      s = $(window).scrollTop(),
      w = $(window).height(),
      top_pos = (t + p) > (s + w) ? (s + w - p) : t - 10;

      popup.css({top: top_pos, left: trigger.position().left + 80})
      .find('.pointerArrow').css({top: t + (popup.hasClass('withoutThumb') ? 0 : 10) - top_pos});
      if ( link.html() == '' ){
      link.append(img.attr('src', link.attr('rel'))).removeAttr('rel');
      }
      if ( !popup.data('loaded') ){
      thumbs.each(function(){
      var urls = $(this).attr('rel').split('|');
      $(this).attr('href',urls[1]).addClass('popupThumbsChange').append('<img src="' + urls[0] + '" />');});
      popup.data('loaded',true);
      }
      popup.fadeIn(100);
    }
    $('.popupThumbsChange').live('click', function(){
    $(this).parent().children().removeClass('active');
    $(this).addClass('active').parents('.itemPopup').find('.imgContainer img').attr('src',$(this).attr('href'));
    return false;
    });

    return this.each(function(){
      var popup = $(this);
      var timer;
      var trigger = $(this).parents('tr').find('.popupTrigger');

      trigger.bind('mouseenter', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){ showPopup(popup); }, 100);
      }).bind('mouseleave', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){ popup.fadeOut(100); }, 100);
      });
      popup.bind('mouseenter', function(){
        clearTimeout(timer);
      }).bind('mouseleave', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){ popup.fadeOut(100); }, 100);
      });
    });
  };
}