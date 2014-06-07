// ==UserScript==
// @name        	YouTube at school
// @version     	2011.10.07
// @namespace   	sebaro
// @description 	Watch videos from video sharing websites without the need for Flash Player.
// @include     	http://www.youtube.com/*
// @include     	http://youtube.com/*
// @include     	https://www.youtube.com/*
// @include     	https://youtube.com/*
// @include     	http://www.dailymotion.com/*
// @include     	http://dailymotion.com/*
// @include     	http://www.metacafe.com/*
// @include     	http://metacafe.com/*
// @include     	http://www.vimeo.com/*
// @include     	http://vimeo.com/*
// @include     	http://www.break.com/*
// @include     	http://break.com/*
// @include     	http://www.funnyordie.com/*
// @include     	http://funnyordie.com/*
// @include     	http://www.facebook.com/*
// @include     	http://facebook.com/*
// ==/UserScript==

var url1,url2;
url1 = ['www.youtube.com'];
url2 = ['www.beta.youtube.com']; 
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q="http://";
	q = q + url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	a.href=q ;
	}
	}
    }

(function() {

  
// Don't run on frames or iframes
if (window.top != window.self)  return;

// Get URL and OS
var url = window.location.href;
var os = (navigator.platform.indexOf('Win') != -1) ? 'Windows' : 'Linux';
 
// ==========Functions========== //

function createMyElement (type, content, event, target, vidPanel, vidObj, vidURL) {
  var obj = document.createElement(type);
  if (type == 'div') {
    if (content != '') obj.innerHTML = content;
  }
  if (type == 'object') {
    if (os == 'Windows') obj.type = 'application/x-mplayer2';
    else obj.type = 'video/mpeg';
    if (content != '') obj.data = content;
  }
  obj.addEventListener ('click', function () {
      if (event == 'close') {
	removeMyElement('body', target);
      }
      if (event == 'video') {
	modifyMyElement (vidPanel, 'div', myScriptName + ': ' + content, false);
	modifyMyElement (vidObj, 'object', vidURL, false);
      }
    }, false);
  return obj;
}

function getMyElement (type, getFrom, getValue, getChild, content) {
  if (type == 'body') var obj = document.body;
  else {
    if (getFrom == 'id') var obj = document.getElementById(getValue);
    if (getFrom == 'class') var obj = document.getElementsByClassName(getValue)[getChild];
  }
  if (content) {
    if (type == 'body' || type == 'div') return obj.innerHTML;
    if (type == 'object') return obj.data;
  }
  else return obj;
}

function modifyMyElement (obj, type, content, clear) {
  if (type == 'div') {
    if (content != '') obj.innerHTML = content;
  }
  if (type == 'object') {
    if (content != '') obj.data = content;
  }
  if (clear) {
    if (obj.hasChildNodes()) {
      while (obj.childNodes.length >= 1) {
        obj.removeChild(obj.firstChild);
      }
    }
  }
}

function styleMyElement (obj, pos, top, left, width, height, border, brRadius, margin, padding, display, bgColor, txtColor, txtSize, txtAlign, txtSh, cursor, zIndex) {
  if (pos != '') obj.style.position = pos;
  if (top != '') obj.style.top = top;
  if (left != '') obj.style.left = left;
  if (width != '') obj.style.width = width;
  if (height != '') obj.style.height = height;
  if (border != '') obj.style.border = border;
  if (brRadius != '') obj.style.borderRadius = brRadius;
  if (margin != '') obj.style.margin = margin;
  if (padding != '') obj.style.padding = padding;
  if (display != '') obj.style.display = display;
  if (bgColor != '') obj.style.backgroundColor = bgColor;
  if (txtColor != '') obj.style.color = txtColor;
  if (txtSize != '') obj.style.fontSize = txtSize;
  if (txtAlign != '') obj.style.textAlign = txtAlign;
  if (txtSh != '') obj.style.textShadow = txtSh;
  if (cursor != '') obj.style.cursor = cursor;
  if (zIndex != '') obj.style.zIndex = zIndex;
}

function appendMyElement (parent, child) {
  if (parent == 'body') document.body.appendChild(child);
  else parent.appendChild(child);
}

function removeMyElement (parent, child) {
  if (parent == 'body') document.body.removeChild(child);
  else parent.removeChild(child);
}

function replaceMyElement (parent, orphan, child) {
  parent.replaceChild(orphan, child);
}

function showMyMessage (mess) {
  appendMyElement (myPlayerWindow, myScriptLogo);
  if (mess == 'novideo') modifyMyElement (myScriptMess, 'div', myNoVideoMess, false);
  else modifyMyElement (myScriptMess, 'div', myNoLoadMess, false);
  appendMyElement (myPlayerWindow, myScriptMess);
}


function createMyPlayer (videoList, defaultVideo) {
  var myPlayerPanel = createMyElement ('div', '', '', '', '', '', '');
  styleMyElement (myPlayerPanel, '', '', '', '99%', '15px', '', '', '', '3px', '', '#F4F4F4', '#666666', '12px', 'center', '', '', '');
  var myPlayingVideo = createMyElement ('div', myScriptName + ': ' + defaultVideo, '', '', '', '', '');
  styleMyElement (myPlayingVideo, '', '', '', '', '', '', '', '0px 10px', '', 'inline', '', '#336699', '12px', '', '#DDDDDD 0px 1px 1px', '', '');
  appendMyElement (myPlayerPanel, myPlayingVideo);
  var myPlayerVideo = createMyElement ('object', '', '', '', '', '', '');
  var myPanelButton;
  var myDefaultVideo = null;
  var videoPath;
  var countVideos = 0;
  for (var videoCode in videoList) {
    countVideos ++;
  }
  for (var videoCode in videoList) {
    videoPath = videoList[videoCode];
    if (videoCode == defaultVideo) myDefaultVideo = videoPath;
    if (countVideos > 1) {
      myPanelButton = createMyElement ('div', videoCode, 'video', '', myPlayingVideo, myPlayerVideo, videoPath);
      styleMyElement (myPanelButton, '', '', '', '', '', '3px solid #EEEEEE', '3px', '0px 5px', '', 'inline', '', '', '12px', '', '#DDDDDD 0px 1px 1px', 'pointer', '');
      appendMyElement (myPlayerPanel, myPanelButton);
    }
  }
  if (myDefaultVideo != null) {
    appendMyElement (myPlayerWindow, myPlayerPanel);
    styleMyElement (myPlayerVideo, '', '', '', '100%', '95%', '', '', '', '', '', '', '', '', '', '', '', '');
    modifyMyElement (myPlayerVideo, 'object', myDefaultVideo, false);
    appendMyElement (myPlayerWindow, myPlayerVideo);
  }
  else {
    showMyMessage ('noload');
  }
}

function cleanMyContent (content, unesc) {
  var myNewContent = content;
  if (unesc) myNewContent = unescape (myNewContent);
  myNewContent = myNewContent.replace (/\\u0025/g,'%');
  myNewContent = myNewContent.replace (/\\u0026/g,'&');
  myNewContent = myNewContent.replace (/\\/g,'');
  myNewContent = myNewContent.replace (/\n/g,'');
  return myNewContent;
}

function getMyContent (urlx, pattern, clean) {
  var myVideosContent;
  var retry = false;
  if (urlx == url) {
    var myPageContent = getMyElement ('body', '', '', '', true);
    if (clean) myPageContent = cleanMyContent (myPageContent, true);
    var myVideosParse = myPageContent.match (pattern);
    myVideosContent = (myVideosParse != null) ? myVideosParse[1] : null;
    if (myVideosContent != null) return myVideosContent;
    else retry = true;
  }
  if (urlx != url || retry) {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', urlx, false);
    xmlHTTP.send();
    if (retry) {
      myPageContent = xmlHTTP.responseText;
      if (clean) myPageContent = cleanMyContent (myPageContent, true);
      myVideosParse = myPageContent.match (pattern);
      myVideosContent = (myVideosParse != null) ? myVideosParse[1] : null;
    }
    else {
      myVideosContent = xmlHTTP.responseXML;
    }
    return myVideosContent;
  }
}

// ==========Messages========== //

// The Script Name
var myScriptName = 'ViewTube';
// The Script Logo
var myScriptLogo = createMyElement ('div', myScriptName, '', '', '', '', '');
styleMyElement (myScriptLogo, '', '', '', '', '', '', '', '0px auto', '10px', '', '', '#666666', '24px', 'center', '#FFFFFF -1px -1px 2px', '', '');
// Contact URL
var myContact = 'http://isebaro.com/contact/?ln=en&sb=viewtube';
// Player Element Is Not Found
var myNoElementMess = 'Couldn\'t get the player element. Please report it <a href="' + myContact + '">here</a>.';
// Video Is Not Found
var myNoVideoMess = 'Couldn\'t get the videos. Please report it <a href="' + myContact + '">here</a>.';
// Video Is Not Loading
var myNoLoadMess = 'If the video doesn\'t load, please report it <a href="' + myContact + '">here</a>.';
// My Script Messages
var myScriptMess = createMyElement ('div', '', '', '', '', '', '');
styleMyElement (myScriptMess, '', '', '', '', '', '1px solid #F4F4F4', '', '5px auto 5px auto', '10px', '', '#FFFFFF', '#AD0000', '', 'center', '', '', '');
// Alert Window
var myScriptAlert = createMyElement ('div', '', '', '', '', '', '');
styleMyElement (myScriptAlert, 'absolute', '30%', '35%', '', '', '1px solid #F4F4F4', '3px', '', '10px', '', '#F8F8F8', '', '14px', 'center', '', '', 99999);
// Add Logo 
appendMyElement (myScriptAlert, myScriptLogo);
// Add Message
modifyMyElement (myScriptMess, 'div', myNoElementMess, false);
appendMyElement (myScriptAlert, myScriptMess);
// Add Button
var myScriptAlertButton = createMyElement ('div', 'OK', 'close', myScriptAlert, '', '', '');
styleMyElement (myScriptAlertButton, '', '', '', '100px', '', '3px solid #EEEEEE', '5px', '0px auto', '', '', '#EEEEEE', '#666666', '18px', '', '#FFFFFF -1px -1px 2px', 'pointer', '');
appendMyElement (myScriptAlert, myScriptAlertButton);



// ==========Websites========== //


// =====YouTube===== //

if (url.indexOf('youtube.com/watch') != -1 || url.indexOf('youtube.com/user') != -1) {

  /* Video Or Channel */
  var ytWatch = (url.indexOf('youtube.com/watch') != -1) ? true : false;
  var ytChannel = (url.indexOf('youtube.com/user') != -1) ? true : false;
  
  /* Hide Flash Messages */
  var ytFlashMess = getMyElement ('div', 'id', 'flash10-promo-div', 0, false);
  if (ytFlashMess != null) {
    styleMyElement (ytFlashMess, '', '', '', '0px', '0px', '0px', '', '', '0px', '', '#FFFFFF', '', '', '', '', '', '');
  }

  /* Get & Replace Player Window */
  if (ytWatch) {
    var ytPlayerWindowContainer = getMyElement ('div', 'id', 'watch-video', 0, false);
    var ytPlayerWindow = getMyElement ('div', 'id', 'watch-player', 0, false);
  }
  if (ytChannel) {
    var ytPlayerWindowContainer = getMyElement ('div', 'id', 'playnav-body', 0, false);
    var ytPlayerWindow = getMyElement ('div', 'id', 'playnav-player', 0, false);
  }
  if (ytPlayerWindowContainer == null || ytPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '')
    styleMyElement (myPlayerWindow, '', '', '', '640px', '363px', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    if (ytWatch) replaceMyElement (ytPlayerWindowContainer, myPlayerWindow, ytPlayerWindow);
    if (ytChannel) {
      modifyMyElement (ytPlayerWindow, 'div', '', true);
      appendMyElement (ytPlayerWindow, myPlayerWindow);
    }

    /* Get Videos Content */
    var ytVideosContent = getMyContent (url, '"url_encoded_fmt_stream_map": "(.*?)"', false);
    
    /* Get Videos */
    if (ytVideosContent != null) {
      ytVideosContent = cleanMyContent (ytVideosContent, false);
      var ytVideoFormats = {'45': '720 WebM', '44': '480 WebM', '43': '360 WebM', '37': '1080 MP4', '22': '720 MP4', '18': '360 MP4', '5': '240 FLV'};
      var ytVideoList = {};    
      var ytVideosURL = ytVideosContent.split(',');
      var ytVideoCodeParse, ytVideoCode, myVideoCode, ytVideo;
      for (var i = 0; i < ytVideosURL.length; i++) {
	ytVideoCodeParse = ytVideosURL[i].match (/itag=(.*?)$/);
	ytVideoCode = (ytVideoCodeParse != null) ? ytVideoCodeParse[1] : null;
	if (ytVideoCode != null) {
	  myVideoCode = ytVideoFormats[ytVideoCode];
	  if (myVideoCode != null) {
	    ytVideoURL = ytVideosURL[i].replace (/url=/, '');
	    ytVideoURL = ytVideoURL.replace (/&quality.*$/, '');
	    ytVideoURL = cleanMyContent (ytVideoURL, true);
	    ytVideoList[myVideoCode] = ytVideoURL;
	  }
	}
      }
      
      /* Create Player */
      var ytVideoDefault = '360 MP4';
      createMyPlayer (ytVideoList, ytVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    }
  }
  
}

// =====DailyMotion===== //

else if (url.indexOf('dailymotion.com/video') != -1) {

  /* Get & Replace Player Window */
  var dmPlayerWindow = getMyElement ('div', 'class', 'dmpi_video_playerv4 span-8', 0, false);
  if (dmPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (dmPlayerWindow, 'div', '', true);
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (dmPlayerWindow, myPlayerWindow);
    
    /* Get Videos Content */
    var dmVideosContent = getMyContent (url, '"videoPluginParameters":\{(.*?)\}', true);

    /* Get Videos */
    if (dmVideosContent != null) {
      var dmVideoFormats = {'sdURL': '360 MP4', 'hqURL': '480 MP4', 'hdURL': '720 MP4'};
      var dmVideoList = {};
      var dmVideoParser, dmVideoParsExp, dmVideoParse, myVideoCode, dmVideo;
      for (var dmVideoCode in dmVideoFormats) {
	dmVideoParser = '"' + dmVideoCode + '":"(.*?)"';
	dmVideoParse = dmVideosContent.match (dmVideoParser);
	dmVideo = (dmVideoParse != null) ? dmVideoParse[1] : null;
	if (dmVideo != null) {
	  myVideoCode = dmVideoFormats[dmVideoCode];
	  dmVideoList[myVideoCode] = dmVideo;
	}
      }

      /* Create Player */
      var dmVideoDefault = '360 MP4';
      createMyPlayer (dmVideoList, dmVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    }
  }
  
}

// =====MetaCafe===== //

else if (url.indexOf('metacafe.com/watch') != -1) {

  /* Get & Replace Player Window */
  var mcPlayerWindow = getMyElement ('div', 'id', 'adaptvDiv', 0, false);
  if (mcPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (mcPlayerWindow, 'div', '', true);
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (mcPlayerWindow, myPlayerWindow);

    /* Get Videos Content */
    var mcVideosContent = getMyContent (url, '"mediaData":"\{(.*?)\}"', true);

    /* Get Videos */
    if (mcVideosContent != null) {
      var mcVideoFormats = {'MP4': '360 MP4', 'highDefinitionMP4': '720 MP4'};
      var mcVideoList = {};
      var mcVideoParser, mcVideoParsExp, mcVideoParse, myVideoCode, mcVideoPath, mcVideoKey, mcVideo;
      for (var mcVideoCode in mcVideoFormats) {
	mcVideoParser = '"' + mcVideoCode + '":.*?"mediaURL":"(.*?)","key":"(.*?)"';
	mcVideoParse = mcVideosContent.match (mcVideoParser);
	mcVideoPath = (mcVideoParse != null) ? mcVideoParse[1] : null;
	mcVideoKey = (mcVideoParse != null) ? mcVideoParse[2] : null;
	if (mcVideoPath != null && mcVideoKey != null) {
	  myVideoCode = mcVideoFormats[mcVideoCode];
	  mcVideo = mcVideoPath + '?__gda__=' + mcVideoKey;
	  mcVideoList[myVideoCode] = mcVideo;
	}
      }

      /* Create Player */
      var mcVideoDefault = '360 MP4';
      createMyPlayer (mcVideoList, mcVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    }
  }
  
}

// =====Vimeo===== //

else if (url.indexOf('vimeo.com') != -1) {

  /* Get & Replace Player Window */
  var viPlayerWindow = getMyElement ('div', 'class', 'f player', 0, false) || null;
  if (viPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (viPlayerWindow, 'div', '', true);
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (viPlayerWindow, myPlayerWindow);

    /* Get Video ID */
    var viVideoID = getMyContent (url, 'player_(.*?)_', false);

    /* Get Videos Content */
    var viVideosContent = getMyContent ('https://vimeo.com/moogaloop/load/clip:' + viVideoID, '', false);

    /* Get Videos */
    if (viVideosContent != null) {
      var viVideoFormats = {'sd': '360 MP4', 'hd': '720 MP4'};
      var viVideoList = {};
      var viVideoisHD = viVideosContent.getElementsByTagName('isHD')[0].textContent;
      var viVideoQ = (viVideoisHD == 1) ? "hd" : "sd";
      var viReqSign = viVideosContent.getElementsByTagName('request_signature')[0].textContent;
      var viReqSignExp = viVideosContent.getElementsByTagName('request_signature_expires')[0].textContent;
      var viVideoPath = 'https://www.vimeo.com/moogaloop/play/clip:' + viVideoID + '/' + viReqSign + '/' + viReqSignExp + '/?q=' + viVideoQ;
      viVideoList[viVideoFormats[viVideoQ]] = viVideoPath;	

      /* Create Player */
      var viVideoDefault = '360 MP4';
      if (viVideoisHD == 1) viVideoDefault = '720 MP4';
      createMyPlayer (viVideoList, viVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    } 
  }
  
}

// =====Break===== //

else if (url.indexOf('break.com') != -1 && document.title.match(/Video$/) != null) {
  
  /* Get & Replace Player Window */
  var brPlayerWindow = getMyElement ('div', 'id', 'playerwrap', 0, false);
  if (brPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (brPlayerWindow, 'div', '', true);
    styleMyElement (brPlayerWindow, '', '', '', '', '360px', '', '', '', '', '', '', '', '', '', '', '', '');
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (brPlayerWindow, myPlayerWindow);
  
    /* Get Videos Content */
    var brVideosContent = getMyContent (url, '(sGlobalFileName=.*?sGlobalToken=\'.*?\')', false);

    /* Get Videos */
    if (brVideosContent != null) {
      var brVideoFormats = {'sGlobalFileName': '240 MP4', 'sGlobalFileNameHD': '480 MP4', 'sGlobalFileNameHDD': '720 MP4'};
      var brVideoList = {};
      var brVideoParser, brVideoParse, myVideoCode, brVideo, brVideoPath, brVideoGlue;
      var brTokenParse = brVideosContent.match (/sGlobalToken='(.*?)'/);
      var brToken = (brTokenParse != null) ? brTokenParse[1] : null;
      for (var brVideoCode in brVideoFormats) {
	brVideoParser = brVideoCode + '=\'(.*?)\'';
	brVideoParse = brVideosContent.match (brVideoParser);
	brVideo = (brVideoParse != null) ? brVideoParse[1] : null;
	if (brVideo != null) {
	  myVideoCode = brVideoFormats[brVideoCode];
	  brVideoGlue = (myVideoCode == '240 MP4') ? '.mp4?' : '?';
	  brVideoPath = brVideo + brVideoGlue + brToken;
	  brVideoList[myVideoCode] = brVideoPath;
	}
      }

      /* Create Player */
      var brVideoDefault = '240 MP4';
      createMyPlayer (brVideoList, brVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    }
  }
  
}

// =====FunnyOrDie===== //

else if (url.indexOf('funnyordie.com/videos') != -1) {
  
  /* Get & Replace Player Window */
  var fodPlayerWindow = getMyElement ('div', 'id', 'video_player', 0, false);
  if (fodPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (fodPlayerWindow, 'div', '', true);
    styleMyElement (fodPlayerWindow, '', '', '', '', '360px', '', '', '', '', '', '', '', '', '', '', '', '');
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (fodPlayerWindow, myPlayerWindow);

    /* Get Videos Content */
    var fodVideosContent = getMyContent (url, '(video_tag =.*mp4)', true);

    /* Get Videos */
    if (fodVideosContent != null) {
      var fodVideoFormats = {'iphone_wifi': '240 MP4', 'ipad': '720 MP4'};
      var fodVideoList = {};
      var fodVideoParser, myVideoCode, fodVideoParse, fodVideo;
      var fodVideos = fodVideosContent.match (/http.*?(\s|$)/g);
      for (var fodVideoCode in fodVideoFormats) {
	for (var i = 0; i < fodVideos.length; i++) {
	  fodVideoParser = 'https.*?' + fodVideoCode + '.mp4';
	  fodVideo = fodVideos[i].match (fodVideoParser);
	  if (fodVideo != null) {
	    myVideoCode = fodVideoFormats[fodVideoCode];
	    fodVideoList[myVideoCode] = fodVideo;
	    break;
	  }
	}
      }

      /* Create Player */
      var fodVideoDefault = '240 MP4';
      createMyPlayer (fodVideoList, fodVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    } 
  }
  
}

// =====Facebook===== //

else if (url.indexOf('facebook.com/video/video') != -1) {

  /* Get & Replace Player Window */
  var fbPlayerWindow = getMyElement ('div', 'class', 'videoStage', 0, false);
  if (fbPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (fbPlayerWindow, 'div', '', true);
    styleMyElement (fbPlayerWindow, '', '', '', '716px', '400px', '0px', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (fbPlayerWindow, myPlayerWindow);

    /* Get Videos Content */
    var fbVideosContent = getMyContent (url, 'try \{window(.*?)\}', true);
    
    /* Get Videos */
    if (fbVideosContent != null) {
      var fbVideoFormats = {};
      var fbVideoList = {};
      var fbVideoHD = (document.title.indexOf ('[HD]') != -1) ? true : false;
      var fbVideoHQ = (document.title.indexOf ('[HQ]') != -1) ? true : false;
      if (fbVideoHD) fbVideoFormats = {'lowqual_src': '240 MP4', 'highqual_src': '720 MP4'};
      else if (fbVideoHQ) fbVideoFormats = {'lowqual_src': '240 MP4', 'highqual_src': '480 MP4'};
      else fbVideoFormats = {'video_src': '360 FLV'};
      var fbVideoParser,fbVideoParse, myVideoCode, fbVideo;
      fbVideosContent = cleanMyContent (fbVideosContent, true);
      for (var fbVideoCode in fbVideoFormats) {
	fbVideoParser = fbVideoCode + '", "(.*?)"';
	fbVideoParse = fbVideosContent.match (fbVideoParser);
	fbVideo = (fbVideoParse != null) ? fbVideoParse[1] : null;
	if (fbVideo != null) {
	  myVideoCode = fbVideoFormats[fbVideoCode];
	  fbVideoList[myVideoCode] = fbVideo;
	}
      }

      /* Create Player */
      var fbVideoDefault = (fbVideoHD || fbVideoHQ) ? '240 MP4' : '360 FLV';
      createMyPlayer (fbVideoList, fbVideoDefault);
    }
    else {
      showMyMessage ('novideo');
    }    
  }
  
}

})();