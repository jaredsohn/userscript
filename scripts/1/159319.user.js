// ==UserScript==
// @name        ReadableFilmographyByRating
// @namespace   ReadableFilmographyByRating
// @description Toggles 'show series' on Actor filmography by rating page
// @author      Rebootr.nl
// @include     http://*.imdb.com/name/*/filmorate
// @include     http://imdb.com/name/*/filmorate
// @version     1
// @grant       none
// @licence     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require	    http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

// Find listed elements that are series episodes

var seriesElements = [];

$('.filmo ol li a').each(function() {
	if( $(this).html().match(/".*"/) ) {
		seriesElements.push($(this).parent('li'));
	}
});

// Add toggler button

var togglerMarkup = '<div style="background-color:#fff;padding:3px 5px;border:1px solid #000;font-size:20px;position:fixed;top:5px;right:5px;cursor:pointer;">Toggle series</div>';

$(togglerMarkup).appendTo('body').click(function() {
	for (i=0;i<seriesElements.length;i++) {
		$(seriesElements[i]).toggle();
	}
});
