// ==UserScript==

// @name        	ViewTube Modded by My_T

// @version     	1.0

// @namespace   	themightydeity

// @description 	Watch videos from video sharing websites without the need for Flash Player.

// @include     	http://www.youtube.com/watch?*

// @include     	http://youtube.com/watch?*



// ==/UserScript==





(function() {



  

// Don't run on frames or iframes

if (window.top != window.self)  return;



// Get URL and OS

var url = window.location.href;

var os = (navigator.platform.indexOf('Win') != -1) ? 'Windows' : 'Linux';

 

// ==========Functions========== //



function createMyElement (type, content, event, target, vidPanel, vidObj, vidURL) {

  var obj = document.createElement(type);

  obj.id = 'youtubeMainVideo';

  if (type == 'div') {

    if (content != '') obj.innerHTML = content;

  }

  if (type == 'object') {

    if (os == 'Windows') obj.type = 'application/x-mplayer2';

    else obj.type = 'video/mpeg';

    if (content != '') obj.data = content;

  }

  if (type == 'video') {

    obj.autoplay = true;

    obj.controls = true;

    if (content != '') obj.src = content;

  }

  obj.addEventListener ('click', function () {

      if (event == 'close') {

	removeMyElement('body', target);

      }

      if (event == 'video') {

	modifyMyElement (vidPanel, 'div', 'Now Playing('+content+')', false);

	modifyMyElement (vidObj, 'video', vidURL, false);

      }

      if(event == 'fallback'){

        fallBackMode();

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

    if (type == 'video') return obj.src;

  }

  else return obj;

}



function modifyMyElement (obj, type, content, clear) {

  if (type == 'div') {

    if (content != '') obj.innerHTML = content;

  }

  if (type == 'video') {

    if (content != '') obj.src = content;

    obj.volume = 0.3;

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

  styleMyElement (myPlayerPanel, '', '', '', '99%', '15px', '', '', '', '3px', '', '#242424', '#FFFFFF', '12px', 'center', '', '', '');

  var myPlayingVideo = createMyElement ('div', 'Now Playing('+defaultVideo+')', '', '', '', '', '');

  styleMyElement (myPlayingVideo, '', '', '', '', '', '', '', '0px 10px', '', 'inline', '', '#EEEEEE', '12px', '', '#DDDDDD 0px 1px 1px', '', '');

  appendMyElement (myPlayerPanel, myPlayingVideo);

  var myPlayerVideo = createMyElement ('video', '', '', '', '', '', '');

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

// FALL BACKMODE BUTTON

      myPanelButton = createMyElement ('div', 'Fallback(Default)', 'fallback', '', '', '', '');

      styleMyElement (myPanelButton, '', '', '', '', '', '3px solid #EEEEEE', '3px', '0px 5px', '', 'inline', '', '', '12px', '', '#DDDDDD 0px 1px 1px', 'pointer', '');

      appendMyElement (myPlayerPanel, myPanelButton);

//FALL BACKMODE END

  if (myDefaultVideo != null) {

    appendMyElement (myPlayerWindow, myPlayerPanel);

    styleMyElement (myPlayerVideo, '', '', '', '100%', '95%', '', '', '', '', '', '', '', '', '', '', '', '');

    modifyMyElement (myPlayerVideo, 'video', myDefaultVideo, false);

    appendMyElement (myPlayerWindow, myPlayerVideo);

  }

  else {

    showMyMessage('noload');

    fallBackMode();

  }

}

function fallBackMode(){

    ytPlayerWindowContainer.innerHTML = "";

    ytPlayerWindowContainer.appendChild(ytPlayerWindow);

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

var myScriptName = 'ViewTube Modded';

// The Script Logo

var myScriptLogo = createMyElement ('div', myScriptName, '', '', '', '', '');

styleMyElement (myScriptLogo, '', '', '', '', '', '', '', '0px auto', '10px', '', '', '#666666', '24px', 'center', '#FFFFFF -1px -1px 2px', '', '');

// Contact URL

var myContact = 'http://themightydeity.com/contact';

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

    styleMyElement (myPlayerWindow, '', '', '', '100%', '100%', '', '', '', '', '', '#242424', '', '', '', '', '', '');

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

      //var ytVideoFormats = {'45': '720 WebM', '44': '480 WebM', '43': '360 WebM', '37': '1080 MP4', '22': '720 MP4', '18': '360 MP4', '5': '240 FLV'};

      var ytVideoFormats = {'45': '720 WebM', '44': '480 WebM', '43': '360 WebM'};

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

      var ytVideoDefault = '360 WebM';

      createMyPlayer (ytVideoList, ytVideoDefault);

    }

    else {

      showMyMessage ('novideo');

    }

  }

  

}

})();