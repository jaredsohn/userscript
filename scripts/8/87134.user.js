// ==UserScript==

// @name           Tools_Ikariam_Time_To_Pop_Limit
// @namespace      monkeyisback
// @version        1.04
// @author         MonkeyIsBack
// @include        http://*.ikariam.*/index.php?view=townHall&id=*&position=*
// @include        http://*.ikariam.*/index.php
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

if(getElementsByClass('value')[0]) {
	// Nombre actuel : 
	var nombreActuel = getElementsByClass('value')[0].innerHTML;
	// Nombre max : 
	var nombreMax = getElementsByClass('value')[1].innerHTML;
	// Bonheur : 
	var listH4 = document.getElementsByTagName('h4');
	for(k = 0; listH4[k]; k++) {
		if(listH4[k].innerHTML == 'Total satisfaction:') {var satisfactionNode = listH4[k].parentNode;}
	}
	
	var happiness = satisfactionNode.getElementsByTagName('div')[0].innerHTML;
	// Temps en sec par unite
	var vitesseProd = 3600 / (happiness/50);
	var tempsSecondes = 0;
	
	while (nombreActuel < nombreMax && happiness > 0) {
		tempsSecondes += vitesseProd;
		nombreActuel++;
		happiness--;
		vitesseProd = 3600 / (happiness/50);
	}
	
	if(nombreActuel == nombreMax) {
		document.getElementsByTagName('h4')[1].innerHTML = 'Population and production: ';
	}
	
	if (tempsSecondes > 0) {
		var tempsJours = Math.floor(tempsSecondes/86400);
		tempsSecondes -= 86400 * tempsJours;
		var tempsHeures = Math.floor(tempsSecondes/3600);
		tempsSecondes -= 3600 * tempsHeures;
		var tempsMinutes = Math.floor(tempsSecondes/60);
		tempsSecondes -= 60 * tempsMinutes;
	
		document.getElementsByTagName('h4')[1].innerHTML = 'Population Limit: ';
		if(tempsJours > 0) {document.getElementsByTagName('h4')[1].innerHTML += tempsJours + 'd ';}
		if(tempsHeures > 0) {document.getElementsByTagName('h4')[1].innerHTML += tempsHeures + 'h ';}
		if(tempsMinutes > 0) {document.getElementsByTagName('h4')[1].innerHTML += tempsMinutes + 'm ';}
		
		document.getElementsByTagName('h4')[1].innerHTML += Math.floor(tempsSecondes) + 's - Population and production: ';
	}
	
	if (happiness < 0 || nombreActuel < nombreMax) {
		document.getElementsByTagName('h4')[1].innerHTML = '<font color="red">Give more Happiness to your population</font> ... Population and production: ';
	}
}