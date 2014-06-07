// ==UserScript==
// @name YouTube_fix_for_InterPark
// @description Inter Park Drome bug fix
// @namespace http://googlesystem.blogspot.com
// @include http://*.youtube.com/watch?*
// @include https://*.youtube.com/watch?*
// @match http://*.youtube.com/watch?*
// @match https://*.youtube.com/watch?*
// @author CloNEz
// @version 1.0
// @date 2011-03-31

// ==/UserScript==

(function () {
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 480p','45':'WebM 720p (HD)'};
  var FORMAT_EXTENSIONS={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','45':'webm'};  
  var FORMAT_LIST=['5','18','34','35','22','37','38'];
  var DOWNLOAD_LINK_MESSAGES={'en':'InterPark?'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'InterPark?'};
  var DOWNLOAD_LINK_MESSAGE='InterPark';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
   
  var videoId, videoTicket, videoFormats, videoTitle;
  run();
  
function run() {
  // download-youtube-video is a container for the download button
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map  
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer!=null) { // Flash
    var flashValues=videoPlayer.innerHTML;   
    var videoIdMatches=flashValues.match(/\%26video_id=([^(\%26|$)]*)/);
    videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/\%26t=([^(\%26|$)]*)/);
    videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/\%26fmt_url_map=([^(\%26|$)]*)/);
    videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  }      
  
  if (videoId==null || videoTicket==null) { // HTML5 - Firefox, Opera
    var config=null;
    if (window.yt && window.yt.getConfig) {
      config=window.yt.getConfig("PLAYER_CONFIG"); 
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
  videoTitle=videoTitle.replace(/^YouTube \- /i,'').replace(/[#"\?:\*]/g,'').replace(/[%26\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
             
  // parse fmt_url_map
  var videoURL=new Array();
  var sep1=",", sep2="|";   
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]).replace(/\\\//g,'/').replace(/\\u0026/g,'%26');
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    // don't add lower quality FLV versions to prevent clutter
    if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    if (format=='34' && videoURL['35']!=undefined) continue;   
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined) {
      downloadCodeList.push({url:videoURL[format]+'%26title='+videoTitle,format:format,label:FORMAT_LABELS[format]});
    }
  }
  
  // adjustments for localized interfaces  
  var uiLanguage=document.documentElement.getAttribute('lang');
  if (uiLanguage=='ro' || uiLanguage=='it' || uiLanguage=='bg' || uiLanguage=='de' || uiLanguage=='el' || uiLanguage=='hu') {
      injectCSS('.watch-view-count strong{font-size:1.3em; line-height:150%; margin-left:-6px;} #watch-actions img.yt-uix-button-icon-addto {display:none;}');
  }
  if (uiLanguage=='fi' || uiLanguage=='sl' || uiLanguage=='pt' || uiLanguage=='hu' || uiLanguage=='de' || uiLanguage=='ru' || uiLanguage=='es' || uiLanguage=='ro' || uiLanguage=='uk'  || uiLanguage=='bg' || uiLanguage=='lt' || uiLanguage=='it' || uiLanguage=='el' || uiLanguage=='sw' || uiLanguage=='sr' || uiLanguage=='sk' || uiLanguage=='hi' || uiLanguage=='ja' || uiLanguage=='nl' || uiLanguage=='pl') {
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
    downloadCode+='<li><a style="text-decoration:none;" href="//std.kku.ac.th/5130405207/video/video.php?url='+downloadCodeList[i].url+'"><span class="yt-uix-button-menu-item" loop="'+i+'" id="'+(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format)+'">'+downloadCodeList[i].label+'</span></a></li>';
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

  function injectCSS(code) {
    var style=document.createElement('style');
    style.type='text/css';
    if (style.styleSheet){ // IE
      style.styleSheet.cssText=code; 
    } else {
      style.innerHTML=code;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
    
  }
 
})();