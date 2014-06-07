// ==UserScript==
// @name           Scar's /tv/ quote linker
// @namespace      http://zip.4chan.org/tv/imgboard.html
// @description    Turns Scar's Twitter posts that contain >>quotes to /tv/ postnumbers into clickable links!
// @include        http://twitter.com/scarfromtv
// ==/UserScript==

with(document.getElementsByClassName('section')[0])
    innerHTML = innerHTML.replace(/&gt;&gt;([0-9]+)/g, "<a href=\"http://zip.4chan.org/tv/imgboard.php?res=$1\" style=\"color: #dd0000\">&gt;&gt;$1</a>");