/* HotArt. 

HotNews.ro afiseaza articolele in prima faza intr-un mod sumar, fiecare articol avand un link "mai mult" care la apasare va afisa articolul in pagina curenta sau intr-un tab/fereastra noua.
Idea este ca oricum ai deschide articolul este necesara o navigare intre ferestre/taburi/istoria paginilor incarcate pentru a reveni la sumarul articolelor.
Scriptul HotArt. adauga langa fiecare link "mai mult" inca un link "[ afiseaza aici]".
La apasarea acestui link continutul articoului va fi incarcat in pagina curenta fara ca sumarul celorlalte articole sa fie sterse
Continutul articolului va putea fi ascus prin intermediu link-ui [x] care va disponibil in dreapta fiecarui articol incarcat, acesta repozitionandu-se in functie de coordonatele mouse-ului.

 version 0.2 -  23-04-2008 - update pentru versiunea 2 a Hotnews.ro
 
HotArt. 
Copyright (C) 2007 Ovidiu Cotarlea, www.cotarlea.ro

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

 http://www.gnu.org/copyleft/gpl.html
*/

// ==UserScript==
// @name          HotArt. 
// @namespace     http://www.cotarlea.ro/grease_monkey_scripts
// @description    Scriptul HotArt. adauga langa fiecare link "mai mult" din HotNews.ro inca un link denumit [ afiseaza aici].
//			La apasarea acestui link continutul articoului va fi incarcat in pagina curenta fara ca sumarul celorlalte articole sa fie sterse
//			Continutul articolului va putea fi ascus prin intermediu unui link [x] care va disponibil in dreapta fiecarui articol incarcat
// @include      http://*.hotnews.ro/*
// @exclude       
// ==/UserScript==


(function() {
	var AFISEAZA = '&nbsp;&nbsp;<B>[ <U>afiseaza aici</U> ]</B>';
	var ASCUNDE = '&nbsp;&nbsp;<B>[ <U>ascunde articol</U> ]<B>';
	var ASCUNDE_FLOATING = '[x]';
	var SPAN_INCHIDE = 'spanInchide';
	
	// cauta folosind XPath toate linkurile de tipul  "citeste to articolul"
	var links = document.evaluate( "//div[@class='citeste_tot_articolul']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < links.snapshotLength; i++) {
		thisLink = links.snapshotItem(i);
		creazaNewLink( thisLink );
	}

	// creaza "linkul"(spanul) [ afiseaza aici]
	function creazaNewLink( nod ){
		var span = document.createElement('SPAN');
		span.innerHTML =  AFISEAZA;
		span.style.fontSize = '10px';
		span.addEventListener('click', afiseazaArticol, true);
		span.style.cursor = 'pointer';
		href = nod.getAttribute('href');		
		span.setAttribute('id', href);
		nodParinte = nod.parentNode;
		nodParinte.parentNode.insertBefore(span , nodParinte );
	}
	
	// creaza/afiseaza/ascunde  div-ul in care vafi afisat articolul 
	function afiseazaArticol(){
		var idDiv = 'div'+this.getAttribute('id');		
		var divArticol = document.getElementById( idDiv );
		
		if ( divArticol ) {
			if (divArticol.style.display == 'block') {
				this.innerHTML = AFISEAZA;
				divArticol.style.display = 'none';
			} else {
				this.innerHTML = ASCUNDE;
				divArticol.style.display = 'block';
			}		
			actPozitiiSpanInchidere();			
		} else {
			// creaza div
			this.innerHTML = ASCUNDE;
			divArticol = document.createElement("div");
			divArticol.setAttribute('id', idDiv);
			divArticol.style.display = 'block';
			divArticol.style.backgroundColor = "#EFEFEF";
			divArticol.style.border = "1px solid #C5C5C5";
			divArticol.style.padding = "0px";
			divArticol.style.margin = "0px";
			divArticol.style.width = "466px";
			
			var parNod = this;
			for (var i = 0; i < 4; i++) {
				parNod = parNod.parentNode
			}
			
			var nodUrmator = parNod.nextSibling;
			nodUrmator.parentNode.insertBefore(divArticol , nodUrmator );
			
			divArticol.addEventListener('mouseover', pozitioneazaSpanInchide, true);
			divArticol.innerHTML = "... se incarca ...";
			var urlArticol = this.getAttribute('id');

			// incarca articol
			GM_xmlhttpRequest({
				method: 'GET',
				url: urlArticol,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					getContinutArticol( responseDetails, divArticol );
				}
			});
		}
	}
	
	// extrage din toata pagina incarcata numai continutul articolului
	function getContinutArticol( responseDetails, divArticol ){
		// identificatori pt. inceputul si sfarsitul articolului
		var startKey = '<div id="articleContent" style="font-size:12px;">';
		var endKey = '<div class="clear">';
		var sursaArticol;
		
		var pagina = responseDetails.responseText;
		
		// din intreaga pagina scoate numai continutul articolului
		var startIndex = pagina.indexOf( startKey );
		
		if ( startIndex > -1 ) {
			var tempArticol = pagina.substr(startIndex);			
			var endIndex = tempArticol.indexOf(endKey);
			if ( endIndex > -1 ) {
				var sursaArticol = tempArticol.substring(startKey.length,endIndex);	
				// sterg inceputul tagului img
				//var sursaArticol = sursaArticolTemp.substring(0,sursaArticolTemp.lastIndexOf('<'));		
				
			} else {
				var sursaArticol = 'Eroare. Nu am gasit sfarsitul aritolului.';
			}			
		} else {
			sursaArticol = 'Eroare. Nu am gasit inceputul articolului.';
		}
		
		divArticol.innerHTML = sursaArticol;
				
		var spanInchideMobil = creazaSpanInchidere( divArticol );
		divArticol.appendChild( spanInchideMobil );
		actPozitiiSpanInchidere();
	}
	
	//creaza 'linkul' (span-ul) mobil de inchidere
	function creazaSpanInchidere( divArticol ){
		var spanInchideMobil = document.createElement('SPAN');

		spanInchideMobil.innerHTML = ASCUNDE_FLOATING;
		spanInchideMobil.setAttribute('id', SPAN_INCHIDE+divArticol.id);			
		spanInchideMobil.addEventListener('click', onClickSpanInchidere, true);
		
		spanInchideMobil.style.cursor = 'pointer';
		spanInchideMobil.style.position = 'absolute';
		spanInchideMobil.style.fontWeight = 'bold';
		spanInchideMobil.style.fontSize = '11px';
		var divLeft = findPos(divArticol)[0];
		spanInchideMobil.style.left = (divLeft + divArticol.offsetWidth + 2) + 'px';
		
		return spanInchideMobil;
	}
	
	
	//raspunde la evenimentul onclick al 'linkului' (span-ului) mobil de inchidere
	function onClickSpanInchidere( event ){
		var idDiv = this.id.substr( SPAN_INCHIDE.length );
		var divArticol = document.getElementById( idDiv );
		var pozInceputArticol = findPos(divArticol.previousSibling );
		window.scrollTo(0, pozInceputArticol[1]);
		divArticol.style.display = 'none';
		// actualizeaza 'linkul' de afiseaza/inchide de la inceputul articolului
		var spanInchide = document.getElementById(idDiv.substr(3));
		spanInchide.innerHTML = AFISEAZA;
	}

	//pozitioneaza 'linkul' (span-ul) mobil de inchidere
	// functia este chemata la evenimentul o mouse over a div-ului ce contine articolul
	function pozitioneazaSpanInchide( e ){
		var spanInchide = document.getElementById(SPAN_INCHIDE+this.id);
		spanInchide.style.top =  e.pageY + 'px' ;
	}
	

	// datorita pozitionarii cu coordonate absolute, pozitia spanurilor [x]  
	// trebuie actualizata la fiecare deschidere de articol 
	function actPozitiiSpanInchidere(){
		// cauta folosind XPath toate linkurile de tip "mai mult"
	
		var spans = document.evaluate( "//SPAN[. ='"+ASCUNDE_FLOATING+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < spans.snapshotLength; i++) {
			currentSpan = spans.snapshotItem(i);
			currentDiv = document.getElementById( currentSpan.id.substr( SPAN_INCHIDE.length ));
			var currentDivTop = findPos(currentDiv)[1];
			currentSpan.style.top =  currentDivTop + 'px' ;
		}
	}
	
	// afla pozitia absoluta a unui element
	//  functia findPos -> autor: Peter-Paul Koch ->  http://www.quirksmode.org/js/findpos.html
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
	}	
})();
 