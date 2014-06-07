// ==UserScript==
// @name           AldiTalk Verbrauchssumme
// @namespace      Schokoforum.de
// @description    Summiert Traffic-Verbrauch in der AldiTalk Verbrauchsübersicht und zeigt dies unter der Guthabenanzeige an
// @version        2.0b
// @include        https://prepaidkundenbetreuung.eplus.de/*/mein_konto/verbrauchsuebersicht.htx*
// ==/UserScript==


unsafeWindow.TrafficCalc = function (start, stop) {
	function saveParseInt (str) {
		var out = parseInt(str);
		return (isNaN(out)) ? 0 : out;
	}

	if (start > stop && stop != 0) {
		return 'Starttag liegt nach Endtag';
	}
	var Traffic = 0;
	var rows = document.getElementById("myId4").getElementsByTagName('tr');
	var i = 0;
	var startReached = (start == 0) ? 1 : 0;
	
	for (i = 2; i < rows.length; i++) {
		if (startReached == 0 || stop != 0) {
			var day = saveParseInt(rows[i].getElementsByTagName('td')[0].innerHTML.slice(0, 2));
			
			if (day >= start) {
				startReached = 1;
			} else {
				continue;
			}	
			if (stop != 0 && day > stop) {
				break;
			}
		}
		
		var row = rows[i].getElementsByTagName('td')[3].innerHTML;
		var pos = row.search(/K/i);
		
		if (pos != -1) {
			Traffic += saveParseInt(row.slice(0, pos - 1), 10);
		} else {
			Traffic += saveParseInt(row.slice(0, 1)) * 1000 + saveParseInt(row.slice(2, 3)) * 100 + saveParseInt(row.slice(3, 4)) * 10;
		}
	}
	
	if (Traffic > 1000000) {
		return parseFloat(Traffic / 1000000) + ' GB';
	} else {
		return parseFloat(Traffic / 1000) + ' MB';
	}
}

var select = '<option> </option>';
var i = 1;
for (i = 1; i <= 31; i++){
	select += '<option>' + i + '</option>';
}

document.getElementById('context').getElementsByTagName('div')[4].innerHTML += '<div class="credit"><p class="unit">Trafficrechner:</p><p class="amount">&#8676;<select name="calc_day_start" style="width:auto;">' + select + '</select> &#8677;<select name="calc_day_stop" style="width:auto;">' + select + '</select> <input type="button" name="summe" value="Summe" onclick="document.getElementById(\'calc_period_val\').innerHTML = TrafficCalc(document.getElementsByName(\'calc_day_start\')[0].options.selectedIndex,document.getElementsByName(\'calc_day_stop\')[0].options.selectedIndex)" style="width:auto;"><span id="calc_period_val"></span></p></div>';