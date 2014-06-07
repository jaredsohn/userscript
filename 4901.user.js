// author: Kaili Vesik
//
// ==UserScript==
// @name	Movie Link Adder
// @description	Appends a direct link to the .mov file after each embedded Quicktime movie at onegoodmove.
//		Please note that I make no guarantee as to which script will win if you have enabled
//		both this one and Movie Link Replacer.
// @include	http://*onegoodmove*
// ==/UserScript==


var documentObjects = document.getElementsByTagName('object');
if (documentObjects) {
	addMovieLinks(documentObjects);

	// the next line (commented out) is the only difference between
	// this script and OneGoodMove Embedded Movie Link Replacer
	// removeEmbeddedMovies();
}


// If the supplied object contains a parameter with
// name 'href' and value containing '.mov' (ie, the
// object represents an embedded movie), returns
// the value of that parameter.
// Otherwise, returns null.
function getMovieHref(obj) {
	var currentP, pHref;
	var params = obj.getElementsByTagName('param');

	// check that at least one of the parameters is
	// a reference to a Quicktime movie
	for (var n = 0; n < params.length; n++) {
		currentP = params[n];
		if (currentP) {
			if (currentP.name == "href") {
				pHref = currentP.value;
				if (pHref.indexOf('.mov') > 0) {
					return pHref;
				} else {
					return null;
				}
				break; 
			}
		}
	}

}

// Adds a hyperlink based on the supplied href
// from the movieObject.
function addOneLink(movieHref, movieObject) {
	var movieLoc, movieLink;

	// find the string representing the location of the movie
	movieLoc = movieHref;
	movieLoc = movieLoc.substring(movieLoc.indexOf('http://'), movieLoc.indexOf('.mov') + 4);

	// create the hyperlink and add it to the page
	movieLink = document.createElement('a');
	movieLink.href = movieLoc;
	movieLink.innerHTML = "Play Movie";
	theParent = movieObject.parentNode;
	theParent.insertBefore(movieLink, movieObject);
}

// Checks that each of the supplied objects is an
// embedded movie, and then appends after the pertinent
// ones a hyperlink to the Quicktime .mov file on which
// each is based.
function addMovieLinks(objects) {
	var currentObject, movieHref;

	for (var i = 0; i < objects.length; i++) {
		currentObject = objects[i];
		if (currentObject) {
			movieHref = getMovieHref(currentObject);
			if (movieHref) {
				addOneLink(movieHref, currentObject);
			}
		}
	}
}

// Removes all of the embedded movies from the page.
function removeEmbeddedMovies() {
	var obj;
	var idx = 0;
	var objs = document.getElementsByTagName('object');

	// originally I was hoping to use
	// theParent.replaceChild(movieLink, currentObject) in
	// the for-loop above, but neither this nor
	// theParent.removeChild(currentObject) seem to work in
	// a for-loop, so this while loop repetitively looks up
	// all the objects and returns the first one (or
	// increments which one to remove if there was one that
	// was not an embedded movie

	while(true) {
		if (idx >= objs.length) {
			break;
		}
		var obj = objs[0];
		if (getMovieHref(obj)) {
			obj.parentNode.removeChild(obj);
			objs = document.getElementsByTagName('object');
		} else {
			idx++;
		}
	}
}



