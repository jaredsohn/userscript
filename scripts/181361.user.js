// ==UserScript==
// @name Pegasus Epsilon's Temple Blessing Countdown Display
// @namespace http://pegasus.pimpninjas.org/nileonline/PETBCD.user.js
// @include http://*.playnileonline.com/*
// ==/UserScript==

// (C)'09 Pegasus Epsilon.
// Distribute Unmodified.
// http://pegasus.pimpninjas.org/license

// credits to Kenhotep for the idea, ArmEagle for refinements.

// don't run on login page
if (document.getElementById('header')) {
	// escape firefox' greasemonkey scope
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	script.textContent = PETBCDscript();
}

function PETBCDscript() { // begin script for window scope
	return PETBCDscript.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1"); // clean this wrapper off

	function PETBCD_alterTemple(REQ, cityId) {
		try {
			if (!!!REQ.dom.childNodes[1].childNodes[1].innerHTML.match(/^Temple/)) return REQ;
			var got = REQ.dom.textContent.match(/Progress: *([0-9\/]*)/);
			if (!got) return REQ;
			got = got[1].split('/')[0]-0;
			var needed = REQ.dom.textContent.match(/Progress: *([0-9\/]*)/)[1].split('/')[1]-0;
			var floor = got < 150 ? 150 : got;
			for (var timeleft = 0; floor < needed; needed = Math.round(needed * .99)) { timeleft++; }
			var days = Math.floor(timeleft/24);
			var hours = timeleft % 24;
			timeleft = (days?(days+" day"+(1==days?"":"s")+", "):"")+hours+" hour"+(1==hours?"":"s");
			if (got < 150) {
				REQ.dom.select('.smfade')[0].textContent = "The blessing will never begin without at least 150 of the required items donated, "+
					"However, "+timeleft+" until the minimum donation requirement is met.";
			} else REQ.dom.select('.smfade')[0].textContent = timeleft+" until the blessing begins without further donations.";
		} catch(e) { alert(e); }
		return REQ;
	}
	PETBCD_alterTemple.id = 'PETBCD';
	if ( window.HOOK === undefined ) { window.HOOK = $H({}); }
	if ( window.HOOK.get('manageObject') === undefined ) { window.HOOK.set('manageObject', []); }
	window.HOOK.get('manageObject').push(PETBCD_alterTemple);
}
