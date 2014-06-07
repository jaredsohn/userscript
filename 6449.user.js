// ==UserScript==
// @name          Newsgator auto mark read
// @namespace     http://freegarethandrew.org/projects/userScripts/
// @description   An alternative auto mark read feature for Newsgator Online
// @include       http://www.newsgator.*/ngs/subscriber/WebEd2.aspx?fid=*
// ==/UserScript==

var timer = 5;

var oldLink = document.getElementById("btnMarkAllRead");
var oldLink2 = document.getElementById("btnMarkAllRead2");
var text = document.createElement("span");
var text2 = document.createElement("span");
oldLink.parentNode.replaceChild(text, oldLink);
oldLink2.parentNode.replaceChild(text2, oldLink2);

var interval = window.setInterval(onTimer, 1000);
onTimer();

function setText(str){
	text2.innerHTML = text.innerHTML = str;

}

function onTimer(){
	setText("Marking all posts read in "+(--timer)+" seconds <span onclick='window.clearTimeout("+interval+");' style='color: blue; text-decoration: underline'>[cancel]</span>");
	if(timer==0){
		window.clearInterval(interval);
		setText("Marking posts as read");
		markRead();
	}
}

function markRead(){
	var markReadUrl = getMarkReadUrl();
	GM_xmlhttpRequest({
    	method: 'GET',
   		 url: markReadUrl,
    	 onload: function(responseDetails) {
          	   		setText("Marked Read");
          	    }
	});
}

function getMarkReadUrl(){
	var url =window.location.href.replace(/fid=(.*)/, "DAF=$1");
	return url;
}



