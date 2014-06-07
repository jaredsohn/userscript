// ==UserScript==
// @name         BD Metric Converter
// @description  Converts toy size measurements from inches to centimeters
// @namespace    http://userscripts.org/users/flynn
// @updateURL    https://userscripts.org/scripts/source/82110.meta.js
// @downloadURL  https://userscripts.org/scripts/source/82110.user.js
// @include      http*://bad-dragon.com/products/*
// @include      http*://www.bad-dragon.com/products/*
// @version      1.2
// @grant        none
// ==/UserScript==

(function() {

	var DEBUG = false;

	function error(msg) {
		if (console)
			console.log(msg);
		
		if (DEBUG)
			alert("BD metric converter script encountered an error:\n\n" + msg);
	}

	function isProductPage() {
		return (document.querySelector("#prodinfo table") != null);
	}

	function convertToCm() {
		var table = document.querySelector("#prodinfo table");
		if (!table) return error("Unable to find measurements table");

		var cells = table.getElementsByTagName("td");
		if (!cells || cells.length == 0) return error("Unable to find any 'answer' cells in table");
		
		var count = 0;
		var regex = /(\d+\.?\d*)/i;
		
		for (var i in cells) { 
			var cell = cells[i];
			var answer = cell.innerHTML;
			var match = regex.exec(answer);
			
			if (match) {
				if (match.length != 2) return error("Found match but had no numeric group");
			
				var inches = match[1];
				var cm = parseFloat(inches) * 2.54;
				
				cell.innerHTML = "<span>" + cm.toFixed(2) + "</span>";
				
				var span = cell.firstChild;
				if (!span) return error("Unable to find inserted span element with firstChild");
				
				span.title = answer + " inches";
				span.style.cursor = "help";
				span.style.borderBottom = "1px #999 dashed";
				
				count++;
			}
		}
		
		if (count > 0) {
			var t = table.getElementsByTagName("th")[0].innerHTML;
			table.getElementsByTagName("th")[0].innerHTML = t.replace("inches", "cm");
		}
		else
			return error("Unable to find any suitable measurements to convert!");
	}

	if (isProductPage())
		convertToCm();

})();