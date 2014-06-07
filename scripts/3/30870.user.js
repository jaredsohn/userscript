// ==UserScript==
// @name		Last.fm - Show landmark tracks
// @namespace	http://no.name.space/
// @description	Allows user to find their "landmark" track plays on Last.fm
// @include	http://www.last.fm/user/*
// @include	http://www.last.fm/user/*/landmark
// @include	http://www.last.fm/user/*/landmark*
// @include	http://www.last.fm/user/*/*
// ==/UserScript==

// 30-Jul-2008 created snyde1
// 31-Jul-2008 fixed lastPage bug
// 31-Jul-2008 new page (landmark)
// 06-Aug-2008 get Firefox on same page
// 01-Oct-2008 change for RT chart changes
// 31-Jul-2009 fix for Opera 10

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var myLandmarkTable;
var lastPage = 0; var tracksOnPage = 0; var tracksOnLastPage = 0;
var myTempWorkArea; var thisUsername; var totalTracks=0;
var myRetVal = new Object; var profileCount = 0;
myRetVal.artist = "";
myRetVal.artistHTML = "";
myRetVal.track = "";
myRetVal.trackHTML = "";
myRetVal.date = "";
myRetVal.number = "";

function getTrackNumber(number) {
	if (parseInt(number) > totalTracks) { return("<tr><td>&nbsp;"+number+"&nbsp;</td><td colspan=3 align=center>&nbsp;You don't have that many</td></tr>");} // More than you have
	var pageOffset = number - tracksOnLastPage;
	var pageToSub = 0; var overLap = 0; var retString; var trackNumPage;
	if (pageOffset < 1) {
		pageToSub = 0;
	} else {
		overLap = pageOffset % 50;
		if (overLap == 0) {overLap = 50;}
		pageToSub = (pageOffset - overLap) / 50 + 1;
	}
	var lastPage = totalTracks / 50;
	lastPage = parseInt(lastPage);
	if ((totalTracks % 50) > 0) { lastPage++; }
	var pageToLoad = parseInt(lastPage) - parseInt(pageToSub);
	var xmlhttp=new XMLHttpRequest();
	theURL = "/user/" + thisUsername + "/tracks?page="+pageToLoad;
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
			var xmlText = xmlhttp.responseText;
			if (!xmlText) {
				alert(" No load");
				return("<tr><td colspan=4 align=center>&nbsp;No data&nbsp;</td></tr>");
			}
			myTempWorkArea.innerHTML=xmlText;
			tracksOnPageA = xpath("//TABLE[@id='deletablert']/TBODY/TR/TD[@Class='subjectCell']/A");
			tracksOnPage = xpath("//TABLE[@id='deletablert']/TBODY/TR/TD[@Class='subjectCell']");
			tracksAtDate = xpath("//TABLE[@id='deletablert']/TBODY/TR/TD[@Class='dateCell last']/abbr");
			if (pageToSub == 0) {
				trackNumPage = parseInt(tracksOnLastPage) - parseInt(number);
			}else{
				trackNumPage = 50-overLap;
			}
			var stamp = new Date;
			myRetVal.number = number;
			myRetVal.artist = tracksOnPageA.snapshotItem(trackNumPage*2).text;
			myRetVal.artistHTML = tracksOnPageA.snapshotItem(trackNumPage*2).href;
			myRetVal.track = tracksOnPageA.snapshotItem(trackNumPage*2+1).text;
			myRetVal.trackHTML = tracksOnPageA.snapshotItem(trackNumPage*2+1).href;
			myRetVal.date = tracksAtDate.snapshotItem(trackNumPage).title;
			if (navigator.appName.match(/opera/i) || !myRetVal.date.match(/today/i)) {
				stamp.setTime(Date.parse(myRetVal.date));
				var stampText = stamp+"";
				if ( stampText.match(/(^... ... .. ....)/) ) {
					stampText =  stampText.match(/(^... ... .. ....)/)[1];
					myRetVal.date = stampText;
				}
			}
			retString = "<tr><td>&nbsp;"+number+"</td><td>&nbsp;";
			retString += tracksOnPage.snapshotItem(trackNumPage).innerHTML.replace(/<br>/i,"&nbsp;</td><td>&nbsp;");
			retString += "&nbsp;</td><td align=right>&nbsp;"+tracksAtDate.snapshotItem(trackNumPage).innerHTML+"&nbsp;</td></tr>";
			myTempWorkArea.innerHTML="";
			return(retString);
}

function testMyForm() {
	if ((parseInt(document.Landmark.TrackNum.value)-parseInt(document.Landmark.OffSet.value)) > parseInt(totalTracks)) {
		alert(document.Landmark.TrackNum.value+" is more tracks than you have ("+totalTracks+")");
		return(false);
	}
	if (parseInt(document.Landmark.TrackNum.value) <= parseInt(document.Landmark.OffSet.value)) {
		alert(document.Landmark.TrackNum.value+" is less tracks than you have - must be more than "+document.Landmark.OffSet.value);
		return(false);
	}
	myLandmarkTable.setAttribute("style","color: red");
	var newrow = getTrackNumber(document.Landmark.TrackNum.value-document.Landmark.OffSet.value);
	myLandmarkTable.innerHTML += "<tr><td>&nbsp;"+document.Landmark.TrackNum.value+" &nbsp;</td><td>&nbsp;<A HREF=\""+myRetVal.trackHTML+"\">"+myRetVal.track+"</A>&nbsp;</td><td>&nbsp;<A HREF=\""+myRetVal.artistHTML+"\">"+myRetVal.artist+"</A>&nbsp;</td><td>&nbsp;"+myRetVal.date+"</td></tr>";
	myLandmarkTable.innerHTML += "<tr><td colspan = 4>&nbsp;BBcode: Play #"+document.Landmark.TrackNum.value+" was [track artist="+myRetVal.artist+"]"+myRetVal.track+"[/track] by [artist]"+myRetVal.artist+"[/artist] on "+myRetVal.date+"</td></tr>";

	myLandmarkTable.setAttribute("style","color: black");
	return(false);
}
function testGMForm(GMNumber,GMOffset) {
	if ((GMNumber-GMOffset) > parseInt(totalTracks)) {
		alert(GMNumber+" is more tracks than you have ("+totalTracks+")");
		return(false);
	}
	if ((GMNumber-GMOffset) < 1) {
		alert(GMNumber+" is less tracks than you have - must be more than "+GMOffset);
		return(false);
	}
	myLandmarkTable.setAttribute("style","color: red");
	var newrow = getTrackNumber(GMNumber-GMOffset);
	myLandmarkTable.innerHTML += "<tr><td>&nbsp;"+GMNumber+" &nbsp;</td><td>&nbsp;<A HREF='"+myRetVal.trackHTML+"'>"+myRetVal.track+"</A>&nbsp;</td><td>&nbsp;<A HREF='"+myRetVal.artistHTML+"'>"+myRetVal.artist+"</A>&nbsp;</td><td>&nbsp;"+myRetVal.date+"</td></tr>";
	myLandmarkTable.innerHTML += "<tr><td colspan = 4>&nbsp;BBcode: Play #"+GMNumber+" was [track artist="+myRetVal.artist+"]"+myRetVal.track+"[/track] by [artist]"+myRetVal.artist+"[/artist] on "+myRetVal.date+"</td></tr>";

	myLandmarkTable.setAttribute("style","color: black");
	return(false);
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

(function () {
	username = getLastfmUsername();
	if (username == "") { return; }
	var myTempStr = "";
	var re2 = new RegExp("user\\/"+username+"$", "i");	// Is it my page or another's?
	if (location.href.match(re2)) {
		var addLink = document.createElement("li");
		addLink.innerHTML = "<a href=\"/user/"+username+"/landmark\">Landmarks</a>";
		var addLinkHere = document.getElementById("secondaryNavigation");
		addLinkHere.insertBefore(addLink, addLinkHere.lastChild.nextSibling);
		return;
	}
	if (! location.href.match(/\/landmark[^\/]*/)) { return; }
	re2 = new RegExp("user\\/"+username+"\\/landmark", "i");	// Is it my page or another's?
	if (! location.href.match(re2)) { return; }

	myTempWorkArea = document.createElement("DIV");
	myTempWorkArea.setAttribute("id","myTempWorkArea");
	myTempWorkArea.setAttribute("style","display: none");
	var rightCol = document.getElementById("content");
	rightCol.insertBefore(myTempWorkArea, rightCol.lastChild.nextSibling);
	var leftCol = document.getElementById("fourOhFour");
	leftCol.setAttribute("style","width: 75%");
	try {thisUsername = location.href.match(/\user\/([^\/]*)\/landmark/)[1];} catch(e) {return;}
	var myText = "<font size=+1><center>Landmark Tracks</center></font>";
	myText += "<P Align=justify>This page is meant to permit you to find your tracks in the order they were scrobbled. Do not do this while scrobbling, or the order <b>WILL</b> be wrong. ";
	myText += "This is due to the tracks going from newest to oldest, and we are basically counting from the new end. When you scrobble the list gets longer, but the script doesn't know that. ";
	try {if (unsafeWindow) {
		myText += " ";
	}}
	catch(e){
		myText += "Please enter the track number you wish to check in the box below. (If you do not see it shortly, something is wrong.) ";
	}
	myText += "The table will become red while the infomation is loading.</P><P>&nbsp;</P>";

	leftCol.innerHTML = myText;
	// Get profile page
	var xmlhttp=new XMLHttpRequest();
	var theURL = "/user/" + thisUsername;
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
	var xmlText = xmlhttp.responseText;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	myTempWorkArea.innerHTML=xmlText;
	var myTempNodes = xpath("//DIV[@Class='userData']/SPAN[@Class='userPlays']/Strong/SPAN[@Class='count']");
	if (myTempNodes.snapshotLength < 1) {
		profileCount = 0;
	} else {
		try {profileCount = myTempNodes.snapshotItem(0).innerHTML.replace(/[^0-9]/g,"");
		profileCount = parseInt(profileCount); }
		catch(e) { profileCount = 0;}
	}
	myTempWorkArea.innerHTML="";
	// Get first page
	theURL = "/user/" + thisUsername + "/tracks";
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
	xmlText = xmlhttp.responseText;
	if (!xmlText) {
		alert(" No load");
		return;
	}
	myTempWorkArea.innerHTML=xmlText;
	myTempNodes = xpath("//A[@Class='lastpage']");
	if (myTempNodes.snapshotLength < 1) {
		alert("No snaps");
		return;
	}
	for (var i=0; i < myTempNodes.snapshotLength; i++) {
		if (myTempNodes.snapshotItem(i).href.match(/\/tracks.page=/)) {
			lastPage = myTempNodes.snapshotItem(i).innerHTML;
		}
	}
	if (lastPage == 0) { // No pages
		return
	}
	// Get last page
	theURL = "/user/" + thisUsername + "/tracks?page="+lastPage;
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
	var xmlText = xmlhttp.responseText;
	if (!xmlText) {
		alert("No load");
		return;
	}
	myTempWorkArea.innerHTML=xmlText;
	tracksOnPage = xpath("//TABLE[@id='deletablert']/TBODY/TR");
	tracksOnLastPage = tracksOnPage.snapshotLength;
	totalTracks = (parseInt(lastPage)-1)*50+parseInt(tracksOnLastPage);
	if (profileCount == 0) {profileCount = totalTracks}
	if (profileCount < totalTracks) {profileCount = totalTracks}
	if (profileCount > totalTracks) {
		myText = "<P Align=justify>You have "+(profileCount - totalTracks)+" more tracks on your profile page than in your recent tracks. If you want to start numbering from ";
		myText += "the start of your profile tracks, leave the offset as it is below. If you want to start from the beginning of your \"recent tracks\", ";
		myText += "change the offset to 0.";
		myText += "</P><P>&nbsp;</P>";
		leftCol.innerHTML += myText;
	}
	try {if (unsafeWindow) {
		leftCol.innerHTML += "<P>Please use the Greasemonkey menu commands to change the offset and track.</P><P>&nbsp;</P>";
	}}
	catch(e) {
		leftCol.innerHTML += "<Form Name=\"Landmark\" onSubmit=\"testMyForm(); return(false);\" Action=\"\">";
		leftCol.innerHTML += "Please enter the track number: <Input Type='text' Size=11 Name='TrackNum' > and offset <Input Type='text' Size=7 Name='OffSet' Value='"+(profileCount-totalTracks)+"'>.<input type=SUBMIT></Form><P>&nbsp;";
	}
	myLandmarkTable = document.createElement("DIV");
	myLandmarkTable.setAttribute("id","myLandmarkTable");
	myLandmarkTable.innerHTML= "<table border=1 width='100%'><tbody id='landmarkEntries'></tbody></table><div><br></div>";
	leftCol.insertBefore(myLandmarkTable, leftCol.lastChild.nextSibling);
	if (profileCount == 0) { profileCount = totalTracks; }
	myLandmarkTable = document.getElementById('landmarkEntries');
	myLandmarkTable.innerHTML += "<tr><td align=center colspan=4><b>Landmark Track Plays</b>: Total tracks: "+(totalTracks)+"</td></tr>";
	myLandmarkTable.innerHTML += "<tr><td>&nbsp;Number &nbsp;</td><td>&nbsp;Track Name&nbsp;</td><td>&nbsp;Artist&nbsp;</td><td>&nbsp;Date</td></tr>";
	myTempWorkArea.innerHTML="";
	try {
	if (unsafeWindow) { ;
		GM_setValue("GMNumber",1);
		GM_setValue("GMOffset",profileCount - totalTracks);
		GM_registerMenuCommand("Landmark: Select track", promptForNumber);
		GM_registerMenuCommand("Landmark: Change offset", promptForOffSet);
	} } catch(e) {}
}) ();

function promptForNumber() {
	GM_setValue("GMNumber", prompt("What track number?", GM_getValue("GMNumber")));
	GMNumber=GM_getValue("GMNumber");
	GMOffset=GM_getValue("GMOffset");
	testGMForm(GMNumber,GMOffset);
}
function promptForOffSet() {
	GM_setValue("GMOffset", prompt("What track number?", GM_getValue("GMOffset")));
	GMOffset=GM_getValue("GMOffset");
}