// ==UserScript==
// @name           BBY Weekly Deals Page Number
// @namespace      http://userscripts.org/users/mathiasaurusrex
// @description    Brings back page numbers to Console.Deals.BestBuy.Com
// @include        https://console.deals.bestbuy.com/*
// @match          https://console.deals.bestbuy.com/*
// @version 1.6
// ==/UserScript==


// Injects hijackFunction into <script> tags in the head 
function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}


// Hijacks Current current Grid Key from grid.js and injects it into page title.
function hijackFunction () {
	function updateTitleToPageNumber() {
		document.title = thisGM.currentGridKey + ' | ' + thisGM.catalogInfo.dates;
	}
		window.setInterval(updateTitleToPageNumber, 4000);
}

//Inject the function and execute it:
addFunction(hijackFunction, true);