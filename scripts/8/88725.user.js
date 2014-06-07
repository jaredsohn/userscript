// ==UserScript==
// @name           Lever of Doom
// @namespace      Cody Woolaver
// @description    Pulls the Lever of Doom
// @include        http://www.neopets.com/space/strangelever.phtml
// @include        http://www.neopets.com/space/leverofdoom.phtml
// ==/UserScript==

/*
        USE THIS AT YOUR OWN DECRESSION.
        CHEATING IS AGAINST THE NEOPETS
        TOS AND I WILL TAKE NO PERSONAL
        RESPONSIBILITY IF YOUR ACCOUNT
        GETS FROZEN DUE TO THIS PROGRAM.
*/

var MIN_WAIT = 2.1
var MAX_WAIT = 3.5

var AVATAR_URL = "http://images.neopets.com/neoboards/avatars/leverofdoom.gif"
var HTML = document.body.innerHTML

function redirect(){document.getElementsByTagName('form')[1].submit()}

if (HTML.indexOf(AVATAR_URL) == -1){
	var waitTime = MIN_WAIT + (Math.random() * (MAX_WAIT - MIN_WAIT))
	window.setTimeout(redirect, waitTime * 1000)
}else{
	alert("You got the avatar :O ... >> Your welcome >>")
}