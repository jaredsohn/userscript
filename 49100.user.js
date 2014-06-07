// ==UserScript==
// @name           Darwin's Predict
// @namespace      Darwin's Predict
// @description    Previstos de Darwin's.
// @author         Monkey
// ==/UserScript==

function predictPopulationOverfull() {
	var divCityOverview, curPopulation, maxPopulation, curPopulationGrowth, timeLeftEx;
	var lang = "en";

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
		
		sResult2 = (sDays == 0)?"":String(sDays) + msg_Days[lang];
		sResult2 += (sHours == 0)?"":String(sHours) + msg_Hours[lang];
		sResult2 += sMinutes + msg_Minutes[lang];		
		if (sResult2 == "0 min") {
		   sResult = msg_full[lang];
		} else {
		   sResult = ": "+sResult2;
		}
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
	var msg_full = new Object;
	
	msg_TimeLeft["en"] = texts["PREDICT_FULL"];
	msg_Days["en"] = texts["PREDICT_DAYS"];
	msg_Hours["en"] = texts["PREDICT_HOURS"];
	msg_Minutes["en"] = texts["PREDICT_MINUTES"];
	msg_Never["en"] = texts["PREDICT_NEVER"];
	msg_full["en"] = ""
	
replace_words();