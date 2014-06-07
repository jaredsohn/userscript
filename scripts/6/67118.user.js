/******************************************************************************
 * linuxtoday.com News "Complete Story" Redirect by Peter Butkovic (butkovic at gmail dot com)
 * Based on the Linux.org news "Read full article" redirect by Jaap Haitsma (jaap at haitsma dot org) see: http://userscripts.org/scripts/show/5350
 *
 * version 0.3
 * 2013-06-20
 * Copyright (c) 2013, Peter Butkovic
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 ****************************************************************************** 
 * On load of linuxtoday news story is done, there are links whose inner html is 'Complete Story' then:
 *   - redirect to reffered link in the actual window si done
 *
 * This script asumes linux today stories contains the text "Complete Story"
 * in the link to the article. 
 *
 *  - Firefox 21.0 - Linux - Greasemonkey 1.9 http://greasemonkey.mozdev.org/
 * It works (is tested) with:
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
 *  ver 0.3
 *    2013-06-20
 *    Peter Butkovic
 *    - support for links on: http://www.linuxtoday.com/upload/*
 *    - replaced http://www.linuxtoday.com/<relative_url>/2* with http://www.linuxtoday.com/<relative_url>/*
 *
 *  ver 0.2
 *    2010-01-24
 *    Peter Butkovic
 *    - process also links opened via rss
 *
 *  ver 0.1
 *    2010-01-24
 *    Peter Butkovic
 *    - 1.st ver
 */

// ==UserScript==
// @name          linuxtoday.com News "Complete Story" Redirect
// @description   Automatic redirect for linuxtoday.com articles to full stories
// @namespace     http://userscript.org/
// @include  	  http://www.linuxtoday.com/developer/*
// @include  	  http://www.linuxtoday.com/high_performance/*
// @include  	  http://www.linuxtoday.com/infrastructure/*
// @include	  http://www.linuxtoday.com/it_management/*
// @include  	  http://www.linuxtoday.com/security/*
// @include	  http://www.linuxtoday.com/storage/*
// @include	  http://www.linuxtoday.com/news_story.php3*
// @include       http://www.linuxtoday.com/upload/*
// ==/UserScript==

(function() {
    try {
        textLink="Complete Story";
        
        nPage=-1;
        
	// opens 1.st such a link in tab
        for( i=0; i < document.links.length; i++ )
            if( document.links[ i ].innerHTML.match( textLink ))
		window.location.href=document.links[i].href
    }
    catch (e) {
        GM_log( 'linuxtoday.com News "Complete Story" Redirect - script exception: ' + e );
        alert ( 'linuxtoday.com News "Complete Story" Redirect - script exception: ' + e );
    }
}
)();
