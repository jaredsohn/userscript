// ==UserScript==
// @name           Resaltador de Alianzas
// @namespace      
// @description    Aplica un color deseado a todas las ciudades de una o más alianzas
// @include        http://*.ikariam.*/index.php?*
// ==/UserScript==

// Autor: Jorgitokapo 

String.prototype.trim = function () { return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); };

getElementsByClassName = function(oElement, sClassName, bFindIn) {
	var all = oElement.getElementsByTagName("*");
	var elements = [];
	for (var i=0; i<all.length; i++) {
		if (bFindIn == true) {
			if (all[i].className.indexOf(sClassName) > 0) {
				elements[elements.length] = all[i];
			}
		}
		else {
			if (all[i].className == sClassName) {
				elements[elements.length] = all[i];
			}
		}
	}
	return elements;
};

getArgument = function(sURL, sArgument) {
	var regexString = "[\\?&]"+sArgument+"=([^&#]*)";
	var regexObject = new RegExp(regexString);
	var regexResult = regexObject.exec(sURL);
	if (regexResult == null) {
		return "";
	}
	else {
		return regexResult[1];
	}
};

// game = world OR false
game = (function() { var host = document.location.hostname.split("."); if (host.length == 3 && host[1].toLowerCase() == "ikariam" && host[0].toLowerCase() != "board") { return host[0].trim(); } else { return false; } })();
// view = game view OR false
view = (function() { if (!game) { return false; } else { return document.getElementsByTagName("body")[0].id; } })();

if (game != false) {
	if (view == "island") {

		var allianceGroup0 = GM_getValue(game+"_allianceGroup0", "");
		var allianceGroup1 = GM_getValue(game+"_allianceGroup1", "");
		var allianceGroup2 = GM_getValue(game+"_allianceGroup2", "");
		var allianceGroup3 = GM_getValue(game+"_allianceGroup3", "");
		
		var resourcePath = "http://ikariamlibrary.com/tools/images/alliesandfriendshighligher/";

// <css for alliance groups>
		if (!document.getElementById("alliedAlliancesStyle")) {
			var style = document.createElement("style");
			style.setAttribute("id", "alliedAlliancesStyle");
			// purple roof [group 0]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup0 { background:transparent url("+resourcePath+"city_1_purple.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup0, #island #mainview #cities .level3 div.allianceGroup0 { background:transparent url("+resourcePath+"city_2_purple.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup0, #island #mainview #cities .level5 div.allianceGroup0, #island #mainview #cities .level6 div.allianceGroup0 { background:transparent url("+resourcePath+"city_3_purple.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup0, #island #mainview #cities .level8 div.allianceGroup0, #island #mainview #cities .level9 div.allianceGroup0 { background:transparent url("+resourcePath+"city_4_purple.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup0, #island #mainview #cities .level11 div.allianceGroup0, #island #mainview #cities .level12 div.allianceGroup0 { background:transparent url("+resourcePath+"city_5_purple.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup0, #island #mainview #cities .level14 div.allianceGroup0, #island #mainview #cities .level15 div.allianceGroup0 { background:transparent url("+resourcePath+"city_6_purple.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup0, #island #mainview #cities .level17 div.allianceGroup0 { background:transparent url("+resourcePath+"city_7_purple.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup0, #island #mainview #cities .level19 div.allianceGroup0, #island #mainview #cities .level20 div.allianceGroup0, #island #mainview #cities .level21 div.allianceGroup0, #island #mainview #cities .level22 div.allianceGroup0, #island #mainview #cities .level23 div.allianceGroup0, #island #mainview #cities .level24 div.allianceGroup0 { background:transparent url("+resourcePath+"city_8_purple.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup0 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// orange roof [group 1]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup1 { background:transparent url("+resourcePath+"city_1_orange.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup1, #island #mainview #cities .level3 div.allianceGroup1 { background:transparent url("+resourcePath+"city_2_orange.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup1, #island #mainview #cities .level5 div.allianceGroup1, #island #mainview #cities .level6 div.allianceGroup1 { background:transparent url("+resourcePath+"city_3_orange.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup1, #island #mainview #cities .level8 div.allianceGroup1, #island #mainview #cities .level9 div.allianceGroup1 { background:transparent url("+resourcePath+"city_4_orange.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup1, #island #mainview #cities .level11 div.allianceGroup1, #island #mainview #cities .level12 div.allianceGroup1 { background:transparent url("+resourcePath+"city_5_orange.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup1, #island #mainview #cities .level14 div.allianceGroup1, #island #mainview #cities .level15 div.allianceGroup1 { background:transparent url("+resourcePath+"city_6_orange.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup1, #island #mainview #cities .level17 div.allianceGroup1 { background:transparent url("+resourcePath+"city_7_orange.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup1, #island #mainview #cities .level19 div.allianceGroup1, #island #mainview #cities .level20 div.allianceGroup1, #island #mainview #cities .level21 div.allianceGroup1, #island #mainview #cities .level22 div.allianceGroup1, #island #mainview #cities .level23 div.allianceGroup1, #island #mainview #cities .level24 div.allianceGroup1 { background:transparent url("+resourcePath+"city_8_orange.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup1 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// cyan roof [group 2]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup2 { background:transparent url("+resourcePath+"city_1_cyan.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup2, #island #mainview #cities .level3 div.allianceGroup2 { background:transparent url("+resourcePath+"city_2_cyan.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup2, #island #mainview #cities .level5 div.allianceGroup2, #island #mainview #cities .level6 div.allianceGroup2 { background:transparent url("+resourcePath+"city_3_cyan.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup2, #island #mainview #cities .level8 div.allianceGroup2, #island #mainview #cities .level9 div.allianceGroup2 { background:transparent url("+resourcePath+"city_4_cyan.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup2, #island #mainview #cities .level11 div.allianceGroup2, #island #mainview #cities .level12 div.allianceGroup2 { background:transparent url("+resourcePath+"city_5_cyan.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup2, #island #mainview #cities .level14 div.allianceGroup2, #island #mainview #cities .level15 div.allianceGroup2 { background:transparent url("+resourcePath+"city_6_cyan.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup2, #island #mainview #cities .level17 div.allianceGroup2 { background:transparent url("+resourcePath+"city_7_cyan.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup2, #island #mainview #cities .level19 div.allianceGroup2, #island #mainview #cities .level20 div.allianceGroup2, #island #mainview #cities .level21 div.allianceGroup2, #island #mainview #cities .level22 div.allianceGroup2, #island #mainview #cities .level23 div.allianceGroup2, #island #mainview #cities .level24 div.allianceGroup2 { background:transparent url("+resourcePath+"city_8_cyan.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup2 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// align button
			style.appendChild(document.createTextNode("#information .ally .manageHighlight img { display: inline; vertical-align: middle; }"));
			// insert style
			document.getElementsByTagName("head")[0].appendChild(style);
		}
// </css for alliance groups>

// <localization>
		var languages = {
			'en': {
				'alt-text': 'Add/Remove Alliance Highlight',
				'remove-0-question': 'Quitar color Púrpura a la alianza: <%allyid%> \r\n0:No 1:Si',
				'remove-1-question': 'Quitar color Naranja a la alianza: <%allyid%> \r\n0:No 1:Si',
				'remove-2-question': 'Quitar color Cyan a la alianza: <%allyid%> \r\n0:No 1:Si',
				'remove-3-question': 'Quitar color Verde a la alianza <%allyname%> \r\n0:No 1:Si',
				'remove-0-success': 'Color Removido de la alianza <%allyid%>',
				'remove-1-success': 'Color Removido de la alianza <%allyid%>',
				'remove-2-success': 'Color Removido de la alianza <%allyid%>',
				'remove-3-success': 'Color Removido de la alianza <%allyid%>',
				'remove-cancelled': 'Removido Cancelado',
				'add-question': 'Agregar color a alianza <%allyid%>\r\n0:Púrpura 1:Naranja 2:Cyan 3:Verde 4:Cancelar',
				'add-0-success': 'Color Aplicado a la alianza <%allyid%>',
				'add-1-success': 'Color Aplicado a la alianza <%allyid%>',
				'add-2-success': 'Color Aplicado a la alianza <%allyid%>',
				'add-3-success': 'Color Aplicado a la alianza <%allyid%>',
				'add-error': 'Seleccion inválida',
				'add-cancelled': 'Cancelado',
				'manual-question': 'Introducir ID de la Alianza para Agregar o Remover',
				'manual-error': 'Selección Inválida',
				'language-question': 'Por Favor Seleccione Idioma\r\nDisponibles: ',
				'language-selected': 'Español Seleccionado',
				'language-error': 'Selección Inválida',
				'language-menu': 'Selecciona Lenguaje'
			}
		};
		var language = languages[GM_getValue("language", "en")];
		
		var aahLanguage = function() {
			var languagesAvailable = "";
			for (prop in languages) {
				languagesAvailable += prop+",";
			}
			languagesAvailable = languagesAvailable.substr(0, languagesAvailable.length-1);
			var selection = prompt(language['language-question']+languagesAvailable,"en");
			if (selection == "" || selection == null) {
				GM_setValue("language", "en");
			}
			else {
				if (languagesAvailable.indexOf(selection) > -1) {
					GM_setValue("languagae", selection);
					alert(language['language-selected']);
				}
				else {
					alert(language['language-error']);
				}
			}
		};
		
		GM_registerMenuCommand(language['language-menu'], aahLanguage);
// </localization>

// <search and modify and insert manager button>
		var locationIndex = 0;
		var locationCurrent;
		var searchEnd = false;

		while (searchEnd == false) {

			locationCurrent = document.getElementById("cityLocation"+locationIndex);

			if (locationCurrent == null) { searchEnd = true; break; }

			cityInformation = getElementsByClassName(locationCurrent, "cityinfo", false);

			if (cityInformation.length == 0) {
				locationIndex += 1;
				continue;
			} else {
				cityInformation = cityInformation[0];
			}

			allyIndex = getElementsByClassName(cityInformation, "ally", false)[0].getElementsByTagName("a");

			if (allyIndex.length == 0) {
				locationIndex += 1;
				continue;
			} else {
				allyIndex = getArgument(allyIndex[0].href, "allyId");
			}

			searchString = ":"+allyIndex+":";
			
			// insert button
			if ((getElementsByClassName(locationCurrent, "ownCityImg", false).length == 0) && (getElementsByClassName(locationCurrent, "allyCityImg", false).length == 0)) {
				// do not add buttons if it is your own town or a member of your own alliance
				var image = document.createElement("img");
				image.setAttribute("src", resourcePath+"highlight_button.png");
				image.setAttribute("alt", language['alt-text']);
				var button = document.createElement("a");
				button.setAttribute("class", "manageHighlight");
				button.setAttribute("onclick", "highlightEvent(this);");
				button.appendChild(image);
				getElementsByClassName(locationCurrent, "ally", false)[0].appendChild(button);
			}

			if (allianceGroup0.indexOf(searchString) > -1) {
				// alliance is in group 0;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup0";
			}
			else if (allianceGroup1.indexOf(searchString) > -1) {
				// alliance is in group 1;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup1";
			}
			else if (allianceGroup2.indexOf(searchString) > -1) {
				// alliance is in group 2;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup2";
			}
			else if (allianceGroup3.indexOf(searchString) > -1) {
				// alliance is in group 3;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allyCityImg";
			}
			else {
				// alliance is not in a group;
			}
			locationIndex += 1;
		}
// </search and modify and insert manager button>

// <group management>
		// add/remove highlight. id = allyId
		unsafeWindow.manageHighlight = function(id) {
			allyId = id;
			searchString = ":"+allyId+":";
			if (allianceGroup0.indexOf(searchString) > -1) {
				// remove alliance from group 0;
				var removeGroup0 = parseInt(prompt(language['remove-0-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup0 == 1) {
					allianceGroup0 = allianceGroup0.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup0", allianceGroup0);
					alert(language['remove-0-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup1.indexOf(searchString) > -1) {
				// remove alliance from group 1;
				var removeGroup1 = parseInt(prompt(language['remove-1-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup1 == 1) {
					allianceGroup1 = allianceGroup1.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup1", allianceGroup1);
					alert(language['remove-1-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup2.indexOf(searchString) > -1) {
				// remove alliance from group 2;
				var removeGroup2 = parseInt(prompt(language['remove-2-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup2 == 1) {
					allianceGroup2 = allianceGroup2.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup2", allianceGroup2);
					alert(language['remove-2-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup3.indexOf(searchString) > -1) {
				// remove alliance from group 3;
				var removeGroup3 = parseInt(prompt(language['remove-3-question'].replace("<%allyname%>", allyId), "0"));
				if (removeGroup3 == 1) {
					allianceGroup3 = allianceGroup3.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup3", allianceGroup3);
					alert(language['remove-3-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else {
				// add alliance to group
				var selectGroup = parseInt(prompt(language['add-question'].replace("<%allyid%>", allyId), "4"));

				if (selectGroup == 0) {
					allianceGroup0 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup0", allianceGroup0);
					alert(language['add-0-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				} 
				else if (selectGroup == 1) {
					allianceGroup1 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup1", allianceGroup1);
					alert(language['add-1-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 2) {
					allianceGroup2 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup2", allianceGroup2);
					alert(language['add-2-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 3) {
					allianceGroup3 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup3", allianceGroup3);
					alert(language['add-3-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 4) {
					alert(language['add-cancelled']);
				}
				else if (selectGroup == "" || selectGroup == null) {
					alert(language['add-canceled']);
				}
				else {
					alert(language['add-error']);
				}
			}
		};
		// this is attatched to the button in island information. onclick="highlightEvent(this);"
		unsafeWindow.highlightEvent = function(e) {
			if (!e) {
				var action = prompt(language['manual-question'],"");
				if (action == "") {
					alert(language['manual-error']);
				}
				else {
					unsafeWindow.manageHighlight(action);
				}
			}
			else {
				unsafeWindow.manageHighlight(getArgument(e.parentNode.getElementsByTagName("a")[0].href, "allyId"));
			}
		};
// </group management>
	}
}