// ==UserScript==
// @name           Ryöstö Laskuri
// @namespace      Ryöstö Laskuri
// @description    Tallentaa raporteista ryöstettyjen resujen määrät muistiin.
// @include        http://s*.fi.ikariam.com/index.php?view=militaryAdvisorReportView&combatId=*
// @include        http://s*.fi.ikariam.com/index.php?view=options*
// @include		   http://s*.fi.ikariam.com/index.php?view=militaryAdvisorCombatReports*
// ==/UserScript==

var url = location.href;
var parse = url.split('=');
var view = parse[1];
var parse2 = url.split('.');
var server = parse2[0].replace("http://","");
var country = parse2[1];
var value_name = server+"_"+country+"_name";
var value = server+"_"+country+"_";

if (view == "options&goback")
	{
	var nameValueArray = document.getElementsByName("name");
	var nameValue = nameValueArray[0].value;
	GM_setValue(value_name,nameValue);
	history.back();
	}
	
if (view == "militaryAdvisorCombatReports" || view == "militaryAdvisorCombatReports&start")
	{
	var plrName = GM_getValue(value_name);
	if (plrName == undefined)
		{
		alert("Scripti ohjaa selaimesi automaattisesti valintoihin, ja ottaa talteen pelaajan nimen, jotta scripti osaa jatkossa valita raportista vain sinun resurssisi.");
		location.href = url.split(".")[0] + ".fi.ikariam.com/index.php?view=options&goback";
		}
		
	var mainview = document.getElementById("mainview").innerHTML;
	var repor = GM_getValue(value+"reports");
	if (repor != undefined)
	{
	var reportsArray = repor.split(",");
	var lengthi = reportsArray.length;
	for (i = 0; i < lengthi; i++)
		{
		var id = reportsArray[i];
		var valuex = GM_getValue(value+id)
		if (valuex != false && valuex != undefined)
		{
		value_puu = parseInt(valuex.split("p")[1]);
		value_krisu = parseInt(valuex.split("k")[1]);
		value_marmori = parseInt(valuex.split("m")[1]);
		value_viini = parseInt(valuex.split("v")[1]);
		value_rikki = parseInt(valuex.split("r")[1]);
		value_total = value_rikki + value_viini + value_marmori + value_puu + value_krisu;
		var mainview = mainview.replace('<a href="/index.php?view=militaryAdvisorReportView&amp;combatId='+id+'"','<b title="Rakennusmateriaali: '+value_puu+' | Viini: '+value_viini+' | Marmori: '+value_marmori+' | Rikki: '+value_rikki+' | Kristalli: '+value_krisu+' | Yhteensä: '+value_total+'">@</b> <a href="/index.php?view=militaryAdvisorReportView&amp;combatId='+id+'"');
		}
		}
	
	document.getElementById("mainview").innerHTML=mainview;
	
	var element = document.getElementById("viewMilitaryImperium");
	var loot = getTotalResources();
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="total-loot">';
	innerHTML += '<h3 class="header">Ryöstö Laskuri</h3>';
	innerHTML += '<div class="content">';
	innerHTML += '<br><center>Resurssit:<br>'+loot+'<br><br><a id="reset">Resetoi laskuri</a></center><br></div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	
	document.getElementById("reset").addEventListener('click',
		function() 
			{
			var repor = GM_getValue(value+"reports");
			var reportsArray = repor.split(",");
			var lengthi = reportsArray.length;
			for (i = 0; i < lengthi; i++)
				{
				var id = reportsArray[i];
				GM_deleteValue(value+id,"")
				}
			GM_deleteValue(value+"reports");
			location.href=location.href;
			}, true);
	}
	else
	{
	var element = document.getElementById("viewMilitaryImperium");
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="total-loot">';
	innerHTML += '<h3 class="header">Ryöstö Laskuri</h3>';
	innerHTML += '<div class="content">';
	innerHTML += '<br><center>Ryöstö Laskurin muistissa ei ole yhtäkään resurssia.</center><br></div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	}
	}

if (view == "militaryAdvisorReportView&combatId")
	{
	
	var reportId = parse[parse.length - 1];

	
	var plrName = GM_getValue(value_name);
	if (plrName == undefined)
		{
		alert("Scripti ohjaa selaimesi automaattisesti valintoihin, ja ottaa talteen pelaajan nimen, jotta scripti osaa jatkossa valita raportista vain sinun resurssisi.");
		location.href = url.split(".")[0] + ".fi.ikariam.com/index.php?view=options&goback";
		}

	var reportSource = document.getElementById("troopsReport").innerHTML;
	var pillage = reportSource.split('on ryöstetty '+plrName+' toimesta. Seuraavat resurssit on varastettu: <ul class="resources">')[1].split('</ul>')[0];
	
	var totalPillage = 0;
	
	if (pillage.match("Viini") != null)
	{
	var viini_pillage = parseInt(pillage.split("Viini: </span>")[1].split("</li>")[0]);
	var totalPillage = totalPillage + viini_pillage;
	}
	else
	{
	var viini_pillage = 0;
	}
	if (pillage.match("Marmori") != null)
	{
	var marmori_pillage = parseInt(pillage.split("Marmori: </span>")[1].split("</li>")[0]);
	var totalPillage = totalPillage + marmori_pillage;
	}
	else
	{
	var marmori_pillage = 0;
	}
	if (pillage.match("Rikki") != null)
	{
	var rikki_pillage = parseInt(pillage.split("Rikki: </span>")[1].split("</li>")[0]);
	var totalPillage = totalPillage + rikki_pillage;
	}
	else
	{
	var rikki_pillage = 0;
	}
	if (pillage.match("Rakennusmateriaali") != null)
	{
	var puu_pillage = parseInt(pillage.split("Rakennusmateriaali: </span>")[1].split("</li>")[0]);
	var totalPillage = totalPillage + puu_pillage;
	}
	else
	{
	var puu_pillage = 0;
	}
	if (pillage.match("Kristallilasi") != null)
	{
	var krisu_pillage = parseInt(pillage.split("Kristallilasi: </span>")[1].split("</li>")[0]);
	var totalPillage = totalPillage + krisu_pillage;
	}
	else
	{
	var krisu_pillage = 0;
	}
	
	var saveLoot = "p"+puu_pillage+"pk"+krisu_pillage+"kr"+rikki_pillage+"rm"+marmori_pillage+"mv"+viini_pillage+"v";
	
	var element = document.getElementById("backTo");
	var reportLoot = GM_getValue(value+reportId)
	
	if (reportLoot != undefined)
	{
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="total-loot">';
	innerHTML += '<h3 class="header">Ryöstö Laskuri</h3>';
	innerHTML += '<div class="content">';
	if (reportLoot != false)
	{
	innerHTML += '<br><center><a href="#" id="dele">Raportin saalis on muistissa, poista se muistista painamalla tästä.</a></center><br></div><div class="footer"></div></div>';
	}
	if (reportLoot == false)
	{
	innerHTML += '<br><center><a href="#" id="save">Raportin saalis ei ole muistissa. Tallenna se muistiin, painamalla tästä.</a></center><br></div><div class="footer"></div></div>';
	}
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	
	var reportLoot = GM_getValue(value+reportId)
	if (reportLoot == false)
	{
	document.getElementById("save").addEventListener('click',
		function() 
			{
			GM_setValue(value+reportId,saveLoot);
			location.href=location.href;
			}, true);
	
	}
	else
	{
	GM_setValue(value+reportId,saveLoot)
	document.getElementById("dele").addEventListener('click',
		function() 
			{
			GM_setValue(value+reportId,false);
			location.href=location.href;
			}, true);
	}
	}
	
	else
	{
	GM_setValue(value+reportId,saveLoot);
	location.href=location.href;
	}
	
	var reports = GM_getValue(value+"reports");
	
	if (reports == undefined)
		{
		var setvalue = reportId;
		GM_setValue(value+"reports",setvalue);
		}
	
	else
		{
		var reportInArray = reports.match(reportId);
		if (reportInArray == null)
			{
			var setvalue = reports+","+reportId;
			GM_setValue(value+"reports",setvalue);
			}	
		}
		
	}
	
function getTotalResources()
	{
	var value = server+"_"+country+"_";
	var repor = GM_getValue(value+"reports");
	var reportsArray = repor.split(",");
	value_rikki = 0;
	value_viini = 0;
	value_krisu = 0;
	value_marmori = 0;
	value_puu = 0;
	value_total = 0;
	var lengthi = reportsArray.length;
	for (i = 0; i < lengthi; i++)
		{
		var id = reportsArray[i];
		var valuex = GM_getValue(value+id)
		if (valuex != false)
		{
		value_puu = value_puu + parseInt(valuex.split("p")[1]);
		value_krisu = value_krisu + parseInt(valuex.split("k")[1]);
		value_marmori = value_marmori + parseInt(valuex.split("m")[1]);
		value_viini = value_viini + parseInt(valuex.split("v")[1]);
		value_rikki = value_rikki + parseInt(valuex.split("r")[1]);
		value_total = value_rikki + value_viini + value_marmori + value_puu + value_krisu;
		}
		}
	return "<table border='0' style='width:60%; margin-left:10px; padding-top:3px;'><tr><td><img src='http://s1.fi.ikariam.com/skin/resources/icon_wood.gif' title='Rakennusmateriaali'></td><td align='center' style='padding-top:3px;'>"+value_puu+"</td></tr><tr><td><img src='http://s1.fi.ikariam.com/skin/resources/icon_glass.gif' title='Kristallilasi'></td><td align='center' style='padding-top:3px;'>"+value_krisu+"</td></tr><tr><td><img src='http://s1.fi.ikariam.com/skin/resources/icon_marble.gif' title='Marmori'></td><td align='center' style='padding-top:3px;'>"+value_marmori+"</td></tr><tr><td><img src='http://s1.fi.ikariam.com/skin/resources/icon_sulfur.gif' title='Rikki'></td><td align='center' style='padding-top:3px;'>"+value_rikki+"</td></tr><tr><td><img src='http://s1.fi.ikariam.com/skin/resources/icon_wine.gif' title='Viini'></td><td align='center' style='padding-top:3px;'>"+value_viini+"</td></tr></table><br><b>Yhteensä:</b> "+value_total;
	}