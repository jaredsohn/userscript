// ==UserScript==
// @name        Pog Design to Isohunt
// @namespace   PD2Isohunt
// @include     /^http://www\.pogdesign\.co\.uk/cat/(.*(-summary|/Season-\d+/Episode-\d+))?(#.+)?$/
// @version     1.01
// ==/UserScript==

function addIsohuntLinkCalendar() {
	var episodeBoxXPath = "//table[@id='month_box']//tr/td[@class!='noday']/div/p";

	var episodeBoxElements = document.evaluate(
		episodeBoxXPath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	//while ((episodeBoxElement = episodeBoxElements.iterateNext()) != null) {
	for (var i = 0; i < episodeBoxElements.snapshotLength; ++i) {
		var episodeBoxElement = episodeBoxElements.snapshotItem(i);

		var episodeSeriesNameXPath = "./a[1]//text()";
		var episodeCodeXPath = "./a[2]//text()";

		var episodeSeriesName = document.evaluate(
			episodeSeriesNameXPath,
			episodeBoxElement,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue.replace(/\s{2,}/, " ");

		var episodeCodeText = document.evaluate(
			episodeCodeXPath,
			episodeBoxElement,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue;

		var episodeCodeRegExp = /S:\s*(\d+)\s+-\s+Ep:\s+(\d+)\D*/;

		var episodeSeason = episodeCodeText.replace(episodeCodeRegExp, "$1");
		var episodeNumber = episodeCodeText.replace(episodeCodeRegExp, "$2");

		if (episodeSeason.length == 1) episodeSeason = "0" + episodeSeason;
		if (episodeNumber.length == 1) episodeNumber = "0" + episodeNumber;

		var baseLink = "http://www.isohunt.com/torrents/" + episodeSeriesName + " S" + episodeSeason + "E" + episodeNumber;

		console.debug("creating linkElem");
		var linkElem = document.createElement("a");
		linkElem.href = baseLink;

		var linkElem720p = document.createElement("a");
		linkElem720p.href = baseLink + " 720p";
		linkElem720p.style.fontSize = "8px";

		var linkElem1080p = document.createElement("a");
		linkElem1080p.href = baseLink + " 1080p";
		linkElem1080p.style.fontSize = "8px";

		console.debug("creating imgElem");
		var imgElem = document.createElement("img");
		imgElem.src = "http://static.isohunt.com/favicon.png";
		imgElem.width = 16;
		imgElem.height = 16;

		console.debug("inserting img into link");
		linkElem.appendChild(imgElem);

		console.debug("inserting txt into 720p link");
		linkElem720p.appendChild(document.createTextNode("720p"));

		console.debug("inserting txt into 1080p link");
		linkElem1080p.appendChild(document.createTextNode("1080p"));

		console.debug("inserting links into doc");
		episodeBoxElement.appendChild(document.createTextNode(" "));
		episodeBoxElement.appendChild(linkElem);
		episodeBoxElement.appendChild(document.createTextNode(" "));
		episodeBoxElement.appendChild(linkElem720p);
		episodeBoxElement.appendChild(document.createTextNode(" "));
		episodeBoxElement.appendChild(linkElem1080p);
	}
	console.debug("done");
}

function addIsohuntLinkEpisodePage() {
	//var seriesNameXPath = "//h3/a[contains(@href,'/cat/show/')]/text()";
	var seriesNameXPath = "//h3/a[contains(@href,'-summary')]/text()";
	var epNumberingXPath = "//div[@class='sumdata']/div[1]/text()";
	var headerXPath = "//h1[1]/a/parent::node()";
	var trimRegex = /^\s*([\w\s]+?)\s*$/;
	var epNumberingRegex = /.*Season\s+(\d+),\s+Episode\s+(\d+)/;


	var seriesName = document.evaluate(
		seriesNameXPath,
		document,
		null,
		XPathResult.STRING_TYPE,
		null
	).stringValue.replace(trimRegex, "$1");

	var epNumberingText = document.evaluate(
		epNumberingXPath,
		document,
		null,
		XPathResult.STRING_TYPE,
		null
	).stringValue;
	
	var season = epNumberingText.replace(epNumberingRegex, "$1");
	var episode = epNumberingText.replace(epNumberingRegex, "$2");
	
	var baseQuery = "http://www.isohunt.com/torrents/" + seriesName + " S";
	if (season < 10) baseQuery += "0";
	baseQuery += season + "E";
	if (episode < 10) baseQuery += "0";
	baseQuery += episode;
	
	//alert(baseQuery);
	
	var query720 = baseQuery + " 720p";
	var query1080 = baseQuery + " 1080p";

	var headerElem = document.evaluate(headerXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

	// var node = document.createElement("span");
	// node.style = "border: 2px solid pink; position:absolute: width: 100px; height: 100px;";
	// headerElem.appendChild(node);
	// console.debug("taDa!");
	// return;
	
	console.debug("creating linkElem");
	var linkElem = document.createElement("a");
	linkElem.href = baseQuery;

	var linkElem720p = document.createElement("a");
	linkElem720p.href = query720;
	linkElem720p.style.fontSize = "12px";

	var linkElem1080p = document.createElement("a");
	linkElem1080p.href = query1080;
	linkElem1080p.style.fontSize = "12px";

	console.debug("creating imgElem");
	var imgElem = document.createElement("img");
	imgElem.src = "http://static.isohunt.com/favicon.png";
	imgElem.width = 16;
	imgElem.height = 16;

	console.debug("inserting img into link");
	linkElem.appendChild(imgElem);

	console.debug("inserting txt into 720p link");
	linkElem720p.appendChild(document.createTextNode("720p"));

	console.debug("inserting txt into 1080p link");
	linkElem1080p.appendChild(document.createTextNode("1080p"));

	var containerElem = document.createElement("span");
	containerElem.setAttribute("style", "float:right; letter-spacing:0;");

	console.debug("inserting links into doc");
	containerElem.appendChild(document.createTextNode(" "));
	containerElem.appendChild(linkElem);
	containerElem.appendChild(document.createTextNode(" "));
	containerElem.appendChild(linkElem720p);
	containerElem.appendChild(document.createTextNode(" "));
	containerElem.appendChild(linkElem1080p);
	
	headerElem.appendChild(containerElem);
	// }
	// console.debug("done");
}

function addIsohuntLinksSummaryPage() {
	var seriesNameXPath = "//span[@itemprop='name']//text()";
	var seriesName = document.evaluate(
		seriesNameXPath,
		document,
		null,
		XPathResult.STRING_TYPE,
		null
	).stringValue.replace(/^\s*(.+\s*)$/, "$1");
	
	var previousEpisodesListXPath = "//div[contains(@id,'slidepanel')]/div";
	var previousEpisodesList = document.evaluate(
		previousEpisodesListXPath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	console.debug(previousEpisodesList.snapshotLength + " elements");
	for (var i = 0; i < previousEpisodesList.snapshotLength; ++i) {
		console.debug(i);
		var episodeLineElement = previousEpisodesList.snapshotItem(i);

		var episodeNameNode = document.evaluate(
			"./span[2]",
			episodeLineElement,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue;
		
		console.debug(episodeNameNode);

		var episodeCodeText = document.evaluate(
			"./span[2]//text()",
			episodeLineElement,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue.replace(/\s+/, "");
		console.debug(episodeCodeText);

		var myElement = document.createElement("span");

		var baseLink = "http://www.isohunt.com/torrents/" + seriesName + " " + episodeCodeText;

		console.debug("creating linkElem");
		var linkElem = document.createElement("a");
		linkElem.href = baseLink;

		var linkElem720p = document.createElement("a");
		linkElem720p.href = baseLink + " 720p";
		linkElem720p.style.fontSize = "8px";

		var linkElem1080p = document.createElement("a");
		linkElem1080p.href = baseLink + " 1080p";
		linkElem1080p.style.fontSize = "8px";

		console.debug("creating imgElem");
		var imgElem = document.createElement("img");
		imgElem.src = "http://static.isohunt.com/favicon.png";
		imgElem.width = 16;
		imgElem.height = 16;

		console.debug("inserting img into link");
		linkElem.appendChild(imgElem);

		console.debug("inserting txt into 720p link");
		linkElem720p.appendChild(document.createTextNode("720p"));

		console.debug("inserting txt into 1080p link");
		linkElem1080p.appendChild(document.createTextNode("1080p"));

		console.debug("inserting links into doc");
		myElement.appendChild(document.createTextNode(" "));
		myElement.appendChild(linkElem);
		myElement.appendChild(document.createTextNode(" "));
		myElement.appendChild(linkElem720p);
		myElement.appendChild(document.createTextNode(" "));
		myElement.appendChild(linkElem1080p);
		episodeNameNode.appendChild(myElement);
	}
	console.debug("done");
}

function startup_POG() {
	var addIsohuntLinks_calendarRegex = new RegExp("^http://www\\.pogdesign\\.co\\.uk/cat/(#.+)?$");
	var addIsohuntLinks_summaryRegex = new RegExp("^http://www\\.pogdesign\\.co\\.uk/cat/.*-summary(#.+)?$");
	//http://www.pogdesign.co.uk/cat/Dexter/Season-8/Episode-11
	var addIsohuntLinks_episodeRegex = new RegExp("^http://www\\.pogdesign\\.co\\.uk/cat/.*/Season-\\d+/Episode-\\d+(#.+)?$");

	if (addIsohuntLinks_calendarRegex.test(window.location)) {
		addIsohuntLinkCalendar();
	} else if (addIsohuntLinks_episodeRegex.test(window.location)) {
		addIsohuntLinkEpisodePage();
	} else if (addIsohuntLinks_summaryRegex.test(window.location)) {
		addIsohuntLinksSummaryPage();
	} else
		alert(window.location);
}
document.addEventListener("DOMContentLoaded", startup_POG, false);
