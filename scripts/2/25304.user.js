// ==UserScript==
// @name            Duels.com Taunter
// @namespace       http://www.duels.fr/taunter/ 
// @description     Random taunt messages for challenges
// @include         http://duels.com/challenges/challenge/*
// @include         http://www.duels.com/challenges/challenge/*
// @include         http://facebook.duels.com/challenges/challenge/*
// @include         http://xml.duels.com/challenges/challenge/*
// ==/UserScript==
var container = document.getElementById('ChallengeMessage')
var taunt = new Array(
"TAUNT GOES HERE"
)
var n = Math.floor(taunt.length*Math.random())
container.value = taunt[n]//.user.js