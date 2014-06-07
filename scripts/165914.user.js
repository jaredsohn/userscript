// ==UserScript==
// @name       Sabrina-Online comic navigation
// @version    0.1
// @description  Lets you use the left and right arrow keys to go to the previous and next pages of the comic at http://www.sabrina-online.com/
// @match      http://www.sabrina-online.com/strips/*.GIF
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

(function() {

"use strict";

window.addEventListener('keydown', function(e) {
	if (e.keyCode === 37) { //left arrow key
		window.location.href = makeURL(getComicNumber() - 1);
	}
        
	else if (e.keyCode === 39) { //right arrow key
        window.location.href = makeURL(getComicNumber() + 1);
    }       
        
}, false);

function makeURL(comicNum) { //Have to do this "lesser than ten" junk because the comic uses 0's to denote numbers under 10 in the URL
    if (comicNum < 10) {
        comicNum = ('0' + comicNum.toString());
    }
    return ('http://www.sabrina-online.com/strips/SabOnline' + comicNum.toString() + '.GIF');
}

function getComicNumber() { //Looks hacky and stupid, but it works. Strips the number from the URL, returning the comic # you are viewing
    return parseInt(window.location.href.match(/(?:http:\/\/www\.sabrina\-online\.com\/strips\/SabOnline)(.*)(?:\.GIF)/i)[1], 10);
}
    
}());
