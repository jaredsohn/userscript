// ==UserScript==
// @name          Instapaper Archive Button to Bottom
// @description   Clones the "Archive"-Button to the bottom bar of the article ind Instapaper
// @include       http://www.instapaper.com/text?u=*
// @version       0.0.2
// ==/UserScript==
var _archiveButton = document.getElementsByClass(archiveButton);
alert(_archiveButton):
document.getElementsByClass(bottom).appendChild(_archiveButton);