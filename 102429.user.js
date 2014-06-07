// ==UserScript==
// @name       LessWrong karma bubble fix
// @version    0.2
// @description A script for the LessWrong community blog ( http://lesswrong.com ). Fixes a design problem with user Karma display for big values of Karma. 
// @include    http://lesswrong.com/*
// @copyright  2011, Vladimir Nesov
// ==/UserScript==

var sideScores = document.getElementsByClassName('score');
var stash = []
for (var i = 0; i<sideScores.length; i++)
    stash[i] = sideScores[i];
for (var i = 0; i<stash.length; i++) {
    var sideScore = stash[i];
    var scoreVal = sideScore.firstChild.wholeText;
    var newScore = document.createElement('div');
    newScore.innerHTML = '<h1>&nbsp;'+scoreVal+'</h1>';
    sideScore.parentNode.replaceChild(newScore, sideScore);
}
