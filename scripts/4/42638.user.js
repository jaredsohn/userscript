// ==UserScript==
// @name		MusicBrainz: Search box without sidebar
// @description		A script which adds a search box at the top right of the screen for people with the sidebar turned off.
// @version		2009-08-12
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://musicbrainz.org/*
// @exclude		http://musicbrainz.org/mod/inlinemod.html*
// ==/UserScript==
//**************************************************************************//

var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("name", "query");

var artist = document.createElement("option");
artist.appendChild(document.createTextNode("Artists"));
artist.setAttribute("value", "artist");

var releasegroup = document.createElement("option");
releasegroup.appendChild(document.createTextNode("Release Groups"));
releasegroup.setAttribute("value", "release_group");

var release = document.createElement("option");
release.appendChild(document.createTextNode("Releases"));
release.setAttribute("value", "release");

var track = document.createElement("option");
track.appendChild(document.createTextNode("Tracks"));
track.setAttribute("value", "track");

var label = document.createElement("option");
label.appendChild(document.createTextNode("Labels"));
label.setAttribute("value", "label");

var cdstub = document.createElement("option");
cdstub.appendChild(document.createTextNode("CD Stubs"));
cdstub.setAttribute("value", "cdstub");

var freedb = document.createElement("option");
freedb.appendChild(document.createTextNode("FreeDB"));
freedb.setAttribute("value", "freedb");

var annotation = document.createElement("option");
annotation.appendChild(document.createTextNode("Annotations"));
annotation.setAttribute("value", "annotation");

var select = document.createElement("select");
select.setAttribute('name', 'type');
select.appendChild(artist);
select.appendChild(releasegroup);
select.appendChild(release);
select.appendChild(track);
select.appendChild(label);
select.appendChild(cdstub);
select.appendChild(freedb);
select.appendChild(annotation);

var submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("value", "Go");

text1 = document.createTextNode("Search for ");
text2 = document.createTextNode(" in ");

var form = document.createElement("form");
form.action= "http://musicbrainz.org/search/textsearch.html";
form.appendChild(text1);
form.appendChild(input);
form.appendChild(text2);
form.appendChild(select);
form.appendChild(submit);

var div = document.createElement('div');
div.style.position = 'absolute';
div.style.top = '0';
div.style.right = '0';
div.style.padding = '8px';
div.style.color = 'white';
div.appendChild(form);

document.body.appendChild(div);


/* var a = document.getElementsByTagName("a");
for (i = 0; i < a.length; i++) {
	a[i].style="color: red";
	a[i].onmouseover = function() { this.style.backgroundColor = "orange"; };

}

*/


