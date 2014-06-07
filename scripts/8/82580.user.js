// ==UserScript==
// @name			IMDB - Movie Rating Check on actor/actress page
// @namespace		http://userscripts.org/users/6623/scripts
// @description		Adds a rating check (IMDB and RottenTomatoes) next to each movie on an actor's/actress's page.
// @version			1.1
// @include			http://*.imdb.com/name/*
// @include			http://imdb.com/name/*
// @include			http://www.imdb.com/title/*/recommendations*
// @include			http://imdb.com/title/*/recommendations*
// ==/UserScript==

//FOR DEBUGGING
// if(unsafeWindow.console){
   // var GM_log = unsafeWindow.console.log;
// }

var checkingAnimation = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh'+
    '/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklr'+
    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAA'+
    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
    'KhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzII'+
    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAA'+
    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
    'ibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
	
var star = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAIAAAB/UwMIAAAACXBIWXMAAAsSAAALEgHS3X78AAAB'+
	'DUlEQVR42o2Sv0rEQBCH80w21wgWV12t4FOkEu4t7gUO7C2swnU2gs1pYaoTCYg5OMwRRETjLfmz'+
	'xE9GJmvcgyw/luzOfpn5zW7QekdTmCxs94zAu7t7jT7XJ9VX0rZ2KPOWTGA+svnQPCR5iceCUeQg'+
	'Jk/OlIH3MO95TN3EqAQBPC8PhdmuTlmySRTJSRQ83U9voxF6vD4SCSOYkCqWwD+1PdzNovMDl1QM'+
	'uQyp6KT4sZvkEkxIxXqktr7rAf/4jzED4Kqurb9vVxfHvSJFvYvqGGOM5FFMSQz7mKZI01SZHgzm'+
	'zyPdE/GN45tFqJj79n4ZLMoJZidsaQwmYWisJw8xyivL6u9DsXITrqVvm9uluL2Y7sYAAAAASUVO'+
	'RK5CYII=';
	
var fresh_icon_uri = "data:image/gif;base64,"+
	"R0lGODlhEAAQALMAAFViHKY0F9c7FJdiHPtGF/51VDuIJlahLYmJJ/6Ia////wAAAP///wAAAAAAAAA"+
	"AACH5BAEAAAwALAAAAAAQABAAAARdkMlJq2WpFHJnyhvBXZpIHKIgVIkpHoOAjNKXHviAoKsUCoQBAG"+
	"cAqHoulRAACBwlQNNgcDAEDNaAJCVyHprfgJYBVBFUgaZAPHGWj+40xXk+rtkVsX7f2es7gBQRADs=";
	
var rotten_icon_uri = 'data:image/gif;base64,'+
	'R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4'+
	'pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
	
var ratingButtonsCreated = false;
var filmographyElem = -1;
var isNewLayoutVersion;

var results = xPath('//h3[contains(text(), "Filmography")]')

//Check what IMDB layout version it is and get the JumpTo div element
if(results.snapshotLength > 0){
	filmographyElem = results.snapshotItem(0);
	isNewLayoutVersion = false;
}
else {
	results = xPath('//h2[contains(text(), "Filmography")]');
	if(results.snapshotLength > 0){
		filmographyElem = results.snapshotItem(0);
		isNewLayoutVersion = true;
	}
	else
		filmographyElem = -1;
}


//Add Label and checkbox
if(filmographyElem != -1){
	var enableRatingLabel = document.createElement('a');
	enableRatingLabel.setAttribute('style','font-weight: bold; font-size: 14px;');
	enableRatingLabel.innerHTML = 'Show/Hide Rating Check Buttons';
	filmographyElem.parentNode.insertBefore(enableRatingLabel, filmographyElem.nextSibling);
	
	var enableRatingCheckBox = document.createElement('input');
	enableRatingCheckBox.setAttribute("type",'checkbox');
	enableRatingCheckBox.setAttribute("value",'Enable Rating Check Buttons');
	enableRatingCheckBox.setAttribute("id",'enableRating');
	enableRatingCheckBox.addEventListener("click", toggleRatingCheckButtons, true);
	enableRatingLabel.parentNode.insertBefore(enableRatingCheckBox, enableRatingLabel.nextSibling);
	
}

/**
*	FUNCTIONS
**/

// Add rating element to each movie on the artist's page
function toggleRatingCheckButtons(){
	if(ratingButtonsCreated){
		var enableRatingCheckBox = document.getElementById('enableRating');
		var visibility;
		
		if(enableRatingCheckBox.checked)
			visibility = "visible";
		else
			visibility = "hidden";
		
		// hide/show imdb buttons
		var findPattern = '//a[contains(@id, "imdb.com/title/")]';
		var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		for(var x=0;x < results.snapshotLength;x++){
			results.snapshotItem(x).setAttribute('style','visibility:'+visibility);
		}
		
		// hide/show RT buttons
		findPattern = '//a[contains(@id, "rottentomatoes.com/alias")]';
		results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		for(var x=0;x < results.snapshotLength;x++){
			results.snapshotItem(x).setAttribute('style','visibility:'+visibility);
		}
	}
	else{
		var findPattern = '//a[starts-with(@href, "/title/")]';
		var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		for(var x=0;x < results.snapshotLength;x++){
			var movieLink = results.snapshotItem(x);
			if(movieLink.getAttribute('onclick') != null && isNewLayoutVersion)
				continue;
			
			var checkIMDBRatingElement = document.createElement("a");
			checkIMDBRatingElement.setAttribute("id",movieLink.href);
			checkIMDBRatingElement.setAttribute("style",'cursor:pointer;');
			checkIMDBRatingElement.setAttribute("alt",'Check IMDB Rating');
			checkIMDBRatingElement.setAttribute("title",'Check IMDB Rating');
			checkIMDBRatingElement.addEventListener("click", checkIMDBRating, true);
			checkIMDBRatingElement.innerHTML = '&nbsp;&nbsp;<img src="'+star+'"/>';
			movieLink.parentNode.insertBefore(checkIMDBRatingElement, movieLink.nextSibling);
			
			// parse imdb ID
			var regexImdbNum = /\/title\/tt(\d{7})\//;
			var id = regexImdbNum.exec(movieLink.href);
			var rottenTomatoesURL = "http://www.rottentomatoes.com/alias?type=imdbid&s=" + id[1];
			
			var checkRTRatingElement = document.createElement("a");
			checkRTRatingElement.setAttribute("id",rottenTomatoesURL);
			checkRTRatingElement.setAttribute("style",'cursor:pointer;');
			checkRTRatingElement.setAttribute("alt",'Check Rotten Tomatoes Rating');
			checkRTRatingElement.setAttribute("title",'Check Rotten Tomatoes Rating');
			checkRTRatingElement.addEventListener("click", checkRTRating, true);
			checkRTRatingElement.innerHTML = '&nbsp;<img src="'+fresh_icon_uri+'"/>';
			checkIMDBRatingElement.parentNode.insertBefore(checkRTRatingElement, checkIMDBRatingElement.nextSibling);

		}
		ratingButtonsCreated = true;
	}
}

function checkIMDBRating(){
	var imdb_url = this.id;
	
	// get all elements that have the same url (some movies are listed numerous times e.g. under Director, Writer etc.)
	var findPattern = '//a[contains(@id, "'+imdb_url+'")]';
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	// change the icon to "loading animation"
	for(var x=0;x < results.snapshotLength;x++){
		var ratingElement = results.snapshotItem(x);
		ratingElement.innerHTML = '&nbsp;&nbsp;<img src="'+checkingAnimation+'" alt="Checking"/>';
	}
	
	GM_xmlhttpRequest({
		url: imdb_url,
		method: 'GET',
		onload: function(response) {
			var rating = parseRating(response.responseText);
			for(var x=0;x < results.snapshotLength;x++){
				var ratingElement = results.snapshotItem(x);
				ratingElement.innerHTML = '&nbsp;&nbsp;(<img src="'+star+'"/>&nbsp;<strong>'+rating+'</strong>)';
			}

		}
	});
	
}

function parseRating(html){
	if(html.indexOf("awaiting 5 votes", index1) != -1)
			return "Awaiting 5 votes";
		
	if(isNewLayoutVersion){// New Layout Version 
		var index1String = '<span itemprop="ratingValue">';
		var index1 = html.indexOf(index1String);
		if(index1 == -1){
			return "No Rating";
		}
		else{
			var index2 = html.indexOf('<',index1 + index1String.length);
			return html.substring(index1 + index1String.length, index2);
		}
	}
	else{ // Old Layout Version
		var index1 = html.indexOf('<div class="starbar-meta">');
		if(index1 == -1){
			index1String = '<span class="rating-rating">';
			index1 = html.indexOf(index1String);
			if(index1 == -1)
				return "No Rating";
		}
		var index2 = html.indexOf("<b>", index1);
		var index3 = html.indexOf("/", index2);
		return html.substring(index2 + "<b>".length, index3);
	}
	
}

// The below code was borrowed from the script "IMDB - add Rottentomatoes info" written by Curtis Gibby, so all credit goes to him :)
// http://userscripts.org/scripts/show/12897

function checkRTRating(){
	var rt_url = this.id;
	// get all elements that have the same url (some movies are listed numerous times e.g. under Director, Writer etc.)
	var findPattern = '//a[contains(@id, "'+rt_url+'")]';
	var ratingElementResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	// change the icon to loading animation
	for(var x=0;x < ratingElementResults.snapshotLength;x++){
		var ratingElement = ratingElementResults.snapshotItem(x);
		ratingElement.innerHTML = '&nbsp;<img src="'+checkingAnimation+'" alt="Checking"/>';
	}
	GM_xmlhttpRequest({
		url: rt_url,
		method: 'GET',
		onload: function(response) {
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			
			var findPattern = "//span[@id='all-critics-meter']";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				var score_html = results.snapshotItem(0).innerHTML;
				if (score_html == "No Reviews Yet...") {
					score_html = "n/a";
					rotten_rating_image_uri = '';
					rotten_rating_text = '';
					for(var x=0;x < ratingElementResults.snapshotLength;x++){
						var ratingElement = ratingElementResults.snapshotItem(x);
						ratingElement.innerHTML = '&nbsp;(<img src="'+rotten_icon_uri+'"/> <strong>No Rating</strong>)';
					}
				}
				else {
					if (parseInt(score_html) >= 60) { // it's fresh
						rotten_rating_image_uri = fresh_icon_uri;
						rotten_rating_text = "Fresh";
					}
					else { // it's rotten
						rotten_rating_image_uri = rotten_icon_uri;
						rotten_rating_text = "Rotten";
					}
					score_html = score_html + "%";
					for(var x=0;x < ratingElementResults.snapshotLength;x++){
						var ratingElement = ratingElementResults.snapshotItem(x);
						ratingElement.innerHTML = '&nbsp;(<img src="'+rotten_rating_image_uri+'"/> <strong>'+score_html+'</strong>)';
					}
				}
			}
			else{ // no rating
				for(var x=0;x < ratingElementResults.snapshotLength;x++){
					var ratingElement = ratingElementResults.snapshotItem(x);
					ratingElement.innerHTML = '&nbsp;(<img src="'+rotten_icon_uri+'"/> <strong>No Rating</strong>)';
				}
			}
		}
	});
}

function xPath(findPattern){
	return document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}