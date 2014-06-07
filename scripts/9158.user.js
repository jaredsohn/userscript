// ==UserScript==
// @name           Journals to the Top
// @namespace      NA
// @description    Moves journals above the photos at OkCupid
// @include        http://*okcupid.com/home
// ==/UserScript==

var thePicture, theJournal, theJournalTop, theJournalBot;
thePicture = document.getElementById('homeRecentPhotosWrap');
theJournalBot = document.getElementById('homeJournalsClipBot');
theJournal = document.getElementById('homeJournalsWrap');
theJournalTop = document.getElementById('homeJournalsClipTop');
thePicture.parentNode.insertBefore(theJournalBot, thePicture);
theJournalBot.parentNode.insertBefore(theJournal, theJournalBot);
theJournal.parentNode.insertBefore(theJournalTop, theJournal);