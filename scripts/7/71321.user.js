// ==UserScript==
// @name           getfleetids
// @namespace      howtomakeladygagasayouch.com/pokerface
// @include        *.war-facts.com/fleet_navigation.php?fleet=givefleetids
// ==/UserScript==

	function durrdurr(fleeturl){
		if(fleeturl.indexOf("?") > 0){
			urllength = fleeturl.length+1;
			fleetstart = fleeturl.indexOf("fleet=")+6;
			subs = fleetstart+1;
			fleetnum = 0;
			while(Number(fleetnum) != null){
				fleetnum = fleeturl.substring(fleetstart,subs)
				subs++;
				if(subs == urllength){
					return fleetnum;
					break;
				}
			}
		}
	}	
	var fleetlist = document.evaluate("//li[@id='class-258']/a", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var explorers = "";
	while(fleetleft = fleetlist.iterateNext()){
		if(fleetleft.href.indexOf("fleet=") > 0){
			explorers += durrdurr(fleetleft.href)+", ";
		}
	}
	
	infobox = document.evaluate("/html/body/div/div/center/table/tbody/tr/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	infobox.innerHTML = explorers.substr(0, explorers.length-2);