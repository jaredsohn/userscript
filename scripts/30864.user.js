// ==UserScript==
// @name           Hainei Parking
// @namespace      hainei
// @description    Display how much time left before 12 hours of your parking
// @include        http://www.hainei.com/parking
// @include        http://www.hainei.com/parking?*
// ==/UserScript==

var moneyThreshold = new Array(0, 720, 1380, 1980, 2520, 3000, 3420, 3780, 4080, 4320, 4500, 4620);

showRemainTime();


function showRemainTime() {
	var carDiv = document.getElementById("pk-mycars-table");
	var carTable = carDiv.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var carTableRows = carTable.getElementsByTagName("tr");
	
	// change length
	for (var i = 0; i < carTableRows.length; ++i) {
		var columns = carTableRows[i].getElementsByTagName("td");
		if (columns == null || columns.length != 3)
			continue;
			
		var pelements = columns[1].getElementsByTagName("p");
		if (pelements == null || pelements.length != 2) 
			continue;
			
		var moneye = pelements[1].getElementsByClassName("pk-money")[0];
		if (moneye == null)	
			continue;
			
		var money = parseMoneyFormat(moneye.textContent);
		var left = 4680 - money;
		var message = "";
		if (left != 0) {
			var stilllate = true;
			for (var j = 1; j < moneyThreshold.length; ++j) {
				if (left <= moneyThreshold[j]) {
					message += "还差";
					var hours = 0;
					if (j > 1) {
						hours = j;
					}
					var minutes = (left - moneyThreshold[j - 1]) / (13 - j);
					if (minutes == 60) {
						hours += 1;
						minutes = 0;
					}
					if (hours != 0) message += hours + "小时";
					if (minutes != 0) message += minutes + "分钟";
					stilllate = false;
					break;
				}
			}	
			if (stilllate) {
				message += "还早呢，歇着吧～～";
			}
		}
		if (message.length > 0)
			pelements[1].innerHTML = pelements[1].innerHTML + '<span class="pk-max"> (' + message + ')</span>'
	}
}

function parseMoneyFormat(moneyText) {
	moneyText = moneyText.replace(/(^\s*)|(\s*$)/g, "");
	var sum = 0;
	for (var i = 1; i < moneyText.length; ++i) {
		var ch = moneyText.substring(i, i + 1);
		if (ch == ",") 
			continue;
		sum = sum * 10 + Number(ch);
	}
	return sum;
}


/*
<td class="pk-carinfo">
<h4>二手QQ</h4>
<p>停在 <a href="javascript:void 0" rel="126582|f264369a" class="pk-goto">许珂大道</a></p>
<p>预计收入 <strong class="pk-money">¥4,536</strong></p>
</td>
*/