// ==UserScript==
// @name           Subeta Collections Tracker
// @namespace      Shaun Dreclin
// @include        *subeta.net*
// @exclude        *subeta.net/games/plushie.php*
// @exclude        *subeta.net/games/beanbag.php*
// @exclude        *subeta.net/games/stickers.php*
// @exclude        *subeta.net/games/tradingcards.php*
// ==/UserScript==

var userID = 123456789; // <<-- Set this to your User ID! (Right click your Human Avatar and click View Image to find your ID)
var collectedIMG = "http://dl.dropbox.com/u/7301739/collected.png"; 

var trackPlushies = true;   //
var trackBeanbags = true;   //    <<-- Change these if you don't want to track certain things.
var trackCards = true;      //
var trackStickers = true;   //


//Plushies
if(trackPlushies) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/games/plushie.php?act=view&user=" + userID,
		onload: function(response) {
			var collectionImages = response.responseText.split("in their collection");
			collectionImages = collectionImages[1].split("</table><br clear='all' />");
			collectionImages = collectionImages[0];

			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
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

			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
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

			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
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

			for(imgIndex in document.getElementsByTagName('img')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('img')[imgIndex].src) != -1 && document.getElementsByTagName('img')[imgIndex].src.indexOf("subeta.net/add.png") == -1) {
					document.getElementsByTagName('img')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
			for(imgIndex in document.getElementsByTagName('input')) { try {
				if(collectionImages.indexOf(document.getElementsByTagName('input')[imgIndex].src) != -1 && document.getElementsByTagName('img')[imgIndex].src.indexOf("subeta.net/add.png") == -1) {
					document.getElementsByTagName('input')[imgIndex].src = collectedIMG;
				}
			} catch(e) {} }
		}
	});
}