// ==UserScript==
// @name           Broken URL FIREWIRE
// @namespace      http://wwww.pgc.umn.edu
// @description    Let's get physical (Firewire). This is for the broken URLs (no license agreement).
// @include        https://warp.nga.mil/cgi-bin/nlprime/MultipleLicenseCheck.cgi*
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.selectMedia = function() {
	inputs = document.getElementsByTagName('input');
	var radios = new Array();
	var ri= 0;
	for (var i = 0; i < inputs.length; i ++) {
        if (inputs[i].type == 'radio') {
            radios[ri] = inputs[i];
			ri++;
        }
    }
	physicalRadio = radios[1];
	click(physicalRadio);
	
	options = document.getElementsByTagName('option');
	for (var i = 0; i < options.length; i ++) {
        if (options[i].value == 'Firewire HD') {
            options[i].selected = true;
        }
    }
	
	okButton = document.getElementsByName("okButton");
	click(okButton[0]);
}

window.setTimeout(selectMedia(), 5000);