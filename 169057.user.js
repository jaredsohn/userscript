// ==UserScript==
// @name        DuolingoSwap
// @namespace   http://www.userscripts.org
// @description Swap the two panes on the homepage
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @include     *duolingo.com*
// @version			0.1
// ==/UserScript==

$(document).ready(function() {
  swap();
});

$(window).on('hashchange', function() {
  swap();
});

function swap() {
  if (window.location.hash == '') {
    var newBackgroundCss = "url('//d7mj4aqfscim2.cloudfront.net/images/home-sidebar-right_mv_fe7a380e2159d07458717fad294df8e6.png') repeat-y left #ffffff";
    $('#app .home-right').after($('#app .home-left'));
    $('#app').css('background', newBackgroundCss);
  }
}

