// ==UserScript==
// @name		Last.fm - How old is your music
// @namespace	http://no.name.space/
// @description	Allows user to find their album dates from Last.fm - tribute to pumpkinlll's "How old is your music" service
// @grant none
// @include	http://www.last.fm/user/*
// @include	http://ws.audioscrobbler.com/old_music.html*
// @exclude	http://www.last.fm/user/*/*
// ==/UserScript==

var username = "";
var APIKey = "0d1abf0beae8570e6f8f2441bf561eb3";
var period = "overall" ; // Other options: 7day 1month 3month 6month 12month overall
var count = 50; // 500 max
var totalPlays = 0;
var albumData = new Array();
var DateArray = new Object();
var updateCounter = 0;
var upDate;

var myDte = new Date((new Date()).getTime() + (2*365*24*3600*1000));
var bbcText = "[align=center]";
var bbcAls = "";

(function () {
	if (location.host.match(/ws.audioscrobbler.com/i)) {
 		onASData();
		upDate=self.setInterval(updateYear,1000);
		return;
	}
	else {
		username = location.href.match(/\/user\/(.*)/)[1].replace(/%20/,"+");
		document.getElementById("userBadge").innerHTML += "<DIV ID='SnydeUnique6' ALIGN='center'><A HREF='http://ws.audioscrobbler.com/old_music.html?username="+username+"'>How old is your music?</A></DIV>";
		return;
	}
}) ();

function onASData() {
	username = location.href.match(/old_music.html\?username=(.*)/)[1];
	document.title = "Top albums for "+username+" ("+period+")";
	document.body.innerHTML = "";
	var userreg = new RegExp(">"+username.replace(/\+/," ")+"<","i");
	var myInfo = "http://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&api_key="+APIKey+"&user="+username+"&period="+period+"&limit="+count;
	var xmlhttpMF=new XMLHttpRequest();
	xmlhttpMF.open("GET", myInfo, false);
	xmlhttpMF.send(null);
	var xmlText = xmlhttpMF.responseXML;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	if ((xmlText.getElementsByTagName("lfm")[0].getAttribute("status")).match(/failed/)) { alert("No such user"); return; }
	var allArtists = xmlText.evaluate("//lfm/topalbums/album/artist/name",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var allAlbums = xmlText.evaluate("//lfm/topalbums/album/name",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var allPlays = xmlText.evaluate("//lfm/topalbums/album/playcount",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var allURLs = xmlText.evaluate("//lfm/topalbums/album/url",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var allMBIDs = xmlText.evaluate("//lfm/topalbums/album/mbid",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var allImages = xmlText.evaluate("//lfm/topalbums/album/image[@size='extralarge']",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// Create dsplay table area and insert
	var newTable = document.createElement("div");
	newTable.setAttribute("id","summaryDiv");
	document.body.appendChild(newTable);
	document.getElementById("summaryDiv").innerHTML += "<span align='center'><h1>How old is your music?</h1><h2>Inspired by pumpkinlll's website</h2></span><br>";
	document.getElementById("summaryDiv").innerHTML += "<b>User: </b> "+username+" <b>Period: </b> "+period+" <b>Number of albums: </b> "+count+"<br>";
	var newHR = document.createElement("hr");
	document.body.appendChild(newHR);
	var newTable = document.createElement("table");
	newTable.setAttribute("id","yearTable");
	document.body.appendChild(newTable);
	var newHR = document.createElement("hr");
	document.body.appendChild(newHR);
// Create work table area & insert
	var newTable = document.createElement("table");
	newTable.setAttribute("id","mainTable");
	document.body.appendChild(newTable);
	var theTable = document.getElementById("mainTable");

	addRowMainTable([ "Artist", "Album", "Plays", "Year" ]);
	addRowMainTable([ " ", " ", " ", " " ]);

	if (count > allAlbums.snapshotLength) { count = allAlbums.snapshotLength; }
	for (var i = 0; i < count; i++) {
		var art = new XMLSerializer().serializeToString(allArtists.snapshotItem(i).firstChild);
		var alb = new XMLSerializer().serializeToString(allAlbums.snapshotItem(i).firstChild);

			var url = new XMLSerializer().serializeToString(allURLs.snapshotItem(i).firstChild);
			var encodArt = url.match(/music\/(.*)\//)[1].replace(/\&amp;/ig,"%26").replace(/\&/ig,"%26");
			var encodAlb = url.match(/music\/.*\/(.*)/)[1].replace(/\&amp;/ig,"%26").replace(/\&/ig,"%26");
			var albPlays = parseInt(new XMLSerializer().serializeToString(allPlays.snapshotItem(i).firstChild));
			totalPlays += albPlays;
			var albCover = new XMLSerializer().serializeToString(allImages.snapshotItem(i).firstChild);

		if (allMBIDs.snapshotItem(i).firstChild) {

			var albMBID = new XMLSerializer().serializeToString(allMBIDs.snapshotItem(i).firstChild);
			var artInfo = "http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key="+APIKey+"&artist="+encodArt+"&album="+encodAlb;
			var xmlhttpMF=new XMLHttpRequest();
			xmlhttpMF.open("GET", artInfo, false);
			xmlhttpMF.send(null);
			var xmlText = xmlhttpMF.responseXML;
			if (!xmlText) {
				alert(" No load");
				return;
			}
			var albDate = xmlText.evaluate("//lfm/album/releasedate",xmlText, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (albDate.snapshotLength > 0){
				year = new XMLSerializer().serializeToString(albDate.snapshotItem(0).firstChild);
				if (year.match(/[12][0-9][0-9][0-9], /)) {
					year = year.match(/([12][0-9][0-9][0-9]), /)[1];
					addRowMainTable( [art, "<A HREF="+albCover+">"+alb+"</a>", "<a href='http://www.last.fm/user/"+username+"/library/music/"+encodArt+"/"+encodAlb+"'>"+albPlays+"</a>", "<a href='http://musicbrainz.org/ws/2/release/"+albMBID+"' ID=MBYEARID"+i+">"+year+"</a>" ] );
				} else {
					year ="NoDate";
					addRowMainTable( [art, "<A HREF="+albCover+">"+alb+"</a>", "<a href='http://www.last.fm/user/"+username+"/library/music/"+encodArt+"/"+encodAlb+"'>"+albPlays+"</a>", "<a href='http://musicbrainz.org/ws/2/release/"+albMBID+"' ID=MBYEARID"+i+">"+year+"</a>" ] );
				}
			}else {
				addRowMainTable ([ artInfo, art, alb, "00" ]);
			}
		} else {
			addRowMainTable([art,  "<A HREF="+albCover+">"+alb+"</a>", "<a href='http://www.last.fm/user/"+username+"/library/music/"+encodArt+"/"+encodAlb+"'>"+albPlays+"</a>", "<a name='NULL' ID=MBYEARID"+i+">No MBID</a>"]); year= "NoMBID"; albMBID = "No MBID";
		}
// Add album object to array : artist, album, last.fm.URL, MBID, picture URL, year
		albumData[i] = new Object;
		albumData[i].plays = albPlays;
		albumData[i].year = year;
		albumData[i].album = alb;
		albumData[i].artist = art;
		albumData[i].lfmurl = url;
		albumData[i].MBID = albMBID;
		albumData[i].cover = albCover;

	}
	return;
}

function updateYear() {
	var i = updateCounter; updateCounter++;

	if (updateCounter >= count) {
		upDate=window.clearInterval(upDate);
	}

	// Get MBID for current album - if available, else incrememnt updateCounter, return
	var myMBID = albumData[i].MBID;
	if (myMBID != "No MBID") { // alert("No MBID "+ i);
		var lmfaMatch = new RegExp("lmfa."+myMBID+"=([^;]*)\;");
		if (document.cookie.match(lmfaMatch)) {			
			MByear = document.cookie.match(lmfaMatch)[1];
		} else {
			// fetch information from musicbrainz
			myURL = "http://musicbrainz.org/ws/2/release/"+myMBID;
			var myxmlhttpMF=new XMLHttpRequest();
			myxmlhttpMF.open("GET", myURL, false);
			myxmlhttpMF.send(null);
			var xmlText = myxmlhttpMF.responseXML;
			if (!xmlText) {
				alert(" No load");
				return;
			}
			// get release year - available as \\release\date
			var MBalbRecord = new XMLSerializer().serializeToString(xmlText); var MByear = "NoDate";
			if (MBalbRecord.match(/<date>([0-9]*).*<.date>/i)) {
				MByear = MBalbRecord.match(/<date>([0-9]*).*<.date>/i)[1];
				if (MByear.match(/([12][0-9][0-9][0-9])-.*/)) {MByear = MByear.match(/([12][0-9][0-9][0-9])-.*/)[1];}
			}
			document.cookie = "lmfa."+myMBID+"="+MByear+"; expires="+myDte.toGMTString();
		}
		if (MByear != "NoDate") {
			albumData[i].year = MByear;
		// refresh list
			document.getElementById("MBYEARID"+i).text = MByear;
			document.getElementById("MBYEARID"+i).setAttribute("style","color:red;");
		}
	}
	// increment updateCounter
	// if past maximum then:
	// upDate=window.clearInterval(upDate)
	if (updateCounter >= count) {
		displayDates();
		return;
	}
}

function displayDates(){
	addRowYearTable([ "Year", "Plays", "Albums" ]);
	var yearSum = 0; var yearSumTot=0; var maxYearSum = 0;
	var yearPlayCount = new Object();
	for (var i =0; i < count; i++) {
		var year = albumData[i].year;
// Add array index to year, if new year, create it
		if (! DateArray[year] ) { DateArray[year] = new Array(); DateArray[year][0] = i; }
		else {DateArray[year].push(i); }
	}
	document.body.innerHTML += "Done<br>There are "+totalPlays+" plays in this list.<br><hr>";

	var dateKeys = new Array(); dateKeys =(Object.keys(DateArray).sort());
	for (var dK =0; dK < dateKeys.length; dK++) { var playSum = 0; var albumList =""; var bbcAlsLoc = ""; var k = dateKeys[dK];
		for(var j=0; j<DateArray[k].length; j++) {
			var ndx = DateArray[k][j];
			albumList += " <a href='"+albumData[ndx].lfmurl+"'><img src='"+albumData[ndx].cover+"' width='50px'></img></a> &nbsp; ";
			playSum += albumData[ndx].plays;
			bbcAlsLoc += " [url="+albumData[ndx].lfmurl+"][img w=50]"+albumData[ndx].cover+"[/img][/url] ";
		}
		yearPlayCount[k] = playSum;
		if ((k >500) && (k < 9999)) {
			yearSumTot += playSum;
			yearSum += (playSum*k);
			if (playSum > maxYearSum) { maxYearSum = playSum; }
		}
		addRowYearTable([k,"("+playSum+" plays, or "+(Math.round(playSum*10000/totalPlays)/100)+"%)", albumList]);
		bbcAls += "[b]"+k+"[/b] : "+(Math.round(playSum*10000/totalPlays)/100)+"% "+bbcAlsLoc+"<BR />";
	}
	var maxFont = 30, minFont = 6, sizFont;
	for (var dK =0; dK < dateKeys.length; dK++) {var k =  dateKeys[dK];
		if ((k >500) && (k < 9999)) {
			sizFont = Math.round(maxFont*yearPlayCount[k]/maxYearSum); if (sizFont < minFont) { sizFont = minFont; }
			document.getElementById("summaryDiv").innerHTML += "<span style='font-size:"+sizFont+"pt'>"+k+"</span> ";
			bbcText += "[size="+sizFont+"]"+k+"[/size] ";
		}
	}
	document.getElementById("summaryDiv").innerHTML += "<br> ("+(Math.round(yearSum/yearSumTot))+" average year)<br><br>";
	//  The BBCode to copy
	document.body.innerHTML += "<br>To brag about the age of your albums on Last.fm, copy the text between the two lines below and copy into your ";
	document.body.innerHTML += "journal or forum post<br><hr>";
	document.body.innerHTML += "<br/>"+bbcText+"<br><br> [size=10]("+(Math.round(yearSum/yearSumTot))+" average year)[/size][/align]<br><br>";
	document.body.innerHTML += bbcAls;
	document.body.innerHTML += "<br><hr><p> </p>";
	return;
}

function addRowMainTable( rowArray ) {
	var tableRow = document.createElement("tr");
	for (var td = 0; td < rowArray.length; td++) {
		var rowElem = document.createElement("td");
		rowElem.innerHTML = rowArray[td];
		tableRow.appendChild(rowElem);
	}
	document.getElementById("mainTable").appendChild(tableRow);
	return;
}
function addRowYearTable( rowArray ) {
	var tableRow = document.createElement("tr");
	for (var td = 0; td < rowArray.length; td++) {
		var rowElem = document.createElement("td");
		rowElem.innerHTML = rowArray[td];
		tableRow.appendChild(rowElem);
	}
	document.getElementById("yearTable").appendChild(tableRow);
	return;
}