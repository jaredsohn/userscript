// ==UserScript==
// @name		Space Invasion Helper
// @namespace	SIHelper
// @include	*.spaceinvasion.*/indexInternal.es?action=internal*
// @description	Скрипт помогает новичкам(и не только) играть в SpaceInvasion
// @version	2.5
// ==/UserScript==

function Languages() {
	locale_ru = Array();
	locale_ru["SH"] = "Save Helper";
	locale_ru["TITLE0"] = "Транспорт";
	locale_ru["TITLE1"] = "Руда";
	locale_ru["TITLE2"] = "Метал";
	locale_ru["TITLE3"] = "Криптонит";
	locale_ru["TITLE4"] = "Спайс";
	locale_ru["TITLE5"] = "<a href=\"javascript:setAllMax(1)\" class=\"bau\">Все</a>";
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
	locale_ru["OPTLANGRU"] = "Русский";
	locale_ru["OPTLANGEN"] = "Английский";
	locale_ru["OPTLANGDE"] = "Немецкий";
	locale_ru["OPTIH"] = "Режим по умолчанию";
	locale_ru["OPTIHCOL"] = "Скрыть";
	locale_ru["OPTIHEXP"] = "Показать";
	locale_ru["OPTIHDET"] = "Подробно";
	locale_ru["OPTSH"] = "Использовать иФрейм";
	locale_ru["OPTSHYES"] = "Да";
	locale_ru["OPTSHNO"] = "Нет";
	
	
	locale_en = Array();
	locale_en["SH"] = "Save Helper";
	locale_en["TITLE0"] = "Transport";
	locale_en["TITLE1"] = "Pig iron";
	locale_en["TITLE2"] = "Metal";
	locale_en["TITLE3"] = "Kryptonite";
	locale_en["TITLE4"] = "Spice";
	locale_en["TITLE5"] = "<a href=\"javascript:setAllMax(1)\" class=\"bau\">All</a>";
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
	locale_de["TITLE5"] = "<a href=\"javascript:setAllMax(1)\" class=\"bau\">Alles</a>";
	locale_de["TRANSPORT2"] = "Transmitter";
	locale_de["TRANSPORT3"] = "Großer Transporter";
	locale_de["TRANSPORT4"] = "Kleiner Transporter";
	locale_de["MESS0"] = "Spieler";
	locale_de["MESS1"] = "Allianz";
	locale_de["MESS2"] = "Spionage";
	locale_de["MESS3"] = "Kampf";
	locale_de["MESS4"] = "Flotten";
	locale_de["MESS5"] = "Admin";
	
	
	
	if(GM_Value_OPTLANG == "ru") locale = locale_ru;
	else if(GM_Value_OPTLANG == "de") locale = locale_de;
	else if(GM_Value_OPTLANG == "en") locale = locale_en;
	else if(location.href.indexOf("spaceinvasion.ru/")+1) locale = locale_ru;
	else if(location.href.indexOf("spaceinvasion.en/")+1) locale = locale_en;
	else if(location.href.indexOf("spaceinvasion.de/")+1) locale = locale_de;
	
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
		this.offsetParent.offsetParent.style.display = "none";
		GM_setValue("OPT", 0);
	}
	html = "<form action='javascript:;'>"
	+ "<table border=5 cellpadding=0 cellspacing=0 style='left: 400px; top: 300px; display: none; position: fixed;'>"
	+ "<tr><td class='rahmen' colspan=2>"+localeT("OPT")+"</td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTLANG")+"</td><td class='nachricht' align='right'><select name='lang'>"
	+ "<option value='auto'>"+localeT("OPTLANGAU")+"</option>"
	+ "<option value='ru'"+((GM_Value_OPTLANG == "ru")?" selected":"")+">"+localeT("OPTLANGRU")+"</option>"
	+ "<option value='en'"+((GM_Value_OPTLANG == "en")?" selected":"")+">"+localeT("OPTLANGEN")+"</option>"
	+ "<option value='de'"+((GM_Value_OPTLANG == "de")?" selected":"")+">"+localeT("OPTLANGDE")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2>SaveHelper:</td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTSH")+"</td><td class='nachricht' align='right'><select name='sh'>"
	+ "<option value='1'>"+localeT("OPTSHYES")+"</option>"
	+ "<option value='0'"+((GM_Value_OPTSH == "0")?" selected":"")+">"+localeT("OPTSHNO")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2>InfoHider:</td></tr>"
	+ "<tr><td class='nachricht'>"+localeT("OPTIH")+"</td><td class='nachricht' align='right'><select name='ih'>"
	+ "<option value='colaps'>"+localeT("OPTIHCOL")+"</option>"
	+ "<option value='expand'"+((GM_Value_OPTIH == "expand")?" selected":"")+">"+localeT("OPTIHEXP")+"</option>"
	+ "<option value='detail'"+((GM_Value_OPTIH == "detail")?" selected":"")+">"+localeT("OPTIHDET")+"</option>"
	+ "</select></td></tr>"
	+ "<tr><td class='rahmen' colspan=2 align='right'><input class='planet' value='"+localeT("OPTOK")+"' type='submit'> <input class='planet' value='"+localeT("OPTCANS")+"' type='submit'></td></tr>"
	+ "</table></form>";
	x = firstNodeOf(html);
	
	document.body.appendChild(x);
	x.getElementsByTagName("input")[0].addEventListener("click", submOpt, false);
	x.getElementsByTagName("input")[1].addEventListener("click", hideOpt, false);
	if(GM_getValue("OPT", 0)) showOpt();
}
function Menu() {
	function linkClick() {
		GM_setValue("OPT", 1);
	}
	tr = document.createElement("tr");
	td = document.createElement("td");
	td.setAttribute("class", "nachricht");
	tr.appendChild(td);
	td.innerHTML = "<a href='http://www.si-master.com/ru/' target='_blank' class='menu'>SI-Master</a>";
	tr2 = document.createElement("tr");
	td2 = document.createElement("td");
	td2.setAttribute("class", "nachricht");
	tr2.appendChild(td2);
	td2.innerHTML = "<a href='"+document.getElementsByTagName("a")[0].href+"' class='menu'>"+localeT("OPT")+"</a>";
	td2.firstChild.addEventListener("click", linkClick, false);
	insertAfter(tr, document.getElementsByTagName("tr")[26]);
	insertAfter(tr2, document.getElementsByTagName("tr")[23]);
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
		if(t<col)	return "<a href=\"javascript:setMax('ship_"+sh+"', "+t+")\" style='color:red' class=\"bau\">"+col+"</a>";
		else return "<a href=\"javascript:setMax('ship_"+sh+"', "+col+")\" class=\"bau\">"+col+"</a>";
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
	sfhTableTbodyTr5TdForm.setAttribute("action", "http://www.si-master.com/index.php");
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
	var mess=document.getElementsByTagName("a").item(0);
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
function InfoHider() {
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
		img = "data:image/gif;base64,"
		+ "R0lGODlhZABkAJEAABgzTBcyTBYxS////yH5BAEAAAMALAAAAABkAGQAAAL/lI+py+0PzZi0WptA"
		+ "3Lz7C17eSJZMiA7myn6p2Mby+VbzjQs1lffxrvIJTbuhkVQ7KjuvpTOSekodqKl1EbpqEaCtV4f5"
		+ "bsNira08nqC96vU1oHOP5Wb6NWiX4vPOPV/p92cUKChEWNhziIijuDjT6PgTOQQ5uVJpWYKZObLJ"
		+ "yfTJGHrjOQpRakqVKrnKgtqq8ArLNUtUq3mLlNu5+9EL+rsheztcWzx7DJvcurzanPpsGj06HVr9"
		+ "ec2Znblt2T35HRnuOL5YjnhemC64/tfO954XbzdPVy9375a/to/WX/ZPTMAvA9kEE3YQSsJTCx8U"
		+ "nNOwwcM6EU9UtHgxVkaNCBtpdTww8U4BADs=";
		rootTable.getElementsByTagName("td")[6].setAttribute("background", img);
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
	
	tables = document.getElementsByTagName("table");
	units = Array();
	for(i in tables) if(tables[i].width == 700 && tables[i].innerHTML.indexOf("Список строительств")==-1) units.push(new Unit(tables[i], units.length));
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

function insertAfter(newNode, node) {return node.parentNode.insertBefore(newNode, node.nextSibling);}
function firstNodeOf(html){firstNodeOf.dummyDiv.innerHTML = html; return firstNodeOf.dummyDiv.firstChild;}
firstNodeOf.dummyDiv = document.createElement('div');
function localeT (text) {return (locale[text])?locale[text]:locale_ru[text];}
function include (text) {return location.href.indexOf("action=internal"+text+"&")+1;}
function exclude (text) {return location.href.indexOf("action=internal"+text+"&")==-1;}
var i, j;
var locale;
GM_Value_OPTIH = GM_getValue("OPTIH", "colaps");
GM_Value_OPTSH = GM_getValue("OPTSH", "1");
GM_Value_OPTLANG = GM_getValue("OPTLANG", "auto");
Languages();

if(include("Menu")) Menu();
if(exclude("Menu") && exclude("Planets")) Options();
if(exclude("Menu") && exclude("Messages") && exclude("Planets")) MessageLinks();
if(include("Fleet")) SaveHelper();
if(include("Buildings") || include("Research") || include("WeaponFactory") || include("Defense")) InfoHider();
