// ==UserScript==
// @name          YouTube Downloader
// @namespace     http://paddya.kilu.de
// @description   Get Download Links for Videos at YouTube
// @include       http://youtube.com/watch*, http://www.youtube.com/watch*
// ==/UserScript==

window.getdl = function() {
           var url = location.href;  // get location 
           url.replace(/www./, ""); // kill "www"
           var vidId = url.substring(27, 38); // get video-id
           var link = "<p style='text-align:center; font-size: 16px;'><a style='color: #f00;' href='http://cache.googlevideo.com/get_video?video_id=" + vidId + "'>Download this video<\/a><\/p>"; // Generate DL-Link
           
           if(document.getElementById('embedDiv')) {       
               var box = document.getElementById('embedDiv').innerHTML; // case: new-design: get content of embedDiv 
               document.getElementById('embedDiv').innerHTML = box + link; // for new-design
              } 
               // Following code only for old design!
            else {   
               var oldbox = document.getElementById('actionsAndStatsDiv').innerHTML;
                   document.getElementById('actionsAndStatsDiv').innerHTML = oldbox + link;     
            }

}

window.getdl();
