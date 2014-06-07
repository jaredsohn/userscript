// ==UserScript==
// @name           OGame Redesign: Successful Expedition Pictures
// @namespace      qdscripter
// @description    Shows images in cases when the expedition brings something useful
// @include        http://*.ogame.*/game/index.php?page=showmessage*
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
		metal = /Было найдено\s+([0-9\.]+)\s+Металл/;
		crystal = /Было найдено\s+([0-9\.]+)\s+Кристалл/;
		deuterium = /Было найдено\s+([0-9\.]+)\s+Дейтерий/;
		matter = /Было найдено\s+([0-9\.]+)\s+Темная Материя/;
		trader = /Они заявили, что хотят отправить в Ваши миры своего представителя с товарами на обмен/;
		ships[0] = /Малый транспорт\s+([0-9\.]+)/;
		ships[1] = /Большой транспорт\s+([0-9\.]+)/;
		ships[2] = /Лёгкий истребитель\s+([0-9\.]+)/;
		ships[3] = /Тяжёлый истребитель\s+([0-9\.]+)/;
		ships[4] = /Крейсер\s+([0-9\.]+)/;
		ships[5] = /Линкор\s+([0-9\.]+)/;
		ships[6] = /Колонизатор\s+([0-9\.]+)/;
		ships[7] = /Переработчик\s+([0-9\.]+)/;
		ships[8] = /Шпионский зонд\s+([0-9\.]+)/;
		ships[9] = /Бомбардировщик\s+([0-9\.]+)/;
		ships[10] = /Солнечный спутник\s+([0-9\.]+)/;
		ships[11] = /Уничтожитель\s+([0-9\.]+)/;
		ships[12] = /Звезда смерти\s+([0-9\.]+)/;
		ships[13] = /Линейный крейсер\s+([0-9\.]+)/;
		defense[0] = /Ракетная установка\s+([0-9\.]+)/
		defense[1] = /Лёгкий лазер\s+([0-9\.]+)/
		defense[2] = /Тяжёлый лазер\s+([0-9\.]+)/
		defense[3] = /Пушка Гаусса\s+([0-9\.]+)/
		defense[4] = /Ионное орудие\s+([0-9\.]+)/
		defense[5] = /Плазменное орудие\s+([0-9\.]+)/
		defense[6] = /Малый щитовой купол\s+([0-9\.]+)/
		defense[7] = /Большой щитовой купол\s+([0-9\.]+)/
		defense[9] = /Ракета-перехватчик\s+([0-9\.]+)/
		defense[10] = /Межпланетная ракета\s+([0-9\.]+)/
	}
	else if (server.indexOf("bg.ogame.org/") != -1)
	{
		metal = /Метал\s+([0-9\.]+)\s+са заграбени/;
		crystal = /Кристали\s+([0-9\.]+)\s+са заграбени/;
		deuterium = /Деутериум\s+([0-9\.]+)\s+са заграбени/;
		matter = /Тъмна Материя\s+([0-9\.]+)\s+са заграбени/;
		trader = /Казаха, че са дошли да търгуват най-различни стоки с нашите светове/;
		ships[0] = /Малък Транспортьор\s+([0-9\.]+)/;
		ships[1] = /Голям Транспортьор\s+([0-9\.]+)/;
		ships[2] = /Лек Изтребител\s+([0-9\.]+)/;
		ships[3] = /Тежък Изтребител\s+([0-9\.]+)/;
		ships[4] = /^Кръстосвач\s+([0-9\.]+)/;
		ships[5] = /Боен Кораб\s+([0-9\.]+)/;
		ships[6] = /Колонизатор\s+([0-9\.]+)/;
		ships[7] = /Переработчик\s+([0-9\.]+)/;
		ships[8] = /Шпионска сонда\s+([0-9\.]+)/;
		ships[9] = /Бомбардировач\s+([0-9\.]+)/;
		ships[10] = /Соларен сателит\s+([0-9\.]+)/;
		ships[11] = /Унищожител\s+([0-9\.]+)/;
		ships[12] = /Звезда смерти\s+([0-9\.]+)/;
		ships[13] = /Боен Кръстосвач\s+([0-9\.]+)/;
		defense[0] = /Ракетна установка\s+([0-9\.]+)/;
		defense[1] = /Лек лазер\s+([0-9\.]+)/;
		defense[2] = /Тежък лазер\s+([0-9\.]+)/;
		defense[3] = /Гаус оръдие\s+([0-9\.]+)/;
		defense[4] = /Йонно оръдие\s+([0-9\.]+)/;
		defense[5] = /Плазмено оръдие\s+([0-9\.]+)/;
		defense[6] = /Малък щит\s+([0-9\.]+)/;
		defense[7] = /Голям щит\s+([0-9\.]+)/;
		defense[9] = /Анти-балистични ракети\s+([0-9\.]+)/;
		defense[10] = /Междупланетарни ракети\s+([0-9\.]+)/;
	}
	else if (server.indexOf("ogame.org/") != -1 || server.indexOf("ogame.us/") != -1)
	{
		metal = /Metal\s+([0-9\.]+)\s+have been captured/;
		crystal = /Crystal\s+([0-9\.]+)\s+have been captured/;
		deuterium = /Deuterium\s+([0-9\.]+)\s+have been captured/;
		matter = /Dark Matter\s+([0-9\.]+)\s+have been captured/;
		trader = /They announced that they would send a representative with goods to trade to your worlds/;
		ships[0] = /Small Cargo\s+([0-9\.]+)/;
		ships[1] = /Large Cargo\s+([0-9\.]+)/;
		ships[2] = /Light Fighter\s+([0-9\.]+)/;
		ships[3] = /Heavy Fighter\s+([0-9\.]+)/;
		ships[4] = /Cruiser\s+([0-9\.]+)/;
		ships[5] = /Battleship\s+([0-9\.]+)/;
		ships[6] = /Colony Ship\s+([0-9\.]+)/;
		ships[7] = /Recycler\s+([0-9\.]+)/;
		ships[8] = /Espionage Probe\s+([0-9\.]+)/;
		ships[9] = /Bomber\s+([0-9\.]+)/;
		ships[10] = /Solar Satellite\s+([0-9\.]+)/;
		ships[11] = /Destroyer\s+([0-9\.]+)/;
		ships[12] = /Deathstar\s+([0-9\.]+)/;
		ships[13] = /Battlecruiser\s+([0-9\.]+)/;
		defense[0] = /Rocket Launcher\s+([0-9\.]+)/
		defense[1] = /Light Laser\s+([0-9\.]+)/
		defense[2] = /Heavy Laser\s+([0-9\.]+)/
		defense[3] = /Gauss Cannon\s+([0-9\.]+)/
		defense[4] = /Ion Cannon\s+([0-9\.]+)/
		defense[5] = /Plasma Turret\s+([0-9\.]+)/
		defense[6] = /Small Shield Dome\s+([0-9\.]+)/
		defense[7] = /Large Shield Dome\s+([0-9\.]+)/
		defense[9] = /Anti-Ballistic Missiles\s+([0-9\.]+)/
		defense[10] = /Interplanetary Missiles\s+([0-9\.]+)/
	}
	else if (server.indexOf("ogame.de/") != -1)
	{
		metal = /Es wurde Metall\s+([0-9\.]+)\s+erbeutet/;
		crystal = /Es wurde Kristall\s+([0-9\.]+)\s+erbeutet/;
		deuterium = /Es wurde Deuterium\s+([0-9\.]+)\s+erbeutet/;
		matter = /Es wurde Dunkle Materie\s+([0-9\.]+)\s+erbeutet/;
		trader = /Diese hat verkündet, einen Repräsentanten mit Tauschwaren zu deinen Welten schicken zu wollen/;
		ships[0] = /Kleiner Transporter\s+([0-9\.]+)/;
		ships[1] = /Großer Transporter\s+([0-9\.]+)/;
		ships[2] = /Leichter Jäger\s+([0-9\.]+)/;
		ships[3] = /Schwerer Jäger\s+([0-9\.]+)/;
		ships[4] = /Kreuzer\s+([0-9\.]+)/;
		ships[5] = /Schlachtschiff\s+([0-9\.]+)/;
		ships[6] = /Kolonieschiff\s+([0-9\.]+)/;
		ships[7] = /Recycler\s+([0-9\.]+)/;
		ships[8] = /Spionagesonde\s+([0-9\.]+)/;
		ships[9] = /Bomber\s+([0-9\.]+)/;
		ships[10] = /Solarsatellit\s+([0-9\.]+)/;
		ships[11] = /Zerstörer\s+([0-9\.]+)/;
		ships[12] = /Todesstern\s+([0-9\.]+)/;
		ships[13] = /Schlachtkreuzer\s+([0-9\.]+)/;
		defense[0] = /Raketenwerfer\s+([0-9\.]+)/
		defense[1] = /Leichtes Lasergeschütz\s+([0-9\.]+)/
		defense[2] = /Schweres Lasergeschütz\s+([0-9\.]+)/
		defense[3] = /Gaußkanone\s+([0-9\.]+)/
		defense[4] = /Ionengeschütz\s+([0-9\.]+)/
		defense[5] = /Plasmawerfer\s+([0-9\.]+)/
		defense[6] = /Kleine Schildkuppel\s+([0-9\.]+)/
		defense[7] = /Große Schildkuppel\s+([0-9\.]+)/
		defense[9] = /Abfangrakete\s+([0-9\.]+)/
		defense[10] = /Interplanetarrakete\s+([0-9\.]+)/
	}
	else if (server.indexOf("ogame.gr/") != -1)
	{
		metal = /Μέταλλο ([0-9\.]+) αποκτήθηκαν\./;
		crystal = /Κρύσταλλο ([0-9\.]+) αποκτήθηκαν\./;
		deuterium = /Δευτέριο ([0-9\.]+) αποκτήθηκαν\./;
		matter = /Αντιύλη ([0-9\.]+) αποκτήθηκαν\./;
		trader = /αντιπρόσωπους με αγαθά προς ανταλλαγή/;
		ships[0] = /Μικρό Μεταγωγικό ([0-9\.]+)/;
		ships[1] = /Μεγάλο Μεταγωγικό ([0-9\.]+)/;
		ships[2] = /Ελαφρύ Μαχητικό ([0-9\.]+)/;
		ships[3] = /Βαρύ Μαχητικό ([0-9\.]+)/;
		ships[4] = /Καταδιωκτικό ([0-9\.]+)/;
		ships[5] = /Καταδρομικό ([0-9\.]+)/;
		ships[6] = /Σκάφος Αποικιοποίησης ([0-9\.]+)/;
		ships[7] = /Ανακυκλωτής ([0-9\.]+)/;
		ships[8] = /Κατασκοπευτικό Στέλεχος ([0-9\.]+)/;
		ships[9] = /Βομβαρδιστικό ([0-9\.]+)/;
		ships[10] = /Ηλιακοί Συλλέκτες ([0-9\.]+)/;
		ships[11] = /Destroyer ([0-9\.]+)/;
		ships[12] = /Deathstar ([0-9\.]+)/;
		ships[13] = /Θωρηκτό Αναχαίτισης ([0-9\.]+)/;
		defense[0] = /Εκτοξευτής Πυραύλων ([0-9\.]+)/
		defense[1] = /Ελαφρύ Λέιζερ ([0-9\.]+)/
		defense[2] = /Βαρύ Λέιζερ ([0-9\.]+)/
		defense[3] = /Κανόνι Gauss ([0-9\.]+)/
		defense[4] = /Κανόνι Ιόντων ([0-9\.]+)/
		defense[5] = /Πυργίσκοι Πλάσματος ([0-9\.]+)/
		defense[6] = /Μικρός Αμυντικός Θόλος ([0-9\.]+)/
		defense[7] = /Μεγάλος Αμυντικός Θόλος ([0-9\.]+)/
		defense[9] = /Αντι-Βαλλιστικοί Πύραυλοι ([0-9\.]+)/
		defense[10] = /Διαπλανητικοί Πύραυλοι ([0-9\.]+)/
	}
	else
		return;

	var shipbox = null, defensebox = null;

	var imageSources =
	{
		"ressourcen_metall.gif":
			"http://gf1.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif",
		"ressourcen_kristal.gif":
			"http://gf1.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif",
		"ressourcen_deuterium.gif":
			"http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif",
		"ressourcen_DM.gif":
			"http://gf1.geo.gfsrv.net/cdnc5/401d1a91ff40dc7c8acfa4377d3d65.gif",
		"box_fleet_send.gif":
			"http://gf1.geo.gfsrv.net/cdn57/14e226018741a83aedf7cab43fef10.gif",
		"spriteset.png":
			"http://gf1.geo.gfsrv.net/cdnbb/a9fe14ed992de9b7f40d22213a475e.png",
		"navi_ikon_trader_b.gif":
			"http://gf1.geo.gfsrv.net/cdncc/3f55e51dc251d6dbf5bdd6454c7f7c.gif",
		"ships-on.png":
			"http://gf1.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png",
		"defense-on.png":
			"http://gf1.geo.gfsrv.net/cdn34/9f4220627412efd348f560f0ff359a.png",
		"ecke_neu_80.gif":
			"http://gf1.geo.gfsrv.net/cdn42/e3d481656bab1b216428a98a2e022e.gif"
	};

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
			"background: transparent url(" + imageSources["box_fleet_send.gif"] + ") no-repeat scroll -340px -30px; " +
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
			"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll 0px 0px; " +
			"width: 80px; height: 80px; float: left;");
		var sep1 = CreateImg(
			imageSources["navi_ikon_trader_b.gif"],
			"display: block; margin: 26px 0px 0px 10px; float: left;");
		var res2 = CreateDiv(
			"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll -80px 0px; " +
			"width: 80px; height: 80px; float: left;");
		var sep2 = CreateImg(
			imageSources["navi_ikon_trader_b.gif"],
			"display: block; margin: 26px 0px 0px 10px; float: left;");
		var res3 = CreateDiv(
			"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll -160px 0px; " +
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
		UpdateBox(shipbox, imageSources["ships-on.png"], number, amount);
	}

	var ShowDefense = function(parent, number, amount)
	{
		defensebox = OpenBox(defensebox, parent);
		UpdateBox(defensebox, imageSources["defense-on.png"], number, amount);
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
			"background: transparent url(" + imageSources["ecke_neu_80.gif"] + ") no-repeat scroll 0px 0px; " +
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
				ShowResource(parent, imageSources["ressourcen_metall.gif"], capture[1]);
			else if	(capture = text.match(crystal))
				ShowResource(parent, imageSources["ressourcen_kristal.gif"], capture[1]);
			else if	(capture = text.match(deuterium))
				ShowResource(parent, imageSources["ressourcen_deuterium.gif"], capture[1]);
			else if	(capture = text.match(matter))
				ShowResource(parent, imageSources["ressourcen_DM.gif"], capture[1]);
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