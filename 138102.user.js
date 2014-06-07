// ==UserScript==
// @name           What.CD :: Artist Helper
// @namespace      Z4ppy.What.CD
// @descrption     Offers some tools that facilitate handling artists.
// @author         Z4ppy
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        https://what.cd/torrents.php?id=*
// @version        1.0.2
// @date           2013-07-29
// ==/UserScript==

/*
Changelog:
1.0     Initial release
1.0.1   Fix for https://what.cd
1.0.2   Fix display issue in the artist list and toggling
*/


function runToggleEditingTools() {
	var tNi;
	if(toggled) {
		//make them visible again
		for(tNi = 0; tNi < toggleNodes.length; tNi++) {
			if (toggleNodes[tNi].nodeType == 3) {
				// text node
				toggleNodes[tNi].nodeValue = toggleNodes[tNi].oldValue;
			} else {
				// standard node
				toggleNodes[tNi].style.display = '';
			}
		}
	} else {
		//hide IDs and delete links
		for(tNi = 0; tNi < toggleNodes.length; tNi++) {
			if (toggleNodes[tNi].nodeType == 3) {
				// text node
				toggleNodes[tNi].oldValue = toggleNodes[tNi].nodeValue;
				toggleNodes[tNi].nodeValue = '';
			} else {
				// standard node
				toggleNodes[tNi].style.display = 'none';
			}
		}
	}
	toggled = !toggled;
}

function initToggleEditingTools() {
	var sp, as, tNi, i, toggleedit_a, nS;

	//add the [Toggle Edit Tools] link
	sp = document.getElementById('artist_list').parentNode.getElementsByTagName('span')[0];
	sp.appendChild(document.createTextNode(' '));
	toggleedit_a = document.createElement('a');
	toggleedit_a.href = '';
	toggleedit_a.innerHTML = '[Toggle Edit]';
	toggleedit_a.addEventListener('click', function(e) { runToggleEditingTools(); e.stopPropagation(); e.preventDefault(); }, true);
	sp.appendChild(toggleedit_a);

	//find all Nodes that are supposed to be hidden on runToggleEditingTools()
	toggleNodes[0] = sp.childNodes[0]; // [Edit] link
	toggleNodes[1] = addartist_box; // Add artist box
	as = document.getElementById('artist_list').getElementsByTagName('a');
	tNi = toggleNodes.length;
	sp = null;
	for(i = 0; i < as.length; i++) {
		if( /(.*)?artist\.php.*/.test(as[i].href) ) {
			nS = as[i].nextSibling;
			while (nS != null) {
				if(nS.nodeType == 1 || nS.nodeType == 3) {
					toggleNodes[tNi] = nS;
					tNi++;
				}
				nS = nS.nextSibling;
			}
		}
	}
}



function runFloat() {
	if(floated) {
		//unfloat
		float_a.innerHTML = '[Float]';
		addartist_box.style.float = '';
		addartist_box.style.position = '';
		addartist_box.style.top = '';
		addartist_box.style.right = '';
		addartist_box.style.height = '';
		addartist_box.style.width = '';
		addartist_box.style.overflow = '';
	} else {
		//float
		float_a.innerHTML = '[Unfloat]';
		addartist_box.style.float = 'right';
		addartist_box.style.position = 'fixed';
		addartist_box.style.top = '0';
		addartist_box.style.right = '0';
		addartist_box.style.height = '100%';
		addartist_box.style.width = '260px';
		addartist_box.style.overflow = 'auto';
	}
	floated = !floated;
}

function initFloat() {
	addartist_span.insertBefore(document.createTextNode(' '), addartist_span.firstChild);

	// link f�r floating erstellen
	float_a = document.createElement('a');
	float_a.href = '';
	float_a.innerHTML = '[Float]';
	float_a.addEventListener('click', function(e) { runFloat(); e.stopPropagation(); e.preventDefault(); }, true);
	addartist_span.insertBefore(float_a, addartist_span.firstChild);
}




function runAddFields() {
	var i;
	for(i = 0; i < 100; i++) { unsafeWindow.AddArtistField(); }
}

function initAddFields() {
	var a;

	addartist_span.appendChild(document.createTextNode(' '));

	a = document.createElement('a');
	a.href = '';
	a.innerHTML = '[++]';
	a.addEventListener('click', function(e) { runAddFields(); e.stopPropagation(); e.preventDefault(); }, true);
	addartist_span.appendChild(a);
}



// Variables that we'll need later
var addartist_box = document.getElementById('AddArtists').parentNode.parentNode.parentNode;
var addartist_span = addartist_box.childNodes[1].childNodes[1];

//toggle
var toggled = false; //toggled = have the tools been hidden?
var toggleNodes = new Array();
initToggleEditingTools();
var autotoggle = GM_getValue("autotoggle", "false");
if(autotoggle == 'true') {
	runToggleEditingTools();
}
GM_registerMenuCommand('What.CD Artist Helper: Turn autotoggle of editing tools on/off', function() {
	autotoggle = GM_getValue("autotoggle", "false");
	if(autotoggle == 'true') {
		GM_setValue("autotoggle", "false");
	} else {
		GM_setValue("autotoggle", "true");
	}
});

//float
var floated = false;
var float_a;
initFloat();

//add 100 fields
initAddFields();