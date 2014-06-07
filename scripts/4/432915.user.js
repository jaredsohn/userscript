// ==UserScript==
// @name     Remove YouTube Idiots
// @include  https://apis.google.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant    none
// ==/UserScript==

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/

var badDivs = $("[id^=update-]:contains('PressFartToContinue')");   // Being the original reason for creating this script.
badDivs.remove();
badDivs = $("[id^=update-]:contains('A Duck')");                    // Being a secondary reason.
badDivs.remove();
badDivs = $("[id^=update-]:contains('Andr3wco7')");                 // Not exactly a idiot, but he shares a lot of videos, and thus creates a comment exactly repeating the video title. It's just annoying.
badDivs.remove();
badDivs = $("[id^=update-]:contains('Cluxio')");                    // Spamming their channel, using fake accounts to upvote/comment
badDivs.remove();
badDivs = $("[id^=update-]:contains('Josh A')");                    // Spamming their channel, using fake accounts to upvote/comment
badDivs.remove();
badDivs = $("[id^=update-]:contains('tkmajestic')");                // Spamming their channel, using fake accounts to upvote/comment
badDivs.remove();
//setInterval("doIt()",500);

//-- Or use badDivs.hide(); to just hide the content.