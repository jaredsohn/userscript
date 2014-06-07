// ==UserScript==
// @name           Vishnu's Download YouTube Videos as MP4.
// @author         Vishnu from Sri SaiNagar, Thuraipakkam, Chennai, India!
// @description    Adds an option to download YouTube videos.
// @include        http://*.youtube.com/watch?*
// @match          http://*.youtube.com/watch?*
// ==/UserScript==

(function () {
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)'};
  var FORMAT_LIST=['5','18','34','35','22','37'];
  var DOWNLOAD_LINK_MESSAGE="Vishnu's Download";
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT18_ID='download-youtube-video-fmt18';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
  
  // download-youtube-video is a container for the download message
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer==null) return;  
  var flashValues=videoPlayer.innerHTML;
  
  // obtain video ID, temporary ticket, formats map and title
  var videoIdMatches=flashValues.match(/\&video_id=([^(\&|$)]*)/);
  var videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
  if (videoId==null) return;    
  var videoTicketMatches=flashValues.match(/\&t=([^(\&|$)]*)/);
  var videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
  if (videoTicket==null) return;  
  var videoFormatsMatches=flashValues.match(/\&fmt_url_map=([^(\&|$)]*)/);
  var videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  var videoTitle=escape(document.title.replace(/[\&\|\"\?\\\/\:\*]/g,'').replace(/^YouTube \- /i,'')); 
             
  // parse fmt_url_map
  var videoURL=new Array();
  var isFinalURL=new Array();
  var videoFormatsGroup=videoFormats.split('%2C');
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split('%7C');
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]);
    isFinalURL[videoFormatsElem[0]]=true;
  }
  if (videoURL['18']==undefined){
    // add standard MP4 format (fmt18), even if it's not included
    videoURL['18']='http://www.youtube.com/get_video?fmt=18&video_id='+videoId+'&t='+videoTicket;
    isFinalURL[videoFormatsElem[0]]=false;
  }
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    if (format=='34' && videoURL['35']!=undefined) continue;        
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined){         
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,isFinalURL:isFinalURL[format],format:format,label:FORMAT_LABELS[format]});
    }
  }  
 
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  if (downloadCodeList.length>1) {
    downloadCode+='&nbsp; <img class="yt-uix-button-arrow" src="" alt="" /> <ul class="yt-uix-button-menu">';
    for (var i=0;i<downloadCodeList.length;i++) { 
      if (downloadCodeList[i].format=='18' && !downloadCodeList[i].isFinalURL) {
        downloadCode+='<li><span id="'+DOWNLOAD_YOUTUBE_FMT18_ID+'" url="'+downloadCodeList[i].url+'" onclick="location.href=document.getElementById(\''+DOWNLOAD_YOUTUBE_FMT18_ID+'\').getAttribute(\'url\');" class="yt-uix-button-menu-item">'+downloadCodeList[i].label+'</span></li>';
      } else {
        downloadCode+="<li><span onclick='location.href=\""+downloadCodeList[i].url+"\";'  class='yt-uix-button-menu-item'>"+downloadCodeList[i].label+"</span></li>";
      }
    }
    downloadCode+='</ul>';
  }    
  downloadCode=' <button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" type="button">'+downloadCode+'</button> &nbsp;';
  if (downloadCodeList.length==1) {
      if (downloadCodeList[0].format=='18' && !downloadCodeList[0].isFinalURL) {
        downloadCode='<span id="'+DOWNLOAD_YOUTUBE_FMT18_ID+'" url="'+downloadCodeList[0].url+'" onclick="location.href=document.getElementById(\''+DOWNLOAD_YOUTUBE_FMT18_ID+'\').getAttribute(\'url\');">'+downloadCode+'</span>';
      } else {
        downloadCode="<span onclick='location.href=\""+downloadCodeList[0].url+"\";'>"+downloadCode+"</span>";
      }  
  }
                           
  var containerSpan=document.createElement('span');
  containerSpan.id=DOWNLOAD_YOUTUBE_SPAN_ID;
  containerSpan.innerHTML=downloadCode;  
  var flagButton=document.getElementById('watch-flag');
  if (flagButton && flagButton.parentNode) {
      flagButton.parentNode.insertBefore(containerSpan,flagButton);
  } else {
      var actionsDiv=document.getElementById('watch-actions-more');
      if (actionsDiv==null) return;
      actionsDiv.appendChild(containerSpan);
  }
  
	 // fake click if there are multiple formats (workaround for a bug)
	var downloadButton=document.getElementById(DOWNLOAD_YOUTUBE_BUTTON_ID);
	if (downloadButton && downloadCodeList.length>1) {            
    var scriptInjection=document.createElement('script'); 
    scriptInjection.type='text/javascript'; 
    scriptInjection.text='document.getElementById("'+DOWNLOAD_YOUTUBE_BUTTON_ID+'").click()';
    document.getElementsByTagName('head')[0].appendChild(scriptInjection);
	}
	
  // get final redirect URL for fmt18 videos (only works in Greasemonkey)
  var downloadFMT18=document.getElementById(DOWNLOAD_YOUTUBE_FMT18_ID);
  if (downloadFMT18 && typeof GM_xmlhttpRequest!='undefined') {  
    var url=downloadFMT18.getAttribute('url');
    try { var xhr=GM_xmlhttpRequest({
      method: 'HEAD',
      url: url,
      onreadystatechange: function(response) {
        if (response.readyState == 2 || response.readyState == 3) {
          xhr.abort();
        } else if (response.readyState == 4) {
          if (response.status=='404') {
            downloadFMT18.setAttribute('url', 'javascript:void(0)');
          } else if (response.finalUrl!=url) { 
            downloadFMT18.setAttribute('url', response.finalUrl+'&title='+videoTitle);
          }
        }
      }
    }) 
    }
    catch(e) {}
  }
 
})();