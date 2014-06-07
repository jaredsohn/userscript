// ==UserScript==
// @name           Gawker: Highlight commented threads.
// @namespace      -
// @include        http://gizmodo.com/*
// @include        http://lifehacker.com/*
// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://jezebel.com/*
// @include        http://io9.com/*
// @include        http://jalopnik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://usocheckup.redirectme.net/88909.js
// ==/UserScript==

/*
 * Current version: 0.1.2
 *
 * === Changelog ===
 * Version 0.1.2
 *  - Changed the name.
 *  - Added an update-warning script.
 *
 * Version 0.1.1
 *  - Added the other gawker sites to the include list.
 *  - Removed the white border above the comment thread.
 *
 * Version 0.1.0
 *  - Initial release.
 */

// Get the current username, if logged in.
var username = $('.cn_profile_link').text();
if (!username)
{
  return;
}

// Add the css to the page.
var css = document.createElement('style');
css.type = 'text/css';
css.textContent = '' +
  '#comments .userCommented {' +
    'background-color: lightgreen !important;' +
    'margin-top: -25px;' +
    'padding-top: 25px;' +
  '}' +
  '.tagpage .userCommented {' +
    'margin-top: -20px;' +
    'padding-top: 20px;' +
  '}' +
  '#comments a + .userCommented {' +
    'margin-top: 0;' +
    'padding-top: 0;' +
  '}' +
  '#comments .userCommented .comment:hover {' +
    'background-color: #befabe !important;' +
  '}';
$('head').append(css);

// Add the userCommented class to all threads the user has commented in.
$('#comments').bind('DOMNodeInserted', function()
{
  $('#comments .comment:not([processed]) .avatar_link').each(function()
  {
    $(this).parent().attr('processed', 'yes');
    if ($(this).text() == username)
    {
      $(this).closest('.threadWrapper').addClass('userCommented');
    }
  });
});
