// ==UserScript==
// @name           GuttenPlug Trottelblock
// @description    Ignores comment trolls on GuttenPlug
// @include        http://de.guttenplag.wikia.com/wiki/*
// ==/UserScript==

/********************************************************************************************/

var WatchTimer;
var blocklist = ['78.43.106.123', '87.164.201.104', '84.46.54.158'];      

initCommentChangeMonitor();
blockTrottel();

/********************************************************************************************/

function blockTrottel() {
//  GM_log('blockstart');
  var divs = document.getElementsByTagName('li');
  for(var i = 0; i < divs.length; i++){
    var s = divs[i].getAttribute('data-user');
    if (s) {
      if (blocklist.indexOf(s) >= 0) {
        GM_log('Trottelblock: ' + s);
        divs[i].innerHTML = 'Trottelblock ' + s;
      }
	 }
  }
//  GM_log('blockstop');
}

/********************************************************************************************/

function initCommentChangeMonitor() {
//  GM_log('start 1');
	var anchors= document.getElementsByTagName('a');
	var nrAnchors = anchors.length;
	for (var i = 0; i < nrAnchors; i++) {
		var a = anchors[i];
		if (a.getAttribute('href').indexOf('#article-comments') >= 0) {
			//GM_log('Callback ' + a.getAttribute('href'));
      a.parentNode.addEventListener("click", WaitToBlock, true);		
		}
	}
}

/********************************************************************************************/

function WaitToBlock() {
//  GM_log('start 2');
	clearInterval(WatchTimer);
	WatchTimer = setInterval(WatchForNewComments, 2000);
}

/********************************************************************************************/
function WatchForNewComments() {
//    GM_log('start 3');
		clearInterval(WatchTimer); 
		blockTrottel();
		initCommentChangeMonitor();
}


