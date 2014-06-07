// ==UserScript==
// @name		DDTank Styling
// @description		Cleans up the page, so you can easily enjoy the game and have no problems with scrolling and other annoying things.
// @version		1.0.1
// @date		2013-01-22
// @creator		DrSwan
// @icon		http://www.iconj.com/ico/2/7/27suntuvh8.ico
// @updateURL		https://userscripts.org/scripts/source/157263.meta.js
// @downloadURL		https://userscripts.org/scripts/source/157263.user.js
// @include		http://passport.game321.com/api/webgame/ddtank/index.php
// @homepage		http://ddt.angle-less.com
// @require		http://code.jquery.com/jquery-1.9.0.min.js
// ==/UserScript==

$(document).ready(function(){
  setTimeout(styleDDT, 1000);
});

function styleDDT(){
  $('#addthis_fb').css('display', 'none');
  $('#ddt_game').css('height', 600);
  $('.body_center').css('height', 600);
  $('#top').after('<div id="topBarMinimizer"><div id="topBarLine" style="height:5px;"></div></div>');
  $('#top').insertBefore('#topBarLine');
  $('#topBarMinimizer').mouseover(function(){
      $('#top').css('display', 'block');
  }).mouseout(function(){
    $('#top').css('display', 'none');
  });
  $('#top').css('height', 0);
  $('#top').css('display', 'none');
  $('#simplemodal-overlay').css('visibility', 'hidden');
};