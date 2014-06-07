// ==UserScript==
// @name Last.fm - Opera: Highlight Same Artists - July 2008
// @namespace
// @description Highlights artists that you listen to on other users' profiles.
// @include http://www.last.fm/user/*/charts*
// @include http://www.last.fm/group/*/charts*
// @include http://www.last.fm/place/*/+charts*
// ==/UserScript==

// splitD[x] is location of start of the range highlighted with the appropriate styles[x] element
var splitD = new Array();
var styles = new Array();
var sColour = new Array();
splitD[0] = 0 ;  sColour[0] = "magenta"; styles[0] = "color: magenta;"; // "font-weight: bold;"; //
splitD[1] = 10 ; sColour[1] = "red";     styles[1] = "color: red;"; // "font-weight: bold; text-decoration: underline;"; //
splitD[2] = 25 ; sColour[2] = "orange";  styles[2] = "color: orange;"; // "font-style: italic; font-weight: bold;"; //
splitD[3] = 50 ; sColour[3] = "green";   styles[3] = "color: green;"; // "font-style: italic; font-weight: bold; text-decoration: underline;"; //
splitD[4] = 100 ;sColour[4] = "blue";    styles[4] = "color: blue;"; // "font-style: italic;";  //
splitD[5] = 250 ;sColour[5] = "purple";  styles[5] = "color: purple;"; // "font-style: italic; text-decoration: underline;"; //
var nullStyle = "color: #666; font-weight: normal; text-decoration: none; font-style: none;";

var cutoffCountDefault = 1001;  // Maximum match count
var miniCount = 1;	// Minimum tracks played to use artist
var hideOthers = 0;	// Hide artists not on your list (0=no, 1=yes, 2=hide same)
var useColours = 2;	// use the colour settings (1) or the style settings (2) or both (3)

// chartType:		Which chart to use for data. Options: "overall" "3month" "6month" "year"
var chartType = "3month";

// Don't change variables below here
// ---------------------------------
var chartDescrip = new Object();
chartDescrip["overall"] = "overall";
chartDescrip["year"] = "1 year";
chartDescrip["6month"] = "6 month";
chartDescrip["3month"] = "3 month";
chartDescrip["week"] = "1 week";
var myPan;
var panelHead = "<H2 class='heading'><span class='h2Wrapper'>Highlight Same Artists</SPAN></H2><div id=myPanCont>";
// "<table ><tbody><tr><td><div class=\"h\"><h2>Highlight Same Artists</h2><a href=\"javascript:;\" class=\"tog collapseTog\" title=\"Collapse Panel\" onclick=\"return collapseBox('hiLightPan', this);\" onfocus=\"blur();\"></a></div><div class=\"c\"><div id=myPanCont>";
var panelTail = "</div></div><div class=\"f\"><div id=myPanTailer></div><span class=\"iesucks\">&nbsp;</span></div></td></tr></tbody></table>";
var currentChart;
var username;
var artiststr;
var sepstr = "@!#!@";
var lastHide = 0;
var numStyles, cutoffCount, numArtists;
var staticText, theURL;
var splitE;
var tpTopTen=new Array();
var tpTopFif=new Array();
var tpTopHun=new Array();
var artistCount = new Object();
var thisArtCount = new Object();
var allArtistMatch = new Array();
var thisArtMatch = new Object();
var currentArtist = new Array();

var totalCount = 0;
var thisTotalCount = 0;
var totalCurPlays = 0;
var onProfile = 0;
var doSort = 0;
/* History */
// snyde1: 27-Apr-2007 Modified for new Last.fm
// snyde1:	03-Apr-2007 Modified Greasemonkey script and TopTrax to create this version
// 		09-Apr-2007 Modified to remove hardcoded number of splits
//		06-Jul-2007 Add panel; hide/show toggle support for group charts
//		PROBLEM: with special characters, but do we want to escape them?
//		15-Nov-2007 Fix problem with quilts thanks to Kuge and teganblue
//	07-May-2008 joint version; colour and style
//	17-Jul-2008 New format
//	26-Jul-2008 Format fixes
//	29-Jul-2008 as per chatter's request - show nonmatches (Opera only) & URL fix
//	07-Mar-2009 dot product calculation
//	06-Jun-2009 fix for panel insertion
/* SCRIPT */

var monitorElem;

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function toggleHideArtist () {
	if (hideOthers == 0) { hideOthers = 1; } else { hideOthers = 0; }
	if (! navigator.userAgent.match(/Opera/)) {GM_setValue("hideOthers",hideOthers); }
	doTheChart();
}
function setHideArtist (myValue) {
	if (myValue == 3) { myValue = 1; doSort = 1;} else { doSort = 0;}
	if ((myValue < 0) || (myValue > 2)) {myValue = 0;}
	hideOthers = myValue;
	if (! navigator.userAgent.match(/Opera/)) {GM_setValue("hideOthers",hideOthers); }
	doTheChart();
}

function fixstring(str) {
	str = str.replace(/&quot;/g,'"');
	return(str);
}

function initPanel () {
		var oldPanel = document.getElementsByTagName("h1")[0];
		if (onProfile == 1) { oldPanel = document.getElementsByTagName("h2")[2]; }
	if (oldPanel){
		var newPanel = document.createElement("div");
		newPanel.setAttribute("class", "lastPanel");
		newPanel.setAttribute("id", "hiLightPan");
//		newPanel.setAttribute("style", "font-size: 11px;");
		if (onProfile == 1) {
			oldPanel.parentNode.parentNode.insertBefore(newPanel,oldPanel.parentNode);
		}
		else {
			if (location.href.match(/http:\/\/[^\/]*\/group/i)) {
				oldPanel.parentNode.parentNode.insertBefore(newPanel,oldPanel.parentNode.nextSibling);
			} else {
				oldPanel.parentNode.parentNode.insertBefore(newPanel,oldPanel.parentNode.nextSibling);
			}
		}
		myPan = document.getElementById("hiLightPan");
	}
	if (myPan){
		theStuff = panelHead;
		theStuff += "Loading information.";
		theStuff += panelTail;
		myPan.innerHTML = theStuff;
	}
}

function updatePanel(thisIsTheText) {
	var tempPanelText = document.getElementById("myPanCont");
	if (tempPanelText) { tempPanelText.innerHTML = thisIsTheText; }
}
function updateTail(thisIsTheText) {
	var tempPanelText = document.getElementById("myPanTailer");
	if (tempPanelText) { tempPanelText.innerHTML = thisIsTheText; }
}

function getArt(chartUsed){
	chartType = chartUsed;
	doGetArt();
}

function doGetArt() {
	artistCount = new Object();
	updateTail("<div align=center>In progress ...</div>");
	updatePanel("Loading artists from your "+chartDescrip[chartType]+" chart.");
	currentChart = chartType;
	cutoffCount = cutoffCountDefault; var newCutoff = -1;
	splitE = new Array();
	for(var i=0; i<splitD.length; i++) { splitE[i]=splitD[i]; }
	var xmlhttp=new XMLHttpRequest();
	theURL = "/user/" + username + "/charts?rangetype="+chartType+"&subtype=artists";
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send(null);
	if (xmlhttp.readyState!=4) { return; }
	var xmlText = xmlhttp.responseText;
	var regexp = /\s&\s/g;
	xmlText = xmlText.replace(regexp, "foo");
	regexp = /(<td[^>]*class="subject")[^>]*>/g;
	xmlText = xmlText.replace(regexp, "$1>");
	if (!xmlText) { alert("Didn't get data.");
		return;
	}
	if (xmlText.match(/class="candyStriped chart"/)) {
		xmlText = xmlText.split(/class="candyStriped chart"/)[1];
	} else {
		xmlText = xmlText.split(/class="candyStriped chart"/)[1];
	}
	updateTail("<div align=center>In progress ... got data</div>");
	xmlText =""+xmlText;
	var XMLartists = xmlText.split("</tr>");
	var regxp = /<a[^h]*href=[^>]*>([^<]*)<\/a>/i;
	var cntxp = /<td class=\"chartbarCell\">[^<]*<div[^<]*<a[^<]*<span>([^<]*)<\/span>/i;
	artiststr = new Array();
	var artists = new Array(); numArtists = XMLartists.length;
	if (cutoffCount > numArtists) { cutoffCount = numArtists; }
	staticText = "Using "+(cutoffCount-1)+" artists from your "+chartDescrip[chartType]+" chart. (Total number available "+(numArtists-1)+")";
	for(var kount=1; kount < splitE.length; kount++) {
		if (splitE[kount] > cutoffCount) { splitE[kount] = cutoffCount; }
	}
	kount=splitE.length;
	splitE[kount] = cutoffCount;
	numStyles =  styles.length;
	for(var kount=0; kount < styles.length; kount++) {
		if (splitE[kount] >= cutoffCount) {
			numStyles = kount; break;
		}
	}
	totalCount = 0;
	for(var kount=0; kount < styles.length; kount++) {
		artiststr[kount] = sepstr;
		for (i=splitE[kount]; i<splitE[kount+1]; i++) {
			var playCount = 0;
			var matches = regxp.exec(XMLartists[i]);
			if (XMLartists[i].match(cntxp)) {
				playCount = parseInt(cntxp.exec(XMLartists[i])[1].replace(/,/g,""));
			}
//			if (playCount < -1) { // miniCount) {
//				if (newCutoff < 0) { newCutoff = i; cutoffCount = i; }
//			}
			if ((matches != null) && (newCutoff < 0)) {
				  artists[i] = fixstring(matches[1]);
					artiststr[kount] = artiststr[kount] + artists[i] + sepstr;
				artistCount[artists[i]] = playCount;
				totalCount += (playCount*playCount);
			}
		}
	}
	totalCount = Math.sqrt(totalCount); // Use length of artist count "vector"
	doTheChart();
}

var artLinks, artCounts;
function gatherData() {
	// go through and get the playcounts and artists as arrays
		thisArtCount = new Object();
		artLinks = xpath("//td[@class='subjectCell']/div/a");
		artCounts = xpath("//td[@class='chartbarCell']/div/a/span");
		thisTotalCount = 0; totalCurPlays = 0;
		for (var i = 0; i < artLinks.snapshotLength; i++) {
			var cur = artLinks.snapshotItem(i);
			var curArtist = cur.innerHTML;
			curArtist = curArtist.replace(/<font color=[^>]*>/ig,"");
			curArtist = curArtist.replace(/<\/font>/ig,"");
			if (onProfile == 0) {
			thisArtCount[curArtist] = parseInt(artCounts.snapshotItem(i).innerHTML.replace(/,/g,""));
			thisTotalCount +=  thisArtCount[curArtist]*thisArtCount[curArtist];
			totalCurPlays += thisArtCount[curArtist];
			}
			currentArtist[i] = curArtist;
		}
		thisTotalCount = Math.sqrt(thisTotalCount);
}

function doTheChart() {
		updateTail("<div align=center>Updating chart ...</div>");
		var testString = "";
		var countRange = new Array();
		allArtistMatch = new Array();
		for(var kount=0; kount < splitE.length; kount++) {
			countRange[kount] = 0;
			tpTopTen[kount] = 0; tpTopFif[kount] = 0; tpTopHun[kount] = 0;
		}
		var theSumOfSqr = 0; var totVectLen = thisTotalCount*totalCount;    var totalArtistsMatched=0;
		for (var i = 0; i < artLinks.snapshotLength; i++) {
			var thisChange = 0;
			var cur = artLinks.snapshotItem(i);
			var curArtist = currentArtist[i];
			artCounts.snapshotItem(i).title = "Match: 0";
			if (onProfile == 0) {
			if (artistCount[curArtist]) {
				var artNumVect = ((artistCount[curArtist]*thisArtCount[curArtist])/(totVectLen));
				allArtistMatch[allArtistMatch.length] = curArtist;
				thisArtMatch[curArtist] = artNumVect;
				theSumOfSqr += artNumVect;  totalArtistsMatched += 1;
				artCounts.snapshotItem(i).title = "Match: "+(Math.round((Math.sqrt(artNumVect))*10000)/10000);
			}}
			if (hideOthers != 1) {
				if (lastHide != 0) {
					cur.parentNode.parentNode.parentNode.setAttribute("style","display:table-row;");
				}
				cur.setAttribute("style", nullStyle);
				cur.innerHTML = curArtist;
			}
			testString = sepstr + curArtist + sepstr;
			for(var kount=0; kount < numStyles; kount++) {
				if (artiststr[kount].indexOf(testString) != -1) {
					(countRange[kount])++;
					if (i<100) {
						tpTopHun[kount]++;
						if (i<50) {
							tpTopFif[kount]++;
							if (i<10) {
								tpTopTen[kount]++;
							}
						}
					}
					thisChange = 1;
					if (hideOthers == 2) {
						cur.parentNode.parentNode.parentNode.setAttribute("style","display:none;");
						break;
					}
					if (hideOthers == 1) {
						cur.parentNode.parentNode.parentNode.setAttribute("style","display:table-row;");
					}
					if ((useColours & 2) != 0) {
						cur.setAttribute("style", styles[kount]);
					}
					if ((useColours & 1) != 0) {
						cur.innerHTML = "<font color="+sColour[kount]+">"+curArtist+"</font>";
					}
					break;
				}
			}
			if (thisChange == 1) {
			} else {
				if (hideOthers == 1) {
					cur.parentNode.parentNode.parentNode.setAttribute("style","display:none;");
				}
			}
		}
	var textToEnter = "";
	if (navigator.userAgent.match(/Opera/)) {
		textToEnter += "<span class=\"horizontalOptions clearit\"><ul>";
		textToEnter += "<li class=\"current first \"><a name=\"\">Period:</a></li>";
		textToEnter += "<li class=\""+((currentChart=="week")?"current ":"")+"first chartweek\"><a href=\"javascript:getArt(\'week\')\">Last 7 days</a></li>";
		textToEnter += "<li class=\""+((currentChart=="3month")?"current ":"")+"chart3month\"><a href=\"javascript:getArt(\'3month\')\">Last 3 months</a></li>";
		textToEnter += "<li class=\""+((currentChart=="6month")?"current ":"")+"chart6month\"><a href=\"javascript:getArt(\'6month\')\">Last 6 months</a></li>";
		textToEnter += "<li class=\""+((currentChart=="year")?"current ":"")+"chartyear\"><a href=\"javascript:getArt(\'year\')\">Last 12 months</a></li>";
		textToEnter += "<li class=\""+((currentChart=="overall")?"current ":"")+"chartoverall\"><a href=\"javascript:getArt(\'overall\')\">Overall</a></li>";
		if (onProfile == 0) {
			textToEnter += "<li class=\"current chartoverall\"><a name=NULLandVOID)\">&nbsp;Non-matches:</a></li>";
			textToEnter += "<li class=\""+((hideOthers==0)?"current ":"")+"chartoverall\"><a "+((hideOthers==0)?"name=\"\"":"href=\"javascript:setHideArtist(0)\"")+">Show</a></li>";
			textToEnter += "<li class=\""+((hideOthers==1)?"current ":"")+"chartoverall\"><a "+((hideOthers==1)?"name=\"\"":"href=\"javascript:setHideArtist(1)\"")+">Hide</a></li>";
			textToEnter += "<li class=\""+((hideOthers==2)?"current ":"")+"chartoverall\"><a "+((hideOthers==2)?"name=\"\"":"href=\"javascript:setHideArtist(2)\"")+">Reverse</a></li>";
			textToEnter += "<li class=\""+((doSort==1)?"current ":"")+"chartoverall\"><a "+((hideOthers==3)?"name=\"\"":"href=\"javascript:setHideArtist(3)\"")+">Sort</a></li>";
		}
		textToEnter += "</ul></span>";
	} else {
		textToEnter += "<br>Using your "+chartDescrip[currentChart]+" chart. See the GreaseMonkey menu for options.<p>";
	}
//	textToEnter += "<hr><p>The styles used and matches counted on this page are as follows:";
	textToEnter += "<p><table class=\"barChart\" width=\"100%\"><tr><td align=left width=\"50%\">Artist style / This page &gt; </td><td align=right>All "+artLinks.snapshotLength+"</td><td align=right>Top 10</td><td align=right>Top 50</td><td align=right>Top 100</td></tr>";

	var allFound = 0;
	for (var i=0; i<styles.length; i++){
		allFound = allFound+countRange[i];
		var theWord = " next ";
		if (i == 0) {theWord = " top ";}
		var thePref = ""; var theSuff ="";
		if ((useColours & 2) != 0) {
			thePref = "<span style=\""+styles[i]+"\">"; theSuff = "</span>";
		}
		if ((useColours & 1) != 0) {
			thePref = thePref + "<font color=\""+sColour[i]+"\">"; theSuff = "</font>"+theSuff;
		}
		if (hideOthers != 2) {
		if (splitE[i+1] < cutoffCount) {
			textToEnter += "<tr><td align=left>"+thePref+"Your"+theWord+(splitE[i+1]-splitE[i])+theSuff;
			textToEnter += "</td><td align=right>"+countRange[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopTen[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopFif[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopHun[i]+"</td>";
			textToEnter += "</tr>";
		} else {
			textToEnter += "<tr><td align=left>"+thePref+"Your"+theWord+(cutoffCount-1-splitE[i])+theSuff;
			textToEnter += "</td><td align=right>"+countRange[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopTen[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopFif[i]+"</td>";
			textToEnter += "<td align=right>"+tpTopHun[i]+"</td>";
			textToEnter += "</tr>";
			break;
		} } else { if (i == 0){
			textToEnter += "<tr><td align=center colspan=5>Your artists have been hidden. Displaying only artists not shared in common.</td></tr>";
		} }
	}
	var hdnTxt = ""; if (hideOthers == 1) { hdnTxt="  (hidden)"; }
	textToEnter += "<tr><td align=left><span style=\""+nullStyle+"\">Not yours"+hdnTxt+"</span></td><td align=right> "+(artLinks.snapshotLength-allFound)+"</td><td></td><td></td><td></td></tr></table><p>";
	updatePanel(textToEnter);
	if (location.href.match(/http:\/\/[^\/]*\/user/i)) {
		var userRegexp = /\/user\/[^\/]*[$\/]/i;
		if (location.href.match(userRegexp)) {
			userRegexp = /\/user\/([^\/]*)[$\/]/i;
			var thisUser = userRegexp.exec(location.href)[1];
			var xmlhttp=new XMLHttpRequest();
			var theURL = "/user/" + thisUser + "/tasteomatic";
			xmlhttp.open("GET", theURL, false);
			xmlhttp.send(null);
			var textName = xmlhttp.responseText;
			var tomRegexp = /<strong class="reading">([^<]*)<\/strong>/i;
			var tomName = textName.match(tomRegexp)[1];
			var tomPRCNT = textName.match(/<span style="width: ([^%]*)%/)[1];
			tomPRCNT = Math.round(tomPRCNT*10000)/10000;
			var dotPRCNT = Math.round((Math.sqrt(theSumOfSqr))*10000)/10000;
			textToEnter += "<hr><div align=center>Taste-O-Meter rating:<br>\""+tomName+" ("+tomPRCNT+"%)\" or "+dotPRCNT+" dot product.</div>";
		} else {
			textToEnter += "";
		}
	}
	updatePanel(textToEnter);
	textToEnter = ("<div align=center>You have "+allFound+" matches on your "+(cutoffCount-1)+" artists.</div>"+
		 "<div align=center>There are "+artLinks.snapshotLength+" artists and "+totalCurPlays+" plays in this chart.</div><hr />");
	updateTail(textToEnter);

	if (doSort == 1) {
		var artistSrtLst = new Array();
		var myTextMsg = "<table id='lastfmSortTable' class=\"barChart\" width='100%'><tbody><tr><td width='5%' align=right>#</td><td width='5%'>&nbsp;</td><td width='50%'>Artist</td><td width='35%'>Match</td></tr>";
		artistSrtLst = allArtistMatch.sort(sortVector);
		var srtRank = 0; var srtCnt = 0; var srtLast = 0;
		for (srti=0; srti<artistSrtLst.length; srti++) {
			if (thisArtMatch[artistSrtLst[srti]] != 0) {
				srtCnt++;
				if (thisArtMatch[artistSrtLst[srti]] != srtLast) {srtRank = srtCnt;}
				myTextMsg += "<tr><td align=right>"+srtRank+"</td><td>&nbsp;</td><td><a href='/music/"+artistSrtLst[srti].replace(/'/g,"%27")+"'>"+artistSrtLst[srti]+"</a></td>";
				myTextMsg += "<td class=\"chartbarCell\" title=\"Match = "+(Math.round((Math.sqrt(thisArtMatch[artistSrtLst[srti]]))*10000)/10000)+"\"><div class=\"chartbar\" style=\"width: "+Math.max(20,(Math.sqrt(thisArtMatch[artistSrtLst[srti]])*100/Math.sqrt(thisArtMatch[artistSrtLst[0]])))+"\%;\"><span>"+(Math.round((Math.sqrt(thisArtMatch[artistSrtLst[srti]]))*10000)/10000)+"</span></div></td></tr>";
				srtLast = thisArtMatch[artistSrtLst[srti]];
			}
		}
		myTextMsg += "</tbody></table><hr />";
		updateTail(textToEnter+" "+myTextMsg);
	}
	lastHide = hideOthers;
}

(function() {
	username = getLastfmUsername();
	if (username == "") { return; }
	onProfile = 0;
	var links = xpath("//td[@class='subjectCell']/div/a");
	if (links.snapshotLength < 1) { return; }
	var re2 = new RegExp(username, "i");	// Is it my page or non-artist?
//	if (location.href.match(re2)) { return; }
//	if (location.href.match(/subtype=(?:albums|tracks)/)) { return; }
	if (location.href.match(/subtype=tracks/)) { return; }
	if (location.href.match(/charttype=recenttracks/)) { return; }
	if (location.href.match(/user\/[^\/]*$/)) { onProfile = 1;}
	if (!navigator.userAgent.match(/Opera/)) {
		chartType = GM_getValue("chartType", chartType);
		GM_registerMenuCommand("Highlight Artist: Select chart", promptForChart);
//		miniCount = GM_getValue("miniCount", miniCount);
//		GM_registerMenuCommand("Highlight Artist: Minimum count", promptForMiniCount);
		hideOthers = GM_getValue("hideOthers", hideOthers);
		GM_registerMenuCommand("Highlight Artist: Toggle hide", toggleHideArtist);
	}
	monitorElem = xpath("//table[@class='candyStriped chart']").snapshotItem(0);
	initPanel();
	gatherData();
	if (!chartType) {chartType= "overall";}
	doGetArt();
})();

// Greasemonkey support
function getMiniCount() { 
	return GM_getValue("miniCount", 1); 
}
function promptForMiniCount() {
	GM_setValue("miniCount", prompt("What is the minimum number of plays to consider?", getMiniCount()));
	document.location.reload();
}
function getForChart() {
	return GM_getValue("chartType", "overall");
}
function promptForChart() {
	GM_setValue("chartType", prompt("What chart do you want to use? (overall, week, year, 6month, 3month)", getForChart()));
	if (!chartDescrip[GM_getValue("chartType")]){
		GM_setValue("chartType", "overall");
		chartType = "overall";
	}
	chartType=GM_getValue("chartType");
	doGetArt();
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

function sortVector(a,b) {
	return(thisArtMatch[b] - thisArtMatch[a]);
}