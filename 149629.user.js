/**
* @package: Elead - remove auto emails from list
* @authors: crazydude
* @created: November 5, 2012
*/

// ==UserScript==
// @name           Elead auto remover
// @namespace      eleadauto
// @description    Removes auto emails from list
// @include        http://www7.eleadcrm.com*
// @include        http://www7.eleadcrm.com*
// @version        1.1
// ==/UserScript==

(function() {
	function $x(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while ((i = x.iterateNext())) r.push(i);
	return r;
	}
	
	function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

	var phoneLeads = $x('.//tr[@style="height:20px;"]');

	function leads(){
		for(var i=0; i < phoneLeads.length; i++){
			if(phoneLeads[i].innerHTML.match ( /\bDay\s\d+/g ) )
				phoneLeads[i].style.display = 'none';
			else{
				phoneLeads[i].setAttribute("id", "phoneUp");
			}
		}
 	}

	var activeLeads = $x('.//tr[@style="width:150px;"]');
	var activeLeadsButton = xpathFirst('//*[@id="divProspects"]/a[1]');
	
	function activeProspects(){
		for(var i=0; i < activeLeads.length; i++){
			if(activeLeads[i].innerHTML.match ( /\bLourenco/g ) )
				activeLeads[i].style.display = 'none';
		}
	}
	
	
	if(document.loaded) {
		document.getElementById("liTodaysActivities").onclick=function(){leads()};
		document.getElementsByClassName("LinkButton7").onclick=function(){activeProspects()};
		
	} 
	else {
		if (window.addEventListener) {  
			window.addEventListener('load', leads, false);
			window.addEventListener('load', activeProspects, false);
		} 
		else {
			window.attachEvent('onload', leads);
			window.attachEvent('onload', activeProspects);
		}
	}
  

  
  
})();
