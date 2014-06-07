// ==UserScript==
// @name           Goozex View Feedback History Scores
// @namespace      goozMiscTweaks
// @description    Lets you see feedback scores right from the history page
// @include        http://*goozex.com/trading/asp/dialogs/goozexfeedbackhistory.asp*
// ==/UserScript==

//Finds all of the "links" that make the feedback message appear
var avails = document.evaluate("//span[@class='txtGreen']/a[@onmouseover] | //span[@class='txtYellow']/a[@onmouseover] | //span[@class='txtRed']/a[@onmouseover]",document,null,XPathResult.ANY_TYPE,null);

var elements=Array();

var thisPosition = avails.iterateNext();
while (thisPosition) {
	if (thisPosition.innerHTML.indexOf("qm.gif")>=0){
		elements=elements.concat(Array(thisPosition));
	}
	thisPosition=avails.iterateNext();
}

for (i=0;i<elements.length;i++){
	var qual=elements[i].getAttribute("onmouseover");
	var rate=elements[i].parentNode.innerHTML;
	
	//Structure:
	//Check feedback message
		//Determine feedback score
	
	if (rate.indexOf("POSITIVE")>0){
		if (qual.indexOf("but")>0){
			//+5
			elements[i].innerHTML="+ 5 " + elements[i].innerHTML;
		}else{
			//+10
			elements[i].innerHTML="+10 " + elements[i].innerHTML;
		}
	}else if(rate.indexOf("NEUTRAL")>0){
		//-10, same across all neutrals
			elements[i].innerHTML="- 10 " + elements[i].innerHTML;
	}else if(rate.indexOf("SYSTEM")>0){
		//+10, technically
		elements[i].innerHTML="+10 " + elements[i].innerHTML;
	}else{
		if (qual.indexOf("illegal copy")>0){
			//-250, piracy!
			elements[i].innerHTML="-250" + elements[i].innerHTML;
		}
		//-20
		elements[i].innerHTML="-20 " + elements[i].innerHTML;
	}
}