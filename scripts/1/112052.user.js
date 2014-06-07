// ==UserScript==
// @name           Tipo Partita
// @namespace      *
// @description    Riconosce il tipo di partita
// @include        http://www.footstar.org/relatorio.asp?jogo_id=*
// ==/UserScript==

contenitore=document.createElement('div');
contenitore.setAttribute('style', 'line-height: 30px;');
element=document.createElement('span');
element.setAttribute('style', 'border: 1px solid black; padding: 2px;');
contenitore.appendChild(element);
document.getElementById('scoreboard_top').appendChild(contenitore);
TP='Tipo Partita: ';
element.textContent=TP;
if(document.getElementById('scoreboard_body').childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[0].href.substr(24, 13)=='info_pais.asp')	// Se è una partita nazionale
	if(document.getElementById('scoreboard_body').childNodes[1].childNodes[1].childNodes[2].childNodes[1].textContent.slice(-3)=='U18')
		TP+='Nazionale U18';
	else if(document.getElementById('scoreboard_body').childNodes[1].childNodes[1].childNodes[2].childNodes[1].textContent.slice(-3)=='U21')
			TP+='Nazionale U21';
		 else
			TP+='Nazionale Maggiore';
else	// Se non è una partita nazionale

if(document.getElementById('scoreboard_body').childNodes[1].childNodes[1].childNodes[2].childNodes[1].textContent.slice(-3)=='U19')
	{
	dataAttuale=document.getElementById('scoreboard_bottom').childNodes[0].childNodes[1].childNodes[2].childNodes[3].textContent;
	dataAttuale=dataAttuale.split('/');
	dataAttuale=new Date(dataAttuale[2], dataAttuale[1], dataAttuale[0]);
	dataNuovoCalcolo=new Date(2010, 09, 13);
	time_dataAttuale=dataAttuale.getTime();
	time_dataNuovoCalcolo=dataNuovoCalcolo.getTime();
	if(time_dataAttuale<time_dataNuovoCalcolo)
		TP+='U19(OLD)';
	else	
		TP+='U19';
	}
else 
	{
	var nameMatch=document.getElementById('scoreboard_top').childNodes[2].textContent;
	if(nameMatch.substr(0, 10)=='Amichevole')
			TP+='Amichevole';
		else if(nameMatch.substr(0, 10)=='Campionato')
				TP+='Prima Squadra';
			else 
				if(nameMatch.substr(0, 18)=='Coppa Continentale' || nameMatch.substr(0, 14)=='Coppa Campioni' || nameMatch.substr(0, 23)=='Coppa Intercontinentale' || nameMatch.substr(0, 17)=='Coppa delle Coppe')
					TP+='CIC';
				else if(nameMatch.substr(0, 7)=='Coppa (')
						TP+='Prima Squadra';
					else
						TP+='SCONOSCIUTO!';
	}
		
element.textContent=TP