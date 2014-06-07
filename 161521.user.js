// ==UserScript== 
// @name Disable YT Playlist Loop 
// @namespace http://userscripts.org/scripts/show/161521
// @include http://youtube.com/* 
// @include http://*.youtube.com/* 
// @include https://youtube.com/* 
// @include https://*.youtube.com/* 
// @grant   none
// @version 17 December 2013 
// ==/UserScript== 
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var button = document.getElementById("watch7-playlist-bar-autoplay-button"); // Get autoplay button

function isAtEndOfPlaylist(){
    var currentIndexText = document.getElementById("watch7-playlist-current-index"); // Get text showing current index
    var lengthText = document.getElementById("watch7-playlist-length"); // Get text showing playlist length
    // return true if index equals the length 
	return(parseInt(currentIndexText.innerHTML) == parseInt(lengthText.innerHTML));
}
function autoplayIsOn() { 
    var button = document.getElementById("watch7-playlist-bar-autoplay-button"); // Get autoplay button
	return button.getAttribute('class').contains('yt-uix-button-toggled');
}

function update(){
    if (isAtEndOfPlaylist()){ //The end of playlist
//        window.alert("This is the end of the playlist.");
        if (autoplayIsOn()) { 
//            window.alert("Disabling Autoplay...");
            var button = document.getElementById("watch7-playlist-bar-autoplay-button"); // Get autoplay button
            button.className = button.className.replace("yt-uix-button-toggled", ""); // Disables autoplay for this page only
//            window.alert("Autoplay disabled.");
	   }
    }
}

unsafeWindow.yt.pubsub.instance_.subscribe("init-watch", function(){
            //log(unsafeWindow.location.href); // Current video url. 
    update();
});

// Re-enabling autoplay is not necessary because youtube will keep autoplay on for subsequent videos even after this script disables it
//else { //not the end of playlist
//	if (!autoplayIsOn()) { 
//		button.className = button.className += " yt-uix-button-toggled";
//	} 
//}