// ==UserScript==
// @name           OGame Redesign: Successful Expedition Pictures
// @description    Shows images in cases when the expedition brings something useful
// @namespace      qdscripter
// @version        2.00
// @author         Vesselin Bontchev
// @date           2013-01-04
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

(function()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=messages") < 0)
		return;
	var myFunc = (function ()
	{
		if (document.location.href.indexOf("page=messages") < 0)
			return;
		var metal, crystal, deuterium, matter, trader;
		var ships = new Object (), defense = new Object ();
		var server = document.location.href.match (/http:\/\/([^\\\/]+[\\\/])/i);
		if (server)
			server = server [1].toLowerCase ().replace (/\\/, "/");
		else
			return;
		if (server.indexOf ("ogame.org/") != -1 || server.indexOf ("ogame.us/") != -1)
		{
			metal = /Metal\s+([0-9\.]+)\s+have been captured/;
			crystal = /Crystal\s+([0-9\.]+)\s+have been captured/;
			deuterium = /Deuterium\s+([0-9\.]+)\s+have been captured/;
			matter = /Dark Matter\s+([0-9\.]+)\s+have been captured/;
			trader = /They announced that they would send a representative with goods to trade to your worlds/;
			ships [ 0] = /Small Cargo\s+([0-9\.]+)/;
			ships [ 1] = /Large Cargo\s+([0-9\.]+)/;
			ships [ 2] = /Light Fighter\s+([0-9\.]+)/;
			ships [ 3] = /Heavy Fighter\s+([0-9\.]+)/;
			ships [ 4] = /Cruiser\s+([0-9\.]+)/;
			ships [ 5] = /Battleship\s+([0-9\.]+)/;
			ships [ 6] = /Colony Ship\s+([0-9\.]+)/;
			ships [ 7] = /Recycler\s+([0-9\.]+)/;
			ships [ 8] = /Espionage Probe\s+([0-9\.]+)/;
			ships [ 9] = /Bomber\s+([0-9\.]+)/;
			ships [10] = /Solar Satellite\s+([0-9\.]+)/;
			ships [11] = /Destroyer\s+([0-9\.]+)/;
			ships [12] = /Deathstar\s+([0-9\.]+)/;
			ships [13] = /Battlecruiser\s+([0-9\.]+)/;
			defense [ 0] = /Rocket Launcher\s+([0-9\.]+)/
			defense [ 1] = /Light Laser\s+([0-9\.]+)/
			defense [ 2] = /Heavy Laser\s+([0-9\.]+)/
			defense [ 3] = /Gauss Cannon\s+([0-9\.]+)/
			defense [ 4] = /Ion Cannon\s+([0-9\.]+)/
			defense [ 5] = /Plasma Turret\s+([0-9\.]+)/
			defense [ 6] = /Small Shield Dome\s+([0-9\.]+)/
			defense [ 7] = /Large Shield Dome\s+([0-9\.]+)/
			defense [ 9] = /Anti-Ballistic Missiles\s+([0-9\.]+)/
			defense [10] = /Interplanetary Missiles\s+([0-9\.]+)/
		}
		else if (server.indexOf ("ogame.de/") != -1)
		{
			metal = /Es wurde Metall\s+([0-9\.]+)\s+erbeutet/;
			crystal = /Es wurde Kristall\s+([0-9\.]+)\s+erbeutet/;
			deuterium = /Es wurde Deuterium\s+([0-9\.]+)\s+erbeutet/;
			matter = /Es wurde Dunkle Materie\s+([0-9\.]+)\s+erbeutet/;
			trader = /Diese hat verkündet, einen Repräsentanten mit Tauschwaren zu deinen Welten schicken zu wollen/;
			ships [ 0] = /Kleiner Transporter\s+([0-9\.]+)/;
			ships [ 1] = /Großer Transporter\s+([0-9\.]+)/;
			ships [ 2] = /Leichter Jäger\s+([0-9\.]+)/;
			ships [ 3] = /Schwerer Jäger\s+([0-9\.]+)/;
			ships [ 4] = /Kreuzer\s+([0-9\.]+)/;
			ships [ 5] = /Schlachtschiff\s+([0-9\.]+)/;
			ships [ 6] = /Kolonieschiff\s+([0-9\.]+)/;
			ships [ 7] = /Recycler\s+([0-9\.]+)/;
			ships [ 8] = /Spionagesonde\s+([0-9\.]+)/;
			ships [ 9] = /Bomber\s+([0-9\.]+)/;
			ships [10] = /Solarsatellit\s+([0-9\.]+)/;
			ships [11] = /Zerstörer\s+([0-9\.]+)/;
			ships [12] = /Todesstern\s+([0-9\.]+)/;
			ships [13] = /Schlachtkreuzer\s+([0-9\.]+)/;
			defense [ 0] = /Raketenwerfer\s+([0-9\.]+)/
			defense [ 1] = /Leichtes Lasergeschütz\s+([0-9\.]+)/
			defense [ 2] = /Schweres Lasergeschütz\s+([0-9\.]+)/
			defense [ 3] = /Gaußkanone\s+([0-9\.]+)/
			defense [ 4] = /Ionengeschütz\s+([0-9\.]+)/
			defense [ 5] = /Plasmawerfer\s+([0-9\.]+)/
			defense [ 6] = /Kleine Schildkuppel\s+([0-9\.]+)/
			defense [ 7] = /Große Schildkuppel\s+([0-9\.]+)/
			defense [ 9] = /Abfangrakete\s+([0-9\.]+)/
			defense [10] = /Interplanetarrakete\s+([0-9\.]+)/
		}
		else if (server.indexOf ("ogame.gr/") != -1)
		{
			metal = /Μέταλλο ([0-9\.]+) αποκτήθηκαν\./;
			crystal = /Κρύσταλλο ([0-9\.]+) αποκτήθηκαν\./;
			deuterium = /Δευτέριο ([0-9\.]+) αποκτήθηκαν\./;
			matter = /Αντιύλη ([0-9\.]+) αποκτήθηκαν\./;
			trader = /αντιπρόσωπους με αγαθά προς ανταλλαγή/;
			ships [ 0] = /Μικρό Μεταγωγικό ([0-9\.]+)/;
			ships [ 1] = /Μεγάλο Μεταγωγικό ([0-9\.]+)/;
			ships [ 2] = /Ελαφρύ Μαχητικό ([0-9\.]+)/;
			ships [ 3] = /Βαρύ Μαχητικό ([0-9\.]+)/;
			ships [ 4] = /Καταδιωκτικό ([0-9\.]+)/;
			ships [ 5] = /Καταδρομικό ([0-9\.]+)/;
			ships [ 6] = /Σκάφος Αποικιοποίησης ([0-9\.]+)/;
			ships [ 7] = /Ανακυκλωτής ([0-9\.]+)/;
			ships [ 8] = /Κατασκοπευτικό Στέλεχος ([0-9\.]+)/;
			ships [ 9] = /Βομβαρδιστικό ([0-9\.]+)/;
			ships [10] = /Ηλιακοί Συλλέκτες ([0-9\.]+)/;
			ships [11] = /Destroyer ([0-9\.]+)/;
			ships [12] = /Deathstar ([0-9\.]+)/;
			ships [13] = /Θωρηκτό Αναχαίτισης ([0-9\.]+)/;
			defense [ 0] = /Εκτοξευτής Πυραύλων ([0-9\.]+)/
			defense [ 1] = /Ελαφρύ Λέιζερ ([0-9\.]+)/
			defense [ 2] = /Βαρύ Λέιζερ ([0-9\.]+)/
			defense [ 3] = /Κανόνι Gauss ([0-9\.]+)/
			defense [ 4] = /Κανόνι Ιόντων ([0-9\.]+)/
			defense [ 5] = /Πυργίσκοι Πλάσματος ([0-9\.]+)/
			defense [ 6] = /Μικρός Αμυντικός Θόλος ([0-9\.]+)/
			defense [ 7] = /Μεγάλος Αμυντικός Θόλος ([0-9\.]+)/
			defense [ 9] = /Αντι-Βαλλιστικοί Πύραυλοι ([0-9\.]+)/
			defense [10] = /Διαπλανητικοί Πύραυλοι ([0-9\.]+)/
		}
		else if (server.indexOf ("ogame.ru/") != -1)
		{
			metal = /Было найдено\s+([0-9\.]+)\s+Металл/;
			crystal = /Было найдено\s+([0-9\.]+)\s+Кристалл/;
			deuterium = /Было найдено\s+([0-9\.]+)\s+Дейтерий/;
			matter = /Было найдено\s+([0-9\.]+)\s+Темная Материя/;
			trader = /Они заявили, что хотят отправить в Ваши миры своего представителя с товарами на обмен/;
			ships [ 0] = /Малый транспорт\s+([0-9\.]+)/;
			ships [ 1] = /Большой транспорт\s+([0-9\.]+)/;
			ships [ 2] = /Лёгкий истребитель\s+([0-9\.]+)/;
			ships [ 3] = /Тяжёлый истребитель\s+([0-9\.]+)/;
			ships [ 4] = /Крейсер\s+([0-9\.]+)/;
			ships [ 5] = /Линкор\s+([0-9\.]+)/;
			ships [ 6] = /Колонизатор\s+([0-9\.]+)/;
			ships [ 7] = /Переработчик\s+([0-9\.]+)/;
			//ships [ 8] = /Шпионский зонд\s+([0-9\.]+)/;
			ships [ 8 ]= /\u0428\u043f\u0438\u043e\u043d\u0441\u043a\u0438\u0439 \u0437\u043e\u043d\u0434\s+([0-9\.]+)/;
			ships [ 9] = /Бомбардировщик\s+([0-9\.]+)/;
			ships [10] = /Солнечный спутник\s+([0-9\.]+)/;
			ships [11] = /Уничтожитель\s+([0-9\.]+)/;
			ships [12] = /Звезда смерти\s+([0-9\.]+)/;
			ships [13] = /Линейный крейсер\s+([0-9\.]+)/;
			defense [ 0] = /Ракетная установка\s+([0-9\.]+)/
			defense [ 1] = /Лёгкий лазер\s+([0-9\.]+)/
			defense [ 2] = /Тяжёлый лазер\s+([0-9\.]+)/
			defense [ 3] = /Пушка Гаусса\s+([0-9\.]+)/
			defense [ 4] = /Ионное орудие\s+([0-9\.]+)/
			defense [ 5] = /Плазменное орудие\s+([0-9\.]+)/
			defense [ 6] = /Малый щитовой купол\s+([0-9\.]+)/
			defense [ 7] = /Большой щитовой купол\s+([0-9\.]+)/
			defense [ 9] = /Ракета-перехватчик\s+([0-9\.]+)/
			defense [10] = /Межпланетная ракета\s+([0-9\.]+)/
		}
		else
			return;
		var shipbox = null, defensebox = null;
		var imageSources =
		{
			"ressourcen_metall.gif":    "/cdn/img/layout/ressourcen_metall.gif",
			"ressourcen_kristal.gif":   "/cdn/img/layout/ressourcen_kristal.gif",
			"ressourcen_deuterium.gif": "/cdn/img/layout/ressourcen_deuterium.gif",
			"ressourcen_DM.gif":        "/cdn/img/layout/ressourcen_DM.gif",
			"spriteset.png":            "/cdn/img/layout/ressourcen/spriteset.png",
			"box_fleet_send.gif":       "/cdn/img/navigation/box_fleet_send.gif",
			"navi_ikon_trader_b.gif":   "/cdn/img/navigation/navi_ikon_trader_b.gif",
			"ships-on.png":             "/cdn/img/navigation/ships-on.png",
			"defense-on.png":           "/cdn/img/navigation/defense-on.png",
			"ecke_neu_80.gif":          "/cdn/img/navigation/ecke_neu_80.gif"
		};
		var CreateImg = function (src, style)
		{
			var result = document.createElement ("img");
			if (src)
				result.setAttribute ("src", src);
			if (style)
				result.setAttribute ("style", style);
			return result;
		}
		var CreateDiv = function (style)
		{
			var result = document.createElement ("div");
			if (style)
				result.setAttribute ("style", style);
			return result;
		}
		var CreateSpan = function (text, style)
		{
			var result = document.createElement ("span");
			if (text)
				result.appendChild (document.createTextNode (text));
			if (style)
				result.setAttribute ("style", style);
			return result;
		}
		var ShowResource = function (parent, imgsrc, amount)
		{
			var background = CreateDiv (
				"background: transparent url(" + imageSources["box_fleet_send.gif"] + ") no-repeat scroll -340px -30px; " +
				"position: relative; left: 50%; top: 5px; margin-left: -160px; width: 310px; height: 135px;");
			var data = CreateDiv ("position: relative; top: 40px; width: 160px; text-align: center;");
			var picture = CreateDiv ();
			var value = CreateDiv ("padding: 7px;")
			data.appendChild (picture).appendChild (CreateImg (imgsrc));
			data.appendChild (value).appendChild (CreateSpan (amount, "color: #A6B8CB;"));
			parent.appendChild (background).appendChild (data);
		}
		var ShowTrader = function (parent)
		{
			var container = CreateDiv (
				"position: relative; left: 50%; top: 80px; margin-left: -168px; width: 336px; height: 80px;");
			var res1 = CreateDiv (
				"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll 0px 0px; " +
				"width: 80px; height: 80px; float: left;");
			var sep1 = CreateImg (
				imageSources["navi_ikon_trader_b.gif"],
				"display: block; margin: 26px 0px 0px 10px; float: left;");
			var res2 = CreateDiv (
				"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll -80px 0px; " +
				"width: 80px; height: 80px; float: left;");
			var sep2 = CreateImg (
				imageSources["navi_ikon_trader_b.gif"],
				"display: block; margin: 26px 0px 0px 10px; float: left;");
			var res3 = CreateDiv (
				"background: transparent url(" + imageSources["spriteset.png"] + ") no-repeat scroll -160px 0px; " +
				"width: 80px; height: 80px; float: left;");
			container.appendChild (res1);
			container.appendChild (sep1);
			container.appendChild (res2);
			container.appendChild (sep2);
			container.appendChild (res3);
			parent.appendChild (container);
		}
		var CloseBox = function (box)
		{
			if (! box || ! box.hasChildNodes)
				return;
			var rows = Math.ceil (box.childNodes.length / 7);
			var cols = Math.ceil (box.childNodes.length / rows);
			var width = cols * 90;
			var height = rows * 90;
			var style = "position: relative; left: 50%; margin-left: " + Math.round(-width / 2) + "px; " +
				"width: " + width + "px; height: " + height + "px";
			box.setAttribute ("style", style);
			if (rows * cols - 1 == box.childNodes.length)
			{
				var child = box.childNodes[ box.childNodes.length - cols + 1];
				var style = child.getAttribute ("style").replace (/margin: 10px 5px 0px;/, "margin: 10px 5px 0px 50px;");
				child.setAttribute ("style", style);
			}
		}
		var OpenBox = function (box, parent)
		{
			if (! box || box.parentNode != parent)
			{
				CloseBox (box);
				box = CreateDiv ();
				parent.appendChild (box);
			}
			return box;
		}
		var UpdateBox = function (box, images, number, amount)
		{
			var offset = -80 * number;
			var ship = CreateDiv (
				"background: transparent url(" + images + ") no-repeat scroll " + offset + "px 0px; " +
				"width: 80px; height: 80px; margin: 10px 5px 0px; float: left;");
			var frame = CreateDiv (
				"background: transparent url(" + imageSources["ecke_neu_80.gif"] + ") no-repeat scroll 0px 0px; " +
				"width: 80px; height: 80px;");
			var value = CreateDiv ("position: relative; top: 65px; left: 10px; width: 60px; text-align: right;");
			box.appendChild (ship).appendChild (frame).appendChild (value).appendChild (CreateSpan (amount, "color: #FF9600;"));
		}
		var ShowShip = function (parent, number, amount)
		{
			shipbox = OpenBox (shipbox, parent);
			UpdateBox (shipbox, imageSources["ships-on.png"], number, amount);
		}
		var ShowDefense = function (parent, number, amount)
		{
			defensebox = OpenBox (defensebox, parent);
			UpdateBox (defensebox, imageSources["defense-on.png"], number, amount);
		}
		$ (".mailWrapper").ajaxSuccess (function (e, xhr, settings)
		{
			if (settings.url.indexOf ("page=showmessage") < 0)
				return;
			$ (".overlayDiv > .showmessage .note").each (function ()
			{
				if ($ (this).hasClass ("expoPictures"))
					return;
				$ (this).addClass ("expoPictures");
				var text = $ (this).text ();
				var parent = this;
				var capture;
				if	(capture = text.match (metal))
					ShowResource (parent, imageSources ["ressourcen_metall.gif"], capture [1]);
				else if	(capture = text.match (crystal))
					ShowResource (parent, imageSources ["ressourcen_kristal.gif"], capture [1]);
				else if	(capture = text.match (deuterium))
					ShowResource(parent, imageSources ["ressourcen_deuterium.gif"], capture [1]);
				else if	(capture = text.match (matter))
					ShowResource(parent, imageSources ["ressourcen_DM.gif"], capture [1]);
				else if	(text.match (trader))
					ShowTrader (parent);
				else
				{
					for (var number in ships)
						if (capture = text.match (ships [number]))
							ShowShip (parent, number, capture [1]);
					for (var number in defense)
						if (capture = text.match (defense [number]))
							ShowDefense (parent, number, capture [1]);
				}
			});
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();
