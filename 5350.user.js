/******************************************************************************
 * Linux.org news "Read full article" redirect by Jaap Haitsma (jaap at haitsma dot org)
 * Based on the linuxtoday "Complete Story" script by Jean Sagi
 *
 * version 0.1
 * 2005-sep-21
 * Copyright (c) 2005, Jean Sagi
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 * Inspired by Denis McLaughlin's "Linux Today Butler" and
 *             Fabricio Zuardi's "Wired News Printer Friendly Redirect"
 * See: http://denism.homeip.net/software/greasemonkey/lt.user.js
 *      http://www.mamata.com.br/greasemonkey/wired.printer-friendly.redirect.user.js
 * Donations: Contactme at jeansagi at [myrealbox|gmail] dot com (you never know ;)
 *
 * Please don't sue|blame me (Linux Today) I'm just learning javascript.
 ******************************************************************************
 * Use "Linux Today Butler", it is usefull if you read Linux today regularly.
 * Use Sage to read RSS feeds from Linux Today.
 * 
 * If onload there are links whose inner html is 'Complete Story' then:
 *   - The first (Complete story) link is redirected to its respective link
 *     in the actual window.
 *   - The rest (Complete stories) links are redirect to their respective sites
 *     in new tabs.
 *
 * This script asumes linux today stories contains the text "Complete Story"
 * in the link to the article. If this changes, obviously this script will fail.
 *
 * Jean Sagi
 * jeansagi at [myrealbox|gmail] dot com
 *
 * It works (is tested) with:
 *  - Firefox 1.0.6 - Linux / Windows   - Greasemonkey 0.5.3	http://greasemonkey.mozdev.org/
 *  - Firefox 1.5 - Linux / Windows     - Greasemonkey 0.6.4	http://greasemonkey.mozdev.org/
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select "Linux
 *    Today "Complete story" Redirect, click the Uninstall button
 *
 * Changelog:
 *  ver 0.2
 *    2006-Jan-2
 *    Jean Sagi
 *    - Change evaluation for "Complete Story" to a pattern match
 *    - Tested with Firefox 1.5 and GreaseMonkey 0.6.4
 *
 *  ver 0.1
 *    2005-Sep-21
 *    Jean Sagi
 *    - First release.
 *    - Works for me
 */

// ==UserScript==
// @name          Linux.org News "Read full article" Redirect
// @description   Automatically redirect to Linux.org news articles
// @namespace     http://userscript.org/
// @include       http://*linux.org/news/*
// ==/UserScript==

(function() {
    try {
        textLink="Read full article";
        notTextLink="Read full article in new window"
        nPage=-1;
        
        for( i=0; i < document.links.length; i++ )
            if( document.links[ i ].innerHTML.match( textLink ) && !document.links[ i ].innerHTML.match( notTextLink ))
                if( ++nPage )   GM_openInTab( document.links[i].href );
                else            window.location.href=document.links[i].href;
    }
    catch (e) {
        GM_log( 'Linux.org "Read full article" Redirect - script exception: ' + e );
        alert ( 'Linux.org "Read full article" Redirect - script exception: ' + e );
    }
}
)();

