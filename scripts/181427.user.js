// ==UserScript==
// @name BestVideoDownloader 2
// @namespace https://www.facebook.com/bestvideodownloader2/
// @description Adds options to download YouTube videos in various formats
// @homepageURL http://bvd2.nl/
// @updateURL https://userscripts.org/scripts/source/181427.meta.js
// @author Best Video Downloader 2
// @version 1.2.3
// @date 2014-05-04
// @include http*://www.youtube.tld/watch?*
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @include http://www.youtube.com/results?*
// @include https://www.youtube.com/results?*
// @include http*://www.youtube.tld/watch?*
// @include http://www.youtube.com/feed/*
// @include https://www.youtube.com/feed/*
// @include http://www.youtube.com/?*
// @include https://www.youtube.com/?*
// @include http://www.youtube.com/
// @include https://www.youtube.com/
// @include http://video2audio.info/mobile.php?v=*
// @match http://video2audio.info/mobile.php?v=*
// @include http://mp3.bvd2.nl/*
// @match http://mp3.bvd2.nl/*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @match http://www.youtube.com/results?*
// @match https://www.youtube.com/results?*
// @match http://www.youtube.com/feed/*
// @match https://www.youtube.com/feed/*
// @match http://www.youtube.com/?*
// @match https://www.youtube.com/?*
// @match http://www.youtube.com/
// @match https://www.youtube.com/
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @include http*://www.youtube.tld/watch?*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://yourjavascript.com/31183148113/contentloaded.js
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant unsafeWindow
// @run-at document-end
// @license MIT License
// ==/UserScript==
(function () {

var FORMAT_LABEL = {'18' : 'MP4 360p','22' : 'MP4 720p (HD)','34' : 'FLV 360p','35' : 'FLV 480p','37' : 'MP4 1080p (HD)','38' : 'MP4 4K (HD)','43' : 'WebM 360p','44' : 'WebM 480p','45' : 'WebM 720p (HD)','46' : 'WebM 1080p (HD)','13' : '3GP (144p)','17' : '3GP (144p)','36' : '3GP (240p)'};

var FORMAT_TYPE = {'18' : 'mp4','22' : 'mp4','34' : 'flv','35' : 'flv','37' : 'mp4','38' : 'mp4','43' : 'webm','44' : 'webm','45' : 'webm','46' : 'webm','13' : '3GP','17' : '3GP','36' : '3GP'};

var FORMAT_ORDER = ['18', '34', '43', '35', '44', '22', '45', '37', '46', '38', '13', '17', '36'];

var FORMAT_RULE = {'flv' : 'max','mp4' : 'all','3GP' : 'all','webm' : 'none'};

var SHOW_DASH_FORMATS=false;

var BUTTON_TOOLTIP={'ar':'تنزيل هذا الفيديو','cs':'Stáhnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este vídeo','fr':'Télécharger cette vidéo','hi':'वीडियो डाउनलोड करें','id':'Unduh video ini','it':'Scarica questo video','ja':'このビデオをダウンロードする','pl':'Pobierz plik wideo','pt':'Baixar este vídeo','ro':'Descărcați acest videoclip','ru':'Скачать это видео','tr': 'Bu videoyu indir','zh':'下载此视频'};
var DECODE_RULE={};
var RANDOM=7499235178; // Math.floor(Math.random()*1234567890);
var CONTAINER_ID='download-youtube-video'+RANDOM;
var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;
var BUTTON_ID='download-youtube-video-button'+RANDOM;
var DEBUG_ID='download-youtube-video-debug-info';
var STORAGE_URL='download-youtube-script-url';
var STORAGE_CODE='download-youtube-signature-code';
var isDecodeRuleUpdated=false;
var version = '1.2.3';

start();

function start() {  
  var pagecontainer=document.getElementById('page-container');
  if (!pagecontainer) return;
  if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();     
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI    
      var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
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
		if(document.URL.match('youtube.com/') && new RegExp('v=[a-zA-Z0-9-_]{11}').exec(document.URL)) {
   var YID = RegExp.lastMatch.substr(2);}

  if (document.getElementById(CONTAINER_ID)) return; // check download container
  if (document.getElementById('p') && document.getElementById('vo')) return; // Feather not supported

  var videoID, videoTicket, videoFormats, videoAdaptFormats, videoDashManifest, scriptURL=null;
  var isSignatureCodeUpdated=false;
  var language=findLanguage();
  var textDirection='left';
  if (document.body.getAttribute('dir')=='rtl') {
    textDirection='right';
  }
  fixTranslations(language, textDirection);
        
  // obtain video ID, temporary ticket, formats map   
  
  var args=null;
  var usw=getUnsafeWindow(); // Firefox, Opera<15
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.args) {
    args=usw.ytplayer.config.args;
  }
  if (args) {
    videoID=args['video_id'];
    videoTicket=args['t'];
    videoFormats=args['url_encoded_fmt_stream_map'];
    videoAdaptFormats=args['adaptive_fmts'];
    //debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.assets) {
    scriptURL=usw.ytplayer.config.assets.js;
  }  
    if (videoID==null || videoTicket==null) { // unsafeWindow workaround (Chrome, Opera 15+)
    var buffer=document.getElementById(DEBUG_ID+'2')
    if (buffer) {
      while (buffer.firstChild) {
        buffer.removeChild(buffer.firstChild);
      }
    } else {
      buffer=createHiddenElem('pre', DEBUG_ID+'2');
    }    
    injectScript ('document.getElementById("'+DEBUG_ID+'2").appendChild(document.createTextNode(\'"video_id":"\'+ytplayer.config.args.video_id+\'", "t":"\'+ytplayer.config.args.t+\'", "dashmpd":"\'+ytplayer.config.args.dashmpd+\'", "js":"\'+ytplayer.config.assets.js+\'", "url_encoded_fmt_stream_map":"\'+ytplayer.config.args.url_encoded_fmt_stream_map+\'", "adaptive_fmts":"\'+ytplayer.config.args.adaptive_fmts+\'"\'));');
    var code=buffer.innerHTML;
    if (code) {
      videoID=findMatch(code, /\"video_id\":\s*\"([^\"]+)\"/);
      videoTicket=findMatch(code, /\"t\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(code, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoFormats=videoFormats.replace(/&amp;/g,'\\u0026');
      videoAdaptFormats=findMatch(code, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=videoAdaptFormats.replace(/&amp;/g,'\\u0026');
      scriptURL=findMatch(code, /\"js\":\s*\"([^\"]+)\"/);
    }
    debug('DYVAM - Info: Injection mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  if (videoID==null || videoTicket==null) { // if all else fails
    var bodyContent=document.body.innerHTML;  
    if (bodyContent!=null) {
      videoID=findMatch(bodyContent, /\"video_id\":\s*\"([^\"]+)\"/);
      videoTicket=findMatch(bodyContent, /\"t\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(bodyContent, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=findMatch(bodyContent, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      if (scriptURL==null) {
        scriptURL=findMatch(bodyContent, /\"js\":\s*\"([^\"]+)\"/);
        scriptURL=scriptURL.replace(/\\/g,'');
      }      
    }
    //debug('DYVAM - Info: Brute mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  
  //debug('DYVAM - Info: url '+window.location.href+'; useragent '+window.navigator.userAgent);  
  
  if (videoID==null || videoTicket==null || videoFormats==null || videoID.length==0 || videoTicket.length==0 || videoFormats.length==0) {
   //debug('DYVAM - Error: No config information found. YouTube must have changed the code.');
   return;
  }
    
  if (!isDecodeRuleUpdated) {
    DECODE_RULE=updateDecodeRules(DECODE_RULE);
    isDecodeRuleUpdated=true;
  }
  if (scriptURL) {
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
  videoFormats=videoFormats+(sep1+videoAdaptFormats);
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
  
  // use Dash manifest signature for the other streams  
  var dashURL='';
  if (videoDashManifest && sampleDownloadURL) {
    var dashParams=findMatch(videoDashManifest, /youtube\.com\/api\/manifest\/dash\/(.+)/);
    if (dashParams) {
      var dashElem=dashParams.split('/');      
      for (var i=0; i<dashElem.length; i+=2) {
        if (i>0) dashURL=dashURL+'&';
        if (dashElem[i]=='s') {
        	dashElem[i]='signature';
        	dashElem[i+1]=decryptSignature(dashElem[i+1]);
        } else if (dashElem[i]=='sig') {
        	dashElem[i]='signature';
        }
        dashURL=dashURL+(dashElem[i]+'='+(dashElem[i+1]||''));
      }
      var dashStartURL=findMatch(sampleDownloadURL, /(^.+videoplayback\?)/);
      if (dashStartURL) {
        dashURL=dashStartURL+dashURL;
      } else {
        dashURL='';
      }
      if (dashURL.toLowerCase().indexOf('ratebypass')==-1) { // speed up download for dash
        dashURL=dashURL+'&ratebypass=yes';
      }
      dashURL=dashURL+'&title='+videoTitle;
    }
  }
  
  if (dashURL) {
    if ((videoURL['135']) && videoURL['35']==undefined) {
      videoSignature['35']=null;
      videoURL['35']=dashURL+'&itag=35';
    }  
    if ((videoURL['264']||videoURL['137']) && videoURL['37']==undefined) {
      videoSignature['37']=null;
      videoURL['37']=dashURL+'&itag=37';
    }
    if (videoURL['138'] && videoURL['38']==undefined) {
      videoSignature['38']=null;
      videoURL['38']=dashURL+'&itag=38';
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
    if (format=='37' && videoURL[format]==undefined) { // hack for dash 1080p
      if (videoURL['264']) { // high-bitrate 1080p
       format='264';
      } else if (videoURL['137']) {
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
      //debug('DYVAM - Info: itag'+format+' url:'+videoURL[format]);
    }
  }
  
  
  if (downloadCodeList.length==0) {
    //debug('DYVAM - Error: No download URL found. Probably YouTube uses encrypted streams.');
    return; // no format
  } 
  
  // find parent container
  var parentElement=document.getElementById('watch7-action-buttons');
  if (parentElement==null) {
    //debug('DYVAM - No container for adding the download button. YouTube must have changed the code.');
    return;
  }

		// get button labels
		var buttonLabel = (BUTTON_TOOLTIP[language]) ? BUTTON_TOOLTIP[language] : BUTTON_TOOLTIP['en'];

		// generate download code for regular interface
		var mainSpan = document.createElement('span');
		var spanButton = document.createElement('span');
		spanButton.setAttribute('class', 'yt-uix-button-content');
		var imgButton = document.createElement('img');
		imgButton.setAttribute('id', 'ydlbuttonimgb');
		imgButton.setAttribute('src', 'data:image/gif;base64,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');
		mainSpan.appendChild(imgButton);
		
		mainSpan.appendChild(spanButton);
		var listItems = document.createElement('ol');
		listItems.setAttribute('style', 'display:none;');
		listItems.setAttribute('class', 'yt-uix-button-menu');
		for (var i = 0; i < downloadCodeList.length; i++) {
			var listItem = document.createElement('li');
			var listLink = document.createElement('a');
			listLink.setAttribute('style', 'text-decoration:none;');
			listLink.setAttribute('href', downloadCodeList[i].url);
			var listSpan = document.createElement('span');
			listSpan.setAttribute('class', 'yt-uix-button-menu-item');
			listSpan.setAttribute('loop', i + '');
			listSpan.setAttribute('id', LISTITEM_ID + downloadCodeList[i].format);
			listSpan.appendChild(document.createTextNode(downloadCodeList[i].label));
			listLink.appendChild(listSpan);
			listItem.appendChild(listLink);
			listItems.appendChild(listItem);
		}

//AAC Button
		var listItem = document.createElement('li');
		var listLink = document.createElement('a');
		listLink.setAttribute('style', 'text-decoration:none;');
		listLink.setAttribute('href', 'javascript:void(0);');
		var listSpan = document.createElement('span');
		listSpan.setAttribute('class', 'yt-uix-button-menu-item');
		listSpan.setAttribute('id', 'aac');
		listSpan.onclick = function () {
			jQuery('#EXT_DIV').remove();
			addiframe2('http://mp3.bvd2.nl/addon/aac.php?url='+window.location.href+'');	
			return false;
		};
		listSpan.appendChild(document.createTextNode('AAC'));
		listLink.appendChild(listSpan);
		listItem.appendChild(listLink);
		listItems.appendChild(listItem);
//end AAC
//MP3 Buttons
		var listItem = document.createElement('li');
		var listLink = document.createElement('a');
		listLink.setAttribute('style', 'text-decoration:none;');
		listLink.setAttribute('href', 'javascript:void(0);');
		var listSpan = document.createElement('span');
		listSpan.setAttribute('class', 'yt-uix-button-menu-item');
		listSpan.setAttribute('id', 'mp3');
		listSpan.onclick = function () {
			jQuery('#EXT_DIV').remove();
			addiframe('http://video2audio.info/mobile.php?v='+YID+'');
			return false;
		};
		listSpan.appendChild(document.createTextNode('MP3 (HQ)'));
		listLink.appendChild(listSpan);
		listItem.appendChild(listLink);
		listItems.appendChild(listItem);
//-
		var listItem = document.createElement('li');
		var listLink = document.createElement('a');
		listLink.setAttribute('style', 'text-decoration:none;');
		listLink.setAttribute('href', 'javascript:void(0);');
		var listSpan = document.createElement('span');
		listSpan.setAttribute('class', 'yt-uix-button-menu-item');
		listSpan.setAttribute('id', 'mp3');
		listSpan.onclick = function () {
			jQuery('#EXT_DIV').remove();
			addiframe2('http://mp3.bvd2.nl/addon/mp3.php?url='+window.location.href+'');	
			return false;
		};
		listSpan.appendChild(document.createTextNode('MP3 (192 Kbps)'));
		listLink.appendChild(listSpan);
		listItem.appendChild(listLink);
		listItems.appendChild(listItem);
//end MP3 Buttons
//M4A Button
				var listItem = document.createElement('li');
		var listLink = document.createElement('a');
		listLink.setAttribute('style', 'text-decoration:none;');
		listLink.setAttribute('href', 'javascript:void(0);');
		var listSpan = document.createElement('span');
		listSpan.setAttribute('class', 'yt-uix-button-menu-item');
		listSpan.setAttribute('id', 'm4a');
		listSpan.onclick = function () {
			jQuery('#EXT_DIV').remove();
			addiframe2('http://mp3.bvd2.nl/addon/m4a.php?url='+window.location.href+'');	
			return false;
		};
		listSpan.appendChild(document.createTextNode('M4A (Best Quality)'));
		listLink.appendChild(listSpan);
		listItem.appendChild(listLink);
		listItems.appendChild(listItem);
//end M4A
//Support button
		var listItem = document.createElement('li');
		var listLink = document.createElement('a');
		listLink.setAttribute('style', 'text-decoration: underline overline; margin-left: 1px; color: #1b7fcc;');
		listLink.setAttribute('href', 'http://bvd2.nl/support?refid=' + videoID + '&ver=' + version);
		listLink.setAttribute('target', '_blank');

		var listSpan = document.createElement('span');
		listSpan.setAttribute('class', 'yt-uix-button-menu-item');
		listSpan.setAttribute('id', LISTITEM_ID + '-support');
		listSpan.setAttribute('title', 'Contact to get support, Bug Report or Suggestion');
		listSpan.appendChild(document.createTextNode('Contact/Help'));
		listLink.appendChild(listSpan);
		listItem.appendChild(listLink);
		listItems.appendChild(listItem);
//end support button
		mainSpan.appendChild(listItems);
		var buttonElement = document.createElement('button');

		buttonElement.setAttribute('id', BUTTON_ID);
		buttonElement.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text');
		buttonElement.setAttribute('style', 'margin-top:4px; margin-left:' + ((textDirection == 'left') ? 5 : 10) + 'px;');
		buttonElement.setAttribute('data-tooltip-text', buttonLabel);
		buttonElement.addEventListener('click', function () {
			return false;
		}, false);
		buttonElement.setAttribute('type', 'button');
		buttonElement.setAttribute('role', 'button');
		buttonElement.appendChild(mainSpan);

		// add the button
		var containerSpan = document.createElement('span');
		containerSpan.setAttribute('id', CONTAINER_ID);
		containerSpan.appendChild(document.createTextNode(' '));
		containerSpan.appendChild(buttonElement);
		parentElement.appendChild(containerSpan);
		
		
		function addiframe(src, height) {
			try {
				var pegPlace = document.getElementById('watch-info');
				if (pegPlace == null) {
					pegPlace = document.getElementById('playnav-video-details');
					if (pegPlace == null)
						pegPlace = document.getElementById('watch7-action-panels');
				}
				var iframe = document.getElementById('EXT_FRAME');

				if (iframe == null) {
					//debug("Element Sucess");
					div = CreateIframeDiv(height);
					iframe = CreateIframe(height);
					div.appendChild(iframe);
					pegPlace.parentNode.insertBefore(div, pegPlace);
				}
				src += '&tcode=120' //+ VideoLengthSeconds;
				src += '&token=' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : r & 0x3 | 0x8;
					return v.toString(16);
				});
				var date = new Date();
				var time = date.getTime();
				iframe.setAttribute("src", src + '&t=' + time);
			} catch (err) {
				debug(err);
			}
		};

		function CreateIframe(height) {
			iframe = document.createElement('iframe');
			iframe.setAttribute("id", "EXT_FRAME");
			iframe.setAttribute("width", "640");
			iframe.setAttribute("height", "283");
			iframe.setAttribute("border", "0");
			iframe.setAttribute("scrolling", "no");
			iframe.setAttribute("style", "border: 0 none;");
			return iframe;
		};

		function CreateIframeDiv(height) {
			var div = document.createElement('div');
			div.setAttribute("id", "EXT_DIV");
			div.style.width = '640px';
			div.style.margin = '0px 0px 5px 0px';
			div.style.padding = '0px';
			div.style.height = height;
			div.style.overflow = 'hidden';
			div.innerHTML="<BR /><form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='E9G7S8H2QGL9E'><input type='image' src='https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal – The safer, easier way to pay online.'><img alt='' border='0' src='https://www.paypalobjects.com/nl_NL/i/scr/pixel.gif' width='1' height='1'></form>";
			return div;
		};
		function addiframe2(src, height) {
			try {
				var pegPlace = document.getElementById('watch-info');
				if (pegPlace == null) {
					pegPlace = document.getElementById('playnav-video-details');
					if (pegPlace == null)
						pegPlace = document.getElementById('watch7-action-panels');
				}
				var iframe = document.getElementById('EXT_FRAME');

				if (iframe == null) {
					//debug("Element Sucess");
					div = CreateIframeDiv2(height);
					iframe = CreateIframe2(height);
					div.appendChild(iframe);
					pegPlace.parentNode.insertBefore(div, pegPlace);
				}
				src += '&tcode=120' //+ VideoLengthSeconds;
				src += '&token=' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : r & 0x3 | 0x8;
					return v.toString(16);
				});
				var date = new Date();
				var time = date.getTime();
				iframe.setAttribute("src", src + '&t=' + time);
			} catch (err) {
				debug(err);
			}
		};

		function CreateIframe2(height) {
			iframe = document.createElement('iframe');
			iframe.setAttribute("id", "EXT_FRAME");
			iframe.setAttribute("width", "640");
			iframe.setAttribute("height", "283");
			iframe.setAttribute("border", "0");
			iframe.setAttribute("scrolling", "no");
			iframe.setAttribute("style", "border: 0 none;");
			return iframe;
		};

		function CreateIframeDiv2(height) {
			var div = document.createElement('div');
			div.setAttribute("id", "EXT_DIV");
			div.style.width = '640px';
			div.style.margin = '0px 0px 5px 0px';
			div.style.padding = '0px';
			div.style.height = height;
			div.style.overflow = 'hidden';
			div.innerHTML="<BR /><form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='E9G7S8H2QGL9E'><input type='image' src='https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal – The safer, easier way to pay online.'><img alt='' border='0' src='https://www.paypalobjects.com/nl_NL/i/scr/pixel.gif' width='1' height='1'></form>";
			return div;
		};
		
		//END FRAME
		for (var i = 0; i < downloadCodeList.length; i++) {
			var downloadFMT = document.getElementById(LISTITEM_ID + downloadCodeList[i].format);
			downloadFMT.addEventListener('click', downloadVideo, false);
		}

		function downloadVideo(e) {
			jQuery('#EXT_DIV').remove(); // remove status iframe
    if (isSignatureCodeUpdated) {
      var elem=e.target;
      var url=downloadCodeList[elem.getAttribute('loop')].url;
      var sig=downloadCodeList[elem.getAttribute('loop')].sig;
      if (sig) {
        url=url.replace(/\&signature=[\w\.]+/, '&signature='+decryptSignature(sig));
        elem.parentNode.setAttribute('href', url);
      }
    }
  }

		function injectStyle(code) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.appendChild(document.createTextNode(code));
			document.getElementsByTagName('head')[0].appendChild(style);
		}
		function injectScript(code) {
			var script = document.createElement('script');
			script.type = 'application/javascript';
			script.textContent = code;
			document.body.appendChild(script);
			document.body.removeChild(script);
		}

		function getUnsafeWindow() { // Firefox, Opera<15
			return (typeof this.unsafeWindow !== 'undefined') ? this.unsafeWindow : window;
		}
		
		
		contentLoaded(window,
		function () {
			//debug('we are inside document.ready event');
			var dlbuttonimg = document.getElementById('ydlbuttonimgb');
			dlbuttonimg.setAttribute('src', 'data:image/png;base64,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');
			
			//Download ready tooltip
			var dlReadyTooltip = document.getElementById(BUTTON_ID);
			dlReadyTooltip.setAttribute('data-tooltip-text', 'Download');
			$('EXT_FRAME').load(function () {
				//debug('frame got loaded');
			});
			
		});
		

		function debug(str) {
		}

		function createHiddenElem(tag, id) {
			var elem = document.createElement(tag);
			elem.setAttribute('id', id);
			elem.setAttribute('style', 'display:none;');
			document.body.appendChild(elem);
			return elem;
		}

		function findLanguage() {
			var language = document.documentElement.getAttribute('lang');
			if (language == '') {
				var footer = document.getElementById('');
				if (footer && /\/ja\/|\.co\.jp/.test(footer.innerHTML)) {
					language = 'ja'; // fix YouTube bug
				}
			}
			return language;
		}

		function fixTranslations(language, textDirection) {
			var styleCode = '#watch7-sentiment-actions div.share-panel-services{display:none!important}';
			if (/^af|bg|bn|ca|cs|de|el|es|et|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lv|lt|ml|mr|ms|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|th|uk|ur|vi|zu$/.test(language)) { // fix international UI
				var likeButton = document.getElementById('watch-like');
				if (likeButton) {
					var spanElements = likeButton.getElementsByClassName('yt-uix-button-content');

				}
				var marginPixels = 10;
				if (/^bg|ca|cs|el|es|eu|fr|hr|it|ml|ms|pl|ro|ru|sl|sw|te$/.test(language)) {
					marginPixels = 1;
				}
				styleCode += ' #watch7-secondary-actions .yt-uix-button{margin-' + textDirection + ':' + marginPixels + 'px!important}';
			}
			injectStyle(styleCode);
		}

		function findMatch(text, regexp) {
			var matches = text.match(regexp);
			return (matches) ? matches[1] : null;
		}

		function isString(s) {
			return (typeof s === 'string' || s instanceof String);
		}

		function isInteger(n) {
			return (typeof n === 'number' && n % 1 == 0);
		}

		function getPref(name) { // cross-browser GM_getValue
			if (typeof GM_getValue === 'function' &&
				(typeof GM_getValue.toString === 'undefined' || GM_getValue.toString().indexOf('not supported') === -1)) {
				return GM_getValue(name, null); // Greasemonkey, Tampermonkey, Firefox extension
			} else {
				var ls = null;
				try {
					ls = window.localStorage || null
				} catch (e) {}
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
				var ls = null;
				try {
					ls = window.localStorage || null
				} catch (e) {}
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
				opera.extension.postMessage({
					'action' : 'xhr',
					'url' : details.url
				});
				opera.extension.onmessage = function (event) {
					if (event.data.action === 'xhr-response' && event.data.error === false) {
						if (details['onload']) {
							details['onload']({
								responseText : event.data.response,
								readyState : 4,
								status : 200
							});
						}
					}
				}
			} else if (typeof window.opera === 'undefined' && typeof XMLHttpRequest === 'function') { // Opera 15+ extension
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (details['onload'] && xhr.status >= 200 && xhr.status < 300) {
							details['onload']({
								responseText : xhr.responseText,
								readyState : xhr.readyState,
								status : xhr.status
							});
						}
					}
				}
				xhr.open(details.method, details.url, true);
				xhr.send();
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
    var regInline=new RegExp('\\w+\\[0\\]\\s*=\\s*\\w+\\[([0-9]+)\\s*%\\s*\\w+\\.length\\]');    var functionCodePieces=functionCode.split(';');
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
      isSignatureCodeUpdated=true; // updated signature
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
      crossXmlHttpRequest({
        method:'GET',
        url:scriptURL,
        onload:function(response) {
          if (response.readyState === 4 && response.status === 200) {
              findSignatureCode(response.responseText);
          }
        } 
      });
    } catch(e) { }
  }

  function updateDecodeRules(rules) {
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