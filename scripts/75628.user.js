// ==UserScript==
// @name           TLX_wypelnianie_zlecen_v1.1
// @include        https://zlecenia.tlx:1443/tc/*
// ==/UserScript==

var dni = new Array();
var zlec = new Array();
var min = new Array();
var d1 = new Array();
var d2 = new Array();
var godzina1, minuta1, godzina2, minuta2;

//---------------------------
//Dane wejsciowe
//Dni mozna podawac tak:	dni[3] =	'12 3';				-czyli 12 dzien miesiaca, zmiana od 22-6 rano
//Albo tak:					dni[3] =	'11 18:00-06:00';	-np w niedziele, tam gdzie zmiany sa inne niz ranek-popoludnie-wieczor	
//---------------------------
dni[0] =	'05 3';
dni[1] =	'07 2';
dni[2] =	'09 1';
dni[3] =	'13 1';
dni[4] =	'15 1';
dni[5] =	'16 3';
dni[6] =	'19 1';
dni[7] =	'20 2';
dni[8] =	'21 3';
dni[9] =	'22 3';
dni[10] =	'23 3';
dni[11] =	'26 1';
dni[12] =	'28 2';
dni[13] =	'29 2';
dni[14] =	'31 06:00-18:00';
//Zabraklo miejsca w tablicy? Spoko, jest dynamiczna. Dopisz sobie :)

M = 07;		//Zmienna miesiac restartuje skrypt - zaczyna z liczba godzin rowna sumie godzin zlecen (ponizej) i odlicza w dol dopoki nie rozpisze wszystkiego.
Y = 2010;

//Zlecenia zgodnie ze stanem na 1 marzec.

zlec[0] = '017402-002';		min[0] = 432;		//LP - Usługa udostępnienia środowiska SIKLP za okres 2009 III 25 - 2010 III 24
zlec[1] = '017305';			min[1] = 288;		//+ Analyx - outsourcing DC (maszyny VM, kolokacja)
zlec[2] = '017010';			min[2] = 288;		//+ Biuro Zapasowe dla BZWBK - umowa 0000071
zlec[3] = '016609-002';		min[3] = 468; 		//Natia - Utrzymanie sieci WAN (UKE)
zlec[4] = '015175';			min[4] = 36; 		//+ Netia S.A. serwis firewall PIX 515e
zlec[5] = '013140';			min[5] = 288;		//+ Biuro Zapasowe dla Domu Maklerskiego BZWBK
zlec[6] = '012360';			min[6] = 144;		//+ Tadmar - kolokacja szaf serwerowych
zlec[7] = '010990';			min[7] = 792;		//+ Skoda Auto Polska Umowa 01/06/SAP - serwis i monitoring sieci VPN
zlec[8] = '018534';			min[8] = 3996;		//Monitoring infrastruktury IT TALEX
zlec[9] = '019266-001';		min[9] = 468;		//Monitoring sieci WAN UDT
//---------------------------
//Koniec danych wejsciowych, dalej nie grzebac :)
//---------------------------




var czas = new Date();
var x = 0;
M=M-1;
//alert(dni.length);
for(var i=0; i<dni.length; i++)
{
	dzien = dni[i].substring(0,2);
	if(dni[i].length == 14)
	{
		godzina1 = dni[i].substring(3,5);
		minuta1 = dni[i].substring(6,8);
		godzina2 = dni[i].substring(9,11);
		minuta2 = dni[i].substring(12,14);
	}
	else
	{
		var val;
		val = dni[i].substring(3,4);
		if(val == "1") {godzina1 = "06"; minuta1 = "00"; godzina2 = "14"; minuta2 = "00";}
		if(val == "2") {godzina1 = "14"; minuta1 = "00"; godzina2 = "22"; minuta2 = "00";}
		if(val == "3") {godzina1 = "22"; minuta1 = "00"; godzina2 = "06"; minuta2 = "00";}
	}
	if(godzina1 < godzina2)
	{
		d1[i+x] = new Date(Y,M,dzien,godzina1,minuta1,0);
		d2[i+x] = new Date(Y,M,dzien,godzina2,minuta2,0);
	}
	else
	{
		x++;
		d1[i+x-1] = new Date(Y,M,dzien,godzina1,minuta1,0);
		d2[i+x-1] = new Date(Y,M,dzien,23,59,0);
		d1[i+x] = new Date(Y,M,dzien -1 +2,0,0,0);
		d2[i+x] = new Date(Y,M,dzien -1 +2,godzina2,minuta2-1 +2,0);
	}
}


function run_once()	//zeruje godziny w/g tabeli. 
{
	czas = d1[0];
	czas_storage = String(czas.getTime());
	GM_setValue('czas_sys',czas_storage);
	
	for(var d=0; d<zlec.length; d++)
	{
		var temp = min[d];
		GM_setValue(zlec[d],temp);
	}
//	GM_setValue
}

if (GM_getValue("Month_M") != M)
{
	alert("Nowy miesiac/Restart skryptu. Godziny sa naliczane od pierwszego dnia w tabeli danych wejsciowych.");
	run_once();
}



czas.setTime(GM_getValue('czas_sys'));
//alert(czas);
//alert(GM_getValue('017402-002'));
var czas_old = czas;


header = document.childNodes[0].childNodes[1].childNodes[23].wrappedJSObject.childNodes[0].nodeValue;
if(header.charAt(17) == " ")
{header = header.substring(11,17);}
else
{header = header.substring(11,21);}

var z=0;
var data_txt;
var begin_txt;
var end_txt;
var k_temp;
var j_temp;

document.getElementsByName('cal')[0].style.visibility="hidden";//usuwa kalendarz

for(var k=0; k<zlec.length; k++)
{
	if(zlec[k] == header)
	{
		var found = false;
		var j=0;
		while(!found && j<d1.length)
//		for(var j=0; j<d1.length; j++) //sprawdzamy gdzie jest nasz przedział czasu
		{	
			//alert("J="+j);
			if(d1[j] <= czas && czas <= d2[j])
			{
				//alert("j="+j);
				found = true;
				var min_do_konca_zmiany = ((d2[j] - czas)/60000);
				var min_w_zlec = GM_getValue(zlec[k])*1;
				//alert("min_w_zlec:"+min_w_zlec);
				if(min_do_konca_zmiany >= min_w_zlec) //jeżeli do końca zmiany jest więcej minut niż w zleceniu
				{
					//alert("A");
					begin_txt = get_t(czas_old);
					data_txt = get_d(czas);
					czas.setMinutes(czas.getMinutes() + min_w_zlec);
					//alert("czasA:"+czas);
					end_txt = get_t(czas);
					
					if(GM_getValue(zlec[k])!=0)
					{
						modifyPage();
						k_temp = k;
						//j_temp = j;
						x = document.getElementsByName('add')[0];
						document.addEventListener('click', function(event)
						{
							if(event.target == x)
							{
								GM_setValue(zlec[k_temp],0);	// zapamietaj ile odjales z zlecenia (min_w_zlec)
								czas_stor = String(czas.getTime());
								//alert("czas_stor:"+czas_stor);
								GM_setValue('czas_sys',czas_stor);		// zapamietaj obecny czas systemu
								//alert('odejalem A');
							}
						}, true);
					}
					else //0 godzin do rozpisania.
					{
						hud = document.getElementsByName('add')[0];
						hud_data = document.createTextNode('Do rozpisania pozostalo: 0 h 0 m');
						hud.parentNode.appendChild(hud_data)
					}
				}
				else
				{
					//alert("B");							//dzieli na czesci
					begin_txt = get_t(czas_old);
					data_txt = get_d(czas);
					czas.setMinutes(czas.getMinutes() + min_do_konca_zmiany);
					end_txt = get_t(czas);
					k_temp = k;
					j_temp = j;
					modifyPage();
					document.addEventListener('click', function(event)
					{
						if(event.target == hud)
						{
							
							czas.setMinutes(czas.getMinutes());
							//alert("czasB:"+czas);
							czas = d1[j_temp+1];
							param_stor = String(min_w_zlec - min_do_konca_zmiany);
							
							
							GM_setValue(zlec[k_temp],param_stor); //zapamietaj ile odjales z zlecenia 			(min_do_konca_zmiany)
							
							
							czas_stor = String(czas.getTime());
							//alert("czas_stor:"+czas_stor);
							GM_setValue('czas_sys',czas_stor);		// zapamietaj czas systemu
							//alert("param_stor:"+param_stor);
						}
					}, true);
				}
			}
			j++
		}
	}
}
GM_setValue("Month_M",M);

function modifyPage()
{
	data=document.childNodes[0].childNodes[1].childNodes[25].wrappedJSObject.childNodes[7].childNodes[1].childNodes[2].childNodes[3].childNodes[1].attributes[1].textContent = data_txt;
	opis=document.childNodes[0].childNodes[1].childNodes[25].wrappedJSObject.childNodes[7].childNodes[1].childNodes[4].childNodes[3].childNodes[0].value = "Realizacja postanowien umowy";
	tabela_czas = document.childNodes[0].childNodes[1].childNodes[25].wrappedJSObject.childNodes[9].childNodes[1];
	begin1 = tabela_czas.childNodes[5].childNodes[1].childNodes[0].value = begin_txt;
	end1 = tabela_czas.childNodes[5].childNodes[2].childNodes[0].value = end_txt;
	//begin2 = tabela_czas.childNodes[6].childNodes[1].childNodes[0].value = "czas3";
	//end2 = tabela_czas.childNodes[6].childNodes[2].childNodes[0].value = "czas4";
	var h_m = min_w_zlec;
	hud = document.getElementsByName('add')[0];
	hud.setAttribute('value','Ciach!');
	hud_data = document.createTextNode('Do rozpisania pozostalo: ' + String((h_m-(h_m%60))/60) + " h " + String(h_m%60) + " m");
	hud.parentNode.appendChild(hud_data)
}

function get_d(a)
{
	YYYY = a.getFullYear();
	MM = a.getMonth() + 1;
	if(MM<=9) MM = "0"+MM;
	DD = a.getDate();
	if(DD<=9) DD = "0"+DD;
	return YYYY+"-"+MM+"-"+DD;
}

function get_t(a)
{
	HH = a.getHours();
	if(HH<=9) HH = "0"+HH;
	MM = a.getMinutes();
	if(MM<=9) MM = "0"+MM;
	return HH+":"+MM;
}