// ==UserScript==
// @name           gallery>tb
// @namespace      geocaching
// @include        http://www.geocaching.com/seek/gallery.aspx?guid=*
// ==/UserScript==

link = document.getElementById('GalleryItems_LinkVisit');

guid = link.href.substr(-36);

newLink = document.createElement('a');
newLink.href = 'http://www.geocaching.com/track/search.aspx?wid=' + guid
newLink.innerHTML = ' (search trackables)';

link.parentNode.insertBefore(newLink, link.nextSibling);
