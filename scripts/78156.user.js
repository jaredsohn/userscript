// ==UserScript==
// @name           Check/uncheck all tracks
// @description    MusicBrainz.org : Shortcut to swap/check/uncheck all tracks on an artist-tracks relationship creation page
// @version        2011-03-10_1603
// @author         Tristan DANIEL (jesus2099) (http://miaou.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/edit/relationship/add.html?*usetracks=0*

// ==/UserScript==


(function () {

var tracksbox = document.getElementById("arEntitiesSwap-TD0");
var tracks = tracksbox.getElementsByTagName("input");

var fragment = document.createElement("p");
fragment.appendChild(doA("Swap", null));
fragment.appendChild(document.createTextNode("/"));
fragment.appendChild(doA("check", true));
fragment.appendChild(document.createTextNode("/"));
fragment.appendChild(doA("uncheck", false));
fragment.appendChild(document.createTextNode(" all tracks."));
tracksbox.insertBefore(fragment, tracksbox.lastChild.previousSibling);

function doA(txt, checko) {
	var a = document.createElement("a");
	a.setAttribute("href", "javascript:void(0);" );
	a.appendChild(document.createTextNode(txt));
	a.addEventListener("click", function(e){ check(checko); }, false);
	return (a);
}

function check(check) {
	var tracks = document.getElementById("arEntitiesSwap-TD0").getElementsByTagName("input");
	for(var i=0; i < tracks.length; i++) {
		tracks[i].checked = check!=null? check : !tracks[i].checked;
	}
}

function debug(coucou) {
	try {
		opera.postError(coucou);
	} catch(e) {/*alert(coucou);*/}
}

})();