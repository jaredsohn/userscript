// ==UserScript==
// @name          YouTube: Tube2Tone Link
// @description   Adds a link to Tube2Tone.com from YouTube
// @namespace     http://userscripts.org/users/119685
// @version       1
// @date          2009-11-28
// @creator       Bob Newhart, fork from ariboo's
// @include       *youtube.com/*v=*
// ==/UserScript==


 var download_url = 'http://www.tube2tone.com/';
 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_url = download_url + video_id;

       function getEl(w){
               return document.getElementById(w);
       }
       desc = getEl("watch-views-div");
       descP = desc.parentNode;
       dv = document.createElement("a");
       dv.innerHTML="<span class='actionText'> Make a Ringtone! </span>";
       dv.setAttribute("rel", "nofollow");
       dv.setAttribute("class", "actionLink");
       dv.href=video_url;
       descP.insertBefore(dv, desc);