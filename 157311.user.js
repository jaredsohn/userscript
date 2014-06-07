/******************************************************************************

 * richarddawkins.net News "Complete Story" Redirect by Jan Karjalainen (jan at biffstek dot se)
 * Based on the linuxtoday.com News "Complete Story" Redirect by Peter Butkovic (puk007 at gmail dot com),
 * which in turn was based on the Linux.org news "Read full article" redirect by Jaap Haitsma (jaap at haitsma dot org) see: http://userscripts.org/scripts/show/5350
 *

 * version 0.2

 * 2013-04-05

 * Copyright (c) 2013, Jan Karjalainen

 * Released under the GPL license, version 4

 * http://www.gnu.org/copyleft/gpl.html

 ****************************************************************************** 

 * On load of richarddawkins.net news story is done, there are links whose inner html is 'continue to source article at' then:

 *   - redirect to reffered link in the actual window is done

 *

 * This script asumes richarddawkins.net stories contains the text "continue to source article at"

 * in the link to the article. 
 *

 * It works (is tested) with:

 *  - Firefox 18.0.1 - Linux - Greasemonkey 1.6
 *  - Firefox 18.0.1 - Windows 8 - Greasemonkey 1.6

 *

 * To Install:

 *  - like any greasemonkey script: install greasemonkey, restart FF, open

 *    this script in a browser window, go to Tools/Install User Script

 *

 * To Uninstall:

 *  - like any greasemonkey script: Tools/Manage User Scripts, select 
 * 'richarddawkins.net_redirect', click the Uninstall button

 *

 * Changelog: 
 
 *  ver 0.1

 *    2013-01-22
 *    Jan Karjalainen
 *    - 1.st ver
 
 *   ver 0.2
 *   Jan Karjalainen
 *   2013-04-05
 *   Added 'http://rdfrs.com/news_articles/*' to @includes

 */
 
// ==UserScript==
// @name        richarddawkins.net redirect
// @namespace   http://userscript.org/
// @description Automatic redirect for richarddawkins.net articles to full stories
// @include     http://www.richarddawkins.net/news_articles/*
// @include     http://rdfrs.com/news_articles/*
// @version     1
// ==/UserScript==

(function() {

    try {

        textLink="continue to source article at";

        nPage=-1;
        
	// opens 1.st such a link in tab

        for( i=0; i < document.links.length; i++ )

            if( document.links[ i ].innerHTML.match( textLink ))

		window.location.href=document.links[i].href
    }

    catch (e) {

        GM_log( 'richarddawkins.net News "Complete Story" Redirect - script exception: ' + e );

        alert ( 'richarddawkins.net News "Complete Story" Redirect - script exception: ' + e );

    }

}

)();


