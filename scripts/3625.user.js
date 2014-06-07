// Credit goes to the original coder of this script at spriggs.blogspot.com.  This is his NBA script modified for MLB
// ==UserScript==
// @name        Yahoo Fantasy MLB Game Log Link
// @namespace   http://userscripts.org
// @description Provides a link graphic to the player's game log
// @include     http://baseball.fantasysports.yahoo.com/*
// ==/UserScript==

var allElements;
var thisElement;
var playerLink = "http://sports.yahoo.com/mlb/players/"
var gameLogLink;


allElements = document.evaluate(
    "//*[contains(@href, 'http://sports.yahoo.com/mlb/players/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allElements.snapshotLength; i++) {

    thisElement = allElements.snapshotItem(i);

    if (thisElement.href.indexOf('news') == -1) {

	  gameLogLink = document.createElement('a');
      gameLogLink.setAttribute("href",thisElement.href + "/gamelog")
      gameLogLink.setAttribute("target","_blank")
      gameLogLink.setAttribute("title","game log link")
      
      gameLogLinkGraphic = "data:image/gif;base64,"+
        "R0lGODlhEgALANUAAJlnA9/Z0OGdOOaJAPzu2c57APO6ZseJLPfeuahxIP78"+
        "+OGND75yAPbOku2bIeF5AO+qQ/Xo1fTEfOmTEueeL+6iMbNrAOySC/7z5OmU"+
        "Fu+mOt6TJPG1WNd+AKtmAPTBdPPIieN9AK18NPrkw+eOCsR0AOimQf///+2e"+
        "KeyUEvft3v3v2+yXF9iBAqxpAOuNA9yEAPfRmffFc/CvS/337eSGAO+oP///"+
        "/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUADcALAAAAAASAAsAAAZ5"+
        "wJuQ9oFoNCiUg8UyRYTQm2F2TC5TqcUmKrTZHJewuNZqcW8aB+F0kjRWqVqh"+
        "cK4oPqTaA4RJwQolZygKHCNtb34lDGcOdyEIMW8THQwWZywva20SbCoHllwZ"+
        "GQOkpX8WHmcUCzAdHYAlJS4ACWcRAi1zihaoIgFQQQA7"
   
      
      gameLogLink.innerHTML = "<img border='0' src='" + gameLogLinkGraphic +"'>" 
      thisElement.parentNode.insertBefore(gameLogLink, thisElement.nextSibling.nextSibling);

      
    }
}


