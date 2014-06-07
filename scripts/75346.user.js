// ==UserScript==
// @name           Self censor
// @namespace      http://rimu.geek.nz/
// @description    Hides news articles that have certain words in the headline
// @include        http://news.google*
// @include        https://news.google*
// ==/UserScript==

var badWords = ["penis", "rapist", "blaze", "assault", "abducted", "murder", "crash", "rape", "killer", "killed", "bank robber", "dead", "death", "car bomb", "missing", "robbery", "drunk driver", "stab"];


// delete Element
function $ed(element) {
	element.parentNode.removeChild(element);
}


var allDivs, thisDiv;
allDivs = document.evaluate(
	'//div[contains(@class, "story")]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
          
if(allDivs != null && allDivs.snapshotLength > 0){
    
		for (var l = 0; l < allDivs.snapshotLength; l++){
            thisDiv = allDivs.snapshotItem(l);
            for(var j = 0; j < badWords.length; j++){
                if(thisDiv.textContent.toLowerCase().indexOf(badWords[j]) != -1){
                    $ed(thisDiv);
                    break;
                }
            }
        }	
}