// ==UserScript==
// @id             magnets.torrentz@bernstein.users.userscripts.org
// @name           torrentz.eu - Simple Magnets
// @author         bernstein
// @description    Appends a magnet link to search listings on torrentz.eu Forked from (Torrentz Infohash Magnets)[http://userscripts.org/scripts/show/128979]
// @updateURL      https://userscripts.org/scripts/source/157699.user.js
// @version        1.0
// @domain         torrentz.eu
// @include        http*://torrentz.eu/*
// @run-at         document-end
// @namespace      org.userscripts.users.bernstein
// @grant          GM_addStyle
// ==/UserScript==

var links = document.querySelectorAll('.results dl a, .download > h2');
for (var i = 0; i < links.length; i++)
{
    var link = links[i];
    var magnet = document.createElement('a');
    magnet.textContent = '\u03a9'; // omega
    magnet.style.color = '#a00';
    magnet.style.fontWeight = 'bold';

    var trackers = ['http://tracker.openbittorrent.com:80/announce',
                    'udp://tracker.openbittorrent.com:80/announce',
                    'http://tracker.publicbt.com:80/announce',
                    'udp://tracker.publicbt.com:80/announce',
                    'http://tracker2.istole.it:6969/announce',
                    'http://tracker.istole.it:80/announce',
                    'http://genesis.1337x.org:1337/announce',
                    'http://nemesis.1337x.org:80/announce',
                    'http://exodus.desync.com:6969/announce',
                    'http://tracker.ilibr.org:6969/announce',
                    'http://tracker.prq.to/announce',
                    'http://9.rarbg.com:2710/announce',
                    'http://bt1.the9.com:6969/announce',
                    'http://tracker.torrent.to:2710/announce'];
    if (!link.href)
    {
        magnet.style.cssFloat = 'left';
        magnet.style.fontSize = '20px';
        magnet.style.padding = '5px';
        magnet.style.marginRight = '-15px';
        
        var n = document.querySelectorAll('.trackers dt a');
        for (j=0;j<n.length;j++)
            if (trackers.indexOf(n[j].textContent) < 0)
                trackers.push(n[j].textContent);
    }
    var url = (link.href ? link : location).href.replace(/^.*\/([0-9a-f]{10,})($|\/.*|\?.*)/i, '$1');
    magnet.href = 'magnet:?xt=urn:btih:' + encodeURIComponent(url)
                + '&dn=' + encodeURIComponent(link.textContent);

    for (j=0;j<trackers.length;j++)
        magnet.href += '&tr=' + encodeURIComponent(trackers[j]);

    link.parentNode.insertBefore(magnet, link);
    link.parentNode.insertBefore(document.createTextNode(' '), link);
}