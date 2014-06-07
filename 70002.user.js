// ==UserScript==
// @name           TW(NL) Aanvallen Timen
// @version        002.10.02.27
// @author         werner
// @namespace      http://userscripts.org./users/43801
// @description    Aanvallen timen
// @include        http://nl*.tribalwars.nl/game.php*screen=place&try=confirm
// ==/UserScript==
(function(){
	var Berekenen = function(){
		var VertrekTijd = function(){
			if (AankomstTijd<ServerTijd){
				AankomstTijd += (24*3600)
			};
			Tber = AankomstTijd - LoopTijd;
			teli=0;
			if (Tber < 0){
				do {
					Tber += (24 * 3600);
					teli++;
				} while (Tber < 0);
			};
			if (Tber<ServerTijd){
				teli++;
			};
			hours = Math.floor(Tber/3600);
			minutes = Math.floor(Tber/60) % 60;
			seconds = Math.round(Tber % 60);
			texttijd='';
			switch(teli){
				case 0:
					texttijd += '';
					break;
				case 1:
					texttijd += 'Morgen om ';
					break;
				default:
					texttijd += 'binnen '+teli+'dagen om ';
					break;
			};
			if(hours < 10) texttijd += "0";
			texttijd += hours + ":";
			if(minutes < 10) texttijd += "0";
			texttijd += minutes + ":";
			if(seconds < 10) texttijd += "0";
			texttijd += seconds;
			return texttijd;
		};
		var TijdTW = function(){
			Tber = ServerTijd + LoopTijd;
			teli=0;
			if (Tber > (24*3600)){
				do {
					Tber -= (24 * 3600);
					teli++;
				} while (Tber >(24*3600));
			};
			hours = Math.floor(Tber/3600);
			minutes = Math.floor(Tber/60) % 60;
			seconds = Math.round(Tber % 60);
			texttijd='';
			switch(teli){
				case 0:
					texttijd = '';
					break;
				case 1:
					texttijd = 'Morgen om ';
					break;
				default:
					texttijd = 'binnen '+teli+'dagen om ';
					break;
			};
			if(hours < 10) texttijd += "0";
			texttijd += hours + ":";
			if(minutes < 10) texttijd += "0";
			texttijd += minutes + ":";
			if(seconds < 10) texttijd += "0";
			texttijd += seconds;
			return texttijd;
		};
		var RestTijd = function(){
			if (AankomstTijd<ServerTijd){
				AankomstTijd += (24*3600)
			};
			Tber = AankomstTijd - ServerTijd - LoopTijd;
			teli=0;
			if (Tber < 0){
				do {
					Tber += (24 * 3600);
					teli++;
				} while (Tber < 0);
			};
			hours = Math.floor(Tber/3600);
			minutes = Math.floor(Tber/60) % 60;
			seconds = Math.round(Tber % 60);
			texttijd='';
			if (teli > 0) texttijd = teli+'dag:';
			if(hours < 10) texttijd += "0";
			texttijd += hours + ":";
			if(minutes < 10) texttijd += "0";
			texttijd += minutes + ":";
			if(seconds < 10) texttijd += "0";
			texttijd += seconds;
			return texttijd;
		};
		var VeldenInvullen = function(){
			if(Tber==0) {
				trs[ir].getElementsByTagName('td')[1].style.cssText = Tstyle1;
				trs[iv].getElementsByTagName('td')[1].style.cssText = Tstyle2;
				trs[iv].getElementsByTagName('td')[1].replaceChild(document.createTextNode(VertrekTijdE),trs[iv].getElementsByTagName('td')[1].firstChild);
				trs[ir].getElementsByTagName('td')[0].replaceChild(document.createTextNode(serverTime),trs[ir].getElementsByTagName('td')[0].firstChild);
				trs[ir].getElementsByTagName('td')[1].replaceChild(document.createTextNode(RestTijdE),trs[ir].getElementsByTagName('td')[1].firstChild);
				trs[ir].getElementsByTagName('td')[1].style.cssText = Tstyle4;
				AankomstTijd += (24*3600);
			}else if(Tber>0){
				trs[ir].getElementsByTagName('td')[1].style.cssText = Tstyle1;
				trs[iv].getElementsByTagName('td')[1].style.cssText = Tstyle2;
				trs[iv].getElementsByTagName('td')[1].replaceChild(document.createTextNode(VertrekTijdE),trs[iv].getElementsByTagName('td')[1].firstChild);
				trs[ir].getElementsByTagName('td')[0].replaceChild(document.createTextNode(serverTime),trs[ir].getElementsByTagName('td')[0].firstChild);
				trs[ir].getElementsByTagName('td')[1].replaceChild(document.createTextNode(RestTijdE),trs[ir].getElementsByTagName('td')[1].firstChild);
				if (RestTijdE.match(/dag/gi) != null) trs[ir].getElementsByTagName('td')[1].style.cssText = Tstyle4;
			};
			top.document.title = RestTijdE;
		};
		serverTime =  document.getElementById('serverTime').textContent;
		Stijd = serverTime.split(':');
		ServerTijd = (Stijd[0] * 3600) + (Stijd[1] * 60) + (Stijd[2] * 1);
		//Vertrektijd
		VertrekTijdE = VertrekTijd();
		//Aankomsttijd TW
		TijdTWE = TijdTW();
		//Resterende tijd
		RestTijdE = RestTijd();
		VeldenInvullen();
	};
	//Alle variabelen declareren
	var tijdIngave = null;
	var hours= null;
	var minutes = null;
	var seconds = null;
	var tijdIngave = null
	var VertrekTijdE= null;
	var RestTijdE = null;
	var posp = null;
	var table = document.getElementsByClassName('vis')[0];
	var TijdTWE = null;
	var Tber = null;
	var teli = null;
	var Atijd = null;
	var VTijd = null;
	var re = null;
	var pos = null;
	var vb = null;
	var testButton=-1;
	var ti = 2;
	//Server tijd
	var serverTime =  document.getElementById('serverTime').textContent;
	var Stijd = serverTime.split(':');
	var ServerTijd = (Stijd[0] * 3600) + (Stijd[1] * 60) + (Stijd[2] * 1);
	//Looptijd
	var trs = table. getElementsByTagName('tr');
	if(trs[ti].getElementsByTagName('td')[0].textContent=='Duur:') ti=1;
	ti +=1;
	var Duur = trs[ti].getElementsByTagName('td')[1].textContent;
	var Ltijd = Duur.split(':');
	var LoopTijd = (Ltijd[0] * 3600) + (Ltijd[1] * 60) + (Ltijd[2] * 1);
	ti +=1;
	Duur = trs[ti].getElementsByTagName('td')[1].textContent;
	var AtijdTW = Duur.split(':');
	var AankomstTijdTW = (Ltijd[0].match(/d+/) * 3600) + (Ltijd[1] * 60) + (Ltijd[2].match(/d+/) * 1);
	//Aankomst tijd op -1 zetten
	var AankomstTijd = -1;
	//Een aankomsttijd berekenen met 5min extra en een aankomsttijd vragen aan de speler
	VTijd= ServerTijd + LoopTijd + (5 * 60);
	AankomstTijd = VTijd
	if (AankomstTijd==0) AankomstTijd += (24*3600);
	hours = Math.floor(VTijd/3600);
	minutes = Math.floor(VTijd/60) % 60;
	seconds = Math.round(VTijd % 60);
	tijdIngave='';
	if(hours < 10) tijdIngave += "0";
	tijdIngave += hours + ":";
	if(minutes < 10) tijdIngave += "0";
	tijdIngave += minutes + ":";
	if(seconds < 10) tijdIngave += "0";
	tijdIngave += seconds;
	//Als de aankomsttijd gekend is (deze mag niet op -1 staan) het scherm opgebouwen
	if(AankomstTijd != -1){
		//De voorkomende stijlen voor de velden instellen
		var Tstyle1 = 'color:black; background:orange; font-weight:bold;';
		var Tstyle2 = 'color:black; background:orange; font-weight:normal;';
		var Tstyle3 = 'color:black; background:orange; font-weight:bold;';
		var Tstyle4 = 'color:red; background:orange; font-weight:bold;';
		var Tstyle5 = 'color:red; background:orange; font-weight:normal;';
		var av= trs.length;
		ti -=1;
		var tr = trs[ti].cloneNode(true);
		tr.getElementsByTagName('td')[0].replaceChild(document.createTextNode('Aankomsttijd:'),tr.getElementsByTagName('td')[0].firstChild);
		tr.getElementsByTagName('td')[1].replaceChild(document.createTextNode(tijdIngave),tr.getElementsByTagName('td')[1].firstChild);
		//de stijlen aanpassen
		tr.getElementsByTagName('td')[0].style.cssText = Tstyle2;
		tr.getElementsByTagName('td')[1].style.cssText = Tstyle2;
		table.appendChild(tr);
		//De velden voor de vertrektijd invoegen
		var iv= trs.length;
		var tr = trs[ti].cloneNode(true);
		tr.getElementsByTagName('td')[0].replaceChild(document.createTextNode('Vertrektijd:'),tr.getElementsByTagName('td')[0].firstChild);
		tr.getElementsByTagName('td')[1].replaceChild(document.createTextNode(''),tr.getElementsByTagName('td')[1].firstChild);
		//de stijlen aanpassen
		tr.getElementsByTagName('td')[0].style.cssText = Tstyle2;
		tr.getElementsByTagName('td')[1].style.cssText = Tstyle2;
		table.appendChild(tr);
		//De titelvelden voor servertijd en timer invoegen
		var tr = trs[ti].cloneNode(true);
		tr.getElementsByTagName('td')[0].replaceChild(document.createTextNode('Servertijd:'),tr.getElementsByTagName('td')[0].firstChild);
		tr.getElementsByTagName('td')[1].replaceChild(document.createTextNode('Timer:'),tr.getElementsByTagName('td')[1].firstChild);
		//de stijlen aanpassen
		tr.getElementsByTagName('td')[0].style.cssText = Tstyle3;
		tr.getElementsByTagName('td')[1].style.cssText= Tstyle3;
		table.appendChild(tr);
		//De velden voor de servertijd en timer invoegen
		var ir= trs.length;
		tr = trs[ti].cloneNode(true);
		tr.getElementsByTagName('td')[0].replaceChild(document.createTextNode(''),tr.getElementsByTagName('td')[0].firstChild);
		tr.getElementsByTagName('td')[1].replaceChild(document.createTextNode(''),tr.getElementsByTagName('td')[1].firstChild);
		//de stijlen aanpassen
		tr.getElementsByTagName('td')[0].style.cssText= Tstyle1;
		tr.getElementsByTagName('td')[1].style.cssText= Tstyle1;
		table.appendChild(tr);
		//Een button toevoegen om de aankomsttijd eventueel te kunnen wijzigen.
		if (testButton == -1){
                        var s = document.createElement('input');
                        s.type = 'button';
                        s.value = 'Aankomsttijd instellen';
                        s.addEventListener('click', function(){
				tijdIngave = prompt('Geef een gewenste aankomsttijd op', tijdIngave);
				if(tijdIngave.length == 8 && tijdIngave.match(/\d+\:\d\d\:\d\d/gi) != null){
					Atijd = tijdIngave.split(':');
					AankomstTijd =(Atijd[0] * 3600) + (Atijd[1] * 60) + (Atijd[2] * 1);
					if (AankomstTijd==0) AankomstTijd += (24*3600);
					testvb = 1;
					trs[av].getElementsByTagName('td')[1].replaceChild(document.createTextNode(tijdIngave),trs[av].getElementsByTagName('td')[1].firstChild);
					Berekenen();
				};
                        }, true);
			table.appendChild(s);
                        testButton=1
                };
	}
	//Alles wordt een eerste maal bereken en ingevuld
	Berekenen();
	//de timer laten lopen
	function wait(){
		Berekenen();
	};
	wait();
	var intV = setInterval(wait, 1000);
})();