// ==UserScript==
// @name		Last.fm - Show Friends Playcount for Artist
// @namespace	http://no.name.space/
// @description	Allows user to find their unique track, album, artist counts on Last.fm
// @include	http://www.last.fm/music/*
// @include	http://ws.audioscrobbler.com/friendsplays.html*
// @exclude	http://www.last.fm/music/*/*
// ==/UserScript==

var friendLimit = 50; // Maximum number of friends to load
var frPlayList = new Object();
var frList = new Array();

APIKey = "0d1abf0beae8570e6f8f2441bf561eb3";

(function () {
	if (location.host.match(/ws.audioscrobbler.com/i)) { onASFPData(); return; }
	else {
		var artistname = location.href.match(/\/music\/(.*)/)[1];
		var username = getLastfmUsername();
		document.getElementById("catalogueHead").innerHTML += "<p><a href=\"http://ws.audioscrobbler.com/friendsplays.html?username="+username+"&artist="+artistname+"\" style='color:green'>See how many of your friends have played this artist.</a></p>";
		return;
	}
}) ();

function onASFPData() {
	var username = location.href.match(/friendsplays.html\?username=(.*)\&artist=(.*)/)[1];
	var artistname = location.href.match(/friendsplays.html\?username=(.*)\&artist=(.*)/)[2];
	var tbodyID = username+"friends";
	document.title = "Friends plays for "+username;
	document.body.innerHTML = "<DIV><P Id='FAPStatus'>&nbsp;</P><TABLE><TBODY ID='"+tbodyID+"'><TR><TD> Friends name:  &nbsp;</TD><TD ><SPAN Id='uniqueUN'>Plays for <a href=\"http://www.last.fm/music/"+artistname+"\">"+artistname+"</a></SPAN></TD></TR></TBODY></TABLE><DIV Id='restOfIt'></DIV></DIV>";
	document.getElementById("FAPStatus").innerHTML = "Loading the list of your friends.";
	var myInfo = "http://ws.audioscrobbler.com/2.0/?method=user.getFriends&api_key="+APIKey+"&limit="+friendLimit+"&user="+username;
	var xmlhttpMF=new XMLHttpRequest();
	xmlhttpMF.open("GET", myInfo, false);
	xmlhttpMF.send(null);
	var xmlText = xmlhttpMF.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	if ((xmlText.getElementsByTagName("lfm")[0].getAttribute("status")).match(/failed/)) { alert("Failed to load friends."); return; }
	var numFriends = xmlText.getElementsByTagName("friends")[0].getAttribute("total");
	if (numFriends > friendLimit) { alert("Too many friends ("+numFriends+") not all loaded"); }
	var theFriends = xmlText.getElementsByTagName("name");
	var j = 0;
	for(var i=0;i<theFriends.length;i++) {
		var fstring = ""+new XMLSerializer().serializeToString(theFriends[i].firstChild);
		document.getElementById("FAPStatus").innerHTML = "Reading status for number "+(i+1)+" of "+numFriends+ " : ("+fstring+")";
		var fplays = getArtistPlays(fstring,artistname);
		if (fplays != 0) {
			document.getElementById(tbodyID).innerHTML += "<TR><TD><A HREF=http://www.last.fm/user/"+fstring+">"+fstring+"</A></TD><TD Align='Right'><A HREF=http://www.last.fm/user/"+fstring+"/library/music/"+artistname+">"+fplays+"</A></TD></TR>";
			frPlayList[fstring] = fplays;
			frList[j] = fstring;
			j++;
		}
	}
	document.getElementById("FAPStatus").innerHTML = "Done! "+j+" friends, of "+theFriends.length+", have plays.";
	var frListSort = new Array();
	frListSort = frList.sort(sortVector);
	document.getElementById("FAPStatus").innerHTML = "Sorting friends by plays";
	document.getElementById(tbodyID).innerHTML = "<TR><TD> Friends name:  &nbsp;</TD><TD ><SPAN Id='uniqueUN'>Plays for <a href=\"http://www.last.fm/music/"+artistname+"\">"+artistname+"</a></SPAN></TD></TR>";
	for (var i=0; i<frList.length; i++) {
		fstring = frListSort[i]; fplays = frPlayList[fstring];
		document.getElementById(tbodyID).innerHTML += "<TR><TD><A HREF=http://www.last.fm/user/"+fstring+">"+fstring+"</A></TD><TD Align='Right'><A HREF=http://www.last.fm/user/"+fstring+"/library/music/"+artistname+">"+fplays+"</A></TD></TR>";
	}
	if (j > 0) {
		document.getElementById("FAPStatus").innerHTML = "You have "+j+" friends, of "+theFriends.length+", with plays of this artist.";
	} else {
		document.getElementById("FAPStatus").innerHTML = "This artist is not in any of your friends' libraries.";
	}
	var yj = getArtistPlays(username,artistname);
	if (yj >0) {document.getElementById("FAPStatus").innerHTML += "<br>You have <A HREF=http://www.last.fm/user/"+username+"/library/music/"+artistname+">"+yj+"</A> plays of this artist.";}
	return;
}

function getArtistPlays(uname,aname) {
	var myArtPlays = "http://ws.audioscrobbler.com/2.0/?method=user.getArtistTracks&api_key="+APIKey+"&limit=1&artist="+aname+"&user="+uname;
	var xmlhttpAP=new XMLHttpRequest();
	xmlhttpAP.open("GET", myArtPlays, false);
	xmlhttpAP.send(null);
	var xmlText = xmlhttpAP.responseXML;
	if (!xmlText) {
		return(0);
	}
	if ((xmlText.getElementsByTagName("lfm")[0].getAttribute("status")).match(/failed/i)) { return(0); }
	return(xmlText.getElementsByTagName("artisttracks")[0].getAttribute("total"));
}

function getLastfmUsername() {
	var usernameLink = xpath("//a[@id='idBadgerUser']");
	if (usernameLink.snapshotLength > 0) {
		var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
		userNameLoc = userNameLoc.replace(/<[^<>]*>/g,"");
		return(userNameLoc);
	} else {
		return("");
	}
}
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function sortVector(a,b) {
	return(frPlayList[b] - frPlayList[a]);
}