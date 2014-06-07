// ==UserScript==
// @name	Digg - Story Normalizer
// @version	1.3
// @date	2008-07-13
// @namespace	archeorbiter@gmail.com
// @description	Version 1.3 - Adds description to video and image story summaries on Digg.com using the Digg API, and makes general appearance of these stories more uniform with the normal news.
// @include	http://digg.com/*
// @exclude	http://digg.com/search?*
// ==/UserScript==


var xpath = "//div[contains(@class, 'news-summary v')]/div/div[@class='news-details']/a[contains(@id, 'fave')]";
var result = document.evaluate (xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// builds an array of the story IDs
function buildArray() {
idArray = new Array();

	for (var i = 0; i < result.snapshotLength; i++) {
	var storyFave = result.snapshotItem(i).getAttribute('onclick');
	var storyId = storyFave.match(/\((.*?),/)[1];
	idArray.push(storyId);
	}

return idArray;
}


// retrieves data from the Digg API and styles the stories
function getDescription() {
var ids = buildArray();
var appKey = escape('http://archeorbiter.googlepages.com');

	GM_xmlhttpRequest ({
	method: 'GET',
	url: 'http://services.digg.com/stories/' + ids + '?count=' + ids.length + '&appkey=' + appKey + '&type=json',

		onload: function(responseDetails) {
		var response = eval('(' + responseDetails.responseText + ')');

			for (var i = 0; i < result.snapshotLength; i++) {
			var storyDesc = response.stories[i].description;

			var newsBody = result.snapshotItem(i).parentNode.parentNode;
			var newsTitle = newsBody.getElementsByTagName("h3")[0];
			newsTitle.setAttribute('style', 'font-size: 123%; padding: 0');
			var vDetails = newsBody.getElementsByTagName("div")[0];
			vDetails.style.display = 'none';

			// makes a new element, and populates it with the description and other details
			newDetails = document.createElement('p');
			newsBody.insertBefore(newDetails, vDetails);
			var newsSource = vDetails.childNodes[2].innerHTML.match(/([^ ]+)/)[1];
			var newsTopic = vDetails.childNodes[4].innerHTML;
			var topicHref = vDetails.childNodes[4].href;
			newDetails.innerHTML = '<em class=\"source\">' + newsSource + ' —</em> ' + storyDesc + ' <span class=\"topic\"> (<a href=\"' + topicHref + '\">' + newsTopic + '</a>) </span>';

			// repositions the date
			var submitDate = vDetails.childNodes[6].innerHTML;
			var userInfo = newsBody.getElementsByTagName("div")[1].lastChild.previousSibling;
			var userHtml = userInfo.innerHTML;
			var userShort = userHtml.substring(0, userHtml.length-10);
			userInfo.innerHTML = userShort + ' made popular <span class=\"d\">' + submitDate + '</span>';

			// repositions the inaccurate flag
			var inaccFlag = newsBody.getElementsByTagName("div")[1].childNodes[1];

				if (inaccFlag.innerHTML == "[Reported by Diggers as Possibly Inaccurate]") {
				newsBody.insertBefore(inaccFlag, newDetails);
				}
			}
		}
	})
}

getDescription();
