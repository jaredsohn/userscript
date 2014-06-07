// ==UserScript==
// @name           JVLog
// @namespace      JVC Liste de pseudos
// @description    Si vous êtes déconnectés, JVLog vous propose une liste de nos pseudos pour remplir le formulaire de connexion automatiquement
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==
 
var addEvent = function(object, eventName, myFunction) {
	if(object.addEventListener) {
		object.addEventListener(eventName, myFunction, false);
	} else if(object.attachEvent) {
		object.attachEvent('on'+eventName, myFunction);
	}
}
 
 
var $ = function(id) {
	return document.getElementById(id);
}
 
var changement_nick = {
	nicks: [],
	select: null,
 
	init: function() {
		window.setTimeout(changement_nick.disconnect, 200);
	},
 
	addNick: function(pseudo, password) {
		changement_nick.nicks.push([pseudo, password]);
	},
 
	catchEvent: function() {
		if(changement_nick.select.value != '') {
			var v = (changement_nick.select.value).split(' ');
			$('newnom').value = v[0];
			$('mdpasse').value = v[1];
		}
	},
 
	setNickList: function() {
		if($('bool_log')) {
			$('bool_log').checked = true;
 
			if(changement_nick.nicks.length > 0) {
				var div = $('bool_log').parentNode;
				changement_nick.select = document.createElement('select');
 
 
				for(var u=-1, c=changement_nick.nicks.length; u<c; u++) {
					var option = document.createElement('option');
					if(u == -1) {
						option.setAttribute('value', '');
						option.innerHTML = 'Poster avec :'
					}
					else {
						option.setAttribute('value', changement_nick.nicks[u][0]+" "+changement_nick.nicks[u][1]);
						option.innerHTML = changement_nick.nicks[u][0];
					}
					changement_nick.select.appendChild(option);
				}
 
				addEvent(changement_nick.select, 'change', changement_nick.catchEvent);
 
				div.appendChild(changement_nick.select);
			}
		}
	},
 
	disconnect: function() {
		GM_xmlhttpRequest({
			method: 'GET',
			//url: $('connect').getElementsByTagName('a')[0].getAttribute('href'),
			onload: function() {
				changement_nick.setNickList();
			}
		});
	}
}
 
changement_nick.init();
changement_nick.addNick('pseudo', 'mdp');
changement_nick.addNick('pseudo2', 'mdp2');
changement_nick.addNick('pseudo3', 'mdp3');