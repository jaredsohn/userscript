// ==UserScript==
// @name Highscore V4.1.0
// @namespace 11235813[Bande:Kuestenpenner]
// @description Wie V3.1, mit Spaltenauswahlfunktion
// @include http://highscore.pennergame.de/highscore/*
// @exclude
// @require http://kuestenpenner.ku.ohost.de/scriptingapi.js
// ==/UserScript==


gettarget();

window.scrollBy(0,350);
/*var pagination = document.getElementsByClassName('pagination')[0];
pagination.style.width = "750px";
var weiter = pagination.getElementsByTagName('li')[1].innerHTML;
var zurueck = pagination.getElementsByTagName('li')[0].innerHTML;
var current = pagination.getElementsByClassName('pagination_current')[0].textContent;*/
GM_setValue("aktiv",0);
var nav1 = document.getElementsByTagName('ul')[2];

var li = document.createElement('li');
li.innerHTML = '<a>Spalten anpassen</a>';

li.addEventListener("click",set,false)

								 
nav1.appendChild(li);


var tablesearch = document.getElementsByTagName('table')[1];
tablesearch.innerHTML += '<tr><td height="15" colspan="3" align="left" valign="top"><span class="tiername">Nach Punkten ausw&auml;hlen</span><hr size="1"><form method="GET" action="/highscore/range/"><table border="0" cellspacing="0" cellpadding="0"><td width="173" height="20"><tr><td width="173"><div align="right">Mindestens</div></td><td width="255"><input name="min_points" maxlength="10" size="10" type="text" />Punkte</td></tr><tr><td><div align="right">Maximal</div></td><td width="255"><input name="max_points" maxlength="10" size="10" type="text" />Punkte</td></tr><tr><td>&nbsp;</td><td><div align="right"><input class="formbutton" type="submit" value="Suchen" /></div></td></tr></table></td></tr>'

var infotext = new Array("Platz","Name","Punkte","RegDatum","Bname","Bs","Geld","Promille","Petimg","Stadtteil","Status","Bpunkte","BPlatz","Mitglieder");
var beschreibung = new Array("Platzierung","Name[Profillink]","Punkte[wei&szlig;=angreifbar]","Registrierungsdatum","Bandenname[Bandenlink]","Bandenstatus[1=Mitglied,2=CoAdmin,3=Admin]","Geld[Einstellungen siehe unten]","Promille","Haustierbild[verkleinert]","Stadtteil","Status[Online/Bann]","Bandenpunkte","Bandenplatz","Anzahl d. Banden-Mitglieder");

var navineu = document.getElementsByTagName('div')[7];



function set() {
	if (GM_getValue("aktiv") ==1) {
		window.scrollBy(0,700);
	} else {
	GM_setValue("aktiv",1);
for (j=0;j<14;j++) {
	var tr = document.createElement('tr');		
	tr.style.width = "600px";
	var td = document.createElement('td');
	td.style.width="250px";
	var td1 = document.createElement('td');
	td1.style.width="50px";
	td.innerHTML = infotext[j];	
	td1.innerHTML = '<input name="'+infotext[j]+'" value="'+infotext[j]+'" type="checkbox"></input>';	
	var td3 = document.createElement('td');
	td3.innerHTML = beschreibung[j];
	tr.appendChild(td);
	tr.appendChild(td1);	
	tr.appendChild(td3);
	navineu.appendChild(tr);
}
	var tr5 = document.createElement('tr');
	tr5.style.width= "600px"
	var notetd = document.createElement('td');
	notetd.style.width = '580px';
	notetd.innerHTML = '<a>Einstellungen Speichern</a>';
	notetd.addEventListener("click",save,false)

	tr5.appendChild(notetd);
	navineu.appendChild(tr5);
}
}


function save() {

	var content = new Array();
for (i=0;i<14;i++) {
	try {	
	var aktuellinput = document.getElementsByTagName('input')[i];
	var value = aktuellinput.checked;
	if (value == true) {		
		content.push(infotext[i]);
	}
	} catch(err) {	 
	
}
}

valuetext = content.join(',');
GM_setValue("contents",valuetext);
location.reload();
}


var contentstring = GM_getValue("contents");
var content = new Array();
try {
var laenge = contentstring.split(',').length;
} catch(err) {
	alert('Bitte zuerst die Spalten anpassen!');
	var contentstring = GM_getValue("contents");
}
for (g=0;g<laenge;g++) {	
	content.push(contentstring.split(',')[g]);
}

	
theading(0,content);							

var idcollect = new Array();
var trs = document.getElementsByTagName('table')[0].getElementsByTagName('tr').length;
for(i=1;i<trs;i++) {
	var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i];
	var id = tr.innerHTML.split('/profil/id:')[1].split('/')[0];
	idcollect.push(id);
	filltable(i,content);
}

for (z=1;z<=20;z++) {
	getuserinfo(idcollect[z-1],z);
}


/*navineu.className = 'pagination';
navineu.style.textAlign = "center";
navineu.innerHTML+= '<br><br><br>';
var ul = document.createElement('ul');
for (c=0;c<=2;c++) {
	var li = document.createElement('li');
	if (c==0) {
		li.innerHTML = zurueck;
	} else if(c == 1) {
		
		li.innerHTML = '<a href="http://highscore.pennergame.de/highscore/'+current+'/" class="pagination_current">'+current+'</a>'
	} else if(c == 2) {
		li.innerHTML = weiter;
	}
	ul.appendChild(li);
}
navineu.appendChild(ul);
*/


function readuser(infos,x) {
	

	
	
	for (f=0;f<content.length;f++) {
		var name = content[f];
		
		switch(name)
		{
			case 'Platz':
			var wert = '<strong>'+infos[0]+'.</strong>';
			break;
			
			case 'Name':
			var wert = '<a href="http://www.pennergame.de/profil/id:'+infos[9]+'/" target="_blank" style="text-decoration:none;">'+infos[1]+'</a>';
			break;
			
			case 'Punkte':
			var wert = infos[2]+'pkte';
			break;
			
			case 'RegDatum':
			var wert = infos[3];
			break;
						
			case 'Bs':
			var wert = infos[6];
			break;
			
			case 'Geld':
			var wert = infos[7]+'cash';
			break;
			
			case 'Promille':
			var wert = infos[8];
			break;
			
			case 'Petimg':
			var wert = makeimg(infos[10],40,50);
			break;
			
			case 'Stadtteil':
			var wert = infos[11];
			break;
			
			case 'Status':
			var wert = infos[12];
			break;
						
			case 'Bname':
			var wert = '<a href="http://www.pennergame.de/profil/bande:'+infos[13]+'/" target="_blank" style="text-decoration:none;">'+infos[14]+'</a>';
			break;
			
			case 'Bpunkte':
			var wert = infos[15];
			break;
			
			case 'BPlatz':
			var wert = infos[16];
			break;
			
			case 'Mitglieder':
			var wert = infos[17];
			break;
			
			
		}
		
		maketable(x,f,wert);
	}
}

