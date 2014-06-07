// ==UserScript==
// @name       Torrents Shortcut
// @version    0.1.0 beta
// @description  Torrents Shortcut helps you after finding the movie, series, show etc. from IMDb search it with one click on your favorite torrent site.
// @match      http://www.imdb.com/title/tt*
// @copyright  2014+, DrScripter
// ==/UserScript==

function Site(name, url, icon){
    this.name = name;
    this.url = url;
    this.icon = icon;
}

var h1 = document.getElementsByTagName("h1")[0];
h1.insertAdjacentHTML('beforeend', '<div id="sites_list"></div>');

var title = escape(h1.innerText.replace("(","").replace(")","")).replace("%0A","");
var title2 = title.replace(/%20/g,"-");
var title3 = title.replace(/%20/g,"+");

var x = new Site("1337x", "http://1337x.org/search/", "http://s0.uploads.im/CwYLH.png");
var bs = new Site("BitSnoop", "http://bitsnoop.com/search/all/", "http://s0.uploads.im/AfzmM.png");
var bts = new Site("BitTorrentScene", "http://bts.to/results.php?q=", "http://s0.uploads.im/kLhB1.png");
var e = new Site("ExtraTorrent", "http://extratorrent.cc/search/?search=", "http://s0.uploads.im/vN9aq.png");
var fd = new Site("Fulldls", "http://fulldls.com/search-all-torrents/?qa=", "http://s0.uploads.im/Lzs0J.png");
var h33t = new Site("H33t", "http:/h33t.to/search/", "http://s0.uploads.im/oN6BH.png");
var ih = new Site("isoHunt", "http://isohunt.to/torrents/?ihq=", "http://s0.uploads.im/fqbny.png");
var kat = new Site("Kickass Torrents", "http://kickass.to/usearch/", "http://s0.uploads.im/D8Fw4.png");
var lt = new Site("LimeTorrents", "http://limetorrents.com/search/all/", "http://s0.uploads.im/1hPVb.png");
var m = new Site("Monova", "http://monova.org/search.php?term=", "http://s0.uploads.im/TlQ1h.png");
var r = new Site("RARBG", "http://rarbg.com/torrents.php?search=", "http://s0.uploads.im/P7WVC.png");
var s = new Site("Seedpeer", "http://seedpeer.me/search.php?search=", "http://s0.uploads.im/5BhZz.png");
var tc = new Site("Torrent Crazy", "http://torrentcrazy.com/search.php?q=", "http://s0.uploads.im/TbyEp.png");
var td = new Site("Torrent Downloads", "http://torrentdownloads.me/search/?search=", "http://s0.uploads.im/O0xyk.png");
var tf = new Site("TorrentFunk", "http://torrentfunk.com?q=", "http://s0.uploads.im/8pUWI.png");
var th = new Site("TorrentHound", "http://torrenthound.com/search/", "http://s0.uploads.im/DqKJc.png");
var tl = new Site("TorLock", "http://torlock.com?q=", "http://s0.uploads.im/wCq9n.png");
var tpb = new Site("The Pirate Bay", "http://thepiratebay.se/search/", "http://s0.uploads.im/u4d9j.png");
var tr = new Site("TorrentReactor", "http://torrentreactor.net/torrent-search-beta/", "http://s0.uploads.im/Q3DrK.png");
var tz = new Site("TorrentZap", "http://www.torrentzap.com/search.php?q=", "http://s0.uploads.im/OEqHI.png");
var yb = new Site("Your Bittorent", "http://yourbittorrent.com/?q=", "http://s0.uploads.im/PuVkO.png");

var sites = [x, bs, bts, e, fd, h33t, ih, kat, lt, m, r, s, tc, td, tf, th, tl, tpb, tr, tz, yb];
var sites_list = document.getElementById("sites_list");

for (var i = 0; i < sites.length; i++){
    if(i < 3){
        if(i === 0){
            sites_list.insertAdjacentHTML('beforeend', '<a href="' + sites[i].url + title + '/1/" title="' + sites[i].name + '" target="_blank"><img src="' + sites[i].icon + '"></a>');
            continue;
        }
        else if(i === 2){
            sites_list.insertAdjacentHTML('beforeend', '<a href="' + sites[i].url + title3 + '" title="' + sites[i].name + '" target="_blank"><img src="' + sites[i].icon + '"></a>');
            continue;
        }
    }
	sites_list.insertAdjacentHTML('beforeend', '<a href="' + sites[i].url + title + '" title="' + sites[i].name + '" target="_blank"><img src="' + sites[i].icon + '"></a>');
}