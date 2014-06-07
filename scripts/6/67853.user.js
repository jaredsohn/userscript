// Filtre Free pour BinnewZ ( binnews.in )
// version 1.1
// 2010-02-02
//
// --------------------------------------------------------------------
//
// Ce script filtre tous les posts inaccessibles depuis Free sur
// BinnewZ (binnews.in) pour vous offrir une liste propre sans entrées
// superflues.
// Si un post est dispo à la fois sur un newsgroup banni sur Free et sur
// un groupe accessible, le post est affiché et le groupe inaccessible
// masqué.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name			Filtre Free pour BinnewZ ( binnews.in )
// @author			MortalKastor
// @include			http://www.binnews.in/_bin/liste.php*
// @include			http://www.binnews.info/_bin/liste.php*
// @run-at			document-start
// ==/UserScript==

var tabliste = document.getElementById("tabliste");
var line = 0;
var suppr = 0;

for (i in tabliste.tBodies[0].rows)
	if (typeof(tabliste.tBodies[0].rows[i].cells[5]) != 'undefined' && tabliste.tBodies[0].rows[i].cells[5].tagName == "TD")
	{
		var notfree = 0;
		for (j in tabliste.tBodies[0].rows[i].cells[5].getElementsByTagName('a'))
			if (tabliste.tBodies[0].rows[i].cells[5].getElementsByTagName('a')[j].innerHTML.match(/notfree\.gif/))
			{
				tabliste.tBodies[0].rows[i].cells[5].getElementsByTagName('a')[j].style.display = "none";
				tabliste.tBodies[0].rows[i].cells[5].getElementsByTagName('a')[j - 1].style.display = "none";
				notfree++;
			}
		if ((notfree * 2) == tabliste.tBodies[0].rows[i].cells[5].getElementsByTagName('a').length)
		{
			tabliste.tBodies[0].rows[i].style.display = "none";
			suppr++;
		}
		else
			if (line++ % 2)
				tabliste.tBodies[0].rows[i].className = tabliste.tBodies[0].rows[i].className.replace("ligneclaire", "lignefoncee");
			else
				tabliste.tBodies[0].rows[i].className = tabliste.tBodies[0].rows[i].className.replace("lignefoncee", "ligneclaire");
	}

if (suppr > 1)
	document.getElementById("refer").innerHTML = "<b>Filtre Free activé : "+ suppr +" posts supprimés sur "+ (line + suppr) +".</b>";
else
	document.getElementById("refer").innerHTML = "<b>Filtre Free activé : "+ suppr +" post supprimé sur "+ (line + suppr) +".</b>";
