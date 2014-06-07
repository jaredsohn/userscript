// ==UserScript==
// @name           Waffles.fm old favicon
// @description    Return old Waffles favicon.
// @include        *waffles.fm*
/*change favicon*/
var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABpSURBVDhPY3j/4dOKOn4iEVAxA1Dpp5PcQEQkA6rh6FRWiAaCDJAGkhCKkxjAANltWESQXQKURnMSFhGS3ANUTOdQgngREyA7G91JmKrR4hRLxCHrwYxKyiKOmERFelq6cPUW8XEHVAwAedtGFMEnOv8AAAAASUVORK5CYII=');
head.appendChild(icon);
// ==/UserScript==