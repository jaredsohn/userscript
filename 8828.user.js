// ==UserScript==
// @name           eHarmony My Matches
// @description    Combine Showpics, Details, and Map scripts with more compact format
// @include        http://*.eharmony.com/singles/servlet/user/mymatches*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

// change to your starting address or zip code
var startAddress = '';

// Kill the top banner ad
var anAd = document.getElementById('OUT8s');
if (anAd) {anAd.parentNode.removeChild(anAd);}

// Kill the survey popup...maybe
var anAd = document.getElementById('fsr_window');
if (anAd) {anAd.parentNode.removeChild(anAd);}

// CSS overrides
GM_addStyle('.match-details { list-style: none; margin: 0; padding: 0; }');
GM_addStyle('.match-details li { display: block; margin: .5em 10px 0 0; padding: 0; }');
GM_addStyle('#myMatchesTabs div.spacer, .bluetab-on { display: none; }');
GM_addStyle('.bluetab-on { display: none; }');
GM_addStyle('div#infobar { border-bottom: none; height: 0px; }');
GM_addStyle('#myMatchesSearch div.sort, #myMatchesSearch div.pagination { padding-top: 5px; }');
GM_addStyle('#myMatchesSearch { height: 30px; }');
GM_addStyle('div.buttonSmall div.left, div.buttonSmall div.right, div.buttonSmall div.label { background-image: none; }')
GM_addStyle('#myMatchesTable td.nextSteps div.commDate { margin-top: 35px; }');
GM_addStyle('.nextSteps small { font-size: 1em; }')

// link address to map
var imageWrappers = document.evaluate(
    "//table[@id='myMatchesTable']/tbody/tr/td[class='name']/div[2]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < imageWrappers.snapshotLength; i++) {
    var addressNode = imageWrappers.snapshotItem(i);
	  var start = addressNode.innerHTML.indexOf("(") + 1;
	  var end = addressNode.innerHTML.indexOf(")");
		try {
		  var address = addressNode.innerHTML.match(/\(([\w ]+, [\w ]+)\)/)[1];

		  var link = "<a target='_blank' href='http://maps.google.com/maps?f=d&hl=en&saddr=" +
			encodeURIComponent(startAddress) + "&daddr=" +
			encodeURIComponent(address) + "'>" + address +'</a>';

		  addressNode.innerHTML = addressNode.innerHTML.replace(address, link);
		} catch (err) {
			GM_log(err + " no address found in " + addressNode.innerHTML);
		}
}

// change match date to elapsed time
var divs = document.evaluate(
  	"//div[@class='matchDate']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < divs.snapshotLength; i++) {
	divs.snapshotItem(i).firstChild.nodeValue = "Matched " + 
		elapsedDays(divs.snapshotItem(i).firstChild.nodeValue) + " days ago";
}

// change last communicated date to elapsed time
var divs = document.evaluate(
  	"//div[@class='commDate']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < divs.snapshotLength; i++) {
	divs.snapshotItem(i).firstChild.nodeValue = "Last communicated " + 
		elapsedDays(divs.snapshotItem(i).firstChild.nodeValue) + " days ago";
}

// reset table column widths
var headerCells = document.evaluate(
    "//table[@id='myMatchesTable']/tbody/tr/th",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (headerCells.snapshotLength > 0) {
	headerCells.snapshotItem(0).width = '25%';
	headerCells.snapshotItem(1).width = '5%';
	headerCells.snapshotItem(2).width = '20%';
	headerCells.snapshotItem(3).width = '30%';

	// insert headers for details
	var nextCell = headerCells.snapshotItem(0);
	var photoHeader = document.createElement('th');
	photoHeader.innerHTML = "Photo";
	photoHeader.width = '20%';
	nextCell.parentNode.insertBefore(photoHeader, nextCell);
}

// add close link
var matchLinks = document.evaluate(
    "//table[@id='myMatchesTable']/tbody/tr/td[last()]/div/div/strong/a",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < matchLinks.snapshotLength; i++) {
	var a = matchLinks.snapshotItem(i);
	var close = document.createElement('a');
	close.href = a.href.replace('comm', 'comm/closematch');
	close.innerHTML = ' <small>Close Match</small>';
	a.parentNode.insertBefore(close, a.nextSibling);
}

// get profile links
profileLinks = document.evaluate(
		"//table[@id='myMatchesTable']/tbody/tr/td/div[1]/strong/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < profileLinks.snapshotLength; i++) {
    createPhotoCell(profileLinks.snapshotItem(i));
}


// determine days elapsed since a day in mm/dd/yyyy format
function elapsedDays(dateText)
{
	var ms2day = 1/(1000*60*60*24);
	var today = new Date();

	try {
		// don't use : in regexp
		var match = dateText.match(/(\d{2}\/\d{2}\/\d{4})/)[1];
		GM_log("matched " + match);
		var startDate = Date.parse(match);
		return Math.round((today - startDate)*ms2day);
	} catch (err) {
		GM_log("Error in elaspedDays: " + err);
	}
}


// insert photos
function createPhotoCell(thisCell)
{		
		var anchors = new Array();
		var page = thisCell.href;
	  var cell = thisCell.parentNode.parentNode.parentNode;
		
		var id = page.match(/[0-9]+/);
		anchors[id]=thisCell;

    var newCell = document.createElement('td');
    
    cell.parentNode.insertBefore(newCell, cell);

    //GM_log('Retrieveing member page ' + id);

    GM_xmlhttpRequest({
       method : 'GET',
	     url : thisCell.href,
       onload: function(responseDetails) {

	       var refText = responseDetails.responseText;
	       //var name = refText.match(/pageTitle"><strong>([A-Za-z]+)</)[1]; //" for syntax highlight

	       var imgURI  = refText.match(/(http:\/\/photos.eharmony.com[^"]+)/g); //" for syntax highlight
			   try {
				   var id     = refText.match(/<input[^>]*name="set"[^>]*value="-?([0-9]+)">/)[1];
			   } catch (exception) {
				   var id = null;
			   }
			   var photoURI = 'http://www.eharmony.com/singles/servlet/comm/photos/matchview?set=' + id;
			
	       if (imgURI != null)
				 {
			   	 	newCell.innerHTML = newCell.innerHTML + "<a href='"+ photoURI +"'><img src='" + imgURI[0] + "' style='border: none'/></a>";
	          newCell.setAttribute('width', '150px');
				    newCell.setAttribute('height', '150px');
				 }
				
	  }
	})
}
