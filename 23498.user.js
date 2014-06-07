// ==UserScript==
// @name           FB Album
// @namespace      http://userscripts.org/people/14536
// @description    Makes it easier to browse albums on facebook.
// @include        *facebook.com/album.php?*
// @include        *facebook.com/photo_search.php?*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated 2008-03-02


// Makes the location easily available throughout the script.
var loc = window.location.href.toLowerCase();


// Add link to show big pictures.
try {
	var divs = document.getElementById('album').previousSibling.getElementsByTagName('div');
	for (i=0; i<divs.length; i++) {
		if (divs[i].className.indexOf('summary')!=-1) {
			var albumSpan = document.createElement('span');
			albumSpan.innerHTML = ' | <a id="FBF2BigAlbumPics" href="#" onclick="return false;">Show Big Pictures</a>';
			divs[i].firstChild.insertBefore(albumSpan, divs[i].firstChild.lastChild.nextSibling);
			break;
		}
	}
	document.getElementById('FBF2BigAlbumPics').addEventListener('click', function(){makeAlbumPicsBig(false);}, true);
} catch(e) { GM_log("Unable to add link for showing big pics on the following page:\n" + document.title + '(' + loc + ')\n' + e.message); }

// Add menu commands for showing big pictures and maximizing the album.
GM_registerMenuCommand("Show Big Pictures", function(){makeAlbumPicsBig(false);});
GM_registerMenuCommand("Maximize Album", function(){makeAlbumPicsBig(true);});

// Replace small albums pics with the bigger versions. When maximize is false pictures will be changed in place.
function makeAlbumPicsBig(maximize) {
	var html='';
	var pics = document.getElementById('album').getElementsByTagName('img');
	for (i=0; i<pics.length; i++) { html = html + '<a href="' + pics[i].parentNode.href + '"><img src="' + pics[i].src.replace('/s','/n') + '" /></a>'; }
	if (maximize) { document.body.innerHTML = html; }
	else { document.getElementById('album').innerHTML=html; }
}