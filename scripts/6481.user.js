// ==UserScript==
// @name           Nexgenwars Market Share add-on
// @namespace      http://jiv.us/scripts
// @description    Adds percent market share to the main nexgenwars page
// @include        http://nexgenwars.com/*
// ==/UserScript==

window.setTimeout(function() {
	var xbox = document.getElementById('x360_div').innerHTML;
	var ps3 = document.getElementById('ps3_div').innerHTML;
	var wii = document.getElementById('wii_div').innerHTML;
	
	xbox = parseInt(xbox.replace(/,/g, "")); 
	ps3 = parseInt(ps3.replace(/,/g, "")); 
	wii = parseInt(wii.replace(/,/g, "")); 
	
	var total = xbox + ps3 + wii;
	var pct_xbox = xbox / total;
	var pct_ps3 = ps3 / total;
	var pct_wii = wii / total;
	
	//document.getElementById('x360_div').innerHTML = document.getElementById('x360_div').innerHTML + ' (' + (100 * pct_xbox).toFixed(2) + '%)'; 
	//document.getElementById('ps3_div').innerHTML = document.getElementById('ps3_div').innerHTML + ' (' + (100 * pct_ps3).toFixed(2) + '%)'; 
	//document.getElementById('wii_div').innerHTML = document.getElementById('wii_div').innerHTML + ' (' + (100 * pct_wii).toFixed(2) + '%)';
	var getMarketShareNode = function(obj) {
		return obj.parentNode.parentNode.getElementsByTagName('td')[0];
	};

	var x_marketshare = getMarketShareNode(document.getElementById('x360_div'));
	var p_marketshare = getMarketShareNode(document.getElementById('ps3_div'));
	var w_marketshare = getMarketShareNode(document.getElementById('wii_div'));
	
	x_marketshare.innerHTML += '&nbsp;<span style="text-align: right; width: 5em;">(' + (100 * pct_xbox).toFixed(2) + '%)</span>';  
	p_marketshare.innerHTML += '&nbsp;<span style="text-align: right; width: 5em;">(' + (100 * pct_ps3).toFixed(2) + '%)</span>';  
	w_marketshare.innerHTML += '&nbsp;<span style="text-align: right; width: 5em;">(' + (100 * pct_wii).toFixed(2) + '%)</span>';  

	/*
	var message;
	message = 'Current Market Share:\n';
	message += 'XBOX 360:\t\t' + (100 * pct_xbox) + '%\n';
	message += 'Playstation 3:\t' + (100 * pct_ps3) + '%\n';
	message += 'Wii:\t\t' + (100 * pct_wii) + '%\n';
	alert(message);
	*/
}
, 50);
	
	
