// ==UserScript==
// @name	wishlistIcon
// @namespace	http://www.jbouchard.net/chris
// @description	Add an icon next to the Recent Wishlist Additions section
// @include	http://*.deviantart.com/*
// @exclude     http://my.deviantart.com/*
// @exclude     http://chat.deviantart.com/*
// @exclude     http://help.deviantart.com/*
// @exclude     http://www.deviantart.com/*
// ==/UserScript==

var h2Tags = document.getElementsByTagName('h2')

var i = -1
var text = ''
do {
 i++
 text = h2Tags[i].innerHTML
}
while (text != 'Recent Wishlist Additions')

var imageSrc = '<img class="icon" src="http://i.deviantart.com/icons/top/store.gif" width="18" height="18" alt="" />'

h2Tags[i].innerHTML = imageSrc + ' Recent Wishlist Additions'