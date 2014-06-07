// ==UserScript==
// @name           ExYuTeam Radio
// @author         den78
// @description    Radio za exyuteam.org
// @include        http://www.exyuteam.org/*
// @version        1
// @icon        http://i.imgur.com/wFMovFR.png
// ==/UserScript==

// radio
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; left: 50%;"><div style="position: relative; left: -50%; top: -0px; border: dotted black 0px;"><embed name="MRPObject" src="http://hosted.musesradioplayer.com/muses-hosted.swf" flashvars="url=http://67.213.213.143:8048/;&amp;lang=auto&amp;codec=mp3&amp;tracking=true&amp;volume=50&amp;autoplay=false&amp;buffering=5&amp;skin=http://hosted.musesradioplayer.com/muses-eastanbul.xml&amp;title=Hard Rock Heaven&amp;welcome=undefined" scale="noscale" wmode="transparent" allowscriptaccess="always" type="application/x-shockwave-flash" height="26" width="467">' +
'</div>';
var elmauthors = document.getElementById('footer_morecopyright');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);