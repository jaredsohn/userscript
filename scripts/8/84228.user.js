// ==UserScript==

// @name           Highlight crap in descriptions!

// @namespace      http://userscripts.org

// @description    Highlights bad stuff in torrent descriptions.

// @include        http*://*what.cd/torrents.php?id=*

// ==/UserScript==

//config 163
var colour = "red";

//add stuff here if you like:
//no need to add 'vs.' since it's covered by 'vs', etc.
var bad = new Array(
	'vs',
	'versus',
	'ft',
	'featuring',
	'feat',
	'presents',
	'pres'

);
//end config

function getClass(name) {

	var allPageTags=document.getElementsByTagName("*");

	for (i=0; i<allPageTags.length; i++) {

		if ( allPageTags[i].className == name ) return allPageTags[i];

	}

}


var box = document.getElementsByTagName("*")[163];

if (box.className == 'box box_artists') {
	var box = box.getElementsByTagName('ul');
}
else {
//backup if something goes wrong, but slightly slower
	var box = getClass('box box_artists');
	var box = box.getElementsByTagName('ul');
}

for (var e in bad) {
	box[0].innerHTML = box[0].innerHTML.replace(RegExp([bad[e]].join("|"), "gi"),
	"<b><font color=\""+colour+"\">"
	+bad[e]
	+"</font></b>"
	);
}

//made by Amareus