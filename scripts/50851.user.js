// ==UserScript==
// @name		Travian3 Farm Manager - T3FM
// @author		Andriy Sydor (aka Andriy)
// @namespace 	T3
// @version 	1.0.2
// @description Travian3 Farm Manager - T3FM
// @source		http://userscripts.org/scripts/source/50851.user.js
// @identifier 	http://userscripts.org/scripts/show/50851
// @license 	Le Creative Commons Public Licenses (CCPL) italiane - Attribuzione - Non commerciale 2.5
// @include		http://*.travian.it/a2b.php*
// @include		http://*.travian.it/allianz.php*
// @include 	http://*.travian.it/berichte.php*
// @include 	http://*.travian.it/build.php*
// @include 	http://*.travian.it/dorf1.php*
// @include 	http://*.travian.it/dorf2.php*
// @include 	http://*.travian.it/karte.php*
// @include 	http://*.travian.it/nachrichten.php*
// @include 	http://*.travian.it/plus.php*
// @include 	http://*.travian.it/spieler.php*
// @include 	http://*.travian.it/statistiken.php*
// @exclude 	http://www.travian.it/*
// @exclude		http://forum.travian.it/*
// ==/UserScript==

var tribeType	= 2;

// Variabili Interni
var SCRIPT = {
	NAME: 'Travian3 Farm Manager - T3FM',
	SOURCE: 'http://userscripts.org/scripts/source/50851.user.js',
	VERSION: '1.0.2'
};

var server		= location.hostname;
var rootPath	= "http://" + server + "/";
var page		= document.URL.substring(document.URL.lastIndexOf("/") + 1);

var image		= new Array();
var troopInfo	= new Array();

var XPFirst		= XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList		= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIterate	= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;


function Main()
{
	var html = document.body.innerHTML;
	if (html.indexOf(" <!-- ERROR ITEM CONTAINER") != -1) window.location.replace(rootPath + "dorf1.php");
	
	loadImage();
	loadStyle();
	addLeftMenuLinks();
	
	if (page.indexOf("?FarmManager") != -1) manageFarms();
	if (page.indexOf("karte.php?d=") != -1 && page.lastIndexOf("&c=") != -1) addLinkToKarte();
}

function loadImage()
{
	image['DELETE']		= "data:image/gif;base64,R0lGODlhDAAMAMQQAMwzM88/P/zy8tllZfXZ2fnl5fLMzOyystJMTO+/v+mlpdVZWdxycuWZmeKMjN9/f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAMAAwAQAVJIAQViiCKx0CICQAciLuYJ+MCwSoWw60UMtqp5zKcBAHAICFyABC6Q3KAilFFDVegFxCKkC7GaZxN4oSEJAJiuAEKiYdxbKCFAAA7";
	image['EDIT']		= "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASsSURBVHjaYmzvn8bw798fBmYWdgZmBiaGX39+M7AxszD8/fePgYmVmYGd4RNDjFQXgxDHSwaGPwwM/ySsck591i4T/bhrljLn4y6gwl8MUAAQQEwMeAATwz+Gj79FGM68d2T49xdo1l8GRgap1BiRB79kn92Raf7LyK6LrB4ggFgYCABWpt8MVz+bMIj/2MQgJKXgIv3pj4nczWUMAoycl5j/fr8ONJ4B6CUGBg4GBoAAYiJk2N+/Pxk+/uRjOPdcmeGveFg+0/O9zN9YfjMwyP9c/e03w7f//xgY7j1hYGiaw8AAEEAsuA35y/D3/z9BJXm5fF5+MavnN4KOi0qqOzGcmsjwU4jl7bPfPxdwA4Px8gMGhoqFDAx3njMwAAQQhmH/gAH/8+8vBn5+3ggTY706fW1Nzd9//zPcF2d15fw2A+il9wxP/zDsvPeG4cnTdwwMbasYGF59hOgFCCC4Yf///2f49fsXAycHp4Outmqpga62Fz8fH8OPn78ZXr16ySDO84KB6cMWhq9A+06/U1n24OV/hulr7zF8/Pof7hCAAGKCGPIbZJi2rrb6yogQ3z02luZeLCxsDG/ff2R4/+kLw5cv7xkEuY4xMPx8wfDsnwUjj+XMpKesXnxQg4SAWB2I+QACiIWFhVlOTkYxw0BfL0NOWkrw1+8/DO8+fGL4DaT//vvP8P37TwYent8M7Nx3GX6/ZWB4wuTBKCkuGiQjLSrCxy/Q9+njhw9AgwSBmB8ggBgPHz991FBP1+rbjx8M33/8Yvj95w8DyMC/f/8xsLIAI/s/I8OVi7sZxFk2MDy/9YHhDW8cAycXJzA42Bnu3Ln7furUyW3Pnz45CTTsJ0AAMb3/8PE3KK18Bbrg89dvDF+/gQz9CY4IJiZGBh5uDoY9e88xtM34xfCSL5mBg5ODgRkozs7GxuDr7SW4YsWqhtDIOG0VFf0zAAHErKVnsP/bj5+6UpLiSr9+/QUa+J2BBegiNlZQSvzP8Afo0ju37zCYmtsx6GirM/Dz8TCoqaoyaGtrMcjJyzIoyMuyWVjaODGxC6wACCAWoKMeXr58Pfj9+49zzU2Ng/n5uBl+fP8BjMWfDMyMQBcAvSMlJc/w+9M9BilRAwZRKV0GDjYWoMtYwTF4+8FzhhNnLzIwsvxmAggATQCy/wQBAQEABQUE8ePj5Fv09/ffJCQmdB4aFgD6+voABgUEAAQDAwBDQkAAAvndAPfo1AD+ExoABwwSAOHm6wDL0dcA3dzdqgkFAZEDAQPbAgiezoDR+vPL18+lJ8+c+fRTT7/JQEsFGAl/wIaxcrAxMHArMfDxijB8//aF4fztpwwXLl6+9vXz+zomhr9r2biEGH7++sMAEEAoOYCJiZmBhfFX883rN77/+vmzydJYl5MTaBAHMLB//WFhuHP/I8Ola+eev/vwceGPb597WJiZ3v7/h8jeAAGElp3+MzADyzIudraea1du3Pz87fsyV1tznhdvPjKcuXTt7+NHD+eyMTG2C/BzP/jxHVRcMKLoBgggHBmdEeg9ps1PH93zX7ftSy8wm736/uVjH9BLO1lYuDAMgQGAAGIEZSdqAYAAAwBv6sTarY5ZRgAAAABJRU5ErkJggg==";
	image['LOADING']	= "data:image/gif;base64,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";
	image['SPACE']		= rootPath + "img/x.gif";
	image['ATTACK']		= "data:image/gif;base64,R0lGODlhEAAQANUgALzO0P/SAIGXmeTLpuzz9PTimdStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaRQMDnACoaj4ePEPNhHI+MD5Pw0Xw4TxCn+iGAFh/B9bgVL4wYgGes/XgAmKcAs+ZsPRhBFuTRrN1+WQVFHhOAHkWDRhYbbX0eECAbFkcWHQGHCA4BHZRHHRuPCBEeGx1PAxegAUUBphcDRgYXFBkdoKYdGRQXBiCptRUgFg8SlBW7sA3BeyDIFA0KCcLNzgkKQQA7";
	image['DEFENCE1']	= "data:image/gif;base64,R0lGODlhEAAQALMLANDh45musLt+IIVRAOO2AL2OAEQoBXFDB8p6Em9DCZdZCv///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAARIcC1Fa7pYLlS7TxIHeF+oBCNJgZtioKrCcseblq1SwzhH7YRepUYoCDqzTs0wOK40vl+teWCZPMuq5qrUbrmW7xbhu4jFlHMEADs=";
	image['DEFENCE2']	= "data:image/gif;base64,R0lGODlhEAAQAKIHAEQoBZmusMp6EtDh43FDB29DCZdZCv///yH5BAEAAAcALAAAAAAQABAAAANNeGfc9VAd0aotitqNZx3gQDhZAwYBOBqddgJAGowtMwQAod90adw524zlA654RI8BgDQmPQTYSPpU6hjXqpIj6Woqna5EoHmIzwsDOgEAOw==";
	image['MAXLOOT']	= "data:image/gif;base64,R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==";
}

function loadStyle()
{
	var styleText = ".tFarmTitle {font-weight:bold; cursor:help;}" +
					"" +
					"";
	GM_addStyle(styleText);
	
	troopInfo = [
		[
			['unit u1', 'Legionario', 40, 35, 50, 40],
			['unit u2', 'Pretoriano', 30, 65, 35, 20],
			['unit u3', 'Imperiano', 70, 40, 25, 50],
			['unit u4', 'Legionario a cavallo', 0, 20, 10, 0],
			['unit u5', 'Imperiano a cavallo', 120, 35, 50, 100],
			['unit u6', 'Cavalleria Romana', 180, 80, 105, 70],
			['unit u7', 'Ariete da sfondamento', 60, 30, 75, 0],
			['unit u8', 'Catapulta', 75, 60, 10, 0],
			['unit u9', 'Senatore', 50, 40, 30, 0],
			['unit u10', 'Decurione', 0, 80, 80, 3000]
		],[
			['unit u11', 'Combattente', 40, 20, 5, 60],
			['unit u12', 'Lanciere', 10, 35, 60, 40],
			['unit u13', 'Combattente con ascia', 60, 30, 30, 50],
			['unit u14', 'Esploratore', 0, 10, 5, 0],
			['unit u15', 'Paladino', 55, 100, 40, 110],
			['unit u16', 'Cavalleria Teutonica', 150, 50, 75, 80],
			['unit u17', 'Ariete', 65, 30, 80, 0],
			['unit u18', 'Catapulta', 50, 60, 10, 0],
			['unit u19', 'Comandante', 40, 60, 40, 0]
		],[
			['unit u21', 'Lanciere', 15, 40, 50, 30],
			['unit u21', 'Combattente con spada', 65, 35, 20, 45],
			['unit u21', 'Esploratore', 0, 20, 10, 0],
			['unit u21', 'Cavalleria Gallica', 90, 25, 40, 75],
			['unit u21', 'Cavalleria di difesa', 45, 115, 55, 35],
			['unit u21', 'Cavalleria avanzata', 140, 50, 165, 65],
			['unit u21', 'Ariete', 50, 30, 105, 0],
			['unit u21', 'Catapulta', 70, 45, 10, 0],
			['unit u21', 'Capo tribù', 40, 50, 50, 0]
		]
	];
}

function find(xpath, xpres, startnode)
{
	if (!startnode) startnode = document;
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}

function removeElement(elem)
{
	if (elem)
	{
		if (elem.parentNode) elem.parentNode.removeChild(elem);
	}
}

function createTag(pTag, pContent, pAttributes)
{
	var objTag = document.createElement(pTag);
	if (pContent !== undefined && pContent != null) objTag.innerHTML = pContent;
	if (pAttributes !== undefined)
	{
		for (var i=0; i < pAttributes.length; i++) setAttribute(objTag, pAttributes[i]);
	}
	return objTag;
}

function setAttribute(pElem, pAttribute)
{
	if (pAttribute !== undefined) pElem.setAttribute(pAttribute[0], pAttribute[1]);
}

function addLeftMenuLinks()
{
	var menu = find("//td[@class='menu']", XPFirst);
	if (menu == null)
	{
		menu = find("//div[@id='sleft']/p", XPList);
		if (menu.snapshotLength > 1)
		{
			var pFirst = menu.snapshotItem(0);
			for (var xi = 1; xi < menu.snapshotLength; xi++)
			{
				pFirst.innerHTML += menu.snapshotItem(xi).innerHTML;
				removeElement(menu.snapshotItem(xi));
			}
			menu = pFirst;
		}
		else
		{
			menu = menu.snapshotItem(0);
		}
	}
	
	var linkManageFarm = createTag('A', 'Gestione Farm', [['style','font-weight:bold;']]);
	linkManageFarm.addEventListener('click',
		function()
		{
			if (page.indexOf('spieler.php') != -1 && page.indexOf('?FarmManager') == -1)
			{
				if (page.indexOf('?')) page = page.substring(0, page.indexOf('?'));
				page += '?FarmManager';
				manageFarms();
			}
			else if (page.indexOf('?FarmManager') == -1)
			{
				document.location.href = rootPath + 'spieler.php?FarmManager';
			}
		}, false);
	menu.appendChild(linkManageFarm);
}

function manageFarms()
{
	var content = find("//div[@id='content' and @class='ingame']", XPFirst);
	content.innerHTML = "" +
		"<h1>Gestione Farm</h1>" +
		"<table cellpadding='2' class='tbg'>" +
		"	<tr>" +
		"		<td colspan='15' class='rbg'><a href='#' title='Aggiorna Script'>" + SCRIPT.NAME + " v." + SCRIPT.VERSION + "</a></td>" +
		"	</tr>" +
		"	<tr>" +
		"		<td><span class='tFarmTitle'>&nbsp;</span></td>" +
		"		<td><span class='tFarmTitle' title='Identificativo Farm'>#</span></td>" +
		"		<td><span class='tFarmTitle' title='Organizza Farm per Distanza dal Villaggio'>Farm</span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][0][0] + "' alt='" + troopInfo[tribeType-1][0][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][1][0] + "' alt='" + troopInfo[tribeType-1][1][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][2][0] + "' alt='" + troopInfo[tribeType-1][2][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][3][0] + "' alt='" + troopInfo[tribeType-1][3][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][4][0] + "' alt='" + troopInfo[tribeType-1][4][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][5][0] + "' alt='" + troopInfo[tribeType-1][5][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][6][0] + "' alt='" + troopInfo[tribeType-1][6][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][7][0] + "' alt='" + troopInfo[tribeType-1][7][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][8][0] + "' alt='" + troopInfo[tribeType-1][8][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title=''><img src='" + image['SPACE'] + "' class='" + troopInfo[tribeType-1][9][0] + "' alt='" + troopInfo[tribeType-1][9][1] + "' /></span></td>" +
		"		<td><span class='tFarmTitle' title='Premi il buttone Modifica per modificare una Farm'>E</span></td>" +
		"		<td><span class='tFarmTitle' title='Premi il buttone X per cancellare una Farm'>D</span></td>" +
		"	</tr>" +
		"</table>";
}

function calcolateAttackDefenceMaxLootValues()
{
	var attackValue		= 0;
	var defence1Value	= 0;
	var defence2Value	= 0;
	var maxlootValue	= 0;
	
	for (var i=0; i < 9; i++)
	{
		if (isNaN(document.getElementById('sendTroops' + i).value)) document.getElementById('sendTroops' + i).value = 0;
		attackValue += parseInt((!isNaN(document.getElementById('sendTroops' + i).value)) ? document.getElementById('sendTroops' + i).value : 0) * troopInfo[tribeType-1][i][2];
		defence1Value += parseInt((!isNaN(document.getElementById('sendTroops' + i).value)) ? document.getElementById('sendTroops' + i).value : 0) * troopInfo[tribeType-1][i][3];
		defence2Value += parseInt((!isNaN(document.getElementById('sendTroops' + i).value)) ? document.getElementById('sendTroops' + i).value : 0) * troopInfo[tribeType-1][i][4];
		maxlootValue += parseInt((!isNaN(document.getElementById('sendTroops' + i).value)) ? document.getElementById('sendTroops' + i).value : 0) * troopInfo[tribeType-1][i][2];
	}
	
	document.getElementById('attackValue').innerHTML = attackValue;
	document.getElementById('defence1Value').innerHTML = defence1Value;
	document.getElementById('defence2Value').innerHTML = defence2Value;
	document.getElementById('maxlootValue').innerHTML = maxlootValue;
}

function addLinkToKarte()
{
	var tbody = find("//div[@id='map_details_actions']/table/tbody", XPFirst);
	if (tbody == null)
		return;
	
	// Tabella/Div
	var div = createTag('DIV', null, [['id','tAddFarm'], ['style','position:absolute; display:none; padding:2px; border:1px solid #00C000; background-color:#FEFFE3; top:550px; left:140px; width:530px;']]);
	var table = createTag('TABLE', null, [['class','tb3tb']]);
	
	// Riga 1
	var tr1 = createTag('TR');
	var td1 = createTag('TD', null, [['colspan','10']]);
	td1.appendChild(createTag('H3', 'Aggiungi Farm'));
	tr1.appendChild(td1);
	table.appendChild(tr1);
	
	// Riga 2
	var tr2 = createTag('TR');
	for (var i=0; i < 9; i++)
	{
		var td2 = createTag('TD');
		var img = createTag('IMG', null, [['src',image['SPACE']], ['align','left'], ['class',troopInfo[tribeType-1][i][0]], ['alt',troopInfo[tribeType-1][i][1]]]);
		td2.appendChild(img);
		var input = createTag('INPUT', null, [['id','sendTroops' + i], ['type','text'], ['value',0], ['style','width:25px;']]);
		input.addEventListener('change', calcolateAttackDefenceMaxLootValues, false);
		input.addEventListener('keyup', calcolateAttackDefenceMaxLootValues, false);
		td2.appendChild(input);
		tr2.appendChild(td2);
	}
	table.appendChild(tr2);
	
	// Riga 3
	var tr3 = createTag('TR');
	
	var td3 = createTag('TD');
	td3.appendChild(createTag('IMG', null, [['src',image['ATTACK']]]));
	tr3.appendChild(td3);
	
	var td3 = createTag('TD', null, [['colspan',2]]);
	td3.appendChild(createTag('DIV', 0, [['id','attackValue']]));
	tr3.appendChild(td3);
	
	var td3 = createTag('TD', null, [['colspan',2]]);
	var input = createTag('INPUT', null, [['type','radio'], ['name','typeAttack'], ['value',0]]);
	td3.appendChild(input);
	td3.appendChild(createTag('SPAN', 'Rinforzo'));
	tr3.appendChild(td3);
	
	var td3 = createTag('TD', null, [['colspan',2]]);
	var input = createTag('INPUT', null, [['type','radio'], ['name','typeAttack'], ['value',1]]);
	td3.appendChild(input);
	td3.appendChild(createTag('SPAN', 'Attacco'));
	tr3.appendChild(td3);
	
	var td3 = createTag('TD', null, [['colspan',2]]);
	var input = createTag('INPUT', null, [['type','radio'], ['name','typeAttack'], ['value',2], ['checked','checked']]);
	td3.appendChild(input);
	td3.appendChild(createTag('SPAN', 'Raid'));
	tr3.appendChild(td3);
	
	table.appendChild(tr3);
	
	// Riga 4
	var tr4 = createTag('TR');
	
	var td4 = createTag('TD');
	td4.appendChild(createTag('IMG', null, [['src',image['DEFENCE1']]]));
	tr4.appendChild(td4);
	
	var td4 = createTag('TD', null, [['colspan',2]]);
	td4.appendChild(createTag('DIV', 0, [['id','defence1Value']]));
	tr4.appendChild(td4);
	
	var td4 = createTag('TD', null, [['colspan',6]]);
	td4.appendChild(createTag('INPUT', null, [['type','checkbox'], ['name','activeFarm'], ['value',1], ['checked','checked']]));
	td4.appendChild(createTag('SPAN', 'Farm Attiva'));
	tr4.appendChild(td4);
	
	table.appendChild(tr4);
	
	// Riga 5
	var tr5 = createTag('TR');
	
	var td5 = createTag('TD');
	td5.appendChild(createTag('IMG', null, [['src',image['DEFENCE2']]]));
	tr5.appendChild(td5);
	
	var td5 = createTag('TD', null, [['colspan',2]]);
	td5.appendChild(createTag('DIV', 0, [['id','defence2Value']]));
	tr5.appendChild(td5);
	
	var td5 = createTag('TD', null, [['colspan',6], ['rowspan',2]]);
	td5.appendChild(createTag('INPUT', null, [['type','button'], ['value','Salva']]));
	td5.appendChild(createTag('INPUT', null, [['type','button'], ['value','Annulla'], ['onclick','javascript:document.getElementById("tAddFarm").style.display="none";']]));
	tr5.appendChild(td5);
	
	table.appendChild(tr5);
	
	// Riga 6
	var tr6 = createTag('TR');
	
	var td6 = createTag('TD');
	td6.appendChild(createTag('IMG', null, [['src',image['MAXLOOT']]]));
	tr6.appendChild(td6);
	
	var td6 = createTag('TD', null, [['colspan',2]]);
	td6.appendChild(createTag('DIV', 0, [['id','maxlootValue']]));
	tr6.appendChild(td6);
	
	table.appendChild(tr6);
	
	// Chiusura Tabella/Div
	div.appendChild(table);
	document.body.appendChild(div);
	
	var addOption = createTag('A', '&raquo; Aggiungi Farm', [['href','#']]);
	addOption.addEventListener('click',
		function()
		{
			document.getElementById('tAddFarm').style.display = 'block';
		}, false);
	
	var row = createTag('TR');
	var cell = createTag('TD');
	cell.appendChild(addOption);
	row.appendChild(cell);
	tbody.appendChild(row);
}

Main();