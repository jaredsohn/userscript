// ==UserScript==
// @name           IkariamPredict
// @version        1.0.3
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Predicts Icariam (browser based game) aspects
// @include        http://*.ikariam.*/index.php?view=townHall&id=*&position=0
// @author         Maxim Kurilov aka lavelas
// ==/UserScript==

/*
Скрипт позволяет предскать некоторые параметры роста в Ikariam.

Changelog:
v 1.0.4	Время теперь выводится в тексте ратуши
v 1.0.3	Поддержка английского языка
v 1.0.2	Багфиксы, обработка бесконечного времени
v 1.0.1	Выводит время до заполнения ратуши в удобном виде: дни, часы, минуты
v 1.0	Начальная версия. Предсказывает только время роста населения до максимального значения (по ратуше). Учитывает замедление роста из-за падения сатисфакции. Время показывается во всплывающей подсказке при наведении на цифру максимального населения в здании ратуши.
*/

function predictPopulationOverfull() {
	var divCityOverview, curPopulation, maxPopulation, curPopulationGrowth, timeLeftEx;
	var lang = (navigator.language == "ru")?"ru":"en";
	
	divCityOverview = document.getElementById('CityOverview');
	if (divCityOverview) {
		curPopulation		= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[1].textContent);
		maxPopulation		= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].textContent);
		curPopulationGrowth	= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[3].childNodes[3].textContent);
		if (curPopulation > 0 && maxPopulation > 0 && curPopulationGrowth > 0 && curPopulationGrowth / 0.02 + curPopulation >= maxPopulation) {
			timeLeftEx = 0;
			for (i = curPopulation; i < maxPopulation; i++) {
				timeLeftEx = timeLeftEx + 1 / (curPopulationGrowth - 0.02 * (i - curPopulation));
			};
		} else {
			timelLeftEx = Infinity;
		}
		var parentNode = divCityOverview.childNodes[3].childNodes[3];
		var newNode = parentNode.childNodes[3].cloneNode(true);
		var insertedElement = parentNode.appendChild(newNode);
		insertedElement.style.position = "relative";
		insertedElement.style.top = "74px";
		insertedElement.innerHTML = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang);
		//divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].title  = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang);
	};
};

function timeRealToString(rTime, lang) {
	var sDays, sHours, sMinutes, sResult;
	if (isFinite(rTime)) {
		sDays = Math.floor(rTime / 24);
		sHours = Math.floor(rTime - sDays * 24);
		sMinutes = Math.floor((rTime - sDays * 24 - sHours) * 60);
		sResult = (sDays == 0)?"":String(sDays) + msg_Days[lang];
		sResult += (sHours == 0)?"":String(sHours) + msg_Hours[lang];
		sResult += sMinutes + msg_Minutes[lang];
	} else {
		sResult = msg_Never[lang];
	}
	return sResult;
};

var msg_TimeLeft = new Object;
var msg_Days = new Object;
var msg_Hours = new Object;
var msg_Minutes = new Object;
var msg_Never = new Object;

msg_TimeLeft["ru"] = "Переполнение: ";
msg_TimeLeft["en"] = "Full in: ";
msg_Days["ru"] = "д. ";
msg_Days["en"] = "d. ";
msg_Hours["ru"] = "ч. ";
msg_Hours["en"] = "h. ";
msg_Minutes["ru"] = "мин. ";
msg_Minutes["en"] = "min. ";
msg_Never["ru"] = "никогда";
msg_Never["en"] = "never";

predictPopulationOverfull();