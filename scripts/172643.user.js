/*********************************************
*** NE MODIFIER QUE CETTE PARTIE DU SCRIPT ***
**********************************************
*** Utiliser le format suivant:            ***
*** var pseudos = {                        ***
***     "pseudo1":"motdepasse1",           ***
***     "pseudo2":"motdepasse2",           ***
***     "pseudo3":"motdepasse3",           ***
***     "pseudo4":"motdepasse4",           ***
*** };                                     ***
*********************************************/
var pseudos = {
	"pseudo1":"motdepasse1",
	"pseudo2":"motdepasse2",
	"pseudo3":"motdepasse3",
	"pseudo4":"motdepasse4",
};



/************************************************
*** NE PAS MODIFIER EN DESSOUS DE CETTE LIGNE ***
************************************************/























// ==UserScript==
// @name        MP Check
// @namespace   nplay.mpcheck
// @description Vérifie le nombre de messages privés de tous vos pseudos.
// @include     http://www.jeuxvideo.com/messages-prives/*
// @version     1
// ==/UserScript==


function connect(i){
	var pseudo = Object.keys(pseudos)[i],
		  pass = pseudos[pseudo],
		   xhr = new XMLHttpRequest(),
		   url = 'http://www.jeuxvideo.com/profil/ajax_connect.php?pseudo='+pseudo+'&pass='+pass,
		  stop = false;

	xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) {
			var xhr2 = new XMLHttpRequest(),
				 url = 'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1';
			xhr2.onreadystatechange = function() {
				if (xhr2.readyState==4 && xhr2.status==200) {
					var nombre = xhr2.responseText.split(':')[1].split('}')[0];
					if(nombre !== '0') {
						var phrase = nombre > 1 ? pseudo+' a '+nombre+' messages non lus.' : pseudo+' a un message non lu.';
							phrase+= '\nCliquez sur "OK" pour continuer le script, ou sur "Annuler" pour l\'arrêter et consulter vos MPs.';
						
						if(!confirm(phrase)) {
							stop = true;
						}
					}
				}
			}
			xhr2.open('GET',url,false);
			xhr2.send();
		}
	}
	xhr.open('GET',url,false);
	xhr.send();
	
	return stop;
}


function fastConnect(ancienPseudo) {
	var key = 0;
	var pseudo = Object.keys(pseudos)[key];
	
	for(var i in pseudos) {
		if(i.toLowerCase() == ancienPseudo.toLowerCase()) {
			pseudo = i;
			break;
		}
	}
	
	var pass = pseudos[pseudo],
		 xhr = new XMLHttpRequest(),
		 url = 'http://www.jeuxvideo.com/profil/ajax_connect.php?pseudo='+pseudo+'&pass='+pass+'&retenir=1';
	xhr.open('GET',url,false);
	xhr.send();
}



var defaut = {
	"pseudo1":"motdepasse1",
	"pseudo2":"motdepasse2",
	"pseudo3":"motdepasse3",
	"pseudo4":"motdepasse4",
};
if(JSON.stringify(defaut) !== JSON.stringify(pseudos)) {

	var ancienPseudo = document.cookie.split('tehlogin=')[1].split(';')[0] || '';
	var mpTabs = document.getElementById('mp_onglets').getElementsByTagName('ul')[0] || null;
	
	if(mpTabs !== null) {
		var link = document.createElement('a');
		link.href = '#';
		link.appendChild(document.createTextNode('Vérifier tous mes MPs'));
		
		link.onclick = function(e) {
			e.preventDefault();
			
			var stop = false, i = 0;
			while(!stop && i < Object.keys(pseudos).length) {
				stop = connect(i);
				++i;
			}
			
			if(!stop) {
				fastConnect(ancienPseudo);
				alert('Script terminé!');
			} else {
				window.location.href = 'http://www.jeuxvideo.com/messages-prives/boite-reception.php';
			}
		};
	
		var newTab = document.createElement('li');
		newTab.appendChild(link);
		
		mpTabs.insertBefore(newTab,document.getElementById('indesirables'));
	}
	
	
} else {
	alert('Vous devez modifier ce script (MP Check) afin de pouvoir choisir vos pseudos.\nMerci d\'utiliser Google en précisant votre navigateur pour savoir comment faire.');
}