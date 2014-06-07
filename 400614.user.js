// ==UserScript==
// @name          Steamtrades AUTOBUMP
// @namespace     SteamtradesAUTOBUMP
// @description   Each 30 minutes the script refreshes the steamtrades thread and clicks Bump.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include       http://*.steamtrades.com/*
// ==/UserScript==

var bumpVar;

var currentTime = new Date();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();
var theTime = ( hours * 60 + minutes ) * 60 + seconds;
var timeLeft = 31 * 60 - theTime % ( 31 * 60 );

if (timeLeft == 0)
{
    timeLeft = 31 * 60;
}

function bumpRetry()
{
    $('#bump_discussion').submit();
}

bumpVar = setTimeout( function() { bumpRetry(); } , timeLeft * 1000 );