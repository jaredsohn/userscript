// ==UserScript==
// @name        progress-indicator
// @namespace   github.com/sun-zheng-an
// @version     0.1.1
// @author      Sun Zheng'an
// @description Indicate the current scrolling progress
// @downloadURL https://userscripts.org/scripts/source/402942.user.js
// @updateURL   https://userscripts.org/scripts/source/402942.meta.js
// @include     *
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

jQuery(function ($) {
  var $indicator = $('<div/>', {title: 'Back to top'}).css({
    display: 'none',
    position: 'fixed',
    right: 0,
    bottom: 0,
    padding: '0 5px',
    borderTopLeftRadius: '5px',
    fontSize: '14px',
    lineHeight: '20px',
    backgroundColor: '#1793d1',
    color: 'white',
    cursor: 'pointer'
  }).appendTo('body')

  $indicator.on('click', function () {
    $('html, body').animate({scrollTop: 0})
  })

  function updatePercentage() {
    var offset = $(window).scrollTop()
    var total  = $(document).height() - window.innerHeight
    var percentage = Math.floor(100 * offset / total)

    if (percentage === 0 || total <= 0) {
      $indicator.fadeOut()
    } else {
      $indicator.fadeIn()
    }

    $indicator.text(percentage + '%')
  }

  updatePercentage()
  $(window).on('scroll', updatePercentage)
})
