// ==UserScript==
// @name          XTube - Video Download Link
// @namespace     http://www.cothlamadh.net/greasemonkey
// @author        Signe - http://www.cothlamadh.net/
// @description	  Modify the video page to include a link to download the video to your desktop.  This is a completely rewritten version of a script by Lorax
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include       http://*.xtube.com/watch.php?*
// ==/UserScript==


String.prototype.getPref = function(s, splitter) {
    if (this.indexOf(s) != -1) {
        return this.split(s+"=")[1].split((splitter||"&"))[0];
    }
    return false;
};

function genDownloadLink() {
    var flashvars = $('div#flash_holder embed').attr('flashvars');

    // All of the query parameters we need are part of the watch.php page we're already viewing
    var whos  = flashvars.getPref('user_id');
    var vidid = flashvars.getPref('video_id');
    var clid  = flashvars.getPref('clip_id');

    // Make the search request and then update the document with a link to the video
    // user%5Fid=macvie&clip%5Fid=&video%5Fid=UhVTc%2DS542%2D
    GM_xmlhttpRequest({
        method: 'POST',
        url: "http://www.xtube.com/find_video.php",
        data: "user%5Fid=" + escape(whos) + "&clip%5Fid=" + escape(clid) + "&video%5Fid=" + escape(vidid),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(responseDetails) {
            /**
             * From output that looks like this:
             * &filename=/videos/2008/20080911pm/5721S4Jd0EB.flv&clip_id=7aX3d-S721-&status=1&preview_type=0&preview_video_id=&preview_clip_id=
             * We're taking everything after "&filename=".
             */
            // var flvPath = responseDetails.responseText.split('&')[1].split('=')[1];
            var flvPath = unescape(responseDetails.responseText.substr(10));
            
            /**
             * Modify the video's title to include a download link
             */
            $('div.content_d div:first').append("&nbsp;&nbsp;<span>(<a style='font-size: 13px' href='" + flvPath + "'>Download this video</a>)</span>");

            /* and thats that! */
        }
    });
}

genDownloadLink();