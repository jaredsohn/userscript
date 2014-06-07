// ==UserScript==
// @name       Kinokopilka expand all torrents
// @namespace  http://kinokopilka.tv
// @version    0.2
// @description  Expands all folded torrents blocks and enables last "Enqueue torrent" link
// @match      http://www.kinokopilka.tv/movies/*
// @copyright  2013, Alexey Shumkin
// ==/UserScript==
!function(win) {
    if (window != window.top) return;

    var doc = win.document;

    function expand_all_hidden(doc) {
	var entries = doc.getElementsByTagName("div");
	for (var i = 0; i < entries.length; i++ ) {
	    // find post
	    var entry = entries[i];
	    if ((entry.getAttribute('class') == 'torrent-info' )
		|| (entry.getAttribute('class') == 'media')
		|| entry.id.match(/xbt_file_[0-9]+_bookmark_widget/))
	    {
		entry.setAttribute('style', 'display: block');
	    }
	}
    }
    win.addEventListener("load", function() {
	expand_all_hidden(doc);
    }, false);
}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow)
