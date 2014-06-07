// ==UserScript==
// @name           WK Emblems
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/worldkaiju-spend.html
// ==/UserScript==

var keyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 109];
//1-9, 0 and -

function process_event(event) {
   for(var j = 0; j < keyCodes.length; j++){
      
         if (event.keyCode == keyCodes[j]){
         	var boxwk = document.evaluate("//table[1]/tbody/tr/td/form/select", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

		boxwk.selectedIndex = j;

		var checkboxs = document.evaluate("//table[1]/tbody/tr/td/form/input[@type='checkbox']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

		checkboxs.setAttribute('checked','true');   
           document.forms.namedItem("chooseemblem").wrappedJSObject.submit();
 
         }
        
   }  
}





window.addEventListener("keyup", process_event, false);