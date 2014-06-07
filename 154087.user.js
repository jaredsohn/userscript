// ==UserScript==
// @name		Haustier Countdown
// @namespace		http://javan.de
// @description		Ein Haustier Countdown
// @author		Javan
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @include		http://*pennergame.de/*
// @version		1.0.2
// @updateURL		http://userscripts.org/scripts/source/154087.user.js
// @downloadURL		http://userscripts.org/scripts/source/154087.user.js
// @icon		http://javan.de/tools/live/favicon.png
// ==/UserScript==

var link = 'http://' + window.location.host;
var url = window.location;
var maxhaustiere = 3;

function statTime(s , id) // Counter by BonzenGame.com
{

	var statTime2 = document.getElementById(id);
	
	if(!document.all && !document.getElementById)
	{
		return;
	}
	var old_s = s;
	
var h = "00";
var m = "00";

	if(s>59)
	{
		m=Math.floor(s/60);
		s=s-m*60
	}
	if(m>59)
	{
		h=Math.floor(m/60);
		m=m-h*60
	}
	
	if(h == "00")
	{
		h = "";
	}
	
	if(h > 9)
	{
		h = h + ":";
	}else if(h > 0)
	{
		h = "0" + h + ":";
	}	

	if(m <= 9)
	{
		m = "0" + m;
	}
	
	if(m == 0)
	{
		m = "00";
	}

	if(s <= 9)
	{
		s = "0" + s;
	}


	statTime2.innerHTML = "<span id=\"" + id + "\">" + h + m +":"+ s + "</span>";
	
	
		myTimer = setTimeout(function(){statTime(old_s-1, id);},999 );


	
	if(old_s < 1)
	{
	clearInterval(myTimer);
	statTime2.innerHTML = "00:00";
	}
}


GM_xmlhttpRequest({
	method: 'GET',
	url: link+ '/pet/',
	onload: function(responseDetails) {
	
	var content = responseDetails.responseText;
	
			var ausgabe_counter;
			for (var i = 0; i < maxhaustiere; ++i){
				var id = i+1;
				if(content.split('petbar petbusybar')[id] !== undefined){
				if(content.split('petbar petbusybar')[id].split('</div>')[0]){
				var ausgabe_counter = content.split('petbar petbusybar')[id].split('</div>')[0];
					if(ausgabe_counter.search(/counter/) != -1){
						if(ausgabe_counter.split("counter(")[1].split(")")[0]){
							var ausgabe_counter = parseInt(ausgabe_counter.split("counter(")[1].split(")")[0]);
								if(ausgabe_counter >= 0){
									break;
								}else{
									var ausgabe_counter = -1;
								}
						}else{
							var counter = -1;
						}
					}
				}
				}else{
					var ausgabe_counter = -1;
				}
			}
			
			if(ausgabe_counter <= 5){
				var ausgabe = "<span style=\"color:#ff720b\">Auf gehts!</span>";
			}else if(ausgabe_counter == null){
				var ausgabe = "<span style=\"color:#ff0000\">Fehler</span>";
			}else{
				var ausgabe = '<span id="statTime"></span>';
				document.getElementsByClassName('icon award')[0].style.color = "#ffffff";
			}
			
			//alert(ausgabe);
			
			document.getElementsByClassName('icon award')[0].innerHTML = "<span style=\"padding-right:10px;\"><img src=\"http://static.pennergame.de/img/pv4/icons/awards/1400.gif\" style=\"padding-right:5px;\"/> " + ausgabe + "</span>";
			if(ausgabe_counter > 5){
				statTime(ausgabe_counter, "statTime");
			}
			
}});

// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.