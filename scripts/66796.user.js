// ==UserScript==
// @name         Pennergame (errechnet wie weit du bist (Was du schon alles frei gespielt hast ))By basti1012
// @namespace    http://www.pennergame.de
// @author       basti1012 by pennerhack.foren-city.de
// @description  errechnet dir alles was man bei pennergame erreichen kann .es werden alle gekauften sachen kontroliert und was man schon erreicht hat wird prozentual angezeigt was man erreichen kann
// @include      http://*.pennergame.de/overview/
// @version      1.0
// ==/UserScript==


//eraseCookie("adblock_alert");
//createCookie('adblock_alert','True',(60*60*999999999999999999999999999999999999999999999999999999999999999999999999999999999999));
//var keinwerbeblocker = true;






var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');
















		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/city/home/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tab = content.split('id="content-top')[1];
				var tabl = tab.split('content-bottom')[0];
				for(a=1;a<=22;a++){	
			try{	
					var table = tabl.split('name="submitForm" value="')[a];
					var table1 = table.split('"')[0];
			  		var suche = table1.search('Bewohnt');
			  		if (suche != -1) {
						var eigenheim = content.split('.jpg" alt="')[a];
						var eigenheim1 = eigenheim.split('"')[0];

						if(eigenheim1 == 'Bürgersteig'){ wer = '1'
						}else  if(eigenheim1 == 'Park'){ wer = '2'
						}else  if(eigenheim1 == 'Parkbank'){ wer = '3'
						}else  if(eigenheim1 == 'Pennerbox'){ wer = '4'
						}else  if(eigenheim1 == 'Brunnen'){ wer = '5'
						}else  if(eigenheim1 == 'Brücke'){ wer = '6'
						}else  if(eigenheim1 == 'Katakomben'){ wer = '7'
						}else  if(eigenheim1 == 'Elbstrand'){ wer = '8'
						}else  if(eigenheim1 == 'Baumhaus'){ wer = '9'
						}else  if(eigenheim1 == 'Zelt'){ wer = '10'
						}else  if(eigenheim1 == 'Wolfsrudel'){ wer = '11'
						}else  if(eigenheim1 == 'Wohnwagen'){ wer = '12'
						}else  if(eigenheim1 == 'Boot'){ wer = '13'
						}else  if(eigenheim1 == 'Grabkammer'){ wer = '14'
						}else  if(eigenheim1 == 'Tiefgarage'){ wer = '15'
						}else  if(eigenheim1 == 'Kakao-Fabrik'){ wer = '16'
						}else  if(eigenheim1 == 'Kran'){ wer = '17'
						}else  if(eigenheim1 == 'Leuchtturm'){ wer = '18'
						}else  if(eigenheim1 == 'Alte Kirche'){ wer = '19'
						}else  if(eigenheim1 == 'Burg'){ wer = '20'
						}else  if(eigenheim1 == 'Sternwarte'){ wer = '21'
						}else  if(eigenheim1 == 'Schloss'){ wer = '22' }else{ wer = '0';}

geb1 = 100/22;
geb2 = geb1*wer;

if(geb2>=100){
fab1 = 'green';
e1 = '';
}else{
fab1 = 'red'
e1 = '<a href="/city/home/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}


}
}catch(e){
break;
}
}



		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/city/music_store/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tab = content.split('id="content-top')[1];
				var tabl = tab.split('content-bottom')[0];
				for(a=1;a<=10;a++){
					try{	
						var table = tabl.split('name="submitForm" value="')[a];
						var table1 = table.split('"')[0];
			  			var suche = table1.search('Aktuelles Instrument');
			  			if (suche != -1) {
							var Instrument = content.split('.jpg" alt="')[a];	
							var Instrument1 = Instrument.split('"')[0];

							if(Instrument1 == 'Grashalm-Flöte'){ wer11 = '1'
								}else if(Instrument1 == 'Flaschen-Flöte'){ wer11 = '2'
								}else if(Instrument1 == 'Glocke'){ wer11 = '3'
								}else if(Instrument1 == 'Trommel'){ wer11 = '4'
								}else if(Instrument1 == 'Akkordeon'){ wer11 = '5'
								}else if(Instrument1 == 'Radio'){ wer11 = '6'
								}else if(Instrument1 == 'Gitarre'){ wer11 = '7'
								}else if(Instrument1 == 'Saxophon'){ wer11 = '8'
								}else if(Instrument1 == 'Chor'){ wer11 = '9' }else{ wer11 = '0';}

								geb11 = 100/9;
								geb22 = geb11*wer11;
								//alert(geb22);
							}
					}catch(e){
					break;
					}
				}



if(geb22>=100){
fab2 = 'green';
e2 = '';
}else{
fab2 = 'red';
e2 = '<a href="/city/music_store/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}










		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/city/scrounge/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tabq = content.split('id="content-top')[1];
				var tablq = tabq.split('content-bottom')[0];
				for(a=1;a<=9;a++){	
					try{			
						var tableq = tablq.split('name="submitForm" value="')[a];
						var table1q = tableq.split('"')[0];
			  			var suche = table1q.search('Ausgew&auml;hlt');
			  			if (suche != -1) {
							var schnorren = content.split('jpg" alt="')[a];
							var schnorren1 = schnorren.split('"')[0];
								if(schnorren1 == 'Kindergarten'){ wer22 = '1';
									}else if(schnorren1 == 'Punks'){ wer22 = '2';
									}else if(schnorren1 == 'Arbeitsamt'){ wer22 = '3';
									}else if(schnorren1 == 'Kneipe'){ wer22 = '4';
									}else if(schnorren1 == 'Bahnhof'){ wer22 = '5';
									}else if(schnorren1 == 'U-Bahn'){ wer22 = '6';
									}else if(schnorren1 == 'Einkaufszentrum'){ wer22 = '7';
									}else if(schnorren1 == 'Boerse'){ wer22 = '8';}else{ wer22 = '0';}
								geb12 = 100/8;
								geb44 = geb12*wer22;
								//alert(geb44);

						}
					}catch(e){
						break;
					}

}
if(geb44>=100){
fab3 = 'green';
e3 = '';
}else{
fab3 = 'red'
e3 = '<a href="/city/scrounge/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}
















		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/gang/upgrades/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
					try{			
						var tabble = content.split('<strong>Vorhandenes Eigentum')[1];
						var BANDE = tabble.split('<strong>Wirtschaftswunder')[0];
						var kammerBANDE = BANDE.split('Stufe: 5/')[1];
						var kammer = kammerBANDE.split(' (+')[0];
						var trainingBANDE = BANDE.split('Stufe: 5/')[2];
						var training = trainingBANDE.split(' (+')[0];
						var hausBANDE = BANDE.split('Stufe: 5/')[3];
						var haus = hausBANDE.split(' (+')[0];
						var kontoBANDE = BANDE.split('Stufe: 10/')[1];
						var konto = kontoBANDE.split(' (+')[0];
						try{
							var moralBANDE = BANDE.split('Stufe: 1/')[1];
							var moral = moralBANDE.split(' (')[0];
						}catch(e){}

if(kammer == '1'){ka='20';}else
if(kammer == '2'){ka='40';}else
if(kammer == '3'){ka='50';}else
if(kammer == '4'){ka='80';}else
if(kammer == '5'){ka='100';}else{ ka = '0';}

if(moral == '1'){mo='100';}else{ mo = '0';}

if(training == '1'){tr='20';}else
if(training == '2'){tr='40';}else
if(training == '3'){tr='50';}else
if(training == '4'){tr='80';}else
if(training == '5'){tr='100';}else{ tr = '0';}

if(haus == '1'){ha='20';}else
if(haus == '2'){ha='40';}else
if(haus == '3'){ha='50';}else
if(haus == '4'){ha='80';}else
if(haus == '5'){ha='100';}else{ ha = '0';}

if(konto == '1'){ko='10';}else
if(konto == '2'){ko='20';}else
if(konto == '3'){ko='30';}else
if(konto == '4'){ko='40';}else
if(konto == '5'){ko='50';}else
if(konto == '6'){ko='60';}else
if(konto == '7'){ko='70';}else
if(konto == '8'){ko='80';}else
if(konto == '9'){ko='90';}else
if(konto == '10'){ko='100';}else{ ko = '0';}



//alert(mo)


//alert(ka)
//alert(ko)
//alert(tr)
//alert(ha)

					}catch(e){}


if(mo>=100){
fab4 = 'green';
e4 = '';
}else{
fab4 = 'red';
e4 = '<a href="/gang/upgrades/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}


if(ka>=100){
fab5 = 'green';
e5 = '';
}else{
fab5 = 'red';
e5 = '<a href="/gang/upgrades/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}




if(ko>=100){
fab6 = 'green';
e6 = '';
}else{
fab6 = 'red';
e6 = '<a href="/gang/upgrades/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}




if(tr>=100){
fab7 = 'green';
e7 = '';
}else{
fab7 = 'red';
e7 = '<a href="/gang/upgrades/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}




if(ha>=100){
fab8 = 'green';
e8 = '';
}else{
fab8 = 'red';
e8 = '<a href="/gang/upgrades/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}










		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/city/pet_store/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tabf = content.split('id="content-top')[1];
				var tablf = tabf.split('content-bottom')[0];

				for(a=1;a<=28;a++){	
					try{	
						var tablef = tablf.split('name="submitForm" value="')[a];
						var table1f = tablef.split('"')[0];
			  			var suche = table1f.search('Dein aktuelles Haustier');
			  			if (suche != -1) {
							var tier = content.split('.jpg" alt="')[a];
							var tier1 = tier.split('"')[0];

							if(tier1 == 'Kakerlake'){ wer5 = '1'
							}else  if(tier1 == 'Goldfisch'){ wer5 = '2'
							}else  if(tier1 == 'Maus'){ wer5 = '3'
							}else  if(tier1 == 'Hamster'){ wer5 = '4'
							}else  if(tier1 == 'Parkbank'){ wer5 = '5'

							}else  if(tier1 == 'Taube'){ wer5 = '6'
							}else  if(tier1 == 'Ratte'){ wer5 = '7'
							}else  if(tier1 == 'Hase'){ wer5 = '8'
							}else  if(tier1 == 'Frettchen'){ wer5 = '9'
							}else  if(tier1 == 'Katze'){ wer5 = '10'

							}else  if(tier1 == 'Falke'){ wer5 = '11'
							}else  if(tier1 == 'Schlange'){ wer5 = '12'
							}else  if(tier1 == 'Hausziege'){ wer5 = '13'
							}else  if(tier1 == 'Pudel'){ wer5 = '14'
							}else  if(tier1 == 'Adler'){ wer5 = '15'

							}else  if(tier1 == 'Schäferhund'){ wer5 = '16'
							}else  if(tier1 == 'Pitpull'){ wer5 = '17'
							}else  if(tier1 == 'Cockerspaniel'){ wer5 = '18'
							}else  if(tier1 == 'Chihuahua'){ wer5 = '19'
							}else  if(tier1 == 'Pferd'){ wer5 = '20'

							}else  if(tier1 == 'Nilpferd'){ wer5 = '21'
							}else  if(tier1 == 'Giraffe'){ wer5 = '22'
							}else  if(tier1 == 'Krokodil'){ wer5 = '23'
							}else  if(tier1 == 'Tiger'){ wer5 = '24'
							}else  if(tier1 == 'Äffchen'){ wer5 = '25'

							}else  if(tier1 == 'Park'){ wer5 = '26'
							}else  if(tier1 == 'Elefant'){ wer5 = '27'
							}else  if(tier1 == 'Eisbär'){ wer5 = '28'
							}else{ wer5 = '0';}

								geb5 = 100/28;
								geb55 = geb5*wer5;
								//alert(geb55);
							}
					}catch(e){
					break;
					}
				}



if(geb55>=100){
fab9 = 'green';
e9 = '';
}else{
fab9 = 'red';
e9 = '<a href="/city/pet_store/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}




		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/city/weapon_store/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tabf = content.split('id="content-top')[1];
				var tablf = tabf.split('content-bottom')[0];
				for(a=1;a<=24;a++){	
					try{	
						var tablef = tablf.split('name="submitForm" value="')[a];
						var table1f = tablef.split('"')[0];
			  			var suche = table1f.search('Ausgew&auml;hlt');
			  			if (suche != -1) {
							var tier = content.split('.jpg" alt="')[a];
							var tier1 = tier.split('"')[0];
							if(tier1 == 'Zahnstocher'){ wer55 = '1'
							}else if(tier1 == 'Zerbrochene Flasche'){ wer55 = '2'
							}else if(tier1 == 'Wasserbomben'){ wer55 = '3'
							}else if(tier1 == 'Silvesterknaller'){ wer55 = '4'
							}else if(tier1 == 'Spraydose'){ wer55 = '5'
							}else if(tier1 == 'Gürtel'){ wer55 = '6'
							}else if(tier1 == 'Gummiknüppel'){ wer55 = '7'
							}else if(tier1 == 'Gullideckel'){ wer55 = '8'
							}else if(tier1 == 'Kettenschloss'){ wer55 = '9'
							}else if(tier1 == 'Schlagring'){ wer55 = '10'
							}else if(tier1 == 'Heizungsrohr'){ wer55 = '11'
							}else if(tier1 == 'Hammer'){ wer55 = '12'
							}else if(tier1 == 'Pfefferspray'){ wer55 = '13'
							}else if(tier1 == 'Elektroschocker'){ wer55 = '14'
							}else if(tier1 == 'Feuerlöscher'){ wer55 = '15'
							}else if(tier1 == 'Schwert'){ wer55 = '16'
							}else if(tier1 == 'Alte Knarre'){ wer55 = '17'
							}else if(tier1 == 'Pistole'){ wer55 = '18'
							}else if(tier1 == 'Maschinengewehr'){ wer55 = '19'
							}else if(tier1 == 'Shotgun'){ wer55 = '20'
							}else if(tier1 == 'Kanone'){ wer55 = '21'
							}else if(tier1 == 'Kriegsmaschine'){ wer55 = '22'
							}else if(tier1 == 'Atombombe'){ wer55 = '23'
							}else if(tier1 == 'Schwarzes Loch'){ wer55 = '24'
							}else{ wer55 = '0';}
							geb33 = 100/24;
							geb52 = geb33*wer55;
							}
					}catch(e){
					break;
					}
				}
			
if(geb52>=100){
fab10 = 'green';
e10 = '';
}else{
fab10 = 'red';
e10 = '<a href="/city/weapon_store/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}









GM_deleteValue("pwert")
		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'http://www.pennergame.de/stock/plunder/', 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var tab1 = content.split('<div>Plunder</div>')[1];
				var tab2 = tab1.split('<h3>Angelegt</h3>')[0];

				for(i=1;i<=80;i++){
					try{
					var tab3 = tab2.split('class="col2">')[i];
					var tab4 = tab3.split('/a>')[0];

					var tab5 = tab4.split('>')[1];
					var inner = tab5.split('<')[0];








if(inner.match(/Kaputter Regenschirm/)){
pwert = '9';

}else if(inner.match(/Seife/) || inner.match(/Kaputte Schuhe/)){
pwert = '8';

}else if(inner.match(/Verdreckter Zauberstab/) || inner.match(/Pinke Schleife/) || inner.match(/Blaue Schleife/) || inner.match(/Malfarben/) || inner.match(/Augenklappe/)){
pwert = '7';

}else if(inner.match(/Flaschenautomat-Attrappe/)){
pwert = '6';

}else if(inner.match(/Kürbiskopf/) || inner.match(/Textilfetzen/) || inner.match(/Zertrümmerte Vase/)){
pwert = '5';

}else if(inner.match(/Hopfen/) || inner.match(/Altes Wasser/) || inner.match(/Tonofen/) || inner.match(/Bierfass /)){
pwert = '4';

}else if(inner.match(/Murmel/) || inner.match(/Deoreste/)){
pwert = '3';

}else if(inner.match(/Rostiger Nagel/) || inner.match(/Marodes Holzbrettes/) || inner.match(/Nikolaus-Plunder/)){
pwert = '2';

}else if(inner.match(/Eierschalen/) || inner.match(/Zerplatztes/) || inner.match(/Nikolaus-Plunder/) || inner.match(/Rote Schleife/)){
pwert = '1';

}

speicher = GM_getValue("pwert", '0');
if(pwert>=speicher){
GM_setValue("pwert", pwert)
}
owert = GM_getValue("pwert");
geb3a = 100/9;
perg = geb3a*owert;
}catch(e){
break;
}
}


if(perg>=100){
fab11 = 'green';
e11 = '';
}else{
fab11 = 'red';
e11 = '<a href="/stock/plunder/" class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>';
}


pennererg = (Number(geb52)+Number(geb55)+Number(geb44)+Number(geb2)+Number(geb22)+Number(owert))/5;
bandeerg = (Number(ha)+Number(geb55)+Number(geb44)+Number(geb2)+Number(geb22))/5;
zusammen = (Number(geb52)+Number(geb55)+Number(geb44)+Number(geb2)+Number(geb22)+Number(ha)+Number(geb55)+Number(geb44)+Number(geb2)+Number(geb22)+Number(owert))/10;



if(pennererg>=100){
fab13 = 'green';
e13 = '';
}else{
fab13 = 'red';
e13 = '';
}

if(bandeerg>=100){
fab14 = 'green';
e14 = '';
}else{
fab14 = 'red';
e14 = '';
}

if(zusammen>=100){
fab15 = 'green';
e15 = '';
}else{
fab15 = 'red';
e15 = '';
}








newdiv = document.createElement('div');
newdiv.setAttribute('class', 'tieritemA');
newdiv.style.width = "445px";
newdiv.innerHTML = ''


+'<br>'+e10+'<strong>Waffe zu :<font style=\"color:'+fab10+'; font-size:100%;\"><b> '+geb52+' </font>% '
+'<br>'+e9+'Tier zu :<font style=\"color:'+fab9+'; font-size:100%;\"><b> '+geb55+' </font>% ' 
+'<br>'+e3+'Betteln :<font style=\"color:'+fab3+'; font-size:100%;\"><b> '+geb44+' </font>% '
+'<br>'+e1+'E-Heim :<font style=\"color:'+fab1+'; font-size:100%;\"><b> '+geb2+' </font>% '
+'<br>'+e2+'Musik zu :<font style=\"color:'+fab2+'; font-size:100%;\"><b> '+geb22+' </font>% '
+'<br>'+e11+'Plunder : <font style=\"color:'+fab11+'; font-size:100%;\"><b>'+perg+' </font>% '

+'<br>'+e8+'Bandenheim : <font style=\"color:'+fab8+'; font-size:100%;\"><b>'+ha+' </font>% '
+'<br>'+e7+'Bandentrai : <font style=\"color:'+fab7+'; font-size:100%;\"><b>'+tr+' </font>% '
+'<br>'+e4+'Bandenmoral  :<font style=\"color:'+fab4+'; font-size:100%;\"><b> '+mo+' </font>% '
+'<br>'+e6+'Bandenkonto  :<font style=\"color:'+fab6+'; font-size:100%;\"><b> '+ko+' </font>% '
+'<br>'+e5+'Bandenkammer  :<font style=\"color:'+fab5+'; font-size:100%;\"><b>'+ka+' </font>% '
// gesmt ergebniss
+'<br> '+e13+'Das sind beim Penner :<font style=\"color:'+fab13+'; font-size:100%;\"><b>'+pennererg+'</font> % '
+'<br>'+e14+' Das ist bei der bande :<font style=\"color:'+fab14+'; font-size:100%;\"><b>'+bandeerg+' </font>% '
+'<br>'+e15+'Das ist alles zusammen  :<font style=\"color:'+fab15+'; font-size:100%;\"><b>'+zusammen+'</font> % </strong>'


div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length-5]);
	
}});
}});
}});
}});
}});
}});
}});




//<font style=\"color:'+fab1+'; font-size:100%;\"><b>
//<a class="tooltip">X<span><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Da der wert noch nicht auf 100 ist kannst du hier klicken um direkt zur sTADT ZU GELANDEN UND EINKAUFEN</font></span></a>


/*




	Klebstoff 	 Ab Stufe: 50
	Wattestäbchen 	 Ab Stufe: 50
	Faden 	 Ab Stufe: 50
	Floh 	 Ab Stufe: 50
	Styroporkügelchen 	 Ab Stufe: 50
	Geldbeutel 	 Ab Stufe: 50
	Verbogenes Fahrrad 	 Ab Stufe: 50
	Fußball 	 Ab Stufe: 50
	Kaputter Fußball 	 Ab Stufe: 50
	Stofftier  Ab Stufe: 50
	Schwarzes Loch: Verdopplung der Größe 	 Ab Stufe: (~ 50)
	Minibrunnen 	 Ab Stufe: (~ 50)

	Umgekippter Getränkelaster 	 Ab Stufe: (~51)


	Rostiges Taschenmesser  Ab Stufe: 55
	Flaschensammeln: Partytime 	 Ab Stufe: (~55)

	Vermoderter Holzroller  Ab Stufe: 60



	Kleeblatt 	 Ab Stufe: 65
	Kaputte Brille 	 Ab Stufe: 65
	Cowboystiefel 	Ab Stufe: 65
	Schwarzes Loch: Verdreifachung der Größe 	 Ab Stufe: (~ 65)
	Schwarzes Loch: Vervierfachung der Größe 	 Ab Stufe: (~ 65)
	Schwarzes Loch: Zweites Schwarzes Loch 	 Ab Stufe: (~ 56)
	Schwarzes Loch: Drittes Schwarzes Loch 	 Ab Stufe: (~ 65)
	Schwarzes Loch: Viertes Schwarzes Loch 	 Ab Stufe: (~ 65)

	Kartuschen für Pfefferspray: Cayenne-Pfeffer 	 Ab Stufe: (~70)
	Gestelle: Billige Rollen 	 Ab Stufe: 70
	Dose “Dr. Penner” 	Ab Stufe: 70
	Bombenupgrade: Wasserstoffbombe 	 Ab Stufe: (~ 70)
	Regenschirm 	Ab Stufe: 75

	Erste Hilfe Koffer 	Ab Stufe: 80

	Skateboard 	Ab Stufe: 85

	Lexikon 	Ab Stufe: 90
	Dir unbekanntes Artefakt (Hamburg) 	Ab Stufe: 90
	Dir unbekanntes Artefakt (Berlin) 	Ab Stufe: 90


	Alter Mofamotor 	Ab Stufe: 93


	Tageskarte 	Ab Stufe: 100
	Schnürsenkel 	Ab Stufe: 100
	Schilfrohrbogen (Hamburg) 	Ab Stufe: 100
	Schilfrohrbogen (Berlin) 	Ab Stufe: 100



	Goldenes Kleeblatt 	Ab Stufe: 103
	Rostiger Angelhaken 	 Ab Stufe: (~ 105)
	Jetpack 	ab 105 

	Alte Hockey Torwartausrüstung 	  Ab Stufe: (~ 108)
	Hussmans Spezialwaffe (Hamburg)  Ab Stufe: (~ 115)
	Hussmans Spezialwaffe (Berlin) 	 Ab Stufe: (~ 115)

	I-WIN (Hamburg) 	Ab Stufe: 125



	I-WIN (Berlin) 	Ab Stufe: 200
	Kürbiskopf 2008 	Ab Stufe: 200





























*/

































