// ==UserScript==
// @name           YouTube Uncrippler
// @namespace      Red Dragon Information Systems
// @include        http://*youtube.com/watch*
// ==/UserScript==


function get_video_id(url) {
    url = url+""; /* Convert to string */
    var ix = 0;
    for(ix=0; url.substring(ix,ix+2) != "v=" &&
          url.substring(ix,ix+2) != ""; ix++);

    var jx=0;
    for(jx=ix+2; url.substring(jx) != "&" &&
              url.substring(jx) != ""; jx++);

    return url.substring(ix+2,jx);
}

function embed_string() {
	return "<object style=\"text-align: center\" width=\"480\" height=\"385\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + get_video_id(window.location) + "&hl=en_US&fs=1&\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/" + get_video_id(window.location) + "&hl=en_US&fs=1&\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"480\" height=\"385\"></embed></object>";
}
watchContainer = document.getElementById("watch-video");
watchContainer.innerHTML = embed_string();
