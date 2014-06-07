// ==UserScript==
// @name           Sirsi polozky v G+ testing
// @include        https://plus.google.com/u*
// ==/UserScript==

function changecss(theClass,element,value) {
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

changecss('.Yf96sb', 'position','absolute');
changecss('.Yf96sb', 'right','10000px');
changecss('.KBMoYc', 'position','absolute');
changecss('.KBMoYc', 'right','10000px');

//changecss('.e-dd', 'min-width','100px');
changecss('.ncGWdc', 'width','95%');
changecss('.iH', 'width','auto');
changecss('.lzqAld','width','1000px');
changecss('.Te','width','950px');
changecss('.SG','width','auto');
changecss('.hsHREd', 'left', '10000px');