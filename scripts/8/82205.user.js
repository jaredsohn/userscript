// ==UserScript==
// @name           antiblockv2 alpha
// @author         Panics [userscripts.org]
// @description    macht die seite zumindest etwas benutzbar^^ - das script ist aber noch nicht fertig
// @include        *
// ==/UserScript==


function asdf() {
	var count=0;
	var count2=0;
	var testMaxZIndex=0;
	var ab=new Array();
	var count3=0;
	
	for each (var tags in document.getElementsByTagName('*')) {
		count++;
	}
	
	//alert(count);
	
	
	var tarr = new Array(count);
	for (var i = 0; i < count; ++i) {
		tarr[i] = new Array(3);
	}
	


	for each (var tags in document.getElementsByTagName('*')) {
		//alert(tags);
		tags.style.zIndex=99999999;
		tarr[count2][0]=tags
		tarr[count2][1]=tags.style.zIndex;
		tarr[count2][2]=tags.innerHTML.search(/antiblock/i);
		if (tarr[testMaxZIndex][1] <= tarr[count2][1]) {
			if (tarr[count2][2] > -1) {
				if (count3>2) break;
				testMaxZIndex = count2;
				//alert(tarr[testMaxZIndex][0] & ', ' & tarr[testMaxZIndex][1] & ', ' & tarr[testMaxZIndex][2]);
				//alert(testMaxZIndex);
				document.getElementsByTagName('*')[testMaxZIndex].style.zIndex=-99999999;
				//document.getElementsByTagName('*')[testMaxZIndex].parentNode.removeChild(document.getElementsByTagName('*')[testMaxZIndex]);
				ab[count3]=tags.style.zIndex;
				count3++;
				
			}
		} else {
			tags.style.zIndex=99999999;
		}
if (count3>2) break;
		count2++;
	}
}
var t=setTimeout(asdf,3000);
