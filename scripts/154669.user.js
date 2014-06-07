// ==UserScript== 
// @name          FLickr Quick Links
// @version       1.6
// @date          2013-10-02
// @description	  adds handy links to the top of the Flickr page
// @author        Andreas Schaefer it.mensch@gmail.com
// @include         http://www.flickr.com/*
// @include         http://flickr.com/*
// @exclude         http://www.flickr.com/html.gne
// @exclude         http://flickr.com/html.gne
// @exclude         http://www.flickr.com/photos/organize*
// @exclude         http://flickr.com/photos/organize*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
// The customhtml holds the links, feel free to edit/expand to your liking

if (window.top != window.self)  //don't run on frames or iframes
{
    return;
}

// add/edit your own links to the following variable:
var customhtml = "<div style=\"position: absolute; top: 49px; left: -10px; color: #CCCCCC; background:#000000; opacity:0.8; z-index: 10; width:400px; font-size:10px; padding-left:10px; \">" +
    "<a href='http://www.flickr.com/activity/photostream/' style='color:#DDDDDD;' >RA</a> | " +
    "<a href='http://flickr.com/activity/?activity_with=recv_reply' style='color:#DDDDDD;' >com</a> | " +
    "<a href='http://flickr.com/explore/' style='color:#DDDDDD;' >ex</a> | " +
    "<a href='http://www.flickr.com/groups/flickrhacks/discuss/' style='color:#DDDDDD;' >hacks</a> | " +
    "<a href='http://www.flickr.com/groups/adobe_lightroom/discuss/' style='color:#DDDDDD;' >LR</a> | " +
    "<a href='http://www.flickr.com/help/forum/en-us/' style='color:#DDDDDD;' >Help</a> | " +
    "<a href='http://www.flickr.com/groups/flickrideas/' style='color:#DDDDDD;' >Ideas</a> | " +
    "<a href='http://www.flickr.com/groups/d_m_u/discuss/' style='color:#DDDDDD;' >DMU</a> | " +
    "</div>";

var allspans = new Array();

allspans = document.getElementsByClassName('gn-wrap');
if (allspans.length == 0) {
	allspans = document.getElementsByClassName('zen-navViaSearch');
}
allspans[0].innerHTML += customhtml;
