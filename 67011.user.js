// ==UserScript==
// @name           Neowin No Green Quotes/No Sigs/I spy/Online img
// @namespace      Neowin forum
// @description    Removes signatures and replaces ugly green quotes from Neowin forums. Adds Spy button, custom online image
// @include        http://www.neowin.net/*
// @run-at document-start
// ==/UserScript==

var defBorderColor = '#CFD8DF';
var defBackStyle = 'url("http://www.neowin.net/forum/public/style_images/atlas_forum/button_bg.png") repeat-x' ; 

var defImgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAABEUlEQVQoz5WSPUvDUBSGn1xuCFzSqBS5IH4SMCKiIB0cHHV0Ki6if8jNwaWro3OmCi5CQaSgW0VEq0uGOKRwBxMSh1LqFUF7xpf34bznw6mqiklKAiRJUnVf77h8uKCfvViGxWCZw80TtpcaaK0dCZBlGa3bMzb2u%2BxEqQW89Z5otT84nTlHaz3sYIxh8JmxEKXc%2F4iwFaV04gxjDAACoCiKP7OPPPK72AGer2yj2ftlaOAG2AVwp%2F%2BxJQDfrVH06qw27KEHvTq%2BW7MBKWW%2FGR7Tvp7iMX63gDk1TzM8QEo5BpRS8drs%2BtFKEFKWJaNjOo6DEALP81BKjYEgCLQQAmMMeZ5bgOu6KKXwfX%2BoTfoaXwO%2FV1D0kZ80AAAAAElFTkSuQmCC";

var defImgStyle = "";//"10px 10px no-repeat";

function xpath(query, element) {
	return document.evaluate(query, element, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function prettyQuotes(borderColor, topBarBackStyle) {
	var defBorderColor = '#CFD8DF';
	var allQuoteDivs, thisQuoteDiv;
	allQuoteDivs = xpath("//div[@class='blockquote']", document);
	for ( i = 0; i < allQuoteDivs.snapshotLength; i++ ) {
		thisQuoteDiv = allQuoteDivs.snapshotItem(i);
		thisQuoteDiv.style.borderColor = defBorderColor;
		var parentDiv = thisQuoteDiv.parentNode;
		if ( parentDiv ) {
			var ps, p;
			ps = xpath("//p[@class='citation']", parentDiv);
			for ( j = 0; j < ps.snapshotLength; j++ ) {
				p = ps.snapshotItem(i);
				p.style.background = topBarBackStyle;
				p.style.borderColor = borderColor;				
			}
		}
	}
}

function prettyOnline(imgData, imgStyle) {
	var allOnlineSpans, thisOnlineSpan;
	allOnlineSpans = xpath("//span[@class='status-online']", document);
	for ( i = 0; i < allOnlineSpans.snapshotLength; i++ ) {
		thisOnlineSpan = allOnlineSpans.snapshotItem(i);
		thisOnlineSpan.style.background = 'url("' + imgData + '") ' + imgStyle;
		thisOnlineSpan.setAttribute("title", "Online");
	}
}

function filterSigs(all) {
	var allSigDivs, thisSigDiv;
	allSigDivs = xpath("//div[@class='signature']", document);
	for ( i = 0; i < allSigDivs.snapshotLength; i++ ) {
		thisSigDiv = allSigDivs.snapshotItem(i);
		if ( all == true ) {
			while ( thisSigDiv.firstChild ) {
				thisSigDiv.removeChild(thisSigDiv.firstChild);
			}
		} else {
			var allImgs, thisImg;
			allImgs = thisSigDiv.getElementsByTagName('img');
			for ( j = 0; j < allImgs.length; j++ ) {
				thisImg = allImgs[j];
				var src = thisImg.getAttribute("src");
				if ( src ) {
				    var title = thisImg.getAttribute("title");
				    if ( !title ) {
						title = '.';
				    } 
				    thisImg.setAttribute("title",  title + ' | ' + src);
				}
				thisImg.setAttribute("src", "");
				var alt = thisImg.getAttribute("alt");
				if ( alt == undefined || alt.toLowerCase() == "posted image" ) {
					thisImg.setAttribute("alt", " Image was here!");
				}
			}
		}
	}
}

function filterHeaders() {
	var headers = xpath("//div[@id='header-promos']", document);
	var h = headers.snapshotItem(0)
	if ( h ) {
		h.parentNode.removeChild(h);
	}
}

function enableSpy() {
	if ( window.location.href.substring(0, "?app=spy" ) > -1 ) {
		var divblock = document.getElementById('content');
		if ( divblock ) {
			divblock.innerHTML = divblock.innerHTML.replace('class="block-forum boxAd rounded-bot"',
				"I see dead pipl");
		}
	} 
	// let's insert spy button
	var headNav = document.getElementById("header-nav");
	var ISpy = document.getElementById("nav-spy");
	if ( headNav && ISpy ) {
		headNav.innerHTML = headNav.innerHTML.replace('id="nav-spy" class="boxAd',
			'id="Whoa!" class="I spy with my little I');
	}
}

function enableMiniSpy() {
	if ( window.location.href.substring(0, "forum/") > -1 ) {
		var divblock = document.getElementById('content');
		if ( divblock ) {
			divblock.innerHTML = divblock.innerHTML.replace('id="topBannerAd" class="e120x600"',
			'id="Woooooot" class="mini me"');
		}
	}
}

function filterAdBot() {
	var authors = xpath("//div[@class='post-author']", document);
	var author = undefined;
	for ( i = 0; i < authors.snapshotLength; i++ ) {
		author = authors.snapshotItem(i);
		if ( author ) {
			var a = author.getElementsByTagName('a');
			if ( a && a[0] && a[0].innerHTML.toLowerCase() == "ad bot" ) {
				var mainPost = author.parentNode.parentNode.parentNode;
				if ( mainPost ) {
					while ( mainPost.firstChild ) {
						mainPost.removeChild(mainPost.firstChild);
					}			
				}				
				break;
			}
		}
	}
}

function process( def ) {
	if ( def == true ) {
		enableSpy();
		enableMiniSpy();
		filterHeaders();
		filterSigs(false);
		prettyQuotes(defBorderColor, defBackStyle);
		prettyOnline(defImgData, defImgStyle);
		filterAdBot();		
	} else {
		if ( GM_getValue("bigSpy", true) ) {
			enableSpy();
		}
		if ( GM_getValue("miniSpy", true) ) {
			enableMiniSpy();
		}
		if ( GM_getValue("filterHead", true) ) {
			filterHeaders()
		}
		if ( GM_getValue("filterSigsFull", false) ) {
			filterSigs(true);
		}
		if ( GM_getValue("filterSigsLite", true) ) {
			filterSigs(false);
		}
		if ( GM_getValue("filterAdBot", true) ) {
			filterAdBot();
		}		
		if ( GM_getValue("prettyQuotes", true) ) {
			var borderColor = GM_getValue("quotesBorderColor", defBorderColor);
			var backStyle = GM_getValue("quotesBackStyle", defBackStyle);
			prettyQuotes(borderColor, backStyle);
		}
		if ( GM_getValue("prettyOnline", true) ) {
			var imgData = GM_getValue("onlineImgData", defImgData);
			var imgStyle = GM_getValue("onlineImgStyle", defImgStyle);
			prettyOnline(defImgData, defImgStyle);
		}
	}
}

function createUserMenu() {
	GM_registerMenuCommand("-- Show current settings -- ",
		function() {
			alert("Current script settings:\n" +
			"------------------------------\n" +
			"Big spy processing: " + GM_getValue("bigSpy", true) + "\n" +
			"Mini spy processing: " + GM_getValue("miniSpy", true) + "\n" +
			"Header filtering: " + GM_getValue("filterHead", true) + "\n" +
			"Sigs filtering full: " +  GM_getValue("filterSigsFull", false) + "\n" +
			"Sigs filtering lite: " + GM_getValue("filterSigsLite", true) + "\n" +
			"Quotes styling: " + GM_getValue("prettyQuotes", true) + "\n" +
			"Online image styling: " + GM_getValue("prettyOnline", true) + "\n" +
			"Ad bot filtering: " + GM_getValue("filterAdBot", true)
			);
		}
	);
	GM_registerMenuCommand("Enable/Disable Big Spy processing", 
		function () { GM_setValue("bigSpy", !GM_getValue("bigSpy", true)); }
	);
	GM_registerMenuCommand("Enable/Disable Mini Spy processing", 
		function () { GM_setValue("miniSpy", !GM_getValue("miniSpy", true)); }
	);
	GM_registerMenuCommand("Enable/Disable Head filtering", 
		function () { GM_setValue("filterHead", !GM_getValue("filterHead", true)); }
	);	
	GM_registerMenuCommand("Enable/Disable Signature filtering full", 
		function () { 
		var f = GM_getValue("filterSigsFull", true);
		GM_setValue("filterSigsFull", !f);
		GM_setValue("filterSigsLite", f);
		}
	);
	GM_registerMenuCommand("Enable/Disable Signature filtering lite", 
		function () { 
		var f = GM_getValue("filterSigsLite", true);
		GM_setValue("filterSigsLite", !f);
		GM_setValue("filterSigsFull", f);
		}
	);

	GM_registerMenuCommand("Enable/Disable Adbot filtering", 
		function () { GM_setValue("filterAdBot", !GM_getValue("filterAdBot", true)); }
	);		
	
	GM_registerMenuCommand("Enable/Disable Quotes styling", 
		function () { GM_setValue("prettyQuotes", !GM_getValue("prettyQuotes", true)); }
	);	
	
	GM_registerMenuCommand("Enable/Disable Online image styling", 
		function () { GM_setValue("prettyOnline", !GM_getValue("prettyOnline", true)); }
	);	
	GM_registerMenuCommand("Set quotes border color", 
		function () { 
		var borderColor = prompt("Quotes border color",
			GM_getValue("quotesBorderColor", defBorderColor)
			);
		GM_setValue("quotesBorderColor", borderColor); 
		}
	);	
	GM_registerMenuCommand("Set quotes background style", 
		function () { 
		var backStyle = prompt("Quotes background style",
			GM_getValue("quotesBackStyle", defBackStyle)
			);
		GM_setValue("quotesBackStyle", backStyle); 
		}
	);	
	GM_registerMenuCommand("Set online image data", 
		function () { 
		var imgData = prompt("Online image data, this can be url",
			GM_getValue("onlineImgData", defImgData)
			);
		GM_setValue("onlineImgData", imgData); 
		}
	);	
	GM_registerMenuCommand("Set online image style", 
		function () { 
		var imgStyle = prompt("Online image style",
			GM_getValue("onlineImgStyle", defImgStyle)
			);
		GM_setValue("onlineImgStyle", imgStyle); 
		}
	);				
	
}

if ( window.opera ) {
	window.addEventListener(
		'load',
		function () {
			if ( location.hostname.match(/(^|\.)neowin.net$/) ) {
				process(true);
			}
		}, false
	);
} else if ( window.chrome ) {
	process(true);
} else { // should be firefox
	createUserMenu();
	process(false);
}
