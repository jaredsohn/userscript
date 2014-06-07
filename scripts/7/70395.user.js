// ==UserScript==
// @name          GeoScore vote link
// @description   Changes the GC code into a link on cache pages
// @include       http://www.geocaching.com/seek/cache_details.aspx?id=*
// @include       http://www.geocaching.com/seek/cache_details.aspx?guid=*
// ==/UserScript==

var splitTitle = document.title.split(' ');
var gcCode = splitTitle[0];
var geoscoreicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oDAxIzH0ylXwwAAAIdSURBVDjLpZNfSFNxFMc/M2Vb3KClmDZvuDX7AzJHucQZFVIUrDVXvfi2p5DA1xAyMsIHewmK9pAENQyih8hEyChZoQ2TgrnRstkqnbXBLXUMr66iHmR3u603f2+/8z18zznf8z2aEk/fH9bxSv8NnKufwF03BYBBl8EoSMxnKpj4ZsYftjP5fZsqX1PYwY3Dg0SlKnyRJiVB1Mp4rUE6bM+p2viL+1EbXS/amFvVqwku2kd5m6pheHYnAK/br3F53Kn8c0Q9jhGSy6UY+3vzI4hamd2GFFcmW5XKCysCe7cmFIK5Vb2Cx9PlSl4JgNca5Ha4WTWb/91+DtR8LBJtINrIoqzHJKTzHbgsIVV1gHvTDVw9+AB7+VeOm9/jsoTYV5lUcF/IQWfAvUZQCAC0Vn+mpSbOfKaCR6du0hs8SVfAo+D6siyXWoaL1zji6efI9hmezVq4/uYQA9FGxtr7GIpZFdUBTEIaoyDlCZLLpYhamQ8LlQzGrKo1RqRavNagakTTph9qIwW+1OOqm6Iz4C4SbSyxY03MAoLceMoWul85udD8GFErFxGMJ8wYdBlVzGUJcSfsAGCDZs/RnsWslpWsgP9EP9OSSGwpv+dPmc08idlI/y4jZ7hdW1KcHT2jFtEXaWLpp45bx+4SkWrpfulUfD+3qkfUypxvfkpTdZzTDzv+fwuFlnVZQhgFiYhUqxzW0ExDkV806z3nvwbKy/ekwlUEAAAAAElFTkSuQmCC';
	
var logo = document.createElement("span");
logo.innerHTML = '<span id="ctl00_uxWaypointName" class="GCCode"><a href="http://www.geocaching.se/?page=stats/vote&cache=' + gcCode + '" rel="nofollow"><img src="' + geoscoreicon + '"></img></a>' + gcCode  + '</span>';

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//span[@class='GCCode']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.replaceChild(logo, thisDiv);
}
