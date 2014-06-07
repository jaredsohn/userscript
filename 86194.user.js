// ==UserScript==
// @name           Jeuxvideo.fr Direct Video Link
// @description    Add a link to access directly the video
// @namespace      http://userscripts.org/scripts/show/86194
// @include        http://www.jeuxvideo.fr/*
// @version        1.1
// ==/UserScript==

var id_fiche = document.getElementById('id_fiche').attributes.getNamedItem('value').value;
var url      = 'http://www.jeuxvideo.fr/api/tv/embed.swf?file=http://www.jeuxvideo.fr/api/tv/xml.php?id=' + id_fiche;
var link     = document.createElement('a');
var text     = document.createTextNode(url);
link.setAttribute('href', url);
link.appendChild(text);

document.getElementById('social-bar-1').parentNode.insertBefore(link);
