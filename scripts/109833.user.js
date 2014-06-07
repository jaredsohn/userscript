// ==UserScript==
// @name         Download YouTube Videos as MP4
// @description  Adds a button that lets you download YouTube videos.
// @include      http://*.youtube.com/watch?*
// @include      https://*.youtube.com/watch?*
// @match        http://*.youtube.com/watch?*
// @match        https://*.youtube.com/watch?*
// ==/UserScript==


(function () {
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)'};
  var FORMAT_EXTENSIONS={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm'};  
  var FORMAT_LIST=['5','18','34','35','22','37','38'];
  var DOWNLOAD_LINK_MESSAGES={'en':'Download'};
  var DOWNLOAD_TOOLTIP_MESSAGES={'en':'Download this video'};
  var DOWNLOAD_LINK_MESSAGE='Download';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
  var OLD_UI=1, NEW_UI=2;
   
  var videoId, videoTicket, videoFormats, videoTitle='';
  var interfaceVersion=OLD_UI;
  run();
  
function run() {
  // download-youtube-video is a container for the download button
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
    
  // obtain video ID, temporary ticket, formats map  
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer && videoPlayer.className!='html5-player') { // Flash
    var flashValues=videoPlayer.innerHTML;
    var videoIdMatches=flashValues.match(/\&amp;video_id=([^(\&|$)]*)/);
    videoId=(videoIdMatches)?videoIdMatches[1]:null;
    var videoTicketMatches=flashValues.match(/\&amp;t=([^(\&|$)]*)/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=flashValues.match(/\&amp;url_encoded_fmt_stream_map=([^(\&|$)]*)/);
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
      videoFormats=args['url_encoded_fmt_stream_map'];
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
    var videoFormatsMatches=bodyContent.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]*)\"/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null; 
  }
  
  if (videoId==null || videoTicket==null) return;
    
  // video title
  var headerTitle=document.getElementById('eow-title');
  if (headerTitle!=null) {
    videoTitle=headerTitle.textContent || headerTitle.innerText || '';
  }
  if (videoTitle=='') {
    var titleTag=document.title;
    if (titleTag!=null) {
      videoTitle=titleTag.replace(/^YouTube \- /i,'');
    }
  }  
  videoTitle=videoTitle.replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
    
             
  // parse fmt_url_map
  var videoURL=new Array();
  var sep1='%2C', sep2='%26', sep3='%3D';
  if (videoFormats.indexOf(',')>-1) { 
    sep1=','; 
    sep2='\\u0026'; 
    sep3='='; 
    if (videoFormats.indexOf('&')>-1)
      sep2='&';
  }  
  
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    var url=videoFormatsElem[0].split(sep3)[1];
    var itag=videoFormatsElem[4].split(sep3)[1];
    videoURL[itag]=unescape(unescape(url)).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
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
  
  // find parent container
  
  var parentElement=document.getElementById('watch-actions');
  var rightElement=document.getElementById('watch-actions-right');
  if (!rightElement && parentElement) {
    interfaceVersion=NEW_UI;    
  }  
  if (parentElement==null) return;
 
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  downloadCode+='&nbsp; <img class="yt-uix-button-arrow" src="" alt="" /> <ol style="display:none;" class="yt-uix-button-menu">';
  for (var i=0;i<downloadCodeList.length;i++) {
    downloadCode+='<li><a style="text-decoration:none;" href="'+downloadCodeList[i].url+'"><span class="yt-uix-button-menu-item" loop="'+i+'" id="'+(DOWNLOAD_YOUTUBE_FMT_ID+downloadCodeList[i].format)+'">'+downloadCodeList[i].label+'</span></a></li>';
  }
  downloadCode+='</ol>';
  downloadCode='<button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip' + ((interfaceVersion==OLD_UI)?' yt-uix-tooltip-reverse':'') +'" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="return false;" type="button">'+downloadCode+'</button>';   
                                           
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.id=DOWNLOAD_YOUTUBE_SPAN_ID;
      
  var leftmostButton=document.getElementById('watch-transcript') || document.getElementById('watch-flag') || null;
  if (leftmostButton && leftmostButton.parentNode==parentElement) {
      containerSpan.innerHTML=downloadCode+' ';
      parentElement.insertBefore(containerSpan,leftmostButton);
  } else {
      containerSpan.innerHTML=' '+downloadCode;
      parentElement.appendChild(containerSpan);      
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