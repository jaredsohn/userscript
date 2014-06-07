// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds a button that lets you download YouTube videos.
// @namespace http://googlesystem.blogspot.com
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @homepageURL http://userscripts.org/scripts/show/25105
// @updateURL https://userscripts.org/scripts/source/25105.meta.js
// @author Gantt
// @version 1.5.15
// @date 2013-06-14
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
  var FORMAT_LABEL={'18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)','46':'WebM 1080p (HD)'};
  var FORMAT_TYPE={'18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm'};
  var FORMAT_ORDER=['18','34','43','35','44','22','45','37','46','38'];
  var FORMAT_RULE={'flv':'max','mp4':'all','webm':'none'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
 var BUTTON_TEXT={'ar':'?????','cs':'St�hnout','de':'Herunterladen','en':'Save','es':'Descargar','fr':'T�l�charger','it':'Scarica','ja':'??????','pl':'Pobierz','pt':'Baixar','ro':'Descarca?i','ru':'???????','zh':'??'};
  var BUTTON_TOOLTIP={'ar':'????? ??? ???????','cs':'St�hnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este v�deo','fr':'T�l�charger cette vid�o','it':'Scarica questo video','ja':'??????????????','pl':'Pobierz plik wideo','pt':'Baixar este v�deo','ro':'Descarca?i acest videoclip','ru':'??????? ??? ?????','zh':'?????'};
  var RANDOM=Math.floor(Math.random()*1234567890);
  var CONTAINER_ID='download-youtube-video'+RANDOM;
  var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;
  var BUTTON_ID='download-youtube-video-button'+RANDOM;
  var DEBUG_ID='download-youtube-video-debug-info';
   
  var videoID, videoTicket, videoFormats, isFeather=false;
  run();
  
function run() {

  isFeather=document.getElementById('p')!=null && document.getElementById('vo')!=null;

  var language=document.documentElement.getAttribute('lang');
  var footer=document.getElementById('footer-links');
  if (footer==null && isFeather) {
    footer=document.getElementById('ft');
  }
  if (language=='' && footer && /\/ja\/|\.co\.jp/.test(footer.innerHTML)) {
    language='ja'; // fix YouTube bug
  }
  var textDirection='left';
  if (document.body.getAttribute('dir')=='rtl') {
    textDirection='right';
  }
  
  if (/^ar|bg|ca|cs|de|el|es|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lt|ml|ms|mr|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|uk|ur|vi|zu$/.test(language)) { // fix international UI
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
  
  var config=null, args;
  var usw=getUnsafeWindow();
  if (usw.ytplayer && usw.ytplayer.config) {
    config=usw.ytplayer.config;
  }
  if (config && config.args) {
    args=config.args;
  }
  if (args) {
    videoID=args['video_id'];
    videoTicket=args['t'];
    videoFormats=args['url_encoded_fmt_stream_map'];
  }
  debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');
        
  if (videoID==null || videoTicket==null) { // Feather Flash
    var videoPlayer=null;
    if (isFeather) {
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
      debug('DYVAM - Info: Feather Flash mode. videoID '+(videoID?videoID:'none')+'; ');
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
        var sigA=sig.substr(44,40).split('').reverse().join('');
        var sigB=sig.substr(3,40).split('').reverse().join('');
        sig=sigA.substr(21,1)+sigA.substr(1,20)+sigA.substr(0,1)+sigA.substr(22,9)+
        sig.substr(0,1)+sigA.substr(32,8)+sig.substr(43,1)+sigB;
        url=url+'&signature='+sig;
      } else if (sig.length==86) {
        sig=sig.substr(2,15)+sig.substr(0,1)+sig.substr(18,23)+sig.substr(79,1)+
        sig.substr(42,1)+sig.substr(43,36)+sig.substr(82,1)+sig.substr(80,2)+sig.substr(41,1);
        url=url+'&signature='+sig;
      } else if (sig.length==85) {
        var sigA=sig.substr(44,40).split('').reverse().join('');
        var sigB=sig.substr(3,40).split('').reverse().join('');
        sig=sigA.substr(7,1)+sigA.substr(1,6)+sigA.substr(0,1)+sigA.substr(8,15)+sig.substr(0,1)+
        sigA.substr(24,9)+sig.substr(1,1)+sigA.substr(34,6)+sig.substr(43,1)+sigB;
        url=url+'&signature='+sig;                         
      } else if (sig.length==84) {
        var sigA=sig.substr(44,40).split('').reverse().join('');
        var sigB=sig.substr(3,40).split('').reverse().join('');
        sig=sigA+sig.substr(43,1)+sigB.substr(0,6)+sig.substr(2,1)+sigB.substr(7,9)+
        sigB.substr(39,1)+sigB.substr(17,22)+sigB.substr(16,1);
        url=url+'&signature='+sig;                         
      } else if (sig.length==83) {
        var sigA=sig.substr(43,40).split('').reverse().join('');
        var sigB=sig.substr(2,40).split('').reverse().join('');
        sig=sigA.substr(30,1)+sigA.substr(1,26)+sigB.substr(39,1)+
        sigA.substr(28,2)+sigA.substr(0,1)+sigA.substr(31,9)+sig.substr(42,1)+
        sigB.substr(0,5)+sigA.substr(27,1)+sigB.substr(6,33)+sigB.substr(5,1);
        url=url+'&signature='+sig;        
      } else if (sig.length==82) {
        var sigA=sig.substr(34,48).split('').reverse().join('');
        var sigB=sig.substr(0,33).split('').reverse().join('');
        sig=sigA.substr(45,1)+sigA.substr(2,12)+sigA.substr(0,1)+sigA.substr(15,26)+
        sig.substr(33,1)+sigA.substr(42,1)+sigA.substr(43,1)+sigA.substr(44,1)+
        sigA.substr(41,1)+sigA.substr(46,1)+sigB.substr(32,1)+sigA.substr(14,1)+
        sigB.substr(0,32)+sigA.substr(47,1);
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