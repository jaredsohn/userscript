// ==UserScript==
// @name Travian3 Beyond MLCN additions
// @author Hans Visser
// @version 1.02
// @namespace   userscripts.org
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://www.travian*.*/*
// @exclude http://help.travian*.*/*
// @exclude *.css
// @exclude *.js
// @description  Travian v3 configurable - Multi LANGUAGE
// ==/UserScript==

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE; // Constante que devuelve el primer elemento por XPath
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE; // Constante que devuelve una lista de elementos por XPath
	var XPListO = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE; // Constante que deuvelve un iterador de elementos por XPath

	var Voorraad = new Array(4);              	// Informacion de recursos almacenados
	var Opslag = new Array(4);               	// Capacidad de los almacenes y granero
	var Productie = new Array(4);  				// Productie por segundo

	var Dorpsnaam = "";
	var Header = "";
	var max_capaciteit;
	var userID = "";
	var lonelyTownNEWDID;
	
	var urlTipo = "";
	var urlRecurso = "";
	var urlTipoRecurso = "";
	
	var ScriptTime = getDateTime().split(" ")[1];
	
	var KostenTbl = ""
	
	var PlusActive = false;
	
	var localGraphicPack = "";
	
	var docDir = ['left', 'right'];

	var Qualifiers = " dorf1 dorf2 build karte statistiken berichte nachrichten";

	var VoorraadDorpstotalenTbl = new Array(0,0,0,0);
	var ProductieDorpstotalenTbl = new Array(0,0,0,0);
	var ProductieTotalenPerDorpTbl = new Array
	var VoorraadTotalenPerDorpTbl = new Array
	
	var AantalHandelarenPerDorpTbl = new Array
	var DorpenTbl = new Array
	
	var imgPr = 'data:image/gif;base64,';
	
	var image = {
		"bau": 			imgPr + 'R0lGODlhCgAQAPcAAAAAAEhLU0tOVk1QWE9SWlJSV1NWXlRVXlRXXlZYYFtcYVhcY2BjaWVnbWVnb3F0enJ1e3N2fHZ4fnZ5f3d8gXp8gX+ChoiLkY2QkY2QlI+SlJeYmZqcnKOlpKGkp6qusa+xsK6wtLeqoLq7u7q8v7y+wNG7qNO+rNO/r9XCsdjDsd7Nvd3NvsLGx8bHyMnIxMrKy8zNzdjOxt3PxNTV1dbY2Nzd3+PSwune0u7j2Ozk3uLj4+nq6vXv5/Dr6PT09fn28/j4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKABAAAAhpAP8JHChQhQ+CA3OgQDhwxQyGAk/ogNjDBBCIOFJA/HeDxUYRMiD+aAADIYkPLRS4IGhjwYAMBSqUqPHvRwQEAShY6PCCx78LBghMyLBhRJB/IQQkgKCBQ4yBDg4wwABiB0EJDzzQYBgQADs=',
		"del":			imgPr + 'R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7'
				}

	var KataDoel = new Array();
		KataDoel[1] = 'Academie 22';
		KataDoel[2] = 'Ambassade 18';
		KataDoel[3] = 'Bakkerij 9';
		KataDoel[4] = 'Barakken 19';
		KataDoel[5] = 'Graanakker 4';
		KataDoel[6] = 'Graansilo 11';
		KataDoel[7] = 'GroteBarakken 28';
		KataDoel[8] = 'GroteStal 30';
		KataDoel[9] = 'Handelskantoor 28';
		KataDoel[10] = 'Hoofdgebouw 15';
		KataDoel[11] = 'Houthakker 1';
		KataDoel[12] = 'Kleiafgraving 2';
		KataDoel[13] = 'Korenmolen 8';
		KataDoel[14] = 'Marktplaats 17';
		KataDoel[15] = 'Pakhuis 10';
		KataDoel[16] = 'Paleis 26';
		KataDoel[17] = 'Raadhuis 24';
		KataDoel[18] = 'Residentie 25';
		KataDoel[19] = 'Schatkamer 27';
		KataDoel[20] = 'Stal 20';
		KataDoel[21] = 'Steenbakkerij 6';
		KataDoel[22] = 'Toernooiveld 14';
		KataDoel[23] = 'Uitrustingssmederij 13';
		KataDoel[24] = 'Verzamelplaats 16';
		KataDoel[25] = 'Wapensmid 12';
		KataDoel[26] = 'Werkplaats 21';
		KataDoel[27] = 'IJzermijn 3';
		KataDoel[28] = 'IJzersmederij 7';
		KataDoel[29] = 'Zaagmolen 5';

	GetGeneralData();
	Bookmarks();
	cityLinks();
	updateHref();
	
	if (location.href.indexOf('dorf3.php') != -1)
		if (PlusActive == false)
			{
				remove_table();
				Overzicht();
			}
	
	if (location.href.indexOf('build.php') != -1)
		{
			Voeg_NaarMarktplaats_toe();
		}

	if (location.href.indexOf('build.php?') != -1)
		{
			UpdatePostCommand();
			UpdateMarktplaats();
			updateHrefMarktplaats();
			CheckTarget();
		}

	if (location.href.indexOf('a2b.php') != -1)
		{
			UpdatePostCommand();
			UpdateKataDoelen();
			Update_send_troops();
		}

	if (location.href.indexOf('berichte.php') != -1)
		{
			Alliaanvallen()
			MessageOptions()
		}

	if (location.href.indexOf('nachrichten.php') != -1)
		{
			MessageOptions()
		}
		
	return;
        
        
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
	function GetGeneralData()
		{
			if (document.location.href.indexOf('karte2') == -1)
				for (var i = 0; i < 4; i++)
				{
					var a = document.getElementById("l" + (4 - i));

					Voorraad[i] = parseInt(a.innerHTML.split("/")[0]);
					Opslag[i] = parseInt(a.innerHTML.split("/")[1]);
					Productie[i] = a.title / 3600;
				}

			getDocDirection = document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction");

			id_aldea = getNewdid();

			userID = find("//a[contains(@href,'chatname')]", XPFirst).href.split("|")[1];
			server = location.href.split("/")[2];
				
			Header = header();

			if (location.href.indexOf('dorf1') != -1 | location.href.indexOf('dorf2') != -1)
				Dorpsnaam = Header;
			else
				Dorpsnaam = "";

			var Dorpen = find("//div[@id='vlist']/table[@class='vlist']/tbody", XPFirst);

			if (Dorpen != null && Dorpen.firstChild != null)
				for (var i = 0; i < Dorpen.childNodes.length; i++)
					DorpenTbl[i] = Dorpen.childNodes[i].childNodes[1].textContent;
					
			imgPlus = get("logo");
			
			if (imgPlus.nodeName == 'A')
			{
				if (imgPlus.firstChild.className.length > 0)
					PlusActive = true;
			}
		}

	function Bookmarks()
		{
			var ba = get('lright1');

			if (!ba)
				ba = $elem("DIV", "", {"id": "lright1"}, {}, 'sright');

			var div = $elem("DIV", "", {"id": "bookmarks"});

			var titulo = $elem("B", "Bookmarks:", {"class": "f12"});

			div.appendChild(titulo);

			var tabla = $elem("TABLE", "", {"class": "f12"});

			div.appendChild(tabla);
			
			var p = $elem("P");

			p.appendChild(div);

			ba.appendChild(p);

			div.parentNode.setAttribute('style', 'white-space:nowrap');

			var arrCities = new Array();

			var cities = find("//div[@id='vlist']/table[@class='vlist']/tbody", XPFirst);

			if (!cities)
				var cities = find("//div[@id='sright']/table[@id='vlist']/tbody", XPFirst);

			if (cities != null && cities.firstChild != null)
			{
				for (var i = 0; i < cities.childNodes.length; i++)
				{
					var city = cities.childNodes[i];
					
					arrCities.push(city.innerHTML.match(/newdid=(\d+)/)[1]);
				}
				
				var Delim = ":"
			}
			else
			{
				var ttabla = $elem("TABLE", "", {"id": "nw10"}, {}, 'sright');

				ttabla.appendChild(p);
				
				var tabla = get('nw10');
				
				var Delim = ""
			}

			var bookmarks = new Array();

			if (location.href.indexOf('dorf3') != -1)
				var Target = "_blank"
			else
				var Target = ""

			bookmarks.push('<font color=#0000FF>' + "Marktplaats" + Delim + '</font>::build.php?gid=17');
			bookmarks.push('<font color=#0000FF>' + "Kopen" + Delim + '</font>::build.php?gid=17&t=1');
			bookmarks.push('<font color=#0000FF>' + "Verkopen" + Delim + '</font>::build.php?gid=17&t=2');
			bookmarks.push('');

			if (location.href.match(/gid=14/))
				bookmarks.push('<font color=#0000FF>PT :</font>::build.php?gid=14');

			var tmpStr1 = '<font color=#0000FF>';
			var tmpStr2 = ' ' + Delim + '</font>::build.php?gid=';

			bookmarks.push(tmpStr1 + "Residentie" + tmpStr2 + '25');
			bookmarks.push(tmpStr1 + "Cultuurpunten" + tmpStr2 + '25&s=2');
			bookmarks.push(tmpStr1 + "Raadhuis" + tmpStr2 + '24');
			bookmarks.push(tmpStr1 + "Heldenhof" + tmpStr2 + '37');
			bookmarks.push('');

			bookmarks.push(tmpStr1 + "Barakken" + tmpStr2 + '19');
			bookmarks.push(tmpStr1 + "Stal" + tmpStr2 + '20');
			bookmarks.push(tmpStr1 + "Werkplaats" + tmpStr2 + '21');
			bookmarks.push('');

			bookmarks.push(tmpStr1 + "Uitrustingssmederij" + tmpStr2 + '13');
			bookmarks.push(tmpStr1 + "Wapensmid" + tmpStr2 + '12');
			bookmarks.push('');

			bookmarks.push('<font color=#0000FF>' + "Verzamelplaats" + ' ' + Delim + '</font>::build.php?gid=16');
			bookmarks.push('<font color=#0000FF>' + "Stuur troepen" + ' ' + Delim + '</font>::a2b.php'); 

			for (var i = 0; i < bookmarks.length; i++)
			{
				if (bookmarks[i].length > 0)
				{
					var temp = bookmarks[i].split('::');
					var tr = $elem("TR");
					var className = '';
					
					if (location.href.substring(location.href.length - temp[1].length, location.href.length) == temp[1]) //highlight if we're on this page
						className = 'class=c2';

					var td = $elem("TD", "<span " + className + ">&#8226;</span>&nbsp; <a target='" + Target + "' href='" + AddNewdid(temp[1]) + "'> " + temp[0] + "</a> ");

					td.style.whiteSpace = 'nowrap';
					tr.appendChild(td);

					for (var j = 0; j < arrCities.length; j++)
					{
						td = $elem("TD", "<a target='" + Target + "' href='" + AddNewdid(temp[1],arrCities[j]) + "'> " + (j + 1) + " </a>&nbsp;");

						tr.appendChild(td);
					}
				}
				else
				{
					var tr = $elem("TR");
					var td = $elem("TD");
					tr.appendChild(td);
				}

				tabla.appendChild(tr);
			}

			var bookmarks = new Array();

			var tr = $elem("TR");
			var className = '';
			var td = $elem("TD", "<br>");

			tr.appendChild(td);
			tabla.appendChild(tr);

			bookmarks.push('<font color=#0000FF>' + ('Rapportage Handel') + '</font>::berichte.php?t=2');
			bookmarks.push('<font color=#0000FF>' + ('Rapportage Aanvallen') + '</font>::berichte.php?t=3');
			bookmarks.push('');
			bookmarks.push('<font color=#0000FF>' + ('Alliantie') + '</font>::allianz.php');

			for (var i = 0; i < bookmarks.length; i++)
			{
				if (bookmarks[i].length > 0)
				{
					var temp = bookmarks[i].split('::');
					var tr = $elem("TR");
					var className = '';

					if (location.href.substring(location.href.length - temp[1].length, location.href.length) == temp[1]) //highlight if we're on this page
						className = 'class=c2';

					var td = $elem("TD", "<span " + className + ">&#8226;</span>&nbsp; <a target='" + Target + "' href='" + temp[1] + "'> " + temp[0] + "</a> ");

					td.style.whiteSpace = 'nowrap';
					tr.appendChild(td);
				}
				else
				{
					var tr = $elem("TR");
					var td = $elem("TD");
					tr.appendChild(td);
				}

				tabla.appendChild(tr);
			}

			var tr = $elem("TR");
			var className = '';
			var td = $elem("TD", "<br>");

			tr.appendChild(td);
			tabla.appendChild(tr);
		}

	function cityLinks()
		{
			var allcities = find("//div[@id='vlist']/table[@class='vlist']/tbody", XPFirst);

			if (!allcities)
				var allcities = find("//div[@id='sright']/table[@id='vlist']/tbody", XPFirst);

			if (!allcities)
				return;

			if (location.href.indexOf('dorf3') != -1)
				var Target = "_blank"
			else
				var Target = ""

			var cities = $tags("tr",allcities);

			allcities = allcities.firstChild;

			for (var i = 0; i < cities.length; i++)
			{
				cities[i].innerHTML.search(/newdid=(\d+)/);

				var newdid = RegExp.$1;

				var cityname = cities[i].childNodes[1].textContent;
				
				$elem("TD", "<a target='" + Target + "' href='dorf1.php?newdid=" + newdid + "'><img src='file://C:/Travian/t3_nl_standard/img/un/g/d1.gif' width='12' border='0' title='Overzicht van het dorp'>" + "</a>&nbsp;&nbsp;", {}, {}, cities[i]);
				$elem("TD", "<a target='" + Target + "' href='dorf2.php?newdid=" + newdid + "'><img src='file://C:/Travian/t3_nl_standard/img/un/g/d2.gif' width='12' border='0' title='Centrum van het dorp'>" + "</a>&nbsp;&nbsp;", {}, {},  cities[i]);					
				$elem("TD", "<a target='" + Target + "' href='build.php?gid=17&newdid=" + newdid + "'><img src='file://C:/Travian/t3_nl_standard/img/un/g/g17.gif' width='12' border='0' title='Marktplaats'>" + "</a>&nbsp;&nbsp;", {}, {},  cities[i]);					
			}
        }
        
	function remove_table()
		{
			var a = find("//table[@id='overview']", XPFirst);
			
			var b = $tags('tr', a);

			for (var i = 2; i < b.length; i++)
			{
				var c = $tags('td', b[i]);
				
				if (c.length == 5)
				{
					if (c[4].textContent.indexOf("/") != -1)
						AantalHandelarenPerDorpTbl[i-2] = c[4].textContent;
				}
			}
			
			removeElement(a);
			
			var a = find("//div[@id='textmenu']", XPFirst);
			
			removeElement(a);
		}		
		
	function Overzicht()
		{
			VoorraadDorpstotalenTbl[0] = 0;
			VoorraadDorpstotalenTbl[1] = 0;
			VoorraadDorpstotalenTbl[2] = 0;
			VoorraadDorpstotalenTbl[3] = 0;

			ProductieDorpstotalenTbl[0] = 0;
			ProductieDorpstotalenTbl[1] = 0;
			ProductieDorpstotalenTbl[2] = 0;
			ProductieDorpstotalenTbl[3] = 0;

			var ba = find("//div[@id='vlist']//table[@class='vlist']", XPFirst);
			
			if (!ba)
				var ba = find("//div[@id='sright']//table[@id='vlist']", XPFirst);
			
			if (!ba)
				return;

			var aldeas = $tags('a', ba);

			var tabla = $elem("TABLE", "", {
				"class": "tbg",
				"align": "center",
				"cellspacing": 1,
				"cellpadding": 2
				});

			var tr = $elem("TR");

			var FullRefresh = $elem("A", '<font color=#FF0000>' + '</font>');

			for (var i = 0; i < aldeas.length; i++)
			{
				if (checkhref(aldeas[i]) == true)
				{
					var did = RegExp.$1;

					setTimeout(aanpassen_scherm(did), 500 * i);
				}
			}

			tr.appendChild(FullRefresh);

			var td2 = $elem("TD", 'Overzicht  ' + getDateTime());
			
			tr.appendChild(td2);
			td2.setAttribute("colspan", "5");
			tr.setAttribute("class", "rbg");
			tabla.appendChild(tr);

			var tr = $elem("TR");

			tr.appendChild($elem("TD", ''));
			tr.appendChild($elem("TD", '<img src="' + img('r/1.gif') + '">'));
			tr.appendChild($elem("TD", '<img src="' + img('r/2.gif') + '">'));
			tr.appendChild($elem("TD", '<img src="' + img('r/3.gif') + '">'));
			tr.appendChild($elem("TD", '<img src="' + img('r/4.gif') + '">'));
			tabla.appendChild(tr);

			var Aantaldorpen = 0;
			var id = -1;

			for (var i = 0; i < aldeas.length; i++)
			{
				if (checkhref(aldeas[i]) == true)
				{
					var did = RegExp.$1;
					
					var tr = $elem("TR");

					var td = $elem("TD");
					
					var enlace = $elem("A", "<img src='file://C:/Travian/t3_nl_standard/img/un/a/b3.gif' width='6' border='0' title='ververs' id='aldea" + did + "_boton'>");
					
					enlace.href = "javascript:void(0);";
					enlace.addEventListener("mouseover", aanpassen_scherm(did), 0);
					
					var nobr = $elem("NOBR");
					
					nobr.appendChild(enlace);
					nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" target="_blank" href="build.php?gid=17&newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
					
					td.appendChild(nobr);
					td.setAttribute("rowspan", "2");
					td.setAttribute("align", "left");
					tr.appendChild(td);
					
					tabla.appendChild(tr);

					ProductieTotalenPerDorpTbl[Aantaldorpen] = new Array(did , 0 , 0 , 0 , 0)
					VoorraadTotalenPerDorpTbl[Aantaldorpen] = new Array(did , 0 , 0 , 0 , 0)

					for (var k = 0; k < 4; k++)
					{
						td = $elem("TD", "-");
						td.setAttribute("id", "aldea" + did + "_v" + k);
						td.setAttribute("align", "center");
						td.setAttribute("width", "25%");
						tr.appendChild(td	);
					}
					
					tabla.appendChild(tr);

					tr = $elem("TR");

					for (var l = 0; l < 4; l++)
					{
						td = $elem("TD", "-");
						td.setAttribute("id", "aldea" + did + "_p" + l);
						td.setAttribute("align", "center");
						td.setAttribute("width", "25%");
						tr.appendChild(td);
					}
					
					tabla.appendChild(tr);
					
					id++;

					tr = $elem("TR");

					var td = $elem("TD",AantalHandelarenPerDorpTbl[(id)]);
					tr.appendChild(td);
					
					tabla.appendChild(tr);

					for (var j = 0; j < 4; j++)
					{
						td = $elem("TD", "-");
						td.setAttribute("id", "aldea" + did + "_a" + j);
						td.setAttribute("align", "center");
						td.setAttribute("width", "25%");
						td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
						tr.appendChild(td);
					}
					
					tabla.appendChild(tr);

					Aantaldorpen = (Aantaldorpen + 1);
				}
			}

			var tr = $elem("TR");
			var td = $elem("TD");

			td.setAttribute("rowspan", "2");
			td.setAttribute("align", "left");

			tr.appendChild(td);
			tabla.appendChild(tr);

			for (var k = 0; k < 4; k++)
			{
				td = $elem("TD", "-");
				td.setAttribute("id", "aldea" + "_vt" + k);
				td.setAttribute("align", "center");
				td.setAttribute("width", "25%");
				tr.appendChild(td);
			}

			tabla.appendChild(tr);

			var tr = $elem("TR");

			for (var k = 0; k < 4; k++)
			{
				td = $elem("TD", "-");
				td.setAttribute("id", "aldea" + "_pt" + k);
				td.setAttribute("align", "center");
				td.setAttribute("width", "25%");
				tr.appendChild(td);
			}

			tabla.appendChild(tr);			
			
			br1 = $elem("br");
			br2 = $elem("br");
			
			var a = find("//div[@id='content']", XPFirst);
			a.parentNode.insertBefore(br1, a);
			a.parentNode.insertBefore(br2, a);
			
			insertAfter(a.firstChild, tabla);
		}
	
	function updateHref()
		{
			if (location.href.match(/build\.php\?/))
			{
				if (document.location.href.indexOf('&t=1') != -1)
				{
					var allHref = $tags("td");

					for (var i = 0; i < allHref.length; i++)
					{
						var allHref1 = $tags("a",allHref[i]);

						if (allHref1.length == 1)
						{
							if (allHref1[0].href.indexOf('build') != -1 && allHref1[0].href.indexOf('&g=') != -1)
								allHref[i].innerHTML += '<br>' + allHref[i].innerHTML;
							else
							if (allHref1[0].href.indexOf('newdid') == -1)
								allHref1[0].href = AddNewdid(allHref1[0].href)
						}
					}

					var allHref = $tags("td");

					for (var i = 0; i < allHref.length; i++)
					{
						var allHref1 = $tags("a",allHref[i]);

						if (allHref1.length > 1)
						{
							if (allHref1[0].href.indexOf('newdid') != -1)
								if (allHref1[0].href.indexOf('target') != -1)
									continue;
								else
								{
									allHref1[0].setAttribute("target", "_blank");
									continue;
								}

							if (allHref1[0].href.indexOf('build') == -1 && allHref1[0].href.indexOf('&g=') == -1)
								continue;

							if (allHref1[0].href.indexOf('#') != -1)
							{
								allHref1[0].href = AddNewdid(allHref1[0].href);
								allHref1[1].href = AddNewdid(allHref1[1].href);

								continue;
							}

							allHref1[0].href = AddNewdid(allHref1[0].href);
							
							allHref1[0].setAttribute("target", "_blank");
							allHref1[1].setAttribute("target", "_blank");

							allHref1[0].textContent = 'Zelfde dorp';
							allHref1[1].textContent = 'Ander dorp';
						}
					}
				}
			}
			else
			if (location.href.indexOf('dorf3') != -1)
			{
				var allHref = $tags("a");

				for (var i = 0; i < allHref.length; i++)
				{
					var TempTbl = allHref[i].href.split("/")
					var Qual = TempTbl[(TempTbl.length-1)].split(".")[0]

					if (Qualifiers.indexOf(Qual) > 0)
						allHref[i].setAttribute('target', '_blank');
				}

				var allHref = $tags("area");

				for (var i = 0; i < allHref.length; i++)
				{
					var TempTbl = allHref[i].href.split("/")
					var Qual = TempTbl[(TempTbl.length-1)].split(".")[0]

					if (Qualifiers.indexOf(Qual) > 0)
						allHref[i].setAttribute('target', '_blank');
				}
			}
			
			var allHref = $tags("a");

			for (var i = 0; i < allHref.length; i++)
			{
				if (allHref[i].href.indexOf('newdid') != -1)
					continue;
					
				if (allHref[i].href.indexOf('&g=') != -1)
					continue;
					
				if (allHref[i].id.substring(0,1) == 'n')
					continue;

				if (allHref[i].href.indexOf('dorf1') != -1 || allHref[i].href.indexOf('dorf2') != -1 || allHref[i].href.indexOf('build') != -1 || allHref[i].href.indexOf('plus.php?id=3') != -1 || allHref[i].href.indexOf('a2b') != -1)
					if (allHref[i].href.indexOf('php?') != -1)
						allHref[i].href = AddNewdid(allHref[i].href);
					else
						allHref[i].href = AddNewdid(allHref[i].href);
			}
			

			var allHref = $tags("area");

			for (var i = 0; i < allHref.length; i++)
			{
				if (allHref[i].href.indexOf('newdid') == -1)
					if (allHref[i].href.indexOf('dorf1') != -1 || allHref[i].href.indexOf('dorf2') != -1 || allHref[i].href.indexOf('build') != -1)
						allHref[i].href = AddNewdid(allHref[i].href);
			}

			var Plus = find("//a[@href='plus.php']", XPFirst);

			if (Plus)
				removeElement(Plus);
		}

	function AddNewdid(prmHref, prmNewdid)
		{
			if (prmNewdid)
				var newdid = prmNewdid;
			else
				if (id_aldea == '0')
					return prmHref;
				else
					var newdid = id_aldea;
		
			var Href1 = prmHref.split("?")[0]
			var Href2 = prmHref.split("?")[1]

			if (Href2)
				var Href = Href1 + "?newdid=" + newdid + "&" + Href2
			else
				var Href = Href1 + "?newdid=" + newdid;

			return Href;
		}
		
	function aanpassen_scherm(did){return aanpassen_schermGeneric(did, '', vul_overzicht_scherm, 0);}
	
	function aanpassen_schermGeneric(did, endUrl, callBack, buildDorf)
		{
			var page = buildDorf ? "build.php" : "dorf1.php";
			
			if (did)
				var newdid = "?newdid=";
			else
			{       
				var newdid = "";
				endUrl[0] = "?";
			}
			
			return function()
			{
				find("//img[@id='aldea" + did + "_boton']", XPFirst).src = "file://C:/Travian/t3_nl_standard/img/un/a/b3.gif";
			
				ajaxRequest(page + newdid + did + endUrl, "GET", null, callBack, function()
					{
						find("//img[@id='aldea" + did + "_boton']", XPFirst).src = "file://C:/Travian/t3_nl_standard/img/un/a/b4.gif";
					})
			}
		}
		
	function vul_overzicht_scherm(t)
		{
			var ansdoc = document.implementation.createDocument("", "", null);
			var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);
			
			var ansdoc1 = ansdoc.evaluate("//div[@id='sright']//table[@id='vlist']//td[@class='dot hl']", ans, null, XPFirst, null).singleNodeValue;
			
			var did = getNewdidFromLink($tags("a",ansdoc1.parentNode)[0].href);

			var times = new Array();

			var a = '';

			var GS = new Array();
			var GS = 'Hout Klei IJzer Graan '.split(' ');
			
			var Dorpgevonden = -1

			for (var i = 0; i < VoorraadTotalenPerDorpTbl.length; i++)
			{
				if (VoorraadTotalenPerDorpTbl[i][0] == did)
					Dorpgevonden = i;
			}

			for (var i = 1; i < 5; i++)
			{
				var a = '';

				var b = get("l" + (5 - i), ansdoc);
				
				var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
				var ruimte = Math.round(b.innerHTML.split("/")[1] - b.innerHTML.split("/")[0]);
				var cant = b.innerHTML.split("/")[0];

				var color = '';

				if (perc > 0)
					color = '<font color=blue>';
					
				if (perc > 98)
					color = '<font color=red>';

				txt_cant = cant;

				if (Dorpgevonden >= 0)
				{
					if (VoorraadTotalenPerDorpTbl[Dorpgevonden][i] != 0)
						VoorraadDorpstotalenTbl[i-1] = Math.round(VoorraadDorpstotalenTbl[i-1] - (VoorraadTotalenPerDorpTbl[Dorpgevonden][i] / 1));

					VoorraadTotalenPerDorpTbl[Dorpgevonden][i] = txt_cant

					if (ProductieTotalenPerDorpTbl[Dorpgevonden][i] != 0)
						ProductieDorpstotalenTbl[i-1] = Math.round(ProductieDorpstotalenTbl[i-1] - (ProductieTotalenPerDorpTbl[Dorpgevonden][i] / 1));

					ProductieTotalenPerDorpTbl[Dorpgevonden][i] = b.title 
				}

				VoorraadDorpstotalenTbl[i-1] = Math.round(VoorraadDorpstotalenTbl[i-1] + (VoorraadTotalenPerDorpTbl[Dorpgevonden][i] / 1));
				ProductieDorpstotalenTbl[i-1] = Math.round(ProductieDorpstotalenTbl[i-1] + (ProductieTotalenPerDorpTbl[Dorpgevonden][i] / 1));

				var a = '<nobr><span style="font-size:12px" title="' + ruimte  + '">' + (cant < 0 ? '<font color="red">' : '<font color="green">') + txt_cant + '</font></span> <span style="font-size:12px" title="' + b.innerHTML + '">' + (color + '(' + perc) + '%)</font></nobr>';

				if (i != 4)
					a += '<font color=#DCDCDC>' + '</font>';

				find("//td[@id='aldea" + did + "_v" + (i - 1) + "']", XPFirst).innerHTML = a;

				var a = '<nobr><span style="font-size:12px' + '">' + (b.title < 0 ? '<font color="#ff0000">' + b.title + '</font>' : '<font color="#ff6f0f">' + b.title + '</font>') + '</span> <span style="font-size:10px" title="' + b.title + '"></font></nobr>';

				if (i != 4)
					a += '<font color=#DCDCDC>' + '</font>';

				find("//td[@id='aldea" + did + 	"_p"  + (i - 1) + "']", XPFirst).innerHTML = a;

				var e = '<nobr><span style="font-size:12px"><font color="blue">' + VoorraadDorpstotalenTbl[i-1] + '</font></span></nobr>';

				if (i != 4)
					e += '<font color=#DCDCDC>' + '</font>';

				find("//td[@id='aldea" + "_vt" + (i - 1) + "']", XPFirst).innerHTML = e;

				var e = '<nobr><span style="font-size:12px' + '">' + (ProductieDorpstotalenTbl[i-1] < 0 ? '<font color="red">'  : '<font color="#ff6f0f">') + ProductieDorpstotalenTbl[i-1] + '</font></span></nobr>';

				if (i != 4)
					e += '<font color=#DCDCDC>' + '</font>';

				find("//td[@id='aldea" + "_pt" + (i - 1) + "']", XPFirst).innerHTML = e;
			}

			// Aanvallen
			var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;

			if (!a)
				var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;

			if (a)
			{
				var a = a.firstChild;

				var b1 = ""
				var b2 = ""
				for (var i = 0; i < a.childNodes.length; i++)
				{
					var tr = a.childNodes[i];

					var error = (tr.childNodes.length == 5 ? false : true);

					if (tr.textContent.split('\n')[3].indexOf("ersterk") < 0)
						b1 += '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span style='font-size:13px; color:#2F4F4F' id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
					else
						b2 += '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span style='font-size:13px; color:#2F4F4F' id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
				}
				
				var casilla = find("//td[@id='aldea" + did + "_a0" + "']", XPFirst);
				casilla.innerHTML = b1;

				var casilla = find("//td[@id='aldea" + did + "_a1" + "']", XPFirst);
				casilla.innerHTML = b2;
			}
			
			var check = 'Houthakker Klei-afgraving IJzermijn Graanakker'

			// Bouwopdrachten
			var a = ansdoc.evaluate("//table[@id='building_contract']//tbody", ans, null, XPFirst, null).singleNodeValue;
			
			var casilla1 = find("//td[@id='aldea" + did + "_a3" + "']", XPFirst);
			var casilla2 = find("//td[@id='aldea" + did + "_a2" + "']", XPFirst);
			
			var scasilla1 = casilla1.textContent;
			var scasilla2 = casilla2.textContent;
			
			if (a)
			{
				for (var i = 1; i <= 2; i++)
				{
					if (a.childNodes[i].childNodes.length == 4)
					{
						var Object = a.childNodes[i].childNodes[1].textContent;

						if (check.indexOf(Object.split(" ")[0]) == -1)
							var casilla = casilla1;
						else
							var casilla = casilla2;

						var Time = a.childNodes[i].childNodes[2].textContent.split(" ")[0];

						casilla.innerHTML = '<nobr><img src="' + image["bau"] + '" width="11" border="0"  title="' + Object + '"/> <span id="timeout" style="font-size:12px; color:#666666">' + Time + "</span></nobr>";
					}
				}
			}
			
			if (scasilla1 === casilla1.textContent)
				casilla1.innerHTML = "-";
			
			if (scasilla2 === casilla2.textContent)
				casilla2.innerHTML = "-";
			
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = 'file://C:/Travian/t3_nl_standard/img/un/a/b2.gif';
		}
		
		
	function NaarMarktplaats(Arguments)
		{
			return function() 
				{
					//alert("NaarMarktplaats " + Arguments);
					var ToFetch = calculateToFetch(Arguments);

					if (ToFetch == "0,0,0,0,")
						return;
					
					var DorpVan = prompt("Geef dorp op:");
					
					if (DorpVan)
					{							
						var ToFetchtbl = ToFetch.split(",").splice(0, 4);
					
						getActiveVillage();
							
						var cities = document.evaluate("//div[@id=\'sright\']//table[@id=\'vlist\']/tbody", document, null, 9, null).singleNodeValue;
						
						if (cities)
						{
							if (/newdid=/.test(cities.innerHTML))
							{
								for (var j = 0; j < cities.childNodes.length; j++)
								{
									var City = cities.childNodes[j];
									var Cityname = City.childNodes[1].textContent;
									
									if (Cityname.toLowerCase() == DorpVan.toLowerCase())
										var HrefVan = City.childNodes[1].childNodes[0].href;
								}
							}
							
							var myForm = document.createElement("form");
							
							myForm.method="post";
							myForm.action=HrefVan + "&gid=17#@" + ToFetchtbl[0] + "," + ToFetchtbl[1] + "," + ToFetchtbl[2] + "," + ToFetchtbl[3] + "," + aVillage.vName;
							myForm.target="_blank";
							document.body.appendChild(myForm);
							myForm.submit();
						}
					}
				}
		}
	
	function Voeg_NaarMarktplaats_toe()
		{
			var boolButton = false;
			
			if (Header.split(" ")[0] == "Raadhuis")
			{
				arrH = find('//table[@class="build_details"]//tr', XPList);
			
				if (arrH)
				{
					Busy = find('//table[@class="under_progress"]//tbody//td[@class="dur"]', XPFirst);

					if (Busy)
						var TotTime = ((Busy.textContent.split(":")[0]) * 3600) + ((Busy.textContent.split(":")[1]) * 60) + (Busy.textContent.split(":")[2] * 1);
					else
						var TotTime = ScriptTime;
					
					for (var i = 1; i < arrH.snapshotLength; i++)
					{	
						var arrHtd = $tags("td",arrH.snapshotItem(i));
						
						if (arrHtd.length == 2)
						{								
							arrHtd[1].innerHTML += "<br><br>"
							
							KostenTbl = $tags("div",arrH.snapshotItem(i))[0].textContent.split("|").splice(0, 4);
								
							KostenTbl[4] = TotTime;
							
							var ToSend = calculateToSend(KostenTbl);
							
							//console.log("ToSend " + ToSend  + " + " + TotTime + " + " + Busy.textContent);
							if (ToSend != "0,0,0,0,")
							{
								var SendLink = newLink("Grondstoffen sturen", [['href', 'build.php?gid=17&newdid=' + id_aldea + '#@' + ToSend],['Target', '_blank']]);
								
								arrHtd[1].appendChild(SendLink);
									
								arrHtd[1].innerHTML = arrHtd[1].innerHTML + "<br><br>"// + SarrHtd;
							}
							
							var ToFetch = calculateToFetch(KostenTbl);
							//console.log("ToFetch " + ToFetch  + " + " + TotTime + " + " + Busy.textContent);
							if (ToFetch != "0,0,0,0,")
							{									
								var OphalenLink = newLink("Grondstoffen Ophalen", [['href', 'javaScript:void(0)']]);
								OphalenLink.addEventListener('click', NaarMarktplaats(KostenTbl), false);
								
								arrHtd[1].appendChild(OphalenLink);
							}
						}
					}
				}
			}
			else
			{
				arrH = find('//table[@class="build_details"]', XPFirst);

				if (arrH)
				{
					for (var xi = 1; xi < arrH.rows.length; xi++)
					{
						var aTable = arrH.rows[xi].cells[0].childNodes[1];
						
						if (!aTable)
							var aTable = arrH.rows[xi].cells[0].childNodes[0];
						
						if (aTable)
						{
							if (aTable.nodeName == "IMG")
							{
								var aSpan = arrH.rows[xi].cells[1].childNodes[3];

								if (aSpan)
									if (aSpan.textContent.indexOf("20)") != -1)
										continue;
								
								var bSpan = arrH.rows[xi].cells[1].childNodes[6];
								
								var ContentTbl = bSpan.textContent.split("|").splice(0, 4);
				
								if (ContentTbl.length == 4)
								{
									var arrayRes = new Array;
									
									for (xj = 0; xj < 4; xj++)
									{						
										var intVal = parseInt(ContentTbl[xj]);
										
										arrayRes[arrayRes.length] = intVal;
									}
								}
								else
									continue;
								
								var ToFetch = calculateToFetch(arrayRes);
								
								if (ToFetch == "0,0,0,0,")
									continue;
		
								var OphalenLink = newLink("Grondstoffen Ophalen", [['href', 'javaScript:void(0)']]);
								
								var SarrHtd = arrH.rows[xi].cells[2].innerHTML;
								
								arrH.rows[xi].cells[2].innerHTML = ''
								
								arrH.rows[xi].cells[2].appendChild(OphalenLink);
								arrH.rows[xi].cells[2].innerHTML = arrH.rows[xi].cells[2].innerHTML + "<br><br>" + SarrHtd;
								arrH.rows[xi].cells[2].addEventListener('click', NaarMarktplaats(arrayRes), false);
							}
						}
					}
				}
			}

			arrH = find('//p[@id="contract"]', XPFirst);
				
			if (arrH)
			{
				var Content = ''
				
				for (var xi = 1; xi < arrH.childNodes.length; xi++)
					if (arrH.childNodes[xi].textContent.indexOf("|") != -1)
						Content += trim(arrH.childNodes[xi].textContent.split("|")[0]) + '|'
						
				var ContentTbl = Content.split("|").splice(0,4);
				
				if (ContentTbl.length == 4)
				{
					var arrayRes = new Array;
					
					for (xi = 0; xi < 4; xi++)
					{						
						var intVal = parseInt(ContentTbl[xi]);
						
						arrayRes[arrayRes.length] = intVal;
					}

					var ToFetch = calculateToFetch(arrayRes);

					if (ToFetch != "0,0,0,0,")
					{		
						var OphalenLink = newLink("Grondstoffen Ophalen", [['href', 'javaScript:void(0)']]);
						
						var SarrHtd = arrH.innerHTML;
						
						arrH.innerHTML = ''
						
						arrH.appendChild(OphalenLink);
						arrH.innerHTML = arrH.innerHTML + "<br><br>" + SarrHtd;
						arrH.addEventListener('click', NaarMarktplaats(arrayRes), false);
					}
				}
			}
			
			//window.status='Hi there!'
		}
	
	function UpdateKataDoelen()
		{
			if (Header.split(" ")[0] != "Aanval")
				return;

			var Select = find("//select", XPFirst);
			
			if (!Select)
				return;
				
			var Option = $tags('option', Select);

			for (var i = Option.length-1; i > 0; i--)
			{
				if (Option[i].value != 99)
					removeElement(Option[i]);
			}
				
			var Option = $tags('optgroup', Select);

			for (var i = Option.length-1; i >= 0; i--)
			{
				removeElement(Option[i]);
			}

			var Option = find("//option", XPFirst);

			for(var i = KataDoel.length - 1; i >= 1 ; i--)
			{
				if (KataDoel[i].length > 0)
				{
					var br = $elem('option',KataDoel[i].split(" ")[0]);
					br.setAttribute("value", KataDoel[i].split(" ")[1]);

					insertAfter(Option, br);
				}
			}
		}
		
	function calculateToFetch(needed)
		{
			var ToFetch = '';
			
			if (needed.length > 4)
				if (needed[4] != ScriptTime)
				{					
					for (var i = 0; i < 4; i++)
					{	
						var remainder = Math.round(needed[i] - ((needed[4] * Productie[i]) + Voorraad[i]) + 0.5);
//console.log(needed[i] + " | " + needed[4] + " | " + Productie[i] + " | " + Voorraad[i] + " | " + (needed[4] * Productie[i]) + Voorraad[i] + " | " + remainder);
						if (remainder > -10)
							ToFetch += Math.abs(remainder) + ",";
						else
							ToFetch += "0,";
					}
					
					return ToFetch;
				}
			
			for (var i = 0; i < 4; i++)
			{					
				var a = document.getElementById("l" + (4 - i));
				
				needed[i] = needed[i] - 0;

				var remainder = needed[i] - parseInt(a.innerHTML.split("/")[0]);

				if (remainder > 0)
					ToFetch +=remainder + ",";
				else
					ToFetch += "0,";
			}

			return ToFetch;
		}
		
	function calculateToSend(needed)
		{
			var Tosend = '';
			
			for (var i = 0; i < 4; i++)
			{	
				var remainder = (((needed[4] * Productie[i]) + (Voorraad[i] - 50)) - needed[i]);

				if (remainder > 100)
					if (remainder > Voorraad[i])
						Tosend += Voorraad[i] + ",";
					else
						Tosend += parseInt(remainder) + ",";
				else
					Tosend += "0,";
			}

			return Tosend;
		}
        
	function getNewdid()
		{	
			var a = find("//div[@id='sright']//table[@id='vlist']//td[@class='dot hl']", XPFirst);
			
			if (!a)
			{
				a = find("//td[@class='dot hl']", XPFirst);

				if (!a)
					return 0;
			}

			return getNewdidFromLink($tags("a",a.parentNode)[0].href);
		}
        
	function getNewdidFromLink(aLink)
		{
			aLink.search(/\?newdid=(\d+)/);
			
			var vNewdid = RegExp.$1;

			return vNewdid;
		}

	function find(xpath, xpres, doc)
		{
			if (!doc)
				var doc = document;
			else
				if (typeof doc == 'string')
					doc = $elem('div', doc);

			var ret = document.evaluate(xpath, doc, null, xpres, null);

			return xpres == XPFirst ? ret.singleNodeValue : ret;
		}

	function insertAfter(node, referenceNode)
		{
			node.parentNode.insertBefore(referenceNode, node.nextSibling);
		}

	function $names(name)
		{
			return document.getElementsByName(name);
		}

	function $tags(tag, doc)
		{
			if (!doc)
				var doc = document;

			return doc.getElementsByTagName(tag);
		}

	function $elem(tag, content, attributes, style, parent)
		{
			var ret = document.createElement(tag);
			
			if (content)
				ret.innerHTML = content;

			if (attributes)
				for (a in attributes)
					ret.setAttribute(a, attributes[a]);

			if (style)
				for (a in style)
					ret.style[a] = style[a];

			if (parent)
			{
				parent = (typeof(parent) == 'string') ? get(parent) : parent;

				if (parent)
					parent.appendChild(ret);
			}
			
			return ret;
		}

	function get(id, doc)
		{
			if (!doc)
				var doc = document;

			return doc.getElementById(id);
		}
	
	function xy2id(x, y)
		{
			return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
		}

	function zid2x(z)
		{
			return (((z - 1) % 801) - 400);
		}

	function zid2y(z)
		{
			return (400 - (parseInt(((z - 1) / 801))));
		}
		
	function id2xy(id)
		{
			var x = (id % 801) - 401;
			var y = 400 - (id - 401 - x) / 801;

			return 	{
					x: x,
					y: y
					};
		}
		
	function header()
		{
			var Tmp = find("//h1", XPFirst)
			
			if (Tmp)
				return Tmp.textContent;
			else
				return "";
		}
		
	function removeElement(elem)
		{
			if (elem)
			{
				elem = (typeof (elem) == 'string') ? get(elem) : elem;
				elem.parentNode.removeChild(elem)
			}
		}

	function dispatchOnChange(elem)
		{
			elem = (typeof (elem) == 'string') ? get(elem) : elem;
		
			var evObj = document.createEvent('HTMLEvents');
		
			evObj.initEvent( 'change', true, false );
		
			elem.dispatchEvent(evObj);
		}

	function dispatchClick(elem)
		{
			elem = (typeof (elem) == 'string') ? get(elem) : elem;
			
			var evObj = document.createEvent('MouseEvents');
			
			evObj.initEvent( 'click', true, false );
			
			elem.dispatchEvent(evObj);
	}
        
	function checkhref(tblentry)
		{
			if (tblentry.getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				if (tblentry.getAttribute("href").search(/php/) < 0)
					return true
				else
					return false
			}
			else
				return false
		}
		
	function img(ref, lang_dependant)
		{
			var imgPath = '';
			
			if (ref == 'img/x.gif')
				imgPath = ref;
			else 
			if (!lang_dependant)
				imgPath = localGraphicPack + "img/un/" + ref;
			else
				imgPath = localGraphicPack + "img/nl/" + ref;
				
			return imgPath;
		}
	
	function toNumber(aValue)
		{
			return parseInt(aValue.replace(",", "").replace(",", "").replace(".", "").replace(".", "").replace(" ", "").replace(" ", "").replace("&nbsp;", "").replace("&nbsp", ""));
		}
		
	function addAttributes(elem, cAttribute)
		{
			if (cAttribute !== undefined)
			{
				for (var xi = 0; xi < cAttribute.length; xi++)
				{
					elem.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
					
					if (cAttribute[xi][0].toUpperCase() == 'TITLE') 
						elem.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
	
	function newLink(iHTML, cAttribute)
		{
			var aLink = document.createElement("A");
			
			aLink.innerHTML = iHTML;
			
			addAttributes(aLink, cAttribute);
			
			return aLink;
		}
	
	function getActiveVillage()
		{
			var v = ['', '', '', -1000, -1000, ''];
			
			aV = find("//div[@id='sright']//table[@id='vlist']//td[@class='dot hl']", XPFirst);
			
			if (!aV)
			{
				aV = find("//td[@class='dot hl']", XPFirst);

				if (!aV)
					return;
			}

			v[0] = aV.nextSibling.textContent;
			v[2] = getNewdidFromLink($tags("a",aV.parentNode)[0].href);
			v[3] = trim(aV.nextSibling.nextSibling.textContent.split("|")[0].replace("(", ""));
			v[4] = trim(aV.nextSibling.nextSibling.textContent.split("|")[1].replace(")", ""));
			v[1] = xy2id(v[3], v[4]);
			v[5] = $tags("a",aV.parentNode)[0];
			
			aVillage = new xVillage(v[0], v[1], v[2], v[3], v[4], v[5]);
		}
		
	function UpdatePostCommand()
		{
			Inputs = find("//form", XPFirst);
			
			if (!Inputs)
				return;
			
			Inputs.action = AddNewdid(Inputs.action);
		}
		
	function UpdateMarktplaats()
		{
			if (find("//h1", XPFirst).innerHTML.split(" ")[0] != 'Marktplaats')
				return;
		
			var q = location.href.split('#@');
		
			if (q.length > 1)
			{
				gs_tomove = q[1].split(",")
				
				var Dname = $names("dname")[0];
				
				Dname.value = gs_tomove[4].replace('%20',' ');

				var capaciteit_handelaren = parseInt(find("//form//p/b", XPFirst).innerHTML);
				
				var aantal_handelaren = find("//table[@id='target']//tr//td[@class='mer']", XPFirst);
				
				if (!aantal_handelaren)
					var aantal_handelaren = find("//table[@id='target_select']//tr//td[@class='mer']", XPFirst);
				
				if (!aantal_handelaren)
				{
					alert("aantal handelaren niet gevonden!");
					return;
				}
				
				var aantal_handelaren = parseInt(aantal_handelaren.innerHTML.split(' ')[1].split('/')[0]);
				
				var max_transport = capaciteit_handelaren * aantal_handelaren;
				
				var totalgs = 0;
				
				for (var i = 1; i <= 4 ; i++)
					totalgs += parseInt(gs_tomove[(i-1)]);
				
				if (totalgs > max_transport)
					var quotient = max_transport / totalgs;
				else
					var quotient = 1;
				
				for (var i = 1; i <= 4 ; i++)
				{
					var Rname = $names("r" + i)[0];
				
					Rname.value = parseInt(gs_tomove[(i-1)] * quotient);
					
					if (parseInt(Rname.value) > Voorraad[(i - 1)])
					{
						Rname.setAttribute('style', 'color:red');
						Rname.value = Voorraad[(i - 1)];
					}
						
					if (parseInt(Rname.value) < 0)
						Rname.value = 0;
						
					if (quotient != 1)
						if (parseInt(Rname.value) > 0)
							Rname.setAttribute('style', 'color:red');
				}
			}
		}
		
	function updateHrefMarktplaats()
		{
			if (find("//h1", XPFirst).innerHTML.split(" ")[0] != 'Marktplaats')
			return;

			if (location.href.indexOf('&t=1') != -1)
			{
				Vt = find("//div[@id='vlist']//table[@class='vlist']", XPFirst);

				var allHref = $tags("a",Vt);

				var HrefSuffix = location.href.split("&u")[1];

				if (!HrefSuffix)
					HrefSuffix = ""
				else
					HrefSuffix = "&u" + HrefSuffix

				for (var i = 0; i < allHref.length; i++)
					if (allHref[i].href.indexOf('&t=1') != -1)
						allHref[i].href += HrefSuffix.split("@")[0];
			}
		}

		
	function CheckTarget()
		{
			if (Header.split(" ")[0] != "Marktplaats")
				return

			var DorpPath = find("//p[@class='f135']", XPFirst);
			
			if (!DorpPath)
				return;
			
			Dorp = trim(DorpPath.textContent.split("(")[0]);

			for (var i = 0; i < DorpenTbl.length; i++)
				if (Dorp.toLowerCase() == DorpenTbl[i].toLowerCase())
					return;
					
			var JaNee = confirm("Is dit het goede dorp " + Dorp + "?");
			
			if (JaNee)
			{
				Form = find("//form", XPFirst);

				Form.submit();
			}
		}
		
	function Update_send_troops()
		{
			Inputs = find("//form", XPFirst);
			
			if (!Inputs)
				return;

			Inputs.action = AddNewdid(Inputs.action);
		}
		
	function Alliaanvallen()
		{
			var Menu = find("//div[@id='textmenu']", XPFirst);
		
			if (Menu)
			{
				var Links = $tags('a', Menu);
		
				Links[0].href = "allianz.php?s=3";
				Links[0].textContent = "AA";
			}
		}
	
	function MessageOptions()
		{
			var mrTable;
			
			mrTable = find("//table[@id='overview']", XPFirst);
			
			var intRows = mrTable.rows.length;
			
			mrTable.id = "overview";
			
			if (mrTable.rows[1].cells.length > 1)
				addSelectAllCheckbox(intRows, mrTable);
		}
	
	function addSelectAllCheckbox(intRows, mrTable)
		{
			//check for the "s10" element to avoid double checkbox from other scripts
			var sACheckbox = get("s10");
			
			if (!sACheckbox) 
			{
				var sAcell = mrTable.rows[intRows - 1].cells[0];
				var sAcolspan = sAcell.getAttribute("colspan");
				
				if (sAcolspan)
				{
					if (sAcolspan == "2") 
					{
						sAcell.setAttribute('colspan', '1');
						sAcell.removeAttribute('class');
						
						var bCell = document.createElement("TH");
						
						addAttributes(bCell, [['class', 'buttons'], ['style', 'text-align:' + docDir[0] + ';']]);
						
						bCell.innerHTML = sAcell.innerHTML;

						insertAfter(sAcell, bCell);
					}
				}
				
				sAcell.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" style="vertical-align:bottom;" type="checkbox">';
			}
		}

	function xVillage(name, vID, newdid, x, y, vLink)
		{
			this.vName = name;
			this.vID = vID;
			this.vNewdid = newdid;
			this.vx = x;
			this.vy = y;
			this.vLink = vLink;
			return this;
		}
		
	function getDateTime()
		{
			var Stamp = new Date();

			var Datum = (Stamp.getDate() < 10 ? '0' + Stamp.getDate() : Stamp.getDate()) + '.' +
				(Stamp.getMonth() < 9 ? '0' + (Stamp.getMonth() + 1) : (Stamp.getMonth() + 1)) + '.' + Stamp.getFullYear();

			var Tijd = (Stamp.getHours() < 10 ? '0' + Stamp.getHours() : Stamp.getHours()) + ':' +
				(Stamp.getMinutes() < 9 ? '0' + (Stamp.getMinutes() ) : (Stamp.getMinutes() )) + ':' +
				(Stamp.getSeconds() < 9 ? '0' + (Stamp.getSeconds() ) : (Stamp.getSeconds() ));

			return (Datum + " " + Tijd)
		}
		
	function bereken_seconden(myElement)
		{
			var p = myElement.split(":");
			return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
		}
		
	function trim(stringToTrim)
		{
			return stringToTrim.replace(/^\s+|\s+$/g,"");
		}
		
	function ltrim(stringToTrim)
		{
			return stringToTrim.replace(/^\s+/,"");
		}
		
	function rtrim(stringToTrim)
		{
			return stringToTrim.replace(/\s+$/,"");
		}


	function ajaxRequest(url, aMethod, param, onSuccess, onFailure)
		{
			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.onreadystatechange = function()
				{
					if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && onSuccess != null)
						onSuccess(xmlHttpRequest);
					else
					if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && onFailure != null)
						onFailure(xmlHttpRequest);
				};
	
			xmlHttpRequest.open(aMethod, url, true);
			xmlHttpRequest.url = url;

			if (aMethod == 'POST')
				xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			xmlHttpRequest.send(param);
		}

	function newdID_SingleTown()
		{
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX)
				{
					var aDoc = document.implementation.createDocument("", "", null);

					var aElem = document.createElement('DIV');

					aElem.innerHTML = AJAXrespX.responseText;

					aDoc.appendChild(aElem);

					var aValue = aDoc.evaluate("//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
				})
		}