// ==UserScript==
// @name        FJmorbidSkipper
// @namespace   fragman
// @include     http://funnyjunk.com/*
// @include     http://www.funnyjunk.com/*
// @version     1.1
// ==/UserScript==


/*
	All the channels you want to be skipped are defined here.
	You can modify those 3 entries which are solely made for testing purposes as you wish.
	Just make sure the channel name is spelled correctly and in quotes. Also the comma between channels is important.
*/
var skipit = new Array("morbid-channel");

/*
	To make sure everything keeps working, don't touch anything below this line unless you know exactly what you're doing.
*/
function getChannelName() {
	var divArray = document.getElementsByClassName("tit");
	for (var i = 0; i<divArray.length; i++){
		if (divArray[i].class="sibling")
		return divArray[i].innerHTML;
		}
	}

function skipChannels() {
	var next = document.getElementById("cNext_floating").getAttribute("href");
	var link = "http://funnyjunk.com"+next;
	var chan = getChannelName();
	for (var j = 0; j<skipit.length; j++){
		if ( chan == skipit[j] ) {
			location.replace(link);
		}
	}
}

skipChannels();