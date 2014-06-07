// ==UserScript==
// @name         Microformats for Locify
// @namespace    http://www.locify.com/
// @version      0.1
// @author		  Lukas Vana (Fabian), Locify Ltd.
// @e-mail		  fabian@locify.com
// @description  This script find all geo microformats on a page and let you add them to Locify.
// ==/UserScript==
var CurrentVersion = "0.1";
GM_registerMenuCommand("MicroformatsForLocify: Check for Update", checkForUpdate);

var mformats = new Array();
var mformatsCount = 0;

/************************************************
*	GET MICROFORMATS FROM PAGE
*************************************************/
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='geo']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var div = thisDiv.innerHTML;
    var lat = '';
    var lon = '';
    var desc = '';
    if(div.search(/span/) != -1) {
	    desc = removeSpecialChars(removeHtml(parseBetween(div, '', '<span')));
	    lat = parseBetween(div, '<span class="latitude">', '</span>');
	    lon = parseBetween(div, '<span class="longitude">', '</span>');
	 }
	 if(div.search(/abbr/) != -1) {
		var abbr = parseBetween(div, '<abbr class="latitude"', '/abbr>');
		lat = parseBetween(abbr, 'title="', '"');
		desc = parseBetween(abbr, '>', '<');
		
		abbr = parseBetween(div, '<abbr class="longitude"', '/abbr>');
		lon = parseBetween(abbr, 'title="', '"');
		desc += ', ' + parseBetween(abbr, '>', '<');
	 }
	 if(lat != '' && lon != '' && desc != '') {
	    mformats[mformatsCount] = new Array(desc, lat, lon);
	    mformatsCount++;
	 }
}

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//span[@class='geo']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var div = thisDiv.innerHTML;
    coordinates = '';
    if(div.search(/;/) != -1 && div.search(/abbr/) == -1 && div.search(/span/) == -1) {
    	var coordinates = div.split(';');
    }
    if(div.search(/,/) != -1 && div.search(/span/) != -1) {
    	var coordinates = div.split(',');
    	coordinates[0] = parseBetween(coordinates[0], '<span class="latitude">', '</span>');
	   coordinates[1] = parseBetween(coordinates[1], '<span class="longitude">', '</span>');
    }
    if(div.search(/;/) != -1 && div.search(/abbr/) != -1) {
    	var coordinates = div.split(';');
    	coordinates[0] = parseBetween(coordinates[0], '<abbr title="', '" class="latitude">');
	   coordinates[1] = parseBetween(coordinates[1], '<abbr title="', '" class="longitude">');
    }
    //flickr
    if(div.search(/span/) != -1 && coordinates.length == 0) {
    	coordinates = new Array();
    	coordinates[0] = parseBetween(div, '<span class="latitude">', '</span>');
	   coordinates[1] = parseBetween(div, '<span class="longitude">', '</span>');
    }
    if(coordinates != '') {
	    mformats[mformatsCount] = new Array('', trim(coordinates[0]), trim(coordinates[1]));
	    mformatsCount++;
	 }
}

var body = document.getElementsByTagName('body')[0].innerHTML;
var position = 0;
while(position != -1) {
	position = body.search(/<abbr class=\"geo\"/);
	if(position == -1) break;

	var abbr = parseBetween(body, '<abbr class="geo"', '/abbr>');
	var title = parseBetween(abbr, 'title="', '"').split(';');
	var desc = parseBetween(abbr, '>', '<');
	mformats[mformatsCount] = new Array(desc, title[0], title[1]);
	mformatsCount++;
	
	body = body.substr(position+17, body.length);
}

/************************************************
*	VIEW
*************************************************/
if (mformats.length > 0) {
  const LOCIFY_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gHCxYaDhimZ+0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACdklEQVQ4y1XSS2hdVRTG8d8599yTmDQ3hCRSWsFHjTVtBj6oBa0DoTh14kTUqSIOxJHFloJDOxBfOHDkUE2rIJ1UnTR0YGhAxdpWaCVoJWpejbm5N7mPsxychJtuWIO9/99ee+31rSQi7F47uwKVlVmqNd2hSZBus2SXPtu5FL++G7F0iaVZRibFZsHmArUDIhmifUO3sSrGj+qMH5c+/ErShzTgwrFIvz6hcuW8yvqiSjImu36J535imWzmnGzPAdnyH6o/T+s/+6ql794oay8idD4Q8dXhiAgRIZrr4pSIhSsRaysRb+uxCPGpuPXhUDQiZAXSZUw90vtY/x5e/J6L73DfEV6/ekef9A2rLqxpB1na2ZI0UR29U1SZoz3Nb9OMVjG5i43KW2uiSxqdhmgiG9puf5Mv7g9fnqCujM/f5OyhKL3ZfqzOVqMrLbbqtDCwr4RnBsL8PIefYgNNTB3j+jU+rsSOeUm3tDMNiWijtVmyl2d4KxLpXm4r464HORWJ52dLTbtDuxyMNMkHy0GoL5Zw/9PlnMydK887+OGzku19omTdrqJL0SVN80FJoLXea9KN82EeE0d54BDz+HOmN7IbS6JCPlCRFpVc5Kj/00tw+SMaOP4ez5xhDZc/6fH6v1o5aZUsRVEjXbnZE1z9linsf7Is+aBw7Zse/29Tq3a3YWQJin33MvsjYy+F0QkefYGxg/x+ISR49iSrN7l4OizMMU/zyGNyJBFh469fbL7/eFT/butvU+mjEkp7oZ9O0NmikbM0VuO1ueShiYkyAeWXm43QXrulWF9UjYbbq6sCteERnWxQMjAuH7lHPsDwdu7/AXl+F28K1hTTAAAAAElFTkSuQmCC";
  GM_addStyle('#JGRSmain { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("' + LOCIFY_IMAGE + '") no-repeat; -moz-opacity: 0.9; }');
  GM_addStyle("#JGRSmain.subscribed:hover { background: transparent;}");
  GM_addStyle('#JGRSmain:hover { padding: 0; }');
  GM_addStyle('#JGRSmain > div { display: none; }');
  GM_addStyle('#JGRSmain:hover > div { display: block; padding: 5px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 0 1px 1px; }');
  GM_addStyle('#JGRSmain a { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: normal; color: #669; text-decoration: underline; text-align: left; background: #f8f8f8; border: 0; }');
  GM_addStyle('#JGRSmain span { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: bold; color: #669; text-align: left; background: #f8f8f8; border: 0; }');
  GM_addStyle('#JGRSmain a:hover { color: #f66; }');

  var JGRSmain = document.createElement('div');
  JGRSmain.setAttribute('id', 'JGRSmain');
  document.body.appendChild(JGRSmain);

  var JGRSfeeds = document.createElement('div');
  JGRSmain.appendChild(JGRSfeeds);

  JGRSfeeds.innerHTML += '<span>Add to Locify:</span>';
  for (var i = 0, feed; feed = mformats[i]; i++) {
  	 if(feed[0] == '') feed[0] = feed[1] + ', ' + feed[2];
    JGRSfeeds.innerHTML += '<a href="http://www.locify.com/files/create/waypoint?latitude=' + feed[1] + '&longitude=' + feed[2] + '&title=' + feed[0] + '&description=' + getUrl(window.location.href) + '">'+ feed[0] +'</a>';
  }
}

/************************************************
*	FUNCTIONS
*************************************************/
function parseBetween(text, from, to) {
	var startLength = from.length;
	var start = text.indexOf(from)+startLength;
	var result = text.substr(start);
	var end = result.indexOf(to);
	result = result.substr(0, end);
	
	return result;
}

function removeHtml(string) {
	return string.replace(/(<([^>]+)>)/ig,""); 
}

function trim(string) {
	return string.replace(/^\s+|\s+$/g, '') ;
}

function getUrl(url) {
	if(url.indexOf('&') != -1) {
		var afterHttp = url.indexOf('//')+2;
		var protocol = url.substr(0,afterHttp);
		url = url.substr(afterHttp);
		var firstSlash = url.indexOf('/');
		var result = protocol + url.substr(0,firstSlash);
	} else {
		var result = url;
	}

	return 'Coordinates from ' + result;
}

function checkForUpdate() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.locify.com/scripts/userscripts/microformatsForLocify.version.txt',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14',
            'Accept': 'text/plain,text/html,text/xml',
        },
        onload: function(responseDetails) {
        NewVersion = responseDetails.responseText;
            if ( NewVersion != CurrentVersion ) {
					alert('This version of the MicroformatsForLocify script is outdated.');
					if(confirm('Would you like to update the script now?')) {
						window.location="http://www.locify.com/scripts/userscripts/microformatsForLocify.user.js";
					}
				} else {
					alert('There are no new updates for the MicroformatsForLocify script available.');
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