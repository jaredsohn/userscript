// ==UserScript==
// @name           TW(NL) Tijden tot doeldorp berekenen
// @version        001.10.04.15
// @author         werner
// @namespace      http://userscripts.org./users/43801
// @description    looptijden en vertrektijden berekenen en laten zien in het infoscherm
// @include        http://nl*.tribalwars.nl/game.php*screen=info_village*
// ==/UserScript==

(function(){
	var Berekenen = function(){
		var Looptijden = function(wereld){
			var eenh = new Array(13);
			if (wereld == 1){
				eenh[0] = 1000; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 0; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 0; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 2) {
				eenh[0] = 70; //Max velden edel
				eenh[1] = 9; //speer
				eenh[2] = 11; //zwaard
				eenh[3] = 9; //bijl
				eenh[4] = 9; //boog
				eenh[5] = 4.5; //scout
				eenh[6] = 5; // LC
				eenh[7] = 5; // BB
				eenh[8] = 5.5; //ZC
				eenh[9] = 15; //ram
				eenh[10] = 15; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 17.5; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 3) {
				eenh[0] = 100; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 4) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 5) {
				eenh[0] = 42; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 0; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 0; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 0; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 6) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 7) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 8) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 9) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 10) {
				eenh[0] = 42; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 0; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 0; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 11) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 12) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 13) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 14) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 15) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 16) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 0; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 0; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 0; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			} else if (wereld == 17) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
                        } else if (wereld == 18) {
				eenh[0] = 77; //Max velden edel
				eenh[1] = 18; //speer
				eenh[2] = 22; //zwaard
				eenh[3] = 18; //bijl
				eenh[4] = 18; //boog
				eenh[5] = 9; //scout
				eenh[6] = 10; // LC
				eenh[7] = 10; // BB
				eenh[8] = 11; //ZC
				eenh[9] = 30; //ram
				eenh[10] = 30; //kata
				eenh[11] = 10; //ridder
				eenh[12] = 35; //edel
				eenh[13] = 3; //markt
			};
			return eenh;
		};
		var OmzettenTijd = function(t, extratekst, pt){
			var i = 0;
			//Nakijken hoeveel dagen er in de berekende tijd zitten afgerond naar beneden
			if (t >(24*3600)){
				var testtijd = t;
				do {
					testtijd -= (24 * 3600);
					i++;
				} while (testtijd > (24*3600));
			};
			//De berekende tijd verminderen met het aantal dagen
			t -= (i * 24 * 3600);
			var txttijd = '';
			//Een text toevoegen aan de tijdsanduiding volgens het aantal dagen
			if (extratekst == 1){
				switch(i){
					case 0:
						txttijd = 'Vandaag om ';
						break;
					case 1:
						txttijd = 'Morgen om ';
						break;
					case 2:
						txttijd = 'binnen 2d om ';
						break;
					case 3:
						txttijd = 'binnen 3d om ';
						break;
					case 4:
						txttijd = 'binnen 4d om ';
						break;
					case 5:
						txttijd = 'binnen 5d om ';
						break;
					case 6:
						txttijd = 'binnen 6d om ';
						break;
					case 7:
						txttijd = 'binnen 7d om ';
						break;
				};
			};
			if (extratekst == 0 && i>0){
				txttijd = String(i)+'Dag:'
			};
			//De berekende tijd omzetten naar een tijdsaanduiding
			var hours = Math.floor(t/3600);
			var minutes = Math.floor(t/60) % 60;
			if (pt == 0){
				var seconds = Math.round(t % 60);
			} else {
				var seconds = Math.round((t % 60) * pt) / pt;
			}
			if(hours < 10)
				txttijd += "0";
				txttijd += hours + ":";
			if(minutes < 10)
				txttijd += "0";
				txttijd += minutes + ":";
			if(seconds < 10)
				txttijd += "0";
				txttijd += seconds;
			return txttijd;
		};
		var BerekenVertrekTijd = function(vb, Afst, s){
			var tijd = vb.split(':');
			var Aankomsttijd =(tijd[0] * 3600) + (tijd[1] * 60) + (tijd[2] * 1);
			if (Aankomsttijd==0) Aankomsttijd = (24 * 3600);
			var looptijd = (Afst * s * 60);
			var testtijd =looptijd + serverTijd;
			if (testtijd > Aankomsttijd){
				do {
					Aankomsttijd += (24 * 3600);
				} while (testtijd > Aankomsttijd);
			};
			var Nt = Aankomsttijd - looptijd;
			return Nt;
		};
		var Invullenscherm = function(titel, Ltijd, Atijd){
			var ttxt = '';
			var OK = null
			if (Atijd != ' '){
				ttxt =' -> ';
			};
			var trs = table.getElementsByTagName('tr');
                        for (var i=1; i<trs.length ; i++){
                            var trst = trs[i].getElementsByTagName('td');
                            if (trst.length==2){
                                if (trst[0].textContent == titel){
                                        trst[1].replaceChild(document.createTextNode(Ltijd+ttxt+Atijd),trst[1].firstChild);
                                        OK=1;
                                };
                            };
                        };
			if (OK==null){
				var tr = trs[1].cloneNode(true);
				tr.getElementsByTagName('td')[0].replaceChild(document.createTextNode(titel),tr.getElementsByTagName('td')[0].firstChild);
				tr.getElementsByTagName('td')[1].replaceChild(document.createTextNode(Ltijd+ttxt+Atijd),tr.getElementsByTagName('td')[1].firstChild);
				//Als het een titel is de kleur en tekststijl aanpassen
				var Tstyle = 'color:black; background:orange; font-weight:bold;';
				var Tstyle1 = 'color:black; background:orange; font-weight:bold;width: 275px;';
				var Tstyle3 = 'background:inherit;';
				if (titel == 'Eenheid'){
					tr.getElementsByTagName('td')[0].style.cssText = Tstyle;
					tr.getElementsByTagName('td')[1].style.cssText= Tstyle1;
				} else if (titel == 'Markt:' || titel == 'Afstand:'){	
					tr.getElementsByTagName('td')[0].style.cssText = Tstyle3;
					tr.getElementsByTagName('td')[1].style.cssText= Tstyle3;
				};
				table.appendChild(tr);
			};
		};
		var LooptijdEenheid = function(Id, dist, punt){
			if (eenheid[Id] == 0){
				Invullenscherm(NaamEenheid[Id]+':', 'Niet voorzien op deze wereld', ' ');
			} else {
				var tEenheid = dist * eenheid[Id] * 60;
				if (Id==12){
					if (dist > eenheid[0]){
						Invullenscherm(NaamEenheid[Id]+':', 'Maximale edelafstand overschreden', 'max '+eenheid[0]+' velden.');
					} else {
						var SEenheid = OmzettenTijd(tEenheid, 0, punt);
						tEenheid += serverTijd;
						if (tEenheid == (24*3600)) tEenheid=0;
						AEenheid= OmzettenTijd(tEenheid, 1, punt);
						Invullenscherm(NaamEenheid[Id]+':', SEenheid, AEenheid);
					};
				} else {
					var SEenheid = OmzettenTijd(tEenheid, 0, punt);
					tEenheid += serverTijd;
					if (tEenheid == (24*3600)) tEenheid=0;
					AEenheid= OmzettenTijd(tEenheid, 1, punt);
					Invullenscherm(NaamEenheid[Id]+':', SEenheid, AEenheid);
				};
			};
		};
		var VertrektijdEenheid = function(Id, vb, dist, punt){
			if (eenheid[Id] == 0){
				Invullenscherm(NaamEenheid[Id]+':', 'Niet voorzien op deze wereld', ' ');
			} else {
				var tEenheid = BerekenVertrekTijd(vb, dist, eenheid[Id]);
				if (Id==12){
					if (dist > eenheid[0]){
						Invullenscherm(NaamEenheid[Id]+':', 'Maximale edelafstand overschreden', 'max '+eenheid[0]+' velden.');
					} else {
						var SEenheid = OmzettenTijd(tEenheid, 1, punt);
						Invullenscherm(NaamEenheid[Id]+':', SEenheid, ' ');
					};
				} else {
					var SEenheid = OmzettenTijd(tEenheid, 1, punt);
					Invullenscherm(NaamEenheid[Id]+':', SEenheid, ' ');
				};
			};
		};
		//Nakijken op welke wereld er gespeeld wordt
		var wereld = location.href.match(/\d+/i);
		var NaamEenheid = new Array(13);
		NaamEenheid[0] = 'Edelmax';
		NaamEenheid[1] = 'Speer';
		NaamEenheid[2] = 'Zwaard';
		NaamEenheid[3] = 'Bijl';
		NaamEenheid[4] = 'Boog';
		NaamEenheid[5] = 'Scout';
		NaamEenheid[6] = 'LC';
		NaamEenheid[7] = 'BB';
		NaamEenheid[8] = 'ZC';
		NaamEenheid[9] = 'Ram';
		NaamEenheid[10] = 'Kata';
		NaamEenheid[11] = 'Ridder';
		NaamEenheid[12] = 'Edel';
		NaamEenheid[13] = 'Markt';
		var eenheid = Looptijden(wereld);
		var serverTime =  document.getElementById('serverTime').textContent;
		var Stijd = serverTime.split(':');
		var serverTijd = (Stijd[0] * 3600) + (Stijd[1] * 60) + (Stijd[2] * 1);
		//Coördinaten eigen dorp
		var tds = document.getElementById('menu_row2').getElementsByTagName('td');
		if(tds[tds.length-1].getElementsByTagName('b')[0]){
			var EigenDorp = tds[tds.length-1].getElementsByTagName('b')[0].firstChild.nodeValue.split(')').shift().split('(').pop().split('|');
		} else {
			var EigenDorp = tds[tds.length-2].getElementsByTagName('b')[0].firstChild.nodeValue.split(')').shift().split('(').pop().split('|');
			EigenDorp[0] = parseInt(EigenDorp[0]);
			EigenDorp[1] = parseInt(EigenDorp[1]);
		};
		//Coordinaten doel dorp
		var table = document.getElementsByClassName('vis')[0];
		var DoelDorp = table.getElementsByTagName('td')[1].firstChild.nodeValue.split(')').shift().split('(').pop().split('|');
		DoelDorp[0] = parseInt(DoelDorp[0]);
		DoelDorp[1] = parseInt(DoelDorp[1]);
		//Afstand berekenen
		var dist=Math.sqrt( Math.pow(EigenDorp[0] - DoelDorp[0] , 2) + Math.pow(EigenDorp[1] - DoelDorp[1] , 2));
		//De Afstand afronden voor op het scherm weer te geven
		var distance = Math.round (( dist ) * 100 ) / 100;
		//De Afstand invullen
		Invullenscherm('Afstand:', distance.toString(10).replace(/\W/,',')+' velden', ' ');
		var tMarkt = dist * eenheid[13] * 60;
		var Markt = OmzettenTijd(tMarkt, 0, 0);
		Invullenscherm('Markt:', Markt, ' ');
                if (testvb == 0){
                    Invullenscherm('Eenheid', 'Looptijd', 'Aankomsttijd (nl'+wereld+')');
		    for (var i=12; i>0 ; i--){
                        LooptijdEenheid(i, dist, punt);
                    };
                };
                if (testvb == 1){
		    Invullenscherm('Eenheid', 'Vertrektijd (nl'+wereld+') -> '+tijdIngave, ' ');
                    for (var i=12; i>0 ; i--){
			VertrektijdEenheid(i, vb, dist, punt);
		    };
		};
                if (testButton == -1){
                    var s = document.createElement('input');
                    s.type = 'button';
                    s.value = 'Aankomsttijd instellen';
                    s.addEventListener('click', function(){
                        var test="07:00:01";
                        if(tijdIngave!='') test=tijdIngave;
                        tijdIngave = prompt('Geef een gewenste aankomsttijd op en de vertrektijden zullen getoond worden. Als je het ingave veld leeg laat zullen de looptijden getoond worden.', test);
                        test = tijdIngave.match(/\d+\:\d\d\:\d\d\.?\d*/gi);
                        if(test != null){
                            test = tijdIngave.match(/\d+\:\d\d\:\d\d\.\d+/gi);
                            if(test != null){
                                vb=String(test);
                                testvb = 1;
                                var posp = vb.lastIndexOf('.');
                                if (posp>0){
                                        punt = vb.length - posp - 1 ;
                                        punt = Math.pow(10,punt);
                                };
                            } else {
                                test = tijdIngave.match(/\d+\:\d\d\:\d\d/gi);
                                if(test != null){
                                    vb = String(test);
                                    testvb = 1;
                                    punt = 0;
                                };
                            };
                        } else {
                            testvb = 0;
                            punt = 0;
                        };
                        Berekenen();
                    }, true);
                    table.appendChild(s);
                    testButton=1
                };
	};
	var testvb = 0;
        var testButton=-1;
        var punt = 0;
        var tijdIngave = '';
	Berekenen();
	//Een timer toevoegen voor de Aankomsttijd te herberekenen en als de alias wordt gewijzigd de vertrektijden te herberekenen
	function wait(){
            if (testvb==0) Berekenen();
	};
	wait();
	var intV = setInterval(wait, 1000);
})();