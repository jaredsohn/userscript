// ==UserScript== 
// @name          Antypisiak
// @namespace     none
// @description   Pokazuje rzeczywistość taką, jaka ona jest na prawdę.
// @include       *
// ==/UserScript==

(function()
{
	var bad = [], good = [], modifiers = [];
	
	populate
	({
	
		"Prawo i Sprawiedliwość" : "Potwory i Spółka",
		"Jarosława Kaczyńskiego" : " Jadosłava Haczyńskiego",
		"Jarosław Kaczyński" : "Jadosłav Haczyński",
		"PiS" : "Piss",
		"Jarosławem Kaczyńskim" : "Jadosłavem Haczyńskim",
		"Jarosławowi Kaczyńskiemu" : "Jadosłavowi Haczyńskiemu",
		"Jarosławie Kaczyńskim" : "Jadosłavie Haczyńskim",
		"Prawem i Sprawiedliwością" : "Potworami i Spółką",
		"Prawu i Sprawiedliwości" : "Potworom i Spółce",
		"Prawa i Sprawiedliwości" : "Potworów i Spółki",
		"Prawie i Sprawiedliwości" : "Potworach i Spółce",
		"Jarosław Aleksander Kaczyński" : "Jarosłav Kartofer Haczyński",
		"IV RP" : "IV Rzesza",
		"IV Rzeczpospolita" : "IV Rzesza",
		"IV Rzeczypospolitej" : "IV Rzeszy",
		"IV Rzeczypospolitą" : "IV Rzeszą",
		"Antoni Macierewicz" : "Antoni Maciorewicz",
		"Antoniego Macierewicza" : "Antoniego Maciorewicza",
		"Antonim Macierewiczem" : "Antonim Maciorewicz",
		"Antonim Macierewiczu" : "Antonim Maciorewiczu",
		"Antoniemu Macierewiczowi" : "Antoniemu Maciorewicz",
		"Mariusz Błaszczak" : "Mariusz Płaszczak",
		"Mariusza Błaszczaka" : "Mariusza Płaszczaka",
		"Mariuszowi Błaszczakowi" : "Mariuszowi Płaszczakowi",
		"Mariuszem Błaszczakiem" : "Mariuszem Płaszczakiem",
		"Mariuszu Błaszczaku" : "Mariuszu Płaszczaku",
		"Danuty Błaszczaków" : "Danuty Płaszczaków",
		"Joachim Brudziński" : "Joachim Bredziński",
		"Joachimowi Brudzińskiemu" : "Joachimowi Bredzińskiemu",
		"Joachima Brudzińskiego" : "Joachima Bredzińskiego",
		"Joachimem Brudzińskim" : "Joachimem Bredzińskim",
		"Joachimie Brudzińskim" : "Joachimie Bredzińskim",
		"Joachim Stanisław Brudziński" : "Joachim Stanisław Bredziński",
		"Władysława i Ludwiki Brudzińskich" : "Władysława i Ludwiki Bredzińskich",
		"Jarosław, Polskę zbaw" : "Jarosław, Polskę zostaw",
		"Jarosław Polskę zbaw" : "Jarosław Polskę zostaw",
		"Kaczyński" : "Haczyński",
		"Kaczyńskiego" : "Haczyńskiego",
		"Kaczyńskiemu" : "Haczyńskiemu",
		"Kaczyńskim" : "Haczyńskim",
		"Błaszczak" : "Płaszczak",
		"Brudziński" : "Bredziński",
		"Macierewicz" : "Maciorewicz",
		"Macierewicza" : "Maciorewicza",
		
		
		
	}, "g");
	
	populate
	({
		
		
	}, "gi");
	
	
	
	function populate(replacements, flags)
	{
		var word, modPos, mod;
		
		for(var key in replacements)
		{
			if((modPos = key.indexOf("/")) > -1)
			{
				mod = key.substring(modPos + 1);
				word = key.substring(0, modPos);
			}
			else
			{
				mod = "";
				word = key;
			}
			
			modifiers.push(mod);
			bad.push(new RegExp(word, flags));
			good.push(replacements[key]);
		}
	}
	
	
	function sanitize(s, noContext, notredirect)
	{
		for (var j = 0; j < bad.length; j++)
		{
			if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") != -1)
			{
				continue;
			}
			s = s.replace(bad[j], good[j]);
		}
		return s;
	}
	
	
	if(document.title)
		document.title = sanitize(document.title, false , true);
	
	
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		node.data = sanitize(node.data, false, true);
	}
})();
