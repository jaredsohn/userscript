// This Greasemonkey user script removes the Sigularity link and adds links for
// next ladder and next tournament games to the left menu.
//
// I find this very handy for 'reveal' games where you want to submit your move,
// see what happened and then go to the next game.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ItsYourTurn Menu Fix
// @description   Add next game links to the left menu bar
// @include       http://itsyourturn.com/*
// @include       http://www.itsyourturn.com/*
// ==/UserScript==

// remove the useless 'Sigularity' link
var singularityList = document.evaluate(
    "//a[@href='/iyt.dll?sng?fn=10']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < singularityList.snapshotLength; i++)
{
    var thisOne = singularityList.snapshotItem(i);
    thisOne.parentNode.removeChild(thisOne.previousSibling);
    thisOne.parentNode.removeChild(thisOne);
}


// add links for the next ladder game, next tournament game
var nextLadder = document.createElement("a");
nextLadder.innerHTML = '<a href=\'/pp?ng&tourn=2\'><B>Next Ladder</B></a><br>';
var nextTour = document.createElement("a");
nextTour.innerHTML = '<a href=\'/pp?ng&tourn=1\'><B>Next Tournament</B></a><br>';

// find the first new game link and add before that
var newGames = document.evaluate(
    "//a[@href='/pp?newgame']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var newGame = newGames.snapshotItem(0);
if (newGame)
{
    newGame.parentNode.insertBefore(nextLadder, newGame);
    newGame.parentNode.insertBefore(nextTour, newGame);
}
