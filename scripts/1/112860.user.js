// ==UserScript==
// @name			Cirrus Corporation FB Page Likes
// @author			Kevin Wu
// @namespace		com.salesforce.greasemonkey
// @description		Changes the number of likes on the Cirrus Corporation FB Page
// @license			Creative Commons Attribution License
// @version			0.1
// @include			http://www.facebook.com/cirruscorporation*
// @released		2011-09-12
// @updated			2011-09-12
// @compatible		Greasemonkey
// ==/UserScript==

var statsItems = document.getElementsByClassName('placePageStatsNumber');
var likes = statsItems[0]; //assume first element in list
likes.innerHTML = "68,592";
