// ==UserScript==
// @name           EVERYONE IS RICKET
// @namespace      JOHNALD IS AWESOME
// @description    CHANGES EVERYONES AVATAR TO THE SAME THING
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==
var dumbImage = 'http://uploads.forumwarz.com/cdn/91/a4d12492-092f-11df-82bb-003048db2566.png';
var replacer = 'src="%s"';
var replaced = replacer.replace('%s', dumbImage);
document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML.replace(/alt="Avatar.*?" src="http:\/\/uploads.forumwarz.com\/.*?"/g,replaced);
