// ==UserScript==
// @name      	 Google Analytics Realtime Alerts
// @namespace  	 http://mobilecoder.wordpress.com
// @version   	 1.0
// @description  Plays a sound when you get a new user, you can change the sound by hosting your own file on dropbox or other web location
// @match	     https://www.google.com/analytics/web/?hl=en#realtime*
// ==/UserScript==

// Your custom sound goes here
mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");

// But don't touch this
mActiveUsers = 0;

setInterval(getActiveUsers, 1);
 
function getActiveUsers(){
    var count = parseInt(document.getElementById("ID-overviewCounterValue").innerText);
    if(count > mActiveUsers){
		mCoinSound.play();        
    }
    mActiveUsers = count;
}