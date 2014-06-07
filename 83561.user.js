// ==UserScript==
// @name           Nyaatorrents download
// @namespace      Xoooo
// @include        http://www.tokyotosho.info/*
// @include        http://www.tokyo-tosho.net/*
// ==/UserScript==
// burrowed script from i forgot where..
// what it does it replace all the "torrentinfo" link in TokyoTosho and replaces it with "download" so it wont show you that hatsuneshit infested page.
function get_links(){
       var links = new Array();
       var ids = document.getElementsByTagName('a');
       for(var i=0; i<ids.length; i++) {if(ids[i].href) links.push(ids[i]);}
       return links;}

var allLinks, targets;
allLinks = get_links();

for (var i = 0; i < allLinks.length; i++) {
    targets = allLinks[i];
    if (targets.href.match('torrentinfo')) {targets.href = targets.href.replace('torrentinfo', 'download');}
}

