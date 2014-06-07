
// ==UserScript==
// @name           HomerJ VOD Downloader
// @namespace      http://www.homerj.de/
// @description    Fügt bei jedem VOD einen Download-Button ein.
// @include        http://www.homerj.de/index.php?show=vods&play=*
// @include        http://homerj.de/index.php?show=vods&play=*
// @date           2013-12-05
// @version        0.9
// ==/UserScript==

document.getElementsByClassName('box_3_CC o_h')[0].innerHTML += "<div class=\"f_l w100p ml3 mb3 tal\"> Download: &nbsp; » <a target=\"_new\" href=\"#\" onclick=\"playPlayer(); var link=document.getElementById('vodplayer').innerHTML.match(/http.*?&/)[0]; link=link.substr(0,link.length-1); this.href=link;\">klick</a></div>";
