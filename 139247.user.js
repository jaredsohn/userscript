// ==UserScript==
// @name        SPOKI AH
// @namespace   spokiem.lv
// @include     http://spoki.tvnet.lv/izsole/*
// @include     https://spoki.tvnet.lv/izsole/*
// @include		http://spoki.tvnet.lv/auction_bet.php?id=*
// @description	Spoki izsoļu asistents!
// @author		jang
// @version     2.0
// ==/UserScript==

(
function() 
{
	$ = unsafeWindow.jQuery;

	var gobid=false;	
	var link = document.location.href;
	var ah_id = link.split('izsole/')[1];

	$("#bidding_div").append('<input type="button" value="Bid!" id="try_button">');

	$("#try_button").click(function(){			
	
		if (gobid) { 
			gobid = false;
			$(this).val("Bid!");
		} else {
			gobid = true;
			$(this).val("Stop!");
		}

	});



$('body').ajaxComplete(function(e, xhr, settings) {	
	
	$("#a_chk").attr('checked', true);

	var lastb=$("#last_bidder").html();
	var nick=$("#nickname").html();
	if (lastb != nick && gobid) {		
		$("#bid_btn").trigger('click');
	}

});


} ());