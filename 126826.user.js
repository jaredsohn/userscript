// ==UserScript==
// @name		Real Skill/Week
// @version		0.2
// @description		Calcola il valore Skill/Week con un algoritmo differente da quello già presente in Footstar per gli over21, calcolando diversamente i 100 dai 100 blu e prendendo in considerazione l'età(contando ogni singolo giorno). La riga del Real Skill/Week viene aggiunta sotto la riga dello Skill/Week. P.S.: Per il proprio giocatore il calcolo è più preciso mentre per gli altri tende ad essere meno preciso in quanto non è possibile visualizzare i 100 blu.
// @include		http://www.footstar.org/ver_jogador.asp?jog_id=*
// @date		26/02/2012
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

function dataNascita()
	{
	nascita=$('.tool').text();
	nascita=nascita.substring(1, nascita.length-1);
	day=parseInt(nascita.substring(0, nascita.indexOf('/')));
	year=parseInt(nascita.substring(nascita.indexOf('/')+1));
	return (year-1)*112+day;
	}

function dataAttuale()
	{
	data=$('#nav_top_bar').text();
	dateBegin=data.indexOf('(')+1;
	dateEnd=data.indexOf(')');
	data=data.substring(dateBegin, dateEnd);
	day=parseInt(data.substring(0, data.indexOf('/')));
	year=parseInt(data.substring(data.indexOf('/')+1));
	return (year-1)*112+day;
	}

function calcolaSkill(GK)
	{
	totaleSkill=0;

	// Controllo se si sta controllando il proprio player o no
	urlEnd=$(location).attr('search');
	urlEnd.substring(urlEnd.length-6);
	if(urlEnd="&mmm=1")
		Hval=99.875;
	else
		Hval=99.75;
	

	if(GK)
		endFor=5;
	else
		endFor=11;
            
	for(i=0; i<endFor; i++)
		{
		skill=$('.skill_text div')[i];
		if($(skill).text() == 100)
			{
			if($(skill).attr('class') == 'skill_blue')
				totaleSkill+=100;
			else
				totaleSkill+=Hval;
			}
		else
			totaleSkill+=parseInt($(skill).text());
		}


	if(GK)
		valFisiche=14;
	else
		valFisiche=20;

	for(i=0; i<2; i++)
		{
		skill=$('.skill_text div')[i+valFisiche];
		if($(skill).text() == 100)
			{
			if($(skill).attr('class') == 'skill_blue')
				totaleSkill+=100;
			else
				totaleSkill+=99.75;
			}
		else
			totaleSkill+=parseInt($(skill).text());
		}


	return totaleSkill;
	}

function insertRSW(skillWeek)
	{
	elemento=$('.list2').parent('tr')[1];
	contenitore=$('.list2').parent('tr').parent()[1]
	RSW=$(elemento).clone().appendTo(contenitore);
	$(RSW).find('b').text('Real Skill/Week:');
	textSkillWeek=((Math.round(skillWeek*100)/100).toString()).replace(".",",");
	$($(RSW).children()[1]).text(textSkillWeek);
	$($('td.list2').parent().parent().parent()[1]).attr('style', 'margin-top: -10px; margin-bottom: 5px;');
	$($('#others_hide br')[1]).remove();
	}


data=dataAttuale();
nascita=dataNascita();
GK=0;
if($($('#skills_box tr.list2')[0]).text().indexOf('(')!=-1) GK=1;
numSkill=calcolaSkill(GK);
eta=17+Math.floor((data-nascita)/112);

if(eta<21)
	skillWeek=numSkill/(data-nascita)*7
else
	{
	birthdayOffset=(data-nascita)-112*(eta-17);	//giorni passati dal compimento degli anni
	birthdayOffset++;
	tot=0;
	perc=100;
	while(eta>21)
		{
		eta--;
		perc*=0.75;
		tot+=perc;
	        }
	//Giorni differenza
	perc*=0.75;
	tot+=perc/(112/birthdayOffset);
	skillSeason=numSkill/(tot+400)*perc;
	skillWeek=skillSeason/16;
	}

insertRSW(skillWeek);