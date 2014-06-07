// ==UserScript==
// @name           Wrzuta quicklist downloader
// @namespace      simplygood
// @author         gotan
// @description    Download audio and video files from wrzuta quicklist
// @include		 http://www.wrzuta.pl/szybkalista
// ==/UserScript==
//
// Learned from
// http://userscripts.org/scripts/show/40914

unsafeWindow.load = function() {
	var playerDiv = document.getElementById('wrzuta_plik');
	var flashvars = playerDiv.getElementsByTagName('param')[1].value;
	var fileKey = flashvars.match(/file_key=([^&]*)&/)[1];
	var login = flashvars.match(/login=([^&]*)&/)[1];
	var title = flashvars.match(/tt=([^&]*)&/)[1];
	if (document.location.toString().match('audio')) {
	    var baseURL =  'http://' + login + '.wrzuta.pl/sr/f/';
	    var ext = 'mp3';
	} else {
	    var baseURL =  'http://' + login + '.wrzuta.pl/sr/v/';
	    var ext = 'flv';
	}
	var fileURL = baseURL + fileKey + '/' + trim(title) + '.' + ext;
	document.location=fileURL;
}


function decoratePlayer() {
	var playList = document.getElementById('tytul_playlista');
	if(!playList){
		return;
	}
	if(playList.innerHTML.indexOf('Pobierz')<0) {
		playList.innerHTML = playList.innerHTML+' <a href="javascript:load()" style="color: #ED0080">(Pobierz)</a>';
	}
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

decoratePlayer();

