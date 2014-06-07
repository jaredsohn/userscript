// ==UserScript==
// @name 		Last.fm: Opera - My Top Tracks - July 2008
// @namespace 	xxx
// @description 	Shows any tracks on Last.fm artist pages that you've listened to by that artist.
// @include 	http://www.last.fm/music/*
// @exclude	http://www.lastfm.*/music/*/*
// @exclude	http://www.last.fm/music/*/*
// ==/UserScript==

/* CUSTOM VARIABLES */
// chartLimit:		Maximum number of songs to display in "My Top Tracks" on
//					each artist's page. Set to 0 for no limit.
var chartLimit = 20;

// chartType:		Which chart to use for data. Options: "overall" "3month" "6month" "12month" "weekly"
var defChartType = "3month";
var chartList = "+overall+3month+6month+year+week+";
var subChartType = "tracks"; // "tracks" or "albums" - can be toggled
var doRank = 1; // Include rank data? 1 = yes, 0 =no

// chartDescrip
var chartDescrip = new Object();
chartDescrip["overall"] = "overall";
chartDescrip["year"] = "last 12 months";
chartDescrip["6month"] = "last 6 months";
chartDescrip["3month"] = "last 3 months";
chartDescrip["week"] = "last week";

/* History */
// 17-jul-2008: We'll call this a fresh start for the new "beta" Last.fm
// 26-Jul-2008: Fix for artist names
// 29-Jul-2008: Emergency fix for loading issue

var mychart;
var artist, artistENC;
var username;
/* SCRIPT */
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = str.replace(/\%25 /g, "&pct; ");
		str = str.replace(/\% /g, "&pct; ");
		str = encodeURIComponent(str).replace(/\%20/g, "+");
		str = str.replace(/\&pct; /g, "%25 ");
	}
	return str;
}

function unescape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = str.replace(/\%25 /g, "&pct; ");
		str = str.replace(/\% /g, "&pct; ");
		str = decodeURIComponent(str.replace(/\%26/g, "&amp;"));
		str = decodeURIComponent(str.replace(/\+/g, "%20"));
		str = decodeURIComponent(str.replace(/ \& /g, " &amp; ")); // Fix for artist with ampersand for and
	}
	return str;
}

function toggleSubType() {
	if (subChartType == "albums") { subChartType = "tracks";
	} else { subChartType ="albums"; }
	getTrax(defChartType);
}

function doChart(xml, username, chartType, aRank, aPlay) {
// alert("Top: "+artist);
	var XMLtracks = xml.split("<tr ");
	var tracks = new Array();
	var lastPos = 0;
	var lastCount;
	var j = 0;
	var re = /\/music\/([^\/]+)\/_\/([^\/]+).*">/;
	var currCount = 0;
	if (subChartType == "albums") {
		re = />([^<]*)<\/a>[^<]*<a href="\/music\/([^\/]+)\/([^\"]+)">/i;
	} else {
		re = />([^<]*)<\/a>[^<]*<a href="\/music\/([^\/]+)\/_\/([^\/\"]+).*">/;
	}
	myTotalPlays = 0;
	for (var i = 1; i < XMLtracks.length; i++) {
		XMLtracks[i] = XMLtracks[i].replace(/\/music\/\+noredirect\//,"/music/");
		var matches = re.exec(XMLtracks[i]);
		if (matches == null) {
			continue;
		}
		var currArtist = matches[1];
		if (currArtist == artist) {
			var currName = matches[3];
			var rep = /<div [^>]* class="chartbar"[^<]*<span>([0-9\,]*)<\/span>/i;
			matches = rep.exec(XMLtracks[i]);
			if (matches == null) {
				currCount = 0;
			} else {
				currCount = matches[1];
			} currCount = ""+currCount;
			currCount = currCount.replace(/,/g,"");
			currName = currName.replace(/\?autostart/,"");
			tracks[j] = new Array();
			tracks[j]["name"] = currName;
			tracks[j]["count"] = currCount;
			myTotalPlays = myTotalPlays + parseInt(currCount);
			if (j == 0) {
				tracks[0]["pos"] = 1;
				var maxCount = tracks[0]["count"];
			} else {
				if (tracks[j]["count"] == lastCount) {
					tracks[j]["pos"] = lastPos;
				} else {
					tracks[j]["pos"] = j + 1;
				}
			}
			tracks[j]["width"] = Math.max(20, Math.round(tracks[j]["count"] / maxCount * 98));
			lastPos = tracks[j]["pos"];
			lastCount = tracks[j]["count"];
			j++;
		}
	}
	if (chartLimit < 1) { chartLimit = 500; }

	var HTML = "";
//  Fancy toggler
	HTML += "<span class=\"horizontalOptions clearit\"><ul>";
	HTML += "<li class=\""+((chartType=="week")?"current ":"")+"first chartweek\"><a "+((chartType=="week")?"name=\"\"":"href=\"javascript:getTrax(\'week\')\"")+">Last 7 days</a></li>";
	HTML += "<li class=\""+((chartType=="3month")?"current ":"")+"chart3month\"><a "+((chartType=="3month")?"name=\"\"":"href=\"javascript:getTrax(\'3month\')\"")+">Last 3 months</a></li>";
	HTML += "<li class=\""+((chartType=="6month")?"current ":"")+"chart6month\"><a "+((chartType=="6month")?"name=\"\"":"href=\"javascript:getTrax(\'6month\')\"")+">Last 6 months</a></li>";
	HTML += "<li class=\""+((chartType=="year")?"current ":"")+"chartyear\"><a "+((chartType=="year")?"name=\"\"":"href=\"javascript:getTrax(\'year\')\"")+">Last 12 months</a></li>";
	HTML += "<li class=\""+((chartType=="overall")?"current ":"")+"chartoverall\"><a "+((chartType=="overall")?"name=\"\"":"href=\"javascript:getTrax(\'overall\')\"")+">Overall</a></li>";
	HTML += "<li class=\"current chartoverall\"><a name=NULLandVOID)\">&nbsp;</a></li>";
	HTML += "<li class=\""+((subChartType=="tracks")?"current ":"")+"chartoverall\"><a "+((subChartType=="tracks")?"name=\"\"":"href=\"javascript:toggleSubType()\"")+">Tracks</a></li>";
	HTML += "<li class=\""+((subChartType=="albums")?"current ":"")+"chartoverall\"><a "+((subChartType=="albums")?"name=\"\"":"href=\"javascript:toggleSubType()\"")+">Albums</a></li>";
	HTML += "</ul></span>";
//  Table
	HTML += "<table class=\"candyStriped chart\"><tbody>";
	var candyRowClass;
	if (tracks.length < 1) {
		HTML += "<tr class=\"first odd\"><td>I have no suitable "+subChartType+" for this artist / period</td></tr>";
		if (doRank == 1) {
			HTML += "<tr class=\"\" ><td align=center><i>"+artist+"</i> is ranked number "+aRank+" this period, with "+aPlay+" plays.</td></tr>";
		}
	}
	else {
		for (var k = 0; k < tracks.length && k < chartLimit; k++) {
			if ((k % 2) == 0) {
				candyRowClass = "odd ";
				if (k == 0) {candyRowClass = "first odd ";}
			} else {
				candyRowClass = "";
			}
		HTML += "<tr class=\""+candyRowClass+"\"><td class=\"positionCell\">"+tracks[k]["pos"]+"</td><td class=\"subjectCell\" title=\""+unescape2(tracks[k]["name"], 2)+ ", played "+ commatize(tracks[k]["count"]) +" times\"><div><span class=\"text\"><a title=\""+unescape2(tracks[k]["name"], 2)+ "\" href=\"/music/"+artistENC+"/_/"+ tracks[k]["name"] +"\">"+unescape2(tracks[k]["name"])+"</a></span></div></td><td class=\"chartbarCell\" ><div class=\"chartbar\" style=\"width: "+tracks[k]["width"]+"\%;\"><span>"+ commatize(tracks[k]["count"])  +"</span></div></td></tr>";
		}
		HTML += "<tr class=\"\"><td colspan=3 align=center>Total of "+tracks.length+" "+subChartType+" (";
		notShown = tracks.length - chartLimit;
		if (notShown > 0) { HTML += "" + notShown + " not"; } else { HTML += "all"; }
		HTML += " shown), played "+myTotalPlays+" times.</td></tr>";
		if (doRank == 1) {
			HTML += "<tr class=\"odd\"><td colspan=3 align=center><i>"+artist+"</i> is ranked number "+aRank+" this period, with "+aPlay+" plays.</td></tr>";
		}
	}
	HTML += "<tr class=\"\"><td colspan=3 align=center><span id=\"TopTraxActive\" style=\"display: none;\">Reloading - please wait</span></td></tr>";
	HTML += "</tbody></table><span class=\"moduleOptions\"><a href=\"/user/"+escape2(username)+"/charts/?rangetype="+chartType+"&subtype="+subChartType +"\" title=\"\">See more</a></span>";

	mychart.innerHTML = HTML;
}

function fixHTML(html) {
	var re = /<table [^>]+>(.|\n)+<\/table>/;
	var matches = re.exec(html);
	if (matches == null) {
		return 0;
	} else {
		return matches[0];
	}
}

function getTrax(chartType) {
	var myFlash = document.getElementById("TopTraxActive");
	defChartType = chartType;
	if (myFlash) {myFlash.setAttribute("style", "display: inline; color: red;");}
	if (artist.match(/\%27/)) { artist=artist.replace(/\%27/g,"'"); }
	var artRank = 0; var artPlay = 0;
//	 mychart.innerHTML = "<h3>Loading my top "+subChartType+" for "+chartDescrip[chartType]+"</h3>";
	if (doRank == 1) {
		var xmlhttp=new XMLHttpRequest();
		var theURL = "/user/" + username + "/charts?rangetype="+chartType+"&subtype=artists";
		xmlhttp.open("GET", theURL, false);
		xmlhttp.send(null);
		var xmlText = xmlhttp.responseText;
		if (!xmlText) {
			return;
		}
		xmlText += "";
		xmlText = xmlText.split(/<table class="candyStriped chart"/)[1] + "";
		var XMLartists = xmlText.split("<tr ");
		var regxp = /<A HREF="\/music\/[^>]*>([^<]*)<\/A>/i;
		var cntxp = /<td class="chartbarCell">[^<]*<div[^<]*<span>([^<]*)<\/span>/i;
		var testArtist = "";
		for (var q = 1; q < XMLartists.length; q++) {
			testArtist = regxp.exec(XMLartists[q])[1];
			testArtist = testArtist.replace(/&quot;/g,'"');
			if (testArtist == artist) {
				artRank = q+" (of "+(XMLartists.length-1)+") ";
				artPlay = cntxp.exec(XMLartists[q])[1];
				artPlay = artPlay.replace(/,/g,"");
				break;
			}
		}
	}
	var xmlhttp=new XMLHttpRequest();
	var theURL = "/user/" + escape2(username) + "/charts?rangetype="+chartType+"&subtype="+subChartType;
	xmlhttp.open("GET", theURL, true);
	xmlhttp.send(null);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {
			var xmlText = xmlhttp.responseText;
			if (!xmlText) {
				return;
			}
			doChart(xmlText, username, chartType, artRank, artPlay);
		}
	}
}

function initNewPanel(oldPanel) {
		var newPanel = document.createElement("div");
		newPanel.setAttribute("class", "myTopTrax");
		newPanel.setAttribute("id", "myTopTraxPan");
		newPanel.setAttribute("style", "width: 100%;");
		oldPanel.parentNode.insertBefore(newPanel,oldPanel.parentNode.firstChild);
		myPan = document.getElementById("hiLightPan");
		newPanel.innerHTML = "<H2 class='heading'><span class='h2Wrapper'>My Top Trax &amp;  Wax for "+artist.replace(/\+/g," ")+"</SPAN></H2>";
		newPanel.innerHTML += "<div class=\"module-body chart chartweek current\" id=\"divMyTopTrax\">";
		newPanel.innerHTML += "</div><hr />";
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

(function() {
	username = getLastfmUsername();
	if (username == "") { return; }
	artistENC = location.href.match(/\/music\/([^\/]*)/)[1];
	if (!artistENC) { return; }
	if (xpath("//H1").snapshotLength > 0) {
		artist = xpath("//H1").snapshotItem(0).innerHTML;
	} else {
		artist = artistENC.replace(/\+/g," ");
	}
	var shtPanel = document.getElementById("shoutbox");
	if (!shtPanel){ return; }
	initNewPanel(shtPanel);
	mychart = document.getElementById("divMyTopTrax");
	if (!mychart) {
		 alert("Can't open chart element");
		return;
	}
	if (!navigator.userAgent.match(/Opera/)) {
		defChartType = GM_getValue("defChartType", defChartType);
		GM_registerMenuCommand("TopTrax: Select chart", promptForChart);
		GM_registerMenuCommand("TopTrax: Toggle album/track",toggleSubType);
	}
	if (!defChartType) { defChartType = "6month"; }
	getTrax(defChartType);
})();

//
// Insert commas to split number into blocks of 3 digits
// Assumes POSTIVE number
//
function commatize(number) {
	var numdp = number.split(".");
	if (numdp.length == 2) {
		var decimal = numdp[1];
	}
	var integer = numdp[0];
	if (integer.length < 4) {
		return(number);
	}
	var stubFrnt = integer.length % 3;
	if (stubFrnt == 0) {stubFrnt = 3;}
	var newnumber = integer.substr(0,stubFrnt);
	var oldPos = stubFrnt;
	while(oldPos < integer.length ) {
		newnumber = newnumber + "," + integer.substr(oldPos, 3);
		oldPos = oldPos + 3;
	}
	if (numdp.length == 2) {
		newnumber = newnumber + "." + decimal;
	}
	return(newnumber);
}
function promptForChart() {
	GM_setValue("chartType", prompt("What chart do you want to use? (overall, week, year, 6month, 3month)", getForChart()));
	if (!chartDescrip[GM_getValue("chartType")]){
		GM_setValue("chartType", "overall");
		defChartType = "overall";
	}
	defChartType=GM_getValue("chartType");
	getTrax(defChartType);
}
function getForChart() {
	return GM_getValue("chartType", "overall");
}