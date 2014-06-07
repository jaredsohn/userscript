// ==UserScript==
// @name           Goozex Display All Stats
// @namespace      goozAllStats
// @description    Makes the "trading stats" page display the corresponding supply/demand details; By Met48
// @include        http://*goozex.com/trading/asp/dialogs/requeststats.asp*
// @include        http://*goozex.com/trading/asp/dialogs/offerstats.asp*
// ==/UserScript==


//Replacing the opener_refresh function is required as the correct url for the trading info page is passed to it

unsafeWindow.opener_refreshO = unsafeWindow.opener_refresh;

unsafeWindow.opener_refresh = function(url, setfocus, afterclose, samepage) {
	unsafeWindow.opener_refresh=unsafeWindow.opener_refreshO;
	unsafeWindow.itemURL = url; //Enables access to the value from the rest of the script
}

//Triggers same function as clicking "game's page"
unsafeWindow.itemdetails();

//Makes it a valid uri for the xmlhttprequest
unsafeWindow.itemURL = unsafeWindow.itemURL.replace("..", "http://goozex.com/trading/asp");

//Main response function to forthcoming request
function modPage(response)
{
	var text = response.responseText;
	//It could be a a request or offer - either way the main process is the same
	var index = text.indexOf("<tr><td colspan=\"5\"><b class=\"titleparagraph\">Supply of your requested");
	if (index<0){
		index = text.indexOf("<tr><td colspan=\"5\"><b class=\"titleparagraph\">Demand for your offered");
	}
	if (index<0){
		//Do nothing
	}else{
		//Finding the first table
		var allTags = document.getElementsByTagName("table");
	
		for (i=0;i<allTags.length;i++){
			if (allTags[i].className=="txt10"){
				var index2 = text.indexOf("<tr><td colspan=\"5\"><img src=\"../ports/0/images/default/px.gif",index);
				if (index2){
					
					var newTable = document.createElement("tr");
					
					var part = text.substring(index,index2);
						//This replace fixes the images
						var regex = new RegExp("../ports/","g");
						part = part.replace(regex,"../../ports/");
					
					newTable.innerHTML="<td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"95%\">\n" + part + "</table></td>";
					//Adds the new data
					allTags[i].parentNode.insertBefore(newTable,allTags[i].nextSibling);
					
					//Changes the height - this value might not always be right, but it's worked so far
					window.outerHeight=807;
				}else{
					//Do nothing
				}
				
				break;
			}
		}
	}
}


//GM_log("Request to " + unsafeWindow.itemURL);
//Actual request
GM_xmlhttpRequest({
	method: "GET",
	url: unsafeWindow.itemURL,
	headers: {
		"User-Agent": "Mozilla/5.0",
		"Accept": "text/xml"
	},
	onload: function(response){
		modPage(response)
	}
} );