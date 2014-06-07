// ==UserScript==
// @name           DivX to WMP
// @namespace      DivX to WMP
// @description    DivX Web Player to Windows Media Player
// @include        *
// ==/UserScript==

setTimeout("var video = document.getElementsByTagName('embed');for(var a=0;a<video.length;a++){if(video[a].type=='video/divx' || video[a].type=='video/x-xvid'){if(confirm('Video playback with Windows Media Player?')){video[a].type='application/x-mplayer2';video[a].pluginspage='http://www.interoperabilitybridges.com/wmpff/wmpfirefoxplugin.exe';video[a].autoPlay='false';video[a].Stop();video[a].parentNode.replaceChild(video[a].cloneNode(true),video[a]);}}}",1000);
