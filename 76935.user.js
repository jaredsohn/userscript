// ==UserScript==
// @name Hide Tags By Class
// @description Allow to selectively hide specific HTML tags which match a specified CLASS name.
// @include *
// ==/UserScript==


// Edit the two values below to match your needs.
// The nameOfTagToMatch variable may be set to "*" to match all tags.

var nameOfTagToMatch = "dd";
var classOfTagToMatch = "registered";


// Do not edit below this point.

function killTagsByClass(tagType, tagClass){
	var element = document.getElementsByTagName(tagType);

	for (i=0; i<element.length; i++) {
		if (element[i].className==tagClass) {
			element[i].style.display="none";
		}
	}
}

killTagsByClass(nameOfTagToMatch,classOfTagToMatch);

