// ==UserScript==
// @name Last.fm - Get last reply date - July 2008
// @namespace
// @description Gets the date of the last post to group forum. For the Opera browser. By snyde1
// @include http://www.last.fm/user/*/groups*
// ==/UserScript==

/* SCRIPT */
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var useColours = 1;

(function() {
	var now = new Date() - 24*3600*1000;
	var latestText; var latestPost;
	var groupLIs = document.getElementsByTagName("li");
	var groupCntAdr = xpath("//DIV[@Class='groupContainer']/STRONG/A");
	var groupCnt = xpath("//DIV[@Class='groupContainer']");
	for (var i = 0; i < groupCnt.snapshotLength; i++ ) {
		var currDate = 0; var latestDate = 0; latestText = "None"; latestPost ="";
		var theURL =  groupCntAdr.snapshotItem(i).href;
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET", theURL+"/forum", false);
		xmlhttp.send(null);
		var xmlText = xmlhttp.responseText;
		if (!xmlText) {
			continue;
		}
		if (xmlText.match(/forumtable/i)){
			xmlText = xmlText.split(/<table cellpadding="0" cellspacing="0" class="forumtable" width="100%">/)[1];
			xmlText = xmlText.split(/<\/table>/i)[0];
			var dateRegex = RegExp('<small><a href="[^"]*\/forum\/([^"]*)">([^<]*)<',"i");
//	Can be problems if latest post is new thread, not a post?
			var timeEx = new RegExp('>(.+)<');
			var msgsTimes = xmlText.split(/<\/tr>/i);
			 var textText; var myAText;
			for (var k=0; k<msgsTimes.length; k++) {
				textText = msgsTimes[k].match(dateRegex);
				if (textText) {
					myAText = textText[2];
					currDate = Date.parse( myAText);
					if( currDate  > latestDate){
						latestDate = currDate ; latestText = myAText;
						latestPost = textText[1];
					}
				}
			}
		}
		latestPost = "<a href="+theURL+"/forum/"+latestPost+">";
		if (latestDate < now){
			latestText=latestText.replace(/,...:..$/,"");
		}
		if (useColours != 0){
		if (latestDate > now){
			latestText="<font color='red'>"+latestText+"</font>";
		}
		else if (latestDate < (now - 365*24000*3600)){
			latestText="<font color='black'>"+latestText+"</font>";
		}
		else if (latestDate < (now - 180*24000*3600)){
			latestText="<font color='black'>"+latestText+"</font>";
		}
		else if (latestDate < (now - 90*24000*3600)){
			latestText="<font color='purple'>"+latestText+"</font>";
		}
		else if (latestDate < (now - 30*24000*3600)){
			latestText="<font color='blue'>"+latestText+"</font>";
		}
		else if (latestDate < (now - 7*24000*3600)){
			latestText="<font color='green'>"+latestText+"</font>";
		} else {
			latestText="<font color='orange'>"+latestText+"</font>";
		}
		}

		groupCnt.snapshotItem(i).innerHTML += " Last <a href="+theURL+"/forum/>forum post</a>:&nbsp;"+latestPost+latestText+"</a>";
	}

})();