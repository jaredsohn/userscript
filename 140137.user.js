/******************************************************************************

 * linuxtoday.com News "Complete Story" Redirect by Peter Butkovic (puk007 at gmail dot com)
 * Based on the Linux.org news "Read full article" redirect by Jaap Haitsma (jaap at haitsma dot org) see: http://userscripts.org/scripts/show/5350
 *

 * version 0.2

 * 2010-01-24

 * Copyright (c) 2010, Peter Butkovic

 * Released under the GPL license, version 4

 * http://www.gnu.org/copyleft/gpl.html

 ****************************************************************************** 

 * On load of linuxtoday news story is done, there are links whose inner html is 'Complete Story' then:

 *   - redirect to reffered link in the actual window si done

 *

 * This script asumes linux today stories contains the text "Complete Story"

 * in the link to the article. 
 *

 * It works (is tested) with:

 *  - Firefox 3.5.7 - Linux - Greasemonkey 0.8.20091209.04 http://greasemonkey.mozdev.org/

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
 
 *    2012-05-22
 
 * 	  Derek Malone
 
 *    - Updated the redirect links.  (kept the old ones 
 *			just incase we needed to go back in time.)
 
 *	  BTW, awesome little script Mr. Butkovic!
  
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
// @include		  http://www.linuxtoday.com/developer/*
// @include  	  http://www.linuxtoday.com/developer/2*
// @include  	  http://www.linuxtoday.com/high_performance/*
// @include  	  http://www.linuxtoday.com/high_performance/2*
// @include  	  http://www.linuxtoday.com/infrastructure/*
// @include  	  http://www.linuxtoday.com/infrastructure/2*
// @include	  http://www.linuxtoday.com/it_management/*
// @include	  http://www.linuxtoday.com/it_management/2*
// @include  	  http://www.linuxtoday.com/security/*
// @include  	  http://www.linuxtoday.com/security/2*
// @include	  http://www.linuxtoday.com/storage/*
// @include	  http://www.linuxtoday.com/storage/2*
// @include	  http://www.linuxtoday.com/news_story.php3*
// @include   http://www.linuxtoday.com/upload/*
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


