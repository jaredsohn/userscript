// ==UserScript==
// @name	   Script Legion Alpha Revolution Exclusive
// @description    Script Legion Alpha Revolution Exclusive
// @version 	   2.0
// @autor          Create by Dante
// @include	http://s1.cl.ikariam.*/*
// @exclude	http://s*.*.ikariam.*/pillory.php*
// @exclude        http://support.*.ikariam.*/*
// ==/UserScript==
// -------------------------------------------------------

// On définis le chemin du site
var siteUrl = 'http://ika-art.teknopop.com';

// On définis la version actuel
var currentVersion = 'Modificado y Creado por Dante';

// On définis le lien du fichier contenant le numéro de la dernière version disponible
var lastVersionUrl = siteUrl+'/scriptIkArt/version.txt'

// On définis le lien du jeu apporté par le bonus d'IkArt
var bonusGameUrl = siteUrl+'/scriptIkArt/line-rider.swf'

// On définis le chemin du serveur pour les images
var hostPath = 'http://ika-art.teknopop.com';

// On définis le chemin du dossier IkArt sur le site
var dirPath = hostPath+'/scriptIkArt';

//Hosting
var dirimagen = 'http://img718.imageshack.us'

// On récupère le valeur du répertoire, si on ne la trouve pas on définis par défaut "wonder"
var repertoire = GM_getValue('repertoire', 'wonder');

// On récupère le valeur de l'invertion (Cave et pressoir), si on ne la trouve pas on définis par défaut "true"
var invertion = GM_getValue('invertion', true);

// On récupère le valeur de l'allongement de la vue, si on ne la trouve pas on définis par défaut "true"
var allonger = GM_getValue('allonger', false);

//On récupère le valeur de l'affichage des noms complets des villes, si on ne la trouve pas on définis par défaut "true"
var seeCompletCityName = GM_getValue('completCityName', true);

// On récupère le valeur du langage, si on ne la trouve pas on définis par défaut "fr"
var langage = GM_getValue('langage', 'fr');

// On récupère le lien de l'image à afficher du menu gauche sur la vue de la ville
var reportInboxLeftSign = GM_getValue('logo', 'http://img718.imageshack.us/img718/2887/94500074.png');

// On récupère la valeur de la class de la liste d'amis, si on ne la trouve pas on définis par défaut "openfriends"
var toggleFriends = GM_getValue('toggleFriends', 'openfriends');

// On récupère la valeur de la class de la liste d'amis, si on ne la trouve pas on définis par défaut "openfriends"
var messagePerPage = GM_getValue('messagePerPage', 10);

// On récupère la valeur de l'activation des conseillés spéciaux, si on ne la trouve pas on définis par défaut "true"
var activeSpecialAdvisor = GM_getValue('activeSpecialAdvisor', true);

// On récupère la valeur de l'activation des icones de ressources, si on ne la trouve pas on définis par défaut "true"
var activeResourceIcon = GM_getValue('activeResourceIcon', true);

// On récupère les valeurs de chaque périodes
var H_aube1 = GM_getValue('aube1', '7');
var H_aube2 = GM_getValue('aube2', '8');
var H_jour1 = GM_getValue('jour1', '9');
var H_jour2 = GM_getValue('jour2', '18');
var H_crepuscule1 = GM_getValue('crepuscule1', '19');
var H_crepuscule2 = GM_getValue('crepuscule2', '20');
var H_nuit1 = GM_getValue('nuit1', '21');
var H_nuit2 = GM_getValue('nuit2', '6');

// On récupère l'heure de l'ordinateur
var localTime = new Date();
var H_time = localTime.getHours();

// --- Déclération des périodes en fonction des horaires ---
var periode;
// Toutes les périodes utilisées
if(H_aube1 != '-1' && H_aube2 != '-1' && H_jour1 != '-1' && H_jour2 != '-1' && H_crepuscule1 != '-1' && H_crepuscule2 != '-1' && H_nuit1 != '-1' && H_nuit2 != '-1') {
	if((H_time >= H_aube1 && H_time <= H_aube2) || (H_time >= H_aube1 && H_aube1 > H_aube2 && H_aube1 > H_jour2 && H_aube1 > H_crepuscule2 && H_aube1 > H_nuit2) || (H_time <= H_aube2 && H_aube2 < H_aube1 && H_aube2 < H_jour1 && H_aube2 < H_crepuscule1 && H_aube2 < H_nuit1)) {
		periode = 'AUBE';
	}
	if((H_time >= H_jour1 && H_time <= H_jour2) || (H_time >= H_jour1 && H_jour1 > H_aube2 && H_jour1 > H_jour2 && H_jour1 > H_crepuscule2 && H_jour1 > H_nuit2) || (H_time <= H_jour2 && H_jour2 < H_aube1 && H_jour2 < H_jour1 && H_jour2 < H_crepuscule1 && H_jour2 < H_nuit1)) {
		periode = 'JOURNEE';
	}
	if((H_time >= H_crepuscule1 && H_time <= H_crepuscule2) || (H_time >= H_crepuscule1 && H_crepuscule1 > H_aube2 && H_crepuscule1 > H_jour2 && H_crepuscule1 > H_crepuscule2 && H_crepuscule1 > H_nuit2) || (H_time <= H_crepuscule2 && H_crepuscule2 < H_aube1 && H_crepuscule2 < H_jour1 && H_crepuscule2 < H_crepuscule1 && H_crepuscule2 < H_nuit1)) {
		periode = 'CREPUSCULE';
	}
	if((H_time >= H_nuit1 && H_time <= H_nuit2) || (H_time >= H_nuit1 && H_nuit1 > H_aube2 && H_nuit1 > H_jour2 && H_nuit1 > H_crepuscule2 && H_nuit1 > H_nuit2) || (H_time <= H_nuit2 && H_nuit2 < H_aube1 && H_nuit2 < H_jour1 && H_nuit2 < H_crepuscule1 && H_nuit2 < H_nuit1)) {
		periode = 'NUIT';
	}
}
// Les périodes de jour et de nuit utilisées
if(H_aube1 == '-1' && H_aube2 == '-1' && H_jour1 != '-1' && H_jour2 != '-1' && H_crepuscule1 == '-1' && H_crepuscule2 == '-1' && H_nuit1 != '-1' && H_nuit2 != '-1') {
	if((H_time >= H_jour1 && H_time <= H_jour2) || (H_time >= H_jour1 && H_jour1 > H_jour2 && H_jour1 > H_nuit2) || (H_time <= H_jour2 && H_jour2 < H_jour1 && H_jour2 < H_nuit1)) {
		periode = 'JOURNEE';
	}
	if((H_time >= H_nuit1 && H_time <= H_nuit2) || (H_time >= H_nuit1 && H_nuit1 > H_jour2 && H_nuit1 > H_nuit2) || (H_time <= H_nuit2 && H_nuit2 < H_jour1 && H_nuit2 < H_nuit1)) {
		periode = 'NUIT';
	}
}
// La période de jour utilisées
if(H_aube1 == '-1' && H_aube2 == '-1' && H_jour1 != '-1' && H_jour2 != '-1' && H_crepuscule1 == '-1' && H_crepuscule2 == '-1' && H_nuit1 == '-1' && H_nuit2 == '-1') {
	periode = 'JOURNEE';
}


// Correction des variables (remise par défaut) en cas de problème
if(repertoire != 'wonder' && repertoire != 'snow') {
	repertoire = 'wonder';
}
if(invertion != true && invertion != false) {
	invertion = true;
}
if(allonger != false && allonger != true) {
	allonger = false;
}
if(langage != 'fr' && langage != 'org') {
	langage = 'fr';
}
if(periode != 'JOURNEE' && periode != 'CREPUSCULE' && periode != 'NUIT' && periode != 'AUBE') {
	periode = 'JOURNEE';
}
if(toggleFriends != 'openfriends' && toggleFriends != 'closefriends') {
	toggleFriends = 'openfriends';
}
if(parseInt(messagePerPage) != messagePerPage) {
	messagePerPage = 10;
}
if(activeSpecialAdvisor != true && activeSpecialAdvisor != false) {
	activeSpecialAdvisor = true;
}
if(activeResourceIcon != true && activeResourceIcon != false) {
	activeResourceIcon = true;
}



// -------------------------------------------------------
// ---------- Définition des fonctions de bases ----------
// -------------------------------------------------------

// --- Fonction Ajout de style ---
function STYLE(css) {
	var head = document.getElementsByTagName('head')[0];
	var cssStyleIkart = document.getElementById('cssStyleIkArt');
	if (head) {
		if(cssStyleIkart) {
			cssStyleIkart.innerHTML += '\n'+css;
		}
		else {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.id = 'cssStyleIkArt';
			style.innerHTML = css;
			head.appendChild(style);
		}
	}
}

// --- Récupération de la dernière version disponible ---
if(document.getElementById('city') && document.getElementById('position0')) {
	GM_xmlhttpRequest({
		method	:'GET',
		url		: lastVersionUrl,
		onload	: function(responseDetails) {
			var lastVersion = responseDetails.responseText;
			if(currentVersion.replace('.', '') < lastVersion.replace('.', '')) {
				var parentMaj = document.getElementById('position0');
				var divMaj = document.createElement('div');
				divMaj.className = 'ikartmaj';
				parentMaj.appendChild(divMaj);
			}
		}
	});
}

// --- Fonction Ajout des Phases 25 à 27 ---
if(document.getElementById('position0')) {
	var titleHotel = document.getElementById('position0').getElementsByTagName('a')[0].title;
	var levelHotel = titleHotel.substr(titleHotel.length-2)*1;
	if(levelHotel > 27) {levelHotel = 27;}
	var mainview = document.getElementById('mainview');
	mainview.className = 'phase'+levelHotel;
}

// --- Fonction Allongement de phase ---
if(allonger == true && document.getElementById('city')) {
	var cityView = document.getElementById('mainview');
	var cityViewUl = document.createElement('ul');
	cityViewUl.id = 'ikartLocation';
	cityView.appendChild(cityViewUl);
}

// --- Fonction Ajout de scènes ---
if(document.getElementById('locations')) {
	var parentLocation = document.getElementById('locations');
	var parentIkartLocation = document.getElementById('ikartLocation');

	// Si la ville est content
	if(parentLocation.innerHTML.search('beachboys') != -1) {
		// Si en plus le théatre est construit
		if(levelHotel >= 12 && levelHotel != 15) {
			var theatreLi = document.createElement('li');
			theatreLi.className = 'theatre';
			parentLocation.appendChild(theatreLi);
		}
		
		// Si en plus la vue est allongée et si la ville peut recevoir les nageurs (niveau plus grand que 7)
		if(allonger == true && levelHotel >= 7) {
			var nageursLi = document.createElement('li');
			nageursLi.className = 'nageurs';
			parentIkartLocation.appendChild(nageursLi);
			
			// Et si la ville peut recevoir un spéctacle (niveau plus grand que 10)
			if(levelHotel >= 10) {
				var spectacleLi = document.createElement('li');
				spectacleLi.className = 'spectacle';
				parentIkartLocation.appendChild(spectacleLi);
			}
		}
	}
	// Si la ville est allongée
	if(allonger == true) {
		// Si en plus il y a une attaque
		if(document.getElementById('advMilitary').innerHTML.search('normalalert') != -1) {
			var armadaLi = document.createElement('li');
			armadaLi.className = 'armada';
			parentIkartLocation.appendChild(armadaLi);
		}
		
		// Si en plus la ville n'est pas contente et si la ville peut recevoir une émeute (niveau plus grand que 10)
		if(document.getElementById('locations').innerHTML.search('protester') != -1 && levelHotel >= 10) {
			var emeuteLi = document.createElement('li');
			emeuteLi.className = 'emeute';
			parentIkartLocation.appendChild(emeuteLi);
		}
	}
}

// --- Fonction pour ajouter un bouton "Cacher la liste d'amis" ---
if(document.getElementById('friends')) {
	var divColFriends = document.getElementById('friends');
	var divToggleFriends = document.createElement('div');
	var toggleFriendsClass;
	var title;
	
	if(toggleFriends == 'closefriends') {
		toggleFriendsClass = 'openfriends';
		if(langage == 'fr') {
			title = 'Agrandir la liste';
		}
		else if(langage == 'org') {
			title = 'Extend the list';
		}
	}
	else if(toggleFriends == 'openfriends') {
		toggleFriendsClass = 'closefriends';
		if(langage == 'fr') {
			title = 'Réduire la liste';
		}
		else if(langage == 'org') {
			title = 'Reduce the list';
		}
	}
	
	divColFriends.className = toggleFriends;
	divToggleFriends.className = toggleFriendsClass;
	divToggleFriends.title = title;
	divToggleFriends.id = 'toggleCloseFriends'
	divToggleFriends.innerHTML = '<a onclick="friendsvg(\''+toggleFriendsClass+'\')" class="toogleFriends '+toggleFriendsClass+'"></a>';
	divColFriends.appendChild(divToggleFriends);
	
	unsafeWindow.friendsvg = function (action) {
		if(toggleFriends == 'closefriends') {
			if(langage == 'fr') {
				title = 'Réduire la liste';
			}
			else if(langage == 'org') {
				title = 'Reduce the list';
			}
		}
		else if(toggleFriends == 'openfriends') {
			if(langage == 'fr') {
				title = 'Agrandir la liste';
			}
			else if(langage == 'org') {
				title = 'Extend the list';
			}
		}
		divToggleFriends.title = title;
		divColFriends.className = toggleFriendsClass;
		divToggleFriends.className = toggleFriends;
		divToggleFriends.innerHTML = '<a onclick="friendsvg(\''+toggleFriends+'\')" class="toogleFriends '+toggleFriends+'"></a>';
		
		window.setTimeout(function() {
			GM_setValue('toggleFriends', action);
		}, 0);
		
		toggleFriends = divColFriends.className;
		toggleFriendsClass = divToggleFriends.className;
	}
}

// --- Fonction Code Konami ---
if(window.addEventListener) {
	// Liste dans laquelle on mettra dans l'ordre les codes corespondant aux touches pressées
	var keysPress = [];
	//  Listes des codes des touches à pressées.
	var keysToPress = '38,38,40,40,37,39,37,39,66,65';
	
	// Si un évenement du type 'Keydown' est trouver on lance la fonction
	window.addEventListener('keydown', function(event) {
		// On ajoute à la liste le code de la touche pressée au moment de l'évenement
		keysPress.push(event.keyCode);
		
		// Si dans la liste des codes de touches présées on trouve la liste des codes de touches à pressées
		if(keysPress.toString().search(keysToPress) != -1 && document.getElementById('container')) {
			// On effectue ce qu'on veux
			if(document.getElementById('bonusByIkArt')) {
				document.getElementById('bonusByIkArt').style.display = 'block';
			}
			else {
				var textByIkartParent = document.getElementById('container');
				var textByIkart = document.createElement('div');
				textByIkart.id = 'bonusByIkArt';
				textByIkart.innerHTML = '<div id="gameContent"><h3 class="title">{ Bonus by IkArt }</h3><span class="close" onclick=\'document.getElementById("bonusByIkArt").style.display = "none"\'></span><div class="game"><embed height="600" width="800" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="'+bonusGameUrl+'"></object></div></div>';
				textByIkartParent.appendChild(textByIkart);
			}
			
			// On vide la liste des codes de touches présées
			keysPress = [];
		}
	}, true);
}

// --- Fonction de remplacement des icones de ressource qui ne peuvent pas être changer via la style ---
if(activeResourceIcon == true) {
	if(document.getElementById('resource') || document.getElementById('tradegood') || document.getElementById('takeOffer') || document.getElementById('wonder') || document.getElementById('embassyHomeSecretaryMembers') || document.getElementById('embassyLeaderBonus')  || document.getElementById('diplomacyAdvisorTreaty') || document.getElementById('merchantNavy') || document.getElementById('warehouse') || document.getElementById('dump') || document.getElementById('townHall') || document.getElementById('palace') ||  document.getElementById('palaceColony') || document.getElementById('branchOffice') || document.getElementById('glassblowing') || document.getElementById('optician') || document.getElementById('stonemason') || document.getElementById('architect') || document.getElementById('vineyard') || document.getElementById('winegrower') || document.getElementById('alchemist') || document.getElementById('fireworker') || document.getElementById('carpentering') || document.getElementById('forester')) {
		var parent = document.getElementById('container');
		var imgs = parent.getElementsByTagName('img');
		var nbImg = imgs.length;
		var wine = 'skin/resources/icon_wine.gif';
		var marble = 'skin/resources/icon_marble.gif';
		var crystal = 'skin/resources/icon_crystal.gif';
		var glass = 'skin/resources/icon_glass.gif';
		var sulfur = 'skin/resources/icon_sulfur.gif';
		var wood = 'skin/resources/icon_wood.gif';
		for(i = 0; i < nbImg; i++) {
			if(imgs[i].src.search(wine) != '-1') {
				imgs[i].src = ''+dirPath+'/icon/wine.png';
			}
			if(imgs[i].src.search(marble) != '-1') {
				imgs[i].src = ''+dirPath+'/icon/marble.png';
			}
			if(imgs[i].src.search(crystal) != '-1' || imgs[i].src.search(glass) != '-1') {
				imgs[i].src = ''+dirPath+'/icon/glass.png';
			}
			if(imgs[i].src.search(sulfur) != '-1') {
				imgs[i].src = ''+dirPath+'/icon/sulfur.png';
			}
			if(imgs[i].src.search(wood) != '-1') {
				imgs[i].src = ''+dirPath+'/icon/wood.png';
			}
		}
	}
}

// --- Fonction correction du bâtiments sur les pages de destruction du bâtiment ---
if(document.getElementById('buildings_demolition')) {
	if(document.getElementById('backTo')) {
		// On récupère le lien de retour de la page de démolition vers le bâtiment
		var backSrc = document.getElementById('backTo').getElementsByTagName('a')[0].href;
		
		// On récupère le paramètre de l'option 'view' de l'url de retour pour savoir quel est le bâtiment
		var param;
		var optionName = 'view';
		var optionPlace = backSrc.indexOf('?'+optionName+'=');
		if(optionPlace == (-1)) {
			optionPlace = backSrc.indexOf('&'+optionName+'=');
		}
		
		if(optionPlace != (-1)) {
			var paramStart = (optionPlace + optionName.length + 2);
			var paramEnd = backSrc.indexOf('&', paramStart);
			if(paramEnd == (-1)) {
				paramEnd = backSrc.length;
			}
			
			var paramLenght = (paramEnd - paramStart);
			var param = backSrc.substr(paramStart, paramLenght);
		}
		else {
			param = null;
		}
		
		// on attribus a l'image la class correspondant au bâtiment
		document.getElementById('backTo').getElementsByTagName('img')[0].className = 'backToBuildingImg '+param+'';
	}
}

// --- Fonction changement de l'image du menu gauche sur la vue de la ville ---
if(document.getElementById('city') && document.getElementById('reportInboxLeft') && document.getElementById('reportInboxLeft').getElementsByTagName('img')[0]) {
	// On adapate égallement l'image du menu de gauche en fonction du thème si c'est l'image d'ikart
	if(repertoire == 'snow' && reportInboxLeftSign == dirPath+'/logo/ikart.png') {
		reportInboxLeftSign = dirPath+'/logo/ikart_snow.png';
	}
	else if(repertoire == 'halloween' && reportInboxLeftSign == dirPath+'/logo/ikart.png') {
		reportInboxLeftSign = dirPath+'/logo/ikart_halloween.png';
	}
	else if(reportInboxLeftSign == '') {
		document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].style.display = 'none';
	}
	
	document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].src = reportInboxLeftSign;
}

// --- Fonction pour affiché plus ou moins de messages par page ---
if(messagePerPage != 10 && document.getElementById('diplomacyAdvisor') && document.getElementById('deleteMessages') && document.getElementById('tabz')) {
	// On récupère le paramètre de l'option 'start' de l'url pour savoir à partir de quel message on affiche
	var param;
	var optionName = 'start';
	var optionPlace = location.search.indexOf('?'+optionName+'=');
	if(optionPlace == (-1)) {
		optionPlace = location.search.indexOf('&'+optionName+'=');
	}
	
	if(optionPlace != (-1)) {
		var paramStart = (optionPlace + optionName.length + 2);
		var paramEnd = location.search.indexOf('&', paramStart);
		if(paramEnd == (-1)) {
			paramEnd = location.search.length;
		}
		
		var paramLenght = (paramEnd - paramStart);
		var param = location.search.substr(paramStart, paramLenght);
	}
	else {
		param = 0;
	}
	
	param = parseInt(param);
	
	// Variables de bases
	var pageUrl= document.location.href;
	var pageUrlElements = pageUrl.split('/');
	var pageServer = pageUrlElements[2];
	
	var lastMessageLoad = (param + 10);
	var lastMessageShow = (param + messagePerPage);
	
	var receivedMessage = document.getElementById('tabz').getElementsByTagName('em')[0].innerHTML;
	var startNbMessage = (receivedMessage.indexOf('(') + 1);
	var nbMessage = receivedMessage.substr(startNbMessage, (receivedMessage.length - startNbMessage - 1));
	
	var tableMessage = document.getElementById('deleteMessages').getElementsByTagName('tr')[0].parentNode;
	var nbTableTr = tableMessage.getElementsByTagName('tr').length;
	if(nbTableTr >= 7) {
		var headLegend = tableMessage.getElementsByTagName('tr')[0];
		var pagination = tableMessage.getElementsByTagName('tr')[nbTableTr-3];
		var markMessage = tableMessage.getElementsByTagName('tr')[nbTableTr-2];
		var actionMessage = tableMessage.getElementsByTagName('tr')[nbTableTr-1];
		var regExp = /(id="gmessage[0-9]+")/g;
		var moreTr;
		if(tableMessage.innerHTML.search('gmessage') != -1) {
			var matches = tableMessage.innerHTML.match(regExp);
			moreTr = matches.length * 3;
		}
		else {
			moreTr = 0;
		}
		
		if(nbMessage > lastMessageShow && param == 0) {
				pagination.innerHTML = '<td class="paginator" colspan="5">1 - '+messagePerPage+'<a title="'+messagePerPage+' suivants..." href="?view=diplomacyAdvisor&amp;start='+(param + messagePerPage)+'"><img src="skin/img/resource/btn_max.gif"></a><a title="'+messagePerPage+' suivants..." href="?view=diplomacyAdvisor&amp;start='+(param + messagePerPage)+'">'+messagePerPage+' suivants...</a></td>';
		}
		else if(nbMessage <= lastMessageShow && param == 0) {
				pagination.innerHTML = '<td class="paginator" colspan="5">1 - '+nbMessage+'</td>';
		}
		else if(nbMessage > lastMessageShow && param != 0) {
				pagination.innerHTML = '<td class="paginator" colspan="5"><a title="...'+messagePerPage+' précédents" href="?view=diplomacyAdvisor&amp;start='+(param - messagePerPage)+'">...'+messagePerPage+' précédents</a><a title="...'+messagePerPage+' précédents" href="?view=diplomacyAdvisor&amp;start='+(param - messagePerPage)+'"><img src="skin/img/resource/btn_min.gif"></a>'+(param + 1)+' - '+(param + messagePerPage)+'<a title="'+messagePerPage+' suivants..." href="?view=diplomacyAdvisor&amp;start='+(param + messagePerPage)+'"><img src="skin/img/resource/btn_max.gif"></a><a title="'+messagePerPage+' suivants..." href="?view=diplomacyAdvisor&amp;start='+(param + messagePerPage)+'">'+messagePerPage+' suivants...</a></td>';
		}
		else if(nbMessage <= lastMessageShow && param != 0) {
				pagination.innerHTML = '<td class="paginator" colspan="5"><a title="...'+messagePerPage+' précédents" href="?view=diplomacyAdvisor&amp;start='+(param - messagePerPage)+'">...'+messagePerPage+' précédents</a><a title="...'+messagePerPage+' précédents" href="?view=diplomacyAdvisor&amp;start='+(param - messagePerPage)+'"><img src="skin/img/resource/btn_min.gif"></a>'+(param + 1)+' - '+nbMessage+'</td>';
		}
		
		tableMessage.removeChild(headLegend);
		tableMessage.removeChild(pagination);
		tableMessage.removeChild(markMessage);
		tableMessage.removeChild(actionMessage);
		
		var firstMessages = tableMessage.innerHTML;
		
		// On récupère les messages sur les autres page
		function get10by10message() {
			GM_xmlhttpRequest({
				method	:'GET',
				url		: 'http://'+pageServer+'/index.php?view=diplomacyAdvisor&start='+lastMessageLoad,
				headers	: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload	: function(responseDetails) {
					var contentPage = responseDetails.responseText;
					var messages = contentPage.substr(contentPage.indexOf('id="deleteMessages"'));
					messages = messages.substr((messages.indexOf('</tr>') + 5), (messages.indexOf('class="paginator"') - (messages.indexOf('</tr>') + 5)));
					var allMessages = firstMessages + messages;
					
					// Si il y a une autre page et qu'on à besoin de les récupérer, on lance la fonction qui récupère les messages sur l'autre page
					if(nbMessage > lastMessageLoad && messagePerPage  > lastMessageLoad) {
						get10by10message();
					}
					else {
						// On ajoute tout les messages à la page
						tableMessage.innerHTML = '<tr>'+headLegend.innerHTML+'</tr>'+allMessages+'<tr>'+pagination.innerHTML+'</tr><tr>'+markMessage.innerHTML+'</tr><tr>'+actionMessage.innerHTML+'</tr>';
						
						// Et on retire ceux en trop
						if(nbMessage > lastMessageShow) {
								var newNbTableTr = tableMessage.getElementsByTagName('tr').length;
								for(i = (newNbTableTr - 4); i >= (messagePerPage * 3 + 1 + moreTr); i--) {
								tableMessage.removeChild(tableMessage.getElementsByTagName('tr')[i]);
							}
						}
					}
				}
			});
			
			lastMessageLoad = (lastMessageLoad + 10);
			
			// Si il y a une autre page et qu'on à besoin de les récupérer, on lance la fonction qui récupère les messages sur l'autre page
			if(nbMessage > lastMessageLoad && messagePerPage  > lastMessageLoad) {
				get10by10message();
			}
		}
		
		// Si il y a une autre page et qu'on à besoin de les récupérer, on lance la fonction qui récupère les messages sur l'autre page
		if(nbMessage > lastMessageLoad && messagePerPage  > lastMessageLoad) {
			get10by10message();
		}
		else {	
			// Sinon on ajoute tout les messages à la page
			tableMessage.innerHTML = '<tr>'+headLegend.innerHTML+'</tr>'+firstMessages+'<tr>'+pagination.innerHTML+'</tr><tr>'+markMessage.innerHTML+'</tr><tr>'+actionMessage.innerHTML+'</tr>';
			
			// Et on retire ceux en trop
			if(nbMessage > lastMessageShow) {
				var newNbTableTr = tableMessage.getElementsByTagName('tr').length;
				for(i = (newNbTableTr - 4); i >= (messagePerPage * 3 + 1 + moreTr); i--) {
					tableMessage.removeChild(tableMessage.getElementsByTagName('tr')[i]);
				}
			}
		}
	}		
}

// --- Fonction pour rajouter des niveaux aux cities de la vue de l'île et afficher leurs nom au complet ---
if(document.getElementById('island') && document.getElementById('cities')) {
	// On parcour les cities
	for(i = 0; i <= 16; i++) {
		var city = document.getElementById('cityLocation'+i);
		// Si une ville existe bien sur l'emplacement
		if(city.getElementsByTagName('ul')[0] && city.getElementsByTagName('a')[0].getElementsByTagName('span')[0]) {
			// On récupère les infos avant des les afficher
			if(city.getElementsByTagName('table')[0]) {
				var cityInfo = city.getElementsByTagName('table')[0];
			}
			else if(city.getElementsByTagName('ul')[0]) {
				var cityInfo = city.getElementsByTagName('ul')[0];
			}
			
			// On précise les emplacement des infos
			var cityLink = city.getElementsByTagName('a')[0];
			var citySpanName = cityLink.getElementsByTagName('span')[0];
			var cityActivityType = citySpanName.getElementsByTagName('span')[1].className;
			var titleActivityType = citySpanName.getElementsByTagName('span')[1].title;
			var charActivityType = citySpanName.getElementsByTagName('span')[1].innerHTML;
			if(cityActivityType == 'palm') {
				cityActivityType = citySpanName.getElementsByTagName('span')[2].className;
				titleActivityType = citySpanName.getElementsByTagName('span')[2].title;
				charActivityType = citySpanName.getElementsByTagName('span')[2].innerHTML;
			}
			
			// On tronque les données nécessaires des infos
			if(city.getElementsByTagName('table')[0]) {
				var cityName = cityInfo.getElementsByTagName('td')[1].innerHTML;
				var cityLevel = cityName.substr((cityName.indexOf('(') + 1), (cityName.indexOf(')') - (cityName.indexOf('(') + 1)));
				cityName = cityName.substr(0, (cityName.indexOf('(') - 1));
				charActivityType = charActivityType.substr((charActivityType.indexOf('(') + 1), (charActivityType.indexOf(')') - (charActivityType.indexOf('(') + 1)));
			}
			else if(city.getElementsByTagName('ul')[0]) {
				var cityName = cityInfo.getElementsByTagName('li')[0].innerHTML.substr((cityInfo.getElementsByTagName('li')[0].innerHTML.indexOf('</span>') + 7));
				var cityLevel = cityName.substr((cityName.indexOf('(') + 1), (cityName.indexOf(')') - (cityName.indexOf('(') + 1)));
				cityName = cityName.substr(0, (cityName.indexOf('(') - 1));
				charActivityType = charActivityType.substr((charActivityType.indexOf('(') + 1), (charActivityType.indexOf(')') - (charActivityType.indexOf('(') + 1)));
			}
			
			if(cityLevel > 32) {cityLevel = 32;}
			
			// On redistribue les infos
			city.className = 'cityLocation city level'+cityLevel;
			if(seeCompletCityName == true) {
				if(cityActivityType == 'after') {
					citySpanName.innerHTML = '<span class="before"></span>'+cityName+'<span class="after"></span>';
				}
				if(cityActivityType == 'inactivity') {
					citySpanName.innerHTML = '<span class="before"></span><span class="inactivity" title="'+titleActivityType+'">'+cityName+' ('+charActivityType+')</span><span class="after"></span>';
				}
				if(cityActivityType == 'vacation') {
					citySpanName.innerHTML = '<span class="before"></span><span class="palm"></span><span class="vacation" title="'+titleActivityType+'">'+cityName+' ('+charActivityType+')</span><span class="after"></span>';
				}
			}
		}
	}
}



// -------------------------------------------------------
// ----------------- Gestion des options -----------------
// -------------------------------------------------------

// Si on se trouve sur la page des options
if(document.getElementById('options')) {
	// On récupère le paramètre de l'option 'page' de l'url
	var param;
	var optionName = 'page';
	var optionPlace = location.search.indexOf('?'+optionName+'=');
	if(optionPlace == (-1)) {
		optionPlace = location.search.indexOf('&'+optionName+'=');
	}
	
	if(optionPlace != (-1)) {
		var paramStart = (optionPlace + optionName.length + 2);
		var paramEnd = location.search.indexOf('&', paramStart);
		if(paramEnd == (-1)) {
			paramEnd = location.search.length;
		}
		
		var paramLenght = (paramEnd - paramStart);
		var param = location.search.substr(paramStart, paramLenght);
	}
	else {
		param = null;
	}
	
	// On récupère l'élément qui contient la barre des onglet
	var mainview = document.getElementById("mainview");
	var mainviewDivs = mainview.getElementsByTagName("div");
	var u = 1;
	for(i = 0; i < mainviewDivs.length && i < 10; i++) {
		if(mainviewDivs[i].className == 'yui-navset') {
			var u = i;
		}
	}
	
	// On créer l'onglet IkArt qui affichera les options
	var parentOngletIkArt = document.getElementById('mainview').getElementsByTagName('div')[u].getElementsByTagName('ul')[0];
	var ongletIkArt = document.createElement('li')
	ongletIkArt.id = 'ikartOnglet';
	
	// On insert l'onglet à la fin de l'élement qui contient les onglets des options
	parentOngletIkArt.appendChild(ongletIkArt);
	
	// On définis le contenue de l'onglet IkArt
	document.getElementById('ikartOnglet').innerHTML = '<a title="Script by Dante" href="?view=options&page=ikart"><em>Script L-A</em></a>'
	
	// --- Si le paramètre de l'option 'page' de l'url est 'IkArt' ---
	if(param == 'ikart') {
		
		// --- On parcours les élement pour cacher les options de bases et afficher celle d'IkArt ---
		for(i = (u+1); i < mainviewDivs.length; i++) {
			mainviewDivs[i].style.display = "none";
		}
		for(i = 0; i < 3; i++) {
			document.getElementById("mainview").getElementsByTagName("div")[u].getElementsByTagName("ul")[0].getElementsByTagName("li")[i].className = '';
		}
		document.getElementById("ikartOnglet").className = 'selected';
	
		// On créer l'élement qui contiendra les options
		var parentOptionsIkart = document.getElementById('mainview');
		var optionsIkart = document.createElement('div');
		optionsIkart.id = 'ikartOptions';
		optionsIkart.className = 'contentBox01h';
		
		// On insert les options à la fin de mainview
		parentOptionsIkart.appendChild(optionsIkart);
		
		
		// --- Définition des variables de bases pour les options ---
		
		// (Allonger la vue)
		var iAlong;
		if(allonger == true) {iAlong = ' checked="checked"';}
		
		// (Inverser cave et pressoir)
		var iInvert;
		if(invertion == true) {iInvert = ' checked="checked"';}
		
		// (Activer conseillés spéciaux)
		var iActiveAdvisor;
		if(activeSpecialAdvisor == true) {iActiveAdvisor = ' checked="checked"';}
		
		// (Activer icones ressource)
		var iActiveIcon;
		if(activeResourceIcon == true) {iActiveIcon = ' checked="checked"';}
		
		// (Activer icones ressource)
		var iActiveCompletCityName;
		if(seeCompletCityName == true) {iActiveCompletCityName = ' checked="checked"';}
		
		// (Répertoire images)
		var iRep1, iRep2, iRep3;
		if(repertoire == 'wonder') {iRep1=' checked="checked"';}
		else if(repertoire == 'snow') {iRep2=' checked="checked"';}
		else if(repertoire == 'halloween') {iRep3=' checked="checked"';}
		
		// (Langue utilisée)
		var iLang1, iLang2, iHelp, titleOptions, optionSite, siteAccess, optionVersion, optionLangage, titleTheme, optionTheme, optionLogo, logoGallery, galleryCity, galleryAdvisors, galleryDefault, optionStretchView, optionReverseWine, optionActiveAdvisors, optionActiveIcons, titlePeriods, optionHelp, optionDefaultConfiguration, configurationAll, configurationDayNight, configurationDay, optionDawn, optionDay, optionDusk, optionNight, periodStart, periodEnd, titleAddOption, optionMessagePerPage, buttonSave;
		
		if(langage == 'fr') {
			iLang1=' checked="checked"';
			iLang2='';
			iHelp = '<center><b>Bienvenue dans l\'aide !</b></center><br /><center>-------</center><br /><b>Rappel :</b> Pour supprimer une p&eacute;riode, il faut mettre "-1" dans les deux cases de la p&eacute;riode correspondante, <br /><br />Les sch&eacute;mas suivant indiquent les p&eacute;riodes que vous pouvez supprimer, pour avoir :<br /><br />- "Jour + Nuit + Aube + Cr&eacute;puscule" il ne faut supprimer aucune p&eacute;riode.<br />- "Jour + Nuit" il faut supprimer l\'Aube et le Cr&eacute;puscule.<br />- "Jour" il faut supprimer la Nuit, l\'Aube et le Cr&eacute;puscule.<br /><br /><center>-------</center><br />Pour pouvoir enregistrer les options, il faut qu\'aucune erreur ne soit d&eacute;tect&eacute;e, pour cela, v&eacute;rifiez bien :<br /><br /></br />- Qu\'aucune plage horaire n\'est utilis&eacute;e deux fois.<br />- Qu\'aucune plage horaire ne reste vide.<br />- Qu\'un des sch&eacute;mas pour la suppression des p&eacute;riodes est respect&eacute;.<br /><center>-------</center><br />Si toute fois vous n\'y arrivez toujours pas, vous pouvez revenir &agrave; l\'une des trois configurations de bases plus bas...<br /><br />';
			titleOptions = 'OPCIONES DEL SCRIPT';
			optionSite = 'Sitio Oficial L-A';
			siteAccess = 'Foro Legion Alpha';
			optionVersion = 'Autor';
			optionLangage = 'Idioma';
			titleTheme = 'TEMAS';
			optionTheme = 'Versiones';
			optionLogo = 'URL logo (203*85px)';
			logoGallery = 'Galeria';
			galleryCity = 'Ciudad';
			galleryAdvisors = 'Consejeros';
			galleryDefault = 'Por defecto';
			optionStretchView = 'Ampliar la vista de la ciudad';
			optionReverseWine = 'Invertir el viñedo y la prensa';
			optionActiveAdvisors = 'Activar los consejeros especiales';
			optionActiveIcons = 'Cambiar los iconos de recursos';
			titlePeriods = 'CONFIGURACION DEL TIEMPO';
			optionHelp = 'Ayuda';
			optionDefaultConfiguration = 'Configuracion por defecto';
			configurationAll = 'Configuracion: Amanecer + Dia + Atardecer + Noche';
			configurationDayNight = 'Configuracion: Dia + Noche';
			configurationDay = 'Configuracion: Dia';
			optionDawn = 'Amanecer';
			optionDay = 'Dia';
			optionDusk = 'Atardecer';
			optionNight = 'Noche';
			periodStart =  '00h &agrave;';
			periodEnd =  '59h';
			titleAddOption = 'OPCIONES ADICIONALES';
			optionMessagePerPage = 'Numero de mensajes por pagina';
			buttonSave = 'Guardar la Configuracion !!!';
			optionActiveCompletCityName = 'Ver los nombres completos de las ciudades';
		}
		else if(langage == 'org') {
			iLang2=' checked="checked"';
			iLang1='';
			iHelp = '<center><b>Welcome to the assistant !</b></center><br /><center>-------</center><br /><b>Reminder :</b> To remove one period you need to put "-1" in the two boxes to corresponding period, <br /><br />This examples configurations show what periods you should remove, to get :<br /><br />- "Dawn + Day + Dusk + Night" you must remove any period.<br />- "Day + Night" you must remove Dawn and Dusk.<br />- "Day" you must remove Night, Dawn and Dusk.<br /><br /><center>-------</center><br />To save settings, it\'s must to do any error, to this, verify :<br /><br /></br />- Any time slot is used twice time.<br />- Any time slot is empty.<br />- One of examples configurations to remove period be respected.<br /><center>-------</center><br />And after this if you can\'t save, you can back to one of three basics configurations above...<br /><br />';
			titleOptions = 'IkArt Options';
			optionSite = 'Official IkArt WebSite';
			siteAccess = 'Visit';
			optionVersion = 'Version of the script';
			optionLangage = 'Langage';
			titleTheme = 'Theme';
			optionTheme = 'Versions';
			optionLogo = 'Logo URL (203*85px)';
			logoGallery = 'Gallery';
			galleryCity = 'City';
			galleryAdvisors = 'Advisors';
			galleryDefault = 'Default';
			optionStretchView = 'Stretch the view out';
			optionReverseWine = 'Reverse vineyard and winegrower';
			optionActiveAdvisors = 'Activate the special advisors';
			optionActiveIcons = 'Change the resources icons';
			titlePeriods = 'Periods configuration';
			optionHelp = 'Help';
			optionDefaultConfiguration = 'Default configurations';
			configurationAll = 'Configuration: Dawn + Day + Dusk + Night';
			configurationDayNight = 'Configuration: Day + Night';
			configurationDay = 'Configuration: Day';
			optionDawn = 'Dawn';
			optionDay = 'Day';
			optionDusk = 'Dusk';
			optionNight = 'Night';
			periodStart =  '00h to';
			periodEnd =  '59h';
			titleAddOption = 'Additional options';
			optionMessagePerPage = 'Number of message per page';
			buttonSave = 'Save settings !';
			optionActiveCompletCityName = 'See complet name of cities';
		}
		
		document.getElementById('ikartOptions').innerHTML = '<form name="formikart"><h3 class="header"><span class="textLabel">'+titleOptions+'</span></h3><div class="content"><div><table><tr><th>'+optionSite+' :</th><td><a href="http://legion-alpha-chile.foroactivo.org/" target="_blank">'+siteAccess+'</a></td></tr><tr><th>'+optionVersion+' :</th><td id="ikart_version">'+currentVersion+'</td></tr><tr id="langid"><th>'+optionLangage+' :</th><td><input type="radio" id="lang1" class="box text" name="lang" value="fr" '+iLang1+' />&nbsp;<label for="lang1" class="text"><img src="http://img135.imageshack.us/img135/681/83133454.png" title="Chileno xD" /></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" id="lang2" class="box text" name="lang" value="org" '+iLang2+' />&nbsp;<label for="lang2" class="text" ><img src="'+dirPath+'/options/ORG.png" title="Org" /></label></td></tr></table></div><div><h3>'+titleTheme+'</h3><table><tr id="repid"><th>'+optionTheme+' :</th><td><input type="radio" id="rep1" class="box text" name="rep" value="wonder" '+iRep1+' />&nbsp;<label for="rep1" class="text">Normal</label>&nbsp;&nbsp;&nbsp;<input type="radio" class="box text" id="rep2" name="rep" value="snow" '+iRep2+' />&nbsp;<label for="rep2" class="text">Nieve</label>&nbsp;&nbsp;&nbsp;<input type="radio" class="box text disabled" id="rep3" name="rep" value="halloween" '+iRep3+' disabled="disabled" />&nbsp;<label for="rep3" class="text disabled">Halloween</label></td></tr><tr><th>'+optionLogo+' :</th><td><input id="ikartSign" type="text" size="38" value="'+reportInboxLeftSign+'" /><br /><b>'+logoGallery+' :</b> <a onclick="document.getElementById(\'ikartSign\').value=\''+dirimagen+'/img718/2887/94500074.png\';">L-A</a> - <a onclick="document.getElementById(\'ikartSign\').value=\''+dirPath+'/logo/city.png\';">'+galleryCity+'</a> - <a onclick="document.getElementById(\'ikartSign\').value=\''+dirPath+'/logo/advisors.png\';">'+galleryAdvisors+'</a> - <a onclick="document.getElementById(\'ikartSign\').value=\'skin/research/area_economy.jpg\';">'+galleryDefault+'</a></td></tr><tr><th>'+optionStretchView+' :</th><td><input type="checkbox" '+iAlong+' id="ikart_allonger" class="box img" />&nbsp;<label for="ikart_allonger" class="img"><img src="'+dirPath+'/options/along.png" /></label></td></tr><tr><th>'+optionReverseWine+' :</th><td><input type="checkbox"'+iInvert+' id="ikart_invertion" class="box img" />&nbsp;<label for="ikart_invertion" class="img"><img src="'+dirPath+'/options/invert.png" /></label></td></tr><tr><th>'+optionActiveAdvisors+' :</th><td><input type="checkbox"'+iActiveAdvisor+' id="ikart_active_advisor" class="box img" />&nbsp;<label for="ikart_active_advisor" class="img"><img src="'+dirPath+'/options/activeAdvisor.png" /></label></td></tr><tr><th>'+optionActiveIcons+' :</th><td><input type="checkbox"'+iActiveIcon+' id="ikart_active_icon" class="box img" />&nbsp;<label for="ikart_active_icon" class="img"><img src="'+dirPath+'/options/activeIcon.png" /></label></td></tr><tr><th>'+optionActiveCompletCityName+' :</th><td><input type="checkbox"'+iActiveCompletCityName+' id="ikart_active_completCityName" class="box img" />&nbsp;<label for="ikart_active_completCityName" class="img"><img src="'+dirPath+'/options/completCityName.png" /></label></td></tr></table></div><div><h3>'+titlePeriods+'</h3><table><tr><th><b>'+optionHelp+' :</b></th><td><ul id="parentAideOption"><img src="'+dirPath+'/options/iconInfo.png"" /><div id="aideOption">'+iHelp+'</div></ul></td></tr><tr><th><b>'+optionDefaultConfiguration+' :</b></th><td><img src="'+dirPath+'/options/all.png" onclick=\'document.getElementById("nuit1").value="21";document.getElementById("nuit2").value="6";document.getElementById("aube1").value="7";document.getElementById("aube2").value="8";document.getElementById("jour1").value="9";document.getElementById("jour2").value="18";document.getElementById("crepuscule1").value="19";document.getElementById("crepuscule2").value="20";\' title="'+configurationAll+'" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="'+dirPath+'/options/jour_nuit.png" onclick=\'document.getElementById("nuit1").value="20";document.getElementById("nuit2").value="7";document.getElementById("aube1").value="-1";document.getElementById("aube2").value="-1";document.getElementById("jour1").value="8";document.getElementById("jour2").value="19";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule2").value="-1";\' title="'+configurationDayNight+'" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="'+dirPath+'/options/jour.png" onclick=\'document.getElementById("nuit1").value="-1";document.getElementById("nuit2").value="-1";document.getElementById("aube1").value="-1";document.getElementById("aube2").value="-1";document.getElementById("jour1").value="0";document.getElementById("jour2").value="23";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule2").value="-1";\' title="'+configurationDay+'" style="cursor: pointer;" /></td></tr><tr><th><b>'+optionDawn+' :</b></th><td><input type="text" id="aube1" style="width:20px;" value="'+H_aube1+'" />'+periodStart+' <input type="text" id="aube2" style="width:20px;" value="'+H_aube2+'" />'+periodEnd+'<span id="ikartError2"></span></td></tr><tr><th><b>'+optionDay+' :</b></th><td><input type="text" id="jour1" style="width:20px;" value="'+H_jour1+'" />'+periodStart+' <input type="text" id="jour2" style="width:20px;" value="'+H_jour2+'" />'+periodEnd+'<span id="ikartError3"></span></td></tr><tr><th><b>'+optionDusk+' :</b></th><td><input type="text" id="crepuscule1" style="width:20px;" value="'+H_crepuscule1+'" />'+periodStart+' <input type="text" id="crepuscule2" style="width:20px;" value="'+H_crepuscule2+'" />'+periodEnd+'<span id="ikartError4"></span></td></tr><tr><th><b>'+optionNight+' :</b></th><td><input type="text" id="nuit1" style="width:20px;" value="'+H_nuit1+'" />'+periodStart+' <input type="text" id="nuit2" style="width:20px;" value="'+H_nuit2+'" />'+periodEnd+'<span id="ikartError1"></span></td></tr></table></div><div><h3>'+titleAddOption+'</h3><table><tr><th><b>'+optionMessagePerPage+' :</b></th><td><input type="text" id="message_per_page" style="width:40px;" value="'+messagePerPage+'" /><span id="ikartError5"></span></td></tr></table></div><div class="centerButton"><input onclick=\'for(i = 0; i <= document.getElementById("repid").getElementsByTagName("input").length-1; i++) {if(document.formikart.rep[i].checked) {iRep = document.formikart.rep[i].value;}} for(j = 0; j <= document.getElementById("langid").getElementsByTagName("input").length-1; j++) {if(document.formikart.lang[j].checked) {iLang = document.formikart.lang[j].value;}} if(ikartsvg(document.getElementById("ikart_allonger").checked, document.getElementById("ikart_invertion").checked, document.getElementById("ikart_active_advisor").checked, document.getElementById("ikart_active_icon").checked, document.getElementById("ikart_active_completCityName").checked, document.getElementById("nuit1").value, document.getElementById("nuit2").value, document.getElementById("aube1").value,document.getElementById("aube2").value, document.getElementById("jour1").value, document.getElementById("jour2").value, document.getElementById("crepuscule1").value, document.getElementById("crepuscule2").value, document.getElementById("ikartSign").value, iRep, iLang, document.getElementById("message_per_page").value)) {if(iLang == "fr") {alert("Configuracion guardada !!! Por favor espere a que se termine de actualizar la pagina.");} else if(iLang == "org") {alert("Saved options !");} location.reload();}\' class="button" value="'+buttonSave+'" type="button" /></div></div><div class="footer"></div></div></form>';
		
		// On vérifie la mise à jour
		GM_xmlhttpRequest({
			method	:'GET',
			url		: lastVersionUrl,
			onload	: function(responseDetails) {
				var lastVersion = responseDetails.responseText;
				if(currentVersion.replace('.', '') < lastVersion.replace('.', '')) {
					var parentMaj = document.getElementById('ikart_version');
					if(langage == 'fr') {
						parentMaj.innerHTML = currentVersion+' - <span style="color: #ff0000; font-weight: bold;">Version '+lastVersion+' disponible.</span>';
					}
					else if(langage == 'org') {
						parentMaj.innerHTML = currentVersion+' - <span style="color: #ff0000; font-weight: bold;">Version '+lastVersion+' available.</span>';
					}
				}
			}
		});
		
		// Fonction de sauvegarde des options
		unsafeWindow.ikartsvg = function (allongerIsCheck, invertionIsCheck, activeAdvisorIsCheck, activeIconIsCheck, completCityNameIsCheck, nuit1, nuit2, aube1, aube2, jour1, jour2, crepuscule1, crepuscule2, logo, iRep, iLang, messagePerPage) {
			
			// On vérifie toutes les erreurs possible et on les indique
			var erreur = false;
			
			var erreurNuit = false;
			var erreurJour = false;
			var erreurAube = false;
			var erreurCrepuscule = false;
			var erreurMessagePerPage = false;
			
			var erreurNuit1 = '';
			var erreurAube1 = '';
			var erreurJour1 = '';
			var erreurCrepuscule1 = '';
			
			var erreurNuitCrepuscule = '';
			var erreurCrepusculeJour = '';
			var erreurJourAube = '';
			var erreurAubeNuit = '';
			
			var erreurNuitJour = '';
			var erreurJourNuit = '';
			
			var erreurNuit2 = '';
			var erreurAube2 = '';
			var erreurJour2 = '';
			var erreurCrepuscule2 = '';
			
			var erreurNuit3 = '';
			var erreurAube3 = '';
			var erreurJour3 = '';
			var erreurCrepuscule3 = '';
			
			var erreurNuitAube3 = '';
			var erreurNuitCrepuscule3 = '';
			var erreurAubeCrepuscule3 = '';
			var erreurCrepusculeAube3 = '';
			
			// Si on utilise toutes les périodes
			if(parseInt(nuit1) != -1 && parseInt(nuit2) != -1 && parseInt(aube1) != -1 && parseInt(aube2) != -1 && parseInt(jour1) != -1 && parseInt(jour2) != -1 && parseInt(crepuscule1) != -1 && parseInt(crepuscule2) != -1) {
				// Si plusieurs périodes ce recoupes
				if((parseInt(nuit1) > parseInt(nuit2) && parseInt(aube1) > parseInt(aube2)) || (parseInt(nuit1) > parseInt(nuit2) && parseInt(jour1) > parseInt(jour2)) || (parseInt(nuit1) > parseInt(nuit2) && parseInt(crepuscule1) > parseInt(crepuscule2))) {
					erreur = true; erreurNuit = true; if(langage == 'fr') {erreurNuit1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurNuit1 = 'A part of this time slot is already used, ';}
					if(parseInt(aube1) > parseInt(aube2)) {erreurAube = true; if(langage == 'fr') {erreurAube1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurAube1 = 'A part of this time slot is already used, ';}}
					if(parseInt(jour1) > parseInt(jour2)) {erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurJour1 = 'A part of this time slot is already used, ';}}
					if(parseInt(crepuscule1) > parseInt(crepuscule2)) {erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurCrepuscule1 = 'A part of this time slot is already used, ';}}
				}
				if((parseInt(aube1) > parseInt(aube2) && parseInt(nuit1) > parseInt(nuit2)) || (parseInt(aube1) > parseInt(aube2) && parseInt(jour1) > parseInt(jour2)) || (parseInt(aube1) > parseInt(aube2) && parseInt(crepuscule1) > parseInt(crepuscule2))) {
					erreur = true; erreurAube = true; if(langage == 'fr') {erreurAube1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurAube1 = 'A part of this time slot is already used, ';}
					if(parseInt(nuit1) > parseInt(nuit2)) {erreurNuit = true; if(langage == 'fr') {erreurNuit1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurNuit1 = 'A part of this time slot is already used, ';}}
					if(parseInt(jour1) > parseInt(jour2)) {erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurJour1 = 'A part of this time slot is already used, ';}}
					if(parseInt(crepuscule1) > parseInt(crepuscule2)) {erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurCrepuscule1 = 'A part of this time slot is already used, ';}}
				}
				if((parseInt(jour1) > parseInt(jour2) && parseInt(aube1) > parseInt(aube2)) || (parseInt(jour1) > parseInt(jour2) && parseInt(nuit1) > parseInt(nuit2)) || (parseInt(jour1) > parseInt(jour2) && parseInt(crepuscule1) > parseInt(crepuscule2))) {
					erreur = true; erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurJour1 = 'A part of this time slot is already used, ';}
					if(parseInt(aube1) > parseInt(aube2)) {erreurAube = true; if(langage == 'fr') {erreurAube1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurAube1 = 'A part of this time slot is already used, ';}}
					if(parseInt(nuit1) > parseInt(nuit2)) {erreurNuit = true; if(langage == 'fr') {erreurNuit1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurNuit1 = 'A part of this time slot is already used, ';}}
					if(parseInt(crepuscule1) > parseInt(crepuscule2)) {erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurCrepuscule1 = 'A part of this time slot is already used, ';}}
				}
				if((parseInt(crepuscule1) > parseInt(crepuscule2) && parseInt(aube1) > parseInt(aube2)) || (parseInt(crepuscule1) > parseInt(crepuscule2) && parseInt(jour1) > parseInt(jour2)) || (parseInt(crepuscule1) > parseInt(crepuscule2) && parseInt(nuit1) > parseInt(nuit2))) {
					erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurCrepuscule1 = 'A part of this time slot is already used, ';}
					if(parseInt(aube1) > parseInt(aube2)) {erreurAube = true; if(langage == 'fr') {erreurAube1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurAube1 = 'A part of this time slot is already used, ';}}
					if(parseInt(jour1) > parseInt(jour2)) {erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurJour1 = 'A part of this time slot is already used, ';}}
					if(parseInt(nuit1) > parseInt(nuit2)) {erreurNuit = true; if(langage == 'fr') {erreurNuit1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurNuit1 = 'A part of this time slot is already used, ';}}
				}
								
				// Si les périodes ne se suivent pas
				if(parseInt(nuit1) - parseInt(crepuscule2) != 1 && parseInt(nuit1) - parseInt(crepuscule2) != -23) {erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurNuitCrepuscule = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle de la nuit, ';} if(langage == 'org') {erreurNuitCrepuscule = 'The time slot of this period don\'t correspond with the night, ';}}
				if(parseInt(crepuscule1) - parseInt(jour2) != 1 && parseInt(crepuscule1) - parseInt(jour2) != -23) {erreur = true; erreurJour = true; if(langage == 'fr') {erreurCrepusculeJour = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle du cr&eacute;puscule, ';} if(langage == 'org') {erreurCrepusculeJour = 'The time slot of this period don\'t correspond with the dusk, ';}}
				if(parseInt(jour1) - parseInt(aube2) != 1 && parseInt(jour1) - parseInt(aube2) != -23) {erreur = true; erreurAube = true; if(langage == 'fr') {erreurJourAube = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle du jour, ';} if(langage == 'org') {erreurJourAube = 'The time slot of this period don\'t correspond with the day, ';}}
				if(parseInt(aube1) - parseInt(nuit2) != 1 && parseInt(aube1) - parseInt(nuit2) != -23) {erreur = true; erreurNuit = true; if(langage == 'fr') {erreurAubeNuit = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle de l\'aube, ';} if(langage == 'org') {erreurAubeNuit = 'The time slot of this period don\'t correspond with the dawn, ';}}
			}
			
			// Si on utilise que le jour et la nuit
			else if(parseInt(nuit1) != -1 && parseInt(nuit2) != -1 && parseInt(aube1) == -1 && parseInt(aube2) == -1 && parseInt(jour1) != -1 && parseInt(jour2) != -1 && parseInt(crepuscule1) == -1 && parseInt(crepuscule2) == -1) {
				// Si plusieurs périodes ce recoupes
				if(parseInt(nuit1) > parseInt(nuit2) && parseInt(jour1) > parseInt(jour2)) {
					erreur = true; erreurNuit = true; if(langage == 'fr') {erreurNuit1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurNuit1 = 'A part of this time slot is already used, ';}
					erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Une partie de cette plage horaire est d&eacute;j&agrave; utilis&eacute;e, ';} if(langage == 'org') {erreurJour1 = 'A part of this time slot is already used, ';}
				}
				
				// Si les périodes ne se suivent pas
				if(parseInt(nuit1) - parseInt(jour2) != 1 && parseInt(nuit1) - parseInt(jour2) != -23) {erreur = true; erreurJour = true; if(langage == 'fr') {erreurNuitJour = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle de la nuit, ';} if(langage == 'org') {erreurNuitJour = 'The time slot of this period don\'t correspond with the night, ';}}
				if(parseInt(jour1) - parseInt(nuit2) != 1 && parseInt(jour1) - parseInt(nuit2) != -23) {erreur = true; erreurNuit = true; if(langage == 'fr') {erreurJourNuit = 'La plage horaire de cette p&eacute;riode ne correspond pas avec celle du jour, ';} if(langage == 'org') {erreurJourNuit = 'The time slot of this period don\'t correspond with the day, ';}}
			}
			
			// Si on utilise que le jour
			else if(parseInt(nuit1) == -1 && parseInt(nuit2) == -1 && parseInt(aube1) == -1 && parseInt(aube2) == -1 && parseInt(jour1) != -1 && parseInt(jour2) != -1 && parseInt(crepuscule1) == -1 && parseInt(crepuscule2) == -1) {
				// Si les cases de la période sont différentes de 0 à 23h
				if(parseInt(jour1) != 0 || parseInt(jour2) != 23) {erreur = true; erreurJour = true; if(langage == 'fr') {erreurJour1 = 'Pour avoir uniquement le jour d\'activ&eacute;, il faut que le premier champ contienne la valeur 0 et le second la valeur 23, ';} if(langage == 'org') {erreurJour1 = 'To get only the day, the first box must contain the value 0 and the second box the value 23, ';}}
			}
			
			// Si un champs est égal à -1 et l'autre non
			if(parseInt(nuit1) == -1 && parseInt(nuit2) != -1 || parseInt(nuit1) != -1 && parseInt(nuit2) == -1) {erreur = true; erreurNuit = true; if(langage == 'fr') {erreurNuit2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreurNuit2 = 'Only one box contain the value -1, ';}}
			if(parseInt(aube1) == -1 && parseInt(aube2) != -1 || parseInt(aube1) != -1 && parseInt(aube2) == -1) {erreur = true; erreurAube = true; if(langage == 'fr') {erreurAube2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreurAube2 = 'Only one box contain the value -1, ';}}
			if(parseInt(jour1) == -1 || parseInt(jour2) == -1) {erreur = true; erreurJour = true; if(langage == 'fr') {erreurJour2 = 'Vous ne pouvez pas mettre la valeur -1 pour la p&eacute;riode de journ&eacute;e, ';} if(langage == 'org') {erreurJour2 = 'You can\'t put the value -1 for the day period, ';}}
			if(parseInt(crepuscule1) == -1 && parseInt(crepuscule2) != -1 || parseInt(crepuscule1) != -1 && parseInt(crepuscule2) == -1) {erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreur = true; erreurCrepuscule2 = 'Only one box contain the value -1, ';}}
			
			// Si la nuit est désactivé et que l'aube ou le crépuscule ne l'est pas
			if(parseInt(nuit1) == -1 && parseInt(nuit2) == -1) {
				if(parseInt(aube1) != -1 && parseInt(aube2) != -1) {erreur = true; erreurAube = true; if(langage == 'fr') {erreurNuitAube3 = 'Pour d&eacute;sactiver la nuit il faut aussi d&eacute;sactiver l\'aube, ';} if(langage == 'org') {erreurNuitAube3 = 'To remove the night you must remove the dawn, ';}}
				if(parseInt(crepuscule1) != -1 && parseInt(crepuscule2) != -1) {erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurNuitCrepuscule3 = 'Pour d&eacute;sactiver la nuit il faut aussi d&eacute;sactiver le cr&eacute;puscule, ';} if(langage == 'org') {erreurNuitCrepuscule3 = 'To remove the night you must remove the dusk, ';}}
			}
			
			// Si l'aube est désactivé et que le crépuscule ne l'est pas ou si le crépuscule est activé et que l'aube ne l'est pas
			if(parseInt(aube1) == -1 && parseInt(aube2) == -1 && parseInt(crepuscule1) != -1 && parseInt(crepuscule2) != -1) {erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurAubeCrepuscule3 = 'Pour d&eacute;sactiver l\'aube il faut aussi d&eacute;sactiver le cr&eacute;puscule, ';} if(langage == 'org') {erreurAubeCrepuscule3 = 'To remove the dawn you must remove the dusk, ';}}
			if(parseInt(crepuscule1) == -1 && parseInt(crepuscule2) == -1 && parseInt(aube1) != -1 && parseInt(aube2) != -1) {erreur = true; erreurAube = true; if(langage == 'fr') {erreurCrepusculeAube3 = 'Pour d&eacute;sactiver le cr&eacute;puscule il faut aussi d&eacute;sactiver l\'aube, ';} if(langage == 'org') {erreurCrepusculeAube3 = 'To remove the dusk you must remove the dawn, ';}}
			
			// Si une valeur n'est pas correcte
			if(parseInt(aube1) < -1 || parseInt(aube2) < -1 || parseInt(aube1) > 23 || parseInt(aube2) > 23 || parseInt(aube1) != aube1 || parseInt(aube2) != aube2) {erreur = true; erreurAube = true; if(langage == 'fr') {erreurAube3 = 'Une des valeurs entrés n\'est pas un entier compris entre 0 et 23 ni égale à -1, ';} if(langage == 'org') {erreurAube3 = 'One of the entered values isn\'t an integer included between 0 and 23 nor equal to -1, ';}}
			if(parseInt(jour1) < -1 || parseInt(jour2) < -1 || parseInt(jour1) > 23 || parseInt(jour2) > 23 || parseInt(jour1) != jour1 || parseInt(jour2) != jour2) {erreur = true; erreurJour = true; if(langage == 'fr') {erreurJour3 = 'Une des valeurs entrés n\'est pas un entier compris entre 0 et 23 ni égale à -1, ';} if(langage == 'org') {erreurJour3 = 'One of the entered values isn\'t an integer included between 0 and 23 nor equal to -1, ';}}
			if(parseInt(crepuscule1) < -1 || parseInt(crepuscule2) < -1 || parseInt(crepuscule1) > 23 || parseInt(crepuscule2) > 23 || parseInt(crepuscule1) != crepuscule1 || parseInt(crepuscule2) != crepuscule2) {erreur = true; erreurCrepuscule = true; if(langage == 'fr') {erreurCrepuscule3 = 'Une des valeurs entrés n\'est pas un entier compris entre 0 et 23 ni égale à -1, ';} if(langage == 'org') {erreurCrepuscule3 = 'One of the entered values isn\'t an integer included between 0 and 23 nor equal to -1, ';}}
			if(parseInt(nuit1) < -1 || parseInt(nuit2) < -1 || parseInt(nuit1) > 23 || parseInt(nuit2) > 23 || parseInt(nuit1) != nuit1 || parseInt(nuit2) != nuit2) {erreur = true; erreurNuit = true; if(langage == 'fr') {erreurNuit3 = 'Une des valeurs entrés n\'est pas un entier compris entre 0 et 23 ni égale à -1, ';} if(langage == 'org') {erreurNuit3 = 'One of the entered values isn\'t an integer included between 0 and 23 nor equal to -1, ';}}
			
			// Si les valeurs des options suplémentaire ne sont pas correcte
			if(parseInt(messagePerPage) != messagePerPage || messagePerPage < 1) {erreurMessagePerPage = true; erreur = true;}
			
			// On retourne les erreurs trouvées
			if(erreur == true) {
				if(erreurNuit == true) {document.getElementById('ikartError1').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">'+erreurAubeNuit+erreurJourNuit+erreurNuit1+erreurNuit2+erreurNuit3+'</span></div>';} else {document.getElementById('ikartError1').innerHTML = '';}
				if(erreurAube == true) {document.getElementById('ikartError2').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">'+erreurJourAube+erreurAube1+erreurAube2+erreurAube3+erreurNuitAube3+erreurCrepusculeAube3+'</span></div>';} else {document.getElementById('ikartError2').innerHTML = '';}
				if(erreurJour == true) {document.getElementById('ikartError3').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">'+erreurCrepusculeJour+erreurNuitJour+erreurJour1+erreurJour2+erreurJour3+'</span></div>';} else {document.getElementById('ikartError3').innerHTML = '';}
				if(erreurCrepuscule == true) {document.getElementById('ikartError4').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">'+erreurNuitCrepuscule+erreurCrepuscule1+erreurCrepuscule2+erreurCrepuscule3+erreurNuitCrepuscule3+erreurAubeCrepuscule3+'</span></div>';} else {document.getElementById('ikartError4').innerHTML = '';}
				if(erreurMessagePerPage == true) {if(langage == 'fr') {document.getElementById('ikartError5').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">La valeur entrée n\'est pas un nombre entier supérieur à 0, </span></div>';} if(langage == 'org') {document.getElementById('ikartError5').innerHTML = '<div class="ikartError"><span class="indent"></span><span class="boxError">The entered value is not an integer upper to 0, </span></div>';}}
				
				return false;
			}
			else {
				// Si la case allonger est coché
				if(allongerIsCheck) {allongerIsCheck = true;}
				else {allongerIsCheck = false;}
				
				// Si la case invertion est coché
				if(invertionIsCheck) {invertionIsCheck = true;}
				else {invertionIsCheck = false;}
				
				// Si la case d'activation des conseillers spéciaux est coché
				if(activeAdvisorIsCheck) {activeAdvisorIsCheck = true;}
				else {activeAdvisorIsCheck = false;}
				
				// Si la case d'activation des icônes de ressources est coché
				if(activeIconIsCheck) {activeIconIsCheck = true;}
				else {activeIconIsCheck = false;}
				
				// Si la case d'activation des noms de villes complets est coché
				if(completCityNameIsCheck) {completCityNameIsCheck = true;}
				else {completCityNameIsCheck = false;}
				
				// On enregistre
				window.setTimeout(function() {
					GM_setValue('allonger', allongerIsCheck);
					GM_setValue('invertion', invertionIsCheck);
					GM_setValue('activeSpecialAdvisor', activeAdvisorIsCheck);
					GM_setValue('activeResourceIcon', activeIconIsCheck);
					GM_setValue('completCityName', completCityNameIsCheck);
					GM_setValue('nuit1', parseInt(nuit1));
					GM_setValue('nuit2', parseInt(nuit2));
					GM_setValue('aube1', parseInt(aube1));
					GM_setValue('aube2', parseInt(aube2));
					GM_setValue('jour1', parseInt(jour1));
					GM_setValue('jour2', parseInt(jour2));
					GM_setValue('crepuscule1', parseInt(crepuscule1));
					GM_setValue('crepuscule2', parseInt(crepuscule2));
					GM_setValue('logo', logo);
					GM_setValue('repertoire', iRep);
					GM_setValue('langage', iLang);
					GM_setValue('messagePerPage', parseInt(messagePerPage));
				}, 0);
				
				return true;
			}
		}
	}
}




// -------------------------------------------------------
// --------------- Debut de la stylisation ---------------
// -------------------------------------------------------



// -------- Ajouts Generals --------
//
// --- Agrandissement vers le bas ---
if(allonger == true){
STYLE('#city #container #mainview {				height: 777px; background-repeat: no-repeat; }');
STYLE('#city #container #mainview #locations {	overflow: visible; }');
STYLE('#city #container #mainview {				overflow: hidden; }');
}

if(activeResourceIcon == true) {
// --- Icones Ressources Monde ---
STYLE('#worldmap_iso #worldmap .tradegood1 {	background-image: url('+dirPath+'/icon/wine_v1.png);	width: 25px; height: 25px; bottom: 100px; left: 50px; }');
STYLE('#worldmap_iso #worldmap .tradegood2 {	background-image: url('+dirPath+'/icon/marble_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood3 {	background-image: url('+dirPath+'/icon/glass_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood4 {	background-image: url('+dirPath+'/icon/sulfur_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood5 {	background-image: url('+dirPath+'/icon/wood_v1.png);	width: 25px; height: 25px; }');

// --- Icones Ressources Layout ---
STYLE('#container ul.resources .wine {		background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('#container ul.resources .marble {	background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('#container ul.resources .glass {		background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('#container ul.resources .sulfur {	background-image: url('+dirPath+'/icon/sulfur.png); }');
STYLE('#container ul.resources .wood {		background-image: url('+dirPath+'/icon/wood.png); }');

// --- Icones Ressources Menu Déroulant des Ville ---
STYLE('#cityNav .citySelect .tradegood1 span.cityresource {	background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('#cityNav .citySelect .tradegood2 span.cityresource {	background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('#cityNav .citySelect .tradegood3 span.cityresource {	background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('#cityNav .citySelect .tradegood4 span.cityresource {	background-image: url('+dirPath+'/icon/sulfur.png); }');

// --- Icones Ressources Transport ---
STYLE('#container .resourceAssign li.wine {		background-image: url('+dirPath+'/icon/wine_v1.png); }');
STYLE('#container .resourceAssign li.marble {	background-image: url('+dirPath+'/icon/marble_v1.png); }');
STYLE('#container .resourceAssign li.glass {	background-image: url('+dirPath+'/icon/glass_v1.png); }');
STYLE('#container .resourceAssign li.sulfur {	background-image: url('+dirPath+'/icon/sulfur_v1.png); }');
STYLE('#container .resourceAssign li.wood {		background-image: url('+dirPath+'/icon/wood_v1.png); }');

// --- Icones Ressources Port ---
STYLE('#port #container #mainview .contentBox01h .content ul.cities .cityBox .wine {		background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('#port #container #mainview .contentBox01h .content ul.cities .cityBox .marble {		background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('#port #container #mainview .contentBox01h .content ul.cities .cityBox .crystal {		background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('#port #container #mainview .contentBox01h .content ul.cities .cityBox .sulfur {		background-image: url('+dirPath+'/icon/sulfur.png); }');
STYLE('#port #container #mainview .contentBox01h .content ul.cities .cityBox .ressource {	background-image: url('+dirPath+'/icon/wood.png); }');

// --- Icones Ressources Trajet commerciaux du Bourgmestre ---
STYLE('html .dropdown .tradegood1 span.cityresource {	background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('html .dropdown .tradegood2 span.cityresource {	background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('html .dropdown .tradegood3 span.cityresource {	background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('html .dropdown .tradegood4 span.cityresource {	background-image: url('+dirPath+'/icon/sulfur.png); }');
STYLE('html .dropdown .resource span.cityresource {		background-image: url('+dirPath+'/icon/wood.png); }');

// --- Icones Ressources menu déroulant de l'instalation d'une colonie ---
STYLE('.citySpecialSelect .tradegood1 span.cityresource {	background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('.citySpecialSelect .tradegood2 span.cityresource {	background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('.citySpecialSelect .tradegood3 span.cityresource {	background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('.citySpecialSelect .tradegood4 span.cityresource {	background-image: url('+dirPath+'/icon/sulfur.png); }');
STYLE('.citySpecialSelect .resource span.cityresource {		background-image: url('+dirPath+'/icon/wood.png); }');

// --- Icones Ressources Caserne et Chantier Naval ---
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wine {		background-image: url('+dirPath+'/icon/wine.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.marble {	background-image: url('+dirPath+'/icon/marble.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.crystal {	background-image: url('+dirPath+'/icon/glass.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.sulfur {	background-image: url('+dirPath+'/icon/sulfur.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wood {		background-image: url('+dirPath+'/icon/wood.png); }');

STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wine_inactive {	background-image: url('+dirPath+'/icon/wine_inactive.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.marble_inactive {	background-image: url('+dirPath+'/icon/marble_inactive.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.crystal_inactive {	background-image: url('+dirPath+'/icon/glass_inactive.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.sulfur_inactive {	background-image: url('+dirPath+'/icon/sulfur_inactive.png); }');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wood_inactive {	background-image: url('+dirPath+'/icon/wood_inactive.png); }');

// --- Menu ressources ville disabled ---
STYLE('#container #cityResources .resources .wine.disabled {	background-image: url('+dirPath+'/icon/wine_disabled.png); }');
STYLE('#container #cityResources .resources .marble.disabled {	background-image: url('+dirPath+'/icon/marble_disabled.png); }');
STYLE('#container #cityResources .resources .glass.disabled {	background-image: url('+dirPath+'/icon/glass_disabled.png); }');
STYLE('#container #cityResources .resources .sulfur.disabled {	background-image: url('+dirPath+'/icon/sulfur_disabled.png); }');
STYLE('#container #cityResources .resources .wood.disabled {	background-image: url('+dirPath+'/icon/wood_disabled.png); }');
}
else {
// --- Menu ressources ville originale disabled ---
STYLE('#container #cityResources .resources .wine.disabled {	background-image: url('+dirPath+'/icon/wine_original_disabled.gif); }');
STYLE('#container #cityResources .resources .marble.disabled {	background-image: url('+dirPath+'/icon/marble_original_disabled.gif); }');
STYLE('#container #cityResources .resources .glass.disabled {	background-image: url('+dirPath+'/icon/glass_original_disabled.gif); }');
STYLE('#container #cityResources .resources .sulfur.disabled {	background-image: url('+dirPath+'/icon/sulfur_original_disabled.gif); }');
STYLE('#container #cityResources .resources .wood.disabled {	background-image: url('+dirPath+'/icon/wood_original_disabled.gif); }');
}

// --- Changement image Cave et Pressoir (Page interne) ---
if(invertion == true){
STYLE('#vineyard #container #mainview #reductionBuilding .buildingDescription {						background-image: url('+dirPath+'/bug/cave.gif); }');
STYLE('#vineyard #container #mainview #reductionBuilding .contentBox01h .buildingPictureImg {		background-image: url('+dirPath+'/bug/cave_icone.gif); }');
STYLE('#vineyard #container #mainview #reductionBuilding .contentBox01h .buildingPictureImg img {	visibility: hidden; }');

STYLE('#winegrower #container #mainview #bonusBuilding .buildingDescription {						background-image: url('+dirPath+'/bug/presse.gif); }');
STYLE('#winegrower #container #mainview #bonusBuilding .contentBox01h .buildingPictureImg {			background-image: url('+dirPath+'/bug/presse_icone.gif); }');
STYLE('#winegrower #container #mainview #bonusBuilding .contentBox01h .buildingPictureImg img {		visibility: hidden; }');
}

// --- Correction divers bug direct du jeu ---
STYLE('#city #container #mainview #locations .port {					z-index: 302; position: absolute; }');
STYLE('#city #container #mainview #locations #position0 {				z-index: 351; position: absolute; }');
STYLE('#island #container #mainview #islandfeatures #wonder {			z-index: 501; }');
STYLE('#city #container #mainview #locations #position9 {				left: 222px; top: 185px; }');
STYLE('#city #container #mainview #locations .occupier1 {				z-index: 352; }');
STYLE('#city #container #mainview #locations .occupier2 {				z-index: 352; }');
STYLE('#island .island1 #cities #cityLocation4 .fleetAction {			bottom: 46px; left: 71px; }');
STYLE('#advisors a.plusteaser {											width: 20px; height: 20px; }');
STYLE('#buildings_demolition #backTo .backToBuildingImg {				width: auto; height: auto; }');
STYLE('#militaryAdvisorReportView #troopsReport ul.resources li {		display: block; float: left; width: auto; margin-right: 8px; }');
STYLE('#militaryAdvisorReportView #troopsReport ul.resources {			clear: left; height: 26px; }');
STYLE('#tradeAdvisor #mainview #inboxCity td.subject ul.resources li {	display: block; float: left; width: auto; margin-right: 8px; padding-bottom: 0; }');
STYLE('#tradeAdvisor #mainview #inboxCity td.subject ul.resources {		clear: left; height: 26px; }');
STYLE('.winterActivationButton, .winterDeactivationButton {				display: none; }');
STYLE('.winterInfoButton {												display: none; }');
STYLE('.easterActivationButton, .easterDeactivationButton {				display: none; }');
STYLE('.easterInfoButton {												display: none; }');

// --- Bouton facebook ---
STYLE('#container #facebook_button a {			background: transparent url('+dirPath+'/bug/btn_facebook.png) no-repeat 0 0; width: 42px; height: 70px; }');
STYLE('#container #facebook_button a:hover {	background: transparent url('+dirPath+'/bug/btn_facebook.png) no-repeat 0 -70px; }');
STYLE('#container #facebook_button a.down {		background: transparent url('+dirPath+'/bug/btn_facebook.png) no-repeat 0 -140px; }');

// --- Bouton Ambrosia ---
STYLE('#globalResources .ambrosia a {		background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 0;}');
STYLE('#globalResources .ambrosia a:hover {	background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 -69px; }');
STYLE('#globalResources .ambrosia a.down {	background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 -138px; }');

STYLE('#globalResources .ambrosiaNoSpin a {			background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 0;}');
STYLE('#globalResources .ambrosiaNoSpin a:hover {	background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 -69px; }');
STYLE('#globalResources .ambrosiaNoSpin a.down {	background: transparent url('+dirPath+'/bug/btn_ambrosia.png) 0 -138px; }');

// --- Menu des ville ---
STYLE('#cityNav .citySelect * {						background-image: url('+dirPath+'/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .dropbutton {			background-position: 0 0; cursor: pointer; }');
STYLE('#cityNav .citySelect .dropbutton:hover {		background-position: 0 -24px; }');
STYLE('#cityNav .citySelect .dropbutton.dropbutton_expanded {	background-position: 0 -48px; cursor: default; }');

STYLE('#cityNav .citySelect .optionList li {			background-image: url('+dirPath+'/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li {			background-position: 0 -98px; }');
STYLE('#cityNav .citySelect .optionList li.first {		background-position: 0 -72px; }');
STYLE('#cityNav .citySelect .optionList li.last {		background-position: 0 -122px; }');
STYLE('#cityNav .citySelect .optionList li.first.last {	background-position: 0 -224px; line-height: 22px !important; }');

STYLE('#cityNav .citySelect .optionList li:hover {				background-position: 0 -174px !important; }');
STYLE('#cityNav .citySelect .optionList li.first:hover {		background-position: 0 -148px !important; }');
STYLE('#cityNav .citySelect .optionList li.last:hover {			background-position: 0 -198px !important; }');
STYLE('#cityNav .citySelect .optionList li.first.last:hover {	background-position: 0 -252px !important; }');

STYLE('#cityNav .citySelect .optionList li.deployedCities, #cityNav .citySelect .deployedCitiesa  {		background-image: url('+dirPath+'/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li.deployedCities {				background-position: 0 -306px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.first {		background-position: 0 -280px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.last {		background-position: 0 -330px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.first.last {	background-position: 0 -356px; }');

STYLE('#cityNav .citySelect .optionList li.occupiedCities, #cityNav .citySelect .occupiedCities  {		background-image: url('+dirPath+'/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities {				background-position: 0 -410px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.first {		background-position: 0 -384px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.last {		background-position: 0 -434px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.first.last {	background-position: 0 -460px; }');

// --- Mise en page des option ---
STYLE('#ikartOptions #parentAideOption {					position: relative; display: block; width: 28px; height: 24px; }');
STYLE('#ikartOptions #parentAideOption img {				position: relative; z-index: 60; cursor: help; }');
STYLE('#ikartOptions #aideOption {							z-index: 50; cursor: help; background-color: #f1d7Ad; border-color: #be8d53; border-style: double; border-width: 8px 3px 3px; color: #542c0f; display: none; font-size: 11px; top: -39px; left: -59px; padding: 4px 8px; position: absolute; overflow: hidden; width: 390px; }');
STYLE('#ikartOptions #aideOption:hover {					display: block; }');
STYLE('#ikartOptions #parentAideOption:hover #aideOption {	display: block; }');
STYLE('#ikartOptions .ikartError {							position: relative; display: block; padding-top: 10px; margin: 0 !important; }');
STYLE('#ikartOptions .ikartError .indent {					background-image: url('+dirPath+'/options/box_error_indent.png); width: 13px; height: 7px; position: absolute; top: 4px; left: 25px; }');
STYLE('#ikartOptions .ikartError .boxError {				color: #ff0000; display: block; border: 1px solid #ff0000; background: none #f9f9f9; padding: 2px 5px; }');
STYLE('#ikartOptions .box.text, #ikartOptions label.text {	cursor: pointer; height: 14px; line-height: 14px; vertical-align: top; }');
STYLE('#ikartOptions .box.img, #ikartOptions label.img {	cursor: pointer; height: 24px; line-height: 24px; vertical-align: top; }');
STYLE('#ikartOptions label.img img {						cursor: pointer; height: 24px; line-height: 24px; vertical-align: top; }');
STYLE('#ikartOptions a {									cursor: pointer; }');

STYLE('#options .yui-navset ul.yui-nav {					height: 72px; background-repeat: repeat-y; }');
STYLE('#options .yui-navset .yui-nav li#ikartOnglet {		margin-top: 4px; }');
STYLE('#options .yui-navset .yui-nav li {					width: 199px; margin: 0 0 0 19px; overflow: hidden; white-space: nowrap; }');
STYLE('#options .yui-navset .yui-nav li em {				width: 199px; }');
STYLE('#options .yui-navset .yui-nav .selected a, #options .yui-navset .yui-nav a:hover {	background-image: url('+dirPath+'/options/ongletSelected.jpg); }');

// --- Mise en page du menu de la liste d'amis ---
STYLE('#friends {												background: transparent url('+dirPath+'/divers/bg_friends.png) no-repeat left top scroll; height: 319px; }');
STYLE('#friends ul {											top: 47px; }');
STYLE('#friends #toggleShowFriends {							top: 291px; }');
STYLE('#friends #toggleCloseFriends {							position: absolute; left: 4px; top: 15px; display: block; width: 35px; height: 13px; }');
STYLE('#friends #toggleCloseFriends .toogleFriends {			cursor: pointer; background: transparent url('+dirPath+'/divers/btn_close_open.png) no-repeat left -26px scroll; display: block; width: 35px; height: 13px; }');
STYLE('#friends #toggleCloseFriends .toogleFriends:hover {		background-position: left -39px; }');
STYLE('#friends .pagedown {										top: 30px; }');
STYLE('#friends a.pagedown_deactivated {						display: none; }');
STYLE('#friends .pageup {										top: 30px; }');
STYLE('#friends a.pageup_deactivated {							display: none; }');

STYLE('#friends.closefriends {											background-position: left -319px; height: 43px; }');
STYLE('#friends.closefriends #toggleCloseFriends .toogleFriends {		background-position: left 0; }');
STYLE('#friends.closefriends #toggleCloseFriends .toogleFriends:hover {	background-position: left -13px; }');
STYLE('#friends.closefriends #toggleShowFriends {						display: none; }');
STYLE('#friends.closefriends .friends {									display: none; }');
STYLE('#friends.closefriends .pagedown {								display: none; }');
STYLE('#friends.closefriends .pageup {									display: none; }');

// --- Mise en page du bonusByIkArt ---
STYLE('#bonusByIkArt {							width: 1000px; position: absolute; text-align: center; top: 50px; z-index: 50; }');
STYLE('#bonusByIkArt #gameContent {				position: relative; -moz-box-shadow: 4px 8px 6px #0f0f0f; display: block; width: 800px; height: 631px; background: #eccf8e url("input/button.gif") repeat-x scroll 0 0; border-color: #c9a584 #5d4c2f #5d4c2f #c9a584; border-right: 3px double #5d4c2f; border-style: double; border-width: 3px; color: #542c0f; margin: 0 auto; }');
STYLE('#bonusByIkArt #gameContent .title {		font-weight: bold; line-height: 30px; font-size: 18px; text-shadow: 1px 1px 0 #feefaf; }');
STYLE('#bonusByIkArt #gameContent .close {		display: block; height: 18px; width: 18px; background-image: url(skin/layout/notes_close.gif); cursor: pointer; position: absolute; top: 6px; right: 6px; }');
STYLE('#bonusByIkArt #gameContent .game {		display: block; border-top: 1px solid #c9a584; }');



// -------- Layout --------
STYLE('#container #header {		background-image: url(http://img847.imageshack.us/img847/5659/bgheaderg.png); }');
STYLE('#container #footer {		background-image: url('+dirPath+'/'+repertoire+'/bg_footer.jpg); }');
STYLE('#militaryAdvisorDetailedReportView #container #container2 #header {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/layout/bg_header2.jpg); }');
STYLE('#militaryAdvisorDetailedReportView #container #container2 #footer {		background-image: url('+dirPath+'/'+repertoire+'/bg_footer2.jpg); }');
STYLE('#premiumPayment #header {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/layout/bg_header2.jpg); }');
STYLE('#premiumPayment #footer {		background-image: url('+dirPath+'/'+repertoire+'/bg_footer2.jpg); }');
STYLE('#extraDiv1 {		background-image: url(http://img594.imageshack.us/img594/3338/sky2q.png); }');
STYLE('#extraDiv2 {		background-image: url(http://img546.imageshack.us/img546/9272/bgocean.png); }');

// -------- Conseillés --------
if(activeSpecialAdvisor == true) { if(repertoire == 'snow' || repertoire == 'halloween' || repertoire == 'easter') {
STYLE('#advisors a {								height: 122px; }');
STYLE('#advisors #advCities {						top: 25px; }');
STYLE('#advisors #advMilitary {						top: 25px; }');
STYLE('#advisors #advResearch {						top: 25px; }');
STYLE('#advisors #advDiplomacy {					top: 25px; }');
STYLE('#advisors a {								margin: 0px; }');
STYLE('#advisors a .textLabel {						top: 103px; }');
STYLE('#advisors a.plusteaser {						top: 76px; }');
STYLE('#advisors #advCities a.normal {				background-image: url('+dirPath+'/'+repertoire+'/mayor.gif); }');
STYLE('#advisors #advCities a.normalactive {		background-image: url('+dirPath+'/'+repertoire+'/mayor_active.gif); }');
STYLE('#advisors #advMilitary a.normal {			background-image: url('+dirPath+'/'+repertoire+'/general.gif); }');
STYLE('#advisors #advMilitary a.normalactive {		background-image: url('+dirPath+'/'+repertoire+'/general_active.gif); }');
STYLE('#advisors #advMilitary a.normalalert {		background-image: url('+dirPath+'/'+repertoire+'/general_alert.gif); }');
STYLE('#advisors #advResearch a.normal {			background-image: url('+dirPath+'/'+repertoire+'/scientist.gif); }');
STYLE('#advisors #advResearch a.normalactive {		background-image: url('+dirPath+'/'+repertoire+'/scientist_active.gif); }');
STYLE('#advisors #advDiplomacy a.normal {			background-image: url('+dirPath+'/'+repertoire+'/diplomat.gif); }');
STYLE('#advisors #advDiplomacy a.normalactive {		background-image: url('+dirPath+'/'+repertoire+'/diplomat_active.gif); }');
}} else {
STYLE('#advisors a {								margin: 0px; }');
STYLE('#advisors #advCities a.normal {				background-image: url('+dirPath+'/wonder/mayor.gif); }');
STYLE('#advisors #advCities a.normalactive {		background-image: url('+dirPath+'/wonder/mayor_active.gif); }');
STYLE('#advisors #advMilitary a.normal {			background-image: url('+dirPath+'/wonder/general.gif); }');
STYLE('#advisors #advMilitary a.normalactive {		background-image: url('+dirPath+'/wonder/general_active.gif); }');
STYLE('#advisors #advMilitary a.normalalert {		background-image: url('+dirPath+'/wonder/general_alert.gif); }');
STYLE('#advisors #advResearch a.normal {			background-image: url('+dirPath+'/wonder/scientist.gif); }');
STYLE('#advisors #advResearch a.normalactive {		background-image: url('+dirPath+'/wonder/scientist_active.gif); }');
STYLE('#advisors #advDiplomacy a.normal {			background-image: url('+dirPath+'/wonder/diplomat.gif); }');
STYLE('#advisors #advDiplomacy a.normalactive {		background-image: url('+dirPath+'/wonder/diplomat_active.gif); }');
}


if(document.getElementById('city')) {
// -------- Villes --------
//
// --- Arriere Plan (Phase) ---
STYLE('#city #container .phase1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level1.jpg); }');
STYLE('#city #container .phase2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level2.jpg); }');
STYLE('#city #container .phase3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level3.jpg); }');
STYLE('#city #container .phase4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level4.jpg); }');
STYLE('#city #container .phase5 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level5.jpg); }');
STYLE('#city #container .phase6 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level6.jpg); }');
STYLE('#city #container .phase7 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level7.jpg); }');
STYLE('#city #container .phase8 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level8.jpg); }');
STYLE('#city #container .phase9 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level9.jpg); }');
STYLE('#city #container .phase10 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level10.jpg); }');
STYLE('#city #container .phase11 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level11.jpg); }');
STYLE('#city #container .phase12 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level12.jpg); }');
STYLE('#city #container .phase13 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level13.jpg); }');
STYLE('#city #container .phase14 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level14.jpg); }');
STYLE('#city #container .phase15 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level15.jpg); }');
STYLE('#city #container .phase16 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level16.jpg); }');
STYLE('#city #container .phase17 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level17.jpg); }');
STYLE('#city #container .phase18 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level18.jpg); }');
STYLE('#city #container .phase19 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level19.jpg); }');
STYLE('#city #container .phase20 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level20.jpg); }');
STYLE('#city #container .phase21 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level21.jpg); }');
STYLE('#city #container .phase22 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level22.jpg); }');
STYLE('#city #container .phase23 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level23.jpg); }');
STYLE('#city #container .phase24 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level24.jpg); }');
STYLE('#city #container .phase25 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level25.jpg); }');
STYLE('#city #container .phase26 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level26.jpg); }');
STYLE('#city #container .phase27 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/city_level26.jpg); }');

// --- Rallongement Phases (Sous-Phase) ---
STYLE('#city #container .phase1 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase2 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase3 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase4 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase5 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase6 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase7 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase8 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase9 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase10 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase11 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase12 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase13 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase14 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase15 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');

STYLE('#city #container .phase16 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase17 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase18 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase19 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase20 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase21 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase22 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase23 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase24 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase25 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase26 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase27 #ikartLocation {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/overfooter/city_level26.jpg); }');
STYLE('#city #container #ikartLocation {			z-index: 100; width: 720px; height: 337px; position: absolute; }');

// --- Batiment ---
STYLE('#city #container #mainview #locations .shipyard .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/chantier_naval.png);	left: -22px; top: -20px; width: 129px; height: 100px; }');
STYLE('#city #container #mainview #locations .museum .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/musee.png);				left: -8px; top: -38px; width: 105px; height: 85px; }');
STYLE('#city #container #mainview #locations .warehouse .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/entrepot.png);			left: -18px; top: -33px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .wall .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/mur.png);				left: -500px; top: -15px; width: 720px; height: 137px; }');
STYLE('#city #container #mainview #locations .tavern .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/taverne.png);			left: -10px; top: -15px; width: 111px; height: 65px; }');
STYLE('#city #container #mainview #locations .palace .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/palais.png);			left: -10px; top: -42px; width: 106px; height: 97px; }');
STYLE('#city #container #mainview #locations .academy .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/academie.png);			left: -19px; top: -31px; width: 123px; height: 90px; }');
STYLE('#city #container #mainview #locations .workshop .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/atelier.png);			left: -19px; top: -31px; width: 106px; height: 85px; }');
STYLE('#city #container #mainview #locations .safehouse .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/cachette.png);			left: -5px; top: -15px; width: 084px; height: 58px; }');
STYLE('#city #container #mainview #locations .branchOffice .buildingimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/comptoir.png);			left: -19px; top: -31px; width: 109px; height: 84px; }');
STYLE('#city #container #mainview #locations .embassy .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/ambassade.png);			left: -5px; top: -31px; width: 093px; height: 85px; }');
STYLE('#city #container #mainview #locations .palaceColony .buildingimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/residence.png);			left: -10px; top: -42px; width: 109px; height: 95px; }');
STYLE('#city #container #mainview #locations .townHall .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/hotel.png);				left: -5px; top: -60px; width: 104px; height: 106px; }');
if(langage == 'fr') {
STYLE('#city #container #mainview #locations .townHall .ikartmaj {			background-image: url('+dirPath+'/divers/FR.maj.png); position: absolute;							left: -21px; top: -80px; width: 135px; height: 96px; }');
}
else if(langage == 'org') {
STYLE('#city #container #mainview #locations .townHall .ikartmaj {			background-image: url('+dirPath+'/divers/ORG.maj.png); position: absolute;							left: -21px; top: -80px; width: 135px; height: 96px; }');
}
STYLE('#city #container #mainview #locations .barracks .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/caserne.png);			left: 0; top: -33px; width: 100px; height: 76px; }');
STYLE('#city #container #mainview #locations .port .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/port.png);				left: -65px; top: -35px; width: 163px; height: 138px; }');
STYLE('#city #container #mainview #locations .wall .constructionSite {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/construction2.png);		left: -500px; top: -15px; width: 720px; height: 137px; }');
STYLE('#city #container #mainview #locations li .constructionSite { 		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/construction.png);		left: -20px; top: -30px; width: 114px; height: 81px; }');
STYLE('#city #container #mainview #locations .alchemist .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/alchimiste.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .architect .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/bureau_architecte.png);	left: -20px; top: -33px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .optician .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/opticien.png);			left: -17px; top: -44px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .stonemason .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/atelier_marbre.png);	left: -20px; top: -33px; width: 126px; height: 86px; }');
if(invertion == true) {
STYLE('#city #container #mainview #locations .vineyard .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/cave_vin.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .winegrower .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/pressoir.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
} else if(invertion == false) {
STYLE('#city #container #mainview #locations .winegrower .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/cave_vin.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .vineyard .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/pressoir.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
}
STYLE('#city #container #mainview #locations .carpentering .buildingimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/menuiserie.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .fireworker .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/atelier_soufre.png);	left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .forester .buildingimg {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/atelier_bois.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .glassblowing .buildingimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/atelier_cristal.png);	left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .temple .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/temple.png);			left: 5px; top: -23px; width: 69px; height: 67px; }');
STYLE('#city #container #mainview #locations .dump .buildingimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/batiment/depot.png);				left: -5px; top: -31px; width: 96px; height: 74px; }');

// --- Correction placements sur la position3 ---
STYLE('#city #container #mainview #locations #position3.museum {		left: 623px; top: 265px; }');
STYLE('#city #container #mainview #locations #position3.warehouse {		left: 630px; top: 260px; }');
STYLE('#city #container #mainview #locations #position3.tavern {		left: 620px; top: 250px; }');
STYLE('#city #container #mainview #locations #position3.palace {		left: 625px; top: 252px; }');
STYLE('#city #container #mainview #locations #position3.academy {		left: 629px; top: 252px; }');
STYLE('#city #container #mainview #locations #position3.workshop {		left: 632px; top: 252px; }');
STYLE('#city #container #mainview #locations #position3.safehouse {		left: 628px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.branchOffice {	left: 632px; top: 250px; }');
STYLE('#city #container #mainview #locations #position3.embassy {		left: 624px; top: 252px; }');
STYLE('#city #container #mainview #locations #position3.palaceColony {	left: 622px; top: 260px; }');
STYLE('#city #container #mainview #locations #position3.barracks {		left: 617px; top: 252px; }');
STYLE('#city #container #mainview #locations #position3.alchemist {		left: 613px; top: 248px; }');
STYLE('#city #container #mainview #locations #position3.architect {		left: 620px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.optician {		left: 616px; top: 260px; }');
STYLE('#city #container #mainview #locations #position3.stonemason {	left: 620px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.vineyard {		left: 628px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.winegrower {	left: 625px; top: 250px; }');
STYLE('#city #container #mainview #locations #position3.carpentering {	left: 625px; top: 260px; }');
STYLE('#city #container #mainview #locations #position3.fireworker {	left: 620px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.forester {		left: 618px; top: 255px; }');
STYLE('#city #container #mainview #locations #position3.glassblowing {	left: 621px; top: 253px; }');
STYLE('#city #container #mainview #locations #position3.temple {		left: 621px; top: 259px; }');
STYLE('#city #container #mainview #locations #position3.dump {			left: 623px; top: 263px; }');
if(document.getElementById('position3')) {if(document.getElementById('position3').innerHTML.search('class="constructionSite"') != -1) {
STYLE('#city #container #mainview #locations #position3 {				left: 623px; top: 260px; }');
}}

// --- Scènes ---
STYLE('#city #container #mainview #locations .transporter {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/transporteur.png); }');
STYLE('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/garnison.png); }');
STYLE('#city #container #mainview #locations .protester {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/emeute.png); left: 342px; top: 192px; }');
STYLE('#city #container #mainview #locations .beachboys {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/nageurs.png); }');
STYLE('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/nageurs24.png); }');
STYLE('#city #container #mainview #locations .occupier1 {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/town_occ1.gif); }');
STYLE('#city #container #mainview #locations .occupier2 {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/town_occ1.gif); }');
STYLE('#city #container #mainview #locations .occupierGate1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/town_occ1.gif); }');
STYLE('#city #container #mainview #locations .occupierGate2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/town_occ2.gif); }');
STYLE('#city #container #mainview #locations .occupierBeach {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/town_occ2.gif); }');
STYLE('#city #container #mainview #locations .theatre {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/theatre.png);	z-index: 100; position: absolute; width: 48px; height: 57px; top: 279px; left:7px; }');
//STYLE('#city #container #mainview #ikartLocation .spectacle {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; top: 150px; left:7px; }');
//STYLE('#city #container #mainview #ikartLocation .nageurs {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/nageurs2.png); }');
//STYLE('#city #container #mainview #ikartLocation .armada{		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/armada.png); }');
//STYLE('#city #container #mainview #ikartLocation .emeute {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ville/emeute2.png); }');

// --- Petit Drapeau ---
STYLE('#city #container #mainview #locations .land .flag {			background-image:url('+dirPath+'/'+repertoire+'/'+periode+'/flag_red.gif); }');
STYLE('#city #container #mainview #locations .shore .flag {			background-image:url('+dirPath+'/'+repertoire+'/'+periode+'/flag_blue.gif);	}');
STYLE('#city #container #mainview #locations .wall .flag {			background-image:url('+dirPath+'/'+repertoire+'/'+periode+'/flag_yellow.gif); }');
}



if(document.getElementById('island')) {
// -------- Iles --------
//
// --- Fight Terre ---
STYLE('#island #cities .foreignOccupier {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_hold_red.gif); }');
STYLE('#island #cities .ownOccupier {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_hold_blue.gif); }');
STYLE('#island #cities .allyOccupier {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_hold_green.gif); }');
STYLE('#island #cities .treatyOccupier {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_hold_yellow.gif); }');

STYLE('#island #cities .fight {				background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_fight_town.gif); }');

// --- Fight Mer ---
STYLE('#island #cities .foreignBlocker {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/port_hold_red.png); }');
STYLE('#island #cities .ownBlocker {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/port_hold_blue.png); }');
STYLE('#island #cities .allyBlocker {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/port_hold_green.png); }');
STYLE('#island #cities .treatyBlocker {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/port_hold_yellow.png); }');

STYLE('#island #cities .seafight {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/fight/city_fight_port.png); }');

// --- Petit Drapeau ---
STYLE('#island #container #mainview #cities .buildplace .claim {	background-image:url('+dirPath+'/'+repertoire+'/'+periode+'/flag_yellow.gif); }');
STYLE('#island #mainview #cities .premiumBuildPlace .claim {		background-image:url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/flag_premium.gif);	width: 38px; height: 49px; }');

// --- Arrière Plan (Iles) ---
STYLE('#island .island1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/insel1.jpg); }');
STYLE('#island .island2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/insel2.jpg); }');
STYLE('#island .island3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/insel3.jpg); }');
STYLE('#island .island4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/insel4.jpg); }');
STYLE('#island .island5 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/insel5.jpg); }');

// --- Les Villes sur l'ile (Global) ---
STYLE('#island #mainview #cities .level16 div.cityimg, #island #mainview #cities .level17 div.cityimg, #island #mainview #cities .level18 div.cityimg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level19 div.cityimg, #island #mainview #cities .level20 div.cityimg, #island #mainview #cities .level21 div.cityimg, #island #mainview #cities .level22 div.cityimg { height: 60px; width: 67px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level23 div.cityimg, #island #mainview #cities .level24 div.cityimg, #island #mainview #cities .level25 div.cityimg, #island #mainview #cities .level26 div.cityimg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level27 div.cityimg, #island #mainview #cities .level28 div.cityimg, #island #mainview #cities .level29 div.cityimg, #island #mainview #cities .level30 div.cityimg, #island #mainview #cities .level31 div.cityimg { height: 65px; width: 65px; bottom: 0; left: 1px; }');
STYLE('#island #mainview #cities .level32 div.cityimg { height: 65px; width: 65px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level16 div.ownCityImg, #island #mainview #cities .level17 div.ownCityImg, #island #mainview #cities .level18 div.ownCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level19 div.ownCityImg, #island #mainview #cities .level20 div.ownCityImg, #island #mainview #cities .level21 div.ownCityImg, #island #mainview #cities .level22 div.ownCityImg { height: 60px; width: 67px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level23 div.ownCityImg, #island #mainview #cities .level24 div.ownCityImg, #island #mainview #cities .level25 div.ownCityImg, #island #mainview #cities .level26 div.ownCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level27 div.ownCityImg, #island #mainview #cities .level28 div.ownCityImg, #island #mainview #cities .level29 div.ownCityImg, #island #mainview #cities .level30 div.ownCityImg, #island #mainview #cities .level31 div.ownCityImg { height: 65px; width: 65px; bottom: 0; left: 1px; }');
STYLE('#island #mainview #cities .level32 div.ownCityImg { height: 65px; width: 65px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level16 div.allyCityImg, #island #mainview #cities .level17 div.allyCityImg, #island #mainview #cities .level18 div.allyCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level19 div.allyCityImg, #island #mainview #cities .level20 div.allyCityImg, #island #mainview #cities .level21 div.allyCityImg, #island #mainview #cities .level22 div.allyCityImg { height: 60px; width: 67px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level23 div.allyCityImg, #island #mainview #cities .level24 div.allyCityImg, #island #mainview #cities .level25 div.allyCityImg, #island #mainview #cities .level26 div.allyCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level27 div.allyCityImg, #island #mainview #cities .level28 div.allyCityImg, #island #mainview #cities .level29 div.allyCityImg, #island #mainview #cities .level30 div.allyCityImg, #island #mainview #cities .level31 div.allyCityImg { height: 65px; width: 65px; bottom: 0; left: 1px; }');
STYLE('#island #mainview #cities .level32 div.allyCityImg { height: 65px; width: 65px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level16 div.treatyCityImg, #island #mainview #cities .level17 div.treatyCityImg, #island #mainview #cities .level18 div.treatyCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level19 div.treatyCityImg, #island #mainview #cities .level20 div.treatyCityImg, #island #mainview #cities .level21 div.treatyCityImg, #island #mainview #cities .level22 div.treatyCityImg { height: 60px; width: 67px; bottom: 0; left: 2px; }');
STYLE('#island #mainview #cities .level23 div.treatyCityImg, #island #mainview #cities .level24 div.treatyCityImg, #island #mainview #cities .level25 div.treatyCityImg, #island #mainview #cities .level26 div.treatyCityImg { height: 63px; width: 64px; bottom: 0; left: 0; }');
STYLE('#island #mainview #cities .level27 div.treatyCityImg, #island #mainview #cities .level28 div.treatyCityImg, #island #mainview #cities .level29 div.treatyCityImg, #island #mainview #cities .level30 div.treatyCityImg, #island #mainview #cities .level31 div.treatyCityImg { height: 65px; width: 65px; bottom: 0; left: 1px; }');
STYLE('#island #mainview #cities .level32 div.treatyCityImg { height: 65px; width: 65px; bottom: 0; left: 2px; }');

// --- Les Villes sur l'ile (Rouge) ---
STYLE('#island #mainview #cities .level1 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_1_red.gif); }');
STYLE('#island #mainview #cities .level2 div.cityimg, #island #mainview #cities .level3 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_2_red.gif); }');
STYLE('#island #mainview #cities .level4 div.cityimg, #island #mainview #cities .level5 div.cityimg, #island #mainview #cities .level6 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_3_red.gif); }');
STYLE('#island #mainview #cities .level7 div.cityimg, #island #mainview #cities .level8 div.cityimg, #island #mainview #cities .level9 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_4_red.gif); }');
STYLE('#island #mainview #cities .level10 div.cityimg, #island #mainview #cities .level11 div.cityimg, #island #mainview #cities .level12 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_5_red.gif); }');
STYLE('#island #mainview #cities .level13 div.cityimg, #island #mainview #cities .level14 div.cityimg, #island #mainview #cities .level15 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_6_red.gif); }');
STYLE('#island #mainview #cities .level16 div.cityimg, #island #mainview #cities .level17 div.cityimg, #island #mainview #cities .level18 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_7_red.gif); }');
STYLE('#island #mainview #cities .level19 div.cityimg, #island #mainview #cities .level20 div.cityimg, #island #mainview #cities .level21 div.cityimg, #island #mainview #cities .level22 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_8_red.gif); }');
STYLE('#island #mainview #cities .level23 div.cityimg, #island #mainview #cities .level24 div.cityimg, #island #mainview #cities .level25 div.cityimg, #island #mainview #cities .level26 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_9_red.gif); }');
STYLE('#island #mainview #cities .level27 div.cityimg, #island #mainview #cities .level28 div.cityimg, #island #mainview #cities .level29 div.cityimg, #island #mainview #cities .level30 div.cityimg, #island #mainview #cities .level31 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_10_red.gif); }');
STYLE('#island #mainview #cities .level32 div.cityimg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_11_red.gif); }');

// --- Les Villes sur l'ile (Bleu) ---
STYLE('#island #mainview #cities .level1 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_1_blue.gif); }');
STYLE('#island #mainview #cities .level2 div.ownCityImg, #island #mainview #cities .level3 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_2_blue.gif); }');
STYLE('#island #mainview #cities .level4 div.ownCityImg, #island #mainview #cities .level5 div.ownCityImg, #island #mainview #cities .level6 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_3_blue.gif); }');
STYLE('#island #mainview #cities .level7 div.ownCityImg, #island #mainview #cities .level8 div.ownCityImg, #island #mainview #cities .level9 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_4_blue.gif); }');
STYLE('#island #mainview #cities .level10 div.ownCityImg, #island #mainview #cities .level11 div.ownCityImg, #island #mainview #cities .level12 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_5_blue.gif); }');
STYLE('#island #mainview #cities .level13 div.ownCityImg, #island #mainview #cities .level14 div.ownCityImg, #island #mainview #cities .level15 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_6_blue.gif); }');
STYLE('#island #mainview #cities .level16 div.ownCityImg, #island #mainview #cities .level17 div.ownCityImg, #island #mainview #cities .level18 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_7_blue.gif); }');
STYLE('#island #mainview #cities .level19 div.ownCityImg, #island #mainview #cities .level20 div.ownCityImg, #island #mainview #cities .level21 div.ownCityImg, #island #mainview #cities .level22 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_8_blue.gif); }');
STYLE('#island #mainview #cities .level23 div.ownCityImg, #island #mainview #cities .level24 div.ownCityImg, #island #mainview #cities .level25 div.ownCityImg, #island #mainview #cities .level26 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_9_blue.gif); }');
STYLE('#island #mainview #cities .level27 div.ownCityImg, #island #mainview #cities .level28 div.ownCityImg, #island #mainview #cities .level29 div.ownCityImg, #island #mainview #cities .level30 div.ownCityImg, #island #mainview #cities .level31 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_10_blue.gif); }');
STYLE('#island #mainview #cities .level32 div.ownCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_11_blue.gif); }');

// --- Les Villes sur l'ile (Vert) ---
STYLE('#island #mainview #cities .level1 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_1_green.gif); }');
STYLE('#island #mainview #cities .level2 div.allyCityImg, #island #mainview #cities .level3 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_2_green.gif); }');
STYLE('#island #mainview #cities .level4 div.allyCityImg, #island #mainview #cities .level5 div.allyCityImg, #island #mainview #cities .level6 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_3_green.gif); }');
STYLE('#island #mainview #cities .level7 div.allyCityImg, #island #mainview #cities .level8 div.allyCityImg, #island #mainview #cities .level9 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_4_green.gif); }');
STYLE('#island #mainview #cities .level10 div.allyCityImg, #island #mainview #cities .level11 div.allyCityImg, #island #mainview #cities .level12 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_5_green.gif); }');
STYLE('#island #mainview #cities .level13 div.allyCityImg, #island #mainview #cities .level14 div.allyCityImg, #island #mainview #cities .level15 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_6_green.gif); }');
STYLE('#island #mainview #cities .level16 div.allyCityImg, #island #mainview #cities .level17 div.allyCityImg, #island #mainview #cities .level18 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_7_green.gif); }');
STYLE('#island #mainview #cities .level19 div.allyCityImg, #island #mainview #cities .level20 div.allyCityImg, #island #mainview #cities .level21 div.allyCityImg, #island #mainview #cities .level22 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_8_green.gif) ; }');
STYLE('#island #mainview #cities .level23 div.allyCityImg, #island #mainview #cities .level24 div.allyCityImg, #island #mainview #cities .level25 div.allyCityImg, #island #mainview #cities .level26 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_9_green.gif) ; }');
STYLE('#island #mainview #cities .level27 div.allyCityImg, #island #mainview #cities .level28 div.allyCityImg, #island #mainview #cities .level29 div.allyCityImg, #island #mainview #cities .level30 div.allyCityImg, #island #mainview #cities .level31 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_10_green.gif) ; }');
STYLE('#island #mainview #cities .level32 div.allyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_11_green.gif); }');

// --- Les Villes sur l'ile (Jaune) ---
STYLE('#island #mainview #cities .level1 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_1_yellow.gif); }');
STYLE('#island #mainview #cities .level2 div.treatyCityImg, #island #mainview #cities .level3 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_2_yellow.gif); }');
STYLE('#island #mainview #cities .level4 div.treatyCityImg, #island #mainview #cities .level5 div.treatyCityImg, #island #mainview #cities .level6 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_3_yellow.gif); }');
STYLE('#island #mainview #cities .level7 div.treatyCityImg, #island #mainview #cities .level8 div.treatyCityImg, #island #mainview #cities .level9 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_4_yellow.gif); }');
STYLE('#island #mainview #cities .level10 div.treatyCityImg, #island #mainview #cities .level11 div.treatyCityImg, #island #mainview #cities .level12 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_5_yellow.gif); }');
STYLE('#island #mainview #cities .level13 div.treatyCityImg, #island #mainview #cities .level14 div.treatyCityImg, #island #mainview #cities .level15 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_6_yellow.gif) ;}');
STYLE('#island #mainview #cities .level16 div.treatyCityImg, #island #mainview #cities .level17 div.treatyCityImg, #island #mainview #cities .level18 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_7_yellow.gif); }');
STYLE('#island #mainview #cities .level19 div.treatyCityImg, #island #mainview #cities .level20 div.treatyCityImg, #island #mainview #cities .level21 div.treatyCityImg, #island #mainview #cities .level22 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_8_yellow.gif); }');
STYLE('#island #mainview #cities .level23 div.treatyCityImg, #island #mainview #cities .level24 div.treatyCityImg, #island #mainview #cities .level25 div.treatyCityImg, #island #mainview #cities .level26 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_9_yellow.gif); }');
STYLE('#island #mainview #cities .level27 div.treatyCityImg, #island #mainview #cities .level28 div.treatyCityImg, #island #mainview #cities .level29 div.treatyCityImg, #island #mainview #cities .level30 div.treatyCityImg, #island #mainview #cities .level31 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_10_yellow.gif); }');
STYLE('#island #mainview #cities .level32 div.treatyCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/city_11_yellow.gif); }');

// --- Batiment des Dieux / Temple ---
STYLE('#island #islandfeatures .wonder1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder1.png); }');
STYLE('#island #islandfeatures .wonder2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder2.png); }');
STYLE('#island #islandfeatures .wonder3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder3.png); }');
STYLE('#island #islandfeatures .wonder4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder4.png); }');
STYLE('#island #islandfeatures .wonder5 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder5.png); }');
STYLE('#island #islandfeatures .wonder6 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder6.png); }');
STYLE('#island #islandfeatures .wonder7 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder7.png); }');
STYLE('#island #islandfeatures .wonder8 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/temple/wonder8.png); }');

// --- Ressource / Exploitation ---
STYLE('#island #islandfeatures .marble a {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/ress/resource_marble.png); }');
STYLE('#island #islandfeatures .wood a {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/ress/resource_wood.png); }');
STYLE('#island #islandfeatures .wine a {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/ress/resource_wine.png); }');
STYLE('#island #islandfeatures .crystal a {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/ress/resource_glass.png); }');
STYLE('#island #islandfeatures .sulfur a {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/ress//resource_sulfur.png); }');

// --- Villages Barbares, Forum, Colonie et sélections ---
STYLE('#island #barbarianVilliage {						background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/barbares.gif); }');
STYLE('#island #barbarianVilliage.selected a {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/select_barbares.gif); }');
STYLE('#island #islandfeatures .forum {					background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/forum.gif); }');
STYLE('#island #mainview #cities .selectimg {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/select_city.gif); }');
STYLE('#island #mainview #cities .city .buildCityImg {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/ile/city/site_colonie.gif); }');
}



if(document.getElementById('worldmap')) {
// ------ Monde --------
//
// --- Ocean et Ocean Anim ---
STYLE('#worldmap_iso #scrollcover {					background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/bg_ocean.gif) !important; }');
STYLE('#worldmap_iso #worldmap .ocean1 {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_01.gif); }');
STYLE('#worldmap_iso #worldmap .ocean2 {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_02.gif); }');
STYLE('#worldmap_iso #worldmap .ocean3 {			background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_03.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_anim_01.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_anim_02.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_anim_03.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/ocean_anim_04.gif); }');

// --- ile (normal) ---
STYLE('#worldmap_iso #worldmap .island1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01.gif); }');
STYLE('#worldmap_iso #worldmap .island2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02.gif); }');
STYLE('#worldmap_iso #worldmap .island3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03.gif); }');
STYLE('#worldmap_iso #worldmap .island4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04.gif); }');
STYLE('#worldmap_iso #worldmap .island5 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05.gif); }');
STYLE('#worldmap_iso #worldmap .island6 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01.gif); }');
STYLE('#worldmap_iso #worldmap .island7 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02.gif); }');
STYLE('#worldmap_iso #worldmap .island8 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03.gif); }');
STYLE('#worldmap_iso #worldmap .island9 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04.gif); }');
STYLE('#worldmap_iso #worldmap .island10 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05.gif); }');

// --- ile (bleu) ---
STYLE('#worldmap_iso #worldmap .island1own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island2own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island3own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island4own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island5own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island6own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island7own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island8own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island9own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island10own {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_blue.gif); }');

// --- ile (verte) ---
STYLE('#worldmap_iso #worldmap .island1ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_green.gif); }');
STYLE('#worldmap_iso #worldmap .island2ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_green.gif); }');
STYLE('#worldmap_iso #worldmap .island3ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_green.gif); }');
STYLE('#worldmap_iso #worldmap .island4ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_green.gif); }');
STYLE('#worldmap_iso #worldmap .island5ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_green.gif); }');
STYLE('#worldmap_iso #worldmap .island6ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_green.gif); }');
STYLE('#worldmap_iso #worldmap .island7ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_green.gif); }');
STYLE('#worldmap_iso #worldmap .island8ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_green.gif); }');
STYLE('#worldmap_iso #worldmap .island9ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_green.gif); }');
STYLE('#worldmap_iso #worldmap .island10ally {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_green.gif); }');

// --- ile (jaune) ---
STYLE('#worldmap_iso #worldmap .island1treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island2treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island3treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island4treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island5treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island6treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_01_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island7treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_02_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island8treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_03_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island9treaty {		background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_04_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island10treaty {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/island_05_yellow.gif); }');

// --- Batiment des Dieux / Temple ---
STYLE('#worldmap_iso #worldmap .wonder1 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w1.gif); }');
STYLE('#worldmap_iso #worldmap .wonder2 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w2.gif); }');
STYLE('#worldmap_iso #worldmap .wonder3 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w3.gif); }');
STYLE('#worldmap_iso #worldmap .wonder4 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w4.gif); }');
STYLE('#worldmap_iso #worldmap .wonder5 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w5.gif); }');
STYLE('#worldmap_iso #worldmap .wonder6 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w6.gif); }');
STYLE('#worldmap_iso #worldmap .wonder7 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w7.gif); }');
STYLE('#worldmap_iso #worldmap .wonder8 {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/temple/w8.gif); }');

// --- Sélection ---
STYLE('#worldmap_iso #worldmap .islandMarked {	background-image: url('+dirPath+'/'+repertoire+'/'+periode+'/monde/select_island.gif); }');
}


// ********Create By Dante********
// ****Exclusivo Legion Alpha*****