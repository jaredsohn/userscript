// ==UserScript==
// @name STP Summarizer
// @namespace stp
// @description sums up all account statistics
// @include http://universe*.strivetopower.de/account.php*
// @version 0.55
// ==/UserScript==

(function() {
	var navlin5 = document.getElementById('navlin5');
	var location = document.location + "";
	var showOffset = location.indexOf("show=");

	if (showOffset == -1) {
		mode = "kw"; // Allgemeines
	} else {
		mode = location.substr(showOffset + 5); // other modes are set by url value
	}
	
	switch (mode) {
		case 'resources':
			calculateResourceSum();
			break;
		case 'buildings':
			calculateBuildingSum();
			break;
		case 'units':
			calculateUnitSum();
			break;
		case 'defenses':
			calculateDefenseSum();
			break;
		case 'kw':
			calculateKwSum();
			break;
		default:
			break;
	}
	
	function calculateKwSum() {
		var table = navlin5.getElementsByTagName('table')[3];
		var trs = table.getElementsByTagName('tr');

		// sums
		var sums = new Array(0, 0, 0, 0, 0, 0);

		for (var i = 1; i < trs.length; i++) {
			var tr = trs[i];
			var tds = tr.getElementsByTagName('td');

			for (var j = 1; j < tds.length; j++) {
				var td = tds[j];
				var text = td.innerHTML.replace(/\./g, '');
				if (j == 2){
					var bonus = text.substr(0,2);
					sums[1] += parseInt(bonus);
				} else {
					sums[j-1] += parseInt(text);
				}
			}
		}
		
		// sum
		var tr = createTr();
		var tdSum = createTd("Summe: ", "left", 'color5');
		tr.appendChild(tdSum);
		for (var i = 0; i < sums.length; i++) {
			var text = addCommas(sums[i]);
			if (i == 1) {
				text += " %";
			} 
			
			var td = createTd(text, "center", "color5");
			if (i == sums.length-1) {
				td.className = "red";
			}
			tr.appendChild(td);
		}
		
		// append row
		table.appendChild(tr);
	}

	function calculateResourceSum() {
		var t3 = navlin5.getElementsByTagName('table')[3];
		appendSumLine(t3);
		
		// calculate prod
		calculateProductionSum();
		
		// caluclate stocks
		calculateStockSum();
	}
	
	function calculateProductionSum() {
		var t4 = navlin5.getElementsByTagName('table')[4];
		var trs = t4.getElementsByTagName('tr');

		// sums
		var sums = new Array(0, 0, 0, 0, 0, 0);

		for (var i = 2; i < trs.length; i++) {
			var tr = trs[i];
			var tds = tr.getElementsByTagName('td');

			for (var j = 1; j < tds.length; j++) {
				var td = tds[j];
				sums[j-1] += parseInt(td.innerHTML.replace(/\./g, ''));
			}
		}

		// Stundenprod
		var tr = createTr();
		var tdSum = createTd("Gesamt-Stundenprod: ", "left", 'color5');
		tr.appendChild(tdSum);
		for (var i = 0; i < sums.length; i++) {
			var td = createTd(addCommas(sums[i]), "center", "color5");
			tr.appendChild(td);
		}
		t4.appendChild(tr);
		
		// Tagesprod
		var tr = createTr();
		var tdSum = createTd("Gesamt-Tagesprod: ", "left", 'color5');
		tr.appendChild(tdSum);
		for (var i = 0; i < sums.length; i++) {
			var td = createTd(addCommas(sums[i]*24), "center", "color5");
			tr.appendChild(td);
		}
		
		// append row
		t4.appendChild(tr);
	}
	
	function calculateStockSum() {
		var table = navlin5.getElementsByTagName('table')[5];
		var trs = table.getElementsByTagName('tr');
		var cols = trs[0].getElementsByTagName('td');
		var colCount = cols.length - 1;

		// sums
		var sums = new Array(6);
		for (var i = 0; i < sums.length; i++) {
			sums[i] = 0;
		}

		for (var i = 1; i < trs.length; i++) {
			var tr = trs[i];			
			var tds = tr.getElementsByTagName('td');
			
			for (var j = 0; j < tds.length-1; j += 2) {
				var td = tds[j+1];
				var text = td.innerHTML.replace(/\./g, '');		
				
				var expr = /(\d+) \((\d+)\)/; 
				expr.exec(text);
				var stock_size = parseInt(RegExp.$1);
				var stock = parseInt(RegExp.$2);
				
				sums[j] += stock_size;
				sums[j + 1] += stock;
			}
		}

		// calc sums
		var tr = createTr();
		var tdSum = createTd("Summe: ", "left", 'color5');
		tr.appendChild(tdSum);

		for (var i = 0; i < sums.length; i += 2) {
			var text = addCommas(sums[i]) + " (" + addCommas(sums[i+1]) + ")";
			var td = createTd(text, "center", "color5");
			tr.appendChild(td);
			
			var td = createTd(parseInt((sums[i+1] / sums[i]* 10000)) / 100 + "%", "center", "color5");
			tr.appendChild(td);
		}
		
		// append row
		table.tBodies[0].appendChild(tr);
	}
	
	function calculateBuildingSum() {
		var tables = navlin5.getElementsByTagName('table');
		
		for (var t = 4; t < tables.length; t += 2) {
			var table = tables[t]; 
			appendSumLine(table);
		}
	}
	
	function calculateUnitSum() {
		var table1 = navlin5.getElementsByTagName('table')[4];
		appendUnitSum(table1);
		var table2 = navlin5.getElementsByTagName('table')[6];
		appendUnitSum(table2);
	}
	
	function appendUnitSum(table) {
		var trs = table.getElementsByTagName('tr');
		var cols = trs[0].getElementsByTagName('td');
		var colCount = cols.length - 1;

		// sums
		var sums = new Array(colCount * 2);
		for (var i = 0; i < sums.length; i++) {
			sums[i] = 0;
		}

		for (var i = 1; i < trs.length; i++) {
			var tr = trs[i];			
			var tds = tr.getElementsByTagName('td');
			
			for (var j = 1; j < tds.length; j++) {
				var td = tds[j];
				var text = td.innerHTML.replace(/\./g, '');				
				if (j == 1) {
					sums[0] += parseInt(text);
				} else {
					var expr = /(\d+) \((\d+)\)/; 
					expr.exec(text);
					var units = parseInt(RegExp.$1);
					var units_away = parseInt(RegExp.$2);
					
					sums[2*(j-1)] += units;
					sums[2*(j-1) + 1] += units_away;
				}
			}
		}

		// calc sums
		var tr = createTr();
		var tdSum = createTd("Summe: ", "left", 'color5');
		tr.appendChild(tdSum);
		var td = createTd(addCommas(sums[0]), "left", "color5");
		tr.appendChild(td);
		
		for (var i = 2; i < sums.length; i += 2) {
			var text = addCommas(sums[i]) + " (" + sums[i+1] + ")";
			var td = createTd(text, "center", "color5");
			tr.appendChild(td);
		}
		
		// append row
		table.tBodies[0].appendChild(tr);
	}

	function calculateDefenseSum() {
		var table = navlin5.getElementsByTagName('table')[3];
		appendSumLine(table);
	}	
	
	function appendSumLine(table) {
		var trs = table.getElementsByTagName('tr');
		var cols = trs[0].getElementsByTagName('td');
		var colCount = cols.length - 1;
		
		// sums
		var sums = new Array(colCount);
		for (var i = 0; i < sums.length; i++) {
			sums[i] = 0;
		}

		for (var i = 1; i < trs.length; i++) {
			var tr = trs[i];			
			var tds = tr.getElementsByTagName('td');
			
			for (var j = 1; j < tds.length; j++) {
				var td = tds[j];
				sums[j-1] += parseInt(td.innerHTML.replace(/\./g, ''));
			}
		}

		// calc sums
		var tr = createTr();
		var tdSum = createTd("Summe: ", "left", 'color5');
		tr.appendChild(tdSum);
		for (var i = 0; i < sums.length; i++) {
			var td = createTd(addCommas(sums[i]), "center", "color5");
			tr.appendChild(td);
		}
		
		// append row
		table.tBodies[0].appendChild(tr);
	}
	
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
	}	
	
	function createTd(innerText, align, clazz) {
		var td = document.createElement('td');
		
		var text = document.createTextNode(innerText);
		td.appendChild(text);
		
		if (clazz != "") td.className = clazz;
		if (align != "") td.align = align;
		return td;
	}
	
	function createTr() {
		var tr = document.createElement('tr');
		return tr;
	}	
	
	function is_numeric(val) {
		return (val >= 0 || val < 0);
	}
})();