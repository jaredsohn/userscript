// ==UserScript==
// @name           Downloader
// @namespace      kamal
// @include        http://*.drawspace.com/lessons/lesson.php
// ==/UserScript==

el=document.getElementById('lessonAccessOptions');
url=document.URL;
id=url.split("=");
el.childNodes[1].childNodes[2].href="http://www.drawspace.com/lessons/files/swf.php?id="+id[1];