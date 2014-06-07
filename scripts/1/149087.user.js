// ==UserScript==
// @name        Github Time Localization
// @description Localize time on Github.
// @namespace   linyows
// @include     https://github.com/*
// @author      linyows <linyows@gmail.com>
// @version     1.0.2
// ==/UserScript==
function useLibrary(library, callback)
{
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
  $('time').each(function(){
    var time = moment($(this).attr('datetime'));
    $(this).attr('title', 'Localized Time: ' + time.format('MMM D, YYYY h:mm a'));
    $(this).attr('datetime', time.format());
    $(this).html(time.fromNow());
  });
}

var library = ['//raw.github.com/timrwood/moment/master/min/moment.min.js'];
if (typeof window.jQuery != 'function') {
  library.push('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
}
useLibrary(library, userScript);
