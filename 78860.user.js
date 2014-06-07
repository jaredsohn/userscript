// ==UserScript==
// @name          Proveravanje kongresa, zakoni
// @namespace     http://www.jebotepatak.patka1
// @description	  Proveravanje glasanja kongresa
// @include       http://www.erepublik.com/en/Serbia/law/*
// @resource      GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==
//


function embedSound() {
	bgEmbed = document.createElement("embed");
	bgEmbed.src = "http://www.wyomingwebdesign.com/files/sound_files/scream.wav";
	bgEmbed.autostart = 'false';
	bgEmbed.width=0;
	bgEmbed.height=0;
	bgEmbed.id="sound1";
	bgEmbed.enablejavascript = 'true';
	document.body.appendChild(bgEmbed);
}

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 3 * ONEMIN ;			// How often is page refreshed (in ms)
var TENSEC = 10 * ONESEC;

function buyProduct(object) {
	var offer_id = $j(object).attr("id");
	var amount = $j("input#amount_"+offer_id).val();
	$j("input#offer_id").val(offer_id);
	$j("input#amount").val(amount);
	$j("form#buy_offer").submit();
}

function getValues() {
	var tabela = document.getElementsByClassName('offers')[0].getElementsByTagName('tr')[1];
	var tabela1 = tabela.getElementsByTagName('td')[3].getElementsByTagName('span')[0].innerHTML;
	var kolicina = tabela.getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML;
	var offer_id = tabela.getElementsByTagName('td')[4].getElementsByTagName('input')[1].id;
	var tabela3 = tabela.getElementsByTagName('td')[0].getElementsByClassName('nameholder dotted')[0].innerHTML;
	var tabela2 = 2;
	
	//var moj_racun = document.getElementsByClassName('info accountdisplay')[0].getElementsByTagName('span')[0];
	
	//alert(moj_racun.innerHTML);
	
	
	
	if (parseInt(tabela1)<=parseInt(tabela2)) {
		var alertString = tabela3 + ': ' + tabela1 + ' golda';
		if (kolicina>13) {
			kolicina=13;
		}
		tabela.getElementsByTagName('td')[4].getElementsByTagName('input')[0].value = kolicina;
		//embedSound();
		alert(alertString);
	}
	
}


getValues();


	
/*window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	TENSEC
) ;*/
