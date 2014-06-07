// ==UserScript==
// @name        Alert Ikariam
// @namespace   ikariamscript.webege.com
// @description Suona caso mai ci fosse una notizia dai consiglieri
// @include     http://s*.*.ikariam.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.3
// @downloadURL https://userscripts.org/scripts/source/135499.user.js
// @updateURL   https://userscripts.org/scripts/source/135499.meta.js
// ==/UserScript==
var advisors = [
	{ id: 'js_GlobalMenu_cities', wave: 'http://ikariamscript.webege.com/sound/ding.ogg' },
	{ id: 'js_GlobalMenu_military', wave: 'http://ikariamscript.webege.com/sound/dididing.ogg' },
	{ id: 'js_GlobalMenu_research', wave: 'http://ikariamscript.webege.com/sound/ding.ogg' },
	{ id: 'js_GlobalMenu_diplomacy', wave: 'http://ikariamscript.webege.com/sound/ding.ogg' }
];

if((getValue('lastCheck', 0) + 5 * 60) < time()) { //5*60 = 5 minute
	setValue('lastCheck', time());
	for(var i = 0; i < advisors.length; i++) {
		var obj = advisors[i];
		makeAudio(obj.id, obj.wave);
		if(checkClass(obj.id, 'normalactive') || checkClass(obj.id, 'normalalert')) {
			playAudio(obj.id);
		}
	}
}

function checkClass(id, classe) {
	return (document.getElementById(id).getAttribute('class').indexOf(classe) != -1);
}

function makeAudio(id, src) {
	var audio = document.createElement('audio');
	audio.setAttribute('id', id + '_audio');
	audio.setAttribute('preload', 'auto');
	audio.setAttribute('autobuffer', '');
	
	var source = document.createElement('source');
	source.setAttribute('src', src);
	source.setAttribute('type', 'audio/x-wav');
	
	audio.appendChild(source);
	document.getElementById('header').appendChild(audio);
}

function playAudio(id) {
	if(!!(document.createElement('audio').canPlayType)) {
		document.getElementById(id + '_audio').play();
	}
}

function setValue(name, value) {
    GM_setValue(document.location.host + name, value);
}

function getValue(name, valueDefault) {
    var output = GM_getValue(document.location.host + name);
    if(output == undefined) {
	    return valueDefault;
    }
    return output;
}

function time(s) {
	if(s == undefined) {
		s = new Date();
	}
	return parseInt(s.getTime() / 1000);
}