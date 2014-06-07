// ==UserScript==
// @name           chatique
// @namespace      http://wakachan.org/unyl/
// @description    unylchat
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://dobrochan.ru/*
// @include        http://*.dobrochan.ru/*
// @include        http://410chan.ru/*
// @include        http://*.410chan.ru/*
// @author         unylnonymous
// ==/UserScript==


var nicks = '0123456789'.match(/[0-9]/g);
var tokens_number = 8;

//console.log('collision probability: ' + Math.pow(1/nicks.length, tokens_number));

function make_nick() {
	var nick = 'X';
	
	for (var i = 0; i < tokens_number; ++i) {
		var token = Math.random() * (nicks.length) | 0;
		
		nick = nick + nicks[token];
	}
	
	return nick;
}

function install_chat() {
	while (document.body.hasChildNodes()) {
		document.body.removeChild(document.body.firstChild);
	}
	
	document.body.style.margin = 0;

	var chat = document.createElement('iframe');
	chat.setAttribute('style', 'border:none; background-color: white; width: 100%; height: 100%;');
	chat.setAttribute('src', 
		'http://lightirc.com/start/?host=irc.chat4all.com' +
		'&autojoin=%23unylchat' +
		'&showServerWindow=false' +
		'&showInfoMessages=false' +
		'&showMenuButton=false' +
		'&showTranslationButton=false' +
		'&showChannelHeader=false' +
		'&showChannelCentral=false' +
		'&showJoinPartMessages=false' + 
		'&styleURL=css%2Flightblue.css' +
		'&nick=' + make_nick());
		
	var div = document.createElement('div');
	div.setAttribute('style', 'height: 100%;');
	div.appendChild(chat);
		
	document.body.appendChild(div);
	
	document.title = 'Chatique';
}

function install_trigger() {
	var adminbar = document.getElementsByClassName('adminbar');
	if (!adminbar || !adminbar[0]) {
		console.log('fuck');
		return;
	}
	
	adminbar = adminbar[0];
	
	var chatique = document.createElement('a');
	chatique.setAttribute('href', '/chatique.html');
	chatique.textContent = 'Chatique';
	
	adminbar.appendChild(document.createTextNode('['));
	adminbar.appendChild(chatique);
	adminbar.appendChild(document.createTextNode('] '));
}

(function() { 
	
	if (location.pathname.match(/chatique/)) {
		install_chat();
	} else { 
		install_trigger();
	}
	
})();

