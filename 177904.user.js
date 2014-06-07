// ==UserScript==
// @name       Gamereactor.se - ad page bypass
// @namespace  http://www.fmbv.nu/
// @version    0.1
// @description  Gamereactor.se - Bypass ad pages.
// @match      http://www.gamereactor.se/*
// @grant       none
// @copyright  2013, Jan Karjalainen
// ==/UserScript==


(function() {

    try {

        textLink="Fortsätt till";

        nPage=-1;
        
	// opens 1.st such a link in tab

        for( i=0; i < document.links.length; i++ )

            if( document.links[ i ].innerHTML.match( textLink ))

		window.location.href=document.links[i].href
    }

    catch (e) {

        GM_log( 'Gamereactor.se - ad page bypasst - script exception: ' + e );

        alert ( 'Gamereactor.se - ad page bypass - script exception: ' + e );

    }

}

)();