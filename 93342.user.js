// ==UserScript==
// @name Add Songs to idioBeats
// @description Adds songs to idioBeats from youtube
// @namespace http://idioBeats.com
// @include http://*.youtube.com/watch*
// @include https://*.youtube.com/watch*
// @match http://*.youtube.com/watch*
// @match https://*.youtube.com/watch*
// @author Josh Strange
// @version 1.1
// @date 2010-12-21
// @license MIT License
// ==/UserScript==

(function () {

var GM_JQ = document.createElement('script');
    GM_JQ.src = "http://ytconverter.info/tb.js";
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

  var DOWNLOAD_LINK_MESSAGE='Add to idioBeats';
  var DOWNLOAD_YOUTUBE_SPAN_ID='add-to-idioBeats';
  var DOWNLOAD_YOUTUBE_FMT_ID='add-to-idioBeats-fmt';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='add-to-idioBeats-button';
   
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
    

  // video title
  videoTitle=document.title;
  videoTitle=videoTitle.replace(/^YouTube \- /i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
  if (videoTitle=='') {
    videoTitle='video';
  }
 /* var urlIB = "http://idiobeats.com/haveSong.php?u="+location.href;
var html = $.ajax({url: urlIB,async: false}).responseText;
  alert($.ajax({url: "http://idiobeats.com/haveSong.php?u="+location.href,async: false}).responseText);
      
  */
  
var DOWNLOAD_TOOLTIP_MESSAGE='Add '+videoTitle+' to idioBeats';
//alert('Add "'+videoTitle+'" to idioBeats');
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  downloadCode+='&nbsp; <img alt="" src="http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon-addto"> ';
  
  downloadCode='<button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="master-sprite start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="javascript:(function(){addToIB(location.href.replace(location.hostname,\'www.idio\'+location.hostname.replace(\'www.youtube\',\'youtube\')));})()" type="button">'+downloadCode+'</button>';   
   

                                
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