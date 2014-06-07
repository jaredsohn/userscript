// ==UserScript==
// @name           Kongregate Multiple Game Opener
// @namespace      Kongregate
// @description    Opens all Kongregate games on page in new tabs.
// @include        http://*.kongregate.com/games*
// @include        http://kongregate.com/games*
// @include        http://*.kongregate.com/*games*
// @include        http://kongregate.com/*games*
// @include        http://*.kongregate.com/my_favorites*
// @include        http://kongregate.com/my_favorites*
// @include        http://*.kongregate.com/game_groups*
// @include        http://kongregate.com/game_groups*
// ==/UserScript==

var feat = document.getElementById( "feature" ).childNodes[1];
feat.style.textDecoration = "underline";
feat.style.cursor = "pointer";
feat.title = "Click to open these games in new tabs/windows.";
feat.addEventListener('click',function () {
  var games = document.getElementsByClassName("play_link");
	for( var link in games ) {
    if( link >= 0 )
    window.open( games[link].href, "Kong" + link );
  }
},false)