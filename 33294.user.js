// ==UserScript==
// @name           Travian Map Analyser
// @namespace      http://booboo.cwi.hu
// @description    TÃ©rkÃ©p elemzÅ‘ Ã©s sokbÃºzÃ¡s vÃ¶lgy keresÅ‘.
// @version 1.06.3
// @author	Booboo
// @e-mail	boobooka@gmail.com
// @include http://*.travian.*/*.php*
// @exclude http://*.travian.*/hilfe.php*
// @exclude http://*.travian.*/log*.php*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/anmelden.php*
// @exclude http://*.travian.*/gutscheine.php*
// @exclude http://*.travian.*/spielregeln.php*
// @exclude http://*.travian.*/links.php*
// @exclude http://*.travian.*/geschichte.php*
// @exclude http://*.travian.*/tutorial.php*
// @exclude http://*.travian.*/manual.php*
// @exclude http://*.travian.*/ajax.php*
// @exclude http://*.travian.*/ad/*
// @exclude http://*.travian.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// ==/UserScript==

/* init */

var version = "1.06.3";
var szerver = window.location.host;
var verUrl = "http://userscripts.org/scripts/show/28846";
var hostUrl = 'http://users.cwi.hu/booboo/d1d/travian/travianmapanalyser/';
var zonaUrl = 'http://' + szerver + '/karte.php?z=';	// URL a tÃ©rkÃ©p zÃ³nÃ¡khoz. ehhez jÃ¶n hozzÃ¡ a zÃ³na szÃ¡ma. :)
var areas = new Array(0); // ebben tÃ¡roljuk az Ã¡tkutatandÃ³ terÃ¼letek url-jeit.
var unitSpeed = 5; // Telepes | Settler

var kezdoIdo = new Date();
var remainingTime = "";
var idoKoz = new function()
{
	var a = new Array;
	this.atlag = function()
	{
		var atl = 0;
		for (i = 0; i < a.length; i++) atl += a[i];
		return (isNaN(atl / a.length)) ? 0 : atl / a.length;
	}
	this.uj = function(n)
	{
		if (a.push(n) > 35) a.shift();
	}
}

checkUpdate(); // MeglessÃ¼k egyÃ¡ltalÃ¡n mikor kell frissÃ­teni. ;)

/* Nyelvi rÃ©sz :)  Language Dependent words */
var LD = new Array;
LD['STARTCOOR'] = decodeURIComponent(GM_getValue('STARTCOOR', 'Starting Co-ordinates'));
LD['RADIUS'] = decodeURIComponent(GM_getValue('RADIUS', 'Searching radius:'));
LD['RAD_TITLE'] = decodeURIComponent(GM_getValue('RAD_TITLE', '0 to 56. Zero searches in the actual 7x7.'));
LD['SEARCHFOR'] = decodeURIComponent(GM_getValue('SEARCHFOR', 'Search for'));
LD['OASIS'] = decodeURIComponent(GM_getValue('OASIS', 'Oasis'));
LD['SEARCH'] = decodeURIComponent(GM_getValue('SEARCH', 'Searching'));
LD['SEARCH_BTN'] = decodeURIComponent(GM_getValue('SEARCH_BTN', 'Search'));
LD['CLOSE'] = decodeURIComponent(GM_getValue('CLOSE', 'Close'));
LD['LOAD_BTN'] = decodeURIComponent(GM_getValue('LOAD_BTN', 'Load'));
LD['CH_LANG'] = decodeURIComponent(GM_getValue('CH_LANG', 'Change Language'));
LD['PLAYER'] = decodeURIComponent(GM_getValue('PLAYER', 'Player:'));
LD['ALLIANCE'] = decodeURIComponent(GM_getValue('ALLIANCE', 'Alliance:'));
LD['AVAIL_LANGS'] = decodeURIComponent(GM_getValue('AVAIL_LANGS', 'Available languages:'));
LD['SAVE'] = decodeURIComponent(GM_getValue('SAVE', 'Save'));
LD['CANCEL'] = decodeURIComponent(GM_getValue('CANCEL', 'Cancel'));
LD['SERVER'] = decodeURIComponent(GM_getValue('SERVER', 'Server:'));
LD['DATE'] = decodeURIComponent(GM_getValue('DATE', 'Date:'));
LD['CENTER'] = decodeURIComponent(GM_getValue('CENTER', 'Center of the search:'));
LD['HITS'] = decodeURIComponent(GM_getValue('HITS', 'Hits:'));
LD['NEWVER'] = decodeURIComponent(GM_getValue('NEWVER', "There's a newer version available."));
LD['UPDATENOW'] = decodeURIComponent(GM_getValue('UPDATENOW', 'Update now?'));
LD['TRAV_TIME'] = decodeURIComponent(GM_getValue('TRAV_TIME', 'Travel time:'));
LD['NOHITS'] = decodeURIComponent(GM_getValue('NOHITS', 'There was no result.'));
LD['LOAD_TITLE'] = decodeURIComponent(GM_getValue('LOAD_TITLE', 'Copy/paste here your saved data'));
LD['SAVE_TITLE'] = decodeURIComponent(GM_getValue('SAVE_TITLE', 'Now you can save this text and close the window'));
LD['ERROR_DATA'] = decodeURIComponent(GM_getValue('ERROR_DATA', "There's an error in the given datas."));
LD['IGM'] = decodeURIComponent(GM_getValue('IGM', 'Send as a message'));
LD['LOAD_CONFIRM'] = decodeURIComponent(GM_getValue('LOAD_CONFIRM', 'This is a TMA message, do you want to use it now?'));
LD['TIME_REMAINS'] = decodeURIComponent(GM_getValue('TIME_REMAINS', 'Time remains:'));
LD['DB_FORMAT'] = decodeURIComponent(GM_getValue('DB_FORMAT', 'Database format'));

GM_registerMenuCommand("TMA: " + LD['CH_LANG'], langUpdate, '', '', LD['CH_LANG'][0]);

/* Ã¼zenet kÃ¼ldÃ©snÃ©l megÃ­rjuk az Ã¼zenetet Ã©s a tÃ©mÃ¡t, autÃ³matikusan. */
if (window.location.href.indexOf("nachrichten.php?t=1") > -1)
{
	if ((text = GM_getValue('IGM_' + szerver, "")) != "")
	{
		$('subject').value = "TMA_IGM";
		$('copy_subject').value = "TMA_IGM";
		$('igm').value = text;
		$('copy_igm').value = text;
		GM_setValue('IGM_' + szerver, "");
	}
}

/* BejÃ¶vÅ‘ Ã¼zenetek figyelÃ©se TMA Ã¼zenetek utÃ¡n lesve */
if (window.location.href.indexOf("nachrichten.php?id=") > -1)
{
	tdNode = document.evaluate("//td[@colspan='3']", document, null, XPathResult.ANY_TYPE, null);
	td = tdNode.iterateNext();
	text = td.innerHTML.replace(/<br\s*\/?>/g, "");
	if(/--\/\/TMA begin\/\/--\n((.*\n)+)--\/\/TMA end\/\/--/m.test(text))
	{
		if (confirm(LD['LOAD_CONFIRM']))
		{
			text = text.substring(text.lastIndexOf('--//TMA begin//--\n') + 18, text.indexOf('--//TMA end//--'));
			post(hostUrl + 'comp.php', 'decomp=' + text, function(text)
			{
				if (text == "error")
				{
					alert(LD['ERROR_DATA']);
					return;
				}
				dataLoad(text);
			});	
		}
	}
}

if (window.location.pathname.indexOf("karte.php") > -1)
{
	if ($names("xp").length)
	{
		var TMA_xy = new Array;
		TMA_xy[0] = $names("xp")[0].value;
		TMA_xy[1] = $names("yp")[0].value;
	}
	else
	{
		TMA_xy = zonaxy(window.location.href.match(/d=(\d+)&c=/)[1]);
	}
}
else 
	var TMA_xy = new Array(0,0);

var FJ = new Array;
FJ[0] = '>....';
FJ[1] = '.>...';
FJ[2] = '..>..';
FJ[3] = '...>.';
FJ[4] = '....>';
FJ[5] = '....<';
FJ[6] = '...<.';
FJ[7] = '..<..';
FJ[8] = '.<...';
FJ[9] = '<....';

/* KÃ©pek */

var pont = 'data:image/bmp;base64,Qk1KAAAAAAAAAD4AAAAoAAAAAwAAAAMAAAABAAEAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wDgAAAA4AAAAOAAAAA=';
var ful = 'data:image/png;base64,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';
var papir = 'data:image/gif;base64,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';
var gabona = 'data:image/gif;base64,R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7';
var fa = 'data:image/gif;base64,R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQxfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qradCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOXZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7';
var agyag = 'data:image/gif;base64,R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96FXI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+ZrQMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7';
var vas = 'data:image/gif;base64,R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7';

/* FÅ‘ ablak lÃ©trehozÃ¡sa. */
if (GM_getValue('allapot_' + szerver, false))
	ablakHelyzete = "0px";
else
	ablakHelyzete = "-302px";
	
var mainDiv = addElem("div", '<h2 align="center"><u>Travian Map Analyser</u></h2>'+
	'<br>&nbsp;<b><u>' + LD["STARTCOOR"] + '</u></b><br>'+
	'&nbsp;x:&nbsp;<input id="TMA_x" size="2" maxlength="4" value="' + TMA_xy[0] + '"/>&nbsp;y:&nbsp;<input id="TMA_y" size="2" maxlength="4" value="' + TMA_xy[1] + '"/>'+
	'&nbsp;<span title="' + LD["RAD_TITLE"] + '">' + LD["RADIUS"] + '</span> <input id="TMA_r" size="1" maxlength="2" value="0"/><br>'+
	'&nbsp;<b><u>' + LD["SEARCHFOR"] + '</u></b><br>'+
	'<input id="TMA_gabona" type="checkbox" checked="checked"/>9-15<img src=' + gabona + ' />&nbsp;&nbsp;'+
	'<input id="TMA_normal" type="checkbox"/>6<img src=' + gabona + ' /><br>'+
	'<input id="TMA_fa" type="checkbox"/>5<img src=' + fa + ' /><br>'+
	'<input id="TMA_agyag" type="checkbox">5<img src=' + agyag + ' /><br>'+
	'<input id="TMA_vas" type="checkbox"/>5<img src=' + vas + ' /><br>'+
	'&nbsp;<u><b>' + LD["OASIS"] + '</b>&nbsp;</u><br>'+
	'<input id="TMA_oazis50" type="checkbox"/>50%<img src=' + gabona + ' />&nbsp;'+
	'<input id="TMA_oazis25" type="checkbox"/>25%<img src=' + gabona + ' /><br>'+
	'<input id="TMA_25fa" type="checkbox"/>25%<img src=' + fa + ' />&nbsp;'+
	'<input id="TMA_25agyag" type="checkbox"/>25%<img src=' + agyag + ' />&nbsp;'+
	'<input id="TMA_25vas" type="checkbox"/>25%<img src=' + vas + ' /><br>'+
	'<img title="Travian Map Analyser" id="TMA_ful" src=' + ful + ' style="position:relative; bottom: 223px; left:-58px; float:left;"/>'+
	'<button style="margin:14px 6px 4px 20px;" id="TMA_keres">' + LD["SEARCH_BTN"] + '</button><button style="margin:14px 3px 4px" id="TMA_betolt">' + LD["LOAD_BTN"] + '</button>'+
	'<a href="' + verUrl + '" style="color:#dd7711; float:right; font-size:10px; margin-right:3px;" target="_blank">v.: ' + version + '</a>',
	{
		'id':'TMA_mainDiv'
	},
	{
		'background': 'url(' + papir + ')',
		'height': '280px',
		'width': '300px',
		'border': '1px solid black',
		'position': 'fixed',
		'top': '22px',
		'right': ablakHelyzete,
		'zIndex': 600
	});

/* FunkciÃ³gombokat beÃ©lesÃ­teni */
$('TMA_keres').addEventListener('click', kereses, true);
$('TMA_betolt').addEventListener('click', betolt, true);
$('TMA_ful').addEventListener('click', menu, true);

/*
* FÅ‘ funkciÃ³k
*/

function kereses()
{
	// TalÃ¡latok adatai
	var tTipus = new Array(0);
	var tNev = new Array(0);
	var tPlayer = new Array(0);
	var tAlliance = new Array(0);

	/* A kÃ©p kitakarÃ¡sa egy Ã¡tlÃ¡tszÃ³ rÃ©teggel */
	lepelEsDiv();
	
	// A keresÃ©si feltÃ©teleket tÃ¡rolja.
	var kapcs = 
		{
			normal: $('TMA_normal').checked,
			gabona: $('TMA_gabona').checked,
			fa: $('TMA_fa').checked,
			agyag: $('TMA_agyag').checked,
			vas: $('TMA_vas').checked,
			o50b: $('TMA_oazis50').checked,
			o25b: $('TMA_oazis25').checked,
			o25f: $('TMA_25fa').checked,
			o25a: $('TMA_25agyag').checked,
			o25v: $('TMA_25vas').checked
		}; 

	/* A keresÃ©s kÃ¶zÃ©ppontja, ehhez kell viszonyÃ­tani a tÃ¡volsÃ¡gokat ;-) */
	var kozeppont = {x: koordFix($("TMA_x").value), y: koordFix($("TMA_y").value)};
	kozeppont.x = (isNaN(kozeppont.x)) ? 0 : kozeppont.x;
	kozeppont.y = (isNaN(kozeppont.y)) ? 0 : kozeppont.y;

	/* A keresÃ©s sugara 7*7-es tÃ©rkÃ©pszeletekben megadva */
	var radius = parseInt($("TMA_r").value, 10);
	radius = (isNaN(radius)) ? 0 : (radius < 0) ? 0 : (radius > 56) ? 56 : radius;

	/* Az Ã¡tkutatandÃ³ terÃ¼let kezdÅ‘ koordinÃ¡tÃ¡ja. /Ã‰szaknyugati pont/ */
	var kk = {x: koordFix(kozeppont.x - 7 * radius), y: koordFix(kozeppont.y + 7 * radius)};

	/* Az Ã¡tkutatandÃ³ 7*7-es rÃ©szek zÃ³napontjait szÃ¡moljuk ki. */
	var zonak = new Array;	// ZÃ³na pontokat tÃ¡rolja.
	for (var iy = 0; iy <= 2 * radius; iy++)
		for(var ix = 0; ix <= 2 * radius; ix++)
			zonak.push(zonaUrl + xyzona(kk.x + 7 * ix, kk.y - 7 * iy));
	
	var max = zonak.length * 49;		// Ã–sszes Ã¡tvizsgÃ¡landÃ³ tÃ©rkÃ©p terÃ¼let.
	var index = 0; 						// Minden Ã¡tvizsgÃ¡lt terÃ¼let utÃ¡n nÃ¶veljÃ¼k 1-el. ;)
	kezdoIdo = new Date().getTime(); 	// A keresÃ©s kezdetÃ©nek ideje ezredmÃ¡sodpercben	
	
	/* ElindÃ­tjuk a keresÃ©st */
	get(zonak.pop(), areasGet);
	timeCounter();

	/**/
	function timeCounter()
	{
		var temp = max - index;
		if (temp > 0)
		{
			remainingTime = timeToString(temp * idoKoz.atlag());
			window.setTimeout(timeCounter, 500, false);
		}
	}
	
	// Az area linkeket gyÅ±jti ki a HTML oldalbÃ³l.
	function areasGet(html, fURL)
	{
		var temp = html.match(/(<area.*\/>)/g).join().split('<area');
		for (var i = 1; i <= 49; i++)
		{
			if (a = temp[i].match(/href="(.*)"/))
				areas.push('http://' + szerver + '/' + a[1]);
			else
				--max;
		}
		get(areas.pop(), kereso);
	}
	
	// KeresÃ©s a kapcsolÃ³k alapjÃ¡n 
	function kereso(html, fURL)
	{
		stat(++index, max);
		
		// A terÃ¼let nevÃ©nek kiszedÃ©se
		if (nev = html.match(/class="ddb">([^<>]+)<\/div/))
		{
			var xy = zonaxy(fURL.match(/d=(\d+)&c=/)[1]);
			nev = nev[1] + " (" + xy[0] + "|" + xy[1] + ")";
		}
		else 
			var nev = html.match(/<h1>([^<>]+)<\/h1/)[1];

		// Title elemet adja a tulaj nevÃ©bÅ‘l Ã©s a klÃ¡njÃ¡bÃ³l.
		var player = html.match(/<td><a href="(spieler.php.*)">\s*(?:<b>)?([^<>]+)(?:<\/b>)?<\/a>/);
		var alliance = html.match(/a href="(allianz.php.*)">([^<>]+)<\/a>/);
		if (player)
		{
			var playerLink = player[1];
			player = player[2];
		}
		else 
			player = playerLink = "";
		if (alliance)
		{
			var allianceLink = alliance[1];
			alliance = alliance[2];
		}
		else 
			alliance = allianceLink = "";
		
		player = (player != "") ? '<a href="' + playerLink + '" target="_blank">' + player + '</a>' : "";
		alliance = (alliance != "") ? '<a href="' + allianceLink + '" target="_blank">' + alliance + '</a>' : "";
	
		if (a = html.match(/id="f(\d)"/))	 // vÃ¶lgyek keresÃ©se
		{
			switch (a[1])
			{
				case '1': 	if (kapcs.gabona)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:#FF9900" href="' + fURL + '" target="_blank">'+ nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '2': 	if (kapcs.vas)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:#996600" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '3': 	if (kapcs.normal)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:grey" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '4': 	if (kapcs.agyag)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:#996600" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '5': 	if (kapcs.fa)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:#996600" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '6':	if (kapcs.gabona)
							{
								tTipus.push('f' + a[1]);
								tNev.push('<a style="color:#FFCC00" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
			}
		}
		else 
		{
			var a = html.match(/w(\d+).jpg" id="resfeld"/); // oÃ¡zisok keresÃ©se
			switch (a[1])
			{
				case '1':
				case '2': 	if (kapcs.o25f)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#77AA00" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '4':
				case '5': 	if (kapcs.o25a)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#77AA00" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '7':
				case '8': 	if (kapcs.o25v)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#77AA00" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '3':
				case '6':
				case '9': 	if (kapcs.o25b)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#009900" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '10':
				case '11': 	if (kapcs.o25b)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#99CC00" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
				case '12': 	if (kapcs.o50b)
							{
								tTipus.push('o' + a[1]);
								tNev.push('<a style="color:#FF6600" href="' + fURL + '" target="_blank">' + nev + '</a>');
								tPlayer.push(player);
								tAlliance.push(alliance);
							}
				break;
			}
		}
	
		if (url = areas.pop()) 
			get(url, kereso);
		else
		{
			if (url = zonak.pop())
				get(url, areasGet);
			else 
			{
				var datum = new Date().toLocaleString();
				tablazat(szerver, datum, kozeppont.x, kozeppont.y, radius, tTipus, tNev, tPlayer, tAlliance);
			}
		}
	}
}

function tablazat(szerver, datum, x, y, radius, tTipus, tNev, tPlayer, tAlliance)
{
	/* KiszÃ¡moljuk a talÃ¡latok tÃ¡volsÃ¡gait a keresÃ©s kÃ¶zÃ©ppontjÃ¡hoz kÃ©pest. dist tÃ¶mbben vannak az eredmÃ©nyek */
	var dist = new Array(0);
	tNev.forEach(function(elem)
	{
		dist.push(tavolsag(zonaxy(elem.match(/d=(\d+)&c=/)[1]), [x, y]));
	});
	/* idx tÃ¶mbe gyÅ±jtjÃ¼k a rendezett tÃ¡volsÃ¡gok mutatÃ³it */
	var idx = rendez(dist);
	var lap = Lapozo(idx.length);
	var imgLepel = $('TMA_lepel');
	var divStat = $('TMA_divStat');
	imgLepel.style.opacity = "0.9";
	divStat.style.top = "0px";
	divStat.style.height = screen.availHeight + "px";
	divStat.innerHTML = '<br><div align="center"><table style="border:2px solid black">'+
	'<tr><td colspan="2"><b>' + LD['SERVER'] + '</b> ' + szerver + '</td><td colspan="2"><b>' + LD['DATE'] + '</b> ' + datum + '</td></tr>'+
	'<tr><td colspan="4"><b>' + LD['CENTER'] + '&nbsp;&nbsp;x:</b> ' + x +' <b>y:</b> ' + y + ' <b>' + LD['RADIUS'] + '</b> ' + radius + '</td></tr>'+
	'<tr><td style="border-bottom:1px solid black"><b>' + LD['HITS'] + '</b> ' + idx.length + '</td><td style="border-bottom:1px solid black"><b>' + LD['PLAYER'] + '</b></td><td style="border-bottom:1px solid black"><b>' + LD['ALLIANCE'] + '</b></td><td style="border-bottom:1px solid black"><b>' + LD['TRAV_TIME'] + '</b></td></tr>'+
	'<tr><td id="TMA_hits" style="border-right:1px dashed grey"></td><td id="TMA_players" style="border-right:1px dashed grey"></td><td id="TMA_alliances"  style="border-right:1px dashed grey"></td><td id="TMA_travTime"></td></tr>'+
	'<tr><td colspan="4" align="center"  style="border-top:1px solid black"><span id="TMA_TTT"></span></td></tr>'+
	'</table><br><button id="TMA_save">' + LD['SAVE'] + '</button><button id="TMA_close">' + LD['CLOSE'] + '</button>'+
	'<button id="TMA_igm">' + LD['IGM'] + '</button>&nbsp;&nbsp;<button id="TMA_database">' + LD['DB_FORMAT'] + '</button></div>';

	if (idx.length == 0)
		$('TMA_hits').innerHTML = '<font color="red">' + LD['NOHITS'] + '</font>';
	else
	{
		$('TMA_TTT').innerHTML = lap.ids();
		oldalakkiirasa(lap.page());
	}
	$('TMA_TTT').addEventListener('click', function(e)
		{
			id = e.target.id;
			lap.clicks(id);
			$("TMA_TTT").innerHTML = lap.ids();
			oldalakkiirasa(lap.page());
		}, true);
	$('TMA_close').addEventListener('click', function()
		{
			// EltÃ¼ntetjÃ¼k a takarÃ¡st ;)
			rmElem(imgLepel);
			rmElem(divStat);
			// TalÃ¡lati tÃ¶mbÃ¶k tÃ¶rlÃ©se
			tTipus = new Array(0);
			tNev = new Array(0);
			tPlayer = new Array(0);
			tAlliance = new Array(0);
		}, true);
	/* MentÃ©s gomb */
	$('TMA_save').addEventListener('click', function()
		{
			if ($('TMA_ioWin'))
				return;
			/* Az eredmÃ©nyek mentÃ©se */
			if (!tNev.length)
			{
				alert(LD['NOHITS']);
				return;
			}
			/* A linkekben az & karaktereket kicserÃ©ljÃ¼k | -re */
			var saveNev = new Array(0);
			tNev.forEach(function(elem)
				{
					saveNev.push(elem.replace(/&/g, '|'));
				});
			/* EgyesÃ­tjÃ¼k a tÃ¶mbÃ¶ket */
			text = szerver + '\n' + datum + '\n' + x + '\n' + y + '\n' + radius + '\n' + tNev.length+'\n';
			text += tTipus.join('\n') + '\n' + saveNev.join('\n') + '\n' + tPlayer.join('\n') + '\n' + tAlliance.join('\n');
			post(hostUrl + 'comp.php', 'comp=' + text, function(text)
				{
					var ioWin = makeIOWin('- ' + LD['SAVE_TITLE'] + ' -', text);
				});
		},true);
	/* Ãœzenetben kÃ¼ldÃ©s gomb */
	$('TMA_igm').addEventListener('click', function()
		{
			if (!tNev.length)
				{
					alert(LD['NOHITS']);
					return;
				}
			/* A linkekben az & karaktereket kicserÃ©ljÃ¼k | -re */
			var saveNev = new Array(0);
			tNev.forEach(function(elem)
				{
					saveNev.push(elem.replace(/&/g, '|'));
				});
			/* EgyesÃ­tjÃ¼k a tÃ¶mbÃ¶ket */
			var text = szerver + '\n' + datum + '\n' + x + '\n' + y + '\n' + radius + '\n' + tNev.length + '\n';
			text += tTipus.join('\n') + '\n' + saveNev.join('\n') + '\n' + tPlayer.join('\n') + '\n' + tAlliance.join('\n');
			post(hostUrl + 'comp.php', 'comp=' + text, function(text)
				{
					GM_setValue('IGM_' + szerver, text);
					window.location.href = "http://" + szerver + "/nachrichten.php?t=1";
				});
		}, true);
	/* AlternatÃ­v kimeneti formÃ¡tum */
	$('TMA_database').addEventListener('click', function()
		{
			if ($('TMA_ioWin'))
				return; // Ha mÃ¡r van egy ilyen ablak akkor nem csinÃ¡lunk semmit
			if (!tNev.length)
			{
				alert(LD['NOHITS']);
				return;
			}
			var text = LD['SERVER'] + " " + szerver + "\n" + LD['DATE'] + " " + datum + "\n\n";
			var db_type, db_xy, db_type2, db_id, db_get;
			for (i = 0; i < tNev.length; i++)
			{
				db_type = (tTipus[idx[i]][0] == "f") ? 1 : 2;
				db_xy = zonaxy(tNev[idx[i]].match(/d=(\d+)&c=([a-z0-9]{2})/)[1]);
				db_id = RegExp.$1;
				db_get = RegExp.$2;
				switch (tTipus[idx[i]])
				{
					case "f1": db_type2 = "3,3,3,9"; break;
					case "f2": db_type2 = "3,4,5,6"; break;
					case "f3": db_type2 = "4,4,4,6"; break;
					case "f4": db_type2 = "4,5,3,6"; break;
					case "f5": db_type2 = "5,3,4,6"; break;
					case "f6": db_type2 = "1,1,1,15"; break;
					case "o1":
					case "o2": db_type2 = "25,0,0,0"; break;
					case "o3": db_type2 = "25,0,0,25"; break;
					case "o4":
					case "o5": db_type2 = "0,25,0,0"; break;
					case "o6": db_type2 = "0,25,0,25"; break;
					case "o7":
					case "o8": db_type2 = "0,0,25,0"; break;
					case "o9": db_type2 = "0,0,25,25"; break;
					case "o10": 
					case "o11": db_type2 = "0,0,0,25"; break;
					case "o12": db_type2 = "0,0,0,50"; break;
				}
				text += db_type + "," + db_xy[0] + "," + db_xy[1] + "," + db_type2 + "," + db_id + "," + db_get + "\n";
			}
			makeIOWin('- ' + LD['DB_FORMAT'] + ' -', text, '', 500);
		}, true);
	
	/* MegjelenÃ­ti az aktuÃ¡lis oldal tartalmÃ¡t. */
	function oldalakkiirasa(oldal)
	{
		var lapok = (idx.length % 30) ? parseInt(idx.length / 30) + 1 : idx.length / 30; // oldalak szÃ¡ma
		var kp = 30 * oldal;
		var vp = (oldal + 1 == lapok) ? idx.length : kp + 30;
		var myHtml = {hits: "", players: "", alliances: "", times: ""};
		for (i=kp; i<vp; i++)
		{
			switch (tTipus[idx[i]])
			{
				case 'f1': myHtml['hits'] += '&nbsp;<span style="color:#DDAA11"><b>9</b></span>&nbsp;&nbsp;<img src="' + gabona + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'f2': myHtml['hits'] += '&nbsp;5&nbsp;&nbsp;<img src="' + vas + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'f3': myHtml['hits'] += '&nbsp;6&nbsp;&nbsp;<img src="' + gabona + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'f4': myHtml['hits'] += '&nbsp;5&nbsp;&nbsp;<img src="' + agyag + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'f5': myHtml['hits'] += '&nbsp;5&nbsp;&nbsp;<img src="' + fa + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'f6': myHtml['hits'] += '<span style="color:#DDAA11"><b>15</b></span>&nbsp;<img src="' + gabona + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o1':
				case 'o2': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + fa + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o3': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + gabona + '"/><img src="' + fa + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o4':
				case 'o5': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + agyag + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o6': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + gabona + '"/><img src="' + agyag + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o7':
				case 'o8': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + vas + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o9': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + gabona + '"/><img src="' + vas + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o10': 
				case 'o11': myHtml['hits'] += '<span style="color:#006666">25%</span><img src="' + gabona + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
				case 'o12': myHtml['hits'] += '<span style="color:#FF0000">50%</span><img src="' + gabona + '"/>' + tNev[idx[i]] + '&nbsp;<br>';
				break;
			}
			myHtml['players'] += "&nbsp;" + tPlayer[idx[i]] + "&nbsp;<br>";
			myHtml['alliances'] += "&nbsp;" + tAlliance[idx[i]] + "&nbsp;<br>";
			myHtml['times'] += "&nbsp;" + utido(dist[idx[i]]) + "<br>";
		}
		$('TMA_hits').innerHTML = myHtml['hits'];
		$('TMA_players').innerHTML = myHtml['players'];
		$('TMA_alliances').innerHTML = myHtml['alliances'];
		$('TMA_travTime').innerHTML = myHtml['times'];
	}
}

/* BetÃ¶lti Ã©s megjelenÃ­ti egy mentett keresÃ©s eredmÃ©nyeit */
function betolt()
{
	if ($('TMA_ioWin'))
		return;
	var ioWin = makeIOWin('- ' + LD['LOAD_TITLE'] + ' -', '', function(text)
	{
		if(/--\/\/TMA begin\/\/--\n((.*\n)+)--\/\/TMA end\/\/--/m.test(text))
		{
			rmElem(ioWin);
			var text = text.substring(text.lastIndexOf('--//TMA begin//--\n') + 18, text.indexOf('--//TMA end//--'));
			post(hostUrl + 'comp.php', 'decomp=' + text, function(text)
			{
				if (text == "error")
				{
					alert(LD['ERROR_DATA']);
					return;
				}
				dataLoad(text);
			});	
		}
	});
}

/* A vÃ¡ltozÃ³ adatok feltÃ¶ltÃ©se a mentett adatokbÃ³l */
function dataLoad(text)
{
	arr = new Array;
	arr = text.split("\n");
	szerver = arr[0];
	datum = arr[1];
	x = arr[2];
	y = arr[3];
	radius = arr[4];
	db = parseInt(arr[5]);
	tTipus = new Array;
	tNev = new Array;
	tPlayer = new Array;
	tAlliance = new Array;
	for (var i = 0; i < db; i++)
	{
		tTipus[i] = arr[6 + i];
		tNev[i] = arr[db + 6 + i].replace(/\|/, "&").replace(/\\/g, "");
		tPlayer[i] = arr[2 * db + 6 + i].replace(/\\/g, "");
		tAlliance[i] = arr[3 * db + 6 + i].replace(/\\/g, "");
	}
	lepelEsDiv();
	tablazat(szerver, datum, x, y, radius, tTipus, tNev, tPlayer, tAlliance);
}

function menu(){
	if (GM_getValue('allapot_' + szerver, false))
	{
		// BezÃ¡r
		var ablakHelyzete = parseInt(mainDiv.style.right);
		if (ablakHelyzete - 10 <= -300)
		{
			mainDiv.style.right = "-302px";
			GM_setValue('allapot_' + szerver, false);
		}
		else
		{
			mainDiv.style.right = (ablakHelyzete-10)+"px";
			window.setTimeout(menu,10,false);
		}
	}
	else
	{
		// Kinyit
		var ablakHelyzete = parseInt(mainDiv.style.right);
		if (ablakHelyzete + 10 >= 0)
		{
			mainDiv.style.right = "0px";
			GM_setValue('allapot_' + szerver, true);
		}
		else
		{
			mainDiv.style.right = (ablakHelyzete + 10) + "px";
			window.setTimeout(menu, 10, false);
		}
	}
}

/* KÃ©sleltetett Ã¡tlÃ¡tszatlansÃ¡g */
function opac(id, maxOpacity)
{
	var a = $(id);
	if(isNaN(b = parseFloat(a.style.opacity)))
		var b = 0;
	else 
		var b = parseFloat(a.style.opacity);
	if (b < maxOpacity) 
		a.style.opacity = b + 0.1;
	else
		return;
	window.setTimeout(function (){opac(id, maxOpacity)}, 50, true);
}
/* 
* KiegÃ©szÃ­tÅ‘ funkciÃ³k 
*/

/* A hibÃ¡san nagy koordinÃ¡tÃ¡kat pontosÃ­tja Ã©s alakÃ­tja Ã¡t numerikus formÃ¡tumra. */
function koordFix(koord)
{
	var k = parseInt(koord, 10);
	do
	{
		k = (k > 400) ? k - 801 : (k < -400) ? k + 801 : k;
	}
	while (k < -400 || k > 400);
	return k;
}

/* KoordinÃ¡tÃ¡kbÃ³l zÃ³na pontot szÃ¡mol. */
function xyzona(x, y)
{
	return -801 * koordFix(y) + 320801 + koordFix(x);
}

/* ZÃ³napontbÃ³l koordinÃ¡ta pontokat ad vissza egy kÃ©telemÅ± tÃ¶mbben. */
function zonaxy(z)
{
	var xy = new Array;
	xy[1] = Math.floor(401 - z / 801);	// Y koordinÃ¡ta
	xy[0] = z - 320801 + 801 * xy[1];	// X koordinÃ¡ta
	return xy;
}

/* Ajax-al betÃ¶lti egy oldal tartalmÃ¡t Ã©s egy 'callback' rutinnak adja tovÃ¡bb. ;)  !!!! Greasemonkey 0.8+ !!!! */
function get(url, cb)
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: url,
		onload: function(xhr) { cb(xhr.responseText, xhr.finalUrl); }
	});
}
/* Mint fent csak ez POST eljÃ¡rÃ¡ssal teszi ezt. */
function post(url, data, cb)
{
	GM_xmlhttpRequest(
	{
		method: "POST",
		url: url,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI(data),
		onload: function(xhr)
			{
				cb(xhr.responseText);
			}
	});
}

/* A 'tÃ¡volsÃ¡g-tÃ¶mb' elemeit sorbarendezi. Az eredmÃ©ny egy olyan tÃ¶mb, aminek az elemei az eredeti tÃ¶mb indexeire mutatnak rendezve. */
function rendez(tt)
{
	var a = new Array;
	tt.forEach(function(elem, index)
		{
			a[index] = elem += "";
			if ((i = a[index].indexOf('.')) > -1)
				a[index] = a[index].substr(0, i + 2);
			else
				a[index] += ".0";
			if ((i = a[index].length) < 5)
				a[index] = (i == 4) ? '0' + a[index] : '00' + a[index];
			a[index] += ":" + index;
		}
	);
	a.sort();
	a.forEach(function(elem, index)
		{
			a[index] = parseInt(elem.substring(elem.indexOf(":") + 1));
		}
	);
	return a;
}

/* A koordinÃ¡tÃ¡k kÃ¶zti tÃ©nyleges tÃ¡volsÃ¡got adja vissza.  */
function tavolsag(xy1, xy2)
{
	var x = Math.abs(xy1[0] - xy2[0]);
	var y = Math.abs(xy1[1] - xy2[1]);
	x += -801 * (x > 400);
	y += -801 * (y > 400);
	return Math.sqrt(x * x + y * y);
}

/* FolyamatjelzÅ‘ rutin. KiszÃ¡molja 'max' hÃ¡ny szÃ¡zalÃ©kÃ¡nÃ¡l jÃ¡runk. */
function stat(index, max)
{
	idoKoz.uj(new Date().getTime() - kezdoIdo);
	kezdoIdo = new Date().getTime();
	var counter = index + "";
	counter = parseInt(counter.substr(-1));
	$('TMA_divStat').innerHTML = '<p style="font-size:large; text-align:center;"><b>' + LD['SEARCH'] + FJ[counter] + parseInt(index / (max / 100)) + '%</b></p><p style="text-align:center"><b>' + LD['TIME_REMAINS'] + '</b> <font color="blue">' + remainingTime + '</font></p>';
}

/* Elem lÃ©trehozÃ¡sa */
function addElem(elem, html, attributes, style, parent)
{
	var aElem = document.createElement(elem);
	if (html)
		aElem.innerHTML = html;
	if (attributes)
		for (a in attributes)
			aElem.setAttribute(a, attributes[a]);
	if (style)
		for (a in style)
			aElem.style[a] = style[a];
	if (!parent)
		parent = $tags('body')[0]; 
	else
		parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent)
		return false;
	parent.appendChild(aElem);
	return aElem;
}

/* Elem tÃ¶rlÃ©se */
function rmElem(elem)
{
	if (typeof(elem) == 'string')
		var elem = $(elem);
	elem.parentNode.removeChild(elem);
}

/* Egy elemet ad vissza a megadott ID-vel */
function $(id)
{
	return document.getElementById(id);
}
/* Elemeket ad vissza a megadott name attribÃºtummal */
function $names(name)
{
	return document.getElementsByName(name);
}
/* A tag-ben megadott TAG-eket adja vissza */
function $tags(tag)
{
	return document.getElementsByTagName(tag);
}
/* LapozÃ³ objektum. ;) */
function Lapozo(talalatszam)
{
	var obj = new Object();
	obj.ids = ids;
	obj.clicks = clicks;
	obj.page = page;

	var talalatok = talalatszam;
	var lapok = (talalatok % 30) ? parseInt(talalatok / 30) + 1 : talalatok / 30; // oldalak szÃ¡ma
	var allapot = new Array(6);
	var texts = new Array(6); // A kapcsolÃ³k kimenetÃ©t tartalmazza
	var index = new Array(0,1,2,3,4,5); // Az aktuÃ¡lis oldalakra mutatÃ³ index
	var lastTextPage = 0; // A megjelenÃ­tendÅ‘ oldal szÃ¡ma alapbÃ³l az elsÅ‘ (0)
	var txt;
	
	/* init */
	allapot[0] = "text";
	if (lapok <= 6)
	{
		for (var i = 1; i < lapok; i++)
			allapot[i] = "aktiv";
		for (var m = i; m < 6; m++)
			allapot[m] = "inaktiv";
	}
	else
	{
		for (var i = 1; i <= 4; i++)
			allapot[i] = "aktiv";
		allapot[i] = "lapozo";
	}

	return obj;
	
	function ids()	 // A kapcsolÃ³k kimenetÃ©t adja vissza
	{
		for (id=0; id<=5; id++)
		{
			switch (allapot[id])
			{
				case "inaktiv":
					texts[id] = "";
					break;
				case "text": 
					texts[id] = (index[id] + 1 == lapok) ? 30 * index[id] + 1 + '-' + talalatok : 30 * index[id] + 1 + '-' + parseInt(30 * index[id] + 30);
					break;
				case "aktiv":
					txt = (index[id] + 1 == lapok) ? 30 * index[id] + 1 + '-' + talalatok : 30 * index[id] + 1 + '-' + parseInt(30 * index[id] + 30);
					texts[id] = '<a id="TMA_L' + id + '" href="javascript:void(0)">' + txt + '</a>';
					break;
				case "lapozo":
					texts[id] = '<a id="TMA_L' + id + '" href="javascript:void(0)"><...></a>';
					break;
			}
		}
		if (lapok < 6)
		{
			txt = "";
			for (var i = 0; i < lapok - 1; i++)
				txt += texts[i] + ",&nbsp;";
			txt += texts[i];
		}
		else
			return texts.join(",&nbsp;");
		return txt;
	}
	function clicks(id)	// ElvÃ©gzi a kapcsolÃ³k beÃ¡llÃ­tÃ¡sÃ¡t attÃ³l fÃ¼ggÅ‘en melyik kapcsolÃ³n klikkeltek
	{
		if (/^TMA_L(\d)$/.test(id) && (RegExp.$1 <= 5))
			id = RegExp.$1;
		else
			return false;
		switch (allapot[id])
		{
			case "aktiv":
				lastTextPage = index[id];
				break;
			case "lapozo":
				if (id == 5)
					var m = ((i = lapok - (index[5] + 4)) > 0) ? 3 : 3 + i;
				else
					var m = ((i = index[1] - 4) > 0) ? -3 : -3 - i;
				for (var i = 1; i <= 5; i++)
					index[i] += m;
				break;
		}
		if (allapot[5] != "inaktiv") 
			allapot[5] = (index[5] == lapok - 1) ? "aktiv" : "lapozo";
		for (var i = 0; i <= 5; i++)
			allapot[i] = (index[i] == lastTextPage) ? "text" : (allapot[i] == "text") ? "aktiv" : allapot[i];
		if (allapot[1] != "inaktiv")
			allapot[1] = (index[1] != lastTextPage) ? ((index[1] == 1) ? "aktiv" : "lapozo") : "text";
		return true;
	}
	function page()	// Az Ã©ppen megjelenÃ­tendÅ‘ oldalt adja vissza
	{
		return lastTextPage;
	}
}

/* A kÃ©p kitakarÃ¡sa egy Ã¡tlÃ¡tszÃ³ rÃ©teggel */
function lepelEsDiv()
{
	var imgLepel = addElem('img', '', 
		{
			'id': 'TMA_lepel',
			'src': pont
		},
		{
			'width': screen.availWidth + 'px',
			'height': screen.availHeight + 'px',
			'position': 'fixed',
			'top': '0px',
			'left': '0px',
			'zIndex': 650
		}
	);
	opac('TMA_lepel', 0.8);
	var divStat = addElem('div', '',
		{
			'id': 'TMA_divStat'
		},
		{
			'zIndex': 651,
			'width': screen.availWidth + 'px',
			'position': 'fixed',
			'top': parseInt(screen.availHeight / 3) + 'px'
		}
	);
}

/* Az Ãºt megtÃ©telÃ©hez kellÅ‘ idÅ‘ */
function utido(tav)
{
	var ido = (1 / unitSpeed) * tav;
	var h = Math.floor(ido);
	var m = Math.floor((ido - h) * 60);
	var s = Math.floor(ido * 3600 - (h * 3600 + m * 60));
	return h + "h " + m + "m " + s + "s";
}

/* EmÃ©szthetÅ‘ formÃ¡t ad az egysÃ©gnyi idÅ‘nek : ) */
function timeToString(ms)
{
	var s = ms / 1000;
	var h = Math.floor(s / 3600);
	var m = Math.floor(s / 60) % 60;
	s = parseInt(s % 60);
	m = (m > 9) ? m : "0" + m;	
	s = (s > 9) ? s : "0" + s;
	return h + ":" + m + ":" + s;
}

/* TMA I/O ablak lÃ©trehozÃ¡sa */
function makeIOWin(title, text, cb, magassag)
{
	var aMag = (magassag) ? magassag : 200;
	var aSzel = 500;
	var posx = screen.availWidth / 2 - aSzel / 2;
	var posy = screen.availHeight / 3 - aMag / 2;
	var ioWin = addElem('div', '',
		{
			'id':'TMA_ioWin'
		},
		{
			'backgroundColor': '#FFFFFF',
			'opacity': 0.9,
			'width': aSzel+'px',
			'position': 'fixed',
			'color': 'black',
			'border': '2px ridge black',
			'zIndex': 700,
			'top': posy+'px',
			'left': posx+'px',
			'clear': 'both'
		}
	);
	var cimDiv = addElem('div', title,
		{
			'id': 'TMA_cim'
		},
		{
			'backgroundColor': '#DDDDDD',
			'width' : (aSzel - 15 - 8) + 'px',
			'textAlign': 'center',
			'color': 'black',
			'fontWeight': 'bold',
			'border': '2px outset black',
			'cssFloat': 'left',
			'cursor':'move'
		}, ioWin);
	var closeDiv = addElem('div', 'x',
		{
			'id': 'TMA_ioClose'
		},
		{
			'backgroundColor': '#DDDDDD',
			'width': '15px',
			'textAlign': 'center',
			'color': 'black',
			'fontWeight': 'bold',
			'border': '2px outset black',
			'cssFloat': 'left',
			'cursor':'pointer'
		}, ioWin);
	
	makeDraggable(ioWin, cimDiv);
	
	addElem('textarea', '', 
		{
			'id': 'TMA_textarea'
		},
		{
			'textAlign': 'center',
			'width': (aSzel - 4) + 'px',
			'height': (aMag - 20) + 'px',
			'border': '2px inset black'
		}, ioWin);
	
	$('TMA_ioClose').addEventListener('mouseover', function(){
		this.style.backgroundColor = "#FF0000";
		}, true);
	$('TMA_ioClose').addEventListener('mouseout', function(){
		this.style.backgroundColor = "#DDDDDD";
		}, true);
	$('TMA_ioClose').addEventListener('click', function(){
		rmElem(ioWin);
		}, true);
	if (text){
		$('TMA_textarea').value = text;
		$('TMA_textarea').select();
	}
	if (cb) {
		$('TMA_textarea').addEventListener('keyup', function(){
			cb($('TMA_textarea').value);
		}, true);
		$('TMA_textarea').addEventListener('mouseout', function(){
			cb($('TMA_textarea').value);
		}, true);
	}
	return ioWin;
}

// Nyelvi frissÃ­tÃ©s
function langUpdate()
{
	function valaszt(html,fURL)
	{
		var avLangs = html.split(';');
		var txt = '<div align="center"><h2>' + LD['AVAIL_LANGS'] + '</h2><br>';
		for (var i = 0; i < avLangs.length; i++)
		{
			txt += '<input type="radio" name="TMA_langs" value=' + avLangs[i] + ' /><img src="' + hostUrl + 'img/' + avLangs[i] + '.gif" />&nbsp;&nbsp;' + avLangs[i] + '<br>';
		}
		txt += '<br><button id="TMA_langLoad">' + LD['LOAD_BTN'] + '</button>&nbsp;&nbsp;<button id="TMA_Cancel">' + LD['CANCEL'] + '</button></div>';
		var myDiv = addElem('div', txt,
			{
				'id': 'TMA_div'
			},
			{
				'width': screen.availWidth + 'px',
				'position': 'fixed',
				'top': '30px',
				'left': '0px',
				'zIndex': 652
			}
		);
		
		/* LetÃ¶ltÅ‘ gomb */
		$("TMA_langLoad").addEventListener('click', function()
			{
				var langs = $names("TMA_langs");
				for (var i = 0; i < langs.length; i++)
				{
					if(langs[i].checked)
					{
					get(hostUrl + 'lang.php?lang=' + langs[i].value, ment);
					break;
					}
				}
			}, true);
		
		/* VisszavonÃ¡s gomb */
		$("TMA_Cancel").addEventListener('click', function()
			{
				rmElem(myDiv);
				rmElem(imgLepel);
			}, true);
	}

	function ment(html, fURL)
	{
		/* A letÃ¶ltÃ¶tt nyelvet elmentjÃ¼k */
		var temp = html.split('\n');
		for (var i = 0; i < temp.length; i += 2)
			GM_setValue(temp[i], encodeURIComponent(temp[i + 1]));
		rmElem('TMA_div');
		rmElem('TMA_lepel');
		window.location.reload();
	}
	
	get(hostUrl + 'lang.php', valaszt);
	
	/* A kÃ©p kitakarÃ¡sa egy Ã¡tlÃ¡tszÃ³ rÃ©teggel */
	var imgLepel = addElem('img', '',
		{
			'id': 'TMA_lepel',
			'src': pont
		},
		{
			'width': screen.availWidth + 'px',
			'height': screen.availHeight + 'px',
			'position': 'fixed',
			'top': '0px',
			'left': '0px',
			'zIndex': 650
		}
	);
	opac('TMA_lepel', 0.9);
}

// AutÃ³matikus frissÃ­tÃ©s
function checkUpdate()
{
	var d = new Date();
	var t = d.getTime();
	var lastUpdate = parseInt(GM_getValue('lastUpdate', 0));
	if (t - lastUpdate >= 1000 * 60 * 60 * 8)
	{
		get("http://userscripts.org/scripts/review/28846?format=txt", Update);
		GM_setValue('lastUpdate', t + '');
	}
	return;
	
	// update
	function Update(html, fURL)
	{
		var newVersion = html.match(/@version\s+(.*)\n/)[1];
		if (version < newVersion)
			if (confirm("Travian Map Analyser\n" + LD['NEWVER'] + " (v.: " + newVersion + ")\n\n" + LD['UPDATENOW']))
				window.location.href = "http://userscripts.org/scripts/source/28846.user.js";
	}
}
/************************ from Drag n drop******************************/
/* by Risi http: //userscripts.org/ */
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;
function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}
function getMouseOffset(target, ev){
	var docPos  = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}
function getPosition(e){
	var left = 0;
	var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e   = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}
function mouseMove(ev){
	var target = ev.target;
	var mousePos = mouseCoords(ev);
	if (dragObject){
		dragObject.style.position = 'fixed';
		dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
		dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
	}
	lMouseState = iMouseDown;
	return false;
}
function mouseUp(ev){
	if (dragObject) {
		setOption(dragObject.id, dragObject.style.top +'_'+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}
function mouseDown(ev){
	var target = ev.target;
	iMouseDown = true;
	if (target.getAttribute('DragObj')){
		return false;
	}
}
function makeDraggable(parent, item){
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
	if (!parent||!item) return;
	item.addEventListener('mousedown',function(ev){
		dragObject  = parent;
		mouseOffset = getMouseOffset(parent, ev);
		return false;
	}, false);
}
function setOption(key, value) {
	GM_setValue(key, value);
}
/************************ end Drag n drop*******************************/