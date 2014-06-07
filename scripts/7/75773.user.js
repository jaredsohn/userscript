// ==UserScript==
// @name           All donations
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    donacije
// @version        0.21
// @include        http://ww*.erepublik.com/*/citizen/profile/*
// ==/UserScript==

var alldonations = document.getElementById('user_menu').innerHTML;

profileID=2;

link = '<a href=' + location.href.replace(/profile/, 'donate/list') + '>All donations</a>';

document.getElementById('user_menu').innerHTML += '<li>' + link + '</li>';
