// ==UserScript==
// @name	Tools for SpaceInvasion
// @namespace	ToolsPackSI
// @include	*.spaceinvasion.*/indexInternal.es?action=internal*
// @description	Outils pour SpaceInvasion (pour ZZ)
// @auteur	JeanCerien
// @version	0.3
// ==/UserScript==

/*=================================================================================================================
 
                       Nombreuses Fonctions pompées sur SIHelper par Samogot- 
                             - Modifié et assemblé par JeanCerien -
                               DERNIERE MISE A JOUR : 22/11/2009


----------------- Version 0.1 -----------------------------------------------------------------------------------
   => reprise du script original : SIHelper par Samogot

----------------- Version 0.2 -----------------------------------------------------------------------------------
   => correction de quelques Bugs
   => menu option sur page configuration
   => lien vers coalition 
   => Refresh 6mn sur centre de commande
   => Convertisseur de RC en Bbcode

----------------- Version 0.3 -----------------------------------------------------------------------------------
   => correction suite au mise à jour de BigPoint
   => ajout du TopListe 5000

=================================================================================================================*/

function Languages() {
	locale_ru = Array();
	locale_ru["SH"] = "Save Helper";
	locale_ru["TITLE0"] = "Транспорт";
	locale_ru["TITLE1"] = "Руда";
	locale_ru["TITLE2"] = "Метал";
	locale_ru["TITLE3"] = "Криптонит";
	locale_ru["TITLE4"] = "Спайс";
	locale_ru["TITLE5"] = "Все";
	locale_ru["TRANSPORT2"] = "Трансмиттер";
	locale_ru["TRANSPORT3"] = "Большой транспортер";
	locale_ru["TRANSPORT4"] = "Небольшой транспортер";
	locale_ru["TEXT"] = "Рассчитать полет-спасение для выбраних войск на ";
	locale_ru["HOURS"] = "часов";
	locale_ru["MINUTES"] = "минут";
	locale_ru["SUBMIT"] = "Рассчитать";
	locale_ru["MESS0"] = "Игроки";
	locale_ru["MESS1"] = "Альянсы";
	locale_ru["MESS2"] = "Шпионаж";
	locale_ru["MESS3"] = "Бой";
	locale_ru["MESS4"] = "Флот";
	locale_ru["MESS5"] = "Администратор";
	locale_ru["COLEXP"] = "Показать";
	locale_ru["EXPCOL"] = "Скрыть";
	locale_ru["EXPDET"] = "Больше";
	locale_ru["DETEXP"] = "Меньше";
	locale_ru["COLALL"] = "Скрыть все";
	locale_ru["DETALL"] = "Подробно все";
	locale_ru["EXPALL"] = "Показать все";
	locale_ru["OPT"] = "Настройки SI Helper";
	locale_ru["OPTOK"] = "ОК";
	locale_ru["OPTCANS"] = "Отмена";
	locale_ru["OPTLANG"] = "Язык по умолчанию";
	locale_ru["OPTLANGAU"] = "Авто";
	locale_ru["OPTLANGRU"] = "Русский (ru)";
	locale_ru["OPTLANGEN"] = "English (en)";
	locale_ru["OPTLANGDE"] = "Deutsch (de)";
	locale_ru["OPTLANGFR"] = "Français(fr)";
	locale_ru["OPTIH"] = "Режим по умолчанию";
	locale_ru["OPTIHCOL"] = "Скрыть";
	locale_ru["OPTIHEXP"] = "Показать";
	locale_ru["OPTIHDET"] = "Подробно";
	locale_ru["OPTSH"] = "Использовать иФрейм";
	locale_ru["OPTSHYES"] = "Да";
	locale_ru["OPTSHNO"] = "Нет";
	locale_ru["INFOHIDER"] = "InfoHider";
	locale_ru["SAVEHELPER"] = "SaveHelper";
        locale_ru["LISTCONST"] = "Список строительств";
	
	
	locale_en = Array();
	locale_en["SH"] = "Save Helper";
	locale_en["TITLE0"] = "Transport";
	locale_en["TITLE1"] = "Pig iron";
	locale_en["TITLE2"] = "Metal";
	locale_en["TITLE3"] = "Kryptonite";
	locale_en["TITLE4"] = "Spice";
	locale_en["TITLE5"] = "All";
	locale_en["TRANSPORT2"] = "Transmitter";
	locale_en["TRANSPORT3"] = "Large transport";
	locale_en["TRANSPORT4"] = "Small transport";
	locale_en["TEXT"] = "Calculate save fleet for selected ships on ";
	locale_en["HOURS"] = "hours";
	locale_en["MINUTES"] = "minutes";
	locale_en["SUBMIT"] = "Calculate";
	locale_en["MESS0"] = "Player";
	locale_en["MESS1"] = "Alliance";
	locale_en["MESS2"] = "Espionage";
	locale_en["MESS3"] = "Battle";
	locale_en["MESS4"] = "Fleets";
	locale_en["MESS5"] = "Admin";
	
	
	locale_de = Array();
	locale_de["SH"] = "Save Helper";
	locale_de["TITLE0"] = "Transport";
	locale_de["TITLE1"] = "Roheisen";
	locale_de["TITLE2"] = "Metall";
	locale_de["TITLE3"] = "Kryptonit";
	locale_de["TITLE4"] = "Spice";
	locale_de["TITLE5"] = "Alles";
	locale_de["TRANSPORT2"] = "Transmitter";
	locale_de["TRANSPORT3"] = "Großer Transporter";
	locale_de["TRANSPORT4"] = "Kleiner Transporter";
	locale_de["MESS0"] = "Spieler";
	locale_de["MESS1"] = "Allianz";
	locale_de["MESS2"] = "Spionage";
	locale_de["MESS3"] = "Kampf";
	locale_de["MESS4"] = "Flotten";
	locale_de["MESS5"] = "Admin";


	locale_fr = Array();
	locale_fr["SH"] = "vol de retraite";
	locale_fr["TITLE0"] = "Transport";
	locale_fr["TITLE1"] = "Fonte";
	locale_fr["TITLE2"] = "M&eacute;tal";
	locale_fr["TITLE3"] = "Kryptonite";
	locale_fr["TITLE4"] = "&Eacute;pice";
	locale_fr["TITLE5"] = "Tout";
	locale_fr["TRANSPORT2"] = "Transmetteur";
	locale_fr["TRANSPORT3"] = "Cargo lourd";
	locale_fr["TRANSPORT4"] = "Cargo léger";  
	locale_fr["TEXT"] = "Temps total de vol souhaité";
	locale_fr["HOURS"] = "heure(s)";
	locale_fr["MINUTES"] = "minute(s)";
	locale_fr["SUBMIT"] = "Calculer";
	locale_fr["MESS0"] = "Joueur";
	locale_fr["MESS1"] = "Coalition";
	locale_fr["MESS2"] = "Espionnage";
	locale_fr["MESS3"] = "Bataille";
	locale_fr["MESS4"] = "Flottes";
	locale_fr["MESS5"] = "Аdmin.";
	locale_fr["MESS6"] = "Sortie";
	locale_fr["COLEXP"] = "Mode reduit";
	locale_fr["EXPCOL"] = "Mode liste";
	locale_fr["EXPDET"] = "Mode complet";
	locale_fr["DETEXP"] = "Mode reduit";
	locale_fr["COLALL"] = "Liste";
	locale_fr["DETALL"] = "Tous les details";
	locale_fr["EXPALL"] = "Info ressources";
	locale_fr["OPT"] = "Configuration de ToolsPackSI";
	locale_fr["OPTOK"] = "ОК";
	locale_fr["OPTCANS"] = "Annulé";
	locale_fr["OPTLANG"] = "choix de la langue";
	locale_fr["OPTLANGAU"] = "Аuто";
	locale_fr["OPTLANGRU"] = "Русский (ru)";
	locale_fr["OPTLANGEN"] = "English (en)";
	locale_fr["OPTLANGDE"] = "Deutsch (de)";
	locale_fr["OPTLANGFR"] = "Français(fr)";
	locale_fr["OPTIH"] = "Bâtiment/Recherche";
	locale_fr["OPTHI"] = "Armement/Défense";
	locale_fr["OPTIHCOL"] = "Liste";
	locale_fr["OPTIHEXP"] = "Ressources";
	locale_fr["OPTIHDET"] = "Ressources+Temps";
	locale_fr["OPTSH"] = "ouverture de SI-master";
	locale_fr["OPTSHYES"] = "Dans SI";
	locale_fr["OPTSHNO"] = "Autre fenetre ou onglet";
	locale_fr["INFOHIDER"] = "Info constructions";
	locale_fr["SAVEHELPER"] = "vol de retraite";
        locale_fr["LISTCONST"] = "Liste de construction";
	
	
	
	if(GM_Value_OPTLANG == "fr") locale = locale_fr;
	else if(GM_Value_OPTLANG == "de") locale = locale_de;
	else if(GM_Value_OPTLANG == "en") locale = locale_en;
	else if(GM_Value_OPTLANG == "ru") locale = locale_ru;
	else if(location.href.indexOf("spaceinvasion.ru/")+1) locale = locale_ru;
	else if(location.href.indexOf("spaceinvasion.en/")+1) locale = locale_en;
	else if(location.href.indexOf("spaceinvasion.de/")+1) locale = locale_de;
	else if(location.href.indexOf("spaceinvasion.fr/")+1) locale = locale_fr;
	
}
function Options() {

	function showOpt() {
		x.firstChild.style.display = "";
	}
	function hideOpt() {
		this.offsetParent.offsetParent.style.display = "none";
		GM_setValue("OPT", 0);
	}
	function submOpt() {
		x = this.offsetParent.offsetParent.parentNode.elements;
		GM_setValue("OPTLANG", x.namedItem("lang").value);
		GM_setValue("OPTSH", x.namedItem("sh").value);
		GM_setValue("OPTIH", x.namedItem("ih").value);
		GM_setValue("OPTHI", x.namedItem("hi").value);
		this.offsetParent.offsetParent.style.display = "none";
		GM_setValue("OPT", 0);
	}
	html = "<form action='javascript:;'>"
	+ "<table border=5 cellpadding=0 cellspacing=0 style='left: 400px; top: 300px; display: none; position: fixed; background-color: black;' >"
	+ "<tr><td class='rahmen' colspan=2 >"+localeT("OPT")+"</td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTLANG")+"</td><td class='nachricht' align='right'><select name='lang'>"
	+ "<option value='fr'"+((GM_Value_OPTLANG == "fr")?" selected":"")+">"+localeT("OPTLANGFR")+"</option>"
	+ "<option value='ru'"+((GM_Value_OPTLANG == "ru")?" selected":"")+">"+localeT("OPTLANGRU")+"</option>"
	+ "<option value='en'"+((GM_Value_OPTLANG == "en")?" selected":"")+">"+localeT("OPTLANGEN")+"</option>"
	+ "<option value='de'"+((GM_Value_OPTLANG == "de")?" selected":"")+">"+localeT("OPTLANGDE")+"</option>"
	+ "<option value='auto'>"+localeT("OPTLANGAU")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2 >"+localeT("SAVEHELPER")+":</td></tr>"
	+ "<tr><td class='nachricht' >"+localeT("OPTSH")+"</td><td class='nachricht' align='right'><select name='sh'>"
	+ "<option value='1'>"+localeT("OPTSHYES")+"</option>"
	+ "<option value='0'"+((GM_Value_OPTSH == "0")?" selected":"")+">"+localeT("OPTSHNO")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2 >"+localeT("INFOHIDER")+":</td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTIH")+"</td><td class='nachricht' align='right'><select name='ih'>"
	+ "<option value='colaps'>"+localeT("OPTIHCOL")+"</option>"
	+ "<option value='expand'"+((GM_Value_OPTIH == "expand")?" selected":"")+">"+localeT("OPTIHEXP")+"</option>"
	+ "<option value='detail'"+((GM_Value_OPTIH == "detail")?" selected":"")+">"+localeT("OPTIHDET")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTHI")+"</td><td class='nachricht' align='right'><select name='hi'>"
	+ "<option value='expand'>"+localeT("OPTIHEXP")+"</option>"
	+ "<option value='detail'"+((GM_Value_OPTHI == "detail")?" selected":"")+">"+localeT("OPTIHDET")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2 align='right'><input class='planet' value='"+localeT("OPTOK")+"' type='submit'> <input class='planet' value='"+localeT("OPTCANS")+"' type='submit'></td></tr>"
	+ "</table></form>";
	x = firstNodeOf(html);
	
	document.body.appendChild(x);
	x.getElementsByTagName("input")[0].addEventListener("click", submOpt, false);
	x.getElementsByTagName("input")[1].addEventListener("click", hideOpt, false);
	if(GM_getValue("OPT", 0)) showOpt();
}

function Settings() {

	function linkClick() {
		GM_setValue("OPT", 1);
	}
        img = "data:image/png;base64,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"
+ "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%3D";

	tr = document.createElement("tr");
	td = document.createElement("td");
	td.setAttribute("class", "rahmen");
	td.setAttribute("align", "right");
	tr.appendChild(td);
	td.innerHTML = "<a href='"+location.href+"' class='menu'>"+localeT("OPT")+"</a> <img hspace='10' width='20' height='20'src='"+img+"' > " ;
	td.firstChild.addEventListener("click", linkClick, false);
        insertAfter(tr,  document.getElementsByTagName("tr")[1]);


}

function Menu() {


	tr = document.createElement("tr");
	td = document.createElement("td");
	td.setAttribute("class", "nachricht");
	tr.appendChild(td);
	td.innerHTML = "<a href='http://www.si-master.com/"+GM_Value_OPTLANG+"/' target='_blank' class='menu'>SI-Master</a>";
/*	tr2 = document.createElement("tr");
	td2 = document.createElement("td");
	td2.setAttribute("class", "nachricht");
	tr2.appendChild(td2);
	td2.innerHTML = "<a href='"+document.getElementsByTagName("a")[0].href+"' class='menu'>"+localeT("OPT")+"</a>";
	td2.firstChild.addEventListener("click", linkClick, false);     */
	tr3 = document.createElement("tr");
	td3 = document.createElement("td");
	td3.setAttribute("class", "nachricht");
	tr3.appendChild(td3);
	td3.innerHTML = "<a href='http://fr.board.bigpoint.com/spaceinvasion/showthread.php?t=366' target='_blank' class='menu'>Régles Officiel</a>";
	tr4 = document.createElement("tr");
	td4 = document.createElement("td");
	td4.setAttribute("class", "nachricht");
	tr4.appendChild(td4);
	td4.innerHTML = "<a href='http://lesziniznsdelespace.max2forum.com/' target='_blank' class='menu'>Forum ZZ</a>"; 
	tr5 = document.createElement("tr");
	td5 = document.createElement("td");
	td5.setAttribute("class", "nachricht");
	tr5.appendChild(td5);
	td5.innerHTML = "<a href='http://spaceinvasion.free.fr' target='_blank' class='menu'>Tools SI</a>";

	insertAfter(tr4, document.getElementsByTagName("tr")[21]);
//	insertAfter(tr2, document.getElementsByTagName("tr")[23]);
	insertAfter(tr3, document.getElementsByTagName("tr")[27]);
	insertAfter(tr,  document.getElementsByTagName("tr")[28]);
	insertAfter(tr5, document.getElementsByTagName("tr")[29]);
}

function SaveHelper() {
	function calcinterval() {calcspeed(); calcsingle();}
	function calcspeed() {
		sfhTableTbodyTr5TdFormIspeed.value=1000000000000
		var temp;
		for(i=0;i<ships.length;i++) if(ships[i] && parseInt(ships[i].value) > 0) {
			temp = parseInt(ships[i].parentNode.parentNode.childNodes[5].innerHTML);
			if(sfhTableTbodyTr5TdFormIspeed.value > temp) sfhTableTbodyTr5TdFormIspeed.value = temp;
		}
		if(sfhTableTbodyTr5TdFormIspeed.value == 1000000000000) sfhTableTbodyTr5TdFormIspeed.value = 0;
	}
	function calcsingle() {
		var h=sfhTableTbodyTr5TdFormIhourstotal.value;
		var m=sfhTableTbodyTr5TdFormIminutestotal.value;
		t=h/2*60+m/2;
		h=Math.floor(t/60);
		m=t-h*60;
		sfhTableTbodyTr5TdFormIhours.value=h;
		sfhTableTbodyTr5TdFormIminutes.value=m;
	}
	function Name(tr, td) {	
		if(tr == 1) return localeT("TITLE"+td);
		else if(td == 0) return localeT("TRANSPORT"+tr);
		else if(td < 5) col=Math.ceil(ress[td-1]/grus[tr-2]);
		else col=Math.ceil(sumres/grus[tr-2]);
		sh =(tr-1==1)?3:((tr-1==2)?2:1)
		if(!ships[sh]) return col;
		t = parseInt(ships[sh].parentNode.parentNode.childNodes[1].childNodes[2].innerHTML);
		if(t<col)	return "<b style='color:red' class=\"bau\">"+col+"</b>";
		else return "<b class=\"bau\">"+col+"</b>";
	}
	function setframe() {
		var sfhTableTbodyTr6 = document.createElement("tr");
		var sfhTableTbodyTr6Td = document.createElement("td");
		var sfhTableTbodyTr6TdIfr = document.createElement("iframe");
		sfhTableTbodyTr6Td.setAttribute("colspan", colspan);
		sfhTableTbodyTr6TdIfr.setAttribute("frameborder", 0);
		sfhTableTbodyTr6TdIfr.setAttribute("align", "middle");
		sfhTableTbodyTr6TdIfr.setAttribute("name", "SIM"); 
		sfhTableTbodyTr6TdIfr.setAttribute("height", 489);
		sfhTableTbodyTr6TdIfr.setAttribute("width", 530); 
		sfhTableTbodyTr6TdIfr.setAttribute("scrolling", "no");
		sfhTableTbody.appendChild(sfhTableTbodyTr6);
		sfhTableTbodyTr6.appendChild(sfhTableTbodyTr6Td);
		sfhTableTbodyTr6Td.appendChild(sfhTableTbodyTr6TdIfr);
	}
	
	var siWin=0;
	var mainWin;
	var colspan = 6;
	var ress = document.getElementsByTagName("script").item(0).innerHTML.match(/[0-9]+/gm);
	var sumres=0;
	for(i=0;i<4;i++) sumres+=parseInt(ress[i]);
	var grus = Array(250000, 30000, 6000);
	tds = document.getElementsByTagName("td");
	var ships = Array();
	for(i=0;i<tds.length;i++) if(tds[i].width == "110" && tds[i].getElementsByTagName("input")[0])
		ships[parseInt(tds[i].getElementsByTagName("input")[0].name.slice(5))] = tds[i].getElementsByTagName("input")[0];
	var obf = document.getElementsByTagName("div")[5];

	var br = document.createElement("br");
	var sfh = document.createElement("div");
	sfh.setAttribute("align", "center");
	var sfhTable = document.createElement("table");
	sfhTable.setAttribute("boder", "0");
	sfhTable.setAttribute("cellpadding", "5");
	sfhTable.setAttribute("cellspacing", "0");
	sfhTable.setAttribute("width", "700");
	var sfhTableTbody = document.createElement("tbody");
	var sfhTableTbodyTr0 = document.createElement("tr");
	var sfhTableTbodyTr0Td = document.createElement("td");
	sfhTableTbodyTr0Td.setAttribute("class", "nachricht");
	sfhTableTbodyTr0Td.setAttribute("colspan", colspan);
	var sfhTableTbodyTr0TdB = document.createElement("b");
	var sfhTableTbodyTr0TdBText = document.createTextNode(localeT("SH"));
	sfh.appendChild(sfhTable);
	sfhTable.appendChild(sfhTableTbody);
	sfhTableTbody.appendChild(sfhTableTbodyTr0);
	sfhTableTbodyTr0.appendChild(sfhTableTbodyTr0Td);
	sfhTableTbodyTr0Td.appendChild(sfhTableTbodyTr0TdB);
	sfhTableTbodyTr0TdB.appendChild(sfhTableTbodyTr0TdBText);
	obf.parentNode.appendChild(br);
	obf.parentNode.appendChild(sfh);
	var tempR;
	var temp;
	var tempA;
	ja = Array(0,0);
	for(i=3,j=2;i>0;i--,j++) {
		if(!ships[i]) { ja[j]=1; ja[0]++; }
		else ja[j]=0;
	}
	for(j=1;j<5;j++) {
		if(ja[0]!=3 && ja[j]) continue;
		tempR = document.createElement("tr");
		tempR.setAttribute("id", "sfhTableTbodyTr"+j);
		for(i=0;i<colspan;i++) {
			temp = document.createElement("td");
			temp.setAttribute("class", j==1?"rahmen":"nachricht");
			temp.innerHTML = Name(j, i);
			tempR.appendChild(temp);
		}
		sfhTableTbody.appendChild(tempR);
	}
	var sfhTableTbodyTr5 = document.createElement("tr");
	var sfhTableTbodyTr5Td = document.createElement("td");
	sfhTableTbodyTr5Td.setAttribute("class", "rahmen");
	sfhTableTbodyTr5Td.setAttribute("colspan", colspan);
	sfhTableTbody.appendChild(sfhTableTbodyTr5);
	sfhTableTbodyTr5.appendChild(sfhTableTbodyTr5Td);
	planets = document.getElementsByTagName("select").item(0).getElementsByTagName("option")
	var planet_1, planet_2, planet_3
	for(i=0;i<planets.length;i++) if(planets[i].selected == true) {
		planet_regex = planets[i].innerHTML.match(/[:\[][0-9]+/g);
		planet_1 = planet_regex[0].slice(1);
		planet_2 = planet_regex[1].slice(1);
		planet_3 = planet_regex[2].slice(1);
	}
	var sfhTableTbodyTr5TdForm = document.createElement("form");
	sfhTableTbodyTr5Td.appendChild(sfhTableTbodyTr5TdForm);
	sfhTableTbodyTr5TdForm.setAttribute("name", "save");
	sfhTableTbodyTr5TdForm.setAttribute("action", "http://www.si-master.com/"+GM_Value_OPTLANG+"/index.php");
	sfhTableTbodyTr5TdForm.setAttribute("target", "SIM");
	sfhTableTbodyTr5TdForm.setAttribute("method", "get");
	sfhTableTbodyTr5TdForm.setAttribute("style", "display:inline");
	var sfhTableTbodyTr5TdFormIpage = document.createElement("input");
	sfhTableTbodyTr5TdFormIpage.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIpage.setAttribute("name", "page");
	sfhTableTbodyTr5TdFormIpage.setAttribute("value", "savecalc");
	var sfhTableTbodyTr5TdFormIgalaxy = document.createElement("input");
	sfhTableTbodyTr5TdFormIgalaxy.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIgalaxy.setAttribute("name", "galaxy");
	sfhTableTbodyTr5TdFormIgalaxy.setAttribute("value", planet_1);
	var sfhTableTbodyTr5TdFormIsolarsystem = document.createElement("input");
	sfhTableTbodyTr5TdFormIsolarsystem.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIsolarsystem.setAttribute("name", "solarsystem");
	sfhTableTbodyTr5TdFormIsolarsystem.setAttribute("value", planet_2);
	var sfhTableTbodyTr5TdFormIsolarnumber = document.createElement("input");
	sfhTableTbodyTr5TdFormIsolarnumber.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIsolarnumber.setAttribute("name", "solarnumber");
	sfhTableTbodyTr5TdFormIsolarnumber.setAttribute("value", planet_3);
	var sfhTableTbodyTr5TdFormIspeed = document.createElement("input");
	sfhTableTbodyTr5TdFormIspeed.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIspeed.setAttribute("name", "speed");
	sfhTableTbodyTr5TdFormIspeed.setAttribute("value", 00);
	var sfhTableTbodyTr5TdFormIhours = document.createElement("input");
	sfhTableTbodyTr5TdFormIhours.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIhours.setAttribute("name", "hours");
	sfhTableTbodyTr5TdFormIhours.setAttribute("value", 6);
	var sfhTableTbodyTr5TdFormIminutes = document.createElement("input");
	sfhTableTbodyTr5TdFormIminutes.setAttribute("type", "hidden");
	sfhTableTbodyTr5TdFormIminutes.setAttribute("name", "minutes");
	sfhTableTbodyTr5TdFormIminutes.setAttribute("value", 00);
	var sfhTableTbodyTr5TdFormIhourstotal = document.createElement("input");
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("type", "text");
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("name", "hourstotal");
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("value", 12);
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("class", "form");
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("size", 3);
	sfhTableTbodyTr5TdFormIhourstotal.setAttribute("maxlength", 3);
	var sfhTableTbodyTr5TdFormIminutestotal = document.createElement("input");
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("type", "text");
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("name", "minutestotal");
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("value", 0);
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("class", "form");
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("size", 3);
	sfhTableTbodyTr5TdFormIminutestotal.setAttribute("maxlength", 3);
	var sfhTableTbodyTr5TdFormISubmit = document.createElement("input");
	sfhTableTbodyTr5TdFormISubmit.setAttribute("type", "submit");
	sfhTableTbodyTr5TdFormISubmit.setAttribute("name", "Submit");
	sfhTableTbodyTr5TdFormISubmit.setAttribute("value", localeT("SUBMIT"));
	sfhTableTbodyTr5TdFormISubmit.setAttribute("class", "planet");
	sfhTableTbodyTr5TdFormISubmit.addEventListener("click", calcinterval, true);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIpage);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIgalaxy);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIsolarsystem);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIsolarnumber);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIspeed);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIhours);
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIminutes);
	sfhTableTbodyTr5TdForm.appendChild(document.createTextNode(localeT("TEXT")));
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIhourstotal);
	sfhTableTbodyTr5TdForm.appendChild(document.createTextNode(localeT("HOURS")));
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormIminutestotal);
	sfhTableTbodyTr5TdForm.appendChild(document.createTextNode(localeT("MINUTES")));
	sfhTableTbodyTr5TdForm.appendChild(sfhTableTbodyTr5TdFormISubmit);
	if(GM_Value_OPTSH == "1") setframe();


}
function MessageLinks() {
	var mess=document.getElementsByTagName("a").item(2);
	if(mess && mess.href.indexOf("Messages")+1){
		messHref = Array("&type=normal", "&type=alliance", "&type=spio", "&type=battle", "&type=fleet", "&type=admin");
		span=document.createElement("span");
		mess.parentNode.appendChild(span);
		spaninn = "<br>";
		for(i=0;i<6;i++)
			spaninn += "<a href='"+mess.href+messHref[i]+"'> "+localeT("MESS"+i)+" </a>";
		span.innerHTML = spaninn;
	}
}
function Weapon() {
	function Unit(rootTable, i) {
		this.name = rootTable.getElementsByTagName("a")[1].innerHTML;
		this.image = rootTable.getElementsByTagName("td")[0];
		this.info = rootTable.getElementsByTagName("tr")[1];
		this.details = rootTable.getElementsByTagName("tr")[4];
		
		this.span_expcol = document.createElement("a");
		this.span_colexp = document.createElement("a");
		this.span_expdet = document.createElement("a");
		this.span_detexp = document.createElement("a");
		this.span_action = document.createElement("span");
		this.span_expcol.setAttribute("id", "SIH_IH_"+i);
		this.span_expcol.setAttribute("class", "bau");
		this.span_expcol.addEventListener("click", colaps, false);
		this.span_expcol.setAttribute("style", "display:none");
		this.span_expcol.innerHTML = localeT("EXPCOL");
		this.span_colexp.setAttribute("id", "SIH_IH_"+i);
		this.span_colexp.setAttribute("class", "bau");
		this.span_colexp.addEventListener("click", expand, false);
		this.span_colexp.setAttribute("style", "display:none");
		this.span_colexp.innerHTML = localeT("COLEXP");
		this.span_detexp.setAttribute("id", "SIH_IH_"+i);
		this.span_detexp.setAttribute("class", "bau");
		this.span_detexp.addEventListener("click", expand, false);
		this.span_detexp.setAttribute("style", "display:none");
		this.span_detexp.innerHTML = localeT("DETEXP");
		this.span_expdet.setAttribute("id", "SIH_IH_"+i);
		this.span_expdet.setAttribute("class", "bau");
		this.span_expdet.addEventListener("click", detail, false);
		this.span_expdet.setAttribute("style", "display:none");
		this.span_expdet.innerHTML = localeT("EXPDET");
		this.span_action.setAttribute("style", "display:none");
		this.span_action.innerHTML = rootTable.getElementsByTagName("td")[9].childNodes[1].innerHTML;
		rootTable.getElementsByTagName("td")[3].appendChild(this.span_expcol);
		rootTable.getElementsByTagName("td")[3].appendChild(this.span_colexp);
		rootTable.getElementsByTagName("td")[4].innerHTML="";
		rootTable.getElementsByTagName("td")[4].appendChild(this.span_expdet);
		rootTable.getElementsByTagName("td")[4].appendChild(this.span_detexp);
		rootTable.getElementsByTagName("td")[4].appendChild(this.span_action);
		rootTable.getElementsByTagName("td")[4].setAttribute("class", "rahmen");
		return this;
	}
	function colaps() {colapsUnit(units[this.id.slice(7)]);}
	function expand() {expandUnit(units[this.id.slice(7)]);}
	function detail() {detailUnit(units[this.id.slice(7)]);}
	function colapsAll() {for(i in units) colapsUnit(units[i]);}
	function expandAll() {for(i in units) expandUnit(units[i]);}
	function detailAll() {for(i in units) detailUnit(units[i]);}
	function colapsUnit(unit) {
		unit.span_expcol.style.display = "none";
		unit.span_colexp.style.display = "";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "";
		unit.image.style.display = "none";
		unit.info.style.display = "none";
		unit.details.style.display = "none";
	}
	function expandUnit(unit) {
		unit.span_expcol.style.display = "none";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "none";
	}
	function detailUnit(unit) {
		unit.span_expcol.style.display = "none";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "";
	}
		
        function tableau() {
        br = document.createElement("br");
	colapsAll_link = document.createElement("a");
	colapsAll_link.setAttribute("class", "bau");
	colapsAll_link.innerHTML = localeT("COLALL")+" ";
	colapsAll_link.addEventListener("click", colapsAll, false);
	expandAll_link = document.createElement("a");
	expandAll_link.setAttribute("class", "bau");
	expandAll_link.innerHTML = localeT("COLEXP")+" ";
	expandAll_link.addEventListener("click", expandAll, false);
	detailAll_link = document.createElement("a");
	detailAll_link.setAttribute("class", "bau");
	detailAll_link.innerHTML = localeT("DETALL")+" ";
	detailAll_link.addEventListener("click", detailAll, false);
	insertAfter(detailAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(expandAll_link, units[0].image.parentNode.offsetParent.previousSibling)
//	insertAfter(colapsAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(br, units[0].image.parentNode.offsetParent.previousSibling)
	
//	if(GM_Value_OPTHI == "colaps") colapsAll();
	if(GM_Value_OPTHI == "expand") expandAll();
	if(GM_Value_OPTHI == "detail") detailAll();

        }
        
	tables = document.getElementsByTagName("table");
	units = Array();
	for(i in tables)  if (tables[i].width == 700 && tables[i].innerHTML.indexOf("Production") ==-1)  
        units.push(new Unit(tables[i], units.length));
        tableau();
        
}

function Buildings() {
	function Unit(rootTable, i) {
		this.name = rootTable.getElementsByTagName("a")[1].innerHTML;		
		this.image = rootTable.getElementsByTagName("td")[0];
		this.info = rootTable.getElementsByTagName("tr")[4];
		this.details = rootTable.getElementsByTagName("tr")[6];
		
		this.span_expcol = document.createElement("a");
		this.span_colexp = document.createElement("a");
		this.span_expdet = document.createElement("a");
		this.span_detexp = document.createElement("a");
		this.span_action = document.createElement("span");
		this.span_expcol.setAttribute("id", "SIH_IH_"+i);
		this.span_expcol.setAttribute("class", "bau");
		this.span_expcol.addEventListener("click", colaps, false);
		this.span_expcol.setAttribute("style", "display:none");
		this.span_expcol.innerHTML = localeT("EXPCOL");
		this.span_colexp.setAttribute("id", "SIH_IH_"+i);
		this.span_colexp.setAttribute("class", "bau");
		this.span_colexp.addEventListener("click", expand, false);
		this.span_colexp.setAttribute("style", "display:none");
		this.span_colexp.innerHTML = localeT("COLEXP");
		this.span_detexp.setAttribute("id", "SIH_IH_"+i);
		this.span_detexp.setAttribute("class", "bau");
		this.span_detexp.addEventListener("click", expand, false);
		this.span_detexp.setAttribute("style", "display:none");
		this.span_detexp.innerHTML = localeT("DETEXP");
		this.span_expdet.setAttribute("id", "SIH_IH_"+i);
		this.span_expdet.setAttribute("class", "bau");
		this.span_expdet.addEventListener("click", detail, false);
		this.span_expdet.setAttribute("style", "display:none");
		this.span_expdet.innerHTML = localeT("EXPDET");
		this.span_action.setAttribute("style", "display:none");
		this.span_action.innerHTML = rootTable.getElementsByTagName("td")[10].childNodes[1].innerHTML;
		rootTable.getElementsByTagName("td")[5].appendChild(this.span_expcol);
		rootTable.getElementsByTagName("td")[5].appendChild(this.span_colexp);
		rootTable.getElementsByTagName("td")[6].innerHTML="";
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_expdet);
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_detexp);
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_action);
		rootTable.getElementsByTagName("td")[6].setAttribute("class", "rahmen");
		return this;
	}
	function colaps() {colapsUnit(units[this.id.slice(7)]);}
	function expand() {expandUnit(units[this.id.slice(7)]);}
	function detail() {detailUnit(units[this.id.slice(7)]);}
	function colapsAll() {for(i in units) colapsUnit(units[i]);}
	function expandAll() {for(i in units) expandUnit(units[i]);}
	function detailAll() {for(i in units) detailUnit(units[i]);}
	function colapsUnit(unit) {
		unit.span_expcol.style.display = "none";
		unit.span_colexp.style.display = "";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "";
		unit.image.style.display = "none";
		unit.info.style.display = "none";
		unit.details.style.display = "none";
	}
	function expandUnit(unit) {
		unit.span_expcol.style.display = "";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "none";
	}
	function detailUnit(unit) {
		unit.span_expcol.style.display = "";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "";
	}
		
        function tableau() {
        br = document.createElement("br");
	colapsAll_link = document.createElement("a");
	colapsAll_link.setAttribute("class", "bau");
	colapsAll_link.innerHTML = localeT("COLALL")+" ";
	colapsAll_link.addEventListener("click", colapsAll, false);
	expandAll_link = document.createElement("a");
	expandAll_link.setAttribute("class", "bau");
	expandAll_link.innerHTML = localeT("EXPALL")+" ";
	expandAll_link.addEventListener("click", expandAll, false);
	detailAll_link = document.createElement("a");
	detailAll_link.setAttribute("class", "bau");
	detailAll_link.innerHTML = localeT("DETALL")+" ";
	detailAll_link.addEventListener("click", detailAll, false);
	insertAfter(detailAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(expandAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(colapsAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(br, units[0].image.parentNode.offsetParent.previousSibling)
	
	if(GM_Value_OPTIH == "colaps") colapsAll();
	if(GM_Value_OPTIH == "expand") expandAll();
	if(GM_Value_OPTIH == "detail") detailAll();

        }
        
	tables = document.getElementsByTagName("table");
	units = Array();
	for(i in tables)  if (tables[i].width == 700 && tables[i].innerHTML.indexOf("Liste de construction") ==-1)  
        units.push(new Unit(tables[i], units.length));
        tableau();
        
}

function Research() {
	function Unit(rootTable, i) {
		this.name = rootTable.getElementsByTagName("a")[1].innerHTML;
		
		this.image = rootTable.getElementsByTagName("td")[0];
		this.info = rootTable.getElementsByTagName("tr")[4];
		this.details = rootTable.getElementsByTagName("tr")[6];
		
		this.span_expcol = document.createElement("a");
		this.span_colexp = document.createElement("a");
		this.span_expdet = document.createElement("a");
		this.span_detexp = document.createElement("a");
		this.span_action = document.createElement("span");
		this.span_expcol.setAttribute("id", "SIH_IH_"+i);
		this.span_expcol.setAttribute("class", "bau");
		this.span_expcol.addEventListener("click", colaps, false);
		this.span_expcol.setAttribute("style", "display:none");
		this.span_expcol.innerHTML = localeT("EXPCOL");
		this.span_colexp.setAttribute("id", "SIH_IH_"+i);
		this.span_colexp.setAttribute("class", "bau");
		this.span_colexp.addEventListener("click", expand, false);
		this.span_colexp.setAttribute("style", "display:none");
		this.span_colexp.innerHTML = localeT("COLEXP");
		this.span_detexp.setAttribute("id", "SIH_IH_"+i);
		this.span_detexp.setAttribute("class", "bau");
		this.span_detexp.addEventListener("click", expand, false);
		this.span_detexp.setAttribute("style", "display:none");
		this.span_detexp.innerHTML = localeT("DETEXP");
		this.span_expdet.setAttribute("id", "SIH_IH_"+i);
		this.span_expdet.setAttribute("class", "bau");
		this.span_expdet.addEventListener("click", detail, false);
		this.span_expdet.setAttribute("style", "display:none");
		this.span_expdet.innerHTML = localeT("EXPDET");
		this.span_action.setAttribute("style", "display:none");
		this.span_action.innerHTML = rootTable.getElementsByTagName("td")[10].childNodes[1].innerHTML;
		rootTable.getElementsByTagName("td")[5].appendChild(this.span_expcol);
		rootTable.getElementsByTagName("td")[5].appendChild(this.span_colexp);
		rootTable.getElementsByTagName("td")[6].innerHTML="";
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_expdet);
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_detexp);
		rootTable.getElementsByTagName("td")[6].appendChild(this.span_action);
		rootTable.getElementsByTagName("td")[6].setAttribute("class", "rahmen");
		return this;
	}
	function colaps() {colapsUnit(units[this.id.slice(7)]);}
	function expand() {expandUnit(units[this.id.slice(7)]);}
	function detail() {detailUnit(units[this.id.slice(7)]);}
	function colapsAll() {for(i in units) colapsUnit(units[i]);}
	function expandAll() {for(i in units) expandUnit(units[i]);}
	function detailAll() {for(i in units) detailUnit(units[i]);}
	function colapsUnit(unit) {
		unit.span_expcol.style.display = "none";
		unit.span_colexp.style.display = "";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "";
		unit.image.style.display = "none";
		unit.info.style.display = "none";
		unit.details.style.display = "none";
	}
	function expandUnit(unit) {
		unit.span_expcol.style.display = "";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "";
		unit.span_detexp.style.display = "none";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "none";
	}
	function detailUnit(unit) {
		unit.span_expcol.style.display = "";
		unit.span_colexp.style.display = "none";
		unit.span_expdet.style.display = "none";
		unit.span_detexp.style.display = "";
		unit.span_action.style.display = "none";
		unit.image.style.display = "";
		unit.info.style.display = "";
		unit.details.style.display = "";
	}
		
        function tableau() {
        br = document.createElement("br");
	colapsAll_link = document.createElement("a");
	colapsAll_link.setAttribute("class", "bau");
	colapsAll_link.innerHTML = localeT("COLALL")+" ";
	colapsAll_link.addEventListener("click", colapsAll, false);
	expandAll_link = document.createElement("a");
	expandAll_link.setAttribute("class", "bau");
	expandAll_link.innerHTML = localeT("EXPALL")+" ";
	expandAll_link.addEventListener("click", expandAll, false);
	detailAll_link = document.createElement("a");
	detailAll_link.setAttribute("class", "bau");
	detailAll_link.innerHTML = localeT("DETALL")+" ";
	detailAll_link.addEventListener("click", detailAll, false);
	insertAfter(detailAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(expandAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(colapsAll_link, units[0].image.parentNode.offsetParent.previousSibling)
	insertAfter(br, units[0].image.parentNode.offsetParent.previousSibling)
	
	if(GM_Value_OPTIH == "colaps") colapsAll();
	if(GM_Value_OPTIH == "expand") expandAll();
	if(GM_Value_OPTIH == "detail") detailAll();

        }
        
	tables = document.getElementsByTagName("table");
	units = Array();
	for(i in tables)  if (tables[i].width == 700 && tables[i].innerHTML.indexOf("Recherche active") ==-1)  
        units.push(new Unit(tables[i], units.length));
        tableau();
        
}
function BattleReport() { 
 
html = document.body.innerHTML;
html = html.replace(/<table border=\"0\" cellpadding=\"4\" cellspacing=\"0\">/g, '[table border=1]');
html = html.replace(/<td class=\"nachricht\">/g, '[td]');
html = html.replace(/<th class=\"rahmen\" width=\"50\">/g, '[td width=50]');
html = html.replace(/<th class=\"rahmen\">/g, '[td]');
html = html.replace(/<a class=\"bau\">/g, ''); 
html = html.replace(/<hr width=\"50%\">/g, ''); 
html = html.replace(/<b><font color=\"red\">/g, '[b][color=red]');  
html = html.replace(/<font color=\"#cc9900\">/g, '[color=#cc9900]');
html = html.replace(/<\/font>/g, '[/color]'); 
html = html.replace(/<\/b>/g, '[/b]'); 
html = html.replace(/<\/td>/g, '[/td]');
html = html.replace(/<\/th>/g, '[/td]');
html = html.replace(/<tr>/g, '[tr]');
html = html.replace(/<\/tr>/g, '[/tr]');
html = html.replace(/<\/table>/g, '[/table]');
html = html.replace(/<\/div>/g, '[/center]');
html = html.replace(/<div align=\"center\">/g, '[center]');
html = html.replace(/<!-- affiliatePopupTag -->/g, '');
html = html.replace(/<br>/g, '\n');
html = html.replace(/<tbody>/g, '');
html = html.replace(/<\/tbody>/g, '');
html = html.replace(/<\/a>/g, ''); 
html = html.replace(/&nbsp;/g, ' '); 
html = html.replace(/&/g, '&amp;'); 
html = html.replace(/</g, '&lt;'); 
html = html.replace(/>/g, '&gt;'); 
html = html.replace(/\t/g, ''); 
html = html.replace(/\n\n\n/g, ''); 



        xtb0 = document.createElement("div");
	xtb0.innerHTML = '<form action="noaction"><center><textarea id="bbcode" cols="80" rows="6">'+html+'</textarea><br /><br /><input type="button"  class="planet" value="Sélectionner tout le bbCode" onClick="javascript:bbcode.focus();bbcode.select();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input  class="planet" type="button" value="Fermer" onClick="self.close()" name="button"></center></form>' ;

 	insertAfter(xtb0, document.getElementsByTagName("div")[0]);  

}


function Home() {

        delay=360; timer=null;
        startTimer=function() { timer=window.setTimeout(function(){ window.location.reload(); }, delay*1000); };
        stopTimer=function() { window.clearTimeout(timer); };
        restartTimer=function() { stopTimer(); startTimer(); };
        startTimer();
      }

function Toplist() {
	opt1500 = document.createElement("option");
	opt1500.setAttribute("class", "planet");
	opt1500.setAttribute("value", "1500");
	document.getElementsByName("place")[0].appendChild(opt1500);
	opt1500.innerHTML = "1501-1600";

	opt1600 = document.createElement("option");
	opt1600.setAttribute("class", "planet");
	opt1600.setAttribute("value", "1600");
	document.getElementsByName("place")[0].appendChild(opt1600);
	opt1600.innerHTML = "1601-1700";

	opt1700 = document.createElement("option");
	opt1700.setAttribute("class", "planet");
	opt1700.setAttribute("value", "1700");
	document.getElementsByName("place")[0].appendChild(opt1700);
	opt1700.innerHTML = "1701-1800";

	opt1800 = document.createElement("option");
	opt1800.setAttribute("class", "planet");
	opt1800.setAttribute("value", "1800");
	document.getElementsByName("place")[0].appendChild(opt1800);
	opt1800.innerHTML = "1801-1900";

	opt1900 = document.createElement("option");
	opt1900.setAttribute("class", "planet");
	opt1900.setAttribute("value", "1900");
	document.getElementsByName("place")[0].appendChild(opt1900);
	opt1900.innerHTML = "1901-2000";

	opt2000 = document.createElement("option");
	opt2000.setAttribute("class", "planet");
	opt2000.setAttribute("value", "2000");
	document.getElementsByName("place")[0].appendChild(opt2000);
	opt2000.innerHTML = "2001-2100";

	opt2100 = document.createElement("option");
	opt2100.setAttribute("class", "planet");
	opt2100.setAttribute("value", "2100");
	document.getElementsByName("place")[0].appendChild(opt2100);
	opt2100.innerHTML = "2101-2200";

	opt2200 = document.createElement("option");
	opt2200.setAttribute("class", "planet");
	opt2200.setAttribute("value", "2200");
	document.getElementsByName("place")[0].appendChild(opt2200);
	opt2200.innerHTML = "2201-2300";

	opt2300 = document.createElement("option");
	opt2300.setAttribute("class", "planet");
	opt2300.setAttribute("value", "2300");
	document.getElementsByName("place")[0].appendChild(opt2300);
	opt2300.innerHTML = "2301-2400";

	opt2400 = document.createElement("option");
	opt2400.setAttribute("class", "planet");
	opt2400.setAttribute("value", "2400");
	document.getElementsByName("place")[0].appendChild(opt2400);
	opt2400.innerHTML = "2401-2500";

	opt2500 = document.createElement("option");
	opt2500.setAttribute("class", "planet");
	opt2500.setAttribute("value", "2500");
	document.getElementsByName("place")[0].appendChild(opt2500);
	opt2500.innerHTML = "2501-2600";

	opt2600 = document.createElement("option");
	opt2600.setAttribute("class", "planet");
	opt2600.setAttribute("value", "2600");
	document.getElementsByName("place")[0].appendChild(opt2600);
	opt2600.innerHTML = "2601-2700";

	opt2700 = document.createElement("option");
	opt2700.setAttribute("class", "planet");
	opt2700.setAttribute("value", "2700");
	document.getElementsByName("place")[0].appendChild(opt2700);
	opt2700.innerHTML = "2701-2800";

	opt2800 = document.createElement("option");
	opt2800.setAttribute("class", "planet");
	opt2800.setAttribute("value", "2800");
	document.getElementsByName("place")[0].appendChild(opt2800);
	opt2800.innerHTML = "2801-2900";

	opt2900 = document.createElement("option");
	opt2900.setAttribute("class", "planet");
	opt2900.setAttribute("value", "2900");
	document.getElementsByName("place")[0].appendChild(opt2900);
	opt2900.innerHTML = "2901-3000";

	opt3000 = document.createElement("option");
	opt3000.setAttribute("class", "planet");
	opt3000.setAttribute("value", "3000");
	document.getElementsByName("place")[0].appendChild(opt3000);
	opt3000.innerHTML = "3001-3100";

	opt3100 = document.createElement("option");
	opt3100.setAttribute("class", "planet");
	opt3100.setAttribute("value", "3100");
	document.getElementsByName("place")[0].appendChild(opt3100);
	opt3100.innerHTML = "3101-3200";

	opt3200 = document.createElement("option");
	opt3200.setAttribute("class", "planet");
	opt3200.setAttribute("value", "3200");
	document.getElementsByName("place")[0].appendChild(opt3200);
	opt3200.innerHTML = "3201-3300";

	opt3300 = document.createElement("option");
	opt3300.setAttribute("class", "planet");
	opt3300.setAttribute("value", "3300");
	document.getElementsByName("place")[0].appendChild(opt3300);
	opt3300.innerHTML = "3301-3400";

	opt3400 = document.createElement("option");
	opt3400.setAttribute("class", "planet");
	opt3400.setAttribute("value", "3400");
	document.getElementsByName("place")[0].appendChild(opt3400);
	opt3400.innerHTML = "3401-3500";

	opt3500 = document.createElement("option");
	opt3500.setAttribute("class", "planet");
	opt3500.setAttribute("value", "3500");
	document.getElementsByName("place")[0].appendChild(opt3500);
	opt3500.innerHTML = "3501-3600";

	opt3600 = document.createElement("option");
	opt3600.setAttribute("class", "planet");
	opt3600.setAttribute("value", "3600");
	document.getElementsByName("place")[0].appendChild(opt3600);
	opt3600.innerHTML = "3601-3700";

	opt3700 = document.createElement("option");
	opt3700.setAttribute("class", "planet");
	opt3700.setAttribute("value", "3700");
	document.getElementsByName("place")[0].appendChild(opt3700);
	opt3700.innerHTML = "3701-3800";

	opt3800 = document.createElement("option");
	opt3800.setAttribute("class", "planet");
	opt3800.setAttribute("value", "3800");
	document.getElementsByName("place")[0].appendChild(opt3800);
	opt3800.innerHTML = "3801-3900";

	opt3900 = document.createElement("option");
	opt3900.setAttribute("class", "planet");
	opt3900.setAttribute("value", "3900");
	document.getElementsByName("place")[0].appendChild(opt3900);
	opt3900.innerHTML = "3901-4000";

	opt4000 = document.createElement("option");
	opt4000.setAttribute("class", "planet");
	opt4000.setAttribute("value", "4000");
	document.getElementsByName("place")[0].appendChild(opt4000);
	opt4000.innerHTML = "4001-4100";

	opt4100 = document.createElement("option");
	opt4100.setAttribute("class", "planet");
	opt4100.setAttribute("value", "4100");
	document.getElementsByName("place")[0].appendChild(opt4100);
	opt4100.innerHTML = "4101-4200";

	opt4200 = document.createElement("option");
	opt4200.setAttribute("class", "planet");
	opt4200.setAttribute("value", "4200");
	document.getElementsByName("place")[0].appendChild(opt4200);
	opt4200.innerHTML = "4201-4300";

	opt4300 = document.createElement("option");
	opt4300.setAttribute("class", "planet");
	opt4300.setAttribute("value", "4300");
	document.getElementsByName("place")[0].appendChild(opt4300);
	opt4300.innerHTML = "4301-4400";

	opt4400 = document.createElement("option");
	opt4400.setAttribute("class", "planet");
	opt4400.setAttribute("value", "3400");
	document.getElementsByName("place")[0].appendChild(opt4400);
	opt4400.innerHTML = "4401-4500";

	opt4500 = document.createElement("option");
	opt4500.setAttribute("class", "planet");
	opt4500.setAttribute("value", "4500");
	document.getElementsByName("place")[0].appendChild(opt4500);
	opt4500.innerHTML = "4501-4600";

	opt4600 = document.createElement("option");
	opt4600.setAttribute("class", "planet");
	opt4600.setAttribute("value", "4600");
	document.getElementsByName("place")[0].appendChild(opt4600);
	opt4600.innerHTML = "4601-4700";

	opt4700 = document.createElement("option");
	opt4700.setAttribute("class", "planet");
	opt4700.setAttribute("value", "4700");
	document.getElementsByName("place")[0].appendChild(opt4700);
	opt4700.innerHTML = "4701-4800";

	opt4800 = document.createElement("option");
	opt4800.setAttribute("class", "planet");
	opt4800.setAttribute("value", "4800");
	document.getElementsByName("place")[0].appendChild(opt4800);
	opt4800.innerHTML = "4801-4900";

	opt4900 = document.createElement("option");
	opt4900.setAttribute("class", "planet");
	opt4900.setAttribute("value", "4900");
	document.getElementsByName("place")[0].appendChild(opt4900);
	opt4900.innerHTML = "4901-5000";
      }

function insertAfter(newNode, node) {return node.parentNode.insertBefore(newNode, node.nextSibling);}
function firstNodeOf(html){firstNodeOf.dummyDiv.innerHTML = html; return firstNodeOf.dummyDiv.firstChild;}
firstNodeOf.dummyDiv = document.createElement('div');
function localeT (text) {return (locale[text])?locale[text]:locale_fr[text];}
function include (text) {return location.href.indexOf("action=internal"+text+"&")+1;}
function exclude (text) {return location.href.indexOf("action=internal"+text+"&")==-1;}
var i, j;
var locale;
GM_Value_OPTHI = GM_getValue("OPTHI", "detail");
GM_Value_OPTIH = GM_getValue("OPTIH", "detail");
GM_Value_OPTSH = GM_getValue("OPTSH", "1");
GM_Value_OPTLANG = GM_getValue("OPTLANG", "fr");
Languages();

if(include("Menu")) Menu();
if(exclude("Menu") && exclude("Planets") && exclude("BattleReport")) Options();
if(exclude("Menu") && exclude("Messages") && exclude("Planets")) MessageLinks();
if(include("Fleet")) SaveHelper();
if(include("WeaponFactory") || include("Defense")) Weapon();
if(include("Buildings")) Buildings();
if(include("BattleReport")) BattleReport(); 
if(include("Research")) Research();
if(include("Settings")) Settings();
if(include("Home")) Home();
if(include("Toplist")) Toplist();
