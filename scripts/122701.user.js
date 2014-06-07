// ==UserScript==
// @name           TavernFilter
// @namespace      Tamozhnya1
// @description    Фильтр заявок в таверне
// @include        http://*heroeswm.*/tavern.php*
// @include        http://173.231.37.114/tavern.php*
// @include        http://178.248.235.15/tavern.php*
// @include        http://*герои.рф/tavern.php*
// ==/UserScript==

var TavernFilterOptionsId = "TavernFilterOptionsId";
areas = ["Bear Mountain", "Dragon's Caves", "Eagle's Nest", "East River", "Empire Capital", "Fairy Trees", "Fishing Village", "Green Wood", "Kingdom Capital", "Kingdom Castle",
 "Lizard's Lowland", "Magma Mines", "Mythril Coast", "Peaceful Camp", "Port City", "Portal's Ruins", "Rogue's Wood", "Shining Spring", "Sunny City", "Tiger's Lake", "Titans' Valley", "Wolf's Dale"]
showAreasObject = getShowAreasObject();
options = getOptions();
 
main();
function main() {
	init();
}
function getShowAreasObject() {
	var showAreasObject = {};
	for(var i = 0; i < areas.length; i++) {
		showAreasObject[areas[i]] = GM_getValue("show" + areas[i], false);
	}
	return showAreasObject;
}
function getOptions() {
	var options = {
		minBet: GM_getValue("minBet", -1),
		maxBet: GM_getValue("maxBet", -1),
		gameType: GM_getValue("gameType", -1),
		minLevel: GM_getValue("minLevel", -1),
		maxLevel: GM_getValue("maxLevel", -1),
		minTime: GM_getValue("minTime", -1),
		maxTime: GM_getValue("maxTime", -1),
	};
	return options;
}
function init() {
	var requestObjects = getRequestObjects();
	addOptionsButton();
	applyFilter(requestObjects, showAreasObject);
}
function hideFilterOptions() {
	var bg = document.getElementById(TavernFilterOptionsId + "1");
	var bgc = document.getElementById(TavernFilterOptionsId + "2");
	bg.style.display = bgc.style.display = 'none';
}
function showFilterOptions() {
	var bg = document.getElementById(TavernFilterOptionsId + "1");
	var bgc = document.getElementById(TavernFilterOptionsId + "2");
	if(bg) {
		bg.style.display = bgc.style.display = 'block';
		return;
	}
	bg = addElement("div", document.body, {id: TavernFilterOptionsId + "1"}, "position: absolute; left: 0pt; width: 100%; background: none repeat scroll 0% 0% red; opacity: 0.5; top: 0px; height: 882px; display: block;");
	bg.addEventListener("click", hideFilterOptions, false);

	bgc = addElement("div", document.body, {id: TavernFilterOptionsId + "2"}, "position: absolute; width: 650px; background: none repeat scroll 0% 0% rgb(246, 243, 234); left: " +
	((document.body.offsetWidth - 650) / 2) + "px; top: 150px; display: block;");
	var div1 = addElement("div", bgc, {id: TavernFilterOptionsId + "3"}, "border: 1px solid #abc; padding: 5px; margin: 2px;");
	
	var divClose = addElement("div", div1, {id: TavernFilterOptionsId + "close", title: "Close", innerHTML: "x"}, "float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;");
	divClose.addEventListener("click", hideFilterOptions, false);
	
	addElement("center", div1, {innerHTML: ustring("<b>Выберите районы</b>")});
	var table = addElement("table", div1);
	var i = 0;
	for(var key in showAreasObject) {
		i++;
		if(i % 4 == 1) {
			var tr = addElement("tr", table);
		}
		addElement("td", tr, {innerHTML: key})
		var td = addElement("td", tr);
		var checkbox = addElement("input", td, {type: "checkbox", area: key});
		if(showAreasObject[key]) {
			checkbox.setAttribute("checked", "checked");
		}
		checkbox.addEventListener("click", showFilterOptionsCheckArea, false);
	}
	// Уровень противника
	var table = addElement("table", div1); 
	var tr = addElement("tr", table);
	addElement("td", tr, {innerHTML: ustring("<b>Уровень противника от: </b>")});
	var minLevel = addElement("select", addElement("td", tr));
	minLevel.addEventListener("change", function() {GM_setValue("minLevel", parseInt(this.value)); options.minLevel = parseInt(this.value);}, false);

	addElement("td", tr, {innerHTML: ustring("<b>до: </b>")});
	var maxLevel = addElement("select", addElement("td", tr));
	maxLevel.addEventListener("change", function() {GM_setValue("maxLevel", parseInt(this.value)); options.maxLevel = parseInt(this.value);}, false);
	var obj = {};
	obj[-1] = ustring("Любой");
	for(var i = 0; i <= 15; i++) {
		obj[i.toString()] = i.toString();
	}
	for(var key in obj) {
		var option = addElement("option", minLevel, {value: parseInt(key), innerHTML: obj[key]});
		if(key == options.minLevel) {
			option.setAttribute("selected", "selected");
		}
		var option = addElement("option", maxLevel, {value: parseInt(key), innerHTML: obj[key]});
		if(key == options.maxLevel) {
			option.setAttribute("selected", "selected");
		}
	}
	// Тип игры
	var tr = addElement("tr", table);
	addElement("td", tr, {innerHTML: ustring("<b>Тип игры: </b>")});
	var gameType = addElement("select", addElement("td", tr));
	gameType.addEventListener("change", function() {GM_setValue("gameType", parseInt(this.value)); options.gameType = parseInt(this.value);}, false);
	var obj = {"-1": ustring("Любой"), "1": ustring("Игра с одной колодой"), "8": ustring("Игра с бесконечной колодой")};
	for(var key in obj) {
		var option = addElement("option", gameType, {value: parseInt(key), innerHTML: obj[key]});
		if(key == options.gameType) {
			option.setAttribute("selected", "selected");
		}
	}
	// Время на ход
	var tr = addElement("tr", table);
	addElement("td", tr, {innerHTML: ustring("<b>Время на ход от: </b>")});
	var minTime = addElement("select", addElement("td", tr));
	minTime.addEventListener("change", function() {GM_setValue("minTime", parseInt(this.value)); options.minTime = parseInt(this.value);}, false);

	addElement("td", tr, {innerHTML: ustring("<b>до: </b>")});
	var maxTime = addElement("select", addElement("td", tr));
	maxTime.addEventListener("change", function() {GM_setValue("maxTime", parseInt(this.value)); options.maxTime = parseInt(this.value);}, false);
	var obj = {"-1": "Любая", "30": "30 сек.", "45": "45 сек.", "60": "60 сек."};
	for(var key in obj) {
		var option = addElement("option", minTime, {value: parseInt(key), innerHTML: ustring(obj[key])});
		if(key == options.minTime) {
			option.setAttribute("selected", "selected");
		}
		var option = addElement("option", maxTime, {value: parseInt(key), innerHTML: ustring(obj[key])});
		if(key == options.maxTime) {
			option.setAttribute("selected", "selected");
		}
	}
	// Величина ставки
	var tr = addElement("tr", table);
	addElement("td", tr, {innerHTML: ustring("<b>Величина ставки от: </b>")});
	var minBet = addElement("select", addElement("td", tr));
	minBet.addEventListener("change", function() {GM_setValue("minBet", parseInt(this.value)); options.minBet = parseInt(this.value);}, false);

	addElement("td", tr, {innerHTML: ustring("<b>до: </b>")});
	var maxBet = addElement("select", addElement("td", tr));
	maxBet.addEventListener("change", function() {GM_setValue("maxBet", parseInt(this.value)); options.maxBet = parseInt(this.value);}, false);
	var obj = {"-1": "Любая", "0": "0 золота", "40": "40 золота", "200": "200 золота", "400": "400 золота", "600": "600 золота", "1000": "1000 золота",
		"2000": "2000 золота", "3000": "3000 золота", "4000": "4000 золота", "5000": "5000 золота", "6000": "6000 золота", "7000": "7000 золота",
		"10000": "10000 золота", "11000": "11000 золота", "12000": "12000 золота", "20000": "20000 золота"};
	for(var key in obj) {
		var option = addElement("option", minBet, {value: parseInt(key), innerHTML: ustring(obj[key])});
		if(key == options.minBet) {
			option.setAttribute("selected", "selected");
		}
		var option = addElement("option", maxBet, {value: parseInt(key), innerHTML: ustring(obj[key])});
		if(key == options.maxBet) {
			option.setAttribute("selected", "selected");
		}
	}	
}
function showFilterOptionsCheckArea() {
	var area = this.getAttribute("area");
	showAreasObject[area] = this.checked;
	GM_setValue("show" + area, this.checked);
}
function addOptionsButton() {
	var a = document.getElementsByTagName("a");
	var refresh;
	for(var i = 0; i < a.length; i++) {
		if(a[i].innerHTML == ustring("Обновить")) {
			refresh = a[i];
			break;
		}
	}
	if(!refresh) {
		alert(1)
		return;
	}
	refresh.parentNode.appendChild(document.createTextNode(" / "));
	var showOptions = addElement("a", refresh.parentNode, {href: "javascript:void(0)", innerHTML: ustring("Настрока фильтра")});
	showOptions.addEventListener("click", showFilterOptions, false);
}
function getRequestObjects() {
	var requestsTable = document.querySelector("table[class='wb']");
	if(!requestsTable) {
		alert(ustring("Не найдена таблица ставок"));
		return;
	}
	var requestObjects = [];
	var currentTavern;
	var currentTavernCell;
	for(var i = 2; i < requestsTable.rows.length; i++) {
		var row = requestsTable.rows[i];
		var cell0 = row.cells[0];
		var rowspan = cell0.getAttribute("rowspan");
		var offSet = 0;
		if(rowspan) {
			offSet = 1;
			currentTavern = cell0.innerHTML;
			currentTavernCell = row.cells[0];
		}
		if(!currentTavern) {
			continue;
		}
		var level = parseInt(row.cells[0 + offSet].querySelector("i").innerHTML.replace("(", "").replace(")", ""));
		//alert(level)
		var gameType = row.cells[1 + offSet].querySelector("img[src$='1koloda.png']") ? 1 : 8;
		var time = parseInt(row.cells[2 + offSet].innerHTML);
		var bet = parseInt(row.cells[3 + offSet].firstChild.firstChild.firstChild.firstChild.nextSibling.innerHTML.replace(",", ""));
		var mayEnter = row.cells[4 + offSet].querySelector("a[href^='join_to_card_game.php']") ? true : false;
		//alert(currentTavern + " " + gameType + " " + time + " " + bet + " " + mayEnter)
		requestObject = {
			tavern: currentTavern,
			level: level,
			gameType: gameType,
			time: time,
			bet: bet,
			mayEnter: mayEnter,
			mayHide: !rowspan,
			row: row,
		}
		requestObjects[requestObjects.length] = requestObject;
	}
	return requestObjects;
}
function applyFilter(requestObjects, showAreasObject) {
	for(var i = 0; i < requestObjects.length; i++) {
		var requestObject = requestObjects[i];
		if(!showAreasObject[requestObject.tavern]) {
			requestObject.row.style.display = "none";
		}
		if(requestObject.mayEnter
		&& (options.gameType == -1 || options.gameType == requestObject.gameType)
		&& (options.minLevel == -1 || options.minLevel <= requestObject.level)
		&& (options.maxLevel == -1 || options.maxLevel >= requestObject.level)
		&& (options.minTime == -1 || options.minTime <= requestObject.time)
		&& (options.maxTime == -1 || options.maxTime >= requestObject.time)
		&& (options.minBet == -1 || options.minBet <= requestObject.bet)
		&& (options.maxBet == -1 || options.maxBet >= requestObject.bet)
		) {
			requestObject.row.style.backgroundColor = "green";
		}
	}
}
function uchar(s) {
	switch (s[0]) {case "А": return "\u0410"; case "Б": return "\u0411"; case "В": return "\u0412"; case "Г": return "\u0413"; case "Д": return "\u0414"; case "Е": return "\u0415"; case "Ж": return "\u0416"; case "З": return "\u0417"; case "И": return "\u0418"; case "Й": return "\u0419"; case "К": return "\u041a"; case "Л": return "\u041b"; case "М": return "\u041c"; case "Н": return "\u041d"; case "О": return "\u041e"; case "П": return "\u041f"; case "Р": return "\u0420"; case "С": return "\u0421"; case "Т": return "\u0422"; case "У": return "\u0423"; case "Ф": return "\u0424"; case "Х": return "\u0425"; case "Ц": return "\u0426"; case "Ч": return "\u0427"; case "Ш": return "\u0428"; case "Щ": return "\u0429"; case "Ъ": return "\u042a"; case "Ы": return "\u042b"; case "Ь": return "\u042c"; case "Э": return "\u042d"; case "Ю": return "\u042e"; case "Я": return "\u042f"; case "а": return "\u0430"; case "б": return "\u0431"; case "в": return "\u0432"; case "г": return "\u0433"; case "д": return "\u0434"; case "е": return "\u0435"; case "ж": return "\u0436"; case "з": return "\u0437"; case "и": return "\u0438"; case "й": return "\u0439"; case "к": return "\u043a"; case "л": return "\u043b"; case "м": return "\u043c"; case "н": return "\u043d"; case "о": return "\u043e"; case "п": return "\u043f"; case "р": return "\u0440"; case "с": return "\u0441"; case "т": return "\u0442"; case "у": return "\u0443"; case "ф": return "\u0444"; case "х": return "\u0445"; case "ц": return "\u0446"; case "ч": return "\u0447"; case "ш": return "\u0448"; case "щ": return "\u0449"; case "ъ": return "\u044a"; case "ы": return "\u044b"; case "ь": return "\u044c"; case "э": return "\u044d"; case "ю": return "\u044e"; case "я": return "\u044f"; case "Ё": return "\u0401"; case "ё": return "\u0451"; default: return s[0];}}
function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}
function addElement(type, parent, data, style) {
	var el = document.createElement(type);
	if(parent) {
		parent.appendChild(el);
	}
	if(data) for(var key in data) {
		if(key != "innerHTML") {
			el.setAttribute(key, data[key]);
		}
	}
	if(data && data.innerHTML) {
		el.innerHTML = data.innerHTML;
	}
	if(style && el.id) {
		if(typeof(style) == "string") {
			GM_addStyle("#" + el.id + "{" + style + "}");
		} else {
			var styleStr = "";
			for(var key in style) {
				styleStr += key + ": " + style[key] + "; ";
			}
			GM_addStyle("#" + el.id + "{" + styleStr + "}");
		}
	}
	return el;
}