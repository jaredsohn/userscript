// ==UserScript==
// @name           Guiks.net_UpDownDiff
// @namespace      tag:philippe.kerbaul@gmail.com,2009:Guiks.net_UpDownDiff
// @description    Calcule la différence entre Up et Down et colorie les liens en fonction  (vert => OK ; rouge => vous allez passer sous les 0.5 de ratio ; orange => vous allez passer sous les 1.0)
// @include        https://www.guiks.net/*

var UNITS = new Array(4);
UNITS[0] = "Ko";
UNITS[1] = "Mo";
UNITS[2] = "Go";
UNITS[3] = "To";

// retourne la taille du fichier en Ko
function parseFileSize(sizeStr) {
	var lg = sizeStr.length;
	var unit = sizeStr.substring(lg - 2, lg);
	var size = parseFloat(sizeStr.substring(0, lg - 3));
	if (!isNaN(size)) {
		var i = 0;
		while (i < UNITS.length && unit != UNITS[i]) {
			size = size * 1024.0;
			i++;
		}
		if (i >= UNITS.length) {
			GM_log("parseFileSize('"+sizeStr+"') : invalid parameter");
		}
	}

	return size;
}

// formate une taille de fichier avec la bonne unité
function formatSize(size) {
	var i = 0;
	var sign = (size >= 0) ? 1 : -1;
	while (Math.abs(size) > 1024 && i < UNITS.length - 1) {
		size = size/1024;
		i++;
	}
	var sizeStr = size + "";
	var pos = sizeStr.lastIndexOf(".");
	if (pos > 0 && pos < sizeStr.length - 2) {
		sizeStr = sizeStr.substring(0, pos + 3);
	}
	return sizeStr + " " + UNITS[i];
}


if (document.getElementById("userlink")) {

	// calcule de la différence entre Up et Down
	var userLinkNodes = document.getElementById("userlink").childNodes;
	var upDownLi = userLinkNodes[3];
	var upDownLiNodes = upDownLi.childNodes;
	var uploaded = parseFileSize(upDownLiNodes[1].firstChild.data);
	var downloaded = parseFileSize(upDownLiNodes[3].firstChild.data);

	var diff = Math.round(uploaded - downloaded);
	
	// Ajout de l'info à la suite de Up et Down dans le header des pages (en vert ou rouge suivant que c'est positif ou non)
	var diffText = document.createTextNode(" | Diff: ");
	upDownLi.appendChild(diffText);
	var diffNode = document.createElement('span');
	if (diff > 0) {
		diffNode.setAttribute("class", "uploaded");
	} else {
		diffNode.setAttribute("class", "downloaded");
	}
	diffText = document.createTextNode(formatSize(diff));
	diffNode.appendChild(diffText);

	upDownLi.appendChild(diffNode);

	if (GM_getValue && GM_setValue) {
		// Test pour voir si une valeur de diff a déjà été calculée et sauvegardée
		var oldDiff = parseInt(GM_getValue("oldDiff"));
		if (oldDiff) {
			var progression = diff - oldDiff;

			if (progression != 0) {
				// On rajoute la progression
				diffText = document.createTextNode(" (" + (progression>=0?"+":"") + formatSize(progression) + ")");
				upDownLi.appendChild(diffText);
			}
		}
		// Mise à jour de la valeur sauvegardée
		GM_setValue("oldDiff", ""+diff);
	} else {
		alert('Please upgrade to the latest version of Greasemonkey.');
	}

	// colorise les cellules de la colonne "Taille" suivant l'effet du téléchargement sur le ratio

	// Récupération via X-Path de toutes les cellules de la colonne 'Taille'
	var allSizeTd = document.evaluate(
		"//td[starts-with(@class, 'size_torrent')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < allSizeTd.snapshotLength; i++) {

		var thisTd = allSizeTd.snapshotItem(i);

		var size = parseFileSize(thisTd.firstChild.nodeValue.trim());

		if (!isNaN(size)) {
			var style;
			if (size < diff) {
				// meme en téléchargeant ce fichier, le ration reste au dessus  de 1.0 => en Vert
				style = "color: green";
			} else if (downloaded + size > uploaded * 2) {
				// ce fichier peut faire descendre le ratio sous les 0.5 => en rouge
				style = "color: red";
			} else {
				// ce fichier peut faire descendre le ratio sous les 1.0, mais au dessus de 0.5 => en orange
				style = "color: orange";
			}
			thisTd.setAttribute("style", style);
		}
	}
}

// ==/UserScript==
