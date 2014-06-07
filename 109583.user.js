// ==UserScript==



// @name           Sem Espera no 4Shared



// @namespace      ThiagoGomes



// @description    Sem mais os 500 segundos de espera com conta free. OAHEIAHEOAEHOA



// @include        http://*.4shared.com/*



// @include        http://4shared.com/*



// ==/UserScript==







var c = 0 ;
	function fcwait() {
	if(document.getElementById("divDLWait")==null || document.getElementById("divDLStart")==null){
		setTimeout("fcwait()", 1000);
		return;
	}
	if (c > 0) {
		var el = document.getElementById("downloadDelayTimeSec");
		if( el ){
				el.innerHTML = "" + c;
		}
		c = c - 1;
		setTimeout("fcwait()", 1000);
	}
	else {
		document.getElementById("divDLWait").style.display = 'none';
		document.getElementById("divDLStart").style.display = 'block';

		}
	}

	fcwait();