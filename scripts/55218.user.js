// ==UserScript==
// @name          FUCKSHITDAMN
// @description   ban argz and chaosbreather
// @include       http://forums.somethingawful.com/forumdisplay.php?forumid=219
// ==/UserScript==

head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
css ='body {background-image: url(http://j.photos.cx/fuckshitdamn-ca2.gif); background-repeat: repeat;}';

style.innerHTML = css;
head.appendChild(style);

