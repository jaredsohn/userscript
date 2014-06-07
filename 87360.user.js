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
	if	(server.indexOf("ogame.com.es/") != -1)
	{
		metal = /Ð‘Ñ‹Ð»Ð¾ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾\s+([0-9\.]+)\s+ÐœÐµÑ‚Ð°Ð»Ð»/;
		crystal = /Ð‘Ñ‹Ð»Ð¾ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾\s+([0-9\.]+)\s+ÐšÑ€Ð¸ÑÑ‚Ð°Ð»Ð»/;
		deuterium = /Ð‘Ñ‹Ð»Ð¾ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾\s+([0-9\.]+)\s+Ð”ÐµÐ¹Ñ‚ÐµÑ€Ð¸Ð¹/;
		matter = /Ð‘Ñ‹Ð»Ð¾ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾\s+([0-9\.]+)\s+Ð¢ÐµÐ¼Ð½Ð°Ñ ÐœÐ°Ñ‚ÐµÑ€Ð¸Ñ/;
		trader = /ÐžÐ½Ð¸ Ð·Ð°ÑÐ²Ð¸Ð»Ð¸, Ñ‡Ñ‚Ð¾ Ñ…Ð¾Ñ‚ÑÑ‚ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð² Ð’Ð°ÑˆÐ¸ Ð¼Ð¸Ñ€Ñ‹ ÑÐ²Ð¾ÐµÐ³Ð¾ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ»Ñ Ñ Ñ‚Ð¾Ð²Ð°Ñ€Ð°Ð¼Ð¸ Ð½Ð° Ð¾Ð±Ð¼ÐµÐ½/;
		ships[0] = /ÐœÐ°Ð»Ñ‹Ð¹ Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚\s+([0-9\.]+)/;
		ships[1] = /Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚\s+([0-9\.]+)/;
		ships[2] = /Ð›Ñ‘Ð³ÐºÐ¸Ð¹ Ð¸ÑÑ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑŒ\s+([0-9\.]+)/;
		ships[3] = /Ð¢ÑÐ¶Ñ‘Ð»Ñ‹Ð¹ Ð¸ÑÑ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑŒ\s+([0-9\.]+)/;
		ships[4] = /ÐšÑ€ÐµÐ¹ÑÐµÑ€\s+([0-9\.]+)/;
		ships[5] = /Ð›Ð¸Ð½ÐºÐ¾Ñ€\s+([0-9\.]+)/;
		ships[6] = /ÐšÐ¾Ð»Ð¾Ð½Ð¸Ð·Ð°Ñ‚Ð¾Ñ€\s+([0-9\.]+)/;
		ships[7] = /ÐŸÐµÑ€ÐµÑ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº\s+([0-9\.]+)/;
		ships[8] = /Ð¨Ð¿Ð¸Ð¾Ð½ÑÐºÐ¸Ð¹ Ð·Ð¾Ð½Ð´\s+([0-9\.]+)/;
		ships[9] = /Ð‘Ð¾Ð¼Ð±Ð°Ñ€Ð´Ð¸Ñ€Ð¾Ð²Ñ‰Ð¸Ðº\s+([0-9\.]+)/;
		ships[10] = /Ð¡Ð¾Ð»Ð½ÐµÑ‡Ð½Ñ‹Ð¹ ÑÐ¿ÑƒÑ‚Ð½Ð¸Ðº\s+([0-9\.]+)/;
		ships[11] = /Ð£Ð½Ð¸Ñ‡Ñ‚Ð¾Ð¶Ð¸Ñ‚ÐµÐ»ÑŒ\s+([0-9\.]+)/;
		ships[12] = /Ð—Ð²ÐµÐ·Ð´Ð° ÑÐ¼ÐµÑ€Ñ‚Ð¸\s+([0-9\.]+)/;
		ships[13] = /Ð›Ð¸Ð½ÐµÐ¹Ð½Ñ‹Ð¹ ÐºÑ€ÐµÐ¹ÑÐµÑ€\s+([0-9\.]+)/;
		defense[0] = /Ð Ð°ÐºÐµÑ‚Ð½Ð°Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ°\s+([0-9\.]+)/
		defense[1] = /Ð›Ñ‘Ð³ÐºÐ¸Ð¹ Ð»Ð°Ð·ÐµÑ€\s+([0-9\.]+)/
		defense[2] = /Ð¢ÑÐ¶Ñ‘Ð»Ñ‹Ð¹ Ð»Ð°Ð·ÐµÑ€\s+([0-9\.]+)/
		defense[3] = /ÐŸÑƒÑˆÐºÐ° Ð“Ð°ÑƒÑÑÐ°\s+([0-9\.]+)/
		defense[4] = /Ð˜Ð¾Ð½Ð½Ð¾Ðµ Ð¾Ñ€ÑƒÐ´Ð¸Ðµ\s+([0-9\.]+)/
		defense[5] = /ÐŸÐ»Ð°Ð·Ð¼ÐµÐ½Ð½Ð¾Ðµ Ð¾Ñ€ÑƒÐ´Ð¸Ðµ\s+([0-9\.]+)/
		defense[6] = /ÐœÐ°Ð»Ñ‹Ð¹ Ñ‰Ð¸Ñ‚Ð¾Ð²Ð¾Ð¹ ÐºÑƒÐ¿Ð¾Ð»\s+([0-9\.]+)/
		defense[7] = /Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ñ‰Ð¸Ñ‚Ð¾Ð²Ð¾Ð¹ ÐºÑƒÐ¿Ð¾Ð»\s+([0-9\.]+)/
		defense[9] = /Ð Ð°ÐºÐµÑ‚Ð°-Ð¿ÐµÑ€ÐµÑ…Ð²Ð°Ñ‚Ñ‡Ð¸Ðº\s+([0-9\.]+)/
		defense[10] = /ÐœÐµÐ¶Ð¿Ð»Ð°Ð½ÐµÑ‚Ð½Ð°Ñ Ñ€Ð°ÐºÐµÑ‚Ð°\s+([0-9\.]+)/
	}
	else if (server.indexOf("bg.ogame.org/") != -1)
	{
		metal = /ÐœÐµÑ‚Ð°Ð»\s+([0-9\.]+)\s+ÑÐ° Ð·Ð°Ð³Ñ€Ð°Ð±ÐµÐ½Ð¸/;
		crystal = /ÐšÑ€Ð¸ÑÑ‚Ð°Ð»Ð¸\s+([0-9\.]+)\s+ÑÐ° Ð·Ð°Ð³Ñ€Ð°Ð±ÐµÐ½Ð¸/;
		deuterium = /Ð”ÐµÑƒÑ‚ÐµÑ€Ð¸ÑƒÐ¼\s+([0-9\.]+)\s+ÑÐ° Ð·Ð°Ð³Ñ€Ð°Ð±ÐµÐ½Ð¸/;
		matter = /Ð¢ÑŠÐ¼Ð½Ð° ÐœÐ°Ñ‚ÐµÑ€Ð¸Ñ\s+([0-9\.]+)\s+ÑÐ° Ð·Ð°Ð³Ñ€Ð°Ð±ÐµÐ½Ð¸/;
		trader = /ÐšÐ°Ð·Ð°Ñ…Ð°, Ñ‡Ðµ ÑÐ° Ð´Ð¾ÑˆÐ»Ð¸ Ð´Ð° Ñ‚ÑŠÑ€Ð³ÑƒÐ²Ð°Ñ‚ Ð½Ð°Ð¹-Ñ€Ð°Ð·Ð»Ð¸Ñ‡Ð½Ð¸ ÑÑ‚Ð¾ÐºÐ¸ Ñ Ð½Ð°ÑˆÐ¸Ñ‚Ðµ ÑÐ²ÐµÑ‚Ð¾Ð²Ðµ/;
		ships[0] = /ÐœÐ°Ð»ÑŠÐº Ð¢Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚ÑŒÐ¾Ñ€\s+([0-9\.]+)/;
		ships[1] = /Ð“Ð¾Ð»ÑÐ¼ Ð¢Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚ÑŒÐ¾Ñ€\s+([0-9\.]+)/;
		ships[2] = /Ð›ÐµÐº Ð˜Ð·Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»\s+([0-9\.]+)/;
		ships[3] = /Ð¢ÐµÐ¶ÑŠÐº Ð˜Ð·Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»\s+([0-9\.]+)/;
		ships[4] = /^ÐšÑ€ÑŠÑÑ‚Ð¾ÑÐ²Ð°Ñ‡\s+([0-9\.]+)/;
		ships[5] = /Ð‘Ð¾ÐµÐ½ ÐšÐ¾Ñ€Ð°Ð±\s+([0-9\.]+)/;
		ships[6] = /ÐšÐ¾Ð»Ð¾Ð½Ð¸Ð·Ð°Ñ‚Ð¾Ñ€\s+([0-9\.]+)/;
		ships[7] = /ÐŸÐµÑ€ÐµÑ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº\s+([0-9\.]+)/;
		ships[8] = /Ð¨Ð¿Ð¸Ð¾Ð½ÑÐºÐ° ÑÐ¾Ð½Ð´Ð°\s+([0-9\.]+)/;
		ships[9] = /Ð‘Ð¾Ð¼Ð±Ð°Ñ€Ð´Ð¸Ñ€Ð¾Ð²Ð°Ñ‡\s+([0-9\.]+)/;
		ships[10] = /Ð¡Ð¾Ð»Ð°Ñ€ÐµÐ½ ÑÐ°Ñ‚ÐµÐ»Ð¸Ñ‚\s+([0-9\.]+)/;
		ships[11] = /Ð£Ð½Ð¸Ñ‰Ð¾Ð¶Ð¸Ñ‚ÐµÐ»\s+([0-9\.]+)/;
		ships[12] = /Ð—Ð²ÐµÐ·Ð´Ð° ÑÐ¼ÐµÑ€Ñ‚Ð¸\s+([0-9\.]+)/;
		ships[13] = /Ð‘Ð¾ÐµÐ½ ÐšÑ€ÑŠÑÑ‚Ð¾ÑÐ²Ð°Ñ‡\s+([0-9\.]+)/;
		defense[0] = /Ð Ð°ÐºÐµÑ‚Ð½Ð° ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ°\s+([0-9\.]+)/;
		defense[1] = /Ð›ÐµÐº Ð»Ð°Ð·ÐµÑ€\s+([0-9\.]+)/;
		defense[2] = /Ð¢ÐµÐ¶ÑŠÐº Ð»Ð°Ð·ÐµÑ€\s+([0-9\.]+)/;
		defense[3] = /Ð“Ð°ÑƒÑ Ð¾Ñ€ÑŠÐ´Ð¸Ðµ\s+([0-9\.]+)/;
		defense[4] = /Ð™Ð¾Ð½Ð½Ð¾ Ð¾Ñ€ÑŠÐ´Ð¸Ðµ\s+([0-9\.]+)/;
		defense[5] = /ÐŸÐ»Ð°Ð·Ð¼ÐµÐ½Ð¾ Ð¾Ñ€ÑŠÐ´Ð¸Ðµ\s+([0-9\.]+)/;
		defense[6] = /ÐœÐ°Ð»ÑŠÐº Ñ‰Ð¸Ñ‚\s+([0-9\.]+)/;
		defense[7] = /Ð“Ð¾Ð»ÑÐ¼ Ñ‰Ð¸Ñ‚\s+([0-9\.]+)/;
		defense[9] = /ÐÐ½Ñ‚Ð¸-Ð±Ð°Ð»Ð¸ÑÑ‚Ð¸Ñ‡Ð½Ð¸ Ñ€Ð°ÐºÐµÑ‚Ð¸\s+([0-9\.]+)/;
		defense[10] = /ÐœÐµÐ¶Ð´ÑƒÐ¿Ð»Ð°Ð½ÐµÑ‚Ð°Ñ€Ð½Ð¸ Ñ€Ð°ÐºÐµÑ‚Ð¸\s+([0-9\.]+)/;
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
		trader = /Diese hat verkÃ¼ndet, einen ReprÃ¤sentanten mit Tauschwaren zu deinen Welten schicken zu wollen/;
		ships[0] = /Kleiner Transporter\s+([0-9\.]+)/;
		ships[1] = /GroÃŸer Transporter\s+([0-9\.]+)/;
		ships[2] = /Leichter JÃ¤ger\s+([0-9\.]+)/;
		ships[3] = /Schwerer JÃ¤ger\s+([0-9\.]+)/;
		ships[4] = /Kreuzer\s+([0-9\.]+)/;
		ships[5] = /Schlachtschiff\s+([0-9\.]+)/;
		ships[6] = /Kolonieschiff\s+([0-9\.]+)/;
		ships[7] = /Recycler\s+([0-9\.]+)/;
		ships[8] = /Spionagesonde\s+([0-9\.]+)/;
		ships[9] = /Bomber\s+([0-9\.]+)/;
		ships[10] = /Solarsatellit\s+([0-9\.]+)/;
		ships[11] = /ZerstÃ¶rer\s+([0-9\.]+)/;
		ships[12] = /Todesstern\s+([0-9\.]+)/;
		ships[13] = /Schlachtkreuzer\s+([0-9\.]+)/;
		defense[0] = /Raketenwerfer\s+([0-9\.]+)/
		defense[1] = /Leichtes LasergeschÃ¼tz\s+([0-9\.]+)/
		defense[2] = /Schweres LasergeschÃ¼tz\s+([0-9\.]+)/
		defense[3] = /GauÃŸkanone\s+([0-9\.]+)/
		defense[4] = /IonengeschÃ¼tz\s+([0-9\.]+)/
		defense[5] = /Plasmawerfer\s+([0-9\.]+)/
		defense[6] = /Kleine Schildkuppel\s+([0-9\.]+)/
		defense[7] = /GroÃŸe Schildkuppel\s+([0-9\.]+)/
		defense[9] = /Abfangrakete\s+([0-9\.]+)/
		defense[10] = /Interplanetarrakete\s+([0-9\.]+)/
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