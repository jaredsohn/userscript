// ==UserScript==
// @id             libredownload
// @name           libre.fm track lookup
// @version        1.0b
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    
// @include        http://libre.fm/listen.php*
// @run-at         document-end
// ==/UserScript==

Buttonplace = document.getElementsByClassName('btn-group-xs')[1];

downloadbutton = document.createElement("a");
downloadbutton.className = 'btn btn-default';
downloadbutton.style.cssText = 'opacity: 1; font-weight: bold !important;';
downloadbutton.innerHTML = '<span title="Download" alt="Download" class="glyphicon">↓</span>';

downloadbutton.addEventListener('click', openURL, false);

Buttonplace.appendChild(downloadbutton);


function createdownloadURL() {
	var artist = URLfix(document.getElementById('artistname').innerHTML);
	var trackname = URLfix(document.getElementById('trackname').innerHTML);

	return 'http://libre.fm/artist/' + artist + '/track/' + trackname;
}

function openURL() {
	var url = createdownloadURL();
	window.open(url,'_blank');
}

function URLfix(text) {
	return text.replace(/\s/g, '+');
}

