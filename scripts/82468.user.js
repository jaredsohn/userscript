// ==UserScript==
// @name    EffectGames Quick Play Minimizer
// @description Changes EffectGames Quick Play page
// @version 1.4
// @author jmo84
// @include  http://www.effectgames.com/effect/quickplay.psp.html*
// ==/UserScript==

var EGS_LOCALDEV = 'Local development instance for ';
var EGS_BG_COLOR = '#030013';
var EGS_FOOTER_MARGIN = '10px';

function minQuickPlay() {

	document.body.style.backgroundColor = EGS_BG_COLOR;
    document.body.style.paddingTop = '32px';
    document.body.style.overflow = 'hidden';
		
	var h = document.getElementById('d_header');
	var pn = false;
	if (h) {
		pn = h.parentNode;
		h.parentNode.removeChild(h);
	}

	var h1 = document.getElementById('d_h1');
	if (h1) {
		 h1.parentNode.removeChild(h1);
	}
	
	var dw = document.getElementById('d_desc_wrapper');
	if (dw) {
		dw.style.display = 'none';
	}
		
	if (pn) {
		
	
		var a = [];
		for (var i = 0; i < pn.childNodes.length; i++) {
			var fc = pn.childNodes[i];
			if ( (typeof fc.className != 'undefined' && fc.className == 'clear') ||
					(fc.style && fc.style.height === '20px') ||
					(fc.nodeType == 8) ) {
					a.push(fc);
				}
		}
		for (var n = 0; n < a.length; n++) {
			var ne = a[n];
			ne.parentNode.removeChild(ne);
		};
		var sb = false;
		for (j = 0; j < pn.childNodes.length; j++) {
		
			var jo = pn.childNodes[j];
			if (!jo) continue;
			if (jo.nodeType == 1) {
				var jcn = jo.childNodes;
				for (var k = 0; k < jcn.length; k++) {
					var ko = jcn[k];
					var ih = ko.innerHTML;
					if (!ih) continue;
					if (ih.substr(0,EGS_LOCALDEV.length) == EGS_LOCALDEV) {
						sb = ko;
						break;
					}
					
				}
			}
		}
		if (sb) {
			var p2 = sb.parentNode;
			p2.removeChild(sb);
			p2.parentNode.appendChild(sb);
			var ec = document.getElementById('effect_container');
			ec.parentNode.insertBefore(sb, ec.nextSibling);
		}
	}
	
	
	var df = document.getElementById('d_footer');
	if (df) {
		var fls = df.childNodes;
		for (var v = 0; v < fls.length; v++ ) {
			var flo = fls[v];
			if (flo.nodeType == 1) {
				flo.style.marginTop = EGS_FOOTER_MARGIN;
				break;
			}
		}
	}
	
	
}

try {
	minQuickPlay();
} catch (ex) { }
