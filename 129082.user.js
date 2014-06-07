// ==UserScript==
// @name           Torrentify TPB (Now also support TPB Proxies!)
// @description    Brings back the torrent file to ThePiratebay
// @author         www.Popeen.com
// @include        *piratebay.se*
// @include        *piratereverse.info*
// @include        *tpb.pirateparty.org.uk*
// @include        *livepirate.com*
// @include        *getpirate.com*
// @include        *pirateshit.com*
// @include        *labaia.ws*
// @include        *tpb.swedendedicated.com*
// @include        *tpb.genyaa.org*
// @include        *tpb.troy4.com*
// @include        *tpb.ipredator.se*
// @version        1.4
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


var id = document.getElementsByName('id');
var name = document.getElementById('title').innerHTML;
var magnet = $('a').eq(15).attr('href');

var magnetLink = '<a href="'+magnet+'" title="Get this torrent" style="background-image: '+'url(\'//static.thepiratebay.se/img/icons/icon-magnet.gif\');margin-right:15px">Magnet Link</a>';

var torrentLink = '<a href="http://torrents.thepiratebay.se/'+id[0].value+'/'+name+'.torrent" title="Torrent File" style="margin-right:15px">Torrent File</a>';

var proxiedTorrent = '<a href="http://www.americanproxy.org/browse.php?u=http://torrents.thepiratebay.se/'+id[0].value+'/'+name+'.torrent" title="Torrent File" style="margin-right:15px">Torrent From Proxy</a>';

$('.download').html(magnetLink+torrentLink+proxiedTorrent);