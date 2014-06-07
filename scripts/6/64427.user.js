// ==UserScript==
// @name           IkArT Wonder
// @version 	   IkArt 1.4.8
// @namespace 	   Ikariam
// @autor          Create by Typhon, Destructor and Quenquen407
// @e-mail         minigrapheur@live.fr
// @e-mail         majdi79@hotmail.fr
// @e-mail         quenquen407@hotmail.fr
// @description    IkArt Wonder : Ikariam avec des périodes de transition Aube, Jour, Crépuscule et Nuit selon l'heure de votre ordinateur et Amélioration des Graphismes...
// @include        http://*.ikariam.*/*
// @exclude        http://*.ikariam.*/pillory.php
// @exclude        http://board.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==
// ===========================================================================
// ---- !!! YOU HAVE NOT ALLOWED TO EDIT OR COPY THIS SCRIPT !!! Protect by : http://www.iddn.org ----
// ---- !!! VOUS N'AVEZ PAS LE DROIT DE MODIFIER OU COPIER CE SCRIPT !!! Protégé par: http://www.iddn.org ----

//08-11-2009

// ---- This script developped for Ikariam version 0.3.2 and more ----
// ---- To contact a Creator Script, and Administrator ; majdi79@hotmail.fr ----
// ---- To contact a Creator Graphic, and Administrator ; minigrapheur@live.fr ----


// ---- (CSS) ----

var H_timelocal = new Date();
var H_time = H_timelocal.getHours();


if ( H_time >= GM_getValue('nuitbis1',21) && H_time <= GM_getValue('nuitbis2',23) || H_time >= GM_getValue('nuit1',0) && H_time <= GM_getValue('nuit2',6) ){
function NUIT(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}}else{function NUIT(css){}}

if ( H_time >= GM_getValue('jour1',9) && H_time <=  GM_getValue('jour2',19)){
function JOURNEE(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}}else{function JOURNEE(css){}}
if ( H_time >= GM_getValue('aube1',7) && H_time <= GM_getValue('aube2',8)){
function AUBE(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}}else{function AUBE(css){}}
if ( H_time >= GM_getValue('crepuscule1',19) && H_time <= GM_getValue('crepuscule2',21) ){
function CREPUSCULE(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}}else{function CREPUSCULE(css) {}}



// --- Fonction Ajout de Phases 25 et 26 ---

if(document.getElementById('position0'))
{
	var titlehotel = document.getElementById('position0').getElementsByTagName('a')[0].title;
	var levelhotel = titlehotel.substr(titlehotel.length-2)*1;
	if ( levelhotel > 26 ){ levelhotel = 26; }
	var class = document.getElementById("mainview");
	class.setAttribute('class','phase'+levelhotel);
}

// --- Fonction Allongement de phase ---

if(GM_getValue("allonger")!=3)
{
	var node = document.getElementById("mainview");
	var nodediv = document.createElement("li")
	nodediv.setAttribute('id','ikart');
	node.appendChild(nodediv);
	document.getElementById('ikart').innerHTML="<table></table>";
}

// --- Fonction Ajout d'un spectacle dans le theatre ---

if(document.getElementById('locations'))
{
	if (document.getElementById('locations').innerHTML.search("beachboys") != -1)
	{
		var titlehotel = document.getElementById('position0').getElementsByTagName('a')[0].title;
		var levelhotel = titlehotel.substr(titlehotel.length-2, 2)*1;
		if(levelhotel > 12 && levelhotel!=15)
		{
			var theatre = document.getElementById("mainview");
			var theatrediv = document.createElement("li");
			theatrediv.setAttribute('id','theatre');
			theatre.appendChild(theatrediv);
		}
	}
}

// --- Gestion Options ---

var loca = location.toString();
if(document.getElementById('options'))
{
	var node = document.getElementById('mainview');
	var nodediv = document.createElement('div');
	var referenceChild = document.getElementById('vacationMode');
	nodediv.setAttribute('id', 'ikartoption');
	nodediv.setAttribute('class', 'contentBox01h');
	node.insertBefore(nodediv, referenceChild);
	if(GM_getValue("allonger")==3){icheck="";}
	else{icheck=" checked='checked'"}
	document.getElementById('ikartoption').innerHTML='<h3 class="header"><span class="textLabel">Options IkArt</span></h3><div class="content"><div><table><tr><th>Site Officiel IkArt</th><td><a href="http://ika-art.teknopop.com" target="_blank">Acc&eacute;der</a></td></tr></table></div><div><h3>Allonger la vue</h3><table><tr><th>Allonger la vue</th><td><input type="checkbox"'+icheck+' id="ikart_allonger"></td></tr></table></div><div><h3>Dur&eacute;e des p&eacute;riodes</h3><table><tr><th><b>Nuit :</b></th><td><input type="text" id="nuit1" style="width:20px;" value="'+GM_getValue('nuit1', '0')+'">h00 &agrave; <input type="text" id="nuit2" style="width:20px;" value="'+GM_getValue('nuit2', '6')+'">h59</td></tr><tr><th><b>Aube :</b></th><td><input type="text" id="aube1" style="width:20px;" value="'+GM_getValue('aube1', '7')+'">h00 &agrave; <input type="text" id="aube2" style="width:20px;" value="'+GM_getValue('aube2', '8')+'">h59</td></tr><tr><th><b>Jour :</b></th><td><input type="text" id="jour1" style="width:20px;" value="'+GM_getValue('jour1', '9')+'">h00 &agrave; <input type="text" id="jour2" style="width:20px;" value="'+GM_getValue('jour2', '18')+'">h59</td></tr><tr><th><b>Cr&eacute;puscule :</b></th><td><input type="text" id="crepuscule1" style="width:20px;" value="'+GM_getValue('crepuscule1', '19')+'">h00 &agrave; <input type="text" id="crepuscule2" style="width:20px;" value="'+GM_getValue('crepuscule2', '20')+'">h59</td></tr><tr><th><b>Nuit :</b></th><td><input type="text" id="nuitbis1" style="width:20px;" value="'+GM_getValue('nuitbis1', '21')+'">h00 &agrave; <input type="text" id="nuitbis2" style="width:20px;" value="'+GM_getValue('nuitbis2', '23')+'">h59</td></tr><tr><th>Heures par d&eacute;faut</th><td><a href="javascript:void(0);" onclick="document.getElementById(\'nuit1\').value=\'0\';document.getElementById(\'nuit2\').value=\'6\';document.getElementById(\'aube1\').value=\'7\';document.getElementById(\'aube2\').value=\'8\';document.getElementById(\'jour1\').value=\'9\';document.getElementById(\'jour2\').value=\'18\';document.getElementById(\'crepuscule1\').value=\'19\';document.getElementById(\'crepuscule2\').value=\'20\';document.getElementById(\'nuitbis1\').value=\'21\';document.getElementById(\'nuitbis2\').value=\'23\';">Remettre</a></td></tr></table></div><div><h3>Changement du logo IkArt</h3><table><tr><th>URL logo</th><td><input id="logo" type="text" size="35" value="'+GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo.png')+'"><br /><b>Gallerie :</b> <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo.png\';" style="cursor:pointer;">IkArt</a> - <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo2.png\';" style="cursor:pointer;">New IkArt</a> - <a onclick="document.getElementById(\'logo\').value=\'http://s1.ikariam.fr/skin/research/area_economy.jpg\';" style="cursor:pointer;">Premium</a></td></tr></table></div><div class="centerButton"><input href="javascript:void(0);" onclick="if(ikartsvg(document.getElementById(\'ikart_allonger\').checked,document.getElementById(\'nuit1\').value,document.getElementById(\'nuit2\').value,document.getElementById(\'aube1\').value,document.getElementById(\'aube2\').value,document.getElementById(\'jour1\').value,document.getElementById(\'jour2\').value,document.getElementById(\'crepuscule1\').value,document.getElementById(\'crepuscule2\').value,document.getElementById(\'nuitbis1\').value,document.getElementById(\'nuitbis2\').value,document.getElementById(\'logo\').value)){alert(\'Option Sauvegard&eacute; !\');location.reload();}" class="button" value="Sauver les param&egrave;tres !" type="submit"></div></div><div class="footer"></div></div>';

	unsafeWindow.ikartsvg = function (choix,nuit1,nuit2,aube1,aube2,jour1,jour2,crepuscule1,crepuscule2,nuitbis1,nuitbis2,logo)
	{
		erreur=false
		if(parseInt(nuit1)>parseInt(nuit2)){erreur=true;}
		if(parseInt(aube1)>parseInt(aube2)){erreur=true;}
		if(parseInt(jour1)>parseInt(jour2)){erreur=true;}
		if(parseInt(crepuscule1)>parseInt(crepuscule2)){erreur=true;}
		if(parseInt(nuitbis1)>parseInt(nuitbis2)){erreur=true;}

		if(erreur){alert("Erreur dans la configuration, vérifiez les heures");return false;}
		else
		{
			if(choix){nb=2;}else{nb=3;}
			window.setTimeout(GM_setValue,0,'allonger', nb);
			window.setTimeout(GM_setValue,0,'nuit1', parseInt(nuit1));
			window.setTimeout(GM_setValue,0,'nuit2', parseInt(nuit2));
			window.setTimeout(GM_setValue,0,'aube1', parseInt(aube1));
			window.setTimeout(GM_setValue,0,'aube2', parseInt(aube2));
			window.setTimeout(GM_setValue,0,'jour1', parseInt(jour1));
			window.setTimeout(GM_setValue,0,'jour2', parseInt(jour2));
			window.setTimeout(GM_setValue,0,'crepuscule1', parseInt(crepuscule1));
			window.setTimeout(GM_setValue,0,'crepuscule2', parseInt(crepuscule2));
			window.setTimeout(GM_setValue,0,'nuitbis1', parseInt(nuitbis1));
			window.setTimeout(GM_setValue,0,'nuitbis2', parseInt(nuitbis2));
			window.setTimeout(GM_setValue,0,'logo', logo);
			return true;
		}
	}
}




// ---------------------------------------------------
// ----------------------- ALL -----------------------// ---------------------------------------------------
// ---------- Debut du Script Pour le Reste ----------
// ---------------------------------------------------


//----------- Ajouts Generals ---------
//
//----- Agrandissement vers le bas ----
if(GM_getValue("allonger")!=3){
GM_addStyle('#city #container #mainview {	height: 777px; background-repeat: no-repeat;	}');
GM_addStyle('#city #container #mainview #locations {	overflow:visible;	}');
GM_addStyle('#city #container #mainview {	overflow: hidden;	}');
}
// -------------------------------------------------




// ---------------------------------------------------
// -------------------- JOURNEE ----------------------
// ---------------------------------------------------
// ---------- Debut du Script Pour la jour -----------
// ---------------------------------------------------


//----------- Autres ---------
//
//----- Layout ----
JOURNEE('#militaryAdvisorDetailedReportView #container #container2 #header {		background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/layout/bg_header2.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
JOURNEE('#header {	background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/layout/bg_header.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');


//--------- Villes ---------
//
//-------------------------------- Arriere Plan (Phase) --------------------------------
JOURNEE('#city #container .phase25 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/city_level25.jpg);	}');
JOURNEE('#city #container .phase26 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/city_level26.jpg);	}');//----- Image Sign Menu Gauche ----
//GM_addStyle('#city #container #reportInboxLeft .content {	background-image: url('+GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo.png')+'); background-position: center top; background-repeat: no-repeat; }');
//GM_addStyle('#city #container #reportInboxLeft .content img {	visibility:hidden; }');
if(document.getElementById('city')){if(document.getElementById('reportInboxLeft')){if(document.getElementById('reportInboxLeft').getElementsByTagName('img')[0]){document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].src=GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo.png');}}}

//-------------------------------- Rallongement Phases (Sous-Phase) --------------------------------
JOURNEE('#city #container .phase1 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase2 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase3 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase4 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase5 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase6 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase7 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase8 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase9 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase10 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase11 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase12 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase13 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase14 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase15 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase16 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase17 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase18 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase19 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase20 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase21 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase22 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase23 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase24 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase25 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
JOURNEE('#city #container .phase26 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');

//----------------------------------- Batiment --------------------------------
JOURNEE('#city #container #mainview #locations .shipyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/chantier_naval.png);	left:-022px; top:-20px; width:129px; height:100px;	}');
JOURNEE('#city #container #mainview #locations .museum .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/musee.png);				left:-008px; top:-38px; width:105px; height:85px;	}');
JOURNEE('#city #container #mainview #locations .warehouse .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/entrepot.png);			left:-018px; top:-33px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .wall .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/mur.png);				left:-500px; top:-15px; width:720px; height:137px;	}');
JOURNEE('#city #container #mainview #locations .tavern .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/taverne.png);			left:-010px; top:-15px; width:111px; height:65px;	}');
JOURNEE('#city #container #mainview #locations .palace .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/palais.png);			left:-010px; top:-42px; width:106px; height:97px;	}');
JOURNEE('#city #container #mainview #locations .academy .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/academie.png);			left:-019px; top:-31px; width:123px; height:90px;	}');
JOURNEE('#city #container #mainview #locations .workshop .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/atelier.png);			left:-019px; top:-31px; width:106px; height:85px;	}');
JOURNEE('#city #container #mainview #locations .safehouse .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/cachette.png);			left:-005px; top:-15px; width:084px; height:58px;	}');
JOURNEE('#city #container #mainview #locations .branchOffice .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/comptoir.png);			left:-019px; top:-31px; width:109px; height:84px;	}');
JOURNEE('#city #container #mainview #locations .embassy .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/ambassade.png);			left:-005px; top:-31px; width:093px; height:85px;	}');
JOURNEE('#city #container #mainview #locations .palaceColony .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/residence.png);			left:-010px; top:-42px; width:109px; height:95px;	}');
JOURNEE('#city #container #mainview #locations .townHall .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/1.4.8.png);				left:-005px; top:-60px; width:104px; height:106px;	}');
JOURNEE('#city #container #mainview #locations .barracks .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/caserne.png);			left:-000px; top:-33px; width:100px; height:76px;	}');
JOURNEE('#city #container #mainview #locations .port .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/port.png);				left:-065px; top:-35px; width:163px; height:138px;	}');
JOURNEE('#city #container #mainview #locations .wall .constructionSite {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/construction2.png);		left:-500px; top:-15px; width:720px; height:137px;	}');
JOURNEE('#city #container #mainview #locations li .constructionSite { 		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/construction.png);		left:-020px; top:-30px; width:114px; height:81px;	}');
JOURNEE('#city #container #mainview #locations .alchemist .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/alchimiste.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .architect .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/bureau_architecte.png);	left:-020px; top:-33px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .optician .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/opticien.png);			left:-017px; top:-44px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .stonemason .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/atelier_marbre.png);	left:-020px; top:-33px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .winegrower .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/cave_vin.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .vineyard .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/pressoir.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .carpentering .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/menuiserie.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .fireworker .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/atelier_soufre.png);	left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .forester .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/atelier_bois.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .glassblowing .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/atelier_cristal.png);	left:-020px; top:-30px; width:126px; height:86px;	}');
JOURNEE('#city #container #mainview #locations .temple .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/batiment/temple.png);			left:+005px; top:-23px; width:069px; height:67px;	}');

//-------------------- Transporteur, garnison, Emeute, Nageurs et Spectacle -------------------
JOURNEE('#city #container #mainview #locations .transporter {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/transporteur.png);	}');
JOURNEE('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/garnison.png);	}');
JOURNEE('#city #container #mainview #locations .garnisonOutpost {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/garnison_outpost.png);	}');
JOURNEE('#city #container #mainview #locations .protester {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/emeute.png); left:342px; top:192px;	}');
JOURNEE('#city #container #mainview #locations .beachboys {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/nageurs.png);	}');
JOURNEE('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys, #city #container #mainview.phase28 #locations .beachboys, #city #container #mainview.phase29 #locations .beachboys, #city #container #mainview.phase30 #locations .beachboys, #city #container #mainview.phase31 #locations .beachboys, #city #container #mainview.phase32 #locations .beachboys {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/nageurs24.png);	}');
JOURNEE('#city #container #mainview #theatre {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; margin-top: -156px; margin-left:0px;	}');


//--------- Iles ---------
//
//----- Fight Mer -----
JOURNEE('#island #container #mainview #cities div.foreignBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/fight/port_hold_red.png)		no-repeat 2px 2px;	}');
JOURNEE('#island #container #mainview #cities div.ownBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/fight/port_hold_blue.png)	no-repeat 2px 2px;	}');
JOURNEE('#island #container #mainview #cities div.allyBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/fight/port_hold_green.png)	no-repeat 2px 2px;	}');
JOURNEE('#island #container #mainview #cities div.treatyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/fight/port_hold_yellow.png)	no-repeat 2px 2px;	}');

JOURNEE('#island #container #mainview #cities div.seafight {		background:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/fight/city_fight_port.png)	no-repeat 2px 2px;	}');

//----- Arrière Plan (Iles) -----
JOURNEE('#island #container .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/insel1.jpg); padding:0; height:440px;	}');
JOURNEE('#island #container .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/insel2.jpg); padding:0; height:440px;	}');
JOURNEE('#island #container .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/insel3.jpg); padding:0; height:440px;	}');
JOURNEE('#island #container .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/insel4.jpg); padding:0; height:440px;	}');
JOURNEE('#island #container .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/insel5.jpg); padding:0; height:440px;	}');

//--- Batiment des Dieux / Temple ----
JOURNEE('#island #container #mainview #islandfeatures .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder1.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder2.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder3.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder4.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder5.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder6.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder7.png);	}');
JOURNEE('#island #container #mainview #islandfeatures .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/temple/wonder8.png);	}');

//---- Ressource / Exploitation ----
JOURNEE('#island #container #mainview #islandfeatures .marble a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/ress/resource_marble.png);		width:100px; height:76px;	}');
JOURNEE('#island #container #mainview #islandfeatures .wood a {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/ress/resource_wood.png);		width:67px;  height:63px;	}');
JOURNEE('#island #container #mainview #islandfeatures .wine a {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/ress/resource_wine.png);		width:100px; height:76px;	}');
JOURNEE('#island #container #mainview #islandfeatures .crystal a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/ress/resource_glass.png);		width:100px; height:76px;	}');
JOURNEE('#island #container #mainview #islandfeatures .sulfur a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/JOURNEE/ile/ress//resource_sulfur.png);	width:100px; height:76px;	}');

// -------------------------------------------------
// ---------- Fin du Script Pour le jour -----------
// -------------------------------------------------




// ---------------------------------------------------
// ---------------------- NUIT -----------------------
// ---------------------------------------------------
// ---------- Debut du Script Pour la Nuit -----------
// ---------------------------------------------------


//----------- Autres ---------
//
//----- Petit Drapeau ----
NUIT('#city #container #mainview #locations .land .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/flag_red.gif);	}');
NUIT('#city #container #mainview #locations .shore .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/flag_blue.gif);	}');
NUIT('#city #container #mainview #locations .wall .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/flag_yellow.gif);	}');
NUIT('#island #container #mainview #cities .buildplace .claim {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/flag_yellow.gif);	width:29px; height:40px; display:block; position:absolute; left:26px; bottom:20px;	}');

//----- Layout ----
NUIT('#militaryAdvisorDetailedReportView #container #container2 #header {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/layout/bg_header2.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
NUIT('#header {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/layout/bg_header.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
NUIT('#extraDiv1 {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/layout/bg_sky.jpg)	repeat top center;z-index:1	}');
NUIT('#extraDiv2 {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/layout/bg_ocean.jpg)	repeat top center;z-index:1	}');


//--------- Villes ---------
//
//-------------------------------- Arriere Plan (Phase) --------------------------------
NUIT('#city #container .phase1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level1.jpg);	}');
NUIT('#city #container .phase2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level2.jpg);	}');
NUIT('#city #container .phase3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level3.jpg);	}');
NUIT('#city #container .phase4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level4.jpg);	}');
NUIT('#city #container .phase5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level5.jpg);	}');
NUIT('#city #container .phase6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level6.jpg);	}');
NUIT('#city #container .phase7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level7.jpg);	}');
NUIT('#city #container .phase8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level8.jpg);	}');
NUIT('#city #container .phase9 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level9.jpg);	}');
NUIT('#city #container .phase10 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level10.jpg);	}');
NUIT('#city #container .phase11 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level11.jpg);	}');
NUIT('#city #container .phase12 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level12.jpg);	}');
NUIT('#city #container .phase13 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level13.jpg);	}');
NUIT('#city #container .phase14 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level14.jpg);	}');
NUIT('#city #container .phase15 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level15.jpg);	}');
NUIT('#city #container .phase16 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level16.jpg);	}');
NUIT('#city #container .phase17 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level17.jpg);	}');
NUIT('#city #container .phase18 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level18.jpg);	}');
NUIT('#city #container .phase19 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level19.jpg);	}');
NUIT('#city #container .phase20 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level20.jpg);	}');
NUIT('#city #container .phase21 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level21.jpg);	}');
NUIT('#city #container .phase22 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level22.jpg);	}');
NUIT('#city #container .phase23 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level23.jpg);	}');
NUIT('#city #container .phase24 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level24.jpg);	}');
NUIT('#city #container .phase25 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level25.jpg);	}');
NUIT('#city #container .phase26 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/city_level26.jpg);	}');

//-------------------------------- Rallongement Phases (Sous-Phase) --------------------------------
NUIT('#city #container .phase1 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase2 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase3 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase4 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase5 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase6 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase7 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase8 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase9 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase10 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase11 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase12 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase13 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase14 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase15 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase16 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase17 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase18 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase19 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase20 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase21 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase22 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase23 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase24 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase25 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');
NUIT('#city #container .phase26 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');

//----------------------------------- Batiment --------------------------------
NUIT('#city #container #mainview #locations .shipyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/chantier_naval.png);		left:-022px; top:-20px; width:129px; height:100px;	}');
NUIT('#city #container #mainview #locations .museum .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/musee.png);				left:-008px; top:-38px; width:105px; height:85px;	}');
NUIT('#city #container #mainview #locations .warehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/entrepot.png);				left:-018px; top:-33px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .wall .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/mur.png);					left:-500px; top:-15px; width:720px; height:137px;	}');
NUIT('#city #container #mainview #locations .tavern .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/taverne.png);				left:-010px; top:-15px; width:111px; height:65px;	}');
NUIT('#city #container #mainview #locations .palace .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/palais.png);				left:-010px; top:-42px; width:106px; height:97px;	}');
NUIT('#city #container #mainview #locations .academy .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/academie.png);				left:-019px; top:-31px; width:123px; height:90px;	}');
NUIT('#city #container #mainview #locations .workshop .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/atelier.png);				left:-019px; top:-31px; width:106px; height:85px;	}');
NUIT('#city #container #mainview #locations .safehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/cachette.png);				left:-005px; top:-15px; width:084px; height:58px;	}');
NUIT('#city #container #mainview #locations .branchOffice .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/comptoir.png);				left:-019px; top:-31px; width:109px; height:84px;	}');
NUIT('#city #container #mainview #locations .embassy .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/ambassade.png);			left:-005px; top:-31px; width:093px; height:85px;	}');
NUIT('#city #container #mainview #locations .palaceColony .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/residence.png);			left:-010px; top:-42px; width:109px; height:95px;	}');
NUIT('#city #container #mainview #locations .townHall .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/1.4.8.png);				left:-005px; top:-60px; width:104px; height:106px;	}');
NUIT('#city #container #mainview #locations .barracks .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/caserne.png);				left:-000px; top:-33px; width:100px; height:76px;	}');
NUIT('#city #container #mainview #locations .port .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/port.png);					left:-065px; top:-35px; width:163px; height:138px;	}');
NUIT('#city #container #mainview #locations .wall .constructionSite {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/construction2.png);		left:-500px; top:-15px; width:720px; height:137px;	}');
NUIT('#city #container #mainview #locations li .constructionSite { 			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/construction.png);			left:-020px; top:-30px; width:114px; height:81px;	}');
NUIT('#city #container #mainview #locations .alchemist .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/alchimiste.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .architect .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/bureau_architecte.png);	left:-020px; top:-33px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .optician .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/opticien.png);				left:-017px; top:-44px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .stonemason .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/atelier_marbre.png);		left:-020px; top:-33px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .winegrower .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/cave_vin.png);				left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .vineyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/pressoir.png);				left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .carpentering .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/menuiserie.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .fireworker .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/atelier_soufre.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .forester .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/atelier_bois.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .glassblowing .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/atelier_cristal.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
NUIT('#city #container #mainview #locations .temple .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/batiment/temple.png);				left:+005px; top:-23px; width:069px; height:67px;	}');

//-------------------- Transporteur, garnison, Emeute, Nageurs et Spectacle -------------------
NUIT('#city #container #mainview #locations .transporter {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/transporteur.png);	}');
NUIT('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/garnison.png);	}');
NUIT('#city #container #mainview #locations .garnisonOutpost {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/garnison_outpost.png);	}');
NUIT('#city #container #mainview #locations .protester {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/emeute.png) left:342px; top:192px;	;}');
NUIT('#city #container #mainview #locations .beachboys {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/nageurs.png);	}');
NUIT('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys, #city #container #mainview.phase28 #locations .beachboys, #city #container #mainview.phase29 #locations .beachboys, #city #container #mainview.phase30 #locations .beachboys, #city #container #mainview.phase31 #locations .beachboys, #city #container #mainview.phase32 #locations .beachboys {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/nageurs24.png);	}');
NUIT('#city #container #mainview #locations .occupier1 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/town_occ1.gif);	}');
NUIT('#city #container #mainview #locations .occupier2 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/town_occ1.gif);	}');
NUIT('#city #container #mainview #locations .occupierGate1 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/town_occ1.gif);	}');
NUIT('#city #container #mainview #locations .occupierGate2 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/town_occ2.gif);	}');
NUIT('#city #container #mainview #locations .occupierBeach {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/town_occ2.gif);	}');
NUIT('#city #container #mainview #theatre {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; margin-top: -156px; margin-left:0px;	}');


//--------- Iles ---------
//
//----- Fight Terre -----
NUIT('#island #container #mainview #cities div.foreignOccupier {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_hold_red.gif)	21px 47px;	}');
NUIT('#island #container #mainview #cities div.ownOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_hold_blue.gif)	21px 47px;	}');
NUIT('#island #container #mainview #cities div.allyOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_hold_green.gif)	21px 47px;	}');
NUIT('#island #container #mainview #cities div.treatyOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_hold_yellow.gif)	21px 47px;	}');

NUIT('#island #container #mainview #cities div.fight {				background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_fight_town.gif);	}');

//----- Fight Mer -----
NUIT('#island #container #mainview #cities div.foreignBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/port_hold_red.png)	no-repeat 2px 2px;	}');
NUIT('#island #container #mainview #cities div.ownBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/port_hold_blue.png)	no-repeat 2px 2px;	}');
NUIT('#island #container #mainview #cities div.allyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/port_hold_green.png)	no-repeat 2px 2px;	}');
NUIT('#island #container #mainview #cities div.treatyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/port_hold_yellow.png)	no-repeat 2px 2px;	}');

NUIT('#island #container #mainview #cities div.seafight {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/fight/city_fight_port.png)	no-repeat 2px 2px;	}');

//----- Arrière Plan (Iles) -----
NUIT('#island #container .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/insel1.jpg); padding:0; height:440px;	}');
NUIT('#island #container .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/insel2.jpg); padding:0; height:440px;	}');
NUIT('#island #container .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/insel3.jpg); padding:0; height:440px;	}');
NUIT('#island #container .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/insel4.jpg); padding:0; height:440px;	}');
NUIT('#island #container .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/insel5.jpg); padding:0; height:440px;	}');

//---- Villages Barbares, Forum et leur sélection ----
NUIT('#island .island1 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
NUIT('#island .island2 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
NUIT('#island .island3 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
NUIT('#island .island4 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
NUIT('#island .island5 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
NUIT('#island .island1 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_barbares.gif)	}');
NUIT('#island .island2 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_barbares.gif)	}');
NUIT('#island .island3 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_barbares.gif)	}');
NUIT('#island .island4 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_barbares.gif)	}');
NUIT('#island .island5 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_barbares.gif)	}');
NUIT('#island .island1 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/forum.gif)	}');
NUIT('#island .island2 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/forum.gif)	}');
NUIT('#island .island3 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/forum.gif)	}');
NUIT('#island .island4 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/forum.gif)	}');
NUIT('#island .island5 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/forum.gif)	}');

//---- Les Villes sur l'ile (Rouge) ----
NUIT('#island #container #mainview #cities .level1 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_1_red.gif) no-repeat 13px 10px;	}');
NUIT('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_2_red.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_3_red.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_4_red.gif) no-repeat 11px 13px;	}');
NUIT('#island #container #mainview #cities .level10 div.cityimg, #island #container #mainview #cities .level11 div.cityimg, #island #container #mainview #cities .level12 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_5_red.gif) no-repeat 8px 13px;	}');
NUIT('#island #container #mainview #cities .level13 div.cityimg, #island #container #mainview #cities .level14 div.cityimg, #island #container #mainview #cities .level15 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_6_red.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level16 div.cityimg, #island #container #mainview #cities .level17 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_7_red.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level18 div.cityimg, #island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg,#island #container #mainview #cities .level25 div.cityimg,#island #container #mainview #cities .level26 div.cityimg,#island #container #mainview #cities .level27 div.cityimg,#island #container #mainview #cities .level28 div.cityimg,#island #container #mainview #cities .level29 div.cityimg,#island #container #mainview #cities .level30 div.cityimg,#island #container #mainview #cities .level31 div.cityimg,#island #container #mainview #cities .level32 div.cityimg {background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_8_red.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Bleu) ----
NUIT('#island #container #mainview #cities .level1 div.ownCityImg  {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_1_blue.gif) no-repeat 13px 10px;	}');
NUIT('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_2_blue.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg,	#island #container #mainview #cities .level6 div.ownCityImg {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_3_blue.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg,	#island #container #mainview #cities .level9 div.ownCityImg {		background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_4_blue.gif) no-repeat 11px 13px;	}');
NUIT('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_5_blue.gif) no-repeat 8px 13px;	}');
NUIT('#island #container #mainview #cities .level13 div.ownCityImg, #island #container #mainview #cities .level14 div.ownCityImg, #island #container #mainview #cities .level15 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_6_blue.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_7_blue.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg,#island #container #mainview #cities .level25 div.ownCityImg,#island #container #mainview #cities .level26 div.ownCityImg,#island #container #mainview #cities .level27 div.ownCityImg,#island #container #mainview #cities .level28 div.ownCityImg,#island #container #mainview #cities .level29 div.ownCityImg,#island #container #mainview #cities .level30 div.ownCityImg,#island #container #mainview #cities .level31 div.ownCityImg,#island #container #mainview #cities .level32 div.ownCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_8_blue.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Vert) ----
NUIT('#island #container #mainview #cities .level1 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_1_green.gif) no-repeat 13px 10px;	}');
NUIT('#island #container #mainview #cities .level2 div.allyCityImg, #island #container #mainview #cities .level3 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_2_green.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_3_green.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_4_green.gif) no-repeat 11px 13px;	}');
NUIT('#island #container #mainview #cities .level10 div.allyCityImg, #island #container #mainview #cities .level11 div.allyCityImg, #island #container #mainview #cities .level12 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_5_green.gif) no-repeat 8px 13px;	}');
NUIT('#island #container #mainview #cities .level13 div.allyCityImg, #island #container #mainview #cities .level14 div.allyCityImg, #island #container #mainview #cities .level15 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_6_green.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_7_green.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level18 div.allyCityImg, #island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg,#island #container #mainview #cities .level25 div.allyCityImg,#island #container #mainview #cities .level26 div.allyCityImg,#island #container #mainview #cities .level27 div.allyCityImg,#island #container #mainview #cities .level28 div.allyCityImg,#island #container #mainview #cities .level29 div.allyCityImg,#island #container #mainview #cities .level30 div.allyCityImg,#island #container #mainview #cities .level31 div.allyCityImg,#island #container #mainview #cities .level32 div.allyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_8_green.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Jaune) ----
NUIT('#island #container #mainview #cities .level1 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_1_yellow.gif) no-repeat 13px 10px;	}');
NUIT('#island #container #mainview #cities .level2 div.treatyCityImg, #island #container #mainview #cities .level3 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_2_yellow.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level4 div.treatyCityImg, #island #container #mainview #cities .level5 div.treatyCityImg, #island #container #mainview #cities .level6 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_3_yellow.gif) no-repeat 13px 13px;	}');
NUIT('#island #container #mainview #cities .level7 div.treatyCityImg, #island #container #mainview #cities .level8 div.treatyCityImg, #island #container #mainview #cities .level9 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_4_yellow.gif) no-repeat 11px 13px;	}');
NUIT('#island #container #mainview #cities .level10 div.treatyCityImg, #island #container #mainview #cities .level11 div.treatyCityImg, #island #container #mainview #cities .level12 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_5_yellow.gif) no-repeat 8px 13px;	}');
NUIT('#island #container #mainview #cities .level13 div.treatyCityImg, #island #container #mainview #cities .level14 div.treatyCityImg, #island #container #mainview #cities .level15 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_6_yellow.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level16 div.treatyCityImg, #island #container #mainview #cities .level17 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_7_yellow.gif) no-repeat 4px 7px;	}');
NUIT('#island #container #mainview #cities .level18 div.treatyCityImg, #island #container #mainview #cities .level19 div.treatyCityImg, #island #container #mainview #cities .level20 div.treatyCityImg,#island #container #mainview #cities .level21 div.treatyCityImg,#island #container #mainview #cities .level22 div.treatyCityImg,#island #container #mainview #cities .level23 div.treatyCityImg,#island #container #mainview #cities .level24 div.treatyCityImg,#island #container #mainview #cities .level25 div.treatyCityImg,#island #container #mainview #cities .level26 div.treatyCityImg,#island #container #mainview #cities .level27 div.treatyCityImg,#island #container #mainview #cities .level28 div.treatyCityImg,#island #container #mainview #cities .level29 div.treatyCityImg,#island #container #mainview #cities .level30 div.treatyCityImg,#island #container #mainview #cities .level31 div.treatyCityImg,#island #container #mainview #cities .level32 div.treatyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/city_8_yellow.gif) no-repeat 2px 4px;	}');

//--- Batiment des Dieux / Temple ----
NUIT('#island #container #mainview #islandfeatures .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder1.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder2.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder3.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder4.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder5.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder6.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder7.png);	}');
NUIT('#island #container #mainview #islandfeatures .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/temple/wonder8.png);	}');

//---- Ressource / Exploitation ----
NUIT('#island #container #mainview #islandfeatures .marble a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/ress/resource_marble.png);	width:100px; height:76px;	}');
NUIT('#island #container #mainview #islandfeatures .wood a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/ress/resource_wood.png);		width:67px;  height:63px;	}');
NUIT('#island #container #mainview #islandfeatures .wine a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/ress/resource_wine.png);		width:100px; height:76px;	}');
NUIT('#island #container #mainview #islandfeatures .crystal a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/ress/resource_glass.png);		width:100px; height:76px;	}');
NUIT('#island #container #mainview #islandfeatures .sulfur a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/ress//resource_sulfur.png);	width:100px; height:76px;	}');

//--- Selectioneur & Colonie ---
NUIT('#island #container #mainview #cities .selectimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/select_city.gif); width:81px; height:55px; position:absolute; top:18px; left:-7px;	}');
NUIT('#island #container #mainview #cities .level0 div.buildCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/ile/city/site_colonie.gif) no-repeat 0px 0px;	}');


//------ Monde --------
//
//--- Ile, Ocean et Ocean Anim ----
NUIT('#worldmap_iso #scrollcover {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/bg_ocean.gif) !important;	}');
NUIT('#worldmap_iso #worldmap .ocean1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_01.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_02.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_03.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean_feature1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_anim_01.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean_feature2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_anim_02.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean_feature3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_anim_03.gif);	}');
NUIT('#worldmap_iso #worldmap .ocean_feature4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/ocean_anim_04.gif);	}');

NUIT('#worldmap_iso #worldmap .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01.gif);	}');
NUIT('#worldmap_iso #worldmap .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02.gif);	}');
NUIT('#worldmap_iso #worldmap .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03.gif);	}');
NUIT('#worldmap_iso #worldmap .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04.gif);	}');
NUIT('#worldmap_iso #worldmap .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05.gif);	}');
NUIT('#worldmap_iso #worldmap .island6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01.gif);	}');
NUIT('#worldmap_iso #worldmap .island7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02.gif);	}');
NUIT('#worldmap_iso #worldmap .island8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03.gif);	}');
NUIT('#worldmap_iso #worldmap .island9 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04.gif);	}');
NUIT('#worldmap_iso #worldmap .island10 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05.gif);	}');

NUIT('#worldmap_iso #worldmap .island1own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island2own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island3own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island4own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island5own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island6own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island7own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island8own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island9own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_blue.gif);	}');
NUIT('#worldmap_iso #worldmap .island10own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_blue.gif);	}');

NUIT('#worldmap_iso #worldmap .island1ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island2ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island3ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island4ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island5ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island6ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island7ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island8ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island9ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_green.gif);	}');
NUIT('#worldmap_iso #worldmap .island10ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_green.gif);	}');

NUIT('#worldmap_iso #worldmap .island1treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island2treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island3treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island4treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island5treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island6treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_01_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island7treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_02_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island8treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_03_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island9treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_04_yellow.gif);	}');
NUIT('#worldmap_iso #worldmap .island10treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/island_05_yellow.gif);	}');

//--- Batiment des Dieux / Temple ----
NUIT('#worldmap_iso #worldmap .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w1.gif);	width:19px;	height:30px;	}');
NUIT('#worldmap_iso #worldmap .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w2.gif);	width:21px;	height:27px;	}');
NUIT('#worldmap_iso #worldmap .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w3.gif);	width:23px;	height:27px;	}');
NUIT('#worldmap_iso #worldmap .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w4.gif);	width:18px;	height:44px;	}');
NUIT('#worldmap_iso #worldmap .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w5.gif);	width:17px;	height:43px;	}');
NUIT('#worldmap_iso #worldmap .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w6.gif);	width:19px;	height:39px;	}');
NUIT('#worldmap_iso #worldmap .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w7.gif);	width:23px;	height:28px;	}');
NUIT('#worldmap_iso #worldmap .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/NUIT/monde/temple/w8.gif);	width:19px;	height:45px;	}');

// -------------------------------------------------
// ---------- Fin du Script Pour la Nuit -----------
// -------------------------------------------------




// ---------------------------------------------------
// ---------------------- AUBE -----------------------
// ---------------------------------------------------
// ---------- Debut du Script Pour l'Aube ------------
// ---------------------------------------------------


//----------- Autres ---------
//
//----- Petit Drapeau ----
AUBE('#city #container #mainview #locations .land .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/flag_red.gif);	}');
AUBE('#city #container #mainview #locations .shore .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/flag_blue.gif);	}');
AUBE('#city #container #mainview #locations .wall .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/flag_yellow.gif);	}');
AUBE('#island #container #mainview #cities .buildplace .claim {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/flag_yellow.gif); width:29px; height:40px; display:block; position:absolute; left:26px; bottom:20px;	}');

//----- Layout ----
AUBE('#militaryAdvisorDetailedReportView #container #container2 #header {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/layout/bg_header2.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
AUBE('#header {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/layout/bg_header.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
AUBE('#extraDiv1 {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/layout/bg_sky.jpg)		repeat top center;z-index:1	}');
AUBE('#extraDiv2 {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/layout/bg_ocean.jpg)	repeat top center;z-index:1	}');


//--------- Villes ---------
//
//-------------------------------- Arriere Plan (Phase) --------------------------------
AUBE('#city #container .phase1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level1.jpg);	}');
AUBE('#city #container .phase2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level2.jpg);	}');
AUBE('#city #container .phase3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level3.jpg);	}');
AUBE('#city #container .phase4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level4.jpg);	}');
AUBE('#city #container .phase5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level5.jpg);	}');
AUBE('#city #container .phase6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level6.jpg);	}');
AUBE('#city #container .phase7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level7.jpg);	}');
AUBE('#city #container .phase8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level8.jpg);	}');
AUBE('#city #container .phase9 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level9.jpg);	}');
AUBE('#city #container .phase10 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level10.jpg);	}');
AUBE('#city #container .phase11 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level11.jpg);	}');
AUBE('#city #container .phase12 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level12.jpg);	}');
AUBE('#city #container .phase13 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level13.jpg);	}');
AUBE('#city #container .phase14 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level14.jpg);	}');
AUBE('#city #container .phase15 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level15.jpg);	}');
AUBE('#city #container .phase16 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level16.jpg);	}');
AUBE('#city #container .phase17 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level17.jpg);	}');
AUBE('#city #container .phase18 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level18.jpg);	}');
AUBE('#city #container .phase19 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level19.jpg);	}');
AUBE('#city #container .phase20 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level20.jpg);	}');
AUBE('#city #container .phase21 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level21.jpg);	}');
AUBE('#city #container .phase22 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level22.jpg);	}');
AUBE('#city #container .phase23 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level23.jpg);	}');
AUBE('#city #container .phase24 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level24.jpg);	}');
AUBE('#city #container .phase25 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level25.jpg);	}');
AUBE('#city #container .phase26 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/city_level26.jpg);	}');

//-------------------------------- Rallongement Phases (Sous-Phase) --------------------------------
AUBE('#city #container .phase1 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase2 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase3 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase4 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase5 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase6 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase7 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase8 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase9 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase10 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase11 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase12 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase13 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase14 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase15 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase16 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase17 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase18 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase19 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase20 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase21 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase22 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase23 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase24 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase25 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
AUBE('#city #container .phase26 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />

//----------------------------------- Batiment --------------------------------
AUBE('#city #container #mainview #locations .shipyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/chantier_naval.png);		left:-022px; top:-20px; width:129px; height:100px;	}');
AUBE('#city #container #mainview #locations .museum .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/musee.png);				left:-008px; top:-38px; width:105px; height:85px;	}');
AUBE('#city #container #mainview #locations .warehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/entrepot.png);				left:-018px; top:-33px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .wall .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/mur.png);					left:-500px; top:-15px; width:720px; height:137px;	}');
AUBE('#city #container #mainview #locations .tavern .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/taverne.png);				left:-010px; top:-15px; width:111px; height:65px;	}');
AUBE('#city #container #mainview #locations .palace .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/palais.png);				left:-010px; top:-42px; width:106px; height:97px;	}');
AUBE('#city #container #mainview #locations .academy .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/academie.png);				left:-019px; top:-31px; width:123px; height:90px;	}');
AUBE('#city #container #mainview #locations .workshop .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/atelier.png);				left:-019px; top:-31px; width:106px; height:85px;	}');
AUBE('#city #container #mainview #locations .safehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/cachette.png);				left:-005px; top:-15px; width:084px; height:58px;	}');
AUBE('#city #container #mainview #locations .branchOffice .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/comptoir.png);				left:-019px; top:-31px; width:109px; height:84px;	}');
AUBE('#city #container #mainview #locations .embassy .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/ambassade.png);			left:-005px; top:-31px; width:093px; height:85px;	}');
AUBE('#city #container #mainview #locations .palaceColony .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/residence.png);			left:-010px; top:-42px; width:109px; height:95px;	}');
AUBE('#city #container #mainview #locations .townHall .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/1.4.8.png);				left:-005px; top:-60px; width:104px; height:106px;	}');
AUBE('#city #container #mainview #locations .barracks .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/caserne.png);				left:-000px; top:-33px; width:100px; height:76px;	}');
AUBE('#city #container #mainview #locations .port .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/port.png);					left:-065px; top:-35px; width:163px; height:138px;	}');
AUBE('#city #container #mainview #locations .wall .constructionSite {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/construction2.png);		left:-500px; top:-15px; width:720px; height:137px;	}');
AUBE('#city #container #mainview #locations li .constructionSite { 			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/construction.png);			left:-020px; top:-30px; width:114px; height:81px;	}');
AUBE('#city #container #mainview #locations .alchemist .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/alchimiste.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .architect .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/bureau_architecte.png);	left:-020px; top:-33px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .optician .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/opticien.png);				left:-017px; top:-44px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .stonemason .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/atelier_marbre.png);		left:-020px; top:-33px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .winegrower .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/cave_vin.png);				left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .vineyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/pressoir.png);				left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .carpentering .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/menuiserie.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .fireworker .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/atelier_soufre.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .forester .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/atelier_bois.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .glassblowing .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/atelier_cristal.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
AUBE('#city #container #mainview #locations .temple .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/batiment/temple.png);				left:+005px; top:-23px; width:069px; height:67px;	}');

//-------------------- Transporteur, garnison, Emeute, Nageurs  et Spectacle -------------------
AUBE('#city #container #mainview #locations .transporter {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/transporteur.png);	}');
AUBE('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/garnison.png);	}');
AUBE('#city #container #mainview #locations .garnisonOutpost {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/garnison_outpost.png);	}');
AUBE('#city #container #mainview #locations .protester {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/emeute.png); left:342px; top:192px;	}');
AUBE('#city #container #mainview #locations .beachboys {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/nageurs.png);	}');
AUBE('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys, #city #container #mainview.phase28 #locations .beachboys, #city #container #mainview.phase29 #locations .beachboys, #city #container #mainview.phase30 #locations .beachboys, #city #container #mainview.phase31 #locations .beachboys, #city #container #mainview.phase32 #locations .beachboys {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/nageurs24.png);	}');
AUBE('#city #container #mainview #locations .occupier1 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/town_occ1.gif);	}');
AUBE('#city #container #mainview #locations .occupier2 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/town_occ1.gif);	}');
AUBE('#city #container #mainview #locations .occupierGate1 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/town_occ1.gif);	}');
AUBE('#city #container #mainview #locations .occupierGate2 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/town_occ2.gif);	}');
AUBE('#city #container #mainview #locations .occupierBeach {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/town_occ2.gif);	}');
AUBE('#city #container #mainview #theatre {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; margin-top: -156px; margin-left:0px;	}');


//--------- Iles ---------
//
//----- Fight Terre -----
AUBE('#island #container #mainview #cities div.foreignOccupier {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_hold_red.gif)	21px 47px;	}');
AUBE('#island #container #mainview #cities div.ownOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_hold_blue.gif)	21px 47px;	}');
AUBE('#island #container #mainview #cities div.allyOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_hold_green.gif)	21px 47px;	}');
AUBE('#island #container #mainview #cities div.treatyOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_hold_yellow.gif)	21px 47px;	}');

AUBE('#island #container #mainview #cities div.fight {				background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_fight_town.gif);	}');

//----- Fight Mer -----
AUBE('#island #container #mainview #cities div.foreignBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/port_hold_red.png)	no-repeat 2px 2px;	}');
AUBE('#island #container #mainview #cities div.ownBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/port_hold_blue.png)	no-repeat 2px 2px;	}');
AUBE('#island #container #mainview #cities div.allyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/port_hold_green.png)	no-repeat 2px 2px;	}');
AUBE('#island #container #mainview #cities div.treatyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/port_hold_yellow.png)	no-repeat 2px 2px;	}');

AUBE('#island #container #mainview #cities div.seafight {		background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/fight/city_fight_port.png)	no-repeat 2px 2px;	}');

//----- Arrière Plan (Iles) -----
AUBE('#island #container .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/insel1.jpg); padding:0; height:440px;	}');
AUBE('#island #container .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/insel2.jpg); padding:0; height:440px;	}');
AUBE('#island #container .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/insel3.jpg); padding:0; height:440px;	}');
AUBE('#island #container .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/insel4.jpg); padding:0; height:440px;	}');
AUBE('#island #container .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/insel5.jpg); padding:0; height:440px;	}');

//---- Villages Barbares, Forum et leur sélection ----
AUBE('#island .island1 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
AUBE('#island .island2 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
AUBE('#island .island3 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
AUBE('#island .island4 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
AUBE('#island .island5 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
AUBE('#island .island1 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_barbares.gif)	}');
AUBE('#island .island2 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_barbares.gif)	}');
AUBE('#island .island3 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_barbares.gif)	}');
AUBE('#island .island4 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_barbares.gif)	}');
AUBE('#island .island5 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_barbares.gif)	}');
AUBE('#island .island1 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/forum.gif)	}');
AUBE('#island .island2 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/forum.gif)	}');
AUBE('#island .island3 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/forum.gif)	}');
AUBE('#island .island4 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/forum.gif)	}');
AUBE('#island .island5 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/forum.gif)	}');

//---- Les Villes sur l'ile (Rouge) ----
AUBE('#island #container #mainview #cities .level1 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_1_red.gif) no-repeat 13px 10px;	}');
AUBE('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_2_red.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_3_red.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_4_red.gif) no-repeat 11px 13px;	}');
AUBE('#island #container #mainview #cities .level10 div.cityimg, #island #container #mainview #cities .level11 div.cityimg, #island #container #mainview #cities .level12 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_5_red.gif) no-repeat 8px 13px;	}');
AUBE('#island #container #mainview #cities .level13 div.cityimg, #island #container #mainview #cities .level14 div.cityimg, #island #container #mainview #cities .level15 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_6_red.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level16 div.cityimg, #island #container #mainview #cities .level17 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_7_red.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level18 div.cityimg, #island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg,#island #container #mainview #cities .level25 div.cityimg,#island #container #mainview #cities .level26 div.cityimg,#island #container #mainview #cities .level27 div.cityimg,#island #container #mainview #cities .level28 div.cityimg,#island #container #mainview #cities .level29 div.cityimg,#island #container #mainview #cities .level30 div.cityimg,#island #container #mainview #cities .level31 div.cityimg,#island #container #mainview #cities .level32 div.cityimg {background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_8_red.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Bleu) ----
AUBE('#island #container #mainview #cities .level1 div.ownCityImg  {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_1_blue.gif) no-repeat 13px 10px;	}');
AUBE('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_2_blue.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg,	#island #container #mainview #cities .level6 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_3_blue.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg,	#island #container #mainview #cities .level9 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_4_blue.gif) no-repeat 11px 13px;	}');
AUBE('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_5_blue.gif) no-repeat 8px 13px;	}');
AUBE('#island #container #mainview #cities .level13 div.ownCityImg, #island #container #mainview #cities .level14 div.ownCityImg, #island #container #mainview #cities .level15 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_6_blue.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_7_blue.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg,#island #container #mainview #cities .level25 div.ownCityImg,#island #container #mainview #cities .level26 div.ownCityImg,#island #container #mainview #cities .level27 div.ownCityImg,#island #container #mainview #cities .level28 div.ownCityImg,#island #container #mainview #cities .level29 div.ownCityImg,#island #container #mainview #cities .level30 div.ownCityImg,#island #container #mainview #cities .level31 div.ownCityImg,#island #container #mainview #cities .level32 div.ownCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_8_blue.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Vert) ----
AUBE('#island #container #mainview #cities .level1 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_1_green.gif) no-repeat 13px 10px;	}');
AUBE('#island #container #mainview #cities .level2 div.allyCityImg, #island #container #mainview #cities .level3 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_2_green.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_3_green.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_4_green.gif) no-repeat 11px 13px;	}');
AUBE('#island #container #mainview #cities .level10 div.allyCityImg, #island #container #mainview #cities .level11 div.allyCityImg, #island #container #mainview #cities .level12 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_5_green.gif) no-repeat 8px 13px;	}');
AUBE('#island #container #mainview #cities .level13 div.allyCityImg, #island #container #mainview #cities .level14 div.allyCityImg, #island #container #mainview #cities .level15 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_6_green.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_7_green.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level18 div.allyCityImg, #island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg,#island #container #mainview #cities .level25 div.allyCityImg,#island #container #mainview #cities .level26 div.allyCityImg,#island #container #mainview #cities .level27 div.allyCityImg,#island #container #mainview #cities .level28 div.allyCityImg,#island #container #mainview #cities .level29 div.allyCityImg,#island #container #mainview #cities .level30 div.allyCityImg,#island #container #mainview #cities .level31 div.allyCityImg,#island #container #mainview #cities .level32 div.allyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_8_green.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Jaune) ----
AUBE('#island #container #mainview #cities .level1 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_1_yellow.gif) no-repeat 13px 10px;	}');
AUBE('#island #container #mainview #cities .level2 div.treatyCityImg, #island #container #mainview #cities .level3 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_2_yellow.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level4 div.treatyCityImg, #island #container #mainview #cities .level5 div.treatyCityImg, #island #container #mainview #cities .level6 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_3_yellow.gif) no-repeat 13px 13px;	}');
AUBE('#island #container #mainview #cities .level7 div.treatyCityImg, #island #container #mainview #cities .level8 div.treatyCityImg, #island #container #mainview #cities .level9 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_4_yellow.gif) no-repeat 11px 13px;	}');
AUBE('#island #container #mainview #cities .level10 div.treatyCityImg, #island #container #mainview #cities .level11 div.treatyCityImg, #island #container #mainview #cities .level12 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_5_yellow.gif) no-repeat 8px 13px;	}');
AUBE('#island #container #mainview #cities .level13 div.treatyCityImg, #island #container #mainview #cities .level14 div.treatyCityImg, #island #container #mainview #cities .level15 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_6_yellow.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level16 div.treatyCityImg, #island #container #mainview #cities .level17 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_7_yellow.gif) no-repeat 4px 7px;	}');
AUBE('#island #container #mainview #cities .level18 div.treatyCityImg, #island #container #mainview #cities .level19 div.treatyCityImg, #island #container #mainview #cities .level20 div.treatyCityImg,#island #container #mainview #cities .level21 div.treatyCityImg,#island #container #mainview #cities .level22 div.treatyCityImg,#island #container #mainview #cities .level23 div.treatyCityImg,#island #container #mainview #cities .level24 div.treatyCityImg,#island #container #mainview #cities .level25 div.treatyCityImg,#island #container #mainview #cities .level26 div.treatyCityImg,#island #container #mainview #cities .level27 div.treatyCityImg,#island #container #mainview #cities .level28 div.treatyCityImg,#island #container #mainview #cities .level29 div.treatyCityImg,#island #container #mainview #cities .level30 div.treatyCityImg,#island #container #mainview #cities .level31 div.treatyCityImg,#island #container #mainview #cities .level32 div.treatyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/city_8_yellow.gif) no-repeat 2px 4px;	}');

//--- Batiment des Dieux / Temple ----
AUBE('#island #container #mainview #islandfeatures .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder1.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder2.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder3.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder4.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder5.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder6.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder7.png);	}');
AUBE('#island #container #mainview #islandfeatures .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/temple/wonder8.png);	}');

//---- Ressource / Exploitation ----
AUBE('#island #container #mainview #islandfeatures .marble a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/ress/resource_marble.png);	width:100px; height:76px;	}');
AUBE('#island #container #mainview #islandfeatures .wood a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/ress/resource_wood.png);		width:67px;  height:63px;	}');
AUBE('#island #container #mainview #islandfeatures .wine a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/ress/resource_wine.png);		width:100px; height:76px;	}');
AUBE('#island #container #mainview #islandfeatures .crystal a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/ress/resource_glass.png);		width:100px; height:76px;	}');
AUBE('#island #container #mainview #islandfeatures .sulfur a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/ress//resource_sulfur.png);	width:100px; height:76px;	}');

//--- Selectioneur & Colonie ---
AUBE('#island #container #mainview #cities .selectimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/select_city.gif); width:81px; height:55px; position:absolute; top:18px; left:-7px;	}');
AUBE('#island #container #mainview #cities .level0 div.buildCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/ile/city/site_colonie.gif) no-repeat 0px 0px;	}');


//------ Monde --------
//
//--- Ile, Ocean et Ocean Anim ----
AUBE('#worldmap_iso #scrollcover {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/bg_ocean.gif) !important;	}');
AUBE('#worldmap_iso #worldmap .ocean1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_01.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_02.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_03.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean_feature1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_anim_01.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean_feature2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_anim_02.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean_feature3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_anim_03.gif);	}');
AUBE('#worldmap_iso #worldmap .ocean_feature4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/ocean_anim_04.gif);	}');

AUBE('#worldmap_iso #worldmap .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01.gif);		}');
AUBE('#worldmap_iso #worldmap .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02.gif);		}');
AUBE('#worldmap_iso #worldmap .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03.gif);		}');
AUBE('#worldmap_iso #worldmap .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04.gif);		}');
AUBE('#worldmap_iso #worldmap .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05.gif);		}');
AUBE('#worldmap_iso #worldmap .island6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01.gif);		}');
AUBE('#worldmap_iso #worldmap .island7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02.gif);		}');
AUBE('#worldmap_iso #worldmap .island8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03.gif);		}');
AUBE('#worldmap_iso #worldmap .island9 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04.gif);		}');
AUBE('#worldmap_iso #worldmap .island10 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05.gif);		}');

AUBE('#worldmap_iso #worldmap .island1own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island2own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island3own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island4own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island5own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island6own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island7own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island8own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island9own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_blue.gif);	}');
AUBE('#worldmap_iso #worldmap .island10own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_blue.gif);	}');

AUBE('#worldmap_iso #worldmap .island1ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island2ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island3ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island4ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island5ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island6ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island7ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island8ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island9ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_green.gif);	}');
AUBE('#worldmap_iso #worldmap .island10ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_green.gif);	}');

AUBE('#worldmap_iso #worldmap .island1treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island2treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island3treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island4treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island5treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island6treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_01_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island7treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_02_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island8treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_03_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island9treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_04_yellow.gif);	}');
AUBE('#worldmap_iso #worldmap .island10treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/island_05_yellow.gif);	}');

//--- Batiment des Dieux / Temple ----
AUBE('#worldmap_iso #worldmap .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w1.gif);	width:19px;	height:30px;	}');
AUBE('#worldmap_iso #worldmap .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w2.gif);	width:21px;	height:27px;	}');
AUBE('#worldmap_iso #worldmap .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w3.gif);	width:23px;	height:27px;	}');
AUBE('#worldmap_iso #worldmap .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w4.gif);	width:18px;	height:44px;	}');
AUBE('#worldmap_iso #worldmap .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w5.gif);	width:17px;	height:43px;	}');
AUBE('#worldmap_iso #worldmap .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w6.gif);	width:19px;	height:39px;	}');
AUBE('#worldmap_iso #worldmap .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w7.gif);	width:23px;	height:28px;	}');
AUBE('#worldmap_iso #worldmap .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/AUBE/monde/temple/w8.gif);	width:19px;	height:45px;	}');

// -------------------------------------------------
// ----------- Fin du Script Pour l'Aube -----------
// -------------------------------------------------




// ---------------------------------------------------
// ------------------- CREPUSCULE --------------------
// ---------------------------------------------------
// ---------- Debut du Script Pour le CrÃ©puscule -----
// ---------------------------------------------------


//----------- Autres ---------
//
//----- Petit Drapeau ----
CREPUSCULE('#city #container #mainview #locations .land .flag {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/flag_red.gif);	}');
CREPUSCULE('#city #container #mainview #locations .shore .flag {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/flag_blue.gif);	}');
CREPUSCULE('#city #container #mainview #locations .wall .flag {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/flag_yellow.gif);	}');
CREPUSCULE('#island #container #mainview #cities .buildplace .claim {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/flag_yellow.gif); width:29px; height:40px; display:block; position:absolute; left:26px; bottom:20px;	}');

//----- Layout ----
CREPUSCULE('#militaryAdvisorDetailedReportView #container #container2 #header {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/layout/bg_header2.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
CREPUSCULE('#header {		background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/layout/bg_header.jpg) #f3dcb6 no-repeat; position:relative; height:336px; margin:0 -132px -189px -132px;	}');
CREPUSCULE('#extraDiv1 {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/layout/bg_sky.jpg)	repeat top center;z-index:1	}');
CREPUSCULE('#extraDiv2 {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/layout/bg_ocean.jpg)	repeat top center;z-index:1	}');


//--------- Villes ---------
//
//-------------------------------- Arriere Plan (Phase) --------------------------------
CREPUSCULE('#city #container .phase1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level1.jpg);	}');
CREPUSCULE('#city #container .phase2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level2.jpg);	}');
CREPUSCULE('#city #container .phase3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level3.jpg);	}');
CREPUSCULE('#city #container .phase4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level4.jpg);	}');
CREPUSCULE('#city #container .phase5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level5.jpg);	}');
CREPUSCULE('#city #container .phase6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level6.jpg);	}');
CREPUSCULE('#city #container .phase7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level7.jpg);	}');
CREPUSCULE('#city #container .phase8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level8.jpg);	}');
CREPUSCULE('#city #container .phase9 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level9.jpg);	}');
CREPUSCULE('#city #container .phase10 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level10.jpg);	}');
CREPUSCULE('#city #container .phase11 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level11.jpg);	}');
CREPUSCULE('#city #container .phase12 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level12.jpg);	}');
CREPUSCULE('#city #container .phase13 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level13.jpg);	}');
CREPUSCULE('#city #container .phase14 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level14.jpg);	}');
CREPUSCULE('#city #container .phase15 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level15.jpg);	}');
CREPUSCULE('#city #container .phase16 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level16.jpg);	}');
CREPUSCULE('#city #container .phase17 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level17.jpg);	}');
CREPUSCULE('#city #container .phase18 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level18.jpg);	}');
CREPUSCULE('#city #container .phase19 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level19.jpg);	}');
CREPUSCULE('#city #container .phase20 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level20.jpg);	}');
CREPUSCULE('#city #container .phase21 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level21.jpg);	}');
CREPUSCULE('#city #container .phase22 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level22.jpg);	}');
CREPUSCULE('#city #container .phase23 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level23.jpg);	}');
CREPUSCULE('#city #container .phase24 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level24.jpg);	}');
CREPUSCULE('#city #container .phase25 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level25.jpg);	}');
CREPUSCULE('#city #container .phase26 { background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/city_level26.jpg);	}');

//-------------------------------- Rallongement Phases (Sous-Phase) --------------------------------
CREPUSCULE('#city #container .phase1 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase2 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase3 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase4 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase5 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase6 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase7 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase8 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase9 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase10 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase11 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase12 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase13 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level1.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase14 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase15 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase16 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase17 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level14.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase18 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase19 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase20 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase21 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase22 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level18.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase23 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase24 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase25 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />
CREPUSCULE('#city #container .phase26 #ikart table {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/overfooter/city_level23.jpg);	z-index: 100; width: 720px; height:337px; position: absolute;	}');<br />

//----------------------------------- Batiment --------------------------------
CREPUSCULE('#city #container #mainview #locations .shipyard .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/chantier_naval.png);		left:-022px; top:-20px; width:129px; height:100px;	}');
CREPUSCULE('#city #container #mainview #locations .museum .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/musee.png);				left:-008px; top:-38px; width:105px; height:85px;	}');
CREPUSCULE('#city #container #mainview #locations .warehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/entrepot.png);			left:-018px; top:-33px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .wall .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/mur.png);				left:-500px; top:-15px; width:720px; height:137px;	}');
CREPUSCULE('#city #container #mainview #locations .tavern .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/taverne.png);			left:-010px; top:-15px; width:111px; height:65px;	}');
CREPUSCULE('#city #container #mainview #locations .palace .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/palais.png);				left:-010px; top:-42px; width:106px; height:97px;	}');
CREPUSCULE('#city #container #mainview #locations .academy .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/academie.png);			left:-019px; top:-31px; width:123px; height:90px;	}');
CREPUSCULE('#city #container #mainview #locations .workshop .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/atelier.png);			left:-019px; top:-31px; width:106px; height:85px;	}');
CREPUSCULE('#city #container #mainview #locations .safehouse .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/cachette.png);			left:-005px; top:-15px; width:084px; height:58px;	}');
CREPUSCULE('#city #container #mainview #locations .branchOffice .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/comptoir.png);			left:-019px; top:-31px; width:109px; height:84px;	}');
CREPUSCULE('#city #container #mainview #locations .embassy .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/ambassade.png);			left:-005px; top:-31px; width:093px; height:85px;	}');
CREPUSCULE('#city #container #mainview #locations .palaceColony .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/residence.png);			left:-010px; top:-42px; width:109px; height:95px;	}');
CREPUSCULE('#city #container #mainview #locations .townHall .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/1.4.8.png);				left:-005px; top:-60px; width:104px; height:106px;	}');
CREPUSCULE('#city #container #mainview #locations .barracks .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/caserne.png);			left:-000px; top:-33px; width:100px; height:76px;	}');
CREPUSCULE('#city #container #mainview #locations .port .buildingimg {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/port.png);				left:-065px; top:-35px; width:163px; height:138px;	}');
CREPUSCULE('#city #container #mainview #locations .wall .constructionSite {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/construction2.png);		left:-500px; top:-15px; width:720px; height:137px;	}');
CREPUSCULE('#city #container #mainview #locations li .constructionSite { 		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/construction.png);		left:-020px; top:-30px; width:114px; height:81px;	}');
CREPUSCULE('#city #container #mainview #locations .alchemist .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/alchimiste.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .architect .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/bureau_architecte.png);	left:-020px; top:-33px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .optician .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/opticien.png);			left:-017px; top:-44px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .stonemason .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/atelier_marbre.png);		left:-020px; top:-33px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .winegrower .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/cave_vin.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .vineyard .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/pressoir.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .carpentering .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/menuiserie.png);			left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .fireworker .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/atelier_soufre.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .forester .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/atelier_bois.png);		left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .glassblowing .buildingimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/atelier_cristal.png);	left:-020px; top:-30px; width:126px; height:86px;	}');
CREPUSCULE('#city #container #mainview #locations .temple .buildingimg {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/batiment/temple.png);				left:+005px; top:-23px; width:069px; height:67px;	}');

//-------------------- Transporteur, garnison, Emeute, Nageurs et Spectacle -------------------
CREPUSCULE('#city #container #mainview #locations .transporter {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/transporteur.png);	}');
CREPUSCULE('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/garnison.png);	}');
CREPUSCULE('#city #container #mainview #locations .garnisonOutpost {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/garnison_outpost.png);	}');
CREPUSCULE('#city #container #mainview #locations .protester {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/emeute.png); left:342px; top:192px;	}');
CREPUSCULE('#city #container #mainview #locations .beachboys {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/nageurs.png);	}');
CREPUSCULE('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys, #city #container #mainview.phase28 #locations .beachboys, #city #container #mainview.phase29 #locations .beachboys, #city #container #mainview.phase30 #locations .beachboys, #city #container #mainview.phase31 #locations .beachboys, #city #container #mainview.phase32 #locations .beachboys {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/nageurs24.png);	}');
CREPUSCULE('#city #container #mainview #locations .occupier1 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/town_occ1.gif);	}');
CREPUSCULE('#city #container #mainview #locations .occupier2 {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/town_occ1.gif);	}');
CREPUSCULE('#city #container #mainview #locations .occupierGate1 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/town_occ1.gif);	}');
CREPUSCULE('#city #container #mainview #locations .occupierGate2 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/town_occ2.gif);	}');
CREPUSCULE('#city #container #mainview #locations .occupierBeach {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/town_occ2.gif);	}');
CREPUSCULE('#city #container #mainview #theatre {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; margin-top: -156px; margin-left:0px;	}');


//--------- Iles ---------
//
//----- Fight Terre -----
CREPUSCULE('#island #container #mainview #cities div.foreignOccupier {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_hold_red.gif)		21px 47px;	}');
CREPUSCULE('#island #container #mainview #cities div.ownOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_hold_blue.gif)		21px 47px;	}');
CREPUSCULE('#island #container #mainview #cities div.allyOccupier {		background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_hold_green.gif)	21px 47px;	}');
CREPUSCULE('#island #container #mainview #cities div.treatyOccupier {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_hold_yellow.gif)	21px 47px;	}');

CREPUSCULE('#island #container #mainview #cities div.fight {			background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_fight_town.gif);	}');

//----- Fight Mer -----
CREPUSCULE('#island #container #mainview #cities div.foreignBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/port_hold_red.png)		no-repeat 2px 2px;	}');
CREPUSCULE('#island #container #mainview #cities div.ownBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/port_hold_blue.png)		no-repeat 2px 2px;	}');
CREPUSCULE('#island #container #mainview #cities div.allyBlocker {		background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/port_hold_green.png)	no-repeat 2px 2px;	}');
CREPUSCULE('#island #container #mainview #cities div.treatyBlocker {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/port_hold_yellow.png)	no-repeat 2px 2px;	}');

CREPUSCULE('#island #container #mainview #cities div.seafight {			background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/fight/city_fight_port.png)	no-repeat 2px 2px;	}');

//----- Arrière Plan (Iles) -----
CREPUSCULE('#island #container .island1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/insel1.jpg); padding:0; height:440px;	}');
CREPUSCULE('#island #container .island2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/insel2.jpg); padding:0; height:440px;	}');
CREPUSCULE('#island #container .island3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/insel3.jpg); padding:0; height:440px;	}');
CREPUSCULE('#island #container .island4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/insel4.jpg); padding:0; height:440px;	}');
CREPUSCULE('#island #container .island5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/insel5.jpg); padding:0; height:440px;	}');

//---- Villages Barbares, Forum et leur sélection ----
CREPUSCULE('#island .island1 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
CREPUSCULE('#island .island2 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
CREPUSCULE('#island .island3 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
CREPUSCULE('#island .island4 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
CREPUSCULE('#island .island5 #barbarianVilliage {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/barbares.gif)	no-repeat 7px 1px;	}');
CREPUSCULE('#island .island1 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_barbares.gif)	}');
CREPUSCULE('#island .island2 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_barbares.gif)	}');
CREPUSCULE('#island .island3 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_barbares.gif)	}');
CREPUSCULE('#island .island4 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_barbares.gif)	}');
CREPUSCULE('#island .island5 #barbarianVilliage.selected a {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_barbares.gif)	}');
CREPUSCULE('#island .island1 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/forum.gif)	}');
CREPUSCULE('#island .island2 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/forum.gif)	}');
CREPUSCULE('#island .island3 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/forum.gif)	}');
CREPUSCULE('#island .island4 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/forum.gif)	}');
CREPUSCULE('#island .island5 #islandfeatures .forum {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/forum.gif)	}');

//---- Les Villes sur l'ile (Rouge) ----
CREPUSCULE('#island #container #mainview #cities .level1 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_1_red.gif) no-repeat 13px 10px;	}');
CREPUSCULE('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_2_red.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_3_red.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_4_red.gif) no-repeat 11px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level10 div.cityimg, #island #container #mainview #cities .level11 div.cityimg, #island #container #mainview #cities .level12 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_5_red.gif) no-repeat 8px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level13 div.cityimg, #island #container #mainview #cities .level14 div.cityimg, #island #container #mainview #cities .level15 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_6_red.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level16 div.cityimg, #island #container #mainview #cities .level17 div.cityimg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_7_red.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level18 div.cityimg, #island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg,#island #container #mainview #cities .level25 div.cityimg,#island #container #mainview #cities .level26 div.cityimg,#island #container #mainview #cities .level27 div.cityimg,#island #container #mainview #cities .level28 div.cityimg,#island #container #mainview #cities .level29 div.cityimg,#island #container #mainview #cities .level30 div.cityimg,#island #container #mainview #cities .level31 div.cityimg,#island #container #mainview #cities .level32 div.cityimg {background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_8_red.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Bleu) ----
CREPUSCULE('#island #container #mainview #cities .level1 div.ownCityImg  {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_1_blue.gif) no-repeat 13px 10px;	}');
CREPUSCULE('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_2_blue.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_3_blue.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_4_blue.gif) no-repeat 11px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_5_blue.gif) no-repeat 8px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level13 div.ownCityImg, #island #container #mainview #cities .level14 div.ownCityImg, #island #container #mainview #cities .level15 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_6_blue.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_7_blue.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg,#island #container #mainview #cities .level25 div.ownCityImg,#island #container #mainview #cities .level26 div.ownCityImg,#island #container #mainview #cities .level27 div.ownCityImg,#island #container #mainview #cities .level28 div.ownCityImg,#island #container #mainview #cities .level29 div.ownCityImg,#island #container #mainview #cities .level30 div.ownCityImg,#island #container #mainview #cities .level31 div.ownCityImg,#island #container #mainview #cities .level32 div.ownCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_8_blue.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Vert) ----
CREPUSCULE('#island #container #mainview #cities .level1 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_1_green.gif) no-repeat 13px 10px;	}');
CREPUSCULE('#island #container #mainview #cities .level2 div.allyCityImg, #island #container #mainview #cities .level3 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_2_green.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_3_green.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_4_green.gif) no-repeat 11px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level10 div.allyCityImg, #island #container #mainview #cities .level11 div.allyCityImg, #island #container #mainview #cities .level12 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_5_green.gif) no-repeat 8px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level13 div.allyCityImg, #island #container #mainview #cities .level14 div.allyCityImg, #island #container #mainview #cities .level15 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_6_green.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_7_green.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level18 div.allyCityImg, #island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg,#island #container #mainview #cities .level25 div.allyCityImg,#island #container #mainview #cities .level26 div.allyCityImg,#island #container #mainview #cities .level27 div.allyCityImg,#island #container #mainview #cities .level28 div.allyCityImg,#island #container #mainview #cities .level29 div.allyCityImg,#island #container #mainview #cities .level30 div.allyCityImg,#island #container #mainview #cities .level31 div.allyCityImg,#island #container #mainview #cities .level32 div.allyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_8_green.gif) no-repeat 2px 4px;	}');

//---- Les Villes sur l'ile (Jaune) ----
CREPUSCULE('#island #container #mainview #cities .level1 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_1_yellow.gif) no-repeat 13px 10px;	}');
CREPUSCULE('#island #container #mainview #cities .level2 div.treatyCityImg, #island #container #mainview #cities .level3 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_2_yellow.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level4 div.treatyCityImg, #island #container #mainview #cities .level5 div.treatyCityImg, #island #container #mainview #cities .level6 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_3_yellow.gif) no-repeat 13px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level7 div.treatyCityImg, #island #container #mainview #cities .level8 div.treatyCityImg, #island #container #mainview #cities .level9 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_4_yellow.gif) no-repeat 11px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level10 div.treatyCityImg, #island #container #mainview #cities .level11 div.treatyCityImg, #island #container #mainview #cities .level12 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_5_yellow.gif) no-repeat 8px 13px;	}');
CREPUSCULE('#island #container #mainview #cities .level13 div.treatyCityImg, #island #container #mainview #cities .level14 div.treatyCityImg, #island #container #mainview #cities .level15 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_6_yellow.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level16 div.treatyCityImg, #island #container #mainview #cities .level17 div.treatyCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_7_yellow.gif) no-repeat 4px 7px;	}');
CREPUSCULE('#island #container #mainview #cities .level18 div.treatyCityImg, #island #container #mainview #cities .level19 div.treatyCityImg, #island #container #mainview #cities .level20 div.treatyCityImg,#island #container #mainview #cities .level21 div.treatyCityImg,#island #container #mainview #cities .level22 div.treatyCityImg,#island #container #mainview #cities .level23 div.treatyCityImg,#island #container #mainview #cities .level24 div.treatyCityImg,#island #container #mainview #cities .level25 div.treatyCityImg,#island #container #mainview #cities .level26 div.treatyCityImg,#island #container #mainview #cities .level27 div.treatyCityImg,#island #container #mainview #cities .level28 div.treatyCityImg,#island #container #mainview #cities .level29 div.treatyCityImg,#island #container #mainview #cities .level30 div.treatyCityImg,#island #container #mainview #cities .level31 div.treatyCityImg,#island #container #mainview #cities .level32 div.treatyCityImg {background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/city_8_yellow.gif) no-repeat 2px 4px;	}');

//--- Batiment des Dieux / Temple ----
CREPUSCULE('#island #container #mainview #islandfeatures .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder1.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder2.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder3.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder4.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder5.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder6.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder7.png);	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/temple/wonder8.png);	}');

//---- Ressource / Exploitation ----
CREPUSCULE('#island #container #mainview #islandfeatures .marble a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/ress/resource_marble.png);	width:100px; height:76px;	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wood a {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/ress/resource_wood.png);	width:67px;  height:63px;	}');
CREPUSCULE('#island #container #mainview #islandfeatures .wine a {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/ress/resource_wine.png);	width:100px; height:76px;	}');
CREPUSCULE('#island #container #mainview #islandfeatures .crystal a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/ress/resource_glass.png);	width:100px; height:76px;	}');
CREPUSCULE('#island #container #mainview #islandfeatures .sulfur a {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/ress//resource_sulfur.png);	width:100px; height:76px;	}');

//--- Selectioneur & Colonie ---
CREPUSCULE('#island #container #mainview #cities .selectimg {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/select_city.gif); width:81px; height:55px; position:absolute; top:18px; left:-7px;	}');
CREPUSCULE('#island #container #mainview #cities .level0 div.buildCityImg {	background:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/ile/city/site_colonie.gif) no-repeat 0px 0px;	}');


//------ Monde --------
//
//--- Ile, Ocean et Ocean Anim ----
CREPUSCULE('#worldmap_iso #scrollcover {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/bg_ocean.gif) !important;	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_01.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_02.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_03.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean_feature1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_anim_01.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean_feature2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_anim_02.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean_feature3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_anim_03.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .ocean_feature4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/ocean_anim_04.gif);	}');

CREPUSCULE('#worldmap_iso #worldmap .island1 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island2 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island3 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island4 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island5 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island6 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island7 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island8 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island9 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island10 {		background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05.gif);	}');

CREPUSCULE('#worldmap_iso #worldmap .island1own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island2own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island3own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island4own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island5own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island6own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island7own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island8own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island9own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_blue.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island10own {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_blue.gif);	}');

CREPUSCULE('#worldmap_iso #worldmap .island1ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island2ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island3ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island4ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island5ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island6ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island7ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island8ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island9ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_green.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island10ally {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_green.gif);	}');

CREPUSCULE('#worldmap_iso #worldmap .island1treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island2treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island3treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island4treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island5treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island6treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_01_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island7treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_02_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island8treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_03_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island9treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_04_yellow.gif);	}');
CREPUSCULE('#worldmap_iso #worldmap .island10treaty {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/island_05_yellow.gif);	}');

//--- Batiment des Dieux / Temple ----
CREPUSCULE('#worldmap_iso #worldmap .wonder1 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w1.gif);	width:19px;	height:30px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder2 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w2.gif);	width:21px;	height:27px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder3 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w3.gif);	width:23px;	height:27px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder4 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w4.gif);	width:18px;	height:44px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder5 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w5.gif);	width:17px;	height:43px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder6 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w6.gif);	width:19px;	height:39px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder7 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w7.gif);	width:23px;	height:28px;	}');
CREPUSCULE('#worldmap_iso #worldmap .wonder8 {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/CREPUSCULE/monde/temple/w8.gif);	width:19px;	height:45px;	}');

// -------------------------------------------------
// ----------- Fin du Script Pour le crepuscule ----
// -------------------------------------------------




//---- Et bien d'autre encore à  découvrir !!!  Suivez IkArt...