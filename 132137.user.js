// ==UserScript==
// @name           LoL 2.0 Referral Counter
// @author		   F1u5h3r @ ace-client.net
// @description    Counts all of your League Of Legends referrals at lvl 5 and monitors all accounts in progress (Level > 1).
// @include        http://*.leagueoflegends.com/rewards/
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var numberOfPages = 0;

function initCount() {
	var clicked = false;
	$('ul.tabs li:nth-child(2) a').click(function(){
		if(clicked){
			countReferrals();
		}
		clicked = true;
	});
}

function countReferrals() {
	try{
		numberOfPages = $('a[rel*="last"]').attr('href').substr(-2);
		var link = "";
		var region = window.location.href.substr(7).split(".")[0];
		var addElement = [];
		for(var i = 1; i <= numberOfPages; i++){
			link = 'http://' + region + '.leagueoflegends.com/rewards/referrals/page:' + i + '/sort:summoner_level/direction:desc';
			addElement[i] = '<iframe id="refFrame' + i + '" style="width: 1px; height: 1px; display: none; position: absolute; top: 0px; left: 0px;" src="' + link + '"></iframe>';
		}
		$('div#lol-footer-top').append(addElement.join(''));
		setTimeout(frameLoaded, 8000);
	}catch(e){}
}

function frameLoaded(){
	var numberOfAccounts = 0;
	var inProgress = 0;
	for(var i = 1; i <= numberOfPages; i++){
		var cont = $('#refFrame' + i).contents().find('body .summoner_level');
		jQuery.each(cont, function (j) {
			var elem = this;
			var num = parseInt(elem.innerHTML);
			if(num === 5){
				numberOfAccounts++;
			} else if(num > 1 && num < 5){
				inProgress ++;
			}
		});
	}
	alert("You have " + numberOfAccounts + " at level 5 and " + inProgress + " in progress.\nThank you for using F1u5h3r's referral counter script.\nVisit ace-client.net for support.");
}

initCount();