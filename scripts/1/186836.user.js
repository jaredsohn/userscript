// ==UserScript==
// @name Download YouTube Videos as M4A (HE-AACv2)
// @description Adds a button that lets you download YouTube videos as M4A (HE-AACv2)
// @homepageURL http://userscripts.org/scripts/show/25105
// @updateURL https://userscripts.org/scripts/source/25105.meta.js
// @author Rrrrobert
// @version 1.0.1
// @date 12-26-2013
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @include http://www.youtube.com/results?*
// @include https://www.youtube.com/results?*
// @include http://www.youtube.com/feed/*
// @include https://www.youtube.com/feed/*
// @include http://www.youtube.com/?*
// @include https://www.youtube.com/?*
// @include http://www.youtube.com/
// @include https://www.youtube.com/
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
// @match http://*.googlevideo.com/*
// @match https://*.googlevideo.com/*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-end
// ==/UserScript==
(function(){var FORMAT_LABEL={'139':'MP4 Low Audio','140':'MP4 Med Audio','141':'MP4 High Audio','171':'WebM Med Audio','172':'WebM High Audio'};var FORMAT_TYPE={'139':'mp4','140':'mp4','141':'mp4','171':'webm','172':'webm'}
var FORMAT_ORDER=['139','140','141','171','172','5'];var FORMAT_RULE={'flv':'none','mp4':'max','webm':'max','m4a':'none'};var SHOW_DASH_FORMATS=true;var BUTTON_TEXT={'en':'Convert'};var BUTTON_TOOLTIP={'en':'Convert Audio'};var DECODE_RULE={};var RANDOM=7489235179;var CONTAINER_ID='download-youtube-video'+RANDOM;var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;var BUTTON_ID='download-youtube-video-button'+RANDOM;var DEBUG_ID='download-youtube-video-debug-info';var STORAGE_URL='download-youtube-script-url';var STORAGE_CODE='download-youtube-signature-code';var dlurl='http://192.168.1.100/youtube/down.php?url=';var isDecodeRuleUpdated=false;start();function start(){var pagecontainer=document.getElementById('page-container');if(!pagecontainer)
return;if(/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href))
run();var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);var content=document.getElementById('content');if(isAjax&&content){var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;if(typeof mo!=='undefined'){var observer=new mo(function(mutations){mutations.forEach(function(mutation){if(mutation.addedNodes!==null){for(var i=0;i<mutation.addedNodes.length;i++){if(mutation.addedNodes[i].id=='watch7-container'){run();break;}}}});});observer.observe(content,{childList:true,subtree:true});}else{pagecontainer.addEventListener('DOMNodeInserted',onNodeInserted,false);}}}
function onNodeInserted(e){if(e&&e.target&&e.target.id=='watch7-container'){run();}}
function run(){if(document.getElementById(CONTAINER_ID))
return;if(document.getElementById('p')&&document.getElementById('vo'))
return;var videoID,videoFormats,videoAdaptFormats,scriptURL=null;var isSignatureUpdatingStarted=false;var operaTable=new Array();var language=document.documentElement.getAttribute('lang');var textDirection='left';if(document.body.getAttribute('dir')=='rtl'){textDirection='right';}
fixTranslations(language,textDirection);var args=null;var usw=(typeof this.unsafeWindow!=='undefined')?this.unsafeWindow:window;if(usw.ytplayer&&usw.ytplayer.config&&usw.ytplayer.config.args){args=usw.ytplayer.config.args;}
if(args){videoID=args['video_id'];videoFormats=args['url_encoded_fmt_stream_map'];videoAdaptFormats=args['adaptive_fmts'];debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');}
if(usw.ytplayer&&usw.ytplayer.config&&usw.ytplayer.config.assets){scriptURL=usw.ytplayer.config.assets.js;}
if(videoID==null){var buffer=document.getElementById(DEBUG_ID+'2')
if(buffer){while(buffer.firstChild){buffer.removeChild(buffer.firstChild);}}else{buffer=createHiddenElem('pre',DEBUG_ID+'2');}
injectScript('document.getElementById("'+DEBUG_ID+'2").appendChild(document.createTextNode(''video_id':''+ytplayer.config.args.video_id+'','js':''+ytplayer.config.assets.js+'','url_encoded_fmt_stream_map':''+ytplayer.config.args.url_encoded_fmt_stream_map+'','adaptive_fmts':''+ytplayer.config.args.adaptive_fmts+'''));');var code=buffer.innerHTML;if(code){videoID=findMatch(code,/\"video_id\":\s*\"([^\"]+)\"/);videoFormats=findMatch(code,/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);videoFormats=videoFormats.replace(/&amp;/g,'&');videoAdaptFormats=findMatch(code,/\"adaptive_fmts\":\s*\"([^\"]+)\"/);videoAdaptFormats=videoAdaptFormats.replace(/&amp;/g,'&');scriptURL=findMatch(code,/\"js\":\s*\"([^\"]+)\"/);}
debug('DYVAM - Info: Injection mode. videoID '+(videoID?videoID:'none')+'; ');}
if(videoID==null){var bodyContent=document.body.innerHTML;if(bodyContent!=null){videoID=findMatch(bodyContent,/\"video_id\":\s*\"([^\"]+)\"/);videoFormats=findMatch(bodyContent,/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);videoAdaptFormats=findMatch(bodyContent,/\"adaptive_fmts\":\s*\"([^\"]+)\"/);if(scriptURL==null){scriptURL=findMatch(bodyContent,/\"js\":\s*\"([^\"]+)\"/);scriptURL=scriptURL.replace(/\\/g,'');}}
debug('DYVAM - Info: Brute mode. videoID '+(videoID?videoID:'none')+'; ');}
debug('DYVAM - Info: url '+window.location.href+'; useragent '+window.navigator.userAgent);if(videoID==null||videoFormats==null||videoID.length==0||videoFormats.length==0){debug('DYVAM - Error: No config information found. YouTube must have changed the code.');return;}
if(typeof window.opera!=='undefined'&&window.opera&&typeof opera.extension!=='undefined'){opera.extension.onmessage=function(event){var index=findMatch(event.data.action,/xhr\-([0-9]+)\-response/);if(index&&operaTable[parseInt(index,10)]){index=parseInt(index,10);var trigger=(operaTable[index])['onload'];if(typeof trigger==='function'&&event.data.readyState==4){if(trigger){trigger(event.data);}}}}}
if(!isDecodeRuleUpdated){DECODE_RULE=getDecodeRules(DECODE_RULE);isDecodeRuleUpdated=true;}
if(scriptURL){if(scriptURL.indexOf('//')==0){scriptURL='http:'+scriptURL;}
fetchSignatureScript(scriptURL);}
var videoTitle=document.title||'video';videoTitle=videoTitle.replace(/\s*\-\s*YouTube$/i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'').replace(/^\s+|\s+$/g,'').replace(/\.+$/g,'');var sep1='%2C',sep2='%26',sep3='%3D';if(videoFormats.indexOf(',')>-1){sep1=',';sep2=(videoFormats.indexOf('&')>-1)?'&':'&';sep3='=';}
var videoURL=new Array();var videoSignature=new Array();if(videoAdaptFormats){videoFormats=videoFormats+sep1+videoAdaptFormats;}
var videoFormatsGroup=videoFormats.split(sep1);for(var i=0;i<videoFormatsGroup.length;i++){var videoFormatsElem=videoFormatsGroup[i].split(sep2);var videoFormatsPair=new Array();for(var j=0;j<videoFormatsElem.length;j++){var pair=videoFormatsElem[j].split(sep3);if(pair.length==2){videoFormatsPair[pair[0]]=pair[1];}}
if(videoFormatsPair['url']==null)
continue;var url=unescape(unescape(videoFormatsPair['url'])).replace(/\\\//g,'/').replace(/\\u0026/g,'&');if(videoFormatsPair['itag']==null)
continue;var itag=videoFormatsPair['itag'];var sig=videoFormatsPair['sig']||videoFormatsPair['signature'];if(sig){url=url+'&signature='+sig;videoSignature[itag]=null;}else if(videoFormatsPair['s']){url=url+'&signature='+decryptSignature(videoFormatsPair['s']);videoSignature[itag]=videoFormatsPair['s'];}
if(url.toLowerCase().indexOf('ratebypass')==-1){url=url+'&ratebypass=yes';}
if(url.toLowerCase().indexOf('http')==0){videoURL[itag]=url+'&title='+videoTitle;}}
var showFormat=new Array();for(var category in FORMAT_RULE){var rule=FORMAT_RULE[category];for(var index in FORMAT_TYPE){if(FORMAT_TYPE[index]==category){showFormat[index]=(rule=='all');}}
if(rule=='max'){for(var i=FORMAT_ORDER.length-1;i>=0;i--){var format=FORMAT_ORDER[i];if(FORMAT_TYPE[format]==category&&videoURL[format]!=undefined){showFormat[format]=true;break;}}}}
var downloadCodeList=[];for(var i=0;i<FORMAT_ORDER.length;i++){var format=FORMAT_ORDER[i];if(format=='37'&&videoURL[format]==undefined){if(videoURL['264']){format='264';}else if(videoURL['137']){format='137';}
showFormat[format]=showFormat['37'];}else if(format=='38'&&videoURL[format]==undefined){if(videoURL['138']){format='138';}
showFormat[format]=showFormat['38'];}
if(!SHOW_DASH_FORMATS&&format.length>2)
continue;if(videoURL[format]!=undefined&&FORMAT_LABEL[format]!=undefined&&showFormat[format]){downloadCodeList.push({url:videoURL[format],sig:videoSignature[format],format:format,label:FORMAT_LABEL[format]});debug('DYVAM - Info: itag'+format+' url:'+videoURL[format]);}}
if(downloadCodeList.length==0){debug('DYVAM - Error: No download URL found. Probably YouTube uses encrypted streams.');return;}
var parentElement=document.getElementById('watch7-action-buttons');if(parentElement==null){debug('DYVAM - No container for adding the download button. YouTube must have changed the code.');return;}
var buttonText=(BUTTON_TEXT[language])?BUTTON_TEXT[language]:BUTTON_TEXT['en'];var buttonLabel=(BUTTON_TOOLTIP[language])?BUTTON_TOOLTIP[language]:BUTTON_TOOLTIP['en'];var mainSpan=document.createElement('span');var spanButton=document.createElement('span');spanButton.setAttribute('class','yt-uix-button-content');spanButton.appendChild(document.createTextNode(buttonText+' '));mainSpan.appendChild(spanButton);var buttonElement=document.createElement('button');buttonElement.setAttribute('class','yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text');buttonElement.setAttribute('style','margin-top:4px; margin-left:'+((textDirection=='left')?5:10)+'px;');buttonElement.setAttribute('data-tooltip-text',buttonLabel);buttonElement.setAttribute('type','button');buttonElement.setAttribute('role','button');buttonElement.setAttribute('href',downloadCodeList[0].url);buttonElement.setAttribute('download',videoTitle+'.'+FORMAT_TYPE[downloadCodeList[0].format]);buttonElement.setAttribute('id',LISTITEM_ID+downloadCodeList[0].format);var down=downloadCodeList[0].url;download=encodeURIComponent(down);buttonElement.addEventListener('click',function(){document.location.href=dlurl+download;},false);buttonElement.appendChild(mainSpan);var containerSpan=document.createElement('span');containerSpan.setAttribute('id',CONTAINER_ID);containerSpan.appendChild(document.createTextNode(' '));containerSpan.appendChild(buttonElement);parentElement.appendChild(containerSpan);function injectStyle(code){var style=document.createElement('style');style.type='text/css';style.appendChild(document.createTextNode(code));document.getElementsByTagName('head')[0].appendChild(style);}
function injectScript(code){var script=document.createElement('script');script.type='application/javascript';script.textContent=code;document.body.appendChild(script);document.body.removeChild(script);}
function debug(str){var debugElem=document.getElementById(DEBUG_ID);if(!debugElem){debugElem=createHiddenElem('div',DEBUG_ID);}
debugElem.appendChild(document.createTextNode(str+' '));}
function createHiddenElem(tag,id){var elem=document.createElement(tag);elem.setAttribute('id',id);elem.setAttribute('style','display:none;');document.body.appendChild(elem);return elem;}
function fixTranslations(language,textDirection){if(/^af|bg|bn|ca|cs|de|el|es|et|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lv|lt|ml|mr|ms|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|th|uk|ur|vi|zu$/.test(language)){var likeButton=document.getElementById('watch-like');if(likeButton){var spanElements=likeButton.getElementsByClassName('yt-uix-button-content');if(spanElements){spanElements[0].style.display='none';}}
var marginPixels=10;if(/^bg|ca|cs|el|es|eu|fr|hr|it|ml|ms|pl|ro|ru|sl|sw|te$/.test(language)){marginPixels=1;}
injectStyle('#watch7-secondary-actions .yt-uix-button{margin-'+textDirection+':'+marginPixels+'px!important}');}}
function findMatch(text,regexp){var matches=text.match(regexp);return(matches)?matches[1]:null;}
function isString(s){return(typeof s==='string'||s instanceof String);}
function isInteger(n){return(typeof n==='number'&&n%1==0);}
function getPref(name){if(typeof GM_getValue==='function'&&(typeof GM_getValue.toString==='undefined'||GM_getValue.toString().indexOf('not supported')===-1)){return GM_getValue(name,null);}else{var ls=null;try{ls=window.localStorage||null}catch(e){}
if(ls){return ls.getItem(name);}}
return;}
function setPref(name,value){if(typeof GM_setValue==='function'&&(typeof GM_setValue.toString==='undefined'||GM_setValue.toString().indexOf('not supported')===-1)){GM_setValue(name,value);}else{var ls=null;try{ls=window.localStorage||null}catch(e){}
if(ls){return ls.setItem(name,value);}}}
function crossXmlHttpRequest(details){if(typeof GM_xmlhttpRequest==='function'){GM_xmlhttpRequest(details);}else if(typeof window.opera!=='undefined'&&window.opera&&typeof opera.extension!=='undefined'&&typeof opera.extension.postMessage!=='undefined'){var index=operaTable.length;opera.extension.postMessage({'action':'xhr-'+index,'url':details.url,'method':details.method});operaTable[index]=details;}else if(typeof window.opera==='undefined'&&typeof XMLHttpRequest==='function'){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==4){if(details['onload']){details['onload'](xhr);}}}
xhr.open(details.method,details.url,true);xhr.send();}}
function checkURL(url,format){try{crossXmlHttpRequest({method:'HEAD',url:url,onload:function(response){if(response.readyState==4&&response.status>=400){videoURL[format]=undefined;var elem=document.getElementById(LISTITEM_ID+format);if(elem&&elem.parentElement&&elem.parentElement.parentElement){var grandParent=elem.parentElement.parentElement;grandParent.parentNode.removeChild(grandParent);}}else if(response.readyState==4&&response.status==200){var size;if(typeof response.getResponseHeader==='function'){size=response.getResponseHeader('Content-length');}else if(response.responseHeaders){var regexp=new RegExp('^Content-length: (.*)$','im');var match=regexp.exec(response.responseHeaders);if(match){size=match[1];}}
if(size){if(size>=1073741824){size=parseFloat((size/1073741824).toFixed(1))+'GB';}else if(size>=1048576){size=parseFloat((size/1048576).toFixed(1))+'MB';}else{size=parseFloat((size/1024).toFixed(1))+'KB';}
var elem=document.getElementById(LISTITEM_ID+format);if(elem){var sizeElement=document.createElement('SPAN');sizeElement.setAttribute('style','font-size:84%;');var text=document.createTextNode(' ('+size+')');sizeElement.appendChild(text);elem.appendChild(sizeElement);}}}}});}catch(e){}}
function findSignatureCode(sourceCode){var functionName=findMatch(sourceCode,/\.signature\s*=\s*(\w+)\(\w+\)/);if(functionName==null)
return setPref(STORAGE_CODE,'error');var regCode=new RegExp('function '+functionName+'s*(w+)s*{w+=w+.split("");(.+);return w+.join');var functionCode=findMatch(sourceCode,regCode);if(functionCode==null)
return setPref(STORAGE_CODE,'error');var regSlice=new RegExp('slices*(s*(.+)s*)');var regSwap=new RegExp('w+s*(s*w+s*,s*([0-9]+)s*)');var regInline=new RegExp('w+[0]s*=s*w+[([0-9]+)s*%s*w+.length]');var functionCodePieces=functionCode.split(';');var decodeArray=[],signatureLength=81;for(var i=0;i<functionCodePieces.length;i++){functionCodePieces[i]=functionCodePieces[i].trim();if(functionCodePieces[i].length==0){}
else if(functionCodePieces[i].indexOf('slice')>=0){var slice=findMatch(functionCodePieces[i],regSlice);slice=parseInt(slice,10);if(isInteger(slice)){decodeArray.push(-slice);signatureLength+=slice;}else
return setPref(STORAGE_CODE,'error');}else if(functionCodePieces[i].indexOf('reverse')>=0){decodeArray.push(0);}else if(functionCodePieces[i].indexOf('[0]')>=0){if(i+2<functionCodePieces.length&&functionCodePieces[i+1].indexOf('.length')>=0&&functionCodePieces[i+1].indexOf('[0]')>=0){var inline=findMatch(functionCodePieces[i+1],regInline);inline=parseInt(inline,10);decodeArray.push(inline);i+=2;}else
return setPref(STORAGE_CODE,'error');}else if(functionCodePieces[i].indexOf(',')>=0){var swap=findMatch(functionCodePieces[i],regSwap);swap=parseInt(swap,10);if(isInteger(swap)){decodeArray.push(swap);}else
return setPref(STORAGE_CODE,'error');}else
return setPref(STORAGE_CODE,'error');}
if(decodeArray){setPref(STORAGE_URL,scriptURL);setPref(STORAGE_CODE,decodeArray.toString());DECODE_RULE[signatureLength]=decodeArray;for(var i=0;i<downloadCodeList.length;i++){var elem=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);var url=downloadCodeList[i].url;var sig=downloadCodeList[i].sig;if(elem&&url&&sig){url=url.replace(/\&signature=[\w\.]+/,'&signature='+decryptSignature(sig));elem.parentNode.setAttribute('href',url);}}}}
function isValidSignatureCode(arr){if(!arr)
return false;if(arr=='error')
return true;arr=arr.split(',');for(var i=0;i<arr.length;i++){if(!isInteger(parseInt(arr[i],10)))
return false;}
return true;}
function fetchSignatureScript(scriptURL){var storageURL=getPref(STORAGE_URL);var storageCode=getPref(STORAGE_CODE);if(storageCode&&isValidSignatureCode(storageCode)&&storageURL&&scriptURL.replace(/^https?/i,'')==storageURL.replace(/^https?/i,''))
return;try{isSignatureUpdatingStarted=true;crossXmlHttpRequest({method:'GET',url:scriptURL,onload:function(response){if(response.readyState===4&&response.status===200&&response.responseText){findSignatureCode(response.responseText);}}});}catch(e){}}
function getDecodeRules(rules){var storageCode=getPref(STORAGE_CODE);if(storageCode&&storageCode!='error'&&isValidSignatureCode(storageCode)){var arr=storageCode.split(',');var signatureLength=81;for(var i=0;i<arr.length;i++){arr[i]=parseInt(arr[i],10);if(arr[i]<0)
signatureLength-=arr[i];}
rules[signatureLength]=arr;}
return rules;}
function decryptSignature(sig){function swap(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c;return a};function decode(sig,arr){if(!isString(sig))
return null;var sigA=sig.split('');for(var i=0;i<arr.length;i++){var act=arr[i];if(!isInteger(act))
return null;sigA=(act>0)?swap(sigA,act):((act==0)?sigA.reverse():sigA.slice(-act));}
var result=sigA.join('');return(result.length==81)?result:sig;}
if(sig==null)
return'';var arr=DECODE_RULE[sig.length];if(arr){var sig2=decode(sig,arr);if(sig2&&sig2.length==81)
return sig2;}
return sig;}}})();