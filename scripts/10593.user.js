// ==UserScript==
// @name           Club.live.com - plugin for anagrammer.com to remove live search
// @author         anagrammer.com
// @namespace      anagrammer.com
// @description    This will remove the frame from the bottom of the club.live.com games
// @include        http://club.live.com/GamePlay.aspx?page=*
// ==UserScript==
setTimeout(function() {
this.GameShowAPI.Search = function (term, a, b) {}
document.getElementById('ifSearchResult').src = 'http://www.anagrammer.com';
}, 450);