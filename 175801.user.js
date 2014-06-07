// ==UserScript==
// @name        Tweaks Ipernity
// @namespace   http://www.ipernity.com/doc/*
// @description Tweaks Ipernity : (1) Remove group name above photos
// @include     http://www.ipernity.com/doc/*
// @version        0.1 (15 August 2013)
// @grant          none
// ==/UserScript==

var re = new RegExp('/in/group/');
var t = re.test(document.location.href);


if (t) { // we see a photo in a group
    var groupname = '';
    var i = 0;
    var titles = document.getElementsByTagName("h1");

    while (groupname == '' && i < titles.length) {
        if (titles[i].className == 'title top')  // it's the one !!!
            groupname = titles[i];
        i++;
    }
    
    groupname.parentNode.removeChild(groupname);
}
