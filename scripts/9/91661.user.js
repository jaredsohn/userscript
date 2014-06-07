// ==UserScript==
// @name D&C Log Parser
// @include http://www.the-game.ru/blackframes/comm_browse_msg/on/*
// @include http://www.the-game.ru/blackframes/load_msg/on/*
// ==/UserScript==

new function () {
	var _this = this;
	var _divId = 0;
	_this.execute = _execute;

	function _execute() {
		var divBattle = document.getElementsByTagName("div")[0];
		if (!divBattle || (divBattle.className != "battle_log"))
			return;

		if (window.frameElement && (parent.location.href.indexOf("communicator") == -1)) {
			var a = document.createElement("a");
			a.href = window.location.href;
			a.target = "_blank";
			a.appendChild(document.createTextNode("Статистика"));
			document.body.appendChild(a);
			return;
		}

		var as = document.getElementsByTagName("a");
		var a = as[0].href.indexOf("playerinfo") == -1 ? as[0] : as[1];
		var planetId = a.href.match(/[0-9]+:[0-9]+/)[0];
		var planetName = a.innerHTML;

		var uls = document.getElementsByTagName("ul");
		var players = _parsePlayers(uls[0], true).concat(_parsePlayers(uls[1], false));

		var div = document.createElement("div");
		a = document.createElement("a");
		a.href = "/planet/?planetid=" + planetId;
		a.target = "_top";
		a.appendChild(document.createTextNode(planetName));
		div.appendChild(document.createTextNode("В системе "));
		div.appendChild(a);
		div.appendChild(document.createTextNode(" произошел бой"));
		div.appendChild(document.createElement("br"));

		_createPlayerList(div, players, true, "Враги:", "hot2");
		_createPlayerList(div, players, false, "Союзники:", "o");

		var units = {};
		var divs = divBattle.getElementsByTagName("div");
		var ELEMENT_NODE = 1;
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].className != "sh")
				continue;
			var elems = [];
			for (var j = 0; j < divs[i].childNodes.length; j++) {
				var child = divs[i].childNodes[j];
				if (child.nodeType == ELEMENT_NODE)
					elems.push(child);
			}
			var damage = 0;
			if (elems[3].className == "hit") {
				damage = new Number(elems[3].childNodes[1].nodeValue.split("/")[0]);
			}
			var couple = [_parseUnit(elems[0]), _parseUnit(elems[2])];
			for (var j = 0; j < couple.length; j++) {
				var unitName = couple[j].name;
				if (couple[j].owner)
					unitName += "_" + couple[j].weight + "_" + couple[j].owner;
				if (!units[unitName])
					units[unitName] = couple[j];
				else {
					if (couple[j].cntDestroyed)
						units[unitName].cntDestroyed++;
				}
				if (j == 0)
					units[unitName].dmgDone += damage;
				else
					units[unitName].dmgTaken += damage;
			}
		}

		div.appendChild(_createUnitTable(units, players, false, "Наши незначительные потери"));
		div.appendChild(_createUnitTable(units, players, true, "Огромные потери противника"));
		
		_addSpoiler("Статистика", document.body, div);

		var divCode = document.createElement("div");
		var textarea = document.createElement("textarea");
		textarea.value =
			"[spoiler=Статистика боя]" +
			"В системе [planet=" + planetId + "] произошел бой\r\n" +
			_createPlayerListCode(players, true, "Враги:", "red") +
			_createPlayerListCode(players, false, "Союзники:", "lime") +
			_createUnitTableCode(units, "Наши незначительные потери", false) + "\r\n\r\n" +
			_createUnitTableCode(units, "Огромные потери противника", true) +
			"[/spoiler]";
		divCode.appendChild(textarea);
		_addSpoiler("Код для коммуникатора", div, divCode);
	}

	function _parsePlayers(ul, isEnemy) {
		var result = [];
		if (!ul)
			return result;
		var lis = ul.getElementsByTagName("li");
		for (var i = 0; i < lis.length; i++) {
			var a = lis[i].getElementsByTagName("a")[0];
			var span = lis[i].getElementsByTagName("span")[0];
			result.push(
				{
					name: a.innerHTML,
					id: a.href.match(/[0-9]+/)[0],
					action: span.innerHTML,
					"isEnemy": isEnemy
				}
			);
		}
		return result;
	}

	function _createPlayerList(div, players, isEnemy, title, titleClassName) {
		var span = document.createElement("span");
		span.className = titleClassName;
		span.appendChild(document.createTextNode(title));
		div.appendChild(span);
		var ul = document.createElement("ul");
		for (var i = 0; i < players.length; i++) {
			if (players[i].isEnemy != isEnemy)
				continue;
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.target = "_top";
			a.href = "javascript:HelpWnd('/frames/playerinfo/on/" + players[i].id + "')";
			a.appendChild(document.createTextNode(players[i].name));
			li.appendChild(a);
			li.appendChild(document.createTextNode(" - " + players[i].action));
			ul.appendChild(li);
		}
		div.appendChild(ul);
	}

	function _parseUnit(el) {
		result = {dmgDone: 0, dmgTaken: 0, cntDestroyed: 0};
		if (el.style.textDecoration == "line-through") {
			el = el.childNodes[0];
			result.cntDestroyed = 1;
		}
		if (el.nodeName.toLowerCase() == "span") {
			var text = el.innerHTML.replace(/(\t|\r|\n)/g, "");
			var props = text.split("(");
			result.name = props[0];
			props = props[1].split(",");
			result.weight = props[0].substr(0, props[0].length - 2);
			result.owner = props[1].substr(0, props[1].length - 1);
			result.isEnemy = el.className == "enemy_ship";
		} else {
			result.name = el.innerHTML;
		}
		return result;
	}

	function _createUnitTable(units, players, isEnemy, title) {
		var table = document.createElement("table");
		table.cellSpacing = 1;
		table.cellPadding = 2;
		table.style.backgroundColor = "silver";
		table.style.fontSize = "100%";
		table.style.marginBottom = "10";
		var row = table.insertRow(-1);
		row.align = "center";
		row.style.backgroundColor = "black";
		row.style.fontWeight = "bold";
		var cell = row.insertCell(-1);
		cell.innerHTML = "Название";
		cell = row.insertCell(-1);
		cell.innerHTML = "Масса";
		cell = row.insertCell(-1);
		cell.innerHTML = "Владелец";
		cell = row.insertCell(-1);
		cell.innerHTML = "Нанес повреждения";
		cell = row.insertCell(-1);
		cell.innerHTML = "Получил повреждения";
		cell = row.insertCell(-1);
		cell.innerHTML = "Потеряно";

		var totalDestroyed = 0;
		var totalDmgDone = 0;
		var totalDmgTaken = 0;
		for (var name in units) {
			var unit = units[name];
			if (!((unit.isEnemy == isEnemy) || (!isEnemy && !unit.owner)))
				continue;
			var player = null;
			for (var i = 0; i < players.length; i++) {
				if (players[i].name == unit.owner) {
					player = players[i];
					break;
				}
			}
			row = table.insertRow(-1);
			row.style.backgroundColor = "black";
			cell = row.insertCell(-1);
			cell.innerHTML = unit.name;
			cell.align = "center";

			cell = row.insertCell(-1);
			cell.innerHTML = unit.weight ? unit.weight : "&nbsp;";
			cell.align = "right";

			cell = row.insertCell(-1);
			cell.align = "center";
			if (player) {
				var a = document.createElement("a");
				a.target = "_top";
				a.href = "javascript:HelpWnd('/frames/playerinfo/on/" + player.id + "')";
				a.appendChild(document.createTextNode(player.name));
				cell.appendChild(a);
			} else {
				cell.innerHTML = unit.owner ? unit.owner : "&nbsp;";
			}

			cell = row.insertCell(-1);
			cell.innerHTML = unit.dmgDone ? Math.round(unit.dmgDone) : "&nbsp;";
			cell.align = "right";

			cell = row.insertCell(-1);
			cell.innerHTML = unit.dmgTaken ? Math.round(unit.dmgTaken) : "&nbsp;";
			cell.align = "right";

			cell = row.insertCell(-1);
			cell.innerHTML = unit.cntDestroyed ? unit.cntDestroyed : "&nbsp;";
			cell.align = "right";

			totalDmgDone += unit.dmgDone;
			totalDmgTaken += unit.dmgTaken;
			totalDestroyed += unit.cntDestroyed;
		}

		row = table.insertRow(-1);
		row.style.backgroundColor = "black";
		row.style.fontWeight = "bold";
		cell = row.insertCell(-1);
		cell.innerHTML = "Всего";
		cell.align = "center";
		cell = row.insertCell(-1);
		cell.innerHTML = "&nbsp;";
		cell = row.insertCell(-1);
		cell.innerHTML = "&nbsp;";
		cell = row.insertCell(-1);
		cell.innerHTML = totalDmgDone ? Math.round(totalDmgDone) : "&nbsp;";
		cell.align = "right";
		cell = row.insertCell(-1);
		cell.innerHTML = totalDmgTaken ? Math.round(totalDmgTaken) : "&nbsp;";
		cell.align = "right";
		cell = row.insertCell(-1);
		cell.innerHTML = totalDestroyed ? totalDestroyed : "&nbsp;";
		cell.align = "right";

		var tableOuter = document.createElement("table");
		row = tableOuter.insertRow(-1);
		cell = row.insertCell(-1);
		cell.align = "center";
		cell.appendChild(document.createTextNode(title));
		cell.appendChild(table);
		return tableOuter;
	}

	function _createPlayerListCode(players, isEnemy, title, titleColor) {
		var result = "[style=color:" + titleColor + "]" + title + "[/style]\r\n";
		result += "[ul]\r\n";
		for (var i = 0; i < players.length; i++) {
			if (players[i].isEnemy != isEnemy)
				continue;
			result += "[player]" + players[i].name + "[/player] - " + players[i].action + "\r\n";
		}
		result += "[/ul]";
		return result;
	}

	function _createUnitTableCode(units, title, isEnemy) {
		var result =
			"[table]text-align:center;border:0px;font-size:100%;\r\n" +
			"|colspan=6 style=\"border:0px;text-align:center\"|" + title + "\r\n" +
			"|-\r\n" +
			"|style=\"font-weight:bold\"|Название||style=\"font-weight:bold\"|Масса||style=\"font-weight:bold\"|Владелец||style=\"font-weight:bold\"|Нанес повреждения||style=\"font-weight:bold\"|Получил повреждения||style=\"font-weight:bold\"|Потеряно\r\n";
		var totalDestroyed = 0;
		var totalDmgDone = 0;
		var totalDmgTaken = 0;
		for (var name in units) {
			var unit = units[name];
			if (!((unit.isEnemy == isEnemy) || (!isEnemy && !unit.owner)))
				continue;
			result +=
				"|-\r\n" +
				"|" + unit.name +
				"||" + (unit.weight ? "style=\"text-align:right\"|" + unit.weight : "") +
				"||" + (unit.owner ? "[player]" + unit.owner + "[/player]" : "") +
				"||" + (unit.dmgDone ? "style=\"text-align:right\"|" + Math.round(unit.dmgDone) : "") +
				"||" + (unit.dmgTaken ? "style=\"text-align:right\"|" + Math.round(unit.dmgTaken) : "") +
				"||" + (unit.cntDestroyed ? "style=\"text-align:right\"|" + unit.cntDestroyed : "") +
				"\r\n";
			totalDmgDone += unit.dmgDone;
			totalDmgTaken += unit.dmgTaken;
			totalDestroyed += unit.cntDestroyed;
		}
		result +=
			"|-\r\n" +
			"|style=\"font-weight:bold\"|Всего" +
			"||" +
			"||" +
			"||" + (totalDmgDone ? "style=\"text-align:right;font-weight:bold\"|" + Math.round(totalDmgDone) : "") +
			"||" + (totalDmgTaken ? "style=\"text-align:right;font-weight:bold\"|" + Math.round(totalDmgTaken) : "") +
			"||" + (totalDestroyed ? "style=\"text-align:right;font-weight:bold\"|" + totalDestroyed : "") +
			"\r\n[/table]";
		return result;
	}

	function _addSpoiler(title, parent, content) {
		_divId++;
		var divId = "id" + _divId;
		var table = document.createElement("table");
		table.cellSpacing = "0";
		table.cellPadding = "1";
		var row = table.insertRow(-1);
		var cell = row.insertCell(-1);
		var a = document.createElement("a");
		var href = "javascript:ExpandNewsItem('" + divId + "')";
		a.href = href;
		var img = document.createElement("img");
		img.id = "msg_expander_" + divId;
		img.width = "15";
		img.height = "18";
		img.border = "0";
		img.src = "/static/img/expand.gif";
		a.appendChild(img);
		cell.appendChild(a);
		cell = row.insertCell(-1);
		var small = document.createElement("small");
		a = document.createElement("a");
		a.href = href;
		a.appendChild(document.createTextNode(title));
		small.appendChild(a);
		cell.appendChild(small);
		parent.appendChild(table);
		content.id = "news_body_row_" + divId;
		content.style.display = "none";
		content.style.paddingLeft = "8";
		parent.appendChild(content);
	}
}().execute();