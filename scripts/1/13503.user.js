// ==UserScript==
// @name NHL Shift Charts
// @namespace TOI
// @description for using timeonice.com shift charts and H2H on NHL.com scores page
// @include http://*.nhl.com/*
// ==/UserScript==

var teamLinks = document.evaluate("//span[contains(., 'GAME SHEETS:')]", document, null, 7, null);
for(var i=0; i < teamLinks.snapshotLength; i++){
var foundDiv = teamLinks.snapshotItem(i).parentNode;
var linkDiv = foundDiv.getElementsByTagName("div")[0];
var gameId = foundDiv.id;
var yearId = gameId.substr(gameId.length-10,4);
gameId = gameId.substr(gameId.length-5,5);



var toiLinks = document.evaluate("child::text()", linkDiv, null, 7, null);


var targetNodes = Array();
for(var n=0; n < toiLinks.snapshotLength; n++){
var toiNode = toiLinks.snapshotItem(n);
if( toiNode.textContent.match("TOI - ") ) {
targetNodes.push(toiNode);
}

}

var toiLink = document.createElement('a');
toiLink.href = "http://www.timeonice.com/default.html?GameNumber=" + gameId + "&submit=Go";
toiLink.appendChild(document.createTextNode("TOI"));

targetNodes[0].parentNode.insertBefore(toiLink, targetNodes[0]);
targetNodes[0].textContent = ' | ';

var h2hLink = document.createElement('a');
h2hLink.appendChild(document.createTextNode("H2H"));
switch(yearId)
{
case '2005':
h2hLink.href = "http://www.timeonice.com/H2H0506.html?GameNumber=" + gameId + "&submit=Go";
break;
case '2006':
h2hLink.href = "http://www.timeonice.com/H2H0607.html?GameNumber=" + gameId + "&submit=Go";
break;
case '2007':
h2hLink.href = "http://www.timeonice.com/H2H0708.html?GameNumber=" + gameId + "&submit=Go";
break;
default:
h2hLink.href = "http://www.timeonice.com/H2H0809.html?GameNumber=" + gameId + "&submit=Go";
}

targetNodes[1].parentNode.insertBefore(h2hLink, targetNodes[1]);
targetNodes[1].textContent = ' | ';


}