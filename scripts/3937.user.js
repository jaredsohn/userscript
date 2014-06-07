// SABnzbd 1-Click for Frames w/bookmarks V3beta1
// Modified for SABnzbd >= 0.1j
// based on Ninan OneClick v1.0 (http://ninan.sourceforge.net/addons.html)
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Modified for frames use, using "SABFrame" for the target frame
// Modified to restore bookmark links
// Modified for V3 beta
// --------------------------------------------------------------------
// ==UserScript==
// @name          SABnzbd 1-Click w/bookmarks V3beta1
// @namespace     Yarble's scripts
// @description   Adds SABnzdb options to Bookmark section on Newzbin.com
// @include       http://v3.newzbin.com/browse/post/*

// ==/UserScript==
(function() {
    if (true) {
    		var pageImages=document.getElementsByTagName('img');
    		var keywordImage = document.createElement('img');;
    		for (var i=0; i<pageImages.length; i++) {
    				var pageImage = pageImages[i];
    				if (pageImage.alt == "keyword") keywordImage = pageImage.cloneNode(true);
    		}
        var favourites_url = '/account/bookmarks/add/?ps_id=';
        var remove_url = '/account/bookmarks/remove/?ps_id=';
        var anchors = document.getElementsByTagName("a");
        for (var i=0; i<anchors.length; i++) {
            var anchor = anchors[i];
            var url = anchor.href;
            var targ = anchor.target;
            var exist = url.indexOf(favourites_url);
            var done = targ.indexOf('SABblank');
            if (exist != -1 && done == -1) {
            	  i = anchors.length+3;
                var postid = url.substring(exist + favourites_url.length,url.length-8);
                // Change this to your host/port
                var SABnzbd_uri = 'http://127.0.0.1:8080';
                newElement = document.createElement('span');
                newElement.innerHTML = '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=1&id=' +
                                       postid + '" target="SABFrame" title="Download & repair">Rep</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=2&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract">Ext</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=3&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract, delete">Del</a>/' +
                                       '<a href="' + url + '" title="Bookmark at Newzbin">Book</a>';
                newElement.appendChild(keywordImage);
                anchor.parentNode.replaceChild(newElement, anchor);
                
            }
            exist = url.indexOf(remove_url);
            if (exist != -1 && done == -1) {
            	  i = anchors.length+3;
                var postid = url.substring(exist + remove_url.length,url.length-8);
                // Change this to your host/port
                var SABnzbd_uri = 'http://127.0.0.1:8080';
                newElement = document.createElement('span');
                newElement.innerHTML = '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=1&id=' +
                                       postid + '" target="SABFrame" title="Download & repair">Rep</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=2&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract">Ext</a>/' +
                                       '<a href="' + SABnzbd_uri + '/sabnzbd/addID?pp=3&id=' +
                                       postid + '" target="SABFrame" title="Download, repair, extract, delete">Del</a>/' +
                                       '<a href="' + url + '" title="Remove bookmark at Newzbin">UnBook</a>';
                newElement.appendChild(keywordImage);
                anchor.parentNode.replaceChild(newElement, anchor);
                
            }
        }
    }
})();
