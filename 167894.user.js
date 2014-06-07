// ==UserScript==
// @name           I Already Donated
// @version        0.9
// @author         phracker
// @description    I donate to my favorite private trackers on a regular basis.  However, private trackers have a way of being persistent to the point of ridiculousness.  Now stop all the harassment.  Don't be a dick, contribute what you can before you install this script.
// @include        https://tls.passthepopcorn.me/*
// @include        http://passthepopcorn.me/*
// @include        https://templatep2p.com/*
// @include        http://templatep2p.com/*
// @include        https://www.waffles.fm/*
// @include        http://www.waffles.fm/*
// @include        https://broadcasthe.net/*
// @include        http://broadcasthe.net/*
// @include        http://speed.cd/*
// @include        http://torrentleech.org/*
// @include        http://thegft.org/*
// @include        https://thegft.org/*
// @include        https://sceneaccess.eu/*
// ==/UserScript==

if(document.URL.search('passthepopcorn.me') != -1) {
    document.getElementById('nav_donate').setAttribute('style','display:none;');
}
if(document.URL.search('templatep2p.com') != -1) {
	document.getElementsByClassName('windowbg2')[2].setAttribute('style','display:none;');
}
if(document.URL.search('waffles.fm') != -1) {
	document.getElementById('donate').setAttribute('style','display:none;');
}
if(document.URL.search('broadcathe.net') != -1) {
    document.getElementById('donation').setAttribute('style','display:none;');
}
if(document.URL.search('speed.cd') != -1) {
    document.getElementById('doubleLogo').setAttribute('style','display:none;');
	document.getElementsByClassName('main')[0].setAttribute('style','display:none;');
}
if(document.URL.search('torrentleech.org') != -1) {
    document.getElementById('supportTorrentLeech').setAttribute('style','display:none;');
}
if(document.URL.search('thegft.org') != -1) {
    document.getElementsByClassName('clear')[2].setAttribute('style','display:none;');
	document.getElementsByClassName('firefox')[0].setAttribute('style','display:none;');
}
if(document.URL.search('sceneaccess.eu') != -1) {
    document.getElementById('donationbar_wrapper').setAttribute('style','display:none;');
    document.getElementById('nav_donate').setAttribute('style','display:none;');
}