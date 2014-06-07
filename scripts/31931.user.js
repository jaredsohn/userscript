// ==UserScript==
// @name		NettbyFix v0.1b
// @namespace 	NettbyFix
// @include	*.nettby.no*
// ==/UserScript==

//Endre noe av linke-teksten på nettbyen
var links=document.getElementsByTagName('a');
for(i=0;i<links.length;i++)
{
	if(links[i].innerHTML=="Ignorer"){links[i].innerHTML="Overse";} //"Ignorer" til "Overse"
	else if(links[i].innerHTML=="Bli venn med"){links[i].innerHTML="Venner?";} //"Bli venn med" til "Venner?"
	else if(links[i].innerHTML=="Postkasse"){links[i].innerHTML="Mine brev";} //"Postkasse" til "Mine brev"
	else if(links[i].innerHTML=="Legg til profilbilde"){links[i].innerHTML="Legg til et profilbilde";} //"Legg til profilbilde" til "Legg til et profilbilde"
	else if(links[i].innerHTML=="Venner om"){links[i].innerHTML="Venner om meg";} //"Venner om" til "Venner om meg"
}

//Legge til html i en bestemt plassering. I dette tilfellet, fakta-boksen
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++)
{
	if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML))
	{
		akt = window.document.getElementsByTagName('div')[c].nextSibling;
		while ((akt.nodeType != 1) || (akt.nodeName != 'DIV'))
		{
			akt=akt.nextSibling;
		}
		akt.innerHTML = akt.innerHTML +'<!--her kommer HTML-kode-->'
		
	}
}

//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML="Litt statistikk om meg:";
		break;
	}
}

//Setter Sist innom
var innom=window.document.getElementsByTagName('div');
for(q=0;q<innom.length;q++)
{
	if(innom[q].innerHTML=="Sist innom")
	{
		innom[q].innerHTML="Disse har vært her før deg:";
		break;
	}
}



//tar bort noen unødvendige div-er
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('class') == 'smallinfo') {	style.display = 'none'; } //unødvendig til høyre
else if (getAttribute('class') == 'smallinfo_heading') {style.display = 'none'; } //overskrifter til høyre
else if (getAttribute('class') == 'smileybox') {style.display = 'none'; } //smileyboks
//else if (getAttribute('class') == 'infobox') {style.display = 'none'; } //infoboks til venstre
else if (getAttribute('class') == 'infobox_topic') {style.display = 'none'; } //overskrift til infoboks til venstre
else if (getAttribute('style') == 'border-style: solid solid none; border-color: rgb(255, 255, 255) rgb(255, 255, 255) -moz-use-text-color; border-width: 1px 1px 0px; overflow: hidden; width: 998px; height: 150px; background-color: rgb(255, 255, 255); margin-bottom: 0px; clear: right;') {style.display = 'none'; } //reklamen helt øverst
else if (getAttribute('style') == 'width: 1000px; height: 25px; background-color: rgb(0, 0, 0); background-image: url(http://img1.nettby.no/img/topic_bg.gif);') {style.display = 'none'; } //menyen med bl.a. "nyheter", "finn borger", "grupper" og "nettby max" oppe på siden
