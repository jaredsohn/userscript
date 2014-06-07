// ==UserScript==
// @name Google SSL: Add missing links in top bar [Updated April 2011]
// @namespace http://torstenbecker.eu/
// @include https://encrypted.google.com/*
// @author Torsten Becker, Erik Vergobbi Vold, patheticbliss
// @description Adds the missing links to Google Images, etc. when using Google SSL Search. Customizable, users can add links to pretty much anything in the top bar.
// ==/UserScript==

// Origional: "Based on http://stackoverflow.com/questions/2246901/"
// Modified by patheticbliss (made it work with new links, forced it to only work on https, removed overlap problem)
// Based on script obtained from here: https://gist.github.com/757983
// Credit for the origional code goes to whoever posted it in GitHub
// include-jquery-inside-greasemonkey-script-under-google-chrome
// Chrome + userscripts:
// http://www.chromium.org/developers/design-documents/user-scripts
// 
// Hopefully Google gets around to doing this itself soon.

// a function that loads jQuery and calls a callback function when jQuery has
// finished loading
function runAfterJQueryLoad(callback) {
  var script = document.createElement("script");
  script.setAttribute("src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function patchGbar() {
  var urlSafeQuery = escape($('input[name="q"]').val());
  
  // Markup based on http://google.com, added https:// to links
  // only where it works reliably:

  // You can add/remove pretty much anything you want here:
  // Some of these may have to be updated as Google changes its URLs
  
  var links = [
    // The usual stuff:
    {title:'Images', link: 'http://www.google.com/images?q=' + urlSafeQuery },
    {title:'Videos', link: 'http://www.google.com/search?q=' + urlSafeQuery + '&um=1&tbs=vid:1'},
    {title:'Maps', link: 'http://maps.google.com/maps?q=' + urlSafeQuery },
    {title:'News', link: 'https://news.google.com/news?q=' + urlSafeQuery },
    {title:'Shopping',link: 'http://www.google.com/search?q=' + urlSafeQuery + '&tbs=shop:1'},
    {title:'Gmail', link: 'https://mail.google.com' },
    //Additions to the bar:
    //{title:'more', link: 'http://www.google.com/dashboard'}, /*spacer, helps with non-sll version*/
    {title:'Web (Non-SSL)', link: 'http://www.google.com/search?q=' + urlSafeQuery },
    {title:'Reader', link: 'http://google.com/reader'},
    {title:'Bing', link:'http://www.bing.com/search?setmkt=en-WW&q=' + urlSafeQuery }
  ];
  
  var bar = '<div id="gbz"><ol class="gbtc"> \
<li class="gbt"> \
<a class="gbzt gbz0l gbp1" id="gb_1" \
onclick="gbar.qsj(this)" \
href="http://www.google.com/webhp?hl=en&amp;tab=ww" target="_blank" \
name="gb_1"><span class="gbts">Web</span></a>\
</li>';
  
  for (var i = 0; i < links.length; i++) {
    bar += '<li class="gbt"><a class="gbzt" id="gb_' + (2 + i) +'" \
onclick="gbar.qsj(this)" href="' + links[i].link +
              '" name="gb_'+ (2 + i) + '"><span class="gbts">' +
              links[i].title + '</span></a> \
</li>';
  }
  
  bar += '</ol></div>';
  
  $('div#gbw').prepend(bar);
}

runAfterJQueryLoad(patchGbar);
