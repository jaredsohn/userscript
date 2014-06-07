// ==UserScript==
// @name            deviantART Menu+
// @author          KodokuRyuu
// @description     Adds Gallery, Prints, Favourites, Journal, and Friends links to the main user menu.
// @copyright       2013, KodokuRyuu (http://userscripts.org/users/506725)
// @license         (CC) Attribution 3.0 Unported; http://creativecommons.org/licenses/by/3.0/
// @version         1.0.0
// @include         http://*.deviantart.com/*
// @include         https://*.deviantart.com/*
// ==/UserScript==

var referenceNode = document.getElementById('oh-menu-deviant').getElementsByClassName('oh-hr')[0];
var userURL = document.getElementById('oh-menu-deviant').getElementsByClassName('mi iconset-gruser')[0].href;

var galleryNode = document.createElement('a');
galleryNode.setAttribute('class', 'mi iconset-gruser');
galleryNode.setAttribute('href', userURL + 'gallery/');
galleryNode.innerHTML = '<i class="i2"></i><b>Gallery</b>';
referenceNode.parentNode.insertBefore(galleryNode, referenceNode);

var printsNode = document.createElement('a');
printsNode.setAttribute('class', 'mi iconset-gruser');
printsNode.setAttribute('href', userURL + 'prints/');
printsNode.innerHTML = '<i class="i3"></i><b>Prints</b>';
referenceNode.parentNode.insertBefore(printsNode, referenceNode);

var favouritesNode = document.createElement('a');
favouritesNode.setAttribute('class', 'mi iconset-gruser');
favouritesNode.setAttribute('href', userURL + 'favourites/');
favouritesNode.innerHTML = '<i class="i29"></i><b>Favourites</b>';
referenceNode.parentNode.insertBefore(favouritesNode, referenceNode);

var journalNode = document.createElement('a');
journalNode.setAttribute('class', 'mi iconset-gruser');
journalNode.setAttribute('href', userURL + 'journal/');
journalNode.innerHTML = '<i class="i5"></i><b>Journal</b>';
referenceNode.parentNode.insertBefore(journalNode, referenceNode);

var referenceNode = document.getElementById('oh-menu-deviant').getElementsByClassName('oh-hr')[1];
var friendsNode = document.createElement('a');
friendsNode.setAttribute('class', 'mi iconset-more');
friendsNode.setAttribute('href', 'http://my.deviantart.com/deviants/');
friendsNode.innerHTML = '<i class="i9"></i><b>Friends</b>';
referenceNode.parentNode.insertBefore(friendsNode, referenceNode);
