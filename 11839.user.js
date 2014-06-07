// ==UserScript==
// @name           anyplayeryoutube
// @namespace      http://userscripts.org/
// @description    Play video/x-flv in any video plugin supporting it
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*youtube.com/w*
// ==/UserScript==
 var download_url = 'http://youtube.com/get_video?video_id=';


   GM_xmlhttpRequest({

   method: 'GET',
   url: window.location.href,
   headers: {
     'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
     'Accept': 'text/xml',
   },
   onload: function(responseTextDetails) {
       ///check content
        var responseHTML = responseTextDetails.responseText;
     StartPos = responseHTML.indexOf("watch_fullscreen?video_id=");
     EndPos = responseHTML.indexOf("\"",StartPos);
     Content = responseHTML.substring(StartPos,EndPos);
     var t_id = Content.match(/t=([^(\&|$)]*)/)[1];

 var url_vars = window.location.href.split("?")[1];
 var video_id = url_vars.match(/v=([^(\&|$)]*)/)[1];
 var video_url = download_url + video_id + '&t=' + t_id;

 var playerDiv = document.getElementById('playerDiv');
 playerDiv.innerHTML = '<embed type="video/x-flv" src="' + video_url + '"/>';
   }})
