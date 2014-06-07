// ==UserScript==
// @name          Suck it, Ryan
// @description   Replace Ryan's picture with a clearly labeled picture saying "RYAN"
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

//This is an inside joke

document.body.addEventListener('DOMNodeInserted', doReplacePix, false); 

doReplacePix();

function doReplacePix() {  
	var images = document.body.getElementsByTagName("img");

	for(var i=0;i<images.length;i++) {
		if(images[i].src == "http://profile.ak.fbcdn.net/hprofile-ak-ash2/370121_100001273577834_689317802_q.jpg") {
			//Ryan
			images[i].src = "http://i302.photobucket.com/albums/nn115/gamer3550/ryan-1.jpg";
		}
                if(images[i].src == "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/370121_100001273577834_689317802_q.jpg") {
                        //Ryan
		        images[i].src = "http://i302.photobucket.com/albums/nn115/gamer3550/ryan-1.jpg";
                }
		if(images[i].src == "http://profile.ak.fbcdn.net/hprofile-ak-snc4/371241_100000015729588_55871792_q.jpg") {
			//Katie
			images[i].src = "http://i302.photobucket.com/albums/nn115/gamer3550/katie.jpg";
		}if(images[i].src == "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/371241_100000015729588_55871792_q.jpg") {
			//Katie
			images[i].src = "http://i302.photobucket.com/albums/nn115/gamer3550/katie.jpg";
		}
	}
}


//Hello source-readers