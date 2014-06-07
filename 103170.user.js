// ==UserScript==
// @name          TvNz OnDemand Download Link Generator
// @namespace     
// @description   Script to download from tvnz ondemand
// @include       http://tvnz.co.nz/*
// @include       http://tvnzondemand.co.nz/content/*
// ==/UserScript==

// Author: jamdown
window.addEventListener('load', function() { doLoad(); }, false);

function doLoad() {
	var episodeNum = document.createElement("div");
	var player = document.getElementById("player");
	if(player) {
		for(i = 0; i < player.childNodes.length; i++) {
			if(player.childNodes[i].name == "flashvars") {
				var vars = player.childNodes[i].value;
			}
		}
	}
	if(vars) {
    tempList = vars.split("&");
    for (var i=0;i<tempList.length;i++) {
      var pair = tempList[i].split("=");
      if (pair[0] == "playlist") {
        playlistURI = pair[1];
      }
    }
  }


  if(playlistURI) {
  /* Download SMIL from server */
  GM_xmlhttpRequest({
      method: 'GET', url   : 'http://' + document.domain + playlistURI, onload : completeRequest});
  }
}
 
function completeRequest(r) {
  var parser = new DOMParser();
  var dom = parser.parseFromString(r.responseText, "application/xml");
  var videos = dom.getElementsByTagName('seq');
  var currentChapter = "";
  var links = "";
 
  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];
	var nielsen = video.getElementsByTagName('param')[0].textContent;

    /* Work out chapter number by splitting by doing a RegExp */
    var re = new RegExp("(\"[0-9]\")");
    var chapter = ""; match = re.exec(nielsen); if(match) { chapter = match[1]; }
	chapter = chapter.substring(1, chapter.length-1);
    if(chapter) {
	var chapters = video.getElementsByTagName('video');
	    for(var j = 0; j < chapters.length; j++) {
        var url = chapters[j].getAttribute("src");
        if(url.indexOf("http") > -1) {
          var bitrate = chapters[j].getAttribute("systemBitrate");
          bitrate = Math.ceil(bitrate / 1000) + "k";
          if(chapter != currentChapter) {
            links += "&nbsp;&nbsp;<span> <strong>Chapter " + chapter + ":</strong> ";
          }
          links += "&nbsp;&nbsp;<a href=\"" + url + "\">" + bitrate + "</a>";
 
          if(chapter != currentChapter) {
            currentChapter = chapter;
          }
        }
      }
 
      if(links == "") {
        links += "&nbsp;&nbsp;Sorry, this show can't be downloaded.";
      }
 
    }
  }
 
  if(links != "") {
     var els = document.getElementsByTagName('div');
		for(i = 0; i < els.length; i++) { 
			if(els[i].id == 'show-links') {
			episodeNum =  els[i]; break;
		}
	}
	if(episodeNum) {
      episodeNum.innerHTML = '<div class="rowContentBg"> <div class="rowContent"> <div class="contentInset"> <h2 class="sIFR">DIRECT DOWNLOAD</h2><div class="content footer">' + links + '</div></div></div></div></div><hr /><br />'+ episodeNum.innerHTML;
	}
  }

}