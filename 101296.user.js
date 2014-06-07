// ==UserScript==
// @name           BvS Consumables
// @namespace      blueddict
// @description    A script to ease the use of consumables.
// @include        http://animecubed.com/billy/bvs/oneuseitems.html
// @include        http://www.animecubed.com/billy/bvs/oneuseitems.html
// ==/UserScript==

/*
T = TACO
S = Super Potion
G = Golden Potion
N = NinjaON
C = Strange Candy

HotKeys : 
	1 - 9 : number to consume. (0 = 10 items to consume)
	~ : sets 0 number to consume.
	ENTER : press "Use Item" button.
*/

var keyCodes;
var ckeyCodes;
var PotionCodes;
var amounts;
var otn = document.getElementsByName("onetimenumber")

keyCodes = [84, 83, 71, 78, 67]; // 'T', 'S', 'G', 'N', 'C'
ckeyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 96]; // 1-9, 0, ~
PotionCodes = [712, 267, 304, 563, 751];

function process_event(event) {
	for(var j = 0; j < keyCodes.length; j++)
			if (event.keyCode == keyCodes[j]){
				var Potion = document.forms.namedItem("otime").elements;
				for(var i = 0; i < Potion.length; i++)
					if(Potion[i].value  == PotionCodes[j])
						Potion[i].wrappedJSObject.click();
			}
	for(var j = 0; j < ckeyCodes.length; j++)		
			if(event.keyCode == ckeyCodes[j]){
				if(ckeyCodes[j] == 96)
					amounts = 0;
				else {
					if(ckeyCodes[j] == 48)
						amounts = 10;
					else
						amounts = ckeyCodes[j] - 48;
						}
				otn[0].value = amounts;
			}	
	if(event.keyCode == 13) {
		document.forms.namedItem("otime").wrappedJSObject.submit();
	}	
}
window.addEventListener("keyup", process_event, false);