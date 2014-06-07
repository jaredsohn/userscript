// ==UserScript==
// @name           blockClaycord
// @namespace      claycord_usr
// @description    blocks hateful comments by replacing the comment body.
// @include        http://www.claycord.com/*
// ==/UserScript==


var stupidPhrases = new Array (
				// here is the magic
				'funny man'
				);

// this matches IDs Comment-List, comments, myfancycommentz and such ... : 
var regs4commentWrappers = new Array ("comment");

// search any element which has the ID or class that matches
var possibleWrappers = new Array(
					document.getElementsByTagName('div'),
					document.getElementsByTagName('ol'),
					document.getElementsByTagName('ul'),
					document.getElementsByTagName('li'),
					document.getElementsByTagName('span')
				);

for (i=0; i<possibleWrappers.length; i++) {
	for (k=0; k<possibleWrappers[i].length; k++) {
		var parentElm = possibleWrappers[i][k];
		for (m=0; m<regs4commentWrappers.length; m++) {
			if (parentElm.id.match(new RegExp(regs4commentWrappers[m], "ig"))){
				// here might be comments
				var checkThis = parentElm;
			} else if (parentElm.className.match(new RegExp(regs4commentWrappers[m], "ig"))){
				// here might be comments
				var checkThis = true;
			} else {
				var checkThis = false;
			}
		}

		if(checkThis) {
			var lis = parentElm.getElementsByTagName('li');
				for (m=0; m<lis.length; m++){
					// walk through stupidPhrases 
					for (n = 0; n < stupidPhrases.length; n++){
						if (lis[m].innerHTML.match(new RegExp(stupidPhrases[n], "ig"))){
							lis[m].innerHTML="funny man has been blocked! lol";
						}
					}	
				}
			var checkThis = false;
		}
	}
}