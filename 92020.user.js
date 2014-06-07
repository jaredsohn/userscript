// ==UserScript==
// @name           Travian 4 speed bids
// @author         Leonardo I
// @version        1
// @namespace      http://leonardosite.altervista.org/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Aggiungi subito dei valori alla tua asta
// @include        http://*.travian.*/hero_auction.php?action=bids&page=*&a=*&z=*
// ==/UserScript==


/*** Setta i valori ***/

var is_submit = true; // Rilanciare una volta premuto il tasto (valori accettati: true, false)

/**********************/


var versione = '1';

if ($('table.currentBid form').html() != null) {
	var MaxBid = $('table.currentBid form input.maxBid').val();
	if (MaxBid == '') {
		MaxBid = $('table.currentBid form span').html();
	}
	//alert(MaxBid);
	
	$('table.currentBid form div.submitBid').before('<div id="plus_bids_button">&nbsp;'+button('+5', 'button', 'plus_bids_button_5')+'&nbsp;&nbsp;'+button('+10', 'button', 'plus_bids_button_10')+'&nbsp;&nbsp;'+button('+50', 'button', 'plus_bids_button_50')+'&nbsp;&nbsp;'+button('+100', 'button', 'plus_bids_button_100')+'&nbsp;&nbsp;'+button('+500', 'button', 'plus_bids_button_500')+'&nbsp;&nbsp;'+button('+1000', 'button', 'plus_bids_button_1000')+'&nbsp;</div>');
	$('table.currentBid form div.submitBid').after('<p style="margin-top: 10px; margin-bottom: -10px;"><small>Travian 4 speed bids by <a href="http://leonardosite.altervista.org/" target="_blank">Leonardo I</a>, version '+versione+'</small></p>');
	
	$('#plus_bids_button_5').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+5);
		MaxBid = parseInt(MaxBid)+5;
		if (is_submit) { $('table.currentBid form').submit(); }
	});
	$('#plus_bids_button_10').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+10);
		MaxBid = parseInt(MaxBid)+10;
		if (is_submit) { $('table.currentBid form').submit(); }
	});
	$('#plus_bids_button_50').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+50);
		MaxBid = parseInt(MaxBid)+50;
		if (is_submit) { $('table.currentBid form').submit(); }
	});
	$('#plus_bids_button_100').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+100);
		MaxBid = parseInt(MaxBid)+100;
		if (is_submit) { $('table.currentBid form').submit(); }
	});
	$('#plus_bids_button_500').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+500);
		MaxBid = parseInt(MaxBid)+500;
		if (is_submit) { $('table.currentBid form').submit(); }
	});
	$('#plus_bids_button_1000').click(function () {
		$('table.currentBid form input.maxBid').val(parseInt(MaxBid)+1000);
		MaxBid = parseInt(MaxBid)+1000;
		if (is_submit) { $('table.currentBid form').submit(); }
	});

}

function button(value, type, id, onclick) {
	button_inner = '<button value="'+value+'" type="'+type+'"';
	if (onclick) {
		button_inner += ' onclick="'+onclick+'"';
	}
	if (id) {
		button_inner += ' id="'+id+'"';
	}
	button_inner += '><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">'+value+'</div></div></button>';
	
	return button_inner;
}