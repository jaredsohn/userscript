// ==UserScript==
// @name           Sirsi polozky v G+
// @include        https://plus.google.com/u*
// @include        https://plus.google.com/*
// ==/UserScript==

function changecss(theClass,element,value) {
// autorem teto funkce je Shawn Olson www.shawnolson.net
var cssRules;
for (var S = 0; S < document.styleSheets.length; S++){

	try{
	document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
	} catch(err){	
		try{document.styleSheets[S].addRule(theClass,element+': '+value+';');
		}catch(err){
			try{
				if (document.styleSheets[S]['rules']) {
					cssRules = 'rules';
				} else if (document.styleSheets[S]['cssRules']) {
					cssRules = 'cssRules';
				} else {
				//no rules found... browser unknown
				}

				for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
					if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
						if(document.styleSheets[S][cssRules][R].style[element]){
							document.styleSheets[S][cssRules][R].style[element] = value;
							break;
						}
					}
				}
			} catch (err){}

		}
	}
}
}

changecss('.lzqAld','width','1000px');
changecss('.Te','width','950px');
changecss('.hsHREd', 'left', '10000px');