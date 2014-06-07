// ==UserScript==
// @name          Set Time Zone to Pacific on East Coast Gawker Blogs
// @description	  Changes the post time stamp to the Pacific time zone on Gawker, Jezebel, Deadspin, Consumerist, Fleshbot, and Jalopnik.
// @namespace     http://ginatrapani.org/workshop/firefox/betterlifehacker/
// @include       http://gawker.com/*
// @include       http://jezebel.com/*
// @include       http://deadspin.com/*
// @include       http://consumerist.com/*
// @include       http://fleshbot.com/*
// @include       http://jalopnik.com/*

// @author	Gina Trapani
// @homepage http://userscripts.org/scripts/show/29457
// ==/UserScript==


window.addEventListener( 'load', function() { 
		var TZ_offset=-3;
		var TZ_name="PT";

		//Linked post timestamps wrapped in <strong> tag
		var allElements, thisElement, elementContents, elementLen;
		var splitPos, curHour, curMin, curTimeOfDay; 
		var adjHour, adjMin, adjTime;

		allElements = document.getElementsByTagName('strong');
		for (var i = 0; i < allElements.length; i++) {
			thisElement = allElements[i];
			elementContents=thisElement.innerHTML;
			elementLen = elementContents.toString().length;
			if (elementLen > 2)	{
				curTimeOfDay = elementContents.substr(elementLen-2, 2);

				if ( curTimeOfDay == "PM" || curTimeOfDay == "AM") {
					//GM_log("Pacific Time: " + elementContents);
					splitPos = elementContents.indexOf(':');
					if(splitPos==1) { // Single Digit Hour 
						curHour =elementContents.substr( splitPos-1, 1);
					} else { // Double Digit Hour
						curHour = elementContents.substr(splitPos-2, 2);
					}
					curMin = elementContents.substr(splitPos+1, 2);
				
					curHour =  parseInt(curHour);
					adjHour = curHour + TZ_offset;
					//GM_log("Adjusted hour is " + adjHour );
					if ( adjHour >= 12 ) {
						if ( adjHour != 15) 
							curTimeOfDay=="PM" ? curTimeOfDay="AM" : curTimeOfDay="PM";
						if ( adjHour > 12 ) 
							adjHour = adjHour-12;
					}
					
					if ( adjHour < 0 ) {
						adjHour = 12+adjHour;
						curTimeOfDay=="PM" ? curTimeOfDay="AM" : curTimeOfDay="PM";
					}
					if ( adjHour == 0 ) {
						adjHour = 12;
					}
					if (curHour==12)
						curTimeOfDay=="PM" ? curTimeOfDay="AM" : curTimeOfDay="PM";
					

					//GM_log("ET hour is " + adjHour + curTimeOfDay);

					adjTime = document.createElement('strong');
					adjTime.innerHTML=(adjHour + ":" + curMin + " " + curTimeOfDay + " " + TZ_name);
					thisElement.parentNode.replaceChild(adjTime, thisElement);
				} 

			}

		}

		// Most popular post timestamps
		var allDivs, thisDiv, restOfDate;
		allDivs = document.evaluate(
			"//div[@class='metadata']/p",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);

			if ( thisDiv.innerHTML.length > 15 && thisDiv.innerHTML.length < 30 ) 	{

				elementContents=thisDiv.innerHTML;
				restOfDate=elementContents.substr(8);
				elementContents=elementContents.substr(0, 7);
				elementLen=elementContents.length;
				curTimeOfDay = elementContents.substr(elementLen-2, 2);

				if ( curTimeOfDay == "PM" || curTimeOfDay == "AM") {
					//GM_log("Pacific Time: " + elementContents);
					splitPos = elementContents.indexOf(':');
					if(splitPos==1) { // Single Digit Hour 
						curHour = elementContents.substr( splitPos-1, 1);
					} else { // Double Digit Hour
						curHour = elementContents.substr(splitPos-2, 2);
					}
					curMin = elementContents.substr(splitPos+1, 2);
				
					adjHour = parseInt(curHour) + TZ_offset;
					if ( adjHour >= 12 ) {
						if ( adjHour != 15) 
							curTimeOfDay=="PM" ? curTimeOfDay="AM" : curTimeOfDay="PM";
						if ( adjHour > 12 ) 
							adjHour = adjHour-12;
					}

					thisDiv.innerHTML=adjHour+":"+curMin + " " + curTimeOfDay + " " + TZ_name + " " + restOfDate;
				}

			} 
		}

}, true);



