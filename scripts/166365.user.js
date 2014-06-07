// ==UserScript==
// @name        Pardus Roulette
// @namespace   http://userscripts.xcom-alliance.info/
// @description Makes all NPCs appear as Space Maggots and ships appears as Sabres (regardless of what they really are)
// @author      Miche (Orion) / Sparkle (Artemis)
// @include     http*://*.pardus.at/main.php
// @version     1.0
// @updateURL 	http://userscripts.xcom-alliance.info/pardus_roulette/pardus_roulette.meta.js
// @downloadURL http://userscripts.xcom-alliance.info/pardus_roulette/pardus_roulette.user.js
// @icon 		http://userscripts.xcom-alliance.info/pardus_roulette/icon.png
// @grant       none
// ==/UserScript==


/*****************************************************************************************
	Version Information

	1.0 ( 01-May-2013 )
	- initial release for general use

*****************************************************************************************/

var MyUserscript = {

	replacementNPC: 'space_maggot', // set to empty string to stop replacing NPCs
	replacementShip: 'sabre', // set to empty string to stop replacing pilot ships

	Init: function() {
		this.DoStuffAfterPageReloadOrPartialUpdate();
	},

	Update: function() {
		this.DoStuffAfterPageReloadOrPartialUpdate();
	},
	
	DoStuffAfterPageReloadOrPartialUpdate: function() {
		if (this.replacementNPC != '') this.ReplaceNPCs();
		if (this.replacementShip != '') this.ReplaceShips();
	},

	ReplaceNPCs: function() {
		var els = document.querySelectorAll('td.navNpc img');
		for (var loop=0;loop<els.length;loop++) {
    		els[loop].src = els[loop].src.replace(/opponents\/.+\.png/, 'opponents/' + this.replacementNPC + '.png');
		}
	},

	ReplaceShips: function() {
		var els = document.querySelectorAll('#otherships_content td');
		for (var loop=0;loop<els.length;loop++) {
			if (els[loop].getAttribute('style')) {
				els[loop].setAttribute('style', els[loop].getAttribute('style').replace(/ships\/.+\.png/, 'ships/' + this.replacementShip + '.png'));
			}
		}
		var els = document.querySelectorAll('td.navShip img');
		for (var loop=0;loop<els.length;loop++) {
    		els[loop].src = els[loop].src.replace(/ships\/.+\.png/, 'ships/' + this.replacementShip + '.png');
		}
	}

};

// run normally once
MyUserscript.Init();

// hook in to allow for partial refresh
unsafeWindow.addUserFunction(function(MU) {
	return function() {
		MU.Update();
	};
}(MyUserscript));
