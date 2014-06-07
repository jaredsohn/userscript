// ==UserScript==
// @name          Conrad Direkt Produkt Link
// @namespace     http://werty1st.com
// @description	  still under development
// @include       http://conrad.de/*
// @include       http://www.conrad.de/*
// @include       http://*.conrad.de/*
// @include       http://www1.conrad.de/*
// @include       http://ww*.conrad.de/*
// ==/UserScript==


/*alert("runnin");*/

text = document.body.innerHTML; //variablen fÃ¼r ganzen text
textneu =""; textrest="";	//neuen text mit Ã¤nderung und rest text noch ohne Ã¤nderung
artkllen = 34;			//lÃ¤nge der artikelnummer

pos1 = text.search(/Artikel-Nr.: /);  //ermittle ob artkl Ã¼berhaupt vorhanden
while (pos1 != -1)
	{
	textneu += text.slice(0,pos1); 		//alles bis zum ersten artkl in textneu kopieren
	textrest = text.slice(pos1,text.length);	//arteklnr bis textende
	artkln = textrest.substr(13,6);			//suchen der reinen nummer
	searchstr = textrest.substr(0,artkllen);			//aus artklnummer.: 3434-34 soll ein link werden
	newlink1 = "<a href=\"" + "http://www.conrad.de/scripts/wgate/zcop_b2c/!?perform_special_action=Produktdetail&product_show_id="+artkln+"&insert_kz=TX&p_page_to_display=fromoutside"+"\"><u>"+searchstr+"</u></a>";
	//der link wird jetzt anstelle der artikelnummer ans ende von textneu gesetzt
	textneu = textneu + newlink1;

	text = textrest.slice(artkllen,textrest.length); // textrest wird jetzt ohne den zuvor earbeitet link zum neuen Text

	pos1 = text.search(/Artikel-Nr.: /);  //ermittle ob artkl Ã¼berhaupt vorhanden
	}

document.body.innerHTML=textneu + text;
