// ==UserScript==

// @name		Flash Blocker Taringa!
// @namespace		http://taringa.net/perfil/Ootl7
// @description		Ignora los archivos Flash de Taringa!.
// @run-at document-start
// @include http://*
// ==/UserScript==
//

(function(){


// Exclude list
	
var exclude = ['mail.google.com', 'blizzard.com', 'megaupload.com', 'files.mail.ru', 'youtube.com'];

var css = 'object[classid$=":D27CDB6E-AE6D-11cf-96B8-444553540000"],object[codebase*="swflash.cab"],object[data*=".swf"],embed[type="application/x-shockwave-flash"],embed[src*=".swf"],object[type="application/x-shockwave-flash"],object[src*=".swf"],object[codetype="application/x-shockwave-flash"],iframe[type="application/x-shockwave-flash"],object[classid$=":166B1BCA-3F9C-11CF-8075-444553540000"],object[codebase*="sw.cab"],object[data*=".dcr"],embed[type="application/x-director"],embed[src*=".dcr"],object[type="application/x-director"],object[src*=".dcr"],object[classid$=":15B782AF-55D8-11D1-B477-006097098764"],object[codebase*="awswaxf.cab"],object[data*=".aam"],embed[type="application/x-authorware-map"],embed[src*=".aam"],object[type="application/x-authorware-map"],object[src*=".aam"],object[classid*="32C73088-76AE-40F7-AC40-81F62CB2C1DA"],object[type="application/ag-plugin"],object[type="application/x-silverlight"],object[type="application/x-silverlight-2"],object[source*=".xaml"],object[sourceelement*="xaml"],embed[type="application/ag-plugin"],embed[source*=".xaml"]{display:none;}';


// Logos

var play = 'http://ootl.com.ar/taringa/play.png';

var logo = 'http://ootl.com.ar/taringa/play.png';


// Check if site is excluded
var host = location.hostname.replace(/^www\./, '');
for(var i = 0; i < exclude.length; i++) {
if(host == exclude[i]) {
	return;
	}
}


// Block Flash using css

var addStyle = function() {
	var s = document.createElement('style');
	s.setAttribute('type', 'text/css');
	s.setAttribute('style', 'display: none !important;');
	s.appendChild(document.createTextNode(css));
	return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
};


// Check if element is blocked

var isBlocked = function(ele) {
	return getComputedStyle(ele, null).display  == 'none';
};


// Block Flash by parsing properties (backup method) 

var checkforflash = function(elem){                    // checks the element passed to it for ele content
		if (elem.hasAttribute("flashvars") ) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.hasAttribute("type") && elem.getAttribute("type").match(/flash|shockwave|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.hasAttribute("src") && elem.getAttribute("src").match(/.swf|shockwave|flash|eyewonder|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.innerHTML.match(/.swf|shockwave|flash|eyewonder|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		return false;
};


// Make div to be put in place of Flash element

var add_play_flash_div = function(ele) {
		var embed = ele.getElementsByTagName('embed')[0];
		var placeholder = document.createElement("div");
		placeholder.setAttribute("class", "blockflash");
		placeholder.setAttribute('style', 'display:inline-block; overflow:hidden; z-index:999; border:1px dashed #dfdfdf; min-width:20px; min-height:20px; height:'+getComputedStyle(ele, null).height+'; width:'+getComputedStyle(ele, null).width+';background:url('+logo+')no-repeat center; cursor:pointer; -webkit-box-sizing:border-box;');
		placeholder.onmouseover = function() {
				placeholder.style.backgroundImage = 'url (http://www.ootl.com.ar/taringa/play.png)';
		};
		placeholder.onmouseout = function() {
				placeholder.style.backgroundImage = 'url (http://www.ootl.com.ar/taringa/play.png)';
		};
		placeholder.onclick = function() {
				placeholder.parentNode.removeChild(placeholder);
				ele.style.display = 'inline-block';
				if(embed && isBlocked(embed)){
					embed.style.display = 'inline-block';
				}
		};
		ele.parentNode.insertBefore(placeholder, ele);
};


// Check for flash elements

var check = function() {
	var i, e, obj;
	obj = document.getElementsByTagName('object');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(isBlocked(e) || checkforflash(e)) {
				add_play_flash_div(e);
		}		
	}	
	obj = document.getElementsByTagName('embed');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(e.parentNode.nodeName != "OBJECT" && e.parentNode.style.display != "none") {
			if(isBlocked(e) || checkforflash(e)) {
					add_play_flash_div(e);
			}
		}
	}
	obj = document.getElementsByTagName('iframe');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(e.getAttribute('type') == 'application/x-shockwave-flash' && isBlocked(e)) {
			add_play_flash_div(e);
		}
	}
};


// Excute main parts of script

setTimeout(function(){addStyle(css);}, 1);
window.addEventListener('load', check, false);


})();

// Based on the Flashblock and BlockFlash user scripts
//
// 1.0.3   - Fixed performance regressions
// 1.0.2.3 -  Minor changes
// 1.0.2.2 -  Minor changes
// 1.0.2.1 -  Optimizations
// 1.0.2   -  Optimizations, Removed partial Opera support
// 1.0.1   -  Fixed click to play functionaility and mouse-over effect
// 1.0     -  Initial Release