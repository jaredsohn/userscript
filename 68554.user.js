// ==UserScript==
// @name	Proper Grammar Girl
// @description	Flips the Grammar Girl illustration so she's facing the right way. 
// @include	http://grammar.quickanddirtytips.com/*
// ==/UserScript==

var image = document.getElementById('ctl00_cphMiddle_qdtPodcastTopNavBar_imgPodcast');

image.src = 'http://asufoundation.org/melanie/Greasemonkey/ProperGrammarGirl/grammar.png';


var image = document.getElementById('ctl00_cphMiddle_GrammarDailyTips1_imgGrammarDailyTip');

image.src = 'http://asufoundation.org/melanie/Greasemonkey/ProperGrammarGirl/grammartiny.png';

// That's all, folks!