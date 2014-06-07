// ==UserScript==
// @name       smallnetbuilder.com forum - goto first unread redirect
// @namespace  http://www.fmbv.nu/
// @version    0.1
// @description  smallnetbuilder.com forum - goes to first unread post.
// @match      http://forums.smallnetbuilder.com/*
// @copyright  2013, Jan Karjalainen
// @grant       none
// ==/UserScript==


(function() {

    try {

        textLink="View First Unread";

        nPage=-1;
        
	// opens 1.st such a link in tab

        for( i=0; i < document.links.length; i++ )

            if( document.links[ i ].innerHTML.match( textLink ))

		window.location.href=document.links[i].href
    }

    catch (e) {

        GM_log( 'smallnetbuilder.com forum - goto first unread Redirect - script exception: ' + e );

        alert ( 'smallnetbuilder.com - goto first unread Redirect - script exception: ' + e );

    }

}

)();
