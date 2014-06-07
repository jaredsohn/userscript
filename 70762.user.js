// ==UserScript==
// @name           Torrentz.com download shortcut
// @namespace      rashid8928
// @description    Adds download and magent link and in the search results of Torrentz.com, allowing you to download torrent without leaving search page
// @include        http://torrentz.in/*?f=*
// @include        https://torrentz.in/*?f=*
// @include        http://torrentz.eu/*?f=*
// @include        https://torrentz.eu/*?f=*
// @include        http://torrentz.in/*?q=*
// @include        https://torrentz.in/*?q=*
// @include        http://torrentz.eu/*?q=*
// @include        https://torrentz.eu/*?q=*
// ==/UserScript==
(function(){
    var count=0;
    while(h3=document.getElementsByTagName('dl')[count]){
        fixLink(h3);
        count++;
    }
    function fixLink(h3){
        var link=h3.getElementsByTagName('a')[0];
        var url=link.href;
        var title=link.textContent;
        var iMagnet=url.replace(/.+\//,'').toUpperCase();
        var fMagnet=document.createElement('a');
        var fdownlo=document.createElement('a');
        
        fMagnet.href="magnet:?tr=http://tracker.openbittorrent.com/announce&tr=http://denis.stalker.h3q.com:6969/announce&tr=http://tracker.prq.to/announce&xt=urn:btih:"+iMagnet+"&dn="+title;
        fdownlo.href="http://torrage.com/torrent/"+iMagnet+".torrent";
        
        fMagnet.innerHTML="[Magnet]";
        fdownlo.innerHTML="[Download from TorRage]";
        
        h3.appendChild(fMagnet);
        h3.appendChild(fdownlo);
        
    }
}
)()