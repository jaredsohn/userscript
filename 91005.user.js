// ==UserScript==
// @name Vladenia Toolbar
// @namespace vladenia
// @description Тулбар для игры "Владения" вКонтакте.
// @version 1.7.0
// @include http://mapgame.artch.ru*
// @author Mr_Mig + Zx Spectrum
// ==/UserScript==

// Нравится кнопка?? Жди выхода нового скрипта для вКонтакте!
// http://vkontakte.ru/club19013663
// Н И К О Г Д А не ставьте скрипты из __непроверенных__ источников!
var AUTH_CODE;
var ID;
var my = {};
var region = "";
var doAction;
var moneytxt = document.getElementById("menu_money"), money;

// var selected={};

my.building_info = {
	normal : {
		name : 'Дом',
		price : 40
	},
	shop : {
		name : 'Магазин',
		price : 200,
		time : 600,
		color : '0000ff',
		desc : 'Небольшая торговая точка, ориентированная на клиентов в ближайших зданиях. Получает доход с домов на расстоянии 150&nbsp;метров. Для работы требуется склад.'
	},
	supermarket : {
		name : 'Супермаркет',
		price : 3000,
		time : 18000,
		color : '0000ff',
		desc : 'Крупное торговое предприятие, имеющее широкий охват территории. Получает доход с домов на расстоянии 600&nbsp;метров. Для работы требуется склад.'
	},
	tradecenter : {
		name : 'Торговый центр',
		price : 10000,
		time : 259200,
		color : '0000ff',
		desc : 'Огромное коммерческое здание, вмещающее различные торговые предприятия. Получает доход с домов на расстоянии до&nbsp;2&nbsp;километров. Для работы требуется склад.'
	},
	store : {
		name : 'Склад',
		price : 1000,
		time : 1800,
		color : '00aa00',
		desc : 'Оптовая база, обеспечивает товаром торговые предприятия на расстоянии до 3 километров и получает с них прибыль. Для работы требуется промышленность.'
	},
	factory : {
		name : 'Завод',
		price : 5000,
		time : 54000,
		color : 'ff0000',
		color2 : '000000',
		desc : 'Промышленное предприятие. Производит продукцию и продает на оптовые базы на расстоянии до 15 километров. Уменьшает на 20% доход с аренды всех обычных домов вокруг на расстоянии до&nbsp;1&nbsp;километра.'
	},
	hospital : {
		name : 'Больница',
		price : 3000,
		time : 21600,
		color : '00ffff',
		desc : 'Медицинское учреждение, увеличивающее доход с аренды всех обычных домов вокруг на расстоянии до&nbsp;1&nbsp;километра. Бонус зависит от стоимости больницы. Не приносит прибыли.'
	},
	school : {
		name : 'Школа',
		price : 1500,
		time : 7200,
		color : '00ffff',
		desc : 'Образовательное учреждение, увеличивающее доход с аренды всех обычных домов вокруг на расстоянии до&nbsp;500&nbsp;метров. Бонус зависит от стоимости школы. Не приносит прибыли.'
	},
	club : {
		name : 'Развлекательный центр',
		price : 1000,
		time : 7200,
		color : '00ffff',
		desc : 'Ресторан, клуб, боулинг и прочие увеселительные заведения. Получает небольшую прибыль со всех домов на расстоянии до&nbsp;1&nbsp;километра.'
	},
	theater : {
		name : 'Театр',
		price : 2000,
		time : 18000,
		color : '00ffff',
		desc : 'Культурный центр. Получает небольшую прибыль со всех домов на расстоянии до 5 километров.'
	},
	cafe : {
		name : 'Кафе',
		price : 150,
		time : 18000,
		desc : 'Пиццерия, бар, маленький ресторанчик. Привлекает клиентов из близлежащих домов на расстоянии 150 метров.'
	},
	hotel : {
		name : 'Гостиница',
		price : 8000,
		time : 18000,
		desc : 'Отель, ресторан и любимое место туристов. Получает небольшую прибыль со всех домов на расстоянии до 8 километров.'
	},
	sport : {
		name : 'Спорткомплекс',
		price : 15000,
		time : 18000,
		desc : 'Крупное спортивное учреждение, включающее стадион, бассейны и спортивно-образовательный центр. Получает небольшую прибыль со всех домов на расстоянии до 10 километров.'
	},
	megamall : {
		name : 'Мегамолл',
		price : 80000,
		time : 18000,
		desc : 'Торговый комплекс регионального значения. Получает доход с домов на расстоянии до 10 километров. Для работы требуется склад.'
	},
	office : {
		name : 'Офис',
		price : 0,
		time : 0,
		desc : 'Офис'
	},
	warehouse : {
		name : 'Оптовая база',
		price : 30000,
		time : 600,
		desc : 'Крупный поставщик, обеспечивает товаром торговые центры и мегамоллы на расстоянии до 6 километров и получает с них прибыль. Для работы требуется комбинат.'
	},
	plant : {
		name : 'Комбинат',
		price : 120000,
		time : 600,
		desc : 'Крупное промышленное предприятие. Производит продукцию и продает на оптовые базы на расстоянии до 30 километров. Уменьшает на 20% доход с аренды всех обычных домов вокруг на расстоянии до&nbsp;1&nbsp;километра.'
	}
};

function HashTable() {
	var obj = [];
	return {
		get : function(key) {
			return (obj[key] ? obj[key] : []);
		},
		put : function(key, value) {
			if (typeof obj[key] !== "object") {
				obj[key] = [];
			}
			obj[key].push(value);
		}
	}
}

Array.prototype.filter = function(filter) {
	var tmp = [];
	var el;
	if (this.length > 0) {
		for (i = this.length - 1; i >= 0; i--) {
			el = this[i];
			if (typeof filter !== 'function') {
				if (el == filter) {
					tmp.push(el);
				}
			} else {
				if (filter(el)) {
					tmp.push(el);
				}
			}
		}
		return tmp;
	} else {
		return [];
	}
}

function Asset(id, name, level, type, rent, canAct, actPrice) {
	return {
		id : id,
		name : name,
		level : level,
		type : type,
		rent : rent,
		canAct : canAct,
		actPrice : actPrice
	}
}
my.parseTable = function() {
	var assets = new HashTable();
	var table = document.getElementById("my_assets_list_content");
	var rows = table.getElementsByTagName("tr");

	var id, name, level, type, typeSrc, img, rent, canAct, actPrice;

	for (var i = rows.length - 1; i >= 0; i--) {
		var innerTd = rows[i].getElementsByTagName("td");
		if (innerTd.length > 0) {
			if (innerTd[1].innerHTML == "Дом") {
				name = innerTd[0].innerHTML.match(/(.*?)\s+\&/)[1];
				try {
					level = parseInt(innerTd[2].getElementsByTagName("span")[0].innerHTML);
				} catch (e) {
					level = 100;
				}

				img = innerTd[2].getElementsByTagName("img")[0];
				id = parseInt(innerTd[0].innerHTML.match(/show_asset\((\d+)/)[1]);

				try {
					rent = parseInt(innerTd[4].getElementsByClassName("price")[0].innerHTML)
							+ parseInt(innerTd[3]
									.getElementsByClassName("price")[0]
									.getElementsByClassName("money_decimal")[0].innerHTML
									.match(/\d+/)[0].toString()) / 100;
				} catch (e) {
					rent = -1;
				}
				if (innerTd[6].getElementsByTagName("img")[0]
						&& (doAction == 0 && rent != 0 || doAction == 1)) {
					canAct = /home-small/.test(innerTd[6]
							.getElementsByTagName("img")[0].src);
				} else {
					canAct = false;
				}
				if (img) {
					typeSrc = img.src;
					if (/club.png/.test(typeSrc))
						type = "club";
					else if (/factory.png/.test(typeSrc))
						type = "factory";
					else if (/school.png/.test(typeSrc))
						type = "school";
					else if (/shop.png/.test(typeSrc))
						type = "shop";
					else if (/store.png/.test(typeSrc))
						type = "store";
					else if (/supermarket.png/.test(typeSrc))
						type = "supermarket";
					else if (/tradecenter.png/.test(typeSrc))
						type = "tradecenter";
					else if (/theater.png/.test(typeSrc))
						type = "theater";
					else if (/hospital.png/.test(typeSrc))
						type = "hospital";
					else if (/office.png/.test(typeSrc))
						type = "office";
					else if (/cafe.png/.test(typeSrc))
						type = "cafe";
					else if (/hotel.png/.test(typeSrc))
						type = "hotel";
					else if (/sport.png/.test(typeSrc))
						type = "sport";
					else if (/megamall.png/.test(typeSrc))
						type = "megamall";
					else if (/plant.png/.test(typeSrc))
						type = "plant";
					else if (/warehouse.png/.test(typeSrc))
						type = "warehouse";
				} else {
					type = "normal";
				}
				console.log(type);

				if (canAct) {
					actPrice = Math.round(my.building_info[type].price
							* (Math.pow(1.25, level) - Math
									.pow(1.25, level - 1)))
				};

				assets.put(type, new Asset(id, name, level, type, rent, canAct,
								actPrice));
			}
		}
	}
	return assets;
};

my.chainAjax = function(urlArray, callback) {
	var xhr = new XMLHttpRequest();
	var counter = urlArray.length;

	var handleResponse = function(data) {
		if (typeof callback == 'function') {
			callback(data, urlArray.length, counter);
		}
		sendRequest();
	};

	var sendRequest = function() {
		if (counter > 0) {
			counter--;
			xhr.open('GET', urlArray[counter][0], true);
			xhr.send();
		} else {
			xhr = null;
			return;
		}
	};

	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				money += urlArray[counter][1];
				var cents = Math.round((money - Math.floor(money)) * 100);
				moneytxt.innerHTML = Math.floor(money)
						+ "<span class='money_decimal'>,"
						+ (cents < 10 ? "0" : "")
						+ Math.round((money - Math.floor(money)) * 100)
						+ "</span>";

				if (typeof callback == 'function') {
					handleResponse(xhr.responseText);
				}
			}
		}
	}
	sendRequest();
};

my.getDlg = function(action) {
	var d = document.getElementById("vlad-dlg");
	if (!d) {
		d = document.createElement("div");
		d.id = "vlad-dlg";
		document.body.appendChild(d);
		d.innerHTML = '<div class="dlg popup_box_container message_box" id="" style="width: 480px; height: auto; top: 144.333px; margin-left: -250px; opacity: 1; "> <div class="box_layout"> <div class="box_title_wrap"> <div class="box_title">Сообщение</div> </div> <div style="padding: 0px;" class="box_body">  <div style="opacity: 0.3; margin-top: 0px;" class="flist_shadow"></div> <div style="opacity: 0.11; margin-top: 1px;" class="flist_shadow"></div> <div style="opacity: 0.07; margin-top: 2px;" class="flist_shadow"></div> <div style="opacity: 0.03; margin-top: 3px;" class="flist_shadow"></div> <div class="dlg_body" style="min-height: 30px; overflow: auto; padding: 10px; font-size: 13px"> <div class="dialog_content" id="vlad-dlg-content"><div style="clear: left; float: left; height: 1px; position: relative;"></div> </div> </div> <div style="opacity: 0.03; margin-top: -4px;" class="flist_shadow"></div> <div style="opacity: 0.07; margin-top: -3px;" class="flist_shadow"></div> <div style="opacity: 0.11; margin-top: -2px;" class="flist_shadow"></div> <div style="opacity: 0.3; margin-top: -1px;" class="flist_shadow"></div> <div style="opacity: 0.8; margin-top: 0px; background-color: rgb(255, 255, 255); width: 476px;" class="flist_shadow"></div> </div> <div class="box_controls_wrap"> <div class="box_controls"> <div class="button_yes btn" id="button_1"><div onmousedown="$(this).addClass(\'down\')" onmouseout="$(this).removeClass(\'down\')">Ок</div> </div>  <div class="button_no btn" id="button_0"> <div onmousedown="$(this).addClass(\'down\')" onmouseout="$(this).removeClass(\'down\')">Закрыть/Отмена</div> </div>  <div class="controls_wrap"><a id="btn_select_all" href="#"> </a></div> </div> </div> </div> </div>';
		document.getElementById("button_0").addEventListener("click",
				function() {
					document.body.removeChild(d);
				}, false);
		if (typeof action === 'function') {
			document.getElementById("button_1").addEventListener("click",
					function(e) {
						e.stopPropagation();
						action();
					}, true);
		}
	}
	return d;
};

my.closeDlg = function() {
	document.body.removeChild(document.getElementById('vlad-dlg'));
};

my.showMsg = function(html) {
	my.getDlg();
	document.getElementById("vlad-dlg-content").innerHTML = html;
}

my.showDlg = function(html, action) {
	my.getDlg(action);
	my.showMsg(html);
};

if (/mapgame.artch.ru/.test(window.location.href)) {

	try {
		AUTH_CODE = window.location.href.match(/auth_key=(.+)\&language/)[1];
		ID = window.location.href.match(/viewer_id=(\d+)/)[1];
	} catch (e) {
	};
	if (!console.log) {
		console.log = opera.postError
	};

	my.sum = function(array) {
		var sum = 0;
		for (var i = array.length - 1; i >= 0; i--) {
			if (doAction == 0)
				sum += array[i].actPrice;
			else if (doAction == 1)
				sum += Math.round(my.building_info[array[i].type].price
						* Math.pow(1.25, array[i].level - 1) * 0.7);
			else if (doAction == 2)
				sum += array[i][1];
		}
		return sum;
	};

	my.showBldCounter = function(assets) {
		var x = document.getElementById("bldSelector");
		var html = ["<table style='width:100%'><col width='190px'/><col width='50px'><col width='100px'/><tr><th>Тип</th><th style='text-align: center;'>Всего</th><th style='text-align: center;white-space: nowrap;'>"
				+ (doAction == 0
						? "Улучшаемых"
						: "<font color=red>К продаже</b>")
				+ "</th><th style='text-align: center;'>"
				+ (doAction == 0 ? "Стоимость" : "Выручка") + "</th></tr>"];
		var low = parseInt(document.getElementById("uStartLvl").value);
		var high = parseInt(document.getElementById("uStopLvl").value);
		var filtered;
		if (x) {
			var j = 0;
			for (var i in my.building_info) {
				filtered = assets.get(i).filter(function(x) {
							return x.level >= low && x.level <= high
						}).filter(function(x) {
							return x.canAct;
						}).filter(function(x) {
							return x.name.indexOf(region) != -1;
						});
				html
						.push("<tr><td><input type='checkbox' name='buildingtype' style='margin-right: 8px;' value='"
								+ i
								+ "'"
								+ (document.getElementsByName("buildingtype")[j].checked
										? " checked"
										: "")
								+ ">"
								+ my.building_info[i].name
								+ "</input> </td><td style='text-align: center;'>"
								+ assets.get(i).filter(function(x) {
											return x.name.indexOf(region) != -1;
										}).length
								+ "</td><td style='text-align: center;'>"
								+ filtered.length
								+ "</td><td style='text-align: right;'>"
								+ my.sum(filtered) + "</td><tr>");
				j++;
			}
			html.push("</table>");
			x.innerHTML = html.join("");
		}
	};

	my.upgradeAll = function() {
		var assets = my.parseTable();
		var html = ["<center>"
				+ (doAction == 0
						? "Информация об улучшениях"
						: "Информация о <font color=red><b>продаже</b></font>")
				+ "</center><br/><div id='bldSelector'><table style='width:100%'><col width='190px'/><col width='50px'><col width='100px'/><tr><th>Тип</th><th style='text-align: center;'>Всего</th><th style='text-align: center;white-space: nowrap;'>"
				+ (doAction == 0
						? "Улучшаемых"
						: "<font color=red>К продаже</b>")
				+ "</th><th style='text-align: center;'>"
				+ (doAction == 0 ? "Стоимость" : "Выручка") + "</th></tr>"];
		var j = 0;
		var filtered;
		for (var i in my.building_info) {
			filtered = assets.get(i).filter(function(x) {
						return x.name.indexOf(region) != -1;
					});
			if (doAction == 0) {
				filtered = assets.get(i).filter(function(x) {
							return x.name.indexOf(region) != -1
									&& x.type != 'office'
						});
			}
			html
					.push("<tr><td><input type='checkbox' name='buildingtype' style='margin-right: 8px;' value='");
			html.push(i);
			html.push("'");
			if (typeof document.getElementsByName("buildingtype")[j] != "undefined")
				html.push(document.getElementsByName("buildingtype")[j].checked
						? " checked"
						: "");
			html.push(">" + my.building_info[i].name);
			html.push("</input> </td><td style='text-align: center;'>")
			html.push(filtered.length);
			html.push("</td><td style='text-align: center;'>");
			html.push(filtered.filter(function(x) {
						return x.canAct
					}).length);
			html.push("</td><td style='text-align: right;'>");
			html.push(my.sum(filtered.filter(function(x) {
						return x.canAct
					})));
			html.push("</td><tr>");
			j++;
		}
		html.push("</table></div>");
		html.push("С адресом: <input type='text' id='region' size='30' value='"
				+ region + "'><br>");
		html
				.push("С уровня: <select id='uStartLvl' style='margin: 10px 20px;'>");
		for (var i = 1; i <= 20; i++) {
			html.push("<option value='" + i + "'>" + i + "</option>");
		}
		html
				.push("</select>По уровень:<select id='uStopLvl' style='margin: 10px 20px;'>");
		for (var i = 20; i > 0; i--) {
			html.push("<option value='" + i + "'>" + i + "</option>");
		}
		html.push("</select>");
		my.showDlg(html.join(""), function() {
			var chbs = document.getElementsByName("buildingtype");
			var selType, minLvl, maxLvl;
			var price = 0;
			minLvl = parseInt(document.getElementById("uStartLvl").value);
			maxLvl = parseInt(document.getElementById("uStopLvl").value);
			var urls = [];
			var forUpgrade = [];
			for (var j = chbs.length - 1; j >= 0; j--) {
				if (chbs[j].checked) {
					selType = chbs[j].value;
					price += parseInt(chbs[j].parentNode.parentNode
							.getElementsByTagName("td")[3].innerHTML);
					var array = assets.get(selType).filter(function(x) {
								return x.canAct
							});
					for (var i = array.length - 1; i >= 0; i--) {
						if (array[i].level >= minLvl
								&& array[i].level <= maxLvl
								&& array[i].name.indexOf(region) != -1) {
							if (doAction == 0)
								urls.push([
										"/upgrade_house.php?viewer_id=" + ID
												+ "&user_id=" + ID
												+ "&auth_key=" + AUTH_CODE
												+ "&ids=" + array[i].id,
										-array[i].actPrice]);
							if (doAction == 1)
								urls.push([
										"/sell.php?viewer_id=" + ID
												+ "&user_id=" + ID
												+ "&auth_key=" + AUTH_CODE
												+ "&id=" + array[i].id,
										array[i].actPrice]);
						}
					}
				}
			}

			my.closeDlg();
			my
					.showDlg(
							(doAction == 0
									? "Будет проведено улучшение"
									: "Будет продано")
									+ " <b>"
									+ urls.length
									+ "</b> строений за <b>"
									+ price
									+ "</b><img src='http://mapgame.artch.ru/img/point.png'>!",
							function() {
								var moneyarr = moneytxt.innerHTML
										.match(/(\d+).*,(\d+)/);
								money = parseFloat(moneyarr[1] + "."
										+ moneyarr[2]);

								my.chainAjax(urls, function(d, all, left) {
											my.showMsg("Осталось "
													+ (doAction == 0
															? "улучшить"
															: "продать")
													+ " <b>" + left
													+ "</b> из <b>" + all
													+ "</b> строений.");
										});
								my.closeDlg();
							});
		});

		var btnregion = document.getElementById("btnregion");
		document.getElementById("region").addEventListener('keyup', function() {
					region = document.getElementById("region").value;
					my.showBldCounter(assets);
				}, false);
		document.getElementById("uStartLvl").addEventListener('change',
				function() {
					my.showBldCounter(assets);
				}, false);
		document.getElementById("uStopLvl").addEventListener('change',
				function() {
					my.showBldCounter(assets);
				}, false);
	};

	var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
			'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	Number.prototype.format2D = function() {
		var result = Math.floor(this);
		if (result < 10) {
			return '0' + result;
		} else {
			return result;
		}
	};

	my.calculate = function() {
		if (start >= end) {
			return;
		}
		var price = 0;
		var hours = 0;
		var newPrice = 0;
		
		function getUpgradeHours(type){
			switch(type){
				case "normal": return 4;
				break;
				case "hospital": return 72;
				break;
				case "school": return 72;
				break;
				default : return 12;
				break;
			}
		}

		for (var i = parseInt(start); i < end; i++) {
			newPrice = my.building_info[type].price * Math.pow(1.4, i - 1);
			hours = hours + getUpgradeHours(type);
			price = price + newPrice;
		}

		var end_time = new Date();
		end_time.setTime(end_time.getTime() + hours * 3600 * 1000);
		var end_time_str = end_time.getDate() + '&nbsp;'
				+ months[end_time.getMonth()] + '&nbsp;в&nbsp;'
				+ end_time.getHours().format2D() + ':'
				+ end_time.getMinutes().format2D();

		var content = 'Будет стоить: <strong>' + Math.round(price * 0.25)
				+ '</strong>&nbsp;';
		content += '&nbsp;&nbsp;&nbsp;&nbsp;и займёт: <strong>' + hours
				+ '</strong> часов&nbsp;&nbsp;&nbsp;&nbsp;Завершение: <strong>'
				+ end_time_str + '</strong>.';
		b.innerHTML = content;
	};

	my.toggleFix = function(el) {
		console.log(el);
		var fixed = document.getElementById("my_assets_list_content")
				.getAttribute("fixed");
		if (fixed) {
			document.getElementById("my_assets_list_content").style.height = "auto";
			document.getElementById("my_assets_list_content").style.overflowY = "visible";
			document.getElementById("my_assets_list_content").setAttribute(
					"fixed", "");
			el.innerHTML = "Фиксировать";
			localStorage["fix"] = "0";
		} else {
			document.getElementById("my_assets_list_content").style.height = "348px";
			document.getElementById("my_assets_list_content").style.overflowY = "auto";
			document.getElementById("my_assets_list_content").setAttribute(
					"fixed", "fixed");
			el.innerHTML = "Расфиксировать";
			localStorage["fix"] = "1";
		}
	};

	my.checkFix = function() {
		var flag = localStorage["fix"] === "1";
		if (flag) {
			document.getElementById("my_assets_list_content").setAttribute(
					"fixed", "true");
			document.getElementById("my_assets_list_content").style.height = "348px";
			document.getElementById("my_assets_list_content").style.overflowY = "auto";
		} else {
			document.getElementById("my_assets_list_content").setAttribute(
					"fixed", "");
		}
		return flag;
	};
	var bg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%F4%00%00%01%20%08%03%00%00%00u%A7q%81%00%00%00%CCPLTE%FF%FF%FF%7B%8E%B5p%84%AFh~%ABcy%A8%E8%E8%E8%EA%E9%E9%E0%E0%DF%E2%E2%E2%E6%E6%E6%F3%F2%F3%E7%E7%E7%F5%F4%F5%E4%E4%E3%F1%F2%F1%F0%F1%F0%F5%F6%F6%F3%F3%F4%E4%E5%E5%DC%DC%DC%F4%F4%F4%E1%E0%E0%EC%EB%EC%EC%EC%EC%EE%EE%ED%EF%EF%EF%F0%F0%F0%FF%FF%FFJd%9B%EB%EB%EA%DE%DD%DD%DF%DE%DF%DB%DB%DB%5Ct%A9l%A8Qh%A5L%5Dv%AAk%A8Pi%A6Mbz%ACYs%A8u%AD%5Bt%ADZm%A9Rp%ABVh%A6Lo%AAUn%A9TZt%A8j%A7Or%ACXi%A7N%5Cu%A9%5Ew%AAs%ACYq%ABW%8A%9C%C2%5Bt%A8az%AC%60y%AB_x%ABYr%A7%98%C2%86u%AE%5CXr%A7g%A5KYr%A8c%7B%AD%D4%E0fh%00%00%00%01tRNS%00%40%E6%D8f%00%00%02%2BIDATx%5E%ED%D1%B5n%1C%0A%00E%C1%BB%60ff%0833%C3%FB%FF%7F%8A-e%93'%A5M%5C%EC%9D%E9N%7DrT%87%AC%D7!%CBu%C8v%1D%B2Q%87%2C%D6!%ABu%C8Z%1DrX%87%1C%D4!%FBu%C8%5E%1D%B2%5B%87%9C%D4!%B3u%C8L%1D%B2T%87%2C%D4!%9Bu%C8J%1D2_%87%EC%D4!su%C8Y%1DrZ%87l%D5!%E7u%98%9A%E9%98%8E%E9%98n%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3Ay%5B%87%FCW%87%86%E9%98N%EE%D4!%EF%EB%90%0Fu(%9CN%3E%D6%A1p%3AyU%87%DC%ACC%5E%D6!%D7%EA%90wu%C8%D3%3A%E4n%1D%F2%BD%0E%F9T%87%C2%E9%E4k%1D%AEx%3A%A6c%3A%A6c%3A%A6c%3A%A6c%3A%A6%9B%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98N%3E%D7!_%EA%90%7Bu%C8%FD%3A%E4u%1D%F2%BC%0EyS%87%3C%ACC%1E%D7!O%EA%90%07u%C8%F5%3A%E4V%1D%F2%AC%0EyQ%87%DC%AEC%1E%D5!7%EA%90ou%F8%EB%D31%1D%D31%1D%D31%1D%D31%1D%D31%1D%D31%DDtL%C7tL%C7tL%C7tL%C7tL%C7tL%C7tL%C7tL%C7trT%87%AC%D7!%CBu%C8v%1D%B2Q%87%2C%D6!%ABu%C8Z%1Dr8%F58%9E%F8%D99%98~%8C%07%97%C6%93%CC~%01F%17%CFG%BF*%7B%0D%18%0E%86%BF%23%BB%15%18%FE%2FrR%87%CC%D6!3u%C8R%1D%B2P%87l%D6!%2Bu%C8%7C%1D%B2S%87%CC%D5!gu%C8i%1D%B2U%87%9C%D7aj%A6c%3A%A6c%BA%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%98%8E%E9%E4%EA%00%00%00%00p4%91%1E4%3E%A7%F19%8D%CF%F9%C7%CF%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%E3%89%F4%60%3C%B84N%13F%17%CFG%E9%C2p0L%1B%FE%7C%0E%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%3F%00%3E(%10%F1%C6%1F%FF%1B%00%00%00%00IEND%AEB%60%82";
	var type = 'normal';
	var start = 1;
	var end = 2;

	var x11 = document.createElement("div");
	document.getElementById("cont_my_assets").insertBefore(x11,
			document.getElementById("assets_stats_block"));
	x11.style.position = "relative";
	x11.style.padding = "5px";
	x11.style.height = "38px";
	x11.style.top = "0";
	x11.style.background = "url(\"" + bg + "\") repeat-x top";

	var up = document.createTextNode("Улучшить: ");
	x11.appendChild(up);

	var ddl = document.createElement("select");

	for (var i in my.building_info) {
		ddl.innerHTML = ddl.innerHTML + "<option value='" + i + "'>"
				+ my.building_info[i].name + "</option>";
	}

	ddl.style.width = "150px";
	ddl.style.margin = "0px 10px";
	ddl.style.padding = "0";
	ddl.addEventListener('change', function(e) {
				type = e.target.value;
				my.calculate();
			}, false);
	x11.appendChild(ddl);

	x11.appendChild(document.createTextNode("с начального уровня: "));

	var ddl1 = document.createElement("select");
	for (var i = 1; i < 20; i++) {
		ddl1.innerHTML = ddl1.innerHTML + "<option value='" + i + "'>" + i
				+ "</option>";
	}
	ddl1.style.width = "60px";
	ddl1.style.margin = "0px 10px";
	ddl1.style.padding = "0";
	ddl1.addEventListener('change', function(e) {
				start = e.target.value;
				my.calculate();
			}, false);
	x11.appendChild(ddl1);

	x11.appendChild(document.createTextNode("до желаемого уровня: "));

	var ddl2 = document.createElement("select");
	for (var i = 2; i < 21; i++) {
		ddl2.innerHTML = ddl2.innerHTML + "<option value='" + i + "'>" + i
				+ "</option>";
	}
	ddl2.style.width = "60px";
	ddl2.style.margin = "0px 10px";
	ddl2.style.padding = "0";
	ddl2.addEventListener('change', function(e) {
				end = e.target.value;
				my.calculate();
			}, false);
	x11.appendChild(ddl2);

	var br = document.createElement("br");
	x11.appendChild(br);

	var b = document.createElement("span");
	b.style.lineHeight = "24px";
	b.innerHTML = "";
	b.style.position = "relative";
	b.style.margin = "2px 0px";
	x11.appendChild(b);

	my.calculate();

	btn123 = document.createElement("button");
	btn123.innerHTML = "Улучшить всё!";
	btn123.style.cssFloat = "right";
	btn123.style.cursor = "pointer";
	btn123.addEventListener("click", function() {
				doAction = 0;
				my.upgradeAll();
			}, true);
	document.getElementById("my_assets_list_block")
			.getElementsByClassName("view_options")[0].appendChild(btn123);

	btn2 = document.createElement("button");
	btn2.innerHTML = "Продать всё!";
	btn2.style.cssFloat = "right";
	btn2.style.cursor = "pointer";
	btn2.addEventListener("click", function() {
				doAction = 1;
				my.upgradeAll();
			}, true);
	document.getElementById("my_assets_list_block")
			.getElementsByClassName("view_options")[0].appendChild(btn2);

	var link123 = document.createElement("a");
	link123.style.color = "black";
	link123.style.borderBottom = "1px dashed black";
	link123.style.marginLeft = "10px";
	document.getElementById("my_assets_list_block")
			.getElementsByClassName("view_options")[0].appendChild(link123);
	link123.addEventListener("click", function() {
				my.toggleFix(link123);
			}, false);
	link123.innerHTML = my.checkFix() ? "Расфиксировать" : "Фиксировать";

	document.getElementById("menu_friend_assets").style.width = "130px";
}
