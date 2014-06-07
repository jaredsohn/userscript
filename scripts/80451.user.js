// ==UserScript==
// @name           Torrentz.com download shortcut
// @namespace      rashid8928 & LordMike
// @description    Adds download and magent link and in the search results of Torrentz.com, allowing you to download torrent without leaving search page
// @include        http://www.torrentz.eu/*?f=*
// @include        http://torrentz.eu/*?f=*
// @include        http://www.torrentz.eu/*?q=*
// @include        http://torrentz.eu/*?q=*
// @include        https://www.torrentz.eu/*?f=*
// @include        https://torrentz.eu/*?f=*
// @include        https://www.torrentz.eu/*?q=*
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
  var fdownlo1=document.createElement('a');
  var fdownlo2=document.createElement('a');
  var fdownlo3=document.createElement('a');
  
  fMagnet.href="magnet:?xt=urn:btih:"+iMagnet+"&dn="+title;
  fdownlo1.href="http://torrage.com/torrent/"+iMagnet+".torrent"
  fdownlo2.href="http://torcache.com/torrent/"+iMagnet+".torrent"
  fdownlo3.href="http://zoink.it/torrent/"+iMagnet+".torrent"

  fMagnet.innerHTML="[Magnet]";
  fdownlo1.innerHTML="[Torrage]";
  fdownlo2.innerHTML="[TorCache]";
  fdownlo3.innerHTML="[Zoink]";
  
  h3.appendChild(fMagnet);
  h3.appendChild(fdownlo1);
  h3.appendChild(fdownlo2);
  h3.appendChild(fdownlo3);
  }
}
)()