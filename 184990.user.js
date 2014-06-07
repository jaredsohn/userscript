// ==UserScript==
// @name WK optimizer
// @author galymzhan
// @version 0.0.4
// @description Optimize your time on WK
// @include http://www.wanikani.com/review/session*
// @include http://www.wanikani.com/lesson/session*
// @include https://www.wanikani.com/review/session*
// @include https://www.wanikani.com/lesson/session*
// @downloadURL https://userscripts.org/scripts/source/184990.user.js
// @updateURL https://userscripts.org/scripts/source/184990.meta.js
// @grant none
// ==/UserScript==

(function(window) {
  var $ = window.jQuery, items = {}, apiKey,
    isLesson = (window.location.href.indexOf('lesson/session') !== -1),
    $input = $('<div style="display:none"></div>').appendTo('body')
  ;

  $input.load('/account .controls:has(#api-button) input', function() {
    apiKey = $input.find('input').val();
    if (apiKey && apiKey.length === 32) {
      $('<div style="margin:0 5px;background-color:#000;color:#fff;cursor:pointer;display:inline-block;padding:10px;font-size:0.8125em">' +
        '<span id="_wk-optimizer-txt">Reorder blockers</span> ' +
        '(<span id="_wk-optimizer-counter"></span>)</div>'
      ).prependTo('footer').on('click', onReorderClick);
      $input.remove();
    }
  });

  function onReorderClick() {
    // We don't need to ask for level and load items inside lessons.
    var level = isLesson ? '1' : '', $button = $(this);
    while (level !== null && !level.match(/^\d+$/)) {
      level = prompt("What is your level?");
    }
    if (level) {
      $button.off('click');
      $('#_wk-optimizer-txt').text('Loading...');
      if (isLesson) reorder();
      else retrieveItems(level, reorder);
    }
  }

  function retrieveItems(level, onItemsLoaded) {
    function loadItems(type, slugKey, callback) {
      var url = '/api/user/' + apiKey + '/' + type + '/' + level + '?callback=?';
      $.getJSON(url, function(data) {
        if (data.requested_information) {
          for (var i = 0; i < data.requested_information.length; i++) {
            items[data.requested_information[i][slugKey]] = true;
          }
          callback();
        }
      });
    }
    loadItems('radicals', 'meaning', function() {
      loadItems('kanji', 'character', onItemsLoaded);
    });
  }

  // item.srs tells the next SRS level of an item.
  // 1, 2, 3 apprentice
  // 4 guru
  // 5, 6 master
  // 7 enlighten
  // 8 burned
  //
  // So if item.srs == 4, that means item WILL be gurued if you get it right,
  // it doesn't mean it's gurued at the moment.
  function _isBlocker(item) {
    // Vocabulary items are not blockers in any case
    if (item.voc) return false;

    // Kanjis and radicals are always blockers when in lesson mode
    if (isLesson) return true;

    if (item.kan) return !!items[item.kan] && (item.srs < 5);

    // At this point item must be a radical
    var meaning = item.en[0].toLowerCase();
    return !!items[meaning] && (item.srs < 5);
  }

  function subscribeToUpdates() {
    var activeName = isLesson ? 'l/activeQueue' : 'activeQueue',
      reviewName = isLesson ? 'l/lessonQueue' : 'reviewQueue';

    function updateCounter() {
      var queue = $.jStorage.get(activeName).concat($.jStorage.get(reviewName));
      for (var r = 0, i = 0; i < queue.length; i++) if (_isBlocker(queue[i])) r++;
      $('#_wk-optimizer-counter').text(r);
    }

    $.jStorage.listenKeyChange(activeName, updateCounter);
    updateCounter();
  }

  function reorder() {
    subscribeToUpdates();

    var activeName = isLesson ? 'l/activeQueue' : 'activeQueue',
      reviewName = isLesson ? 'l/lessonQueue' : 'reviewQueue',
      activeQueue = $.jStorage.get(activeName),
      reviewQueue = $.jStorage.get(reviewName),
      currentItem = $.jStorage.get(isLesson ? 'l/currentLesson' : 'currentItem'),
      al = activeQueue.length, rl = reviewQueue.length,
      i = 0, removed
    ;
    while (i < activeQueue.length) {
      if (_isBlocker(activeQueue[i]) || currentItem.id == activeQueue[i].id) {
        i++;
      } else {
        removed = activeQueue[i];
        activeQueue.splice(i, 1);
        reviewQueue.push(removed);
      }
    }
    for (i = rl - 1; i >= 0; i--) {
      if (_isBlocker(reviewQueue[i])) {
        removed = reviewQueue[i];
        reviewQueue.splice(i, 1);
        reviewQueue.push(removed);
      }
    }
    // Saturate activeQueue
    for (i = activeQueue.length; i < al; i++) {
      activeQueue.push(reviewQueue.pop());
    }
    $.jStorage.set(activeName, activeQueue);
    $.jStorage.set(reviewName, reviewQueue);

    $('#_wk-optimizer-txt').text('Blockers reordered');
  }

})(typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
