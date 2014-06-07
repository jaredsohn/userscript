// ==UserScript==
// @name		LinkTube
// @version		2014.03.21
// @description		Replaces an embedded video with a link to the video page.
// @author		sebaro
// @namespace		https://userscripts.org/users/sebaro
// @downloadURL		https://userscripts.org/scripts/source/119244.user.js
// @updateURL		https://userscripts.org/scripts/source/119244.meta.js
// @icon		http://s3.amazonaws.com/uso_ss/icon/119244/large.png
// @include		*
// @grant		none
// ==/UserScript==


/*
  
  Copyright (C) 2011 - 2014 Sebastian Luncan

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
  
  Website: http://isebaro.com/linktube
  Contact: http://isebaro.com/contact
  
*/


(function() {


// ==========Variables========== //

// Userscript
var userscript = 'LinkTube';

// Contact
var contact = 'http://isebaro.com/contact/?ln=en&sb=linktube';

// Warning
var warning = 'Couldn\'t get the video link. Please report it <a href="' + contact + '">here</a>.';

// Options
var option = {'secure': true};


// ==========Fixes========== //

// Don't run on frames or iframes
if (window.top != window.self)  return;


// ==========Functions========== //

function createMyElement (type, content) {
  var obj = document.createElement(type);
  if (type == 'div') {
    if (content) obj.innerHTML = content;
  }
  return obj;
}

function getMyElement (element, get, tag) {
  var obj;
  if (get == 'parent') obj = element.parentNode;
  else if (get == 'source') obj = element.src;
  else if (get == 'name') obj = element.name;
  else if (get == 'value') obj = element.value;
  else if (get == 'children') obj = element.getElementsByTagName(tag);
  return obj;
}
  
function modifyMyElement (obj, type, content, clear) {
  if (type == 'div') {
    if (content) obj.innerHTML = content;
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

function embedMyLinks (element) {
  var elements;
  if (element == 'iframe') elements = iframeElements;
  else if (element == 'object') elements = objectElements;
  else if (element == 'embed') elements = embedElements;
  var child, parent, video, param, name;
  var foundSite;
  var linkID, videoID, videoLink, videoURL;
  var myScriptLogo = [];
  myScriptLogo[element] = [];
  var myScriptMess = [];
  myScriptMess[element] = [];
  var myLinkWindow = [];
  myLinkWindow[element] = [];
  for (var e = elements.length - 1; e >= 0; e--) {
    foundSite = false;
    child = elements[e];
    parent = getMyElement (child, 'parent', '');
    if (element == 'iframe' || element == 'embed') {
      video = getMyElement (child, 'source', '');
    }
    else if (element == 'object') {
      params = getMyElement (child, 'children', 'param');
      for (var p = 0; p < params.length; p++) {
	name = getMyElement (params[p], 'name', '');
	if (name == 'movie' || name == 'src') {
	  video = getMyElement (params[p], 'value', '');
	  if (!video) video = getMyElement (params[p], 'source', '');
	}
      }
    }
    if (video) {
      for (var l = 0; l < linkParsers.length; l++) {
	if (video.match(linkParsers[l]['source'])) {
	  foundSite = true;
	  linkID = l;
	  break;
	}
      }
    }
    if (foundSite) {
      myScriptLogo[element][e] = createMyElement ('div', userscript);
      styleMyElement (myScriptLogo[element][e], {margin: '0px auto', padding: '10px', color: '#666666', fontSize: '24px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px'});
      myScriptMess[element][e] = createMyElement ('div', '');
      myLinkWindow[element][e] = createMyElement ('div', '');
      appendMyElement (myLinkWindow[element][e], myScriptLogo[element][e]);
      appendMyElement (myLinkWindow[element][e], myScriptMess[element][e]);
      styleMyElement (myLinkWindow[element][e], {width: '100%', height: '100%', backgroundColor: '#F4F4F4'});
      replaceMyElement(parent, myLinkWindow[element][e], child);
      videoID = video.match(linkParsers[linkID]['pattern']);
      videoID = (videoID) ? videoID[1] : null;
      if (videoID) {
	videoURL = linkParsers[linkID]['link'] + videoID;
	if (!option['secure']) videoURL = videoURL.replace(/^https/, 'http');
	videoLink = '<a href="' + videoURL + '">' + videoURL + '</a>';
	styleMyElement (myScriptMess[element][e], {border: '1px solid #F4F4F4', margin: '5px auto 5px auto', padding: '10px', backgroundColor: '#FFFFFF', color: '#00C000', textAlign: 'center'});
	modifyMyElement (myScriptMess[element][e], 'div', videoLink, false);
      }
      else {
	styleMyElement (myScriptMess[element][e], {border: '1px solid #F4F4F4', margin: '5px auto 5px auto', padding: '10px', backgroundColor: '#FFFFFF', color: '#AD0000', textAlign: 'center'});
	modifyMyElement (myScriptMess[element][e], 'div', warning, false);
      }
    }
  }
  
}


// ==========Websites========== //

/* Parsers */
var linkParsers = [
  {'source': 'youtube(.com|-nocookie.com)/embed/(videoseries|\\?list)', 'pattern': 'list=(.*?)(&|$)', 'link': 'https://youtube.com/playlist?list='},
  {'source': 'youtube(.com|-nocookie.com)/embed/', 'pattern': '/embed/(.*?)(\\?|&|$)', 'link': 'https://youtube.com/watch?v='},
  {'source': 'youtube(.com|-nocookie.com)/v/', 'pattern': '/v/(.*?)(\\?|&|$)', 'link': 'https://youtube.com/watch?v='},
  {'source': 'dailymotion.com/embed/', 'pattern': '/video/(.*?)$', 'link': 'https://dailymotion.com/video/'},
  {'source': 'dailymotion.com/swf/(?!video)', 'pattern': '/swf/(.*?)$', 'link': 'https://dailymotion.com/video/'},
  {'source': 'dailymotion.com/swf/(?=video)', 'pattern': '/video/(.*?)$', 'link': 'https://dailymotion.com/video/'},
  {'source': 'vimeo.com/video/', 'pattern': '/video/(.*?)(\\?|&|$)', 'link': 'https://vimeo.com/'},
  {'source': 'vimeo.com/moogaloop', 'pattern': '/moogaloop.swf\\?clip_id=(.*?)(&|$)', 'link': 'https://vimeo.com/'},
  {'source': 'metacafe.com/embed/', 'pattern': '/embed/(.*?)/', 'link': 'https://metacafe.com/watch/'},
  {'source': 'metacafe.com/fplayer/', 'pattern': '/fplayer/(.*?)/', 'link': 'https://metacafe.com/watch/'}, 
  {'source': 'funnyordie.com/embed/', 'pattern': '/embed/(.*?)$', 'link': 'https://funnyordie.com/videos/'}, 
  {'source': 'blip.tv/play/', 'pattern': '/play/(.*?)$', 'link': 'https://blip.tv/players/episode/'}
];

/* IFrame */
var iframeElements = getMyElement (document, 'children', 'iframe');
if (iframeElements.length > 0 ) embedMyLinks ('iframe');

/* Object */
var objectElements = getMyElement (document, 'children', 'object');
if (objectElements.length > 0 ) embedMyLinks ('object');

/* Embed */
var embedElements = getMyElement (document, 'children', 'embed');
if (embedElements.length > 0 ) embedMyLinks ('embed');


})();
