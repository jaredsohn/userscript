// ==UserScript==
// @name       Koding Profile Description Fixer (KPDF)
// @namespace  http://www.facebook.com/joshumax
// @version    0.1
// @description Fixes the profile page description on Koding.com
// @include	   http://www.koding.com/*
// @include	   http://koding.com/*
// @include	   https://www.koding.com/*
// @include	   https://koding.com/*
// @copyright  2012+, You
// ==/UserScript==

function getContentInContainer(matchClass, ischild) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            if (ischild == true) {
        		return elems[i].children[0].innerHTML;
            } else {
                return elems[i].innerHTML;
            }
        }
    }
}
function replaceContentInChildContainer(matchClass, content) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            elems[i].children[0].innerHTML = content;
        }
    }
}
function getCurUserName() {
    //take_the_car_on_the_run()
    //fly_the_jet_to_the_sun()
	//bring_the_spacecraft_in_soon()
    //while(I_play_chess_with_the_moon()) {
	//i = "feel like sleeping through this cold afternoon";
    //}
	var nameInput = document.getElementById("el-7").innerHTML;
	if (nameInput) {
		return (nameInput)
	} else {
		console.log("No user name has been found, returning bogus value.");
		return "Mr. PickleBottom McDerp"
    }
}
function addText(username) {
    var resname = username.split(" ");
    // Make sure we are current user
    if (getContentInContainer("kdview kdcontenteditableview firstName", true) == resname[0] && getContentInContainer("kdview kdcontenteditableview lastName", true) == resname[1]) {
        if (getContentInContainer("kdview kdcontenteditableview bio", true) == "") {
            // Fill empty text with a placeholder
        	replaceContentInChildContainer("kdview kdcontenteditableview bio", "(Please enter some text here!)");
        }
    }
}
(function() {  
    setInterval(function(){var x = getCurUserName();addText(x)},2000); // Poll text
})();