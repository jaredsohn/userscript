// ==UserScript==
// @name          JV Henri
// @namespace     http://www.jeuxvideo.com/henri
// @description   Remplace les smileys de JVC par des henris
// @include       http://www.jeuxvideo.com/*
// @include       http://*.forumjv.com/*
// @include       http://www1.jeuxvideo.com/*
// @include       http://193.36.45.139/*
// @include       http://193.36.45.149/*
// @version       1.0
// ==/UserScript==

var henri = '( ͡° ͜ʖ ͡°)';

function getHenries(string) {
	var henries = [];
	var lastHenri = 0;
	
	while((lastHenri = string.indexOf(henri, lastHenri)) !== -1) {
		henries.push(lastHenri);
		lastHenri += 11;
	}
	return henries;
}

function listenOn(obj) {
	obj.addEventListener('keyup', function(e) {
		// if(!e.ctrlKe
		var texte = obj.value;
		var texteOrig = obj.value;
		var smilies = [':snif:', ':gba:', ':g\\)', ':snif2:', ':bravo:', ':hap:', ':ouch:', ':pacg:', ':cd:', ':ouch2:', ':pacd:', ':cute:', ':content:', ':noel:', ':oui:', ':peur:', ':question:', ':cool:', ':coeur:', ':mort:', ':rire:', ':fou:', ':sleep:', ':\\-D', ':nonnon:', ':fier:', ':honte:', ':rire2:', ':non2:', ':sarcastic:', ':monoeil:', ':nah:', ':doute:', ':rouge:', ':ok:', ':non:', ':malade:', ':fete:', ':sournois:', ':hum:', ':ange:', ':diable:', ':gni:', ':play:', ':desole:', ':spoiler:', ':merci:', ':svp:', ':sors:', ':salut:', ':rechercher:', ':hello:', ':up:', ':bye:', ':gne:', ':lol:', ':dpdr:', ':dehors:', ':hs:', ':banzai:', ':bave:', ':pf:', ':loveyou:', ':hapoelparty:', ':mac:', ':globe:', ':\\)', ':\\(', ':d\\)', ':\\-\\)\\)\\)', ':\\-\\)', ':\\-p', ':\\-\\(\\(', ':\\-\\(', ':p\\)', ':o\\)\\)', ':fish:'];
		
		for(var i = 0;  i < smilies.length; i++) {
			texte = texte.replace(new RegExp(smilies[i], 'gi'), henri);
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