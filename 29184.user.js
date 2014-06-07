// ==UserScript==
// @name           YouTube Downloader
// @version        0.1
// @autor          Fábio Domingues aka fnds
// @email          fnds3000@gmail.com
// @namespace      http://www.portugal-a-programar.org/forum/index.php/topic,26637
// @description    A simple Greasemonkey script that creates a link on the page to download the movie hosted on YouTube. Tested successfully in Opera.
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

function display(_) {
    if (_ == 1)
        document.getElementById("alert-15646456418").style.display = "inline";
    else
        document.getElementById("alert-15646456418").style.display = "none"        
}

title = document.getElementById("watch-vid-title").getElementsByTagName("div")[0].innerHTML.replace(/ /g, "_")
place = document.getElementById("watch-this-vid")

place.innerHTML = '<div style="margin: 0px 100% 0px 0px;" onmouseover="display(1); '
+'this.style.margin=\'0px 0px 0px 0px\'" onmouseout="display(0); '
+'this.style.margin=\'0px 100% 0px 0px\'"><a href="http://www.youtube.com/get_video?video_id='
+swfArgs["video_id"]+'&t='+swfArgs["t"]
+'">Download</a><span style="display:none" id="alert-15646456418"><br />Please change the file from "<b>get_video</b>" to "<b>'
+title+'.flv</b>".</span></div>'+place.innerHTML