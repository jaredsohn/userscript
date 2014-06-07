// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds an option to download YouTube videos.
// @namespace http://googlesystem.blogspot.com
// @include http://*.youtube.com/watch*
// @match http://*.youtube.com/watch*
// @source http://userscripts.org/scripts/show/25105
// @author I dont know
// @version 1.0.3
// @date 2010-07-23
// @license MIT License
// ==/UserScript==

(function () {
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 Original (HD)','43':'WebM 480p','45':'WebM 720p (HD)'};
  var FORMAT_EXTENSIONS={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','45':'webm'};  
  var FORMAT_LIST=['5','18','34','35','22','37','38'];
  var DOWNLOAD_LINK_MESSAGES={'en':'Download'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'Download this video'};
  var DOWNLOAD_LINK_MESSAGE='Download';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
   
  var videoId, videoTicket, videoFormats, videoTitle;
  var pagetop=document.getElementById('watch-pagetop-section');
  if (pagetop) { // new UI
    if (pagetop.addEventListener) {
      pagetop.addEventListener('DOMNodeInserted', run, false);
    } else  {
    // TODO: alternative to DOMNodeInserted
    }
  } else {
    run();
  } 
  
function run() {  
  // download-youtube-video is a container for the download button
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map 
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer!=null) {
    var flashValues=videoPlayer.innerHTML;   
    var videoIdMatches=flashValues.match(/\&video_id=([^(\&|$)]*)/);
    videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/\&t=([^(\&|$)]*)/);
    videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/\&fmt_url_map=([^(\&|$)]*)/);
    videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  }  
  
  if (videoId==null || videoTicket==null) { // new UI
    var args=null;
    try {
      args=unsafeWindow.yt.getConfig("SWF_CONFIG").args;
    }
    catch(e){ 
      try {
        args=window.yt.getConfig("SWF_CONFIG").args;
      }
      catch(f){
        return; 
      }    
    }
    if (args) {
      videoId=args["video_id"];
      videoTicket=args["t"];
      videoFormats=args["fmt_stream_map"];
    }
    if (videoId==null || videoTicket==null) return;
  }
  
  // video title
  videoTitle=document.title;
  videoTitle=videoTitle.replace(/^YouTube \- /i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
             
  // parse fmt_url_map
  var videoURL=new Array();
  var isFinalURL=new Array();
  var sep1="%2C", sep2="%7C";
  if (videoFormats.indexOf(",")>-1) { // new UI
    sep1=","; 
    sep2="|";
  }  
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]);
    isFinalURL[videoFormatsElem[0]]=true;
  }
  if (videoURL['18']==undefined){
    // add standard MP4 format (fmt18), even if it's not included
    // videoURL['18']='http://www.youtube.com/get_video?fmt=18&video_id='+videoId+'&t='+videoTicket;
    // isFinalURL[videoFormatsElem[0]]=false;
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    // don't add lower quality FLV versions to prevent clutter
    // if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    // if (format=='34' && videoURL['35']!=undefined) continue;   
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined){         
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,isFinalURL:isFinalURL[format],format:format,label:FORMAT_LABELS[format]});
    }
  }
  
  // adjustments for localized interfaces  
  var uiLanguage=document.documentElement.getAttribute('lang');
  if (uiLanguage == 'fr' || uiLanguage == 'de' || uiLanguage == 'hu' || uiLanguage == 'pt' || uiLanguage == 'es') {
  var shareButton = document.getElementById('watch-share');
  if (shareButton) {
    var spanElements = shareButton.getElementsByTagName('span');
    if (spanElements) {
      spanElements[0].style.display = 'none';
    }
   }
  }
  if (uiLanguage == 'ru' || uiLanguage == 'es') {
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
  downloadCode='<button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="return false;" type="button">'+downloadCode+'</button>';   
                                           
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.id=DOWNLOAD_YOUTUBE_SPAN_ID;
  var flagButton=document.getElementById('watch-flag');
  if (flagButton && flagButton.parentNode) {
      containerSpan.innerHTML=downloadCode+'&nbsp;&nbsp; ';
      flagButton.parentNode.insertBefore(containerSpan,flagButton);
  } else {
      var actionsDiv=document.getElementById('watch-actions-right');
      if (actionsDiv==null) return;
      containerSpan.innerHTML='&nbsp;&nbsp;'+downloadCode;
      actionsDiv.appendChild(containerSpan);
  }  
  
   for (var i=0;i<downloadCodeList.length;i++) {
    var downloadFMT=document.getElementById(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format);
    if (downloadFMT==null) continue;    
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
  
  
  }
 
})();