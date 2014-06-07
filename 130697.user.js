// ==UserScript==
// @name Grove UI Improvements
// @description Improvements to make the Grove.io UI cleaner and more readable.
// @include https://grove.io/app/*
// @version 1.0

!function($, App) {
  var initialized = false;
  var updateUI = function() {
    var $pic, $picLI, index, $prevLI, $prevPic, 
        $picSeparator, $picContent,
        $pics = $('.userpic img' + (!initialized ? '' : ':visible')),
        SPACING = '3px';

    initialized = true;

    for(index = $pics.length - 1; index >= 0; index--) {
      $pic = $($pics[index]);
      $picLI = $pic.closest('li');
      if($picLI.attr('data-seen')) break;

      $picLI.attr('data-seen', true);
      $prevLI = $picLI.prev();

      if($prevLI) {
        $prevPic = $prevLI.find('.userpic img');
        $picSeparator = $picLI.find('.separator');
        if($prevPic.attr('src') === $pic.attr('src')) {
          $pic.hide();
          $picLI.find('.user').hide();
          $picSeparator.hide();
          $picLI.css('margin-top', '-5px');
        } else {
          $picSeparator.css({
            'border-bottom': '1px solid #EAEAEA',
            'margin-bottom': SPACING
          });
          $picLI.find('.content').css({
            display: 'block',
            'margin-top': '9px'
          });
          $picLI.css('margin-top', SPACING);
        }
      }
    }
  };

  App.on('newMessage', updateUI);
  App.on('newPrivateMessage', updateUI);
  App.on('routeClicked', updateUI);
  updateUI();
}(jQuery, App)

// ==/UserScript==