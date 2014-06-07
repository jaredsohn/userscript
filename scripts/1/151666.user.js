// Petfinder Thumbnail Enlarger
//
// ==UserScript==
// @name        Petfinder Thumbnail Enlarger
// @version     0.1
// @description Enlarges thumbnails on petfinder.org search results
// @match   http://www.petfinder.com/pet-search*
// ==/UserScript==
//

var petimages = document.getElementsByTagName("img");
for (var i=0; i<petimages.length; ++i) {
	var newSource = petimages[i].getAttribute("src").replace(/\-t\.jpg/, '-pn.jpg');
	petimages[i].setAttribute("src", newSource);
}
