// ==UserScript==
// @name           Subeta Food/Books Tracker
// @namespace      Shaun Dreclin
// @include        *subeta.net*
// @exclude        *subeta.net/pet_extra*
// ==/UserScript==

var petID = 123456789; // <<-- Set this to your Pet's ID! (Mouse over your pet in the Pets menu to find their ID)
var readIMG = "http://dl.dropbox.com/u/7301739/read.png"; 
var eatenIMG = "http://dl.dropbox.com/u/7301739/eaten.png"; 

var trackBooks = true;   //    <<-- Change these if you don't want to track certain things.
var trackFood = true;    //


//Books
if(trackBooks) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/pet_extra.php?act=read&petid=" + petID,
		onload: function(response) {
			var books = response.responseText.split("</b> has read");
			books = books[1].split("Back To Pet Info");
			books = books[0];

			for(bookIMG in document.getElementsByTagName('img')) { try {
				if(books.indexOf(document.getElementsByTagName('img')[bookIMG].src) != -1) {
					document.getElementsByTagName('img')[bookIMG].src = readIMG;
				}
			} catch(e) {} }
			for(bookIMG in document.getElementsByTagName('input')) { try {
				if(books.indexOf(document.getElementsByTagName('input')[bookIMG].src) != -1) {
					document.getElementsByTagName('input')[bookIMG].src = readIMG;
				}
			} catch(e) {} }
		}
	});
}


//Food
if(trackFood) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://subeta.net/pet_extra.php?act=food&petid=" + petID,
		onload: function(response) {
			var food = response.responseText.split("</b> has eaten");
			food = food[1].split("Back To Pet Info");
			food = food[0];

			for(foodIMG in document.getElementsByTagName('img')) { try {
				if(food.indexOf(document.getElementsByTagName('img')[foodIMG].src) != -1) {
					document.getElementsByTagName('img')[foodIMG].src = eatenIMG;
				}
			} catch(e) {} }
			for(foodIMG in document.getElementsByTagName('input')) { try {
				if(food.indexOf(document.getElementsByTagName('input')[foodIMG].src) != -1) {
					document.getElementsByTagName('input')[foodIMG].src = eatenIMG;
				}
			} catch(e) {} }
		}
	});
}