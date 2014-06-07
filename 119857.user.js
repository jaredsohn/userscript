// ==UserScript==
// @name           facebook-only-events
// @namespace      http://roland-illig.de/greasemonkey
// @version        2
// @description    Fügt auf Facebook in der linken Leiste zwei Ankreuzfelder hinzu, mit denen man die Postings in einer Gruppe übersichtlicher machen kann: Besonders für die Gruppe "Hamburg Active" ist es sinnvoll, alles außer Veranstaltungshinweisen auszublenden. Außerdem kann man alle Kommentare ausblenden, wenn man nur die Originalankündigungen sehen will.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function applyWithExceptionHandler(func, xthis, args) {
  try {
    return func.apply(xthis, args);
  } catch (e) {
    window.alert( //
      'Message: ' + e.message + '\n' + //
      'Exception: ' + e + '\n' + //
      'Function: ' + func.name + '\n' + //
      'Stack trace: ' + e.stack + '\n' //
    );
  }
}

function callWithExceptionHandler(func) {
  return applyWithExceptionHandler(func, this, arguments);
}

function wrapWithExceptionHandler(func) {
  return function() {
    return applyWithExceptionHandler(func, this, arguments);
  };
}

function $makeLink(text, action) {
  return $('<a/>').text(text).bind('click', wrapWithExceptionHandler(action));
}

function $makeCheckbox(text, action, checked, title) {

  function handler() {
    var $checkbox = $(this);
    action.call(this, $checkbox.is(':checked'));
  }

  var $span = $('<span/>');
  var $checkbox = $('<input/>').attr('type', 'checkbox');
  if (checked === true) {
    $checkbox.attr('checked', 'checked');
  }
  $checkbox.bind('click', wrapWithExceptionHandler(handler));
  $span.append($checkbox);
  $span.append(' ');
  $span.append(text);
  $span.attr('title', title);

  window.setInterval(function() {
    action.call($checkbox[0], $checkbox.is(':checked'));
  }, 1000);

  return $span;
}

function $findPosts() {
  return $('li.uiStreamStory');
}

function showOnlyEvents(checked) {
  if (checked) {
    var $posts = $findPosts();
    $posts.each(function() {
      var $post = $(this);
      var $parts = $post.find('.fbMainStreamAttachment, .messageBody');
      var $eventLinks = $parts.find('a[href*="event.php"], a[href*="/events/"]');
      $post.toggle($eventLinks.length > 0);
    });
  } else {
    $findPosts().show();
  }
}

function showComments(checked) {
  $findPosts().find('form').toggle(checked);
}

function main() {
  var $box = $('<div/>');
  $box.addClass('uiHeader uiHeaderTopBorder uiHeaderNav uiHeaderNavEmpty');
  var $showOnlyEvents = $makeCheckbox( //
    'Nur Veranstaltungen', showOnlyEvents, false, //
    'Zeigt nur Beitr\u00E4ge an, die einen Link auf eine ' + //
    'Facebook-Veranstaltung enthalten.' //
  );
  $box.append($showOnlyEvents);
  $box.append($('<br/>'));
  var $showComments = $makeCheckbox( //
    'Kommentare', showComments, true, //
    'Zeigt Kommentare zu den Beiträgen an. Ohne die Kommentare ' + //
    'bekommt man mehr Beiträge auf eine Bildschirmseite.' //
  );
  $box.append($showComments);
  $box.append($('<br/>'));

  $('#leftCol').append($box);
}

callWithExceptionHandler(main);
