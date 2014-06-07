// ==UserScript==
// @name           _@/ stumbleupon
// @author         Chris Porter
// @version        0.1
// @date           2008-05-26
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://*.stumbleupon.com/*
// ==/UserScript==

document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};


// =================================================================================================
// StumbleUpon
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

var StumbleUpon = {

	site: {

		get video() { return (location.hostname == "video.stumbleupon.com"); }

	},



// -------------------------------------------------------------------------------------------------
// addVideoLinks

	addVideoLinks: function()
	{
	// create an anchor element after the video title, or retrieve it if we've already created it
	var oVideoLink = document.getElementByXPath("//a[@id='videoLink']");
	if (oVideoLink == undefined)
		{
		var oVideoLink = document.createElement("a");
		oVideoLink.id = "videoLink";
		oVideoLink.target = "_new";
		var oVideoTitleSpan = document.getElementByXPath("//span[@id='videoTitle']");
		oVideoTitleSpan.parentNode.appendChild(oVideoLink);
		}

	// get a reference to the video player, and process depending on video source
	var oEmbed = document.getElementByXPath("//div[@id='divPlayer']//div[@id='stumbleVideoContainer']/embed[@id='mymovie']");
	var bUpdatedLink = false;

	// google video
	if (oEmbed.src.indexOf("http://video.google.com/") == 0)
		{
		oVideoLink.innerHTML = "Google Video";
		var sURL = oEmbed.src.substring(oEmbed.src.lastIndexOf("?docId=")+7, oEmbed.src.length);
		sURL = "http://video.google.com/videoplay?docid=" + sURL;
		oVideoLink.href = sURL;
		bUpdatedLink = true;
		}

	// metacafe
	if (oEmbed.src.indexOf("http://www.metacafe.com/") == 0)
		{
		oVideoLink.innerHTML = "metacafe";
		var sURL = oEmbed.src.substring(32, oEmbed.src.length-4);
		sURL = "http://www.metacafe.com/watch/" + sURL + "/";
		oVideoLink.href = sURL;
		bUpdatedLink = true;
		}

	// myspace video
	if (oEmbed.src.indexOf(".myspace.com/") > 0)
		{
		oVideoLink.innerHTML = "MySpace TV";
		var sURL = oEmbed.getAttribute("flashvars"); sURL = sURL.substring(2, sURL.indexOf("&"));
		sURL = "http://vids.myspace.com/index.cfm?fuseaction=vids.individual&VideoID=" + sURL;
		oVideoLink.href = sURL;
		bUpdatedLink = true;
		}

	// youtube
	if (oEmbed.src.indexOf("http://www.youtube.com/") == 0)
		{
		oVideoLink.innerHTML = "YouTube";
		var sURL = oEmbed.src.substring(oEmbed.src.lastIndexOf("/")+1, oEmbed.src.indexOf("&"));
		sURL = "http://www.youtube.com/watch?v=" + sURL;
		oVideoLink.href = sURL;
		bUpdatedLink = true;
		}

	// show or hide the link depending on if we've processed the video
	oVideoLink.style.display = (bUpdatedLink ? "inline" : "none");
	},


// =================================================================================================
// Event Handlers
// =================================================================================================


// ---------------------------------------------------------------------------------------------
// onDomNodeInserted

	onDomNodeInserted: function(event)
	{
	if (StumbleUpon.site.video)
		{
		// wait for the mymovie embed element to be inserted into the page before attempting to process it's source
		if (event.target.tagName == "EMBED")
			{
			if (event.target.id == "mymovie") { StumbleUpon.addVideoLinks(); }
			}
		}
	},


// ---------------------------------------------------------------------------------------------
// onCreate

	onCreate: function()
	{
	window.addEventListener("DOMNodeInserted", StumbleUpon.onDomNodeInserted, true);
	}

};
StumbleUpon.onCreate();
