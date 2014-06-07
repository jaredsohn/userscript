// ==UserScript==
// @name        MTurk Max Job Window Height
// @namespace   
// @description Limit height of job window iFrame on MTurk.com
// @include     *.mturk.com/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementsByName('ExternalQuestionIFrame')[0].style.height='90%';

