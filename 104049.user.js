// ==UserScript==
// @name Download pornhub Videos
// @description Adds a button that lets you download pornhub videos.
// @namespace http://googlesystem.blogspot.com
// @include http://*.pornhub.com/watch?*
// @include https://*.pornhub.com/watch?*
// @match http://*.pornhub.com/watch?*
// @match https://*.pornhub.com/watch?*
// @source http://userscripts.org/scripts/show/25105
// @author maddevil.23
// @version 1.2.1
// @date 2011-05-21
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)'};
  var FORMAT_EXTENSIONS={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm'};  
  var FORMAT_LIST=['5','18','34','35','22','37','38'];
  var DOWNLOAD_LINK_MESSAGES={'en':'Download'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'Download this video'};
  var DOWNLOAD_LINK_MESSAGE='Download';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_PORNHUB_SPAN_ID='download-pornhub-video';
  var DOWNLOAD_PORNHUB_FMT_ID='download-pornhub-video-fmt';
  var DOWNLOAD_PORNHUB_BUTTON_ID='download-pornhub-video-button';
   
  var videoId, videoTicket, videoFormats, videoTitle;
  run();
  
function run() {
  // download-pornhub-video is a container for the download button
  if (document.getElementById(DOWNLOAD_PORNHUB_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map  
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer && videoPlayer.className!='html5-player') { // Flash
    var flashValues=videoPlayer.innerHTML;
    var videoIdMatches=flashValues.match(/\&amp;video_id=([^(\&|$)]*)/);
    videoId=(videoIdMatches)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/\&amp;t=([^(\&|$)]*)/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/\&amp;fmt_url_map=([^(\&|$)]*)/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null;
  } 
  
  if (videoId==null || videoTicket==null) { // HTML5 - Firefox, Opera
    var config=null;
    if(typeof(unsafeWindow)=='undefined') { // Opera
      unsafeWindow=window; 
    }
    if (unsafeWindow.yt && unsafeWindow.yt.getConfig) {
      config=unsafeWindow.yt.getConfig('PLAYER_CONFIG'); 
    }
    if (config && config.args) {
      var args=config.args;
      videoId=args['video_id'];
      videoTicket=args['t'];
      videoFormats=args['fmt_stream_map'];
      if (videoFormats==null) {
        videoFormats=args['fmt_url_map'];
      }
    }
  }
  
  if (videoId==null || videoTicket==null) { // everything else (HTML5 - Chrome)
    var pageFooter=document.getElementById('postpage');
    if (pageFooter) {
      var pageFooterContent=pageFooter.innerHTML;
      var videoIdMatches=pageFooterContent.match(/\"video_id\":\s*\"([^\"]*)\"/);
      videoId=(videoIdMatches)?videoIdMatches[1]:null;
      var videoTicketMatches=pageFooterContent.match(/\"t\":\s*\"([^\"]*)\"/);
      videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
      var videoFormatsMatches=pageFooterContent.match(/\"fmt_url_map\":\s*\"([^\"]*)\"/);
      videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null;
    }
  } 
  
  if (videoId==null || videoTicket==null) { // future proof
    var bodyContent=document.body.innerHTML;  
    var videoIdMatches=bodyContent.match(/\"video_id\":\s*\"([^\"]*)\"/);
    videoId=(videoIdMatches)?videoIdMatches[1]:null;
    var videoTicketMatches=bodyContent.match(/\"t\":\s*\"([^\"]*)\"/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=bodyContent.match(/\"fmt_url_map\":\s*\"([^\"]*)\"/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null; 
  }
  
  if (videoId==null || videoTicket==null) return;
  
  // video title
  videoTitle=document.title;
  videoTitle=videoTitle.replace(/^pornhub \- /i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
             
  // parse fmt_url_map
  var videoURL=new Array();
  var sep1='%2C', sep2='%7C';
  if (videoFormats.indexOf(',')>-1) { 
    sep1=','; 
    sep2='|';
  }  
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    // don't add lower quality FLV versions to prevent clutter
    if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    if (format=='34' && videoURL['35']!=undefined) continue;   
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined) {
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,format:format,label:FORMAT_LABELS[format]});
    }
  }
  
  var uiLanguage=document.documentElement.getAttribute('lang');
  if (/^lt|bg|uk$/.test(uiLanguage)) {
  var likeButton=document.getElementById('watch-like');
  if (likeButton) {
    var spanElements=likeButton.getElementsByTagName('span');
    if (spanElements) {
      spanElements[0].style.display='none';
    }
   }
  }
    
  if (DOWNLOAD_LINK_MESSAGES[uiLanguage]!=null) { 
    DOWNLOAD_LINK_MESSAGE=DOWNLOAD_LINK_MESSAGES[uiLanguage];
  }
  if (DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage]!=null) {   
    DOWNLOAD_TOOLTIP_MESSAGE=DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage];
  }   
 
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  downloadCode+='&nbsp; <img class="yt-uix-button-arrow" src="" alt="" /> <ul style="display:none;" class="yt-uix-button-menu">';
  for (var i=0;i<downloadCodeList.length;i++) {
    downloadCode+='<li><a style="text-decoration:none;" href="'+downloadCodeList[i].url+'"><span class="yt-uix-button-menu-item" loop="'+i+'" id="'+(DOWNLOAD_PORNHUB_FMT_ID+downloadCodeList[i].format)+'">'+downloadCodeList[i].label+'</span></a></li>';
  }
  downloadCode+='</ul>';
  downloadCode='<button id="'+DOWNLOAD_PORNHUB_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="return false;" type="button">'+downloadCode+'</button>';   
                                           
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.id=DOWNLOAD_PORNHUB_SPAN_ID;
  var flagButton=document.getElementById('watch-flag');
  if (flagButton && flagButton.parentNode) {
      containerSpan.innerHTML=downloadCode+' ';
      flagButton.parentNode.insertBefore(containerSpan,flagButton);
  } else {
      var actionsDiv=document.getElementById('watch-actions-right');
      if (actionsDiv==null) return;
      containerSpan.innerHTML=' '+downloadCode;
      actionsDiv.appendChild(containerSpan);
  }  
    
  for (var i=0;i<downloadCodeList.length;i++) {
    var downloadFMT=document.getElementById(DOWNLOAD_PORNHUB_FMT_ID+downloadCodeList[i].format);    
    if (downloadFMT.addEventListener) {
      downloadFMT.addEventListener('click', downloadVideo, false);
    } else if (downloadFMT.attachEvent) { // IE
      downloadFMT.attachEvent('onclick', downloadVideo);
    }
  }
  
  function downloadVideo(e) {
    var e=e||window.event; // IE
    var elem=e.target||e.srcElement;
    e.returnValue=false;    
    if (e.preventDefault) {
      e.preventDefault();
    }
    var loop=elem.getAttribute('loop');
    if (typeof GM_download=='function') { // Firefox extension compatibility
      GM_download(downloadCodeList[loop].url, videoTitle+'.'+FORMAT_EXTENSIONS[downloadCodeList[loop].format]);
    } else {
      document.location.href=downloadCodeList[loop].url;
    }
  }
      
  }
 
})();
