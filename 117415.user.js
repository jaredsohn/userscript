// ==UserScript==
// @name          Gaia Header Admin
// @namespace     http://www.gaiaonline.com/*
// @description   Makes you look like the user Admin in your header
// ==/UserScript==
document.getElementById('header_avatar').src='http://a2.cdn.gaiaonline.com/dress-up/avatar/ava/32/d6/889ed632_flip.png';document.getElementsByClassName('avatarName')[0].childNodes[1].textContent='Admin';