// ==UserScript==
// @name           YouTube To MP3 Button
// @version        2.3
// @author         NicholasLAranda German Edit by Zabur Asadi
// @description    Einfach YouTube Videos mit dem Botton downloaden!
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

var s = location.href.split("&");
var url=s[0];

document.getElementById('watch-actions').innerHTML += '<style>#button {margin-top: -2.71em; position: relative; left: 28em;} #watch-actions {height: 50px;}</style><div id="button"><a href="http://www.video2mp3.net/index.php?url='+ url +'&hq=1" id="link" title="Speichere den Sound von deinem laufenden Video in eine Hoche MP3 Quallität" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_blank">Als MP3 downloaden</a></div>';
