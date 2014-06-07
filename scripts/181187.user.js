// ==UserScript==
// @name        Virtonomica:MarginStat
// @namespace   virtonomica
// @include     http://*virtonomic*.*/*/main/margingame/view/*/players
// @description Статистика для MarginGame. Расчет размеров текущих активов игроков на странице "Игроки"
// @description Statistics for MarginGame. Calculating the size of the current assets of players on the page "Players"
// @version     1.01
// @grant       none
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

function numberFormat (number) {
          number += '';
          var parts = number.split('.');
          var int = parts[0];
          var dec = parts.length > 1 ? '.' + parts[1] : '';
          var regexp = /(\d+)(\d{3}(\s|$))/;
          while (regexp.test(int)) {
          int = int.replace(regexp, '$1 $2');
          }
          return int + dec;
}

	var div = $("#mainContent");
	var table = $("table.list", div);
	var tr = $("tr.even, tr.odd", table);
	var num_players = tr.length;
	console.log(num_players);

	var stat = new Object();

	// число игроков
	for(var i=0; i<num_players; i++){
		var pl_table = $("table", tr.eq(i));
		if (pl_table.length ==0) continue;

		if ( stat[i] ==  null) stat[i] =  new Object();
		// число ходов
		var step = $("tr", pl_table);
		//console.log(i+ " = " +  step.length);
		for(var k = 0; k<step.length; k++){
			// число активово
			var span = $("span", step.eq(k));
			//console.log(k+ " = [" +  span.length + "]");
			for(act =0; act<span.length; act++){
				if ( stat[i][act] ==  null) stat[i][act] =  100000;
				var text = span.eq(act).text();
				var pos = text.indexOf("×");
				if (pos == -1) continue;
				var kof = parseFloat(text.substr(pos+1));
				if (isNaN(kof)) continue;
				stat[i][act] = stat[i][act] * kof;
				//console.log("[" +  kof + "]=" + text);
			} 
		}
	}
	for(var i=0; i<num_players; i++){
		var str = "<div style='text-align:rigth'><nobr><table>";
		for(action in stat[i]) {
			str+= "<tr><td align=right>" + numberFormat( Math.round(stat[i][action]) );
			//console.log("[" + i + "](" + numberFormat( Math.round(stat[i][action]) )+ ")" );
		}
		str+= "</table></nobr></div>";

		var el = $("td", tr.eq(i)).eq(3);
		el.html( '<nobr>' + el.html() +'</nobr>' )
		el.append(str);
		
	}

	//console.log(tr.length);

}
if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}