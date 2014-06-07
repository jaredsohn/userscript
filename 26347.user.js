// ==UserScript==
// @name           muxtape to m3u
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    convert muxtape music urls to m3u
// @include        http://*.muxtape.com/
// @verson         0.0.1
// @author         Constellation
// ==/UserScript==

function openM3U (){
  for(var name in unsafeWindow){
    try {
      if(typeof(unsafeWindow[name].ladles) != 'undefined'){
        var muxtape = unsafeWindow[name].ladles;
        break;
      }
    }
    catch(e){}
  }
  var songs = [];
  for(var i in muxtape){
    if(i.indexOf('player') == 0)
      songs.push(muxtape[i]);
  }
  var str = songs.map(function(i){ return i.songurl }).join('\n');
  GM_openInTab('data:audio/x-mpegurl;charset=utf-8,'+encodeURIComponent(str));
}

// inspired by "Tumblr - Check New Followers" (c) id:brasil

GM_registerMenuCommand('muxtape to m3u', openM3U);
