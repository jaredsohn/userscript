// ==UserScript==
// @name           Alliance_Evolution
// @namespace      Lame noire
// @description    Générateur de statistique sur l'évolution de l'alliance
// @include        http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

/** 
 * Cette variable permet de détecter les mises à jour
 * Merci de ne pas y toucher sous peine de ne plus en être informer
 */
var version = "1.1.2";

var CENTER ="center";
var LEFT = "left";
var RIGHT = "right";
/**
 * Options par défaut
 */
var settings = [
	"green",
	"red",
	"blue",
	"#CC00FF",
	"orange",
	"orange",
	"yellow", 
	"white",
	"white",
	"#4080FF",
	"#4000FF",
	"black",
	20,	200, 20, 100, 20, 100, 20, 100, 20, 100, 20, 100, 200, 4,
	CENTER,	LEFT, RIGHT, RIGHT, RIGHT, RIGHT, RIGHT,
	false,
	"FR"
];

var lang = ["FR", "EN", "RU"];

/**
 * Variables de texte, à changer pour les langues
 */

var langText = [
	{
		ERROR_LOAD : "Une erreur s'est produite lors du chargement des données, pour résoudre le problème les variables sont remise à zéro",
		NO_PLAYER : "Les données d'un joueur n'ont pas su être chargées, elles seront donc reinitialisées. Voici ses coordonées : ",
		UP_DATE : "Mise à jour des données",
		ADD_MEMBER : "Un membre a été ajouté : ",
		REMOVE_MEMBER : "Un membre a été effacé : ",
		HEAD : [
			"Nom",
			"Actuellement",
			"Évolution",
			"Place",
			"Points",
			"%"
		],
		BUTTONS : [
			"Mise à jour",
			"Export",
			"Normal",
			"Évolution",
			"Options",
			"Import",
			"Remettre à zéro"
		],
		SETTINGS : [
			"Gain",
			"Perte",
			"Égalite",
			"Record",
			"Boutons",
			"En tête",
			"Nom",
			"Place",
			"Points",
			"Ligne pair",
			"Ligne impair",
			"Tableau",
			"Nom",
			"Nom",
			"Place",
			"Place",
			"Points",
			"Points",
			"Place",
			"Place",
			"Points",
			"Points",
			"%",
			"%",
			"Taille maximum",
			"Taille maximum",
			"En tête",
			"Nom",
			"Place",
			"Points",
			"Place",
			"Points",
			"%",
			"Ajuster l'alignement avec [font] pour le BBCode",
			"Langue"
		],
		DATE : ["De", "jusqu'au"],
		SOIT : "soit",
		POINT : "points",
		EVOL : "Evolution",
		SETTINGS_TITLE : {
			HEAD : "Option d'exportation",
			COLOR :"Couleur",
			COLORIG : "Vue Évolution",
			SIZE : {
				COL : "Largeur des colonnes",
				COL_HTML : "HTML en px",
				COL_BBCODE : "BBCODE en caractère",
				MAX : "Taille maximum",
				MAX_HTML : "HTML",
				MAX_BBCODE : "BBCODE"
			},	
			ALIGN :"Alignement",
			EXPORT : "Export",
			LANG : "Traduction"
		},
		SUBMIT : "Envoyer",	
		ARROW : {
			UP : "&uarr;",
			DOWN : "&darr;"
		},
		SUMMARY : {
			TITLE : "Résumé",
			EVOL : ["Évolution en points", "Évolution en place", "Pourcentage d'évolution"],
			BEST : "Meilleure progression",
			WORST : "Pire progression"
		},
		IMPORT : {
			NAME : "Nom",
			HIGHSCORE : "Place",
			POINT : "Points"
		},
		MEAN : "Moyenne par membre"
	},
	{
		ERROR_LOAD : "An error occurred while loading data to solve the problem variables are reset",
		NO_PLAYER : "Data from a player failed to be loaded, so they will be reset. Here are his coordinates :",
		UP_DATE : "Update data",
		ADD_MEMBER : "A member has been added : ",
		REMOVE_MEMBER : "A member has been removed : ",
		HEAD : [
			"Name",
			"Currently",
			"Evolution",
			"Highscore",
			"Points",
			"%"
		],
		BUTTONS : [
			"Update",
			"Export",
			"Normal",
			"Evolution",
			"Settings",
			"Import",
			"Reset"
		],
		SETTINGS : [
			"Gain",
			"Loss",
			"Par",
			"Record",
			"Buttons",
			"Head",
			"Name",
			"Highscore",
			"Points",
			"Even line",
			"Odd line",
			"Table",
			"Name",
			"Name",
			"Highscore",
			"Highscore",
			"Points",
			"Points",
			"Highscore",
			"Highscore",
			"Points",
			"Points",
			"%",
			"%",
			"Maximum size",
			"Maximum size",
			"Head",
			"Name",
			"Highscore",
			"Points",
			"Highscore",
			"Points",
			"%",
			"Adjust the alignment with [font] for BBCode ",
			"Language"
		],
		DATE : ["From", "to"],
		SOIT : "that to say",
		POINT : "points",
		EVOL : "Evolution",
		SETTINGS_TITLE : {
			HEAD : "Export settings",
			COLOR :"Color",
			COLORIG : "Evolution view",
			SIZE : {
				COL : "column width",
				COL_HTML : "HTML (px)",
				COL_BBCODE : "BBCODE (character)",
				MAX : "Maximum size",
				MAX_HTML : "HTML",
				MAX_BBCODE : "BBCODE"
			},	
			ALIGN :"Alignment",
			EXPORT : "Export",
			LANG : "Traduction"
		},
		SUBMIT : "Submit",	
		ARROW : {
			UP : "&uarr;",
			DOWN : "&darr;"
		},
		SUMMARY : {
			TITLE : "Summary",
			EVOL : ["Point's evolution", "Highscore's evolution", "Percentage of evolution"],
			BEST : "Best progression",
			WORST : "Worse progression"
		},
		IMPORT : {
			NAME : "Name",
			HIGHSCORE : "Highscore",
			POINT : "Points"
		},
		MEAN : "mean per member"
	},
	{
	ERROR_LOAD : "Ошибка при загрузке данных, ради исправления проблемы статистика перезапущена",
	NO_PLAYER : "Не удалось загрузить Данные игрока, поэтому они очищены. Его координаты :",
	UP_DATE : "Обновление...",
	ADD_MEMBER : "Игрок добавлен : ",
	REMOVE_MEMBER : "Игрок удален : ",
	HEAD : [
	"Ник",
	"Сейчас",
	"Прогресс",
	"Позиция",
	"Очки",
	"%"
	],
	BUTTONS : [
	"Доступно Обновление",
	"Экспорт",
	"Обычный вид",
	"Прогресс",
	"Настройки",
	"Импорт",
	"Очистка данных"
	],
	SETTINGS : [
	"Рост",
	"Падение",
	"Без изменений",
	"показатель",
	"Управление",
	"Заголовок",
	"Ник",
	"Позиция",
	"Очки",
	"Чётные линии",
	"Нечётные линии",
	"Тиблица",
	"Ник",
	"Ник",
	"Позиция",
	"Позиция",
	"Очки",
	"Очки",
	"Позиция",
	"Позиция",
	"Очки",
	"Очки",
	"%",
	"%",
	"Максимальный размер",
	"Максимальный размер",
	"Заголовок",
	"Ник",
	"Позиция",
	"Очки",
	"Позиция",
	"Очки",
	"%",
	"Adjust the alignment with [font] for BBCode ",
	"Язык"
	],
	DATE : ["От", "до"],
	SOIT : "что является",
	POINT : "очков",
	EVOL : "Развитие альянса",
	SETTINGS_TITLE : {
	HEAD : "Настройки Экспорта",
	COLOR :"Цвет",
	COLORIG : "Просмотр развития",
	SIZE : {
	COL : "Ширина столбика",
	COL_HTML : "HTML (px)",
	COL_BBCODE : "BBCODE (знаков)",
	MAX : "Максимальный Размер",
	MAX_HTML : "HTML",
	MAX_BBCODE : "BBCODE"
	},
	ALIGN :"Привязка",
	EXPORT : "Экспорт",
	LANG : "Перевод"
	},
	SUBMIT : "Сохранить",
	ARROW : {
	UP : "↑",
	DOWN : "↓"
	},
	SUMMARY : {
	TITLE : "Итог",
	EVOL : ["Развитие в очках", "Развитие в рейтинге", "Развитие в процентах"],
	BEST : "Лучшее развитие",
	WORST : "Худшее развитие"
	},
	IMPORT : {
	NAME : "Ник",
	HIGHSCORE : "Рейтинг",
	POINT : "Очки"
	},
	MEAN : "что является в среднем для игрока"
	} 
];

var text;

var cst = {
	SETTINGS : {
		COLOR : {
			GOOD : 0,
			BAD : 1,
			EQ : 2,
			RECORD : 3,
			BUTTON : 4
			
		},
		EXPORT : {
			COLOR: {
				HEAD : 5,
				NAME : 6,
				HIGHSCORE : 7,
				POINT : 8,
				LINE : [9, 10],
				TABLE : 11
				
			},
			COL_SIZE : {
				BBCODE : [12,14,16,18,20,22],
				HTML : [13,15,17,19,21,23],
			},
			SIZE : {
				BBCODE : 24,
				HTML : 25	 
			},
			ALIGN : {
				HEAD : 26,
				NAME : 27,
				CURRENT_HIGHSCORE : 28,
				CURRENT_POINT : 29,
				EVOL_HIGHSCORE : 30,
				EVOL_POINT : 31,
				EVOL_PERCENT : 32,
				FONT : 33
			}
		},
		LANG : 34
	},
	VIEW : {
		NORMAL : 0,
		EXPORT : 1,
		EVOL : 2,
		OPTION : 3,
		IMPORT : 4
	},
	HEAD_DOWN : [0,3,4,3,4,5],
	HEAD_UP : [1,2],
	SORT : {
		NAME : 0,
		CURRENT_HIGHSCORE : 1,
		CURRENT_POINT : 2,
		EVOL_HIGHSCORE : 3,
		EVOL_POINT : 4,
		EVOL_PERCENT : 5
	},
	BUTTONS : {
		UPDATE : 0,
		EXPORT : 1,
		NORMAL : 2,
		EVOL : 3,
		OPTION : 4,
		IMPORT : 5,
		RESET : 6
	}
};

var BBCODE = new Encoding(
	new Balise("[color=", ']', "[/color]"), 
	new Balise("[center", "]", "[/center]"), 
	new Balise("[size=" , "]", "[/size]"),
	new Balise("[b","]", "[/b]"),
	new Balise("[u","]", "[/u]"),
	new Balise("[i","]", "[/i]"),
	new Balise("[list","]","[/list]"),
	new Balise("[*","]",""),
	new Balise("\n","",""),
	new Balise("[font=", "]", "[/font]")
);

var HTML = new Encoding(
	new Balise("<font color=\"", '">', "</font>"), 
	new Balise("<center",">","</center>"),
	new Balise("<font size=",">","</font>"),
	new Balise("<b",">","</b>"), 
	new Balise("<u",">","</u>"),
	new Balise("<i",">","</i>"),
	new Balise("<ul",">","</ul>"), 
	new Balise("<li",">","</li>"),
	new Balise("<br"," />",""),
	new Balise("<font face="," >","</font>")
);
	

var identifier = [
	"AE_NAME",
	"AE_CURRENT_HIGHSCORE",
	"AE_CURRENT_POINT",
	"AE_EVOL_HIGHSCORE",
	"AE_EVOL_POINT",
	"AE_EVOL_PERCENT"
];

var submitId ="submitOption";

/**
 * Variables systèmes
 */
var one = false;
var currentMembers;
var savedMembers;
var currentAlliance;
var savedAlliance;
var currentDate;
var savedDate;
var urldl = "http://userscripts.org/scripts/source/78426.user.js";
var urlinfo = "http://userscripts.org/scripts/show/78426";
var memberListAccess;
var allyDataAccess;
var currentShowed = cst.VIEW.NORMAL;
var tableHTML = document.createElement("table");
var spanExport = document.createElement("div");
var spanImport = document.createElement("div");
var textAreaBBCode = document.createElement("textarea");
var textAreaHTML = document.createElement("textarea");

var option = document.createElement("div");
var buttons = ["","","","","","",""];
for(var i =0; i < buttons.length; ++i){buttons[i] = document.createElement("span");}

/** Définit les identifiants*/
var playerName = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;
var server = location.href.split('/')[2];
var id = server + "_" + playerName;
var stocks = {
	alliance : id + "__Alliance__",
	memberList : id + "__MemberList__",
	date : id + "__Date__",
	settings : id + "__Settings__"
};

/**************************************************************
 *                                                            *
 *                          Objects                           *
 *                                                            *
 **************************************************************/

function Member(name_, coordonate_, highscore_, point_){
	this.name = name_;
	this.coordonate = coordonate_;
	this.highscore = highscore_;
	this.point = point_;
	this.evol = new Evol(0,0,0);
}

Member.prototype.compare= function (member){delete this.evol;this.evol = new Evol(this.pointProgress(member), this.highscoreProgress(member), this.percentProgress(member));}
Member.prototype.pointProgress = function (member){return (this.point - member.point);}
Member.prototype.highscoreProgress = function (member){return (-(this.highscore - member.highscore));}
Member.prototype.percentProgress = function (member){return Math.round(((this.point / member.point)-1)*10000)/100;}
Member.prototype.equals = function (member){return (this.coordonate == member.coordonate);}

function Evol(point_, highscore_, percent_){
	this.point = point_;
	this.highscore = highscore_;
	this.percent = percent_;
	this.progress = 0;
}

function Alliance(name_, tag_, number_){
	this.name = name_;
	this.tag = tag_;
	this.number = number_;
	this.point	= 0;
	this.evol = 0;
}

Alliance.prototype.equals = function (alliance){return (this.name == alliance.name && this.tag == alliance.tag);}

function Balise(before_, middle_, after_){
	this.before = before_;
	this.middle = middle_;
	this.after = after_;
}
Balise.prototype.format = 	function (param, text){return (this.before + param + this.middle + text + this.after);}

function Encoding(color_, center_, large_, bold_, underline_, italic_, list_, listPoint_, lineBreak_, font_){
	this.color = color_;
	this.center = center_;
	this.large = large_;
	this.bold = bold_;
	this.underline = underline_;
	this.italic = italic_;
	this.list = list_;
	this.listPoint = listPoint_;
	this.lineBreak = lineBreak_;
	this.font = font_;
}

/**************************************************************
 *                                                            *
 *                     Fonction principale.                   *
 *                                                            *
 **************************************************************/

function mainFunction(){
	if(!treatable())return;
	catchInformations();	
	loadInformations();
	updateInforamtions();	
	showInformations();
	checkupdate();
}

function treatable(){
	if(one)
		return false;
	if((memberListAccess = document.getElementById("member-list")).innerHTML == '')
		return false;
	if((allyDataAccess = document.getElementById("allyData").getElementsByTagName("div")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0]).innerHTML == '')
		return false;
	return (one = true);
}

function checkupdate(){
	GM_xmlhttpRequest({
		method: 'GET', url: urlinfo, onload: 
		function(answers){
			var page = answers.responseText;
			var versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17, page.length);
			versionOfScript = versionOfScript.substring(1, versionOfScript.indexOf("]"));
			if(version != versionOfScript)
				buttons[cst.BUTTONS.UPDATE].innerHTML = "<a target='_self' style='cursor:pointer' accesskey='' class='menubutton' href='" + urldl + "'><span class='textlabel'><font color='" + settings[cst.SETTINGS.COLOR.BUTTON] + "'>" + text.BUTTONS[cst.BUTTONS.UPDATE] + "</font></span></a>";
			else
				buttons[cst.BUTTONS.UPDATE].innerHTML = "";
		}
	});
}

function loadInformations(){
	var loadMemberList = cookies.load(stocks.memberList, "");
	var loadAlliance = cookies.load(stocks.alliance, "");
	var loadDate = cookies.load(stocks.date, "");
	var loadSettings = cookies.load(stocks.settings, "");
	
	
	//option
	splits = loadSettings.split("|");
	for(var i = 0; i<splits.length; ++i){
		if(splits[i])
			settings[i] = splits[i];
	}	
	text = langText[lang.indexOf(settings[cst.SETTINGS.LANG])];
	if(!text)
		text = langText[0];
		
	//si pas de variable
	if(loadMemberList == "" || loadAlliance == "" || loadDate == ""){
		alert(text.ERROR_LOAD);
		resetInformations();
	}
	
	var splits = loadAlliance.split("|");
	savedAlliance = new Alliance(splits[0], splits[1], splits[2]);
	savedDate = loadDate;
	savedMembers = new Array();
	
	
	var list = "";
	if(loadMemberList)
		list = loadMemberList.split("|");
	for(var i = 0; i<list.length; i++){
		var str = cookies.load(id + "__" + list[i] + "__", "");
		if(str == ""){
			alert(text.NO_PLAYER + list[i]);
			continue;
		} 
		splits = str.split("|");
		var name = splits[0];
		var coordonate = splits[1];
		var highscore = splits[2];
		var point = splits[3];
		savedMembers.push(new Member(name, coordonate, highscore, point));
	}

}

function catchInformations(){
	/** Informations générale sur l'alliance*/
	var allianceName = allyDataAccess.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
	var allianceTag = allyDataAccess.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
	var numberOfMembers = allyDataAccess.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
	currentAlliance = new Alliance(allianceName, allianceTag, numberOfMembers);
	
	/**Liste des membres*/
	currentMembers = new Array();
	var infoMember = memberListAccess.getElementsByTagName("tbody")[0].getElementsByTagName('tr');
	for(var i = 0; i < infoMember.length; ++i){
		var name = (infoMember[i].getElementsByTagName('td')[0].innerHTML.replace(/(^\s*)|(\s*$)/g,''));
		var point = parseInt((infoMember[i].getElementsByTagName('td')[3].getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, "")));
		var highscore = infoMember[i].getElementsByTagName('td')[3].getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");
		var coordonate = infoMember[i].getElementsByTagName('td')[4].getElementsByTagName('a')[0].innerHTML;
		var object = new Member(name, coordonate, highscore, point);
		currentMembers.push(object);
	}
	currentDate = new Date().toLocaleString();
}

function updateInforamtions(){
	/**Ajoute les nouveaux et retire les anciens membres de la memoire*/
	for(var i = 0; i < currentMembers.length; ++i){
		if(!arrayContains(savedMembers, currentMembers[i])){
			cookies.save(id + "__" + currentMembers[i].coordonate + "__",
				currentMembers[i].name + "|" + 
				currentMembers[i].coordonate + "|" + 
				currentMembers[i].highscore + "|" + 
				currentMembers[i].point
			);
			savedMembers.push(currentMembers[i]);
			popUp(text.ADD_MEMBER + currentMembers[i].name, false, 10000);
		}	
	}
	for(var i = 0; i < savedMembers.length; ++i){
		if(!arrayContains(currentMembers, savedMembers[i])){
			cookies.erase(id + "__" + savedMembers[i].coordonate + "__");	
			popUp(text.REMOVE_MEMBER + savedMembers[i].name, true, 10000);
			savedMembers.splice(i,1);
		}	
	}
	
	/**Sauvegarde les données*/
	cookies.save(stocks.alliance, (currentAlliance.name + "|" + currentAlliance.tag + "|" + currentAlliance.number + "|"));
	var str = currentMembers[0].coordonate;
	for(var i = 1; i < currentMembers.length; ++i)
		str += "|" + currentMembers[i].coordonate;
	cookies.save(stocks.memberList, str);
	
	popUp(text.UP_DATE, false, 10000);
}

function showInformations(){	
	for(var i =0; i < buttons.length; ++i){
		buttons[i].innerHTML = makeButton(text.BUTTONS[i]);
		document.getElementById("form_assignRank").insertBefore(buttons[i], memberListAccess);
		if(i!=buttons.length-1) 
			document.getElementById("form_assignRank").insertBefore(makeSpaces(10), memberListAccess);
	}
	document.getElementById("form_assignRank").insertBefore(makeLineBreak(), memberListAccess); 
	document.getElementById("form_assignRank").insertBefore(makeLineBreak(), memberListAccess); 
	
	insertAfter(buttons[cst.BUTTONS.RESET], memberListAccess); 
	insertAfter(makeLineBreak(), memberListAccess); 
	
	buttons[cst.BUTTONS.EXPORT].addEventListener("click", function(event){switchDisplay(cst.VIEW.EXPORT);},true);
	buttons[cst.BUTTONS.NORMAL].addEventListener("click", function(event){switchDisplay(cst.VIEW.NORMAL);},true);
	buttons[cst.BUTTONS.EVOL].addEventListener("click", function(event){switchDisplay(cst.VIEW.EVOL);},true);
	buttons[cst.BUTTONS.OPTION].addEventListener("click", function(event){switchDisplay(cst.VIEW.OPTION);},true);
	buttons[cst.BUTTONS.IMPORT].addEventListener("click", function(event){switchDisplay(cst.VIEW.IMPORT);},true);
	buttons[cst.BUTTONS.RESET].addEventListener("click", function(event){resetInformations();},true);
		
	tableHTML.setAttribute("class", "members zebra bborder");
	textAreaBBCode.setAttribute("style", "width:300px;height:100px;overflow:auto;");
	textAreaHTML.setAttribute("style", "width:300px;height:100px;overflow:auto;");
	textAreaBBCode.setAttribute("onClick", "this.select();");
	textAreaHTML.setAttribute("onClick", "this.select();");
	
	document.getElementById("form_assignRank").insertBefore(tableHTML, memberListAccess);
	document.getElementById("form_assignRank").insertBefore(spanExport, memberListAccess); 	
	document.getElementById("form_assignRank").insertBefore(option, memberListAccess); 	
	document.getElementById("form_assignRank").insertBefore(spanImport, memberListAccess); 	
	spanExport.innerHTML = "<span></span>";
	spanExport.insertBefore(textAreaBBCode, spanExport.getElementsByTagName("span")[0]); 
	spanExport.insertBefore(textAreaHTML, spanExport.getElementsByTagName("span")[0]); 	

	refresh();
}

function resetInformations(){
	cookies.eraseAll();
	cookies.save(stocks.date, currentDate);
	cookies.save(stocks.alliance, (currentAlliance.name + "|" + currentAlliance.tag + "|" + currentAlliance.number + "|"));
	cookies.save(stocks.date, currentDate);
	var list = new Array();
	for(var i = 0; i < currentMembers.length; ++i){
		list.push(currentMembers[i].coordonate);
		cookies.save(id + "__" + currentMembers[i].coordonate + "__",
			currentMembers[i].name + "|" + 
			currentMembers[i].coordonate + "|" + 
			currentMembers[i].highscore + "|" + 
			currentMembers[i].point 
		);
	}
	
	var str = list[0];
	for(var i = 1; i < list.length; ++i) str += "|" + list[i];
	cookies.save(stocks.memberList, str);
	savedMembers = currentMembers;
	savedAlliance = currentAlliance;
	savedDate = currentDate;
	refresh();
}

function makeStatistique(){
	var maxPoint = currentMembers[0];
	var minPoint = currentMembers[0];
	var maxHighscore = currentMembers[0];
	var minHighscore = currentMembers[0];
	var maxPercent = currentMembers[0];
	var minPercent = currentMembers[0];
	var name;
	var before =  new Array();
	var after = new Array();
	for(var i = 0; i< currentMembers.length; ++i){
		before.push(savedMembers[i]);
		after.push(currentMembers[i]);
	}
	before.sort(function(a, b){return b.point - a.point;});
	after.sort(function(a, b){return b.point - a.point;});
	currentAlliance.point = currentAlliance.evol = 0;
	for(var i=0; i<currentMembers.length; i++){
		currentMembers[i].compare(savedMembers[arrayIndexOf(savedMembers, currentMembers[i])]);
		currentMembers[i].evol.progress = arrayIndexOf(before, currentMembers[i]) - arrayIndexOf(after,currentMembers[i]);
		currentAlliance.point += currentMembers[i].point;
		currentAlliance.evol += currentMembers[i].evol.point;
		if(currentMembers[i].evol.point > maxPoint.evol.point) maxPoint = currentMembers[i];
		if(currentMembers[i].evol.point < minPoint.evol.point) minPoint = currentMembers[i];
		if(currentMembers[i].evol.highscore > maxHighscore.evol.highscore) maxHighscore= currentMembers[i];
		if(currentMembers[i].evol.highscore < minHighscore.evol.highscore) minHighscore = currentMembers[i];
		if(currentMembers[i].evol.percent > maxPercent.evol.percent) maxPercent = currentMembers[i];
		if(currentMembers[i].evol.percent < minPercent.evol.percent) minPercent = currentMembers[i];
	}
	var stat = new Array();
	stat.push(maxPoint);
	stat.push(minPoint);
	stat.push(maxHighscore);
	stat.push(minHighscore);
	stat.push(maxPercent);
	stat.push(minPercent);
	return stat;
}

function switchDisplay(page){
	currentShowed = page;
	switch(page){
	case cst.VIEW.NORMAL:
		show(memberListAccess);
		hide(tableHTML);
		hide(spanExport);
		hide(buttons[cst.BUTTONS.RESET]);
		hide(option);
		hide(spanImport);
		break;
	case cst.VIEW.EVOL:
		show(tableHTML);
		show(buttons[cst.BUTTONS.RESET]);
		hide(spanExport);
		hide(memberListAccess);
		hide(option);
		hide(spanImport);
		tableHTML.innerHTML = makeTable();
		document.getElementById(identifier[cst.SORT.NAME]).addEventListener("click",function(event){changeSort(cst.SORT.NAME);},true);
		document.getElementById(identifier[cst.SORT.CURRENT_HIGHSCORE]).addEventListener("click",function(event){changeSort(cst.SORT.CURRENT_HIGHSCORE);},true);
		document.getElementById(identifier[cst.SORT.CURRENT_POINT]).addEventListener("click",function(event){changeSort(cst.SORT.CURRENT_POINT);},true);
		document.getElementById(identifier[cst.SORT.EVOL_HIGHSCORE]).addEventListener("click",function(event){changeSort(cst.SORT.EVOL_HIGHSCORE);},true);
		document.getElementById(identifier[cst.SORT.EVOL_POINT]).addEventListener("click",function(event){changeSort(cst.SORT.EVOL_POINT);},true);
		document.getElementById(identifier[cst.SORT.EVOL_PERCENT]).addEventListener("click",function(event){changeSort(cst.SORT.EVOL_PERCENT);},true);
		break;
	case cst.VIEW.EXPORT:
		hide(memberListAccess);
		hide(tableHTML);
		hide(buttons[cst.BUTTONS.RESET]);
		hide(option);
		show(spanExport);
		hide(spanImport);
		textAreaBBCode.innerHTML =  toExport(BBCODE);
		textAreaHTML.innerHTML = toExport(HTML);
		break;
	case cst.VIEW.OPTION:
		hide(memberListAccess);
		hide(tableHTML);
		hide(spanExport);
		hide(buttons[cst.BUTTONS.RESET]);
		show(option);
		hide(spanImport);
		option.innerHTML = makeFormulaire();
		document.getElementById(submitId).addEventListener("click",function(event){settingsSubmit();},true);
		break;
	case cst.VIEW.IMPORT:
		hide(memberListAccess);
		hide(tableHTML);
		hide(spanExport);
		hide(buttons[cst.BUTTONS.RESET]);
		hide(option);
		show(spanImport);
		spanImport.innerHTML = makeImport();
		document.getElementById(submitId).addEventListener("click",function(event){importSubmit();},true);
		break;
	default:
		break;
	}
}

function changeSort(type){
	var sortFunction;
	switch(type){
	case cst.SORT.CURRENT_POINT:
		sortFunction = function(a, b){return b.point - a.point;}
		break;
	case cst.SORT.CURRENT_HIGHSCORE:
		sortFunction = function(a, b){return a.highscore - b.highscore;}
		break;
	case cst.SORT.EVOL_HIGHSCORE:
		sortFunction = function(a, b){return b.evol.highscore - a.evol.highscore;}
		break;
	case cst.SORT.EVOL_POINT:		
		sortFunction = function(a, b){return b.evol.point - a.evol.point;}
		break;
	case cst.SORT.EVOL_PERCENT:
		sortFunction = function(a, b){return b.evol.percent - a.evol.percent;}
		break;
	case cst.SORT.NAME:
		sortFunction = function(a, b){return strcmp(a.name, b.name);}
		break;
	default:
		changeSort(cst.SORT.NAME);
		return;
	}
	currentMembers.sort(sortFunction);
	refresh();
}

function makeButton(text){return "<a target='_self' style='cursor:pointer' accesskey='' class='menubutton' ><span class='textlabel'><font color='" + settings[cst.SETTINGS.COLOR.BUTTON] + "'>" + text + "</font></span></a>"}

function makeTable(){
	var title =	"<thead><tr><th>&nbsp</th><th>&nbsp</th>" +
		"<th colspan='2'>" + text.HEAD[cst.HEAD_UP[0]]+ "</th>" +
		"<th colspan='3'>" + text.HEAD[cst.HEAD_UP[1]] + "</th><th>&nbsp</th></tr><tr><th>&nbsp</th>";
	for(var i = 0; i<6; ++i)
		title += "<th id=" + identifier[i] + " style='cursor:pointer'>" + text.HEAD[cst.HEAD_DOWN[i]] + "</th>";
	title += "<th style='width:20px'>" + text.ARROW.UP + text.ARROW.DOWN + "</th></tr></thead>";
		
	var str = title + "<tbody>";
	var stats = makeStatistique();
	for(var i = 0; i < currentMembers.length; ++i){
		var arrow = ((currentMembers[i].evol.progress > 0) ? text.ARROW.UP : text.ARROW.DOWN) + " " + (Math.abs(currentMembers[i].evol.progress) == 1 ? "" : Math.abs(currentMembers[i].evol.progress));
		var bullet = "<font color='" + ((stats.indexOf(currentMembers[i])>-1) ? settings[cst.SETTINGS.COLOR.RECORD] : "") + "'>&#8226;</font>";
		if (currentMembers[i].evol.progress == 0)arrow = "-";
		if(i%2==0) str += "<tr class='alt'><td>";
		else str += "<tr><td>";
		str += bullet + "</td><td>" 
			+ currentMembers[i].name + "</td><td>" 
			+ addPoints(currentMembers[i].highscore) + "</td><td>"
			+ addPoints(currentMembers[i].point) + "</td><td>"
			+ highLight(addPoints(currentMembers[i].evol.highscore), (currentMembers[i].evol.highscore), HTML) + "</td><td>" 
			+ highLight(addPoints(currentMembers[i].evol.point), (currentMembers[i].evol.point), HTML) + "</td><td>" 
			+ highLight(currentMembers[i].evol.percent + "%", (currentMembers[i].evol.percent), HTML) + "</td><td>"
			+ arrow + "</td></tr>";
	}
	return str + "</tbody>";
}

function makeAllianceEvol(type){
	var percent = (Math.round((currentAlliance.evol/currentAlliance.point)*10000))/100;
	return ( 
		currentAlliance.name 
		+ " : " 
		+ addPoints(currentAlliance.point) 
		+ " " + text.POINT
		+ " (" + text.EVOL + " " 
		+ highLight(addPoints(currentAlliance.evol), (currentAlliance.evol >= 0), type) 
		+ " " + text.SOIT + " " 
		+ highLight(percent + "%", (percent >= 0), type) 
		+  ")" 
		+ type.lineBreak.format("","") 
		+ text.MEAN
		+ " : " 
		+ addPoints(Math.round(currentAlliance.point/currentMembers.length)) 
		+ " " + text.POINT
		+ " (" + text.EVOL + " " 
		+ highLight(addPoints(Math.round(currentAlliance.evol/currentMembers.length)), ((Math.round(currentAlliance.evol/currentMembers.length)) >= 0), type) 
		+ " " + text.SOIT + " " 
		+ highLight(percent + "%", (percent >= 0), type) 
		+  ")" 
		+ type.lineBreak.format("","")  
		+ type.lineBreak.format("",""));
}

function makeExportsummary(type, stats){
	var summary = "";
	var line = "";
	var subline = "";
	var number = [
		stats[0].evol.point,
		stats[1].evol.point,
		stats[2].evol.highscore,
		stats[3].evol.highscore,
		stats[4].evol.percent,
		stats[5].evol.percent
	];
	for(var i =0; i<3; ++i){
		line = type.listPoint.format("", type.underline.format("", text.SUMMARY.EVOL[i])) + type.lineBreak.format("","");
		subline = type.listPoint.format("", text.SUMMARY.BEST + " : " + type.italic.format("", stats[i*2].name) + " (" + highLight(addPoints(number[i*2]), number[i*2], type) + ")") ;//+ type.lineBreak.format("","");
		subline += type.listPoint.format("", text.SUMMARY.WORST + " : " + type.italic.format("", stats[i*2+1].name) + " (" + highLight(addPoints(number[i*2+1]), number[i*2+1], type) + ")") ;//+ type.lineBreak.format("","");
		subline = type.list.format("", subline);
		line += subline + type.lineBreak.format("","");
		summary += line;		
	}
	return type.bold.format("", text.SUMMARY.TITLE) +  type.lineBreak.format("","") + type.lineBreak.format("","") + type.list.format("", summary); 
}

/**
 * Renvoit les données sous un format pour forum
 * @param type Est un object Type qui contient les balises nécessaires
 */
function toExport(type){
	var stats = makeStatistique();	
	if(type == HTML){
		var title = 
			"<span>" + type.large.format(settings[cst.SETTINGS.EXPORT.SIZE.HTML],".: " + text.EVOL + " " +  currentAlliance.name + " :.") + "<br>" + 
			text.DATE[0] + " " + savedDate + " " + text.DATE[1] + " " + currentDate + "<br><br>" + makeAllianceEvol(HTML) + "<br><br></span>"+
			"<table bgcolor='" + settings[cst.SETTINGS.EXPORT.COLOR.TABLE] + "' border='0' cellspacing='0' cellpadding='0'><thead><tr><th colspan='2'>&nbsp</th>" +
			"<th colspan='2' align='" + settings[cst.SETTINGS.EXPORT.ALIGN.HEAD] + "'><font color='" + settings[cst.SETTINGS.EXPORT.COLOR.HEAD] + "'>" + text.HEAD[cst.HEAD_UP[0]]+ "</font></th>" +
			"<th colspan='3' align='" + settings[cst.SETTINGS.EXPORT.ALIGN.HEAD] + "'><font color='" + settings[cst.SETTINGS.EXPORT.COLOR.HEAD] + "'>" + text.HEAD[cst.HEAD_UP[1]] + "</font></th><th>&nbsp</th></tr><tr><th>&nbsp</th>";
		for(var i = 0; i<6; ++i)
			title += "<th style='width:" + settings[cst.SETTINGS.EXPORT.COL_SIZE.HTML[i]] + "px' align='" + settings[cst.SETTINGS.EXPORT.ALIGN.HEAD] + "'><font color='" + settings[cst.SETTINGS.EXPORT.COLOR.HEAD] + "'>" + text.HEAD[cst.HEAD_DOWN[i]] + "</font></th>";
		title += "<th><font color='" + settings[cst.SETTINGS.EXPORT.COLOR.HEAD] + "'>" + text.ARROW.UP + text.ARROW.DOWN + "</font></th></tr></thead>";
			
		var str = title + "<tbody>";
		var stats = makeStatistique();
		for(var i = 0; i < currentMembers.length; ++i){
			var arrow = ((currentMembers[i].evol.progress > 0) ? text.ARROW.UP : text.ARROW.DOWN) + " " + (Math.abs(currentMembers[i].evol.progress) == 1 ? "" : Math.abs(currentMembers[i].evol.progress));
			if (currentMembers[i].evol.progress == 0)arrow = "-";
			var bullet = "<font color='" + ((stats.indexOf(currentMembers[i])>-1) ? settings[cst.SETTINGS.COLOR.RECORD] : "") + "'>&#8226</font>";
			str += "<tr bgcolor='" + settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]] + "'><td style='width:20px'>";
			str += bullet + "</td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.NAME] + "'>"
				+ "<font color='" + settings[cst.SETTINGS.EXPORT.COLOR.NAME] + "'>" + currentMembers[i].name + "</font></td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.CURRENT_HIGHSCORE] + "'>" 
				+ "<font color='" + settings[cst.SETTINGS.EXPORT.COLOR.HIGHSCORE] + "'>" + addPoints(currentMembers[i].highscore) + "</font></td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.CURRENT_POINT] + "'>"
				+ "<font color='" + settings[cst.SETTINGS.EXPORT.COLOR.POINT] + "'>" + addPoints(currentMembers[i].point) + "</font></td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_HIGHSCORE] + "'>"
				+ highLight(addPoints(currentMembers[i].evol.highscore), (currentMembers[i].evol.highscore), HTML) + "</td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_POINT] + "'>" 
				+ highLight(addPoints(currentMembers[i].evol.point), (currentMembers[i].evol.point), HTML) + "</td><td align='" + settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_PERCENT] + "'>" 
				+ highLight(currentMembers[i].evol.percent + "%", (currentMembers[i].evol.percent), HTML) + "</td><td align=center>"
				+ arrow + "</td></tr>";
		}
		return type.center.format("",str + "</tbody></table><br><br>") + makeExportsummary(HTML, stats);
	}
	var title = type.large.format(settings[cst.SETTINGS.EXPORT.SIZE.BBCODE], ".: " + text.EVOL + " " +  currentAlliance.name + " :.") + "\n";
	var date = text.DATE[0] + " " + savedDate + " " + text.DATE[1] + " " + currentDate + "\n" + "\n" + "\n";
	function makeLine(digit){var res ="";for(var i =0; i<digit; ++i){res += "_"};return res;}
	
	var sum = 0;	
	var buttom = "";
	
	for(var i = 0; i < cst.SETTINGS.EXPORT.COL_SIZE.BBCODE.length ;++i){
		sum += parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[i]]);
		buttom += makeLine(parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[i]])) + "|";
	}
	var top = makeLine(sum + 5);
	var head = type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], top) + "\n";
	head += alignText("",parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[0]]),settings[cst.SETTINGS.EXPORT.ALIGN.HEAD], "_",type, settings[cst.SETTINGS.EXPORT.COLOR.HEAD],settings[cst.SETTINGS.EXPORT.COLOR.TABLE], false) + type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|"); 
	head += alignText(text.HEAD[cst.HEAD_UP[0]],(parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[1]]) + parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[2]]) + 1),settings[cst.SETTINGS.EXPORT.ALIGN.HEAD], "_",type, settings[cst.SETTINGS.EXPORT.COLOR.HEAD],settings[cst.SETTINGS.EXPORT.COLOR.TABLE], false) + type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|"); 
	head += alignText(text.HEAD[cst.HEAD_UP[1]],(parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[3]]) + parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[4]]) + parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[5]]) + 2),settings[cst.SETTINGS.EXPORT.ALIGN.HEAD], "_",type, settings[cst.SETTINGS.EXPORT.COLOR.HEAD],settings[cst.SETTINGS.EXPORT.COLOR.TABLE], false) + type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + "\n";					
						
	for(var i = 0; i < cst.SETTINGS.EXPORT.COL_SIZE.BBCODE.length ;++i)
			head += alignText(text.HEAD[cst.HEAD_DOWN[i]], parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[i]]), settings[cst.SETTINGS.EXPORT.ALIGN.HEAD], "_", type, settings[cst.SETTINGS.EXPORT.COLOR.HEAD], settings[cst.SETTINGS.EXPORT.COLOR.TABLE], false) + type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|");
	head += "\n" + type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], buttom) + "\n";
	
	var body ="";
	var membre;
	for(var i = 0; i< currentMembers.length; ++i){
		member = "";
		member += 
			alignText(currentMembers[i].name, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[0]]), settings[cst.SETTINGS.EXPORT.ALIGN.NAME], "_", type, settings[cst.SETTINGS.EXPORT.COLOR.NAME], settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], false)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			alignText(currentMembers[i].highscore, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[1]]), settings[cst.SETTINGS.EXPORT.ALIGN.CURRENT_HIGHSCORE], "_", type, settings[cst.SETTINGS.EXPORT.COLOR.HIGHSCORE], settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], true)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			alignText(currentMembers[i].point, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[2]]), settings[cst.SETTINGS.EXPORT.ALIGN.CURRENT_POINT], "_", type, settings[cst.SETTINGS.EXPORT.COLOR.POINT], settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], true)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			alignText(currentMembers[i].evol.highscore, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[3]]), settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_HIGHSCORE], "_", type, "", settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], true)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			alignText(currentMembers[i].evol.point, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[4]]), settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_POINT], "_", type, "", settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], true)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			alignText(currentMembers[i].evol.percent, parseInt(settings[cst.SETTINGS.EXPORT.COL_SIZE.BBCODE[5]]), settings[cst.SETTINGS.EXPORT.ALIGN.EVOL_PERCENT], "_", type, "", settings[cst.SETTINGS.EXPORT.COLOR.LINE[i%2]], true)+ type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], "|") + 
			"\n";
		body += member;
	}
	body += type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.TABLE], buttom) + "\n";
	var table = head + body;
	if(settings[cst.SETTINGS.EXPORT.ALIGN.FONT])
		table = type.font.format("Courier New", table);
	table = type.center.format("", type.color.format(settings[cst.SETTINGS.EXPORT.COLOR.HEAD], title + date) + makeAllianceEvol(type) + "\n\n" + table);	

	return table + "\n\n\n\n" + makeExportsummary(type, stats);
}

function makeFormulaire(){	
	var table = "<center><h2><font color=#6F9FC8>" + text.SETTINGS_TITLE.HEAD + "</font></h2><table><tbody><tr><th colspan=4 align=center>" + text.SETTINGS_TITLE.COLOR + "</th></tr><tr><th colspan=4 align=center>" + text.SETTINGS_TITLE.COLORIG + "</th></tr>";
	for(var i = 0; i<5; ++i)
		table += "<tr><td colspan=2>" + text.SETTINGS[i] + "</td><td colspan=2><input id='option" + i + "' value='" + settings[i] + "' size=8></td></tr>";
	table += "<tr><th colspan=4>" + text.SETTINGS_TITLE.EXPORT + "</th></tr>";
	for(var i = 5; i<12; ++i)
		table += "<tr><td colspan=2>" + text.SETTINGS[i] + "</td><td colspan=2><input id='option" + i + "' value='" + settings[i] + "' size=8></td></tr>";
	
	table += "<tr><td colspan=4 align=center>&nbsp</td></tr>";
	table += "<tr><th colspan=4 align=center >" + text.SETTINGS_TITLE.SIZE.COL + "</th></tr>";
	table += "<tr><th colspan=2 align=center >" + text.SETTINGS_TITLE.SIZE.COL_BBCODE + "</td><th colspan=2 align=center >" + text.SETTINGS_TITLE.SIZE.COL_HTML + "</thj></tr>";
	for(var i = 12; i<24; i+=2){
		table += "<tr><td>" + text.SETTINGS[i] + "</td><td><input id='option" + i + "' value='" + settings[i] + "' size=4></td>";
		table += "<td>" + text.SETTINGS[i+1] + "</td><td><input id='option" + (i+1) + "' value='" + settings[i+1] + "' size=4></td></tr>";
	}
	table += "<tr><td colspan=4 align=center>&nbsp</td></tr>";
	table += "<tr><th colspan=4 align=center>" + text.SETTINGS_TITLE.SIZE.MAX + "</th></tr>";
	table += "<tr><th colspan=2 align=center >" + text.SETTINGS_TITLE.SIZE.MAX_BBCODE + "</th><th colspan=2 align=center>" + text.SETTINGS_TITLE.SIZE.MAX_HTML + "</th></tr>";
	table += "<tr><td>" + text.SETTINGS[24] + "</td><td><input id='option" + 24 + "' value='" + settings[24] + "' size=4></td>";
	table += "<td>" + text.SETTINGS[25] + "</td><td><input id='option" + 25 + "' value='" + settings[25] + "' size=4></td></tr>";
	
	table += "<tr><td colspan=4 align=center>&nbsp</td></tr>";
	table += "<tr><th colspan=4 align=center >" + text.SETTINGS_TITLE.ALIGN + "</th></tr>";
	for(var i=26; i<33; ++i){
		table += "<tr><td colspan=2>" + text.SETTINGS[i] + "</td><td colspan=2><select id='option" + i + "'>";
		table += "<option " + ((settings[i] == LEFT) ? "selected " :" ") + "value='LEFT'>LEFT</option>";
		table += "<option " + ((settings[i] == CENTER) ? "selected " :" ") + "value='CENTER'>CENTER</option>";
		table += "<option " + ((settings[i] == RIGHT) ? "selected " :" ") + "value='RIGHT'>RIGHT</option>";
		table += "</select></td></tr>"
	}
	table += "<tr><td colspan=2>" + text.SETTINGS[33] + "</td><td colspan=2><input type='checkbox' id='checkbox' value='checkbox'" + (settings[33] ? "checked" : " ") + "/></td></tr>" 
	table += "<tr><td colspan=4 align=center>&nbsp</td></tr>";
	table += "<tr><th colspan=4 align=center >" + text.SETTINGS_TITLE.LANG + "</th></tr>";
	table += "<tr><td colspan=2>" + text.SETTINGS[34] + "</td><td colspan=2><select id='option" + "lang" + "'>";
	for(var i=0; i<lang.length; ++i){
		table += "<option " + ((settings[34] == lang[i]) ? "selected " :" ") + "value='" + lang[i] + "'>" + lang[i] + "</option>";
	}
	table += "</select></td></tr>"
	table += "<tr><td colspan=4 align=center>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center><input style='width: 200px'  id='" + submitId + "' type=submit value='" + text.SUBMIT + "'></td></tr></center>";
	return table;
}

function settingsSubmit(){
	for(var i = 0; i<26; ++i)
		settings[i] = document.getElementById("option" + i).value;
	var al = [LEFT, CENTER, RIGHT];
	for(var i = 26; i<33; ++i)
		settings[i] = al[document.getElementById("option" + i).selectedIndex];
	settings[33] = (document.getElementById("checkbox").checked ? "1" : "");
	settings[34] = lang[document.getElementById("option" + "lang").selectedIndex]
	var saveOption = "";
	for (var i = 0; i<settings.length; ++i)
		saveOption += settings[i] + "|";
	cookies.save(stocks.settings, saveOption);
}

function importSubmit(){
	for(var i = 0; i< currentMembers.length; ++i){
		currentMembers[i].highscore = document.getElementById("option" + i + "pl").value;
		currentMembers[i].point = document.getElementById("option" + i + "pts").value;
	}
	resetInformations();
}
	
function makeImport(){
	var table = "<table><thead><th>" + text.IMPORT.NAME + "</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;" + text.IMPORT.HIGHSCORE + "</th><th>&nbsp</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;" + text.IMPORT.POINT + "</th></thead><tbody>";
	for(var i = 0; i< currentMembers.length; ++i){
		table += "<tr><td>" + currentMembers[i].name + "</td>" +
		"<input id='option" + i + "pl' value='" + currentMembers[i].highscore + "'>" + "<td>&nbsp</td>" + 
		"<input id='option" + i + "pts' value='" + currentMembers[i].point + "'></tr>";
	}
	table += "<tr>&nbsp</tr><tr><td colspan=2 align=center><input style='width: 200px'  id='" + submitId + "' type=submit value='" + text.SUBMIT + "'></td></tr></center>";

	table += "</tbody></table>";

	return table;
}

function refresh(){switchDisplay(currentShowed);}
	

/** 
 * Met le text en avant
 * @param text Le texte a mettre en evidence
 * @param bool 1 : good color, -1 : bad color, 0 = eq color
 * @param type Un object Encoding qui contient les balises
 * @return le texte en highLigth
 */
function highLight(text, digit, type){
	if(digit == 0)
		return type.color.format(settings[cst.SETTINGS.COLOR.EQ], text);
	else if(digit > 0)
		return type.color.format(settings[cst.SETTINGS.COLOR.GOOD], text);
	return type.color.format(settings[cst.SETTINGS.COLOR.BAD], text);	
}

/**
 * Fonction de mise en page d'un element dans une largeur de colonne donnée
 * @param text Le texte a insérer
 * @param wide La largeur de la colonne
 * @param align L'alignement dans la colonne désirer (CENTER, LEFT, RIGHT)
 * @param space La caractère qui represente l'espace (comme le reste est _ mettre autre chose décale tout :/)
 * @param type Un objet type qui contient les balises nécessaire
 * @param textColor La couleur du texte
 * @param spaceColor La couleur des espaces
 * @param isNumber Si c'est un nombre, dans ce cas la fonction hightLight est appelée
 */

function alignText(str, wide, align, space, type, textColor, spaceColor, isNumber){
	var text = (isNumber ? addPoints(str) : str);
	var res = "";
	var spaces = "";
	var size = text.toString().length;
	var spaceLeft = 0;
	var spaceRight = 0;
	switch(align){
	case CENTER:
		var tmp = wide - size;
		tmp = Math.round(tmp/2);
		spaceLeft = tmp;
		spaceRight = wide - (spaceLeft + size);		
		break;
	case RIGHT:
		spaceLeft = wide - size;
		break;
	case LEFT:
		spaceRight = wide - size;
		break;
	default:
		break;
	}
	for(var i = 0; i< spaceLeft; ++i)spaces += space;
	res += type.color.format(spaceColor, spaces);
	if(isNumber)res += highLight(text, str, type);
	else res  += type.color.format(textColor, text);
	spaces = "";
	for(var i = 0; i< spaceRight; ++i)	spaces += space;
	res += type.color.format(spaceColor, spaces);
	return res;
}



/**************************************************************
 *                                                            *
 *             Fonctions utilitaires pack 0.1                 *
 *                                                            *
 **************************************************************/

/**
 * Atteint un élément à partir d'un chemin de tags.
 * @param id L'identifier de l'objet de départ
 * @param tags Liste de tags àsuivre
 * @param index Liste des index associés au tags
 * @return l'objet correspondant ou null si il n'est pas trouvé
 */
function getElementsByList(id, tags, index){
	if(tags.length != index.length)return; //donnée invalide
	var elem;
	for(var i = 0, elem = document.getElementById(id) ; elem && i < tags.length; elem = elem.getElementsByTagName(tags[i])[index[i]], ++i);
	return (elem ? elem : null);
}

/**
 * Crée une fade box et l'affiche
 * @param message Message afficher
 * @param failed Vrai si c'est un message d'erreur, faux dans les autres cas
 * @param time Le temps pendant lequel la fade box est affichée
 */
function popUp(message, failed, time){
	unsafeWindow.tb_remove();
	if (failed)	unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
	else unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
	unsafeWindow.$("#fadeBoxContent").html(message);
	unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(time);
}

/**
 * Fonctions de gestion des cookies
 * @param Recoit un booleen qui indique si il s'agit de Firefox ou pas
 * @return Renvoit un object contenant les differentes fonctions
 */
var cookies = coockiesFunctions(navigator.userAgent.indexOf('Firefox')>-1);
var autor = "Lame_noire";
var scriptName = "Alliance_Evolution";
var namespace = autor + "/" + scriptName + "/";
function coockiesFunctions(isFirefox){
	if(isFirefox){
		return {
			save : function (key, value){GM_setValue(key, value);},
			load : function (key, defaultValue){return GM_getValue(key, defaultValue);},
			erase : function (key){GM_deleteValue(key);},
			eraseAll : function(){	
				var keys = GM_listValues();
				for (var i=0, key=null; key=keys[i]; i++){
					if(strContains(key,server))
						GM_deleteValue(key);
				}
			},
			xmlhttpRequest : function(){}
		};
	}
	else {
		return {
			save : function (key, value){localStorage.setItem(namespace + key, value);},
			load : function (key, defaultValue){var res = localStorage.getItem(namespace + key); return (res ? res : defaultValue); },
			erase : function (key){removeItem(namespace + key);},
			eraseAll : function(){},
			xmlhttpRequest : function(){}
		};
	}
}

/** 
 * Test si un elem est dans l'array, il faut la méthode equals
 * @param Array Le tableau sur lequel le test est fait
 * @param elem L'element chercher
 * @return boolean
 */
function arrayContains(array, elem){return (arrayIndexOf(array, elem) != -1);}

/**
 * Renvoit la position d'un element dans un array
 * @param array Le talbeau
 * @param elem L'element rechercher
 * @return Indice de l'element ou -1 si il n'est pas présent
 */
function arrayIndexOf(array, elem){
	for(var i = 0; i < array.length; ++i)
		if(array[i].equals(elem))
			return i;
	return -1;
}

/**
 * Ajoute les points dans les nombres
 * @Copyright InfoCompte3
 */
function addPoints(nombre){
	if(nombre - parseInt(nombre) != 0)
		return nombre;
	var signe = '';
	if (nombre<0){
		nombre = Math.abs(nombre);
		signe = '-';
	}
	nombre=parseInt(nombre);
	var str = nombre.toString(), n = str.length;
	if (n <4){return signe + nombre;} 
	return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
}

function show(elem){elem.style.display = "";}
function hide(elem){elem.style.display = "none";}

/**
 * String compare
 * 1 : a > b (ex bbb > aaa)
 * -1 : b > a
 * 0 : a==b
 */
function strcmp(str1, str2){
	//Accent ?
	var a = str1.toLowerCase();
	var b = str2.toLowerCase();
	if (a == b) return 0;
	return (a>b?1:-1);
}

function makeSpaces(nbr){
	var spaces = "";
	for(var i=0; i<nbr; i++) spaces += '\u00a0';
	return document.createTextNode(spaces);
}

function makeLineBreak(){return document.createElement("br");}

function insertAfter(elem, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}
function strContains(text, str){return (text.indexOf(str)!=-1);}

setInterval(mainFunction, 500);
