// ==UserScript==
// @name            One Gold Taunter
// @namespace       http://www.duels.fr/taunter/ 
// @description     Random taunt messages for challenges
// @include         http://duels.com/challenges/challenge/*
// @include         http://www.duels.com/challenges/challenge/*
// @include         http://facebook.duels.com/challenges/challenge/*
// @include         http://xml.duels.com/challenges/challenge/*
// ==/UserScript==
var container = document.getElementById('ChallengeMessage')
var taunt = new Array(
"I am using one action, it could be 1g, it could be more. I hope you like surprises!"
)
var n = Math.floor(taunt.length*Math.random())
container.value = taunt[n]//.user.js