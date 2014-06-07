// IGN Butler
// version 0.2
// 2005-03-17 (last updated: 2006-01-31)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "IGN Butler", and click Uninstall.
//
// Thanks to Logan for the patch to make this script work for GameSpy and other web sites, as well
//      as the pointer to Mark Pilgrim "RottenSkip" user script which was much cleaner.
// The IGN network properties include IGN, GameSpy, RottenTomatoes, FilePlanet and many more 
//      (see http://corp.ign.com/corporate.html for details)
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Skips interstitial pages from IGN, GameSpy, PlanetHalfLife, PlanetDoom, Planet*
//
// Updated (2006-01-31): 
//  Remove the annoying video ad when viewing media for a game (trailers and such)
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            IGN Butler
// @namespace       http://blog.monstuff.com/archives/000235.html
// @description     Skips interstitial pages from IGN, GameSpy, PlanetHalfLife, PlanetDoom, Planet*, 
RottenTomatoes
// @include         http://*.ign.com/*
// @include         http://ign.com/*
// @include         http://*.gamespy*.com/*
// @include         http://gamespy*.com/*
// @include         http://*.planet*.com/*
// @include         http://planet*.com/*
// @include         http://rottentomatoes.com/*
// @include         http://www.rottentomatoes.com/*
// @include         http://fileplanet.com/*
// @include         http://www.fileplanet.com/*
// @include         http://teamxbox.com/*
// @include         http://www.teamxbox.com/*
// @include         http://3dgamers.com/*
// @include         http://www.3dgamers.com/*
// ==/UserScript==


if (document.location.host.match(/^media\./)) {
    var o = document.getElementsByTagName("embed")[0];
    var flashVars = o.getAttribute("FlashVars");
    var downloadUrl = flashVars.match(/&downloadURL=([^&]*)&/)[1];

    var parent = o.parentNode;
    parent.removeChild(o);

    var a = document.createElement('a');
    a.href = downloadUrl;
    a.style.fontSize = "16px"
    a.style.fontWeight = "bold"
    a.appendChild(document.createTextNode("If the download doesn't start automatically, get the video 
here."));
    parent.appendChild(a);

    document.location.href = downloadUrl;
}

if (document.forms.namedItem("forward_form")) {
    var url = document.location.href;
    var add = (url.search(/\?/) >= 0) ? '&' : '?';
    document.location.href = url + add + 'fromint=1';
}


