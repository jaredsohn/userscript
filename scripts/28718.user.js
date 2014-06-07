// ==UserScript==
// @name          pitchfork menu
// @namespace     http://www.watchmefreak.com/
// @description	  just removes the flash menu and replaces with text menu  version 1.0
// @include       *pitchforkmedia.com*
// ==/UserScript==

(function (){
        var menu="<a href=http://www.pitchforkmedia.com/article/record_review>Reviews</a><br><a href=http://www.pitchforkmedia.com/page/news>News</a><br><a href=http://www.pitchforkmedia.com/page/features>Features</a><br><a href=http://www.pitchforkmedia.com/page/forkcast>Forkcast</a><br><a href=http://www.pitchforkmedia.com/page/forkcast>Best New Music</a><br>";
	document.getElementById('primary-nav').innerHTML=menu;	
})();