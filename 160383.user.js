// ==UserScript==
// @name GanjaWeeds :: Travel
// @author Пушкенъ
// @namespace GW::TR
// @version 0.1
// @description Форматирует счетчик времени на странице перемещения между секторами.
// @license GPL v3 или любая другая поздняя версия (http://www.gnu.org/copyleft/gpl.html)
// @include http://*.ganjawars.ru/map.move.php* 
// @include http://ganjawars.ru/map.move.php* 
// ==/UserScript==

var myJS = document.createElement('script');
myJS.type = 'text/javascript';
myJS.innerHTML = ""+<r><![CDATA[
function formatTimeleft(timeleftValue) {
	if (timeleftValue > 0) {
		var tlCalc = timeleftValue;
		var tlHour = Math.floor(tlCalc / 3600);
		tlHour = ((tlHour < 10) ? "0" : "") + tlHour;
		tlCalc = tlCalc - (tlHour * 3600);
		var tlMin = Math.floor(tlCalc / 60);
		tlMin = ((tlMin < 10) ? "0" : "") + tlMin;
		tlCalc = tlCalc - (tlMin * 60);
		tlCalc = ((tlCalc < 10) ? "0" : "") + tlCalc;
		return(tlHour + ":" + tlMin + ":" + tlCalc);
	} else {
		return("00:00:00");
	}
}

function mmupdateEx() {
	if (mmtimer2 >= 0) clearTimeout(mmtimer2);
    	mmtimer2 = setTimeout("mmupdateEx()", 1000);
	timeleft=timeleft-1;
	window.document.title = "В пути " + formatTimeleft(timeleft) + " чч:мм:сс";
	window.document.getElementById("mmdiv").innerHTML = formatTimeleft(timeleft);
}
var mmtimer2 = setTimeout("mmupdateEx()", 1000);
]]></r>;
document.getElementsByTagName('head')[0].appendChild(myJS);

function initTravel() {
	clearTimeout(unsafeWindow.mmtimer);
	var mmdiv = document.getElementById("mmdiv");
	if (mmdiv != null) with (mmdiv) {
		innerHTML = unsafeWindow.formatTimeleft(unsafeWindow.timeleft);
		nextSibling.textContent = " чч:мм:сс";
	}
}

initTravel();
