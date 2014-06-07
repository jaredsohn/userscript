// ==UserScript==
// @name           BBY Weekly Deals Page Navigation
// @namespace      http://userscripts.org/users/mathiasaurusrex
// @description    Brings back page numbers to Console.Deals.BestBuy.Com
// @include        https://console.deals.bestbuy.com/*
// @match          https://console.deals.bestbuy.com/*
// @version 2.0
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function addFunction2(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}
function initCheckThisGM(){
	function checkThisGM(){
		while(thisGM.mcp.tablet == false){
			/* Creates wunderNav container */
			var div = document.createElement('div');
			div.setAttribute('id', 'wunderNav')
			document.body.appendChild(div);

			/*adds some styles to wunderNav */
			wunderNav.setAttribute("style", "position:fixed;width:100%;background-color:#003b64;height:50px;bottom:0;z-index:1000;text-align:center;");
			/* Creates a counter based on the length of thisGM.grids.length and spits out a series of strings */
			for(var counter=1;counter <= thisGM.grids.length; counter++){
			document.getElementById('wunderNav').innerHTML += '<a class="wunderNumber" id="wunderNumber'+ counter +'" href="javascript:thisGM.goToGridPage('+ counter + ');">|  ' + counter + '  |</a>';
			}
			wunderNumber.setAttribute("style", "color:white!important;font-size:2em !important;")
		}
	}
	window.setInterval(checkThisGM, 10000);
}
addFunction2(initCheckThisGM, true);