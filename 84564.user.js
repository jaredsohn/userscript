// ==UserScript==
// @name          Get MP3!
// @version       0.3
// @namespace     http://erichlotto.com/projects
// @description   Adds a link on Youtube to convert the currently playing video to mp3 format
// @include       http://www.youtube.com/watch?v=*
// ==/UserScript==

var separayt2 = location.href.split("&");
var urlcompactada = separayt2[0];
var conteudo = document.getElementById('masthead-utility').innerHTML;
document.getElementById('masthead-utility').innerHTML = '<a target="_blank" href="http://2conv.com/?url='+ urlcompactada + '" title="Convert this video to .Mp3 Format  ||  Tip: open link in a new tab to keep the focus on video."><img style="margin: 0px 2px -3px 0px;"src="http://img190.imageshack.us/img190/6472/musice.gif" alt="image">Get MP3!</a>'+conteudo;