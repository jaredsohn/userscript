// ==UserScript==
// @name           Penny Arcade Forums Block Animated Avatars
// @namespace      http://engy.us/
// @description    Blocks all *.gif avatars on the Penny Arcade forums.
// @include        http://forums.penny-arcade.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("img.ProfilePhoto").each(function(index) {
  if(this.src.match(/.gif$/i)) {
    $(this).remove();
  }
});