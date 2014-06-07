// ==UserScript==
// @name           Ogame Redesign: Imagenes en Expediciones
// @namespace      Ogame Redesign: Imagenes en Expediciones
// @include        http://*ogame*
// ==/UserScript==

if ((document.location.href.indexOf('showmessage') != -1))
{ (function()
{	var metal, crystal, deuterium, matter, trader, animal;
	var ships = new Object(), shipss = new Object();
	var server = document.location.href.match(/http:\/\/([^\\\/]+[\\\/])/i);
	if (server)
		server = server[1].toLowerCase().replace(/\\/, "/");
	else
		return;
 if (server.indexOf("ogame.org/") != -1 || server.indexOf("ogame") != -1)
	{ 	metal = /Se han tomado Metal de\s+([0-9\.]+)/;
		crystal = /Se han tomado Cristal de\s+([0-9\.]+)/;
		deuterium = /Se han tomado Deuterio de\s+([0-9\.]+)/;
		matter = /Materia Oscura de\s+([0-9\.]+)/;
		trader = /Estos anunciaron que van a enviar a un representante con bienes de comercio a tus mundos/;
		animal = /Además de algunos pintorescos, pequeños animales de compañía de un desconocido planeta, esta expedición no trae nada emocionante a su regreso del viaje/;
		var animal1 = /Tu expedición no hizo un primer contacto amigable con una especie desconocida/;
		ships[0] = /Nave pequeña de carga\s+([0-9\.]+)/;
		ships[1] = /Nave grande de carga\s+([0-9\.]+)/;
		ships[2] = /Cazador ligero\s+([0-9\.]+)/;
		ships[3] = /Cazador pesado\s+([0-9\.]+)/;
		ships[4] = /Crucero\s+([0-9\.]+)/;
		ships[5] = /Nave de batalla\s+([0-9\.]+)/;
		ships[6] = /Nave de la colonia\s+([0-9\.]+)/;
		ships[7] = /Reciclador\s+([0-9\.]+)/;
		ships[8] = /Sonda de espionaje\s+([0-9\.]+)/;
		ships[9] = /Bombardero\s+([0-9\.]+)/;
		ships[10] = /Satélite solar\s+([0-9\.]+)/;
		ships[11] = /Destructor\s+([0-9\.]+)/;
		ships[12] = /Estrella de la muerte\s+([0-9\.]+)/;
		ships[13] = /Acorazado\s+([0-9\.]+)/;
		shipss[0] = "Nave pequeña de carga";
		shipss[1] = "Nave grande de carga";
		shipss[2] = "Cazador ligero";
		shipss[3] = "Cazador pesado";
		shipss[4] = "Crucero";
		shipss[5] = "Nave de batalla";
		shipss[6] = "Nave de la colonia";
		shipss[7] = "Reciclador";
		shipss[8] = "Sonda de espionaje";
		shipss[9] = "Bombardero";
		shipss[10] = "Satélite solar";
		shipss[11] = "Destructor";
		shipss[13] = "Acorazado";
		var animals = [
		"strana.az/uploads/posts/2008-10/1224604130_001-2484.jpg",
		"strana.az/uploads/posts/2008-10/1224604152_002-2434.jpg",
		"strana.az/uploads/posts/2008-10/1224604148_003-2406.jpg",
		"strana.az/uploads/posts/2008-10/1224604175_004-2413.jpg",
		"strana.az/uploads/posts/2008-10/1224604130_005-2388.jpg",
		"strana.az/uploads/posts/2008-10/1224604150_006-2343.jpg",
		"strana.az/uploads/posts/2008-10/1224604164_007-2225.jpg",
		"strana.az/uploads/posts/2008-10/1224604110_008-2075.jpg",
		"strana.az/uploads/posts/2008-10/1224604198_009-1884.jpg",
		"strana.az/uploads/posts/2008-10/1224604127_010-1665.jpg",
		"strana.az/uploads/posts/2008-10/1224604194_011-1462.jpg",
		"strana.az/uploads/posts/2008-10/1224604134_012-1312.jpg",
		"strana.az/uploads/posts/2008-10/1224604141_013-1123.jpg",
		"strana.az/uploads/posts/2008-10/1224591363_005-2394.jpg",
		"image2.etsy.com/il_430xN.24424438.jpg",
		"www.toyarchive.com/STAForSale/NEW2001+/Aliens/FigBullLoose1a.jpg",
		"rookery2.viary.com/storagev12/932500/932750_4aed_625x1000.jpg",
		"danielladooling.com/sculpture/alienanimals/images/01_FD-3-front-view.jpg",
		"zuzutop.com/wp-content/uploads/2009/07/cute-animals-spiders-2.jpg",
		"s59.radikal.ru/i165/0910/8e/43e1f5738da9.jpg"
	];
	}
	else
		return;

	var shipbox = null, defensebox = null;

	var CreateImg = function(src, style)
	{	var result = document.createElement("img");
		if (src)
			result.setAttribute("src", src);
		if (style)
			result.setAttribute("style", style);
		return result;	}

	var CreateDiv = function(style)
	{	var result = document.createElement("div");
		if (style)
			result.setAttribute("style", style);
		return result;	}

	var CreateSpan = function(text, style)
	{	var result = document.createElement("span");
		if (text)
			result.appendChild(document.createTextNode(text));
		if (style)
			result.setAttribute("style", style);
		return result;	}

	var ShowResource = function(parent, imgsrc, amount, cosa)
	{	
	var background = CreateDiv(
			"background: transparent url(img/navigation/box_fleet_send.gif) no-repeat scroll -340px -30px; " +
			"position: relative; left: 50%; top: 80px; margin-left: -160px; width: 310px; height: 135px;");
		var data = CreateDiv("position: relative; top: 40px; width: 160px; text-align: center;");
		var picture = CreateDiv();
		var value = CreateDiv("padding: 7px;")
		data.appendChild(picture).appendChild(CreateImg(imgsrc));
		data.appendChild(value).appendChild(CreateSpan(amount, "color: #A6B8CB;"));
		var value = CreateDiv("padding: 0px;")		
		data.appendChild(value).appendChild(CreateSpan(cosa, "color: #A6B8CB;"));		
		parent.appendChild(background).appendChild(data);	}

	var ShowTrader = function(parent)
	{	var container = CreateDiv(
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
		parent.appendChild(container);	}

	var ShowShip = function(parent, number, amount)
	{   shipbox = OpenBox(shipbox, parent);
		UpdateBox(shipbox, "img/navigation/ships-on.png", number, amount, shipss[number]);	}

	var OpenBox = function(box, parent)
	{	if (!box || box.parentNode != parent)
		{	CloseBox(box);
			box = CreateDiv();
			parent.appendChild(box);
		}
		return box;	}

	var UpdateBox = function(box, images, number, amount, nombre)
	{	var offset = -80 * number;
		var ship = CreateDiv(
			"background: transparent url(" + images + ") no-repeat scroll " + offset + "px 0px; " +
			"width: 80px; height: 80px; margin: 10px 5px 0px; float: left;");
		var frame = CreateDiv(
			"background: transparent url(img/navigation/ecke_neu_80.gif) no-repeat scroll 0px 0px; " +
			"width: 80px; height: 80px;");
		var value = CreateDiv("position: relative; top: 65px; left: 10px; width: 60px; text-align: right;");
		box.appendChild(ship).appendChild(frame).appendChild(value).appendChild(CreateSpan(amount, "color: #FF9600;"));
		var value = CreateDiv("position: relative; top: 65px; left: 10px; width: 60px; text-align: right;");		
		box.appendChild(ship).appendChild(frame).appendChild(value).appendChild(CreateSpan(nombre, "color: #FF9600;"));			}

	var CloseBox = function(box)
	{	if (!box || !box.hasChildNodes)			return;
		var rows = Math.ceil(box.childNodes.length / 7);
		var cols = Math.ceil(box.childNodes.length / rows);
		var width = cols * 90;
		var height = rows * 90;
		var style = "position: relative; left: 50%; margin-left: " + Math.round(-width / 2) + "px; " +
			"width: " + width + "px; height: " + height + "px";
		box.setAttribute("style", style);
		if (rows * cols - 1 == box.childNodes.length)
		{	var child = box.childNodes[box.childNodes.length - cols + 1];
			var style = child.getAttribute("style").replace(/margin: 10px 5px 0px;/, "margin: 10px 5px 0px 50px;");
			child.setAttribute("style", style);		}	}

	var AnalyzeNodes = function(parent, recurse)
	{	for (var node = parent.firstChild; node != null; node = node.nextSibling)
		{	if ((recurse > 0) && node.hasChildNodes)		AnalyzeNodes(node, recurse - 1);
			var text = node.nodeValue;
			if (!text)				continue;
			var capture;
			if	(capture = text.match(metal))
				ShowResource(parent, "/game/img/layout/ressourcen_metall.gif", capture[1],"Metal");
			else if	(capture = text.match(crystal)) 
				ShowResource(parent, "/game/img/layout/ressourcen_kristal.gif", capture[1],"Cristal"); 
			else if	(capture = text.match(deuterium))
				ShowResource(parent, "/game/img/layout/ressourcen_deuterium.gif", capture[1],"Deuterio");
			else if	(capture = text.match(matter))
				ShowResource(parent, "/game/img/layout/ressourcen_DM.gif", capture[1]);
			else if	((capture = text.match(animal)) || (capture = text.match(animal1)))
{ 	var msgId = parseInt (document.location.href.match (/&msg_id=(\d+)/) [1]);
	var divs = document.getElementsByTagName ("div");
	var pictureURL = null;
	for (var i = 0; i < divs.length; i++)
	{	var currentDiv = divs [i];
		if (currentDiv.className == "note")
		{		pictureURL = animals [msgId % animals.length];
				var picture = document.createElement ("img");
				picture.setAttribute ("src", "http://" + pictureURL);
				var center = document.createElement ("center");
				var p = document.createElement ("p");
				p.appendChild (picture);
				center.appendChild (p);
				currentDiv.appendChild (center);	}	}}
			else if	(text.match(trader))
				ShowTrader(parent);
			else
			{	for (var number in ships)
				{	if (capture = text.match(ships[number]))
						ShowShip(parent, number, capture[1]);
				}			}		}	}

	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++)
	{	if (divs[i].className == "note")
			AnalyzeNodes(divs[i], 1);
	}
	CloseBox(shipbox);
	CloseBox(defensebox);
})();}
