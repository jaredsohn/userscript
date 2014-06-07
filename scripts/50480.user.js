// ==UserScript==
// @name           Town Enhancer
// @namespace      ikariamLibrary
// @description    Add InfoBanners to Town View (Upgradable, Name and Level) [v1.3k]
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// <general functions>
createNodeObject = function(object) {
	if (!object.length) {
		var newElement;
		if (object.nodeName == "#text") { 
			return document.createTextNode(object.nodeValue); 
		} else {
			newElement = document.createElement(object.nodeName);
			if (object.nodeAttributes) {
				for (prop in object.nodeAttributes) { 
					if (typeof(object.nodeAttributes[prop]) != "object") {
						newElement.setAttribute(prop, object.nodeAttributes[prop]); 
					}
					else {
						if ((typeof(object.nodeAttributes[prop]) == "object") && (object.nodeAttributes[prop].conditional === true)) {
							newElement.setAttribute(prop, object.nodeAttributes[prop].conditionalValue);
						}
					}
				}
			}
			if (object.childNodes) {
				if (object.childNodes.length) {
					for (var child = 0; child < object.childNodes.length; child++) { newElement.appendChild(createNodeObject(object.childNodes[child])); }
				} else { newElement.appendChild(createNodeObject(object.childNodes)); }
			}
			return newElement;
		}
	}
};
centerElement = function(element) {
	elementWidth = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("width"));
	parentWidth = parseInt(document.defaultView.getComputedStyle(element.parentNode, null).getPropertyValue("width"));
	elementPadding = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("padding-left")) + parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("padding-right"));
	element.style.left = Math.floor((parentWidth/2) - ((elementWidth+elementPadding)/2)) + "px";
	element.style.visibility = "visible";
};
String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};
globalStyle = function(style) {
	var styleId = "tE_style";
	if (!style) return;
	if (!document.getElementById(styleId)) { document.getElementsByTagName("head")[0].appendChild( createNodeObject( { nodeName:"style", nodeAttributes: { type:"text/css", id:styleId } } ) ); }
	document.getElementById(styleId).appendChild( createNodeObject( { nodeName: "#text", nodeValue: style+"\n" } ) );
};
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
checkResource = function(requiredAmmount, availableAmmount) {
	if (requiredAmmount == false) { return true; }
	else if (requiredAmmount <= availableAmmount) { return true; } 
	else { return false; }
};
// </general functions>

// <language presets>
var languages = {
	en: {
		"townHall": "Town Hall",
		"academy": "Academy",
		"warehouse": "Warehouse",
		"tavern": "Tavern",
		"palace": "Palace",
		"palaceColony": "Gov. Residence",
		"museum": "Museum",
		"port": "Port",
		"shipyard": "Shipyard",
		"barracks": "Barracks",
		"wall": "Town Wall",
		"embassy": "Embassy",
		"branchOffice": "Trading Post",
		"workshop": "Workshop",
		"safehouse": "Hideout",
		"forester": "Forester",
		"glassblowing": "Glassblower",
		"alchemist": "Alchemist",
		"winegrower": "Winery",
		"stonemason": "Mason",
		"carpentering": "Carpenter",
		"optician": "Optician",
		"fireworker": "Fireworks",
		"vineyard": "Wine Cellar",
		"architect": "Architect",
		"buildingGround": "Building Ground",
		"settings-main-title": "Town Enhancer Settings",
		"settings-save-text": "Save Settings",
		"settings-research-title": "Completed Research",
		"settings-research-selector": "Highest Completed Research",
		"settings-research-pulley": "Pulley",
		"settings-research-geometry": "Geometry",
		"settings-research-spiritlevel": "Spirit Level",
		"settings-display-title": "Display Settings",
		"settings-display-buildingname": "Display Building Name",
		"settings-display-buildinglevel": "Display Building Level",
		"settings-display-upgradebutton": "Display Upgrade Button",
		"settings-display-enableupgrade": "Enable Quick Upgrade Link",
		"settings-language-title": "Language Settings",
		"settings-language-selector": "Available Languages",
		"confirm-upgrade": "Upgrade Building \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "English"
	},
	sv: {
		"townHall": "Rådhus",
		"academy": "Akademi",
		"warehouse": "Lagerlokal",
		"tavern": "Taverna",
		"palace": "Palats",
		"palaceColony": "Guv. Residens",
		"museum": "Museum",
		"port": "Handelshamn",
		"shipyard": "Skeppsvarv",
		"barracks": "Kasern",
		"wall": "Stadsmur",
		"embassy": "Ambassad",
		"branchOffice": "Handelsstation",
		"workshop": "Verkstad",
		"safehouse": "Gömställe",
		"forester": "Skogvaktare",
		"glassblowing": "Glasblåsare",
		"alchemist": "Alkemist",
		"winegrower": "Vinodlare",
		"stonemason": "Stenhuggare",
		"carpentering": "Snickare",
		"optician": "Optiker",
		"fireworker": "Fyrverkerifabrik",
		"vineyard": "Vinpress",
		"architect": "Arkitekt",
		"buildingGround": "Byggnadsplats",
		"settings-main-title": "Town Enhancer Inställningar",
		"settings-save-text": "Spara Inställningar",
		"settings-research-title": "Färdiga Forskningar",
		"settings-research-selector": "Högsta Färdiga Forskning",
		"settings-research-pulley": "Block",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Vattenpass",
		"settings-display-title": "Visa Inställningar",
		"settings-display-buildingname": "Visa Byggnadsnamn",
		"settings-display-buildinglevel": "Visa Byggnadsnivå",
		"settings-display-upgradebutton": "Visa uppgraderingsknapp",
		"settings-language-title": "Språkinställningar",
		"settings-language-selector": "Tillgängliga Språk",
		"language-name": "Svenska"
	},
	de: {
		"townHall": "Rathaus",
		"academy": "Akademie",
		"warehouse": "Lagerhaus",
		"tavern": "Taverne",
		"palace": "Palast",
		"palaceColony": "Stadthaltersitz",
		"museum": "Museum",
		"port": "Handelshafen",
		"shipyard": "Kriegswerft",
		"barracks": "Kaserne",
		"wall": "Stadtmauer",
		"embassy": "Botschaft",
		"branchOffice": "Kontor",
		"workshop": "Erfinderwerkstatt",
		"safehouse": "Versteck",
		"forester": "Forsthaus",
		"glassblowing": "Glasbläserei",
		"alchemist": "Alchemistenturm",
		"winegrower": "Winzerei",
		"stonemason": "Steinmetz",
		"carpentering": "Zimmerei",
		"optician": "Optiker",
		"fireworker": "Feuerwerksplatz",
		"vineyard": "Kelterei",
		"architect": "Architekturbüro",
		"buildingGround": "Bauplatz",
		"settings-main-title": "Town Enhancer Einstellungen",
		"settings-save-text": "Einstellungen speichern",
		"settings-research-title": "Abgeschlossene Forschung",
		"settings-research-selector": "Höchste abgeschlossene Forschung",
		"settings-research-pulley": "Flaschenzug",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Wasserwaage",
		"settings-display-title": "Anzeigeeinstellungen",
		"settings-display-buildingname": "Gebäudenamen anzeigen",
		"settings-display-buildinglevel": "Gebäudestufe anzeigen",
		"settings-display-upgradebutton": "Upgrade Button anzeigen",
		"settings-language-title": "Spracheinstellungen",
		"settings-language-selector": "Verfügbare Sprachen",
		"language-name": "Deutsch",   
		"thousands-separator": "."
	},
	he: {
		"townHall": "בניין העירייה",
		"academy": "אקדמיה",
		"warehouse": "מחסן",
		"tavern": "טברנה",
		"palace": "ארמון",
		"palaceColony": "מגורי המושל",
		"museum": "מוזיאון",
		"port": "נמל סחר",
		"shipyard": "מספנה",
		"barracks": "מגורי חיילים",
		"wall": "חומת העיר",
		"embassy": "שגרירות",
		"branchOffice": "תחנת סחר",
		"workshop": "בית-מלאכה",
		"safehouse": "מקום מחבוא",
		"forester": "בית חוטב עצים",
		"glassblowing": "מפעל הזכוכית",
		"alchemist": "מגדל האלכימאי",
		"winegrower": "מפעל היין",
		"stonemason": "מחצבה",
		"carpentering": "בית החרושת לעץ",
		"optician": "משרד המדען",
		"fireworker": "מפעל הזיקוקים",
		"vineyard": "יקב",
		"architect": "משרד הארכיטקטור",
		"buildingGround": "שטח בנייה",
		"settings-main-title": "אפשרויות מחזק העיר",
		"settings-save-text": "שמור אפשרויות",
		"settings-research-title": "המחקר הושלם",
		"settings-research-selector": "המחקר האחרון הושלם",
		"settings-research-pulley": "גלגלת",
		"settings-research-geometry": "גיאומטריה",
		"settings-research-spiritlevel": "שלב רוחני",
		"settings-display-title": "הצג אפשרויות",
		"settings-display-buildingname": "הצג את שם הבניין",
		"settings-display-buildinglevel": "הצג את שלב הבניין",
		"settings-display-upgradebutton": "הצג כפתור שדרוג",
		"settings-language-title": "אפשרויות שפה",
		"settings-language-selector": "שפות קיימות",
		"language-name": "עברית"
	},
	tr: {
		"townHall": "Belediye Binasi",
		"academy": "Akademi",
		"warehouse": "Depo",
		"tavern": "Taverna",
		"palace": "Saray",
		"palaceColony": "Vali Konagi",
		"museum": "Muze",
		"port": "Ticaret Limani",
		"shipyard": "Donanma Tershanesi",
		"barracks": "Kisla",
		"wall": "Sur",
		"embassy": "Buyukelcilik",
		"branchOffice": "Ticaret Merkezi",
		"workshop": "Mucit Atolyesi",
		"safehouse": "Istihbarat Merkezi",
		"forester": "Ormanci Kulubesi",
		"glassblowing": "Cam Esya Atolyesi",
		"alchemist": "Simya Kulesi",
		"winegrower": "Bag Evi",
		"stonemason": "Mermer Atolyesi",
		"carpentering": "Marangoz Atolyesi",
		"optician": "Optik",
		"fireworker": "Havai Fisek Test Alani",
		"vineyard": "Sarap Mahzeni",
		"architect": "Mimarlik Burosu",
		"buildingGround": "Insaa Alani",
		"settings-main-title": "Town Enhancer Ayarlari",
		"settings-save-text": "Ayarlari Kaydet",
		"settings-research-title": "Tamamlanan Arastirmalar",
		"settings-research-selector": "Tamamlanmis Arastirmalar",
		"settings-research-pulley": "Palanga",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Ruh Duzeyi",
		"settings-display-title": "Gorunum Ayarlari",
		"settings-display-buildingname": "Bina Ismini Goster",
		"settings-display-buildinglevel": "Bina Seviyesini Goster",
		"settings-display-upgradebutton": "Yukseltme Dugmesini Goster",
		"settings-language-title": "Dil Ayarlari",
		"settings-language-selector": "Diller",
		"language-name": "Turkce"
	},
	uk: {
		"townHall": "Ратуша",
		"academy": "Академія",
		"warehouse": "Склад",
		"tavern": "Таверна",
		"palace": "Палац",
		"palaceColony": "Резиденція губернатора",
		"museum": "Музей",
		"port": "Торговий порт",
		"shipyard": "Верф",
		"barracks": "Бараки",
		"wall": "Міська стіна",
		"embassy": "Посольство",
		"branchOffice": "Торговий пост",
		"workshop": "Майстерня",
		"safehouse": "Схованка",
		"forester": "Дім лісничого",
		"glassblowing": "Склодувна майстерня",
		"alchemist": "Вежа алхіміка",
		"winegrower": "Винний завод",
		"stonemason": "Каменяр",
		"carpentering": "Теслярська майстерня",
		"optician": "Оптик",
		"fireworker": "Полігон піротехніка",
		"vineyard": "Винний прес",
		"architect": "Офіс архітектора",
		"buildingGround": "Будівельний простір",
		"settings-main-title": "Налаштування Town Enhancer",
		"settings-save-text": "Зберегти Налаштування",
		"settings-research-title": "Завершене Дослідження",
		"settings-research-selector": "Найвище Завершене Дослідження",
		"settings-research-pulley": "Шків",
		"settings-research-geometry": "Геометрія",
		"settings-research-spiritlevel": "Водяний рівень",
		"settings-display-title": "Показати Налаштування",
		"settings-display-buildingname": "Показати Назву Будівлі",
		"settings-display-buildinglevel": "Показати Рівень Будівлі",
		"settings-display-upgradebutton": "Показати Кнопку Розширення",
		"settings-language-title": "Налаштування Мови",
		"settings-language-selector": "Наявні мови",
		"language-name": "Ukrainian"
	},
	es: {
		"townHall": "Intendencia",
		"academy": "Academia",
		"warehouse": "Depósito",
		"tavern": "Taberna",
		"palace": "Palacio",
		"palaceColony": "Residencia Gob.",
		"museum": "Museo",
		"port": "Puerto Com.",
		"shipyard": "Astillero",
		"barracks": "Cuartel",
		"wall": "Muralla",
		"embassy": "Embajada",
		"branchOffice": "Tienda",
		"workshop": "Invenciones",
		"safehouse": "Escondite",
		"forester": "Guardabosques",
		"glassblowing": "Soplador Vino",
		"alchemist": "Alquimista",
		"winegrower": "Vinicultor",
		"stonemason": "Cantero",
		"carpentering": "Carpintería",
		"optician": "Óptico",
		"fireworker": "Pirotécnica",
		"vineyard": "Prensa Vino",
		"architect": "Arquitecto",
		"buildingGround": "Terreno Libre",
		"settings-main-title": "Opciones de Town Enhancer",
		"settings-save-text": "Guardar Opciones",
		"settings-research-title": "Investigación Completada",
		"settings-research-selector": "Investigación más alta Completada",
		"settings-research-pulley": "Polea",
		"settings-research-geometry": "Geometría",
		"settings-research-spiritlevel": "Nivel de Agua",
		"settings-display-title": "Opciones de Visualización",
		"settings-display-buildingname": "Mostrar Nombre del Edificio",
		"settings-display-buildinglevel": "Mostrar Nivel del Edificio",
		"settings-display-upgradebutton": "Mostrar Botón de Construcción",
		"settings-display-enableupgrade": "Habilitar Link de Construcción Rápida",
		"settings-language-title": "Opciones de Idioma",
		"settings-language-selector": "Idiomas Disponibles",
		"confirm-upgrade": "Tiempo de construcción \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "Español"
	},
	pl: {
		"townHall": "Ratusz",
		"academy": "Akademia",
		"warehouse": "Magazyn",
		"tavern": "Tawerna",
		"palace": "Pałac",
		"palaceColony": "Rezydencja Gubernatora",
		"museum": "Muzeum",
		"port": "Port",
		"shipyard": "Stocznia",
		"barracks": "Koszary",
		"wall": "Mur Miejski",
		"embassy": "Ambasada",
		"branchOffice": "Bazar",
		"workshop": "Warsztat",
		"safehouse": "Kryjówka",
		"forester": "Leśniczówka",
		"glassblowing": "Huta Szkła",
		"alchemist": "Wieża Alchemika",
		"winegrower": "Winnica",
		"stonemason": "Kamieniarz",
		"carpentering": "Warsztat Cieśli",
		"optician": "Optyk",
		"fireworker": "Zakład Pirotechnika",
		"vineyard": "Winiarz",
		"architect": "Biuro Architekta",
		"buildingGround": "Plac Budowy",
		"settings-main-title": "Ustawienia Wzmacniacza Miast",
		"settings-save-text": "Zapisz Ustawienia",
		"settings-research-title": "Ukończono Badanie",
		"settings-research-selector": "Najwyższe Ukończone Badanie",
		"settings-research-pulley": "Blok",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Poziomica",
		"settings-display-title": "Ustwienia Wyświetlania",
		"settings-display-buildingname": "Wyświetl Nazwę Budynku",
		"settings-display-buildinglevel": "Wyświetl Poziom Budynku",
		"settings-display-upgradebutton": "Wyświetl Przycisk Uleprzania",
		"settings-language-title": "Zmień Język",
		"settings-language-selector": "Dostępne Języki",
		"language-name": "Polski"
	},
	vn: {
		"townHall": "Tòa thị chính",
		"academy": "Học viện",
		"warehouse": "Kho hàng",
		"tavern": "Quán Rượu",
		"palace": "Cung điện",
		"palaceColony": "Phủ thủ hiến",
		"museum": "Viện bảo tàng",
		"port": "Cảng giao dịch",
		"shipyard": "Xưởng đóng tàu",
		"barracks": "Trại lính",
		"wall": "Tường thành",
		"embassy": "Đại sứ quán",
		"branchOffice": "Trạm giao dịch",
		"workshop": "Xưởng",
		"safehouse": "Nơi ẩn náu",
		"forester": "Trạm kiểm lâm",
		"glassblowing": "Thợ thủy tinh",
		"alchemist": "Tháp giả kim thuật",
		"winegrower": "Người trồng nho",
		"stonemason": "Thợ xây đá",
		"carpentering": "Thợ mộc",
		"optician": "Thợ làm kính",
		"fireworker": "Xưởng thử nghiệm thuốc súng",
		"vineyard": "Máy Ép Nho",
		"architect": "Văn phòng kiến trúc sư",
		"buildingGround": "Mặt bằng xây dựng trống trải",
		"settings-main-title": "Cài đặt Town Enhancer",
		"settings-save-text": "Lưu cài đặt",
		"settings-research-title": "Nghiên cứu đã hoàn thành",
		"settings-research-selector": "Mức độ nghiên cứu đã hoàn tất",
		"settings-research-pulley": " Ròng rọc ",
		"settings-research-geometry": " Hình học ",
		"settings-research-spiritlevel": " Thước thủy cân bằng ",
		"settings-display-title": "Cài đặt hiển thị",
		"settings-display-buildingname": "Hiển thị tên công trình",
		"settings-display-buildinglevel": " Hiển thị cấp độ công trình ",
		"settings-display-upgradebutton": "Hiển thị nút nâng cấp",
		"settings-language-title": "Cài đặt ngôn ngữ",
		"settings-language-selector": "Những ngôn ngữ được hỗ trợ",
		"language-name": "Tiếng Việt"
	},
	da: {
		"townHall": "Rådhus",
		"academy": "Akademi",
		"warehouse": "Lagerbygning",
		"tavern": "Værtshus",
		"palace": "Palads",
		"palaceColony": "Guv. Residens",
		"museum": "Museum",
		"port": "Handelshavn",
		"shipyard": "Skibsværft",
		"barracks": "Kasserne",
		"wall": "Bymur",
		"embassy": "Ambassade",
		"branchOffice": "Handelsstation",
		"workshop": "Værksted",
		"safehouse": "Skjulested",
		"forester": "Skovfodede",
		"glassblowing": "Glasblæser",
		"alchemist": "Alkymist",
		"winegrower": "Vinbonde",
		"stonemason": "Stenhugger",
		"carpentering": "Tømrer",
		"optician": "Optiker",
		"fireworker": "Fyrværkerifabrik",
		"vineyard": "Vinpresse",
		"architect": "Arkitekt",
		"buildingGround": "Byggegrund",
		"settings-main-title": "Town Enhancer Indstillinger",
		"settings-save-text": "Gem Indstillingerne",
		"settings-research-title": "Færdige Forskninger",
		"settings-research-selector": "Høgeste Færdige Forskning",
		"settings-research-pulley": "Bloker",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Vatterpas",
		"settings-display-title": "Vis Indstillingerne",
		"settings-display-buildingname": "Vis Bygningsnavn",
		"settings-display-buildinglevel": "Vis Bygningsniveau",
		"settings-display-upgradebutton": "Vis opgraderingsknap",
		"settings-language-title": "Sprog Indstillinger",
		"settings-language-selector": "Tilgængelige Sprog",
		"language-name": "Dansk (Kilden af Liv)"
	},
	fr: {
		"townHall": "Hôtel de Ville",
		"academy": "Académie",
		"warehouse": "Entrepôt",
		"tavern": "Taverne",
		"palace": "Palais",
		"palaceColony": "Résidence du Gouv.",
		"museum": "Musée",
		"port": "Port",
		"shipyard": "Chantier naval",
		"barracks": "Caserne",
		"wall": "Mur d'enceinte",
		"embassy": "Ambassade",
		"branchOffice": "Comptoir",
		"workshop": "Atelier",
		"safehouse": "Cachette",
		"forester": "Maison forestière",
		"glassblowing": "Verrier",
		"alchemist": "Tour des Alchimistes",
		"winegrower": "Pressoir à Vin",
		"stonemason": "Tailleur de Pierre",
		"carpentering": "Charpentier",
		"optician": "Opticien",
		"fireworker": "Zone des Artificiers",
		"vineyard": "Cave à Vin",
		"architect": "Architecte",
		"buildingGround": "Terrain Libre",
		"settings-main-title": "Options de Town Enhancer",
		"settings-save-text": "Sauvegarder les options",
		"settings-research-title": "Recherches découvertes",
		"settings-research-selector": "Plus haute recherche découverte",
		"settings-research-pulley": "Palan",
		"settings-research-geometry": "Géométrie",
		"settings-research-spiritlevel": "Niveau à eau",
		"settings-display-title": "Options de visualisation",
		"settings-display-buildingname": "Montrer le nom du bâtiment",
		"settings-display-buildinglevel": "Montrer le niveau du bâtiment",
		"settings-display-upgradebutton": "Montrer le bouton d'amélioration",
		"settings-display-enableupgrade": "Activer le lien d'amélioration rapide",
		"settings-language-title": "Option de langue",
		"settings-language-selector": "Langages disponibles",
		"confirm-upgrade": "Améliorer le bâtiment \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "Français"
	},
	nl: {
		"townHall": "Stadhuis",
		"academy": "Academie",
		"warehouse": "Warenhuis",
		"tavern": "Taverne",
		"palace": "Paleis",
		"palaceColony": "Gouverneurs Woning",
		"museum": "Museum",
		"port": "Haven",
		"shipyard": "Scheepswerf",
		"barracks": "Barakken",
		"wall": "Stadsmuur",
		"embassy": "Ambassade",
		"branchOffice": "Handelspost",
		"workshop": "Werkplaats",
		"safehouse": "Schuilplaats",
		"forester": "Houthakkers Loge",
		"glassblowing": "Glasblazer",
		"alchemist": "Alchemist",
		"winegrower": "Wijnboer",
		"stonemason": "Steenhouwer",
		"carpentering": "Timmerman",
		"optician": "Opticien",
		"fireworker": "Vuurwerk Opslag",
		"vineyard": "Wijn Pers",
		"architect": "Architectenbureau",
		"buildingGround": "Vrije Bouwgrond",
		"settings-main-title": "Town Enhancer Optie's",
		"settings-save-text": "Opslaan",
		"settings-research-title": "Afgerond Onderzoek",
		"settings-research-selector": "Hoogst Afgeronde Onderzoek",
		"settings-research-pulley": "Katrol",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Geest Level",
		"settings-display-title": "Display Optie's",
		"settings-display-buildingname": "Laat Gebouw naam zien",
		"settings-display-buildinglevel": "Laat Gebouw niveau zien",
		"settings-display-upgradebutton": "Laat Upgrade knop zien",
		"settings-language-title": "Taal Opties",
		"settings-language-selector": "Mogelijke Talen",
		"language-name": "Dutch (Nightlion)"
	},
	hu: {
		"townHall": "Városháza",
		"academy": "Akadémia",
		"warehouse": "Raktárépület",
		"tavern": "Fogadó",
		"palace": "Palota",
		"palaceColony": "Helytartó Székhelye",
		"museum": "Múzeum",
		"port": "Kereskedelmi kikötő",
		"shipyard": "Hajógyár",
		"barracks": "Barakk",
		"wall": "Városfal",
		"embassy": "Nagykövetség",
		"branchOffice": "Kereskedő poszt",
		"workshop": "Műhely",
		"safehouse": "Rejtekhely",
		"forester": "Erdészház",
		"glassblowing": "Üvegfúró",
		"alchemist": "Alkimista Torony",
		"winegrower": "Bortermelő",
		"stonemason": "Kőműves",
		"carpentering": "Ácsmester",
		"optician": "Optikus",
		"fireworker": "Tűzszerész Teszt Terület",
		"vineyard": "Szőlőprés",
		"architect": "Építész Irodája",
		"buildingGround": "Épületek",
		"settings-main-title": "Város Bővítő Beállításai",
		"settings-save-text": "Beállítások Mentése",
		"settings-research-title": "Kifejlesztett Kutatás",
		"settings-research-selector": "Legmagasabb Kifejlesztett Kutatás",
		"settings-research-pulley": "Emelőcsiga",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Vízszint",
		"settings-display-title": "Kijelző Beállításai",
		"settings-display-buildingname": "Épület neve látható",
		"settings-display-buildinglevel": "Épület szintje látható",
		"settings-display-upgradebutton": "Fejesztés gomb látható",
		"settings-display-enableupgrade": "Gyors fejlesztés link engedélyezése",
		"settings-language-title": "Nyelv beállítások",
		"settings-language-selector": "Elérhető nyelvek",
		"confirm-upgrade": "Épület fejlesztése \"<%building%>\"? [erről: <%old%> erre: <%new%>]",
		"language-name": "Magyar"
	},
	ar: {
		"townHall": "دار البلدية",
		"academy": "أكاديمية",
		"warehouse": "المخزن",
		"tavern": "الإستراحة",
		"palace": "القصر",
		"palaceColony": "القائم مقام",
		"museum": "المتحف",
		"port": "المرفأ التجاري",
		"shipyard": "حوض بناء السفن",
		"barracks": "الثكنة",
		"wall": "الجدار",
		"embassy": "السفارة",
		"branchOffice": "المتجر",
		"workshop": "المخترعين",
		"safehouse": "المخبأ",
		"forester": "الحطاب",
		"glassblowing": "نافخ الزجاج",
		"alchemist": "برج الكيمياء",
		"winegrower": "كرمة العنب",
		"stonemason": "النحات",
		"carpentering": "النجار",
		"optician": "البصريات",
		"fireworker": "الالعاب النارية",
		"vineyard": "عصارة العنب",
		"architect": "المهندس",
		"buildingGround": "مكان فارغ",
		"settings-main-title": "اعدادات محسن المدن",
		"settings-save-text": "حفظ الاعدادات",
		"settings-research-title": "البحوث",
		"settings-research-selector": "اخر بحث مكتمل",
		"settings-research-pulley": "الرافعة",
		"settings-research-geometry": "هندسة",
		"settings-research-spiritlevel": "ميزان زئبق",
		"settings-display-title": "الاعدادات",
		"settings-display-buildingname": "اظهار اسم المبنى",
		"settings-display-buildinglevel": "اظهار مستوى المبنى",
		"settings-display-upgradebutton": "اظهار زر التطوير",
		"settings-language-title": "اعدادات اللغة",
		"settings-language-selector": "اللغات المتوفرة",
		"language-name": "العربية"
	},
	ser: {
		"townHall": "Gradska Skupština",
		"academy": "Akademija",
		"warehouse": "Skladište",
		"tavern": "Taverna",
		"palace": "Palata",
		"palaceColony": "Guvernerova Palata",
		"museum": "Muzej",
		"port": "Luka",
		"shipyard": "Brodogradilište",
		"barracks": "Barake",
		"wall": "Gradske Zidine",
		"embassy": "Ambasada",
		"branchOffice": "Market",
		"workshop": "Radionica",
		"safehouse": "Sklonište",
		"forester": "Šumar",
		"glassblowing": "Staklarija",
		"alchemist": "Alhemičar",
		"winegrower": "Vinarija",
		"stonemason": "Zidar",
		"carpentering": "Stolar",
		"optician": "Optičar",
		"fireworker": "Vatromet",
		"vineyard": "Vinski Podrum",
		"architect": "Arhitekta",
		"buildingGround": "Zemljište",
		"settings-main-title": "Town Enhancer Podešavanja",
		"settings-save-text": "Sačuvaj Podešavanja",
		"settings-research-title": "Završeno Istraživanje",
		"settings-research-selector": "Najviše Završeno Istraživanje",
		"settings-research-pulley": "Čekrk",
		"settings-research-geometry": "Geometrija",
		"settings-research-spiritlevel": "Duhovni Nivo",
		"settings-display-title": "Prikaz Podešavanja",
		"settings-display-buildingname": "Prikaz Naziva Zgrade",
		"settings-display-buildinglevel": "Prikaz Nivoa Zgrade",
		"settings-display-upgradebutton": "Prikaz Tastera za Nadogradnju",
		"settings-language-title": "Podešavanje Jezika",
		"settings-language-selector": "Dostupni Jezici",
		"language-name": "Serbian"
	},
	pt: {
		"townHall": "Câmara Municipal",
		"academy": "Academia",
		"warehouse": "Armazém",
		"tavern": "Taberna",
		"palace": "Palácio",
		"palaceColony": "Residência Gov.",
		"museum": "Museu",
		"port": "Porto",
		"shipyard": "Estaleiro",
		"barracks": "Quartel",
		"wall": "Muralha",
		"embassy": "Embaixada",
		"branchOffice": "Mercado",
		"workshop": "Oficina",
		"safehouse": "Esconderijo",
		"forester": "Lenhador",
		"glassblowing": "Vidraceiro",
		"alchemist": "Alquimista",
		"winegrower": "Vinicultor",
		"stonemason": "Pedreiro",
		"carpentering": "Carpinteiro",
		"optician": "Optometrista",
		"fireworker": "Pirotécnico",
		"vineyard": "Cave de Vinho",
		"architect": "Arquitecto",
		"buildingGround": "Zona de Construção",
		"settings-main-title": "Definições do Town Enhancer",
		"settings-save-text": "Gravar Alterações",
		"settings-research-title": "Pesquisa Completada",
		"settings-research-selector": "Pesquisa mais alta completa",
		"settings-research-pulley": "Árvore de pesquisas",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Spirit Level",
		"settings-display-title": "Definições de exibição",
		"settings-display-buildingname": "Mostrar Nome Edifício",
		"settings-display-buildinglevel": "Mostrar nível de construção",
		"settings-display-upgradebutton": "Mostrar Botão Upgrade",
		"settings-language-title": "Definições de linguagem",
		"settings-language-selector": "Linguagens Disponíveis",
		"language-name": "Português"
	},
	ro: {
		"townHall": "Primarie",
		"academy": "Academie",
		"warehouse": "Magazie",
		"tavern": "Taverna",
		"palace": "Palat",
		"palaceColony": "Resedinta Guv.",
		"museum": "Muzeu",
		"port": "Port",
		"shipyard": "Santier",
		"barracks": "Cazarma",
		"wall": "Zid",
		"embassy": "Ambasada",
		"branchOffice": "Punct de negot",
		"workshop": "Atelier",
		"safehouse": "Ascunzatoare",
		"forester": "Casa padurarului",
		"glassblowing": "Sticlarie",
		"alchemist": "Alchimist",
		"winegrower": "Vinificator",
		"stonemason": "Cariera",
		"carpentering": "Dulgher",
		"optician": "Optician",
		"fireworker": "Zona pirotehnica",
		"vineyard": "Presa de vin",
		"architect": "Arhitect",
		"buildingGround": "Teren liber",
		"settings-main-title": "Optiuni Imbunatarire Oras",
		"settings-save-text": "Salveaza",
		"settings-research-title": "Cercetare completata",
		"settings-research-selector": "Cel mai inalt grad de cercetare completata",
		"settings-research-pulley": "Scripete",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Cumpana",
		"settings-display-title": "Afiseaza optiuni",
		"settings-display-buildingname": "Afiseaza numele cladirii",
		"settings-display-buildinglevel": "Afiseaza nivelul cladirii",
		"settings-display-upgradebutton": "Afiseaza buton pentru extindere",
		"settings-language-title": "Setari limba",
		"settings-language-selector": "Limbi disponibile",
		"language-name": "Romana"
	},
	ru: {
		"townHall": "Ратуша",
		"academy": "Академия",
		"warehouse": "Склад",
		"tavern": "Таверна",
		"palace": "Дворец",
		"palaceColony": "Резид. губернатора",
		"museum": "Музей",
		"port": "Торговый порт",
		"shipyard": "Верфь",
		"barracks": "Казарма",
		"wall": "Стена",
		"embassy": "Посольство",
		"branchOffice": "Торговый пост",
		"workshop": "Мастерская",
		"safehouse": "Укрытие",
		"forester": "Хижина Лесничего",
		"glassblowing": "Стеклодувная мастерская",
		"alchemist": "Башня Алхимика",
		"winegrower": "Винодельня",
		"stonemason": "Каменоломня",
		"carpentering": "Плотницкая мастерская",
		"optician": "Оптика",
		"fireworker": "Полигон Пиротехника",
		"vineyard": "Винный погреб",
		"architect": "Бюро Архитектора",
		"buildingGround": "Пустырь",
		"settings-main-title": "Параметры скрипта Town Enhancer",
		"settings-save-text": "Сохранить настройки",
		"settings-research-title": "Изученное исследование",
		"settings-research-selector": "Самое крутое завершённое исследование",
		"settings-research-pulley": "Шкив",
		"settings-research-geometry": "Геометрия",
		"settings-research-spiritlevel": "Водяной уровень",
		"settings-display-title": "Параметры отображения",
		"settings-display-buildingname": "Показывать названия зданий",
		"settings-display-buildinglevel": "Показывать уровень зданий",
		"settings-display-upgradebutton": "Показывать иконку возможности улучшения",
		"settings-language-title": "Установки языка",
		"settings-language-selector": "Доступные языки",
		"language-name": "Русский"
	},
	it: {
		"townHall": "Municipio",
		"academy": "Accademia",
		"warehouse": "Magazzino",
		"tavern": "Taverna",
		"palace": "Palazzo",
		"palaceColony": "Residenza Gov.",
		"museum": "Museo",
		"port": "Porto",
		"shipyard": "Cantiere Nav.",
		"barracks": "Caserma",
		"wall": "Mura della Città",
		"embassy": "Ambasciata",
		"branchOffice": "Mercato",
		"workshop": "Officina",
		"safehouse": "Nascondiglio",
		"forester": "Guardia Boschi",
		"glassblowing": "Vetraio",
		"alchemist": "Alchimista",
		"winegrower": "Viticoltore",
		"stonemason": "Tagliapietre",
		"carpentering": "Carpentiere",
		"optician": "Ottico",
		"fireworker": "Zona Pirotecnica",
		"vineyard": "Cantine",
		"architect": "Architetto",
		"buildingGround": "Building Ground",
		"settings-main-title": "Impostazioni Town Enhancer",
		"settings-save-text": "Salva Impostazioni",
		"settings-research-title": "Ricerca Completata",
		"settings-research-selector": "Massima Ricerca Completata",
		"settings-research-pulley": "Carrucola",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Livella a Bolla",
		"settings-display-title": "Mostra Impostazioni",
		"settings-display-buildingname": "Mostra Nome Edificio",
		"settings-display-buildinglevel": "Mostra Livello Edificio",
		"settings-display-upgradebutton": "Mostra icona aggiornamento",
		"settings-language-title": "Impostazioni Lingua",
		"settings-language-selector": "Lingue Disponibili",
		"language-name": "Italian"
	},
	hr: {
		"townHall": "Gr. vijećnica",
		"academy": "Akademija",
		"warehouse": "Skladište",
		"tavern": "Taverna",
		"palace": "Palača",
		"palaceColony": "Guv. palača",
		"museum": "Muzej",
		"port": "Luka",
		"shipyard": "Brodogradilište",
		"barracks": "Barake",
		"wall": "Gr. bedem",
		"embassy": "Veleposlanstvo",
		"branchOffice": "Market",
		"workshop": "Radionica",
		"safehouse": "Sklonište",
		"forester": "Lug. kuća",
		"glassblowing": "Staklarnica",
		"alchemist": "Alkem. toranj",
		"winegrower": "Vinarija",
		"stonemason": "Klesar",
		"carpentering": "Stolarija",
		"optician": "Optičar",
		"fireworker": "Rad. vatrometa",
		"vineyard": "Vinski podrum",
		"architect": "Arhit. kuća",
		"buildingGround": "Građ. zemljište",
		"settings-main-title": "Postavke Town Enhancera",
		"settings-save-text": "Sačuvaj postavke",
		"settings-research-title": "Istraživanje završeno",
		"settings-research-selector": "Najviše završeno istraživanje",
		"settings-research-pulley": "Kotač",
		"settings-research-geometry": "Geometrija",
		"settings-research-spiritlevel": "Duhovni Level",
		"settings-display-title": "Prikaži postavke",
		"settings-display-buildingname": "Prikaži ime zgrade",
		"settings-display-buildinglevel": "Prikaži level zgrade",
		"settings-display-upgradebutton": "Prikaži gumb za unaprjeđenje",
		"settings-language-title": "Jezične postavke",
		"settings-language-selector": "Dostupni jezici",
		"language-name": "hrvatski"
	},
	fi: {
		"townHall": "Kaupungintalo",
		"academy": "Akatemia",
		"warehouse": "Varasto",
		"tavern": "Taverna",
		"palace": "Palatsi",
		"palaceColony": "Kuvernöörin asunto",
		"museum": "Museo",
		"port": "Kauppasatama",
		"shipyard": "Telakka",
		"barracks": "Kasarmi",
		"wall": "Kaupungin muuri",
		"embassy": "Lähetystö",
		"branchOffice": "Kauppapaikka",
		"workshop": "Paja",
		"safehouse": "Piilopaikka",
		"forester": "Metsänhoitajan talo",
		"glassblowing": "Lasinpuhaltaja",
		"alchemist": "Alkemistin torni",
		"winegrower": "Viinitarhuri",
		"stonemason": "Kivenhakkaaja",
		"carpentering": "Puusepän paja",
		"optician": "Optikko",
		"fireworker": "Ilotulite testialue",
		"vineyard": "Viinipaino",
		"architect": "Arkkitehdin toimisto",
		"buildingGround": "Tyhjä tontti",
		"settings-main-title": "Kaupungin laajennuksen asennukset",
		"settings-save-text": "Tallenna asetukset",
		"settings-research-title": "Valmiit tutkimukset",
		"settings-research-selector": "Korkein saavutettu tutkimus",
		"settings-research-pulley": "Väkipyörä",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Vatupassi",
		"settings-display-title": "Näytä asetukset",
		"settings-display-buildingname": "Näytä rakennusten nimet",
		"settings-display-buildinglevel": "Näytä rakennusten tasot",
		"settings-display-upgradebutton": "Näytä päivittämisnappula",
		"settings-display-enableupgrade": "Salli nopea päivitys",
		"settings-language-title": "Kieliasetukset",
		"settings-language-selector": "Käytettävät kielet",
		"confirm-upgrade": "Päivitä rakennus \"<%building%>\"? [<%old%> -> <%new%>]",
		"language-name": "Suomi"
	}
};
// </language presets>

// <setup>
var server = document.location.hostname.split(".")[0].trim();
var view = (function() { if (!server) { return false; } else { return document.getElementsByTagName("body")[0].id; } })();
var activeLanguage = GM_getValue(server+"_tE_Language", "en");
var language = languages[activeLanguage];
var debug_requirements = false;
// </setup>

// <base data> !! DO NOT EDIT !! (report errors on the ikariamlibrary forum)
var data = {
	"townHall": [
		{ }, // 1
		{ w: 158, t: 3544 },
		{ w: 335, t: 3960 },
		{ w: 623, t: 4440 },
		{ w: 923, m: 285, t: 4980 }, // 5
		{ w: 1390, m: 551, t: 5640 },
		{ w: 2015, m: 936, t: 6480 },
		{ w: 2706, m: 1411, t: 7380 },
		{ w: 3661, m: 2091, t: 8460 },
		{ w: 4776, m: 2945, t: 9720 }, // 10
		{ w: 6173, m: 4072, t: 11160 },
		{ w: 8074, m: 5664, t: 12900 },
		{ w: 10281, m: 7637, t: 14880 },
		{ w: 13023, m: 10214, t: 17280 },
		{ w: 16424, m: 13575, t: 20040 }, // 15
		{ w: 20986, m: 18254, t: 23220 },
		{ w: 25423, m: 23250, t: 27000 },
		{ w: 32285, m: 31022, t: 31440 },
		{ w: 40232, m: 40599, t: 36600 },
		{ w: 49286, m: 52216, t: 42660 }, // 20
		{ w: 61207, m: 68069, t: 49740 },
		{ w: 74804, m: 87316, t: 57960 },
		{ w: 93956, m: 115101, t: 67680 },
		{ w: 113035, m: 145326, t: 78960 },
		{ w: 141594, m: 191053, t: 90000 }, // 25
		{ w: 170213, m: 241039, t: 104400 },
		{ w: 210011, m: 312128, t: 122499 }
	],
	"academy": [
		{ w: 64, t: 504 }, // 1
		{ w: 68, t: 1354 },
		{ w: 115, t: 1768 },
		{ w: 263, t: 2266 },
		{ w: 382, g: 225, t: 2863 }, // 5
		{ w: 626, g: 428, t: 3580 },
		{ w: 982, g: 744, t: 4440 },
		{ w: 1330, g: 1089, t: 5460 },
		{ w: 2004, g: 1748, t: 6660 },
		{ w: 2665, g: 2454, t: 8160 }, // 10
		{ w: 3916, g: 3786, t: 9960 },
		{ w: 5156, g: 5216, t: 12060 },
		{ w: 7446, g: 7862, t: 14640 },
		{ w: 9753, g: 10729, t: 17760 },
		{ w: 12751, g: 14599, t: 21420 }, // 15
		{ w: 18163, g: 21627, t: 25860 },
		{ w: 23691, g: 29321, t: 31200 },
		{ w: 33450, g: 43020, t: 37560 },
		{ w: 43571, g: 58213, t: 45240 },
		{ w: 56728, g: 78724, t: 54480 } // 20
	],
	"warehouse": [
		{ w: 160, t: 562 }, // 1
		{ w: 288, t: 1583 },
		{ w: 442, t: 2107 },
		{ w: 626, m: 96, t: 2704 },
		{ w: 847, m: 211, t: 3385 }, // 5
		{ w: 1113, m: 349, t: 4140 },
		{ w: 1431, m: 515, t: 5040 },
		{ w: 1813, m: 714, t: 6000 },
		{ w: 2272, m: 953, t: 7206 },
		{ w: 2822, m: 1240, t: 8460 }, // 10
		{ w: 3483, m: 1584, t: 9960 },
		{ w: 4275, m: 1997, t: 11700 },
		{ w: 5226, m: 2492, t: 13620 },
		{ w: 6368, m: 3086, t: 15840 },
		{ w: 7737, m: 3800, t: 18360 }, // 15
		{ w: 9380, m: 4656, t: 21240 },
		{ w: 11353, m: 5683, t: 24540 },
		{ w: 13719, m: 6915, t: 28260 },
		{ w: 16559, m: 8394, t: 32520 },
		{ w: 19967, m: 10169, t: 37380 }, // 20
		{ w: 24056, m: 12299, t: 39360 },
		{ w: 28963, m: 14855, t: 47046 },
		{ w: 34852, m: 17921, t: 56460 },
		{ w: 41917, m: 21602, t: 64680 },
		{ w: 50398, m: 26019, t: 74040 }, // 25
		{ w: 60574, m: 31319, t: 84720 },
		{ w: 72784, m: 37679, t: 93600 },
		{ w: 87437, m: 45310, t: 108000 },
		{ w: 105021, m: 54468, t: 126000 },
		{ w: 126333, m: 65457, t: 144000 }, // 30
		{ w: 151441, m: 78645, t: 162000 }
	],
	"tavern": [
		{ w: 101, t: 1008 }, // 1
		{ w: 222, t: 1695 }, 
		{ w: 367, t: 2423 },
		{ w: 541, m: 94, t: 3195 },
		{ w: 750, m: 122, t: 3960 }, // 5
		{ w: 1001, m: 158, t: 4860 },
		{ w: 1302, m: 206, t: 5760 },
		{ w: 1663, m: 267, t: 6720 },
		{ w: 2097, m: 348, t: 7800 },
		{ w: 2617, m: 452, t: 8880 }, // 10
		{ w: 3241, m: 587, t: 10020 },
		{ w: 3990, m: 764, t: 11280 },
		{ w: 4888, m: 993, t: 12540 },
		{ w: 5967, m: 1290, t: 13920 },
		{ w: 7261, m: 1677, t: 15420 }, // 15
		{ w: 8814, m: 2181, t: 16980 },
		{ w: 10678, m: 2835, t: 18600 },
		{ w: 12914, m: 3685, t: 20340 },
		{ w: 15598, m: 4791, t: 22200 },
		{ w: 18818, m: 6228, t: 24180 }, // 20
		{ w: 22683, m: 8097, t: 26220 },
		{ w: 27320, m: 10526, t: 28440 },
		{ w: 32885, m: 13684, t: 30780 },
		{ w: 39562, m: 17789, t: 33240 }
	],
	"palace": [
		{ w: 712, t: 16080 }, // 1
		{ w: 5824, m: 1434, t: 22560 },
		{ w: 16048, m: 4546, s: 3089, t: 31560 },
		{ w: 36496, W: 10898, m: 10770, s: 10301, t: 44220 },
		{ w: 77392, W: 22110, m: 23218, g: 21188, s: 24725, t: 61920 }, // 5
		{ w: 159184, W: 44534, m: 48114, g: 42400, s: 53573, t: 86700 },
		{ w: 322768, W: 89382, m: 97906, g: 82842, s: 111269, t: 118800 },
		{ w: 649935, W: 179078, m: 185744, g: 169671, s: 226661, t: 169200 },
		{ w: 1304271, W: 356470, m: 396658, g: 339368, s: 457445, t: 237600 }
	],
	"palaceColony": [
		{ w: 712, t: 16080 }, // 1
		{ w: 5824, m: 1434, t: 22560 },
		{ w: 16048, m: 4546, s: 3089, t: 31560 },
		{ w: 36496, W: 10898, m: 10770, s: 10301, t: 44220 },
		{ w: 77392, W: 22110, m: 23218, g: 21188, s: 24725, t: 61920 }, // 5
		{ w: 159184, W: 44534, m: 48114, g: 42400, s: 53573, t: 86700 },
		{ w: 322768, W: 89382, m: 97906, g: 82842, s: 111269, t: 118800 },
		{ w: 649935, W: 179078, m: 185744, g: 169671, s: 226661, t: 169200 },
		{ w: 1304271, W: 356470, m: 396658, g: 339368, s: 457445, t: 237600 }
	],
	"museum": [
		{ w: 560, m: 280, t: 5760 }, // 1
		{ w: 1435, m: 1190, t: 7740 },
		{ w: 2748, m: 2573, t: 9900 },
		{ w: 4716, m: 4676, t: 12300 },
		{ w: 7669, m: 7871, t: 14940 }, // 5
		{ w: 12099, m: 12729, t: 17820 },
		{ w: 18744, m: 20112, t: 21000 },
		{ w: 28710, m: 31335, t: 24540 },
		{ w: 47733, m: 52895, t: 28380 },
		{ w: 66084, m: 74322, t: 32640 }, // 10
		{ w: 99723, m: 113735, t: 37260 },
		{ w: 150181, m: 173642, t: 42420 }
	],
	"port": [
		{ w: 60, t: 504 }, // 1
		{ w: 150, t: 1386 },
		{ w: 274, t: 1821 },
		{ w: 429, t: 2321 },
		{ w: 637, t: 2895 }, // 5
		{ w: 894, m: 176, t: 3557 },
		{ w: 1207, m: 326, t: 4260 },
		{ w: 1645, m: 540, t: 5160 },
		{ w: 2106, m: 791, t: 6180 },
		{ w: 2735, m: 1138, t: 7320 }, // 10
		{ w: 3537, m: 1598, t: 8640 },
		{ w: 4492, m: 2176, t: 10200 },
		{ w: 5689, m: 2928, t: 11940 },
		{ w: 7103, m: 3859, t: 13980 },
		{ w: 8850, m: 5051, t: 16260 }, // 15
		{ w: 11094, m: 6628, t: 18960 },
		{ w: 13731, m: 8566, t: 22020 },
		{ w: 17062, m: 11089, t: 25560 },
		{ w: 21097, m: 14265, t: 29640 },
		{ w: 25965, m: 18241, t: 34320 }, // 20
		{ w: 31810, m: 23197, t: 39720 },
		{ w: 39190, m: 29642, t: 45900 },
		{ w: 47998, m: 37636, t: 52980 },
		{ w: 58713, m: 47703, t: 61214 }
	],
	"shipyard": [
		{ w: 105, t: 2592 }, // 1
		{ w: 202, t: 3078 },
		{ w: 324, t: 3588 },
		{ w: 477, t: 4080 },
		{ w: 671, t: 4680 }, // 5
		{ w: 914, m: 778, t: 5220 },
		{ w: 1222, m: 1052, t: 5880 },
		{ w: 1609, m: 1397, t: 6540 },
		{ w: 2096, m: 1832, t: 7233 },
		{ w: 2711, m: 2381, t: 7920 }, // 10
		{ w: 3485, m: 3071, t: 8700 },
		{ w: 4460, m: 3942, t: 9480 },
		{ w: 5689, m: 5038, t: 10320 },
		{ w: 7238, m: 6420, t: 11160 },
		{ w: 9190, m: 8161, t: 12060 }, // 15
		{ w: 11648, m: 10354, t: 13020 },
		{ w: 14745, m: 13117, t: 14040 }
	],
	"barracks": [
		{ w: 49, t: 396 }, // 1
		{ w: 114, t: 1044 },
		{ w: 195, t: 1321 },
		{ w: 296, t: 1626 },
		{ w: 420, t: 1962 }, // 5
		{ w: 574, t: 2330 },
		{ w: 766, t: 2736 },
		{ w: 1003, t: 3183 },
		{ w: 1297, m: 178, t: 3660 },
		{ w: 1662, m: 431, t: 4200 }, // 10
		{ w: 2115, m: 745, t: 4800 },
		{ w: 2676, m: 1134, t: 5460 },
		{ w: 3371, m: 1616, t: 6180 },
		{ w: 4234, m: 2214, t: 6960 },
		{ w: 5304, m: 2956, t: 7800 }, // 15
		{ w: 6630, m: 3875, t: 8760 },
		{ w: 8275, m: 5015, t: 9840 },
		{ w: 10314, m: 6429, t: 10980 },
		{ w: 12843, m: 8183, t: 12240 },
		{ w: 15979, m: 10357, t: 13680 }, // 20
		{ w: 19868, m: 13052, t: 15180 },
		{ w: 24690, m: 16395, t: 16920 },
		{ w: 30669, m: 20540, t: 18780 },
		{ w: 38083, m: 25680, t: 20820 },
		{ w: 47277, m: 32054, t: 23040 }, // 25
		{ w: 58772, m: 39957, t: 25560 },
		{ w: 72932, m: 49839, t: 28260 },
		{ w: 90490, m: 61909, t: 31260 }
	],
	"wall": [
		{ w: 114, t: 1260 }, // 1
		{ w: 361, m: 203, t: 3096 },
		{ w: 657, m: 516, t: 3720 },
		{ w: 1012, m: 892, t: 4380 },
		{ w: 1439, m: 1344, t: 5160 }, // 5
		{ w: 1951, m: 1885, t: 6000 },
		{ w: 2565, m: 2535, t: 6960 },
		{ w: 3302, m: 3315, t: 7980 },
		{ w: 4186, m: 4251, t: 9060 },
		{ w: 5247, m: 5374, t: 10320 }, // 10
		{ w: 6521, m: 6721, t: 11700 },
		{ w: 8049, m: 8338, t: 13140 },
		{ w: 9882, m: 10279, t: 14820 },
		{ w: 12083, m: 12608, t: 16620 },
		{ w: 14724, m: 15402, t: 18600 }, // 15
		{ w: 17892, m: 18755, t: 20820 },
		{ w: 21695, m: 22779, t: 23220 },
		{ w: 26258, m: 27607, t: 25860 },
		{ w: 31733, m: 33402, t: 28740 },
		{ w: 38304, m: 40355, t: 31980 }, // 20
		{ w: 46189, m: 48699, t: 35460 },
		{ w: 55650, m: 58711, t: 39360 },
		{ w: 67004, m: 70726, t: 43620 },
		{ w: 80629, m: 85144, t: 48300 },
		{ w: 96978, m: 102445, t: 53460 }, // 25
		{ w: 116599, m: 123208, t: 59160 },
		{ w: 140142, m: 148121, t: 65400 },
		{ w: 168395, m: 178019, t: 72240 },
		{ w: 202298, m: 213896, t: 79800 }
	],
	"embassy": [
		{ w: 242, m: 155, t: 4320 }, // 1
		{ w: 415, m: 342, t: 5040 },
		{ w: 623, m: 571, t: 5760 },
		{ w: 873, m: 850, t: 6540 },
		{ w: 1173, m: 1190, t: 7380 }, // 5
		{ w: 1532, m: 1606, t: 8280 },
		{ w: 1964, m: 2112, t: 9180 },
		{ w: 2482, m: 2730, t: 10140 },
		{ w: 3103, m: 3484, t: 11160 },
		{ w: 3849, m: 4404, t: 12240 }, // 10
		{ w: 4743, m: 5527, t: 13320 },
		{ w: 5817, m: 6896, t: 14520 },
		{ w: 7105, m: 8566, t: 15780 },
		{ w: 8651, m: 10604, t: 17040 },
		{ w: 10507, m: 13090, t: 18420 }, // 15
		{ w: 12733, m: 16123, t: 19800 },
		{ w: 15404, m: 19824, t: 21399 },
		{ w: 18498, m: 24339, t: 22920 },
		{ w: 22457, m: 29846, t: 24540 },
		{ w: 27074, m: 36564, t: 26280 }, // 20
		{ w: 32290, m: 45216, t: 28080 },
		{ w: 39261, m: 54769, t: 30000 },
		{ w: 47240, m: 66733, t: 32040 },
		{ w: 56812, m: 81859, t: 34140 }
	],
	"branchOffice": [
		{ w: 48, t: 1440 }, // 1
		{ w: 173, t: 2520 },
		{ w: 346, t: 3660 },
		{ w: 581, t: 4980 },
		{ w: 896, m: 540, t: 6420 }, // 5
		{ w: 1314, m: 792, t: 7980 },
		{ w: 1863, m: 1123, t: 9720 },
		{ w: 2580, m: 1555, t: 11640 },
		{ w: 3509, m: 2115, t: 13740 },
		{ w: 4706, m: 2837, t: 16080 }, // 10
		{ w: 6241, m: 3762, t: 18600 },
		{ w: 8203, m: 4945, t: 21420 },
		{ w: 10699, m: 6450, t: 24480 },
		{ w: 13866, m: 8359, t: 27900 },
		{ w: 17872, m: 10774, t: 31620 }, // 15
		{ w: 22926, m: 13820, t: 35700 },
		{ w: 29285, m: 17654, t: 40260 }
	],
	"workshop": [
		{ w: 220, m: 95, t: 2520 }, // 1
		{ w: 383, m: 167, t: 3240 },
		{ w: 569, m: 251, t: 3960 },
		{ w: 781, m: 349, t: 4740 },
		{ w: 1023, m: 461, t: 5580 }, // 5
		{ w: 1299, m: 592, t: 6480 },
		{ w: 1613, m: 744, t: 7380 },
		{ w: 1972, m: 920, t: 8340 },
		{ w: 2380, m: 1125, t: 9360 },
		{ w: 2846, m: 1362, t: 10440 }, // 10
		{ w: 3377, m: 1637, t: 11520 },
		{ w: 3982, m: 1956, t: 12720 },
		{ w: 4672, m: 2326, t: 13980 },
		{ w: 5458, m: 2755, t: 15240 },
		{ w: 6355, m: 3253, t: 16620 }, // 15
		{ w: 7377, m: 3831, t: 18057 }, 
		{ w: 8542, m: 4500, t: 19500 },
		{ w: 9870, m: 5279, t: 21120 }, 
		{ w: 11385, m: 6180, t: 22740 },
		{ w: 13111, m: 7226, t: 24480 }, // 20
		{ w: 15078, m: 8439, t: 26280 },
		{ }, // 22 - unknown
		{ }, // 23 - unknown
		{ w: 22796, m: 13373, t: 0 }, // time unknown
		{ w: 26119, m: 15570, t: 34560 }, // 25
		{ w: 29909, m: 18118, t: 36840 },
		{ w: 34228, m: 21074, t: 0 }, // time unknown
		{ w: 39153, m: 24503, t: 0 }, // time unknown
		{ }, // 29 - unknown
		{ }, // 30 - unknown
		{ w: 58462, m: 38447, t: 50160 }
	],
	"safehouse": [
		{ w: 113, t: 1440 }, // 1
		{ w: 248, t: 2160 },
		{ w: 402, t: 2916 },
		{ w: 578, m: 129, t: 3660 },
		{ w: 779, m: 197, t: 4500 }, // 5
		{ w: 1007, m: 275, t: 5400 },
		{ w: 1267, m: 366, t: 6300 },
		{ w: 1564, m: 471, t: 7260 },
		{ w: 1903, m: 593, t: 8280 },
		{ w: 2288, m: 735, t: 9360 }, // 10
		{ w: 2728, m: 900, t: 10440 },
		{ w: 3230, m: 1090, t: 11640 },
		{ w: 3801, m: 1312, t: 12900 },
		{ w: 4453, m: 1569, t: 14160 },
		{ w: 5195, m: 1866, t: 15540 }, // 15
		{ w: 6042, m: 2212, t: 16920 },
		{ w: 7007, m: 2613, t: 18420 },
		{ w: 8107, m: 2924, t: 20040 },
		{ w: 9547, m: 3617, t: 21660 },
		{ w: 10793, m: 4242, t: 23400 }, // 20
		{ w: 12422, m: 4967, t: 25247 },
		{ w: 14282, m: 5810, t: 27120 },
		{ w: 16400, m: 6785, t: 29160 },
		{ w: 18815, m: 7919, t: 31260 },
		{ w: 21570, m: 9233, t: 33480 }, // 25
		{ w: 24708, m: 10757, t: 35760 }
	],
	"forester": [
		{ w: 250, t: 1080 }, // 1
		{ w: 430, m: 104, t: 1800 },
		{ w: 664, m: 237, t: 2592 },
		{ w: 968, m: 410, t: 3463 },
		{ w: 1364, m: 635, t: 4380 }, // 5
		{ w: 1878, m: 928, t: 5460 },
		{ w: 2546, m: 1309, t: 6600 },
		{ w: 3415, m: 1803, t: 7860 },
		{ w: 4544, m: 2446, t: 9300 },
		{ w: 6013, m: 3282, t: 10857 }, // 10
		{ w: 7922, m: 4368, t: 12540 },
		{ w: 10403, m: 5781, t: 14422 },
		{ w: 13629, m: 7617, t: 16440 },
		{ w: 17823, m: 10004, t: 18720 },
		{ w: 23274, m: 13108, t: 21180 }, // 15
		{ w: 30362, m: 17142, t: 23940 }
	],
	"glassblowing": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"alchemist": [
		{ w: 274, t: 1080 }, // 1 
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"winegrower": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"stonemason": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"carpentering": [
		{ w: 63, t: 792 }, // 1
		{ w: 122, t: 1008 },
		{ w: 192, t: 1237 },
		{ w: 274, t: 1480 },
		{ w: 372, t: 1737 }, // 5
		{ w: 486, t: 2010 },
		{ w: 620, t: 2299 },
		{ w: 777, m: 359, t: 2605 },
		{ w: 962, m: 444, t: 2930 },
		{ w: 1178, m: 546, t: 3274 }, // 10
		{ w: 1432, m: 669, t: 3639 },
		{ w: 1730, m: 816, t: 4020 },
		{ w: 2078, m: 993, t: 4380 },
		{ w: 2486, m: 1205, t: 4860 },
		{ w: 2964, m: 1459, t: 5280 }, // 15
		{ w: 3524, m: 1765, t: 5820 },
		{ w: 4178, m: 2131, t: 6300 },
		{ w: 4933, m: 2571, t: 6840 }, 
		{ w: 5841, m: 3731, t: 7440 },
		{ w: 6890, m: 3731, t: 8040 }, // 20
		{ w: 8117, m: 4490, t: 8700 },
		{ w: 9550, m: 5402, t: 9420 },
		{ w: 11229, m: 6496, t: 10140 },
		{ w: 13190, m: 7808, t: 10980 },
		{ w: 15484, m: 9383, t: 11760 }, // 25
		{ w: 18167, m: 11273, t: 12600 },
		{ w: 21299, m: 15397, t: 13560 },
		{ w: 24946, m: 16256, t: 14520 },
		{ w: 29245, m: 19531, t: 15540 },
		{ }, // 30 - unknown
		{ }, // 31 - unknown
		{ } // 32 - unknown
	],
	"optician": [
		{ w: 119, t: 828 }, // 1
		{ w: 188, m: 35, t: 1044 },
		{ w: 269, m: 96, t: 1273 },
		{ w: 362, m: 167, t: 1516 },
		{ w: 471, m: 249, t: 1773 }, // 5
		{ w: 597, m: 345, t: 2046 },
		{ w: 742, m: 455, t: 2335 },
		{ w: 912, m: 584, t: 2641 },
		{ w: 1108, m: 733, t: 2966 },
		{ w: 1335, m: 905, t: 3310 }, // 10
		{ w: 1600, m: 1106, t: 3660 },
		{ w: 1906, m: 1338, t: 4020 },
		{ w: 2261, m: 1608, t: 4440 },
		{ w: 2673, m: 1921, t: 4860 },
		{ w: 3152, m: 2283, t: 5340 }, // 15
		{ w: 3706, m: 2704, t: 5820 }
	],
	"fireworker": [
		{ w: 273, m: 135, t: 972 }, // 1
		{ w: 353, m: 212, t: 1188 },
		{ w: 445, m: 302, t: 1417 },
		{ w: 551, m: 405, t: 1660 },
		{ w: 673, m: 526, t: 1917 }, // 5
		{ w: 813, m: 665, t: 2190 },
		{ w: 974, m: 827, t: 2479 },
		{ w: 1159, m: 1015, t: 2785 },
		{ w: 1373, m: 1233, t: 3110 },
		{ w: 1618, m: 1486, t: 3454 }, // 10
		{ w: 1899, m: 1779, t: 3780 },
		{ w: 2223, m: 2120, t: 4200 },
		{ w: 2596, m: 2514, t: 4560 },
		{ w: 3025, m: 2972, t: 5040 },
		{ w: 3517, m: 3503, t: 5460 }, // 15
		{ w: 4084, m: 4119, t: 6000 }
	],
	"vineyard": [
		{ w: 339, m: 123, t: 1368 }, // 1
		{ w: 423, m: 198, t: 1584 },
		{ w: 520, m: 285, t: 1813 },
		{ w: 631, m: 387, t: 2056 },
		{ w: 758, m: 504, t: 2313 }, // 5
		{ w: 905, m: 640, t: 2586 },
		{ w: 1074, m: 798, t: 2875 },
		{ w: 1269, m: 981, t: 3181 },
		{ w: 1492, m: 1194, t: 3506 },
		{ w: 1749, m: 1440, t: 3840 }, // 10
		{ w: 2045, m: 1726, t: 4200 },
		{ w: 2384, m: 2058, t: 4560 },
		{ w: 2775, m: 2443, t: 4980 },
		{ w: 3225, m: 2889, t: 5400 },
		{ w: 3741, m: 3407, t: 5880 }, // 15
		{ w: 4336, m: 4008, t: 6360 },
		{ w: 5132, m: 4705, t: 6900 },
		{ w: 5813, m: 5513, t: 7440 },
		{ w: 6875, m: 6450, t: 8040 },
		{ w: 7941, m: 7537, t: 8640 }, // 20
		{ w: 8944, m: 8800, t: 9300 }
	],
	"architect": [
		{ w: 185, m: 106, t: 972 }, // 1
		{ w: 291, m: 160, t: 1188 },
		{ w: 413, m: 222, t: 1417 },
		{ w: 555, m: 295, t: 1660 },
		{ w: 720, m: 379, t: 1917 }, // 5
		{ w: 911, m: 475, t: 2190 },
		{ w: 1133, m: 587, t: 2479 },
		{ w: 1390, m: 716, t: 2785 },
		{ w: 1689, m: 865, t: 3110 },
		{ w: 2035, m: 1036, t: 3454 }, // 10
		{ w: 2437, m: 1233, t: 3780 },
		{ w: 2902, m: 1460, t: 4200 },
		{ w: 3443, m: 1722, t: 4560 },
		{ w: 4070, m: 2023, t: 5040 },
		{ w: 4797, m: 2369, t: 5460 }, // 15
		{ w: 5640, m: 2767, t: 6000 },
		{ w: 6618, m: 3226, t: 6300 },
		{ w: 7754, m: 3752, t: 7030 },
		{ w: 9070, m: 4358, t: 7620 },
		{ w: 10598, m: 5056, t: 8220 }, // 20
		{ w: 12369, m: 5857, t: 8880 },
		{ w: 14424, m: 6777, t: 9600 },
		{ w: 16807, m: 7836, t: 10320 },
		{ w: 19573, m: 9052, t: 11100 }
	]
};
// </basedata>

// <options dialog>
if (view == "options") {

	var spiritlevelValue = false;
	var geometryValue = false;
	var pulleyValue = false;

	var ResearchData = parseInt(GM_getValue(server+"_tE_Research", 0));
	if (ResearchData == 3) { spiritlevelValue = true; }
	if (ResearchData == 2) { geometryValue = true; }
	if (ResearchData == 1) { pulleyValue = true;	}

	var upgradebuttonValue = GM_getValue(server+"_tE_DisplayUpgrade", true);
	var buildinglevelValue = GM_getValue(server+"_tE_DisplayLevel", true);
	var buildingnameValue = GM_getValue(server+"_tE_DisplayName", true);

	var installedLanguages = new Array()
	for (prop in languages) { installedLanguages.push({ nodeName: "option", nodeAttributes: { value: prop, selected: { conditional: (prop == activeLanguage) ? true : false, conditionalValue: "selected" } }, childNodes: [ { nodeName: "#text", nodeValue: languages[prop]['language-name'] } ] }); }

	var settingsCode = { 
		nodeName: "div", 
		nodeAttributes: { "class": "contentBox01h" },
		childNodes: [
			{ nodeName: "h3", nodeAttributes: { "class": "header" }, childNodes: [ { nodeName: "#text", nodeValue: language["settings-main-title"] } ] },
			{
				nodeName: "div",
				nodeAttributes: { "class": "content" },
				childNodes: [
					{
						nodeName: "div",
						childNodes: [ 
							{ nodeName: "h3", childNodes: [ { nodeName: "#text", nodeValue: language["settings-research-title"] } ] } ,
							{
								nodeName: "table",
								nodeAttributes: { cellspacing: 0, cellpadding: 0 },
								childNodes: [
									{
										nodeName: "tbody",
										childNodes: [
											{
												nodeName: "tr", 
												childNodes: [ 
													{ nodeName: "th", childNodes: [ { nodeName: "#text", nodeValue: language["settings-research-selector"] } ] }, 
													{ 
														nodeName: "td", 
														childNodes: [ 
															{ 
																nodeName: "select", 
																nodeAttributes: { id: "tE_ResearchSelector" },
																childNodes: [
																	{ nodeName: "option", nodeAttributes: { value: "1", selected: { conditional: pulleyValue, conditionalValue: "selected" } }, childNodes: [ { nodeName: "#text", nodeValue: language["settings-research-pulley"] } ] },
																	{ nodeName: "option", nodeAttributes: { value: "2", selected: { conditional: geometryValue, conditionalValue: "selected" } }, childNodes: [ { nodeName: "#text", nodeValue: language["settings-research-geometry"] } ] },
																	{ nodeName: "option", nodeAttributes: { value: "3", selected: { conditional: spiritlevelValue, conditionalValue: "selected" } }, childNodes: [ { nodeName: "#text", nodeValue: language["settings-research-spiritlevel"] } ] }
																]
															} 
														] 
													} 
												] 
											}
										]
									}
								]
							}
						]
					},
					{
						nodeName: "div",
						childNodes: [
							{ nodeName: "h3", childNodes: [ { nodeName: "#text", nodeValue: language["settings-display-title"] } ] }, 
							{
								nodeName: "table",
								nodeAttributes: { cellspacing: 0, cellpadding: 0 },
								childNodes: [
									{
										nodeName: "tbody",
										childNodes: [
											{ nodeName: "tr", childNodes: [ { nodeName: "th", childNodes: [ { nodeName: "#text", nodeValue: language["settings-display-buildingname"] } ] }, { nodeName: "td", childNodes: [ { nodeName: "input", nodeAttributes: { id: "tE_BuildingName", type: "checkbox", checked: { conditional: buildingnameValue, conditionalValue: null } } } ] } ] },
											{ nodeName: "tr", childNodes: [ { nodeName: "th", childNodes: [ { nodeName: "#text", nodeValue: language["settings-display-buildinglevel"] } ] }, { nodeName: "td", childNodes: [ { nodeName: "input", nodeAttributes: { id: "tE_BuildingLevel", type: "checkbox", checked: { conditional: buildinglevelValue, conditionalValue: null } } } ] } ] },
											{ nodeName: "tr", childNodes: [ { nodeName: "th", childNodes: [ { nodeName: "#text", nodeValue: language["settings-display-upgradebutton"] } ] }, { nodeName: "td", childNodes: [ { nodeName: "input", nodeAttributes: { id: "tE_UpgradeButton", type: "checkbox", checked: { conditional: upgradebuttonValue, conditionalValue: null } } } ] } ] }
										]
									}
								]
							}
						]
					},
					{
						nodeName: "div",
						childNodes: [
							{ nodeName: "h3", childNodes: [ { nodeName: "#text", nodeValue: language["settings-language-title"] } ] }, 
							{
								nodeName: "table",
								nodeAttributes: { cellspacing: 0, cellpadding: 0 },
								childNodes: [
									{ nodeName: "tr", childNodes: [ { nodeName: "th", childNodes: [ { nodeName: "#text", nodeValue: language["settings-language-selector"] } ] }, { nodeName: "td", childNodes: [ { nodeName: "select", nodeAttributes: { id: "tE_LanguageSelector", }, childNodes: installedLanguages} ] } ] }
								]
							}
						]
					},
					{ nodeName: "div", nodeAttributes: { "class": "centerButton" }, childNodes: [ { nodeName: "input", nodeAttributes: { type: "button", "class": "button", value: language["settings-save-text"], onclick: "updateSettings()" } } ] }
				]
			},
			{ nodeName: "div", nodeAttributes: { "class": "footer" } }
		]
	};

	var settingsDialog = createNodeObject(settingsCode);

	document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));

	unsafeWindow.updateSettings = function() {
		var Research = document.getElementById("tE_ResearchSelector").options[document.getElementById("tE_ResearchSelector").selectedIndex].value;
		var Lang = document.getElementById("tE_LanguageSelector").options[document.getElementById("tE_LanguageSelector").selectedIndex].value;
		var DisplayName = document.getElementById("tE_BuildingName").checked ? true : false;
		var DisplayLevel = document.getElementById("tE_BuildingLevel").checked ? true : false;
		var DisplayUpgrade = document.getElementById("tE_UpgradeButton").checked ? true : false;

		window.setTimeout(GM_setValue, 0, server+"_tE_Research", Research);
		window.setTimeout(GM_setValue, 0, server+"_tE_Language", Lang);
		window.setTimeout(GM_setValue, 0, server+"_tE_DisplayName", DisplayName);
		window.setTimeout(GM_setValue, 0, server+"_tE_DisplayLevel", DisplayLevel);
		window.setTimeout(GM_setValue, 0, server+"_tE_DisplayUpgrade", DisplayUpgrade);
		return window.location.reload();
	};
}
// </options dialog>

// <building banners>
if (view == "city") {

	var showName = GM_getValue(server+"_tE_DisplayName", true);
	var showLevel = GM_getValue(server+"_tE_DisplayLevel", true);
	var showUpgrade = GM_getValue(server+"_tE_DisplayUpgrade", true);
	var showRequirement = GM_getValue(server+"_tE_DisplayRequirement", true);

	if (!showName && !showLevel && !showUpgrade) { return; }

	globalStyle("#locations a:hover { text-decoration: none; color: #e4b873; }");
	globalStyle(".tE_BannerLeft { display: block; visibility: hidden; position: absolute; top: 50px; text-align: center; line-height: 23px; height: 23px; background: transparent url(http://ikariamlibrary.com/tools/images/townenhancer/scroll.png) left; padding: 0 20px 0 20px; white-space: nowrap; font-size: 10px; color: #7e4a21; }");
	globalStyle(".tE_BannerRight { display: block; position: absolute; top: 0; right: 0; width: 12px; height: 23px; background-image: url(http://ikariamlibrary.com/tools/images/townenhancer/scroll_rightend.png); }");
	globalStyle(".tE_Upgrade { display: block; position: absolute; top: 0; left: 0; width: 14px; padding: 0 2px; height: 23px; background: transparent url(http://ikariamlibrary.com/tools/images/townenhancer/upgrade.png) right no-repeat; }");
	globalStyle(".tE_Unknown { display: block; position: absolute; top: 0; left: 0; width: 14px; padding: 0 2px; height: 23px; background: transparent url(http://ikariamlibrary.com/tools/images/townenhancer/unknown.png) right no-repeat; }");

	var garnisonFix = getElementsByClassName(document.getElementById("locations"), "garnison", false);
	for (var index = 0; index < garnisonFix.length; index++) { garnisonFix[index].style.zIndex = 290; }

	if (showUpgrade == true) {
		var woodBonus = 100;
		var wineBonus = 100;
		var marbleBonus = 100;
		var glassBonus = 100;
		var sulphurBonus = 100;

		if (GM_getValue(server+"_tE_Research", 0) == 3) { woodBonus-=14; wineBonus-=14; marbleBonus-=14; glassBonus-=14; sulphurBonus-=14; }
		else if (GM_getValue(server+"_tE_Research", 0) == 2) { woodBonus-=6; wineBonus-=6; marbleBonus-=6; glassBonus-=6; sulphurBonus-=6; }
		else if (GM_getValue(server+"_tE_Research", 0) == 1) { woodBonus-=2; wineBonus-=2; marbleBonus-=2; glassBonus-=2; sulphurBonus-=2; }

		// <new building bonus>

		carpentryBonus = getElementsByClassName(document.getElementById("locations"),"carpentering",false);
		if (carpentryBonus.length == 1) {
			var carpentryTitle = carpentryBonus[0].getElementsByTagName("a")[0].title.split(" ");
			carpentryBonus = parseInt(carpentryTitle[carpentryTitle.length-1]);
		} else { carpentryBonus = 0; }

		cellarBonus = getElementsByClassName(document.getElementById("locations"),"vineyard",false);
		if (cellarBonus.length == 1) {
			var cellarTitle = cellarBonus[0].getElementsByTagName("a")[0].title.split(" ");
			cellarBonus = parseInt(cellarTitle[cellarTitle.length-1]);
		} else { cellarBonus = 0; }

		architectBonus = getElementsByClassName(document.getElementById("locations"),"architect",false);
		if (architectBonus.length == 1) {
			var architectTitle = architectBonus[0].getElementsByTagName("a")[0].title.split(" ");
			architectBonus = parseInt(architectTitle[architectTitle.length-1]);
		} else { architectBonus = 0; }

		opticianBonus = getElementsByClassName(document.getElementById("locations"),"optician",false);
		if (opticianBonus.length == 1) {
			var opticianTitle = opticianBonus[0].getElementsByTagName("a")[0].title.split(" ");
			opticianBonus = parseInt(opticianTitle[opticianTitle.length-1]);
		} else { opticianBonus = 0; }

		fireworkBonus = getElementsByClassName(document.getElementById("locations"),"fireworker",false);
		if (fireworkBonus.length == 1) {
			var fireworkTitle = fireworkBonus[0].getElementsByTagName("a")[0].title.split(" ");
			fireworkBonus = parseInt(fireworkTitle[fireworkTitle.length-1]);
		} else { fireworkBonus = 0; }
		// </new building bonus>

		woodBonus = (woodBonus * (100 - carpentryBonus)) / 10000; 
		wineBonus = (wineBonus * (100 - cellarBonus)) / 10000;
		marbleBonus = (marbleBonus * (100 - architectBonus)) / 10000;
		glassBonus = (glassBonus * (100 - opticianBonus)) / 10000;
		sulphurBonus = (sulphurBonus * (100 - fireworkBonus)) / 10000;

		var woodStock = parseInt(document.getElementById("value_wood").firstChild.nodeValue.replaceAll(",","").replaceAll(".",""));
		var wineStock = parseInt(document.getElementById("value_wine").firstChild.nodeValue.replaceAll(",","").replaceAll(".",""));
		var marbleStock = parseInt(document.getElementById("value_marble").firstChild.nodeValue.replaceAll(",","").replaceAll(".",""));
		var glassStock = parseInt(document.getElementById("value_crystal").firstChild.nodeValue.replaceAll(",","").replaceAll(".",""));
		var sulphurStock = (document.getElementById("value_sulphur") == null) ? parseInt(document.getElementById("value_sulfur").firstChild.nodeValue.replaceAll(",","").replaceAll(".","")) : parseInt(document.getElementById("value_sulphur").firstChild.nodeValue.replaceAll(",","").replaceAll(".",""));
	}

	for (var buildingLocation = 0; buildingLocation <= 14; buildingLocation += 1) {

		var dataMissing = false;

		var locationObject = document.getElementById("position"+buildingLocation);
		var buildingClass = locationObject.className.split(" ")[0].trim();

		if (buildingClass == "buildingGround") { continue; }
// <spy patch>
		if (buildingClass == "townhall") { 
			locationObject.parentNode.removeChild(locationObject);
			locationObject = document.getElementById("position"+buildingLocation);
			buildingClass = locationObject.className.split(" ")[0].trim();
			showUpgrade = false;
		}
// </spy patch>

		var buildingName = language[buildingClass];
		var buildingLevel = parseInt(locationObject.getElementsByTagName("a")[0].title.split(" ")[locationObject.getElementsByTagName("a")[0].title.split(" ").length-1].trim());

		var locationBanner = new Array();

		if (showUpgrade == true) {

			if (typeof(data[buildingClass][buildingLevel]) != "undefined") {
				var requirementWood = (typeof(data[buildingClass][buildingLevel].w) == "undefined") ? false :  Math.ceil((data[buildingClass][buildingLevel].w*woodBonus));
				var requirementWine = (typeof(data[buildingClass][buildingLevel].W) == "undefined") ? false :  Math.ceil((data[buildingClass][buildingLevel].W*wineBonus));
				var requirementMarble = (typeof(data[buildingClass][buildingLevel].m) == "undefined") ? false :  Math.ceil((data[buildingClass][buildingLevel].m*marbleBonus));
				var requirementGlass = (typeof(data[buildingClass][buildingLevel].g) == "undefined") ? false :  Math.ceil((data[buildingClass][buildingLevel].g*glassBonus));
				var requirementSulphur = (typeof(data[buildingClass][buildingLevel].s) == "undefined") ? false :  Math.ceil((data[buildingClass][buildingLevel].s*sulphurBonus));
			} else { dataMissing = true; }

			if (dataMissing == true) {
				locationBanner.push({ nodeName: "span",	nodeAttributes: { "class": "tE_Unknown" }	});
			}
			else if (checkResource(requirementWood, woodStock) && checkResource(requirementWine, wineStock) && checkResource(requirementMarble, marbleStock) && checkResource(requirementGlass, glassStock) && checkResource(requirementSulphur, sulphurStock)) {
				locationBanner.push({ nodeName: "span",	nodeAttributes: { "class": "tE_Upgrade" } });
			}

		}

		if (showName == true && showUpgrade == true) { locationBanner.push({ nodeName: "#text", nodeValue: " " }); }

		if (showName == true) { locationBanner.push({ nodeName: "#text", nodeValue: buildingName }); }

		if (showName == true && showLevel == true) { locationBanner.push({ nodeName: "#text", nodeValue: " " }); }

		if (showLevel == true) { locationBanner.push({ nodeName: "#text", nodeValue: buildingLevel }); }

		locationBanner.push({ nodeName: "span", nodeAttributes: { "class": "tE_BannerRight" } });

		locationObject.getElementsByTagName("a")[0].appendChild(createNodeObject({ nodeName: "span", nodeAttributes: { id: "banner"+buildingLocation, "class": "tE_BannerLeft", title: { conditional: debug_requirements, conditionalValue: "w"+requirementWood+",W"+requirementWine+",m"+requirementMarble+",g"+requirementGlass+",s"+requirementSulphur } }, childNodes: locationBanner }));

		centerElement(document.getElementById("banner"+buildingLocation));
	}
}
// </building banners>
