// ==UserScript==
// @name           Video44 Download Link
// @namespace      Aaron Russell
// @include        http://video44.com/*/*
// ==/UserScript==

var id = document.getElementById('c_vid').value;
void(document.getElementById('detail_page_video_links').innerHTML="<h2><a id='Download' target='_top' href=''>-Download-</a></h2>");
void(document.getElementById('Download').href="http://video44.com/videos.php?vid="+id);