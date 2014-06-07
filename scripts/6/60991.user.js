// ==UserScript==
// @name          tribalwars-plaplreport- www.plapl.com
// @namespace      tribalwars
// @author	   Marc H. (Salandora)
// @description    السكربات خاص في عرض التقرير عند تقريب الموس الى التقرير
// @include        http://ae*.tribalwars.ae*

// @exclude	   http://forum.tribalwars.ae*
// ==/UserScript==

var mouseX = 0;
var mouseY = 0;

var welt = location.href.split('.')[0].replace("http://", "");

var erfassteberichte = GM_getValue("ErfassteBerichte", "");
var erfassteunterstuetzungsberichte = GM_getValue("ErfassteUnterstützungsBerichte", "");

if (location.href.match(/screen=settings&mode=settings/))
{
	var main = document.getElementsByClassName("main");
	var table = main[main.length-1].getElementsByClassName("vis")[1];

	var zeilen = new Array();
	var spalten = new Array();

	var izeile = 0;
	var ispalte = 0;

	spalten[ispalte] = document.createElement("th");
	spalten[ispalte].setAttribute("colspan", "2");
	spalten[ispalte].innerHTML = "حرب قبائل - plaplreport- www.plapl.com-عربي اصيل";
	
	zeilen[izeile] = document.createElement("tr");
	zeilen[izeile].appendChild(spalten[ispalte++]);
	table.appendChild(zeilen[izeile++]);
	
	spalten[ispalte] = document.createElement("td");
	var link = document.createElement("a");
	link.href ="#";
	link.innerHTML = "الخيارت";
	link.addEventListener("click", Konfigurieren, false);
	spalten[ispalte].appendChild(link);

	var berichtelink = document.createElement("a");
	berichtelink.href ="#";
	berichtelink.innerHTML = "<br>plaplreportبداية جديدة لي";
	berichtelink.addEventListener("click", ResetteBerichte, false);
	spalten[ispalte].appendChild(berichtelink);
	
	zeilen[izeile] = document.createElement("tr");
	zeilen[izeile].appendChild(spalten[ispalte++]);

	spalten[ispalte] = document.createElement("td");
	var zeigeGlueck = GM_getValue("ZeigeGlück_" + welt);
	
	var zeigeAngreiferEinheiten = GM_getValue("ZeigeAngreiferEinheiten_" + welt);
	var zeigeAngreiferEinheitenVerluste = GM_getValue("ZeigeAngreiferEinheitenVerluste_" + welt);
	var zeigeVerteidigerEinheiten = GM_getValue("ZeigeVerteidigerEinheiten_" + welt);
	var zeigeVerteidigerEinheitenVerluste = GM_getValue("ZeigeVerteidigerEinheitenVerluste_" + welt);

	var zeigeEinheitenAusserhalb = GM_getValue("ZeigeEinheitenAusserhalb_" + welt);
	var zeigeErspaehteRohstoffe = GM_getValue("ZeigeErspähteRohstoffe_" + welt);
	var zeigeErspaehteGebaeude = GM_getValue("ZeigeErspähteGebäude_" + welt);

	var zeigeBeute = GM_getValue("ZeigeBeute_" + welt);
	var zeigeZustimmung = GM_getValue("ZeigeZustimmunggesunken_" + welt);

	spalten[ispalte].innerHTML = "<b style='padding-right:222px;'>اضاهر الحض:</b>" + zeigeGlueck + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:133px;'>اضهار وحدات المهاجم:</b>" + zeigeAngreiferEinheiten + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:14px;'>اضهار خسار المهاجم:</b>" + zeigeAngreiferEinheitenVerluste + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:121px;'>اضهار قوات المدافع:</b>" + zeigeVerteidigerEinheiten + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:2px;'>اضهار خسار المدافع:</b>" + zeigeVerteidigerEinheitenVerluste + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:17px;'>عرض القوات خارج المدافع:</b>" + zeigeEinheitenAusserhalb + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:135px;'>اضهار تجسس الموارد:</b>" + zeigeErspaehteRohstoffe + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:140px;'>اضهار المباني:</b>" + zeigeErspaehteGebaeude + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:222px;'>وتظهر الغنائم:</b>" + zeigeBeute + "<br>";
	spalten[ispalte].innerHTML += "<b style='padding-right:105px;'>اضهار ولاء القريه:</b>" + zeigeZustimmung + "<br>";

	zeilen[izeile].appendChild(spalten[ispalte++]);
	table.appendChild(zeilen[izeile++]);
}
if (location.href.match(/game.php/) && GM_getValue("ZeigeGlück_" + welt) == undefined)
{
	if (confirm("يجب اعدد خيارت  plaplreport الان يرجاء الضغط على ok الى استمرار"))
	{
		Konfigurieren();
		if (confirm("مبارك تم اكتمال تهيات plaplreport اطيب التمنيات مني انا (عربي اصيل)و من اعضاء منتديات بلابل :) http://plapl.com/forum.php"))
		{
		}
	}
}
if (location.href.match(/screen=report/))
{
	if (location.href.match(/view=/))
	{
		var berichtsid = location.href.split("view=")[1];
		if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Unterstützter Spieler:") != -1)
			ErfasseUnterstuetzungsBericht(berichtsid);
		else
			ErfasseAngriffsVerteidigungsBericht(berichtsid);
	}
	else
	{
		document.addEventListener("mousemove", handleMove, true);
		Verlinken();
	}
}

function handleMove (ev)
{
	if (!ev)
		ev = window.event;

	if (ev)
	{
		mouseX = ev.pageX ? ev.pageX : ev.clientX;
		mouseY = ev.pageY ? ev.pageY : ev.clientY;
	}
}

function Konfigurieren()
{
	if (confirm("اضهار الحظ"))
		GM_setValue("ZeigeGlück_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeGlück_" + welt, "غير مفعل");

	if (confirm("اضهار وحدات المهاجم"))
	{
		GM_setValue("ZeigeAngreiferEinheiten_" + welt, "تم التفعيل");	
		if (confirm("اضهار خسار المهاجم؟"))
			GM_setValue("ZeigeAngreiferEinheitenVerluste_" + welt, "تم التفعيل");
		else
			GM_setValue("ZeigeAngreiferEinheitenVerluste_" + welt, "غير مفعل");
	}
	else
		GM_setValue("ZeigeAngreiferEinheiten_" + welt, "غير مفعل");

	if (confirm("اذا كان المدافع يملك وحدات هل تريد اضهرها"))
	{
		GM_setValue("ZeigeVerteidigerEinheiten_" + welt, "تم التفعيل");
		if (confirm("هل تريد اضهار خسار المدافع?"))
			GM_setValue("ZeigeVerteidigerEinheitenVerluste_" + welt, "تم التفعيل");
		else
			GM_setValue("ZeigeVerteidigerEinheitenVerluste_" + welt, "غير مفعل");
	}
	else
		GM_setValue("ZeigeAngreiferEinheiten_" + welt, "غير مفعل");

	if (confirm("اذا كان وحدات خارج القريه هل تريد عرضها"))
		GM_setValue("ZeigeEinheitenAusserhalb_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeEinheitenAusserhalb_" + welt, "غير مفعل");

	if (confirm("هل تريد كم يوجد موارد في القريه"))
		GM_setValue("ZeigeErspähteRohstoffe_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeErspähteRohstoffe_" + welt, "غير مفعل");

	if (confirm("هل تريد عرض المباني"))
		GM_setValue("ZeigeErspähteGebäude_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeErspähteGebäude_" + welt, "غير مفعل");

	if (confirm("هل تريد عرض الغنيمه?"))
		GM_setValue("ZeigeBeute_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeBeute_" + welt, "غير مفعل");

	if (confirm("هل تريد عرض ولاء القريه?"))
		GM_setValue("ZeigeZustimmunggesunken_" + welt, "تم التفعيل");
	else
		GM_setValue("ZeigeZustimmunggesunken_" + welt, "غير مفعل");
}
function ResetteBerichte()
{
	var berichte = erfassteberichte.split(';');
	for (var i = 0; i < berichte.length; i++)
	{
		var berichtsid = berichte[i];

		GM_setValue("Bericht_" + berichtsid + "_Name", "");
		if (GM_getValue("Bericht_" + berichtsid + "_Gewonnen", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Gewonnen", "");
			GM_setValue("Bericht_" + berichtsid + "_Glück", "");
			GM_setValue("Bericht_" + berichtsid + "_Moral", "");
		}

		if (GM_getValue("Bericht_" + berichtsid + "_Angreifer_Name", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Angreifer_Name", "");
			GM_setValue("Bericht_" + berichtsid + "_Angreifer_Dorf", "");
			GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppen", "");
			GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppenanzahl", "");
			GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppenverluste", "");
		}

		if (GM_getValue("Bericht_" + berichtsid + "_Verteidiger_Name", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Name", "");
			GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Dorf", "");
			GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppen", "");
			GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenanzahl", "");
			GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenverluste", "");
		}

		if (GM_getValue("Bericht_" + berichtsid + "_Unterwegs_Truppen", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Unterwegs_Truppen", "");
			GM_setValue("Bericht_" + berichtsid + "_Unterwegs_Truppenanzahl", "");
		}

		if (GM_getValue("Bericht_" + berichtsid + "_Erspäht_Rohstoffe", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Erspäht_Rohstoffe", "");
		}
		if (GM_getValue("Bericht_" + berichtsid + "_Erspäht_Gebäude", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Erspäht_Gebäude", "");
		}

		if (GM_getValue("Bericht_" + berichtsid + "_Beute", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_Beute", "");
		}
		if (GM_getValue("Bericht_" + berichtsid + "_ZustimmungGesunken", "") != "")
		{
			GM_setValue("Bericht_" + berichtsid + "_ZustimmungGesunken", "");
		}
	}
	erfassteberichte = "";
	erfassteunterstuetzungsberichte = "";
	GM_setValue("ErfassteBerichte", erfassteberichte);
	GM_setValue("ErfassteUnterstützungsBerichte", erfassteunterstuetzungsberichte);

	if (confirm("تم تفريغ ذاكرت السكربات"))
	{
	}
}

function Verlinken()
{
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");
	
	var viscount = vis.length - 2;

	var table = vis[viscount];

	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
		var berichtsid = link.href.split("view=")[1];

		if(erfassteberichte.indexOf(berichtsid) != -1)
		{
			AendereLink(link);
			ErstelleBerichtsTabelle(berichtsid);
		}
	}
}

function AendereLink(link)
{
	link.addEventListener("mouseover", function() { ZeigeBericht(link.href.split("view=")[1]); }, false);
	link.addEventListener("mouseout", function() { VersteckeBericht(link.href.split("view=")[1]); }, false);	
}

function ErfasseUnterstuetzungsBericht(berichtsid)
{	
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");
	
	var viscount = 2;

	var table = vis[viscount];
	var zeilen = table.getElementsByTagName("tr");

	var name = document.getElementById("labelText");

	GM_setValue("Bericht_" + berichtsid + "_Name", name.innerHTML);

	var verteidigertabelle = table.getElementsByTagName("table")[0];

	var verteidiger = verteidigertabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	var verteidigerdorf = verteidigertabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	var truppenherkunft = verteidigertabelle.getElementsByTagName("td")[3].innerHTML.replace(/<.+?>/g, '');

	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Name", verteidiger);
	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Dorf", verteidigerdorf);
	GM_setValue("Bericht_" + berichtsid + "_Truppenherkunft", truppenherkunft);

	var einheitentabelle = table.getElementsByTagName("table")[1];

	var einheitentruppen = einheitentabelle.getElementsByTagName("tr")[0];
	var einheitentruppenanzahl = einheitentabelle.getElementsByTagName("tr")[1];
	var einheitentruppenverluste = einheitentabelle.getElementsByTagName("tr")[2];

	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppen", einheitentruppen.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenanzahl", einheitentruppenanzahl.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenverluste", einheitentruppenverluste.innerHTML);
	
	erfassteberichte += ";" + berichtsid;
	erfassteunterstuetzungsberichte += ";" + berichtsid;
	GM_setValue("ErfassteBerichte", erfassteberichte);
	GM_setValue("ErfassteUnterstützungsBerichte", erfassteunterstuetzungsberichte);
}
function ErfasseAngriffsVerteidigungsBericht(berichtsid)
{	
	var main = document.getElementsByClassName("main");
	var vis = main[main.length-1].getElementsByClassName("vis");
	
	var viscount = 2;

	var table = vis[viscount];
	var zeilen = table.getElementsByTagName("tr");

	var name = document.getElementById("labelText");
	var gewonnen = table.getElementsByTagName("h3")[0];
	var glueck = table.getElementsByTagName("b")[0];
	var moral = table.getElementsByTagName("h4")[1];

	GM_setValue("Bericht_" + berichtsid + "_Name", name.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Gewonnen", gewonnen.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Glück", glueck.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Moral", moral.innerHTML);

	var angreifertabelle = table.getElementsByTagName("table")[3];

	var angreifer = angreifertabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	var angreiferdorf = angreifertabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	var angreifertruppentabelle = angreifertabelle.getElementsByTagName("table")[0];
	var angreifertruppen = angreifertruppentabelle.getElementsByTagName("tr")[0];
	var angreifertruppenanzahl = angreifertruppentabelle.getElementsByTagName("tr")[1];
	var angreifertruppenverluste = angreifertruppentabelle.getElementsByTagName("tr")[2];

	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Name", angreifer);
	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Dorf", angreiferdorf);
	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppen", angreifertruppen.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppenanzahl", angreifertruppenanzahl.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Angreifer_Truppenverluste", angreifertruppenverluste.innerHTML);

	var verteidigertabelle = table.getElementsByTagName("table")[5];

	var verteidiger = verteidigertabelle.getElementsByTagName("th")[1].innerHTML.replace(/<.+?>/g, '');
	var verteidigerdorf = verteidigertabelle.getElementsByTagName("td")[1].innerHTML.replace(/<.+?>/g, '');
	var verteidigertruppentabelle = verteidigertabelle.getElementsByTagName("table")[0];
	var verteidigertruppen = verteidigertruppentabelle.getElementsByTagName("tr")[0];
	var verteidigertruppenanzahl = verteidigertruppentabelle.getElementsByTagName("tr")[1];
	var verteidigertruppenverluste = verteidigertruppentabelle.getElementsByTagName("tr")[2];

	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Name", verteidiger);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Dorf", verteidigerdorf);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppen", verteidigertruppen.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenanzahl", verteidigertruppenanzahl.innerHTML);
	GM_setValue("Bericht_" + berichtsid + "_Verteidiger_Truppenverluste", verteidigertruppenverluste.innerHTML);


	var index = 7;
	if (table.innerHTML.match(/Truppen des Verteidigers/))
	{
		var truppentabelle = table.getElementsByTagName("table")[index++];

		var truppen = truppentabelle.getElementsByTagName("tr")[0];
		var truppenanzahl = truppentabelle.getElementsByTagName("tr")[1];

		GM_setValue("Bericht_" + berichtsid + "_Unterwegs_Truppen", truppen.innerHTML);
		GM_setValue("Bericht_" + berichtsid + "_Unterwegs_Truppenanzahl", truppenanzahl.innerHTML);
	}
	if (table.innerHTML.match(/الموارد:/) || table.innerHTML.match(/المباني:/))
	{
		var erspaehttabelle = table.getElementsByTagName("table")[index++];
		if (erspaehttabelle.innerHTML.match(/الموارد:/))
		{
			var erspaehtrohstoffe = erspaehttabelle.getElementsByTagName("tr")[0];
			GM_setValue("Bericht_" + berichtsid + "_Erspäht_Rohstoffe", erspaehtrohstoffe.innerHTML);
		}

		if (erspaehttabelle.innerHTML.match(/المباني:/))
		{
			var erspaehtgebaeude = erspaehttabelle.getElementsByTagName("tr")[1];
			GM_setValue("Bericht_" + berichtsid + "_Erspäht_Gebäude", erspaehtgebaeude.innerHTML);
		}
	}
	if (table.innerHTML.match(/الغنيمة:/) || table.innerHTML.match(/Zustimmung gesunken von/))
	{
		var tabelle = table.getElementsByTagName("table")[index++];
		var i = 0;
		if (tabelle.innerHTML.match(/الغنيمة:/))
		{
			var beute = tabelle.getElementsByTagName("tr")[i++];
			GM_setValue("Bericht_" + berichtsid + "_Beute", beute.innerHTML);
		}
		if (tabelle.innerHTML.match(/Zustimmung gesunken von/))
		{
			var zustimmung = tabelle.getElementsByTagName("tr")[i++];
			GM_setValue("Bericht_" + berichtsid + "_ZustimmungGesunken", zustimmung.innerHTML);
		}
	}
	
	erfassteberichte += ";" + berichtsid;
	GM_setValue("ErfassteBerichte", erfassteberichte);
}

function ErstelleBerichtsTabelle(berichtsid)
{
	var div = document.createElement("div");
	div.setAttribute("id", berichtsid);
	div.setAttribute("style", "position:absolute; top: " + mouseY + "px; left: " + mouseX + "px; visibility:hidden");
	
	var tabelleborder = document.createElement("table");
	tabelleborder.setAttribute("class", "navi-border");
	tabelleborder.setAttribute("style", "border-collapse: collapse;");

	var zeileborder = document.createElement("tr");
	var spalteborder = document.createElement("td");

	var tabelle = document.createElement("table");
	tabelle.setAttribute("class", "nowrap");
	tabelle.setAttribute("style", "border: 1px solid; border-color: #997733 #FFDD99 #FFEECC #BB9955; background-repeat: repeat-x; background-color:#F7EED3");
	
	var zeile = document.createElement("tr");
	var spalte = document.createElement("td");

	document.body.appendChild(div);

	div.appendChild(tabelleborder);
	tabelleborder.appendChild(zeileborder);
	zeileborder.appendChild(spalteborder);
	spalteborder.appendChild(tabelle);
	tabelle.appendChild(zeile);
	zeile.appendChild(spalte);

	if (GM_getValue("Bericht_" + berichtsid + "_Gewonnen", "") != "")
		spalte.innerHTML = "<h4>" + GM_getValue("Bericht_" + berichtsid + "_Gewonnen", "") + "</h4>\n";
		
	if (GM_getValue("ZeigeGlück") == "تم التفعيل" && GM_getValue("Bericht_" + berichtsid + "_Glück", "") != "")
	{
		var glueck = GM_getValue("Bericht_" + berichtsid + "_Glück", "");
		if (glueck.indexOf('-') != -1)
			spalte.innerHTML += "الحظ:<span style=\"color: #FF0000\">" + glueck + "</span>";
		else
			spalte.innerHTML += "الحظ:<span style=\"color: #00AA00\">" + glueck + "</span>";
	}

	zeile = document.createElement("tr");
	spalte = document.createElement("td");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte);

	spalte.appendChild(ErstelleAngreiferTabelle(berichtsid));
	spalte.appendChild(ErstelleVerteidigerTabelle(berichtsid));

	var spionage = ErstelleSpionageTabelle(berichtsid);
	if (spionage != undefined)
		spalte.appendChild(spionage);
}

function ErstelleAngreiferTabelle(berichtsid)
{	
	var gmbase = "Bericht_" + berichtsid + "_Angreifer_";

	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");
	var spalte2 = document.createElement("th");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);
	zeile.appendChild(spalte2);

	spalte1.innerHTML = "<b>" + (erfassteunterstuetzungsberichte.indexOf(berichtsid) != -1 ? "Unterstützter Spieler:" : "المهاجم(plapl.com):") + "</b>";
	spalte2.innerHTML = "<b>" + GM_getValue(gmbase + "Name", "") + "</b>";

	var dorfzeile = document.createElement("tr");
	var dorfspalte1 = document.createElement("td");
	var dorfspalte2 = document.createElement("td");
	
	tabelle.appendChild(dorfzeile);
	dorfzeile.appendChild(dorfspalte1);
	dorfzeile.appendChild(dorfspalte2);

	dorfspalte1.innerHTML = "قريه:"
	dorfspalte2.innerHTML = GM_getValue(gmbase + "Dorf", "");

	if (GM_getValue("Bericht_" + berichtsid + "_Truppenherkunft", "") != "")
	{
		var herkunftszeile = document.createElement("tr");
		var herkunftsspalte1 = document.createElement("td");
		var herkunftsspalte2 = document.createElement("td");
	
		tabelle.appendChild(herkunftszeile);
		herkunftszeile.appendChild(herkunftsspalte1);
		herkunftszeile.appendChild(herkunftsspalte2);

		dorfspalte1.innerHTML = "Truppen herkunft:"
		dorfspalte2.innerHTML = GM_getValue("Bericht_" + berichtsid + "_Truppenherkunft", "");
	}

	var truppenzeile = document.createElement("tr");
	var truppenspalte = document.createElement("td");
	truppenspalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(truppenzeile);
	truppenzeile.appendChild(truppenspalte);
	
	if (GM_getValue("ZeigeAngreiferEinheiten_" + welt) == "تم التفعيل" && GM_getValue(gmbase + "Truppen", "") != "")
	{
		var truppentabelle = document.createElement("table");
		truppenspalte.appendChild(truppentabelle);

		var truppentabellezeile = document.createElement("tr");
		truppentabellezeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = GM_getValue(gmbase + "Truppen", "");


		var truppenanzahlzeile = document.createElement("tr");
		truppenanzahlzeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppenanzahlzeile);
		truppenanzahlzeile.innerHTML = GM_getValue(gmbase + "Truppenanzahl", "");

		if (GM_getValue("ZeigeAngreiferEinheitenVerluste_" + welt) == "تم التفعيل")
		{
			var truppenverlustzeile = document.createElement("tr");
			truppenverlustzeile.setAttribute("class", "center");
			truppentabelle.appendChild(truppenverlustzeile);
			truppenverlustzeile.innerHTML = GM_getValue(gmbase + "Truppenverluste", "");
		}
	}
	return tabelle;
}
function ErstelleVerteidigerTabelle(berichtsid)
{
	var zeigeVerteidigerEinheitenVerluste = GM_getValue("ZeigeVerteidigerEinheitenVerluste_" + welt);

	var gmbase = "Bericht_" + berichtsid + "_Verteidiger_";

	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");
	var spalte2 = document.createElement("th");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);
	zeile.appendChild(spalte2);

	spalte1.innerHTML = "<b>" + (erfassteunterstuetzungsberichte.indexOf(berichtsid) != -1 ? "Einheiten:" : "المدافع(plapl.com):") + "</b>";
	spalte2.innerHTML = "<b>" + GM_getValue(gmbase + "Name", "") + "</b>";

	if ( GM_getValue(gmbase + "Dorf", "") != "")
	{
		var dorfzeile = document.createElement("tr");
		var dorfspalte1 = document.createElement("td");
		var dorfspalte2 = document.createElement("td");
	
		tabelle.appendChild(dorfzeile);
		dorfzeile.appendChild(dorfspalte1);
		dorfzeile.appendChild(dorfspalte2);

		dorfspalte1.innerHTML = "قريه:"
		dorfspalte2.innerHTML = GM_getValue(gmbase + "Dorf", "");
	}

	var truppenzeile = document.createElement("tr");
	var truppenspalte = document.createElement("td");
	truppenspalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(truppenzeile);
	truppenzeile.appendChild(truppenspalte);
	
	if(GM_getValue("ZeigeVerteidigerEinheiten_" + welt) == "تم التفعيل" && GM_getValue(gmbase + "Truppen", "") != "")
	{
		var truppentabelle = document.createElement("table");
		truppenspalte.appendChild(truppentabelle);
	
		var truppentabellezeile = document.createElement("tr");
		truppentabellezeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = GM_getValue(gmbase + "Truppen", "");

		var truppenanzahlzeile = document.createElement("tr");
		truppenanzahlzeile.setAttribute("class", "center");
		truppentabelle.appendChild(truppenanzahlzeile);
		truppenanzahlzeile.innerHTML = GM_getValue(gmbase + "Truppenanzahl", "");

		
		if(GM_getValue("ZeigeVerteidigerEinheitenVerluste_" + welt) == "تم التفعيل")
		{
			var truppenverlustzeile = document.createElement("tr");
			truppenverlustzeile.setAttribute("class", "center");
			truppentabelle.appendChild(truppenverlustzeile);
			truppenverlustzeile.innerHTML = GM_getValue(gmbase + "Truppenverluste", "");
		}
	}
	return tabelle;
}
function ErstelleSpionageTabelle(berichtsid)
{
	var gmbase = "Bericht_" + berichtsid + "_";

	var tabelle = document.createElement("table");
	tabelle.setAttribute("width", "100%");
	tabelle.setAttribute("style", "border: 1px solid #DED3B9");

	var zeile = document.createElement("tr");
	var spalte1 = document.createElement("th");
	spalte1.setAttribute("width", "100");

	tabelle.appendChild(zeile);
	zeile.appendChild(spalte1);

	spalte1.innerHTML = "<b>التجسس:</b>";

	var spionagezeile = document.createElement("tr");
	var spionagespalte = document.createElement("td");
	spionagespalte.setAttribute("colspan", "2");
	
	tabelle.appendChild(spionagezeile);
	spionagezeile.appendChild(spionagespalte);
	
	var spionagetabelle = document.createElement("table");
	spionagespalte.appendChild(spionagetabelle);

	if (GM_getValue("ZeigeEinheitenAusserhalb_" + welt) == "تم التفعيل" && GM_getValue(gmbase + "Unterwegs_Truppen", "") != "")
	{
		var truppenzeile = document.createElement("tr");
		truppenzeile.setAttribute("class", "center");
		spionagetabelle.appendChild(truppenzeile);
		var truppenspalte = document.createElement("td");
		truppenzeile.appendChild(truppenspalte);

		var truppentabelle = document.createElement("table");
		truppenzeile.appendChild(truppentabelle);

		var truppentabellezeile = document.createElement("tr");
		truppentabelle.appendChild(truppentabellezeile);
		truppentabellezeile.innerHTML = GM_getValue(gmbase + "Unterwegs_Truppen", "");

		var truppentabelleanzahlzeile = document.createElement("tr");
		truppentabelle.appendChild(truppentabelleanzahlzeile);
		truppentabelleanzahlzeile.innerHTML = GM_getValue(gmbase + "Unterwegs_Truppenanzahl", "");
	}
	
	if (GM_getValue("ZeigeErspähteRohstoffe_" + welt) == "تم التفعيل" && GM_getValue(gmbase + "Erspäht_Rohstoffe", "") != "")
	{
		var rohstoffzeile = document.createElement("tr");
		rohstoffzeile.setAttribute("class", "center");
		spionagetabelle.appendChild(rohstoffzeile);
		rohstoffzeile.innerHTML = GM_getValue(gmbase + "Erspäht_Rohstoffe", "");
	}

	if (GM_getValue("ZeigeErspähteGebäude_" + welt) == "تم التفعيل"  && GM_getValue(gmbase + "Erspäht_Gebäude", "") != "")
	{
		var gebaeudezeile = document.createElement("tr");
		gebaeudezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(gebaeudezeile);
		gebaeudezeile.innerHTML = GM_getValue(gmbase + "Erspäht_Gebäude", "");
	}
	
	
	if (GM_getValue("ZeigeBeute_" + welt) == "تم التفعيل"  && GM_getValue(gmbase + "Beute", "") != "")
	{
		var beutezeile = document.createElement("tr");
		beutezeile.setAttribute("class", "center");
		spionagetabelle.appendChild(beutezeile);
		beutezeile.innerHTML = GM_getValue(gmbase + "Beute", "");
	}

	if (GM_getValue("ZeigeZustimmunggesunken_" + welt) == "تم التفعيل"  && GM_getValue(gmbase + "ZustimmungGesunken", "") != "")
	{
		var zustimmungszeile = document.createElement("tr");
		zustimmungszeile.setAttribute("class", "center");
		spionagetabelle.appendChild(zustimmungszeile);
		zustimmungszeile.innerHTML = GM_getValue(gmbase + "ZustimmungGesunken", "");
	}
	return tabelle;
}

function ZeigeBericht(berichtsid)
{
	var div = document.getElementById(berichtsid);
	div.setAttribute("style", "position:absolute; top: " + (mouseY + 1) + "px; left: " + (mouseX + 1) + "px; visibility:visible");
}
function VersteckeBericht(berichtsid)
{
	var div = document.getElementById(berichtsid);
	div.setAttribute("style", "position:absolute; top: " + (mouseY + 1) + "px; left: " + (mouseX + 1) + "px; visibility:hidden");
}