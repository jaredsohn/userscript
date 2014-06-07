// ==UserScript==
// @name        Yahoo News Without Commercials
// @description Filters out commercials from the Yahoo News Video stream. Alpha version.
// @include     http://cosmos.bcst.yahoo.com/*

//Redirect the _receive method of the y_up.playlist object.
function trapReceive() {
	myPlaylist = unsafeWindow.y_up.playlist;
	//Store a reference to the original _receive method.
		//Note:  Originally tried to store the pointer in a local var
			//oldReceive = myPlaylist._receive;
		// it almost worked - the method would get invoked, but would later
		// throw the following error: this.callback is not a function.
		// perhaps that changed the context and messed with the 'this' object'?
	// Fixed by storing the pointer to the original method in the DOM.
	myPlaylist.oldReceive = myPlaylist._receive;
	myPlaylist._receive = myReceive;
}

// The _receive method gets redireted here.  REmove any ohbjects of type S_AD
// and then pass the 'improved' playlist on to the player.
function myReceive(pResponse) {
	//Note:  Originally tried to use the filter method:
		//myResponse = pResponse.filter(function(obj) { return obj.type != 'S_AD'; });
	// The above didn't work.  The player would simply jump through the content without playing anything.
	// New playlists were received, and the titles would change, but nothing would play.
	// The problem seems to occur if the playlist is passed back in a new array object.
	// Fixed by just modifying the array in place.
	for each (i in pResponse) {
		if (i.type == "S_AD") {
			pResponse.splice(0,1);
			// Ads are normally the first item.  This is pretty ugly, but it works
			// I'd much prefer to use filter() if there is a way.
		}
	}
	// Call the original _receive method with the (possibly) modified array
	myPlaylist.oldReceive(pResponse);
}

// Playlists are returned in JSON format and take the form of a call
// to y_up.playlist._receive.  The playlist itself is an array of objects
// The "type" property of the playlist item can be used to deterime if
// the item is an ad (type='S_AD'). 
// This script intercepts calls to y_up.playlist._receive, removes playlist
// items with the type S_AD from the playlist, and then passes the playlist
// on to the original _receive method.

// Intercept the _receive method.
trapReceive();

// ==/UserScript==