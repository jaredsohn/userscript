// ==UserScript==
// @name         Permalink fix
// @description  The permalink at the top of every post does not work correctly if you have your posts per page set to a different value than another user (e.g. you're at 10 per page and someone else is at 25).  This corrects that issue.
// @version      1.00
// @date         2010-11-27
// @creator      Ian Ziese / optimusfan
// @include      http://www.tfw2005.com/boards/*
// ==/UserScript==

function isPostAnchor(id) {
	var match = false;
	//RegEx patterns
	var patt1 = /postcount/ig;
	
	var arrMatch = id.match(patt1);
	if (null != arrMatch) {
		match = true;
	}
	
	return match;
}

function isPage(id) {
	var match = false;
	//RegEx patterns
	var patt1 = /[0-9][0-9]*\.html/ig;
	
	var arrMatch = id.match(patt1);
	if (null != arrMatch) {
		match = true;
	}
	
	return match;
}

function findAndReplaceAllByTag(allElements) {
	var thisElement;
	var href;
	var id;
	var newHref;
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (isPostAnchor(thisElement.id)) {
			href = thisElement.href;
			var lastDash = href.lastIndexOf('-');
			//Everything up to the last hyphen is OK
			newHref = href.substring(0, lastDash+1);
			var lastPound = href.lastIndexOf('#');
			if (!isPage(href.substr(lastDash+1, lastPound))) {
				var lastPeriod = href.lastIndexOf('.');
				newHref = newHref + href.substring(lastDash+1, lastPeriod);
				newHref = newHref + '-';
			}
			//Next, we need to see if we're on a page beyond the first
			newHref = newHref + href.substring(lastPound+1);
			newHref = newHref + '.html';
			if (newHref != '') {
				thisElement.href = newHref;
			}		
		}
	}	
}


(function (){
	//console.log('+++++++++++++++++++++++++A+++++++++++++++++++++++++');
	findAndReplaceAllByTag(document.getElementsByTagName('a'));
}());