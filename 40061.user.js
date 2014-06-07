// ==UserScript==
// @author  Creotec.com
// @name free currency converter
// @description FREE! currency exchange rates calculator for webmasters. You can add this unbranded currency converter to your website.  It uses AJAX (JSON) to aviod the need for pop-ups and gives you the flexibility to integrate it with your website.
// ==/UserScript==
 
	<script type="text/javascript" src="http://currencyconverter.55uk.net/currency_converter_json.js"></script>
	<script type="text/javascript">
	function getMyRates(jData) {
		if (jData == null) {
			alert("There was a problem parsing search results.");
			return;
		}
		var myval = jData.ResultSet;
		var mydiv = jData.xxMyDiv;
		document.getElementById(mydiv).innerHTML =  myval;
	}

	function myPrivateConverterMany() {
		var xxv = document.getElementById('xxvalue').value;
		var xxf = document.getElementById('xxfrom').value;
		var xxt = document.getElementById('xxto').value;
		if (xxv > 0) {
			getExchangeRatesDiv('xxrates',xxv,xxf,xxt,'true');
		}
	}
	</script>
	CONVERT: <input id="xxvalue" value="1.00" />
	FROM:
	<select id="xxfrom">
		<option value="GBP">GBP - British Pound</option>
		<option value="EUR">EUR - Euro</option>
		<option value="USD">USD - U.S. Dollar</option>
		<option value="CAD">CAD - Canadian Dollar</option>
		<option value="AUD">AUD - Australian Dollar</option>
		<option value="JPY">JPY - Japanese Yen</option>
	</select>
	TO:
	<select id="xxto">
		<option value="EUR">EUR - Euro</option>
		<option value="USD">USD - U.S. Dollar</option>
		<option value="GBP">GBP - British Pound</option>
		<option value="CAD">CAD - Canadian Dollar</option>
		<option value="AUD">AUD - Australian Dollar</option>
		<option value="JPY">JPY - Japanese Yen</option>
	</select>
	<input type="button" value="GO" onclick="myPrivateConverterMany();" />
	<div id="xxrates"></div>
