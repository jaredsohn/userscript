// ==UserScript==
// @name           DS Grouplinkinproduce
// @version	   1.6 [7.0 ready]
// @namespace      Die Stämme
// @description    Fügt einen Link zum ändern der Gruppe ein.
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @author 	   Lukas R. (LudwigXXXXXV)
// ==/UserScript==
doc=document;
if (doc.URL.match("&screen=train&mode=mass&"))
	{
	var tabelle = doc.getElementById("mass_train_table");
	for (var xx=1; xx<tabelle.getElementsByTagName("tr").length; xx++)
		{
		var id=tabelle.getElementsByTagName("tr")[xx].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
		tabelle.getElementsByTagName("tr")[xx].getElementsByTagName("a")[0].parentNode.innerHTML+="<br> <a href=\"javascript:popup_scroll('groups.php?&amp;mode=village&amp;village_id="+id+"', 300, 550);\"><img src=\"http://de8.die-staemme.de/graphic/arrow_down.png?1\" /></a>";
		if (tabelle.getElementsByTagName("tr")[xx].getElementsByTagName("td")[2].innerHTML=="24000/24000")
			{
			tabelle.getElementsByTagName("tr")[xx].className="row_a";
			}
		else
			{
			tabelle.getElementsByTagName("tr")[xx].className="row_b";
			}
		}
	}
function links(w)
	{
	var table=doc.getElementsByTagName("table")[doc.getElementsByTagName("table").length-s];
	for (var b=1;b<table.getElementsByTagName("tr").length;b++)
		{
		var row=table.getElementsByTagName("tr")[b];
		var id=row.getElementsByTagName("td")[w].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
		row.getElementsByTagName("td")[w].innerHTML+="<a href=\"javascript:popup_scroll('groups.php?&amp;mode=village&amp;village_id="+id+"', 300, 550);\"><img src=\"http://de8.die-staemme.de/graphic/arrow_down.png?1\" /></a>";
		}
	}
if (doc.getElementById("overview")!=undefined)
	{
	var wo=doc.getElementById("overview").value;
	var s=1;
	if (doc.getElementsByTagName("table")[doc.getElementsByTagName("table").length-1].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.match("Dörfer pro"))
		s++;
	if (wo=="incomings")
		{
		links(1);
		links(2);
		}
	if (wo=="buildings")
		links(2);
	if (wo=="commands" || wo=="combined" || wo=="prod" || wo=="tech")
		links(1);
	if (wo=="units")
		{
		var table=doc.getElementsByTagName("table")[doc.getElementsByTagName("table").length-s];
		var links=table.getElementsByTagName("a");
		for (var xy=0;xy<links.length;xy++)
			{
			if (links[xy].href.match("screen=overview"))
				{
				var id=links[xy].href.split("village=")[1].split("&")[0];
				links[xy].parentNode.innerHTML+="<a href=\"javascript:popup_scroll('groups.php?&amp;mode=village&amp;village_id="+id+"', 300, 550);\"><img src=\"http://de8.die-staemme.de/graphic/arrow_down.png?1\" /></a>";
				}
			}
		}
	}