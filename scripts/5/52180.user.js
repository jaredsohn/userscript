// ==UserScript==
// @name           YouTube Download Playlist
// @namespace      #aVg
// @description    Adds download links to every video in the playlist.
// @include        http://www.youtube.com/watch?*
// @version        0.1.1
// ==/UserScript==
function get(A) {
	var id = A.href.match(/\bv=([^&]+)/)[1];
	GM_xmlhttpRequest({
		url : "http://www.youtube.com/get_video_info?video_id=" + id,
		method : "GET",
		onload : function(R) {
			A = A.parentNode;
			var base = document.createElement("div");
			base.setAttribute("style", "float:right;padding-top:4px;");
			var t = decodeURIComponent(R.responseText.match(/token=([^&]+)/)[1]);
			var downloads={"3gp":"17", mp4:"18"};
			if(decodeURIComponent(R.responseText.match(/fmt_map=([^&]+)/)[1]).indexOf("22")==0)
				downloads["hd mp4"]="22";
			var flv = document.createElement("a");
			flv.textContent = "flv";
			flv.href = "http://www.youtube.com/get_video?video_id="+id+"&t="+t;
			base.appendChild(flv);
			for(var dl in downloads) {
				var temp=flv.cloneNode(false);
				temp.innerHTML=dl;
				temp.href+="&fmt="+downloads[dl];
				base.appendChild(document.createTextNode(" // "));
				base.appendChild(temp);
			}
			A.appendChild(base);
		}
	});
}
var vids = document.getElementById("playlist-panel");
if(vids) {
	vids = vids.getElementsByTagName("a");
	var vid, i=vids.length;
	while (vid = vids[--i])
		if (vid.className=="watch-playlist-row-link")
			get(vid);
}