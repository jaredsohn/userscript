// ==UserScript==
// @name           What.CD Fix Torrent Comment Pages
// @namespace      http://jonls.dk
// @description    Make a link to the torrent comments that are "lost" due to a bug.
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/torrents.php*
// @version        0.1
// @date           2009-05-18
// ==/UserScript==

(function() {
	/* Parse search */
	var search = {};
	var search_list = document.location.search.substring(1).split('&');
	for (var i = 0; i < search_list.length; i++) {
		var pair = search_list[i].split('=');
		search[pair[0]] = pair[1];
	}

	if (!search.id) return;

	var page = 1;
	if (search.page) page = parseInt(search.page);

	var content = document.getElementById('content');
	var posts = content.getElementsByClassName('forum_post');

	var linkbox = content.getElementsByClassName('main_column')[0].getElementsByClassName('linkbox');

	for (var i = linkbox.length-2; i < linkbox.length; i++) {
		while (linkbox[i].hasChildNodes()) linkbox[i].removeChild(linkbox[i].firstChild);

		if (page > 1 || posts.length == 10) {
			if (page > 1) {
				var first_link = document.createElement('a');
				first_link.innerHTML = '<strong><< First</strong>';
				first_link.href = 'torrents.php?page=1&id='+search.id;
				linkbox[i].appendChild(first_link);

				linkbox[i].appendChild(document.createTextNode(' '));

				var prev_link = document.createElement('a');
				prev_link.innerHTML = '<strong>< Prev</strong>';
				prev_link.href = 'torrents.php?page='+(page-1)+'&id='+search.id;
				linkbox[i].appendChild(prev_link);

				linkbox[i].appendChild(document.createTextNode(' | '));
			}

			var page_span = document.createElement('span');
			page_span.innerHTML = '<strong>Page '+page+'</strong>';
			linkbox[i].appendChild(page_span);

			if (posts.length == 10) {
				linkbox[i].appendChild(document.createTextNode(' | '));

				var next_link = document.createElement('a');
				next_link.innerHTML = '<strong>Next ></strong>';
				next_link.href = 'torrents.php?page='+(page+1)+'&id='+search.id;
				linkbox[i].appendChild(next_link);
			}
		}
	}
})();
