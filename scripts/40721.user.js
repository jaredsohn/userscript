// ==UserScript==
// @name           H33T Auto sort by seeds
// @namespace      http://userscripts.org/users/23652
// @description    Automatically sorts searches by seeds descending
// @include        http://www.h33t.com/torrents.php?*
// @include        http://www.h33t.com/tocat.php?id=*
// @copyright      JoeSimmons
// ==/UserScript==

if(!/(\&|\?)order=seeds\&by=DESC/.test(location.href)) {
location.href = location.href.replace(/((\&|\?)(order=.+))?(by=(ASC|DESC))?/g, '') + '&order=seeds&by=DESC';
}