// ==UserScript==
// @name       eRepublik Menu Reset
// @namespace  http://*.erepublik.com/*
// @version    1.0.3
// @description  Rankings and news tab back. Badges removed.
// @include    http://*.erepublik.com/*
// @copyright  Made by BNGY
// ==/UserScript==

var newsadded='<a href=\"#"><span>Community</span></a><ul><li><a href="http://www.erepublik.com/en/map"  rel="nofollow">World Map</a></li><li><a href="http://www.erepublik.com/en/my-places/party" rel="nofollow">My Party</a></li><li><a href="http://www.erepublik.com/en/elections/current">Elections</a></li><li><a href="http://www.erepublik.com/en/main/group-home/military">Military Unit</a></li><li><a href="http://www.erepublik.com/en/news/rated/all/my/1">News</a></li><li><a href="http://www.erepublik.com/en/rankings/news/1/my">Rankings</a></li><li><a href="http://www.erepublik.com/en/invite-friends">Invite friends</a></li></ul>'
document.getElementById('menu5').innerHTML =newsadded;