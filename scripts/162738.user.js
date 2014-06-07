// ==UserScript==
// @name           Youtube 980px
// @description    Youtube 980px
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @version        1.0
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==


(function() {
    
// ------------------- Bigger Videos ----------------------
  
  if (window.location.pathname.indexOf('/watch') !== 0) return;

  $('head').append(
    '<style>' + 
    '#watch7-playlist-bar-toggle-button { display: inline-block !important; }' + 
    '.watch-medium #player-api { z-index: auto; }' + 
    '.watch-medium #player-api > * { width: 100% !important; ' + 
    '   height: 100% !important; position: fixed; z-index: 9999999; top: 0px;' + 
    '   left: 0px; }' + 
    '#player-api { width: 980px; height: 580px; }' + 
    '#watch7-playlist-tray-container { height: 550px; transition: none }' +
    '#watch7-playlist-tray { border-bottom: 0px; overflow: auto; }' +
    '#watch7-playlist-data.watch7-playlist { width: 980px; }' + 
    '#watch7-playlist-tray .video-list-item { padding-right: 0px !important }' + 
    '#watch7-playlist-tray .video-list-item .title { padding-right: 13px; }' + 
    '#watch7-sidebar { margin-top: 13px !important; padding-top: 0px !important; }' + 
    '#watch7-video-container { background: none !important; }' +    
    '#player { background: none !important; }' +
    '#watch7-branded-banner { display: none; }' +
    '#watch7-sidebar { max-width: 300px; margin-left: 640px; }' +
    '#watch7-content { width: 640px; }' +
    '#page-container, #yt-masthead-container { padding-left: 0px !important; padding-right: 40px !important; }' + 
    '</style>'
  );
    
  var watch_container = $('#watch7-container');       
  watch_container.addClass('watch-playlist-collapsed');
    
//  var left_guide = $('#guide-main');       
//  left_guide.removeClass('collapsed').addClass('block'); 
//  var watch_context_menu = $('#watch-context-container');       
//  watch_context_menu.removeClass('collapsed hid').addClass('block'); 
//  $("div.guide-module-content").css("display","block");  
//  $("div.guide-module-content").css("height","608px");  

  var check_overflow = function() {  
    if (watch_container.hasClass('watch-medium')) {
      $(document.body).css('overflow', 'hidden');
    } else {
      $(document.body).css('overflow', '');
    }
  };
    
  var embed = $('#movie_player');
  var fvars = embed.attr("flashvars");
  embed.attr("flashvars", fvars + "&vq=hd720");
  embed.replaceWith(embed.clone());
    
// ------------------- Download Button --------------------------
    
  var FORMAT_LABEL={'18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)','46':'WebM 1080p (HD)'};
  var FORMAT_TYPE={'18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm'};
  var FORMAT_ORDER=['18','34','43','35','44','22','45','37','46','38'];
  var FORMAT_RULE={'flv':'none','mp4':'all','webm':'all'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
  var BUTTON_TEXT={'zh':'下载','cs':'Stáhnout','de':'Herunterladen','en':'Download','es':'Descargar','fr':'Télécharger','it':'Scarica','pl':'Pobierz','pt':'Baixar','ro':'Desc?rca?i','ru':'Скачать'};
  var BUTTON_TOOLTIP={'zh':'下载视频','cs':'Stáhnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este vídeo','fr':'Télécharger cette vidéo','it':'Scarica questo video','pl':'Pobierz plik wideo','pt':'Baixar este vídeo','ro':'Desc?rca?i acest videoclip','ru':'Скачать это видео'};
  var RANDOM=Math.floor(Math.random()*1234567890);
  var CONTAINER_ID='download-youtube-video'+RANDOM;
  var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;
  var BUTTON_ID='download-youtube-video-button'+RANDOM;
  var DEBUG_ID='download-youtube-video-debug-info';
   
  var videoID, videoTicket, videoFormats, isFeather=false;
  run();
  
function run() {

  var language=document.documentElement.getAttribute('lang');
  var textDirection='left';
  if (document.body.getAttribute('dir')=='rtl') {
    textDirection='right';
  }
  
  if (/^ar|bg|ca|cs|de|el|es|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lt|ml|ms|mr|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|uk|ur|vi|zh|zu$/.test(language)) { // fix international UI
    var likeButton=document.getElementById('watch-like');
    if (likeButton) {
      var spanElements=likeButton.getElementsByClassName('yt-uix-button-content');
      if (spanElements) {
        spanElements[0].style.display='none'; // hide like text
      }
    }
    var marginPixels=10;
    if (/^bg|el|es|eu|hr$/.test(language)) {
      marginPixels=3;
    } else if (language=='ml') {
      marginPixels=1;
    }        
    injectCSS('#watch7-secondary-actions .yt-uix-button{margin-'+textDirection+':'+marginPixels+'px!important}');
  }
        
  // obtain video ID, temporary ticket, formats map 

  isFeather=document.getElementById('p')!=null && document.getElementById('vo')!=null;
  
  var config=null, args;
  var usw=getUnsafeWindow();
  if (usw.yt && usw.yt.playerConfig) {
    config=usw.yt.playerConfig;
  }
  if (config && config.args) {
    args=config.args;
  } else if (isFeather && usw.rvl) {
    args=usw.rvl;
  }
  if (args) {
    videoID=args['video_id'];
    videoTicket=args['t'];
    videoFormats=args['url_encoded_fmt_stream_map'];
  }
  debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');
     
  if (videoID==null || videoTicket==null) { // Flash player
    var videoPlayer=document.getElementById('watch7-player'); 
    if (videoPlayer==null && isFeather) {
        videoPlayer=document.getElementById('p');
    }
    if (videoPlayer) {
      var flashValues=videoPlayer.innerHTML;
      var videoIDMatches=flashValues.match(/(?:"|\&amp;)video_id=([^(\&|$)]+)/);
      videoID=(videoIDMatches)?videoIDMatches[1]:null;
      var videoTicketMatches=flashValues.match(/(?:"|\&amp;)t=([^(\&|$)]+)/);
      videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
      var videoFormatsMatches=flashValues.match(/(?:"|\&amp;)url_encoded_fmt_stream_map=([^(\&|$)]+)/);
      videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null;
      debug('DYVAM - Info: Flash mode. videoID '+(videoID?videoID:'none')+'; ');
    }   
  }
     
  if (videoID==null || videoTicket==null) { // everything else 
    var bodyContent=document.body.innerHTML;  
    var videoIDMatches=bodyContent.match(/\"video_id\":\s*\"([^\"]+)\"/);
    videoID=(videoIDMatches)?videoIDMatches[1]:null;
    var videoTicketMatches=bodyContent.match(/\"t\":\s*\"([^\"]+)\"/);
    videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
    var videoFormatsMatches=bodyContent.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
    videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null; 
    debug('DYVAM - Info: Brute mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  
  debug('DYVAM - Info: url '+window.location.href+'; useragent '+window.navigator.userAgent+'; feather '+isFeather);  
  
  if (videoID==null || videoTicket==null || videoFormats==null || videoID.length==0 || videoTicket.length==0 || videoFormats.length==0) {
   debug('DYVAM - Error: No config information found. YouTube must have changed the code.');
   return;
  }
  
   // video title
  var videoTitle=document.title || 'video';
  if (isFeather) {
    videoTitle=videoTitle.replace(/^YouTube\s*\-\s*/i,'');
  } else {
    videoTitle=videoTitle.replace(/\s*\-\s*YouTube$/i,'');
  }
  videoTitle=videoTitle.replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g,'').replace(/\.+$/g,''); 
                        
  // parse the formats map
  var sep1='%2C', sep2='%26', sep3='%3D';
  if (videoFormats.indexOf(',')>-1) { 
    sep1=','; 
    sep2=(videoFormats.indexOf('&')>-1)?'&':'\\u0026'; 
    sep3='=';
  }  
  
  var videoURL=new Array();
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++) {
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    var videoFormatsPair=new Array();
    for (var j=0;j<videoFormatsElem.length;j++) {
      var pair=videoFormatsElem[j].split(sep3);
      if (pair.length==2) {
        videoFormatsPair[pair[0]]=pair[1];
      }
    }
    if (videoFormatsPair['url']==null) continue;
    url=unescape(unescape(videoFormatsPair['url'])).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
    if (videoFormatsPair['itag']==null) continue;
    itag=videoFormatsPair['itag'];
    if (videoFormatsPair['sig']) {
      url=url+'&signature='+videoFormatsPair['sig'];
    } else if (videoFormatsPair['s']) {
      var sig=videoFormatsPair['s'];
      if (sig.length==87) {
        sig=sig.substr(17,1)+sig.substr(7,10)+sig.substr(6,1)+sig.substr(18,9)+
        sig.substr(0,1)+sig.substr(28,17)+sig.substr(52,1)+sig.substr(46,1)+
        sig.substr(47,5)+sig.substr(2,1)+sig.substr(53,17)+sig.substr(5,1)+sig.substr(71,16);
        url=url+'&signature='+sig;
      } else if (sig.length==86) {
        var sigA=sig.substr(44,40).split('').reverse().join('');
        var sigB=sig.substr(3,40).split('').reverse().join('');
        sig=sigA.substr(34,1)+sigA.substr(1,19)+sigB.substr(39,1)+sigA.substr(21,8)+
        sigA.substr(0,1)+sigA.substr(30,4)+sigA.substr(29,1)+sigA.substr(35,5)+
        sig.substr(43,1)+sigB.substr(0,39)+sigA.substr(20,1);
        url=url+'&signature='+sig;
      } else if (sig.length==83) {
        var sigA=sig.substr(41,40).split('').reverse().join('');
        var sigB=sig.substr(0,40).split('').reverse().join('');
        sig=sigA+sig.substr(40,1)+sigB.substr(0,6)+sig.substr(82,1)+sigB.substr(7,33);
        url=url+'&signature='+sig;        
      } else if (sig.length==82) {
        var sigA=sig.substr(42,38).split('').reverse().join('');
        var sigB=sig.substr(3,38).split('').reverse().join('');
        sig=sigA.substr(34,1)+sigA.substr(1,15)+sigB.substr(37,1)+sigA.substr(17,12)+
        sigA.substr(0,1)+sigA.substr(30,4)+sigA.substr(29,1)+sigA.substr(35,3)+
        sig.substr(41,1)+sigB.substr(0,37)+sigA.substr(16,1);
        url=url+'&signature='+sig;
      }
    }
    if (url.toLowerCase().indexOf('http')==0) { // validate URL
      videoURL[itag]=url+'&title='+videoTitle;      
    }
  }
  
  var showFormat=new Array();
  for (var category in FORMAT_RULE) {
    var rule=FORMAT_RULE[category];
    for (var index in FORMAT_TYPE){
      if (FORMAT_TYPE[index]==category) {
        showFormat[index]=(rule=='all');
      }
    }
    if (rule=='max') {
      for (var i=FORMAT_ORDER.length-1;i>=0;i--) {
        var format=FORMAT_ORDER[i];
        if (FORMAT_TYPE[format]==category && videoURL[format]!=undefined) {
          showFormat[format]=true;
          break;
        }
      }
    }
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_ORDER.length;i++) {
    var format=FORMAT_ORDER[i];
    if (videoURL[format]!=undefined && FORMAT_LABEL[format]!=undefined && showFormat[format]) {
      downloadCodeList.push({url:videoURL[format],format:format,label:FORMAT_LABEL[format]});
      debug('DYVAM - Info: itag'+format+' url:'+videoURL[format]);
    }
  }
  if (downloadCodeList.length==0) {
    debug('DYVAM - Error: No download URL found. Probably YouTube uses encrypted streams.');
    return; // no format
  } 
  
  // find parent container
  var parentElement=document.getElementById('watch7-action-buttons');
  if (parentElement==null && isFeather) {  
      parentElement=document.getElementById('vo');
  }
  if (parentElement==null) {
    debug('DYVAM - No container for adding the download button. YouTube must have changed the code.');
    return;
  }
  
  // get button labels
  var buttonText=(BUTTON_TEXT[language])?BUTTON_TEXT[language]:BUTTON_TEXT['en'];
  var buttonLabel=(BUTTON_TOOLTIP[language])?BUTTON_TOOLTIP[language]:BUTTON_TOOLTIP['en'];
    
  if (isFeather) {
      var button=document.createElement('button');
      button.setAttribute('id', BUTTON_ID);
      button.setAttribute('class', 'b');
      button.setAttribute('style', 'margin-'+textDirection+':10px;padding:4px 6px;');
      button.setAttribute('loop', '0');
      var span=document.createElement('span');
      button.appendChild(span);
      button.appendChild(document.createTextNode(buttonText));
      var flag=document.getElementById('fl');
      if (flag) {
      	parentElement.insertBefore(button, flag);
      } else {
        parentElement.appendChild(button);
      }
      var downloadButton=document.getElementById(BUTTON_ID);
      addEvent(downloadButton, 'click', downloadVideo);
      return;
  }
 
  // generate download code
  var mainSpan=document.createElement('span');
  var spanButton=document.createElement('span');
  spanButton.setAttribute('class', 'yt-uix-button-content');
  spanButton.appendChild(document.createTextNode(buttonText+' '));
  mainSpan.appendChild(spanButton);
  var imgButton=document.createElement('img');
  imgButton.setAttribute('class', 'yt-uix-button-arrow');
  imgButton.setAttribute('src', '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
  mainSpan.appendChild(imgButton);
  var listItems=document.createElement('ol');
  listItems.setAttribute('style', 'display:none;');
  listItems.setAttribute('class', 'yt-uix-button-menu');
  for (var i=0;i<downloadCodeList.length;i++) {
    var listItem=document.createElement('li');
    var listLink=document.createElement('a');
    listLink.setAttribute('style', 'text-decoration:none;');
    listLink.setAttribute('href', downloadCodeList[i].url);
    var listSpan=document.createElement('span');
    listSpan.setAttribute('class', 'yt-uix-button-menu-item');
    listSpan.setAttribute('loop', i+'');
    listSpan.setAttribute('id', LISTITEM_ID+downloadCodeList[i].format);
    listSpan.appendChild(document.createTextNode(downloadCodeList[i].label));
    listLink.appendChild(listSpan);
    listItem.appendChild(listLink);
    listItems.appendChild(listItem);    
  }
  mainSpan.appendChild(listItems);
  var buttonElement=document.createElement('button');
  buttonElement.setAttribute('id', BUTTON_ID);
  buttonElement.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text');
  buttonElement.setAttribute('style', 'margin-top:4px; margin-left:'+((textDirection=='left')?5:10)+'px;');
  buttonElement.setAttribute('data-tooltip-text', buttonLabel);
  addEvent(buttonElement, 'click', function(){return false;});
  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('role', 'button');
  buttonElement.appendChild(mainSpan);
                                            
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.setAttribute('id', CONTAINER_ID);      
  containerSpan.appendChild(document.createTextNode(' '));
  containerSpan.appendChild(buttonElement);
  parentElement.appendChild(containerSpan);
    
  for (var i=0;i<downloadCodeList.length;i++) {
    var downloadFMT=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);
    addEvent(downloadFMT, 'click', downloadVideo);
  }
  
  function downloadVideo(e) {
    var e=e||window.event; // window.event for IE<9
    var elem=e.target||e.srcElement; // e.srcElement for IE<9
    e.returnValue=false;    
    if (e.preventDefault) {
      e.preventDefault();
    }
    window.location.href=downloadCodeList[elem.getAttribute('loop')].url;
    return false;
  }
  
  function injectCSS(code) {
    var style=document.createElement('style');
    style.type='text/css';
    style.appendChild(document.createTextNode(code));
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  function addEvent(elem, eventName, eventFunction) {
    if (elem.addEventListener) { 
      elem.addEventListener(eventName, eventFunction, false);
    } else if (elem.attachEvent) { // IE<9
      elem.attachEvent('on'+eventName, eventFunction);
    }
  }
  
  function getUnsafeWindow() {
    var usw=(typeof(this.unsafeWindow)=='undefined')?window:this.unsafeWindow; // Opera, Firefox, TamperMonkey
    if (typeof(unsafeWindow)!='undefined' && unsafeWindow===window) { // built-in Chrome
      var divElem = document.createElement('div');
      divElem.setAttribute('onclick', 'return window;');
      usw=divElem.onclick(); // from https://github.com/greasemonkey/greasemonkey/issues/1614
    }
    return usw; 
  }
  
  function debug(str) {
    var debugElem=document.getElementById(DEBUG_ID);
    if (debugElem==null) {
      debugElem=document.createElement('div');
      debugElem.setAttribute('id', DEBUG_ID);
      debugElem.setAttribute('style', 'display:none;');
      document.body.appendChild(debugElem);
    }
    debugElem.appendChild(document.createTextNode(str+' '));
  }
      
  }
  
})();

// ------------------- remove feedback button --------------------------

  $('#yt-hitchhiker-feedback').remove();

// ------------------- Skip AD --------------------------

  var patt = /&(ad_|infringe|watermark)[^=]*=[^&]*/g;
  flashvars = flashvars.replace(patt,"");
  setFlashvar("invideo","false");