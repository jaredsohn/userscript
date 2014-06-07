// ==UserScript==
// @name        Livescore
// @namespace   http://ellab.org/
// @description Make livescore.com better. Show the match details in the same page instead of pop-up and show the match time in your local time
// @version     3
// @icon        https://raw.github.com/angusdev/better-livescore/3/icon-128.png
// @include     http://www.livescore.com/
// @include     http://www.livescores.com/*
// @include     http://www.livescore.co.uk/*
// @include     http://www.livescore.com/soccer/*
// @require     https://raw.github.com/angusdev/better-livescore/3/jquery-1.8.2.min.js
// @require     https://raw.github.com/angusdev/better-livescore/3/jquery.color-2.1.0.min.js
// @require     https://raw.github.com/angusdev/better-livescore/3/countrycode.js
// @resource    loading.gif https://raw.github.com/angusdev/better-livescore/3/loading.gif
// @resource    flags.png https://raw.github.com/angusdev/better-livescore/3/flags.png
// @resource    flags.css https://raw.github.com/angusdev/better-livescore/3/flags.css
// @grant       GM_getResourceURL
// @grant       GM_getResourceText
// @grant       GM_addStyle
// ==/UserScript==

/*jshint white: false, browser: true, onevar:false, devel:true */
/*global $, chrome, GM_getResourceURL, org */
(function() {
'use strict';

/*jshint newcap: false */
function getResourceURL(file, resourceName) {
  if (typeof GM_getResourceURL !== 'undefined') {
    return GM_getResourceURL(resourceName || file);
  }
  else if (typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined' && typeof chrome.extension.getURL !== 'undefined') {
    return chrome.extension.getURL(file);
  }
  else {
    return file;
  }
}
/*jshint newcap: true */

var LOADING_IMG = getResourceURL('loading.gif');

function padTime(s) {
  s = '' + s;
  return  (s.length === 1)?('0' + s):s;
}

function onClickRow(e) {
  var $trMatch = $(e.target).closest('tr');
  var $sibling = $trMatch.next();
  if (!$sibling.hasClass('ellab-match-details')) {
    $sibling = $('<tr class="ellab-match-details"><td colspan="99" style="padding: 0;"></td></tr>').insertAfter($trMatch);
  }
  var $td = $sibling.children('td:first');

  $td.css('background-color', '#333').html('<div style="text-align:center; padding: 5px;"><img data-role="loading" src="' + LOADING_IMG + '" border="0"/></div>');
  // keep the height for later animation
  var imgHeight = $td.height();

  $td.wrapInner('<div style="display: none;" />')
     .find('> div:first-child')
     .slideDown(200);

  $.ajax(e.target.href).done(function(html) {
    html = html.match(/<table(.|\r\n)*<\/table>/m);
    if (html) {
      $td.html(html[0]);

      // remove the match result title
      $td.find('table:first-child tr:first-child').remove();
      $td.find('th.footer').closest('table').remove();

      // use animate instead of slideDown so can start with the original height instead of collapse first
      var height = $td.height();
      $td.wrapInner('<div style="overflow:hidden; height:' + imgHeight + 'px;" />')
        .find('> div:first-child')
        .animate({ 'height': height + 'px' }, 500, null, function() {
          var $set = $(this);
          $set.replaceWith($set.contents());

          // change the match row color to clearly show as separator
          $trMatch.find('td').animate({ 'backgroundColor':'#555', 'color':'#fff' }, { duration: 'slow' });
          $trMatch.find('a').animate({ 'color':'#fff' }, { duration: 'slow' });
        });
    }
  });

  e.stopPropagation();
  e.preventDefault();

  return false;
}

// redirect to livescore.com
if (document.location.hostname.indexOf('livescores.com') >= 0) {
  document.location.assign(document.location.href.replace('livescores.com', 'livescore.com'));
}
if (document.location.hostname.indexOf('livescore.co.uk') >= 0) {
  document.location.assign(document.location.href.replace('livescore.co.uk', 'livescore.com'));
}

// add CSS for Greasemonkey
if (typeof GM_addStyle !== 'undefined' && typeof GM_getResourceText !== 'undefined') {
  var css = GM_getResourceText('flags.css');
  GM_addStyle(css);
}

// attach click event of score
$('table.league-table a.scorelink').each(function() {
  this.parentNode.innerHTML = '<a data-type="ellab-match" href="' + this.href + '">' + this.innerHTML + '</a>';
});

$(document).on('click', 'a[data-type="ellab-match"]', onClickRow);

// attach click events of match detail menu
$(document).on('click', 'a[data-type="substitutions_button"]', function() {
  // show the substitutions table
  $(this).closest('table').siblings('table').show();
});
$(document).on('click', 'a[data-type="close_button"]', function() {
  // show the substitutions table
  $(this).closest('table').siblings('table').hide();
});
$(document).on('click', 'a[data-type="details_button"]', function() {
  // show the substitutions table
  $(this).closest('table').find('div[data-type="details"]').removeClass('hidden');
});

// add flag to league
$('.league').each(function() {
  var $this = $(this);
  if ($this.text()) {
    // trim any leading spaces
    var league = $this.text().replace(/^\s+/, '');

    var countrycode = org.ellab.livescore.getCountryCodeStartsWith(league);
    if (countrycode) {
      $this.prepend('<div class="flag flag-' + countrycode +
                    '" style="background-image:url(' + getResourceURL('flags.png') + ');" />');
    }
  }
});

})();
