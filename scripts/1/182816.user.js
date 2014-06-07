// ==UserScript==
// @name           Alternatio
// @description    Alternative discussion button
// @namespace      http*://*.sme.sk/c/*/*.html
// @include        http*://*.sme.sk/c/*/*.html
// @version        0.0.4
// @author         JErik  
// @grant          none
// ==/UserScript==

$(document).ready(function() {

	function appendContentInContainer(matchClass,content) {
		var elems = document.getElementsByTagName('*'), i;
		for (i in elems) {
			if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
				elems[i].appendChild(content);
			}
		}
	}

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	addGlobalStyle(".alternatio { color: white; margin-top: 10px; padding: 11px; border-radius: 5px; background: #949494; background: -moz-linear-gradient(top,  #949494 0%, #565656 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#949494), color-stop(100%,#565656)); background: -webkit-linear-gradient(top,  #949494 0%,#565656 100%); background: -o-linear-gradient(top,  #949494 0%,#565656 100%); background: -ms-linear-gradient(top,  #949494 0%,#565656 100%); background: linear-gradient(to bottom,  #949494 0%,#565656 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#949494', endColorstr='#565656',GradientType=0 ); } .alternatio a { font-family: Verdana, Arial, sans-serif; font-size: 14px; line-height: 1.7em; font-weight: bold; color: white; }");

	var myLink = "http://www.pravda.sk";
	

	var buttonDisc = document.createElement("div");
	$(buttonDisc).html("<a href='" + myLink + "' title='Diskusia'>Alternatívna diskusia k článku</a>");
	$(buttonDisc).addClass("alternatio");
	$(".art-diskusia-ext").append(buttonDisc);
	$(".comments").append(buttonDisc);
	
});
