// ==UserScript==
// @name        sofiawars bank buy ore for all money
// @namespace   sofiawarsBankBuyOreForAllMoney
// @include     http://www.sofiawars.com/bank/
// @run-at document-end
// @version     1
// @grant       none
// ==/UserScript==
var source = function () {
	var money = parseInt($("span[rel='money']").text().replace(",","")); 
	if (money >= 750) {
		var oreCount = Math.floor(money/750);   
		var button = $("input[name='ore']").closest("form").find("button[class='button']");
		
		var buyAllHtml = '<button style="margin-top: 4px;" class="button" type="button">' + 
		                 '<span class="f">' + 
						 '<i class="rl"></i>' +
						 '<i class="bl"></i>' +
						 '<i class="brc"></i>' +
						 '<div class="c">Купи руда за всичките си монети. ' + oreCount + ' руда.</div>' +
						 '</span>' + 
						 '</button>';
		var buyAllButton = $(buyAllHtml);
		buyAllButton.bind("click", oreCount, function() {
		    var strMessage = "Наистина ли искате да купите " + 
			                  oreCount + 
							  " руда за всичките си монети? Ще ви струва " + 
							  (oreCount*750) +  " монети."
			if(window.confirm(strMessage)) {
				$("input[name='ore']").val(oreCount).trigger("keyup");
				button.trigger("click");	
			}
		});
		buyAllButton.insertAfter(button);
	}
};

source = '(' + source + ')();';
 
// Create a script node holding this  source code.
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = source;

// Insert the script node into the page, so it will run, and immediately
// remove it to clean up.
document.body.appendChild(script);
document.body.removeChild(script);