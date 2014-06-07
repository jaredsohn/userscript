// ==UserScript==
// @name           RouletteAlwaysWithYou
// @namespace      Tamozhnya1
// @version       0.96
// @description    Roulette results on all pages
// @include       http://*.heroeswm.*/*
// @include       http://173.231.37.114/*
// @include       http://178.248.235.15/*
// @include       http://*герои.рф/*
// ==/UserScript==

// Пользовательская настройка: сколько последних результатов игр хранить и показывать
var globalSavedGameCount = 10;
var rouletteRoundSavedConst = "rouletteRound";
var rouletteRoundsSavedConst = "rouletteRounds";
var intervalId;
main();
function main() {
	//deleteOldRoundObjects();
	var roundObjects = readRoundObjects();
	if(/roulette.php$/.test(location.href)) {
		setTimeShift();
		saveRoundObjects(roundObjects);
	} else if(roundObjects.length > 0){
		createUI(roundObjects);
	}
}
function createUI(roundObjects) {
	body = document.getElementsByTagName("body")[0];
	var table0 = body.getElementsByTagName("table")[0];
	var div = addElement("div", undefined, {id: "RouletteAlwaysWithYou"}, "position: absolute; margin: 0 0 0 -550");
	if(!table0) {
		var wrapper = document.getElementById("wrapper");
		body.insertBefore(div, wrapper);
	} else {
		table0.appendChild(div);
	}
	var table = addElement("table", div, {bgcolor: "#6b6b69", bordercolor: "#f5c137", color: "#f5c137", border: "1px"});
	table.addEventListener("click", function() {clearInterval(intervalId);}, false);
	addTableHeader(table, [ustring("Время"), ustring("Ставка"), ustring("Поле"), ustring("Выигрыш"), ustring("Выпало")]);
	addTableRows(table, roundObjects);
	addTableFooter(table, roundObjects);
}
function addTableHeader(table, headers) {
	var tr = addElement("tr", table);
	for(var i = 0; i < headers.length; i++) {
		var td = addElement("th", tr, {innerHTML: headers[i]});
	}
}
function addTableRows(table, roundObjects) {
	for(var i = 0; i < roundObjects.length; i++) {
		var roundObject = roundObjects[i];
		for(var j = 0; j < roundObject.length; j++) {
			var betObject = roundObject[j];
			var tr = addElement("tr", table);

			addElement("a", addElement("td", tr), {href: "inforoul.php?id=" + betObject.number, innerHTML: betObject.time.toTimeString().substr(0, 5)});
			addElement("td", tr, {innerHTML: betObject.bet});
			addElement("td", tr, {innerHTML: betObject.field});
			betObject.winCell = addElement("td", tr, {innerHTML: betObject.win});
			betObject.dropCell = addElement("td", tr, {innerHTML: betObject.drop});
		}
		if(roundObject[0].time > getServerTime()) {
			setTimeout(
				function() {
					getDOC("inforoul.php?id=" + roundObject[0].number, timeOutHandler, [roundObject, roundObjects]);
				},
				roundObject[0].time.getTime() - getServerTime().getTime() + 30 * 1000)
		}
	}
}
function addTableFooter(table, roundObjects) {
	var totalBet = 0;
	var totalWin = 0;
	for(var i = 0; i < roundObjects.length; i++) {
		var roundObject = roundObjects[i];
		for(var j = 0; j < roundObject.length; j++) {
			totalBet += val(roundObject[j].bet);
			totalWin += val(roundObject[j].win);
		}
	}
	var tr = addElement("tr", table, {id: "rouletteTotalRow"}, {font: "bold"});
	addElement("td", tr, {innerHTML: ustring("Всего:")});
	addElement("td", tr, {innerHTML: totalBet});
	addElement("td", tr, {innerHTML: "-"});
	roundObjects.totalWinCell = addElement("td", tr, {innerHTML: totalWin});
	addElement("td", tr, {innerHTML: "-"});
}
function val(value) {
	if(isNaN(value)) return 0;
	return Number(value);
}
function timeOutHandler(doc, params) {
	var roundObject = params[0];
	var roundObjects = params[1];
	var tabs = doc.querySelectorAll("table[class='wb']");
	var bets = [];
	if(tabs.length == 2) {
		bets = tabs[0].querySelectorAll("a[href='pl_info.php?id=" + roundObject[0].playerId + "']")
	}
	//alert("a[href='pl_info.php?id=" + roundObject[0].playerId + "']" + " " + bets.length)
	
	// Выпало число
	var u = doc.getElementsByTagName("u");
	var drop;
	for(var i = 0; i < u.length; i++) {
		if(u[i].innerHTML.substr(0, 13) == ustring("Выпало число ")) {
			drop = u[i].innerHTML.substr(13);
			break;
		}
	}
	// Парсим
	var betObjects = [];
	for(var i = 0; i < bets.length; i++) {
		var row = bets[i].parentNode.parentNode;
		betObjects[i] = {
			bet: row.cells[0].innerHTML.replace(",", "").replace("<b>", "").replace("</b>", ""),
			field: row.cells[2].innerHTML,
			win: row.cells[3].innerHTML.replace(",", "").replace("<b>", "").replace("</b>", ""),
			drop: drop,
		}
		//alert(betObjects[i].bet + " " + betObjects[i].field + " " + betObjects[i].win)
	}
	// Обновляем объект и таблицу
	var winTotal = 0;
	for(var i = 0; i < roundObject.length; i++) {
		for(var j = 0; j < betObjects.length; j++) {
			if(roundObject[i].field == betObjects[j].field && roundObject[i].bet == betObjects[j].bet) {
				roundObject[i].win = betObjects[j].win;
				roundObject[i].drop = betObjects[j].drop;
				roundObject[i].winCell.innerHTML = betObjects[j].win;
				roundObject[i].dropCell.innerHTML = betObjects[j].drop;
				winTotal += val(betObjects[j].win);
				
				var tr = roundObject[i].dropCell.parentNode;
				var counter = 0;
				var bgColor = tr.style.backgroundColor;
				intervalId = setInterval(
					function() {
						tr.style.backgroundColor = (counter%2 == 0) ? "red" : bgColor;
						counter++;
					}, 500);
				break;
			}
		}
	}
	roundObjects.totalWinCell.innerHTML = val(roundObjects.totalWinCell.innerHTML) + winTotal;
	saveRoundObjects(roundObjects);
}
function readRoundObjects() {
	var roundObjects = [];
	var roundsStr = GM_getValue(rouletteRoundsSavedConst);
	var lastObject;
	if(roundsStr) {
		var rounds = roundsStr.toString().split("|");
		for(var i = 0; i < rounds.length; i++) {
			var roundStr = GM_getValue(rouletteRoundSavedConst + rounds[i]);
			var bets = roundStr.split("|");
			var betObjects = [];
			for(var j = 0; j < bets.length; j++) {
				betObjects[j] = deSerializeObject(bets[j]);
			}
			roundObjects[i] = betObjects;
		}
		lastObject = roundObjects[roundObjects.length - 1];
	}
	if(/roulette.php$/.test(location.href)) {
		var currentRoundObject = readCurrentRoundObject();
		if(currentRoundObject) {
			var index;
			if(lastObject && lastObject[0].number == currentRoundObject[0].number) {
				index = roundObjects.length - 1;
			} else {
				index = roundObjects.length;
			}
			if(currentRoundObject) {
				roundObjects[index] = currentRoundObject;
			}
		}
	}
	roundObjects = roundObjects.slice(-globalSavedGameCount);
	// Для старых ставок, выигрыш которых остался неизвестен, попытаемся запросить выигрышь еще раз
	for(var i = 0; i < roundObjects.length; i++) {
		var roundObject = roundObjects[i];
		if(roundObject[0].time <= getServerTime() && (getServerTime().getTime() - roundObject[0].time.getTime() < 3 * 60 * 60 * 1000) && roundObject[0].win == "?") {
			getDOC("inforoul.php?id=" + roundObject[0].number, timeOutHandler, [roundObject, roundObjects]);
		}
	}
	return roundObjects;
}
function readCurrentRoundObject() {
	// Смотрим ставки, запоминаем ставки и время кручения
	var betTable = getBetTable(undefined, "<b>" + ustring("Ваши ставки") + "</b>");
	if(!betTable || betTable.rows.length == 2) {
		return; // Если ставок нет, ничего не делаем
	}
	var betObjects = new Array();
	// Не читаем заголовок и общую сумму ставок
	for(var i = 1, j = 0; i < betTable.rows.length - 1; i++, j++) {
		var row = betTable.rows[i];
		betObjects[j] = {
			time: getNextRoundTime(),
			number: getNextRoundNumber(),
			bet: row.cells[0].innerHTML.replace(",", ""),
			win: "?",
			field: row.cells[1].innerHTML,
			drop: "?",
			playerId: getPlayerId(),
		};
	}
	return betObjects;
}
function getPlayerId() {
	var a = document.querySelector("a[href^='pl_hunter_stat.php?id=']");
	if(!a) {
		return;
	}
	var playerId = getVarValueFromURL("id", a.href);
	return playerId;
}
function getNextRoundNumber() {
	var lastGameRef = document.querySelector("a[href^='inforoul.php']");
	if(!lastGameRef) {
		alert(ustring("Не могу найти прошлую игру"));
	}
	var lastGame = parseInt(getVarValueFromURL("id", lastGameRef.href));
	return lastGame + 1;
}
function getNextRoundTime() {
	var now = getServerTime();
	now.setSeconds(0);
	var min = now.getMinutes();
	now.setMinutes(min - min%10 + 10); // округлим в сторону возрастания до 10 минут
	return now; 
}
function getBetTable(doc, str) {
	if(!doc) {
		doc = document;
	}
	var centers = doc.getElementsByTagName("center");
	var betTable;
	for(var i = 0; i < centers.length; i++) {
		if(centers[i].innerHTML == str) {
			betTable = centers[i].nextSibling.nextSibling;
			break;
		}
	}
	return betTable;
}
function saveRoundObjects(roundObjects) {
	deleteOldRoundObjects();
	var roundsStr = "";
	for(var i = 0; i < roundObjects.length; i++) {
		var roundObject = roundObjects[i];
		var roundStr = "";
		var roundNumber = roundObject[0].number;
		for(var j = 0; j < roundObject.length; j++) {
			var betObject = roundObject[j];
			roundStr += "|" + serializeObject(betObject);
		}
		GM_setValue(rouletteRoundSavedConst + roundNumber, roundStr.substr(1));
		//alert(rouletteRoundSavedConst + roundNumber + "=" + roundStr.substr(1))
		roundsStr += "|" + roundNumber;
	}
	GM_setValue(rouletteRoundsSavedConst, roundsStr.substr(1));
}
function deleteOldRoundObjects() {
	var roundsStr = GM_getValue(rouletteRoundsSavedConst);
	if(!roundsStr) {
		return;
	}
	var rounds = roundsStr.toString().split("|");
	for(var i = 0; i < rounds.lengt; i++) {
		GM_deleteValue(rouletteRoundSavedConst + rounds[i]);
	}
	GM_deleteValue(rouletteRoundsSavedConst);
}
function getServerTime() {
  var time_shift = GM_getValue("hwm_tsec_t_shift", 0);
  return new Date(new Date().getTime() - time_shift);
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
function setTimeShift(){
	var roul_time_regexp = /&nbsp;\u0412\u0440\u0435\u043C\u044F: ([\d:]+)<br>/;
	var ts = (roul_time_regexp.exec(document.body.innerHTML))[1];
	if(ts == null){
		return;
	}
	var now = new Date();
	var srv_time = ts.split(":");
	var srvHour = Number(srv_time[0]);
	var srvMin = Number(srv_time[1]);
	var srvSec = Number(srv_time[2]);
	
	var dateConstruction = new Date();
	var serverDate = new Date();
	dateConstruction.setHours(srvHour);
	dateConstruction.setMinutes(srvMin);
	dateConstruction.setSeconds(srvSec);
	
	var fullDay = 24 * 60 * 60 * 1000;
	var twoHours = 2 * 60 * 60 * 1000;
	if(dateConstruction.getTime() - now.getTime() > twoHours) {
		serverDate = new Date(dateConstruction.getTime() - fullDay);
	} else if (now.getTime() - dateConstruction.getTime() > twoHours) {
		serverDate = new Date(dateConstruction.getTime() + fullDay);
	} else {
		serverDate = dateConstruction;
	}
	GM_setValue("hwm_tsec_t_shift", now.getTime() - serverDate.getTime());
}
function getVarValueFromURL(varName, url) {
	if(url == undefined) {
		url = window.location.toString();
	}
    var data = url.substring(url.indexOf('?') + 1);
    var vars = data.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == varName) {
            return pair[1];
        }
    }
    return null;
}
function serializeObject(obj) {
	var objectStr = "";
	for(key in obj) {
		objectStr += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
	}
	if(objectStr == "") {
		return undefined;
	}
	return objectStr.substr(1);
}
function deSerializeObject(objectStr) {
	var obj = {};
	var arr = objectStr.split("&");
	for(var i = 0; i < arr.length; i++) {
		var pair = arr[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = parseObjectValue(decodeURIComponent(pair[1]));
		obj[key] = value;
	}
	return obj;
}
function parseObjectValue(value) {
	if(/\d{4} \d{2}:\d{2}:\d{2} GMT/.test(value)) {
		value = new Date(value);
	}
	return value;
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
function getDOC(url, callback, params) {
	//alert(url)
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
		overrideMimeType: "text/html; charset=windows-1251",
        onload: function (response) {
			//GM_log(response.responseText);
			callback(htmlToContext(response.responseText), params);
        }
    });
}
function htmlToContext(source) {
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = source;
	doc.appendChild(html);
	return doc;
}