// ==UserScript==
// @name           dartsscorekeeper
// @namespace      dartsscorekepper.com
// @include        http://uniscore.unicorn-darts.com/gameon.pl
// @include        http://uniscore.unicorn-darts.com/*play-yourself.pl
// ==/UserScript==

var stevoouttable = new Array();
stevoouttable[2] = "D1";
stevoouttable[3] = "S1, D1";
stevoouttable[4] = "D2";
stevoouttable[5] = "S1, D2";
stevoouttable[6] = "D3";
stevoouttable[7] = "S3, D2";
stevoouttable[8] = "D4";
stevoouttable[9] = "S1, D4";
stevoouttable[10] = "D5";
stevoouttable[11] = "S3, D4";
stevoouttable[12] = "D6";
stevoouttable[13] = "S5, D4";
stevoouttable[14] = "D7";
stevoouttable[15] = "S7, D4";
stevoouttable[16] = "D8";
stevoouttable[17] = "S1, D8";
stevoouttable[18] = "D9";
stevoouttable[19] = "S3, D8";
stevoouttable[20] = "D10";
stevoouttable[21] = "S5, D8";
stevoouttable[22] = "D11";
stevoouttable[23] = "S7, D8";
stevoouttable[24] = "D12";
stevoouttable[25] = "S9, D8";
stevoouttable[26] = "D13";
stevoouttable[27] = "S11, D8";
stevoouttable[28] = "D14";
stevoouttable[29] = "S13, D8";
stevoouttable[30] = "D15";
stevoouttable[31] = "S15, D8";
stevoouttable[32] = "D16";
stevoouttable[33] = "S1, D16";
stevoouttable[34] = "D17";
stevoouttable[35] = "S3, D16";
stevoouttable[36] = "D18";
stevoouttable[37] = "S5, D16";
stevoouttable[38] = "D19";
stevoouttable[39] = "S7, D16";
stevoouttable[40] = "D20";
stevoouttable[41] = "S9,D16";
stevoouttable[42] = "S10,D16";
stevoouttable[43] = "S11,D16";
stevoouttable[44] = "S12,D16";
stevoouttable[45] = "S13,D16";
stevoouttable[46] = "S14,D16";
stevoouttable[47] = "S15,D16";
stevoouttable[48] = "S16,D16";
stevoouttable[49] = "S17,D16";
stevoouttable[50] = "S18,D16";
stevoouttable[51] = "S19,D16";isNaN
stevoouttable[52] = "S20,D16";
stevoouttable[53] = "S13, D20";
stevoouttable[54] = "S14, D20";
stevoouttable[55] = "S15, D20";
stevoouttable[56] = "T16, D4";
stevoouttable[57] = "S17, D20";
stevoouttable[58] = "S18, D20";
stevoouttable[59] = "S19, D20";
stevoouttable[60] = "S20, D20";
stevoouttable[61] = "T15, D8";
stevoouttable[62] = "T10, D16";
stevoouttable[63] = "T13, D12";
stevoouttable[64] = "T16, D8";
stevoouttable[65] = "T19, D4";
stevoouttable[66] = "T14, D12";
stevoouttable[67] = "T17, D8";
stevoouttable[68] = "T20, D4";
stevoouttable[69] = "T19, D6";
stevoouttable[70] = "T18, D8";
stevoouttable[71] = "T13, D16";
stevoouttable[72] = "T16, D12";
stevoouttable[73] = "T19, D8";
stevoouttable[74] = "T14, D16";
stevoouttable[75] = "T17, D12";
stevoouttable[76] = "T20, D8";
stevoouttable[77] = "T15, D16";
stevoouttable[78] = "T18, D12";
stevoouttable[79] = "T13, D20";
stevoouttable[80] = "T20, D10";
stevoouttable[81] = "T19, D12";
stevoouttable[82] = "T14, D20";
stevoouttable[83] = "T17, D16";
stevoouttable[84] = "T20, D12";
stevoouttable[85] = "T15, D20";
stevoouttable[86] = "T18, D16";
stevoouttable[87] = "T17, D18";
stevoouttable[88] = "T16, D20";
stevoouttable[89] = "T19, D16";
stevoouttable[90] = "T20, D15";
stevoouttable[91] = "T17, D20";
stevoouttable[92] = "T20, D16";
stevoouttable[93] = "T19, D18";
stevoouttable[94] = "T18, D20";
stevoouttable[95] = "T19, D19";
stevoouttable[96] = "T20, D18";
stevoouttable[97] = "T19, D20";
stevoouttable[98] = "T20, D19";
stevoouttable[99] = "T19, S10, D16";
stevoouttable[100] = "T20, D20";
stevoouttable[101] = "T17, S10, D20";
stevoouttable[102] = "T20, S10, D16";
stevoouttable[103] = "T17, S12, D20";
stevoouttable[104] = "T20, T12, D4";
stevoouttable[105] = "T19, S8, D20";
stevoouttable[106] = "T20, S6, D20";
stevoouttable[107] = "T20, S15, D16";
stevoouttable[108] = "T19, S19, D16";
stevoouttable[109] = "T20, S9, D20";
stevoouttable[110] = "T20, S10, D20";
stevoouttable[111] = "T19, S14, D20";
stevoouttable[112] = "T20, T12, D8";
stevoouttable[113] = "T19, S16, D20";
stevoouttable[114] = "T20, S14, D20";
stevoouttable[115] = "T19, S18, D20";
stevoouttable[116] = "T20, S16, D20";
stevoouttable[117] = "T20, S17,D20";
stevoouttable[118] = "T20, S18, D20";
stevoouttable[119] = "T19, T12, D13";
stevoouttable[120] = "T20, S20, D20";
stevoouttable[121] = "T20, T11, D14";
stevoouttable[122] = "T18, T18, D7";
stevoouttable[123] = "T19, T14, D12";
stevoouttable[124] = "T20, T16, D8";
stevoouttable[125] = "T18, T13, D16";
stevoouttable[126] = "T19, T15, D12";
stevoouttable[127] = "T20, T17, D8";
stevoouttable[128] = "T18, T14, D16";
stevoouttable[129] = "T19, T16, D12";
stevoouttable[130] = "T20, T18, D8";
stevoouttable[131] = "T20, T13, D16";
stevoouttable[132] = "T20, T16, D12";
stevoouttable[133] = "T20, T19, D8";
stevoouttable[134] = "T20, T14, D16";
stevoouttable[135] = "T20, T17, D12";
stevoouttable[136] = "T20, T20, D8";
stevoouttable[137] = "T20, T19, D10";
stevoouttable[138] = "T20, T18, D12";
stevoouttable[139] = "T19, T14, D20";
stevoouttable[140] = "T20, T20, D10";
stevoouttable[141] = "T20, T19, D12";
stevoouttable[142] = "T20, T14, D20";
stevoouttable[143] = "T19, T18, D16";
stevoouttable[144] = "T20, T20, D12";
stevoouttable[145] = "T20, T19, D14";
stevoouttable[146] = "T20, T18, D16";
stevoouttable[147] = "T20, T17, D18";
stevoouttable[148] = "T20, T20, D14";
stevoouttable[149] = "T20, T19, D16";
stevoouttable[150] = "T20, T18, D18";
stevoouttable[151] = "T20, T17, D20";
stevoouttable[152] = "T20, T20, D16";
stevoouttable[153] = "T20, T19, D18";
stevoouttable[154] = "T20, T18, D20";
stevoouttable[155] = "T20, T19, D19";
stevoouttable[156] = "T20, T20, D18";
stevoouttable[157] = "T20, T19, D20";
stevoouttable[158] = "T20, T20, D19";
stevoouttable[160] = "T20, T20, D20";
stevoouttable[161] = "T20, T17, DB";
stevoouttable[164] = "T20, T18, DB";
stevoouttable[167] = "T20, T19, DB";
stevoouttable[170] = "T20, T20, DB";

var scheissueberschrift = document.getElementsByTagName('h3')[2].innerHTML;

if ((scheissueberschrift == "Bust!") 
 || (scheissueberschrift == "BOT wins leg 1") 
 || (scheissueberschrift.substr(0,7) == "<blink>") 
 || (scheissueberschrift.substr(0,16) == "You cannot score")) {
	zwoa = 3;
}else {
	zwoa = 2;
}

var player1score = parseInt(document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
	.textContent);
var player2score = parseInt(document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
	.textContent);


var actualplayername = document.getElementsByTagName('h3')[zwoa].getElementsByTagName('span')[0].textContent;
var player1name = document.getElementsByClassName('firstplayer')[0].textContent;



// versuch, die tabelle vo dem leg auszuwerten
var i = 1; var p1legscore = 0;var p2legscore = 0;var p1i = 1;var p2i = 1;
while (document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i]) {
var scooore1 = document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0]
	.textContent;
var scooore2 = document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1]
	.textContent;
if (scooore1 == 'No score') { scooore1 = 0;}
if (scooore2 == 'No score') { scooore2 = 0;}
if (scooore1 == '') { p1i = 0;scooore1 = 0;}
if (scooore2 == '') { p2i = 0;scooore2 = 0;;}

	p1legscore = (p1legscore + parseInt(scooore1));
	p2legscore = (p2legscore + parseInt(scooore2));
	i = (i + 1);
}



var p1legschnitt = (Math.round((p1legscore / (i - p1i)) * 1) / 1); //*10/10=1 kommastelle
var p2legschnitt = (Math.round((p2legscore / (i - p2i)) * 1) / 1);


document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
	.innerHTML += "<span style='font-size:14pt;'> ("+p1legschnitt+")</span>";
document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
	.innerHTML += "<span style='font-size:14pt;'> ("+p2legschnitt+")</span>";


// ende



function stevocalculate(nr) {
	var a = document.getElementById('stevoinput1').value;
	var b = document.getElementById('stevoinput2').value;
	var c = document.getElementById('stevoinput3').value;
	
	if (a != '') {
		a = parseInt(a);
	}else {
		a = 0;
	}
	if (b != '') {
		b = parseInt(b);
	}else {
		b = 0;
	}
	if (c != '') {
		c = parseInt(c);
	}else {
		c = 0;
	}
	var summestevo = (a+b+c);
	
	if (actualplayername == player1name) {
		var scorestevo = (player1score - (a+b+c));
		document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
		.textContent = scorestevo;
		document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
		.style.color = "#00C000";
	}else {
		var scorestevo = (player2score - (a+b+c));
		document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
		.textContent = scorestevo;
		document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
		.style.color = "#00C000";
	}
	
	document.getElementById('score_it').value = summestevo;
	
	if (document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0]) {	
		document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0].textContent = stevoouttable[scorestevo];
	}
	
	if (nr == 1) {
		window.setTimeout(fokusnextstevo1, 2500);
	}else if (nr == 2) {
		window.setTimeout(fokusnextstevo2, 2500);
	}else if (nr == 3) {
		window.setTimeout(fokusnextstevo3, 2500);
	}
}

function fokusnextstevo1() {
	document.getElementById('stevoinput2').focus();
}
function fokusnextstevo2() {
	document.getElementById('stevoinput3').focus();
}
function fokusnextstevo3() {
	//document.getElementById('stevoinput1').focus();
}

if (document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0]) {	
	var checkouttext = document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0].textContent;
	document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0].style.fontSize = "22pt";
	document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0].textContent = checkouttext.substring(9);
}

if (actualplayername == player1name) {
	document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
	.style.color = "#666";
	document.getElementsByTagName('h3')[zwoa].getElementsByTagName('span')[0].style.color = "blue";
}else {
	document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
	.style.color = "#666";
	document.getElementsByTagName('h3')[zwoa].getElementsByTagName('span')[0].style.color = "red";
}

document.getElementById('header').style.display = "none";

document.getElementsByTagName('h3')[zwoa].getElementsByTagName('span')[0].style.fontSize = "30px";
document.getElementsByTagName('h3')[zwoa].style.paddingTop = "0px";
document.getElementsByClassName('score_it')[0].style.marginTop = "0px";

document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].style.height = "16px";
document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].style.textAlign = "center";
//document.getElementsByClassName('score_it')[0].getElementsByTagName('h1')[0].style.fontSize = "20pt";

document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].style.fontSize = "26pt";
document.getElementsByClassName('score_it')[0].getElementsByTagName('table')[2].style.marginTop = "0px";

document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[0].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[1].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[2].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[3].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[4].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[5].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[6].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[7].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[8].style.fontSize = "14pt";
document.getElementsByClassName('match_summary')[0].getElementsByTagName("td")[9].style.fontSize = "14pt";



var foorm  = document.createElement('div');
var input1 = document.createElement('input');
var input2 = document.createElement('input');
var input3 = document.createElement('input');

foorm.style.width = "32px";
foorm.style.marginTop = "-63px"

input1.style.width = "30px";
input2.style.width = "30px";
input3.style.width = "30px";

input1.style.display = "block";
input2.style.display = "block";
input3.style.display = "block";

input1.setAttribute('autocomplete', 'off');
input2.setAttribute('autocomplete', 'off');
input3.setAttribute('autocomplete', 'off');

input1.style.margin = "2px";
input2.style.margin = "2px";
input3.style.margin = "2px";

input1.style.fontSize = "8pt";
input2.style.fontSize = "8pt";
input3.style.fontSize = "8pt";

input1.style.height = "10pt";
input2.style.height = "10pt";
input3.style.height = "10pt";

input1.style.paddingTop = "1px";
input2.style.paddingTop = "1px";
input3.style.paddingTop = "1px";

input1.style.textAlign = "center";
input2.style.textAlign = "center";
input3.style.textAlign = "center";

input1.id = "stevoinput1";
input2.id = "stevoinput2";
input3.id = "stevoinput3";

foorm.appendChild(input1);
foorm.appendChild(input2);
foorm.appendChild(input3);

document.getElementsByClassName('score_it')[0].getElementsByTagName('form')[0].appendChild(foorm);

document.getElementById('stevoinput1').addEventListener('keyup', function(){ stevocalculate(1); return true; }, true);
document.getElementById('stevoinput2').addEventListener('keyup', function(){ stevocalculate(2); return true; }, true);
document.getElementById('stevoinput3').addEventListener('keyup', function(){ stevocalculate(3); return true; }, true);

document.getElementById('stevoinput1').focus();
