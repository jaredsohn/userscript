// ==UserScript==
// @name           tk-421's YW tweaks
// @version        1.0
// @namespace      http://userscripts.org/users/bkuri
// @author         bkuri
// @description    various tweaks for yarisworld.com
// @match          http://*.yarisworld.com/forums/*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// @resource       logo http://db.tt/DlLdctSh
// @resource       bttn http://db.tt/INOBp60E
// ==/UserScript==
var post = 'table[id^=post]';

// toggle detail visibility
function toggleDetails (target) {
  $('div:last:not([id^=post_])', target).toggle();
  $('td.alt2 div.smallfont:last', target).toggle();
}

// change main logo
$('img:first', 'body').attr('src', GM_getResourceURL('logo'));

// smaller user area
$('td.alt2', post).width(150);

// details toggle button
var $a = $('<a href="#" rel="nofollow" class="toggle_details"><img alt="Toggle Details" title="Toggle Details" /></a>');
$('img', $a).attr('src', GM_getResourceURL('bttn'));

$('tr:last td.alt1', post).on('click', 'a.toggle_details', function (e) {
  toggleDetails($(this).parents(post));
  e.preventDefault();
}).prepend($a);

// move user details around
$('td.alt2 div.smallfont:nth-child(3)', post).each(function (i, e) {
  var $this = $(this);
  var $frst = $('div:first', $this.parent());

  $this.insertAfter($frst);
  $('br', $this).remove();
});

// comment the following line to have details on by default
toggleDetails(post);
