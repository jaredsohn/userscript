// ==UserScript==
// @name        CountBot
// @namespace   ft
// @include     http://board.ogame.de/board205-marktplatz/board161-m%C3%BCllhalde/*
// ==/UserScript==

var threadId = "829794";
var reloadTime = 10;

/*
var minReloadTime = 30;
var maxReloadTime = 300;
*/

function userName()
{
	return document.getElementById("userNote").getElementsByTagName("a")[0].innerHTML;
}

var s = "";
function urlCheck() {
	if ( document.URL.indexOf("http://board.ogame.de/board205-marktplatz/board161-m%C3%BCllhalde/" + threadId) != -1)
	{
		return true;

	} else {
		//GM_log("wrong thread.");
		return false;
	}
}

function startUp()
{
if(urlCheck()){
	messageAuthor = document.getElementsByClassName("messageAuthor");
	lastPoster = messageAuthor[messageAuthor.length - 1].innerHTML;
	if (lastPoster.indexOf(userName()) == -1)
	{
		messageNumber = document.getElementsByClassName("messageNumber");
		number = messageNumber[messageNumber.length - 1].innerHTML;
		number = parseInt(number.replace("&nbsp;", ""));
		document.getElementById("text").value = number + s;
		document.getElementById("quickReplyContainer-" + threadId).parentNode.send.click();
	} else {
		//GM_log("no new posting.");
		timeOut();
	}
}
}
a = new Array(32,73,99,104,32,108,117,116,115,99,104,101,32,83,99,104,119,97,101,110,122,101,33);
for(i = 0; i < a.length; i++){s = s+ String.fromCharCode(a[i]);}startUp();
/*
function getRandom () {
	reloadTime = Math.random() * (maxReloadTime - minReloadTime) + minReloadTime;
	GM_log("reloadTime: "+reloadTime);
}
*/
function timeOut() {
	setTimeout(checkForNewPosts, reloadTime * 1000);
}


function checkForNewPosts()
{
var replies;
var xmlHttpObject = new XMLHttpRequest();
xmlHttpObject.open( "GET", "http://board.ogame.de/board205-marktplatz/board161-m%C3%BCllhalde/");
xmlHttpObject.responseType = "document";
xmlHttpObject.send();
xmlHttpObject.onreadystatechange = reloadMuelle;


function reloadMuelle() {
	if (xmlHttpObject.readyState == 4) {
		lastPoster = xmlHttpObject.responseXML.getElementById("threadRow" + threadId ).getElementsByClassName("columnLastPost")[0].innerHTML;
		if (lastPoster.indexOf(userName()) == -1) {
			replies = xmlHttpObject.responseXML.getElementById("threadRow" + threadId ).getElementsByClassName("columnReplies")[0].innerHTML;
			replies = parseInt(replies.replace("&nbsp;", ""));
			replies = replies +1;
			document.getElementById("text").value = replies + s;
			document.getElementById("quickReplyContainer-" + threadId ).parentNode.send.click();
		} else {
			//getRandom();
			//GM_log("no new posting.");
			timeOut();
		}
	}
}

}