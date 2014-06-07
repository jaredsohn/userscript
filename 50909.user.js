// ==UserScript==
// @name           gw_konstruktion
// @namespace      galaxywars
// @include        *galaxywars.de/konst*
// ==/UserScript==



function resOhnePunkt(ress) {

	if (ress.length > 4) {
		if (ress.length < 8) { //12.000.124
			var res0 = ress.substring(0, ress.length - 4);
			var res1 = ress.substring(ress.length - 3, ress.length);
			return (res0 + res1);
		}else {
			var res0 = ress.substring(0, ress.length - 4);
			var res1 = ress.substring(ress.length - 7, ress.length - 5);
			var res2 = ress.substring(ress.length - 3, ress.length);
			return (res0 + res1 + res2);
		}
	}else {return ress;}
	
}


var eisen 		= resOhnePunkt(document.getElementById('res1').textContent);
var lutinum 	= resOhnePunkt(document.getElementById('res2').textContent);
var wasser 		= resOhnePunkt(document.getElementById('res3').textContent);
var wasserstoff = resOhnePunkt(document.getElementById('res4').textContent);


var leng = document.getElementsByClassName('a').length;
var arrayname = new Array();
var arraynumb = new Array();

var arrayreis = new Array(10,26,42,66,98,138,194,258,330,410,498,602,714,834,962,1098,1250,1410,1578,1754,1938,2138,2346,2562,2786,3018,3266,3522,3786,4058,4338,4634,4938,5250,5570,5898,6242,6594,6954,7322,7698,8090,8490,8898,9314,9738,10178,10626,11082,11546,12018);
var arrayrlut = new Array(10,20,30,45,65,90,125,165,210,260,315,380,450,525,605,690,785,885,990,1100,1215,1340,1470,1605,1745,1890,2045,2205,2370,2540,2715,2900,3090,3285,3485,3690,3905,4125,4350,4580,4815,5060,5310,5565,5825,6090,6365,6645,6930,7220,7515);
var arrayrwas = new Array(10,30,50,80,120,170,240,320,410,510,620,750,890,1040,1200,1370,1560,1760,1970,2190,2420,2670,2930,3200,3480,3770,4080,4400,4730,5070,5420,5790,6170,6560,6960,7370,7800,8240,8690,9150,9650,10110,10610,11120,11640,12170,12720,13280,13850,14430,15020);
var arrayrwst = new Array(0,4,8,14,22,32,46,62,80,100,122,148,176,206,238,272,310,350,392,436,482,532,584,638,694,752,814,878,944,1012,1082,1156,1232,1310,1390,1472,1558,1646,1736,1828,1922,2020,2120,2222,2326,2432,2542,2654,2768,2884,3002);
var arrayrerw = new Array(0,50,100,175,275,400,575,775,1000,1250,1525,1850,2200,2575,2975,3400,3875,4375,4900,5450,6025,6650,7300,7975,8675,9400,10175,10975,11800,12650,13525,14450,15400,16375,17375,18400,19475,20575,21700,22850,24025,25250,26500,27775,29075,30400,31775,33175,34600,36050,37525);


var i = 0;
while (i < (leng)) {
	gtext = document.getElementsByClassName('a')[i].getElementsByTagName('a')[0].textContent;
	if (gtext.substring(gtext.length - 1,gtext.length) != ")") {
		gtext += " (Stufe 0)";
		document.getElementsByClassName('a')[i].getElementsByTagName('a')[0].textContent += " (Stufe 0)";
	}
	gname  = gtext.substring(0,gtext.length - 10);
	if (gtext.substring(gtext.length - 3,gtext.length - 2) != " ") {
		gnumma = gtext.substring(gtext.length - 3,gtext.length - 1);
	}else {
		gnumma = gtext.substring(gtext.length - 2,gtext.length - 1);
	}
	if (gname.substring(gname.length - 1, gname.length) == " ") {
		gname = gname.substring(0, gname.length - 1);
	}
	arrayname.push(gname);
	arraynumb.push(gnumma);
		
	i = (i + 1);
}

var eisenH        = arrayreis[arraynumb[2]];
var lutinumH      = arrayrlut[arraynumb[3]];
var wasserH       = (arrayrwas[arraynumb[4]] - (arrayrwst[arraynumb[5]] * 5));
var chemiefabrikH = arrayrwst[arraynumb[5]];

if (document.getElementsByClassName('a')[6].getElementsByTagName('a')[0].textContent.substring(0,6) == "Erweit") {
 var erweiterteH   = arrayrerw[arraynumb[6]];
 var wasserstoffH  = (chemiefabrikH + erweiterteH);
}else {wasserstoffH  = (chemiefabrikH);}

document.getElementsByClassName('a')[2].getElementsByTagName('a')[0].textContent = "Eisenmine (Stufe "+arraynumb[2]+" - "+eisenH + " /h)";
document.getElementsByClassName('a')[3].getElementsByTagName('a')[0].textContent = "Lutinumraffinerie (Stufe "+arraynumb[3]+" - "+lutinumH + " /h)";
document.getElementsByClassName('a')[4].getElementsByTagName('a')[0].textContent = "Bohrturm (Stufe "+arraynumb[4]+" - "+wasserH + " /h)";
document.getElementsByClassName('a')[5].getElementsByTagName('a')[0].textContent = "Chemiefabrik (Stufe "+arraynumb[5]+" - "+chemiefabrikH + " /h)";
if (document.getElementsByClassName('a')[6].getElementsByTagName('a')[0].textContent.substring(0,6) == "Erweit") {
 document.getElementsByClassName('a')[6].getElementsByTagName('a')[0].textContent = "Erweiterte Chemiefabrik (Stufe "+arraynumb[6]+" - "+erweiterteH + " /h)";
}


var i = 0;
while (i < (leng)) {
	var tmp = document.getElementsByClassName('a')[i].innerHTML
	if(tmp.indexOf("Eisen: <b>") != -1){
		var pos1 = tmp.indexOf("Eisen: <b>");
		var tmp1 = tmp.substring((pos1 + 10),(pos1 + 20));
		var pos2 = tmp1.indexOf("</b>"); 
		var ress = tmp1.substring(0,(pos2));
		var pEisen = resOhnePunkt(ress);
		
		if (parseInt(pEisen) > parseInt(eisen)) {
			var dauerA = (Math.round(100*((parseInt(pEisen) - parseInt(eisen)) / parseInt(eisenH)))/100);
		}else {var dauerA = 0;}
	}else {var dauerA = 0;}
	
	if(tmp.indexOf("Lutinum: <b>") != -1){
		var pos1 = tmp.indexOf("Lutinum: <b>");
		var tmp1 = tmp.substring((pos1 + 12),(pos1 + 22));
		var pos2 = tmp1.indexOf("</b>"); 
		var ress = tmp1.substring(0,(pos2));
		var pRes = resOhnePunkt(ress);
		
		if (parseInt(pRes) > parseInt(lutinum)) {
			var dauerB = (Math.round(100*((parseInt(pRes) - parseInt(lutinum)) / parseInt(lutinumH)))/100);
		}else {var dauerB = 0;}
	}else {var dauerB = 0;}
	
	if(tmp.indexOf("Wasser: <b>") != -1){
		var pos1 = tmp.indexOf("Wasser: <b>");
		var tmp1 = tmp.substring((pos1 + 11),(pos1 + 21));
		var pos2 = tmp1.indexOf("</b>"); 
		var ress = tmp1.substring(0,(pos2));
		var pRes = resOhnePunkt(ress);
		
		if (parseInt(pRes) > parseInt(wasser)) {
			var dauerC = (Math.round(100*((parseInt(pRes) - parseInt(wasser)) / parseInt(wasserH)))/100);
		}else {var dauerC = 0;}
	}else {var dauerC = 0;}
	
	if(tmp.indexOf("Wasserstoff: <b>") != -1){
		var pos1 = tmp.indexOf("Wasserstoff: <b>");
		var tmp1 = tmp.substring((pos1 + 16),(pos1 + 26));
		var pos2 = tmp1.indexOf("</b>"); 
		var ress = tmp1.substring(0,(pos2));
		var pRes = resOhnePunkt(ress);
		
		if (parseInt(pRes) > parseInt(wasserstoff)) {
			var dauerD = (Math.round(100*((parseInt(pRes) - parseInt(wasserstoff)) / parseInt(wasserstoffH)))/100);
		}else {var dauerD = 0;}
	}else {var dauerD = 0;}
	
	var dauer = Math.max(dauerA, dauerB, dauerC, dauerD);
	
	document.getElementsByClassName('a')[i].title = "Baufähig in " + dauer + " stunden";
	var divT = document.createElement('div');
	divT.style.fontSize = "10pt";
	divT.style.display = "inline";
	divT.style.fontFamily = "tahoma";
	divT.textContent = " " + Math.round(dauer)+ " h";
	divT.style.color = "#cccccc";
	//if (dauer < 2) {
	//divT.style.color = "#44cc44";
	//}else {
	//divT.style.color = "#994444";
	//}
	divT.style.position = "absolute";
	divT.style.left = "380px"
	//divT.style.bottom = "50px";
	divT.style.width = "50px";
	divT.style.textAlign = "right";
	document.getElementsByClassName('a')[i].getElementsByTagName('a')[0].appendChild(divT);
	i = (i + 1);
}



var i = 0;
while (document.getElementsByClassName('negative').length > i) {
	document.getElementsByClassName('negative')[i].style.color = "#900";
	i = i + 1;
}

var foorm = document.createElement('form');
foorm.action = 'http://stevo.saxn.at/gw/index.php?updatekonst=1';
foorm.method = 'post';
foorm.style.position = "absolute";
foorm.style.left = "0px";
foorm.style.top = "0px";

var i = 0;
while (arrayname.length > i) {
	var inputt = document.createElement('input');
	inputt.name = i;
	inputt.value = arrayname[i];
	inputt.type = "hidden";
	foorm.appendChild(inputt);
	
	i = (i + 1);
}
var iminus = i;
var anumb = (arraynumb.length * 2);
while (anumb > i) {
	var inputt = document.createElement('input');
	inputt.name = i;
	inputt.value = arraynumb[(i - iminus)];
	inputt.type = "hidden";
	foorm.appendChild(inputt);
	i = (i + 1);
}

var submitter = document.createElement('input');
submitter.type = "submit";
submitter.style.height = "20px";
submitter.style.padding = "0 0 0 0";
submitter.style.fontSize = "8pt";
submitter.style.fontFamily = "arial";
foorm.appendChild(submitter);
document.body.appendChild(foorm);











