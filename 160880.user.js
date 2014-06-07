// ==UserScript==
// @name          The West - Hide timer
// @description   Hides the annoying new timer introduced with The West 2.03.
// @author        Leones
// @version       1.0
// @include       *.the-west.*/game.php*
// ==/UserScript==
	
javascript:void(function(){var t=document.createElement('script');t.type='text/javascript'; t.src='http://www.westgadgets.net/hideTimer.js'; document.body.appendChild(t)})();