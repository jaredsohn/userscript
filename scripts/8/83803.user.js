// ==UserScript==
// @name           No Double Votes
// @namespace      http://oneandthesame.net/userscripts
// @description    Prevent double voting on jyte.com
// @include        http://jyte.com/cl/*
// @include        http://www.jyte.com/cl/*
// ==/UserScript==

var voteFor = document.getElementById('votes_for'),
    voteAgainst = document.getElementById('votes_against');

voteFor.removeAttribute('href');
voteAgainst.removeAttribute('href');