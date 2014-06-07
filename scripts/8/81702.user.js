// ==UserScript==
// @name Last.fm - Opera: Highlight Same Artists - July 2010
// @namespace
// @description Highlights artists that you listen to on other users' profiles.
// @include http://www.last.fm/user/*/charts*
// @include http://www.last.fm/group/*/charts*
// @include http://www.last.fm/place/*/+charts*
// ==/UserScript==

var myPan;
var panelHead = "<H2 class='heading'><span class='h2Wrapper'>Highlight Same Artists</SPAN></H2><div id=myPanCont>";
var panelTail = "</div></div><div class=\"f\"><div id=myPanTailer></div><span class=\"iesucks\">&nbsp;</span></div></td></tr></tbody></table>";
var username, lfmLibPath="";

(function() { 
	username = getLastfmUsername();
	if (username == "") { return; }
	var links = document.evaluate('//td[@class="subjectCell"]/div/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
	if (links.snapshotLength < 1) { return; } 
//	var re2 = new RegExp(username, "i");	// Is it my page or non-artist?
//	if (location.href.match(re2)) { return; }
	if (location.href.match(/subtype=(?:albums|tracks)/)) { return; }
	if (location.href.match(/subtype=tracks/)) { return; }
	if (location.href.match(/charttype=recenttracks/)) { return; }
	if (location.href.match(/\/user\//)) {
		lfmLibPath = location.href.replace(/\/charts.*$/,"/library/music/");
	}
	writeScripts();
	initPanel();
	if (navigator.userAgent.match(/Opera/)) {
		gatherData();
		if (!chartType) {chartType= "overall";}
		doGetArt();
	}
})();

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function initPanel () {
	var oldPanel = document.getElementsByTagName("h1")[1];
	if (oldPanel){
		var newPanel = document.createElement("div");
		newPanel.setAttribute("class", "lastPanel");
		newPanel.setAttribute("id", "hiLightPan");
		if (location.href.match(/http:\/\/[^\/]*\/group/i)) {
			oldPanel.parentNode.parentNode.insertBefore(newPanel,oldPanel.parentNode.nextSibling);
		} else {
			oldPanel.parentNode.parentNode.insertBefore(newPanel,oldPanel.parentNode.nextSibling);
		}
		myPan = document.getElementById("hiLightPan");
	}
	if (myPan){
		theStuff = panelHead;
		if (navigator.userAgent.match(/Opera/)) {
			theStuff += "Loading...";
		}else{
			theStuff += "<A Href=\"javascript:(artMatScript())\" ALIGN=\"CENTER\">Click here to check your charts.</a>";
		}
		theStuff += panelTail;
		myPan.innerHTML = theStuff;
	}
}
function getLastfmUsername() { 
	var usernameLink = document.evaluate("//a[contains(@class,'user-badge')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
	if (usernameLink.snapshotLength > 0) { 
		var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
		userNameLoc = userNameLoc.replace(/<[^<>]*>/g,"").replace(/^\s*/m,"").replace(/\s*$/,"");
		return(userNameLoc);
	} else {
		return("");
	}
}

// Write maintenance scripts to page
// These scripts do the work of the utility functions and extend Opera functionality to other browsers.
function writeScripts() {if (! document.getElementById("ArtMatScript") ) {
	var contextElem = document.getElementById("page");
	var tSTxt = "";
	tSTxt += "var oB='<'; var cB='>'; var cBoB = cB+oB;\n";
	tSTxt += 'var splitD = new Array();';
	tSTxt += 'var deCor = new Array();';
	tSTxt += 'var sColour = new Array();';
	tSTxt += 'splitD[0] = 0 ;  sColour[0] = "magenta"; deCor[0] = "color: magenta;";';
	tSTxt += 'splitD[1] = 10 ; sColour[1] = "red";     deCor[1] = "color: red;";';
	tSTxt += 'splitD[2] = 25 ; sColour[2] = "orange";  deCor[2] = "color: orange;";';
	tSTxt += 'splitD[3] = 50 ; sColour[3] = "green";   deCor[3] = "color: green;";';
	tSTxt += 'splitD[4] = 100 ;sColour[4] = "blue";    deCor[4] = "color: blue;";';
	tSTxt += 'splitD[5] = 250 ;sColour[5] = "purple";  deCor[5] = "color: purple;";';
	tSTxt += 'var nullStyle = "color: #666; font-weight: normal; text-decoration: none;";';
	tSTxt += 'if (! navigator.userAgent.match(/Opera/)) {nullStyle = "color: #666; font-weight: normal; text-decoration: none; font-style: none;";}';
	tSTxt += 'var cutoffCountDefault = 1001;';
	tSTxt += 'var miniCount = 1;';
	tSTxt += 'var hideOthers = 0;';
	tSTxt += 'var useColours = 2;';

	tSTxt += 'var chartType = "3month";';

	tSTxt += 'var chartDescrip = new Object();';
	tSTxt += 'chartDescrip["overall"] = "overall";';
	tSTxt += 'chartDescrip["year"] = "1 year";';
	tSTxt += 'chartDescrip["6month"] = "6 month";';
	tSTxt += 'chartDescrip["3month"] = "3 month";';
	tSTxt += 'chartDescrip["1month"] = "1 month";';
	tSTxt += 'chartDescrip["week"] = "1 week";';
	tSTxt += 'var currentChart;';
	tSTxt += 'var artiststr;';
	tSTxt += 'var sepstr = "@!#!@";';
	tSTxt += 'var lastHide = 0;';
	tSTxt += 'var numStyles, cutoffCount, numArtists;';
	tSTxt += 'var staticText, theURL;';
	tSTxt += 'var splitE;';
	tSTxt += 'var tpTopTen=new Array();';
	tSTxt += 'var tpTopFif=new Array();';
	tSTxt += 'var tpTopHun=new Array();';
	tSTxt += 'var artistCount = new Object();';
	tSTxt += 'var thisArtCount = new Object();';
	tSTxt += 'var allArtistMatch = new Array();';
	tSTxt += 'var thisArtMatch = new Object();';
	tSTxt += 'var currentArtist = new Array();';
	tSTxt += 'var totalCount = 0;';
	tSTxt += 'var thisTotalCount = 0;';
	tSTxt += 'var totalCurPlays = 0;';
	tSTxt += 'var doSort = 0;';

	tSTxt += "function artMatScript() {";
	tSTxt += "	if (!chartType) {chartType= \"overall\";}";
	tSTxt += "gatherData();doGetArt();";
	tSTxt += "}";

	tSTxt += "var artLinks, artCounts;";
	tSTxt += "function gatherData() {";
	tSTxt += "		thisArtCount = new Object();";
	tSTxt += "		artLinks = document.evaluate('//td[@class=\"subjectCell\"]/div/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);";
	tSTxt += "		artCounts = document.evaluate('//td[@class=\"chartbarCell\"]/div/a/span', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);";
	tSTxt += "		thisTotalCount = 0; totalCurPlays = 0;";
	tSTxt += "		for (var i = 0; i < artLinks.snapshotLength; i++) {";
	tSTxt += "			var cur = artLinks.snapshotItem(i);";
	tSTxt += "			var curArtist = cur.innerHTML;";
	tSTxt += "			curArtist = curArtist.replace(/[<]+font color=[^>]*>/ig,'');";
	tSTxt += "			curArtist = curArtist.replace(/[<]+\\/font>/ig,'');";
	tSTxt += "			thisArtCount[curArtist] = parseInt(artCounts.snapshotItem(i).innerHTML.replace(/,/g,''));";
	tSTxt += "			thisTotalCount +=  thisArtCount[curArtist]*thisArtCount[curArtist];";
	tSTxt += "			totalCurPlays += thisArtCount[curArtist];";
	tSTxt += "			currentArtist[i] = curArtist;";
	tSTxt += "		}";
	tSTxt += "		thisTotalCount = Math.sqrt(thisTotalCount);";
	tSTxt += "}";

	tSTxt += 'function doGetArt() {';
	tSTxt += '	artistCount = new Object();';
	tSTxt += '	updateTail(oB+"div align=center>In progress ..."+oB+"/div>");';
	tSTxt += '	updatePanel("Loading artists from your "+chartDescrip[chartType]+" chart.");';
	tSTxt += '	currentChart = chartType;';
	tSTxt += '	cutoffCount = cutoffCountDefault; var newCutoff = -1;';
	tSTxt += '	splitE = new Array();';
	tSTxt += '	for(var i=0; i < splitD.length; i++) { splitE[i]=splitD[i]; }';
	tSTxt += '	var xmlhttp=new XMLHttpRequest();';
	tSTxt += '	theURL = "/user/' + username + '/charts?rangetype="+chartType+"&subtype=artists";';
	tSTxt += '	xmlhttp.open("GET", theURL, false);';
	tSTxt += '	xmlhttp.send(null);';
	tSTxt += '	if (xmlhttp.readyState!=4) { return; }';
	tSTxt += '	var xmlText = xmlhttp.responseText;';
	tSTxt += '	var regexp = /\s&\s/g;';
	tSTxt += '	xmlText = xmlText.replace(regexp, "foo");';
	tSTxt += '	regexp = /(.td[^>]*class="subject")[^>]*>/g;';
	tSTxt += '	xmlText = xmlText.replace(regexp, "$1>");';
	tSTxt += '	if (!xmlText) { alert("Didn\'t get data."); return; }';
	tSTxt += '	if (xmlText.match(/class="candyStriped chart"/)) {';
	tSTxt += '		xmlText = xmlText.split(/class="candyStriped chart"/)[1];';
	tSTxt += '	} else { alert("Didn\'t get data (table)."); return; }';
	tSTxt += '	updateTail(oB+"div align=center>In progress ... got data"+oB+"/div>");';
	tSTxt += '	xmlText =""+xmlText;';
	tSTxt += '	var XMLartists = xmlText.split(oB+"/tr>");';
	tSTxt += '	var regxp = /.A[^H]*HREF=[^>]*>([^<]*)<\\/A>/i;';
	tSTxt += '	var cntxp = /.td class=\\"chartbarCell\\">[^<]*[<]div[^<]*[<]a[^<]*[<]span>([^<]*)[<]\\/span>/i;';
	tSTxt += '	artiststr = new Array();';
	tSTxt += '	var artists = new Array(); numArtists = XMLartists.length;';
	tSTxt += '	if (cutoffCount > numArtists) { cutoffCount = numArtists; }';
	tSTxt += '	staticText = "Using "+(cutoffCount-1)+" artists from your "+chartDescrip[chartType]+" chart. (Total number available "+(numArtists-1)+")";';
	tSTxt += '	for(var kount=1; kount < splitE.length; kount++) {';
	tSTxt += '		if (splitE[kount] > cutoffCount) { splitE[kount] = cutoffCount; }';
	tSTxt += '	}';
	tSTxt += '	kount=splitE.length;';
	tSTxt += '	splitE[kount] = cutoffCount;';
	tSTxt += '	numStyles =  deCor.length;';
	tSTxt += '	for(var kount=0; kount < deCor.length; kount++) {';
	tSTxt += '		if (splitE[kount] >= cutoffCount) {';
	tSTxt += '			numStyles = kount; break;';
	tSTxt += '		}';
	tSTxt += '	}';
	tSTxt += '	totalCount = 0;';
	tSTxt += '	for(var kount=0; kount < deCor.length; kount++) {';
	tSTxt += '		artiststr[kount] = sepstr;';
	tSTxt += '		for (i=splitE[kount]; i < splitE[kount+1]; i++) {';
	tSTxt += '			var playCount = 0;';
	tSTxt += '			var matches = regxp.exec(XMLartists[i]);';
	tSTxt += '			if (XMLartists[i].match(cntxp)) {';
	tSTxt += '				playCount = parseInt(cntxp.exec(XMLartists[i])[1].replace(/,/g,""));';
	tSTxt += '			}';
	tSTxt += '			if ((matches != null) && (newCutoff < 0)) {';
	tSTxt += '				  artists[i] = matches[1].replace(/[&]quot;/g,\'"\');';
	tSTxt += '					artiststr[kount] = artiststr[kount] + artists[i] + sepstr;';
	tSTxt += '				artistCount[artists[i]] = playCount;';
	tSTxt += '				totalCount += (playCount*playCount);';
	tSTxt += '			}';
	tSTxt += '		}';
	tSTxt += '	}';
	tSTxt += '	totalCount = Math.sqrt(totalCount);';
	tSTxt += '	doTheChart();';
	tSTxt += '}';

	tSTxt += "function doTheChart() {";
	tSTxt += "		updateTail(oB+\"div align='center'\"+cB+\"Updating chart ...\"+oB+\"/div\"+cB);";
	tSTxt += "		var testString = '';";
	tSTxt += "		var countRange = new Array();";
	tSTxt += "		allArtistMatch = new Array();";
	tSTxt += "		for(var kount=0; kount < splitE.length; kount++) {";
	tSTxt += "			countRange[kount] = 0;";
	tSTxt += "			tpTopTen[kount] = 0; tpTopFif[kount] = 0; tpTopHun[kount] = 0;";
	tSTxt += "		}";
	tSTxt += "		var theSumOfSqr = 0; var totVectLen = thisTotalCount*totalCount;    var totalArtistsMatched=0;";
	tSTxt += "		for (var i = 0; i < artLinks.snapshotLength; i++) {";
	tSTxt += "			var thisChange = 0;";
	tSTxt += "			var cur = artLinks.snapshotItem(i);";
	tSTxt += "			var curArtist = currentArtist[i];";
	tSTxt += "			artCounts.snapshotItem(i).title = 'Match: 0';";
	tSTxt += "			if (artistCount[curArtist]) {";
	tSTxt += "				var artNumVect = ((artistCount[curArtist]*thisArtCount[curArtist])/(totVectLen));";
	tSTxt += "				allArtistMatch[allArtistMatch.length] = curArtist;";
	tSTxt += "				thisArtMatch[curArtist] = artNumVect;";
	tSTxt += "				theSumOfSqr += artNumVect;  totalArtistsMatched += 1;";
	tSTxt += "				artCounts.snapshotItem(i).title = 'Match: '+(Math.round((Math.sqrt(artNumVect))*10000)/10000);";
	tSTxt += "			}";
	tSTxt += "			if (hideOthers != 1) {";
	tSTxt += "				if (lastHide != 0) {";
	tSTxt += "					cur.parentNode.parentNode.parentNode.setAttribute('style','display:table-row;');";
	tSTxt += "				}";
	tSTxt += "				cur.setAttribute('style', nullStyle);";
	tSTxt += "				cur.innerHTML = curArtist;";
	tSTxt += "			}";
	tSTxt += "			testString = sepstr + curArtist + sepstr;";
	tSTxt += "			for(var kount=0; kount < numStyles; kount++) {";
	tSTxt += "				if (artiststr[kount].indexOf(testString) != -1) {";
	tSTxt += "					(countRange[kount])++;";
	tSTxt += "					if (i < 100) {";
	tSTxt += "						tpTopHun[kount]++;";
	tSTxt += "						if (i < 50) {";
	tSTxt += "							tpTopFif[kount]++;";
	tSTxt += "							if (i < 10) {";
	tSTxt += "								tpTopTen[kount]++;";
	tSTxt += "							}";
	tSTxt += "						}";
	tSTxt += "					}";
	tSTxt += "					thisChange = 1;";
	tSTxt += "					if (hideOthers == 2) {";
	tSTxt += "						cur.parentNode.parentNode.parentNode.setAttribute('style','display:none;');";
	tSTxt += "						break;";
	tSTxt += "					}";
	tSTxt += "					if (hideOthers == 1) {";
	tSTxt += "						cur.parentNode.parentNode.parentNode.setAttribute('style','display:table-row;');";
	tSTxt += "					}";
	tSTxt += "					if ((useColours & 2) != 0) {";
	tSTxt += "						cur.setAttribute('style', deCor[kount]);";
	tSTxt += "					}";
	tSTxt += "					if ((useColours & 1) != 0) {";
	tSTxt += "						cur.innerHTML = oB+'font color='+sColour[kount]+cB+curArtist+oB+'/font'+cB;";
	tSTxt += "					}";
	tSTxt += "					break;";
	tSTxt += "				}";
	tSTxt += "			}";
	tSTxt += "			if (thisChange == 1) {";
	tSTxt += "			} else {";
	tSTxt += "				if (hideOthers == 1) {";
	tSTxt += "					cur.parentNode.parentNode.parentNode.setAttribute('style','display:none;');";
	tSTxt += "				}";
	tSTxt += "			}";
	tSTxt += "		}";
	tSTxt += "	var textToEnter = '';";
	tSTxt += "	textToEnter += oB+'span class=\"horizontalOptions clearit\"'+cBoB+'ul'+cB;";
	tSTxt += "	textToEnter += oB+'li class=\"current first \"'+cBoB+'a name=\"\"'+cB+'Period:'+oB+'/a'+cBoB+'/li'+cB;";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'week\')?\'current \':\'\')+'first chartweek\"'+cBoB+'a href=\"javascript:getArt(\\\'week\\\')\">Last 7 days'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'1month\')?\'current \':\'\')+'chart3month\"'+cBoB+'a href=\"javascript:getArt(\\\'1month\\\')\">Last month'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'3month\')?\'current \':\'\')+'chart3month\"'+cBoB+'a href=\"javascript:getArt(\\\'3month\\\')\">Last 3 months'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'6month\')?\'current \':\'\')+'chart6month\"'+cBoB+'a href=\"javascript:getArt(\\\'6month\\\')\">Last 6 months'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'year\')?\'current \':\'\')+'chartyear\"'+cBoB+'a href=\"javascript:getArt(\\\'year\\\')\">Last 12 months'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((currentChart==\'overall\')?\'current \':\'\')+'chartoverall\"'+cBoB+'a href=\"javascript:getArt(\\\'overall\\\')\">Overall'+oB+'/a>'+oB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"current chartoverall\"'+cBoB+'a name=NULLandVOID)\">&nbsp;Non-matches:'+oB+'/a'+cBoB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((hideOthers==0)?\'current \':\'\')+'chartoverall\"'+cBoB+'a '+((hideOthers==0)?'name=\"\"':'href=\"javascript:setHideArtist(0)\"')+'>Show'+oB+'/a'+cBoB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((hideOthers==1)?\'current \':\'\')+'chartoverall\"'+cBoB+'a '+((hideOthers==1)?'name=\"\"':'href=\"javascript:setHideArtist(1)\"')+'>Hide'+oB+'/a'+cBoB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((hideOthers==2)?\'current \':\'\')+'chartoverall\"'+cBoB+'a '+((hideOthers==2)?'name=\"\"':'href=\"javascript:setHideArtist(2)\"')+'>Reverse'+oB+'/a'+cBoB+'/li>';";
	tSTxt += "	textToEnter += oB+'li class=\"'+((doSort==1)?\'current \':\'\')+'chartoverall\"'+cBoB+'a '+((hideOthers==3)?'name=\"\"':'href=\"javascript:setHideArtist(3)\"')+'>Sort'+oB+'/a'+cBoB+'/li>';";
	tSTxt += "	textToEnter += oB+'/ul>'+oB+'/span>';";
	tSTxt += "	textToEnter += oB+'p'+cBoB+'table class=\"barChart\" width=\"100%\"'+cBoB+'tr'+cBoB+'td align=left width=\"50%\">Artist style / This page &gt; '+oB+'/td'+cBoB+'td align=right>All '+artLinks.snapshotLength+oB+'/td'+cBoB+'td align=right>Top 10'+oB+'/td'+cBoB+'td align=right>Top 50'+oB+'/td'+cBoB+'td align=right>Top 100'+oB+'/td'+cBoB+'/tr>';";
	tSTxt += "";
	tSTxt += "	var allFound = 0;";
	tSTxt += "	for (var i=0; i < deCor.length; i++){";
	tSTxt += "		allFound = allFound+countRange[i];";
	tSTxt += "		var theWord = ' next ';";
	tSTxt += "		if (i == 0) {theWord = ' top ';}";
	tSTxt += "		var thePref = ''; var theSuff ='';";
	tSTxt += "		if ((useColours & 2) != 0) {";
	tSTxt += "			thePref = oB+'span style=\"'+deCor[i]+'\"'+cB; theSuff = oB+'/span'+cB;";
	tSTxt += "		}";
	tSTxt += "		if ((useColours & 1) != 0) {";
	tSTxt += "			thePref = thePref + oB + 'font color=\"'+sColour[i]+'\"'+cB; theSuff = oB+'/font'+cB+theSuff;";
	tSTxt += "		}";
	tSTxt += "		if (hideOthers != 2) {";
	tSTxt += "		if (splitE[i+1] < cutoffCount) {";
	tSTxt += "			textToEnter += oB+'tr>'+oB+'td align=left>'+thePref+'Your'+theWord+(splitE[i+1]-splitE[i])+theSuff;";
	tSTxt += "			textToEnter += oB+'/td>'+oB+'td align=right>'+countRange[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopTen[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopFif[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopHun[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'/tr>';";
	tSTxt += "		} else {";
	tSTxt += "			textToEnter += oB+'tr>'+oB+'td align=left>'+thePref+'Your'+theWord+(cutoffCount-1-splitE[i])+theSuff;";
	tSTxt += "			textToEnter += oB+'/td>'+oB+'td align=right>'+countRange[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopTen[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopFif[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'td align=right>'+tpTopHun[i]+oB+'/td>';";
	tSTxt += "			textToEnter += oB+'/tr>';";
	tSTxt += "			break;";
	tSTxt += "		} } else { if (i == 0){";
	tSTxt += "			textToEnter += oB+'tr>'+oB+'td align=center colspan=5>Your artists have been hidden. Displaying only artists not shared in common.'+oB+'/td>'+oB+'/tr>';";
	tSTxt += "		} }";
	tSTxt += "	}";
	tSTxt += "	var hdnTxt = ''; if (hideOthers == 1) { hdnTxt='  (hidden)'; }";
	tSTxt += "	textToEnter += oB+'tr>'+oB+'td align=left>'+oB+'span style=\"'+nullStyle+'\">Not yours'+hdnTxt+oB+'/span>'+oB+'/td>'+oB+'td align=right> '+(artLinks.snapshotLength-allFound)+oB+'/td>'+oB+'td>'+oB+'/td>'+oB+'td>'+oB+'/td>'+oB+'td>'+oB+'/td>'+oB+'/tr>'+oB+'/table>'+oB+'p>';";
	tSTxt += "	updatePanel(textToEnter);";
	tSTxt += "	if (location.href.match(/http:\\/\\/[^\\/]*\\/user/i)) {";
	tSTxt += "		var userRegexp = /\\/user\\/[^\\/]*[$\\/]/i;";
	tSTxt += "		if (location.href.match(userRegexp)) {";
	tSTxt += "			userRegexp = /\\/user\\/([^\\/]*)[$\\/]/i;";
	tSTxt += "			var thisUser = userRegexp.exec(location.href)[1];";
	tSTxt += "			var xmlhttp=new XMLHttpRequest();";
	tSTxt += "			var theURL = '/user/' + thisUser + '/tasteomatic';";
	tSTxt += "			xmlhttp.open('GET', theURL, false);";
	tSTxt += "			xmlhttp.send(null);";
	tSTxt += "			var textName = xmlhttp.responseText;";
	tSTxt += "			var tomRegexp = /.strong class=\"reading\">([^<]*)<\\/strong>/i;";
	tSTxt += "			var tomName = textName.match(tomRegexp)[1];";
	tSTxt += "			var tomPRCNT = textName.match(/.span style=\"width: ([^%]*)%/)[1];";
	tSTxt += "			tomPRCNT = Math.round(tomPRCNT*10000)/10000;";
	tSTxt += "			var dotPRCNT = Math.round((Math.sqrt(theSumOfSqr))*10000)/10000;";
	tSTxt += "			textToEnter += oB+'hr>'+oB+'div align=center>Taste-O-Meter rating:'+oB+'br>\"'+tomName+' ('+tomPRCNT+'%)\" or '+dotPRCNT+' dot product.'+oB+'/div>';";
	tSTxt += "		} else {";
	tSTxt += "			textToEnter += '';";
	tSTxt += "		}";
	tSTxt += "	}";
	tSTxt += "	updatePanel(textToEnter);";
	tSTxt += "	textToEnter = (oB+'div align=center>You have '+allFound+' matches on your '+(cutoffCount-1)+' artists.'+oB+'/div>'+";
	tSTxt += "		 oB+'div align=center>There are '+artLinks.snapshotLength+' artists and '+totalCurPlays+' plays in this chart.'+oB+'/div>'+oB+'hr />');";
	tSTxt += "	updateTail(textToEnter);";
	tSTxt += "";
	tSTxt += "	if (doSort == 1) {";
	tSTxt += "		var artistSrtLst = new Array();";
	tSTxt += "		var myTextMsg = oB+'table id=\"lastfmSortTable\" class=\"barChart\" width=\"100%\">'+oB+'tbody>'+oB+'tr>'+oB+'td width=\"5%\" align=right>#'+oB+'/td>'+oB+'td width=\"5%\">&nbsp;'+oB+'/td>'+oB+'td width=\"50%\">Artist'+oB+'/td>'+oB+'td width=\"35%\">Match'+oB+'/td>'+oB+'/tr>';";
	tSTxt += "		artistSrtLst = allArtistMatch.sort(sortVector);";
	tSTxt += "		var srtRank = 0; var srtCnt = 0; var srtLast = 0;";
	tSTxt += "		for (srti=0; srti < artistSrtLst.length; srti++) {";
	tSTxt += "			if (thisArtMatch[artistSrtLst[srti]] != 0) {";
	tSTxt += "				srtCnt++;";
	tSTxt += "				if (thisArtMatch[artistSrtLst[srti]] != srtLast) {srtRank = srtCnt;}";
	tSTxt += "				myTextMsg += oB+'tr>'+oB+'td align=right>'+srtRank+oB+'/td>'+oB+'td>&nbsp;'+oB+'/td>'+oB+'td class=\"subjectCell\">'+oB+'div>'+oB+'a href=\\\'/user/"+username+"/library/music/'+artistSrtLst[srti].replace(/'/g,'%27')+'\\\'>'+artistSrtLst[srti]+oB+'/a>'+oB+'/div>'+oB+'/td>';";
	tSTxt += "				myTextMsg += ''+oB+'td class=\"chartbarCell\" title=\"Match = '+(Math.round((Math.sqrt(thisArtMatch[artistSrtLst[srti]]))*10000)/10000)+'\">'+oB+'div class=\"chartbar\" style=\"width: '+Math.max(20,(Math.sqrt(thisArtMatch[artistSrtLst[srti]])*100/Math.sqrt(thisArtMatch[artistSrtLst[0]])))+'\%;\">'+oB+'span>'+(Math.round((Math.sqrt(thisArtMatch[artistSrtLst[srti]]))*10000)/10000)+oB+'/span>'+oB+'/div>'+oB+'/td>'+oB+'/tr>';";
	tSTxt += "				srtLast = thisArtMatch[artistSrtLst[srti]];";
	tSTxt += "			}";
	tSTxt += "		}";
	tSTxt += "		myTextMsg += oB+'/tbody>'+oB+'/table>'+oB+'hr />';";
	tSTxt += "		updateTail(textToEnter+' '+myTextMsg);";
	tSTxt += "	}";
	tSTxt += "	lastHide = hideOthers;";
	tSTxt += "}";

	tSTxt += "function getArt(chartUsed){chartType = chartUsed; doGetArt(); }";

	tSTxt += "function setHideArtist (myValue) {";
	tSTxt += "	if (myValue == 3) { myValue = 1; doSort = 1;} else { doSort = 0;}";
	tSTxt += "	if ((myValue < 0) || (myValue > 2)) {myValue = 0;}";
	tSTxt += "	hideOthers = myValue;";
	tSTxt += "	doTheChart();";
	tSTxt += "}";

	tSTxt += "function updatePanel(thisIsTheText) {";
	tSTxt += "	var tempPanelText = document.getElementById('myPanCont');";
	tSTxt += "	if (tempPanelText) { tempPanelText.innerHTML = thisIsTheText; }";
	tSTxt += "}";
	tSTxt += "function updateTail(thisIsTheText) {";
	tSTxt += "	var tempPanelText = document.getElementById('myPanTailer');";
	tSTxt += "	if (tempPanelText) { tempPanelText.innerHTML = thisIsTheText; }";
	tSTxt += "}";

	tSTxt += "function sortVector(a,b) { return(thisArtMatch[b] - thisArtMatch[a]); }";

	var theScript = document.createElement("script");  theScript.setAttribute('language','JavaScript'); theScript.setAttribute('type','text/javascript'); theScript.setAttribute('id','ArtMatScript');
	theScript.innerHTML =  tSTxt;
	contextElem.insertBefore(theScript,contextElem.firstChild);}
}