scr_meta=<><![CDATA[
// ==UserScript==
// @name            SU Contrast Control
// @version	    	0.8
// @namespace       http://www.foresthippy.com
// @description     ForestHippy
// @include         http://*.stumbleupon.com/*
// @license         http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

GM_registerMenuCommand ('Set SU color intensity', setIntensity);
GM_registerMenuCommand ('Set SU color saturation', setSaturation);

DEFAULT_INTENSITY = 3;
DEFAULT_SATURATION = 3;

if (GM_getValue ('intensity', -1) == -1) {
	GM_setValue ('intensity', DEFAULT_INTENSITY);
}
if (GM_getValue ('saturation', -1) == -1) {
	GM_setValue ('saturation', DEFAULT_SATURATION);
}

reloadStyleSheet ();

function reloadStyleSheet () {
	var ss = document.getElementById ('stylepreview');
	if (ss) {
		var url = ss.href;
		GM_xmlhttpRequest ({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
			},
			onload: function(response) {
				var styleSheet;
				var content = response.responseText; 
				styleSheet = document.createElement ('style');
				styleSheet.type = 'text/css';
				styleSheet.innerHTML = content;
				document.getElementsByTagName ('head')[0].appendChild (styleSheet);
				modifyStylesheet ();
			}
		});
	}
}

function modifyStylesheet () {
	var styleSheet = document.styleSheets[document.styleSheets.length-1];
	var ss;
	var i, background, color, newcolor, bodybg=0xFFFFFF;
		
	for (i=0; i<styleSheet.cssRules.length; i++) {
		if (styleSheet.cssRules[i].selectorText == 'body') {
			bodybg = colorToNum(styleSheet.cssRules[i].style.backgroundColor);
			break;
		}
	}
	
	for (i=0; i<styleSheet.cssRules.length; i++) {
		if (styleSheet.cssRules[i].style.color !== '') {
			if (styleSheet.cssRules[i].style.backgroundColor !== '') {
				background = colorToNum (styleSheet.cssRules[i].style.backgroundColor);
			} else {
				background = bodybg;
			}
			color = colorToNum (styleSheet.cssRules[i].style.color);
			if (colorLuma (color) > colorLuma (background)) {
				newcolor = colorTarget (color, 0xFFFFFF,GM_getValue ('intensity')/10);
				newcolor = colorSaturate (newcolor, GM_getValue ('saturation')/10);
			} else {
				newcolor = colorTarget (color, 0, GM_getValue ('intensity')/10);
				newcolor = colorSaturate (newcolor, GM_getValue ('saturation')/10);
			}
			styleSheet.cssRules[i].style.setProperty ('color', numToColor (newcolor), styleSheet.cssRules[i].style.getPropertyPriority('color'));
		}
		GM_log (numToColor (color)+' changed to '+numToColor (newcolor));
	}
}

function colorTarget (colorNum, target, coeff) {
	var r0 = ((0xFF0000 & colorNum) >> 16);
	var g0 = ((0x00FF00 & colorNum) >> 8);
	var b0 = (0x0000FF & colorNum);
	var rt = ((0xFF0000 & target) >> 16);
	var gt = ((0x00FF00 & target) >> 8);
	var bt = (0x0000FF & target);
	var dr = (rt - r0) * coeff;
	var dg = (gt - g0) * coeff;
	var db = (bt - b0) * coeff;
	var r1 = Math.round (r0 + dr);
	var g1 = Math.round (g0 + dg);
	var b1 = Math.round (b0 + db);
	
	return (r1 << 16) + (g1 << 8) + b1;
}

function colorLuma (colorNum) {
	var r = (0xFF0000 & colorNum) >> 16;
	var g = (0x00FF00 & colorNum) >> 8;
	var b = 0x0000FF & colorNum;
	
	return Math.round (0.30 * r + 0.59 * g + 0.11 * b);
}

function colorSaturate (colorNum, coeff) {
	var r0 = ((0xFF0000 & colorNum) >> 16);
	var g0 = ((0x00FF00 & colorNum) >> 8);
	var b0 = (0x0000FF & colorNum);
	var col0 = new Array (r0, g0, b0);
	var sat = new Array (3);
	var h, m, l, colorSat;
	
	if (r0 == g0 && g0 == b0) {
		return colorNum; // Special grey case
	} else {
		if (r0 >= g0 && r0 >= b0) {
			h = 0;
			if (g0 > b0) {
				m = 1;
				l = 2;
			} else {
				m = 2;
				l = 1;
			}
		} else if (g0 >= r0 && g0 >= b0) {
			h = 1;
			if (r0 > b0) {
				m = 0;
				l = 2;
			} else {
				m = 2;
				l = 0;
			}
		} else {
			h = 2;
			if (r0 > g0) {
				m = 0;
				l = 1;
			} else {
				m = 1;
				l = 0;
			}
		}
	}
	
	sat[h] = col0[h];
	sat[l] = 0;
	sat[m] = col0[h] * ((col0[m] - col0[l]) / (col0[h] - col0[l]));
	
	colorSat = (sat[0] << 16) + (sat[1] << 8) + sat[2];
	
	return colorTarget (colorNum, colorSat, coeff);
}

function colorToNum (colorString) {
	var colorExec = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec (colorString);
	var r = Number (colorExec[1]);
	var g = Number (colorExec[2]);
	var b = Number (colorExec[3]); 
	return (r << 16) + (g << 8) + b;
}

function numToColor (colorNum) {
	var r = (0xFF0000 & colorNum) >> 16;
	var g = (0x00FF00 & colorNum) >> 8;
	var b = 0x0000FF & colorNum;
	return ('rgb('+r+', '+g+', '+b+')');
}

function setIntensity () {
	var i = prompt ('Enter intensity value between 0 and 10\n0 has no effect\n10 tends bright colors to white and dark colors to black', GM_getValue ('intensity'));
	n = Number (i);
	if (!isNaN (n)) {
		if (n >= 0 && n <= 10) {
			GM_setValue ('intensity', Math.round(n));
			window.location.href=window.location.href;
		}
	}
}

function setSaturation () {
	var i = prompt ('Enter saturation value between 0 and 10\n0 has no effect\n10 is full color saturation', GM_getValue ('saturation'));
	n = Number (i);
	if (!isNaN (n)) {
		if (n >= 0 && n <= 10) {
			GM_setValue ('saturation', Math.round(n));
			window.location.href=window.location.href;
		}
	}
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '50934', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();				
		
			

			
		



		
		
