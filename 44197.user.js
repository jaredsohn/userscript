// ==UserScript==
// @name           Remove Stories About Horrible Things Happening To Children From CNN.COM
// @namespace      http://bshort.com/code/greasemonkey/
// @include        http://www.cnn.com/
// ==/UserScript==

var singleMatch = new Array();
singleMatch[0] = "Caylee";
singleMatch[1] = "Britney";
  
var childSynonyms = new Array();
childSynonyms[0] = "child";
childSynonyms[1] = "babe";
childSynonyms[2] = "kid";
childSynonyms[3] = "children";
childSynonyms[4] = "boy";
childSynonyms[5] = "girl";
childSynonyms[6] = "teen";
childSynonyms[7] = "parent";
childSynonyms[8] = "tot";
childSynonyms[9] = "infant";
childSynonyms[10] = "baby";
childSynonyms[11] = "mom";
childSynonyms[12] = "dad";
childSynonyms[13] = "mother";
childSynonyms[14] = "father";


var harmSynonyms = new Array();
harmSynonyms[0] = "beat";
harmSynonyms[1] = "kill";
harmSynonyms[2] = "hurt";
harmSynonyms[3] = "missing";
harmSynonyms[4] = "sex";
harmSynonyms[5] = "death";
harmSynonyms[6] = "dead";
harmSynonyms[7] = "murder";
harmSynonyms[8] = "shaken";
harmSynonyms[9] = "kidnapped";
harmSynonyms[10] = "behead";
harmSynonyms[11] = "incest";
harmSynonyms[12] = "guilty";
harmSynonyms[13] = "rape";
harmSynonyms[14] = "cancer";
all = document.getElementsByTagName('*');
 
var foundKid = false;
var foundHarm = false;
var foundKidSynonym = 0;
var foundHarmSynonym = 0;


for (var i = 0; i < all.length; i++) {
    element = all[i];


   	if (element.nodeName == 'LI' || (element.nodeName == 'A' )) {
	
		foundKid = false;
		foundHarm = false;

		foundKidSynonym = 0;
	    foundHarmSynonym = 0;
		//	alert("we found an li" + element.innerHTML);
	 	   //alert(element.nodeName);
 		for (var l = 0; l < singleMatch.length; l++){
			//alert("we're looking at" + element.innerHTML);
			if (element.innerHTML.toLowerCase().indexOf(singleMatch[l].toLowerCase()) > 0){
			//	alert("we found" + childSynonyms[j] + " so we're removing" + element.innerHTML);
			//GM_log("we found " + childSynonyms[j] +  " so we're flagging " + element.innerHTML);
				foundKid = true;
 				foundHarm = true;
 				//break;
			}
		}
		if (!foundKid && !foundHarm){
			for (var j = 0; j < childSynonyms.length; j++){
				//alert("we're looking at" + element.innerHTML);
				if (element.innerHTML.toLowerCase().indexOf(childSynonyms[j].toLowerCase()) > 0){
				//	alert("we found" + childSynonyms[j] + " so we're removing" + element.innerHTML);
				//GM_log("we found " + childSynonyms[j] +  " so we're flagging " + element.innerHTML);
					foundKid = true;
					foundKidSynonym = j;
					//break;
				}
			}
		}
		if (foundKid && !foundHarm){
			for (var k = 0; k < harmSynonyms.length; k++){
				if (element.innerHTML.toLowerCase().indexOf(harmSynonyms[k].toLowerCase()) > 0){
					//GM_log("we found " + harmSynonyms[k] +  " so we're flagging " + element.innerHTML);
					foundHarm = true;
					foundHarmSynonym = k;
				}
			//	break;
			}
			
		}
		if (foundKid && foundHarm){
			//blank the content
			//	GM_log("we found" + harmSynonyms[foundHarmSynonym] + " and " + childSynonyms[foundKidSynonym] + " so we're removing" + element.innerHTML);
			
//			alert("we found" + harmSynonyms[foundHarmSynonym] + " and " + childSynonyms[foundKidSynonym] + " so we're removing" + element.innerHTML);
			element.innerHTML = "HAVE A NICE DAY! " ;//+ element.innerHTML;
		} 
	}
}