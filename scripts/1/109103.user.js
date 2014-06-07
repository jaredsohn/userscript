// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds a button that lets you download YouTube videos.
// @namespace http://googlesystem.blogspot.com
// @include http://*.youtube.com/watch?*
// @include https://*.youtube.com/watch?*
// @match http://*.youtube.com/watch?*
// @match https://*.youtube.com/watch?*
// @homepageURL http://userscripts.org/scripts/show/25105
// @updateURL https://userscripts.org/scripts/source/25105.meta.js
// @author Gantt (Patch by TLUL)
// @version 1.3.7
// @date 2012-01-07
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
  var FORMAT_LABEL={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)'};
  var FORMAT_TYPE={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm'};
  var FORMAT_ORDER=['5','18','34','43','35','44','22','45','37','38'];
  var FORMAT_RULE={'flv':'max','mp4':'all','webm':'none'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
  var DOWNLOAD_LINK_MESSAGES={'en':'Download'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'Download this video'};
  var DOWNLOAD_LINK_MESSAGE='Download';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
   
  var videoId, videoTicket, videoFormats, videoTitle='';
  run();
  
function run(){
  // download-youtube-video is a container for the download button
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map  
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer && videoPlayer.getAttribute('class').indexOf('html5')==-1){ // Flash
    var flashValues=videoPlayer.innerHTML;
    var videoIdMatches=flashValues.match(/(?:"|\&amp;)video_id=([^(\&|$)]+)/);
    videoId=(videoIdMatches)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/(?:"|\&amp;)t=([^(\&|$)]+)/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/(?:"|\&amp;)url_encoded_fmt_stream_map=([^(\&|$)]+)/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null;
  } 
  
  if (videoId==null || videoTicket==null){ // HTML5 - Firefox, Opera
    var config=null;
    if(typeof(unsafeWindow)=='undefined'){ // Opera
      unsafeWindow=window; 
    }
    if (unsafeWindow.yt && unsafeWindow.yt.getConfig){
      config=unsafeWindow.yt.getConfig('PLAYER_CONFIG'); 
    }
    if (config && config.args){
      var args=config.args;
      videoId=args['video_id'];
      videoTicket=args['t'];
      videoFormats=args['url_encoded_fmt_stream_map'];
    }
  }
    
  if (videoId==null || videoTicket==null){ // everything else (HTML5 - Chrome)
    var bodyContent=document.body.innerHTML;  
    var videoIdMatches=bodyContent.match(/\"video_id\":\s*\"([^\"]+)\"/);
    videoId=(videoIdMatches)?videoIdMatches[1]:null;
    var videoTicketMatches=bodyContent.match(/\"t\":\s*\"([^\"]+)\"/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=bodyContent.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null; 
  }
  
  if (videoId==null || videoTicket==null || videoFormats==null) return;
  //if (videoId.length==0 || videoTicket.length==0 || videoFormats.length==0) return;
    
  // video title
  var headerTitle=document.getElementById('eow-title');
  if (headerTitle!=null){
    videoTitle=headerTitle.textContent || headerTitle.innerText || headerTitle.getAttribute('title') || ''; // innerText for IE<9
  }
  if (videoTitle==''){
    videoTitle=(document.title!=null)?document.title.replace(/ \- YouTube$/i,''):'video';
  }
  videoTitle=videoTitle.replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
                  
  // parse the formats map
  var sep1='%2C', sep2='%26', sep3='%3D';
  if (videoFormats.indexOf(',')>-1){ 
    sep1=','; 
    sep2=(videoFormats.indexOf('&')>-1)?'&':'\\u0026'; 
    sep3='=';
  }  
  
  var videoURL=new Array();
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    if (videoFormatsElem.length<5) continue;
    var partialResult1=videoFormatsElem[0].split(sep3);
    if (partialResult1.length<2) continue;
    var url=partialResult1[1];
    url=unescape(unescape(url)).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
    var partialResult2=videoFormatsElem[4].split(sep3);
    if (partialResult2.length<2) continue;    
    var itag=partialResult2[1];
    if (url.toLowerCase().indexOf('http')==0){ // validate URL
      videoURL[itag]=url;
    }
  }
  
  var showFormat=new Array();
  for (var category in FORMAT_RULE){
    var rule=FORMAT_RULE[category];
    for (var index in FORMAT_TYPE){
      if (FORMAT_TYPE[index]==category){
        showFormat[index]=(rule=='all');
      }
    }
    if (rule=='max'){
      for (var i=FORMAT_ORDER.length-1;i>=0;i--){
        var format=FORMAT_ORDER[i];
        if (FORMAT_TYPE[format]==category && videoURL[format]!=undefined) {
          showFormat[format]=true;
          break;
        }
      }
    }
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_ORDER.length;i++){
    var format=FORMAT_ORDER[i];
    if (videoURL[format]!=undefined && FORMAT_LABEL[format]!=undefined && showFormat[format]){
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,format:format,label:FORMAT_LABEL[format]});
    }
  }
  if (downloadCodeList.length==0) return; // no format
  
  var uiLanguage=document.documentElement.getAttribute('lang');
  if (/^lt|bg|uk$/.test(uiLanguage)){
    var likeButton=document.getElementById('watch-like');
    if (likeButton){
      var spanElements=likeButton.getElementsByTagName('span');
      if (spanElements){
        spanElements[0].style.display='none';
      }
     }
  }
    
  if (DOWNLOAD_LINK_MESSAGES[uiLanguage]!=null){ 
    DOWNLOAD_LINK_MESSAGE=DOWNLOAD_LINK_MESSAGES[uiLanguage];
  }
  if (DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage]!=null){   
    DOWNLOAD_TOOLTIP_MESSAGE=DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage];
  }   
  
  // find parent container  
  var parentElement=document.getElementById('watch-actions');
  var rightElement=document.getElementById('watch-actions-right');
  if (parentElement==null) return;
 
  // generate download code
  var mainSpan=document.createElement('span');
  var spanButton=document.createElement('span');
  spanButton.setAttribute('class', 'yt-uix-button-content');
  spanButton.appendChild(document.createTextNode(DOWNLOAD_LINK_MESSAGE));
  mainSpan.appendChild(spanButton);
  var imgButton=document.createElement('img');
  imgButton.setAttribute('style', 'vertical-align: baseline;');  
  imgButton.setAttribute('class', 'yt-uix-button-arrow');
  mainSpan.appendChild(imgButton);
  var listItems=document.createElement('ol');
  listItems.setAttribute('style', 'display:none;');
  listItems.setAttribute('class', 'yt-uix-button-menu');
  for (var i=0;i<downloadCodeList.length;i++){
    var listItem=document.createElement('li');
    var listLink=document.createElement('a');
    listLink.setAttribute('style', 'text-decoration:none;');
    listLink.setAttribute('href', downloadCodeList[i].url);
    var listSpan=document.createElement('span');
    listSpan.setAttribute('class', 'yt-uix-button-menu-item');
    listSpan.setAttribute('loop', i+'');
    listSpan.setAttribute('id', DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format);
    listSpan.appendChild(document.createTextNode(downloadCodeList[i].label));
    listLink.appendChild(listSpan);
    listItem.appendChild(listLink);
    listItems.appendChild(listItem);    
  }
  mainSpan.appendChild(listItems);
  var buttonElement=document.createElement('button');
  buttonElement.setAttribute('id', DOWNLOAD_YOUTUBE_BUTTON_ID);
  buttonElement.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-tooltip-reverse');  
  buttonElement.setAttribute('data-tooltip-text', DOWNLOAD_TOOLTIP_MESSAGE);  
  buttonElement.setAttribute('onclick', 'return false;');
  buttonElement.setAttribute('type', 'button');
  buttonElement.appendChild(mainSpan);
                                            
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.setAttribute('id', DOWNLOAD_YOUTUBE_SPAN_ID);
      
  var leftmostButton=document.getElementById('watch-flag') || document.getElementById('watch-transcript') || null;
  if (leftmostButton && leftmostButton.parentNode==parentElement){
      containerSpan.appendChild(buttonElement);
      containerSpan.appendChild(document.createTextNode(' '));
      parentElement.insertBefore(containerSpan,leftmostButton);
  } else{
      containerSpan.appendChild(document.createTextNode(' '));
      containerSpan.appendChild(buttonElement);
      parentElement.appendChild(containerSpan);
  }   
    
  for (var i=0;i<downloadCodeList.length;i++){
    var downloadFMT=document.getElementById(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format);    
    if (downloadFMT.addEventListener){ 
      downloadFMT.addEventListener('click', downloadVideo, false);
    } else if (downloadFMT.attachEvent){ // IE<9
      downloadFMT.attachEvent('onclick', downloadVideo);
    }
  }
  
  function downloadVideo(e){
    var e=e||window.event; // window.event for IE<9
    var elem=e.target||e.srcElement; // e.srcElement for IE<9
    e.returnValue=false;    
    if (e.preventDefault){
      e.preventDefault();
    }
    document.location.href=downloadCodeList[elem.getAttribute('loop')].url;
  }
      
  }
 
})();