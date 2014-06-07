// ==UserScript==
// @name           Oyapassfjerner
// @namespace      http://www.skeib.com
// @description    Fjerner oyapass-poster fra hjemmesiden til underskog.no
// @include        http://underskog.no/
// @include        http://www.underskog.no/
// @include        http://underskog.no/nytt/*
// @include        http://www.underskog.no/nytt/*
// ==/UserScript==

var hiddenCount = 0;

function letsFilter() {
    
  
	//Lager array av alle  innleggene
	var arrayList = document.getElementsByClassName("post"); 
	
	var i = 0;
	for(i = 0; i < arrayList.length; i++)
	{
		html = arrayList[i].innerHTML;
		
		//regexp for inne, case insensitive
		var finnOya = /øya/i;
		var finnPass = /pass/i;
		var backDoor = /backdoor/i;
						
		//separate sga. ting som f.eks orddeling
		var fantOya = html.search(finnOya);
		var fantPass = html.search(finnPass);
		var fantBackdoor = html.search(backDoor);
		
		//Om begge blir funnet
		if(fantOya > 0 && fantPass > 0)
		{
			if(fantBackdoor < 0)
			{
				//Gjemmer hele innlegget	
				hiddenCount++;
				arrayList[i].style.display = "none";
			}
		}
			
	}
	
	
	var footer = document.getElementById("footer");
	
	if(hiddenCount > 0)
	{
		footer.innerHTML = footer.innerHTML + "<center>"+hiddenCount+" øyapass-innlegg fjernet</center>";
	}	
}
	
window.onload = letsFilter();

document.getElementsByClassName = function(class_name) {
    var docList = this.all || this.getElementsByTagName('*');
    var matchArray = new Array();

    /*Create a regular expression object for class*/
    var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");
    for (var i = 0; i < docList.length; i++) {
        if (re.test(docList[i].className) ) {
            matchArray[matchArray.length] = docList[i];
        }
    }

	return matchArray;
}//eof annonymous function