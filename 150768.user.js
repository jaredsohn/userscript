// ==UserScript==
// @name        Girl Genius Comic Next Link
// @namespace   http://userscripts.org/users/Scuzzball
// @description Makes the image a link to the next comic, and arrow keys control movement.
// @include     http://www.girlgeniusonline.com/comic.php?date=*
// @version     1.2
// @grant       none
// ==/UserScript==

function getNextAndPrevious() {
    var allImages = document.getElementsByTagName("img");
    var images = [];
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt == "The Next Comic") {
            images["next"] = allImages[i];
        }
        if (allImages[i].alt == "The Previous Comic") {
            images["previous"] = allImages[i];
        }
        if (allImages[i].alt == "Comic") {
            images["comic"] = allImages[i];
        }
    }
    return images;
}

var images = getNextAndPrevious();
if (images.next) //If there is a next comic
{
	var newComic = document.createElement('a'); //Create the link node to insert the image node into
	newComic.setAttribute('href', images['next'].parentNode);

	var comicImage = document.createElement('img'); //Create the image node
	comicImage.setAttribute('src', 'http://www.girlgeniusonline.com/ggmain/strips/ggmain' + location.search.substring(6) + '.jpg');
	comicImage.setAttribute('border', '0');
	comicImage.setAttribute('height', '1023');
	comicImage.setAttribute('width', '700');


	newComic.appendChild(comicImage); //Put the image in the link node

	var replacedComic = images['comic'].parentNode.replaceChild(newComic, images['comic']); //Switch the curent comic and the linked one
}




function leftArrowPressed() {
	window.location = images['previous'].parentNode;
}

function rightArrowPressed() {
	window.location = images['next'].parentNode;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};