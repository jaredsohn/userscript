// ==UserScript==
// @name       Get track data from Spotify
// @namespace  http://www.weightpoint.se
// @version    0.1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description  outputs the result in json to the document
// @match      https://play.spotify.com/*
// @copyright  2013+, Andreas Jorneus
// ==/UserScript==

function testIfCorrectIframe() {
    
    if (/apps\/playlist/.test(window.location.href)) {
        return true;
    }
    return false;
}

$( window ).load(function() {
	
	var foundIframe = testIfCorrectIframe();
    
    console.log("find iframe: " + foundIframe);
    
    if (foundIframe) {
        dumpTrackItems();
    }
    
});

function getTrackData(trackItem) {
    
    var item = $(trackItem),
        trackUrl = "https://play.spotify.com/track/" + item.data("uri").split(":")[2];
    
    return {
        title: item.find(".sp-list-cell-track-name").text(),
        artist: item.find(".sp-list-cell-artist a").text(),
        album: item.find(".sp-list-cell-album a").text(),
		time: item.find(".sp-list-cell-time").text(),
   		trackUrl: trackUrl,
        artistUrl: item.find(".sp-list-cell-artist a").attr("href"),
		albumUrl: item.find(".sp-list-cell-album a").attr("href")
    };
}

function printJsonToDocument(jsonData) {
	window.top.document.write(JSON.stringify(jsonData));
} 

function parseTrackitems(trackItems) {
    var i, retData = [];
    for (i = 0; i < trackItems.length; i++) {
    	var trackItem = trackItems[i];
        
        retData.push(getTrackData(trackItem));
    }
    
    printJsonToDocument(retData);
}



function dumpTrackItems() { 
	var id = window.setInterval(function () {
        var trackItems = $(".sp-list-item");
        
        if (trackItems.length > 0) {
        	window.clearInterval(id);
            parseTrackitems(trackItems);
        }
    }, 1000);
}

