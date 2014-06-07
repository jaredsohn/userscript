// SABnzbd ThreeClick v0.2
// Modified for SABnzbd >= 0.1j
// based on Ninan OneClick v1.0 (http://ninan.sourceforge.net/addons.html)
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Modified for frame use, using "SABFrame" for the target frame
// Further modified to restore bookmark links
// --------------------------------------------------------------------
// ==UserScript==
// @name          SABnzbd 1-Click for Frames w/bookmarks
// @namespace     Yarble's scripts
// @description   Adds SABnzdb options where ever bookmark links appear on Newzbin.com V2
// @include       http://www.newzbin.com/*

// ==/UserScript==
(function() {
    if (true) {
        var favourites_url = '/account/favourites/add/?ps_id=';
        var anchors = document.getElementsByTagName("a");
        for (var i=0; i<anchors.length; i++) {
            var anchor = anchors[i];
            var url = anchor.href;
            var targ = anchor.target;
            var exist = url.indexOf(favourites_url);
            var done = targ.indexOf('SABblank');
            if (exist != -1 && done == -1) {
                var postid = url.substring(exist + favourites_url.length,url.length);
                // Change this to your host/port
                var SABnzbd_uri = 'http://127.0.0.1:8080';
                newElement = document.createElement('span');
                newElement.innerHTML = '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=1&id=' +
                                       postid + '" target="SABFrame" title="Download & repair">Rep</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=2&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract">Ext</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=3&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract, delete">Del</a>/' +
                                       '<a href="' + url + '" target="SABblank" title="Bookmark at Newzbin">Book</a>';
                anchor.parentNode.replaceChild(newElement, anchor);
            }
        }
    }
})();
