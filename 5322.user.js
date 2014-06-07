// ==UserScript==
// @name           Galbadia Hotel Track Relinker
// @namespace      http://www.x23fallsx.com/scripts
// @description    Removes the need to click each page individually when downloading from GH.
// @include        http://gh.ffshrine.org/soundtracks/*
// ==/UserScript==


function trimString (str) {
  str = this != window? this : str;
  return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}

function getFile(url){
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET",url,false);
  txtFile.send(null);
  return txtFile.responseText;
}

window.addEventListener(
    'load', 
    function() {
	 var trackListURL = document.URL;
	 var urlLen = trackListURL.length;
	 var trackList = document.getElementsByTagName("a");
	 for (var i = 0; i < (trackList.length); i++) {
      thisTrack = trackList[i];
	  if (thisTrack.href.substr(0,urlLen) == trackListURL) {
       var trackPage = thisTrack.href;
 	   var trackURLstr1 = getFile(trackPage);
	   trackURLstr1 = trackURLstr1.split('<a href="http://d3.');
	   var trackURLstr2 = trackURLstr1[1];
	   trackURLstr2 = trackURLstr2.split('">click');
	   var trackURL = trackURLstr2[0];
	   thisTrack.href = 'http://d3.' + trackURL;
	  }
     }
	},
    true);
