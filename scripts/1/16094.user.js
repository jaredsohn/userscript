// ==UserScript==
// @name           Defense of the Ancient (Facebook App) Auto-creeping
// @namespace      http://native02.blogspot.com
// @description    Automates the creeping process in DOTA
// @include        http://apps.facebook.com/dotaitems/creeping.php*
// ==/UserScript==
var creepID = 5; //Preferred creep to attack: 3 denotes ghoul; 4 denotes meat truck; 5 denotes tower

var h = document.getElementsByTagName('form');
var attack = true;
var action = false;


var i;
for (i in h) {
	var actionString = h[i].action;
//	alert('actionString:' + actionString);
	if (actionString && actionString.indexOf('creeping') != -1) {
//		alert('Creep!');

		///   SELECT CREEP///
		
		var inputs = h[i].getElementsByTagName('input');
		var inputIndex;
		for (inputIndex in inputs) {
			var input = inputs[inputIndex];
			var inputName = input.name;
			var inputValue  = input.value;
			
//			alert('INPUT:' + inputName + ' ' + inputValue);
			if (inputName && inputName == 'cid') {
				if (inputValue && inputValue != -1) {
//					alert('Attack Creep!');
					h[i].submit();
					attack = true;
					action = true;
				} else {
					attack = false;
				}
			}
		}
		
		// Don't attack creep, if creepID is wrong.  
		//  This will break if Dun Attack button comes before the Attack button
		if (!attack) {
			action = true;
//			alert('Dun Attack Creep!');
			h[i].submit();
		}
	}
}

if (!action) {
	alert('No Action taken!');
}		