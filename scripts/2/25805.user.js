// ==UserScript==
// @name		Last.fm - Get TOM
// @namespace	http://no.name.space/	
// @description	Display taste-o-meter ratings for user lists
// @include	http://www.last.fm/group/*/members*
// @include	http://www.last.fm/users*
// @include http://www.last.fm/user/*/neighbours*
// @include http://www.last.fm/user/*/friends*
// @include http://www.last.fm/music/*/+listeners*
// ==/UserScript==

// History
// 2007-04-06 : Created - snyde1
// 2008-07-27 : Updated for new look - snyde1

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Ratings (commented colours are the defaults for last.fm for these ratings)
//
var tomColor = new Object();
tomColor.unknown 	= "#777777" ; // "#DDD" ; // "#D01F3C";
tomColor.verylow 	= "#6974bb" ; // "#AAA" ; // "#a0a0a0";
tomColor.low 		= "#55a7d5" ; // "#777" ; // "#777";
tomColor.medium 	= "#4bcad3" ; // "#04F" ; // "#869ab7";
tomColor.high 		= "#85c95b" ; // "#80F" ; // "#4b72a9";
tomColor.veryhigh 	= "#e8a034" ; // "#F0D" ; // "#4e334f";
tomColor.super 		= "#f27164" ; // "#F00" ; // "#D71378";

var tomCount = new Object();
tomCount.unknown 	= 0 ;
tomCount.verylow 	= 0 ;
tomCount.low 		= 0 ;
tomCount.medium 	= 0 ;
tomCount.high 		= 0 ;
tomCount.veryhigh 	= 0 ;
tomCount.super 		= 0 ;

function getLastfmUsername() {
	var usernameLink = xpath("//a[contains(@class,'user-badge')]");
	if (usernameLink.snapshotLength > 0) {
		var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
		userNameLoc = userNameLoc.replace(/<[^<>]*>/g,"").replace(/[ \n]+/g,"");
		return(userNameLoc);
	} else {
		return("");
	}
}

(function () {
	var whoAmI = getLastfmUsername();
	if (whoAmI == "") { return; }

	var neighbours = xpath("//DIV[@Class='vcard']/P[@Class='info']");
	var snoopMe = ""; var snoopAge = 0; var items = new Array();
	var totalAge = 0; var totalF = 0; var totalM = 0; var allAge = 0;
	for (var i = 0; i < neighbours.snapshotLength; i++) {
		snoopMe = neighbours.snapshotItem(i).innerHTML+"";
		if (snoopMe) {
			var snopMe = snoopMe+"";
			if (snopMe.match(/Female/)) {totalF++;}
			if (snopMe.match(/Male/)) {totalM++;}
			var thisAge = snopMe.match(/[^0-9]*([0-9]*)[^0-9]*/)[1]+"";
			if (thisAge) { totalAge = totalAge + parseInt(thisAge); allAge++;}
		}
	}
	var aveAge = (totalAge/allAge);
	var doHere = xpath("//DIV[@Class='skyWrap']");
	var dispString = "<br><font size=-1>&nbsp;Vital Stats: (for "+neighbours.snapshotLength+")&nbsp; Female: "+totalF+"; Male: "+totalM+"; Average Age (of "+allAge+"): "+aveAge.toFixed(2)+" years</font><br>";
	if (doHere.snapshotLength > 0) {
		doHere.snapshotItem(0).innerHTML = dispString + doHere.snapshotItem(0).innerHTML;
	}

// Don't waste time on my neighbours - they're super
//	var regexp = new RegExp("user\\/"+ whoAmI + "\\/neighbours");
//	if (location.href.match(regexp, "i")) { return; }

	var summValues = 0;

	if (location.href.match(/\/neighbours/,"i")) {
		var names = xpath("//div[@class='vcard']/strong[@class='summary']/a");
	} else {
		var names = xpath("//div[@class='vcard']/strong/a");
	}
	if (names.snapshotLength < 1) { return; }

	for (var i = 0; i < names.snapshotLength ; i++ ) {
		var username = names.snapshotItem(i).text;
		username = username.replace(/^ */,"");
		var xmlhttp=new XMLHttpRequest();
		var theURL = "http://www.last.fm/user/" + username + "/tasteomatic/";
		xmlhttp.open("GET", theURL, false);
		xmlhttp.send(null);
		var xmlText = xmlhttp.responseText;
		var textName = xmlText; var textValue = 0;
		regexp = /<strong class="reading">([^<]*)<\/strong>/i;
		if (textName.match(regexp)) {
			textName = textName.match(regexp)[1];
			regexp = /<span style="width: ([0-9\.]*)%;">/;
			if (xmlText.match(regexp)) {
				textValue = parseInt(xmlText.match(regexp)[1]);
			}
		}
		else {
			textName = "Unknown";
		}
		var className = textName.toLowerCase().replace(/ /g,"");
		names.snapshotItem(i).innerHTML += " ("+ textName +")";
		names.snapshotItem(i).title = "Match = " + textName + " " + textValue +"%, "+ names.snapshotItem(i).title;
		names.snapshotItem(i).style.color = tomColor[className];
		tomCount[className]++;
		summValues += textValue;
	}
	dispString = "<font size=-1> TOM: ";
	dispString += "<font color=\""+tomColor.super+"\"> Super: "+tomCount.super+"</font>,";
	dispString += "<font color=\""+tomColor.veryhigh+"\"> Very High: "+tomCount.veryhigh+"</font>,";
	dispString += "<font color=\""+tomColor.high+"\"> High: "+tomCount.high+"</font>,";
	dispString += "<font color=\""+tomColor.medium+"\"> Medium: "+tomCount.medium+"</font>,";
	dispString += "<font color=\""+tomColor.low+"\"> Low: "+tomCount.low+"</font>,";
	dispString += "<font color=\""+tomColor.verylow+"\"> Very Low: "+tomCount.verylow+"</font>,";
	dispString += "<font color=\""+tomColor.unknown+"\"> Unknown: "+tomCount.unknown+"</font>.";
	var summString = (summValues/names.snapshotLength).toFixed(1);
	dispString += "<br>&nbsp;Average TOM value is "+summString+"%</font>";
	if (doHere.snapshotLength > 0) {
		doHere.snapshotItem(0).innerHTML = dispString + doHere.snapshotItem(0).innerHTML;
	}

})();