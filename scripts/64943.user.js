// ==UserScript==
// @name           AutoReload
// @namespace      HiddenChilli-AutoReload
// @description    Automatically reloads when webpages cannot be loaded.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if(document.title == "Problem loading page") {
  $('#errorLongDesc ul').prepend('<li id="autoreload">AutoReload will reload this page in 5 seconds.</li>')
  setTimeout(function(){$('#autoreload').html('Reloading');location.reload();}, 5000);
  return;
}