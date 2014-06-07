// ==UserScript==
	// @name          facebook mafia war gift skip/redirect
	// @namespace     http://userscripts.org/users/CEEJINC
	// @author        ceejinc
		// @description	  IMPORTANT: this will make your game load kinda slow every time, but it will avoid you having to skip the gift page whenever it shows up.....I highly recommend you only use at your own risk...I am not sure how slow it will make the start of every time you go to play the game, but I do know you wont have to skip the gifting page ever again as far as I can tell with what links I have tested so far. Redirects you from the force gift/the normal page to the page that you want..which is to view the main page and not have to see the gift send page at all.
	// @version       1.0.1
	// @include    http://apps.facebook.com/inthemafia/index.php?xw_controller=index&xw_action=view
	// @include    http://apps.facebook.com/inthemafia/index.php?query_params=eHdfY29udHJvbGxlcj1pbmRleCZ*
// ==/UserScript==



location.replace("http://apps.facebook.com/inthemafia/index.php?")