// ==UserScript==
// @author woodbaton <woodbaton@yandex.ru>
// @name HWM_Small_additions
// @updateURL https://userscripts.org/scripts/source/125732.meta.js
// @include http://*.heroeswm.ru/pl_info.php?*
// @include http://hommkingdoms.info/pl_info.php?*
// @include http://*.heroeswm.ru/pl_warlog.php?id*
// @include http://hommkingdoms.info/pl_warlog.php?id*
// @include http://*.heroeswm.ru/home.php
// @include http://hommkingdoms.info/home.php
// @include http://*.heroeswm.ru/inventory.php
// @include http://hommkingdoms.info/inventory.php
// @include http://*.heroeswm.ru/group_wars.php*
// @include http://hommkingdoms.info/group_wars.php*
// @description Скрипт добавляет несколько визуальных дополнений (The script adds a few visual additions) (19.02.2012)
// @version 0.7
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAFRQTFRFAAAAmWYz///MzJlm/8yZ//+ZZjMAmZlmzMxmMzMAzMyZ/8xm/5lmZmYzZjMzzJkzzGYzmWZmMwAAmZkzMzMzzGZm/5kz/5mZ////mWYAAAAA/8zM4OKs9QAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AIQCBg3t0Qe5QAAAeZJREFUSMe1ltdCIzEMRedaci9TNgXY///PlT1JgIWMzQN6naN6ZSXT9EtmUI3WYT6oZjzIW+V2BxrlldNK61EHktC6evCYg628JknATIO8OICrDTjYl+ZAMlOiAYc7Ty3+Wrr96sbPTrcWzj2HeZ9+45kVm2M8k3qPL3zo8o961Ajv/+x8HK3nwavq0OX9rOv27Hwdab8eXfWNutXDNM7LG5Cd6/DTnXd7OYzPn0H4wtcG3I3/Et8HTfljAN1svvP4v4DNWQT7/n5jqweulv8dP52CJX7oWFKsszngp7fggAyyNmfvkVqbUT/lRVWnogshe0uQAyS7j3kfz/e8tC2UsieyEITqxYqHvDQqHG2hAEpeIgylVPXC8S3MLNHVnkMcjvnmIbHlnZOSmoSH7+xPwY1X4EKhx0/GlFoPsdIWWNC9z0SmlhQITks/3QNUZMcaL6Ys+hduA8s0GVbEU7Z/4UwxiYGSPQJx7mcgLAun89kY2apsbTdBnQ/R9XpFqaJ3MngjyxNF37WmkPZh8qEABF5i5CqVvArJQTiZgx9IojmlBe4mLeDtyQYclC+rtiS8PSShsNGK5wVRwmU2H1ZHJAH+rs9fQlqMMZ83l7A+E49ecblcsI3/i5CZvP6Aryr40/R79g+96BFBT50/LQAAAABJRU5ErkJggg==
// ==/UserScript==

(function () {
	var RELOAD = true,
		SECONDS = 3,
		i, k, d = document,
		mt = "match",
		id = "getElementById",
		tg = "getElementsByTagName",
		cl = "getElementsByClassName",
		body = d[tg]('body')[0],
		bodyText = body.innerHTML,
		url = d.URL,
		nFavicon = "data:image/gif;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
			"WXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACZ0lEQVQ4y2NkIBFYqPHqB/g5" +
			"xHNwMcg+e/j5FUma4zxVzG6em/zhw4uZ//99W/d/0/Ssk0zEag5zUTNtmdi2S1Vflv/GkYsM7648" +
			"Yfj6+gsbUZpjPFRMH9+a9/bfvz3/756p/v/10fT/n05P+x9gILeKoOYAByWHu1e6Pv37t+P/k8uN" +
			"/399Wvj/z9N5//tKPfZK8jNz4dXsai7rdOdK45d/fzf8//Co5/+fDwv//7w+6X97luUSAU5GVrjC" +
			"QHt5X015QR5kzWZaovo3LlZ8/Pdv0//3D1r+//245P/P69P+9+ZaLRbjZWKGK+TlYGKa2xv9ce/c" +
			"7MeORjLaGgrCksZqohpHFoY++/tr+f9rR8v+/3qx6P/PqzP/92XZThbiYWZEtoiRgYGBoSjeeI6L" +
			"mXLyuz+8DO9evmL49e7Nd1t1ec6/7CwMJvYmDP9+cTNMX7Csv3Di/iJ0bzIzMDAwHL/4fBPD+0+v" +
			"2H79sZUTlWA3szNhffXuA8PvV78YJMREGKYt3zipY8HRom8//zJgNYCBgYHh09efr9TFBDL1zVQ4" +
			"2P+yMEjoSTGcOXPl74yNx6v6lp+uwaaZgYGBAZ6QZPlZXD2sDPmf3H3JcOHRI4bfL38wvPnNeH7p" +
			"rmud+GKKRUKQg0lDktumLMG9m5eJkUGRkY9h/7nr/498/MzIzMDITSidMKX7609ui7c5qMH2SfDU" +
			"60cPk+etMtpy/qbSpxfvPzIyMWs2Jzt34XWBEMs/d3EOdoYtJ89+nn7gqc2N5z+eMDB8Zfjx+5x1" +
			"kodWOzevlBheJzjpCPskOIjNUBNnNyfkXGwAAMY4AfHNNE7sAAAAJXRFWHRkYXRlOmNyZWF0ZQAy" +
			"MDEwLTAyLTEwVDAzOjI4OjI5LTA2OjAwW5X56QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0wNC0x" +
			"MlQyMjo0MzoxNC0wNTowMNTsImAAAAAASUVORK5CYII=";

	//Увеличивает мелкий шрифт
	if (url[mt]('home.php')) {
		body.innerHTML = bodyText.replace(/font-size:8|7px;color:/g,'font-size:10px; color:');
	}

	//Добавляет процент
	if (url[mt]('pl_info.php\?')) {
		win = bodyText[mt](/<td width=.40%.>&nbsp;&nbsp;Выиграно: <b>(\d*)<\/b><\/td>/)[1];
		lose = bodyText[mt](/<td width=.40%.>&nbsp;&nbsp;Проиграно: <b>(\d*)<\/b><\/td>/)[1];
		per = ((parseInt(win) * 100) / (parseInt(win) + parseInt(lose))).toFixed(2);
		body.innerHTML = bodyText.replace(/(<b>.*?&nbsp;&nbsp;\[\d+\]&nbsp;)/, "$1<font style=\"font-size: 11px; color: rgb(105, 97, 86);\">" + per + "%<\/font>");
	}

	//Выделяет бои с льдми/ботами
	if (url[mt]('pl_warlog.php')) {
		wars = body.innerHTML[mt](/(\d\d-\d\d-\d\d \d\d:\d\d).*/g);
			for (i = 0; i < wars.length; i++) {
				var el = wars[i];
				if (el[mt](/.*\[\d+\].* vs .*\[\d+\].*/)) {
					bodyText = bodyText.replace(el, el.replace(/(\d\d-\d\d-\d\d \d\d:\d\d)/g, '<font color="red">$1</font>'));
				}
			}
		body.innerHTML = bodyText;
	}
	
	//Функция подсветки инвентаря
	function updInvent() {
		inv = d[tg]('li');
		for (i = 1; i < inv.length; i++) {
			if (inv[i].innerHTML[mt]('Прочноcть: ')) {
				p = inv[i].innerHTML[mt](/: (\d+)\/(\d+)/);
				hard_g = p[2]; hard_c = p[1];
				switch (true) {
					case hard_c == 0: inv[i].parentNode.parentNode.parentNode.style.background = '#FFA07A'; break;
					case hard_c < hard_g*0.33: inv[i].parentNode.parentNode.parentNode.style.background = '#F0E68C'; break;
				}
			}
		}
	}

	if (url[mt]('inventory.php')) {
		d.addEventListener('click', function(){setTimeout(updInvent,1000)}, false);
		updInvent();
	}

	//Подсветка доступной охоты и изменение фавиконки
	if (url[mt]('group_wars.php')) {
		var tRow = d[cl]("wb")[0][tg]("tr"),
			status = 0;
		for (i = 0; i < tRow.length; i++) {
			var tCol = tRow[i][tg]("td"),
				flag = 0;
			for (k = 0; k < tCol.length; k++) {
				if (tCol[k].innerHTML[mt]("Охотник") || tCol[k].innerHTML[mt]("Вступить")) {
					flag++;
				}
			}
			if (flag == 2) {
				for (k = 0; k < tCol.length; k++) {
					tCol[k].style.backgroundColor = "#FFA07A";
					status++;
				}
			}
		}
		if (status) {
			var head = d[tg]("head")[0],
				links = head[tg]("link");
			for (i = 0; i < links.length; i++) {
				if (links[i].rel == "shortcut icon") {
					head.removeChild(links[i]);
				}
			}
			var link = d.createElement("link");
			link.setAttribute("href", nFavicon);
			link.setAttribute("type", "image/x-icon");
			link.setAttribute("rel", "shortcut icon");
			head.appendChild(link);
		} else if (RELOAD) {
				setTimeout('window.location.reload();', SECONDS * 1000);
		}
	}
})();