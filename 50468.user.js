// ==UserScript==
// @name           Facebook - MouseHunt Reload EverySecond
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() {
//var KingClaim = document.getElementsByName(puzzleanswer).value;
     //if(KingClaim == null)
     //{
     document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';
     //}
} , 60000);

