// ==UserScript==
// @name			Last.fm Compatibilitizer
// @namespace		http://vestitools.pbworks.com/
// @description		Automatically finds compatibility when you click a last.fm user link, and shows important data with another click
// @include			*
// @exclude			http://www.last.fm/*
// @version			2.0.0
// @copyright		2009+, Andrew Hurle
// ==/UserScript==

//This script is free to use, modify, and freely redistribute for personal use as long as the original author, Andrew Hurle, is credited

//When you click a last.fm profile link, a box will pop up with the usual taste-o-meter
//To visit the link normally, open in another tab (middle mouse button in Firefox 3.5)
//You can highlight the text for easy copying with the highlight button
//Click the more button to see their recent tracks, top artists, top tracks, and Super Eclectic Score
//Hover over a list to see more data
//You must be logged in to last.fm for accurate results

var allUserLinks, thisUserLink;
allUserLinks = document.evaluate(
    '//a[contains(@href, "last.fm/user/")]',
    document.body,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allUserLinks.snapshotLength; i++) {
    thisUserLink = allUserLinks.snapshotItem(i);
	//make sure it's not a link like http://www.last.fm/user/username/library
	if(thisUserLink.href.replace(/^[ \t]+|[ \t]+$/gim,"").replace(/\/$/,"").indexOf("/", thisUserLink.href.replace(/^[ \t]+|[ \t]+$/gim,"").replace(/\/$/,"").indexOf("last.fm/user/")+13)==-1) {
		thisUserLink.setAttribute("onclick", 'return false;' );
		}
	}
	
var loadingIcon = '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';
	
var eqIcon = 'R0lGODlhDAAMALMLAIyMjP///5SUlK2trZycnKWlpbW1tc3NwP/92+Df09rZzf/8yQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQALACwAAAAADAAMAAAEOXAlQytNS409KC9KIXKbKBIoUQRBigqwQLAxDAh0HgA8wPq7X+9H3A2DSJ6gx+wJDs3mYXFYNp+LCAAh+QQFBQALACwCAAMACAADAAAECnDJUuQKweotRAQAIfkEBQUACwAsAgADAAgABAAABAxwyRDkEsJarLsFQAQAIfkEBQUACwAsAgACAAgABQAABAtwyRCkvThjCsClEQAh+QQFBQALACwCAAIACAAFAAAEC3DJMaS9OGMhQsgRACH5BAUFAAsALAIAAwAIAAQAAAQLcMlSpL0yBMwXABEAIfkEBQUACwAsAgAEAAgAAwAABAkwhEXIujjrKyMAIfkEBQUACwAsAgADAAgAAwAABAowhEWrpbIKsWQEACH5BAUFAAsALAIAAwAIAAMAAAQJkJBFq6VC3JUjACH5BAUFAAsALAUABQAFAAEAAAQEMIQlIwAh+QQFBQALACwCAAQACAACAAAECFAIEoK8ot4IADs=';
	
	
document.addEventListener('click', function(event) {

	//left mouse button
	if(event.which==1) {

		for (var i = 0; i < allUserLinks.snapshotLength; i++) {
			thisUserLink = allUserLinks.snapshotItem(i);

			if(event.target==thisUserLink) {
			
				//replace trailing whitespace, then trailing /
				var user = event.target.href.substr(event.target.href.indexOf("/user/")+6).replace(/^[ \t]+|[ \t]+$/gim,"").replace(/\/$/,"");
				
				//make sure it's a valid last.fm username
				if(user.search(/[\s!@#$%&*[()+={}|;:'"<,>.?\/~`\\\^\]]/gi)==-1) {
				
					if(!document.getElementById("compatBox" + user)) {
						
						var compatBox = document.createElement("div");
						compatBox.id = "compatBox" + user;
						compatBox.style.position = "absolute";
						
						compatBox.style.top = event.pageY + 2 + "px";
						compatBox.style.backgroundColor = "#ffffff";
						compatBox.style.border = "2px solid #ababab";
						compatBox.style.fontSize = "11px";
						compatBox.style.fontFamily = '"Lucida Grande",Arial,Helvetica,Verdana,sans-serif';
						compatBox.style.color = '#1B1B1B';
						compatBox.style.lineHeight = "1.18182em";
						compatBox.style.padding = "1px";
						compatBox.style.MozBorderRadius = "4px";
						//compatBox.style.MozBoxShadow = "0px 0px 2px 1px rgba(0,0,0,0.25)";
						compatBox.innerHTML = '<img src="data:image/gif;base64,' + loadingIcon + '">';
						document.body.appendChild(compatBox);
						compatBox = document.getElementById("compatBox" + user);
						compatBox.style.left = event.pageX + "px"; //center
						
						getCompat(user);
						
						}
						
					else document.body.removeChild(document.getElementById("compatBox" + user));
					
					}
			
				}
			
			}
			
			if(event.target.id=="highlightButton") {
				var r1 = document.createRange();
				r1.setStartBefore(event.target.parentNode.parentNode.getElementsByTagName("p")[0]);
				r1.setEndAfter(event.target.parentNode.parentNode.getElementsByTagName("p")[1]);
				window.getSelection().addRange(r1);
				}
				
			else if(event.target.id=="highlightRTButton") {
				var r1 = document.createRange();
				r1.setStartBefore(event.target.parentNode.parentNode.getElementsByTagName("p")[0]);
				r1.setEndAfter(event.target.parentNode.parentNode.getElementsByTagName("ul")[0]);
				window.getSelection().addRange(r1);
				}
				
			else if(event.target.id=="highlightTAButton") {
				var r1 = document.createRange();
				r1.setStartBefore(event.target.parentNode.parentNode.getElementsByTagName("p")[0]);
				r1.setEndAfter(event.target.parentNode.parentNode.getElementsByTagName("table")[0]);
				window.getSelection().addRange(r1);
				}
				
			else if(event.target.id=="highlightTTButton") {
				var r1 = document.createRange();
				r1.setStartBefore(event.target.parentNode.parentNode.getElementsByTagName("p")[0]);
				r1.setEndAfter(event.target.parentNode.parentNode.getElementsByTagName("table")[0]);
				window.getSelection().addRange(r1);
				}
				
			else if(event.target.id=="moreButton") {
			
				event.target.id = "lessButton";
				event.target.innerHTML = "Less";
				if(event.target.parentNode.parentNode.lastChild.tagName!="DIV") {
				
					getRT(event.target.parentNode.parentNode.getElementsByTagName("strong")[0].innerHTML);
					getTA(event.target.parentNode.parentNode.getElementsByTagName("strong")[0].innerHTML);
					getTT(event.target.parentNode.parentNode.getElementsByTagName("strong")[0].innerHTML);
					getSES(event.target.parentNode.parentNode.getElementsByTagName("strong")[0].innerHTML);
				
					event.target.parentNode.parentNode.innerHTML += '<div id="moreContent">' +
					'<div id="recentTracks" style="text-align: center;"><img src="data:image/gif;base64,' + loadingIcon + '"></div>' +
					'<div id="topArtists" style="text-align: center;"><img src="data:image/gif;base64,' + loadingIcon + '"></div>' +
					'<div id="topTracks" style="text-align: center;"><img src="data:image/gif;base64,' + loadingIcon + '"></div>' +
					'<div id="superEclecticScore" style="text-align: center; padding-bottom: 0px;"><img src="data:image/gif;base64,' + loadingIcon + '"></div>' +
					'</div>';
					
					
					
					
					}
					
				else event.target.parentNode.parentNode.lastChild.style.display = "inline";
				
			
				}
				
			else if(event.target.id=="lessButton") {
			
				event.target.id = "moreButton";
				event.target.innerHTML = "More";
				event.target.parentNode.parentNode.lastChild.style.display = "none";
			
				}
				
			else if(event.target.id=="refreshButton") {
			
				getRT(event.target.parentNode.parentNode.getElementsByTagName("strong")[0].innerHTML);
				event.target.style.display = "none";
				event.target.parentNode.innerHTML += '<img src="data:image/gif;base64,' + loadingIcon + '" style="height: 10px; width: 10px;">';
			
				}
		
		}

	}, true);
	
function hideOtherInfo(except) {

	if(typeof except!="string") except = "none";

	if(except!="recentTracksList") {
	
		var allLi = document.getElementById("recentTracksList").childNodes;
		
		for(var i=3; i < allLi.length; i++) {
	
			allLi[i].style.display = "none";
			
			}
	
		}
	
	if(except!="topArtistsList") {
	
		var allTb = document.getElementById("topArtistsList").childNodes;
		
		for(var i=5; i < allTb.length; i++) {
	
			allTb[i].firstChild.style.display = "none";
			
			}
	
		}
		
	if(except!="topTracksList") {
	
		var allTb = document.getElementById("topTracksList").childNodes;
		
		for(var i=5; i < allTb.length; i++) {
	
			allTb[i].firstChild.style.display = "none";
			
			}
	
		}

	}
	
//mouseover listener for showing full info
	
document.addEventListener('mouseover', function(event) {
	
	if((event.target.tagName=="LI") && (event.target.parentNode.id=="recentTracksList")) {
	
		var allLi = event.target.parentNode.childNodes;
		
		for(var i=0; i < allLi.length; i++) {
	
			allLi[i].style.display = "block";
			
			}
			
		hideOtherInfo("recentTracksList");
	
		}
		
	if((event.target.tagName=="TD") && (event.target.parentNode.parentNode.parentNode.id=="topArtistsList")) {
	
		var allTb = event.target.parentNode.parentNode.parentNode.childNodes;
		
		for(var i=0; i < allTb.length; i++) {
	
			allTb[i].firstChild.style.display = "table-row";
			
			}
			
		hideOtherInfo("topArtistsList");
	
		}
		
	if((event.target.tagName=="TD") && (event.target.parentNode.parentNode.parentNode.id=="topTracksList")) {
	
		var allTb = event.target.parentNode.parentNode.parentNode.childNodes;
		
		for(var i=0; i < allTb.length; i++) {
	
			allTb[i].firstChild.style.display = "table-row";
			
			}
			
		hideOtherInfo("topTracksList");
	
		}

	}, false);
	
	
function getRT(_user) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/user/' + _user + '/recenttracks.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml',
			},
		onload: function(details) {
			var myCompatBox, myRTBox; 
			//make sure the compatBox is still there
			if( (myCompatBox = document.getElementById("compatBox" + _user)) && (myRTBox = myCompatBox.lastChild.firstChild) ) {
			
				details.responseXML = new DOMParser().parseFromString(details.responseText, "text/xml");
				myRTBox.style.textAlign = "left";
				myRTBox.innerHTML = '<div style="position: absolute; right: 6px; -moz-user-select: none;">' +
				'<a id="highlightRTButton" style="cursor: pointer;">Highlight</a> | <a id="refreshButton" style="cursor: pointer;">Refresh</a>' +
				'</div>' +
				'<p style="margin-bottom: 4px;"><strong>' + _user + "</strong>'s" + ' <a href="http://www.last.fm/user/' + _user + '/tracks">Recent Tracks</a></p>';
				var myList = document.createElement("ul");
				myList.id = "recentTracksList";
				myList.style.width = "100%";
				myList.style.padding = "0px";
				myList.style.margin = "0px";
				myList.style.listStyle = "none";
				myList.style.borderTop = "1px solid rgb(221, 221, 221)";
					
				function parseUTS(uts) {
				
					var currentTime = new Date();
					var currentUTS = currentTime.getTime(); currentUTS = currentUTS / 1000;
					var diff = currentUTS - uts;
					
					if(diff >= 63072000) return (Math.floor(diff/31536000)) + " years ago";
					else if(diff >= 31536000) return "a year ago";
					else if(diff >= 5256000) return (Math.floor(diff/2628000)) + " months ago";
					else if(diff >= 2628000) return "a month ago";
					else if(diff >= 1209600) return (Math.floor(diff/604800)) + " weeks ago";
					else if(diff >= 604800) return "a week ago";
					else if(diff >= 172800) return (Math.floor(diff/86400)) + " days ago";
					else if(diff >= 86400) return "a day ago";
					else if(diff >= 7200) return (Math.floor(diff/3600)) + " hours ago";
					else if(diff >= 3600) return "an hour ago";
					else if(diff >= 120) return (Math.floor(diff/60)) + " minutes ago";
					else if(diff >= 60) return "a minute ago";
					else if(diff > 0) return "seconds ago";
					else if(diff >= -120) return "now";
					else if(diff < -120) return "in the future";
					else return "sometime";
				
					}
					
				//need to make sure all tags/children exists, especially <album>
				
				var tracks = details.responseXML.getElementsByTagName("track");
				for(var i=0; i < tracks.length; i++) {
				
					var npString = "", defaultDisplay = "", artistURL = "http://www.last.fm/", trackURL = "http://www.last.fm/", artist = "someone", name = "something", album = "that has no name", date = "sometime", time = 9999999999;
				
					if(i>2) defaultDisplay = " display: none;";
				
					//have to put all this stuff in try/catch statement because the node may not exist or may have no content
				
					try {
						if(tracks[i].getAttribute("nowplaying")=="true") npString = ' background: url(data:image/gif;base64,' + eqIcon + ') no-repeat rgb(255, 252, 201) 3px 3px;';
						}
						catch(e) {}
					
					try{
						artistURL = tracks[i].getElementsByTagName("url")[0].firstChild.nodeValue.split("/_/")[0];
						}
						catch(e) {}
					
					try{
						trackURL = tracks[i].getElementsByTagName("url")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						artist = tracks[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						name = tracks[i].getElementsByTagName("name")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						album = tracks[i].getElementsByTagName("album")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						date = tracks[i].getElementsByTagName("date")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						time = parseInt(tracks[i].getElementsByTagName("date")[0].getAttribute("uts"));
						}
						catch(e) {}
					
				
					myList.innerHTML += '<li style="background-color: rgba(235,235,235,' + (i/10) + ');' + npString + defaultDisplay + '"><a href="' + artistURL + '">' + artist + '</a> - <a href="' + trackURL + '" title="On the album ' + album + '">' + name + '</a><div style="position: absolute; right: 10px; display: inline; color: #999999;" title="' + date + ' UTC">' + parseUTS(time) + '</div></li>';
				
					}
					
				myRTBox.appendChild(myList);
				
				myCompatBox.style.left = ((1 - (myCompatBox.offsetWidth / window.innerWidth))*50) + "%"; //recenter
				
				}
			
			}
			
		});
			
	}
	
function getTA(_user) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/user/' + _user + '/topartists.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml',
			},
		onload: function(details) {
			var myCompatBox, myTABox;
			//make sure the compatBox is still there
			if( (myCompatBox = document.getElementById("compatBox" + _user)) && (myTABox = myCompatBox.lastChild.childNodes[1]) ) { 
			
				details.responseXML = new DOMParser().parseFromString(details.responseText, "text/xml");
				myTABox.style.textAlign = "left";
				myTABox.innerHTML = '<div style="position: absolute; right: 6px; -moz-user-select: none;">' +
				'<a id="highlightTAButton" style="cursor: pointer;">Highlight</a>' +
				'</div>' +
				'<p style="margin-bottom: 4px;"><strong>' + _user + "</strong>'s" + ' <a href="http://www.last.fm/user/' + _user + '/charts?rangetype=overall&subtype=artists">Top Artists</p>';
				var myList = document.createElement("table");
				myList.id = "topArtistsList";
				myList.style.width = "100%";
				myList.style.padding = "0px";
				myList.style.margin = "0px";
				myList.align = "left";
				myList.style.borderSpacing = "0";
				myList.style.borderTop = "1px solid rgb(221, 221, 221)";
				
				
			
				var artists = details.responseXML.getElementsByTagName("artist");
				var modLength = artists.length; if(modLength > 15) modLength = 15;
				var topCount = 1;
				for(var i=0; i < modLength; i++) {
				
					var defaultDisplay = "", rank= (i+1), artistURL = "http://www.last.fm/", artist = "someone", playcount = "0";
					
					if(i>4) defaultDisplay = " display: none;";
				
					//have to put all this stuff in try/catch statement because the node may not exist or may have no content
					
					try{
						rank = artists[i].getAttribute("rank");
						}
						catch(e) {}
					
					try{
						artistURL = artists[i].getElementsByTagName("url")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						artist = artists[i].getElementsByTagName("name")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						playcount = parseInt(artists[i].getElementsByTagName("playcount")[0].firstChild.nodeValue);
						if(topCount==1) topCount = playcount;
						}
						catch(e) {}
					
				
					myList.innerHTML += '<tr style="background-color: rgba(235,235,235,' + (i/10) + ');' + defaultDisplay + '"><td title="' + (i+1) + '">' + rank + '</td><td><a href="' + artistURL + '">' + artist + '</a></td><td style="color: #999999;"><div class="chartBar" style="width: ' + ((playcount/topCount) * 100) + '%;"><span>' + playcount + '</span></div></td></tr>';
				
					}
					
				myTABox.appendChild(myList);
				
				myCompatBox.style.left = ((1 - (myCompatBox.offsetWidth / window.innerWidth))*50) + "%"; //recenter
				
				}
			
			}
			
		});
			
	}
	

function getTT(_user) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/user/' + _user + '/toptracks.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml',
			},
		onload: function(details) {
			var myCompatBox;
			//make sure the compatBox is still there
			if( (myCompatBox = document.getElementById("compatBox" + _user)) && (myTTBox = myCompatBox.lastChild.childNodes[2]) ) { 
			
				details.responseXML = new DOMParser().parseFromString(details.responseText, "text/xml");
				myTTBox.style.textAlign = "left";
				myTTBox.innerHTML = '<div style="position: absolute; right: 6px; -moz-user-select: none;">' +
				'<a id="highlightTTButton" style="cursor: pointer;">Highlight</a>' +
				'</div>' +
				'<p style="margin-bottom: 4px;"><strong>' + _user + "</strong>'s" + ' <a href="http://www.last.fm/user/' + _user + '/charts?rangetype=overall&subtype=tracks">Top Tracks</p>';
				var myList = document.createElement("table");
				myList.id = "topTracksList";
				myList.style.width = "100%";
				myList.style.padding = "0px";
				myList.style.margin = "0px";
				myList.align = "left";
				myList.style.borderSpacing = "0";
				myList.style.borderTop = "1px solid rgb(221, 221, 221)";
				
				
			
				var tracks = details.responseXML.getElementsByTagName("track");
				var modLength = tracks.length; if(modLength > 15) modLength = 15;
				var topCount = 1;
				for(var i=0; i < modLength; i++) {
				
					var defaultDisplay = "", rank = (i+1), artistURL = "http://www.last.fm/", artist = "someone", trackURL = "http://www.last.fm/", name = "something", playcount = "0";
					
					if(i>4) defaultDisplay = " display: none;";
				
					//have to put all this stuff in try/catch statement because the node may not exist or may have no content
					
					try{
						rank = tracks[i].getAttribute("rank");
						}
						catch(e) {}
					
					try{
						artistURL = tracks[i].getElementsByTagName("artist")[0].getElementsByTagName("url")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						artist = tracks[i].getElementsByTagName("artist")[0].getElementsByTagName("name")[0].firstChild.nodeValue;
						}
						catch(e) {}
						
					try{
						trackURL = tracks[i].getElementsByTagName("url")[0].firstChild.nodeValue;
						}
						catch(e) {}
						
					try{
						name = tracks[i].getElementsByTagName("name")[0].firstChild.nodeValue;
						}
						catch(e) {}
					
					try{
						playcount = parseInt(tracks[i].getElementsByTagName("playcount")[0].firstChild.nodeValue);
						if(topCount==1) topCount = playcount;
						}
						catch(e) {}
					
				
					myList.innerHTML += '<tr style="background-color: rgba(235,235,235,' + (i/10) + ');' + defaultDisplay + '"><td title="' + (i+1) + '">' + rank + '</td><td><a href="' + artistURL + '">' + artist + '</a> - <a href="' + trackURL + '">' + name + '</a></td><td style="color: #999999;"><div class="chartBar" style="width: ' + ((playcount/topCount) * 100) + '%;"><span>' + playcount + '</span></div></td></tr>';
				
					}
					
				myTTBox.appendChild(myList);
				
				myCompatBox.style.left = ((1 - (myCompatBox.offsetWidth / window.innerWidth))*50) + "%"; //recenter
				
				}
			
			}
			
		});
			
	}
	
function findScore(content) {

	var x = content.indexOf('<center><font size="18"><b>') + 27;
	if(x <= 26) return "0";

	var y = content.indexOf('/', x); 
	if(y == -1) return "0";

	return content.slice(x, y);

	}
	
function getSES(_user) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://anthony.liekens.net/pub/scripts/last.fm/supereclectic.php?user=' + _user,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html, text/plain',
			},
		onload: function(details) {
			var myCompatBox;
			//make sure the compatBox is still there
			if( (myCompatBox = document.getElementById("compatBox" + _user)) ) { 
			
				var score = findScore(details.responseText);
			
				myCompatBox.lastChild.lastChild.innerHTML = '<p><strong>' + _user + '</strong>' + "'s" + ' <a href="http://anthony.liekens.net/pub/scripts/last.fm/supereclectic.php?user=' + _user + '" title="A measurement of a user' + "'s" + ' musical diversity">Super Eclectic Score</a> is <strong><span style="color: hsl(' + (0.255 * parseInt(score) - 20) + ', 90%, ' + ((0.1 * parseInt(score)) / 2 + 30) + '%);">' + score + '</span>/1000</strong></p>';
				
				}
			
			}
			
		});
			
	}
	
	
function getCompat(_user) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.last.fm/user/' + _user + '/tasteomatic',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain, text/html',
			},
		onload: function(details) {
			var myCompatBox;
			//make sure the compatBox is still there, and make sure the response text isn't the error page
			if((myCompatBox = document.getElementById("compatBox" + _user)) && (details.responseText.indexOf("<div")==-1)) { myCompatBox.innerHTML = details.responseText +
			'<div style="position: absolute; top: 5px; right: 6px; -moz-user-select: none;">' +
			'<a id="highlightButton" style="cursor: pointer;">Highlight</a>' +
			' <span style="position: relative; bottom: 1px;">|</span> ' +
			'<a id="moreButton" style="cursor: pointer;">More</a>' +
			'</div>';
			
			//have to fix the library links underneath the compatibility bar
			var allLibraryLinks, thisLibraryLink;
			allLibraryLinks = document.evaluate(
				"//div[@id='compatBox" + _user + "']//a[@href]",
				document.body,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for (var i = 0; i < allLibraryLinks.snapshotLength; i++) {
				thisLibraryLink = allLibraryLinks.snapshotItem(i);
				thisLibraryLink.href = "http://www.last.fm/user/" + thisLibraryLink.href.substr(thisLibraryLink.href.indexOf(_user + "/"));
				}
			
			}
			else myCompatBox.innerHTML = 'Error: User not found';
			//add the style to the div
			var myStyle = document.createElement("style");
			myStyle.type = "text/css";
			myStyle.innerHTML = '#' + myCompatBox.id + ' span.bar {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'-moz-border-radius-bottomleft:3px;' +
			'-moz-border-radius-bottomright:3px;' +
			'-moz-border-radius-topleft:3px;' +
			'-moz-border-radius-topright:3px;' +
			'background:#CCCCCC none repeat scroll 0 0;' +
			'display:block;' +
			'height:8px;' +
			'margin:5px 0;' +
			'overflow:hidden;' +
			'width:100%;' +
			'position:relative;' +
			'}' +
			'#' + myCompatBox.id + ' span.bar span {' +
			'-moz-border-radius-bottomleft:3px;' +
			'-moz-border-radius-bottomright:3px;' +
			'-moz-border-radius-topleft:3px;' +
			'-moz-border-radius-topright:3px;' +
			'display:block;' +
			'height:8px;' +
			'}' +
			'#' + myCompatBox.id + ' span.verylow span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#9A9A9A none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' span.low span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#453E45 none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' span.medium span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#5336BD none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' span.high span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#05BD4C none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' span.veryhigh span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#E9C102 none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' span.super span {' +
			'-moz-background-clip:border;' +
			'-moz-background-inline-policy:continuous;' +
			'-moz-background-origin:padding;' +
			'background:#FF0101 none repeat scroll 0 0;' +
			'}' +
			'#' + myCompatBox.id + ' p {' +
			'margin: 1px;' +
			'padding: 0' + 
			'}' +
			'#' + myCompatBox.id + ' a {' +
			'color:#0187C5;' +
			'outline-color:-moz-use-text-color;' +
			'outline-style:none;' +
			'outline-width:medium;' +
			'text-decoration:none;' +
			'}' +
			'#' + myCompatBox.id + ' #recentTracksList li {' +
			'padding: 2px 3px 3px 17px;' +
			'border: 1px solid rgb(221, 221, 221);' +
			'border-top-width: 0px;' +
			'}' +
			'#' + myCompatBox.id + ' table td {' +
			'padding: 2px 3px 3px 3px;' +
			'border: 1px solid rgb(221, 221, 221);' +
			'border-top-width: 0px;' +
			'}' +
			'#' + myCompatBox.id + ' table td:first-child {' +
			'border-right-width: 0px;' +
			'padding-right: 3px;' +
			'padding-left: 2px;' +
			'text-align: right;' +
			'width: 11px;' +
			'}' +
			'#' + myCompatBox.id + ' table td:nth-child(2) {' +
			'border-left-width: 0px;' +
			'border-right-width: 0px;' +
			'padding-left: 0px;' +
			'width: 5%;' +
			'white-space: nowrap;' +
			'}' +
			'#' + myCompatBox.id + ' table td:last-child {' +
			'border-left-width: 0px;' +
			'padding-left: 20%;' +
			'padding-bottom: 1px;' +
			'padding-top: 1px;' +
			'}' +
			'#' + myCompatBox.id + ' div .chartBar {' +
			'background-color: #71b7e6;' +
			'-moz-border-radius: 0px 3px 3px 0px;' +
			'height: 17px;' +
			'}' +
			'#' + myCompatBox.id + ' div .chartBar span {' +
			'background-color: #71b7e6;' +
			'color: white;' +
			'padding: 0px;' +
			'margin: 2px 3px 0px 3px;' +
			'font-size: 10px;' +
			'position: relative;' +
			'top: 2px;' +
			'-moz-border-radius: 0px 3px 3px 0px;' +
			'}' +
			'#' + myCompatBox.id + ' a:hover {' +
			'text-decoration: underline;' +
			'}' +
			'#' + myCompatBox.id + ' li:hover {' +
			'background-color: #d0f4e0 !important;' +
			'}' +
			'#' + myCompatBox.id + ' tr:hover {' +
			'background-color: #d0f4e0 !important;' +
			'}' +
			'#' + myCompatBox.id + ' #moreContent > div {' +
			'border-width: 0px;' +
			'border-top-width: 1px;' +
			'border-style: dotted;' +
			'border-top-color: #cccccc;' +
			'margin-top: 4px;' +
			'padding: 4px 0px 4px 0px;' +
			'overflow: auto;' +
			'}';
			
			myCompatBox.style.padding = "4px";
			myCompatBox.style.minWidth = "445px";
			
			myCompatBox.appendChild(myStyle);
			myCompatBox.style.left = ((1 - (myCompatBox.offsetWidth / window.innerWidth))*50) + "%"; //recenter

			}
		});

	}
	
