// ==UserScript==
// @name           Goozex Actual Queue Position
// @namespace      goozMiscTweaks
// @description    Makes the active queue position visible
// @include        http://*goozex.*/trading/asp/myrequests.asp*
// @include        http://*goozex.*/trading/asp/myoffers.asp*
// ==/UserScript==

//By Met48
//First the script finds all of the "[view stats]" buttons
//This narrows down the element list to sort through considerably, as this class is mainly used right after the position indicator
var avails = document.evaluate("//a[@class='pushBluette']",document,null,XPathResult.ANY_TYPE,null);

var elements=Array();

var thisPosition = avails.iterateNext();
while (thisPosition) {
	if (thisPosition.innerHTML=="[view stats]"){
		elements=elements.concat(Array(thisPosition));
	}
	thisPosition=avails.iterateNext();
}

//The main function takes the form of an interrupted loop
//Due to issues with storing object references I made each request blocking - that is, it waits on each and every request for the stats of a particular item before continuing
//It would be a lot faster to do multiple requests

var i=0;
function loopThrough(){
	if (i<elements.length){
		//Number holds the node that actually contains the position number
		var number = elements[i].previousSibling.previousSibling;
		if (number.className=="txtBlu"&&number.innerHTML.indexOf("You are the first in line!")<0){
			var url = elements[i].href;
			url=url.replace("javascript:open_requeststats(","");
			url=url.replace("javascript:open_offerstats(","");
			url=url.split(",");
			url=url[0];
			
			if (document.location.href.indexOf("myoffers")>=0)
				url = "http://www.goozex.com/trading/asp/dialogs/offerstats.asp?id=" + url;
			else
				url = "http://www.goozex.com/trading/asp/dialogs/requeststats.asp?id=" + url;
			
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				headers: {
					"User-Agent": "Mozilla/5.0",
					"Accept": "text/xml"
				},
				onload: function(response){
					processItem(response);
				},
				onerror: function(response){
					loopThrough();
				}
			} );
		}else{
			i++;
			loopThrough();
		}
	}else
		GM_log("Done!");
}

function processItem(response){
	//This part is very reliant on formatting - I assume that Goozex won't be changing its layout for the stats window anytime soon
	var index=response.responseText.indexOf("<u>Total&nbsp;requests:");
	var amt=77;
	if (index<0){
		index=response.responseText.indexOf("<u>Total&nbsp;offers:");
		amt=75;
	}
	if (index>=0){
		var txtArea = elements[i].previousSibling.previousSibling;
		
		index+=amt;
		var index2 = response.responseText.indexOf("</b>",index);
		var num=response.responseText.substring(index,index2);
		num = parseInt(num);
		num+=1;
		if (num==1)
			num="First";
		var pre = txtArea.innerHTML;
		txtArea.innerHTML = num + "/" + pre;
		//GM_log(response.statusText + " " + num);
	}
	i++;
	loopThrough();
}

//Gets the ball rolling
loopThrough();