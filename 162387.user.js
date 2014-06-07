// ==UserScript==
// @author SeriousPanda
// @name WoT Extended Statistics
// @version 2.0 alpha1
// @description Скрипт добавляет множество дополнительных статистических показателей на странице профиля игрока World of Tanks.
// @match http://challenge.worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.com/uc/accounts/*
// @match http://worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.ru/community/accounts/*
// @match http://worldoftanks.com/community/accounts/*
// @match http://uc.worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/community/accounts/*
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.com/uc/accounts/*
// @include http://worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.ru/community/accounts/*
// @include http://worldoftanks.com/community/accounts/*
// @include http://uc.worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/community/accounts/*
// ==/UserScript==
// @SeriousPanda


var statTableFields = ["wgRating", "wgWinrate", "wgexperienceAvg", "wins", "battles", "capture", "damage", "defence", "frags", "spotted", "experience"];

// Базовые поля
var battleFields = ["battles", "wins", "looses", "survived"];
var effFields = ["frags", "damage", "spotted", "defence", "capture", "experience"];
// Поля рейтингов
var ratingsFields = ["eff", "eff2", "wn6", "bs"];

var nations = ["ussr", "germany", "usa", "france", "uk", "china"];
var vehicleTypes = ["lt", "mt", "ht", "at", "spg"];

var locales = {
	rus:  {
		battles:       "Проведено боёв",
		wins:          "Побед",
		winsRate:      "Процент побед",
		looses:        "Поражений",
		loosesRate:    "Процент поражений",
		survived:      "Выжил в боях",
		survivedRate:  "Процент выживаемости",
		hitRatio:      "Процент попадания",
		experienceMax: "Максимальный опыт",
		vehLevelAvg:   "Средний уровень танков",
		frags:         "Уничтожено врагов", 
		fragsAvg:      "Уничтожено за бой",
		damage:        "Нанесённый урон",
		damageAvg:     "Урон за бой",
		spotted:       "Обнаружено врагов", 
		spottedAvg:    "Обнаружено за бой",
		defence:       "Защита базы",
		defenceAvg:    "Очков защиты за бой",
		capture:       "Захват базы",
		captureAvg:    "Очков захвата за бой",
		experience:    "Общий опыт",
		experienceAvg: "Средний опыт за бой",
		effRating:     "Рейтинг эффективности (старый)",
		eff2Rating:    "Рейтинг эффективности (новый)",
		wn6Rating:     "Рейтинг WN6",
		bsRating:      "Рейтинг Бронесайта",
		
		longName:      "Название",
		nation:        "Нация",
		level:         "Уровень",
		type:          "Тип",
		allTypes:      "Все",
		lt:            "Лёгкий танк",
		ltShort:       "ЛТ",
		mt:            "Средний танк",
		mtShort:       "СТ",
		ht:            "Тяжёлый танк",
		htShort:       "ТТ",
		at:            "ПТ-САУ",
		atShort:       "ПТ",
		spg:           "САУ",
		spgShort:      "САУ"
	}
}

// Цветовая градация
var statColors = ["D042F3", "02C9B3", "60FF00", "F8F400", "FE7903", "FE0E00"];

var greenColor = "008000";
var redColor = "FF0000";
var noDiffColor = "FFA759";
var percentColor = "FFFFFF";
var defaultTextColor = "babcbf"; // Серый цвет

var directionSymbols2 = ["&#9650;","&#9660;", "&nbsp;&nbsp;"]; // ^, v (треугольники)
var directionSymbols3 = ["&#8673;","&#8675;", "&nbsp;&nbsp;"]; // ^, v (пунктирные стрелки)
var directionSymbols = ["&#9652;","&#9662;", "&nbsp;&nbsp;"]; // ^, v (маленькие треугольники)

var keyDirections = {};

var vehicleFilters = {
	typesFilter: [], 
	nationsFilter: [], 
	battlesMoreFilter: 0,

	init: function () {
		this.typesFilter = vehicleTypes.slice(0);
		this.nationsFilter = nations.slice(0);
		this.battlesMoreFilter = 0;
	}
};

var statPrecision = 3;
/**
 * Класс WotStat
 */
function WotStat() {
	// Средний уровень танков
	this.vehLevelAvg = 0;

	this.battles = 0;
	
	for (var i = 1; i < battleFields.length; i++) {
		this[battleFields[i]] = 0;
		this[battleFields[i] + "Rate"] = 0;
	}

	for (var i = 0; i < effFields.length; i++) {
		this[effFields[i]] = 0;
		this[effFields[i] + "Avg"] = 0;
	}
	for (var i = 0; i < ratingsFields.length; i++) {
		this[ratingsFields[i] + "Rating"] = 0;
	}

	// Рассчитывает всю дополнительную стату на основе 10 базовых полей
	// и поля vehLevelAvg (!)
	this.calcAll = function() {
		this.calcRates();
		this.calcAvgEff();
		this.calcRatings();
	}

	this.calc_winsRate = function() {
		this.winsRate = 100 * this.wins / this.battles;

		var grad = [64, 57, 52, 49, 47, 0];
		this.winsRateColor = this.statColor(this.winsRate, grad);
	}
	this.calcRates = function() {
		this.calc_winsRate();

		for (var i = 2; i < battleFields.length; i++) {
			var field = battleFields[i];
			this[field + "Rate"] = 100 * this[field] / this.battles;
		}
	}
	this.calcAvgEff = function() {
		for (var i = 0; i < effFields.length; i++) {
			var field = effFields[i];
			this[field + "Avg"] = this[field] / this.battles;
		}
	}
	this.calcRatings = function() {
		for (var i = 0; i < ratingsFields.length; i++) {
			this["calc_" + ratingsFields[i] + "Rating"]();
		}
	}

	// Функции расчёта для каждого из рейтингов
	// и цвета, соответствующего посчитанному значению

	this.calc_effRating = function() { with (this) {
		this.effRating =
			( damage * (10 / vehLevelAvg) * (0.15 + 2 * vehLevelAvg / 100) +
			  frags * (0.35 - 2 * vehLevelAvg / 100) * 1000 +
			  spotted * 200 +
			  capture * 150 +
			  defence * 150
			) / battles;

		var grad = [1800, 1500, 1200, 900, 600, -Infinity];
		this.effRatingColor = this.statColor(this.effRating, grad);
	}}
	this.calc_eff2Rating = function() { with (this) {
		this.eff2Rating =
			( damage * (10 / (vehLevelAvg + 2.0)) * (0.23 + vehLevelAvg * 0.02) +
			  frags * 250 +
			  spotted * 150 +
			  Math.log(capture / battles + 1.0) / Math.log(1.732) * battles * 150 +
			  defence * 150
			) / battles;

		var grad = [1725, 1465, 1150, 870, 645, -Infinity];
		this.eff2RatingColor = this.statColor(this.eff2Rating, grad);
	}}
	this.calc_wn6Rating = function() { with (this) {
		var minLvl = Math.min(vehLevelAvg, 6);
		this.wn6Rating =
			(frags * (1240 - 1040 / Math.pow(minLvl, 0.164)) +
			damage * 530 / (184 * Math.exp(0.24 * vehLevelAvg) + 130) +
			spotted * 125 +
			defence * 100) / battles +
			((185 / (0.17 + Math.exp((100 * wins / battles - 35) * (-0.134)) )) - 500) * 0.45 +
			(6 - minLvl) * (-60);

		var grad = [1880, 1595, 1195, 800, 435, -Infinity];
		this.wn6RatingColor = this.statColor(this.wn6Rating, grad);
	}}
	this.calc_bsRating = function() { with (this) {
		this.bsRating =
			Math.log(battles) / 10  * (
				experience / battles * 1 +
				damage / battles  * (
					wins / battles * 2.0 +
					frags / battles * 0.9 +
					spotted / battles * 0.5 +
					capture / battles * 0.5 +
					defence / battles * 0.5
				)
			);
	}}
	this.statColor = function(statValue, statGrad) {
		var i = 0;

		while (statValue < statGrad[i]) {
			i++;
		}
		return statColors[i];
	}
}

var stat = {};

/**
 *	Объект, будет использован как ассоциативный массив объектов:
 *	<краткое название машины> : <соответствующий "объект машины">,
 *	где "объект машины" имеет поля 
 *		shortName -- краткое название (ДУБЛИРУЕТ НАЗВАНИЕ ПОЛЯ),
 *		longName -- полное название (строка),
 *		nation -- короткое имя нации (строка),
 *		type -- короткое имя типа машины (строка),
 *		level -- уровень,
 *		isPremium -- премиумность (true/false),
 *		avgWinrate -- средний процент побед по серверу,
 *
 *	Кроме того объект имеет подобъекты статистики 
 *	curStat, oldStat, lastStat типа WotStat
 */
var vehicles = new Object();

var vehiclesInfo = {
	count: 0,             // Количество машин в "массиве" (объекте)
	wotnewsLoaded: false, // Загружена ли стата с Wot-news.com
};

/**
 *	Дата сохранения статистики. По умолчанию null. 
 *	Являетс индикатором наличия сохранённой статы (null или 
 *	реальная дата сохранения статы).
 */
var savedDate = null;
var savedDateStr = "";

var accountNumber = 0;
/************************************************************************************************************************************/
main();

function main() {
	var lang = "rus";

	stat.cur = new WotStat();
	// Получить общую текущую статистику со страницы
	getCurStat();
	// Прочитать танки, посчитать средний уровень
	getVehiclesFromTable();
	// Сделать запрос на страницу Танковедения,
	// получить для имеющихся машин информацию о типе и премиумности.
	reqRuTankopediaInfo();

	// Рассчитать все дополнительные поля статистики
	stat.cur.calcAll();

	modifyResultTable(lang);

	stat.old = new WotStat();
	stat.last = new WotStat();
	accountNumber = parseInt(document.location.href.match(/\/(\d+)/)[1]);
	var savedStat = JSON.parse(getLocalStorage("wotextstat_" + accountNumber)); //"daystat"); //"savedStat");

	if (savedStat != null) {
		// Прочитать сохранённую статистику
		getOldLastStat(savedStat);

		stat.old.calcAll();

		calcLastAvgLevel();
		stat.last.calcAll();

		if (stat.last.battles > 0) {
			modifyStatTable();
			resultTableLastStat(lang);
		}
	}
	// Модифицируем таблицу результатов и таблицу техники
	modifyVehicleTable(lang);

	// Добавляем блок с инфой о скрипте, датой сохранённой статы и кнопкой "Сохранить стату"
	addScriptInfo();
}
/************************************************************************************************************************************/

/**
 *	Функция читает таблицу оф.статистики и
 *	сохраняет текущую статистику в stat.cur
 *
 *	Также получает значения полей "Процент попадания",
 *	"Поражений" и "Выжил в боях" из таблицы результатов выше.
 */
function getCurStat() {
	var statRows = document.getElementsByClassName("t-statistic")[0].getElementsByTagName("tr");

	if (statRows.length != 12) {
		alertError("Невозможно получить статистику");
		return;
	}
	for (var i = 0; i < 11; i++) {
		stat.cur[statTableFields[i]]           = parseInt(statRows[i + 1].children[3].innerHTML.replace(/&nbsp;/g, ""));
		stat.cur[statTableFields[i] + "Place"] = parseInt(statRows[i + 1].children[4].innerHTML.replace(/&nbsp;/g, ""));
	}
	
	// Значения полей "Поражений" и "Выжил в боях"
	var battleRows = document.getElementsByClassName("t-table-dotted")[0].getElementsByTagName("tr");
	stat.cur.looses = parseInt(battleRows[3].children[1].innerHTML.replace(/&nbsp;/g, ""));
	stat.cur.survived = parseInt(battleRows[4].children[1].innerHTML.replace(/&nbsp;/g, ""));

	// Процент попадания
	stat.cur.hitRatio = 
		parseInt(document.getElementsByClassName("t-table-dotted")[1].getElementsByTagName("tr")[3].children[1].innerHTML);
}

/**
 *	Функция читает таблицу техники, добавляя каждую машину в объект (ассоциативный массив)
 *	vehicles как значение-объект поля shortName, где shortName -- полученное из таблицы краткое имя машины
 *	При этом из таблицы функция получает также значение полей 
 *	longName, nation, level, 
 *	поля battles, wins, winsRate объекта curStat,
 *	создаёт подобъекты oldStat и lastStat (с помощью конструктора).
 *
 *	Кроме того, функция подсчитвает значение stat.cur.vehLevelAvg -- 
 *	текущий средний уровень танков.
 *
 *	ВАЖНО! Если в объекте vehicles уже была запись, соответствующая машине, функция её перезапишет.
 *	Таким образом, ранее имевшаяся информация по машине будет стёрта.
 */
function getVehiclesFromTable() {
	// Уровни техники в римских цифрах, "-" для нумерации с 1
	var vehLevelsRoman = ["-", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

	var vehicleRows = document.getElementsByClassName("t-statistic")[1].getElementsByTagName("tr");
	var index = 0;
	var str = "";
	var levelSum = 0;
	var battles = 0;

	for (var i = 1; i < vehicleRows.length; i++) {
		var vehicle = new Object();
		vehicle.curStat = new WotStat();
		vehicle.oldStat = new WotStat();
		vehicle.lastStat = new WotStat();

		var tds = vehicleRows[i].getElementsByTagName("td");

		// Короткое название машины
		vehicle.shortName = vehicleRows[i].getElementsByTagName("img")[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];

		// Полное название машины
		vehicle.longName = tds[1].getElementsByTagName("a")[0].innerHTML;

		// Нация машины
		vehicle.nation = tds[0].getAttribute("class").match(/js-(.*)\s.*/)[1];
		vehicle.nationNumber = nations.indexOf(vehicle.nation);

		// Уровень машины
		str = tds[0].getElementsByClassName("level")[0].getElementsByTagName("a")[0].innerHTML.replace(" ", "");

		if ((index = vehLevelsRoman.indexOf(str)) == -1) {
			alertError("Не удалось найти уровень машины \"" + str + "\"");
			return;
		}
		vehicle.level = index;

		// Текущие кол-во боёв, побед, процент побед
		vehicle.curStat.battles = parseInt(tds[2].innerHTML.replace(/&nbsp;/g, ""));
		vehicle.curStat.wins = parseInt(tds[3].innerHTML.replace(/&nbsp;/g, ""));
		vehicle.curStat.calc_winsRate();

		// Добавляем машину в ассоциативный массив (объект) техники 
		vehicles[vehicle.shortName] = vehicle;
		vehiclesInfo.count++;

		levelSum += vehicle.level * vehicle.curStat.battles;
		battles += vehicle.curStat.battles;
	}
	// Средний уровень танков на текущий момент
	stat.cur.vehLevelAvg = levelSum / battles;
}

/**
 *	Функция делает синхронный запрос на главную страницу Танковедения 
 *	(http://worldoftanks.ru/encyclopedia/vehicles/),
 *	перебирает все указанные на ней машины,
 *	для имеющихся в vehicles машин добавляет поля isPremium и type.
 */
function reqRuTankopediaInfo() {
	// Заголовки таблиц на странице Танковедения
	var vehTypesRus = ["Легкие танки", "Средние танки", "Тяжёлые танки", "ПТ-САУ", "САУ"];

	var str = "";
	var index = 0;
	
	// Делаем один СИНХРОННЫЙ запрос
	var respXML = loadXMLDoc("http://worldoftanks.ru/encyclopedia/vehicles/");
	var a = respXML.getElementsByClassName("b-encyclopedia-list_linc");

	for (var i = 0; i < a.length; i++) {
		// Получаем краткое имя машины из ссылки ".../nation/vehicleShortName/"
		str = a[i].getAttribute("href").match(/.*\/([^\/]*)\/$/)[1];

		// Ищем информацию только для тех машин, на которых катался игрок на текущий момент
		if (str in vehicles) {
			var vehicle = vehicles[str];

			// Проверяем премиумность машины
			vehicle.isPremium = (a[i].parentNode.getAttribute("class").indexOf("premium") != -1);

			// Определяем тип машины
			str = a[i].parentNode.parentNode.parentNode.getElementsByTagName("h5")[0].innerHTML;
			index = vehTypesRus.indexOf(str);

			if (index == -1) {
				alertError("Не удалось установить тип машины \"" + vehicle.shortName + "\" на странице Танкопедии");
				return;
			}
			vehicle.type = vehicleTypes[index];
			vehicle.typeNumber = vehicleTypes.indexOf(vehicle.type);
		}
	}
}

function addScriptInfo() {
	var div = document.createElement("div");
	var nextElem = document.getElementsByClassName("b-data-date")[0].nextSibling;
	nextElem.parentNode.insertBefore(div, nextElem);

	div.id = "WotExtStatInfo";
	div.style.marginTop = "16px";
	div.style.lineHeight = "20px";

	var str =
		"Скрипт <a href=\"http://userscripts.org/scripts/show/162387\">\"WoT Extended Stat\"</a> " +
		"(версия 2.0 alpha1, " +
		"автор &mdash; <a href=\"http://worldoftanks.ru/community/accounts/1313004-SeriousPanda/\">SeriousPanda</a>)";
	div.appendChild(styledSpanNode(str, {}));
	addBr(div);

	str = "Сравнение со статистикой на момент: ";
	if (savedDate != null) {
		str += savedDateStr;

		if (stat.last.battles == 0) {
			str += " (Новых боёв нет)";
		}
	} else {
		str += styledSpanHTML("< нет сохранённой статистики >", {"color": "#606061"});
	}

	div.appendChild(styledSpanNode(str, {}));
	addBr(div);

	var button = document.createElement("button");
	button.innerHTML = "Сохранить текущую статистику";
	button.onclick = function () {
		writeSavedStat();
	};
	div.appendChild(button);
}
function addBr(node) {
	var br = document.createElement("br");
	node.appendChild(br);	
}

/**
 *	Функция модифицирует таблицу оф.статистики: добавляет две колонки с 
 *	изменениями соответственно значения и места с цветовой индикацией.
 *
 *	ВАЖНО! Для корректной работы функции необходимо наличие сохранённой статистики.
 */
function modifyStatTable() {
	var statRows = document.getElementsByClassName("t-statistic")[0].getElementsByTagName("tr");
	var ths = statRows[0].getElementsByTagName("th");
	
	// Заголовок "Значение"
	ths[1].setAttribute("colspan", "2");
	ths[1].removeAttribute("class");
	ths[1].setAttribute("style", "text-align: center;");

	// Заголовок "Место"
	ths[2].setAttribute("colspan", "2");
	ths[2].removeAttribute("class");
	ths[2].setAttribute("style", "text-align: center;");

	var diff = 0;
	var str = "";

	for (var i = 1; i < 12; i++) {
		var tds = statRows[i].getElementsByTagName("td");

		// Изменение значения, нейтральный цвет
		var newtd = document.createElement("td");
		diff = stat.cur[statTableFields[i - 1]] - stat.old[statTableFields[i - 1]];
		newtd.className = "value";
		newtd.setAttribute("style", "text-align: left;");
		newtd.innerHTML = colorizeHTML("FFA759", ((diff > 0) ? "+" + diff : "---"));
		statRows[i].insertBefore(newtd, tds[4]);

		// Изменение места
		var newtd = document.createElement("td");
		diff = stat.cur[statTableFields[i - 1] + "Place"] - stat.old[statTableFields[i - 1] + "Place"];
		newtd.className = "value";
		newtd.setAttribute("style", "text-align: left;");

		if (diff == 0) {
			newtd.innerHTML += colorizeHTML(noDiffColor, "---");
		} else {
			// Больше 0 -- красный, иначе зелёный
			newtd.innerHTML += colorizeRedGreen(diff, 0);
		}
		statRows[i].appendChild(newtd);
	}
}

/**
 *	Функция модифицирует стандартную таблицу результатов 
 *	(ту, что с тремя колонками: "Общие результаты", "Боевая эффективность", "Опыт").
 *	
 *	Из колонки "Боевая эффективность" удалены все абсолютные показатели,
 *	которые дублируются в таблице статистики ниже, оставлен только "Процент попадания",
 *	добавлены относительные (удельные, средние) показатели
 *	"Средний уровень танков", 
 *	"Средний урон за бой", 
 *	"Уничтожено за бой", 
 *	"Обнаружено за бой",
 *	"Очков защиты за бой", 
 *	"Очков захвата за бой",
 *	а также добавлены рейтинги Wot-news.com (старый и новый), WN6 и рейтинг Бронесайта.
 *	
 *	Сама колонка перенесена в новую такую же таблицу ниже,
 *	вторая колонка -- новые бои, с теми же показателями (кроме процента попадания,
 *	вместо которого выведен средний опыт),
 *	
 *	Кроме того, везде, где это необходимо, подписано изменение показателей за последние бои
 *	(по сравнению с сохранёнными данными).
 */
function modifyResultTable(lang) {
	var tables = document.getElementsByClassName("t-table-dotted");
	var trs = tables[0].getElementsByTagName("tr");

	// Удаляем проценты из строки "Побед"
	var td = trs[2].children[1];
	td.innerHTML = td.innerHTML.replace(/\s\(.*\)/, "");

	// Удаляем строки "Поражений" и "Выжил в боях"
	trs[3].parentNode.removeChild(trs[3]);
	trs[3].parentNode.removeChild(trs[3]);

	addStatRow(tables[0], locales[lang].winsRate +      ":", colorizeHTML(stat.cur.winsRateColor, stat.cur.winsRate.toFixed(statPrecision)) + " %");
	addStatRow(tables[0], locales[lang].loosesRate +    ":", stat.cur.loosesRate.toFixed(statPrecision) + " %");
	addStatRow(tables[0], locales[lang].survivedRate +  ":", stat.cur.survivedRate.toFixed(statPrecision) + " %");
	addStatRow(tables[0], locales[lang].vehLevelAvg +   ":", stat.cur.vehLevelAvg.toFixed(statPrecision));
	addStatRow(tables[0], locales[lang].experienceAvg + ":", stat.cur.experienceAvg.toFixed(statPrecision));
	addStatRow(tables[0], locales[lang].experienceMax + ":", tables[2].getElementsByTagName("tr")[3].children[1].innerHTML);
	addStatRow(tables[0], locales[lang].hitRatio +      ":", stat.cur.hitRatio + " %")

	// Удаляем таблицу "Опыт" вместе с содержащей её ячейкой
	tables[2].parentNode.parentNode.removeChild(tables[2].parentNode);

	// Удаляем все строки таблицы "Боевая эффективность" кроме строки-заголовка
	var trs = tables[1].getElementsByTagName("tr");
	for (var i = trs.length - 1; i > 0; i--) {
		tables[1].children[0].removeChild(trs[i]);
	}

	// Изменяем ширину таблиц
	tables[0].parentNode.setAttribute("width", "50%");
	tables[1].parentNode.setAttribute("width", "50%");


	// Добавляем поля в таблицу "Боевая эффективность"

	// Основные поля кроме "среднего опыта"
	for (var i = 0; i < effFields.length - 1; i++) {
		addStatRow(
			tables[1].children[0],
			locales[lang][effFields[i] + "Avg"] + ":",
			stat.cur[effFields[i] + "Avg"].toFixed(statPrecision)
		);
	}
	// Рейтинги
	for (var i = 0; i < ratingsFields.length; i++) {
		addStatRow(
			tables[1].children[0],
			locales[lang][ratingsFields[i] + "Rating"] + ":",
			colorizeHTML(stat.cur[ratingsFields[i] + "RatingColor"], stat.cur[ratingsFields[i] + "Rating"].toFixed(statPrecision))
		);
	}

}
/**
 *	@param {tableObject} table  Объект типа "таблица", в который надо добавить строку
 *	@param {String} name        Название поля статистики
 *	@param {String} value       Значение поля статистики
 *	@param {Number} [rowNumber] Номер строки, перед которой нужно вставить новую, по умолчанию -1, т.е. вставка после последней строки
 *
 *	Вспомогательная функция для добавления новой строки статистики в конец таблицы-колонки
 */
function addStatRow(table, name, value, rowNumber) {
	var tr = table.insertRow(rowNumber || -1);
	tr.insertCell(-1).innerHTML = name;
	var td = tr.insertCell(-1);
	td.setAttribute("class", "td-number td-number__nowidth");
	td.innerHTML = value;
}

function resultTableLastStat(lang) {
	var tables = document.getElementsByClassName("t-table-dotted");
	var trs = tables[0].getElementsByTagName("tr");

	// Кол-во боёв
	insertDiffCell(trs[1], withSign(stat.last.battles));
	// Новые "Победы"
	insertDiffCell(trs[2], withSign(stat.last.wins));
	// Добавить изменение процентов
	for (var i = 0; i < 3; i++) {
		var colorizer = ((i == 1) ? colorizeRedGreen : colorizeGreenRed);
		insertDiffCell(trs[i + 3], colorizer(stat.cur[battleFields[1 + i] + "Rate"] - stat.old[battleFields[1 + i] + "Rate"], statPrecision));
	}

	// Средний уровень танков
	insertDiffCell(trs[6], withSign(stat.cur.vehLevelAvg - stat.old.vehLevelAvg, statPrecision));
	// Средний опыт за бой
	insertDiffCell(trs[7], colorizeGreenRed(stat.cur.experienceAvg - stat.old.experienceAvg, statPrecision));
	// Процент попадания
//	insertDiffCell(trs[8], withSign(stat.cur.hitRatio - stat.old.hitRatio));


	// Добавим изменения в полях таблицы "Боевая эффективность"
	var trs = tables[1].getElementsByTagName("tr");

	// Изменение полей эффективности
	for (var i = 0; i < effFields.length - 1; i++) {
		insertDiffCell(trs[i + 1], colorizeGreenRed(stat.cur[effFields[i] + "Avg"] - stat.old[effFields[i] + "Avg"], statPrecision));
	}
	// Изменение рейтингов
	for (var i = 0; i < ratingsFields.length; i++) {
		insertDiffCell(trs[i + 6], colorizeGreenRed(stat.cur[ratingsFields[i] + "Rating"] - stat.old[ratingsFields[i] + "Rating"], statPrecision));
	}

	function insertDiffCell(rowNode, innerHTML) {
		var td = rowNode.insertCell(-1);
		td.setAttribute("class", "td-number td-number__nowidth");
		td.setAttribute("style", "text-align: left; padding-left: 12px;");
		td.innerHTML = innerHTML;
	}

	// Таблица Новые бои
	var lastTable = document.createElement("table");
	var table = document.getElementsByClassName("t-statistic")[0];
	table.parentNode.insertBefore(lastTable, table);

	lastTable.setAttribute("cellpadding", "0");
	lastTable.setAttribute("cellspacing", "0");
	lastTable.setAttribute("width", "100%");
	lastTable.setAttribute("class", "t-result");

	var th = document.createElement("th");
	th.setAttribute("colspan", "2");
	th.setAttribute("style", 
		"font-family: Arial Narrow,\"Helvetica CY\", Helvetica,sans-serif;" +
		"font-weight: bold;" +
		"font-size: 17px;" +
		"color: #ffa759;" +
		"text-align: center;" +
		"padding: 4px 0;" +
		"height: 2.5em;"
	);
	th.innerHTML = "Новые бои" + " (с момента " + savedDateStr + ")";
	lastTable.insertRow(-1).appendChild(th);
	
	var tr = lastTable.insertRow(-1);
	tr.insertCell(-1).setAttribute("width", "50%");
	tr.insertCell(-1).setAttribute("width", "50%");

	// Таблица общих результатов новых боёв
	var table = document.createElement("table");
	table.setAttribute("cellpadding", "0");
	table.setAttribute("cellspacing", "0");
	table.setAttribute("class", "t-table-dotted");
	tr.children[0].appendChild(table);

	addStatRow(table, "Проведено боёв:", stat.last.battles);
	addStatRow(table, "Побед:", stat.last.wins);
	addStatRow(table, "Процент побед:", colorizeHTML(stat.last.winsRateColor, stat.last.winsRate.toFixed(statPrecision)) + " %");
	addStatRow(table, "Процент поражений:", stat.last.loosesRate.toFixed(statPrecision) + " %");
	addStatRow(table, "Процент выживаемости:", stat.last.survivedRate.toFixed(statPrecision) + " %");
	addStatRow(table, "Средний уровень танков:", stat.last.vehLevelAvg.toFixed(statPrecision));
	addStatRow(table, "Средний опыт за бой:", stat.last.experienceAvg.toFixed(statPrecision));

	// Таблица боевой эффективности новых боёв
	var table = document.createElement("table");
	table.setAttribute("cellpadding", "0");
	table.setAttribute("cellspacing", "0");
	table.setAttribute("class", "t-table-dotted");
	tr.children[1].appendChild(table);

	// Основные поля кроме "среднего опыта"
	for (var i = 0; i < effFields.length - 1; i++) {
		addStatRow(
			table,
			locales[lang][effFields[i] + "Avg"] + ":",
			stat.last[effFields[i] + "Avg"].toFixed(statPrecision)
		);
	}
	// Рейтинги
	for (var i = 0; i < ratingsFields.length; i++) {
		addStatRow(
			table,
			locales[lang][ratingsFields[i] + "Rating"] + ":",
			colorizeHTML(stat.last[ratingsFields[i] + "RatingColor"], stat.last[ratingsFields[i] + "Rating"].toFixed(statPrecision))
		);
	}
}

/**
 *
 */
function modifyVehicleTable(lang) {
	var typesBackImage = "http://worldoftanks.ru/static/3.10.0.1/common/css/scss/content/encyclopedia/img/level-ico.png";
	var typesBackPos = {lt: "-121px", mt: "-181px", ht: "-3px", at: "-240px", spg: "-62px"};

	var vehicleRows = document.getElementsByClassName("t-statistic")[1].rows;
	var ths = vehicleRows[0].cells;

	// Добавляем колонку с иконкой типа техники
	var th = document.createElement("th");
	th.style.textAlign = "center";
	vehicleRows[0].insertBefore(th, ths[0]);
	th.appendChild(makeSortButtonSpan(locales[lang].type, "typeNumber", {}));
	th.appendChild(document.createElement("br"));

	// Выпадающий список выбора типа техники
	var select = document.createElement("select");
	select.name = "typeSelect";
	select.multiple = false;
	select.style.fontSize = "10px";
	var option = document.createElement("option");
	option.text = locales[lang].allTypes;
	option.value = "all";
	select.appendChild(option);

	for (var i = 0; i < vehicleTypes.length; i++) {
		var option = document.createElement("option");
		option.text = locales[lang][vehicleTypes[i] + "Short"];
		option.value = vehicleTypes[i];
		select.appendChild(option);
	}
	select.onchange = function() {
		if (this.value == "all") {
			vehicleFilters.typesFilter = vehicleTypes.slice(0);
		} else {
			vehicleFilters.typesFilter = [this.value];
		}
		applyVehicleFilters();
	};
	th.appendChild(select);

	// Вместо заголовка "Бронетехника" делаем три: "Уровень", "Нация", "Название"
	ths[1].innerHTML = "";

	ths[1].appendChild(makeSortButtonSpan(locales[lang].level, "level", {"padding-right": "12px"}));
	ths[1].appendChild(makeSortButtonSpan(locales[lang].nation, "nationNumber", {"padding": "12px"}));
	ths[1].appendChild(makeSortButtonSpan(locales[lang].longName, "longName", {"padding": "12px"}));

	makeSortButton(ths[2], "curStat.battles");
	// Добавляем стрелку вниз перед заголовком "Бои"
	document.getElementById("curStat.battlesDirection").innerHTML = directionSymbols[1];

	// Заменяем "Победы" на "Процент побед"
	ths[3].innerHTML = styledSpanHTML(locales[lang].winsRate, {"font-size": "12px", "font-weight": "700"});
	makeSortButton(ths[3], "curStat.winsRate");

	// Инициализируем фильтры
	vehicleFilters.init();

	for (var i = 0; i < ths.length; i++) {
		ths[i].style.verticalAlign = "middle";
	}
	for (var i = 1; i < vehicleRows.length; i++) {
		var tds = vehicleRows[i].getElementsByTagName("td");
		var vehShortName = vehicleRows[i].getElementsByTagName("img")[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
		var vehicle = vehicles[vehShortName];
		vehicleRows[i].id = vehShortName;

		// Покрасим название танка соотв. цветом, если он премиумный
		if (vehicle.isPremium) {
			var vehLink = tds[1].getElementsByTagName("a")[0];
			vehLink.innerHTML = "<font color=\"ffc363\">" + vehLink.innerHTML + "</font>";
		}

		// Добавляем ячейку с иконкой типа техники
		// После этого нумерация элементов в tds сдвинется
		var newtd = document.createElement("td");
		newtd.setAttribute("style", "background-image: url(" + typesBackImage + ");" +
		                            "background-position: center " + typesBackPos[vehicle.type] + ";" +
		                            "background-repeat: no-repeat;");
		newtd.innerHTML = "";
		// Всплывающая подсказка
		newtd.title = locales[lang][vehicle.type];
		vehicleRows[i].insertBefore(newtd, tds[0]);

		// Чтобы флаг сдвигался вместе с иконкой танка, если высота ячейки увеличивается
		tds[1].setAttribute("style", "background-position: 0 center;");

		// Добавим новые бои на танке к строке с названием танка
		if (vehicle.lastStat.battles > 0) {
			tds[2].innerHTML += styledSpanHTML(
				"(" + vehicle.lastStat.wins + "/" +
					vehicle.lastStat.battles + "/" +
					styledSpanHTML(vehicle.lastStat.winsRate.toFixed(statPrecision), 
						{"color": "#" + vehicle.lastStat.winsRateColor}) + "%" +
				")",
				{"font-size": "11px"}
			);
		}

		// Кол-во побед на процент побед
		tds[4].innerHTML = styledSpanHTML(vehicle.curStat.winsRate.toFixed(statPrecision), {"color": "#" + vehicle.curStat.winsRateColor}) + " %";
		
		// Добавляем изменение процента побед, если есть сохр. инфа
		if (vehicle.lastStat.battles > 0) {
			var winrateDiff = vehicle.curStat.winsRate - vehicle.oldStat.winsRate;
			tds[4].innerHTML += " " + styledSpanHTML("(" + colorizeGreenRed(winrateDiff, statPrecision) + ")", {"font-size": "11px"});
		}
	}

	function makeSortButton(node, key) {
		node.style.cursor = "pointer";
		keyDirections[key] = 1;
		node.innerHTML = "<span id=\"" + key + "Direction\">" + directionSymbols[2] + "</span>" + node.innerHTML;
		node.addEventListener("click", function() { sortVehTable(node, key, keyDirections); }, false);
	}
	function makeSortButtonSpan(text, key, style) {
		var span = document.createElement("span");

		for (var styleKey in style) {
			span.style[styleKey] = style[styleKey];
		}
		span.style.cursor = "pointer";
		span.innerHTML = "<span id=\"" + key + "Direction\">" + directionSymbols[2] + "</span>" + text;
		keyDirections[key] = 1;
		span.onclick = function() { 
			sortVehTable(span, key, keyDirections);
		};
		return span;
	}
}

function styledSpanHTML(text, style) {
	var html = "<span style=\"";

	for (var key in style) {
		html += key + ": " + style[key] + ";"
	}
	html += "\">" + text + "</span>";
	return html;
}

function styledSpanNode(text, style) {
	var span = document.createElement("span");
	span.innerHTML = text;
	copyObjectFields(style, span.style);
	return span;
}
function sortVehTable(node, sortKey, keyDirections) {
	var direction = keyDirections[sortKey];
	var tbody = document.getElementsByClassName("t-statistic")[1].children[0];
	var vehicleRows = tbody.rows;
	var rowsArr = [];

	for (var i = 1; i < vehicleRows.length; i++) {
		var vehicle = vehicles[vehicleRows[i].id];
		rowsArr.push({node: vehicleRows[i], index: i, key: null});
		
		if (sortKey.indexOf(".") == -1) {
			rowsArr[i - 1].key = vehicle[sortKey];
		} else {
			var keys = sortKey.split(".");
			rowsArr[i - 1].key = vehicle[keys[0]][keys[1]];
		}
	}
	rowsArr.sort(function (r1, r2) {
		return ((r1.key < r2.key) ? -1 : ((r1.key > r2.key) ? 1 : r1.index - r2.index));
	});

	if (direction < 0) {
		rowsArr.reverse();
	}
	for (var i = 0; i < rowsArr.length; i++) {
		tbody.appendChild(rowsArr[i].node);
	}
	for (var key in keyDirections) {
		keyDirections[key] = 1;
		document.getElementById(key + "Direction").innerHTML = directionSymbols[2];
	}
	direction *= -1;
	keyDirections[sortKey] = direction;
	document.getElementById(sortKey + "Direction").innerHTML = directionSymbols[(1 + direction) / 2];
}

function applyVehicleFilters() {
	var vehicleRows = document.getElementsByClassName("t-statistic")[1].rows;

	for (var i = 1; i < vehicleRows.length; i++) {
		var vehicle = vehicles[vehicleRows[i].id];
		var passedFilters = true;

		if ((vehicleFilters.typesFilter.indexOf(vehicle.type) == -1) ||
			(vehicleFilters.nationsFilter.indexOf(vehicle.nation) == -1) || 
			(vehicleFilters.battlesMoreFilter >= vehicle.curStat.battles)
			)
		{
			passedFilters = false;
		}
		vehicleRows[i].style.display = ((passedFilters) ? "" : "none");
	}
}

function copyObjectFields(fromObj, toObj) {
	for (var key in fromObj) {
		toObj[key] = fromObj[key];
	}
}

/**
 *	Извлекаем сохранённую в Cookies стату,
 *	записываем данные в stat.old и vehicles .
 *	Записываем дату сохранения в savedDate, 
 *	она является индикатором наличия сохранённой статы (null или реальная дата).
 */
function getOldLastStat(savedStat) {
	var fields = battleFields.concat(effFields);
	savedDate = new Date(savedStat.savedDate);

	var month = (savedDate.getMonth() + 1);

	if (month < 10) {
		month = "0" + month;
	}
	savedDateStr =
		savedDate.getDate() + "." + month + "." + savedDate.getFullYear() + " " +
		savedDate.getHours() + ":" + savedDate.getMinutes();

	copyObjectFields(savedStat.curStat, stat.old);

	console.log(JSON.stringify(savedStat.curStat));
	console.log(JSON.stringify(stat.old));

	for (var i = 0; i < fields.length; i++) {
		stat.last[fields[i]] = stat.cur[fields[i]] - stat.old[fields[i]];
	}

	console.log(JSON.stringify(stat.last));

	for (var vehName in vehicles) {
		if (vehName in savedStat.vehicles) {
			copyObjectFields(savedStat.vehicles[vehName].curStat, vehicles[vehName].oldStat);
			vehicles[vehName].oldStat.calc_winsRate();
		}
		for (var i = 0; i < fields.length; i++) {
			vehicles[vehName].lastStat[fields[i]] = vehicles[vehName].curStat[fields[i]] - vehicles[vehName].oldStat[fields[i]];
		}
		vehicles[vehName].lastStat.calc_winsRate();
	}

/*
	var statRows = savedStat.split("/");
	var oldStat = statRows[0].split(";");
	savedDate = new Date(oldStat[0]);

	// Загрузим старую статистику в stat.old
	for (var i = 0; i < 3; i++) {
		stat.old[statTableFields[i]]           = parseInt(oldStat[2 * i + 4]);
		stat.old[statTableFields[i] + "Place"] = parseInt(oldStat[2 * i + 5]);
	}
	for (var i = 3; i < 11; i++) {
		var statField = statTableFields[i];

		stat.old[statField]           = parseInt(oldStat[2 * i + 4]);
		stat.old[statField + "Place"] = parseInt(oldStat[2 * i + 5]);
		stat.last[statField] = stat.cur[statField] - stat.old[statField];
	}

	var oldLevelSum = 0;

	// Загрузим старую статистику по технике в vehicles
	for (var i = 1; i < statRows.length; i++) {
		oldStat = statRows[i].split(";");

		var vehicle = vehicles[oldStat[0]];
		vehicle.oldStat.battles = parseInt(oldStat[1]);
		vehicle.oldStat.wins = parseInt(oldStat[2]);
		vehicle.oldStat.calc_winsRate();

		oldLevelSum += vehicle.level * vehicle.oldStat.battles;
	}
	stat.old.vehLevelAvg = oldLevelSum / stat.old.battles;

	var lastLevelSum = 0;

	// Для каждой машины подсчитываем стату новых боёв
	for (var vehName in vehicles) {
		var vehicle = vehicles[vehName];

		vehicle.lastStat.battles = vehicle.curStat.battles - vehicle.oldStat.battles;
		vehicle.lastStat.wins = vehicle.curStat.wins - vehicle.oldStat.wins;
		vehicle.lastStat.calc_winsRate();

		lastLevelSum += vehicle.level * vehicle.lastStat.battles;
	}
	stat.last.vehLevelAvg = lastLevelSum / stat.last.battles;
*/
}

function calcLastAvgLevel() {
	if (stat.last.battles > 0) {
		var levelSum = 0;
		var battles = 0;

		for (var vehName in vehicles) {
			if (vehicles[vehName].lastStat.battles > 0) {
				levelSum += vehicles[vehName].level * vehicles[vehName].lastStat.battles;
				battles += vehicles[vehName].lastStat.battles;
			}
		}
		stat.last.vehLevelAvg = levelSum / battles;
	}
}

/**
 *	Сохраняет текущую дату, текущую оф.статистику и текущую статистику по технике
 *	в Cookies.
 *
 *	ВАЖНО! Для корректной работы функции массивы stat.cur и vehicles 
 *	должны быть заполнены корректными данными.
 */
function writeSavedStat() {
	var date = new Date();
	var str;

	var vehStr = "{";
	for (var vehName in vehicles) {
		vehStr += "\"" + vehName + "\": {\"curStat\":" + JSON.stringify(vehicles[vehName].curStat, statReplacer) + "}, ";
	}
	vehStr = vehStr.slice(0, vehStr.length - 2) + "}";

	var statStr = JSON.stringify(stat.cur, statReplacer);

	str = "{" +
		"\"savedDate\":\"" + date + "\"," +
		"\"curStat\":" + statStr + "," +
		"\"vehicles\":" + vehStr +
		"}";

	console.log(statStr);
	console.log(vehStr);

	//setLongCookie("wotextstat", str, 2048);
	setLocalStorage("wotextstat_" + accountNumber, str);

	location.reload();
	alert("Текущая статистика сохранена");

	function statReplacer(key, value) {
		if (key == "vehLevelAvg") {
			return (value ? value : undefined);
		}
		if (key.indexOf("wg") != -1) {
			return value;
		}
		if ((key.indexOf("Avg") != -1) ||
			(key.indexOf("Rate") != -1) ||
			(key.indexOf("Rating") != -1) ||
			(key.indexOf("Color") != -1)
			) {
			return undefined;
		}
		return value;
	}
/*	var cookie = "" + (new Date()) + ";";

	for (var i = 0; i < 11; i++) {
		cookie += stat.cur[statTableFields[i]] + ";" + stat.cur[statTableFields[i] + "Place"] + ";";
	}
	for (var i = 0; i < vehiclesInfo.count; i++) {
		cookie += "/" +
		          vehicleStat.cur[i].shortName + ";" +
		          vehicleStat.cur[i].battles + ";" +
		          vehicleStat.cur[i].wins;
	}
	document.cookie = "savedStat" + "=" + escape(cookie) + "; expires=Mon, 01-Jan-2031 00:00:00 GMT";
	alert("Текущая статистика сохранена");
*/
}

/**
 *
 */
function getCookie(name) {
	var start = document.cookie.indexOf(name + '=');
	var len = start + name.length + 1;
	
	if ( (!start) && (name != document.cookie.substring(0, name.length)) ) {
		return null;
	}
	if (start == -1) {
		return undefined;
	}
	var end = document.cookie.indexOf(';', len);
	
	if (end == -1) {
		end = document.cookie.length;
	}
	return unescape(document.cookie.substring(len, end));
}

/**
 *	@param {String} url Адрес страницы, которую функция запрашивает
 *
 *	Функция делает один синхронный запрос по указанному адресу и
 *	возвращает XML-объект, преобразованный из полученной HTML-страницы.
 *
 *	При этом функция удаляет все скрипты из исходного текста HTML-страницы,
 *	чтобы DOM-парсер отработал успешно (иначе парсер работает некорректно,
 *	если в тексте имеетя, например, строка
 *	"<script> if (a < b) return a; </script>",
 *	т.к. не может корректно обработать символ "<" в условии "a < b", 
 *	считая его началом тега).
 */
function loadXMLDoc(url) {
	var xhttp = null;

	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", url, false);
	xhttp.send(null);
	
	if (xhttp.status == 200) {
		// Убираем все скрипты, чтобы парсер отработал успешно
		var text = xhttp.responseText.replace(/<script[\s\S]*?\/script>/gim, "");
		return (new window.DOMParser()).parseFromString(text, "text/xml");
	} else {
		alertError("Не удалось загрузить страницу по адресу " + url);
		return null;
	}
}

/**
 *	@param {String} errorDescription Описание ошибки
 *
 *	Вывод ошибки в качестве всплывающего сообщения
 */
function alertError(errorDescription) {
	alert("Ошибка: " + errorDescription + "\n" +
	      "Возможно, версия скрипта устарела. Пожалуйста, проверьте наличие обновления!");
}

/**
 *	@param {Number} num Число, которое надо раскрасить
 *	@param {Number} digit Количество знаков после запятой
 *
 *	Функция данное число 
 */
function colorizeGreenRed(num, digit) {
	return "<span style=\"color: #" + ((num > 0) ? greenColor : redColor) + ";\">" + 
		withSign(num, digit) + "</span>";
}

function colorizeRedGreen(num, digit) {
	return "<span style=\"color: #" + ((num > 0) ? redColor : greenColor) + ";\">" + 
		withSign(num, digit) + "</span>";
}

function colorizeHTML(color, html) {
	return "<span style=\"color: #" + color + ";\">" + html + "</span>";
}

function withSign(num, digit) {
	if (isNaN(num)) {
		return "NaN";
	} else if (num == 0) {
		return "---";
	} else {
		return ((num > 0) ? "+" : "") + ((digit) ? num.toFixed(statPrecision) : num);
	}
}

function getLongCookie(cookieName) {
	var pageCount = parseInt(getCookie(cookieName + "PageCount"));
	var longCookie = "";

	for (var i = 0; i < pageCount; i++) {
		longCookie += getCookie(cookieName + i);
	}
	return longCookie;
}

function setLongCookie(cookieName, cookieValue, cookieLength) {
	var pageCount = Math.ceil(cookieValue.length / cookieLength);
	alert("length: " + cookieValue.length + "; pageCount: " + pageCount + "; cookieLength: " + cookieLength);
	setCookie(cookieName + "PageCount", pageCount);

	for (var i = 0; i < pageCount; i++) {
		setCookie(cookieName + i,
			cookieValue.slice(i * cookieLength, Math.min((i + 1) * cookieLength, cookieValue.length)) );
		alert("Should be " + i);
	}
}

function setCookie(name, value) {
	document.cookie = name + "=" + escape(value) + "; expires=Mon, 01-Jan-2031 00:00:00 GMT";
}

function setLocalStorage(name, value) {
	try {
		localStorage.setItem(name, value);
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert("Локальное хранилище переполнено");
		}
	}
}

function getLocalStorage(name) {
	return localStorage.getItem(name);
}
