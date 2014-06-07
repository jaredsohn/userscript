// ==UserScript==
// @name           Re-Sign Roster
// @namespace      goallineblitz.com
// @description    Automates the process of sending a contract extension to everyone on your roster.
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @version	   2009.10.15
// @author	   iverson38620004
// ==/UserScript==

window.setTimeout( 
	function() {
		buildButton();
	}, 
	60
);

function buildButton(){
	// build a re-sign button
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("id", "reSign")
	button.setAttribute("value", "Re-Sign Roster");
	button.addEventListener("click", signRoster,false);
	
	//locate a spot to place the button	
	var location = document.getElementById('content').childNodes[5];

	//create a div to place the button in
	var newDiv = document.createElement('div');
	newDiv.align = 'left';
	newDiv.id = 'newDiv';
	location.parentNode.insertBefore(newDiv, location);

	// insert the button into the div
	newDiv.appendChild(button);

	// insert a year selection
	var span = document.createElement('span');
	span.setAttribute('id', 'input');

	newDiv.appendChild(span);

	var html = '<select id="years">' +
			'<option value=1>Re-sign for 1 season</option>' +
			'<option value=2>Re-sign for 2 seasons</option>' +
			'<option value=3>Re-sign for 3 seasons</option>' +
		'</select>';

	span.innerHTML = html;			
	
	
	//create a place to put a status message
	status = document.createElement('p');
	status.id = 'status';
	status.innerHTML = '<span id="count">0</span> offers left to send.';
	newDiv.appendChild(status);	

	//create a place to store temp data
	tempDiv = document.createElement('div');
	tempDiv.id = 'tempDiv';
	tempDiv.innerHTML = "";
	tempDiv.setAttribute("style","visibility: hidden; display:none;");
	newDiv.appendChild(tempDiv);
}

function signRoster(){

	var offers = new Array();
	var players = 0;
	var teamId = 0;
	var years = 0;

	disableButton();
	getUserInput();
	getTeamId();	
	getPlayerIds(offers);
	sendOffers(offers);
}

function disableButton(){
	document.getElementById('reSign').setAttribute('disabled', true);
}

function getUserInput(){
	years = document.getElementById('years').value;
	console.log(years);
}

function getTeamId(){
	teamId = window.location.href.split('=')[1];
}

function getPlayerIds(offers){
	var playerId = document.getElementsByClassName('player_name_short');
	players = playerId.length;

	for (var i=0; i < players; i++){
		offers[i] = playerId[i].firstChild.firstChild.href.split('=')[1];
	}
	return offers;
}

function sendOffers(offers){	
	//initiate status message	
	document.getElementById('count').innerHTML = players;

	for (var i=0; i < players; i++){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://goallineblitz.com/game/make_offer.pl?player_id=' + offers[i],
			headers: {
				'User-agent': navigator.userAgent,
				'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('tempDiv').innerHTML = response.responseText;
				var minimum = parseInt(document.getElementById('minimum_salary').innerHTML);
				playerId = document.getElementById('note_container').nextSibling.nextSibling.value;	
				var offerData = 'action=Send Offer' +
						'&bonus=' + (minimum * 45) +
						'&contract_type=season' +
						'&daily_salary=' + (minimum * 2.5) +
						'&duration_season=' + years +
						'&no_trade=0' +
						'&note=' +
						'&player_id=' + playerId + 
						'&team_id=' + teamId;
				//send a POST request to the server with the proper data				
				GM_xmlhttpRequest({
					method: 'POST',
				  	url: 'http://goallineblitz.com/game/make_offer.pl',
					 headers: {
  						"Content-Type": "application/x-www-form-urlencoded"
  					},
					data: encodeURI(offerData),				  	
				  	onload: function(response1) {
						document.getElementById('count').innerHTML = parseInt(document.getElementById('count').innerHTML) - 1;	
				  	}
				});
			}
		});
	}

}








