// ==UserScript==
// @name          Nascondi Persona Facebook
// @description   Nasconde tutti i riferimenti di una persona iscritta a Facebook.
// @include       http://www.facebook.com/*
// ==/UserScript==

function getElementsByClass(theClass) {
	var elementArray = [];

	if (document.all) {
		elementArray = document.all;
	}
	else {
		elementArray = document.getElementsByTagName("*");
	}

	var matchedArray = [];
	var pattern = new RegExp("(^| )" + theClass + "( |$)");

	for (var i = 0; i < elementArray.length; i++) {
		if (pattern.test(elementArray[i].className)) {
			matchedArray[matchedArray.length] = elementArray[i];
		}
	}

	return matchedArray;
};

var post = getElementsByClass('uiStreamStory');

for(var i; i < post.length; i++) {
post.style.background = 'red';
}

alert('fatto');