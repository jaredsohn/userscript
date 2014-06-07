// ==UserScript==
// @name           kristian_fb
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if (window == parent) {
  $('.ego_column').hide();
}
