// ==UserScript==
// @name           Facebook : Friendster
// @namespace      http://userscripts.org/scripts/show/64016
// @description    Automatically confirms "friends".
// @include        http://www.facebook.com/reqs.php#friend
// ==/UserScript==
	
	var intID;
	var div;
	var i;
	var lang;
	
(function () {
	var div; var a; var span;
	if (document.getElementById('friend_connect_sidebar_text').getElementsByTagName('strong')[0].textContent == 0) return;
	span = document.getElementById('friend_connect_sidebar_text');
	div = document.createElement('div');
	div.setAttribute('style', 'padding-top:3px;padding-bottom:2px;');
	a = document.createElement('a');
	a.href = '#';
	div.appendChild(a);
	span.parentNode.parentNode.appendChild(div);
	a.addEventListener('click', Handler, false);
	if (!GM_getValue('processing', 0)) {
		if (span.textContent.indexOf('zahtjeva') != -1) { lang=1; a.title = 'Dodaj sve kao prijatelje'; a.textContent = 'Dodaj sve kao prijatelje'; }
		else { lang=0; a.title = 'Accept all as friends'; a.textContent = 'Accept all as friends'; }
	}
	else {
		if (span.textContent.indexOf('zahtjeva') != -1) { lang=1; a.title = 'Zaustavi proces'; a.textContent = 'Zaustavi proces'; }
		else { lang=0; a.title = 'Stop the process'; a.textContent = 'Stop the process'; }
		Init();
	}
})()

function Handler(evt) {
	if (GM_getValue('processing', 0)) {
		GM_setValue('processing', 0);
		clearInterval(intID);
		window.location.reload(false);
	}
	else {
		GM_setValue('processing', 1);
		if (lang==1) { this.title = 'Zaustavi proces'; this.textContent = 'Zaustavi proces'; }
		else { lang=0; this.title = 'Stop the process'; this.textContent = 'Stop the process'; }
		Init();
	}
	evt.preventDefault();
}

function Init() {
	i = 0;
	div = document.getElementById('friend_connect').getElementsByClassName('confirm');
	intID = setInterval(Confirmation, 2000);
}

function Confirmation() {
	var input;
	if (i==div.length) { clearInterval(intID); window.location.reload(false); }
	else {
		input = div[i].getElementsByClassName('inputbutton');
		if (input) ClickMe(input[0]);
		i++;
	}
}
	
function ClickMe(handle){
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(evt);
}
