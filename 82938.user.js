// ==UserScript==
// @name           IkArT Wonder
// @version 	   1.5.0
// @namespace 	   Ikariam
// @autor          Create and develop by Typhon with Quenquen407, Matheod, HiSt, Destructor & TeKnoPolis ...
// @e-mail         minigrapheur@live.fr
// @e-mail         matheodikart@gmail.com
// @e-mail         quenquen407.ikart@gmail.com
// @description    IkArt : Ikariam avec des périodes de transitions Aube, Jour, Crépuscule et Nuit selon l'heure de votre ordinateur et Amélioration des Graphismes...
// @include        http://s*.*.ikariam.*/*
// @exclude        http://s*.*.ikariam.*/pillory.php*
// ==/UserScript==
// ===========================================================================
// ---- !!! YOU HAVE NO RIGHT TO EDIT OR COPY THIS SCRIPT !!! Protect by : http://www.iddn.org ----
// ---- !!! VOUS N'AVEZ PAS LE DROIT DE MODIFIER OU COPIER CE SCRIPT !!! Protégé par : http://www.iddn.org ----

// ---- Last Edit : 1/11/2010
// ---- This script is developped for Ikariam version 0.3.2 to 0.4.1----

// ---- To contact the Creator and graphik creator ; minigrapheur@live.fr ----
// ---- To contact a Creator Script ; matheodikart@gmail.com ----
// ---- To contact a Communication Manager ; quenquen407.ikart@gmail.com ----

// -------------------------------------------------------
// ---------- Définition des varaibles de bases ----------
// -------------------------------------------------------

// On récupère le valeur du répertoire si on ne la trouve pas on définis par défaut "wonder"
var repertoire = GM_getValue('repertoire', 'wonder');

// On récupère l'heure de l'ordinateur
var localTime = new Date();
var H_time = localTime.getHours();

// On définis par défaut la valeur "JOURNEE" comme période
var periode = 'JOURNEE';


// Fonction Ajout de style
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

// Période = NUIT
if ( H_time >= GM_getValue('nuitbis1',21) && H_time <= GM_getValue('nuitbis2',23) || H_time >= GM_getValue('nuit1',0) && H_time <= GM_getValue('nuit2',6) ) {
	periode = 'NUIT';
}

// Période = JOURNEE
if ( H_time >= GM_getValue('jour1',9) && H_time <=  GM_getValue('jour2',19) ) {
	periode = 'JOURNEE';
}

// Période = AUBE
if ( H_time >= GM_getValue('aube1',7) && H_time <= GM_getValue('aube2',8) ) {
	periode = 'AUBE';
}

// Période = CREPUSCULE
if ( H_time >= GM_getValue('crepuscule1',19) && H_time <= GM_getValue('crepuscule2',21) ) {
	periode = 'CREPUSCULE';
}



// -------------------------------------------------------
// ---------- Définition des fonctions de bases ----------
// -------------------------------------------------------

// --- Fonction Ajout de Phases 25 et 26 ---
if(document.getElementById('position0')) {
	var titleHotel = document.getElementById('position0').getElementsByTagName('a')[0].title;
	var levelHotel = titleHotel.substr(titleHotel.length-2)*1;
	if ( levelHotel > 27 ){ levelHotel = 27; }
	var mainview = document.getElementById('mainview');
	mainview.setAttribute('class','phase'+levelHotel);
}

// --- Fonction Allongement de phase ---
if(GM_getValue("allonger") == true && document.getElementById('city')) {
	var cityView = document.getElementById('mainview');
	var cityViewUl = document.createElement('ul');
	cityViewUl.setAttribute('id','ikartLocation');
	cityView.appendChild(cityViewUl);
}

// --- Fonction Ajout de scènes ---
if(document.getElementById('locations')) {

	if (document.getElementById('locations').innerHTML.search('beachboys') != -1) {
		if(levelHotel >= 12 && levelHotel != 15) {
			var theatre = document.getElementById('locations');
			var theatreDiv = document.createElement('li');
			theatreDiv.setAttribute('class','theatre');
			theatre.appendChild(theatreDiv);
		}
		if(GM_getValue('allonger') == true && levelHotel >= 3) {
			var nageurs = document.getElementById('ikartLocation');
			var nageursDiv = document.createElement('li');
			nageursDiv.setAttribute('class','nageurs');
			nageurs.appendChild(nageursDiv);
			
			if(levelHotel >= 7) {
				var spectacle = document.getElementById('ikartLocation');
				var spectacleDiv = document.createElement('li');
				spectacleDiv.setAttribute('class','spectacle');
				spectacle.appendChild(spectacleDiv);
			}
		}
	}
	if(GM_getValue('allonger') == true) {
		if (document.getElementById('advMilitary').innerHTML.search('normalalert') != -1) {
			var armada = document.getElementById('ikartLocation');
			var armadaDiv = document.createElement('li');
			armadaDiv.setAttribute('class','armada');
			armada.appendChild(armadaDiv);
		}
		if (document.getElementById('locations').innerHTML.search('protester') != -1 && levelHotel >= 7) {
			var emeute = document.getElementById('ikartLocation');
			var emeuteDiv = document.createElement('li');
			emeuteDiv.setAttribute('class','emeute');
			emeute.appendChild(emeuteDiv);
		}
	}
}

// --- Fonction Correction position3 ---
var liPosition3 = document.getElementById('position3');
if(liPosition3) {
	if (liPosition3.innerHTML.search('museum') != -1) {			liPosition3.setAttribute('style','left: 623px; top: 265px;'	);}
	if (liPosition3.innerHTML.search('warehouse') != -1) {		liPosition3.setAttribute('style','left: 630px; top: 260px;'	);}
	if (liPosition3.innerHTML.search('tavern') != -1) {			liPosition3.setAttribute('style','left: 620px; top: 250px;'	);}
	if (liPosition3.innerHTML.search('palace') != -1) {			liPosition3.setAttribute('style','left: 625px; top: 252px;'	);}
	if (liPosition3.innerHTML.search('academy') != -1) {		liPosition3.setAttribute('style','left: 629px; top: 252px;'	);}
	if (liPosition3.innerHTML.search('workshop') != -1) {		liPosition3.setAttribute('style','left: 632px; top: 252px;'	);}
	if (liPosition3.innerHTML.search('safehouse') != -1) {		liPosition3.setAttribute('style','left: 628px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('branchOffice') != -1) {	liPosition3.setAttribute('style','left: 632px; top: 250px;'	);}
	if (liPosition3.innerHTML.search('embassy') != -1){			liPosition3.setAttribute('style','left: 624px; top: 252px;'	);}
	if (liPosition3.innerHTML.search('palaceColony') != -1) {	liPosition3.setAttribute('style','left: 622px; top: 260px;'	);}
	if (liPosition3.innerHTML.search('barracks') != -1) {		liPosition3.setAttribute('style','left: 617px; top: 252px;'	);}
	if (liPosition3.innerHTML.search('alchemist') != -1) {		liPosition3.setAttribute('style','left: 613px; top: 248px;'	);}
	if (liPosition3.innerHTML.search('architect') != -1) {		liPosition3.setAttribute('style','left: 620px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('optician') != -1) {		liPosition3.setAttribute('style','left: 616px; top: 260px;'	);}
	if (liPosition3.innerHTML.search('stonemason') != -1) {		liPosition3.setAttribute('style','left: 620px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('vineyard') != -1) {		liPosition3.setAttribute('style','left: 628px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('winegrower') != -1) {		liPosition3.setAttribute('style','left: 625px; top: 250px;'	);}
	if (liPosition3.innerHTML.search('carpentering') != -1) {	liPosition3.setAttribute('style','left: 625px; top: 260px;'	);}
	if (liPosition3.innerHTML.search('fireworker') != -1) {		liPosition3.setAttribute('style','left: 620px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('forester') != -1) {		liPosition3.setAttribute('style','left: 618px; top: 255px;'	);}
	if (liPosition3.innerHTML.search('glassblowing') != -1) {	liPosition3.setAttribute('style','left: 621px; top: 253px;'	);}
	if (liPosition3.innerHTML.search('temple') != -1) {			liPosition3.setAttribute('style','left: 621px; top: 259px;'	);}
	if (liPosition3.innerHTML.search('dump') != -1) {			liPosition3.setAttribute('style','left: 623px; top: 263px;'	);}
	if (liPosition3.innerHTML.search('construction') != -1) {	liPosition3.setAttribute('style','left: px; top: px;'	);}
}

// Fonction Code Konami
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
			var imgsToShow = '';
			/*var textToShow = 'By Typhon,\\So Thanks !';
			for(i = 0; i < textToShow.length; i++) {
				var caractere = textToShow.substr(i, 1);
				caractere = caractere.toLowerCase();
				if(caractere == '!') {
					caractere = 'exclaim';
				}
				if(caractere == '?') {
					caractere = 'interrogation';
				}
				if(caractere == '.') {
					caractere = 'point';
				}
				if(caractere == ',') {
					caractere = 'virgule';
				}
				if(caractere == ' ') {
					caractere = 'space';
				}
				var imgCaractere = '<img src="http://ika-art.teknopop.com/ScriptIkart/caracteres/'+caractere+'.png" class="caractere '+caractere+'" />'
				if(caractere == '\\') {
					imgCaractere = '<br />';
				}
				imgsToShow += imgCaractere;
			}*/
			
			var textByIkartParent = document.getElementById('container');
			var textByIkart = document.createElement('div');
			textByIkart.setAttribute('id','textbyikart');
			textByIkart.innerHTML = imgsToShow+'<object height="600" width="800" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="http://ika-art.teknopop.com/ScriptIkart/line-rider.swf" name="movie"><param value="true" name="menu"><param value="high" name="quality"><embed height="600" width="800" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" menu="true" src="http://ika-art.teknopop.com/ScriptIkart/line-rider.swf"></object>';
			textByIkartParent.appendChild(textByIkart);
			
			// On vide la liste des codes de touches présées
			keysPress = [];
		}
	}, true);
}



// -------------------------------------------------------
// ----------------- Gestion des options -----------------
// -------------------------------------------------------

var loca = location.toString();
// Si on se trouve sur la page des options
if(document.getElementById('options'))
{
	// On créer l'onglet IkArt qui affichera les options
	var mainview = document.getElementById("mainview");
	var mainviewDivs = mainview.getElementsByTagName("div");
	var i = 0;
	function verifDiv() {
		if(i > 10) {
			return;
		}
		else {
			if(mainviewDivs[i].className == 'yui-navset') {
				return i;
			}
			else {
				i++;
				verifDiv(i);
			}
		}
	}
	verifDiv(i);
	var parentOngletIkArt = document.getElementById('mainview').getElementsByTagName('div')[i].getElementsByTagName('ul')[0];
	var ongletIkArt = document.createElement('li')
	ongletIkArt.setAttribute('id', 'ikartOnglet');
	
	// On insert l'onglet à la fin de l'élement qui contient les onglets des options
	parentOngletIkArt.appendChild(ongletIkArt);
	
	// On définis le contenue de l'onglet IkArt
	document.getElementById('ikartOnglet').innerHTML = '<a title="IkArt" onclick=\'var mainview = document.getElementById("mainview"); var mainviewDivs = mainview.getElementsByTagName("div"); for(i = '+(i+1)+'; i < '+mainviewDivs.length+'; i++) {mainviewDivs[i].style.display = "none";} document.getElementById("ikartOptions").style.display = "block"; document.getElementById("ikartOnglet").setAttribute("class", "selected"); for(i = 0; i < 3; i++) {document.getElementById("mainview").getElementsByTagName("div")['+i+'].getElementsByTagName("ul")[0].getElementsByTagName("li")[i].setAttribute("class", "");}\'><em>IkArt</em></a>'
	
	
	// On créer l'élement qui contiendra les options
	var parentOptionsIkart = document.getElementById('mainview');
	var optionsIkart = document.createElement('div');
	optionsIkart.setAttribute('id', 'ikartOptions');
	optionsIkart.setAttribute('class', 'contentBox01h');
	optionsIkart.style.display = 'none';
	
	// On insert les options à la fin de mainview
	parentOptionsIkart.appendChild(optionsIkart);
		
	// On coche ce qui doit l'être dans les options
	
	// (Allonger la vue)
	var allonger = GM_getValue('allonger', false);
	var iAlong = '';
	if(allonger == true) {iAlong = ' checked="checked"';}
	
	// (Inverser cave et pressoir)
	var invertion = GM_getValue('invertion', true);
	var iInvert = '';
	if(invertion == true) {iInvert = ' checked="checked"';}
	
	// (Répertoire images)
	var repertoire = GM_getValue('repertoire', 'wonder');
	var iRep1 = '';
	var iRep2 = '';
	var iRep3 = '';
	if(repertoire == 'wonder') {iRep1=' checked="checked"';}
	else if(repertoire == 'snow') {iRep2=' checked="checked"';}
	else if(repertoire == 'war') {iRep3=' checked="checked"';}
	
	// (Langue utilisée)
	var langage = GM_getValue('langage', 'fr');
	var iLang1 = '';
	var iLang2 = '';
	if(langage == 'fr') {iLang1=' checked="checked"';}
	else if(langage == 'org') {iLang2=' checked="checked"';}
	
	if(langage == 'fr') {
	document.getElementById('ikartOptions').innerHTML = '<form name="formikart"><h3 class="header"><span class="textLabel">Options IkArt</span></h3><div class="content"><div><table><tr><th>Site Officiel IkArt :</th><td><a href="http://ika-art.teknopop.com" target="_blank">Acc&eacute;der</a></td></tr><tr id="langid"><th>Langage :</th><td><input type="radio" id="lang1" style="cursor: pointer;" name="lang" value="fr"'+iLang1+' />&nbsp;<label for="lang1" style="cursor: pointer;"><img src="http://ika-art.teknopop.com/ScriptIkart/options/FR.png" title="Fr" /></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" id="lang2" style="cursor: pointer;" name="lang" value="org"'+iLang2+' />&nbsp;<label for="lang2" style="cursor: pointer;" ><img src="http://ika-art.teknopop.com/ScriptIkart/options/ORG.png" title="Org" /></label></td></tr></table></div><div><h3>Th&egrave;me</h3><table><tr id="repid"><th>Versions :</th><td><input type="radio" id="rep1" style="cursor: pointer;" name="rep" value="wonder"'+iRep1+' />&nbsp;<label for="rep1" style="cursor:pointer;">Wonder</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" disabled="disabled" id="rep2" name="rep" value="snow"'+iRep2+' />&nbsp;<label for="rep2" style="color:grey;">Snow</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" disabled="disabled" id="rep3" name="rep" value="war"'+iRep3+' />&nbsp;<label for="rep3" style="color:grey;">War</label></td></tr><tr><th>URL logo :</th><td><input id="logo" type="text" size="36" value="'+GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo/ikart.png')+'" /><br /><b>Galerie :</b> <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/ikart.png\';" style="cursor:pointer;">IkArt</a> - <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/city.png\';" style="cursor:pointer;">City</a> - <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/premium.png\';" style="cursor:pointer;">Premium</a> - <a onclick="document.getElementById(\'logo\').value=\'http://s1.ikariam.fr/skin/research/area_economy.jpg\';" style="cursor:pointer;">Original</a></td></tr><tr><th>Allonger la vue :</th><td><input type="checkbox"'+iAlong+' id="ikart_allonger" style="cursor:pointer;" /></td></tr><tr><th>Inverser cave et pressoir :</th><td><input type="checkbox"'+iInvert+' id="ikart_invertion" style="cursor:pointer; margin-top: 6px; position: absolute;" /><label for="ikart_invertion"><img src="http://ika-art.teknopop.com/ScriptIkart/options/invert.png" style="cursor: pointer; margin-left: 23px;" /></td></tr></table></div><div><h3>Configuration des p&eacute;riodes</h3><table><tr><th><b>Configurations de bases :</b></th><td><a id="configIkart1" onclick=\'document.getElementById("nuit1").value="0";document.getElementById("nuit1").disabled="";document.getElementById("nuit2").value="6";document.getElementById("nuit2").disabled="";document.getElementById("aube1").value="7";document.getElementById("aube1").disabled="";document.getElementById("aube2").value="8";document.getElementById("aube2").disabled="";document.getElementById("jour1").value="9";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="18";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="19";document.getElementById("crepuscule1").disabled="";document.getElementById("crepuscule2").value="20";document.getElementById("crepuscule2").disabled="";document.getElementById("nuitbis1").value="21";document.getElementById("nuitbis1").disabled="";document.getElementById("nuitbis2").value="23";document.getElementById("nuitbis2").disabled="";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/all.png" title="Configuration: Jour + Nuit + Aube + Cr&eacute;puscule" /></a><a id="configIkart2" onclick=\'document.getElementById("nuit1").value="0";document.getElementById("nuit1").disabled="";document.getElementById("nuit2").value="7";document.getElementById("nuit2").disabled="";document.getElementById("aube1").value="-1";document.getElementById("aube1").disabled="disabled";document.getElementById("aube2").value="-1";document.getElementById("aube2").disabled="disabled";document.getElementById("jour1").value="8";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="19";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule1").disabled="disabled";document.getElementById("crepuscule2").value="-1";document.getElementById("crepuscule2").disabled="disabled";document.getElementById("nuitbis1").value="20";document.getElementById("nuitbis1").disabled="";document.getElementById("nuitbis2").value="23";document.getElementById("nuitbis2").disabled="";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/jour_nuit.png" title="Configuration: Jour + Nuit" /></a><a id="configIkart3" onclick=\'document.getElementById("nuit1").value="-1";document.getElementById("nuit1").disabled="disabled";document.getElementById("nuit2").value="-1";document.getElementById("nuit2").disabled="disabled";document.getElementById("aube1").value="-1";document.getElementById("aube1").disabled="disabled";document.getElementById("aube2").value="-1";document.getElementById("aube2").disabled="disabled";document.getElementById("jour1").value="0";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="23";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule1").disabled="disabled";document.getElementById("crepuscule2").value="-1";document.getElementById("crepuscule2").disabled="disabled";document.getElementById("nuitbis1").value="-1";document.getElementById("nuitbis1").disabled="disabled";document.getElementById("nuitbis2").value="-1";document.getElementById("nuitbis2").disabled="disabled";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/jour.png" title="Configuration: Jour" /></a></td></tr><tr><th><b>Aide :</b></th><td><img src="http://ika-art.teknopop.com/ScriptIkart/options/iconInfo.png" style="z-index: 33; position: relative; cursor: help;" onMouseOver="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:block !important;\');" onMouseOut="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:none;\');" /><div id="aideOption" onMouseOver="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:block !important;\');" onMouseOut="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:none;\');" ><span><center><b>Bienvenue dans l\'aide !</b></center><br /><center>-------</center><br /><b>Rappel :</b> Pour supprimer une p&eacute;riode, il faut mettre "-1" dans les deux cases de la p&eacute;riode correspondante, <br /><br />Les sch&eacute;mas suivant indiquent les p&eacute;riodes que vous pouvez supprimer, pour avoir :<br /><br />- "Jour + Nuit + Aube + Cr&eacute;puscule" il ne faut suppimer aucune p&eacute;riode.<br />- "Jour + Nuit" il faut supprimer l\'Aube et le Cr&eacute;puscule.<br />- "Jour" il faut supprimer la Nuit, l\'Aube et le Cr&eacute;puscule.<br /><br /><center>-------</center><br />Pour pouvoir enregistrer les options, il faut qu\'aucune erreur ne soit d&eacute;t&eacute;ct&eacute;e, pour cel&agrave;, v&eacute;rifiez bien :<br /><br /></br />- Qu\'aucune plage horaire n\'est utilis&eacute;e deux fois.<br />- Qu\'aucune plage horaire ne reste vide.<br />- Qu\'un des sch&eacute;mas pour la suppression des p&eacute;riodes est respect&eacute;.<br /><center>-------</center><br />Si toute fois vous n\'y arrivez toujours pas, vous pouvez revenir &agrave; l\'une des trois configurations de bases plus haut...<br /><br /></span></td></tr><tr><th><b>Nuit :</b></th><td><input type="text" id="nuit1" style="width:20px;" value="'+GM_getValue('nuit1', '0')+'" />h00 &agrave; <input type="text" id="nuit2" style="width:20px;" value="'+GM_getValue('nuit2', '6')+'" />h59<span class="ikartError" id="ikartError1"></span></td></tr><tr><th><b>Aube :</b></th><td><input type="text" id="aube1" style="width:20px;" value="'+GM_getValue('aube1', '7')+'" />h00 &agrave; <input type="text" id="aube2" style="width:20px;" value="'+GM_getValue('aube2', '8')+'" />h59<span class="ikartError" id="ikartError2"></span></td></tr><tr><th><b>Jour :</b></th><td><input type="text" id="jour1" style="width:20px;" value="'+GM_getValue('jour1', '9')+'" />h00 &agrave; <input type="text" id="jour2" style="width:20px;" value="'+GM_getValue('jour2', '18')+'" />h59<span class="ikartError" id="ikartError3"></span></td></tr><tr><th><b>Cr&eacute;puscule :</b></th><td><input type="text" id="crepuscule1" style="width:20px;" value="'+GM_getValue('crepuscule1', '19')+'" />h00 &agrave; <input type="text" id="crepuscule2" style="width:20px;" value="'+GM_getValue('crepuscule2', '20')+'" />h59<span class="ikartError" id="ikartError4"></span></td></tr><tr><th><b>Nuit :</b></th><td><input type="text" id="nuitbis1" style="width:20px;" value="'+GM_getValue('nuitbis1', '21')+'" />h00 &agrave; <input type="text" id="nuitbis2" style="width:20px;" value="'+GM_getValue('nuitbis2', '23')+'" />h59<span class="ikartError" id="ikartError5"></span></td></tr></div></table></div><div class="centerButton"><input onclick=\'for(i = 0; i <= document.getElementById("repid").getElementsByTagName("input").length-1; i++) {if(document.formikart.rep[i].checked) {iRep = document.formikart.rep[i].value;}} for(j = 0; j <= document.getElementById("langid").getElementsByTagName("input").length-1; j++) {if(document.formikart.lang[j].checked) {iLang = document.formikart.lang[j].value;}} if(ikartsvg(document.getElementById("ikart_allonger").checked, document.getElementById("ikart_invertion").checked, document.getElementById("nuit1").value, document.getElementById("nuit2").value, document.getElementById("aube1").value,document.getElementById("aube2").value, document.getElementById("jour1").value, document.getElementById("jour2").value, document.getElementById("crepuscule1").value, document.getElementById("crepuscule2").value, document.getElementById("nuitbis1").value, document.getElementById("nuitbis2").value, document.getElementById("logo").value, iRep, iLang)) {alert("Options sauvegard&eacute;es !"); location.reload();}\' class="button" value="Sauver les param&egrave;tres !" type="button" /></div></div><div class="footer"></div></div></form>';
	}
	
	if(langage == 'org') {
	document.getElementById('ikartOptions').innerHTML = '<form name="formikart"><h3 class="header"><span class="textLabel">IkArt Options</span></h3><div class="content"><div><table><tr><th>Official IkArt WebSite :</th><td><a href="http://ika-art.teknopop.com" target="_blank">Visit</a></td></tr><tr id="langid"><th>Langage :</th><td><input type="radio" id="lang1" style="cursor: pointer;" name="lang" value="fr"'+iLang1+' />&nbsp;<label for="lang1" style="cursor: pointer;"><img src="http://ika-art.teknopop.com/ScriptIkart/options/FR.png" title="Fr" /></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" id="lang2" style="cursor: pointer;" name="lang" value="org"'+iLang2+' />&nbsp;<label for="lang2" style="cursor: pointer;" ><img src="http://ika-art.teknopop.com/ScriptIkart/options/ORG.png" title="Org" /></label></td></tr></table></div><div><h3>Theme</h3><table><tr id="repid"><th>Versions :</th><td><input type="radio" id="rep1" style="cursor: pointer;" name="rep" value="wonder"'+iRep1+' />&nbsp;<label for="rep1" style="cursor:pointer;">Wonder</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" disabled="disabled" id="rep2" name="rep" value="snow"'+iRep2+' />&nbsp;<label for="rep2" style="color:grey;">Snow</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" disabled="disabled" id="rep3" name="rep" value="war"'+iRep3+' />&nbsp;<label for="rep3" style="color:grey;">War</label></td></tr><tr><th>Logo URL :</th><td><input id="logo" type="text" size="36" value="'+GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo/ikart.png')+'" /><br /><b>Gallery :</b> <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/ikart.png\';" style="cursor:pointer;">IkArt</a> - <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/city.png\';" style="cursor:pointer;">City</a> - <a onclick="document.getElementById(\'logo\').value=\'http://ika-art.teknopop.com/ScriptIkart/logo/premium.png\';" style="cursor:pointer;">Premium</a> - <a onclick="document.getElementById(\'logo\').value=\'http://s1.ikariam.fr/skin/research/area_economy.jpg\';" style="cursor:pointer;">Original</a></td></tr><tr><th>Stretch the view out :</th><td><input type="checkbox"'+iAlong+' id="ikart_allonger" style="cursor:pointer;" /></td></tr><tr><th>Reverse vineyard and winegrower :</th><td><input type="checkbox"'+iInvert+' id="ikart_invertion" style="cursor:pointer; margin-top: 6px; position: absolute;" /><label for="ikart_invertion"><img src="http://ika-art.teknopop.com/ScriptIkart/options/invert.png" style="cursor: pointer; margin-left: 23px;" /></td></tr></table></div><div><h3>Periods configuration</h3><table><tr><th><b>Basics configurations :</b></th><td><a id="configIkart1" onclick=\'document.getElementById("nuit1").value="0";document.getElementById("nuit1").disabled="";document.getElementById("nuit2").value="6";document.getElementById("nuit2").disabled="";document.getElementById("aube1").value="7";document.getElementById("aube1").disabled="";document.getElementById("aube2").value="8";document.getElementById("aube2").disabled="";document.getElementById("jour1").value="9";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="18";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="19";document.getElementById("crepuscule1").disabled="";document.getElementById("crepuscule2").value="20";document.getElementById("crepuscule2").disabled="";document.getElementById("nuitbis1").value="21";document.getElementById("nuitbis1").disabled="";document.getElementById("nuitbis2").value="23";document.getElementById("nuitbis2").disabled="";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/all.png" title="Configuration: Dawn + Day + Dusk + Night" /></a><a id="configIkart2" onclick=\'document.getElementById("nuit1").value="0";document.getElementById("nuit1").disabled="";document.getElementById("nuit2").value="7";document.getElementById("nuit2").disabled="";document.getElementById("aube1").value="-1";document.getElementById("aube1").disabled="disabled";document.getElementById("aube2").value="-1";document.getElementById("aube2").disabled="disabled";document.getElementById("jour1").value="8";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="19";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule1").disabled="disabled";document.getElementById("crepuscule2").value="-1";document.getElementById("crepuscule2").disabled="disabled";document.getElementById("nuitbis1").value="20";document.getElementById("nuitbis1").disabled="";document.getElementById("nuitbis2").value="23";document.getElementById("nuitbis2").disabled="";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/jour_nuit.png" title="Configuration: Day + Night" /></a><a id="configIkart3" onclick=\'document.getElementById("nuit1").value="-1";document.getElementById("nuit1").disabled="disabled";document.getElementById("nuit2").value="-1";document.getElementById("nuit2").disabled="disabled";document.getElementById("aube1").value="-1";document.getElementById("aube1").disabled="disabled";document.getElementById("aube2").value="-1";document.getElementById("aube2").disabled="disabled";document.getElementById("jour1").value="0";document.getElementById("jour1").disabled="";document.getElementById("jour2").value="23";document.getElementById("jour2").disabled="";document.getElementById("crepuscule1").value="-1";document.getElementById("crepuscule1").disabled="disabled";document.getElementById("crepuscule2").value="-1";document.getElementById("crepuscule2").disabled="disabled";document.getElementById("nuitbis1").value="-1";document.getElementById("nuitbis1").disabled="disabled";document.getElementById("nuitbis2").value="-1";document.getElementById("nuitbis2").disabled="disabled";\'><img src="http://ika-art.teknopop.com/ScriptIkart/options/jour.png" title="Configuration: Day" /></a></td></tr><tr><th><b>Help :</b></th><td><img src="http://ika-art.teknopop.com/ScriptIkart/options/iconInfo.png" style="z-index: 33; position: relative; cursor: help;" onMouseOver="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:block !important;\');" onMouseOut="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:none;\');" /><div id="aideOption" onMouseOver="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:block !important;\');" onMouseOut="document.getElementById(\'aideOption\').setAttribute(\'style\',\'display:none;\');" ><span><center><b>Welcome to the assistant !</b></center><br /><center>-------</center><br /><b>Reminder :</b> To remove one period you need to put "-1" in the two boxs to corresponding period, <br /><br />This examples configurations show what periods you should remove, to get :<br /><br />- "Dawn + Day + Dusk + Night" you must remove any period.<br />- "Day + Night" you must remove Dawn and Dusk.<br />- "Day" you must remove Night, Dawn and Dusk.<br /><br /><center>-------</center><br />To save settings, it\'s must to do any error, to this, verify :<br /><br /></br />- Any time slot is used twice time.<br />- Any time slot is empty.<br />- One of examples configurations to remove perdiod be respected.<br /><center>-------</center><br />And after this if you can\'t save, you can back to one of three basics configurations above...<br /><br /></span></td></tr><tr><th><b>Night :</b></th><td><input type="text" id="nuit1" style="width:20px;" value="'+GM_getValue('nuit1', '0')+'" />h00 to <input type="text" id="nuit2" style="width:20px;" value="'+GM_getValue('nuit2', '6')+'" />h59<span class="ikartError" id="ikartError1"></span></td></tr><tr><th><b>Dawn :</b></th><td><input type="text" id="aube1" style="width:20px;" value="'+GM_getValue('aube1', '7')+'" />h00 to <input type="text" id="aube2" style="width:20px;" value="'+GM_getValue('aube2', '8')+'" />h59<span class="ikartError" id="ikartError2"></span></td></tr><tr><th><b>Day :</b></th><td><input type="text" id="jour1" style="width:20px;" value="'+GM_getValue('jour1', '9')+'" />h00 to <input type="text" id="jour2" style="width:20px;" value="'+GM_getValue('jour2', '18')+'" />h59<span class="ikartError" id="ikartError3"></span></td></tr><tr><th><b>Dusk :</b></th><td><input type="text" id="crepuscule1" style="width:20px;" value="'+GM_getValue('crepuscule1', '19')+'" />h00 to <input type="text" id="crepuscule2" style="width:20px;" value="'+GM_getValue('crepuscule2', '20')+'" />h59<span class="ikartError" id="ikartError4"></span></td></tr><tr><th><b>Night :</b></th><td><input type="text" id="nuitbis1" style="width:20px;" value="'+GM_getValue('nuitbis1', '21')+'" />h00 to <input type="text" id="nuitbis2" style="width:20px;" value="'+GM_getValue('nuitbis2', '23')+'" />h59<span class="ikartError" id="ikartError5"></span></td></tr></div></table></div><div class="centerButton"><input onclick=\'for(i = 0; i <= document.getElementById("repid").getElementsByTagName("input").length-1; i++) {if(document.formikart.rep[i].checked) {iRep = document.formikart.rep[i].value;}} for(j = 0; j <= document.getElementById("langid").getElementsByTagName("input").length-1; j++) {if(document.formikart.lang[j].checked) {iLang = document.formikart.lang[j].value;}} if(ikartsvg(document.getElementById("ikart_allonger").checked, document.getElementById("ikart_invertion").checked, document.getElementById("nuit1").value, document.getElementById("nuit2").value, document.getElementById("aube1").value,document.getElementById("aube2").value, document.getElementById("jour1").value, document.getElementById("jour2").value, document.getElementById("crepuscule1").value, document.getElementById("crepuscule2").value, document.getElementById("nuitbis1").value, document.getElementById("nuitbis2").value, document.getElementById("logo").value, iRep, iLang)) {alert("Saved options !"); location.reload();}\' class="button" value="Save settings !" type="button" /></div></div><div class="footer"></div></div></form>';
	}
	
	
	unsafeWindow.ikartsvg = function (allongerIsCheck,invertionIsCheck,nuit1,nuit2,aube1,aube2,jour1,jour2,crepuscule1,crepuscule2,nuitbis1,nuitbis2,logo,iRep,iLang) {
		
		// On vérifie toutes les erreurs possible et on les indique
		var erreur = false;
		
		var erreurNuit0 = '';
		var erreurNuit1 = '';
		var erreurAube1 = '';
		var erreurJour1 = '';
		var erreurCrepuscule1 = '';
		var erreurNuitBis0 = '';
		var erreurNuitBis1 = '';
		
		var erreurNuit2 = '';
		var erreurAube2 = '';
		var erreurJour2 = '';
		var erreurCrepuscule2 = '';
		var erreurNuitBis2 = '';
		
		var erreurNuitBisCrepuscule1 = '';
		var erreurCrepusculeJour1 = '';
		var erreurJourAube1 = '';
		var erreurAubeNuit1 = '';
		
		var erreurNuitBisJour1 = '';
		var erreurJourNuit1 = '';
		
		var erreurJour3 = '';
		
		var erreurNuitAube3 = '';
		var erreurNuitCrepuscule3 = '';
		var erreurNuitNuitBis3 = '';
		var erreurNuitBisNuit3  = '';
		
		var erreurAubeCrepuscule3 = '';
		var erreurCrepusculeAube3 = '';
		
		// Si on utilise toutes les périodes
		if(parseInt(nuit1) != (-1) && parseInt(nuit2) != (-1) && parseInt(aube1) != (-1) && parseInt(aube2) != (-1) && parseInt(jour1) != (-1) && parseInt(jour2) != (-1) && parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) != (-1) && parseInt(nuitbis1) != (-1) && parseInt(nuitbis2) != (-1)) {
			if(parseInt(nuit1) > parseInt(nuit2)) {erreur = true; if(langage == 'fr') {erreurNuit1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurNuit1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(nuit1) != 0) {erreur = true; if(langage == 'fr') {erreurNuit0 = 'Le premier champ doit contenir la valeur 0, ';} if(langage == 'org') {erreurNuit0 = 'The first box must contain the value 0, ';}}
			if(parseInt(aube1) > parseInt(aube2)) {erreur = true; if(langage == 'fr') {erreurAube1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurAube1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(jour1) > parseInt(jour2)) {erreur = true; if(langage == 'fr') {erreurJour1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurJour1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(crepuscule1 )> parseInt(crepuscule2)) {erreur = true; if(langage == 'fr') {erreurCrepuscule1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurCrepuscule1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(nuitbis1) > parseInt(nuitbis2)) {erreur = true; if(langage == 'fr') {erreurNuitBis1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurNuitBis1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(nuitbis2) != 23) {erreur = true; if(langage == 'fr') {erreurNuitBis0 = 'Le deuxi&egrave;me champ doit contenir la valeur 23, ';} if(langage == 'org') {erreurNuitBis0 = 'The second box must contain the value 23, ';}}
			if(parseInt(nuitbis1) - parseInt(crepuscule2) != 1) {erreur = true; if(langage == 'fr') {erreurNuitBisCrepuscule1 = 'La plage horraire de cette p&eacute;riode ne correspond pas &agrave; celle de la nuit, ';} if(langage == 'org') {erreurNuitBisCrepuscule1 = 'The time slot of this period don\'t correspond with the night, ';}}
			if(parseInt(crepuscule1) - parseInt(jour2) != 1) {erreur = true; if(langage == 'fr') {erreurCrepusculeJour1 = 'La plage horraire de cette p&eacute;riode ne correspond pas &agrave; celle du crépuscule, ';} if(langage == 'org') {erreurCrepusculeJour1 = 'The time slot of this period don\'t correspond with the dusk, ';}}
			if(parseInt(jour1) - parseInt(aube2) != 1) {erreur = true; if(langage == 'fr') {erreurJourAube1 = 'La plage horraire de cette p&eacuteriode ne correspond pas &agrave; celle du jour, ';} if(langage == 'org') {erreurJourAube1 = 'The time slot of this period don\'t correspond with the day, ';}}
			if(parseInt(aube1) - parseInt(nuit2) != 1) {erreur = true; if(langage == 'fr') {erreurAubeNuit1 = 'La plage horraire de cette p&eacute;riode ne correspond pas &agrave; celle de l\'aube, ';} if(langage == 'org') {erreurAubeNuit1 = 'The time slot of this period don\'t correspond with the dawn, ';}}
		}
		
		// Si on utilise que le jour et la nuit
		else if(parseInt(nuit1) != (-1) && parseInt(nuit2) != (-1) && parseInt(aube1) == (-1) && parseInt(aube2) == (-1) && parseInt(jour1) != (-1) && parseInt(jour2) != (-1) && parseInt(crepuscule1) == (-1) && parseInt(crepuscule2) == (-1) && parseInt(nuitbis1) != (-1) && parseInt(nuitbis2) != (-1)) {
			if(parseInt(nuit1) > parseInt(nuit2)) {erreur = true; if(langage == 'fr') {erreurNuit1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurNuit1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(nuit1) != 0) {erreur = true; if(langage == 'fr') {erreurNuit0 = 'Le premier champ doit contenir la valeur 0, ';} if(langage == 'org') {erreurNuit0 = 'The first box must contain the value 0, ';}}
			if(parseInt(jour1) > parseInt(jour2)) {erreur = true; if(langage == 'fr') {erreurJour1 = 'Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurJour1 = 'The first box must contain a number lower to second, ';}}
			if(parseInt(nuitbis1) > parseInt(nuitbis2)) {erreur = true; if(langage == 'fr') {erreurNuitBis1 ='Le premier champ doit contenir un nombre inf&eacute;rieur au deuxi&egrave;me, ';} if(langage == 'org') {erreurNuitBis1 ='The first box must contain a number lower to second, ';}}
			if(parseInt(nuitbis2) != 23) {erreur = true; if(langage == 'fr') {erreurNuitBis0 = 'Le deuxi&egrave;me champ doit contenir la valeur 23, ';} if(langage == 'org') {erreurNuitBis0 = 'The second box must contain the value 23, ';}}
			if(parseInt(nuitbis1) - parseInt(jour2) != 1) {erreur = true; if(langage == 'fr') {erreurNuitBisJour1 = 'La plage horraire de cette p&eacute;riode ne correspond pas &agrave; celle de la nuit, ';} if(langage == 'org') {erreurNuitBisJour1 = 'The time slot of this period don\'t correspond with the night, ';}}
			if(parseInt(jour1) - parseInt(nuit2) != 1) {erreur = true; if(langage == 'fr') {erreurJourNuit1 = 'La plage horraire de cette p&eacute;riode ne correspond pas &agrave; celle du jour, ';} if(langage == 'org') {erreurJourNuit1 = 'The time slot of this period don\'t correspond with the day, ';}}
		}
		
		// Si on utilise que le jour
		else if(parseInt(nuit1) == (-1) && parseInt(nuit2) == (-1) && parseInt(aube1) == (-1) && parseInt(aube2) == (-1) && parseInt(jour1) != (-1) && parseInt(jour2) != (-1) && parseInt(crepuscule1) == (-1) && parseInt(crepuscule2) == (-1) && parseInt(nuitbis1) == (-1) && parseInt(nuitbis2) == (-1)) {
			if(parseInt(jour1) > parseInt(jour2) || parseInt(jour1) != 0 || parseInt(jour2) != 23) {erreur = true; if(langage == 'fr') {erreurJour3 = 'Pour avoir uniquement le jour d\'activ&eacute;, il faut que le premier champ contienne la valeur 0 et le second la valeur 23, ';} if(langage == 'org') {erreurJour3 = 'To get only the day, the first box must contain the value 0 et the second box the value 23, ';}}
		}
		
		// Si le premier champs est égal à -1 et l'autre non
		if(parseInt(nuit1) == (-1) && parseInt(nuit2) != (-1) || parseInt(nuit1) != (-1) && parseInt(nuit2) == (-1)) {erreur = true; if(langage == 'fr') {erreurNuit2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreurAube2 = 'Only one box contain the value -1, ';}}
		if(parseInt(aube1) == (-1) && parseInt(aube2) != (-1) || parseInt(aube1) != (-1) && parseInt(aube2) == (-1)) {erreur = true; if(langage == 'fr') {erreurAube2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreurAube2 = 'Only one box contain the value -1, ';}}
		if(parseInt(jour1) == (-1) || parseInt(jour2) == (-1)) {erreur = true; if(langage == 'fr') {erreurJour2 = 'La p&eacute;riode de journ&eacute;e ne peut pas &ecirc;tre d&eacute;sactiv&eacute;e et donc ne doit contenir aucun champ avec la valeur -1, ';} if(langage == 'org') {erreurJour2 = 'You can\'t remove the day period and so any box can contain the value -1, ';}}
		if(parseInt(crepuscule1) == (-1) && parseInt(crepuscule2) != (-1) || parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) == (-1)) {erreur = true; if(langage == 'fr') {erreurCrepuscule2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreur = true; erreurCrepuscule2 = 'Only one box contain the value -1, ';}}
		if(parseInt(nuitbis1) == (-1) && parseInt(nuitbis2) != (-1) || parseInt(nuitbis1) != (-1) && parseInt(nuitbis2) == (-1)) {erreur = true; if(langage == 'fr') {erreurNuitBis2 = 'Un seul champ contient la valeur -1, ';} if(langage == 'org') {erreurNuitBis2 = 'Only one box contain the value -1, ';}}
		
		// Si la nuit est désactivé et que l'aube ou le crépuscule ne l'est pas
		if(parseInt(nuit1) == (-1) && parseInt(nuitbis1) == (-1) && parseInt(nuit2) == (-1) && parseInt(nuitbis2) == (-1)) {
			if(parseInt(aube1) != (-1) && parseInt(aube2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitAube3 = 'La nuit est d&eacute;sactiv&eacute;e mais pas l\'aube, ';} if(langage == 'org') {erreurNuitAube3 = 'The night is remove but not the dawn, ';}}
			if(parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitCrepuscule3 = 'La nuit est d&eacute;sactiv&eacute;e mais pas le cr&eacute;puscule, ';} if(langage == 'org') {erreurNuitCrepuscule3 = 'The night is remove but not the dusk, ';}}
		}
		else if(parseInt(nuit1) == (-1) && parseInt(nuit2) == (-1) && parseInt(nuitbis1) != (-1) && parseInt(nuitbis2) != (-1)) {
			erreur = true;
			if(langage == 'fr') {erreurNuitNuitBis3 = 'La première partie de la nuit est d&eacute;sactiv&eacute; mais pas la seconde, ';}
			if(langage == 'org') {erreurNuitNuitBis3 = 'The first part of the night is remove but not the second, ';}
			if(parseInt(aube1) != (-1) && parseInt(aube2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitAube3 = 'Une partie de la nuit est d&eacute;sactiv&eacute;e mais pas l\'aube, ';} if(langage == 'org') {erreurNuitAube3 = 'A part of the night is remove but not the dawn, ';}}
			if(parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitCrepuscule3 = 'Une partie de la nuit est d&eacute;sactiv&eacute;e mais pas le cr&eacute;puscule, ';} if(langage == 'org') {erreurNuitCrepuscule3 = 'A part of the night is remove but not the dusk, ';}}
		}
		else if(parseInt(nuitbis1) == (-1) && parseInt(nuitbis2) == (-1) && parseInt(nuit1) != (-1) && parseInt(nuit2) != (-1)) {
			erreur = true;
			if(langage == 'fr') {erreurNuitBisNuit3 = 'La seconde partie de la nuit est d&eacute;sactiv&eacute;e mais pas la premi&egrave;re, ';}
			if(langage == 'org') {erreurNuitBisNuit3 = 'The second part of the night is remove but not the first, ';}
			if(parseInt(aube1) != (-1) && parseInt(aube2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitAube3 = 'La nuit est d&eacute;sactiv&eacute;e mais pas l\'aube, ';} if(langage == 'org') {erreurNuitAube3 = 'A part of the night is remove but not the dawn, ';}}
			if(parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) != (-1)) {erreur = true; if(langage == 'fr') {erreurNuitCrepuscule3 = 'La nuit est d&eacute;sactiv&eacute;e mais pas le c&eacute;puscule, ';} if(langage == 'org') {erreurNuitCrepuscule3 = 'A part of the night is remove but not the dusk, ';}}
		}
		
		// Si l'aube est désactivé et que le crépuscule ne l'est pas ou si le crépuscule est activé et que l'aube ne l'est pas
		if(parseInt(aube1) == (-1) && parseInt(aube2) == (-1) && parseInt(crepuscule1) != (-1) && parseInt(crepuscule2) != (-1)) {erreur = true; if(langage == 'fr') {erreurAubeCrepuscule3 = 'L\'aube est d&eacute;sactiv&eacute;e mais pas le cr&eacute;puscule, ';} if(langage == 'org') {erreurAubeCrepuscule3 = 'The dawn is remove but not the dusk, ';}}
		if(parseInt(crepuscule1) == (-1) && parseInt(crepuscule2) == (-1) && parseInt(aube1) != (-1) && parseInt(aube2) != (-1)) {erreur = true; if(langage == 'fr') {erreurCrepusculeAube3 = 'Le cr&eacute;puscule est d&eacute;sactiv&eacute; mais pas l\'aube, ';} if(langage == 'org') {erreurCrepusculeAube3 = 'The dusk is remove but not the dawn, ';}}
		
		
		if(erreur == true) {
			document.getElementById('ikartError1').innerHTML = erreurNuit1+erreurNuit0+erreurNuit2+erreurAubeNuit1+erreurJourNuit1+erreurNuitBisNuit3;
			document.getElementById('ikartError2').innerHTML = erreurAube1+erreurAube2+erreurJourAube1+erreurNuitAube3+erreurCrepusculeAube3;
			document.getElementById('ikartError3').innerHTML = erreurJour1+erreurJour2+erreurCrepusculeJour1+erreurNuitBisJour1+erreurJour3;
			document.getElementById('ikartError4').innerHTML = erreurCrepuscule1+erreurCrepuscule2+erreurNuitBisCrepuscule1+erreurAubeCrepuscule3+erreurNuitCrepuscule3;
			document.getElementById('ikartError5').innerHTML = erreurNuitBis1+erreurNuitBis0+erreurNuitBis2+erreurNuitNuitBis3;
			return false;
		}
		else {
			// Si la case allonger coché est trouvée
			if(allongerIsCheck) {checkedAlong = true;}
			else {checkedAlong = false;}
			
			// Si la case invertion coché est trouvée
			if(invertionIsCheck) {checkedInvert = true;}
			else {checkedInvert = false;}
			
			window.setTimeout(function() {
				GM_setValue('allonger', checkedAlong);
				GM_setValue('invertion', checkedInvert);
				GM_setValue('nuit1', parseInt(nuit1));
				GM_setValue('nuit2', parseInt(nuit2));
				GM_setValue('aube1', parseInt(aube1));
				GM_setValue('aube2', parseInt(aube2));
				GM_setValue('jour1', parseInt(jour1));
				GM_setValue('jour2', parseInt(jour2));
				GM_setValue('crepuscule1', parseInt(crepuscule1));
				GM_setValue('crepuscule2', parseInt(crepuscule2));
				GM_setValue('nuitbis1', parseInt(nuitbis1));
				GM_setValue('nuitbis2', parseInt(nuitbis2));
				GM_setValue('logo', logo);
				GM_setValue('repertoire', iRep);
				GM_setValue('langage', iLang);
			}, 0);
		
			return true;
		}
	}
}




// -------------------------------------------------------
// --------------- Debut de la stylisation ---------------
// -------------------------------------------------------



// -------- Ajouts Generals --------
//
// --- Agrandissement vers le bas ---
if(GM_getValue('allonger', false) == true){
STYLE('#city #container #mainview {				height: 777px; background-repeat: no-repeat; }');
STYLE('#city #container #mainview #locations {	overflow: visible; }');
STYLE('#city #container #mainview {				overflow: hidden; }');
}

// --- Icones Ressources Monde ---
STYLE('#worldmap_iso #worldmap .tradegood1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine_v1.png);	width: 25px; height: 25px; bottom: 100px; left: 50px; }');
STYLE('#worldmap_iso #worldmap .tradegood2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur_v1.png);	width: 25px; height: 25px; }');
STYLE('#worldmap_iso #worldmap .tradegood5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood_v1.png);	width: 25px; height: 25px; }');

// --- Icones Ressources Layout ---
STYLE('#container ul.resources .wine {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine.png); }');
STYLE('#container ul.resources .marble {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble.png); }');
STYLE('#container ul.resources .glass {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass.png); }');
STYLE('#container ul.resources .sulfur {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur.png); }');
STYLE('#container ul.resources .wood {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood.png); }');

// --- Icones Ressources Menu Déroulant des Ville ---
STYLE('#cityNav .citySelect .tradegood1 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine.png); }');
STYLE('#cityNav .citySelect .tradegood2 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble.png); }');
STYLE('#cityNav .citySelect .tradegood3 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass.png); }');
STYLE('#cityNav .citySelect .tradegood4 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur.png); }');

// --- Icones Ressources Transport ---
STYLE('#container .resourceAssign li.wine {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine_v1.png);}');
STYLE('#container .resourceAssign li.marble {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble_v1.png);}');
STYLE('#container .resourceAssign li.glass {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass_v1.png);}');
STYLE('#container .resourceAssign li.sulfur {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur_v1.png);}');
STYLE('#container .resourceAssign li.wood {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood_v1.png);}');

// --- Icones Ressources Trajet commerciaux du Bourgmestre ---
STYLE('html .dropdown .tradegood1 span.cityresource {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine.png);}');
STYLE('html .dropdown .tradegood2 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble.png);}');
STYLE('html .dropdown .tradegood3 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass.png);}');
STYLE('html .dropdown .tradegood4 span.cityresource {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur.png);}');
STYLE('html .dropdown .resource span.cityresource {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood.png);}');
	   
// --- Icones Ressources Caserne et Chantier Naval ---
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wine {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine_v1.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.marble {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble_v1.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.crystal {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass_v1.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.sulfur {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur_v1.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wood {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood_v1.png);}');

STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wine_inactive {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wine_v1_inactive.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.marble_inactive {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/marble_v1_inactive.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.crystal_inactive {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/glass_v1_inactive.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.sulfur_inactive {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/sulfur_v1_inactive.png);}');
STYLE('#mainview #accumulatedUnitCosts #accumulatedResourcesCosts li.wood_inactive {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/icon/wood_v1_inactive.png);}');

// --- Remplacement des icones restantes ---
if(document.getElementById('resource') || document.getElementById('tradegood') || document.getElementById('wonder') || document.getElementById('merchantNavy') || document.getElementById('warehouse') || document.getElementById('dump') || document.getElementById('townHall') || document.getElementById('palace') ||  document.getElementById('palaceColony') || document.getElementById('branchOffice') || document.getElementById('glassblowing') || document.getElementById('optician') || document.getElementById('stonemason') || document.getElementById('architect') || document.getElementById('vineyard') || document.getElementById('winegrower') || document.getElementById('alchemist') || document.getElementById('fireworker') || document.getElementById('carpentering') || document.getElementById('forester')) {
	var parent = document.getElementById('container');
	var content = parent.innerHTML;
	var wine = 'skin/resources/icon_wine.gif';
	var marble = 'skin/resources/icon_marble.gif';
	var crystal = 'skin/resources/icon_crystal.gif';
	var glass = 'skin/resources/icon_glass.gif';
	var sulfur = 'skin/resources/icon_sulfur.gif';
	var wood = 'skin/resources/icon_wood.gif';
	function replaceIcon() {
		if(content.search(wine) != -1 || content.search(marble) != -1 || content.search(crystal) != -1 || content.search(glass) != -1 || content.search(sulfur) != -1 || content.search(wood) != -1) {
			content = content.replace(wine, 'http://ika-art.teknopop.com/ScriptIkart/icon/wine.png');
			content = content.replace(marble, 'http://ika-art.teknopop.com/ScriptIkart/icon/marble.png');
			content = content.replace(crystal, 'http://ika-art.teknopop.com/ScriptIkart/icon/glass.png');
			content = content.replace(glass, 'http://ika-art.teknopop.com/ScriptIkart/icon/glass.png');
			content = content.replace(sulfur, 'http://ika-art.teknopop.com/ScriptIkart/icon/sulfur.png');
			content = content.replace(wood, 'http://ika-art.teknopop.com/ScriptIkart/icon/wood.png');
			replaceIcon();
		}
		else {
			parent.innerHTML = content;
		}
	}
	replaceIcon();
}

// --- Image du menu gauche sur la vue de la ville ---
if(document.getElementById('city') && document.getElementById('reportInboxLeft') && document.getElementById('reportInboxLeft').getElementsByTagName('img')[0]) {
	document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].src = GM_getValue('logo','http://ika-art.teknopop.com/ScriptIkart/logo/ikart.png');
}

// --- Changement Image Cave et Pressoir Interne ---
if(GM_getValue('invertion', true) == true){
STYLE('#vineyard #container #mainview #reductionBuilding .buildingDescription {						background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/presse.gif); }');
STYLE('#vineyard #container #mainview #reductionBuilding .contentBox01h .buildingPictureImg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/presse_icone.gif); }');
STYLE('#vineyard #container #mainview #reductionBuilding .contentBox01h .buildingPictureImg img {	visibility: hidden; }');

STYLE('#winegrower #container #mainview #bonusBuilding .buildingDescription {						background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/cave.gif); }');
STYLE('#winegrower #container #mainview #bonusBuilding .contentBox01h .buildingPictureImg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/cave_icone.gif); }');
STYLE('#winegrower #container #mainview #bonusBuilding .contentBox01h .buildingPictureImg img {		visibility: hidden; }');
}

// --- Correction divers bug direct du jeu ---
STYLE('#city #container #mainview #locations .port {			z-index: 302; position: absolute; }');
STYLE('#city #container #mainview #locations #position0 {		z-index: 351; position: absolute; }');
STYLE('#island #container #mainview #islandfeatures #wonder {	z-index: 501; }');
STYLE('#city #container #mainview #locations #position9 {		left: 222px; top: 185px; }');
STYLE('#city #container #mainview #locations .occupier1 {		z-index: 352; }');
STYLE('#city #container #mainview #locations .occupier2 {		z-index: 352; }');
STYLE('#island .island1 #cities #cityLocation4 .fleetAction {	bottom: 46px; left: 71px; }');
STYLE('#militaryAdvisorReportView #troopsReport ul.resources li {	display: inline-block; }');
STYLE('#militaryAdvisorReportView #troopsReport ul.resources li {	width: auto; margin-right: 8px; }');

// --- Bouton facebook ---
STYLE('#container #facebook_button a {			background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/facebook.png) no-repeat 0 0; width: 42px; height: 70px; }');
STYLE('#container #facebook_button a:hover {	background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/facebook.png) no-repeat 0 -70px; }');
STYLE('#container #facebook_button a.down {		background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/facebook.png) no-repeat 0 -140px; }');

// --- Bouton Ambrosia ---
STYLE('#globalResources .ambrosia a {		background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 0;}');
STYLE('#globalResources .ambrosia a:hover {	background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 -69px; }');
STYLE('#globalResources .ambrosia a.down {	background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 -138px; }');

STYLE('#globalResources .ambrosiaNoSpin a {			background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 0;}');
STYLE('#globalResources .ambrosiaNoSpin a:hover {	background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 -69px; }');
STYLE('#globalResources .ambrosiaNoSpin a.down {	background: transparent url(http://ika-art.teknopop.com/ScriptIkart/bug/btn_ambrosia_new.png) 0 -138px; }');

// --- Menu des ville ---
STYLE('#cityNav .citySelect * {						background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .dropbutton {			background-position: 0 0; cursor: pointer; }');
STYLE('#cityNav .citySelect .dropbutton:hover {		background-position: 0 -24px; }');
STYLE('#cityNav .citySelect .dropbutton.dropbutton_expanded {	background-position: 0 -48px; cursor: default; }');

STYLE('#cityNav .citySelect .optionList li {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li {			background-position: 0 -98px; }');
STYLE('#cityNav .citySelect .optionList li.first {		background-position: 0 -72px; }');
STYLE('#cityNav .citySelect .optionList li.last {		background-position: 0 -122px; }');
STYLE('#cityNav .citySelect .optionList li.first.last {	background-position: 0 -224px; line-height: 22px !important; }');

STYLE('#cityNav .citySelect .optionList li:hover {				background-position: 0 -174px !important; }');
STYLE('#cityNav .citySelect .optionList li.first:hover {		background-position: 0 -148px !important; }');
STYLE('#cityNav .citySelect .optionList li.last:hover {			background-position: 0 -198px !important; }');
STYLE('#cityNav .citySelect .optionList li.first.last:hover {	background-position: 0 -252px !important; }');

STYLE('#cityNav .citySelect .optionList li.deployedCities, #cityNav .citySelect .deployedCitiesa  {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li.deployedCities {				background-position: 0 -306px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.first {		background-position: 0 -280px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.last {			background-position: 0 -330px; }');
STYLE('#cityNav .citySelect .optionList li.deployedCities.first.last {	background-position: 0 -356px; }');

STYLE('#cityNav .citySelect .optionList li.occupiedCities, #cityNav .citySelect .occupiedCities  {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/bug/select_citynav.png); }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities {				background-position: 0 -410px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.first {		background-position: 0 -384px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.last {			background-position: 0 -434px; }');
STYLE('#cityNav .citySelect .optionList li.occupiedCities.first.last {	background-position: 0 -460px; }');

// --- Mise en page des option ---
STYLE('#ikartOptions #aideOption {		z-index: 31; list-style-image: none; list-style-position: outside; list-style-type: none; background-color: #F1D7AD; border-color: #BE8D53; border-style: double; border-width: 8px 3px 3px; color: #542C0F; display: none; font-size: 11px; margin: auto -55px; top: 305px; padding: 4px 8px; position: absolute; white-space: nowrap; width: auto; max-width: 350px; }');
STYLE('#ikartOptions #aideOption span {	z-index: 32; display: block; height: auto; left: 0; width: auto; max-width: 350px; white-space: normal; float: left; overflow: auto; position: static; cursor: help; }');
STYLE('#configIkart2, #configIkart3 {	margin-left: 10px; display: inline-block; }');
STYLE('#ikartOptions .ikartError {		padding-left: 10px; color: #f00f00; }');
STYLE('#configIkart1, #configIkart2, #configIkart3 {	cursor: pointer; }');
STYLE('#options .yui-navset .yui-nav li {				width: 147px; margin: 0 0 0 17px; overflow:hidden; white-space:nowrap; }');
STYLE('#options .yui-navset .yui-nav li em {			width: 147px; }');
STYLE('#options .yui-navset .yui-nav .selected a, #options .yui-navset .yui-nav a:hover {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/options/ongletSelected.jpg); }');

// --- Mise en page du textByIkArt ---
STYLE('#textbyikart {				width: 980px; position: absolute; text-align: center; top: 80px; z-index: 40; }');
STYLE('#textbyikart .caractere {	margin-left: -10px; }');
STYLE('#textbyikart .caractere.o {	margin-right: -5px; }');
STYLE('#textbyikart .caractere.p {	margin-right: -5px; }');

/*// --- Retirer la pub qui apparait parfois sur la droite et les + premium ---
STYLE('#banner_container {	display: none !important; }');
STYLE('#advisors a.plusteaser {		display: none !important; }');*/



// -------- Layout --------
STYLE('#militaryAdvisorDetailedReportView #container #container2 #header {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/layout/bg_header2.jpg); }');
STYLE('#premiumPayment #header {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/layout/bg_header2.jpg); }');
STYLE('#header {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/layout/bg_header.jpg); }');
STYLE('#extraDiv1 {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/layout/bg_sky.jpg); }');
STYLE('#extraDiv2 {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/layout/bg_ocean.jpg); }');


// --- Petit Drapeau ---
STYLE('#city #container #mainview #locations .land .flag {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/flag_red.gif); }');
STYLE('#city #container #mainview #locations .shore .flag {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/flag_blue.gif);	}');
STYLE('#city #container #mainview #locations .wall .flag {			background-image:url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/flag_yellow.gif); }');
STYLE('#island #container #mainview #cities .buildplace .claim {	background-image:url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/flag_yellow.gif);	width: 29px; height: 40px; display: block; position: absolute; left: 26px; bottom: 20px; }');


// -------- Villes --------
//
// --- Arriere Plan (Phase) ---
STYLE('#city #container .phase1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level1.jpg); }');
STYLE('#city #container .phase2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level2.jpg); }');
STYLE('#city #container .phase3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level3.jpg); }');
STYLE('#city #container .phase4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level4.jpg); }');
STYLE('#city #container .phase5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level5.jpg); }');
STYLE('#city #container .phase6 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level6.jpg); }');
STYLE('#city #container .phase7 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level7.jpg); }');
STYLE('#city #container .phase8 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level8.jpg); }');
STYLE('#city #container .phase9 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level9.jpg); }');
STYLE('#city #container .phase10 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level10.jpg); }');
STYLE('#city #container .phase11 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level11.jpg); }');
STYLE('#city #container .phase12 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level12.jpg); }');
STYLE('#city #container .phase13 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level13.jpg); }');
STYLE('#city #container .phase14 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level14.jpg); }');
STYLE('#city #container .phase15 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level15.jpg); }');
STYLE('#city #container .phase16 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level16.jpg); }');
STYLE('#city #container .phase17 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level17.jpg); }');
STYLE('#city #container .phase18 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level18.jpg); }');
STYLE('#city #container .phase19 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level19.jpg); }');
STYLE('#city #container .phase20 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level20.jpg); }');
STYLE('#city #container .phase21 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level21.jpg); }');
STYLE('#city #container .phase22 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level22.jpg); }');
STYLE('#city #container .phase23 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level23.jpg); }');
STYLE('#city #container .phase24 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level24.jpg); }');
STYLE('#city #container .phase25 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level25.jpg); }');
STYLE('#city #container .phase26 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level26.jpg); }');
STYLE('#city #container .phase27 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/city_level26.jpg); }');

// --- Rallongement Phases (Sous-Phase) ---
STYLE('#city #container .phase1 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase2 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase3 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase4 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase5 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase6 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase7 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase8 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase9 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase10 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase11 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase12 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase13 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level1.jpg); }');
STYLE('#city #container .phase14 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase15 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase16 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase17 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level14.jpg); }');
STYLE('#city #container .phase18 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase19 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase20 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase21 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase22 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level18.jpg); }');
STYLE('#city #container .phase23 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase24 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase25 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase26 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level23.jpg); }');
STYLE('#city #container .phase27 #ikartLocation {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/overfooter/city_level26.jpg); }');
STYLE('#city #container #ikartLocation {			z-index: 100; width: 720px; height: 337px; position: absolute; }');

// --- Batiment ---
STYLE('#city #container #mainview #locations .shipyard .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/chantier_naval.png);	left: -22px; top: -20px; width: 129px; height: 100px; }');
STYLE('#city #container #mainview #locations .museum .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/musee.png);			left: -8px; top: -38px; width: 105px; height: 85px; }');
STYLE('#city #container #mainview #locations .warehouse .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/entrepot.png);			left: -18px; top: -33px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .wall .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/mur.png);				left: -500px; top: -15px; width: 720px; height: 137px; }');
STYLE('#city #container #mainview #locations .tavern .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/taverne.png);			left: -10px; top: -15px; width: 111px; height: 65px; }');
STYLE('#city #container #mainview #locations .palace .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/palais.png);			left: -10px; top: -42px; width: 106px; height: 97px; }');
STYLE('#city #container #mainview #locations .academy .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/academie.png);			left: -19px; top: -31px; width: 123px; height: 90px; }');
STYLE('#city #container #mainview #locations .workshop .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/atelier.png);			left: -19px; top: -31px; width: 106px; height: 85px; }');
STYLE('#city #container #mainview #locations .safehouse .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/cachette.png);			left: -5px; top: -15px; width: 084px; height: 58px; }');
STYLE('#city #container #mainview #locations .branchOffice .buildingimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/comptoir.png);			left: -19px; top: -31px; width: 109px; height: 84px; }');
STYLE('#city #container #mainview #locations .embassy .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/ambassade.png);		left: -5px; top: -31px; width: 093px; height: 85px; }');
STYLE('#city #container #mainview #locations .palaceColony .buildingimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/residence.png);		left: -10px; top: -42px; width: 109px; height: 95px; }');
if(GM_getValue('langage', 'fr') == 'fr') {
STYLE('#city #container #mainview #locations .townHall .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/hotel_1.5.0.png);		left: -5px; top: -60px; width: 104px; height: 106px; }');
} else if(GM_getValue('langage', 'org') == 'org') {
STYLE('#city #container #mainview #locations .townHall .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/ORG.hotel_1.5.0.png);	left: -5px; top: -60px; width: 104px; height: 106px; }');
}
STYLE('#city #container #mainview #locations .barracks .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/caserne.png);			left: 0; top: -33px; width: 100px; height: 76px; }');
STYLE('#city #container #mainview #locations .port .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/port.png);				left: -65px; top: -35px; width: 163px; height: 138px; }');
STYLE('#city #container #mainview #locations .wall .constructionSite {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/construction2.png);	left: -500px; top: -15px; width: 720px; height: 137px; }');
STYLE('#city #container #mainview #locations li .constructionSite { 		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/construction.png);		left: -20px; top: -30px; width: 114px; height: 81px; }');
STYLE('#city #container #mainview #locations .alchemist .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/alchimiste.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .architect .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/bureau_architecte.png);left: -20px; top: -33px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .optician .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/opticien.png);			left: -17px; top: -44px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .stonemason .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/atelier_marbre.png);	left: -20px; top: -33px; width: 126px; height: 86px; }');
if(GM_getValue('invertion', true) == true) {
STYLE('#city #container #mainview #locations .vineyard .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/pressoir.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .winegrower .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/cave_vin.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
} else if(GM_getValue('invertion', true) == false) {
STYLE('#city #container #mainview #locations .winegrower .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/cave_vin.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .vineyard .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/pressoir.png);			left: -20px; top: -30px; width: 126px; height: 86px; }');
}
STYLE('#city #container #mainview #locations .carpentering .buildingimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/menuiserie.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .fireworker .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/atelier_soufre.png);	left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .forester .buildingimg {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/atelier_bois.png);		left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .glassblowing .buildingimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/atelier_cristal.png);	left: -20px; top: -30px; width: 126px; height: 86px; }');
STYLE('#city #container #mainview #locations .temple .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/temple.png);			left: 5px; top: -23px; width: 69px; height: 67px; }');
STYLE('#city #container #mainview #locations .dump .buildingimg {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/batiment/depot.png);			left: -5px; top: -31px; width: 96px; height: 74px; }');

// --- Scènes ---
STYLE('#city #container #mainview #locations .transporter {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/transporteur.png);	}');
STYLE('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/garnison.png); }');
STYLE('#city #container #mainview #locations .protester {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/emeute.png); left:342px; top:192px;	;}');
STYLE('#city #container #mainview #locations .beachboys {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/nageurs.png);	}');
STYLE('#city #container #mainview.phase24 #locations .beachboys, #city #container #mainview.phase25 #locations .beachboys, #city #container #mainview.phase26 #locations .beachboys, #city #container #mainview.phase27 #locations .beachboys {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/nageurs24.png); }');
STYLE('#city #container #mainview #locations .occupier1 {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/town_occ1.gif);	}');
STYLE('#city #container #mainview #locations .occupier2 {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/town_occ1.gif);	}');
STYLE('#city #container #mainview #locations .occupierGate1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/town_occ1.gif);	}');
STYLE('#city #container #mainview #locations .occupierGate2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/town_occ2.gif);	}');
STYLE('#city #container #mainview #locations .occupierBeach {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/town_occ2.gif);	}');
STYLE('#city #container #mainview #locations .theatre {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/theatre.png);	z-index: 100; position: absolute; width: 48px; height: 57px; top: 279px; left:7px;	}');
//STYLE('#city #container #mainview #ikartLocation .spectacle {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/spectacle.png);	z-index: 100; position: absolute; width: 70px; height: 54px; top: 150px; left:7px;	}');
//STYLE('#city #container #mainview #ikartLocation .nageurs {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/nageurs2.png); }');
//STYLE('#city #container #mainview #ikartLocation .armada{		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/armada.png); }');
//STYLE('#city #container #mainview #ikartLocation .emeute {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ville/emeute2.png); }');



// -------- Iles --------
//
// --- Fight Terre ---
STYLE('#island #cities .foreignOccupier {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_hold_red.gif); }');
STYLE('#island #cities .ownOccupier {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_hold_blue.gif); }');
STYLE('#island #cities .allyOccupier {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_hold_green.gif); }');
STYLE('#island #cities .treatyOccupier {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_hold_yellow.gif); }');

STYLE('#island #cities .fight {				background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_fight_town.gif); }');

// --- Fight Mer ---
STYLE('#island #cities .foreignBlocker {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/port_hold_red.png); }');
STYLE('#island #cities .ownBlocker {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/port_hold_blue.png); }');
STYLE('#island #cities .allyBlocker {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/port_hold_green.png); }');
STYLE('#island #cities .treatyBlocker {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/port_hold_yellow.png); }');

STYLE('#island #cities .seafight {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/fight/city_fight_port.png); }');

// --- Arrière Plan (Iles) ---
STYLE('#island .island1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/insel1.jpg); }');
STYLE('#island .island2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/insel2.jpg); }');
STYLE('#island .island3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/insel3.jpg); }');
STYLE('#island .island4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/insel4.jpg); }');
STYLE('#island .island5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/insel5.jpg); }');

// --- Les Villes sur l'ile (Rouge) ---
STYLE('#island #mainview #cities .level1 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_1_red.gif); }');
STYLE('#island #mainview #cities .level2 div.cityimg, #island #mainview #cities .level3 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_2_red.gif); }');
STYLE('#island #mainview #cities .level4 div.cityimg, #island #mainview #cities .level5 div.cityimg, #island #mainview #cities .level6 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_3_red.gif); }');
STYLE('#island #mainview #cities .level7 div.cityimg, #island #mainview #cities .level8 div.cityimg, #island #mainview #cities .level9 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_4_red.gif); }');
STYLE('#island #mainview #cities .level10 div.cityimg, #island #mainview #cities .level11 div.cityimg, #island #mainview #cities .level12 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_5_red.gif); }');
STYLE('#island #mainview #cities .level13 div.cityimg, #island #mainview #cities .level14 div.cityimg, #island #mainview #cities .level15 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_6_red.gif); }');
STYLE('#island #mainview #cities .level16 div.cityimg, #island #mainview #cities .level17 div.cityimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_7_red.gif); }');
STYLE('#island #mainview #cities .level18 div.cityimg, #island #mainview #cities .level19 div.cityimg, #island #mainview #cities .level20 div.cityimg, #island #mainview #cities .level21 div.cityimg, #island #mainview #cities .level22 div.cityimg, #island #mainview #cities .level23 div.cityimg, #island #mainview #cities .level24 div.cityimg {background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_8_red.gif); }');

// --- Les Villes sur l'ile (Bleu) ---
STYLE('#island #mainview #cities .level1 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_1_blue.gif); }');
STYLE('#island #mainview #cities .level2 div.ownCityImg, #island #mainview #cities .level3 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_2_blue.gif); }');
STYLE('#island #mainview #cities .level4 div.ownCityImg, #island #mainview #cities .level5 div.ownCityImg, #island #mainview #cities .level6 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_3_blue.gif); }');
STYLE('#island #mainview #cities .level7 div.ownCityImg, #island #mainview #cities .level8 div.ownCityImg, #island #mainview #cities .level9 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_4_blue.gif); }');
STYLE('#island #mainview #cities .level10 div.ownCityImg, #island #mainview #cities .level11 div.ownCityImg, #island #mainview #cities .level12 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_5_blue.gif); }');
STYLE('#island #mainview #cities .level13 div.ownCityImg, #island #mainview #cities .level14 div.ownCityImg, #island #mainview #cities .level15 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_6_blue.gif); }');
STYLE('#island #mainview #cities .level16 div.ownCityImg, #island #mainview #cities .level17 div.ownCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_7_blue.gif); }');
STYLE('#island #mainview #cities .level18 div.ownCityImg, #island #mainview #cities .level19 div.ownCityImg, #island #mainview #cities .level20 div.ownCityImg, #island #mainview #cities .level21 div.ownCityImg, #island #mainview #cities .level22 div.ownCityImg, #island #mainview #cities .level23 div.ownCityImg, #island #mainview #cities .level24 div.ownCityImg {background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_8_blue.gif); }');

// --- Les Villes sur l'ile (Vert) ---
STYLE('#island #mainview #cities .level1 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_1_green.gif); }');
STYLE('#island #mainview #cities .level2 div.allyCityImg, #island #mainview #cities .level3 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_2_green.gif); }');
STYLE('#island #mainview #cities .level4 div.allyCityImg, #island #mainview #cities .level5 div.allyCityImg, #island #mainview #cities .level6 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_3_green.gif); }');
STYLE('#island #mainview #cities .level7 div.allyCityImg, #island #mainview #cities .level8 div.allyCityImg, #island #mainview #cities .level9 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_4_green.gif); }');
STYLE('#island #mainview #cities .level10 div.allyCityImg, #island #mainview #cities .level11 div.allyCityImg, #island #mainview #cities .level12 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_5_green.gif); }');
STYLE('#island #mainview #cities .level13 div.allyCityImg, #island #mainview #cities .level14 div.allyCityImg, #island #mainview #cities .level15 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_6_green.gif); }');
STYLE('#island #mainview #cities .level16 div.allyCityImg, #island #mainview #cities .level17 div.allyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_7_green.gif); }');
STYLE('#island #mainview #cities .level18 div.allyCityImg, #island #mainview #cities .level19 div.allyCityImg, #island #mainview #cities .level20 div.allyCityImg, #island #mainview #cities .level21 div.allyCityImg, #island #mainview #cities .level22 div.allyCityImg, #island #mainview #cities .level23 div.allyCityImg, #island #mainview #cities .level24 div.allyCityImg {background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_8_green.gif) ; }');

// --- Les Villes sur l'ile (Jaune) ---
STYLE('#island #mainview #cities .level1 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_1_yellow.gif); }');
STYLE('#island #mainview #cities .level2 div.treatyCityImg, #island #mainview #cities .level3 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_2_yellow.gif); }');
STYLE('#island #mainview #cities .level4 div.treatyCityImg, #island #mainview #cities .level5 div.treatyCityImg, #island #mainview #cities .level6 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_3_yellow.gif); }');
STYLE('#island #mainview #cities .level7 div.treatyCityImg, #island #mainview #cities .level8 div.treatyCityImg, #island #mainview #cities .level9 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_4_yellow.gif); }');
STYLE('#island #mainview #cities .level10 div.treatyCityImg, #island #mainview #cities .level11 div.treatyCityImg, #island #mainview #cities .level12 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_5_yellow.gif); }');
STYLE('#island #mainview #cities .level13 div.treatyCityImg, #island #mainview #cities .level14 div.treatyCityImg, #island #mainview #cities .level15 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_6_yellow.gif) ;}');
STYLE('#island #mainview #cities .level16 div.treatyCityImg, #island #mainview #cities .level17 div.treatyCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_7_yellow.gif); }');
STYLE('#island #mainview #cities .level18 div.treatyCityImg, #island #mainview #cities .level19 div.treatyCityImg, #island #mainview #cities .level20 div.treatyCityImg,#island #mainview #cities .level21 div.treatyCityImg, #island #mainview #cities .level22 div.treatyCityImg, #island #mainview #cities .level23 div.treatyCityImg, #island #mainview #cities .level24 div.treatyCityImg {background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/city_8_yellow.gif); }');

// --- Batiment des Dieux / Temple ---
STYLE('#island #islandfeatures .wonder1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder1.png); }');
STYLE('#island #islandfeatures .wonder2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder2.png); }');
STYLE('#island #islandfeatures .wonder3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder3.png); }');
STYLE('#island #islandfeatures .wonder4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder4.png); }');
STYLE('#island #islandfeatures .wonder5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder5.png); }');
STYLE('#island #islandfeatures .wonder6 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder6.png); }');
STYLE('#island #islandfeatures .wonder7 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder7.png); }');
STYLE('#island #islandfeatures .wonder8 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/temple/wonder8.png); }');

// --- Ressource / Exploitation ---
STYLE('#island #islandfeatures .marble a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/ress/resource_marble.png); }');
STYLE('#island #islandfeatures .wood a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/ress/resource_wood.png); }');
STYLE('#island #islandfeatures .wine a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/ress/resource_wine.png); }');
STYLE('#island #islandfeatures .crystal a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/ress/resource_glass.png); }');
STYLE('#island #islandfeatures .sulfur a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/ress//resource_sulfur.png); }');

// --- Villages Barbares, Forum, Colonie et sélections ---
STYLE('#island #barbarianVilliage {				background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/barbares.gif); }');
STYLE('#island #barbarianVilliage.selected a {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/select_barbares.gif); }');
STYLE('#island #islandfeatures .forum {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/forum.gif); }');
STYLE('#island #mainview #cities .selectimg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/select_city.gif); }');
STYLE('#island #mainview #cities .city .buildCityImg {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/ile/city/site_colonie.gif); }');



// ------ Monde --------
//
// --- Ocean et Ocean Anim ---
STYLE('#worldmap_iso #scrollcover {					background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/bg_ocean.gif) !important; }');
STYLE('#worldmap_iso #worldmap .ocean1 {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_01.gif); }');
STYLE('#worldmap_iso #worldmap .ocean2 {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_02.gif); }');
STYLE('#worldmap_iso #worldmap .ocean3 {			background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_03.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_anim_01.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_anim_02.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_anim_03.gif); }');
STYLE('#worldmap_iso #worldmap .ocean_feature4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/ocean_anim_04.gif); }');

// --- ile (normal) ---
STYLE('#worldmap_iso #worldmap .island1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01.gif); }');
STYLE('#worldmap_iso #worldmap .island2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02.gif); }');
STYLE('#worldmap_iso #worldmap .island3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03.gif); }');
STYLE('#worldmap_iso #worldmap .island4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04.gif); }');
STYLE('#worldmap_iso #worldmap .island5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05.gif); }');
STYLE('#worldmap_iso #worldmap .island6 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01.gif); }');
STYLE('#worldmap_iso #worldmap .island7 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02.gif); }');
STYLE('#worldmap_iso #worldmap .island8 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03.gif); }');
STYLE('#worldmap_iso #worldmap .island9 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04.gif); }');
STYLE('#worldmap_iso #worldmap .island10 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05.gif); }');

// --- ile (bleu) ---
STYLE('#worldmap_iso #worldmap .island1own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island2own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island3own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island4own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island5own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island6own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island7own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island8own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island9own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_blue.gif); }');
STYLE('#worldmap_iso #worldmap .island10own {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_blue.gif); }');

// --- ile (verte) ---
STYLE('#worldmap_iso #worldmap .island1ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_green.gif); }');
STYLE('#worldmap_iso #worldmap .island2ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_green.gif); }');
STYLE('#worldmap_iso #worldmap .island3ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_green.gif); }');
STYLE('#worldmap_iso #worldmap .island4ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_green.gif); }');
STYLE('#worldmap_iso #worldmap .island5ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_green.gif); }');
STYLE('#worldmap_iso #worldmap .island6ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_green.gif); }');
STYLE('#worldmap_iso #worldmap .island7ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_green.gif); }');
STYLE('#worldmap_iso #worldmap .island8ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_green.gif); }');
STYLE('#worldmap_iso #worldmap .island9ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_green.gif); }');
STYLE('#worldmap_iso #worldmap .island10ally {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_green.gif); }');

// --- ile (jaune) ---
STYLE('#worldmap_iso #worldmap .island1treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island2treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island3treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island4treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island5treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island6treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_01_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island7treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_02_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island8treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_03_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island9treaty {		background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_04_yellow.gif); }');
STYLE('#worldmap_iso #worldmap .island10treaty {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/island_05_yellow.gif); }');

// --- Batiment des Dieux / Temple ---
STYLE('#worldmap_iso #worldmap .wonder1 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w1.gif); }');
STYLE('#worldmap_iso #worldmap .wonder2 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w2.gif); }');
STYLE('#worldmap_iso #worldmap .wonder3 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w3.gif); }');
STYLE('#worldmap_iso #worldmap .wonder4 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w4.gif); }');
STYLE('#worldmap_iso #worldmap .wonder5 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w5.gif); }');
STYLE('#worldmap_iso #worldmap .wonder6 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w6.gif); }');
STYLE('#worldmap_iso #worldmap .wonder7 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w7.gif); }');
STYLE('#worldmap_iso #worldmap .wonder8 {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/temple/w8.gif); }');

// --- Sélection ---
STYLE('#worldmap_iso #worldmap .islandMarked {	background-image: url(http://ika-art.teknopop.com/ScriptIkart/'+repertoire+'/'+periode+'/monde/select_island.gif); }');


// -------------------------------------------------------
// ----------------- Fin du Script IkArt -----------------
// -------------------------------------------------------


//---- Et bien d'autre encore à découvrir !!!  Suivez IkArt...