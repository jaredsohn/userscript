// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds a button that lets you download YouTube videos.
// @homepageURL http://userscripts.org/scripts/show/25105
// @updateURL https://userscripts.org/scripts/source/25105.meta.js
// @author Gantt
// @version 1.7.18
// @date 2014-01-14
// @namespace http://googlesystem.blogspot.com
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-end
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
  var FORMAT_LABEL={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p','38':'MP4 2160p','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p','46':'WebM 1080p','135':'MP4 480p - no audio','137':'MP4 1080p - no audio','138':'MP4 2160p - no audio','139':'M4A 48kbps - audio','140':'M4A 128kbps - audio','141':'M4A 256kbps - audio','264':'MP4 1440p - no audio'};
  var FORMAT_TYPE={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm','135':'mp4','137':'mp4','138':'mp4','139':'m4a','140':'m4a','141':'m4a','264':'mp4'};
  var FORMAT_ORDER=['5','18','34','43','35','135','44','22','45','37','46','264','38','139','140','141'];
  var FORMAT_RULE={'flv':'max','mp4':'all','webm':'none','m4a':'max'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
  var SHOW_DASH_FORMATS=false;
  var BUTTON_TEXT={'ar':'تنزيل','cs':'Stáhnout','de':'Herunterladen','en':'Download','es':'Descargar','fr':'Télécharger','hi':'डाउनलोड','id':'Unduh','it':'Scarica','ja':'ダウンロード','ko':'내려받기','pl':'Pobierz','pt':'Baixar','ro':'Descărcați','ru':'Скачать','tr':'İndir','zh':'下载'};
  var BUTTON_TOOLTIP={'ar':'تنزيل هذا الفيديو','cs':'Stáhnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este vídeo','fr':'Télécharger cette vidéo','hi':'वीडियो डाउनलोड करें','id':'Unduh video ini','it':'Scarica questo video','ja':'このビデオをダウンロードする','ko':'이 비디오를 내려받기','pl':'Pobierz plik wideo','pt':'Baixar este vídeo','ro':'Descărcați acest videoclip','ru':'Скачать это видео','tr': 'Bu videoyu indir','zh':'下载此视频'};
  var DECODE_RULE={};
  var RANDOM=7489235179; // Math.floor(Math.random()*1234567890);
  var CONTAINER_ID='download-youtube-video'+RANDOM;
  var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;
  var BUTTON_ID='download-youtube-video-button'+RANDOM;
  var DEBUG_ID='download-youtube-video-debug-info';
  var STORAGE_URL='download-youtube-script-url';
  var STORAGE_CODE='download-youtube-signature-code';
  var STORAGE_DASH='download-youtube-dash-enabled';
  var isDecodeRuleUpdated=false;  
    
  start();
          
function start() {
  var pagecontainer=document.getElementById('page-container');
  if (!pagecontainer) return;
  if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();     
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI
      var mo=window.MutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].id=='watch7-container') { // old value: movie_player
                      run();
                      break;
                    }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
      } else { // MutationObserver fallback for old browsers
        pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
      }
  } 
}

function onNodeInserted(e) { 
    if (e && e.target && e.target.id=='watch7-container') { // old value: movie_player
      run();
  }
}
  
function run() {
  if (document.getElementById(CONTAINER_ID)) return; // check download container
  if (document.getElementById('p') && document.getElementById('vo')) return; // Feather not supported

  var videoID, videoFormats, videoAdaptFormats, videoManifestURL, scriptURL=null;
  var isSignatureUpdatingStarted=false;
  var operaTable=new Array();
  var language=document.documentElement.getAttribute('lang');
  var textDirection='left';
  if (document.body.getAttribute('dir')=='rtl') {
    textDirection='right';
  }
  fixTranslations(language, textDirection);
        
  // obtain video ID, formats map   
  
  var args=null;
  var usw=(typeof this.unsafeWindow !== 'undefined')?this.unsafeWindow:window; // Firefox, Opera<15
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.args) {
    args=usw.ytplayer.config.args;
  }
  if (args) {
    videoID=args['video_id'];
    videoFormats=args['url_encoded_fmt_stream_map'];
    videoAdaptFormats=args['adaptive_fmts'];
    videoManifestURL=args['dashmpd'];
    debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.assets) {
    scriptURL=usw.ytplayer.config.assets.js;
  }  
  
  if (videoID==null) { // unsafeWindow workaround (Chrome, Opera 15+)
    var buffer=document.getElementById(DEBUG_ID+'2')
    if (buffer) {
      while (buffer.firstChild) {
        buffer.removeChild(buffer.firstChild);
      }
    } else {
      buffer=createHiddenElem('pre', DEBUG_ID+'2');
    }    
    injectScript ('document.getElementById("'+DEBUG_ID+'2").appendChild(document.createTextNode(\'"video_id":"\'+ytplayer.config.args.video_id+\'", "js":"\'+ytplayer.config.assets.js+\'", "dashmpd":"\'+ytplayer.config.args.dashmpd+\'", "url_encoded_fmt_stream_map":"\'+ytplayer.config.args.url_encoded_fmt_stream_map+\'", "adaptive_fmts":"\'+ytplayer.config.args.adaptive_fmts+\'"\'));');
    var code=buffer.innerHTML;
    if (code) {
      videoID=findMatch(code, /\"video_id\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(code, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoFormats=videoFormats.replace(/&amp;/g,'\\u0026');
      videoAdaptFormats=findMatch(code, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=videoAdaptFormats.replace(/&amp;/g,'\\u0026');
      videoManifestURL=findMatch(code, /\"dashmpd\":\s*\"([^\"]+)\"/);
      scriptURL=findMatch(code, /\"js\":\s*\"([^\"]+)\"/);
    }
    debug('DYVAM - Info: Injection mode. videoID '+(videoID?videoID:'none')+'; ');
  }
     
  if (videoID==null) { // if all else fails
    var bodyContent=document.body.innerHTML;  
    if (bodyContent!=null) {
      videoID=findMatch(bodyContent, /\"video_id\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(bodyContent, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=findMatch(bodyContent, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      videoManifestURL=findMatch(bodyContent, /\"dashmpd\":\s*\"([^\"]+)\"/);
      if (scriptURL==null) {
        scriptURL=findMatch(bodyContent, /\"js\":\s*\"([^\"]+)\"/);
        scriptURL=scriptURL.replace(/\\/g,'');
      }      
    }
    debug('DYVAM - Info: Brute mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  
  debug('DYVAM - Info: url '+window.location.href+'; useragent '+window.navigator.userAgent);  
  
  if (videoID==null || videoFormats==null || videoID.length==0 || videoFormats.length==0) {
   debug('DYVAM - Error: No config information found. YouTube must have changed the code.');
   return;
  }
  
  // Opera 12 extension message handler
  if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined') {
    opera.extension.onmessage = function(event) {
      var index=findMatch(event.data.action, /xhr\-([0-9]+)\-response/);
      if (index && operaTable[parseInt(index,10)]) {
        index=parseInt(index,10);
        var trigger=(operaTable[index])['onload'];
        if (typeof trigger === 'function' && event.data.readyState == 4) {
          if (trigger) {
              trigger(event.data);         
          }
        }
      }
    }
  }
    
  if (!isDecodeRuleUpdated) {
    DECODE_RULE=getDecodeRules(DECODE_RULE);
    isDecodeRuleUpdated=true;
  }
  if (scriptURL) {
    if (scriptURL.indexOf('//')==0) {
      var protocol=(document.location.protocol=='http:')?'http:':'https:';
      scriptURL=protocol+scriptURL;
    }
    fetchSignatureScript(scriptURL);
  }
  
   // video title
  var videoTitle=document.title || 'video';
  videoTitle=videoTitle.replace(/\s*\-\s*YouTube$/i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g,'').replace(/\.+$/g,'');  
                        
  // parse the formats map
  var sep1='%2C', sep2='%26', sep3='%3D';
  if (videoFormats.indexOf(',')>-1) { 
    sep1=','; 
    sep2=(videoFormats.indexOf('&')>-1)?'&':'\\u0026'; 
    sep3='=';
  }
  var videoURL=new Array();
  var videoSignature=new Array();
  if (videoAdaptFormats) {
    videoFormats=videoFormats+sep1+videoAdaptFormats;
  }
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
    var url=unescape(unescape(videoFormatsPair['url'])).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
    if (videoFormatsPair['itag']==null) continue;
    var itag=videoFormatsPair['itag'];
    var sig=videoFormatsPair['sig']||videoFormatsPair['signature'];
    if (sig) {
      url=url+'&signature='+sig;
      videoSignature[itag]=null;
    } else if (videoFormatsPair['s']) {
      url=url+'&signature='+decryptSignature(videoFormatsPair['s']);
      videoSignature[itag]=videoFormatsPair['s'];
    }
    if (url.toLowerCase().indexOf('ratebypass')==-1) { // speed up download for dash
      url=url+'&ratebypass=yes';
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
  
  var dashPref=getPref(STORAGE_DASH);
  if (dashPref=='1') {
    SHOW_DASH_FORMATS=true;
  } else if (dashPref!='0') {
    setPref(STORAGE_DASH,'0');
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_ORDER.length;i++) {
    var format=FORMAT_ORDER[i];
    if (format=='37' && videoURL[format]==undefined) { // hack for dash 1080p
      if (videoURL['137']) {
       format='137';
      }
      showFormat[format]=showFormat['37'];
    } else if (format=='38' && videoURL[format]==undefined) { // hack for dash 4K
      if (videoURL['138']) {
       format='138';
      }
      showFormat[format]=showFormat['38'];
    }    
    if (!SHOW_DASH_FORMATS && format.length>2) continue;
    if (videoURL[format]!=undefined && FORMAT_LABEL[format]!=undefined && showFormat[format]) {
      downloadCodeList.push({url:videoURL[format],sig:videoSignature[format],format:format,label:FORMAT_LABEL[format]});
      debug('DYVAM - Info: itag'+format+' url:'+videoURL[format]);
    }
  }  
  
  if (downloadCodeList.length==0) {
    debug('DYVAM - Error: No download URL found. Probably YouTube uses encrypted streams.');
    return; // no format
  } 
  
  // find parent container
  var parentElement=document.getElementById('watch7-action-buttons');
  if (parentElement==null) {
    debug('DYVAM - No container for adding the download button. YouTube must have changed the code.');
    return;
  }
  
  // get button labels
  var buttonText=(BUTTON_TEXT[language])?BUTTON_TEXT[language]:BUTTON_TEXT['en'];
  var buttonLabel=(BUTTON_TOOLTIP[language])?BUTTON_TOOLTIP[language]:BUTTON_TOOLTIP['en'];
    
  // generate download code for regular interface
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
    listLink.setAttribute('download', videoTitle+'.'+FORMAT_TYPE[downloadCodeList[i].format]);
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
  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('role', 'button');
  buttonElement.addEventListener('click', function(){return false;}, false);  
  buttonElement.appendChild(mainSpan);
                                            
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.setAttribute('id', CONTAINER_ID);      
  containerSpan.appendChild(document.createTextNode(' '));
  containerSpan.appendChild(buttonElement);
  parentElement.appendChild(containerSpan);
  
  if (!isSignatureUpdatingStarted) {
    for (var i=0;i<downloadCodeList.length;i++) {    
      addFileSize(downloadCodeList[i].url, downloadCodeList[i].format);
    }
  } 
  
  if (typeof GM_download !== 'undefined') {
    for (var i=0;i<downloadCodeList.length;i++) {
      var downloadFMT=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);
      var url=(downloadCodeList[i].url).toLowerCase();
      if (url.indexOf('clen=')>0 && url.indexOf('dur=')>0 && url.indexOf('gir=')>0
          && url.indexOf('lmt=')>0) {
        downloadFMT.addEventListener('click', downloadVideoNatively, false);
      }
    }
  }
  
  addFromManifest('140', '141'); // replace fmt140 with fmt141 if found in manifest
  
  function downloadVideoNatively(e) {
    var elem=e.currentTarget;
    e.returnValue=false;    
    if (e.preventDefault) {
      e.preventDefault();
    }
    var loop=elem.getAttribute('loop');
    if (loop) {
      GM_download(downloadCodeList[loop].url, videoTitle+'.'+FORMAT_TYPE[downloadCodeList[loop].format]);
    }
    return false;
  }
  
  function addFromManifest(oldFormat, newFormat) { // find newFormat URL in manifest
    if (videoManifestURL && videoURL[newFormat]==undefined && SHOW_DASH_FORMATS && FORMAT_RULE['m4a']=='max') {
      var matchSig=findMatch(videoManifestURL, /\/s\/([a-zA-Z0-9\.]+)\//i);
      if (matchSig) {
        var decryptedSig=decryptSignature(matchSig);
        if (decryptedSig) {
          videoManifestURL=videoManifestURL.replace('/s/'+matchSig+'/','/signature/'+decryptedSig+'/');
        }
      }
      if (videoManifestURL.indexOf('//')==0) {
        var protocol=(document.location.protocol=='http:')?'http:':'https:';
        videoManifestURL=protocol+videoManifestURL;
      }
      crossXmlHttpRequest({
          method:'GET',
          url:videoManifestURL, // check if URL exists
          onload:function(response) {
            if (response.readyState === 4 && response.status === 200 && response.responseText) {
              var regexp = new RegExp('<BaseURL.+>(http[^<]+itag='+newFormat+'[^<]+)<\\/BaseURL>','i');
              var matchURL=findMatch(response.responseText, regexp);
              if (!matchURL) return;
              matchURL=matchURL.replace(/&amp\;/g,'&');
              for (var i=0;i<downloadCodeList.length;i++) {
                if (downloadCodeList[i].format==oldFormat) {
                  downloadCodeList[i].format==newFormat;
                  var downloadFMT=document.getElementById(LISTITEM_ID+oldFormat);
                  downloadFMT.setAttribute('id', LISTITEM_ID+newFormat);
                  downloadFMT.parentNode.setAttribute('href', matchURL);
                  downloadCodeList[i].url=matchURL;
                  downloadFMT.firstChild.nodeValue=FORMAT_LABEL[newFormat];
                  addFileSize(matchURL, newFormat);
                }
              }
            }
          } 
        });
    }  
  }
    
  function injectStyle(code) {
    var style=document.createElement('style');
    style.type='text/css';
    style.appendChild(document.createTextNode(code));
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  function injectScript(code) {
    var script=document.createElement('script');
    script.type='application/javascript';
    script.textContent=code;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }    
  
  function debug(str) {
    var debugElem=document.getElementById(DEBUG_ID);
    if (!debugElem) {
      debugElem=createHiddenElem('div', DEBUG_ID);
    }
    debugElem.appendChild(document.createTextNode(str+' '));
  }
  
  function createHiddenElem(tag, id) {
    var elem=document.createElement(tag);
    elem.setAttribute('id', id);
    elem.setAttribute('style', 'display:none;');
    document.body.appendChild(elem);
    return elem;
  }
  
  function fixTranslations(language, textDirection) {  
    if (/^af|bg|bn|ca|cs|de|el|es|et|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lv|lt|ml|mr|ms|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|th|uk|ur|vi|zu$/.test(language)) { // fix international UI
      var likeButton=document.getElementById('watch-like');
      if (likeButton) {
        var spanElements=likeButton.getElementsByClassName('yt-uix-button-content');
        if (spanElements) {
          spanElements[0].style.display='none'; // hide like text
        }
      }
      var marginPixels=10;
      if (/^bg|ca|cs|el|es|eu|fr|hr|it|ml|ms|pl|ro|ru|sl|sw|te$/.test(language)) {
        marginPixels=1;
      }
      injectStyle('#watch7-secondary-actions .yt-uix-button{margin-'+textDirection+':'+marginPixels+'px!important}');
    }
  }
  
  function findMatch(text, regexp) {
    var matches=text.match(regexp);
    return (matches)?matches[1]:null;
  }
  
  function isString(s) {
    return (typeof s==='string' || s instanceof String);
  }
    
  function isInteger(n) {
    return (typeof n==='number' && n%1==0);
  }
  
  function getPref(name) { // cross-browser GM_getValue
    if (typeof GM_getValue === 'function' && 
    (typeof GM_getValue.toString === 'undefined' || GM_getValue.toString().indexOf('not supported') === -1)) {
      return GM_getValue(name, null); // Greasemonkey, Tampermonkey, Firefox extension
    } else {
        var ls=null;
        try {ls=window.localStorage||null} catch(e){}
        if (ls) {
          return ls.getItem(name); // Chrome script, Opera extensions
        }
    }
    return;
  }
  
  function setPref(name, value) { //  cross-browser GM_setValue
    if (typeof GM_setValue === 'function' && 
    (typeof GM_setValue.toString === 'undefined' || GM_setValue.toString().indexOf('not supported') === -1)) {
      GM_setValue(name, value); // Greasemonkey, Tampermonkey, Firefox extension
    } else {
        var ls=null;
        try {ls=window.localStorage||null} catch(e){}
        if (ls) {
          return ls.setItem(name, value); // Chrome script, Opera extensions
        }
    }
  }
  
  function crossXmlHttpRequest(details) { // cross-browser GM_xmlhttpRequest
    if (typeof GM_xmlhttpRequest === 'function') { // Greasemonkey, Tampermonkey, Firefox extension, Chrome script
      GM_xmlhttpRequest(details);
    } else if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined' && 
               typeof opera.extension.postMessage !== 'undefined') { // Opera 12 extension
        var index=operaTable.length;
        opera.extension.postMessage({'action':'xhr-'+index, 'url':details.url, 'method':details.method});
        operaTable[index]=details;
    } else if (typeof window.opera === 'undefined' && typeof XMLHttpRequest === 'function') { // Opera 15+ extension
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (details['onload']) {
              details['onload'](xhr);
            }
          }
        }
        xhr.open(details.method, details.url, true);
        xhr.send();
    }
  }
   
  function addFileSize(url, format) {
  
    function updateVideoLabel(size, format) {
      var elem=document.getElementById(LISTITEM_ID+format);
      if (elem) {
        size=parseInt(size,10);
        if (size>=1073741824) {
          size=parseFloat((size/1073741824).toFixed(1))+' GB';
        } else if (size>=1048576) {
          size=parseFloat((size/1048576).toFixed(1))+' MB';
        } else {
          size=parseFloat((size/1024).toFixed(1))+' KB';
        }
        if (elem.childNodes.length>1) {
            elem.lastChild.nodeValue=' ('+size+')';
        } else if (elem.childNodes.length==1) {
            elem.appendChild(document.createTextNode(' ('+size+')'));
        }
      }
    }
        
    var matchSize=findMatch(url, /[&\?]clen=([0-9]+)&/i);
    if (matchSize) {
      updateVideoLabel(matchSize, format);
    } else {
      try {
        crossXmlHttpRequest({
          method:'HEAD',
          url:url,
          onload:function(response) {
            if (response.readyState == 4 && response.status == 200) { // add size
              var size=0;
              if (typeof response.getResponseHeader === 'function') {
                size=response.getResponseHeader('Content-length');
              } else if (response.responseHeaders) {
                  var regexp = new RegExp('^Content\-length: (.*)$','im');
                  var match = regexp.exec(response.responseHeaders);
                  if (match) {
                    size=match[1];
                  }
              }
              if (size) {
                updateVideoLabel(size, format);
              }
            }
          }
        });
      } catch(e) { }
    }
  }
  
  function findSignatureCode(sourceCode) {
    var functionName=findMatch(sourceCode, /\.signature\s*=\s*(\w+)\(\w+\)/);
    if (functionName==null) return setPref(STORAGE_CODE, 'error');
    var regCode=new RegExp('function '+functionName+
    '\\s*\\(\\w+\\)\\s*{\\w+=\\w+\\.split\\(""\\);(.+);return \\w+\\.join');
    var functionCode=findMatch(sourceCode, regCode);
    if (functionCode==null) return setPref(STORAGE_CODE, 'error');
    var regSlice=new RegExp('slice\\s*\\(\\s*(.+)\\s*\\)');
    var regSwap=new RegExp('\\w+\\s*\\(\\s*\\w+\\s*,\\s*([0-9]+)\\s*\\)');
    var regInline=new RegExp('\\w+\\[0\\]\\s*=\\s*\\w+\\[([0-9]+)\\s*%\\s*\\w+\\.length\\]');    
    var functionCodePieces=functionCode.split(';');
    var decodeArray=[], signatureLength=81;
    for (var i=0; i<functionCodePieces.length; i++) {
      functionCodePieces[i]=functionCodePieces[i].trim();
      if (functionCodePieces[i].length==0) {
      } else if (functionCodePieces[i].indexOf('slice') >= 0) { // slice
        var slice=findMatch(functionCodePieces[i], regSlice);
        slice=parseInt(slice, 10);
        if (isInteger(slice)){ 
          decodeArray.push(-slice);
          signatureLength+=slice;
        } else return setPref(STORAGE_CODE, 'error');
      } else if (functionCodePieces[i].indexOf('reverse') >= 0) {
        decodeArray.push(0);
      } else if (functionCodePieces[i].indexOf('[0]') >= 0) {
          if (i+2<functionCodePieces.length &&
          functionCodePieces[i+1].indexOf('.length') >= 0 &&
          functionCodePieces[i+1].indexOf('[0]') >= 0) {
            var inline=findMatch(functionCodePieces[i+1], regInline);
            inline=parseInt(inline, 10);
            decodeArray.push(inline);
            i+=2;
          } else return setPref(STORAGE_CODE, 'error');
      } else if (functionCodePieces[i].indexOf(',') >= 0) {
        var swap=findMatch(functionCodePieces[i], regSwap);      
        swap=parseInt(swap, 10);
        if (isInteger(swap)){
          decodeArray.push(swap);
        } else return setPref(STORAGE_CODE, 'error');
      } else return setPref(STORAGE_CODE, 'error');
    }
    
    if (decodeArray) {
      setPref(STORAGE_URL, scriptURL);
      setPref(STORAGE_CODE, decodeArray.toString());
      DECODE_RULE[signatureLength]=decodeArray;
      // update download links and add file sizes
      for (var i=0;i<downloadCodeList.length;i++) {        
        var elem=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);
        var url=downloadCodeList[i].url;
        var sig=downloadCodeList[i].sig;
        if (elem && url && sig) {
          url=url.replace(/\&signature=[\w\.]+/, '&signature='+decryptSignature(sig));
          elem.parentNode.setAttribute('href', url);
          addFileSize(url, downloadCodeList[i].format);
        }
      }
    }
  }
  
  function isValidSignatureCode(arr) { // valid values: '5,-3,0,2,5', 'error'
    if (!arr) return false;
    if (arr=='error') return true;
    arr=arr.split(',');
    for (var i=0;i<arr.length;i++) {
      if (!isInteger(parseInt(arr[i],10))) return false;
    }
    return true;
  }
  
  function fetchSignatureScript(scriptURL) {
    var storageURL=getPref(STORAGE_URL);
    var storageCode=getPref(STORAGE_CODE);
    if (storageCode && isValidSignatureCode(storageCode) && storageURL &&
        scriptURL.replace(/^https?/i,'')==storageURL.replace(/^https?/i,'')) return;
    try {
      isSignatureUpdatingStarted=true;    
      crossXmlHttpRequest({
        method:'GET',
        url:scriptURL,
        onload:function(response) {
          if (response.readyState === 4 && response.status === 200 && response.responseText) {
            findSignatureCode(response.responseText);
          }
        } 
      });
    } catch(e) { }
  }
  
  function getDecodeRules(rules) {
    var storageCode=getPref(STORAGE_CODE);    
    if (storageCode && storageCode!='error' && isValidSignatureCode(storageCode)) {
      var arr=storageCode.split(',');
      var signatureLength=81;
      for (var i=0; i<arr.length; i++) {
        arr[i]=parseInt(arr[i], 10);
        if (arr[i]<0) signatureLength-=arr[i];
      }
      rules[signatureLength]=arr;
    }
    return rules;
  }
  
  function decryptSignature(sig) {
    function swap(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c;return a};
    function decode(sig, arr) { // encoded decryption
      if (!isString(sig)) return null;
      var sigA=sig.split('');
      for (var i=0;i<arr.length;i++) {
        var act=arr[i];
        if (!isInteger(act)) return null;
        sigA=(act>0)?swap(sigA, act):((act==0)?sigA.reverse():sigA.slice(-act));
      }
      var result=sigA.join('');
      return (result.length==81)?result:sig;
    }
    
    if (sig==null) return '';    
    var arr=DECODE_RULE[sig.length];
    if (arr) {
      var sig2=decode(sig, arr);
      if (sig2 && sig2.length==81) return sig2;
    }
    return sig; 
  }  
      
  }
 
})();