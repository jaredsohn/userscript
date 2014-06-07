// ==UserScript==
// @name		Full Map
// @namespace	Ikariam
// @include		http://*.ikariam.*/index.php?view=worldmap_iso*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require		http://sizzlemctwizzle.com/updater.php?id=82611
// @author		Garmonparnas
//
// @version		0.3
//
// @history		0.3 fixed : the city/shortcut selector is displayed
// @history		0.2 fixed compatibility issues with other scripts - displays GF's ads
// ==/UserScript==

/******************************************************************************************
 * Variables
 ******************************************************************************************/
var fullMapOn = GM_getValue('fullMapOn', false);
var MAX_TILES = 19;


/******************************************************************************************
 * Fonctions
 ******************************************************************************************/
function insertAfter(newNode, refNodeID) {
	var refNode = document.getElementById(refNodeID);
	var parent = refNode.parentNode;
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	} else {
		return parent.appendChild(newNode);
	}
}

// Crée le lien Full Map en haut
function createLink() {
	// Repère le lien créé par PhasmaExMachina et supprime le 'position:absolute' qui empêche de placer correctement notre lien.
	var lastLI = $('#GF_toolbar ul li:last-child');
	if(lastLI.css('position') == 'absolute')
		lastLI.css('position', 'static');

	// Création du nouveau lien.
	var li = document.createElement('li');

	var a = document.createElement('a');
	a.href = '';
	a.addEventListener("click", changeMap, true);		// see greasemonkey common pitfalls

	var span = document.createElement('span');
	span.className = 'textLabel';
	var text = fullMapOn ? "Standard Map" : "Full Map";
	span.appendChild(document.createTextNode(text));
	a.appendChild(span);
	li.appendChild(a);
	li.id = 'FullMapToggle';
	$('#GF_toolbar ul').append(li);

	// Élargissement de la barre GF_toolbar pour permettre de placer les nouveaux liens.
	var allLI = $('#GF_toolbar ul li');				// 9 li in the basic interface, 1 more with Full Map, maybe more with other scripts.
	var ulWidth = 100 * allLI.length;
	if($('#GF_toolbar ul').width() < ulWidth)
		$('#GF_toolbar ul').css('width', ulWidth);
}

// Bascule entre carte normale et full map.
function changeMap() { GM_setValue('fullMapOn', !fullMapOn); window.location.reload(); }

// Repositionne le menu navigation à gauche pour que la carte puisse venir jusqu'au bord de la page.
function moveNavigation() {
	var div = document.createElement('div');
	div.id = "nav_and_info";
	div.style.display = 'block';
	insertAfter(div, "mainview");
	div.appendChild(document.getElementById("navigation"));
	div.appendChild(document.getElementById("information"));

	// Déplace la fenêtre d'ajout de raccourci, car elle se retrouve sous la navigation.
	document.getElementById("annotationBox").style.left = '400px';
}

// Renvoie une div correspondant à une nouvelle case de la carte
function newTile(x, y)  {
	var tile = document.createElement('div');
	// <div align='center' alt=''  valign='middle' id='tile_3_7' class = "ocean1" style='z-index:173;position:absolute; width:240px; height:120px; left:-480px; top:600px;'>
	tile.id = 'tile_'+x+'_'+y;
	tile.style.className = 'ocean1';
	tile.style.zIndex = 100+MAX_TILES*y+x;
	tile.style.position = 'absolute';
	tile.style.width = '240px';
	tile.style.height = '120px';
	tile.style.left = (120*(x-y))+'px';
	tile.style.top = (60*(x+y))+'px';
	tile.innerHTML = '<div id="wonder_'+x+'_'+y+'" ></div><div id="tradegood_'+x+'_'+y+'" ></div><div id="cities_'+x+'_'+y+'" ></div><div id="marking_'+x+'_'+y+'" ></div><div></div><div id="magnify_'+x+'_'+y+'"></div>';
	return tile;
}

// Renvoie une div correspondant au lien d'une nouvelle case de la carte
function newLinkTile(x, y) {
	var link = document.createElement('div');
	// <div id="link_tile_1_0" style="z-index:10000;position:absolute;left:120px;top:60px;">
	link.id = 'link_tile_'+x+'_'+y;
	link.style.zIndex = 10000;
	link.style.position = 'absolute';
	link.style.left = (120*(x-y))+'px';
	link.style.top = (60*(x+y))+'px';
	return link;
}

// Repositionne la carte et ajoute des cases
function makeWorldMapBigger() {
	var worldmap = document.getElementById("worldmap");
	worldmap.style.left = '720px';
	worldmap.style.top = '-680px';

	// ajouter les tiles
	// lignes 0 à 8
	var map1 = document.getElementById('map1');
	for(var y = 0; y < 9; y++) {
		for(var x = 0; x < 9; x++)
			document.getElementById('tile_'+x+'_'+y).style.zIndex = 100+MAX_TILES*y+x;		// change le zIndex des cases existantes
		var nextLineTile = document.getElementById('tile_0_'+(y+1));
		for(var x = 10; x < MAX_TILES; x++)
			map1.insertBefore(newTile(x, y), nextLineTile);
	}
	// ligne 9
	for(var x = 0; x < 9; x++)
		document.getElementById('tile_'+x+'_9').style.zIndex = 100+MAX_TILES*9+x;			// change le zIndex des cases existantes
	for(var x = 10; x < MAX_TILES; x++)
		map1.appendChild(newTile(x, 9));
	// lignes 10 et suivantes
	for(var y = 10; y < MAX_TILES; y++) {
		for(var x = 00; x < MAX_TILES; x++)
			map1.appendChild(newTile(x, y));
	}

	// ajouter les links
	var linkMap = document.getElementById('linkMap');
	// lignes 0 à 8
	for(var y = 0; y < 9; y++) {
		var nextLineTile = document.getElementById('link_tile_0_'+(y+1));
		for(var x = 10; x < MAX_TILES; x++)
			linkMap.insertBefore(newLinkTile(x, y), nextLineTile);
	}
	// ligne 9
	for(var x = 10; x < MAX_TILES; x++)
		linkMap.appendChild(newLinkTile(x, 9));
	// lignes 10 et suivantes
	for(var y = 10; y < MAX_TILES; y++)
		for(var x = 0; x < MAX_TILES; x++)
			linkMap.appendChild(newLinkTile(x, y));

	// agrandissement de la zone qui capte les déplacements de souris
	var dragHandlerOverlay = document.getElementById("dragHandlerOverlay");
	dragHandlerOverlay.style.marginLeft = '-960px';
	dragHandlerOverlay.style.marginTop = '480px';
	dragHandlerOverlay.style.width = '2000px';
	dragHandlerOverlay.style.height = '2000px';
}

// Fonction appelée quand le nom de l'île est modifié dans le panneau d'information.
function IslandNameModified(mutationEvent) {
	// Affiche le nom ET les coordonnées : Zumoos [24:35]
	mutationEvent.target.innerHTML = document.getElementById('islandBread').childNodes[0].text;
}

// Fonction appelée par les scripts qui ajoutent des div. On bloque leur affichage dans la vue plein écran.
function container2Modified(mutationEvent) {
	if((mutationEvent.target.nodeName == 'DIV')) {
		// Nécessaire pour la liste déroulante des villes et des raccourcis.
		if((mutationEvent.target.className.indexOf('citySpecialSelect') < 0) && (mutationEvent.target.className.indexOf('citySelect') < 0))
			mutationEvent.target.style.display = 'none';
	}
}

/******************************************************************************************
 * Début du programme
 ******************************************************************************************/
createLink();

if(fullMapOn) {
	GM_addStyle("#container{width:100%} \
		#container2{width:100%;background-image:none;} \
		#worldmap_iso #scrollcover{height:1000px} \
		#worldmap_iso #worldmap{height:1000px} \
		/* Défini dans ik_common_0.3.4.css */ \
		#mainview{ \
			margin-left:0px; \
			margin-right:-8px; \
		} \
		/* Nouveau */ \
		#annotationHeader { cursor:move; } \
		#nav_and_info{ \
			position:absolute; \
			top:0px; \
			z-index:10000; \
		}");

	// Cache toutes les div présentes sauf les 3 qu'on veut garder.
	var divList = $('#container2>div');
	for(var i = 0; i < divList.length; i++) {
		var div = divList[i];
		if((div.id != 'mainview') && (div.id != 'navigation') && (div.id != 'information') && (div.id != 'banner_container'))
			div.style.display = 'none';
	}

	// DEBUG ONLY pour voir les parties non couvertes par les tiles.
	document.getElementById('scrollcover').style.backgroundImage = '';

	moveNavigation();
	makeWorldMapBigger();

	// L'objet unsafeWindow permet d'accéder aux scripts de la page d'origine, alors que window ne le permet pas.
	// Voir http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Avoid_Common_Pitfalls
	unsafeWindow.map.maxX = MAX_TILES-1;
	unsafeWindow.map.maxY = MAX_TILES-1;
	unsafeWindow.map.drawMap();

	document.getElementById('islandName').addEventListener ('DOMSubtreeModified', IslandNameModified, false);
	document.getElementById('container2').addEventListener ('DOMNodeInserted', container2Modified, false);

	// Rend draggable la boîte de dialogue d'ajout de raccourci.
	// On peut utiliser aussi DDProxy pour afficher un cadre à la place pendant le déplacement.
	// Apparemment impossible de récupérer l'objet renvoyé par YAHOO pour modifier ses propriétés et ajouter une poignée à la fenêtre, par exemple.
	// Impossible aussi de faire ça sur plusieurs fenêtres :-( Ce serait bien aussi pourtant sur "nav_and_info" !
	new unsafeWindow.YAHOO.util.DD("annotationBox"); 
}
