// ==UserScript==
// @name Last.fm - Opera: Sort by time
// @namespace
// @description Sort overall top artists by time played.
// @include http://www.last.fm/user/*
// @include http://www.last.fm/user/*/bytime*
// ==/UserScript==

var artDisp = 50;
var statusArea;
var myTempWorkArea;
var username;
var othername;
var theURL;
var timePlayed = new Array();
var nextPtr = new Array();
var prevPtr = new Array();
var XTime = new Array();
var traxPlayed = new Array();
var totalSongs = new Array();
var artistNames = new Array();
var firstLink = 0; var lastLink = 0;
var artLinks;
var trackRows = new Array();
var trackCount = 0;
var periodViewed = "overall";
var tstABC = new Array();
var artistArray = new Object();

// chartDescrip
var chartDescrip = new Object();
chartDescrip["overall"] = "overall";
chartDescrip["year"] = "last 12 months";
chartDescrip["6month"] = "last 6 months";
chartDescrip["3month"] = "last 3 months";
chartDescrip["week"] = "last week";

/* History */
// snyde1:  05/09/2008 First Version
// snyde1:  06/09/2008 Move to 404 page, fix CPU problems
// added track counting
// snyde1:  03.01.2009 fix up tracks, formatting
// snyde1:  10.01.2009 fix sorting
// snyde1:  31-Jul-2009 fix for Opera 10
/* SCRIPT */

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function doArtists() {
	statusArea.innerHTML="Loading your overall top artists";
	theURL = "/user/" + othername + "/charts?rangetype=overall&subtype=artists";
	if (1 != getPageURL(theURL)) {
		statusArea.innerHTML="Error loading data from chart";
		return;
	}
	var newTable = document.createElement("table");
	newTable.setAttribute("class","candyStriped chart");
	statusArea.parentNode.insertBefore(newTable,statusArea.nextSibling);
	artLinks = xpath("//td[@class='subjectCell']/div/a");
	if (artLinks.snapshotLength < 0) {statusArea.innerHTML="Error loading data from chart - no artists found."; return;}
	var realCount = 0;
	statusArea.innerHTML="<H2 class='heading'>Top overall artists by time</H2>The following are your top artists sorted by time played. Times are in minutes of play, an asterisk (*) shows where times are approximate. The information in parentheses is based on your number of plays for that artist.<P>&nbsp;";
	if (artDisp > artLinks.snapshotLength) { artDisp = artLinks.snapshotLength; }
	for (var i = 0; i < artDisp; i++) {
		var artistName = artLinks.snapshotItem(i).href.match(/\/([^\/]*)$/)[1];
		if (1 != getArtLibrary(artistName)) {
			statusArea.innerHTML="Error loading data from library for "+artistName;
			return;
		}
		artLinks.snapshotItem(i).href = "/user/" + othername + "/library/music/"+artistName+"?sortOrder=desc&sortBy=plays";
		var myTimes = xpath("//td[@class='time border']");
		var myPlays = xpath("//td[@class='playcount border']/a");
		var totalTime = 0; var trackTime = 0; var badFlag = 0; var ttSec = "sec"; traxPlayed[i] = 0;
		for(var j=0; j < myTimes.snapshotLength; j++) {
			myPlays.snapshotItem(j).innerHTML = myPlays.snapshotItem(j).innerHTML.replace(/[, ]/g,"");
			if (myTimes.snapshotItem(j).innerHTML.match(/:/)) {
				var trackMin = myTimes.snapshotItem(j).innerHTML.split(/:/)[0];
				var trackSec = myTimes.snapshotItem(j).innerHTML.split(/:/)[1];
				trackTime = 60*parseInt(trackMin)+parseInt(trackSec);
			} else {
				trackTime = 0;
				badFlag += parseInt(myPlays.snapshotItem(j).innerHTML);
			}
			if (isNaN(parseInt(myPlays.snapshotItem(j).innerHTML))) {myPlays.snapshotItem(j).innerHTML = 0; }
			totalTime += parseInt(myPlays.snapshotItem(j).innerHTML)*trackTime;
			traxPlayed[i] += parseInt(myPlays.snapshotItem(j).innerHTML);
		}
		totalSongs[i] = myTimes.snapshotLength;
		XTime[i] = 0;
		if (badFlag > 0) {
			XTime[i] = badFlag * totalTime / (traxPlayed[i] - badFlag);
			XTime[i] = parseInt(XTime[i]+.5);
			totalTime += XTime[i]; ttSec = "sec*";
		}
		if (isNaN(totalTime)) { totalTime = 0; }
		timePlayed[i] = totalTime;
		artistNames[i] = artistName;
		artistArray[artistName] = new Object();
		artistArray[artistName].url = artLinks.snapshotItem(i).href;
		artistArray[artistName].html = artLinks.snapshotItem(i).innerHTML;
		artistArray[artistName].count = myTimes.snapshotLength;
		artistArray[artistName].position = i;
		artistArray[artistName].time = totalTime;
		tstABC[i] = i;
		// ll
		if ((i < 25) || (4 == (i%5))){newTable.innerHTML = makeTable();}
	}
	newTable.innerHTML = makeTable();
}

function getPageURL(myURL) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", myURL, false);
	xmlhttp.send(null);
	if (xmlhttp.readyState!=4) { return(0); }
	var xmlText = xmlhttp.responseText;
	if (! xmlText.match(/<tbody>/i)) { return(0); }
	xmlText = xmlText.split(/<tbody>/i)[1];
	xmlText = xmlText.split(/<\/tbody>/i)[0];
	var chartTab = document.createElement("table");
	chartTab.setAttribute("style","display:none; visibility:hidden;");
	chartTab.innerHTML = xmlText;
	document.getElementById("content").insertBefore(chartTab,myTempWorkArea);
	return(1);
}
function getArtLibrary(artist) {
	var theURL = "/user/" + othername + "/library/music/"+artist+"?sortOrder=desc&sortBy=plays";
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
	if (xmlhttp.readyState!=4) { return(0); }
	var xmlText = xmlhttp.responseText;
	if (!xmlText) {
		return(0);
	}
	if (xmlText.match(/<tbody>/i)) {
		xmlText = xmlText.split(/<tbody>/i)[1];
		xmlText = xmlText.split(/<\/tbody>/i)[0];
	} else {
		return(0);
	}
	myTempWorkArea.innerHTML = "<table id='timeCalcArea'>"+xmlText+"</table>";
	return(1);
}
function makeTable() {
	var j = firstLink; var textBlock=""; var k=1; maxTime = timePlayed[firstLink];
	textBlock = "";
	var tstBCA = tstABC.sort(sortMyArr);
	var maxTime = timePlayed[tstBCA[0]];
	for (var q=0;q<tstBCA.length;q++) { var r = tstBCA[q]; var artNam = artistNames[r];
		var rowType = ""; if (1 == (q%2)) {rowType=" class=\"odd\"";}
		var barWid = parseInt(timePlayed[r]*100/maxTime); if (barWid<20) {barWid = 20;}
		var minuPlay = commatize(parseInt(timePlayed[r]/60));
		var playStr = mTimeStr(timePlayed[r]);
		if (XTime[tstBCA[q]] != 0) {minuPlay += "*";}
		var rankDelta = q - (artistArray[artNam].position); var rankIn = "(&mdash;)";
		if (rankDelta > 0) { rankIn = "<font color=red>&dArr;&nbsp;"+rankDelta+"</font>";}
		if (rankDelta < 0) { rankIn = "<font color=green>&uArr;&nbsp;"+(0-rankDelta)+"</font>";}
		textBlock += "<TR"+rowType+"><TD class=\"positionCell\">"+(q+1)+"</TD><TD class=\"positionCell\">"+rankIn+"</TD>"+
			"<TD class=\"subjectCell\" title=\""+artistArray[artNam].html+", played "+commatize(traxPlayed[r])+" times, for "+playStr+"\"><A HREF='"+artistArray[artNam].url+"'>"+
			artistArray[artNam].html+"</A><span> (#"+(r+1)+" with "+commatize(traxPlayed[r])+" plays)</span></TD>"+
			"<TD class=\"chartbarCell\"><DIV Style=\"width:"+barWid+"%\" class=\"chartbar\"><span>"+minuPlay+"</span></TD></TR>\n";
	}
	return(textBlock);
}
function mTimeStr(newTotTim){
	var secTot = newTotTim % 60; newTotTim = (newTotTim - secTot)/60;
	var minTot = newTotTim % 60; newTotTim = (newTotTim - minTot)/60;
	var hourTt = newTotTim % 24; var dayTot = (newTotTim - hourTt)/24;
	if (hourTt < 10) {hourTt = "0"+hourTt;}
	if (minTot < 10) {minTot = "0"+minTot;}
	if (secTot < 10) {secTot = "0"+secTot;}
	var timPlyStr = dayTot +"d,"+hourTt+":"+minTot+":"+secTot;
	return(timPlyStr);
}
function commatize(number,comma,deci) {
	number = number+"";
	if (!comma) { var comma = ","; }
	if (!deci) { var deci = "."; }
	var numNeg = 0; if (number.match(/^-/)) {numNeg = 1; number = number.replace(/^-/,"");}
	var numdp = number.split(".");
	if (numdp.length == 2) {var decimal = numdp[1];}
	var integer = numdp[0];
	if (integer.length < 4) {
		if (numdp.length == 2) {number = integer + deci + decimal;}
		if (numNeg == 1) { number = "-" + number; }
		return(number);
	}
	var stubFrnt = integer.length % 3;
	if (stubFrnt == 0) {stubFrnt = 3;}
	var newnumber = integer.substr(0,stubFrnt);
	var oldPos = stubFrnt;
	while(oldPos < integer.length ) {
		newnumber = newnumber + comma + integer.substr(oldPos, 3);
		oldPos = oldPos + 3;
	}
	if (numdp.length == 2) {newnumber = newnumber + deci + decimal;}
	if (numNeg 	== 1) {newnumber = "-" + newnumber;}
	return(newnumber);
}
function clearArea(){
	var fourohfour = document.getElementById('fourOhFour');
	fourohfour.innerHTML="";
	statusArea = document.createElement("DIV");
	statusArea.innerHTML = "<H2 class='heading'>Sort by time</H2>";
	fourohfour.insertBefore(statusArea,fourohfour.firstChild);
	var pageTitle = xpath("//title");
	if ( pageTitle.snapshotLength > 0 ) {
		if ( location.href.match(/dotype=artists/i)) {
			var textReplace = "Overall Artists ";
		} else if (location.href.match(/dotype=tracks/i)) {
			var textReplace = "Tracks ";
		}
		pageTitle.snapshotItem(0).innerHTML =
			pageTitle.snapshotItem(0).innerHTML.replace(/users at last.fm/i,textReplace+", sorted by time played.");
	}
	fourohfour.setAttribute("style","width:80%");
	myTempWorkArea = document.createElement("DIV");
	myTempWorkArea.setAttribute("id","myTempWorkArea");
	myTempWorkArea.setAttribute("style","display: none");
	var rightCol = document.getElementById("content");
	rightCol.insertBefore(myTempWorkArea, rightCol.lastChild.nextSibling);
}

function doForm() {
	var formArea = document.createElement("FORM");
	var formText = "";
	formArea.setAttribute("METHOD","GET");
	formText = "<H2 class='heading'>Selection</H2><P>Use this form to select the type and number of items to check. Note that only the \"overall\" period is valid for artists.</P>";
	formText += "Number of entries <INPUT TYPE=\"TEXT\" NAME=\"Number\" Value=\"50\" MAXLENGTH=3>";
	formText += "of type <SELECT NAME=\"DoType\"> <OPTION SELECTED VALUE=\"Artists\"> Artists <OPTION VALUE=\"Tracks\"> Tracks </SELECT>";
	formText += " for the period <SELECT NAME=\"Time\"> <OPTION SELECTED VALUE=\"overall\"> Overall <OPTION VALUE=\"year\"> 12 Month <OPTION  VALUE=\"6month\"> 6 Month <OPTION  VALUE=\"3month\"> 3 Month </SELECT>";
	formText += " <INPUT TYPE='SUBMIT'>";
	formArea.innerHTML = formText;
	document.getElementById('fourOhFour').insertBefore(formArea, document.getElementById('fourOhFour').lastChild.nextSibling)
}

(function() {
	if (!location.href.match(/\/bytime/) ) { // should be on profile
		if (! location.href.match(/user\/[^\/]*$/) ) { return; }
		username = location.href.match(/user\/([^\/]*)$/)[1];
		var addLink = document.createElement("li");
		addLink.innerHTML = "<a href=\"/user/"+username+"/bytime\">Time</a>";
		var addLinkHere = xpath('//ul[@class="visible-menu"]').snapshotItem(0);
		addLinkHere.insertBefore(addLink, addLinkHere.childNodes[5]);
		return;
	}

	username = getLastfmUsername();
	if (username == "") { return; }
	clearArea();
	if (location.href.match(/number=/i)) {
		var numberToGet = location.href.match(/number=([^&$]*)[&$]/i)[1];
		if (! isNaN(parseInt(numberToGet))) {artDisp = parseInt(numberToGet);}
	}
	if (location.href.match(/time=/i)) {
		periodViewed = location.href.match(/time=([^&$]*)$/i)[1];
	}
	othername = location.href.match(/\/user\/([^\/]*)\/bytime/)[1];
	if ( location.href.match(/dotype=artists/i)) {
		doArtists();
	} else if (location.href.match(/dotype=tracks/i)) {
		doTracks();
	}
	if (location.href.match(/\/bytime/i)) {
		doForm();
	}
	return;
})();

function getLastfmUsername() {
	var usernameLink = xpath("//a[contains(@class,'user-badge')]");
	if (usernameLink.snapshotLength > 0) {
		var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
		userNameLoc = userNameLoc.replace(/<[^<>]*>/g,"");
		userNameLoc = userNameLoc.replace(/\s/g,"");
		return(userNameLoc);
	} else {
		return("");
	}
}

function doTracks() {
	var trackArray = new Object();
	statusArea.innerHTML="Loading your top tracks";
	theURL = "/user/" + othername + "/charts?rangetype="+periodViewed+"&subtype=tracks";
	if (1 != getPageURL(theURL)) {
		statusArea.innerHTML="Error loading data from chart";
		return;
	}
	var artistNames = new Array();
	var trackNames = new Array();
	var newTable = document.createElement("table");
	newTable.setAttribute("class","candyStriped chart");
	statusArea.parentNode.insertBefore(newTable,statusArea.nextSibling);
	artLinks = xpath("//td[@class='subjectCell']/div/a");
	var trkLinks = xpath("//td[@class='chartbarCell']/div/a/span");
	if (artLinks.snapshotLength < 0) {statusArea.innerHTML="Error loading data from chart - no artists found."; return;}
	var realCount = 0;
	artDisp = 2*artDisp;
	if (artDisp > artLinks.snapshotLength) { artDisp = artLinks.snapshotLength; }
	for (var i = 0; i < artDisp; i++) {
		var artistName = artLinks.snapshotItem(i).innerHTML;
		i++;
		var trackName = artLinks.snapshotItem(i).innerHTML;
		if (!trackArray[artistName]) {
			trackArray[artistName] = new Object();
			trackArray[artistName].url = "url";
			trackArray[artistName].tracks = new Object();
			trackArray[artistName].tracks[trackName] = new Object();
			trackArray[artistName].tracks[trackName].url = artLinks.snapshotItem(i).href;
			trackArray[artistName].tracks[trackName].count = trkLinks.snapshotItem((i-1)/2).innerHTML.replace(/,/g,"");
			trackArray[artistName].tracks[trackName].position = (i-1)/2;
			trackArray[artistName].tracks[trackName].time = 0;
		} else{
			trackArray[artistName].tracks[trackName] = new Object();
			trackArray[artistName].tracks[trackName].url = artLinks.snapshotItem(i).href;
			trackArray[artistName].tracks[trackName].count = trkLinks.snapshotItem((i-1)/2).innerHTML.replace(/,/g,"");
			trackArray[artistName].tracks[trackName].position = (i-1)/2;
			trackArray[artistName].tracks[trackName].time = 0;
		}
		realCount++;
	}
	statusArea.innerHTML = "";
	for( var i in trackArray) {
		statusArea.innerHTML = "Loading artist: <font color='blue'>"+i+"</font>";
		getArtLibrary(i);
		var myTimes = xpath("//td[@class='time border']");
		var myPlays = xpath("//td[@class='playcount border']");
		var myTrcks = xpath("//td[@class='subject']/span[@class='name']/a");
		for (var j in trackArray[i].tracks ) {
			var k = -1;
			do { k=k+1; } while ((k<myTrcks.snapshotLength) && (j != myTrcks.snapshotItem(k).innerHTML))
			if (k >= myTrcks.snapshotLength) {trackArray[i].tracks[j].time = "0:00";}
			else {trackArray[i].tracks[j].time = myTimes.snapshotItem(k).innerHTML;}
			var trackMin = trackArray[i].tracks[j].time.split(/:/)[0];
			var trackSec = trackArray[i].tracks[j].time.split(/:/)[1];
			trackArray[i].tracks[j].time = 60*parseInt(trackMin)+parseInt(trackSec);
			if (isNaN(trackArray[i].tracks[j].time)) {trackArray[i].tracks[j].time = 0;}
			trackArray[i].tracks[j].totaltime = trackArray[i].tracks[j].time * parseInt(trackArray[i].tracks[j].count);
			trackRows[trackCount] = "<td Class='subjectCell' title=\""+j+", played "+commatize(trackArray[i].tracks[j].count)
			+" times, for "+mTimeStr(trackArray[i].tracks[j].totaltime)+"\"><A HREF="+trackArray[i].tracks[j].url+">"+i+" - "+j+"</A></td>";
			timePlayed[trackCount] = trackArray[i].tracks[j].totaltime;
			trackCount++;
		}
	}
	statusArea.innerHTML = "<H2 class='heading'>Top tracks by time for "+chartDescrip[periodViewed]+"</H2><table>";
	for (var q=0;q<trackCount;q++){
		tstABC[q] = q;
	}
	var tstBCA = tstABC.sort(sortMyArr);
	var maxTime = timePlayed[tstBCA[0]];
	for (var q=0;q<trackCount;q++) {
		var rowType = ""; if (1 == (q%2)) {rowType=" class=\"odd\"";}
		var barWid = parseInt(timePlayed[tstBCA[q]]*100/maxTime); if (barWid<20) {barWid = 20;}
		var minuPlay = commatize(parseInt(timePlayed[tstBCA[q]]/60));
		newTable.innerHTML += "<tr"+rowType+"><td class=\"positionCell\">"+(q+1)+"</td>"+trackRows[tstBCA[q]]
		+ "<TD class=\"chartbarCell\"><DIV Style=\"width:"+barWid+"%\" class=\"chartbar\"><span>"+minuPlay+"</span></TD></TR>\n";
	}
}

function sortMyArr(a, b){
	return( timePlayed[b] - timePlayed[a]);
}