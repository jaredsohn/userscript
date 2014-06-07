// ==UserScript==
// @name           Subeta Collections Tracker (revised)
// @namespace      Ian Zacher (contains partial code from Shaun Dreclin)
// @include        *subeta.net*
// @exclude        *subeta.net/games/plushie.php*
// @exclude        *subeta.net/games/beanbag.php*
// @exclude        *subeta.net/games/stickers.php*
// @exclude        *subeta.net/games/tradingcards.php*
// @exclude        *subeta.net/item.php*
// @exclude        *facebook*
// ==/UserScript==

var userID = 123456; // <<-- Set this to your User ID! (Right click your Human Avatar and click View Image to find your ID)
var collectedIMG = "http://dl.dropbox.com/u/7301739/collected.png"; 

var trackPlushies = true;	//
var trackBeanbags = true;	//    <<-- Change these if you don't want to track certain things.
var trackCards = true;  	//
var trackStickers = false;	//



var plushiesPresent = false; // (Are there even collectibles present on the page to check for in collections?)
var beanbagsPresent = false;
var cardsPresent = false;
var stickersPresent = false;

var pageURL = document.documentURI;

if(pageURL.split("?")[1] == 'shopid=29') { //If we're in a specific collectibles shop, we know what we don't need scanned
	trackBeanbags = false;
	trackCards = false;
	trackStickers = false;
} else if(pageURL.split("?")[1] == 'shopid=6') {
	trackPlushies = false;
	trackCards = false;
	trackStickers = false;
} else if(pageURL.split("?")[1] == 'shopid=16') {
	trackPlushies = false;
	trackBeanbags = false;
	trackStickers = false;
} else if(pageURL.split("?")[1] == 'shopid=37') {
	trackPlushies = false;
	trackBeanbags = false;
	trackCards = false;
} else if(trackPlushies || trackBeanbags || trackCards || trackStickers) { //Checks all other pages for collectibles
	for(imgIndex in document.getElementsByTagName('img')) { try {
		if(pageURL.split("?")[0] == 'http://subeta.net/shop.php') {
			var keyword = 'input';
		} else {
			var keyword = 'img';
		}
		var checkURL = document.getElementsByTagName(keyword)[imgIndex].src.split("/items/")[1];
		if(checkURL.contains('plushie')) { plushiesPresent = true }
		if(checkURL.contains('beanbag')) { beanbagsPresent = true }
		if(checkURL.contains('tradingcard')) { cardsPresent = true }
		if(checkURL.contains('sticker')) { stickersPresent = true }
	} catch(e) {} }
	if(plushiesPresent == false) { trackPlushies = false }
	if(beanbagsPresent == false) { trackBeanbags = false }
	if(cardsPresent == false) { trackCards = false }
	if(stickersPresent == false) { trackStickers = false }
}


//Plushies
if(trackPlushies) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/games/plushie.php?act=view&user=" + userID,
		onload: function(response) {
			var collectionImages = response.responseText.split("in their collection");
			collectionImages = collectionImages[1].split("</table><br clear='all' />");
			collectionImages = collectionImages[0];

			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
		}
	});
}


//Beanbags
if(trackBeanbags) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/games/beanbag.php?act=view&user=" + userID,
		onload: function(response) {
			var collectionImages = response.responseText.split("in their collection");
			collectionImages = collectionImages[1].split("</table><br clear='all' />");
			collectionImages = collectionImages[0];

			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
		}
	});
}


//Cards
if(trackCards) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/games/tradingcards.php?act=view&user=" + userID,
		onload: function(response) {
			var collectionImages = response.responseText.split("in their collection");
			collectionImages = collectionImages[1].split("</table><br clear='all' />");
			collectionImages = collectionImages[0];

			for(imgIndex in document.getElementsByTagName('img')) { try { //Works most places
				if(document.getElementsByTagName('img')[imgIndex].id.contains('Trading Card')) {
					if(collectionImages.contains(document.getElementsByTagName('img')[imgIndex].id)) {
						document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
					}
				}
			} catch(e) {} }

			if(window.location == 'http://subeta.net/shop.php?shopid=16') { //Trading Card Center
				for(imgIndex in document.getElementsByTagName('form')) { try {
					if(document.getElementsByTagName('form')[imgIndex].childNodes[3].type == 'image') {
						var splitText = document.getElementsByTagName('form')[imgIndex].textContent.split("\n")[4]; //Grab card name
						splitText = splitText.replace(/	/g,''); //Remove tabbed formatting from string
						if(collectionImages.contains(splitText)) {
							document.getElementsByTagName('form')[imgIndex].childNodes[3].src = collectedIMG;
						}
					}
				} catch(e) {} }
			}
		}
	});
}


//Stickers
if(trackStickers) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/games/stickers.php",
		onload: function(response) {
			var collectionImages = response.responseText.split("Order Sticker Album");
			collectionImages = collectionImages[1].split("You have ");
			collectionImages = collectionImages[0];

			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1 && document.getElementsByTagName('img')[imgIndex].src.indexOf("subeta.net/add.png") == -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1 && document.getElementsByTagName('img')[imgIndex].src.indexOf("subeta.net/add.png") == -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
		}
	});
}