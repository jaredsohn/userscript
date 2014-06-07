// ==UserScript==
// @name	    Say No To Candy Crush
// @author      Vishwesh Shetty
// @description Block Candy Crush
// @include     https://apps.facebook.com/candycrush/*
// @include     http://apps.facebook.com/candycrush/*
// ==/UserScript==



var randomStrings = ['inspirational videos', 'i am bored', 'Things to do before you die', 'Most beautiful Women', 'read something funny', 'latest in news', 'best movies this year', 'Jessica Alba', 'how to kill your boss', 'Quotes', 'listen to a random song', 'inspire me', 'hottest cars and bikes' ,'ohh']
var random = Math.floor((Math.random()*12)+1);
function alertStop() {
	alert("Warning: You are trying to play Candy Crush");
	top.location.href = 'https://www.google.com/search?q='+randomStrings[random];
}

alertStop();