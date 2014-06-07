// ==UserScript==
// @name        HideG+LinksAndSearchBar
// @namespace   bl4ckb1rd.com.ar
// @include     https://plus.google.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     0.2
// @grant       GM_addStyle
// ==/UserScript==

// TODO
//  . Work on init
//  . Remove the stupid "transparent" bar on scroll up
//  . Add mini search input
//  . Add Notification icon (i forgot this :P)
// IDEA
//  . Add all functions from search bar on $home_bar

var $link_search_bar = $(".Dd.Ofc.ULec3c");

//-- Hide Links and Search bar
$link_search_bar.hide();

function onScroll() {

  var $home_bar = $(".XXuWB.iYjCM");
  //-- Add class "floating" de "home" bar
  $home_bar.addClass("MNHgse");
  //-- Fix in return from scroll "FH" in the middle of screen
  $(".XXuWB.iYjCM").removeClass("gIdB1");
  $home_bar.css("top", "0px");

  //-- Try to fix "transparent" bar on scroll up
  // U6pEjc :( Dont fixed!!!
  $(".u6pEjc").css("top", "0px");
  $("hpLg1e.wH3YRe.cInFec").css("top", "0px");
  $("vhb5Nd.MTa").css("top", "0px");

  //-- Home img + G+ red icon
  var $icon_g_home = $(".IvwRoc.Um8btf");
  $icon_g_home.addClass("URFF2");
  $icon_g_home.css("top", "0px");

  //-- Hang icon
  var $hang_icon = $(".Hoa.n0b.RWa.MQ");
  $hang_icon.addClass("KiWa0b");
  $hang_icon.css("top", "44px");
}

window.addEventListener("scroll", onScroll, false);
