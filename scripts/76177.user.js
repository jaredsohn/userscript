/******************************************************************************
 * ubuntu-news.net "More here" Redirect by Peter Butkovic (puk007 at gmail dot com)
 * Based on the Linux.org news "Read full article" redirect by Jaap Haitsma (jaap at haitsma dot org) see: http://userscripts.org/scripts/show/5350
 *
 * version 0.2
 * 2010-05-07
 * Copyright (c) 2010, Peter Butkovic
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 ****************************************************************************** 
 * On load of ubuntu-news.net story:
 *   - redirect to reffered link in the actual window
 *
 * This script asumes linux today stories contains the text "here"
 * in the link to the article. 
 *
 * It works (is tested) with:
 *  - Firefox 3.6.3 - Windows - Greasemonkey 0.8.20100408.06 http://greasemonkey.mozdev.org/
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select 
 * 'linuxtoday.com News "Complete Story" Redirect', click the Uninstall button
 *
 * Changelog:
 * ver 0.2
 *    2010-05-07
 *    Peter Butkovic
 *    - fix for correct link redirect
 *
 *  ver 0.1
 *    2010-05-07
 *    Peter Butkovic
 *    - 1.st ver
 */

// ==UserScript==
// @name          ubuntu-news.net "More here" Redirect
// @description   Automatic redirect for ubuntu-news.net articles to full stories
// @namespace     http://userscript.org/
// @include  	  http://www.ubuntu-news.net/20*
// ==/UserScript==
(function() {
    try {
        textLink="^here$";

        nPage=-1;
        
	// opens 1.st such a link in tab
        for( i=0; i < document.links.length; i++ )
            if( document.links[ i ].innerHTML.match( textLink ))
		window.location.href=document.links[i].href
    }
    catch (e) {
        GM_log( 'ubuntu-news.net "More here" Redirect - script exception: ' + e );
        alert ( 'ubuntu-news.net "More here" Redirect - script exception: ' + e );
    }
}
)();