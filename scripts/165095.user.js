// ==UserScript==
// @name          JV Prez
// @namespace     http://www.jeuxvideo.com/jvprez
// @description   Permet de faire de jolis messages de présentation sur JVC
// @include       http://www.jeuxvideo.com/forums/0-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/forums/5-*
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums*
// @version       1.0
// ==/UserScript==

var textarea = document.getElementsByTagName('textarea')[0];

function vide_textarea() {
    if (textarea.value === "Ne postez pas d'insultes, \u00E9vitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas d\u00E9j\u00E0 \u00E9t\u00E9 pos\u00E9e...\n\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement." || textarea.value === "Ne postez pas d'insultes, \u00E9vitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas d\u00E9j\u00E0 \u00E9t\u00E9 pos\u00E9e...\r\n\r\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement.") {
		textarea.value = '';
	}
}

// Fonction pour ajouter quelque chose avant et après une ligne de texte

function ajouterAutour(avant, apres) {
	vide_textarea();
	
	var original = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
	var tropAvant = '';
	var tropApres = '';
	while(original[original.length-1] <= ' ') {
		tropApres = original[original.length-1] + tropApres;
		original = original.slice(0,-1);
	}
	while(original[0] <= ' ') {
		tropAvant += original[0];
		original = original.substr(1);
	}
	
	var val = textarea.value.substring(0, textarea.selectionStart);
	val += tropAvant;
	
	if(avant[0] !== ':' && val[val.length-1] !== '\n' && val.length !== 0) {
		val += '\n';
	}
	
	var i = 1;
	while(val.split('\n\n').pop().search(new RegExp('(?:^|[^0-9])' + i + '\\. ')) !== -1) {
		i++;
	}
	while(original.indexOf('\n') !== -1) {
		if(original[0] === '\n') {
			val += '\n';
			original = original.substr(1);
			continue;
		}
		val += avant.replace('%d', i);
		val += original.substr(0,original.indexOf('\n'));
		val += apres + '\n';
		original = original.substr(original.indexOf('\n')+1);
		i++;
	}
	val += avant.replace('%d', i);
	var cursorPos = val.length;
	val += original;
	val += apres;
	
	if(textarea.selectionStart !== textarea.selectionEnd && original !== '') {
		cursorPos = val.length;
	}
	val += tropApres;
	val += textarea.value.substring(textarea.selectionEnd);
	textarea.value = val;
	textarea.focus();
	textarea.setSelectionRange(cursorPos, cursorPos);
}

// Fonction pour ajouter un séparateur dans le texte

function ajouterSeparateur() {
	vide_textarea();
	
	var val = textarea.value.substring(0, textarea.selectionEnd);
	if(val.length > 0 && val[val.length-1] !== '\n') {
		val += '\n';
	}
	if(val.length > 1 && val[val.length-2] !== '\n') {
		val += '\n';
	}
	val += '———————————————————————————————————————————';
	var suite = textarea.value.substring(textarea.selectionEnd);
	if(suite.length < 0 || suite[0] !== '\n') {
		val += '\n';
	}
	if(suite.length < 1 || suite[1] !== '\n') {
		val += '\n';
	}
	var cursorPos = val.length;
	val += suite;
	textarea.value = val;
	textarea.focus();
	textarea.setSelectionRange(cursorPos, cursorPos);
}

// Fonction pour dé-centrer le texte

function enleverCentrage() {
	if(textarea.selectionStart === textarea.selectionEnd) {
		return alert('Vous devez sélectionner quelque chose pour faire ça');
	}
	
	var caracteresEnleves = 0;
	
	var lignes = textarea.value.substring(textarea.selectionStart,textarea.selectionEnd).split('\n');
	for(var i = 0; i < lignes.length; i++) {
		while(lignes[i][0] <= ' ' || lignes[i][0] === '\xa0') {
			lignes[i] = lignes[i].substr(1);
			caracteresEnleves++;
		}
	}
	var startPos = textarea.selectionStart;
	var endPos = textarea.selectionEnd - caracteresEnleves;
	var val = textarea.value.substring(0,textarea.selectionStart);
	val += lignes.join('\n');
	val += textarea.value.substring(textarea.selectionEnd);
	textarea.value = val;
	textarea.focus();
	textarea.setSelectionRange(startPos, endPos);
}

// Fonction pour obtenir la taille du texte en pixels

function getTextSize(texte) {
	var smilies = [':snif:', ':gba:', ':g\\)', ':snif2:', ':bravo:', ':hap:', ':ouch:', ':pacg:', ':cd:', ':ouch2:', ':pacd:', ':cute:', ':content:', ':noel:', ':oui:', ':peur:', ':question:', ':cool:', ':coeur:', ':mort:', ':rire:', ':fou:', ':sleep:', ':\\-D', ':nonnon:', ':fier:', ':honte:', ':rire2:', ':non2:', ':sarcastic:', ':monoeil:', ':nah:', ':doute:', ':rouge:', ':ok:', ':non:', ':malade:', ':fete:', ':sournois:', ':hum:', ':ange:', ':diable:', ':gni:', ':play:', ':desole:', ':spoiler:', ':merci:', ':svp:', ':sors:', ':salut:', ':rechercher:', ':hello:', ':up:', ':bye:', ':gne:', ':lol:', ':dpdr:', ':dehors:', ':hs:', ':banzai:', ':bave:', ':pf:', ':loveyou:', ':hapoelparty:', ':mac:', ':globe:', ':\\)', ':\\(', ':d\\)', ':\\-\\)\\)\\)', ':\\-\\)', ':\\-p', ':\\-\\(\\(', ':\\-\\(', ':p\\)', ':o\\)\\)', ':fish:'];
	
	for(var i = 0;  i < smilies.length; i++) {
		texte = texte.replace(new RegExp(smilies[i], 'gi'), ' llLl ');
	}
	
	texte = texte.replace(/((?:ftp|https?):\/\/[^ \n<]+)/gi, function(match) {
		if(match.length > 50) {
			return match.substring(0, 24) + 'llLll' + match.substring(match.length-19);
		}
		else {
			return match;
		}
	});
	
	var div = document.createElement('span');
	div.appendChild(document.createTextNode(texte));
	document.body.appendChild(div);
	var taille = div.offsetWidth;
	document.body.removeChild(div);
	return taille;
}

// Fonction pour séparer les lignes du texte

function separerLignes(texte) {
	var substitued = {};
	texte = texte.replace(/((?:ftp|https?):\/\/[^ \n<]+)/gi, function(match) {
		var rand = Math.floor(Math.random()*999999999999);
		substitued[rand] = match;
		return rand;
	});
	texte = texte.replace(/([^\r\n ]{50})/g, '$1\n').replace(/([^\r\n ]{50}\n[^\r\n ]{0,49})([\n\r ]|$)/g, '$1\n$2');
	for(var i in substitued) {
		texte = texte.replace(i, substitued[i]);
	}
	var lignes = texte.replace(/ +/g, ' ').split('\n');
	
	for(var i = 0; i < lignes.length; i++) {
		var ligne2 = [];
		
		while(getTextSize(lignes[i]) > 520 && lignes[i].indexOf(' ') !== -1) {
			lignes[i] = lignes[i].split(' ');
			ligne2.unshift(lignes[i].pop());
			lignes[i] = lignes[i].join(' ');
		}
		
		if(ligne2.length !== 0) {
			lignes.splice(i+1, 0, ligne2.join(' '));
		}
	}
	
	return lignes;
}

// Fonction qui retourne du texte centré

function centrer(aDroite) {
	if(textarea.selectionStart === textarea.selectionEnd) {
		return alert('Vous devez sélectionner quelque chose pour faire ça');
	}
	
	var texte = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
	var lignes = separerLignes(texte);
	var ajoutTotal = 0;
	for(var i = 0; i < lignes.length; i++) {
		if(lignes[i] !== '') {
			while(lignes[i][0] <= ' ' || lignes[i][0] === '\xa0') {
				lignes[i] = lignes[i].substr(1);
				ajoutTotal--;
			}
			
			var espaceLibre = Math.max(0, 520 - getTextSize(lignes[i]));
			
			if(!aDroite) {
				espaceLibre /= 2;
			}
			
			espaceLibre = Math.floor(espaceLibre / 3);
			ajoutTotal += espaceLibre;
			
			var blanc = '\x1f';
			ajoutTotal++;
			for(var j = 0; j < espaceLibre; j++) {
				if((j % 2 === 0 && (j !== espaceLibre - 1 || (j === 0 && !lignes[i].match(/^(?:http|ftp):\/\//i)))) || j === espaceLibre - 2) {
					blanc += '\xa0';
				}
				else {
					blanc += ' ';
				}
			}
			lignes[i] = blanc + lignes[i];
		}
	}
	
	var startPos = textarea.selectionStart;
	var endPos = textarea.selectionEnd + ajoutTotal;
	var val = textarea.value.substring(0,textarea.selectionStart);
	val += lignes.join('\n');
	val += textarea.value.substring(textarea.selectionEnd);
	textarea.value = val;
	textarea.focus();
	textarea.setSelectionRange(startPos, endPos);
}

// Ajouter les boutons de JVPrez

var boutons = [
	['Texte à gauche', 'http://image.noelshack.com/fichiers/2013/16/1366055952-icon.png', enleverCentrage],
	['Texte centré', 'http://image.noelshack.com/fichiers/2013/16/1366056098-icon.png', centrer, false],
	['Texte à droite', 'http://image.noelshack.com/fichiers/2013/16/1366056053-icon.png', centrer, true],
	null,
	['Liste à puces', 'http://image.noelshack.com/fichiers/2013/16/1366054104-icon.png', ajouterAutour, '•\x1f\xa0 ', ''],
	['Liste à chiffres', 'http://image.noelshack.com/fichiers/2013/16/1366055016-icon.png', ajouterAutour, '%d. ', ''],
	null,
	//['Souligner', 'http://image.noelshack.com/fichiers/2013/16/1366055724-icon.png', souligner],
	//null,
	['Ajouter un séparateur', 'http://image.noelshack.com/fichiers/2013/16/1366063235-icon.png', ajouterSeparateur],
	null,
	["Entourer de smileys :globe:", 'http://image.jeuxvideo.com/smileys_img/6.gif', ajouterAutour, ':globe: ', ' :globe:'],
	["Entourer de smileys :cd:", 'http://image.jeuxvideo.com/smileys_img/5.gif', ajouterAutour, ':cd: ', ' :cd:'],
	["Entourer de smileys :mac:", 'http://image.jeuxvideo.com/smileys_img/16.gif', ajouterAutour, ':mac: ', ' :mac:'],
	["Entourer de smileys :pacg:/:pacd:", 'http://image.jeuxvideo.com/smileys_img/9.gif', ajouterAutour, ':pacg: ', ' :pacd:'],
	["Entourer de smileys :d)/:g)", 'http://image.jeuxvideo.com/smileys_img/4.gif', ajouterAutour, ':d) ', ' :g)'],
	null
];

var boutonsJVC = document.getElementsByClassName('message')[0].getElementsByTagName('span')[0];
var premierBouton = boutonsJVC.firstChild;

var divBoutons = document.createElement('span');
divBoutons.style.clear = 'both';
divBoutons.style.paddingTop = '5px';
divBoutons.style.paddingBottom = '5px';

for(var i = 0; i < boutons.length; i++) {
	if(boutons[i] === null) {
		boutonsJVC.insertBefore(document.createTextNode('\xa0\xa0\xa0'), premierBouton);
		continue;
	}
	var bouton = document.createElement('a');
	bouton.href = '#';
	bouton.title = boutons[i][0];
	bouton.infos = boutons[i];
	bouton.onmousedown = function(e){e.preventDefault();this.infos[2](this.infos[3],this.infos[4])};
	bouton.onclick = function(e){e.preventDefault()};
	bouton.className = 'btn btn-icon';
	bouton.style.outline = 'none';
	
	var imgBouton = document.createElement('img');
	imgBouton.src = boutons[i][1];
	
	bouton.appendChild(imgBouton);
	boutonsJVC.insertBefore(bouton, premierBouton);
	boutonsJVC.insertBefore(document.createTextNode(' '), premierBouton);
}

// Éviter les copier-collers fail

textarea.onpaste = function() {
	window.setTimeout(function() {
		var val = textarea.value;
		val = val.replace(/\x1f +/g, function(match) { return match.replace(/ /g, '\xa0').replace(/\xa0\xa0/g, '\xa0 ') });
		val = val.replace(/[ \xa0]{2}((?:http|ftp):\/\/)/gi, '\xa0 $1').replace(/\xa0((?:http|ftp):\/\/)/gi, ' $1');
		textarea.value = val;
	}, 1);
}
