// ==UserScript==
// @name           	Auto-Fill Offer
// @namespace      	goallineblitz.com
// @description    	Automatically fills out the offer for you. All you have to is press the send button.
// @include        	http://goallineblitz.com/game/make_offer.pl?player_id=*
// @author		garrettfoster
// @version		2009.06.01
// ==/UserScript==

window.setTimeout( 

	function() {

		fillOffer();

	}, 

	60

);

function fillOffer(){
	
	//---------------------Start editing------------------------//	
	//this is your team id	
	var teamId = 0000;
	
	//this is the amount above the minimum salary you want to pay	
	var salary = 0;
	
	//this is the amount above the minimum bonus you will pay them
	var bonus = 0;

	//this is the type of contract
	// "season" = end on day 40 contract
	// "40_day" = 40 day contract
	var contract = "season";

	// type 1, 2, or 3 here for the number of seasons you want to make the offer for	
	var seasons = 1;

	// this indicates whether you want a no trade clause or not
	// 0 = allow trades
	// 1 = disallow trades
	var trades = 1;

	//type your default message between the quotes. Remember to keep is short.
	var note = "Come Join a Championship Contender"

	//-----------------------Stop editing-------------------//	
	//There is not need to edit anything below this line	

	var minimum = parseInt(document.getElementById('minimum_salary').innerHTML);
	document.getElementById('salary').value = parseInt(minimum + salary);
	document.getElementById('no_trade').value = trades;
	document.getElementById('contract_type').value = contract;
	document.getElementById('duration').value = seasons;
	document.getElementById('note_container').childNodes[3].innerHTML = note;

	if(document.getElementById('tab_make_offer').firstChild.innerHTML == "Renegotiate Contract"){
		
		document.getElementById('bonus').value = bonus;

	} else {

		document.getElementById('team_name').childNodes[1].value = teamId;
		document.getElementById('bonus').value = parseInt(bonus + minimum*5);

	}
}