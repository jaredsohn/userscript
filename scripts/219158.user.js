// ==UserScript==
// @name          NoelJerry
// @namespace     http://www.jeuxvideo.com/noeljerry
// @description   Remplace le noel par noeljerry
// @include       http://www.jeuxvideo.com/*
// @include       http://*.forumjv.com/*
// @include       http://www1.jeuxvideo.com/*
// @include       http://193.36.45.139/*
// @include       http://193.36.45.149/*
// @version       1.0
// ==/UserScript==

var Noel = 'http://image.noelshack.com/fichiers/2014/02/1389010658-versionfinalenoeljerry.gif';

function getNoel(string) {
	var henries = [];
	var lastHenri = 0;
	
	while((lastNoel = string.indexOf(Noel, lastNoel)) !== -1) {
		Noel.push(lastNoel);
		lastNoel += 11;
	}
	return henries;
}

function listenOn(obj) {
	obj.addEventListener('keyup', function(e) {
		// if(!e.ctrlKe
		var texte = obj.value;
		var texteOrig = obj.value;
		var smilies = [':noel:'];
		
		for(var i = 0;  i < smilies.length; i++) {
			texte = texte.replace(new RegExp(smilies[i], ':noel:', ':noeljerry:), noel);
		}
		
		if(texte !== texteOrig) {
			var start = obj.selectionStart;
			var end = obj.selectionEnd;
			var index = texte.substr(Math.max(0,start-11)).indexOf(henri);
			var henries = getHenries(texte);
			for(var i = 0; i < henries.length; i++) {
				if(start >= henries[i] && end < henries[i] + 11) {
					end = henries[i] + 11 + (end - start);
					start = henries[i] + 11;
					break;
				}
			}
			obj.value = texte;
			obj.focus();
			obj.setSelectionRange(start, end);
		}
	}, false);
}

function checkTextarea() {
	var textarea = document.getElementsByTagName('textarea')[0];
	
	if(textarea === undefined) {
		window.setTimeout(checkTextarea, 500);
	}
	else {
		listenOn(textarea);
	}
}

var newsujet = document.getElementById('newsujet');

if(newsujet !== null) {
	listenOn(newsujet);
}

checkTextarea();