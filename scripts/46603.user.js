// ==UserScript==
// @name           Wrzuta.pl Downloader! light
// @description    Adds "download" link under the player
// @include        http://*.wrzuta.pl/audio/*
// ==/UserScript==
// script home page: http://userscripts.org/scripts/show/46603
// v7 - totally rewrite. For more info visit that link above.

// hack for firefox
if (typeof unsafeWindow != 'undefined') {
	var window = unsafeWindow;
	var document = window.document;
}

window.addEventListener('load',initDownloader,false);


function initDownloader() {
	var link = document.createElement('a');
	link.setAttribute('style','cursor:hand');
	link.setAttribute('id','dwlink')
	link.innerHTML="DOWNLOAD";
	link.addEventListener('click',loadLink,false);

	var list = document.getElementsByClassName('actions_icons')[0];
	list.insert(document.createElement('li').insert(link));
}

function loadLink() {
	var rlogin = window.flashvars.login;
	var rkey = window.flashvars.key;
	var rlang = window.flashvars.lang;
	var dwlink = document.getElementById('dwlink')

	if (rlang=='pl') {
	//polish translation strings
		var msg1='Chwileczkę';
		var msg2='Pobieram odnośnik do utworu';
		var msg3='Ściągnij';
		var msg4='Pobrałem już odnośnik do utworu. Ściągaj śmiało!';
	}
	else {
	//some fallback strings in english
		var msg1='Wait';
		var msg2='receveing link to the song';
		var msg3='Download';
		var msg4='Your link is ready. Get it!';
	}

	dwlink.removeEventListener('click',loadLink,false);
	dwlink.innerHTML=msg1;
	dwlink.setAttribute('alt',msg2);

	// useless_param is the same as in player insides. This might be replaced in future releases of wrzuta player.
	useless_param = Math.round(Math.random() * 1000000 + 1);
	var metaURL = 'http://'+rlogin+'.wrzuta.pl/xml/plik/'+rkey+'/wrzuta.pl/sa/' + useless_param;
	request = new XMLHttpRequest();
	request.open("GET",metaURL,false);
	request.send(null);

	dwlink.innerHTML=msg3;
	dwlink.setAttribute('alt',msg4);
	dwlink.setAttribute('href',request.responseXML.documentElement.getElementsByTagName("fileId")[0].textContent)
}
