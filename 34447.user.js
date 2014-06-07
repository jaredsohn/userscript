// ==UserScript==
// @name           IkariamPredict
// @version        1.0.3+
// @namespace      overkill_gm
// @description    Predicts Ikariam (browser based game) aspects
// @include        http://*.ikariam.*/index.php?view=townHall&id=*&position=0
// @author         Overkill
// @originalAuthor         Maxim Kurilov aka lavelas
// ==/UserScript==

/*
This is overkill's hack of http://userscripts.org/scripts/show/25813
improved math, and displays in the town hall instead as a tooltip

ORIGINAL README:
Скрипт позволяет предскать некоторые параметры роста в Ikariam.

Changelog:
v 1.0.3	Поддержка английского языка
v 1.0.2	Багфиксы, обработка бесконечного времени
v 1.0.1	Выводит время до заполнения ратуши в удобном виде: дни, часы, минуты
v 1.0	Начальная версия. Предсказывает только время роста населения до максимального значения (по ратуше). Учитывает замедление роста из-за падения сатисфакции. Время показывается во всплывающей подсказке при наведении на цифру максимального населения в здании ратуши.
*/
function debug(aMsg) {	setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

var satisfaction;

function predictPopulationOverfull() {
	var curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "";
	var lang = (navigator.language == "ru")?"ru":"en";
	
	var divCityOverview = document.getElementById('CityOverview');
	var happy = parseInt(document.getElementById('SatisfactionOverview').childNodes[5].childNodes[3].textContent,10);
	if (divCityOverview) {
		curPopulation	    	= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[1].textContent);
		satisfaction        = curPopulation + happy;
		maxPopulationSpace	= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].textContent);
		
		debug(" current : " + curPopulation + "\n maxSpace : " + maxPopulationSpace + "\n happy : " + happy + "\n satisfaction : " + satisfaction);

    if (curPopulation > 0 && maxPopulationSpace > 0) {
      if (satisfaction < maxPopulationSpace) {
        timeLeftEx = 1/0.02*Math.log(happy);
        msg_extra  = "* (" + satisfaction + ")";
      } else {
  			timeLeftEx = 1/0.02*Math.log(happy/(satisfaction-maxPopulationSpace));
      }
		}
		//debug("timeLeft : " + timeLeftEx);
		var parentNode = divCityOverview.childNodes[3].childNodes[3];
		var newNode = parentNode.childNodes[3].cloneNode(true);
		var insertedElement = parentNode.appendChild(newNode);
		insertedElement.style.position = "relative";
		insertedElement.style.top = "74px";
		insertedElement.innerHTML = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang) + msg_extra;
		//alert("did it work?");
		//divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].title  = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang);// + "/" + curPopulation + "/" + maxPopulationSpace + "/" + curPopulationGrowth + "/" + timeLeftEx;
	}
}

function timeRealToString(rTime, lang) {
	var sDays, sHours, sMinutes, sResult;
	if (rTime > 0) {
		sDays = Math.floor(rTime / 24);
		sHours = Math.floor(rTime - sDays * 24);
		sMinutes = Math.floor((rTime - sDays * 24 - sHours) * 60);
		sResult = (sDays == 0)?"":String(sDays) + msg_Days[lang];
		sResult += (sHours == 0)?"":String(sHours) + msg_Hours[lang];
		sResult += sMinutes + msg_Minutes[lang];
	} else {
		sResult = msg_Never[lang] + "(Max: " + satisfaction + ")";
		//sResult = msg_Never[lang] ;
	}
	return sResult;
}

var msg_TimeLeft = new Object;
var msg_Days = new Object;
var msg_Hours = new Object;
var msg_Minutes = new Object;
var msg_Never = new Object;

msg_TimeLeft["ru"] = "Время до переполнения: ";
msg_TimeLeft["en"] = "City hall capacity will be exceeded in: ";
msg_TimeLeft["en"] = "Full in: ";
msg_Days["ru"] = "д. ";
msg_Days["en"] = "d. ";
msg_Days["en"] = "d ";
msg_Hours["ru"] = "ч. ";
msg_Hours["en"] = "h. ";
msg_Hours["en"] = "h ";
msg_Minutes["ru"] = "мин. ";
msg_Minutes["en"] = "min. ";
msg_Minutes["en"] = "m ";
msg_Never["ru"] = "никогда";
msg_Never["en"] = "never";

predictPopulationOverfull();