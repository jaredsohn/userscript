// ==UserScript==
// @name           nextfleetlist2
// @namespace      greasybabeswithlargelowinterestloans.net
// @description    next fleet list whatev
// @include        *war-facts.com/fleet_navigation.php*
// ==/UserScript==
	/* Whether it jumps to the next still fleet or not. Change to "false" if you want every fleet. */
	var nextwaiting = true;
	
	
	/* PUT YOUR FLEET ID's IN THE BRACKETS HERE SEPARATED BY COMMAS (REMOVE THE DEFAULTS) */
	var ships = new Array(232,
						  233, // you can comment fleets like this
						  3229, // if you want
						  3238);
	
	
	
	/* LEAVE THIS STUFF OR I WILL MURDER YOU */
	
	// Parses url's and returns the fleet id
	function getFleetID(fleeturl){
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
	
	var fleetnum = getFleetID(document.URL);
	var arraypos = "durr";
	
	// finds where current fleet is in the list
	for(var i =0; i <= ships.length; i++){
		if(ships[i] == fleetnum){
			arraypos = i;
			break;
		}
	}
	
	// big stupid mess
	if(arraypos != "durr"){
		xpathstring = "";
		var nothingcheck = document.evaluate("/html/body/div/div/center/p[2]/font/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var launchcheck = document.evaluate("/html/body/div/div/center/p[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var travelcheck = document.evaluate("/html/body/div/div/center/p[2]/font/strong",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(nothingcheck != null){
			xpath = nothingcheck;
		}
		else if(launchcheck != null){
			xpath = launchcheck;
			// code taken from freaks game with 50k registered users
			window.location.href = 'http://www.war-facts.com/fleet_navigation.php?fleet='+ships[arraypos+1]+'' ;
		}
		else if(travelcheck != null){
			xpath = travelcheck;
		}
		
		nextfound = false;
		html = "";
		if(arraypos > 0){
			html += '<a href="fleet_navigation.php?fleet='+ships[arraypos-1]+'">Prev Fleet</a>&nbsp;&nbsp;' ;
		}
		html += xpath.innerHTML;
		if(arraypos < ships.length-1){
			
			if(nextwaiting == true){
				fleetlist = document.evaluate("//li[@id='class-258']/a", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				while(fleetleft = fleetlist.iterateNext()){
					if(fleetleft.href.indexOf("fleet=")>0 && fleetleft.style.color == ""){
						nextshipid = getFleetID(fleetleft.href);
						for(i= arraypos+1; i<ships.length; i++){
							//alert("current ship in menu: "+nextshipid+"\nNext ship in list: "+ships[i]);
							if(nextshipid == ships[i]){
								nextship = 	'&nbsp;&nbsp;<a href="fleet_navigation.php?fleet='+ships[i]+'">Next Fleet</a>';
								nextfound = true;
								// this is the most complicated way possible i'm sure of it
							}
							if(nextfound == true) /* This script takes me one step closer to the edge and I'm about to */ break;
						}
					}
					if(nextfound == true) break;
				}
				if(nextfound != true){
					nextship = '&nbsp;&nbsp;<a href="fleet_navigation.php?fleet='+ships[0]+'">First Fleet</a>';	
				}
			}
			else{ 
				nextship = '&nbsp;&nbsp;<a href="fleet_navigation.php?fleet='+ships[arraypos+1]+'">Next Fleet</a>';
			}
			html += nextship;
		}
		else{html += '&nbsp;&nbsp;<a href="fleet_navigation.php?fleet='+ships[0]+'">First Fleet</a>' ;}
			
		xpath.innerHTML = html;
		
	}
	// i make her say oh oh oh ohohohoh when i po po po pokerface po po pokerface // 
	
	
	
	
	
