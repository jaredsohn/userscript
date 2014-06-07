// ==UserScript==
// @name            HideOnNewPostsPage
// @namespace       hideonnewpostspage
// @description     Hide (all new posts from annoying forums - obsolete) (and something more ;) ) on the new_posts page
// @include         http://www.newkaliningrad.ru/forum/index.php?app=core&module=search&do=viewNewContent*&search_app=forums*
// @require         http://code.jquery.com/jquery.min.js
// @version         3.1
// @icon            http://www.klgd.ru/city/characters/gerb.png
// @grant           none
// ==/UserScript==

// Edit example list of forums that you are not, no any way, never interesting in
//  var forumsToBlock = [ 'Домашние кошки', 'Беременность и роды' ];

// HIDE EM ALL!!!
//  $('tr').filter(function() {return (forumsToBlock.indexOf($('.desc.blend_links a:eq(0)', this).text()) != -1)}).hide();

// Hide main logo and news banners (think twice with this section, I do doubt I'm doing right)
  $('.logo').hide();
  $('.banner').hide();

// Hide reminder where you are
  $('.header-bread-crumbs').hide();

// Hide another and huge reminder where you are
  $('#content h1:eq(0)').hide();

// Hide lower navigation bar
  $('.pagination:eq(1)').hide();
