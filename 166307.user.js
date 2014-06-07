// ==UserScript==
// @name		LinkTube
// @version		2012.09.12
// @namespace		sebaro (Ghost_Russia - Video no replace)
// @description		Replaces an embedded video with a link to the video page. + Video no replace
// @include		*
// ==/UserScript==


/*
  
  Copyright (C) 2011 - 2012 Sebastian Luncan

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
  
  Site: http://isebaro.com/linktube
  Contact: http://isebaro.com/contact
  
*/


(function() {

  
// ==========Fixes========== //

// Don't run on frames or iframes
if (window.top != window.self)  return;

 
// ==========Functions========== //

function createMyElement (type, content) {
  var obj = document.createElement(type);
  if (type == 'div') {
    if (content != '') obj.innerHTML = content;
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
    if (content != '') obj.innerHTML = content;
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
parent.appendChild(orphan);
//alert(orphan+' '+child);
  //parent.replaceChild(orphan, child);
}

function embedMyLinks (element) {
  var elements = (element == 'iframe') ? iframeElements : objectElements;
  var child, parent, video, param, name;
  var foundSite = false;
  var videoSite, videoSource, videoIDParser, videoID, videoLink;
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
    if (element == 'iframe') {
      video = getMyElement (child, 'source', '');
    }
    else {
      params = getMyElement (child, 'children', 'param');
      for (var p = 0; p < params.length; p++) {
	name = getMyElement (params[p], 'name', '');
	if (name == 'movie' || name == 'src') {
	  video = getMyElement (params[p], 'value', '');
	  if (!video) video = getMyElement (params[p], 'source', '');
	}
      }
    }
    for (var v = 0; v < videoSites.length; v++) {
      if (element == 'iframe') videoSource = videoSources[videoSites[v] + '-universal'];
      else videoSource = videoSources[videoSites[v] + '-flash'];
      if (video != null) {
	if (video.indexOf(videoSource) != -1) {
	  foundSite = true;
	  videoSite = videoSites[v];
	  break;
	}
      }
    }
    if (foundSite) {
      if (element == 'iframe') videoIDParser = videoSite + '-universal';
      else videoIDParser = videoSite + '-flash';
      getVideoID = video.match (videoIDParsers[videoIDParser]);
      videoID = (getVideoID != null) ? getVideoID[1] : null;
      myScriptLogo[element][e] = createMyElement ('div', myScriptName);
      styleMyElement (myScriptLogo[element][e], '', '', '', '', '', '', '', '0px auto', '10px', '', '', '#666666', '24px', 'center', '#FFFFFF -1px -1px 2px', '', '');
      myScriptMess[element][e] = createMyElement ('div', '');
      myLinkWindow[element][e] = createMyElement ('div', '');
      appendMyElement (myLinkWindow[element][e], myScriptLogo[element][e]);
      appendMyElement (myLinkWindow[element][e], myScriptMess[element][e]);
      styleMyElement (myLinkWindow[element][e], '', '', '', '100%', '100%', '', '', '', '', '', '#F4F4F4', '', '', '', '', '', '');
      replaceMyElement(parent, myLinkWindow[element][e], child);
      if (videoID != null) {
	videoLink = '<a href="' + videoLinks[videoSite] + videoID + '">' + videoLinks[videoSite] + videoID + '</a>';
	styleMyElement (myScriptMess[element][e], '', '', '', '', '', '1px solid #F4F4F4', '', '5px auto 5px auto', '10px', '', '#FFFFFF', '#00C000', '', 'center', '', '', '');
	modifyMyElement (myScriptMess[element][e], 'div', videoLink, false);
      }
      else {
	styleMyElement (myScriptMess[element][e], '', '', '', '', '', '1px solid #F4F4F4', '', '5px auto 5px auto', '10px', '', '#FFFFFF', '#AD0000', '', 'center', '', '', '');
	modifyMyElement (myScriptMess[element][e], 'div', myErrorMess, false);
      }
    }
  }
  
}


// ==========Messages========== //

// The Script Name
var myScriptName = 'LinkTube';
// Contact URL
var myContact = 'http://isebaro.com/contact/?ln=en&sb=linktube';
// Video Is Not Found
var myErrorMess = 'Couldn\'t get the video link. Please report it <a href="' + myContact + '">here</a>.';


// ==========Websites========== //

videoSites = ['youtube', 'youtube-nocookie', 'dailymotion', 'vimeo'];
videoSources = {
  'youtube-universal': 'youtube.com/embed/',
  'youtube-flash': 'youtube.com/v/',
  'youtube-nocookie-universal': 'youtube-nocookie.com/embed/',
  'youtube-nocookie-flash': 'youtube-nocookie.com/v/',
  'dailymotion-universal': 'dailymotion.com/embed/',
  'dailymotion-flash': 'dailymotion.com/swf/',
  'vimeo-universal': 'vimeo.com/video/',
  'vimeo-flash': 'vimeo.com/moogaloop'
};
videoIDParsers = {
  'youtube-universal': '\/embed\/(.*?)(\\?|$)',
  'youtube-flash': '\/v\/(.*?)(\&|$)',
  'youtube-nocookie-universal': '\/embed\/(.*?)(\\?|$)',
  'youtube-nocookie-flash': '\/v\/(.*?)(\&|$)',
  'dailymotion-universal': '\/embed\/video\/(.*?)$',
  'dailymotion-flash': '\/swf\/(.*?)$',
  'vimeo-universal': '\/video\/(.*?)(\\?|$)',
  'vimeo-flash': 'moogaloop\.swf\\?clip_id=(.*?)(\&|$)'
};
videoLinks = {
  'youtube': 'http://youtube.com/watch?v=',
  'youtube-nocookie': 'http://youtube.com/watch?v=',
  'dailymotion': 'http://dailymotion.com/video/',
  'vimeo': 'http://vimeo.com/'
};

/* Universal Player - Embedded with IFrame */

var iframeElements = getMyElement (document, 'children', 'iframe');
if (iframeElements.length > 0 ) embedMyLinks ('iframe');

/* Flash Player - Embedded with Object */
 
var objectElements = getMyElement (document, 'children', 'object');
if (objectElements.length > 0 ) embedMyLinks ('object');


})();
