// ==UserScript==
// @name           Airline Manager Rota Analizi
// @namespace      Batis @ Ek$i Sözlük
// @include        http://apps.facebook.com/airline_manager/route3.php*
// @include        http://apps.facebook.com/airline_manager/route2.php*
// ==/UserScript==

function $(id){return document.getElementById(id);}

function degis(girdi)
{
	girdi = girdi.replace(/$/gi,'');
	girdi = girdi.replace(/<td>/g,'');
	girdi = girdi.replace(/<\/td>/g, ' ');
	girdi = girdi.replace(/<font color=\"darkgreen\">/g,'');
	girdi = girdi.replace(/<font color=\"darkred\">/g,'');
	girdi = girdi.replace(/<b>/g,'');
	girdi = girdi.replace(/,/g,'');
	girdi = girdi.replace(/<\/b>/g,'');
	girdi = girdi.replace(/<\/font>/g,'');
return girdi;
}

function arama(girdi)
{
window.find(girdi);
var x = window.getSelection();
x = x.anchorNode.parentNode.parentNode.parentNode;
x = degis(x.innerHTML);
return x;
}

var veri = arama('%');
veri = veri.split(' ');

var ucak = new Array(100);
for (var i =0; i <100; i++)
{
ucak[i] = new Array(3);
}
// Cessna 172
ucak[1][0]=3;
ucak[1][1]=226;
ucak[1][2]=1;
ucak[1][3]='Cessna 172';

// Embraer 600
ucak[2][0]=13;
ucak[2][1]=834;
ucak[2][2]=4;
ucak[2][3]='Embraer 600';

// Challenger
ucak[3][0]=16;
ucak[3][1]=851;
ucak[3][2]=4;
ucak[3][3]='Challenger';

// ATR 42
ucak[4][0]=50;
ucak[4][1]=556;
ucak[4][2]=8;
ucak[4][3]='ATR 42';

// ATR 72
ucak[5][0]=64;
ucak[5][1]=507;
ucak[5][2]=7;
ucak[5][3]='Cessna 172';

// CRJ 200
ucak[6][0]=50;
ucak[6][1]=810;
ucak[6][2]=5;
ucak[6][3]='CRJ 200';

// Q400
ucak[7][0]=70;
ucak[7][1]=667;
ucak[7][2]=7;
ucak[7][3]='Q400';

// BAe146
ucak[8][0]=85;
ucak[8][1]=750;
ucak[8][2]=8;
ucak[8][3]='BAe146';

// ERJ 190
ucak[9][0]=110;
ucak[9][1]=845;
ucak[9][2]=8;
ucak[9][3]='ERJ 190';

// Superjet 100-95
ucak[10][0]=98;
ucak[10][1]=815;
ucak[10][2]=7;
ucak[10][3]='Superjet 100-95';

// MD80
ucak[11][0]=130;
ucak[11][1]=811;
ucak[11][2]=14;
ucak[11][3]='MD80';

// A319-200
ucak[12][0]=117;
ucak[12][1]=780;
ucak[12][2]=6;
ucak[12][3]='A319-200';

// A320-200
ucak[13][0]=164;
ucak[13][1]=823;
ucak[13][2]=9;
ucak[13][3]='A320-200';

// B737-800
ucak[14][0]=135;
ucak[14][1]=780;
ucak[14][2]=8;
ucak[14][3]='B737-800';

// Tupolev 154
ucak[15][0]=180;
ucak[15][1]=950;
ucak[15][2]=14;
ucak[15][3]='Tupolev 154';

// B727-200
ucak[16][0]=189;
ucak[16][1]=953;
ucak[16][2]=13;
ucak[16][3]='B727-200';

// B757-200
ucak[17][0]=200;
ucak[17][1]=850;
ucak[17][2]=10;
ucak[17][3]='B757-200';

// A321-200
ucak[18][0]=220;
ucak[18][1]=780;
ucak[18][2]=10;
ucak[18][3]='A321-200';

// B767-200ER
ucak[19][0]=224;
ucak[19][1]=913;
ucak[19][2]=14;
ucak[19][3]='B767-200ER';

// B787-800
ucak[20][0]=250;
ucak[20][1]=903;
ucak[20][2]=14;
ucak[20][3]='B787-800';

// A330-300
ucak[21][0]=335;
ucak[21][1]=871;
ucak[21][2]=16;
ucak[21][3]='A330-300';

// B777-200LR
ucak[22][0]=300;
ucak[22][1]=905;
ucak[22][2]=17;
ucak[22][3]='B777-200LR';

// A340-300
ucak[23][0]=335;
ucak[23][1]=896;
ucak[23][2]=18;
ucak[23][3]='A340-300';

// MD11
ucak[24][0]=410;
ucak[24][1]=876;
ucak[24][2]=22;
ucak[24][3]='MD11';

// A340-600
ucak[25][0]=380;
ucak[25][1]=907;
ucak[25][2]=20;
ucak[25][3]='A340-600';

// A350-900
ucak[26][0]=314;
ucak[26][1]=945;
ucak[26][2]=15;
ucak[26][3]='A350-900';

// B747-400
ucak[27][0]=416;
ucak[27][1]=893;
ucak[27][2]=19;
ucak[27][3]='B747-400';

// A380-800
ucak[28][0]=644;
ucak[28][1]=945;
ucak[28][2]=19;
ucak[28][3]='A380-800';

// Concorde
ucak[29][0]=120;
ucak[29][1]=2124;
ucak[29][2]=35;
ucak[29][3]='Concorde';

function ucaklar()
{
	i = this.options[this.selectedIndex].value;
	GM_setValue('i', i);
	hesap(i);
}

function hesap(i)
{
	var sure = parseInt((veri[3]/ucak[i][1])*60);
	var dolukoltuk = parseInt((ucak[i][0]/100)*veri[11]);
	var gelir = parseInt(veri[6]*dolukoltuk);
	var yakit = parseInt(veri[3]*ucak[i][2]);
	var masraf = parseInt(veri[8])+parseInt(veri[10])+parseInt((yakit*0.4));
	var yakitmasrafi = parseInt((yakit*0.4));
	var netkar = parseInt(gelir-masraf);
	
	$('seciliucak').innerHTML=ucak[i][3];
	$('sure').innerHTML=sure;
	$('dolukoltuk').innerHTML=dolukoltuk;
	$('gelir').innerHTML=gelir;
	$('yakit').innerHTML=yakit;
	$('masraf').innerHTML=masraf;
	$('yakitmasrafi').innerHTML=yakitmasrafi;
	$('netkar').innerHTML=netkar;	
}


function maximum()
{
	var minsure = new Array(30);
	var maxdolukoltuk = new Array(30);
	var maxgelir = new Array(30);
	var maxyakit = new Array(30);
	var maxmasraf = new Array(30);
	var maxyakitmasrafi = new Array(30);
	var maxnetkar = new Array(30);
	for (var i=0;i<30;i++)
	{
		minsure[i] = parseInt((veri[3]/ucak[i][1])*60);
		maxdolukoltuk[i] = parseInt((ucak[i][0]/100)*veri[11]);
		maxgelir[i] = parseInt(veri[6]*maxdolukoltuk[i]);
		maxyakit[i] = parseInt(veri[3]*ucak[i][2]);
		maxyakitmasrafi[i] = parseInt(maxyakit[i]*0.4);
		maxmasraf[i] = parseInt(veri[8])+parseInt(veri[10])+parseInt((maxyakit[i]*0.4));
		maxnetkar[i] = parseInt(maxgelir[i]-maxmasraf[i]);
	}
	function srchMaxV(v) {
		var maxV = 0; 
		for (i=0; i<v.length; i++) { 
			if (v[i] > maxV) { maxV = v[i]; maxI = i; }
  			}
 		return [maxV,maxI];
		} 
	function srchMinV(v) {
		var minV = parseInt(v[1]);
		for (i=0; i<v.length; i++) { 
			if (v[i] < minV) { minV = v[i]; minI = i;}
  			}
 		return [minV,minI];
		} 
	$('minsure').innerHTML=ucak[srchMinV(minsure)[1]][3] + ' - ' + srchMinV(minsure)[0];
	$('maxdolukoltuk').innerHTML=ucak[srchMaxV(maxdolukoltuk)[1]][3] + ' - ' + srchMaxV(maxdolukoltuk)[0];
	$('maxgelir').innerHTML=ucak[srchMaxV(maxgelir)[1]][3] + ' - ' + srchMaxV(maxgelir)[0];
	$('maxmasraf').innerHTML=ucak[srchMinV(maxmasraf)[1]][3] + ' - ' + srchMinV(maxmasraf)[0];
	$('maxnetkar').innerHTML=ucak[srchMaxV(maxnetkar)[1]][3] + ' - ' + srchMaxV(maxnetkar)[0];
	$('maxyakitmasrafi').innerHTML=ucak[srchMinV(maxyakitmasrafi)[1]][3] + ' - ' + srchMinV(maxyakitmasrafi)[0];
	$('maxyakit').innerHTML=ucak[srchMinV(maxyakit)[1]][3] + ' - ' + srchMinV(maxyakit)[0];
}

var app93673891404_ftime = $('app93673891404_ftime');
app93673891404_ftime.innerHTML='';
app93673891404_ftime.innerHTML ='<select id=\'seculan\'><option>Uçaginizi Seçin!<\/option><option value=1>Cessna 172<\/option><option value=2>Embraer 600<\/option><option value=3>Challenger<\/option><option value=4>ATR 42<\/option><option value=5>ATR 72<\/option><option value=6>CRJ 200<\/option><option value=7>Q400<\/option><option value=8>BAe146<\/option><option value=9>ERJ 190<\/option><option value=10>Superjet 100-95<\/option><option value=11>MD80<\/option><option value=12>A319-200<\/option><option value=13>A320-200<\/option><option value=14>B737-800<\/option><option value=15>Tupolev 154<\/option><option value=16>B727-200<\/option><option value=17>B757-200<\/option><option value=18>A321-200<\/option><option value=19>B767-200ER<\/option><option value=20>B787-800<\/option><option value=21>A330-300<\/option><option value=22>B777-200LR<\/option><option value=23>A340-300<\/option><option value=24>MD11<\/option><option value=25>A340-600<\/option><option value=26>A350-900<\/option><option value=27>B747-400<\/option><option value=28>A380-800<\/option><option value=29>Concorde<\/option><\/select><div align=left><b>Seçili Uçak:<\/b><div id=seciliucak><\/div><b>Süre(dakika):<\/b><div id=sure><\/div><b>Dolu Koltuk:<\/b><div id=dolukoltuk><\/div><b>Toplam Gelir:<\/b><div id=gelir><\/div><b>Toplam Masraf:<\/b><div id=masraf><\/div><b>Net Kar:<\/b><div id=netkar><\/div><b>Harcanan Yakit (LBS):<\/b><div id=yakit><\/div><b>Harcanan Yakit (USD)<\/b><div id=yakitmasrafi><\/div><b><hr>Min. Süre(dakika):<\/b><div id=minsure><\/div><b>Maks. Dolu Koltuk:<\/b><div id=maxdolukoltuk><\/div><b>Maks. Gelir:<\/b><div id=maxgelir><\/div><b>Maks. Masraf:<\/b><div id=maxmasraf><\/div><b>Maks. Net Kar:<\/b><div id=maxnetkar><\/div><b>Min. Harc. Yakit (LBS)<\/b><div id=maxyakit><\/div><b>Min. Harc. Yakit (USD)<\/b><div id=maxyakitmasrafi><\/div><\/div>';

if (GM_getValue != null)
{
	hesap(GM_getValue('i'));
}

var degisme = $('seculan');
degisme.addEventListener('change', ucaklar, false);
window.addEventListener('load', maximum, false);