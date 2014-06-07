// ==UserScript==
//Copyright (c) 2012 - Remy Beaufils - enx01
// @name           ThePirateBay - sort by seeders
// @description    Automatically sort by seeders instead of by date uploaded
// @include        http://*thepiratebay.se/*/99/*
// @include        https://*thepiratebay.se/*/99/*
// @include        http://*thepiratebay.se/search/*/99/*
// ==/UserScript==

(function() {
  document.location.pathname = document.location.pathname.replace('/99/','/07/');
})();