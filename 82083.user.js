// ==UserScript==
// @name           Easy MangaReader 
// @namespace      http://www.mangareader.net/*
// @include        http://www.mangareader.net/*
// ==/UserScript==
(function() {
	var numberOfPages = 0;
	var commonUrl;
	var startingNumber;
	var chapNum;
	var currChap, prevChap, nextChap;
	function setNumberOfPages() {
		// Set number of pages.
		pageSelectElement = document.getElementById('listepage')
				.getElementsByTagName("select")[0];
		numberOfPages = pageSelectElement.
				getElementsByTagName('option').length;
	}
	
	function parseUrl() {
		// Get common url from the image url.
		imageElement = document.getElementById("manganinmenusu")
				.getElementsByTagName("img")[0];
		url = imageElement.getAttribute("src");
		lastSlashIndex = url.lastIndexOf("/");
		commonUrl = url.substring(0,lastSlashIndex+1);
		imgPart = url.substring(lastSlashIndex+1);
		lastHyphenIndex = imgPart.lastIndexOf("-");
		if (lastHyphenIndex != -1) {
			chapNum = imgPart.substring(0,lastHyphenIndex);
		}
		else {
			chapNum = -1;
		}
		startingNumber = parseFloat(url.substring(lastSlashIndex+1));
	}
	
	function getUrlList() {
		setNumberOfPages();
		parseUrl();
		containerDiv = document.getElementById("manganinmenusu");
		chapList = containerDiv.getElementsByTagName("div")[0].getElementsByTagName("option");
		for (i=0; i<chapList.length; i++) {
			if (chapList[i].selected) {
				currChap = chapList[i].value;
				if (i>0) {
					prevChap = chapList[i-1].value;
				}
				else {
					div1 = document.getElementById("tepekomple");
					prevChap = div1.getElementsByTagName("a")[0].href;
				}
				if (i==chapList.length-1) {
					div1 = document.getElementById("tepekomple");
					nextChap = div1.getElementsByTagName("a")[0].href;
				}
				else {
					nextChap = chapList[i+1].value;
				}
				break;
			}
		}
		urlList = [];
		if (chapNum == -1) {
			for (i=0;i<numberOfPages+5;i++) {
				urlList[i] = commonUrl + (i + startingNumber) + "_e.jpg";
			}
		}
		else {
			for (i=0;i<numberOfPages+5;i++) {
				urlList[i] = commonUrl + (chapNum) + "-" + (i+1) + ".jpg";
			}
		}
		return urlList;
	}
	
	function generateHtml(urlList) {
		html = "";
		html = html + "<br /><hr /><a href='" + prevChap +"' style='font-size:large;'>Previous Chapter</a><br /><hr />";
		html = html + "<a href='" + nextChap +"' style='font-size:large;'>Next Chapter</a><br /><hr />";
		for (i=0; i<numberOfPages+5; i++) {
			html = html + "<img width='800'"
					+ " align='middle'"
					+ " alt='Page " + (i+1) + "'"
					+ " src='" + urlList[i] + "'/>"
					+ " <br/><hr/>";
		}
		html = html + "<a href='" + nextChap +"' style='font-size:large;'>Next Chapter</a><br /><hr />";
		return html;
	}
	
	function putHtml() {
		imageHtml = generateHtml(getUrlList());
		containerDiv = document.getElementById("manganinmenusu");
		containerDiv.getElementsByTagName("div")[2].innerHTML = imageHtml;
	}
	
	putHtml();
})();
