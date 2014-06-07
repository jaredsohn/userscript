// ==UserScript==
// @name           bronnenlijst
// @include        *
// @description    Houd makkelijk een bronnenlijst bij!
// @version        1.0
// @author         oude elferink
// @date           29-4-2010
// ==/UserScript==

//f12 om site toe te voegen
//f8 om alles te verwijderen
//f9 om bronnelijst te bekijken

var eerstekeer=GM_getValue("bestaan");
if (eerstekeer=="undefined"){
GM_setValue("bronnenlijst","");
GM_setValue("bestaan",0);
}

window.addEventListener('keydown', KeyCheck, true);
function KeyCheck(e)
{
if(e.keyCode==123)
	{

	var dubbel=GM_getValue("bronnenlijst");
	var site2=location.href;
	var dubbel2=dubbel.match(site2);
	if (dubbel2!=null)
		{
		var r=confirm("Deze site staat al in de bronnenlijst.\nWil je hem nogmaals toevoegen?");
		if (r==true)
			{
			sitetoevoegen();
			}
		}
	else {
	sitetoevoegen();
	}
	
	
	}
else if(e.keyCode==119)
	{
	var r=confirm("wil je echt alles uit de bronnenlijst verwijderen?");
	if(r==true)
		{
		GM_setValue("bronnenlijst","");
		GM_setValue("bestaan",0);
		}

	}
else if(e.keyCode==120)
	{
	var r=confirm("wil je de bronnenlijst zien");
	if (r==true)
		{
		var proberen3=GM_getValue("bronnenlijst");
	    var doc=document.open("text/html","replace");
		var txt='<html><head><style type="text/css">#customers{font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;width:100%;border-collapse:collapse;-webkit-box-shadow: 0px 0px 40px #000;-moz-box-shadow: 0px 0px 40px #000;box-shadow: 0px 0px 40px #000;border: 1px solid #afafaf;}#customers td, #customers th {font-size:1em;border:1px solid #98bf21;padding:3px;}#customers th {font-size:1.1em;text-align:left;padding-top:5px;padding-bottom:4px;background-color:#A7C942;color:#ffffff;}#customers tr.alt td {background-color:#EAF2D3;}#iddiv{  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  width: 50%;  height: 95%;  margin: auto;}</style></head><body style="overflow: auto"><div id="iddiv"><input type="button" value="Laat scrollbar zien" onClick="window.location.reload()"/><table id="customers"><tr><th>adres</th><th>titel</th><th>domein</th><th>datum</th></tr> '+proberen3+"</table><table id='customers'><tr><th>Met dank aan Wout OE (en Anoesj), Stedelijk Gymnasium Johan van Oldenbarnevelt</th></tr></table><form id='customers'>f8=gehele lijst verwijderen<br />f9=bronnenlijst bekijken<br />f12=bron toevoegen<br /><br />Tabel kopieren naar word:<br />1)Selecteer tabel met ctrl-a<br />2)Kopieer tabel met ctrl-c<br />3)Plak de tabel in word<br />4)Maak de tabel op via kopje opmaak<br /><br />*Je kan de tabel ook eerst naar excel kopieren<br />*Als je niet de gehele tabel selecteert komt de tabel opmaak niet mee naar word (inclusief: met dank aan..., kan je later nog wel verwijderen)<br />*Kom je er niet uit dan stuur je me maar een krabbel (woutoe.hyves.nl)</form><br /><br /><br /><br /><br /></div></body></html>";
  		doc.write(txt);
		doc.close();

		}
	}
}
 
function sitetoevoegen()
{

	var proberen=GM_getValue("bestaan");
	if (proberen=="undefined")
		{	
		a=0;
		GM_setValue("bestaan",a);
		}
	else 
		{
		a=GM_getValue("bestaan");
		a++;
		GM_setValue("bestaan",a);
		}

	var site=location.href;
	var site2=document.title;
	var site3=document.doctype;
	var site4=document.domain;
	var datum=new Date();
	var datum2=datum.toLocaleString();
	alert("De site is toegevoegd:\nadres: " + site + "\ntitel: " + site2 + "\ndomein: " + site4 + "\ndatum: " + datum2);
	
	var even=Math.floor(a/2);
	if (a/2-even==0)
	{
	var bronnenlijst='<tr class="alt"><td>' + site + "</td><td>" + site2 + "</td><td>" + site4 + "</td><td>" + datum2 + "</td></tr>";
	}
	else
	{
	var bronnenlijst="<tr><td>" + site + "</td><td>" + site2 + "</td><td>" + site4 + "</td><td>" + datum2 + "</td></tr>";	
	}
		

	var proberen=GM_getValue("bronnenlijst");
	if (proberen=="undefined")
		{
		GM_setValue("bronnenlijst","");
		}
	var lijst=GM_getValue("bronnenlijst");
	lijst=lijst + bronnenlijst;
	GM_setValue("bronnenlijst",lijst);

		
}
 
 