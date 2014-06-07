// ==UserScript==
// @name        plusikicomicsans
// @namespace   plusikicomicsans
// @description plusikicomicsans
// @include     http://www.wykop.pl*
// @version     1
// @grant       none
// @author      kapelushh
// ==/UserScript==


$('.votC, .repblock, .showProfileSummary strong').css('fontFamily', 'Comic Sans, Comic Sans MS');
$('a.showProfileSummary[href$="/ludzie/parasolki/"]').append('&#9730;');