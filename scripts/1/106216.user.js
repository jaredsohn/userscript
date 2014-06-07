// ==UserScript==
// @name           Roulette 11-Pronged Seal
// @namespace      Conster
// @description    Speeds up Roulette for the 11-Pronged Seal requirement
// @include        http://www.animecubed.com/billy/bvs/partyhouse-roulette.html
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==83){		//s
		var tables = document.getElementsByTagName("table");
		var everything = tables[0].innerHTML;	//this contains your password several times, so I'll be careful not to peep
		if (everything.indexOf("If this is what you want") != -1) {
			document.forms.namedItem("confirmd").submit();
		} else if (everything.indexOf("Spin Results") != -1) {
			document.forms.namedItem("refwheel").submit();
		} else if (everything.indexOf("Current bets") != -1) {
			var checkthis = document.evaluate("//input[@name='spinconfirm' and @value=1]", document, null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(checkthis != null) {
				checkthis.wrappedJSObject.checked = true;
			}
			document.forms.namedItem("sendspin").submit();
		} else {
			var checkthis = document.evaluate("//input[@name='bettype' and @value=1]", document, null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(checkthis != null) {
				checkthis.wrappedJSObject.checked = true;
			}
			var fillthis = document.evaluate("//input[@name='ryouse']", document, null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(fillthis != null) {
				fillthis.value = 440000;		//440k for 11 million requirement
			}
			var pickthis = document.evaluate("//select[@name='bet']", document, null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if (pickthis != null) {
				var list = pickthis.options;
				for(var i=0; i<list.length; i++) {
					if (list[i].value == "11") {			//11
						list[i].selected = "1";
					}
				}				
			}
			document.forms.namedItem("woospin").submit();
		}
	}
}
window.addEventListener("keyup", process_event, false);