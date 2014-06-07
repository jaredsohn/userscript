// ==UserScript==
// @id             draft.bestiaire.org-c46be488-fc52-481d-8147-10553c2d339e@scriptish
// @name           Bestiaire pack price estimator
// @version        2.0
// @namespace      
// @author         subby
// @description    Pulls card prices off tcgplayer.com to estimate the value of each pack you're looking at in Bestiaire. Useful for intuitively understanding EV of cracked packs
// @include        http://draft.bestiaire.org/draft.php
// @include        http://draft.bestiaire.org/draft.php?d=*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function writeList(cardlist) {
	//Writes our cardlist table at the top of document.
	var infospan = "<table border=\"1\" id=\"cardtable\"><tr><td><b>Card Name</b></td><td><b>Price</b></td>";
	var splicelist = [];
	for(var i = 0; i < cardlist.length-1; i++) {
		if(cardlist[i] == "Swamp" || cardlist[i] == "Island" || cardlist[i] == "Mountain" || cardlist[i] == "Plains" || cardlist[i] == "Forest")
		{
			//averaging the card price for things like lands is a terrible way to get the value. let's just call them 1 cent.
			//This code will only run if there's a foil in the last spot.
			infospan = infospan + "<tr><td>" + cardlist[i] + "</td><td id=\"" + cardlist[i] + "\">0.01 (N/A)</td></tr>";
		}
		else {
			infospan = infospan + "<tr><td>" + cardlist[i] + "</td><td id=\"" + cardlist[i] + "\">Searching...</td></tr>";
		}
	}
	//special case for our last card, to make sure we don't have a dupe (if we do, our calculations will not include it because I'm too lazy to write proper id-handling.
	if(cardlist[cardlist.length-1] != "Swamp" && cardlist[cardlist.length-1] != "Island" && cardlist[cardlist.length-1] != "Mountain" && cardlist[cardlist.length-1] != "Plains" && cardlist[cardlist.length-1] != "Forest") {
		var pricetext = "Searching...";
		for(var i = 0; i < (cardlist.length-1); i++) { 
			if(cardlist[i] == cardlist[cardlist.length-1]) {
				pricetext = "<b>ERROR:DUPCARD</b>";
			}
		}
		infospan = infospan + "<tr><td>" + cardlist[cardlist.length-1] + "</td><td id=\"" + cardlist[cardlist.length-1] + "\">" + pricetext + "</td></tr>";
	}
	else {
		infospan = infospan + "<tr><td>" + cardlist[i] + "</td><td id=\"" + cardlist[i] + "\">0.01 (N/A)</td></tr>";
	}
	infospan = infospan + "</table>";
	document.getElementsByClassName("infos").item(0).innerHTML = "<center>" + document.getElementsByClassName("infos").item(0).innerHTML + infospan + "</center>";
}
function getCards(setName) {
	//retrieves card names in a 15 element array (not specified as 15-element so as to allow custom pack sizes, no land, etc)
	var nodelist = document.getElementsByClassName("ligne00");
	var returnarray = [];
	var cardcount = 0;
	for(var i = 0; i < nodelist.length; i++) {
		if(nodelist.item(i).firstChild.childNodes.length > 0) {
			returnarray[cardcount] = nodelist.item(i).getElementsByTagName("input").item(1).title;
			cardcount++;
			var setString = nodelist.item(i).getElementsByTagName("input").item(1).src;
			setString = setString.substring(34,37).toLowerCase();
		}
	}
	switch(setString) {
	case "ths":
		setName.set = "Theros";
        break;
	case "m14":
		setName.set = "Magic 2014";
        break;
	case "mom":
		setName.set = "Modern Masters";
		break;
	case "dgm":
		setName.set = "Dragon's Maze";
        break;
	case "gtc":
		setName.set = "Gatecrash";
        break;
	case "rtr":
		setName.set = "Return to Ravnica";
        break;
	case "m13":
		setName.set = "Magic 2013";
        break;
	case "avr":
		setName.set = "Avacyn Restored";
        break;
	case "dka":
		setName.set = "Dark Ascension";
        break;
	case "inn":
		setName.set = "Innistrad";
        break;
	case "m12":
		setName.set = "Magic 2012";
        break;
	case "nph":
		setName.set = "New Phyrexia";
        break;
	case "mbs":
		setName.set = "Mirrodin Besieged";
        break;
	case "som":
		setName.set = "Scars of Mirrodin";
        break;
	default:
		alert("This set hasn't been implemented or something is broken. The set code is " + setString);
	}
	return returnarray;
}
function getPrices(cardlist, setName) {
	//we have to do the cardprices list before everything else so it's initialized and ready when the results come in. We can't sum it all at once due to the async nature of the onloads.
	var row = document.getElementById("cardtable").insertRow(-1);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	cell1.innerHTML="<b>Pack Value estimate (TCG Mid)</b>";
	var sum = 0.01; //from the basic land's "assumed" value
	cell2.innerHTML="$" + 0;
	var cardprices = [];
	for(p in cardlist) {
		(function(p) {
			GM_xmlhttpRequest({
				method: "GET",
				synchronous: true,
				url: "http://magictcgprices.appspot.com/api/tcgplayer/price.json?cardname=" + cardlist[p] + "&cardset=" + setName.set,
				onload: function(response) {
					var start = response.responseText.indexOf('"')+1;
					var end = response.responseText.indexOf('"', start);
					var ourcell = document.getElementById(cardlist[p]);
					//special case, for split cards mainly
					if(response.responseText.length == 12) {
						ourcell.innerHTML = "ERR:card not found (probably a split card, haven't implemented those yet.)";
						cell2.innerHTML = "$" + sum.toFixed(2);
						return 0;
					}
					if(ourcell.innerHTML == "Searching...") {
						ourcell.innerHTML = response.responseText.substring(1, response.responseText.length-1);
						var foo = response.responseText.split(',').slice(1,2)[0];
						sum+=parseFloat(foo.substring(3,foo.length-1));
						cell2.innerHTML="$" + sum.toFixed(2);
					}
				}
			});
		})(p);
	}
}
if(true) {
	set = new Object();
	var pricelist = [];
	var cards = getCards(set);
	writeList(cards);
	getPrices(cards,set);
}