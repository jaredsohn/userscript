// ==UserScript==
// @name Last.fm - Who has posted here
// @namespace
// @description Display usernames that posted in a thread.
// @include http://www.last.fm/forum/*/_/*
// @include http://www.last.fm/group/*/forum/*/_/*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
var baseAddr = "";
var harvestedNames = new Object();
var harvestedTypes = new Object();
var harvestedPosts = new Object();
var typeColours = new Object();
var postCount = 0;
typeColours["subscriber"] = "Black";
typeColours["staff"] = "Red";
typeColours["moderator"] = "Orange";
typeColours["user"] = "Blue";
typeColours["alumni"] = "#5336bd";

(function() {
	var addrBits = location.href.split("/");
	var i = 0;
	while (addrBits[i] != "_") { baseAddr += addrBits[i]+"/"; i++; }
		baseAddr += addrBits[i]+"/"+addrBits[i+1]+"/";
	if (location.href.match(/\/NaN/)) { prettyStartPrt(); doPages(); }
	else { fixLink(); }
})();

function doPages() {
	var p = 1; while (getPageURL(baseAddr+""+p)) {prettyPrintHeader(p); p++;}
	prettyPrintFinal(p-1);
}

function fixLink() {
	document.getElementById("topbarForum").innerHTML += "&nbsp; | &nbsp;<A HREF=\""+baseAddr+"NaN\">Count Thread</A> &nbsp; |"
}

function getPageURL(myURL) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", myURL, false);
	xmlhttp.send(null);
	if (xmlhttp.readyState!=4) { return(0); }
	var xmlText = xmlhttp.responseText;
	if (! xmlText.match(/forumComments/)) { return(0); }
	xmlText = xmlText.split(/<ul class="forumComments">/i)[1];
	xmlText = xmlText.split(/<a name="end">/i)[0];
	xmlText = xmlText.replace(/commentUserDetails/g,"extractTheUserDetails");
	var allUserNames = xmlText.match(/<li class="userName">[^<]*(<a href="[^"]*">([^<]*)<\/a>|Deleted user)[^<]*<span>said...<\/span>/gm);
	var allTypes = xmlText.match(/<li class="userDetails">[^<]*<span class="([^"]*)"><span class="userType">[^<]*<\/span>/gm);
	var allPagePosts = xmlText.match(/<a class="permalinkbutton" href=".*\/forum\/[0-9]*\/_\/[0-9]*\/_\/([0-9]*)">Permalink<\/a>&nbsp/gm);
	var namesList = "";
	for(var i=0;i < allUserNames.length; i++) {
		if (allUserNames[i].match(/>([^<]*)<\/a>/)) {
			q=allUserNames[i].match(/>([^<]*)<\/a>/)[1];
		} else {
			q="[Deleted User]";
		}
		if (! harvestedNames[q]) {harvestedNames[q] = 0; harvestedPosts[q] = ""; harvestedTypes[q] = allTypes[i].match(/<li class="userDetails">[^<]*<span class="([^"]*)">/)[1];}
		harvestedNames[q] = harvestedNames[q] + 1;
		postCount++;
		allPagePosts[i] = allPagePosts[i].replace(/Permalink/g,(""+postCount));
		if (harvestedNames[q] == 1) {
		harvestedPosts[q] = allPagePosts[i];
		} else {
		harvestedPosts[q] += ", " +allPagePosts[i];
		}
	}
	return(1);
}

function prettyStartPrt () {
	document.getElementById("fourOhFour").innerHTML = "<H2>Starting Processing Thread</H2>";
	return(1);
}

function prettyPrintHeader (pgNum) {
	document.getElementById("fourOhFour").innerHTML = "<H2>Page Number "+pgNum+" processed</H2>";
	var totalComments = 0; var totalUsers = 0; for(var k in harvestedNames) { totalUsers++; totalComments += harvestedNames[k]; }
	document.getElementById("fourOhFour").innerHTML  += "There are "+totalComments+" comments, by "+totalUsers+" users.";
	return(1);
}

function prettyPrintFinal (pgNum) {
	document.getElementById("fourOhFour").innerHTML = "<H2>Total counts for <A HREF=\""+baseAddr+"\">this</A> thread</H2>";
	var unSortedUsers = new Array; var uSUC = 0;
	var totalComments = 0; var totalUsers = 0;
	for(var k in harvestedNames) { totalUsers++; totalComments += harvestedNames[k]; unSortedUsers[uSUC] = k; uSUC++}
	document.getElementById("fourOhFour").innerHTML  += "There are "+totalComments+" comments, by "+totalUsers+" users in "+pgNum+" pages.<UL>";
	var retrunText = "";
	var sortedUsers = new Array;
	sortedUsers = unSortedUsers.sort(sortVector);
	for(j=0;j<sortedUsers.length; j++) { k=sortedUsers[j];
		retrunText +=  "<LI>"+(j+1)+",&nbsp;<A  HREF=\"/user/"+k+"\">"+k+"</A>, <Font Color="+typeColours[harvestedTypes[k]]+">"+harvestedTypes[k]+", count = "+harvestedNames[k]+"</Font>: <BR />"+harvestedPosts[k]+"</LI>\n";
	}
	document.getElementById("fourOhFour").innerHTML  += retrunText+"</UL>";
	return(1);
}
function sortVector(a,b) {
	return(harvestedNames[b] - harvestedNames[a]);
}