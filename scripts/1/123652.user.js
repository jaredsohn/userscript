// ==UserScript==
// @name           Mafiosi Paarden
// @namespace      Mafiosi Paarden
// @include        http://mafiosi.nl/paarden.php*
// @include        http://www.mafiosi.nl/paarden.php*
// ==/UserScript==

var stats = new Array("0","8","48","133","293","533","883","1368","2008");

var aantal = document.getElementsByTagName('img').length;

for(i=0;i<aantal;i++){
	if(document.getElementsByTagName('img')[i].src.indexOf('images/ster.jpg') > 0){
		document.getElementsByTagName('img')[i].src = 'http://mafiosi.jordykroeze.com/star.png';
		document.getElementsByTagName('img')[i].width = '16';
		document.getElementsByTagName('img')[i].height = '16';
	}
}

var id = parseInt(GM_getValue('id'));
	if(!id){
		GM_setValue('id', parseInt(0)); 
	}
var id = parseInt(GM_getValue('id'));

var teller = parseInt(GM_getValue('teller'));
	if(!teller){
		GM_setValue('teller', parseInt(0)); 
	}
var teller = parseInt(GM_getValue('teller'));

var showbutton = document.createElement('button');
	showbutton.textContent = 'Settings';
	showbutton.setAttribute('style', 'position: fixed !important; top: 0 !important; right: 0 !important;');
	showbutton.addEventListener('click', function() {
			var id = prompt("Paard ID");
			GM_setValue('id', parseInt(id));
			var teller = prompt("Hoevaak heb je al getraind?");
			GM_setValue('teller', parseInt(teller));
	}, false);
document.body.appendChild(showbutton);

if(document.body.innerHTML.indexOf('Paard id '+id+' is getraind en moet nu rusten.') > 0){
	GM_setValue('teller', parseInt(teller+1));
	var teller = parseInt(GM_getValue('teller'));
}


if(teller < stats[1]){
var rangvordering = (100/8)*teller;
}

if(teller >= stats[1]){
var hoevaak = teller-stats[1];
var moet = stats[2]-stats[1];
var rangvordering = (100/moet)*hoevaak;
}

if(teller >= stats[2]){
var hoevaak = teller-stats[2];
var moet = stats[3]-stats[2];
var rangvordering = (100/moet)*hoevaak;
}



if(teller >= stats[3]){
var hoevaak = teller-stats[3];
var moet = stats[4]-stats[3];
var rangvordering = (100/moet)*hoevaak;
}

if(teller >= stats[4]){
var hoevaak = teller-stats[4];
var moet = stats[5]-stats[4];
var rangvordering = (100/moet)*hoevaak;
}

if(teller >= stats[5]){
var hoevaak = teller-stats[5];
var moet = stats[6]-stats[5];
var rangvordering = (100/moet)*hoevaak;
}

if(teller >= stats[6]){
var hoevaak = teller-stats[6];
var moet = stats[7]-stats[6];
var rangvordering = (100/moet)*hoevaak;
}

if(teller >= stats[7]){
var hoevaak = teller-stats[7];
var moet = stats[8]-stats[7];
var rangvordering = (100/moet)*hoevaak;
}


if(rangvordering > 100){
	var rangvordering = 100;
}

var info = document.createElement('div');
	info.innerHTML = '<br /><br /><strong>Status van paard '+id+'</strong><br /><br />';
	info.innerHTML += '<strong>Aantal keer getraind:</strong><br />'+teller+'<br /><br />';
	info.innerHTML += '<strong>Rangvordering:</strong><br /><div style="width: 150px; border: 1px; height: 20px; background-color: red;"><div style="width: '+rangvordering+'%; background-color: green; height: 20px;"></div></div>';
	info.innerHTML += '<div style="margin-top: -20px; width:150px;"><center><strong>'+rangvordering+' %</strong></center></div>';

document.body.appendChild(info);