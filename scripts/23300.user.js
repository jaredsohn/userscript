// ==UserScript==
// @name          Download from YouTube created by happy
// @description   adds a link to download flv form YouTube
// @include       *youtube.com/*v=*
// ==/UserScript==


 var download_url = 'http://youtubeloader.com/link.php?link=http://www.youtube.com/watch?v=';
 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_url = download_url + video_id;

       function getEl(w){
               return document.getElementById(w);
       }

       desc = getEl("a1_i1");
       descP = desc.parentNode;
       dv = document.createElement("a");
       dv.innerHTML="<span class='actionText'>Download</span>";
       dv.setAttribute("rel", "nofollow");
       dv.setAttribute("class", "actionLink");
       dv.href=video_url;
       descP.insertBefore(dv, desc);

