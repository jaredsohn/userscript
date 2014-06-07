// Embedded Video from Links, v 0.1.0 2007-May-06
// Copyright (c) 2007, корнолио
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// Changelog:
// 0.1.0 2007-May-06 -- Original release.
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/firefox/748/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
// --------------------------------------------------------------------
// ==UserScript==
// @name           Embedded Video from Links
// @namespace      http://zlo.rt.mipt.ru
// @description    Add embedded video for corresponding video links
// @include        http://board.rt.mipt.ru/?read=*
// @include        http://zlo.rt.mipt.ru/?read=*
// ==/UserScript==

var videos = [  
  { // YouTube
    reLink : /^(http:\/\/(?:www\.)?youtube\.com\/)watch\?v=(\w+)/,
    replaceString4link : '$1v/$2',
    html4embed : function (flash_url) { return '<object width="425" height="350"> <param name="movie" value="'+ flash_url +'"></param> <param name="wmode" value="transparent"></param> <embed src="'+ flash_url +'" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"> </embed> </object>' }
  },   
  { // Google Video
    reLink : /^(http:\/\/video\.google\.com\/)videoplay\?docid=(-?\d+)/,
    replaceString4link : '$1googleplayer.swf?docId=$2',
    html4embed : function (flash_url) { return '<embed style="width:425px; height:350px;" id="VideoPlayback" type="application/x-shockwave-flash" src="'+ flash_url +'"> </embed>' }
  }, 
]; // end videos[]

function inlineVideo() {
  // find links to video and insert corresponding flash video objects
  var allas = document.getElementsByTagName('a');
  for each(var a in allas) {      
    if (a.href) for each(var v in videos) {
      if (a.href.match(v.reLink)) {
       	//GM_log(a.href);
	objVideo = document.createElement('p');
	objVideo.innerHTML = v.html4embed(a.href.replace(v.reLink, v.replaceString4link));
	a.parentNode.insertBefore(objVideo, a.nextSibling); // insert after the link
	break;	    
      }
    }      
  }    
} // end inlineVideo()

window.addEventListener('load', inlineVideo, false);

