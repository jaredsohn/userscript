// ==UserScript==
// @name		Clubic Essential V2
// @namespace     
// @description	Refonte de la page principale en se focalisant sur l'actualité  
// @include		http://www.clubic.com/actualites-informatique/
// @version		0.9.0.3b
// @author		Madcat
// ==/UserScript==

// FONCTIONS GLOBALES
function $(id) {
	return document.getElementById(id);
}

function create(elmt) {
	return document.createElement(elmt)
}

function xpath(expr, ref, type) {
	ref = (ref ? ref : document);
	type = (type ? type : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	return document.evaluate(expr, ref, null, type, null);
}

function retire(elmt) {
	if (elmt) {
		elmt.parentNode.removeChild(elmt);
	}
}

function preventDefaultAction(evt) {
	evt.preventDefault();
	//GM_log(evt.clientX);
}

function mouseMove(e) {
	oldMouseH = mouseH;
	oldMouseV = mouseV;
	mouseH = e.clientX;
	mouseV = e.clientY;
	//GM_log(e.Delta);
	
	/*
	if (mouseH > oldMouseH) {
		mouseHtotal++
		GM_log(mouseHtotal);
	}
	else {
		mouseHtotal--
		GM_log(mouseHtotal);
	}
	
	*/
}

function pause() {
	if (clique == false) {
		window.setTimeout(pause, 1000);
	}
	else {
		clique = false;
	}
}
	
function jeClique() {
	clique = true;
}


// FONCTIONS POUR LA PAGE PRIINCIPALE
function vireBonjourPseudo() {
	if (document.getElementsByClassName('menu').length > 0) {
		//GM_log('élément "menu" détecté');
		panneauActu.firstChild.firstChild.replaceChild(userBar,tempDiv);
		timer = window.setInterval(essaiDetection, 500);
		document.body.style.visibility = 'visible';
	}
	
	else {
		//GM_log('vireBonjourPseudo');
		window.setTimeout(vireBonjourPseudo, 100);
	}
}

function essaiDetection() {
	if (document.getElementsByClassName('menu')[0].getElementsByTagName('li')[0].className == 'user') {
		//GM_log("élément 'user' détecté à l'essai: " + nbrEssaisDetection );
		clearInterval(timer);
		timer = '';
		var lienProfile = document.getElementsByClassName('user')[0].innerHTML;
		var finBaliseLien = lienProfile.indexOf('absmiddle">') + 11;
		document.getElementsByClassName('user')[0].innerHTML = lienProfile.substring(0,finBaliseLien) + "</a><p id='horloge'>" + jour + ' ' + mois + ' ' + heure + '</p>';
		var majHorloge = (59 - date.getSeconds())*1000;
		window.setTimeout(majHorlogeA,majHorloge);
	}
	else {
		//GM_log("élément 'user' non détecté à l'essai: " + nbrEssaisDetection );
		if (nbrEssaisDetection == 10) {
			clearInterval(timer);
			timer = '';
		}
	}
	nbrEssaisDetection++;
	/*
	if (document.getElementsByClassName('user').length > 0) {
		GM_log('essai détection n°' + nbrEssaisDetection);
		GM_log('élément "user" détecté');
		var lienProfile = document.getElementsByClassName('user')[0].innerHTML;
		var finBaliseLien = lienProfile.indexOf('absmiddle">') + 11;
		document.getElementsByClassName('user')[0].innerHTML = lienProfile.substring(0,finBaliseLien) + "</a>";
		panneauActu.firstChild.firstChild.replaceChild(userBar,tempDiv);
		nbrEssaisDetection++
	}
	*/
	
}

function majHorlogeA() {
	//GM_log('top A');
	
	$('horloge').innerHTML = majDate();
	timer = window.setInterval(majHorlogeB,60000);
}

function majHorlogeB() {
	//GM_log('top B');
	$('horloge').innerHTML = majDate();
}

function majDate() {
	date = new Date();
	jour = jours[date.getDay()] + ' ' + date.getDate();
	mois = lesMois[date.getMonth()];
	hh = date.getHours();
	mm = date.getMinutes()
	if (hh >= 0 && hh<=9) {
		hh = '0'+hh;
	}
	if (mm >= 0 && mm<=9) {
		mm = '0'+mm;
	}
	heure = hh + 'h' + mm;
	return (jour + ' ' + mois + ' ' + heure);
}

function addStyle() {
	GM_addStyle("body {overflow: hidden; background: none;}");
	GM_addStyle("#essential {font-family: Helvetica; font-size: 14px; font-weight: bold; z-index: 1; background: white; color: black; position: absolute; top: 68px; left: 38px;}");
	//GM_addStyle("#home {display: none !important;}");
	GM_addStyle("#event {background-position: -848px -125px !important;}");
	GM_addStyle("#header #menu li.hoverevent {background-position: -848px -161px !important;}");
	GM_addStyle("#partieGauche {vertical-align: top; width: 100%}");
	GM_addStyle("#partieDroite {overflow: hidden; vertical-align: top;}");
	
	GM_addStyle(".contenu_block_central {background: transparent;}");
	GM_addStyle("h1 {color: #FF5A00;}");

	//GM_addStyle(".linkTD {border-bottom: 1px solid CadetBlue;}");
	
	//GM_addStyle(".dateLiensActu {color: #999999; text-align: center;}"); //border-bottom: 1px solid CadetBlue;
	GM_addStyle(".dateLiensActuToday {color: #C70B0B; text-align: center;}"); //border-bottom: 1px solid CadetBlue;
	GM_addStyle(".liensArticle {color: #000080; font-size: 13px; margin-left: 5px;}");
	GM_addStyle(".liensArticleOld {color: rgba(0, 0, 128, 0.5); font-size: 13px; margin-left: 5px;}");
	GM_addStyle(".titreComplet {color: #000080; position: absolute; font-size: 13px; height: 18px; visibility: hidden; background: white;}");
	GM_addStyle(".color1 {background: #F5F6F9;}"); //border-bottom: 1px solid CadetBlue;
	
	GM_addStyle(".dateLiensActu {color: #999999; text-align: center; width: 30px;}"); //border-bottom: 1px solid CadetBlue;
	GM_addStyle(".dateLiensActuToday {color: #C70B0B; text-align: center; width: 30px;}"); //border-bottom: 1px solid CadetBlue;
	
	GM_addStyle("#cluclu {height: " + (window.innerHeight - 110) + "px; overflow-x: hidden;}");

	GM_addStyle("#user_barre {position: relative; width: 384px; height: 28px; z-index: 0; background: #90AFDD; border: 1px solid white; -moz-border-radius: 10px 10px 0 0;}"); //display: none !important;
	GM_addStyle("#user_barre .menu li a img {margin-top: -1px;}");
	GM_addStyle(".title {display: none !important;}");
	GM_addStyle(".menuUser {margin-left: 0 !important; margin-top: 4px;}");
	GM_addStyle(".newsletter {display: none !important;}");
	GM_addStyle(".user a {float: left;}");
	GM_addStyle(".user {margin-left: 40px !important;}");
	GM_addStyle(".container {width: 384px !important;}");
	GM_addStyle(".cl_connect {margin: 1px 0 0 60px !important;}");
	GM_addStyle(".deconnect {float: left !important;}");
	GM_addStyle("#header {padding-top: 0px; width: 100%; height: 100px;}");
	GM_addStyle("#menu {position: absolute; margin-top: 0 !important; top: 10px; left: " + menuLeftPos + "px;}");
	GM_addStyle(".smenu {position: absolute; top: 46px; left: " + menuLeftPos + "px; background: black !important; z-index: 1;}");
	GM_addStyle("#horloge {text-transform: capitalize; color: black; font-size: 11px; font-weight: normal; margin-top: 3px;}");
	GM_addStyle("#logo_home {position: absolute !important; top: 10px; left: 10px !important;}");
		
	//GM_addStyle("#boutonPanneau { }"); //height: 25px; width: 30px; background: transparent; color: white; font-size: 20px; top: 107px; left: 8px;position: absolute;
	//GM_addStyle("#boutonPanneauBack {position: absolute; top: 103px; left: 2px; width: 32px; height: 22px; background: lightCoral; padding-left: 3px; padding-top: 6px; cursor: pointer;  -moz-border-radius: 9px 0 22px 0;}")
	GM_addStyle(".panneauOuvert {position: absolute; top: 103px; left: 2px; width: 32px; height: 22px; background: lightCoral; padding-left: 3px; padding-top: 6px; cursor: pointer;  -moz-border-radius: 9px 15px 15px 0;}")
	GM_addStyle(".panneauClos {position: absolute; top: 103px; left: 2px; width: 28px; height: 22px; background: lightCoral; padding-left: 6px; padding-top: 6px; cursor: pointer;  -moz-border-radius: 0 15px 15px 0;}")
	
	GM_addStyle(".debutFinPanneau {height: 25px; background: #90AFDD; color: white; font-size: 13px; -moz-border-radius: 0 0 10px 10px;}");
	
	GM_addStyle("#debut {background: #C70B0B; color: white; margin-left: 50px;}");
	GM_addStyle("#affichagePagePanneau {background: black; height: 22px; width: 66px; padding-top: 2px; color: white; float: right; -moz-border-radius: 10px 0 10px 0; font-size: 12px;}");
	GM_addStyle("#loading {visibility: hidden; float: none; margin-top: 3px;}");
	GM_addStyle(".boutonsNavigationPage {cursor: pointer; float: left; background: lightgrey; width: 70px; height: 16px; margin-top: 3px; margin-left: 7px; font-size: 12px; color: black; -moz-border-radius: 10px;");
		
	GM_addStyle("#tempTable {visibility: hidden; position: absolute; left: 0px; top: 80px; font-size: 13px;}");
	//GM_addStyle("#panneauActu {cellspacing 5;}");
}

function clickSurLien(evt) {
	evt.preventDefault();
	cluclu.data = this.href;
	partieDroite.appendChild(cluclu);
	
	if (pagePanneau == 1 && isRedPagePanneau == 1) {
		for (var i=0; i < nbrActus; i++) {
			var temp = 'lien' + i;
			if ($(temp).firstChild.href == isRedHref) {
				if ($(temp).firstChild.className == 'liensArticle') {
					$(temp).firstChild.style.color = '#000080';
				}
				else {
					$(temp).firstChild.style.color = 'rgba(0, 0, 128, 0.5)';
				}
			}
		}
	}
	
	
	isRed = this.parentNode.id;
	isRedPagePanneau = pagePanneau;
	isRedHref = this.href;
	//GM_log(this.href);
	
	if (this.parentNode.previousSibling.className == 'dateLiensActuToday') {
		this.style.color = '#C70B0B';
	}
	
	else {
		this.style.color = 'rgba(199, 11, 11, 0.5)';
	}
}

function afficheLienVersionLongue() {
	//GM_log(this.nextSibling.innerHTML);
	//this.firstChild.nextSibling.style.visibility = 'visible'; // pour mode survol du lien
	if (this.nextSibling.firstChild.nextSibling) {
		var full = this.nextSibling.firstChild.nextSibling;
		var original = this.nextSibling.firstChild;
		full.style.color = original.style.color;
		//full.style.fontWeight = original.style.fontWeight;
		full.style.background = this.nextSibling.style.background;
		full.style.visibility = 'visible';
	}
}

function cacheLienVersionLongue() {
	// this.style.visibility = 'hidden'; // pour mode survol du lien
	if (this.nextSibling.firstChild.nextSibling) {
		this.nextSibling.firstChild.nextSibling.style.visibility = 'hidden';
	}
}

function AfficheCachePanneau() {
	if (isVisible) {
		var doc;
		var largeurArticle;
		var margeGaucheArticle;
		
		if (cluclu.contentDocument) {
			var doc = cluclu.contentDocument;
			//GM_log(doc.getElementsByTagName('body')[0].style.marginLeft);
			if (doc.getElementById('article')) {
				largeurArticle = doc.getElementById('article').offsetWidth;
				//GM_log('largeurArticle cas A: ' + largeurArticle);
			}
			
			else {
				largeurArticle = window.innerWidth - 394;
				//GM_log('largeurArticle cas B: ' + largeurArticle);
			}
		}
		
		
		else {
			largeurArticle = window.innerWidth - 394;
			//GM_log('largeurArticle cas C: ' + largeurArticle);
		}
		
		margeGaucheArticle = Math.floor((window.innerWidth-(largeurArticle + 15))/2);
		//GM_log(largeurArticle);
		
		panneauActu.style.display = "none";
		
		partieGauche.style.width = 0;
		cluclu.style.marginLeft = margeGaucheArticle + 'px';
		cluclu.style.width = largeurArticle + 15 + (margeGaucheArticle-5) + 'px';
		
		isVisible = false;
		boutonPanneauBack.innerHTML = '►►';
		boutonPanneauBack.className = 'panneauClos';
	}
	
	else {
		boutonPanneau.innerHTML = "<<<";
		partieGauche.style.width = 384 + 'px';
		//cluclu.style.width = (window.innerWidth - 394) + "px"; 
		cluclu.style.marginLeft = 0;
		cluclu.style.width = (window.innerWidth - 392) + "px"; 
		boutonPanneau.style.color = "white";
		panneauActu.style.display = "block";
		
		isVisible = true;
		boutonPanneauBack.innerHTML = "◄◄";
		boutonPanneauBack.className = 'panneauOuvert';
	}
}

function gestionDesTouches(e) {
	//GM_log('touche pressée' + e.keyCode);
	switch (e.keyCode) {
		case 39: cluclu.style.width = (parseInt(cluclu.style.width,10) + 1) + 'px'; /*GM_log(cluclu.style.width);*/ break;
		case 37: cluclu.style.width = (parseInt(cluclu.style.width,10) - 1) + 'px'; /*GM_log(cluclu.style.width);*/ break;
		default: break;
	}
}

function traductionDate() {
	//var tempA = dateAtraduire; //.replace(annee,'');
	
	for (var i=0; i < 7; i++) {
		if (parution.indexOf(jours[i]) != -1) {
			parution = parution.replace(jours[i],'');
			break;
		}
	}
	
	for (var i=0; i < 12; i++) {
		if (parution.indexOf(lesMois[i]) != -1) {
			parution = parution.replace(lesMois[i],'');
			parution = parution.substring(0,(parution.length-6));
			parution = parution + "/" + (i+1);
			break;
		}
	}
	//return parution;
}

/*

function navigationPages() {
	//GM_log('clic sur bouton page')
	switch (this.id) {
		
		case 'debut': 
			//typeNavigation = 'debut';
			pagePanneau = 1;
			//affichagePagePanneau.innerHTML = 'Page: ' + pagePanneau;
			pageClubic = 1;
			
			listeActu = new Array;
			listeHrefActu = new Array;
			listeParutionActu = new Array;
			getActuListOnPage('http://www.clubic.com/actualites-informatique/');
		break;
		
		case 'pagePrec':
			//typeNavigation = 
			if (pagePanneau > 1) {
				pagePanneau--;
				for (var i=0; i < nbrActus; i++) {
					listeActu[i] = listeActuBackup[i+(nbrActus*(pagePanneau-1))];
					listeHrefActu[i] = listeHrefActuBackup[i+(nbrActus*(pagePanneau-1))];
					listeParutionActu[i] = listeParutionActuBackup[i+(nbrActus*(pagePanneau-1))];
				}
				
				miseAjourPanneau();
				break;
			}
			
			else {break;}
		
		case 'pageSuiv':
			//typeNavigation = 'pageSuiv';
			pagePanneau++;
			//affichagePagePanneau.innerHTML = 'Page: ' + pagePanneau;
			pgSuiv();
	
			
		break;
		
		default: break;
	}
}

*/

function navigationPages(e) {
	e.preventDefault();
	//GM_log('clic sur bouton page')
	if (loading.style.visibility != 'visible') {
	loading.style.visibility = 'visible';
	
	if (this.id == 'debut') {
		deb();

	}
	else if (this.id == 'pagePrec') {
		
		
		if (pagePanneau > 2) {
			pagePanneau--;
			//GM_log('navig dans stock Page prec.');
			//dataStatus();
			listeActu = new Array(nbrActus); //listeActuBackup.length);
			listeHrefActu = new Array(nbrActus); //listeHrefActuBackup.length);
			listeParutionActu = new Array(nbrActus); //listeParutionActuBackup.length);
			for (var i=0; i < nbrActus; i++) {
				listeActu[i] = listeActuBackup[i+(nbrActus*(pagePanneau-2))];
				listeHrefActu[i] = listeHrefActuBackup[i+(nbrActus*(pagePanneau-2))];
				listeParutionActu[i] = listeParutionActuBackup[i+(nbrActus*(pagePanneau-2))];
			}
				
			miseAjourPanneau();
			debut.innerHTML = 'Début';
		}
		
		else if (pagePanneau == 2) {
			pagePanneau--;
			deb();
		}
		
		else {
			loading.style.visibility = 'hidden';
		}
			
	}
		
	else if (this.id == 'pageSuiv') {
		pagePanneau++;
		
		if ((pagePanneau-1) > supStoredPages) {
			pgSuiv();
			debut.innerHTML = 'Début';
		}
		
		else {
			//GM_log('navig dans stock Page suiv.');
			//dataStatus();
			listeActu = new Array(nbrActus); //listeActuBackup.length);
			listeHrefActu = new Array(nbrActus); //listeHrefActuBackup.length);
			listeParutionActu = new Array(nbrActus); //listeParutionActuBackup.length);
			for (var i=0; i < nbrActus; i++) {
				listeActu[i] = listeActuBackup[i+(nbrActus*(pagePanneau-2))];
				listeHrefActu[i] = listeHrefActuBackup[i+(nbrActus*(pagePanneau-2))];
				listeParutionActu[i] = listeParutionActuBackup[i+(nbrActus*(pagePanneau-2))];
			}
			navigDansStock = true;
			miseAjourPanneau();
			debut.innerHTML = 'Début';
			navigDansStock = false;
		}
	}
	
	else {
		GM_log('erreur navigationPages');
	}
}
}

function dataStatus() {
	GM_log('listeActu: ' + listeActu.length + ' listeActuBackup: ' + listeActuBackup.length);
	GM_log('listeHrefActu: ' + listeHrefActu.length + ' listeHrefActuBackup: ' + listeHrefActuBackup.length);
	GM_log('listeParutionActu: ' + listeParutionActu.length + ' listeParutionActuBackup: ' + listeParutionActuBackup.length);
}

function deb() {
	
	//GM_log('début');
	pagePanneau = 1;
	pageClubic = 1;
	listeActu = new Array;
	listeHrefActu = new Array;
	listeParutionActu = new Array;
	listeActuBackup = new Array;
	listeHrefActuBackup = new Array;
	listeParutionActuBackup = new Array;
	supStoredPages = 0;
	getActuListOnPage('http://www.clubic.com/actualites-informatique/');
	debut.innerHTML = 'Reload';

}

function pgSuiv() {
	j = 0;
	//GM_log("première vérification du sotck d'actus disponibles");
	//GM_log('listeActu.length: ' + listeActu.length);
	//GM_log('nbrActus: ' + nbrActus);
	if (listeActu.length < (nbrActus+1)) {j=1;}

	if (j != 1) {
		miseAjourPanneau();
		//supStoredPages++;
		//GM_log(supStoredPages + ' pages stockées bis');
		//break;
	}
			
	else {
		pageClubic++;
		getActuListOnPage(('http://www.clubic.com/actualites-informatique/page_' + pageClubic + '.html'));
		//break;
	}
}

function getActuListOnPage(uri) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: uri,
		headers: {
       		'User-agent': 'Mozilla/4.0',
	       	'Accept': 'text/html',
	    },
		
		overrideMimeType: 'text/html; charset=ISO-8859-1',
			
	    onload: function(e) {
			refreshActuList(e)
		}
	});
}

function refreshActuList(e) {
	//GM_log('pagePanneau =' + pagePanneau + ' pageClubic =' + pageClubic);
	page = create('body');
	page.innerHTML += e.responseText;
	//GM_log(page.innerHTML);
	var allLinks = page.getElementsByTagName('A');
	var supplementActu = new Array;
	
	for (var i=0; i < allLinks.length; i++) {
		if (allLinks[i].className) {
			if (allLinks[i].className == 'title') {
				supplementActu.push(allLinks[i]);
			}
		}
	}
	parution = page.getElementsByTagName('h3')[0].innerHTML;
	traductionDate();
	numeroBlocJour = 0;
	//premierChargement = false;
	buildActuList(supplementActu, page);
	miseAjourPanneau();
}

function buildActuList(datas,source) {
	//GM_log(datas.length);
	var a = listeActu.length;		
	var temp;
	for (var i=0; i < datas.length; i++) {
		//GM_log(datas[i].innerHTML);
		temp = listeHrefActu.concat();
		
		if (temp.indexOf(datas[i].href) == -1) {
			buildActuList2(datas,source,i);
			a++;
		}
		
		else if (datas[i].parentNode.className == 'actu last') {
			//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
			numeroBlocJour++;
			setParution(source);
		}
		
		/*
		if (i < (datas.length - 1)) {
			if (datas[i].href != datas[i+1].href) {
				buildActuList2(datas,source,i);
				//GM_log(listeParutionActu[a] + ' ' + listeActu[a]);
				//a++;
			}
		}
		
		
		else {
			buildActuList2(datas,source,i);
			//GM_log(listeParutionActu[a] + ' ' + listeActu[a]);
			//a++;
		}
		*/
	}
	
	//miseAjourPanneau();
	/*
	GM_log(listeActu.length + " titres d'actus trouvés");
	GM_log(listeHrefActu.length + " liens d'actus trouvés");
	GM_log(listeParutionActu.length + " dates de parution trouvées");
	*/
}

function buildActuList2(datas,source,i) {
	/*var temp = listeHrefActu.concat();
	if (temp.indexOf(datas[i].href) == -1) {*/
		
		listeActu.push(datas[i].innerHTML);
		listeHrefActu.push(datas[i].href);
		
		if (pageClubic == 1 && numeroBlocJour == 0) {
			parution = datas[i].parentNode.getElementsByClassName('date')[0].innerHTML;
		}
		
		listeParutionActu.push(parution);
		
		if (datas[i].parentNode.className == 'actu last') {
			//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
			numeroBlocJour++;
			setParution(source);
		}
		
	/*	
	}
	else {
		GM_log(datas[i].href);
		actuDejaPresente = true;
	}
	*/
}

function creationPanneau() {
	while (nbrActus <= (Math.floor((window.innerHeight-100)/20)-2) && listeActu[0]) {
		//var divActu = liensArticles.snapshotItem(nbrActus).parentNode;
		var TR = create('tr');
		var timeTD = create('td');
		var timeParag = create('p');
		var linkTD = create('td');
		var lienArticle = create('A');
		var blocJour = '';
		var temp = 'lien' + nbrActus;
		
		TR.appendChild(timeTD);
		TR.appendChild(linkTD);
		panneauActu.appendChild(TR);
		
		timeTD.className = 'dateLiensActu';
		timeTD.addEventListener("mouseover", afficheLienVersionLongue, false);
		timeTD.addEventListener("mouseout", cacheLienVersionLongue, false);
		timeTD.appendChild(timeParag);
		
		linkTD.id = 'lien' + nbrActus;
		linkTD.className = 'linkTD';
		linkTD.appendChild(lienArticle);
		
		lienArticle.className = 'liensArticle';
		lienArticle.innerHTML = tronqueSiNecessaire(listeActu.shift());
		
		
		gestionDivTitreComplet(linkTD, 'creation');
		lienArticle.href = listeHrefActu.shift();
		
		
		lienArticle.addEventListener("click", clickSurLien, false);
		//GM_log(lienArticle.innerHTML.length + " " + lienArticle.innerHTML);
		
		if (listeParutionActu[0].indexOf(':') != -1) {
			timeTD.className = 'dateLiensActuToday';
			timeParag.innerHTML = listeParutionActu.shift();
			
			//linkTD.className = 'liensActuToday';
			//linkTD.firstChild.style.fontWeight = 'bold';
			//linkTD.firstChild.style.color ="#000266";
		}
		
		else {
			timeParag.innerHTML = listeParutionActu.shift();
			//listeParutionActuBackup.push(timeParag.innerHTML);
			lienArticle.className = 'liensArticleOld';
			lienArticle.style.color = "rgba(0, 0, 128, 0.5)";
		}
	
	/*
	if (divActu.className == 'actu last') {
		//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
		numeroBlocJour++;
		if (document.getElementsByTagName('h3')[numeroBlocJour] != null) {
			parution = document.getElementsByTagName('h3')[numeroBlocJour].innerHTML;
			traductionDate();
			//GM_log(parution);
			timeTD.style.borderBottom = '2px dotted lightgrey';
			//linkTD.style.borderBottom = '2px dotted lightgrey';
		}
	}
	*/
	
		if (Math.round(nbrActus/2) == nbrActus/2) {
			linkTD.className = 'color1';
			linkTD.style.background = '#F5F6F9';
		}
	
		nbrActus++;
		//GM_log(nbrActus);
		
	/*
	// PANNEAU DE NAVIGATION DANS LES PAGES
	if (i >= (Math.floor((window.innerHeight-100)/20)-7)) {
		var pageTR = create('tr');
		var pageTH = create('th');
		pageTH.colSpan = "2";
		pageTR.appendChild(pageTH);
		
		debut.innerHTML = '[Début]';
		pagePrec.innerHTML = '[Page prec.]';
		pageSuiv.innerHTML = '[Page suiv.]';
		
		debut.id = 'debut';
		pagePrec.id = 'pagePrec';
		pageSuiv.id = 'pageSuiv';
		

		
		pageTH.appendChild(debut);
		pageTH.appendChild(pagePrec);
		pageTH.appendChild(pageSuiv);
		pageTH.innerHTML += ('Page: ' + pagePanneau);
		pageTH.id = 'pagesTH';
		pageTH.className = 'debutFinPanneau';
		panneauActu.appendChild(pageTR);
		//GM_log((nbrActus + 1) + ' actus dans le panneau');
		break;
	}
	*/
	}
	//GM_log('nbrActus = ' + nbrActus + ' actus affichées');
	//GM_log('listeActu.length = ' + listeActu.length + ' actus restantes dans la liste principale après création du panneau');
}

function setParution(elmt) {
	if (elmt == null) {
		GM_log('problème avec la fonction setParution');
	}


	if (elmt.getElementsByTagName('h3')[numeroBlocJour] != null) {
		parution = elmt.getElementsByTagName('h3')[numeroBlocJour].innerHTML;
		traductionDate();
				//GM_log(parution);
				//timeTD.style.borderBottom = '2px dotted lightgrey';
				//linkTD.style.borderBottom = '2px dotted lightgrey';
	}
}
	
function miseAjourPanneau() {
	if (listeActu.length < nbrActus) {
		//GM_log('il manque des actus pour la maj du panneau');
		//GM_log('listeActu.length: ' + listeActu.length);
		//GM_log('nbrActus: ' + nbrActus);
		pageClubic++;
		getActuListOnPage(('http://www.clubic.com/actualites-informatique/page_' + pageClubic + '.html'));
	}
	
	else {
		miseAjourPanneau2()
	}
}

function miseAjourPanneau2() {
	for (var i=0; i < nbrActus; i++) {
		//GM_log('miseAjourPanneau: passage ' + i);
		
		var temp = 'lien' + i;
		$(temp).firstChild.innerHTML = tronqueSiNecessaire(listeActu.shift());
		gestionDivTitreComplet($(temp), 'maj');
		if (pagePanneau > supStoredPages && pagePanneau != 1 && !navigDansStock) {
			
			if ($(temp).firstChild.nextSibling) {
				listeActuBackup.push($(temp).firstChild.nextSibling.innerHTML);
			}
			
			else {
				listeActuBackup.push($(temp).firstChild.innerHTML);
			}
		}
		
		$(temp).firstChild.href = listeHrefActu.shift();
		if (pagePanneau > supStoredPages && pagePanneau != 1 && !navigDansStock) {
			listeHrefActuBackup.push($(temp).firstChild.href);
		}
		
		//GM_log(i + 'e passage de miseAjourPanneau');
		if (listeParutionActu[0].indexOf(':') != -1) {
			$(temp).previousSibling.className = 'dateLiensActuToday';
			$(temp).previousSibling.style.color = '#C70B0B';
			$(temp).firstChild.className = 'liensArticle';
			$(temp).firstChild.style.color = '#000080';
			
			
		}
		
		else {
			$(temp).previousSibling.className = 'dateLiensActu';
			$(temp).previousSibling.style.color = '#999999';
			$(temp).firstChild.className = 'liensArticleOld';
			$(temp).firstChild.style.color = "rgba(0, 0, 128, 0.5)";
			
			/*if (pagePanneau > supStoredPages) {
				listeParutionActuBackup.push($(temp).previousSibling.firstChild.innerHTML);
			}
			
			$(temp).previousSibling.firstChild.innerHTML = listeParutionActu.shift();*/
		}
		
		$(temp).previousSibling.firstChild.innerHTML = listeParutionActu.shift();
		
		if (pagePanneau > supStoredPages && pagePanneau != 1 && !navigDansStock) {
			listeParutionActuBackup.push($(temp).previousSibling.firstChild.innerHTML);
		}
		
		/*
		if ((i == parseInt(isRed.replace('lien',''), 10)) && (pagePanneau == isRedPagePanneau)) {
			//GM_log('lien rouge sur cette page');
			if ($(temp).previousSibling.className == 'dateLiensActuToday') {
				$(temp).firstChild.style.color = '#C70B0B';
			}
			
			else {
				$(temp).firstChild.style.color = 'rgba(199, 11, 11, 0.5)';
			}
		}
		*/
		
		
		
		if (i == (nbrActus-1)) {
			affichagePagePanneau.innerHTML = 'Page: ' + pagePanneau;
			/*
			switch typeNavigation {
				case 'debut':
				case ''
				case''
				default: break;
			}
			*/
		}
		
	}
	
	//if (pagePanneau == isRedPagePanneau) {
	//var temp2 = 'lien' + isRed;
	for (var i=0; i < nbrActus; i++) {
		var temp = 'lien' + i;
		if ($(temp).firstChild.href == isRedHref) {
			if ($(temp).previousSibling.className == 'dateLiensActuToday') {
				$(temp).firstChild.style.color = '#C70B0B';
			}
			
			else {
				$(temp).firstChild.style.color = 'rgba(199, 11, 11, 0.5)';
			}
		}
	}
	
	
	
	/*
		
		if 
			
		}
		
		else {
			for (var k = isRed; k < nbrActus; k++) {
				
		
		
		
		
	
	for (var i=0; i < nbrActus; i++) {
		if ((i == parseInt(isRed.replace('lien',''), 10)) && (pagePanneau == isRedPagePanneau)) {
			if ($(temp).firstChild.href == isRedHref) {
			//GM_log('lien rouge sur cette page');
			
		}
	}
	*/
	
	
	if (pagePanneau > supStoredPages && pagePanneau != 1 && !navigDansStock) {
		supStoredPages++;
		//j = 0;
		//GM_log(supStoredPages + ' pages stockées');
	}
	loading.style.visibility = 'hidden';
}

function tronqueSiNecessaire(texte) {
	tempTD.innerHTML = texte;
	tempTexte = '';
	//GM_log(tempTD.offsetWidth);
	
	if (tempTD.offsetWidth > 340) {
		//GM_log('ça dépasse ! -> ' + tempTD.innerHTML);
		tempTexte = texte;
		tempWidth =  tempTD.offsetWidth;
		tempTD.innerHTML += "...";
		
		while (tempTD.offsetWidth > 340) {
			tempTD.innerHTML = tempTD.innerHTML.substring(0, (tempTD.innerHTML.length - 4));
			tempTD.innerHTML += "...";
		}
		
		//GM_log('taille après troncage: ' + tempTD.offsetWidth);
	}
	
	return tempTD.innerHTML;
}

function gestionDivTitreComplet(elmt, type) {
	var tempTop = elmt.parentNode.offsetTop + elmt.parentNode.parentNode.parentNode.parentNode.offsetTop + 100;
//GM_log(elmt.className);

	if (tempTexte == '') {
		
		if (elmt.firstChild.nextSibling) {
			elmt.removeChild(elmt.firstChild.nextSibling);
		}
	}
	
	else {
		
		if (elmt.firstChild.nextSibling) {
			elmt.firstChild.nextSibling.innerHTML = tempTexte;
			elmt.firstChild.nextSibling.style.width = tempWidth + 10 + 'px';
			
			elmt.firstChild.nextSibling.style.top = tempTop + 'px';
		}
		
		else {
			var fullSize = create('div');
			
			fullSize.innerHTML = tempTexte;
			fullSize.className = 'titreComplet';
			//GM_log('A=' + elmt.parentNode.offsetTop + ' B=' + elmt.parentNode.parentNode.parentNode.parentNode.offsetTop + ' C=' + elmt.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop);
			//pause();
			if (type == 'maj') {
				fullSize.style.top = tempTop + 'px';
			}
			else {
				fullSize.style.top = tempTop + 2 + 'px';
			}
			
			fullSize.style.left = 37 + 'px'; //elmt.offsetLeft + elmt.parentNode.offsetLeft + 'px';
			fullSize.style.width = tempWidth + 10 + 'px';
			elmt.appendChild(fullSize);
			//fullSize.style.top = elmt.offsetTop + 'px';
		}
	}
}

function mouseOverPanel(e) {
	if (e.type == 'mouseover') {
		sourisSurPanneau = true;
	}
	
	else {
		sourisSurPanneau = false;
	}
	
	//GM_log(sourisSurPanneau);
}

function mouseOutPanel() {
	sourisSurPanneau = false;
	//GM_log(sourisSurPanneau);
}

function mouseOnComparateur() {
	$('event').style.backgroundPosition = '-848px -161px !important';
}

function mouseOutComparateur() {
	$('event').style.backgroundPosition = '';
}

// VARIABLES GLOBALES
var header = $('header');
var recherche = $('search_home');
var navRapide = $('liensTransversaux');
var essential = create('a');
var actu = create('div');
var divActu;
var tablePrincipale = create('table');
var tablePrincipaleRow = create('tr');
var partieGauche = create('td');
var partieDroite = create('td');
var liensArticles = xpath("//div[@id='actuList']//A[@class='title']");
var listeActusInitiale = new Array;
var panneauActu = create('table');
var cluclu = document.createElement("object");
var isRed = '';
var isRedPagePanneau = 1;

var tempTable = create('table');
var tempTR = create('tr');
var tempTD = create('td');
var tempTexte = '';
var tempWidth = 0;

var nbrActus = 0;
var parution = 'today';
var boutonPanneau = create('img');
var boutonPanneauBack = create('div');
var isVisible = true;
var userBar = $('user_barre');
var menuLeftPos;
if (screen.width > 1360) {
	menuLeftPos = (screen.width-1000)/2;
}
else {
	menuLeftPos = 200;
}
var numeroBlocJour = 0;
var pagePanneau = 1;
var pageClubic = 1;
var debut = create('p');
var pageSuiv = create('p');
var pagePrec = create('p');
var affichagePagePanneau = create('p');
var loading = create('img');
var listeActu = new Array;
var listeHrefActu = new Array;
var listeParutionActu = new Array;
var listeActuBackup = new Array;
var listeHrefActuBackup = new Array;
var listeParutionActuBackup = new Array;
var supStoredPages = 0;
var navigDansStock = false;
var urlCheckList = new Array;
var page;
var sourisSurPanneau = false;
//var typeNavigation = '';
//var premierChargement = true;
//var menu = $('menu');
//var logo = $('logo_home');
var date = new Date();
var jours=new Array(7);
jours[0]="dimanche";
jours[1]="lundi";
jours[2]="mardi";
jours[3]="mercredi";
jours[4]="jeudi";
jours[5]="vendredi";
jours[6]="samedi";
var jour = jours[date.getDay()] + ' ' + date.getDate();
var lesMois=new Array(12);
lesMois[0]="janvier";
lesMois[1]="février";
lesMois[2]="mars";
lesMois[3]="avril";
lesMois[4]="mai";
lesMois[5]="juin";
lesMois[6]="juillet";
lesMois[7]="août";
lesMois[8]="septembre";
lesMois[9]="octobre";
lesMois[10]="novembre";
lesMois[11]="décembre";
var mois = lesMois[date.getMonth()];
var annee = date.getFullYear();
var hh = date.getHours();
var mm = date.getMinutes()
if (hh >= 0 && hh<=9) {
	hh = '0'+hh;
}
if (mm >= 0 && mm<=9) {
	mm = '0'+mm;
}
var heure = hh + 'h' + mm;
var j = 0;
var mouseH = 0;
var mouseV = 0;
var oldMouseH = 0;
var oldMouseV = 0;
var mouseHtotal = 0;
var mouseVtotal = 0;
var clique = false;
var nbrEssaisDetection = 0;
var timer = '';
var actuDejaPresente = false;

// COEUR DE SCRIPT

addStyle();
document.addEventListener ('click', jeClique, false);

essential.id = 'essential';
essential.innerHTML = 'Essential V2';
essential.href = "http://userscripts.org/scripts/show/74150";
essential.title = 'Clubic Essential V2';

tablePrincipale.id = 'tablePrincipale';

panneauActu.id = 'panneauActu';
panneauActu.cellSpacing = 0 ;
panneauActu.cellPadding = 2 ;

boutonPanneau.id = 'boutonPanneau';
boutonPanneauBack.innerHTML = "◄◄";
boutonPanneauBack.id = 'boutonPanneauBack';
boutonPanneauBack.className = 'panneauOuvert';
//boutonPanneau.src = "http://www.teva.fr/style/img/fleche_precedent_selection_shopping.gif"; //http://pro.clubic.com/img/home/precedent.gif";


partieGauche.id = 'partieGauche';
partieDroite.id = 'partieDroite';

cluclu.type = "text/html";
cluclu.id = 'cluclu';

tablePrincipaleRow.appendChild(partieGauche);
tablePrincipaleRow.appendChild(partieDroite);
tablePrincipale.appendChild(tablePrincipaleRow);

document.body.appendChild(essential);
document.body.appendChild(tempTable);
tempTable.id = 'tempTable';
tempTable.appendChild(tempTR);
tempTR.appendChild(tempTD);
tempTD.style.width = 'auto';



// USERBAR EN DEBUT DE PANNEAU D'ACTUS
var tempDiv = create('div');
tempDiv.style.width = 384 + 'px';
tempDiv.style.height = 28 + 'px';
var userBarTR = create('tr');
var userBarTH = create('th');
userBarTH.colSpan = "2";
userBarTH.appendChild(tempDiv);
userBarTR.appendChild(userBarTH);
panneauActu.appendChild(userBarTR);




// DATE ET HEURE EN DEBUT DE PANNEAU D'ACTUS
var dateTR = create('tr');
var dateTH = create('th');
dateTH.colSpan = "2";
dateTR.appendChild(dateTH);
dateTH.innerHTML = jour + ' ' + mois + ' ' + annee + ' ' + heure;
dateTH.id = 'dateTH';
dateTH.className = 'debutFinPanneau';
//panneauActu.appendChild(dateTR);


/*
for (var i=0; i < liensArticles.snapshotLength; i++) {
	listeActu.push(liensArticles.snapshotItem(i).innerHTML);
	listeHrefActu.push(liensArticles.snapshotItem(i).href);
	
	if (liensArticles.snapshotItem(i).parentNode.className == 'actu last') {
		//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
		numeroBlocJour++;
			
		if (document.getElementsByTagName('h3')[numeroBlocJour] != null) {
			parution = document.getElementsByTagName('h3')[numeroBlocJour].innerHTML;
			traductionDate();
			//GM_log(parution);
			//timeTD.style.borderBottom = '2px dotted lightgrey';
			//linkTD.style.borderBottom = '2px dotted lightgrey';
		}
	}
	
	listeParutionActu.push(parution);
}
*/

for (var i=0; i < liensArticles.snapshotLength; i++) {
	listeActusInitiale.push(liensArticles.snapshotItem(i));
}


buildActuList(listeActusInitiale,document);

/*
GM_log(listeActu.length + 'actus'); GM_log(listeHrefActu.length + 'liens'); GM_log(listeParutionActu.length + 'dates');
for (var i=0; i<listeParutionActu.length; i++) {
	GM_log(i + " -> " + listeParutionActu[i]);
}
*/


//document.body.appendChild(tablePrincipale);
document.body.appendChild(header);
$('discussion').innerHTML = 'forum';
//$('event').addEventListener('mouseover', mouseOnComparateur, false);
//$('event').addEventListener('mouseout', mouseOutComparateur, false);
document.body.appendChild(tablePrincipale);
partieGauche.appendChild(panneauActu);
partieGauche.style.width = 384 + 'px';
//GM_log("hauteur d'écran: " + window.innerHeight + " pixels")
//GM_log((Math.floor((window.innerHeight-100)/20)-7) + ' actus prévues dans le panneau');
creationPanneau();


// PANNEAU DE NAVIGATION DANS LES PAGES
var pageTR = create('tr');
var pageTH = create('th');
pageTH.colSpan = "2";
pageTR.appendChild(pageTH);

debut.innerHTML = 'Reload';
pagePrec.innerHTML = 'Page prec';
pageSuiv.innerHTML = 'Page suiv';
affichagePagePanneau.innerHTML = 'Page: ' + pagePanneau;

debut.id = 'debut';
pagePrec.id = 'pagePrec';
pageSuiv.id = 'pageSuiv';

debut.className = 'boutonsNavigationPage';
pagePrec.className = 'boutonsNavigationPage';
pageSuiv.className = 'boutonsNavigationPage';

affichagePagePanneau.id = 'affichagePagePanneau';
loading.id = 'loading';
loading.src = "http://www.clubic.com/api/img/loading.gif"

pageTH.appendChild(debut);
pageTH.appendChild(pagePrec);
pageTH.appendChild(pageSuiv);
pageTH.appendChild(loading);
pageTH.appendChild(affichagePagePanneau); //.innerHTML += ('Page: ' + pagePanneau);

pageTH.id = 'pagesTH';
pageTH.className = 'debutFinPanneau';
panneauActu.appendChild(pageTR);


// RECUPERATION DES LIENS POUR LE PANNEAU DE GAUCHE

/*
for (var i=0; i < liensArticles.snapshotLength; i++) {
	
	var divActu = liensArticles.snapshotItem(i).parentNode;
	var TR = create('tr');
	var timeTD = create('td');
	var timeParag = create('p');
	var linkTD = create('td');
	var lienArticle = create('A');
	
	var blocJour = '';
	
	timeTD.className = 'dateLiensActu';
	timeTD.addEventListener("mouseover", afficheLienVersionLongue, false);
	timeTD.addEventListener("mouseout", cacheLienVersionLongue, false);
	linkTD.id = 'lien' + i;
	linkTD.className = 'linkTD';
	lienArticle.className = 'liensArticle';
	
	timeTD.appendChild(timeParag);
	lienArticle.innerHTML = liensArticles.snapshotItem(i).innerHTML;
	//GM_log(lienArticle.innerHTML.length + " " + lienArticle.innerHTML);	
	lienArticle.href = liensArticles.snapshotItem(i).href;
	lienArticle.addEventListener("click", clickSurLien, false);
	linkTD.appendChild(lienArticle);
	TR.appendChild(timeTD);
	TR.appendChild(linkTD);
	panneauActu.appendChild(TR);
	
	if (parution == 'today') {
		timeTD.className = 'dateLiensActuToday';
		timeParag.innerHTML = liensArticles.snapshotItem(i).parentNode.getElementsByClassName('date')[0].innerHTML;
		//linkTD.className = 'liensActuToday';
		//linkTD.firstChild.style.fontWeight = 'bold';
		//linkTD.firstChild.style.color ="#000266";
	}
	
	else {
		timeParag.innerHTML = parution;
		lienArticle.className = 'liensArticleOld';
		lienArticle.style.color = "rgba(0, 0, 128, 0.5)";
	}
	
	if (divActu.className == 'actu last') {
		//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
		numeroBlocJour++;
		if (document.getElementsByTagName('h3')[numeroBlocJour] != null) {
			parution = document.getElementsByTagName('h3')[numeroBlocJour].innerHTML;
			traductionDate();
			//GM_log(parution);
			timeTD.style.borderBottom = '2px dotted lightgrey';
			//linkTD.style.borderBottom = '2px dotted lightgrey';
		}
	}
	
	if (Math.round(i/2) == i/2) {
		linkTD.className = 'color1';
		linkTD.style.background = '#F5F6F9';
	}

	nbrActus = i;
	
	// PANNEAU DE NAVIGATION DANS LES PAGES
	if (i >= (Math.floor((window.innerHeight-100)/20)-7)) {
		var pageTR = create('tr');
		var pageTH = create('th');
		pageTH.colSpan = "2";
		pageTR.appendChild(pageTH);
		
		debut.innerHTML = '[Début]';
		pagePrec.innerHTML = '[Page prec.]';
		pageSuiv.innerHTML = '[Page suiv.]';
		affichagePagePanneau.innerHTML = 'Page: ' + pagePanneau;
		
		debut.id = 'debut';
		pagePrec.id = 'pagePrec';
		pageSuiv.id = 'pageSuiv';
		affichagePagePanneau.id = 'page';

		
		pageTH.appendChild(debut);
		pageTH.appendChild(pagePrec);
		pageTH.appendChild(pageSuiv);
		pageTH.appendChild(affichagePagePanneau);
		pageTH.id = 'pagesTH';
		pageTH.className = 'debutFinPanneau';
		panneauActu.appendChild(pageTR);
		//GM_log((nbrActus + 1) + ' actus dans le panneau');
		break;
	}
}


var a = 0;
for (var i=nbrActus+1; i < liensArticles.snapshotLength; i++) {
	listeActu.push(liensArticles.snapshotItem(i).innerHTML);
	listeHrefActu.push(liensArticles.snapshotItem(i).href);
		if (liensArticles.snapshotItem(i).parentNode.className == 'actu last') {
			//GM_log(divActu.parentNode.parentNode.nextSibling.innerHTML)
			numeroBlocJour++;
			if (document.getElementsByTagName('h3')[numeroBlocJour] != null) {
				parution = document.getElementsByTagName('h3')[numeroBlocJour].innerHTML;
				traductionDate();
				//GM_log(parution);
				timeTD.style.borderBottom = '2px dotted lightgrey';
				//linkTD.style.borderBottom = '2px dotted lightgrey';
			}
		}
	listeParutionActu.push(parution);
	//GM_log(listeParutionActu[a] + ' ' + listeActu[a]);// + ' ' + listeHrefActu[a]
	a++;
}
*/	


//document.body.appendChild(header);
//document.body.appendChild(tablePrincipale);
//partieGauche.appendChild(panneauActu);
$('clubic').parentNode.removeChild($('clubic'));


retire(recherche);
retire(navRapide);


cluclu.style.width = (window.innerWidth - 392) + "px"; 

//alert(nbrActus);

/*
for (var i=0; i < nbrActus + 1; i++) {
	var temp = "lien" + i;
	//alert('ok');
	//GM_log($(temp).firstChild.offsetWidth + " " + $(temp).firstChild.innerHTML);
	if ($(temp).firstChild.offsetWidth > 350) {
		var tempWidth =  $(temp).firstChild.offsetWidth;
		var fullSize = create('div');
		fullSize.innerHTML = $(temp).firstChild.innerHTML;
		fullSize.className = 'titreComplet';
		fullSize.style.top = $(temp).offsetTop + $(temp).parentNode.parentNode.parentNode.offsetTop + $(temp).parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop + 'px';
		fullSize.style.left = $(temp).offsetLeft + $(temp).parentNode.offsetLeft + 'px';
		fullSize.style.width = tempWidth + 10 + 'px';
		$(temp).firstChild.innerHTML += "...";
		
		while ($(temp).firstChild.offsetWidth > 350) {
			$(temp).firstChild.innerHTML = $(temp).firstChild.innerHTML.substring(0, ($(temp).firstChild.innerHTML.length - 4));
			$(temp).firstChild.innerHTML += "...";
		}
		
		$(temp).appendChild(fullSize);
		//$(temp).addEventListener("mouseover", afficheLienVersionLongue, false); // pour mode survol du lien
		//fullSize.addEventListener("mouseout", cacheLienVersionLongue, false); // pour mode survol du lien
	}
}
*/



// OUVERTURE DU 1ER LIEN DE LA LISTE
cluclu.data = $('lien0').firstChild.href;
partieDroite.appendChild(cluclu);
$('lien0').firstChild.style.color = '#C70B0B';
isRed = 'lien0';
isRedHref = $('lien0').firstChild.href;
//GM_log(isRedHref);
//boutonPanneauBack.appendChild(boutonPanneau);
document.body.appendChild(boutonPanneauBack);

//retire(document.getElementsByClassName('title')[0]);

/*
var image = create('img');
image.src = "file:///H:/0002804852.jpg";
image.id = 'testImage';
document.body.appendChild(image);
GM_addStyle("#testImage {position: absolute; top: 100px; left: 355px; width: 30px; height: 25px;}");
*/
//userBar.className = 'debutFinPanneau';

/*
function tests() {
	var espaceMembre = $('user_barre').firstChild.getElementsByClassName('title')[0];
	retire(espaceMembre);
}
document.setTimeout('tests',5000);
*/


//if ($('panneauActu').offsetTop$('panneauActu').offsetBott$('panneauActu').offsetTop$('panneauActu').offsetTop



window.setTimeout(vireBonjourPseudo, 100);
//document.addEventListener("keydown", gestionDesTouches, false);
$('debut').addEventListener('mousedown', navigationPages, false);
$('pagePrec').addEventListener('mousedown', navigationPages, false);
$('pageSuiv').addEventListener('mousedown', navigationPages, false);
$('affichagePagePanneau').addEventListener('mousedown', preventDefaultAction, false);
boutonPanneauBack.addEventListener('click', AfficheCachePanneau, false);
document.addEventListener('keydown', gestionDesTouches, false);
//document.addEventListener("mousemove", mouseMove, false);
//$('panneauActu').addEventListener("mouseover", mouseOverPanel, false);
//$('panneauActu').addEventListener("mouseout", mouseOverPanel, false);
