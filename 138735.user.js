// ==UserScript==
// @name           Github Issue Marker
// @description    Mark the state of the issue.
// @namespace      linyows
// @include        https://github.com/*/issues*
// @include        https://github.com/*/*/issues*
// @include        https://github.com/*/*/*/issues/*
// @author         linyows <linyows@gmail.com>
// @version        1.0.2
// ==/UserScript==

function useLibrary(callback)
{
  var library = [
    '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
  ];
  var counter = 0;

  for (var i in library) {
    var script = document.createElement('script');
    script.setAttribute('src', library[i]);
    script.addEventListener('load', function() {
      var script = document.createElement('script');
      counter++;
      if (counter == library.length) { script.textContent = '(' + callback.toString() + ')();'; }
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }
}

function userScript()
{
  jQuery.noConflict();
  jQuery('.issue, .listing').each(function(i, element){
    var icon = jQuery('<i/>').addClass('mini-icon');
    var id = jQuery(element).attr('id');
    var timeAgo = jQuery(element).find('time').text();
    var matched = timeAgo.match(/^(\w+) (days|months?) ago$/);
    if (matched) {
      if (matched[2] == 'days' && matched[1] > 7) {
        icon.addClass('mini-icon-exclamation').css({color:(matched[1] > 14 ? '#DD0000' : '#d8c011')});
      } else if (matched[2].match(/month/)) {
        icon.addClass('mini-icon-delete-note');
      } else {
        return;
      }
      jQuery(element).find('h3').prepend(icon);

    } else if (timeAgo.match(/second|minute|hour/)) {
      jQuery(element).find('h3').prepend(icon.addClass('mini-icon-ruby').css('color', '#FF0000'));
    }
  });
}

useLibrary(userScript);