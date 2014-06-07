// ==UserScript==
// @name		Last.fm - Show unique track counts
// @namespace	http://no.name.space/
// @description	Allows user to find their unique track, album, artist counts on Last.fm
// @include	http://www.last.fm/user/*
// @include	http://ws.audioscrobbler.com/uniquetrack.html*
// @exclude	http://www.last.fm/user/*/*
// ==/UserScript==

var username = "";
APIKey = "0d1abf0beae8570e6f8f2441bf561eb3";

(function () {
	if (location.host.match(/ws.audioscrobbler.com/i)) { onASData(); return; }
	else {
		username = location.href.match(/\/user\/(.*)/)[1];;
		document.getElementById("userBadge").innerHTML += "<DIV ID='SnydeUnique' ALIGN='center'><A HREF='http://ws.audioscrobbler.com/uniquetrack.html?username="+username+"'>Get Unique Data</A></DIV>";
		return;
	}
}) ();

function onASData() {
	var username;
	username = location.href.match(/uniquetrack.html\?username=(.*)/)[1];
	document.title = "Unique counts for "+username;
	document.body.innerHTML = "<DIV><TABLE><TR><TD> Username:  &nbsp;</TD><TD ALIGN='RIGHT'><SPAN Id='uniqueUN'>"+username+"</SPAN></TD></TR><TR><TD>Play Count:  &nbsp;</TD><TD  ALIGN='RIGHT'><SPAN Id='allTrk'>unknown</SPAN></TD></TR><TR><TD>Unique Tracks:  &nbsp;</TD><TD ALIGN='RIGHT'><SPAN Id='uniqueTrk'>unknown</SPAN></TD></TR><TR><TD>Unique Albums:  &nbsp;</TD><TD ALIGN='RIGHT'><SPAN Id='uniqueAlb'>unknown</SPAN></TD></TR><TR><TD>Unique Artists:  &nbsp;</TD><TD ALIGN='RIGHT'><SPAN Id='uniqueArt'>unknown</SPAN></TD></TR></TABLE><DIV Id='restOfIt'></DIV></DIV>";

	var myInfo = "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key="+APIKey+"&user="+username;
	var xmlhttpMF=new XMLHttpRequest();
	xmlhttpMF.open("GET", myInfo, false);
	xmlhttpMF.send(null);
	var xmlText = xmlhttpMF.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	if ((xmlText.getElementsByTagName("lfm")[0].getAttribute("status")).match(/failed/)) { alert("No such user"); return; }
	var allTracks = new XMLSerializer().serializeToString(xmlText.getElementsByTagName("playcount")[0].firstChild);
//	document.getElementById("allTrk").innerHTML=""+allTracks;

	document.getElementById("allTrk").innerHTML="<font color='red'>loading</font>";
	var recTracks = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key="+APIKey+"&user="+username;
	var xmlhttpRR=new XMLHttpRequest();
	xmlhttpRR.open("GET", recTracks, false);
	xmlhttpRR.send(null);
	var xmlText = xmlhttpRR.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	if (!(xmlText.getElementsByTagName("lfm")[0].getAttribute("status")).match(/failed/)) {  // People hiding recent tracks
		var allTracks = (xmlText.getElementsByTagName("recenttracks")[0].getAttribute("total"));
	}
	document.getElementById("allTrk").innerHTML=""+allTracks;

	document.getElementById("uniqueArt").innerHTML="<font color='red'>loading</font>";
	var myTopArtists = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key="+APIKey+"&user="+username;
	var xmlhttpTA=new XMLHttpRequest();
	xmlhttpTA.open("GET", myTopArtists, false);
	xmlhttpTA.send(null);
	var xmlText = xmlhttpTA.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	var uniqueArt =  (xmlText.getElementsByTagName("topartists")[0].getAttribute("total"));
	document.getElementById("uniqueArt").innerHTML=""+uniqueArt;

	document.getElementById("uniqueTrk").innerHTML="<font color='red'>loading</font>";
	var myTopTracks = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&api_key="+APIKey+"&user="+username;
	var xmlhttpTT=new XMLHttpRequest();
	xmlhttpTT.open("GET", myTopTracks, false);
	xmlhttpTT.send(null);
	var xmlText = xmlhttpTT.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	var uniqueTracks = (xmlText.getElementsByTagName("toptracks")[0].getAttribute("total"));
	document.getElementById("uniqueTrk").innerHTML=""+uniqueTracks;

	document.getElementById("uniqueAlb").innerHTML="<font color='red'>loading</font>";
	var myTopAlbums = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&api_key="+APIKey+"&user="+username;
	var xmlhttpTAl =new XMLHttpRequest();
	xmlhttpTAl .open("GET", myTopAlbums, false);
	xmlhttpTAl.send(null);
	var xmlText = xmlhttpTAl.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	var uniqueAlb =  (xmlText.getElementsByTagName("topalbums")[0].getAttribute("total"));
	document.getElementById("uniqueAlb").innerHTML=""+uniqueAlb;

// Calculate tracks / artist ; plays / track
	var TPA = parseInt(uniqueTracks)/parseInt(uniqueArt);
	var APA = parseInt(uniqueAlb)/parseInt(uniqueArt);
	var PPT = parseInt(allTracks)/parseInt(uniqueTracks);
	var PPA = parseInt(allTracks)/parseInt(uniqueArt);
	document.getElementById("restOfIt").innerHTML="<TABLE><TR><TD ALIGN='LEFT'>Albums per artist: &nbsp;</TD><TD ALIGN='RIGHT'>"+APA.toFixed(4)+"</TD></TR><TR><TD ALIGN='LEFT'>Tracks per artist: &nbsp;</TD><TD ALIGN='RIGHT'>"+TPA.toFixed(4)+"</TD></TR><TR><TD ALIGN='LEFT'>Plays per track: &nbsp;</TD><TD ALIGN='RIGHT'>"+PPT.toFixed(4)+"</TD></TR><TR><TD ALIGN='LEFT'>Plays per artist: &nbsp;</TD><TD ALIGN='RIGHT'>"+PPA.toFixed(4)+"</TD></TR></TABLE>";
	return;
}
