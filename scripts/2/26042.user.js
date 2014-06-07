// ==UserScript==
// @name           Brand Republic
// @namespace      http://userscripts.org/users/52127
// @description    Ad-remover
// @include        http://www.brandrepublic.com/*
// @include        http://brandpublic.com/*
// ==/UserScript==

var banner = document.getElementById('banner');
banner.style.display = 'none';

var ads = document.getElementsByClassName('advertisement');
for(i = 0; i < ads.length; i++)
{
	ads[i].style.display = 'none';
}

var google = document.getElementById('googleAd');
google.style.display = 'none';