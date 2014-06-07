// ==UserScript==
// @name           Ai Syndicate Exclusive
// @namespace      levynlight
// @description    http://apps.facebook.com/levynlight/*
// @include        http://apps.facebook.com/levynlight/turn.php
// @include        http://apps.facebook.com/levynlight/index.php
// @include        http://apps.facebook.com/levynlight/cutscene.php
// ==/UserScript==

var headTitle = document.title;

var timerWordIndex = document.body.innerHTML.indexOf('next_turn_countdown\\":');
var wordlength = 'next_turn_countdown\\":'.length;
var timerIndex = (timerWordIndex + wordlength);
var reloadTimer = parseFloat(document.body.innerHTML.substring(timerIndex, (timerIndex + 3)));

//wait time till reload = 30sec
var timeWait = 30;
var today = new Date();
var nextTurn = (reloadTimer + Math.round(Math.random() * timeWait) + (timeWait / 10)) * 1000;

//Write reload time here
setTimeout(function() { document.location = 'http://apps.facebook.com/levynlight/turn.php'; }, nextTurn);

countdownTime = parseInt(nextTurn / 1000);
//Force refresh the time
writeTime();


function writeTime() {
countdownMin = parseInt(countdownTime / 60).toString();
countdownSec = parseInt(countdownTime - (countdownMin * 60)).toString();

if (countdownMin.length == 1) countdownMin = '0' + countdownMin;
if (countdownSec.length == 1) countdownSec = '0' + countdownSec;
document.title = countdownMin + ':' + countdownSec + " | " + headTitle;

// reduce time
countdownTime -= 1;

// repeat
setTimeout(writeTime, 1000);

}