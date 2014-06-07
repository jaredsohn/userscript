// ==UserScript==
// @name           UP Lakan GM
// @namespace      Ben.Sarmiento
// @include        http://www.smsflick.com/*
// ==/UserScript==

var gas_museum;
var sity;

if (GM_getValue('batch_n') == 'tapoz_na_fowh') {
	alert('Tapoz!');
	clearMem();
} else if (GM_getValue('group_n','jejemon 4ever') != 'jejemon 4ever' && GM_getValue('batch_n','jejemon 4ever') != 'jejemon 4ever') {
	sity = GM_getValue('group_n');
	gas_museum = GM_getValue('batch_n');
	sendMesg(sity);
} else {
	gas_museum = 0;
}

var container = document.createElement('div');

var headt = document.createElement('b');
headt.innerHTML = 'Lakan GMikz f0hwZ';
container.appendChild(headt);

container.appendChild(document.createElement('br'));

var button = document.createElement('button');
button.innerHTML = 'Send 2 Lakan';
button.addEventListener('click', function(){ sendMesg(0); }, false);
container.appendChild(button);

container.appendChild(document.createElement('br'));

var headt = document.createElement('b');
headt.innerHTML = 'Lakan Kommitteaz';
container.appendChild(headt);

container.appendChild(document.createElement('br'));

var exebutton = document.createElement('button');
exebutton.innerHTML = 'Send 2 Execom';
exebutton.addEventListener('click', function(){ sendMesg(1); }, false);
container.appendChild(exebutton);

container.appendChild(document.createElement('br'));

var clr_button = document.createElement('button');
clr_button.innerHTML = 'Clear memory';
clr_button.addEventListener('click', clearMem, false);
container.appendChild(clr_button);

mergeContainer();

//document.getElementsByTagName('button')[0].onClick=function(){ soonAlert(); }

function mergeContainer() {
	document.getElementById("frm_sms").parentNode.insertBefore(container, document.getElementById("frm_sms"));
}

function sendMesg(i) {
	if (document.getElementsByTagName('textarea')[0].value == '' && GM_getValue('txtmsg','jejemon 4ever')=='jejemon 4ever') {
		alert('Puta walang msg');
	} else {
		if (document.getElementsByTagName('textarea')[0].value == '' && GM_getValue('txtmsg','jejemon 4ever')!='jejemon 4ever') {
			document.getElementsByTagName('textarea')[0].value = GM_getValue('txtmsg');
		} else {
			GM_setValue('txtmsg',document.getElementsByTagName('textarea')[0].value);
		}
	
		var smsform = document.getElementById("frm_sms");
		
		sendGrp(i,gas_museum);
		smsform.submit();
	}
}

function clearMem() {
	GM_setValue('txtmsg','jejemon 4ever');
	GM_setValue('group_n','jejemon 4ever');
	GM_setValue('batch_n','jejemon 4ever');
}

function soonAlert() {
	alert('Feature coming soon f0hWz! Ajejeje!');
}

function sendGrp(i,j) {
	GM_setValue('group_n',i);
	GM_setValue('batch_n',j+1);
	if (i==0)
		switch (j)
		{
			case 0://Marlon,Martin,Ben,,
				document.getElementsByName('f_phone')[0].value = '+639157665053;+639062829252;+639274034064;+639062575055;+639276259619;';
				break;
			case 1://Jesa,Miguel,,,Shamir
				document.getElementsByName('f_phone')[0].value = '+639275202837;+639155121817;+639086455791;+639167955151;+639151751202;';
				break;
			case 2://Adi,Zarlon,,Lambert,Peter
				document.getElementsByName('f_phone')[0].value = '+639278203318;+639279296233;+639277909009;+639277813496;+639065101595;';
				break;
			case 3://Dada,Glenn,,,
				document.getElementsByName('f_phone')[0].value = '+639267251396;+639063605919;+639276852986;+639277999097;+639052502521;';
				break;
			case 4://Nikki,Sheine,Trish,,Arlene
				document.getElementsByName('f_phone')[0].value = '+639152852593;+639276801132;+639177870017;+639277991280;+639163354114;';
				break;
			case 5://,Koleen,,Milka,
				document.getElementsByName('f_phone')[0].value = '+639162493495;+639228301990;+639159804835;+639168496891;+639167127102;';
				break;
			case 6://Zhan,,,JD,
				document.getElementsByName('f_phone')[0].value = '+639062923004;+639159297417;+639177504050;+639054443577;+639275543577;';
				break;
			case 7://
				document.getElementsByName('f_phone')[0].value = '+639274567985;+639228930614;+639267951311;+639174821300;+639277750617;';
				break;
			case 8://,CP,Dhadi,Glenn O,Ihna
				document.getElementsByName('f_phone')[0].value = '+639064003962;+639179801076;+639267581767;+639158614229;+639152479210;';
				break;
			case 9://Janina,,Joan,,Maisie
				document.getElementsByName('f_phone')[0].value = '+639267943842;+639152485107;+639062745286;+639064286145;+639272425463;';
				break;
			case 10://Winz,Zara,Bek,Cess,
				document.getElementsByName('f_phone')[0].value = '+639159511666;+639053126213;+639159822521;+639268996081;+639152174312;';
				break;
			case 11://,,,Kurly,Marvain
				document.getElementsByName('f_phone')[0].value = '+639064101324;+639158996896;+639162440839;+639152462182;+639064818981;';
				break;
			case 12://Neil,Ronel,Cate
				document.getElementsByName('f_phone')[0].value = '+639172473045;+639274097082;+639165429682;';
				break;
			case 13://Pat,Geldof,Dict,Jazz,Ivan
				document.getElementsByName('f_phone')[0].value = '+639167127102;+639054166233;+639056627928;+639152128359;+639159050779;';
				GM_setValue('batch_n','tapoz_na_fowh');
				break;
		}
	if (i==1)
		switch (j)
		{
			case 0://Glenn
				document.getElementsByName('f_phone')[0].value = '+639063605919;';
				break;
			case 1://Cate
				document.getElementsByName('f_phone')[0].value = '+639165429682;';
				break;
			case 2://Trish
				document.getElementsByName('f_phone')[0].value = '+639177870017;';
				break;
			case 3://Janina
				document.getElementsByName('f_phone')[0].value = '+639267943842;';
				break;
			case 4://Adi
				document.getElementsByName('f_phone')[0].value = '+639278203318;';
				break;
			case 5://CP
				document.getElementsByName('f_phone')[0].value = '+639179801076;';
				break;
			case 6://Ben
				document.getElementsByName('f_phone')[0].value = '+639274034064;';
				break;
			case 7://Marvain
				document.getElementsByName('f_phone')[0].value = '+639064818981;';
				GM_setValue('batch_n','tapoz_na_fowh');
				break;
		}
}