// ==UserScript==
// @name        	LocifyForGeocaching
// @namespace   	http://www.locify.com
// @version       0.4
// @author		   Lukas Vana (Fabian), Locify Ltd.
// @e-mail		   fabian@locify.com
// @description 	Adds link to Locify to geocache listings.
// @include       http://geocaching.com/seek/cache_details.aspx*
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==
var CurrentVersion = "0.4";
GM_registerMenuCommand("LocifyForGeocaching: Check for Update", checkForUpdate);

var lnkConversions, newElement;
lnkConversions = document.getElementById('lnkConversions');
if (lnkConversions) {
	//cache name
	var cacheName = removeSpecialChars(document.getElementById('CacheName').innerHTML);
	//coordinates
	var strHref = lnkConversions.href;
	var lat = '';
	var lon = '';
	var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
	strQueryString = strQueryString.substr(1);
	var aQueryString = strQueryString.split("&");
	for(var iParam = 0; iParam < aQueryString.length; iParam++ ){
		var aParam = aQueryString[iParam].split("=");
		if(aParam[0]=='lat') lat = aParam[1];
		if(aParam[0]=='lon') lon = aParam[1];
	}
	//difficulty
	var difficultyDiv = document.getElementById('Difficulty').innerHTML;
	difficulty = parseBetween(difficultyDiv, 'title="', ' ');
	//terrain
	var terrainDiv = document.getElementById('Terrain').innerHTML;
	terrain = parseBetween(terrainDiv, 'title="', ' ');
	//author
	var authorDiv = document.getElementById('CacheOwner').innerHTML;
	author = removeSpecialChars(parseBetween(authorDiv, '>', '<'));
	//title of the page
	var title = document.title;
	var firstPause = title.indexOf(' ');
	var cacheCode = title.substr(0,firstPause);
   
   //output
   newElement = document.createElement('span');
   newElement.innerHTML = ' <a href="http://www.locify.com/files/create/waypoint?latitude=' + lat + '&longitude=' + lon + '&title=' + cacheName + ' (' + cacheCode + ')&description=Difficulty: ' + difficulty + ', Terrain: ' + terrain + ', Author: ' + author + '"><img src="http://www.locify.com/images/add_to_locify_80x15.png" border="0"></a>';
   newElement.innerHTML += '<div class="geo" style="display:none;">' + cacheName + ' (' + cacheCode + ')<span class="latitude">' + lat + '</span>; <span class="longitude">' + lon + '</span></div>';
   lnkConversions.parentNode.insertBefore(newElement, lnkConversions.nextSibling);
}

//additional waypoints
var allLinks, thisLink, AWCoords, thisTr, thisTd, allTds, AWName, thisTrIndex, allTrs, nextTds, AWNote;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if(thisLink.href.match(/http:\/\/www\.geocaching\.com\/seek\/wpt\.aspx.*/)) {
    	AWName = thisLink.innerHTML;
    	
    	thisTd = thisLink.parentNode;
    	thisTr = thisTd.parentNode;
    	allTds = thisTr.getElementsByTagName('td');
    	AWCoords = getCoordinates(allTds[5].innerHTML);
    	thisTrIndex = thisTr.rowIndex;
    	allTrs = thisTr.parentNode.getElementsByTagName('tr');
    	nextTds = allTrs[(thisTrIndex+1)].getElementsByTagName('td');
    	AWNote = nextTds[1].innerHTML;
    	
    	if(AWCoords != '') {
		   newAWElement = document.createElement('span');
		   newAWElement.innerHTML = ' <a href="http://www.locify.com/files/create/waypoint?latitude=' + AWCoords[0] + '&longitude=' + AWCoords[1] + '&title=' + AWName +'&description=Additional waypoint for cache ' + cacheName + ' (' + cacheCode + '): ' + AWNote + '"><img src="http://www.locify.com/images/add_to_locify_80x15.png" border="0"></a>';
	   	newAWElement.innerHTML += '<div class="geo" style="display:none;">' + AWName + '<span class="latitude">' + AWCoords[0] + '</span>; <span class="longitude">' + AWCoords[1] + '</span></div>';
			thisLink.parentNode.insertBefore(newAWElement, thisLink.nextSibling);
		}
    }
}

function getCoordinates(text) {
	var arr = text.split(' ');

	var lat_h = arr[0];
	var lat_d = parseFloat(arr[1].substr(0, (arr[1].length)-1));
	var lat_m = parseFloat(arr[2]);

	var lat = (lat_d+lat_m/60);

	if(lat_h == "S") lat = lat * (-1);
	
	var lon_h = arr[3];
	var lon_d = parseFloat(arr[4].substr(0, (arr[4].length)-1));
	var lon_m = parseFloat(arr[5]);

	var lon = (lon_d+lon_m/60);

	if(lon_h == "W") lon = lon * (-1);

	return new Array(lat, lon);
}

function parseBetween(text, from, to) {
	var startLength = from.length;
	var start = text.indexOf(from)+startLength;
	var result = text.substr(start);
	var end = result.indexOf(to);
	result = result.substr(0, end);
	
	return result;
}

function checkForUpdate() {

    GM_xmlhttpRequest({

        method: 'GET',

        url: 'http://www.locify.com/scripts/userscripts/locifyForGeocaching.version.txt',

        headers: {

            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14',

            'Accept': 'text/plain,text/html,text/xml',

        },

        onload: function(responseDetails) {

        NewVersion = responseDetails.responseText;

            if ( NewVersion != CurrentVersion ) {

					alert('This version of the LocifyForGeocaching script is outdated.');

					if(confirm('Would you like to update the script now?')) {

						window.location="http://www.locify.com/scripts/userscripts/locifyForGeocaching.user.js";

					}

				} else {

					alert('There are no new updates for the LocifyForGeocaching script available.');
				}

        } 

    })

}

function removeSpecialChars(string) {
	var string = string.replace(/\&/g,"");
	var string = string.replace(/\$/g,"");
	var string = string.replace(/\</g,"");
	var string = string.replace(/\>/g,"");
	var string = string.replace(/\"/g,"");
	
	return string;
}