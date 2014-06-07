// ==UserScript==
// @name       Reddit Live Notifications
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @require		http://code.jquery.com/jquery.min.js
// @description  This will make it easier to be updated about Live feed on reddit. Thanks to KeyKrusher for the beep sound.
// @match      http://www.reddit.com/live/*
// @copyright  2012+, You
// ==/UserScript==
$('head').append('<audio src="http://uben.nl/sounds/beep.wav" id="sound1" preload="auto"></audio>');
var n = $('tr').length;
var o = 0;
console.log(n);
function playSound ( soundname )
  {
    var thissound = document.getElementById( soundname );
    thissound.play();
    //alert( "Played " + soundname );
  }
function checkFeed(){
    o = $('tr').length;
    num=o-n;
    if (num>0){
    playSound('sound1');
        console.log(num);
    n=o;
    }
    return o;
}
o=setInterval(checkFeed,1000);
