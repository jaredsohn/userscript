// ==UserScript==
// @name 	PornHub Direct Download
// @namespace 	<none>
// @description Insers a download link for PornHub videos in FLV format.
// @version     1.01
// @date 	2010-05-13
// @creator 	Burningmace
// @include	http://pornhub.com/view_video.php?*viewkey=*
// @include	http://www.pornhub.com/view_video.php?*viewkey=*
// @exclude	http://pornhub.com/
// @exclude	http://www.pornhub.com/
// @homepage	<none>
// @run-at document-start
// ==/UserScript==

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return null;
} 

function createLink() {
	var key = getQueryVariable('viewkey');
	var url = '';
	var id;
	var tag = 'video_0" value="';

	var code = document.documentElement.innerHTML;
	var tag_begin = code.indexOf(tag);
	if(tag_begin < 0) { alert('Could not find the video ID.'); return; }
	tag_begin += tag.length;
	var tag_end = code.indexOf('"', tag_begin);
	if(tag_end < 0) { alert('Could not find the video ID.');  return; }
	id = code.substring(tag_begin, tag_end);

	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.pornhub.com/embed_player.php?id=' + id,
		onload: function(resobj) {
			var results = resobj.responseText;
			var start = results.indexOf('<flv_url>');
			if(start < 0) { alert('Could not load video information.'); return; }
			start += 9;
			var end = results.indexOf('</flv_url>', start);
			if(end < 0) { alert('Could not load video information.'); return; }
			url = results.substring(start, end);
			document.getElementById('playerDiv_0').innerHTML += '<a href="' + url + '">Download (Right Click -&gt; Save As)</a>';
		}
	});
}

createLink();