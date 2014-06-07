// ==UserScript==
// @name           Caliroots Euro Currency Adder
// @author         asymmetric
// @namespace      *
// @description    Adds the Euro Currency to the List of displayed Currencies on Caliroots.com
// @include        http://caliroots.com/*
// ==/UserScript==

var currency_div = document.getElementById('currencyConverter');
var table = currency_div.getElementsByTagName("table")[0];
var eurow = document.createElement("tr");
eurow.setAttribute("style", "color: rgb(95, 95, 95);");

var euro_img_td = document.createElement("td");
var euro_img = document.createElement("img");
euro_img.setAttribute("src", "http://version1.europeana.eu/europeana-theme/images/europeana/eu-flag.gif")
euro_img_td.appendChild(euro_img);

var euro_title_td = document.createElement("td");
euro_title_td.setAttribute('nowrap', '');
euro_title_td.setAttribute('width', '100%');
euro_title_td.appendChild(document.createTextNode("Euro"));

var sek_price_string = document.getElementsByClassName("price")[0].childNodes[1].childNodes[0].nodeValue;
var sek_price = sek_price_string.split(' ')[0];
var sek_price_no_dots = sek_price.replace("\.","");

var currency_req = new XMLHttpRequest();
var query = "http://www.exchangerate-api.com/sek/eur/" + sek_price_no_dots;

var euro_amt = null;



var euro_value_td = document.createElement("td");
euro_value_td.setAttribute('nowrap', '');
euro_value_td.setAttribute('align', 'right');
euro_value_td.setAttribute('id', 'euro_value');
euro_value_td.appendChild(document.createTextNode("temp"));

eurow.appendChild(euro_img_td);
eurow.appendChild(euro_title_td);
eurow.appendChild(euro_value_td);

table.tBodies[0].appendChild(eurow);

GM_xmlhttpRequest({
	method: 'GET',
	url: query,
	onload: function(response) {
		euro_amt = response.responseText + " €";
		document.getElementById("euro_value").innerHTML = euro_amt;
		// console.log(euro_amt);
	}
});