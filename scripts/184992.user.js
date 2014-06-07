// ==UserScript==
// @name WK easy answer
// @author galymzhan
// @version 0.0.2
// @description Lets you fill in answers by clicking instead of typing
// @include http://www.wanikani.com/review/session*
// @include https://www.wanikani.com/review/session*
// @downloadURL https://userscripts.org/scripts/source/184992.user.js
// @updateURL https://userscripts.org/scripts/source/184992.meta.js
// @grant none
// ==/UserScript==

(function(window) {
  var $ = window.jQuery, intervalId;

  function init() {
    var $yesno = $('<div style="text-align:center"></div>');
    $('#question').append($yesno);
    var styles = 'padding:10px 0;font-size:1.5em;display:inline-block;width:45%';
    $yesno.append('<a href="#" id="wklite-no" style="' + styles + '" data-ok="0">NO</a>');
    $yesno.append('<a href="#" style="' + styles + '" data-ok="1">YES</a>');

    $('a', $yesno).on('click', function(event) {
      event.preventDefault();
      setAnswer($(this).data('ok') == 1);
    });

    function setAnswer(isRight) {
      var text = getAnswer(isRight);
      if (text) {
        $('#user-response').val(text);
      }
    }

    function getAnswer(isRight) {
      var currentItem = $.jStorage.get('currentItem');
      if (!currentItem) {
        alert("Can't get currentItem from jStorage");
        return undefined;
      }
      var questionType = $.jStorage.get('questionType');
      if (!questionType) {
        alert("Can't get questionType from jStorage");
        return undefined;
      }
      if (questionType == 'meaning') {
        return isRight ? currentItem.en[0] : 'asdf';
      }
      if (!isRight) return 'ばばばば';
      if (currentItem.voc) {
        return currentItem.kana[0];
      } else if (currentItem.emph == 'kunyomi') {
        return currentItem.kun[0];
      }
      return currentItem.on[0];
    }

    // Remove autofocus
    var autoFocused = false;
    $('#answer-form button').on('click', function() {
      autoFocused = true;
    });

    $('#user-response').on('focus', function() {
      if (autoFocused) {
        window.setTimeout(function() {
          autoFocused = false;
          $('#wklite-no').focus();
          $(window).scrollTop(0);
        }, 150);
      }
    });
  }
  init();

})(typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
