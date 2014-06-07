// ==UserScript==
// @name       		Slush's Pool (mining.bitcoin.cz) Advancer
// @version    		0.2
// @description  	Advances blocks stats table on Slush's pool, adding share cost calculation column.
// @match      		http://mining.bitcoin.cz/stats/*
// @match	   	https://mining.bitcoin.cz/stats/*
// @run-at		document-end
// @copyright  		2013, Raegdan/RaegdanTheRed (http://about.me/raegdan), GNU GPL v3
// ==/UserScript==

btc_reward = 25.0;
nmc_reward = 50.0;

(document.location.href.indexOf("/nmc") != -1) ? reward = nmc_reward : reward = btc_reward;

x = document.getElementById("operational-stats").getElementsByTagName("tr")[4].getElementsByTagName("td")[1];
regexp = /[0-9]*[^0-9]*([0-9]*)/;
if ((y = regexp.exec(x.innerHTML)) && (difficulty = parseInt(y[1])))
{
	pps_cost = (reward / difficulty);
	pps_cost_txt = pps_cost.toFixed(8);
} else {
	pps_cost_txt = "[parse error :(]"
}

x = document.getElementById("block-history").getElementsByTagName("tr");
x[0].innerHTML+="<th style=\"width: 200px;\">Share cost, BTC<br />(PPS ≈" + pps_cost_txt + ")</th>";
for (i = 1; i<=x.length - 1; i++)
{
    my_btc = parseFloat(x[i].getElementsByTagName('td')[5].innerHTML);
	my_shares = parseFloat(x[i].getElementsByTagName('td')[4].innerHTML);
    share_cost = my_btc / my_shares;
	(share_cost >= pps_cost) ? td_color = "style=\"color:#009900\"" : td_color = "style=\"color:#990000\"";
	text = share_cost.toFixed(8);
	
	if (text == "NaN") text = "-";
 	x[i].innerHTML+="<td " + td_color + ">" + text + "</td>";
}