// ==UserScript==
// @name           OGame Redesign: Slike kod uspešne ekspedicije
// @namespace      userscripts.org
// @description    Prikazuje slike u slučaju ako ekspedicija donese nešto korisno.
// @include        http://*.ogame.rs/game/index.php?page=showmessage*
// ==/UserScript==

(function()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf("/game/index.php?page=showmessage") == -1)
		return;

	var metal, crystal, deuterium, matter, trader;
	var ships = new Object(), defense = new Object();
	var server = document.location.href.match(/http:\/\/([^\\\/]+[\\\/])/i);
	if (server)
		server = server[1].toLowerCase().replace(/\\/, "/");
	else
		return;
	if	(server.indexOf("ogame.ru/") != -1)
	{
		metal = /Было найдено ([0-9\.]+) Металл/;
		crystal = /Было найдено ([0-9\.]+) Кристалл/;
		deuterium = /Было найдено ([0-9\.]+) Дейтерий/;
		matter = /Было найдено ([0-9\.]+) Темная Материя/;
		trader = /Они заявили, что хотят отправить в Ваши миры своего представителя с товарами на обмен/;
		ships[0] = /Малый транспорт ([0-9\.]+)/;
		ships[1] = /Большой транспорт ([0-9\.]+)/;
		ships[2] = /Лёгкий истребитель ([0-9\.]+)/;
		ships[3] = /Тяжёлый истребитель ([0-9\.]+)/;
		ships[4] = /Крейсер ([0-9\.]+)/;
		ships[5] = /Линкор ([0-9\.]+)/;
		ships[6] = /Колонизатор ([0-9\.]+)/;
		ships[7] = /Переработчик ([0-9\.]+)/;
		ships[8] = /Шпионский зонд ([0-9\.]+)/;
		ships[9] = /Бомбардировщик ([0-9\.]+)/;
		ships[11] = /Уничтожитель ([0-9\.]+)/;
		ships[12] = /Звезда смерти ([0-9\.]+)/;
		ships[13] = /Линейный крейсер ([0-9\.]+)/;
		defense[0] = /Ракетная установка ([0-9\.]+)/
		defense[1] = /Лёгкий лазер ([0-9\.]+)/
		defense[2] = /Тяжёлый лазер ([0-9\.]+)/
		defense[3] = /Пушка Гаусса ([0-9\.]+)/
		defense[4] = /Ионное орудие ([0-9\.]+)/
		defense[5] = /Плазменное орудие ([0-9\.]+)/
		defense[6] = /Малый щитовой купол ([0-9\.]+)/
		defense[7] = /Большой щитовой купол ([0-9\.]+)/
		defense[9] = /Ракета-перехватчик ([0-9\.]+)/
		defense[10] = /Межпланетная ракета ([0-9\.]+)/
	}
	else if (server.indexOf("bg.ogame.org/") != -1)
	{
		metal = /Метал ([0-9\.]+) са заграбени/;
		crystal = /Кристали ([0-9\.]+) са заграбени/;
		deuterium = /Деутериум ([0-9\.]+) са заграбени/;
		matter = /Тъмна Материя ([0-9\.]+) са заграбени/;
		trader = /Казаха, че са дошли да търгуват най-различни стоки с нашите светове/;
		ships[0] = /Малък Транспортьор ([0-9\.]+)/;
		ships[1] = /Голям Транспортьор ([0-9\.]+)/;
		ships[2] = /Лек Изтребител ([0-9\.]+)/;
		ships[3] = /Тежък Изтребител ([0-9\.]+)/;
		ships[4] = /Кръстосвач ([0-9\.]+)/;
		ships[5] = /Боен Кораб ([0-9\.]+)/;
		ships[6] = /Колонизатор ([0-9\.]+)/;
		ships[7] = /Переработчик ([0-9\.]+)/;
		ships[8] = /Шпионска сонда ([0-9\.]+)/;
		ships[9] = /Бомбардировач ([0-9\.]+)/;
		ships[11] = /Унищожител ([0-9\.]+)/;
		ships[12] = /Звезда смерти ([0-9\.]+)/;
		ships[13] = /Боен Кръстосвач ([0-9\.]+)/;
		defense[0] = /Ракетна установка ([0-9\.]+)/;
		defense[1] = /Лек лазер ([0-9\.]+)/;
		defense[2] = /Тежък лазер ([0-9\.]+)/;
		defense[3] = /Гаус оръдие ([0-9\.]+)/;
		defense[4] = /Йонно оръдие ([0-9\.]+)/;
		defense[5] = /Плазмено оръдие ([0-9\.]+)/;
		defense[6] = /Малък щит ([0-9\.]+)/;
		defense[7] = /Голям щит ([0-9\.]+)/;
		defense[9] = /Анти-балистични ракети ([0-9\.]+)/;
		defense[10] = /Междупланетарни ракети ([0-9\.]+)/;
	}
	else if (server.indexOf("ogame.rs/") != -1 || server.indexOf("ogame.us/") != -1)
	{
		metal = / ([0-9\.]+) метала је ухваћено\./;
		crystal = / ([0-9\.]+) кристала је ухваћено\./;
		deuterium = / ([0-9\.]+) деутеријума је ухваћено\./;
		matter = / ([0-9\.]+) црне материје је ухваћено/;
		trader = /Објавили су да ће послати представника са добрима за трговину са вашим световима./;
		ships[0] = /Мали транспортер ([0-9\.]+)/;
		ships[1] = /Велики транспортер ([0-9\.]+)/;
		ships[2] = /Лаки ловац ([0-9\.]+)/;
		ships[3] = /Тешки ловац ([0-9\.]+)/;
		ships[4] = /Крстарица ([0-9\.]+)/;
		ships[5] = /Борбени брод ([0-9\.]+)/;
		ships[6] = /Колонијални брод ([0-9\.]+)/;
		ships[7] = /Рециклер ([0-9\.]+)/;
		ships[8] = /Шпијунске сонде ([0-9\.]+)/;
		ships[9] = /Бомбардер ([0-9\.]+)/;
		ships[10] = /Соларни сателит ([0-9\.]+)/;
		ships[11] = /Разарач ([0-9\.]+)/;
		ships[12] = /Звезда Смрти ([0-9\.]+)/;
		ships[13] = /Оклопна крстарица ([0-9\.]+)/;
		defense[0] = /Ракетобацач ([0-9\.]+)/
		defense[1] = /Мали ласер ([0-9\.]+)/
		defense[2] = /Велики ласер ([0-9\.]+)/
		defense[3] = /Гаусов топ ([0-9\.]+)/
		defense[4] = /Јонски топ ([0-9\.]+)/
		defense[5] = /Плазма топ ([0-9\.]+)/
		defense[6] = /Мала купола ([0-9\.]+)/
		defense[7] = /Велика купола ([0-9\.]+)/
		defense[9] = /Анти-балистичке ракете ([0-9\.]+)/
		defense[10] = /Интерпланетарне ракете ([0-9\.]+)/
	}
	else
		return;

	var shipbox = null, defensebox = null;

	var CreateImg = function(src, style)
	{
		var result = document.createElement("img");
		if (src)
			result.setAttribute("src", src);
		if (style)
			result.setAttribute("style", style);
		return result;
	}

	var CreateDiv = function(style)
	{
		var result = document.createElement("div");
		if (style)
			result.setAttribute("style", style);
		return result;
	}

	var CreateSpan = function(text, style)
	{
		var result = document.createElement("span");
		if (text)
			result.appendChild(document.createTextNode(text));
		if (style)
			result.setAttribute("style", style);
		return result;
	}

	var ShowResource = function(parent, imgsrc, amount)
	{
		var background = CreateDiv(
			"background: transparent url(img/navigation/box_fleet_send.gif) no-repeat scroll -340px -30px; " +
			"position: relative; left: 50%; top: 80px; margin-left: -160px; width: 310px; height: 135px;");
		var data = CreateDiv("position: relative; top: 40px; width: 160px; text-align: center;");
		var picture = CreateDiv();
		var value = CreateDiv("padding: 7px;")
		data.appendChild(picture).appendChild(CreateImg(imgsrc));
		data.appendChild(value).appendChild(CreateSpan(amount, "color: #A6B8CB;"));
		parent.appendChild(background).appendChild(data);
	}

	var ShowTrader = function(parent)
	{
		var container = CreateDiv(
			"position: relative; left: 50%; top: 80px; margin-left: -168px; width: 336px; height: 80px;");
		var res1 = CreateDiv(
			"background: transparent url(img/layout/ressourcen/spriteset.png) no-repeat scroll 0px 0px; " +
			"width: 80px; height: 80px; float: left;");
		var sep1 = CreateImg(
			"img/navigation/navi_ikon_trader_b.gif",
			"display: block; margin: 26px 0px 0px 10px; float: left;");
		var res2 = CreateDiv(
			"background: transparent url(img/layout/ressourcen/spriteset.png) no-repeat scroll -80px 0px; " +
			"width: 80px; height: 80px; float: left;");
		var sep2 = CreateImg(
			"img/navigation/navi_ikon_trader_b.gif",
			"display: block; margin: 26px 0px 0px 10px; float: left;");
		var res3 = CreateDiv(
			"background: transparent url(img/layout/ressourcen/spriteset.png) no-repeat scroll -160px 0px; " +
			"width: 80px; height: 80px; float: left;");
		container.appendChild(res1);
		container.appendChild(sep1);
		container.appendChild(res2);
		container.appendChild(sep2);
		container.appendChild(res3);
		parent.appendChild(container);
	}

	var ShowShip = function(parent, number, amount)
	{
		shipbox = OpenBox(shipbox, parent);
		UpdateBox(shipbox, "img/navigation/ships-on.png", number, amount);
	}

	var ShowDefense = function(parent, number, amount)
	{
		defensebox = OpenBox(defensebox, parent);
		UpdateBox(defensebox, "img/navigation/defense-on.png", number, amount);
	}

	var OpenBox = function(box, parent)
	{
		if (!box || box.parentNode != parent)
		{
			CloseBox(box);
			box = CreateDiv();
			parent.appendChild(box);
		}
		return box;
	}

	var UpdateBox = function(box, images, number, amount)
	{
		var offset = -80 * number;
		var ship = CreateDiv(
			"background: transparent url(" + images + ") no-repeat scroll " + offset + "px 0px; " +
			"width: 80px; height: 80px; margin: 10px 5px 0px; float: left;");
		var frame = CreateDiv(
			"background: transparent url(img/navigation/ecke_neu_80.gif) no-repeat scroll 0px 0px; " +
			"width: 80px; height: 80px;");
		var value = CreateDiv("position: relative; top: 65px; left: 10px; width: 60px; text-align: right;");
		box.appendChild(ship).appendChild(frame).appendChild(value).appendChild(CreateSpan(amount, "color: #FF9600;"));
	}

	var CloseBox = function(box)
	{
		if (!box || !box.hasChildNodes)
			return;
		var rows = Math.ceil(box.childNodes.length / 7);
		var cols = Math.ceil(box.childNodes.length / rows);
		var width = cols * 90;
		var height = rows * 90;
		var style = "position: relative; left: 50%; margin-left: " + Math.round(-width / 2) + "px; " +
			"width: " + width + "px; height: " + height + "px";
		box.setAttribute("style", style);
		if (rows * cols - 1 == box.childNodes.length)
		{
			var child = box.childNodes[box.childNodes.length - cols + 1];
			var style = child.getAttribute("style").replace(/margin: 10px 5px 0px;/, "margin: 10px 5px 0px 50px;");
			child.setAttribute("style", style);
		}
	}

	var AnalyzeNodes = function(parent, recurse)
	{
		for (var node = parent.firstChild; node != null; node = node.nextSibling)
		{
			if ((recurse > 0) && node.hasChildNodes)
				AnalyzeNodes(node, recurse - 1);
			var text = node.nodeValue;
			if (!text)
				continue;
			var capture;
			if	(capture = text.match(metal))
				ShowResource(parent, "/game/img/layout/ressourcen_metall.gif", capture[1]);
			else if	(capture = text.match(crystal))
				ShowResource(parent, "/game/img/layout/ressourcen_kristal.gif", capture[1]);
			else if	(capture = text.match(deuterium))
				ShowResource(parent, "/game/img/layout/ressourcen_deuterium.gif", capture[1]);
			else if	(capture = text.match(matter))
				ShowResource(parent, "/game/img/layout/ressourcen_DM.gif", capture[1]);
			else if	(text.match(trader))
				ShowTrader(parent);
			else
			{
				for (var number in ships)
				{
					if (capture = text.match(ships[number]))
						ShowShip(parent, number, capture[1]);
				}
				for (var number in defense)
				{
					if (capture = text.match(defense[number]))
						ShowDefense(parent, number, capture[1]);
				}
			}
		}
	}

	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++)
	{
		if (divs[i].className == "note")
			AnalyzeNodes(divs[i], 1);
	}
	CloseBox(shipbox);
	CloseBox(defensebox);
}
)();