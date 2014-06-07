// ==UserScript==
// @name حمل فيديوهاتك من اليوتيوب بسهولة By:KOPc
// @description زر تحت فيديوهات اليوتيوب يتيح لك تحميل الفيديو بصيغاته المختلفة .
// @namespace http://googlesystem.blogspot.com
// @include http://*.youtube.com/watch*
// @include https://*.youtube.com/watch*
// @match http://*.youtube.com/watch*
// @match https://*.youtube.com/watch*
// @source http://userscripts.org/scripts/show/25105
// @author Ionut Alex Chitu
// @version 1
// @date 2011-2-10
// @license MIT License
// ==/UserScript==

(function () {
  var FORMAT_LABELS={'5 KOPc':'FLV 240p KOPc','18':'MP4 360p KOPc','22':'MP4 720p (HD) KOPc','34':'FLV 360p KOPc','35':'FLV 480p KOPc','37':'MP4 1080p (HD) KOPc','38':'MP4 Original (HD) KOPc','43':'WebM 480p KOPc','45':'WebM 720p (HD) KOPc'};
  var FORMAT_EXTENSIONS={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','45':'webm'};  
  var FORMAT_LIST=['5','18','34','35','22','37','38'];
  var DOWNLOAD_LINK_MESSAGES={'en':'حمل الفيديو'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'حمل هذا الفيديو'};
  var DOWNLOAD_LINK_MESSAGE='حمل الفيديو';
  var DOWNLOAD_TOOLTIP_MESSAGE='حمل هذا الفيديو';
  var DOWNLOAD_YOUTUBE_SPAN_ID='حمل -يوتيوب-فيديو';
  var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
   
  var videoId, videoTicket, videoFormats, videoTitle;
  var pagetop=document.getElementById('watch-pagetop-section');
  if (pagetop) { // Ajax UI
    if (pagetop.addEventListener) { // Ajax UI - Firefox, Chrome, Opera      
      pagetop.addEventListener('DOMNodeInserted', run, false);
    } 
  } else { // Classic UI: Flash or HTML5
    run();
  } 
  
function run() {
  // download-youtube-video is a container for the download button
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map  
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer!=null) { // classic UI, Flash
    var flashValues=videoPlayer.innerHTML;   
    var videoIdMatches=flashValues.match(/\&video_id=([^(\&|$)]*)/);
    videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/\&t=([^(\&|$)]*)/);
    videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/\&fmt_url_map=([^(\&|$)]*)/);
    videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  }      
  
  if (videoId==null || videoTicket==null) { // Ajax UI or HTML5
    var config=null;
    if (window.yt && window.yt.getConfig) {
      config=window.yt.getConfig("SWF_CONFIG"); // Flash
      if (config==null) config=window.yt.getConfig("PLAYER_CONFIG"); // HTML5
    } else if (typeof(unsafeWindow)!='undefined' && unsafeWindow.yt && unsafeWindow.yt.getConfig) { // Firefox 3
      config=unsafeWindow.yt.getConfig("SWF_CONFIG"); // Flash
      if (config==null) config=unsafeWindow.yt.getConfig("PLAYER_CONFIG"); // HTML5       
    }    
    if (config && config.args) {
      var args=config.args;
      videoId=args["video_id"];
      videoTicket=args["t"];
      videoFormats=args["fmt_stream_map"];
    }
  }  
  
  if (videoId==null || videoTicket==null) { // everything else (HTML5 - Chrome)
    var bodyContent=document.body.innerHTML;  
    var videoIdMatches=bodyContent.match(/\"video_id\":\s*\"([^\"]*)\"/);
    videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
    var videoTicketMatches=bodyContent.match(/\"t\":\s*\"([^\"]*)\"/);
    videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
    var videoFormatsMatches=bodyContent.match(/\"fmt_url_map\":\s*\"([^\"]*)\"/);
    videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  }
  
  if (videoId==null || videoTicket==null) return;
  
  // video title
  videoTitle=document.title;
  videoTitle=videoTitle.replace(/^YouTube \- /i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
             
  // parse fmt_url_map
  var videoURL=new Array();
  var sep1="%2C", sep2="%7C";
  if (videoFormats.indexOf(",")>-1) { // new UI
    sep1=","; 
    sep2="|";
  }  
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]).replace(/\\\//g,'/');
  }
  if (videoURL['18']==undefined){
    // add standard MP4 format (fmt18), even if it's not included
    videoURL['18']='http://www.youtube.com/get_video?fmt=18&video_id='+videoId+'&t='+videoTicket+'&asv=3';
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    // don't add lower quality FLV versions to prevent clutter
    if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    // if (format=='34' && videoURL['35']!=undefined) continue;   
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined){         
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,format:format,label:FORMAT_LABELS[format]});
    }
  }
  
  // adjustments for localized interfaces  
  var uiLanguage=document.documentElement.getAttribute('lang');
  if (uiLanguage == 'ro' || uiLanguage == 'it' || uiLanguage == 'bg' || uiLanguage == 'de' || uiLanguage == 'el' || uiLanguage == 'hu') {
      injectCSS('.watch-view-count strong{font-size:1.3em; line-height:150%; margin-left:-6px;} #watch-actions img.yt-uix-button-icon-addto {display:none;}');
  }
  if (uiLanguage == 'fi' || uiLanguage == 'sl' || uiLanguage == 'pt' || uiLanguage == 'hu' || uiLanguage == 'de' || uiLanguage == 'ru' || uiLanguage == 'es' || uiLanguage == 'ro' || uiLanguage == 'uk'  || uiLanguage == 'bg' || uiLanguage == 'lt' || uiLanguage == 'it' || uiLanguage == 'el' || uiLanguage == 'sw' || uiLanguage == 'sr' || uiLanguage == 'sk' || uiLanguage == 'hi' || uiLanguage == 'ja' || uiLanguage == 'nl' || uiLanguage == 'pl') {
  var likeButton = document.getElementById('watch-like');
  if (likeButton) {
    var spanElements = likeButton.getElementsByTagName('span');
    if (spanElements) {
      spanElements[0].style.display = 'none';
    }
   }
  }
  if (DOWNLOAD_LINK_MESSAGES[uiLanguage]!=null) { 
    DOWNLOAD_LINK_MESSAGE = DOWNLOAD_LINK_MESSAGES[uiLanguage];
  }
  if (DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage]!=null) {   
    DOWNLOAD_TOOLTIP_MESSAGE = DOWNLOAD_TOOLTIP_MESSAGES[uiLanguage];
  }   
 
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  downloadCode+='&nbsp; <img class="yt-uix-button-arrow" src="" alt="" /> <ul style="display:none;" class="yt-uix-button-menu">';
  for (var i=0;i<downloadCodeList.length;i++) {
    downloadCode+='<li><a style="text-decoration:none;" href="'+downloadCodeList[i].url+'"><span class="yt-uix-button-menu-item" loop="'+i+'" id="'+(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format)+'">'+downloadCodeList[i].label+'</span></a></li>';
  }
  downloadCode+='</ul>';
  downloadCode='<button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="return false;" type="button">'+downloadCode+'</button>';   
                                           
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.id=DOWNLOAD_YOUTUBE_SPAN_ID;
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
    var downloadFMT=document.getElementById(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format);    
    if (downloadFMT.addEventListener) {
      downloadFMT.addEventListener('click', downloadVideo, false);
    } else if (downloadFMT.attachEvent) { // IE
      downloadFMT.attachEvent('onclick', downloadVideo);
    }
  }
  
  function downloadVideo(e) {
    if(!e) var e = window.event; // IE
    var elem = (e.target)?e.target:e.srcElement;
    e.returnValue = false;    
    if (e.preventDefault) {
      e.preventDefault();
    }
    var loop = elem.getAttribute('loop');
    if (typeof GM_download == 'function') {
      GM_download(downloadCodeList[loop].url, videoTitle+'.'+FORMAT_EXTENSIONS[downloadCodeList[loop].format]);
    } else {
      location.href=downloadCodeList[loop].url;
    }
  }
  
  function injectCSS(code) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){// IE
      style.styleSheet.cssText = code; 
    } else {
      style.innerHTML = code;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
    
  }
 
})();