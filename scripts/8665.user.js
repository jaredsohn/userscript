// MySpaceMusicCleanUp
// version 0.1
// 21-04-2007
// Copyright (c) 2007, Simon Potter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MySpaceMusicCleanUp
// @namespace     http://hazexp.googlepages.com/greasemonkey
// @description   Removes the clutter from the MySpace Music page
// @include       http://www.myspace.com/index.cfm?fuseaction=music*
// @include       http://www.myspace.com/index.cfm?fuseaction=music
// ==/UserScript==

var elements = ['MusicWrapper', 'advert'];

for (i = 0; i < elements.length; ++i)
    {
    var element = document.getElementById(elements[i]);
    if (element) {
        element.parentNode.removeChild(element);
        }
    }

var googimg = document.getElementById('ctl00_Header_MainHeader_imgGoogle');
googimg.parentNode.style.cssFloat = "right";	

var footer = document.getElementById('footer');
var searchbox = document.createElement("div");
searchbox.innerHTML = '<div class="bgGrey MusicSearch" id="music_search"><div style="background: transparent url(http://x.myspace.com/images/music%2fhome%2fheaders%2fmusic_searchartists.jpg) repeat scroll 0%; width: 302px; height: 25px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" class="Header"></div><div class="Body borDkGrey"><div class="Wrapper"><form onsubmit="return checkfield(this);" method="post" action="http://musicsearch.myspace.com/index.cfm?fuseaction=music.search" name="myForm"> <input type="hidden" value="0" name="search_term"/><input type="hidden" value="distanceZip" name="localType"/><div id="searchFormHiddenFields"><input type="hidden" value="" name="state"/><input type="hidden" value="" name="zip"/><input type="hidden" value="" name="Country"/></div><div class="pad5"><label style="display: block;">Keyword:</label><input type="text" class="KeywordsText" name="keywords" id="keywords"/><input type="submit" value="Search" class="MusicSearchButton" id="ctl00_Main_ContentSwitcher1_ctl00_Search_submit" name="ctl00$Main$ContentSwitcher1$ctl00$Search$submit"/><br/></div></form></div></div></div>';
var wrap = footer.parentNode;
wrap.insertBefore(searchbox, footer);
var ss = searchbox.style;
ss.width = "302px";
ss.cssFloat = "none";
ss.margin = "20px";
ss.marginLeft = "auto";
ss.marginRight = "auto";