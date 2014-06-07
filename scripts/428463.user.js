// ==UserScript==
// @name			Sind LVL
// @namespace		(SAVIOR)
// @description		Расчет синдового уровня
// @include			http://www.ganjawars.ru/syndicate.php*
// @version			1.2
// @author			(SAVIOR)
// ==/UserScript==

(function() {
//--------------------------------------------------------------------------------------------------
	function ajaxQuery(url, rmethod, param, async, onsuccess, onfailure) {
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.open(rmethod, url, async);
		xmlHttpRequest.send(param);

		//абортим запрос по истечении 10 сек, если сервер не отвечает
		var timeout = setTimeout(function(){ xmlHttpRequest.abort(); alert('Sind LVL: Сервер не отвечает');}, 10000);

		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState != 4) return;
			clearTimeout(timeout);
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') {
				onsuccess(xmlHttpRequest);
			} else {
				if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') {
					onfailure(xmlHttpRequest);
				}
			}
		}
	};
//--------------------------------------------------------------------------------------------------
	function butClick() {
		if (but.nextSibling.nodeType == 3) { //если расчет уже выведен, удаляем его
			but.parentNode.removeChild(but.nextSibling);
		}
		but.innerHTML = 'Идет поиск синдиката в рейтинге ';
		interval = setInterval(setPoint, 1000);
		getLvl();
		but.removeEventListener('click', butClick, false);
	};
//--------------------------------------------------------------------------------------------------
	var countPoint = 0;
	function setPoint() {
		if (countPoint > 10) {
			but.innerHTML = 'Идет поиск синдиката в рейтинге .';
			countPoint = 0;
		} else {
			but.innerHTML += '.';
		}
		countPoint++;
	};
//--------------------------------------------------------------------------------------------------
	function getExp(mass) {
		return mass[3] ? +(mass[1] + mass[2]) * 1000 : +(mass[1] + mass[2]);
	};
//--------------------------------------------------------------------------------------------------
	function getLvl() {
		url = 'http://www.ganjawars.ru/srating.php?page_id=' + page;
		ajaxQuery(url, 'GET', null, true, function(xml) {
					div.innerHTML = xml.responseText;
					var a = div.getElementsByTagName('a');
					for (var i = 0; i < a.length; i ++) {
						if (~a[i].innerHTML.indexOf(syndName)) {
							a = a[i];
							break;
						}
					}

					if (a.length) { //если ссылка на синд не найдена, идем на следующую страницу
						page++;
						setTimeout(function() {getLvl();}, 3000);
						return;
					}

					//формула: LVL = ((EXP * 2.4) + (PTS * 4/3))/ 100000;
					var temp = a.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
					temp = temp.split('/');
					var reg = /(\d+),?(\d*)(k?)/;
					var exp = getExp(reg.exec(temp[0]));
					var expb = getExp(reg.exec(temp[1]));
					var sum = (expb * 4 / 3) + (exp * 2.4);
					var level = Math.round(sum / 100000 / koef);
					var lvl = Math.round(sum / 100000);
					clearInterval(interval);
					but.innerHTML = 'Рассчет';
					tbl.insertBefore(root.document.createTextNode(' | Прогноз: ' + level + ' LVL :: Набит:' + lvl + ' LVL'), tbl.lastElementChild);
					but.addEventListener('click',  butClick, false);
					page = 0;
			},
			function(xml) {
				alert('Sind LVL: Ошибка ответа сервера');
			});
	};
//--------------------------------------------------------------------------------------------------
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	curDate = new Date().getDate();
	var koef;

	if (curDate <= 17 && curDate > 6 ) {
		koef = (curDate - 6) / 10;
	} else if (curDate <= 28 && curDate > 17) {
		koef = (curDate - 17)/10;
	} else if (curDate <= 6) {
		koef = (4 + curDate)/ 10;
	} else if (curDate > 28) {
		koef = (curDate - 28) / 10;
	}

	//ищем имя синда
	var tbl = root.document.getElementsByTagName('table');
	for (i = 0; i < tbl.length; i++) {
		if (tbl[i].className == 'wb' && tbl[i].getAttribute('bgcolor') == "#d0eed0") {
			var syndName = tbl[i].rows[0].cells[1].firstElementChild.innerHTML;
			tbl = tbl[i].firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
			break;
		}
	}


	var div = root.document.createElement('div');  //контейнер для данных ответа сервера
	var but = root.document.createElement('span'); //кнопка
		but.setAttribute('style', 'color:blue; cursor:pointer;');
		but.innerHTML = 'Рассчет';
	tbl.insertBefore(root.document.createTextNode(' | '), tbl.lastElementChild);
	tbl.insertBefore(but, tbl.lastElementChild);

	var page = 0;
	var interval;
	but.addEventListener('click', butClick, false);

})();