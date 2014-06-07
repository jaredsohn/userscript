// GameTrailers.com User Movie Direct Download
// version 0.2
// 2007-09-14
// Copyright (c) 2007, Neil Craig (neil.big.craig[at]gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          // GameTrailers.com User Movie Direct Download
// @description   This script will add a link to the page to the direct location of the FLV movie file for download
// @include       http://*.gametrailers.com/player/usermovies/*
// ==/UserScript==

(function () {

	/***********************************************************************
	 * Constants
	 ***********************************************************************/
	
	const REGEX = {
	
		umid: /([^\/\\]+)\.(html)/
	
	};
	
	/***********************************************************************
	 * Generic functions
	 ***********************************************************************/
	var GameTrailersTool = {
		
		initialize: function() {
			
			var href = window.location.href;
			
			if (href.match(REGEX.umid))
			{
				GameTrailersTool.getUmDownloadLink(href.match(REGEX.umid)[1]);
			}
			
		},
		
		showUMDownloadLink: function(umfilename) {
			
			
			var downloadElement = getDownloadElement("http://trailers.gametrailers.com/gt_fanmovies/um_" + umfilename + ".flv");
			
			var injectionPoint = GameTrailersTool.findMediaInfoBox();
			
			if (injectionPoint != null)
			{
				injectionPoint.parentNode.insertBefore(downloadElement, injectionPoint);
			}
			else
			{
				GM_log("Error finding injection point");
			}
			
		},
		
		getUmDownloadLink: function(umid) {
			
			
			GM_xmlhttpRequest({method:"GET",
								
				url:'http://mosii.gametrailers.com/getmediainfo2.php?umid=' + umid,

				data: '',

				onload:function(result) {
					
					GameTrailersTool.showUMDownloadLink(getParameter(result.responseText, "umfilename")[1]);

				}
			});
			
		},
		
		findMediaInfoBox: function() {
			
			return ($x('//div[@class="media_infobox"]') != null) ? $x('//div[@class="media_infobox"]')[0]:null;
			
		}
		
	};
	
	/***********************************************************************
	 * Generic functions
	 ***********************************************************************/
	
	function $(id) {
		// Return the element with the correct id
		return document.getElementById(id);
	}
	
	function $x(path) {
		// Evaluate the XPath
		result = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if(result.snapshotLength) {
			var elements = new Array();

			// Add the elements to the array
			for(var i = 0; i < result.snapshotLength; i++)
				elements.push(result.snapshotItem(i));

			return elements;
		} else
			return null;
	}
	
	function getParameter(str, param) {
		
		return str.match(new RegExp('&' + param + '=([^&]*)', 'i'));
	
	}
	
	function getDownloadElement(href) {
		
		var downloadElement = document.createElement("div");
		var downloadLinkElement = document.createElement("a");
		var downloadImgElement = document.createElement("img");

		downloadElement.className = "media_subbar";
		downloadLinkElement.className = "media_subbar_item";
		downloadImgElement.className = "media_subbar_image";
		
		downloadImgElement.src = "/images/gt6deltad.gif";
		downloadImgElement.setAttribute("ilo-full-src", "http://www.gametrailers.com/images/gt6deltad.gif");
		downloadImgElement.setAttribute("alt", "");
		downloadImgElement.style.border = "none";

		downloadLinkElement.href = href;
		downloadLinkElement.appendChild(downloadImgElement);
		downloadLinkElement.appendChild(document.createTextNode(" Download User Movie (.flv)"));

		downloadElement.appendChild(downloadLinkElement);
		
		return downloadElement;
		
	}
	
	/***********************************************************************
	 * Bootstrap code
	 ***********************************************************************/
	window.addEventListener("load", GameTrailersTool.initialize, false);

})();