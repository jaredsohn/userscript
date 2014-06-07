// ==UserScript==
// @name	visitorIcon
// @namespace	http://www.jbouchard.net/chris
// @description	Add an icon next to the Recent Visitors section for subscribers
// @include	http://*.deviantart.com/*
// @exclude     http://my.deviantart.com/*
// @exclude     http://chat.deviantart.com/*
// @exclude     http://help.deviantart.com/*
// @exclude     http://www.deviantart.com/*
// ==/UserScript==

var script = document.createElement("script");

var h2Tags = document.getElementsByTagName('h2')

var i = -1
var text = ''
do {
 i++
 text = h2Tags[i].innerHTML
}
while (text != 'Recent Visitors')

var imageSrc = '<img class="icon" src="http://www.jbouchard.net/chris/images/recent-visitor.gif" width="19" height="18" alt="" />'

h2Tags[i].innerHTML = imageSrc + ' Recent Visitors'