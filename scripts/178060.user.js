// ==UserScript==
// @name        Helper for deleted Youtube Videos from Favorites and Playlists
// @description Easily identify all unavailable Youtube videos from Favorites and Playlists, and retrieve in one click their original names to replace the unreadable videos
// @match	http://www.youtube.com/my_favorites*
// @match	http://www.youtube.com/playlist*
// @match	http://www.youtube.com/watch*
// @match	https://www.youtube.com/my_favorites*
// @match	https://www.youtube.com/playlist*
// @match	https://www.youtube.com/watch*
// @grant	GM_openInTab
// @grant	GM_xmlhttpRequest
// @grant   	GM_getValue
// @grant   	GM_setValue
// @grant	GM_registerMenuCommand
// @version     1.9.7
// @copyright	2012-2013+, Aldebaran Arthemys
// @require 	http://userscripts.org/scripts/source/49700.user.js
// @downloadURL	https://userscripts.org/scripts/source/142211.user.js
// @updateURL	http://userscripts.org/scripts/source/142211.user.js
// ==/UserScript==


var HDYV_m_listBrokenURLs = null;
var HDYV_m_strSearchURL = "http://www.google.com/search?q=";

var strLangBG1 = "Частен видеоклип";       var strLangBG2 = "[Частен видеоклип]";       // Bulgarian
var strLangHR1 = "Privatan videozapis";    var strLangHR2 = "[Privatan videozapis]";    // Croatian
var strLangCS1 = "Soukromé video";         var strLangCS2 = "[Soukromé video]";         // Czech
var strLangEN1 = "Private video";          var strLangEN2 = "[Private Video]";          // English
var strLangDA1 = "Privat video";           var strLangDA2 = "[Privat video]";           // Danish
var strLangNL1 = "Privévideo";             var strLangNL2 = "[Privévideo]";             // Dutch
var strLangFI1 = "Yksityinen video";       var strLangFI2 = "[Yksityinen video]";       // Finnish
var strLangFR1 = "Vidéo privée";           var strLangFR2 = "[Vidéo privée]";           // French
var strLangDE1 = "Privates Video";         var strLangDE2 = "[Privates Video]";         // German
var strLangEL1 = "Απόρρητο βίντεο";        var strLangEL2 = "[Απόρρητο βίντεο]";        // Greek
var strLangHU1 = "Privát videó";           var strLangHU2 = "[Privát videó]";           // Hungarian
var strLangIT1 = "Video privato";          var strLangIT2 = "[Video privato]";          // Italian
var strLangJA1 = "非公開動画";               var strLangJA2 = "（非公開動画）";               // Japanese
var strLangKO1 = "비공개 동영상";             var strLangKO2 = "[비공개 동영상]";            // Korean
var strLangLV1 = "Privāts videoklips";     var strLangLV2 = "[Privāts videoklips]";     // Latvian
var strLangLT1 = "Privatus vaizdo įrašas"; var strLangLT2 = "[Privatus vaizdo įrašas]"; // Lithuanian
var strLangNO1 = "Privat video";           var strLangNO2 = "[privat video]";           // Norwegian
var strLangPL1 = "Film prywatny";          var strLangPL2 = "[Film prywatny]";          // Polish
var strLangPT1 = "Vídeo privado";          var strLangPT2 = "[Vídeo privado]";          // Portuguese
var strLangRO1 = "Videoclip privat";       var strLangRO2 = "[Videoclip privat]";       // Romanian
var strLangRU1 = "Личное видео";           var strLangRU2 = "[Частное видео]";          // Russian
var strLangSR1 = "Приватни видео";         var strLangSR2 = "[Приватни видео]";         // Serbian
var strLangSK1 = "Súkromné video";         var strLangSK2 = "[Súkromné video]";         // Slovak
var strLangSL1 = "Zaseben videoposnetek";  var strLangSL2 = "[Zasebni videoposnetek]";  // Slovenian
var strLangES1 = "Vídeo privado";          var strLangES2 = "[Vídeo privado]";          // Spanish
var strLangSV1 = "Privat videoklipp";      var strLangSV2 = "[Privat videoklipp]";      // Swedish
var strLangUK1 = "Приватне відео";         var strLangUK2 = "[Приватне відео]";         // Ukrainian


/*
	Entry Point
*/
(function()
{
	// Avoid entering iframes
	if(window.top != window.self)
		return true;

	// Settings Configuration initialization
	GM_registerMenuCommand("Helper for deleted Youtube Videos[...] Settings...", GM_config.open);

	// Create the title link
	GM_config.init('Helper for deleted Youtube Videos from Favorites and Playlists Configuration',{
		google_search_mode:  { label: 'Google Search mode:', title: 'Select Youtube video data to be used for Google Searches\nYoutube URL based: look for the whole video url in Google.\nYoutube ID based: look for the video ID in Google.', type: 'radio', options:['Youtube Video URL based (more precision)','Youtube Video ID based (more results)'], default: 'Youtube Video URL based (more precision)' }
	},
	{
		save:function(){ alert("Configuration settings for \"Helper for deleted Youtube Videos[...]\" have been saved.\n\nPlease reload the page to apply your changes."); }
	});

	// Filter the context
	var bResult = false;
	var strURL = window.location.pathname;
	if (strURL == "/playlist")
		bResult = HDYV_ProcessPlaylist();
	else if (strURL == "/my_favorites")
		bResult = HDYV_ProcessFavorites();
	else if (strURL == "/watch" && window.location.search.indexOf("list=") >= 0)
		bResult = HDYV_ProcessWatch();


	// Add the Settings button
	var strDivNodeXPath = "//div[contains(@class, 'playlist-actions')]";
	var buttonsArea = document.evaluate(strDivNodeXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!buttonsArea)
		return false;
	HDYV_CreateSettingsButton(buttonsArea);


	return bResult;
})();


/*
	Reading a playlist...
*/
function HDYV_ProcessPlaylist()
{
	var divNode = document.evaluate("//div[@id='branded-page-body-container' and contains(@class, 'playlist-grid-view')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (divNode)
		return HDYV_ProcessPlaylistGridView();

	return HDYV_ProcessPlaylistVerticalView();
}


/*
	Reading a playlist - Vertical View - or Favorites (read only view)
*/
function HDYV_ProcessPlaylistVerticalView()
{
	var bEditMode = window.location.search.indexOf("action_edit=1") >= 0;

	var strLiNodeXPath = "//div[@id='gh-activityfeed']/ol//li[not(.//p[@class='video-details'])]";
	if (bEditMode)
		strLiNodeXPath = "//ol[@id='playlist-video-items']/li[not(.//p[@class='video-details'])]";


	// Reset internal data
	HDYV_m_listBrokenURLs = new Array();

	// Extract deleted videos
	var liNodes = document.evaluate(strLiNodeXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0; i<liNodes.snapshotLength; i++)
	{
		// Deleted item
		var liNode = liNodes.snapshotItem(i);

		// Extract all <a> tags to fix them
		//var strVideoID = "";
		var strTitle = "";
		var strType = "";
		var bMissingData = false;
		var aNodes = document.evaluate(".//a", liNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var j=0; j<aNodes.snapshotLength; j++)
		{
			var aNode = aNodes.snapshotItem(j);

			// Extract Video ID
			if (j == 0)
			{
				var strVideoLink = aNode.href;
				strVideoLink = HDYV_ExtractVideoLink(strVideoLink);
				if (strVideoLink == "")
				{
					bMissingData = true;
					break;
				}

				strTitle = aNode.getAttribute("title");
				strType = strTitle;
				if (strTitle == "")
				{
					bMissingData = true;
					break;
				}
				strTitle += " : click to retrieve the original name of this video (opens a new tab)";
			}
			else
			{
				// Change Title
				var spanNode = document.evaluate("./span", aNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!spanNode)
				{
					bMissingData = true;
					break;
				}
				spanNode.childNodes[0].nodeValue = strVideoLink;
			}

			// Remove tooltip and href links...
			aNode.removeAttribute("title");
			aNode.removeAttribute("href");


		}
		if (bMissingData)
			continue;

/*
		// ... and add attributes on the parent item
		liNode.setAttribute("title", strTitle);
		liNode.setAttribute("style", "background-color: #FFCCCC");

		// Finally, move the main item under an <a> tab to add the link to Google Search
		var newANode = document.createElement("a");
		var strVideoID = HDYV_ExtractVideoID(strVideoLink);
		newANode.setAttribute("href", HDYV_m_strSearchURL + strVideoID);
		newANode.setAttribute("target", "_blank");
		var parentNode = liNode.parentNode;
		parentNode.insertBefore(newANode, parentNode.childNodes[HDYV_m_listBrokenURLs.length]);
		parentNode.removeChild(liNode);
		newANode.appendChild(liNode);

		// Store the Video ID to be looked for
		HDYV_m_listBrokenURLs.push(strVideoID);
*/






						// ... and add the color attribute on the parent item
						var strVideoIDOnly = HDYV_ExtractVideoIDOnly(strVideoLink);
						var strColor = "#FFCCCC";
						var strThumbnail = "; background-image:url('http://i.ytimg.com/vi/" + strVideoIDOnly + "/default.jpg'); background-repeat:no-repeat; background-position:right;";
						//if (secondaryArea)
						//	strColor = "#FFD8D8";
						if ((strType == strLangBG2) || (strType == strLangHR2) || (strType == strLangCS2) || (strType == strLangEN2) || (strType == strLangDA2) || (strType == strLangNL2) || (strType == strLangFI2) || (strType == strLangFR2) || (strType == strLangDE2) || (strType == strLangEL2) || (strType == strLangHU2) || (strType == strLangIT2) || (strType == strLangJA2) || (strType == strLangKO2) || (strType == strLangLV2) || (strType == strLangLT2) || (strType == strLangNO2) || (strType == strLangPL2) || (strType == strLangPT2) || (strType == strLangRO2) || (strType == strLangRU2) || (strType == strLangSR2) || (strType == strLangSK2) || (strType == strLangSL2) || (strType == strLangES2) || (strType == strLangSV2) || (strType == strLangUK2))
						    liNode.setAttribute("style", "background-color: " + strColor + strThumbnail);
						else
						    liNode.setAttribute("style", "background-color: " + strColor);
						//if (secondaryArea && secondaryArea.children.length > 0)
						//	secondaryArea.children[0].setAttribute("style", "background: none; background-color: " + strColor + "; border-left-color: " + strColor);

						// Sorting out the unavailable videos at the top of the list
						var parentNode = liNode.parentNode;
						parentNode.removeChild(liNode);
						parentNode.insertBefore(liNode, parentNode.childNodes[HDYV_m_listBrokenURLs.length]);

						// Then add a link to the Google Search
						var newANode = document.createElement("a");
						var strVideoID = HDYV_ExtractVideoID(strVideoLink);
						newANode.setAttribute("href", HDYV_m_strSearchURL + strVideoID);
						newANode.setAttribute("target", "_blank");
						newANode.setAttribute("title", strTitle);

						// But into a new <span> element around the thumbnail and video details to customize it
						// without hiding the chekbox behaviour
						var wrappingNode = document.createElement("span");
						newANode.appendChild(wrappingNode);

						// Move the thumbnail and following markups into this new wrapper element
						//var nodesToMove = document.evaluate(".//div[@class='vm-thumb'] | .//div[@class='vm-thumb']/following-sibling::node()", liNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // If someone has an idea about how to simplify this expression, please contact me :)
						var nodesToMove = document.evaluate(".//div[contains(@class, 'playlist-video-item-base-content')] | .//div[contains(@class, 'playlist-video-item-base-content')]/following-sibling::node()", liNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // If someone has an idea about how to simplify this expression, please contact me :)
						for(var j=0; j<nodesToMove.snapshotLength; j++)
						{
							// Node to move into the wrapping node
							var nodeToMove = nodesToMove.snapshotItem(j);

/*
							// Check if the video contains infos
							var nodesVideoInfos = document.evaluate(".[name()='DIV' and contains(@class, 'vm-video-info-container')]/*", nodeToMove, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
							if (nodesVideoInfos.snapshotLength == 1)
							{
								// Add blank items to spread the div height in the parent's area
								var dummySpanNode = document.createElement("span");
								dummySpanNode.setAttribute("class", "vm-video-info");
								dummySpanNode.appendChild(document.createTextNode(" "));
								nodeToMove.appendChild(dummySpanNode);
								nodeToMove.appendChild(dummySpanNode.cloneNode());
								nodeToMove.appendChild(dummySpanNode.cloneNode());
							}
*/

							parentNode = nodeToMove.parentNode;
							parentNode.removeChild(nodeToMove);
							wrappingNode.appendChild(nodeToMove);
						}
						parentNode.appendChild(newANode);
						
						// Store the Video ID to be looked for
						HDYV_m_listBrokenURLs.push(strVideoID);





	}


	// Add the button if needed only
	if (HDYV_m_listBrokenURLs.length > 0)
	{
		var strDivNodeXPath = "//div[contains(@class, 'playlist-actions')]";
		if (bEditMode)
			strDivNodeXPath = "//div[@class='playlist-actions']";
		var buttonsArea = document.evaluate(strDivNodeXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!buttonsArea)
			return false;
		HDYV_CreateSearchAllButton(buttonsArea, false);
	}

	return true;
}


/*
	Reading a playlist - Grid View
*/
function HDYV_ProcessPlaylistGridView()
{
	// Reset internal data
	HDYV_m_listBrokenURLs = new Array();

	// Extract deleted videos
	var liNodes = document.evaluate("//div[@id='playlist-pane-container']/div[@class='primary-pane']//li[not(.//span[@class='video-owner'])]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0; i<liNodes.snapshotLength; i++)
	{
		// Deleted item
		var liNode = liNodes.snapshotItem(i);
		// Extract Video ID
		var aNode = document.evaluate(".//a", liNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!aNode)
			continue;
		var strVideoLink = aNode.href;
		strVideoLink = HDYV_ExtractVideoLink(strVideoLink);
		if (strVideoLink == "")
			continue;
		
		// Change Title and link to Google Search
		var spanNode = document.evaluate(".//span[@title]", liNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!spanNode)
			continue;
		spanNode.childNodes[0].nodeValue = strVideoLink;
		var strTitle = spanNode.getAttribute('title') + " : click to retrieve the original name of this video (opens a new tab)";
		spanNode.setAttribute('title', strTitle);
		aNode.setAttribute('href', 'javascript:void(0);');
		var strVideoID = HDYV_ExtractVideoID(strVideoLink);
		aNode.setAttribute('data-original-html', strVideoID);
		liNode.setAttribute('title', strTitle);
		var strClass = spanNode.getAttribute('class');
		strClass = strClass.replace("yt-uix-tooltip", "");
		spanNode.setAttribute('class', strClass);
		spanNode.setAttribute("style", "color: black"); // not readable otherwise
		spanNode.parentNode.parentNode.setAttribute("style", "background-color: #FFCCCC; display: inherit;");
		liNode.onclick = HDYV_RunGoogleSearch;

		// Move the item to the beginning of the playlist
		var parentNode = liNode.parentNode;
		parentNode.removeChild(liNode);
		parentNode.insertBefore(liNode, parentNode.childNodes[HDYV_m_listBrokenURLs.length]);

		// Store Video ID to be looked for
		HDYV_m_listBrokenURLs.push(strVideoID);
	}


	// Add the button if needed only
	if (HDYV_m_listBrokenURLs.length > 0)
	{
		var buttonsArea = document.evaluate("//div[@id='playlist-action-buttons']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!buttonsArea)
			return false;
		HDYV_CreateSearchAllButton(buttonsArea, false);
	}

	return true;
}


/*
	Modifying favorites
*/
function HDYV_ProcessFavorites()
{
	// Reset internal data
	HDYV_m_listBrokenURLs = new Array()

	// Find deleted videos
	var buttonsArea = null;
	var buttonNode = null;
	var liNodes = document.evaluate("//ol[@id='vm-playlist-video-list-ol']/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (liNodes.snapshotLength > 0)
	{
		buttonsArea = document.evaluate("//div[@id='vm-video-actions-inner']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!buttonsArea)
			return false;
		buttonNode = HDYV_CreateSearchAllButton(buttonsArea, true);
		if (!buttonNode)
			return false;

		for(var i=0; i<liNodes.snapshotLength; i++)
		{
			// Item node
			var liNode = liNodes.snapshotItem(i);


			(function(itemNode, bLastNode)
			{
				// Extract all <a> tags to fix them
				var aNodes = document.evaluate(".//a", liNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (aNodes.snapshotLength == 0)
					return;
				var urlNodes = aNodes;

				var urlNode = urlNodes.snapshotItem(0);
				var strVideoLink = urlNode.href;
	
				GM_xmlhttpRequest({
					method:"GET",
					url:strVideoLink,
					onload:function(response)
					{
						// Finalize the Search button
						if (bLastNode)
						{
							if (HDYV_m_listBrokenURLs.length == 0)
							{
								// Remove the added button
								buttonsArea.removeChild(buttonNode);
							}
							else
							{
								// Update the text
								buttonNode.setAttribute('value','Retrieve the names of the unavailable videos');
							}
						}

						// Convert the opened url
						var doc = HDYV_parseHTML(response.responseText);
						if (!doc)
							return;
		
						// Check whether the url is readable
						var divNode = doc.evaluate("//div[starts-with(@id, 'player-unavailable') and not(contains(@class, 'hid'))]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (!divNode)
							return; // readable video: do nothing

						// Extract Video ID
						strVideoLink = HDYV_ExtractVideoLink(strVideoLink);
						if (strVideoLink == "")
							return;

						var strTitle = "";
						var strType = "";
						var bMissingData = false;
						var secondaryArea = document.evaluate(".//div[@class='vm-video-item-content-secondary']", itemNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						for(var j=0; j<urlNodes.snapshotLength; j++)
						{
							var aNode = urlNodes.snapshotItem(j);
				
							if (j == 1)
							{
								strTitle = aNode.text;
								strType = strTitle;
								if (strTitle == "")
								{
									bMissingData = true;
									break;
								}
								if (secondaryArea)
									strTitle = "Click to try retrieving references on the same uncensured video (opens a new tab)";
								else
								{
									strTitle += " : click to retrieve the original name of this video (opens a new tab)";
			
									// Change text
									aNode.text = strVideoLink;
								}
							}

							// Remove some attributes...
							aNode.removeAttribute("title");
							aNode.removeAttribute("href");
						}
						if (bMissingData)
							return;

						// ... and add the color attribute on the parent item
						var strVideoIDOnly = HDYV_ExtractVideoIDOnly(strVideoLink);
						var strColor = "#FFCCCC";
						var strThumbnail = "; background-image:url('http://i.ytimg.com/vi/" + strVideoIDOnly + "/default.jpg'); background-repeat:no-repeat; background-position:right;";
						if (secondaryArea)
							strColor = "#FFD8D8";
						if ((strType == strLangBG1) || (strType == strLangHR1) || (strType == strLangCS1) || (strType == strLangEN1) || (strType == strLangDA1) || (strType == strLangNL1) || (strType == strLangFI1) || (strType == strLangFR1) || (strType == strLangDE1) || (strType == strLangEL1) || (strType == strLangHU1) || (strType == strLangIT1) || (strType == strLangJA1) || (strType == strLangKO1) || (strType == strLangLV1) || (strType == strLangLT1) || (strType == strLangNO1) || (strType == strLangPL1) || (strType == strLangPT1) || (strType == strLangRO1) || (strType == strLangRU1) || (strType == strLangSR1) || (strType == strLangSK1) || (strType == strLangSL1) || (strType == strLangES1) || (strType == strLangSV1) || (strType == strLangUK1))
						    itemNode.setAttribute("style", "background-color: " + strColor + strThumbnail);
						else
						    itemNode.setAttribute("style", "background-color: " + strColor);
						if (secondaryArea && secondaryArea.children.length > 0)
							secondaryArea.children[0].setAttribute("style", "background: none; background-color: " + strColor + "; border-left-color: " + strColor);

						// Sorting out the unavailable videos at the top of the list
						var parentNode = itemNode.parentNode;
						parentNode.removeChild(itemNode);
						parentNode.insertBefore(itemNode, parentNode.childNodes[HDYV_m_listBrokenURLs.length]);

						// Then add a link to the Google Search
						var newANode = document.createElement("a");
						var strVideoID = HDYV_ExtractVideoID(strVideoLink);
						newANode.setAttribute("href", HDYV_m_strSearchURL + strVideoID);
						newANode.setAttribute("target", "_blank");
						newANode.setAttribute("title", strTitle);

						// But into a new <span> element around the thumbnail and video details to customize it
						// without hiding the chekbox behaviour
						var wrappingNode = document.createElement("span");
						newANode.appendChild(wrappingNode);

						// Move the thumbnail and following markups into this new wrapper element
						var nodesToMove = document.evaluate(".//div[@class='vm-thumb'] | .//div[@class='vm-thumb']/following-sibling::node()", itemNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // If someone has an idea about how to simplify this expression, please contact me :)
						for(var j=0; j<nodesToMove.snapshotLength; j++)
						{
							// Node to move into the wrapping node
							var nodeToMove = nodesToMove.snapshotItem(j);

							// Check if the video contains infos
							var nodesVideoInfos = document.evaluate(".[name()='DIV' and contains(@class, 'vm-video-info-container')]/*", nodeToMove, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
							if (nodesVideoInfos.snapshotLength == 1)
							{
								// Add blank items to spread the div height in the parent's area
								var dummySpanNode = document.createElement("span");
								dummySpanNode.setAttribute("class", "vm-video-info");
								dummySpanNode.appendChild(document.createTextNode(" "));
								nodeToMove.appendChild(dummySpanNode);
								nodeToMove.appendChild(dummySpanNode.cloneNode());
								nodeToMove.appendChild(dummySpanNode.cloneNode());
							}

							parentNode = nodeToMove.parentNode;
							parentNode.removeChild(nodeToMove);
							wrappingNode.appendChild(nodeToMove);
						}
						parentNode.appendChild(newANode);
						
						// Store the Video ID to be looked for
						HDYV_m_listBrokenURLs.push(strVideoID);
					},
					onerror: function(response)
					{
					      alert(
					          [
					            response.status,
					            response.statusText,
					          ].join("\n"));
					}
				});

			}) (liNode, i==liNodes.snapshotLength-1);
		}	
	}

	return true;
}


/*
	Watching a playlist
*/
function HDYV_ProcessWatch()
{
	// Reset internal data
	HDYV_m_listBrokenURLs = new Array()

	// Extract deleted videos
	var liNodes = document.evaluate("//ol[@id='watch7-playlist-tray']/li[contains(@class, 'playlist-bar-item-unviewable')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0; i<liNodes.snapshotLength; i++)
	{
		// Node to remove
		var liNode = liNodes.snapshotItem(i);

		liNode.parentNode.removeChild(liNode);
	}

	if (liNodes.snapshotLength > 0)
	{
		var itemCountNode = document.evaluate("//span[@id='watch7-playlist-length']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (itemCountNode)
		{
			// Update the number of videos
			var nTotalCount = parseInt(itemCountNode.textContent);
			itemCountNode.childNodes[0].nodeValue = (nTotalCount-liNodes.snapshotLength).toString() + " (-" + liNodes.snapshotLength + ")";

			// Update the video links to the previous and next buttons due to the removal of some videos
			var currItem = document.evaluate("//ol[@id='watch7-playlist-tray']/li[contains(@class, 'playlist-bar-item-playing')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (currItem)
			{
				var prevLink = document.evaluate("./a[1]", itemCountNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (prevLink)
				{
					var prevSibling = document.evaluate("(preceding-sibling::li)[last()]", currItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (!prevSibling)
						prevSibling = document.evaluate("(following-sibling::li)[last()]", currItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					var prevNode = document.evaluate("./a[1]", prevSibling, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (prevNode)
						prevLink.setAttribute("href", prevNode.getAttribute("href"));
					
				}

				var nextLink = document.evaluate("./a[2]", itemCountNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (nextLink)
				{
					var nextSibling = document.evaluate("(following-sibling::li)[1]", currItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (!nextSibling)
						nextSibling = document.evaluate("(preceding-sibling::li)[1]", currItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					var nextNode = document.evaluate("./a[1]", nextSibling, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (nextNode)
						nextLink.setAttribute("href", nextNode.getAttribute("href"));
				}
			}
	
			itemCountNode.setAttribute('class', 'yt-uix-tooltip');
			itemCountNode.setAttribute("style", "background-color: #FFCCCC; color: black;");
			itemCountNode.setAttribute('data-tooltip-text','Unavailable videos are hidden from this view. Go to the playlist home page to highlight them and retrieve their original names in one click!');
		}
	}

	return true;
}


/*
	Extract the Youtube Video link from a URL with arguments
*/
function HDYV_ExtractVideoLink(strVideoURL)
{
	var strVideoLink = "";
	var VIDEO_URL_PARAM_NAME="v=";
	var nLeftPos = strVideoURL.indexOf(VIDEO_URL_PARAM_NAME);
	if (nLeftPos >= 0)
	{
		var nRightPos = strVideoURL.indexOf('&', nLeftPos+1+VIDEO_URL_PARAM_NAME.length);
		if (nRightPos < 0)
			nRightPos = strVideoURL.length;
		
		strVideoLink = strVideoURL.substring(0, nRightPos);
	}

	return strVideoLink;
}


/*
	Extract the Youtube Video ID from a link
*/
function HDYV_ExtractVideoID(strVideoLink)
{
	var strGoogleSearchMode = GM_config.read().google_search_mode || "Youtube Video URL based (more precision)";
	if (strGoogleSearchMode == "Youtube Video URL based (more precision)")
		return strVideoLink;

	var strVideoID = "";
	var VIDEO_URL_PARAM_NAME="v=";
	var nLeftPos = strVideoLink.indexOf(VIDEO_URL_PARAM_NAME);
	if (nLeftPos >= 0)
		strVideoID = strVideoLink.substring(nLeftPos+VIDEO_URL_PARAM_NAME.length);

	return strVideoID;
}

function HDYV_ExtractVideoIDOnly(strVideoLink)
{
	var strVideoIDOnly = "";
	var VIDEO_URL_PARAM_NAME="v=";
	var nLeftPos = strVideoLink.indexOf(VIDEO_URL_PARAM_NAME);
	if (nLeftPos >= 0)
		strVideoIDOnly = strVideoLink.substring(nLeftPos+VIDEO_URL_PARAM_NAME.length);

	return strVideoIDOnly;
}


/*
	Create the "Search All" button in the "Action bar"
*/
function HDYV_CreateSearchAllButton(buttonsArea, bAsynchronous)
{
	if (!buttonsArea)
		return null;

	var buttonNode = document.createElement("input");
	buttonNode.setAttribute("type", "button");
	buttonNode.setAttribute("name", "FindInGoogle");
	buttonNode.setAttribute("role", "button");
	var strText = "Retrieve the names of the unavailable videos";
	if (bAsynchronous)
		strText = "Searching for unavailable videos...";
	buttonNode.setAttribute("value", strText);
	buttonNode.setAttribute("class", "yt-uix-button yt-uix-tooltip");
	buttonNode.setAttribute("style", "background-color: #FFCCCC; background-image: none;");
	buttonNode.setAttribute("data-tooltip-text", "Run a Google Search on the ID of each unavailable video to retrieve its original name and replace it with a new link");
	buttonNode.onclick = HDYV_RunGoogleSearch;
	buttonsArea.appendChild(buttonNode);

	return buttonNode;
}


/*
	Create the "Settings" button in the "Action bar"
*/
function HDYV_CreateSettingsButton(buttonsArea)
{
	if (!buttonsArea)
		return null;

	var buttonNode = document.createElement("input");
	buttonNode.setAttribute("type", "button");
	buttonNode.setAttribute("name", "FindInGoogle");
	buttonNode.setAttribute("role", "button");
	buttonNode.setAttribute("value", "HDYV Settings...");
	buttonNode.setAttribute("class", "yt-uix-button yt-uix-tooltip");
	buttonNode.setAttribute("style", "background-color: #FFCCCC; background-image: none;");
	buttonNode.setAttribute("data-tooltip-text", "Open a new dialog box to configure settings of the extension 'Helper for Deleted Youtube Videos'");
	buttonNode.onclick = GM_config.open;
	buttonsArea.appendChild(buttonNode);

	return buttonNode;
}


/*
	Open a new tab on a Google Search
*/
function HDYV_RunGoogleSearch()
{
	if (this.nodeName == 'A')
	{
		var spanNode = document.evaluate(".//span[@title]", this, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!spanNode)
			return;

		GM_openInTab(HDYV_m_strSearchURL + spanNode.textContent);
		return true;
	}
	else if (this.nodeName == 'LI')
	{
		var aNode = document.evaluate(".//a[contains(@class, 'vm-video-title-content') or contains(@class, 'video-tile')]", this, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!aNode)
			return;

		GM_openInTab(HDYV_m_strSearchURL + aNode.getAttribute('data-original-html'));
		return true;
	}

	
	if (!HDYV_m_listBrokenURLs)
	{
		alert('Error: Nothing to retrieve!');
		return false;
	}

	for(var i=0; i<HDYV_m_listBrokenURLs.length; i++)
	{
		GM_openInTab(HDYV_m_strSearchURL + HDYV_m_listBrokenURLs[i]);
	}

	return true;
}


// Creates a document that can be queried with DOM methods.
// Made by sizzlemctwizzle (http://userscripts.org/users/27715)
function HDYV_parseHTML(text) {
	var dt = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01 Transitional//EN', 'http://www.w3.org/TR/html4/loose.dtd'),
		doc = document.implementation.createDocument('', '', dt),
		html = doc.createElement('html'),
		head = doc.createElement('head'),
		body = doc.createElement('body');
	doc.appendChild(html);
	html.appendChild(head);
	body.innerHTML = text;
	html.appendChild(body);
	return doc;
}

