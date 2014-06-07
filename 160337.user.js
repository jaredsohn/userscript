// ==UserScript==
// @name             Filter Resource [GW]
// @namespace        s3kat0r.com
// @description      Фильтрует объекты продажи ресурсов
// @include          http://www.ganjawars.ru/statlist.php*
// @version          0.1
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==



(function() {
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/statlist.php') == -1) {
	return false;
}

if (typeof(root.localStorage) == 'undefined') { /*проверяем, поддерживает ли браузер объект localStorage*/
	alert('Ваш браузер не поддерживает localStorage. Скачайте Opera 10.60, Mozilla Firefox 3.6.6, Chrome 5 или эти же браузеры более новых версий');
	return;
}



//data = sale|buy = 0 - island, 1 - sort, 2 - order

var data = localStorage.getItem('s3k_fr');
if (data == null || data == '') {
	data = {"sale":[0,0,0],"buy":[0,0,0]};
} else {
	data = JSON.parse(data);
}

var fetch       = [];
var _table_buy  = null;
var _table_sale = null;

var table = root.document.body.getElementsByTagName('table');
for (var i = 0, len = table.length; i < len; ++i) {
	if (table[i].getAttribute('class') == 'wb' && table[i].rows[0].cells[0] != null && table[i].rows[0].cells[0].textContent.indexOf('Объект') != -1) {
		var td  = table[i].parentNode;
		if (td.childNodes[0].textContent.indexOf('Продать') != -1) {
			var init = 'sale';
		} else {
			var init = 'buy';
		}
		if (init == 'buy') {
			_table_buy = table[i];
		} else {
			_table_sale = table[i];
		}
		var div = document.createElement('div');
		div.innerHTML = '<table><tr><td><span>Остров: </span></td><td><a href="javascript:void(0)" onclick="setIsland(\'z\', \''+init+'\')">[Z]</a> <a href="javascript:void(0)" onclick="setIsland(\'g\', \''+init+'\')">[G]</a> <a href="javascript:void(0)" onclick="setIsland(\'p\', \''+init+'\')">[P]</a> <a href="javascript:void(0)" onclick="setIsland(\'0\', \''+init+'\')">[Все]</a></td></tr><tr><td><span>Сортировка: </span></td><td><a href="javascript:void(0)" onclick="setSort(\'near\', \''+init+'\')">[По району]</a> <a href="javascript:void(0)" onclick="setSort(\'count\', \''+init+'\')">[По количеству]</a> <a href="javascript:void(0)" onclick="setSort(\'cost\', \''+init+'\')">[По цене]</a> <a href="javascript:void(0)" onclick="setSort(\'0\', \''+init+'\')">[Без сортировки]</a></td></tr><tr><td><span>Порядок: </span></td><td><a href="javascript:void(0)" onclick="setOrder(\'1\', \''+init+'\')">[ASC]</a> <a href="javascript:void(0)" onclick="setOrder(\'0\', \''+init+'\')">[DESC]</a> </td></tr></table><br /><br />';
		var br = td.getElementsByTagName('br')[1];
		td.insertBefore(div, br.nextSibling);
		i++;
	}
	if (_table_buy != null) {
		break;
	}
}


renderTable();


root['setOrder'] = function (by, action) {
	data[action][2] = by;
	localStorage.setItem('s3k_fr', JSON.stringify(data));
	renderTable(action);
}


root['setIsland'] = function (island, action) {
	data[action][0] = island;
	localStorage.setItem('s3k_fr', JSON.stringify(data));
	renderTable(action);
}


root['setSort'] = function (sort, action) {
	data[action][1] = sort;
	localStorage.setItem('s3k_fr', JSON.stringify(data));
	renderTable(action);
}


function sortArray(sortBy, orderBy) {
	if (sortBy == '0') {
		return;
	}
	if (orderBy == '1') {
		fetch = fetch.sort(function(a,b) {if (a['v'] > b['v']) {return 1} else if (a['v'] < b['v']) { return -1} else {return 0}});
	} else {
		fetch = fetch.sort(function(a,b) {if (a['v'] > b['v']) {return -1} else if (a['v'] < b['v']) { return 1} else {return 0}});
	}
	return;
}


function renderTable(action) {
	if (_table_sale != null && (action == null || action == 'sale') && data['sale'].join('.') != '0.0.0') {
		var filter = data['sale'];
		fetch      = [];
		for (var i = 1, len = _table_sale.rows.length; i < len; i++) {
			var tr    = _table_sale.rows[i];
			var index = i - 1;
			tr.id     = i;
			var is_link = tr.cells[0].childNodes[0];
			var island  = /\[(G|Z|P|S)\]/.exec(is_link.textContent)[1].toLowerCase();
			if (filter[0] != '0') {
				if (filter[0] != island) {
					tr.style.display = 'none';
				} else {
					if (tr.style.display == 'none') {
						tr.style.display = '';
					}
				}
			} else {
				if (tr.style.display == 'none') {
					tr.style.display = '';
				}
			}
			if (filter[1] == 'near') {
				var style = is_link.getAttribute('style');
				if (style == null) {
					fetch[index] = {'i': i, 'v': 0, 'o': tr.cloneNode(true)};
				} else if (style.toLowerCase().indexOf('ed7c02') != -1 || style.indexOf('rgb(237') != -1) {
					fetch[index] = {'i': i, 'v': 1, 'o': tr.cloneNode(true)};
				} else if (style.toLowerCase().indexOf('ff0404') != -1 || style.indexOf('rgb(255') != -1) {
					fetch[index] = {'i': i, 'v': 2, 'o': tr.cloneNode(true)};
				}
			} else if (filter[1] == 'count') {
				var count = parseInt(tr.cells[1].textContent);
				fetch[index] = {'i': i, 'v': count, 'o': tr.cloneNode(true)};
			} else if (filter[1] == 'cost') {
				var cost = /\$(\d+)/.exec(tr.cells[2].textContent)[1];
				fetch[index] = {'i': i, 'v': cost, 'o': tr.cloneNode(true)};
			}
		}
		if (fetch.length != 0) {
			while (_table_sale.rows.length != 1) {
				_table_sale.deleteRow(_table_sale.rows.length - 1);
			}
			sortArray(filter[1], filter[2]);
			for (index in fetch) {
				_table_sale.appendChild(fetch[index]['o']);
			}
		}
	}
	if (_table_buy != null && (action == null || action == 'buy') && data['buy'].join('.') != '0.0.0') {
		var filter = data['buy'];
		fetch      = [];
		for (var i = 1, len = _table_buy.rows.length; i < len; i++) {
			var tr    = _table_buy.rows[i];
			var index = i - 1;
			tr.id     = i;
			var is_link = tr.cells[0].childNodes[0];
			var island  = /\[(G|Z|P|S)\]/.exec(is_link.textContent)[1].toLowerCase();
			if (filter[0] != '0') {
				if (filter[0] != island) {
					tr.style.display = 'none';
				} else {
					if (tr.style.display == 'none') {
						tr.style.display = '';
					}
				}
			} else {
				if (tr.style.display == 'none') {
					tr.style.display = '';
				}
			}
			if (filter[1] == 'near') {
				var style = is_link.getAttribute('style');
				if (style == null) {
					fetch[index] = {'i': i, 'v': 0, 'o': tr.cloneNode(true)};
				} else if (style.toLowerCase().indexOf('ed7c02') != -1 || style.indexOf('rgb(237') != -1) {
					fetch[index] = {'i': i, 'v': 1, 'o': tr.cloneNode(true)};
				} else if (style.toLowerCase().indexOf('ff0404') != -1 || style.indexOf('rgb(255') != -1) {
					fetch[index] = {'i': i, 'v': 2, 'o': tr.cloneNode(true)};
				}
			} else if (filter[1] == 'count') {
				var count = parseInt(tr.cells[1].textContent);
				fetch[index] = {'i': i, 'v': count, 'o': tr.cloneNode(true)};
			} else if (filter[1] == 'cost') {
				var cost = /\$(\d+)/.exec(tr.cells[2].textContent)[1];
				fetch[index] = {'i': i, 'v': cost, 'o': tr.cloneNode(true)};
			}
		}
		if (fetch.length != 0) {
			while (_table_buy.rows.length != 1) {
				_table_buy.deleteRow(_table_buy.rows.length - 1);
			}
			sortArray(filter[1], filter[2]);
			for (index in fetch) {
				_table_buy.appendChild(fetch[index]['o']);
			}
		}
	}
}

})();