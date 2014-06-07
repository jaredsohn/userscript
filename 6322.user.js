/*
* LEO-DirectPlay, Version: 0.4, Date: 2008-10-19
* Copyright (C) 2008 Markus Effinger
* Released under the GPL license
* http://www.gnu.org/copyleft/gpl.html
* Based on the version 2005 of
* <revert-button@arcor.de> see http://userscripts.org/scripts/show/2090
*/
// ==UserScript==
// @name LEO-Direct Play
// @description Plays the english pronunciation from Mirriam Webster directly on http://dict.leo.org/
// @include http://dict.leo.org/*
// @exclude http://dict.leo.org/forum/*
// @date 2008-10-19
// @version 0.4
// ==/UserScript==
(function() {
//trigger modifyDiv to modify the "divMoreInfo" as soon as the Ajax request that follows the click on "i" image is finished
var infoDiv=document.getElementById('divMoreInfo');
if (infoDiv) {
	infoDiv.addEventListener('DOMNodeInserted', modifyDiv, true);
}

//triggers the search for the wav file from MirriamWebster as soon as the divMoreInfo is updated
function modifyDiv() {
	var allInfos, thisInfo;
	allInfos = document.evaluate(
	    //"//div[@id='divMoreInfo']/descendant::img[contains(@src,'/p.gif')]/ancestor::a|//div[@id='divMoreInfo']/descendant::td/a[contains(text(),'Definition')]",
	    "//div[@id='divMoreInfo']/descendant::img[contains(@src,'/p.gif')]/ancestor::a",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allInfos.snapshotLength; i++) {
	    thisInfo = allInfos.snapshotItem(i);
	    //thisInfo.addEventListener('click', play, true);
		//Insert divplaydirect to play .wav file if necessary
		var divplaydirect = document.getElementById("playdirect");
		if ((!divplaydirect) || (divplaydirect.getAttribute('source')!=thisInfo.href)) {
			if (!divplaydirect) {
				var divplaydirect = document.createElement("div");
				divplaydirect.setAttribute('source', thisInfo.href);
				divplaydirect.setAttribute('id', 'playdirect');
				thisInfo.parentNode.appendChild(divplaydirect);
			}
			divplaydirect.setAttribute('source', thisInfo.href);
			//Security restrictions prevent direct call of TriggerSearch
			window.setTimeout(function() {
				TriggerSearch(thisInfo.href);
				}, 0);
		}
	}
}

//search for wav file
function TriggerSearch(targeturl)
{
	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url:targeturl,
			onload: getWav,
			onerror: function(rd) {bMtx=false;}
		});
	} catch(e) {
		bMtx=false;
	}
}

//play wav file -  method from http://blog.dyck.org/archives/2006/11/how_to_play_a_w.html
function DHTMLSound(surl) {
  htmlcode="<object id=\"objMediaPlayer\" classid=\"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6\" standby=\"Loading file...\" type=\"application/x-oleobject\">" + 
	"<param name=\"FileName\" value=\""+surl+"\" />"+
	"<param name=\"AutoStart\" value=\"true\" />" +
	"<embed type=\"application/x-mplayer2\" src=\""+surl+"\" autostart=\"true\"></embed>"+
	"</object>";
  if (document.getElementById("playdirect").innerHTML!=htmlcode) {
  	 document.getElementById("playdirect").innerHTML=htmlcode;
  }
}

//get content type of retrieved file
function getContentType(headers) {
   var pairs = {};
   for (h in headers) {
     aPair = headers[h].split(":");
     pairs[aPair[0]]=aPair[1];
   }
   var contentType = null;
   if ( pairs["Content-Type"])
     // strip leading space
     contentType = pairs["Content-Type"].match(/\S.*/);
   return(contentType);
}

//process web request and eventually play the file
function getWav(rD)
{
	try {
		if (rD.status == '200') {
			var headersArray = rD.responseHeaders.toString().split("\n");
			var strContentType = getContentType(headersArray);
			if ((String(strContentType).toLowerCase()=='audio/x-wav') || (String(strContentType).toLowerCase()=='audio/mpeg')) {
				DHTMLSound(targeturl);
			} else {
			// do whatever you want with contentType
			// ....
			var w=rD.responseText.match(/javascript:popWin\(\'\/cgi-bin\/audio.pl\?([^=]+)=.+\'\)/)[1];
			w="http://cougar.eb.com/sound/"+w[0]+"/"+w;
			DHTMLSound(w);
			};
		} else {
			alert("Problem with retrieving Files");
		}
	} catch(e) {
		//alert("No pronunciation found.");
	}
}

})();