// ==UserScript==
// @name           FWN Auftragsmarkierung
// @description    Farbmarkierung der Auftraege (Eigene & Verband)
// @include        http://www.feuerwache.net/feuerwehr-einsaetze
// @version        2011-10-26
// @author         SirAlex21
// ==/UserScript==

var MeinAuftrag;
var Auftrag = document.getElementsByTagName("li");
 for each (AT in Auftrag) if(typeof AT == 'object') if (AT.innerHTML.match("Einsatzart")) MeinAuftrag = AT.innerHTML.split("Einsatzart: \"")[1].split("\"")[0]

var TD=document.getElementsByTagName("td");
for (var i=0;TD.length > i; i++)
	{var A=TD[i].getElementsByTagName("a");
		for (var j=0;A.length > j; j++)
		{	// Auftragseinsätze des Verbandes Blau Markieren
			
			var VAuftrag;
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brennt Tanklager")) VAuftrag = true
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Baum auf Auto")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Auffahrunfall")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brand im Baumarkt")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brand in Briefkasten")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brand in Metzgerei")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brand in Gemeindehaus")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brand in Lackfabrik")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Gewerbebrand")) VAuftrag = true   
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Brennender LKW")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Feldbrand")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Feuer im Krankenhaus")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Chemieunfall")) VAuftrag = true 
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Gefahrstoff-Austritt in Firma")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("chlorgas")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Garagenbrand")) VAuftrag = true  
                        if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Feuer im Laubhaufen")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Gewerbebrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Kinobrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Kleintier in Not")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Chlorgas Alarm")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Sperrmüllbrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Strohballenbrand")) VAuftrag = true 
	                if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Person im Fluss")) VAuftrag = true 
                        if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Kleintier in Not")) VAuftrag = true  
                        if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Sperrmüllbrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Traktorbrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Trocknerbrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Waldbrand")) VAuftrag = true  
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Wohnungsbrand")) VAuftrag = true   
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match("Wohnwagenbrand")) VAuftrag = true  
			
			
			if (VAuftrag)
				{ 	
					A[j].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].style.color = "blue";
					A[j].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].style.fontWeight = "bold"		
					A[j].style.color = "blue";
					A[j].style.fontWeight = "bold";
					VAuftrag = false
				}
			
			// Meine Auftragseinsätze Grün Markieren
				
			if ( A[j].parentNode.parentNode.getElementsByTagName("td")[1].innerHTML.match(MeinAuftrag))
				{ 	
					A[j].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].style.color = "lime";
					A[j].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].style.fontWeight = "bold"		
					A[j].style.color = "lime";
					A[j].style.fontWeight = "bold";
					
				}
			
		}
	}
	