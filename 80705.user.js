// ==UserScript==
// @name           Speed Spies
// @namespace      Ranatama
// @description    Quickly place spies.
// @require        http://userscripts.org/scripts/source/74144.user.js
// @include        http://*animecubed.com/billy/bvs/villagespy*
// ==/UserScript==

//Thanks to TheSpy for the Update Checker :)
try {
	ScriptUpdater.check(80705);
} catch(e) { };

function process_event(event) {

if (event.keyCode==71){ //g

	var spyPage = document.evaluate("//td[1]/b[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var spyAttempt = document.evaluate("//table[7]//form/a/b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var spyFinal = document.evaluate("//font/font/b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


	if(spyPage.innerHTML == "Villages you can spy on:"){
		
		//Pick village, look into spying on village.
		var radioBtns = document.evaluate("//td[3]//td[1]/ul/form/input[@name='spycheck']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var formV = document.evaluate("//td[3]//td[1]/ul/form", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

		var tolerance = 0; //Default tolerance: No peacetime
		var peacetime;

		var brk = new RegExp("\\)<br>");
		var villages = formV.innerHTML.split(brk);

		for(var i = 0; i < villages.length; i++){
			var strt = villages[i].indexOf("+");

			if(strt < 0) {
				peacetime = 0;
			}else {
				peacetime = parseInt(villages[i].substring(strt + 1, villages[i].length));

			}
			if(peacetime <= tolerance){
				radioBtns.snapshotItem(i).checked = true;	
				if(radioBtns.snapshotItem(i).disabled == false){
				document.forms.namedItem("lookinto").wrappedJSObject.submit();//Go to next page
				break;
				}

			}
				
		}

	
	}
if(spyAttempt != null){
	if(spyAttempt.innerHTML=="Attempt to Infiltrate Village"){	
		

		document.forms.namedItem("spyatt").wrappedJSObject.submit();  //Spy Time
		
	}
	}

	if(spyFinal != null){
		document.forms.namedItem("spy").wrappedJSObject.submit();
	}
	
	
}


}


window.addEventListener("keyup", process_event, false);
