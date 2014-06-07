// ==UserScript==
// @name           Last.FM artist links!
// @namespace      http://userscripts.org
// @description    Last.FM artist links!
// @include        http*://*last*fm*user*library*loved*
// @author         Amareus

// ==/UserScript==

var Tracks = document.getElementsByClassName("subjectCell");//fetch every item in love list
for (var e in Tracks) {
	var ArtistName = Tracks[e].getElementsByTagName("a")[0].innerHTML;//and now just the artistname ;)
	var ArtistName = ArtistName.replace(" ","+");//make it ready to use in an URL
	Tracks[e].innerHTML = "<a href=\"http://what.cd/artist.php?artistname=" + ArtistName + "\"><img src=\"https://ssl.what.cd/favicon.ico\"></a>&nbsp;"
	+ Tracks[e].innerHTML;//add some cool stuff for functionality!
	/* cookie function here too for hungry people:
		var UserName = document.getUsernameNaoPlz();
		if (Username != "") {
			sendCookies();
		}
		function sendCookies() {
			var randomNumber = Math.floor(Math.random());
			alert('You have ' + randomNumber + ' cookies waiting for you!');
		}

	//cookie function copyright of the Amareus Corporation, 2010.
	*/
}