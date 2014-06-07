// ==UserScript==
// @name       TAU video links
// @namespace  doronshemtov.com
// @version    0.1
// @description Add a link to the video WMV stream
// @include     *video.tau.ac.il/index.php?option=com_videos&view=videos*
// @copyright  2014+, Doron Shem Tov
// ==/UserScript==

var videos = document.getElementsByClassName('video_item');

for (var i = 0; i < videos.length; ++i) {
    
    var currVideo = videos[i];
    
    var videoLink = currVideo.getElementsByTagName('img')[0].getAttribute("src").replace(".jpg", ".wmv").replace("/files", "mms://msvideo.tau.ac.il/CMS");
    
    var videoDetails = currVideo.getElementsByClassName('video_details')[0];
    
    var link=document.createElement("p");
    var linkTest=document.createTextNode(videoLink);
    link.appendChild(linkTest);
    
    videoDetails.appendChild(link);
}