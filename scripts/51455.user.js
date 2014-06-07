// ==UserScript==
// @name        Mouse Hunter
// @namespace   http://moose.com
// @description Hunts your mice!
// @include     *apps.facebook.com/mousehunt/
// @include     *apps.facebook.com/mousehunt/index.php*
// @author      joker
// ==/UserScript==

var maxtime=5
var currentsecond=document.redirect.redirect2.value=maxtime

function countredirect(){

if (currentsecond=1){
window.location="http://apps.facebook.com/mousehunt/soundthehorn.php"
currentsecond=5
}

else{
currentsecond-=1
document.redirect.redirect2.value=currentsecond
}

setTimeout("countredirect()",1000)
}

countredirect()