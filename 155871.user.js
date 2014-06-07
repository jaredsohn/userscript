// ==UserScript==
// @name        TumblrBackgroundClick
// @namespace   rampion.github.com
// @description Allow links from tumblr to load in the background
// @include     http://www.tumblr.com/dashboard*
// @include     http://www.tumblr.com/tagged/*
// @version     2
// ==/UserScript==

jQuery(function(){
  /*
  // in FireBug w/ FireQuery -> Console options -> Show internal jQuery data
  console.log("before",   jQuery('#left_column').data('events')           );
  console.log("removal",  jQuery('#left_column').off('click', '#posts a') );
  console.log("after",    jQuery('#left_column').data('events')           );
  */
  jQuery('#left_column').off('click', '#posts a');
});
