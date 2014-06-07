// ==UserScript==
// @name           Sleuth
// @description    In any donation list, search query, citizen rankings; changes links beside organization pictures into a direct link to the citizen/organization's donation list.
// @author         Endy
// @namespace      DeNada
// @include        http://www.erepublik.com/en/search/*
// @include        http://www.erepublik.com/en/citizen/donate/list/*
// @include        http://www.erepublik.com/en/rankings/citizens*
// ==/UserScript==

var allLinks = document.getElementsByClassName('dotted');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('profile','donate/list');
	allLinks[i].innerHTML = ' ' + allLinks[i].innerHTML + ' | Donations';
}