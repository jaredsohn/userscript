// ==UserScript==
// @name		ViewTube (all video format)
// @version		2011.08.05
// @namespace		sebaro
// @description		Watch videos from video sharing websites without the need for Flash Player.
// @include		http://www.youtube.com/*
// @include		http://youtube.com/*
// @include		http://www.dailymotion.com/*
// @include		http://dailymotion.com/*
// @include		 http://www.metacafe.com/*
// @include		http://metacafe.com/*
// @include        http://www.vimeo.com/*
// @include        http://vimeo.com/*
// @include        http://www.blip.tv/*
// @include        http://blip.tv/*
// @include        http://video.google.com/*
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==


(function() {

  
// Don't run on frames or iframes
if (window.top != window.self)  return;

 
// ==========Functions========== //

function createMyElement (type, content, event, target, vidPanel, vidObj, vidURL) {
  var obj = document.createElement(type);
  if (type == 'div') {
    if (content != '') obj.innerHTML = content;
  }
  if (type == 'object') {
    obj.type = 'video/mpeg';
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

function createMyPlayer (videoList, defaultVideo) {
  var myPlayerPanel = createMyElement ('div', '', '', '', '', '', '');
  styleMyElement (myPlayerPanel, '', '', '', '99%', '15px', '', '', '', '3px', '', '#F4F4F4', '#666666', '12px', 'center', '', '', '');
  var myPlayingVideo = createMyElement ('div', myScriptName + ': ' + defaultVideo, '', '', '', '', '');
  styleMyElement (myPlayingVideo, '', '', '', '', '', '', '', '0px 10px', '', 'inline', '', '#336699', '12px', '', '#DDDDDD 0px 1px 1px', '', '');
  appendMyElement (myPlayerPanel, myPlayingVideo);
  var myPlayerVideo = createMyElement ('object', '', '', '', '', '', '');
  var myPanelButtons = [];
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
      myPanelButtons[i] = createMyElement ('div', videoCode, 'video', '', myPlayingVideo, myPlayerVideo, videoPath);
      styleMyElement (myPanelButtons[i], '', '', '', '', '', '3px solid #EEEEEE', '3px', '0px 5px', '', 'inline', '', '', '12px', '', '#DDDDDD 0px 1px 1px', 'pointer', '');
      appendMyElement (myPlayerPanel, myPanelButtons[i]);
    }
  }
  if (myDefaultVideo != null) {
    appendMyElement (myPlayerWindow, myPlayerPanel);
    styleMyElement (myPlayerVideo, '', '', '', '100%', '95%', '', '', '', '', '', '', '', '', '', '', '', '');
    modifyMyElement (myPlayerVideo, 'object', myDefaultVideo, false);
    appendMyElement (myPlayerWindow, myPlayerVideo);
  }
  else {
    appendMyElement (myPlayerWindow, myScriptLogo);
    modifyMyElement (myScriptMess, 'div', myNoLoadMess, false);
    appendMyElement (myPlayerWindow, myScriptMess);
  }
}

function getMyContent (url) {
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, false);
  xmlHTTP.send();
  return xmlHTTP.responseText;
}

function cleanMyContent (content, unesc) {
  var myNewContent = content;
  if (unesc) myNewContent = unescape (myNewContent);
  myNewContent = myNewContent.replace (/\\u0026/g,'&');
  myNewContent = myNewContent.replace (/\\/g,'');
  return myNewContent;
}


// ==========Messages========== //

// The Script Name
var myScriptName = 'ViewTube';
// The Script Logo
var myScriptLogo = createMyElement ('div', myScriptName, '', '', '', '', '');
styleMyElement (myScriptLogo, '', '', '', '', '', '', '', '0px auto', '10px', '', '', '#666666', '24px', 'center', '#FFFFFF -1px -1px 2px', '', '');
// Contact URL
var myContact = 'http://sebaro.co.cc/contact/?ln=en';
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
styleMyElement (myScriptAlert, 'absolute', '30%', '35%', '', '', '1px solid #F4F4F4', '3px', '', '10px', '', '#F8F8F8', '', '', 'center', '', '', 100);
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

if (window.location.href.indexOf('youtube.com/watch') != -1) {

  /* Hide Flash Messages */
  var ytFlashMess = getMyElement ('div', 'id', 'flash10-promo-div', 0, false);
  if (ytFlashMess != null) {
    styleMyElement (ytFlashMess, '', '', '', '0px', '0px', '0px', '', '', '0px', '', '#FFFFFF', '', '', '', '', '', '');
  }

  /* Get & Replace Player Window */
  var ytPlayerWindowContainer = getMyElement ('div', 'id', 'watch-video', 0, false);
  var ytPlayerWindow = getMyElement ('div', 'id', 'watch-player', 0, false);
  if (ytPlayerWindowContainer == null || ytPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '')
    styleMyElement (myPlayerWindow, '', '', '', '640px', '363px', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    replaceMyElement (ytPlayerWindowContainer, myPlayerWindow, ytPlayerWindow);
    
    /* Get Videos Content with body.innerHTML */
    var ytPageContent = getMyElement ('body', '', '', '', true);
    var ytVideosParse = ytPageContent.match (/"url_encoded_fmt_stream_map": "(.*?)"/);
    var ytVideosContent = (ytVideosParse != null) ? ytVideosParse[1] : null;
    
    /* Get Videos Content with xmlHTTPRequest */
    if (ytVideosContent == null) {
      ytPageContent = getMyContent (window.location.href);
      ytVideosParse = ytPageContent.match (/"url_encoded_fmt_stream_map": "(.*?)"/);
      ytVideosContent = (ytVideosParse != null) ? ytVideosParse[1] : null;
    }

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
      appendMyElement (myPlayerWindow, myScriptLogo);
      modifyMyElement (myScriptMess, 'div', myNoVideoMess, false);
      appendMyElement (myPlayerWindow, myScriptMess);
    }
  }
  
}

// =====DailyMotion===== //

else if (window.location.href.indexOf('dailymotion.com/video') != -1) {
      
  /* Get & Replace Player Window */
  var dmPlayerWindow = getMyElement ('div', 'class', 'dmco_html player_box', 0, false);
  if (dmPlayerWindow == null) {
    appendMyElement ('body', myScriptAlert);
  }
  else {
    modifyMyElement (dmPlayerWindow, 'div', '', true);
    var myPlayerWindow = createMyElement ('div', '', '', '', '', '', '');
    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
    appendMyElement (dmPlayerWindow, myPlayerWindow);

    /* Get Videos Content with body.innerHTML */
    var dmPageContent = getMyElement ('body', '', '', '', true);
    dmPageContent = cleanMyContent (dmPageContent, true);    
    var dmVideosParse = dmPageContent.match (/"videoPluginParameters":\{(.*?)\}/);
    var dmVideosContent = (dmVideosParse != null) ? dmVideosParse[1] : null;
    
    /* Get Videos Content with xmlHTTPRequest */
    if (dmVideosContent == null) {
      dmPageContent = getMyContent (window.location.href);
      dmPageContent = cleanMyContent (dmPageContent, true);      
      dmVideosParse = dmPageContent.match (/"videoPluginParameters":\{(.*?)\}/);
      dmVideosContent = (dmVideosParse != null) ? dmVideosParse[1] : null;
    }
    
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
      appendMyElement (myPlayerWindow, myScriptLogo);
      modifyMyElement (myScriptMess, 'div', myNoVideoMess, false);
      appendMyElement (myPlayerWindow, myScriptMess);
    }
  }
  
}

// =====MetaCafe===== //

else if (window.location.href.indexOf('metacafe.com/watch') != -1) {

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

    /* Get Videos Content with body.innerHTML */
    var mcPageContent = getMyElement ('body', '', '', '', true);
    mcPageContent = cleanMyContent (mcPageContent, true);    
    var mcVideosParse = mcPageContent.match (/"mediaData":"\{(.*?)\}"/);
    var mcVideosContent = (mcVideosParse != null) ? mcVideosParse[1] : null;
    
    /* Get Videos Content with xmlHTTPRequest */
    if (mcVideosContent == null) {
      mcPageContent = getMyContent (window.location.href);
      mcPageContent = cleanMyContent (mcPageContent, true);      
      mcVideosParse = mcPageContent.match (/"mediaData":"\{(.*?)\}"/);
      mcVideosContent = (mcVideosParse != null) ? mcVideosParse[1] : null;
    }

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
      appendMyElement (myPlayerWindow, myScriptLogo);
      modifyMyElement (myScriptMess, 'div', myNoVideoMess, false);
      appendMyElement (myPlayerWindow, myScriptMess);
    }
  }
  
}

/* Vimeo */
else if (window.location.href.indexOf('vimeo.com') != -1) {
  var viVideoDivIDParse = document.body.innerHTML.match(/div id="([^($)]*)" class="f player"/);
  var viVideoDivID = (viVideoDivIDParse != null) ? viVideoDivIDParse[1] : null;
  var viVideoIDParse = viVideoDivID.match(/player_([^($)]*)_/);
  var viVideoID = (viVideoIDParse != null) ? viVideoIDParse[1] : null;
  var viXMLParse = 'http://vimeo.com/moogaloop/load/clip:' + viVideoID;
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open("GET",viXMLParse,false);
  xmlHTTP.send();
  viVideoisHD = xmlHTTP.responseXML.getElementsByTagName('isHD')[0].textContent;
  viVideoQ = (viVideoisHD == 1) ? "hd" : "sd";
  viReqSign = xmlHTTP.responseXML.getElementsByTagName('request_signature')[0].textContent;
  viReqSignExp = xmlHTTP.responseXML.getElementsByTagName('request_signature_expires')[0].textContent;
  viVideoPath = 'http://www.vimeo.com/moogaloop/play/clip:' + viVideoID + '/' + viReqSign + '/' + viReqSignExp + '/?q=' + viVideoQ;
  var viVideoDiv = document.getElementById(viVideoDivID);
  viVideoDiv.innerHTML = '<object width="100%" height="100%" data=' + viVideoPath + '></object>';
}

/* Blip */
else if (window.location.href.indexOf('blip.tv') != -1) {
  var blVideoDiv = document.getElementById('video_player');
  var blVideoPath = blVideoDiv.innerHTML.match(/setPrimaryMediaUrl\("([^($)]*)\?referrer/);
  blVideoPath = (blVideoPath != null) ? blVideoPath[1] : null;
  blVideoDiv.innerHTML = '<object width="100%" height="350" data=' + blVideoPath + '></object>';
}

/* Google Video */
else if (window.location.href.indexOf('video.google.com') != -1) {
  document.getElementById('player').style.display = 'none';
  var gvVideoURLParse = document.documentElement.innerHTML.match(/videoUrl\\x3d([^($)]*)\\x26thumbnailUrl/);
  gvVideoURL = (gvVideoURLParse != null) ? unescape(gvVideoURLParse[1]) : null;
  var gvMyVideoPlayer = document.createElement('div');
  gvMyVideoPlayer.style.width = '300px';
  document.getElementById('player-div').appendChild(gvMyVideoPlayer);
  gvMyVideoPlayer.innerHTML = '<object height="100%" width="100%" data=' + gvVideoURL + '></object>';
}

/* Facebook Video */
else if (window.location.href.indexOf('facebook.com') != -1) {
  var fbDocument = document.body.innerHTML;
  fbDocument = fbDocument.replace(/\\u0025/g,'%');
  var fbHQVideoSrc = fbDocument.match(/"highqual_src", "([^($)]*)"/);
  fbHQVideoSrc = (fbHQVideoSrc != null) ? unescape(fbHQVideoSrc[1]) : null;
  if (fbHQVideoSrc != null) {
    fbVideoPath = fbHQVideoSrc;
  }
  else {
    var fbLQVideoSrc = fbDocument.match(/"lowqual_src", "([^($)]*)"/);
    fbLQVideoSrc = (fbLQVideoSrc != null) ? unescape(fbLQVideoSrc[1]) : null;
    if (fbLQVideoSrc != null) {
      fbVideoPath = fbLQVideoSrc;
    }
    else {
      var fbVideoSrc = fbDocument.match(/"video_src", "([^($)]*)"/);
      fbVideoSrc = (fbVideoSrc != null) ? unescape(fbVideoSrc[1]) : null;
      fbVideoPath = fbVideoSrc;
    }
  }
  var fbVideoPlayer = document.getElementById('player');
  fbVideoPlayer.style.width = '716px';
  fbVideoPlayer.style.height = '403px';
  fbVideoPlayer.innerHTML = '<object height="100%" width="100%" data=' + fbVideoPath + '></object>';
}

})();