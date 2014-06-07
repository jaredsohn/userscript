// ==UserScript==

// @name           Ogame_MonkeyTools
// @namespace      monkey
// @version        1.53
// @author         MonkeyIsBack
// @include        http://*ogame.*/game/index.php?page=*
// ==/UserScript==


(function () {
		/*********************************************************
		 *                     INTERFACE                         *
		 *********************************************************/
	var langData = [];
	langData['fr'] = {
		// MonkeyTool's global menu
		menu_interfaceOgame: 'Options Interface Ogame', // Ogame Interface & Menu options
		menu_menuOgame: 'Options Menu Ogame', // Ogame Interface & Menu options
		menu_pageRech: 'Options page Recherche', // Research options
		menu_mess_SmallCR: 'Options rapport de Combat', // Mini-CR options
		menu_mess_BigCR: 'Options rapport de Combat détaillé', // Detailled CR options
		menu_batiment: 'Options des Bâtiments', // Building Options
		menu_flotte: 'Options de la page Flotte', // fleet1 Options
		// Bottom's menus
		menu_performance: 'Options de performance', 
		// close monkeyTools
		label_Close: 'fermer',
		// Submit Button Values
		label_Save: 'Enregistrer', // MonkeyTool's form Save text
		label_Cancel: 'Annuler', // MonkeyTool's form Cancel text
		label_Reset: 'Vider', // MonkeyTool's form Reset text
		// Par / By
		label_Par: 'par ',
		// menu_interfaceOgame
		interfaceOgame_changeTitle:'Modifier le titre de la page Ogame dans le navigateur',
		interfaceOgame_raccTitle:'Raccourcir à trois chiffres / lettres',
		interfaceOgame_raccTitleNew:'Egalement sur les nouveaux univers',
		interfaceOgame_pageApres:'Rajouter la page actuelle dans l\'adresse',
		interfaceOgame_pageRename:'Si oui, renommer ces pages ?',
		interfaceOgame_showProd: 'Afficher la production sous le nom des ressources',
		// menu_MenuOgame
		menuOgame_cacherTuto: 'Masquer le Tutoriel', // hide putorial
		menuOgame_cacherPatchnotes: 'Masquer les Patchnotes', // hide patchnotes

		// page recherche
		pageRech_maxLvlShow: 'Afficher le niveau max des technologies inutiles',
		pageRech_energyMaxLvl: 'Afficher La technologie Energie au niveau 12 maximum',
		// page mini RC
		pageSmallRC_showRenta: 'Afficher la rentabilité pillage, pillage + recyclage de l\'attaquant, et recyclage du défenseur',
		// page Bâtiments
		pageFlotte_ptsExpe: 'Rajouter une case qui affiche les points d\'expédition sur la page flotte',
		// performance menu
		performance_messageScore: 'Accélérer la messagerie et la page classement'
	};


	var pages = [];
		pages['fr'] = [];
		pages['fr']['overview'] = 'Vue générale';
		pages['fr']['fleet1'] = 'Flotte';
		pages['fr']['fleet2'] = 'Envoi flotte 1';
		pages['fr']['fleet3'] = 'Envoi flotte 2';
		pages['fr']['galaxy'] = 'Galaxie';
		pages['fr']['resources'] = 'Bâtiments';
		pages['fr']['station'] = 'Installations';
		pages['fr']['trader'] = 'Marchand';
		pages['fr']['research'] = 'Recherche';
		pages['fr']['shipyard'] = 'Chantier spatial';
		pages['fr']['defense'] = 'Défense';
		pages['fr']['movement'] = 'Mouvements de flotte';
		pages['fr']['alliance'] = 'Alliance';
		pages['fr']['statistics'] = 'Classement';
		pages['fr']['resourceSettings'] = 'Production';
		pages['fr']['premium'] = 'Casino d\'officiers';
		pages['fr']['messages'] = 'Messages';
	
	var authorsData = {
		// outil d'accélération messagerie
		performance:{author: 'Shuusaku', link: 'http://userscripts.org/scripts/show/78338'}
	};

	function number_format(number, decimals, dec_point, thousands_sep) {
		// http://phpjs.org/functions/number_format:481
		number = (number+'').replace(',', '').replace(' ', '');
		var n = !isFinite(+number) ? 0 : +number, 
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function (n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.round(n * k) / k;        };
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    }
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}    return s.join(dec);
	}


	function trim(myStr) {
		return myStr.replace(/^\s+/g,'').replace(/\s+$/g,'');
	} 



	function monkeySave(name, value) {
		GM_setValue('MT_Opt_' + name, value);
	}

	function monkeyLoad(name) {
		return GM_getValue('MT_Opt_' + name);
	}

	function monkeyDelete(name) {
		GM_deleteValue('MT_Opt_' + name);
	}


	
	function showGlobalMenu(){
		// menu contenant le Mtools
		var mainMenuGlobalDiv = document.createElement('div')
			mainMenuGlobalDiv.style.position = 'fixed';
			mainMenuGlobalDiv.style.width = '100%';
			mainMenuGlobalDiv.style.height = '100%';
			mainMenuGlobalDiv.style.top = '0px';
			mainMenuGlobalDiv.style.left = '0px';
			mainMenuGlobalDiv.style.background = '#000000 url(http://' + window.location.host + '/game/img/background/background_voll_2.jpg) no-repeat 50% -150px';
			mainMenuGlobalDiv.style.zIndex = '500';
		posGlobalMenu.appendChild(mainMenuGlobalDiv);
		
		
		// bouton pour fermer le MTools
		var mainMenuCloseAnchor = document.createElement('a')
			mainMenuCloseAnchor.appendChild(document.createTextNode('[' + langData[setLanguage].label_Close + ']'));
			mainMenuCloseAnchor.style.position = 'absolute';
			mainMenuCloseAnchor.style.top = '3px';
			mainMenuCloseAnchor.style.right = '3px';
			mainMenuCloseAnchor.style.color = 'red';
			mainMenuCloseAnchor.addEventListener("click", (function () {
				closeElement(mainMenuGlobalDiv);
			}), true);
		mainMenuGlobalDiv.appendChild(mainMenuCloseAnchor);

		// liste d'onglets du menu
		var onglets = [
			[langData[setLanguage].menu_menuOgame, "optionsInterfaceOgame", 'top'],
			[langData[setLanguage].menu_pageRech, "optionsPageRecherche", 'top'],
			[langData[setLanguage].menu_mess_SmallCR, "optionsRC", 'top'],
			[langData[setLanguage].menu_mess_BigCR, "optionsRCDetaille", 'top'],
			[langData[setLanguage].menu_batiment, "optionsBatiments", 'top'],
			[langData[setLanguage].menu_flotte, "optionsPageFlotte", 'top'],
			[langData[setLanguage].menu_performance, "optionsAcceleration", 'bottom']
		];
		var mainMenuOnglet;
		var i = 0;
		var j = 0;
		var k = 0;
		while((i+j) < onglets.length) {
			k = (i+j);
			mainMenuOnglet = document.createElement('a');
			mainMenuOnglet.appendChild(document.createTextNode(onglets[k][0]));
			mainMenuOnglet.style.position = 'absolute';
			if (onglets[k][2] == 'top') { mainMenuOnglet.style.top = 29 * i + 20 + 'px'; i++; }
			else { mainMenuOnglet.style.bottom = 29 * j + 20 + 'px'; j++; }
			mainMenuOnglet.style.left = '0px';
			mainMenuOnglet.style.padding = '5px';
			mainMenuOnglet.style.border = '1px solid gray';
			mainMenuOnglet.style.width = '220px';
			mainMenuOnglet.style.color = 'black';
			mainMenuOnglet.style.cursor = 'pointer';
			mainMenuOnglet.style.backgroundColor = '#ffffff';
			mainMenuOnglet.id = onglets[k][1];
			mainMenuOnglet.addEventListener("mouseover", (function () {
				this.style.backgroundColor = '#dddddd';
			}), false);
			mainMenuOnglet.addEventListener("mouseout", (function () {
				this.style.backgroundColor = '#ffffff';
			}), false);
			mainMenuOnglet.addEventListener("click", (function () {
				showInsideMenu(mainMenuGlobalDiv, this.id);
			}), false);
			mainMenuGlobalDiv.appendChild(mainMenuOnglet);
		}
	}

	function showInsideMenu(posElement, menu) {
		if (lastOpenedInsideMenu) closeElement(lastOpenedInsideMenu);
		
		insideMenuGlobalDiv = createInsideMenu (posElement);

		if (menu == "optionsInterfaceOgame") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle(langData[setLanguage].menu_interfaceOgame));
			var formIM = insideMenuCreerForm('optInterfaceOgame');
				formIM.appendChild(insideMenuAttachCheckBox('oIO_Change_Title', langData[setLanguage].interfaceOgame_changeTitle));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oIO_Raccourcir_Title', langData[setLanguage].interfaceOgame_raccTitle));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oIO_Raccourcir_Title_New', langData[setLanguage].interfaceOgame_raccTitleNew));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oIO_pageApres', langData[setLanguage].interfaceOgame_pageApres));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oIO_pageRename', langData[setLanguage].interfaceOgame_pageRename));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oIO_Show_Prod', langData[setLanguage].interfaceOgame_showProd));
			insideMenuGlobalDiv.appendChild(formIM);
			
			insideMenuGlobalDiv.appendChild(insideMenuTitle(langData[setLanguage].menu_menuOgame));
			var formIM = insideMenuCreerForm('optMenuOgame');
				formIM.appendChild(insideMenuAttachCheckBox('oMO_Masquer_Tuto', langData[setLanguage].menuOgame_cacherTuto));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oMO_Masquer_PatchNote', langData[setLanguage].menuOgame_cacherPatchnotes));
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}
		
		if (menu == "optionsPageRecherche") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("page Recherche"));
			var formIM = insideMenuCreerForm('optPageRech');
				formIM.appendChild(insideMenuAttachCheckBox('oPR_Max_Lvl_Autres', langData[setLanguage].pageRech_maxLvlShow));
				formIM.appendChild(document.createElement('br'));
				formIM.appendChild(insideMenuAttachCheckBox('oPR_Max_Lvl_Energie', langData[setLanguage].pageRech_energyMaxLvl));
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}
		if (menu == "optionsRC") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("Options des Rapports de Combats (mini)"));
			var formIM = insideMenuCreerForm('optMiniRC');
				formIM.appendChild(insideMenuAttachCheckBox('oRC_Show_Renta', langData[setLanguage].pageSmallRC_showRenta));
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}
		if (menu == "optionsRCDetaille") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("Options des Rapports de Combats Détaillés"));
		}
		if (menu == "optionsPageFlotte") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("Options de la Page Flotte"));
			var formIM = insideMenuCreerForm('optPageFlotte');
				formIM.appendChild(insideMenuAttachCheckBox('oPF_Points_Expe', langData[setLanguage].pageFlotte_ptsExpe));
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}
		if (menu == "optionsBatiments") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("Options des Bâtiments"));
			var formIM = insideMenuCreerForm('optPageBat');
				
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}
		if (menu == "optionsAcceleration") {
			insideMenuGlobalDiv.appendChild(insideMenuTitle("Options de Performance"));
			var formIM = insideMenuCreerForm('optPerfOgame');
				formIM.appendChild(insideMenuAttachCheckBox('oPO_Accelerer_Messagerie', langData[setLanguage].performance_messageScore));
				formIM.appendChild(insideMenuAttachAuthorValue(authorsData.performance));
			insideMenuGlobalDiv.appendChild(formIM);
			insideMenuGlobalDiv.appendChild(insideMenuSubmitButtons());
		}


		currentInsideMenuId = menu;
		lastOpenedInsideMenu = insideMenuGlobalDiv;
	}


	function closeElement(Element) {
		Element.parentNode.removeChild(Element);
	}


	function createInsideMenu (posElement) {
		var noeudPrincipal = document.createElement('div');
			noeudPrincipal.style.position = 'absolute';
			noeudPrincipal.style.textAlign = 'left';
			noeudPrincipal.style.top = '20px';
			noeudPrincipal.style.left = '275px';
			noeudPrincipal.style.width = '600px';
			noeudPrincipal.style.border = '1px solid gray';

		var insideMenuCloseLink = document.createElement('a');
			insideMenuCloseLink.style.position = 'absolute';
			insideMenuCloseLink.style.top = '0px';
			insideMenuCloseLink.style.right = '0px';
			insideMenuCloseLink.style.color = 'red';
			insideMenuCloseLink.appendChild(document.createTextNode('[x]'));
			insideMenuCloseLink.addEventListener("click", (function () {
				closeElement(noeudPrincipal);
				lastOpenedInsideMenu = null;
			}), true);
		noeudPrincipal.appendChild(insideMenuCloseLink);
		
		posElement.appendChild(noeudPrincipal);
		return noeudPrincipal;
	}


	function insideMenuTitle (title) {
		var newElm = document.createElement('div')
			newElm.style.position = 'relative';
			newElm.style.textAlign = 'center';
			newElm.style.marginTop = '15px';
			newElm.style.left = '1px';
			newElm.style.padding = '2px';
			newElm.style.fontSize = '15px';
			newElm.style.fontWeight = 'bold';
			newElm.style.width = '592px';
			newElm.style.border = '1px solid orange';
			newElm.appendChild(document.createTextNode(title));
		return newElm;
	}


	function insideMenuCreerForm (id) {
		var newElm = document.createElement('form')
			newElm.style.position = 'relative';
			newElm.style.textAlign = 'left';
			newElm.style.left = '1px';
			newElm.style.padding = '3px';
			newElm.style.marginTop = '1px';
			newElm.style.marginBottom = '1px';
			newElm.style.fontSize = '13px';
			newElm.style.fontWeight = 'bold';
			newElm.style.width = '590px';
			newElm.id = id;
			newElm.style.border = '1px dashed orange';
		return newElm;
	}


	function insideMenuAttachCheckBox(name, value) {
		var newElm = document.createElement('label');
		var newElmInput = document.createElement('input');
			newElmInput.type = 'checkbox';
			newElmInput.name = name;
		if (monkeyLoad(name) == true) {newElmInput.checked = true;}
		newElm.appendChild(newElmInput);
			newElm.appendChild(document.createTextNode(' ' + value));
		return newElm;
	}


	function insideMenuAttachAuthorValue(id) {
		var newElm = document.createElement('a');
			newElm.appendChild(document.createTextNode(langData[setLanguage].label_Par + id.author));
			newElm.href = id.link;
			newElm.style.color = '#00FF00';
		return newElm;
	}
		

	function insideMenuSubmitButtons() {
		var newElm = document.createElement('div');
		var buttonSubmit = document.createElement('input');
			buttonSubmit.type = 'button';
			buttonSubmit.value = langData[setLanguage].label_Save;
			buttonSubmit.style.border = '1px solid #001133';
			buttonSubmit.style.backgroundColor = '#114466';
			buttonSubmit.style.color = 'orange';
			buttonSubmit.addEventListener("click", (function(){
				var inputList = insideMenuGlobalDiv.getElementsByTagName('input');
				for (i=0; inputList[i]; i++) {
					if(inputList[i].type == "checkbox") {
						monkeySave(inputList[i].name, inputList[i].checked);
					}
				}
			}), false);
			newElm.appendChild(buttonSubmit);

		var buttonReset = document.createElement('input');
			buttonReset.type = 'button';
			buttonReset.value = langData[setLanguage].label_Cancel;
			buttonReset.style.border = '1px solid #001133';
			buttonReset.style.backgroundColor = '#114466';
			buttonReset.style.color = 'orange';
			buttonReset.addEventListener("click", (function(){
				var inputList = insideMenuGlobalDiv.getElementsByTagName('input');
				for (i=0; inputList[i]; i++) {
					if(inputList[i].type == "checkbox") {
						inputList[i].checked = monkeyLoad(inputList[i].name);
					}
				}
			}), false);
			newElm.appendChild(buttonReset);
			
		var buttonVider = document.createElement('input');
			buttonVider.type = 'reset';
			buttonVider.value = langData[setLanguage].label_Reset;
			buttonVider.style.border = '1px solid #001133';
			buttonVider.style.backgroundColor = '#114466';
			buttonVider.style.color = 'orange';
			newElm.appendChild(buttonVider);
		
		return newElm;
	}


		/*********************************************************
		 *                 VARIABLES GLOBALES                    *
		 *********************************************************/
			
	var currentInsideMenuId;
	var lastOpenedInsideMenu;
	var insideMenuGlobalDiv;
	var setLanguage = location.hostname.split('.')[2];
	var uniNombre = location.hostname.split('.')[0];
	if (langData[setLanguage] == undefined) setLanguage = 'fr'; // default language
	var globalURLAction = window.location.search.split('&')[0].split('=')[1];
	var globalAllLi = document.getElementsByTagName('li');
	var globalAllImg = document.getElementsByTagName('img');
	var globalCurrentPlanetProdMetal = document.getElementById('metal_box').getAttribute('title').substring(document.getElementById('metal_box').getAttribute('title').indexOf('(')+1, document.getElementById('metal_box').getAttribute('title').indexOf(')'));
	var globalCurrentPlanetProdCristal = document.getElementById('crystal_box').getAttribute('title').substring(document.getElementById('crystal_box').getAttribute('title').indexOf('(')+1, document.getElementById('crystal_box').getAttribute('title').indexOf(')'));
	var globalCurrentPlanetProdDeuterium = document.getElementById('deuterium_box').getAttribute('title').substring(document.getElementById('deuterium_box').getAttribute('title').indexOf('(')+1, document.getElementById('deuterium_box').getAttribute('title').indexOf(')'));



		 /*********************************************************
		 *                    LIEN D'ACCES                       *
		 *********************************************************/
			
	var posGlobalMenu = document.getElementsByTagName('ul')[0];
	var globalMenuLi = document.createElement('li');
	var globalMenuAnchor = document.createElement('a');
		globalMenuAnchor.appendChild(document.createTextNode('MonkeyTools'));
		globalMenuAnchor.addEventListener("click", (function () {
			showGlobalMenu();
		}), true);
	globalMenuLi.appendChild(globalMenuAnchor);
	
	testPositionOutil = posGlobalMenu.getElementsByTagName('a');
	// On affiche le MonkeyTool's que dans les pages où le premier ul contient logout
	if (globalURLAction != 'eventList' && globalURLAction != 'showmessage') {
		for (i=0; testPositionOutil[i]; i++) {
			if (/logout/g.test(testPositionOutil[i].href)){
				posGlobalMenu.appendChild(globalMenuLi);
			}
		}
	}


		/*********************************************************
		 *               OUTILS DU MONKEY TOOLS                  *
		 *********************************************************/


	if (monkeyLoad('oIO_Change_Title')) {
		var newTitle = document.title;
		if (monkeyLoad('oIO_Raccourcir_Title')) {
			newTitle = parseInt(uniNombre.replace(/uni/, ''));
			if (newTitle < 100) {
				newTitle = 'U'+newTitle;
			} 
			
			if (monkeyLoad('oIO_Raccourcir_Title_New')) {
				newTitle = document.title.substr(0, 3);
			} else {
				newTitle = document.title;
			}
		}
		
		if (monkeyLoad('oIO_pageApres')) {
			var URLAction = globalURLAction;
			
			if (monkeyLoad('oIO_pageRename')) {
				if (pages[setLanguage][URLAction]) {
					URLAction = pages[setLanguage][URLAction];
				}
			}
			newTitle += ' - ' + URLAction;

		}
		
		document.title = newTitle;
	}

	if (monkeyLoad('oIO_Show_Prod') && document.getElementById("resources_metal")) {
		(function(){
			if(parseInt(globalCurrentPlanetProdMetal) > 0) {
				var prodMetal = document.createElement('span');
					prodMetal.appendChild(document.createTextNode('('+globalCurrentPlanetProdMetal+')'));
					prodMetal.style.fontSize = '8px';
					prodMetal.className = 'undermark';
				document.getElementById("resources_metal").parentNode.appendChild(document.createElement('br'));
				document.getElementById("resources_metal").parentNode.appendChild(prodMetal);
			}
			
			if(parseInt(globalCurrentPlanetProdCristal) > 0) {
				var prodCris = document.createElement('span');
					prodCris.appendChild(document.createTextNode('('+globalCurrentPlanetProdCristal+')'));
					prodCris.style.fontSize = '8px';
					prodCris.className = 'undermark';
				document.getElementById("resources_crystal").parentNode.appendChild(document.createElement('br'));
				document.getElementById("resources_crystal").parentNode.appendChild(prodCris);
			}

			if(parseInt(globalCurrentPlanetProdDeuterium) > 0) {
				var prodDeuterium = document.createElement('span');
					prodDeuterium.appendChild(document.createTextNode('('+globalCurrentPlanetProdDeuterium+')'));
					prodDeuterium.className = 'undermark';
					prodDeuterium.style.fontSize = '8px';
				document.getElementById("resources_deuterium").parentNode.appendChild(document.createElement('br'));
				document.getElementById("resources_deuterium").parentNode.appendChild(prodDeuterium);
			}
		})()
	}

	if (monkeyLoad('oMO_Masquer_Tuto') && globalURLAction != 'eventList' && globalURLAction != 'showmessage') {
		var helper = document.getElementById('helper');
		if (helper) helper.parentNode.removeChild(helper);
	}

	if (monkeyLoad('oMO_Masquer_PatchNote') && globalURLAction != 'eventList' && globalURLAction != 'showmessage') {
		var changelog_link = document.getElementById('changelog_link');
		if (changelog_link) changelog_link.parentNode.removeChild(changelog_link);
	}

	var menuListeLiens = document.getElementById('links');
	if (menuListeLiens) var menuLiens = menuListeLiens.getElementsByTagName('a');
	if (menuLiens) {
		var menuOfficiers = [];
		var liOfficiers = [];
		for (i = 0, j = 0; i < menuLiens.length ; i++) {
			if (menuLiens[i].className == 'menubutton premiumHighligt') {
				menuOfficiers[j] = menuLiens[i];
				liOfficiers[j] = menuOfficiers[j].parentNode;
				j++;
			}
		}
	}




	if (monkeyLoad('oPR_Max_Lvl_Autres') && globalURLAction == 'research') {
		(function(){
			var mySpan;
				var researches = [
				[120, 12, "red"],
				[121,  5, "red"],
				[114,  8, "red"],
				[122,  7, "red"],
				[199,  1, "red"]
			];
	
			if (monkeyLoad('oPR_Max_Lvl_Energie'))
			{
				researches.push([113, 12, "#FF5500"]);
			}
				for (i = 0; i < researches.length;i++)
			{
				mySpan = document.createElement ("span");
				mySpan.className = "undermark";
				mySpan.style.color = researches[i][2];
				mySpan.appendChild(document.createTextNode (" /" + researches[i][1]));
				document.getElementById ("details" + researches[i][0]).getElementsByTagName("span")[1].appendChild(mySpan);
			}
		})()
	}

	if (monkeyLoad('oPO_Accelerer_Messagerie')) {
		(function(){
			if ( !unsafeWindow.$ ) return;
			var links = document.getElementsByTagName('link');
			for (var i=0; i<links.length; i++) {
				if (links[i].getAttribute('type').toLowerCase() == 'text/css' && links[i].getAttribute('href').toLowerCase().indexOf('01style.css') > -1) {
							document.styleSheets[0].deleteRule(4);
							document.styleSheets[0].insertRule(":focus"+"{"+"outline:none;"+"}", 4);
				}
			}
		})()
	}



	if (monkeyLoad('oPF_Points_Expe') && globalURLAction == 'fleet1')
	{
		(function(){
			var newLi = document.createElement('li');
			
			var expeIcon = document.createElement('img');
				expeIcon.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%000%00%00%000%08%06%00%00%00W%02%F9%87%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%18%A0IDAThCm%9A%7B%8C%5D%E5u%C5%D7y%DE%F7c%9E~%8D%3D6%D8%60%8C%0D%06l%9EI%A1%25%94(%A9%AA4%22JU%A9%A1%15%95%AA%24J%A9%D4J%91%AA%B4%1D%A9%91%9A%3F%FAG%A3%AAM%AB%A8%0F%A5I%936MJhH%9C%40Jx%04%87%80%03%04%8C%C12%C6%0C%F81%9E%19%CF%DC%F7%BD%E7%DCsN%7F%FB%0CN%F3G%C7%1A%CD%F5%9Ds%CF%F9%BE%BD%D7%5Ek%ED%FD%8DSkNg%E2%EB%EE%FB%1FT%1CmV%3D%EB%AA%EBGr%BC%92%E2%C4W%AA%96%0A~UY%9Aj%10%AD%AAZ%99%97F%7D~7V%B9%5CV%14E%1A%8DF%AAV%ED%1A~%C5%EB%92%EB)%1A%8F%E4%FA%0E%F7%09%E4y%A1%B28%E3%FE%03%85%05W%A3%D4%B5G%AAX*%E4%D7%A7%DC%BB%18%16%F2%7B%D9k%A7%14j%3C%1E%E7%DF%E5b)%7F%AF%DF%EF%2B%0C%C3%FCs%5E%7FE%3F%FC%E6%17%F2%D7%8Em%E0%AE%8F%7C%5Cmo%97%B2NI%C3%C2X%95dZi!Rg%10%AB%10tU%F5%C7%8A%87%AE%C6~%A04%9CR%D0%5BS%A5R%D10%8E%F2%9BT%CAU%0D%87%C3%FC%DB6%95%F1%9C%24%1DI%ACs%1C%3B%E2f%EF%3E%3C%E2%7D6%DF%E33%7C%3E%1A%8E%94%24I%BE%918%8E%F3%EFR%A9%94%DF%B3%D7%EB%E5%D7x%9E%A7%5E%BB%A3%20%08%F2%7Bt%3A%1De%C5%40%5B%0A%AB%FA%DEW%17%E4%DC%FD%91%BF%C8%AA%F5y%AD%BA%8E%0A%C3%81%12%A2%1D%AA%AA%BE%BB%A24%91~%FB7%0E%E9%DE%5B%B7%CBMj%3A%F2%EC)%FD%E37%9FT%AD%3A)%D7u%F3%88%05%850%7F%88-%DE'%D2%F6%A0v%7F%5D%C5%22%BBp2%EE%E1%F1%83k%F8''%26%A3%039.%9B%CC%F8%5D6%26%BBA%1Ei%5B%7C%A1P%C8%A3%3D%EC%B5%F3%8C%DA%E6l%C1%16%14%DF%F7%F3%8D%14%8BE%F5I%B5%1F%A7%9A%AB%2F%CB-%13%E9%F3D)%26%2C%E3%C2V%22%EC%A8%1B%AD%E7Q%2B%3A%91%EE%BEe%5E%BBf%7C%CDO%0E%F4%AB%EF%DD%A5%B2_%90%97zJ%86%89%AA%85%AA%5C%5E%8Fz%91%CAAM%A1%5BP2J5Y%9DU%D1%ADK%83Pe%B7%A6F%A9%A6%20s%E4'%01%EF7%15%A4%3E%AF%3D%D5%C3%86%9C%C4%05%5ER9%AC%88%C7)%1B%A6%0A%8A%15%A5%8EO%86%FF%EFu%1F4x%85%B2%E2%CCU%D0%05%B6YKI%94%B1%01.%2C%8D%22%F9%85%A6%92%F1PIgI%C5ZCn%10%12%81P%AE%C7B%C0%EC8%0B%F2h%87aMc9*%D5%EAJ%1C%97(%3A%AA%D6%26%F2%EB%C7TS%00fG%1E%D1baauZ%010%E8%8D%BB%1A%F9C%B9%95%A2%12%AF%A2%84%EB%0A%25%EAg%9C(%1E%F3%BAX%26%3B%1Eu%95%F1%8C%92%0229%E8%0D%A9%8B%92j%95%BA%C6Q%22%DF%0D%A8%87%8A%E2%D1X%A5fE%93%5EU%A3nGn%3BYf%C159%3C%C4%19d%AA6v%C9%1Fu%A8%C6%25y%60%F8%F1%A7Nhq5%D3J%BF%A0G%8E%BC%CA%0D%D6T%A8%B3%10%3F%D5HD%A5%1C(%F6%13%8D%08_X%2FP%80DH%91*%40%A3%E8%FA%1A%B4W%F9%D9%D6l%93%0A%1Fw%88%7C%A6b%A3%A8%D8%05%F3%7C%97%B8%97%02Gc'Qe%12%22%00y%A3a%97%BA%22x%BC%D7n%AD%AA%5C%0A%D8%A4%A7%F6%FA%0A%9B%F0%F9%7D%A0u2%18%D7%A7%E5%DC%FB%C0%E7%B2%9E%E6%94%0D%CE%AAV%9A%D7Z%81%F4%B6%D8%7D%B3%A6%A1%C1cxAu%A2%EB%3BE%22%D9g%C1%DBU%E1%C1%86y%C3i%8E%FFh%A4%22%E9u%1CG%83%C1%40%85%8A%AF%82%3B%A1%5E%8B%D7%85%9E%EE%FB%E8%7BT%AE%84%FA%DA%BF%FD%40%FDn%83(Gy%FD%18%AE%93%24%CEk%A0%40%ED%18%E6%ED%BE%85j!%BF%8F%BD%1F%90Mc*%FB%9D%15%B8%D5%C8hxI%DDB%5D%FB%D3E6%99%0E%E4%F6%B9Aa%9B%D6%83%94%94%AC%CB%9B%AA%92%11R%DE%BA%A8%CD%CD-%22gj%93%BA%D9%A9%DD*e%05%B9%83%8E%9A%95%92%FC%A0%A0V%04UVg%14%17*%EA%A7%8E*%13%9B%88~Y%83%F1%AA%C2Z%A8%89R%A6%7B%AE%2F%EA%EEk%5C%ED%D8%DC%947%09%25B%0E!0M%F9%FC%00x%FA%25%E0%E8%97%08%10uRin%60%9F%7F%15%60%96P%F8Y%06S%91i%C7M%94t%07%5C3%AD%A9%EEH%AB%CEP%DE%95%07%EF%5C%F0%83-%5C%98)%E2%BB%01%86%87c%D2%1D'%AAW%9B%EA%B2%F0(I5%BBi%06%DA%8B%B8%F9X%EE%D4fE%D4%84%C3u%8D%A2%0B%EF%A7%14u%ACb%A5L-%B8%EA%F5%D9%1C%0Ft)%F8%D6%FA%40k%EB%23%BD%F4JW%C7O%0F%D4%82m%1A%95%1A%11%1D%E7Q5%AA%8C%8D%85%A2X5%A0l%EFe%EC0%86m%3C%BF%AB4j)%2CMR%B0%BC%07%7C%9D%06%D8%E7Y%BEiG%A9%2B7sH%09)2Z38%E4b2b1%08%CB%88H%207%AA%D7%9B%60y%19%B69%AF%89%0A)%87%B5%1C7%02%CB%14%89%03%0D%22x%25%A3S%C4k%B0%D6%91W%F5a%0Bh%12%82%08j%9B%F5%D37F%3Azb%9D%3A%A9%82%EDf%0E%03%3EH%D6%8B%1B%C2%05%F4%C2%22%0Cf%8B%E7sA%A9%CAS%03%0D%FA%B0Q%BAY%A5%14m%88%5D%25A%83Zq%B9%DE%3E%ED%E5T%EE%DA%87%ED%83%97%BF.%8B%89G%24G%08%95%E1%7C%D8Z%D1%FC%AC%AB%FB%EF%BBE%F7%7F%F8%16%FD%D6%5D%8E%AEA%C0%E3V%AAK%03%A2OD%B3%22%2CF%05NTQ%5D%EF%1C7%1F%2B%04%E3.%B4%DCJ%D6%15%95%7B%40%05u%86ub%04%C6%F1Q%06%02f%CF%B6Z0%91%1A%F3%BE%CB%FB%05%C8%20%EA%5E%A2%F8%7B%D0k%ACA%AB%95%D7%18%05%81%09%00B%01B%C9%E7%8C%C5%9C%7B%1E%F8%D3L%D9%B5%40(U%C7%CD4%C1%CD2%B0%D9Y%5D%D6%E4%F462%E2%A8%5El%E9%0B%9F%FB%A8%26%60%08%B3%0Ba6%84*%8B%FA%F1%F1%BE%1EybI'%17Qa%DEk4(%C41%A4%AE5%88e%22%CFTbl%E3%0D%C9%10Y%8B%3C%04%A8%AE%14%E2%B9l%1B%CAda4%1A%E6Bf%22e%EF%B7%5Bk*%85%99%FE%FA%B3%EFG%CCS%3D%F8%E9%FFVw%88%10z%17X%FC4%F5%05%99%AC%01%A1%DA%5B%E8%10)%8Ccd%DF%3C%06%11%C9%E0%F5~%BB%AF%99%19%0A%13%86%88%81%C5%DE%2B%B7%8BzD%80%D6%14%C6%FD%1C6!%B5p%E7%B5e%FD%D9%EF%EF%D2%A7~s%AB%F6m%0D4%1AD%1A%18%1C%A2%19%152%A8%99MU%A0%C0%AA%BFU%E3%1E%D0%89a8%7C%92%C1%E42d%01%0D%AFq%1D%C0%C1%D6b%EFW'%EB%B8%81%94%EB%0DihP%02%AC%3D%40C%A1%7B%BC%97%92)%2F%20k%01u%B2%F3%FA%DB%17%A2QC%3E)LHQ%3A%80B%B9%10%89%D4%08e*W%A7%B4g~B%07%F76U%0A%80%1A%E1%CB%A0%B61%05%EC%C1%0AA%DA%D3%CEm%9En%BCq%16%C5%0D%B5rf%5D%99%3BR%C4b%1D%8C%1B%08'%ED%40%09%AB%E2%C3rIF%94%93A%1E%2C%83NnA%D8T%00U%DBk%DBH%C6Z%E2Kkz%E2%89%D7u%E4%B1%93%1At%C7%10D%1Dr%E1%9Ef%FE%0A%3C7%82%DA%8B%ED%8D%1A0%AF%C1%AB%9F%FB%91%A2%07%BD%A1%84%A5b%8D%85H%CF%BF%F02.%D20J%D1%E6%7CM%B6B8%1C%F6%B1%FF%3B%94%DC%A4%13%EA%BE%F7%CC%EA%F3%7F%BCW%87%DE%3BCM%98%CCA%04%7C%26%F3%FA*%D7%F1YA_%83%8C%C2%86%9Dl%F1%B9%97%E2%F3%BE%DD%1B%26%B2%3A(%C2%82%8358%7F%CB%1C%FE%A2%AEn%2FVy%8A%FB%81%0C%0FRI%0AV%3B%08%DF%BB%FE%C9-%85%14%06%0B%EA%8Ez%AA%B3%3E%D7)%60%03%DA%88%CD%0C%AA%EAC%7B%A8r8%AB%D3o%8D%E5%03%0B(J%C8in%D4(7%AA%09%F55%9F%13%8C%01C%8AE%A8%E8S%BF4%A7%BF%F9%D4uz%CF%DEH%05%07%EBI%BD%0C%FB%93J%3BSjXv%BC6%F0%C4%82%C3%F3%1EF(%EE_d%F11%05%8CX%F6a%BD%A6%0Be%8E%D4%89%88%FC%E4%040%1E%10%DC%16A%83%3Ea%A0%0E%19%89%81t%95%A0%7B%3B%AE%BDya%10O%E3m%8A%E6~%E1%D8%84%8C%202.%85%05cT%AB%F4%05%A8%E2%B0%DD%D5%ED%87%B7r%0D%95%2F%9Fjv%84%BE%E4%14%08L%F9%B2%B6%C2%10%0D%F4x%E5c%C1o90%A7%83W%CF%A9uiY%2B%2B%B8%5B2%16%40%97%DE%88l%23%94%9D%A8%93%BB_%0F%13%99%8C%11%AD%94%C0%05K%60%3CT%C4%06%8A%5C%9B%F7!%FD%1E*L%E5s%F7%A1%BD%0F3%82C%F4gM%DE%FC%B5%B7.%04%C5%9D%D4%25%BB%26%A5%C5%22%2C%91%E13R%8C%12%FF%0A0R2v%B5%82%20%ED%D9%3D%A7-Sf%8F%8D%8B%09%85%7Dm%F4%26%EC%C4%B8%1D%25%E7%DB%03%E7%BE52%BC3%5D%91n%DB7%A3k%AE%98Qk%B0%AESKo%B3%B99%ACE%D3h%83%60%F0%19%D46%8E%DA%F9%EB%80%2C%0C%81D%A5%0C%94%06%F4%0E%D8%94%92i%04%90%19%D2%3F%84!%BAc%3E%DF%EA%93L%BA%26%D7V%FD%83A%2F%C7%23%3C%40%F7%83%1F%E7%01%D8s%8D%3A%23%A2V%C3%3C9%FA%CA%B7%8E%A9%9FG%DF%8A%19O%EA%B1h%F6%81P%F3%03r%CE%3B-6G%0A%E0%00%1Ed%19bQN_%07%E6%03%7D%F2%A3%07%F4%E0%C7%EER%AD%01U%B6%CF%2B%A3C%AB%B2%20%B3-%20%19%EA%2C%A9%D3%C2%FF%B0%0E%C3%B8%E9%5D%18b%1C1%80c%9C%81%D5%88%D5B%1CQ%EC%B0%95i%81%B7s%DF%E1%85%24%9B%25%8D%16%0D%18%03%3F_%C1%F6%3A0%03%BBA%8Cjr%A1%C2%8C%9B%0E%7B%23m%DF%3A%AB%9D%9B%60%2CL%B5%A9%B8c%0B%CE3%C2%E58DX%C18qcs8%5C%D7%0A%1DW%1AS%80%15Dj%D7%A4%AF%3Bn%99%C2c%95%B4vq%A4%F3%17%FA%88%1D%F0e%FF%3DD%AAL%B0%EC%BE%C3%3E%A6%CE%9A%22%16%3A%24%13E%0A%1D%C2%DDhY%AD%90A%89%17_%C0%B7m%BFj!%2C%EDT%05%8F%11%D1%91%15%F0%FB%3E%1C%DB%E9%AC%90%CE%26%AF%3D%F5Q%E40%A8%D2%3D%25z%E3%D49%FD%F2m%3Ba%02X%08%A2%86%10%D8%82%81%C56%60k%85%B7%EDQ%8Ee%C84%9F%AA%A1%3C%7C%02%10%23%40n%8A6p%F9%CEM%BEn%B9q%93%26j%AE%DEysU%DD%0E%ECDk%1A%07C%FC%0F%E6%8DhGP%60%CENH%EFF-%F4AEH%C0%B87*%9CE%E7%E5m%DF%7D%DDB%7FX%87(%10%06%A8%CD%81B%7B%DD%18%01%A2%8F%25%02%C3%0C%DC%05u%BA3%0A%0A%CF%BF%DEs%B5%05o%BFu%0EgI%B4%5D%A4%D92%07%A7Z%A0%D9%017g%D1%F4J%E8%8856%81%CE-%C3%FB%14%A1q%BD5%F9idT%0Ad%7CDr%BE%A1%C37%D1%B2%22z%8Bo%BF%85%18fh%12%D8e%D3%A6%D0%01Y3%2CE%D4%82G%83b%A27%EC%AFj%D8%19p%9Fs%F2%E6v%EF_Xm%D1%8B%92j%AB%FAh%98a%DEf%F0%20x%A0l%091%A2G%F6%2610%5D%0A%1A%CF_mh%E5%8D%E7%11%AE%FD%AA%84Xa%C3%99%F1%03%85%E0%04%F8%23h%D6%C4%C8Ix8b%D5%86%00%FE%F5%91%13z%EA%D89%D4%B5%A0%19%EB70%7B%88%03da%7D3l%820%ED%BFzJ7%EC%B9%82%A9H%ACW%2F%D0%0B%10%7D%8BvF%80r%08%19%23%F1%DA%FA%04%D4Vk%ABk8%E0w%E4m%BAr~%C1-6%E4%C1%B9%AD%A5%25%F8%9FV%B6%D7%D2%F2%85%13%BC%17%2B%BAD%3B%D8%5DS%3F%EA*%C1rtWW%B4%946hj%FA%3At%D5l%CE%3E%FD1%82%04%8ES%16%EB%7B%D0%AC)%26N%D4%8A%B9Z%8Cu%E0%C0%8C%8E%3C%F9%96%BE%FD%D4H_%7F%F2U%9D%3C%DBf%2CA%BF%3CA%D0H%5B%98%22f%04%60%AA%C1%B5%BB%CB%BAn%CF%B4%96%DF%3C%A1%13%2F%9F%D0%A5K%EB%D6mj%7D%F5%BCZ%CBg%E4F%CBZ%ED%BCI%3CS%82AV%B6_y%60!%1EcS%23n%C6%8Em%FE%B2v%F1%B4%EE%BAs%BF%EE%BB%EF%7D%FA%F1%D1%A7%15%01%EE%0C%E1%BA%B0%BCH%FF%1B2u%E8%EB%EC%1B'u%CF%9D%87A%7F%1F%F6%80%A3a%20%AB%FB%08%FF%94%19%14%F9Mj%D6%17%E5%0D%BD%AE%0E%1D%DA%A3%A7~%B8%A8!6%7C%ED%AC%A3%EF~%F7%98%9E%7C%EA%8CN-%9A%16%04%9A%DAj%AAO%E1B%7DS%CD%A2%EE%B8c%8F%0E%1E%D8%A6%95%B3gu%E2%A5W%18%B3%B4U*c%FC%80d%B2%C6%10%01%F6%AA%26%88%DB%D6%AD%D7%2C%C4%CE%248'%5D8I%E3%D8%99IG%9F%F9%93O%E8%A6%83%5B%B5%B2%DA%D7%DB%EF%5CT%0F%9F2%BDi%12cE%17%84%15%C8%C6%D0%1B%0Ay%EB%C1%2B(L%1B%9F%A0%23%14%E8%18Wyj%A9Do%DDA%85Qi%16%2CfA%25%3C%D4%ADw%CC%E8%FB%DF%3BE%E7VQ%1D%7B%D0%A6%EF8%7DnU%3Fz%EE%B4%BE%F5%EDc%3A%B7%CA%DC%08%C8n%9A%02%AAtw%DBf%CB%FA%E0%DD%FB%B4gWCK%8B%17%10%C4%3E%0D%D2%9A%A6%CB%B3%F9T%A24n%CB%DB%BC%F5%EA%85%B1%CFT%81(%98%FB%2C%E0Eb%20%B1%BC%BC%0C%E6%AAz%F4%B1g%111X%C8%E8%8D%9Bj%EC%11%09%CC%9E%DB%D0%A97N%EBWn%BF%8E%D1%09%12%8F7%CA%80%83G%83%FE%E7%9F%7F%92n%CE%C5%E45%F0%F5%F0%3Ad%E0%02%AD%D0)%11%94i%1Dy%E1g%F4%1AC%A0%11%E6%F7%0A%F0%FA%E7W%22%5DX%1F%EB%B1g%5E%D1%23%0F%3F%A1%B3%CBhQ%ADI%97V%D6%D5Wn%D3%AF%FF%DAm%DA%3AS%D5%99%E3'%B4%3A%1A%A8%9B%0Dho!%87%5D%7B%F6%2F%F4%A1%CB%18%0C%E6%86%0D%A1h%03%A7Uv%FB%DCO%5E%D3%3AM%8BO%BF%1B0%0DK%09f%B5Dk%C9%8B!%90I%C0z%D4m%EB%BD%B7%5C%91S%9E1%06%1D%80%D2%EA%84%FE%E9%1F%5EP%A1%5C%D1%BE%BD%D30%0C%16%DA%0C2%D4%B7y%0A%F7%D9%9C%D7%AB%2F%9D%24%8B%25%A88c%0E%D5Vm%82%9E%3A%EA%E1%FB%3B%C0%AE%A6%D7O%AF%E8%1B%0F%3D%01%CC%8Ek%95%E1%C0%D4dS7%DD%B8%5B%F7%DC%7D%9B%FE%E9%3F%8E(%C3%F9%D6%C9%AE%B7e%FE%AA%85%BEgv%1A%F1%E21%11%03%A4%E2%04%19%81%EE%D6%D6iR%26(T%0Fu%1E%B6%F3%26%DB%C1%BC%8D%E0%FF%12b%E7b%19%CE.%BE%A3%C3%87%AF%D5%C4%C4%86u%00%F5%D8%00O%DF~%F4%B8%8E%9D%A0-%84%FB%AF%BA%8Aa%16%F5%80%14%E0%05%13%ED%D9%81%8D%A0%E0O%9E%7C%1B%02%60sF%AF4S%181%C4%0E%5E%CB%3D%3FL%85%09%5Cf%C8%F0%FC%8B%A7%F4%D0%C3%CF%E8%D1%C7%8F%E2f%07l~U1%3AS%86X%BC%99%D9%5D%0B1%5DN%40g%94%A0~%01%95X%AC%D6%D4m%AD%13%AD%A9%8DQ%1FBVk0%CBDM%5D(%A1%5C%C7~%93%85%80%07%8C%D9%C4%EA%DA%05%DD~%F3.%20%02%2C%C6%14Wy%A0%C5s%13z%B3%B5%A8c%AF%AF%E8%FC9G%D7%1F%9C%A2%93%B3%BE%1B%3Dp%96t%CD%9E%9DZZ%EE%A3%11%1D%EA%8E%2C%D0%B6V%A1n%2F%AA%A8%DD%5DW%15k%3C%C6%8Fe%0C%0F%FC%80%DE%98%0D%5El%F5%F4%E2%CF%CE%CB%C5%8AF%3C%AB%9A%A2%F45%9C%A7o%03%A8%0E%BB%C1%9E%96P%98%D6%D2%8A%A6%AAx%24%B8%3F%C2f%DBD%2C%8A%AC%81'Z%04%A6%CF%E0iLQ%07d%C6%09%CBz%EE%E5E%9D%7Ck%91%F8%D3%AD%E1%60%0D%027%1F%E2%DA%98)%02S%B4%E7%CF%24%FA%EC%E7~%A4v%EF%D2%86%5C%0F!%0D%04%EF%81%FB%0F!d%0C%03%E0%F9F%19%A8%85P%F9%F8%94j%B3%AC%A1G%EF%D0%A1%D30M%A1iJm%DA%ED%D2%C4%20%B0%11Y%C8G%EA%08%9B%DB%C7%09%C2%1D%B4%7D%D8%5C%0A%B9%C7%98%B1%CC%E2cV%BAN%C3%EE%E5%D3b%DAN%3A5%1B%F91HB%40h%B2k%5B%D4%22%A2%91%BADh%8B%BE%FC%B5%E3%DCgR%19%83%2C%D7%816%F7%EEP%C5%99V%91%FB%0C%3A%EB%3A%8E%9D%FE%F8_%BE%ACW.%02%B4%22%86l%E8%A8%E9%0D%F4G%9F%B8%5B%BB%E6h%15%81D%0B%C8V%0A%3B%81%19%9E%16'h%03%AE%98%06%A0%87%FF%B1%F1%0Br%AB%08%16%02q%0C%05%B0%2B%D4m%DE%13%E7.%D4%26%5E%5CxyB%9C%9B%26%16o%3D%AA%A9%9F9A%07-%B0%D7%CD%E2.~%BE%8D%AF_g%08P%CB%7B%EAW%CE%8C%F4%C4%B3%8C'%AD9%60%F8E%1B%A1%83%FB%9B%149%93%8D%9A%9D%11%04%EA%8F%DA%FA%CC%C2%BF%E8%99%9F%A2%A6%8C%0Aq%3C%9A*y%FA%F4%1F%BC_%A3%B5w%D0%0B%26%DB%F4%DC%96%E1R%05Ee%C1%06%E5z%BD%A6%11%CE%D5%A0%5CdPlk%DD%18%CD%90%84%AD%3B%F7-%F4Tcw%F4%AD%18%B1%14%E7emI%A3%C1%84%0C%DBj%CCQ%AE2%90%C5%BA%C6%BC%B6YN%C2%CE%93%22%8Fg%9C2%EA%A1%94a%CA%BC%A6JA%9F%D1%07%E0%ED%DC%90R%A4E%E6%9E%3Fx%E64%CC%0B%F3d6%16%A4IJ%AA%3Af-jyRW%EC%C4c%B1%88f)%85a%AE%D6w%8E%3CG%CB%0D%E6%E9%DCMO%C6%041%A4O%F1%B0%10%EB%CCHm%D06D%3B%CCi%C5%F4%E3U%EB%AD%B7%5Dq%CDB_f%D6l%92F%E1%D0%86%F9%D6%08Xo%C5%82C%7BMTm%F1%254%C2%7C%DB%C8%A1%D9)l%87J%89%11%EE%D1%83%22%1D%1A%8Cnw%89%CEn%16%E1a%9EO%FF0Q%AF%E8%7F%9E%7DM%ABtT%9E%26%F2%E9w%00A%B4%81%E3%2B'%CE0m%2Bi%DF%EEI%E8w%A4%D9%89%B2%B6%CCM%EB%C9'%8E%A1%E0(%FA%10%FD%00%F3%E6%CA%87d%A4X%80%C2%A8%D1%0E%26.d%9D15T%C3%13y%5Bv%EE%5DH%8B%B3T6x%26E%05%E8%94%D2%D4%20%3Fm%A1%9D%22%9C%A3%BCS%2B%E5%93%05%DB%60%D1%83%85%06%14%244%26%87S%14%CE%02%12%ECE%9D%09%C6K%AF_%D4%07%EE%BD%8As%04%FA%7D4%E5%CD%B3%EBz%ED%AD%5En%D3%85%B3%ED%25%D4%88%A9%3Eg%09%C7%8E%9D%D2%D2%85K%BA%F5%F0%9E%BC%93%9B%DB2%85E%CA%F4%F4O%5E%E7%BC%A1B%D6%A0a6kSj%17%CC%E7S%0B%3Ek%191%97%5C%C7%C1%D2%D8lt%F8%97%E74%F6%D3%E60%25%A0b%D8%8E%F8%CEO%5B%E8%C2%EC%06!%8A%5B%8AK%FA%CA%E7%3F%A6%87%FE%FE%E3%AA%20z%23%84%A8Xc%A6%1A%05%3A%CF%40%F8%BF%1Ey%89%BE%18%F6%A0%81%7F%DF%1D%FB%19f%B1%D71%EE%11%26)%22v%3Ea%5DY%05%1E%88%D7%D3%AF%9C%D5%EF%3E%F8%CFZ%19%98%9D%E7D%E8%C3%B7%EBC%F7%DE%ACq%7F%89q%0Ad%81%B5%B6.q%04%B9%98%CB%F5%F3%D1%E2%BB%ED%AC%E9%8E%FD%C7%C6%1B%F6e%A3%0E%9B%90%D9O%AB%84%CBc%3F%AB%F6%CB%E3p%2B%9E%D5%F5%A5%9C%CE%06%0C%00%86L%14%02%E6%FF)%EA%D3%E9w)%B8T%8F%3C%F6*%1B%B1%0As%B4wWU%D3M%8A%1F%85%0D%F8%7F%06%AE%87%ED6~%07A%04%83%CB%9C%85%BD%DD%0E%F4%7B%7F%F8E%9D%3A%BFF%A1J%9F%7C%E0%1E%1D%BEn%0BY%83%1F%F1%5Ec%22%1E%D2OX%DD%C6%D4%80%CD%94%F2a%02%DFy%11'%C5%99%9FC(%F0%91%7C%C3%20%9B%AAT8%A7Bd%86%A4%B1%0C%8DY-%18%3B%85%08%D9%97%FE%FD%A8%FE%F3%3B%CF%A9%C04%C3%3E%10%13A%1F%1AN%E8%96%D6%F1N%01t%7B%F3%B5%B3%14%E1H%C7%17%D7%F4%D6Y%5C*%D9%1A%C3%5Cf%1Cm%EA%DC%03%CF%B5%C6%0E%E8%B7%8DE%5E%D6%F7%1F9%AA%EB%0F%EC%D1%CE%AD%AEn8t%B3%9E~%E6E%9D%5BZe%D8K%3B%8B%FFa%FE%89f1%DE%07R%7D6%96C(r%06%9C9%C5%FA%EEC%7FEA%CE1%F5%EA%03%1B%3B9d%ECM6r%3A%C5%C6%A68UKi%88x%8C)%D8%94%DD%9B%09K%CDZ%0C%8C%17%60%2Cu%14q%5E%16%40%91_g1o.%9B%B9p%F4%E1%F7%ED%95%D3z%0Dac%0A%5E%DC%96%13B%BB%87%15%A0'%C8%E2%8BJ%99%F9%DB%D9%D9(%98%D1%EF%7C%FA%CBz%F8%3B%A74%D1%F0%F5w%7F%FB%20%AD'%A3JF%96%15%EB%2Fx%82%B5%A7%2B%83%25z%01%8A%3F%A4%1F%D8%B7%FD%A6%85n2%A9%87%BE%F9%0DE%E03%1A%8C%F2%B3Yc%A1%98%82-%C1B6%B8%B2%D4%99%17%B2%B9%C3%D0%B2%83%8B%CC%98L%D8%84%A0%8C%B1%B2%E9%83%D5H%40%0FM%D9%03%19z%8B%CE%AA%EE%BAu7%B0j%E8%C8%E3%2Fc%A3%19%95%00%A5%04%AE%2F%D8(%93%FBX%9FkTi%3ElDO%1E%E2%04%5E8zT)0%9E%9C%D9%A6c%3F%3D%AD%C5%B3%AB%04%9F)6%A3%0B%EB3%90%02%C5k%9CS%00soz%D7%96%85%C8%DD%CEl%1F%9C3%CEn%14%E61r%08%05%5B-a!%5C%F0%16%D3%AD%99%90%99%18%99%EB%AC0XJm%BC%8D%F9%AA%99F%60%0Fz%3D%CE%93%0Df%E05%C9%CF%8Fk%3AC%1Fq%C3%81%1D%DA1S%E4%24%A6%A6%A3%2F%BE%09k%0C%08%04%1E%8AkFl%DED%8A%DER%7D%ACC%95S%1Fk%DEG%83%40%2F%BE%FA%9A%1E%7B%FC%19%BDq%E6%12%7D%C8%1C%EB%60%E8%CC%01%BB%F5%DA%3DT%DBeZ%5Dq%F1E%A9-%DEg%A8%142%11%C6%D7%08%81%1A%B1%F8%02%22%E5qb8%E6%9C%ACH%1F%5C%C4%22G%60%DD%0E%1Fl%3AmS%BB%89%C9YL%16Si(%D8%5C%AB%F9%7B%D0%87%99%DB%04s1%26%89%0B%FA%EA%C3%2F%DA%B8%8A%09%C4%3C%F6%B9%A3Z%1D%3A%C6%B6%8C%B9Wsr%9AN%8F36%20%D5hNbILg8Z%9A%9E%A3%17%DF%84%CE%D4Tin%E6%2F%04%C8%0E%F8o4f%09%1E%EF%D1%82%26%A0%C4%E7%F7%9C%13S%B0%EB%1D%8A%22U%BDt%A5%DA%B8%CCjc%9A9%24%0E%10%E7X%9D%C0%A9%92%B3%18%18U%EAS%F9%FBH%9D%AAM%1E%EE%D2%FC%C4D%82!%80_%40%95Q%DF%12%87%E0%19%1C%1E%92%C5%09N%1D%9F%7B%F5%A2~%F2%F2%AAvo%AF%EA%9A%2B%F9lZf1i~L%9Bb%22%ED8%CB%1A%17%9F%A3%D6!tnc%C3%80%0C%D9%FF%8B%15%FE*%00%148%8Cpl%F16%5EO%B0%D9%15%88%A6%86%26)%24%03%CB%06%89%89yM%A2%84%1D%E8%B1%E2p%60M%F8%2C2%E6%85%ACCK%CD%06%F3!%9B%C9'%40%A4%CA%A8%DBf%F3%E6%8B%EC%5C%CCh%B7%83%9B5%B13%26%EA%F5%B0%C1P%5E1%B43%B5L_%FC%D2S%D0%A1%F4%A1%0F%DEF%CF%CD%B90%138%A3B%FB%7C~%D2I%7Fk%7FZP%828%5C6%B5%D6%5E%A2%13%23%D3y%25%8E%D5%E4%C4%D4%FC%DA%B0O%D1R%CC%B1%5B%C9%7B%F4KXo%EF%86m%DB%16Z%8CKZL%1F%A69%91%0F%18%7B%F4%E8%0B%AC%98L%BC%BA%9D6%0F%84%22%A1%D0%16%CDE%81%87Q%7D%14%1FM6%D7%9A%7F%EE%C1N%D4n%5ET%DD%F6%1A%24%80_%B2Sd%8A%D5%A7%8D%5C%B9%B8%0E%87G9d%9E%7F%E9%1D%0A%91%CF%DB%82%B1%07%19%87%7D%1D%0C%9B%B1%9BOT%FB%1C%5E%179W%B0%09%9F%0Du%0B6sdPo%E3N%9Fb%0F%F9%7FL%87%B6%3E%3C%A7%C3%D3%CD%8D%3F%F6%D8%7B%E8%B0%D6%B3%EB%D4t%AB%BA%C01%CET%B8%25%17%09%2B%DE%7C~O%F4%ED%2C%D8%03%EF%E6V%ED%20%DA%8A%3A%3F%DDa%01v4d%0A%1Eq%BD%FD%3E%89%19%93%7B%17%E51A(%3B%8C%E91sq%FBmN'%9BXp(%97%BA%B2%FB%E6%AA%0Fl%2C%83%A6%AD%91%CD%3CQ%DB%3C%88P%BB%3D%C3%0EE%06%7D%0E%C8M%5C%B9%BE%8FX%DA%A1%CA%0E%FF%12%96%E3%D1%8D%0DX%AAv%EE%BEI1%854%C1%E2%5C%8A%D7%BE~Q%B2%F3t%BE%7B4%94%3A%1B%87%DA%97-%AD%3D%F4%F2W~T%C4%1Ft%FC%7F_%F6%F9%DC%02%F3%F9%CB%AF%2F%DF%F7%17%7F%8E%CD%88%D8I%CD%BB%D7_~%BD1%F0%25hdn%91%C5%DB%D7%FF%02%13%DDW%DB%0Ej%E2K%00%00%00%00IEND%AEB%60%82";
				expeIcon.style.width = "76px";
				expeIcon.style.height = "76px";
			
			var newInput = document.createElement('div');
				newInput.style.position = 'relative';
				newInput.style.marginTop = '8px';
				newInput.style.marginLeft = '8px';
				newInput.style.width = '62px';
				newInput.style.height = '11px';
				newInput.style.backgroundColor = 'white';
				newInput.style.border = '1px solid #cccccc';
				
			
			
			var civils = document.getElementById('civil');
			
			var data = document.createElement('span');
				data.style.fontSize = '11px';
				data.style.lineHeight = '11px';
				data.style.color = 'black';
				data.style.fontFamily = 'Verdana';

			function countExpePointsWait() {
				// 1ms, c'est suffisant pour que la valeur du formulaire soit prise en compte par javascript, apparemment.
				window.setTimeout(countExpePoints, 1);
			}
			
			var ogameInputs = document.getElementsByTagName('input');
			var ogameFleetInputs = [];
			var ogameAnchors = document.getElementsByTagName('a');
			var ogameMaxAnchors = [];
			
			for (i = 0,j = 0; ogameInputs[i]; i++) {
				// seul les champs de vaisseaux ont une classe
				if (ogameInputs[i].className) {
					ogameFleetInputs[j] = ogameInputs[i];
					ogameFleetInputs[j].addEventListener("keypress", countExpePointsWait, false);
					j++;
				}
			}

			for (i = 0,j = 0; ogameAnchors[i]; i++) {
				if (ogameAnchors[i].className == 'max tips') {
					ogameMaxAnchors[j] = ogameAnchors[i];
					ogameMaxAnchors[j].addEventListener("click", countExpePointsWait, false);
					j++;
				}
			}



			var expeValue = 0;
			function countExpePoints() {
				expeValue = 0;

				for (i = 0; ogameFleetInputs[i]; i++) {
					if (ogameFleetInputs[i].name == "am204") expeValue += 12   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am205") expeValue += 110  * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am206") expeValue += 47   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am207") expeValue += 160  * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am215") expeValue += 70   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am211") expeValue += 75   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am213") expeValue += 110  * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am214") expeValue += 9000 * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am202") expeValue += 12   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am203") expeValue += 47   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am208") expeValue += 30   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am209") expeValue += 16   * ogameFleetInputs[i].value;
					if (ogameFleetInputs[i].name == "am210") expeValue += 1    * ogameFleetInputs[i].value;
				}
				if(expeValue > 9000){
					data.style.color = 'red';
				} else {
					data.style.color = 'black';
				}
				data.innerHTML = expeValue;
			}
			

			
			newInput.appendChild(data);
			newLi.appendChild(expeIcon);
			newLi.appendChild(newInput);
			civils.appendChild(newLi);
		})()
	}
	
	if (monkeyLoad('oRC_Show_Renta') && globalURLAction == 'showmessage')
	{
		(function(){
			var listeTR = document.getElementsByTagName('tr');
			var Objet = listeTR[2].getElementsByTagName('td')[0].innerHTML;

			// Si on regarde bien un raid
			if(/Rapport/.test(Objet) == true) {

				// Recuperation des donnees du message
				var pertesAtt = parseInt(trim(listeTR[5].getElementsByTagName('td')[1].innerHTML).replace(/\./g, ''));
				var pertesDef = parseInt(trim(listeTR[5].getElementsByTagName('td')[4].innerHTML).replace(/\./g, ''));

				var pillage = trim(listeTR[12].getElementsByTagName('td')[1].innerHTML);
				var pillageMetal = pillage.split(' unités de métal, ')[0];
					pillageMetal = parseInt(pillageMetal.replace(/\./g, ''));
				var pillageCristal = pillage.split(' unités de métal, ')[1].split(' unités de cristal et ')[0];
					pillageCristal = parseInt(pillageCristal.replace(/\./g, ''));
				var pillageDeut = pillage.split(' unités de métal, ')[1].split(' unités de cristal et ')[1].split(' unités de deutérium.')[0];
					pillageDeut = parseInt(pillageDeut.replace(/\./g, ''));

				var cdr = trim(listeTR[13].getElementsByTagName('td')[1].innerHTML);
				var cdrMetal = parseInt(cdr.split(' unités de métal et ')[0].replace(/\./g, ''));
				var cdrCristal = parseInt(cdr.split(' unités de métal et ')[1].split(' unités de cristal.')[0].replace(/\./g, ''));

				// Creation des elements, Calculs sur les donnees, affichage
				var showPertesA = document.createElement('tr');
				var tdA = document.createElement('td');
					tdA.className = 'label';
					tdA.appendChild(document.createTextNode('Rentabilité Pillage'));
				var tdB = document.createElement('td');
					tdB.className = 'value';
					tdB.appendChild(document.createTextNode(number_format(pillageMetal + pillageCristal + pillageDeut - pertesAtt, 0, '', '.')));
				var tdC = document.createElement('td');
				var tdD = document.createElement('td');
					tdD.className = 'label';
				var tdE = document.createElement('td');
					tdE.className = 'value';

				showPertesA.appendChild(tdA);
				showPertesA.appendChild(tdB);
				showPertesA.appendChild(tdC);
				showPertesA.appendChild(tdD);
				showPertesA.appendChild(tdE);

				var showPertesB = document.createElement('tr');
				var tdF = document.createElement('td');
					tdF.className = 'label';
					tdF.appendChild(document.createTextNode('Rentabilité Pillage + Recyclage'));
				var tdG = document.createElement('td');
					tdG.className = 'value';
					tdG.appendChild(document.createTextNode(number_format(pillageMetal + pillageCristal + pillageDeut + cdrMetal + cdrCristal - pertesAtt, 0, '', '.')));
				var tdH = document.createElement('td');
				var tdI = document.createElement('td');
					tdI.className = 'label';
					tdI.appendChild(document.createTextNode('Rentabilité avec Recyclage'));
				var tdJ = document.createElement('td');
					tdJ.className = 'value';
					tdJ.appendChild(document.createTextNode(number_format(cdrMetal + cdrCristal - pertesDef, 0, '', '.')));

				showPertesB.appendChild(tdF);
				showPertesB.appendChild(tdG);
				showPertesB.appendChild(tdH);
				showPertesB.appendChild(tdI);
				showPertesB.appendChild(tdJ);

				listeTR[6].parentNode.insertBefore(showPertesA, listeTR[6]);
				listeTR[7].parentNode.insertBefore(showPertesB, listeTR[7]);
			}
		})()
	}
 /* Encore en dev
   // mettre des [i] aux eventlistener pour qu'ils fonctiionbnenennenenent
	if (globalURLAction == 'messages') {
		// code pompé et pas compris. Pas bien.
		(function() { var unsafe = window; try {unsafe = unsafeWindow} catch (e) {} if ( !unsafe.$ ) return; unsafe.reload_page = function() {};})()
		function safeWrap(f) {return function() {setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));};}unsafeWindow.$(".mailWrapper").ajaxSuccess(safeWrap(function(e,xhr,settings){
			var currentRE;
			for(i=0; document.getElementById('showSpyReportsNow'); i++){
					currentRE = document.getElementById('showSpyReportsNow');
					topCurrentRE = currentRE.parentNode;
					topCurrentRE.removeChild(currentRE);
					
					newRE = document.createElement('div');
					tableNewRE = document.createElement('table');
					enteteTrNewRE = document.createElement('tr');
					
					var enteteTdNewRE;
					
					enteteTdNewRE = document.createElement('td');
					enteteTdNewRE.appendChild(document.createTextNode('coords'));
					enteteTrNewRE.appendChild(enteteTdNewRE);
					enteteTdNewRE = document.createElement('td');
					enteteTdNewRE.appendChild(document.createTextNode('metal'));
					enteteTrNewRE.appendChild(enteteTdNewRE);
					enteteTdNewRE = document.createElement('td');
					enteteTdNewRE.appendChild(document.createTextNode('cristal'));
					enteteTrNewRE.appendChild(enteteTdNewRE);
					enteteTdNewRE = document.createElement('td');
					enteteTdNewRE.appendChild(document.createTextNode('deut'));
					enteteTrNewRE.appendChild(enteteTdNewRE);
					enteteTdNewRE = document.createElement('td');
					enteteTdNewRE.appendChild(document.createTextNode('energie'));
					enteteTrNewRE.appendChild(enteteTdNewRE);
					enteteTdNewRE = document.createElement('td');
						var enteteANewRE = document.createElement('a');
						enteteANewRE.appendChild(document.createTextNode('afficher pour SpeedSim'));
						enteteANewRE.addEventListener("click", (function(){
							prompt('Copier ceci', currentRE.textContent);
						}), false);
						enteteTdNewRE.appendChild(enteteANewRE);
					enteteTrNewRE.appendChild(enteteTdNewRE);
					
					
					tableNewRE.appendChild(enteteTrNewRE);
					newRE.appendChild(tableNewRE);
					topCurrentRE.appendChild(newRE);
			}
		}));
	}
	*/
})();