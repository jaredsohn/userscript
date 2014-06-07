// ==UserScript==
// @name           Snakeman
// @namespace      Ranatama
// @include        http://animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==


function process_event(event) {

//User Defined Minimum:
var minimum = 40000;

if (event.keyCode==71){ //g

var checkpage = document.evaluate("//font//i", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;


if(checkpage.innerHTML == "OR NO SNAKEMAN"){ //On SonS page


	var checkgame = document.evaluate("//input[@name='start_snake']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(checkgame != null){ // new game	
		checkgame.checked = true;
		var startID = "newsnkbox1"; 
		//This can be user defined
		document.getElementById(startID).checked = true;  
		document.forms.namedItem("newsnake").wrappedJSObject.submit();
		return;
	}
//===========================================================================
//===========================================================================
//===========================================================================
//from here  to
	var prizes = document.evaluate("//table[6]//font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var topprize = prizes.snapshotItem(prizes.snapshotLength - 1);

	if (topprize.innerHTML != "500K"){

		var endgame = document.evaluate("//input[@name='mid_quick_burn']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		endgame.checked = true;
		document.forms.namedItem("picksnake").wrappedJSObject.submit();	
	}

//here is optional code. It ends the game by quickburn if 500k is 
//no longer there
//===========================================================================
//===========================================================================
//============================================================================
	var ryoRNG = document.evaluate("//table[7]//b/font", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(ryoRNG == null || ryoRNG.innerHTML.indexOf("Ryo") < 0){
		for(var i = 1; i < 27; i++){
			var xpmsg = "//input[@id=\'snakeclick" + i.toString() + "']";

			var bucket = document.evaluate(xpmsg, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if(bucket != null){
				var checkboxid = "snakeclick" + i.toString(); 
				document.getElementById(checkboxid).checked = true;  
				document.forms.namedItem("picksnake").wrappedJSObject.submit();
			}
		
		}
	} else{
		var ryooffer = ryoRNG.innerHTML.substring(0, ryoRNG.innerHTML.length - 4);

		var offer = parseInt(ryooffer.replace(",", ""));

		var offerbtn = document.evaluate("//input[@name='snakechoice']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(offer > minimum){
			offerbtn.snapshotItem(0).checked = true;
		}else {
			offerbtn.snapshotItem(1).checked = true;
		}
		document.forms.namedItem("picksnake").wrappedJSObject.submit();
	}
}
}
}

window.addEventListener("keyup", process_event, false);

