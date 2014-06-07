// ==UserScript==
// @name           MSPAccess
// @description    And MSPA navigation tool.
// @include        http://*.mspaintadventures.com/*
//
// @version 1.0
// @creator Scott Inglis
// ==/UserScript==

var buttonState = 0;

//So for anyone who reads this and is wondering why I have such a shitty method for
//finding the next page command, it's because whoever programmed mspaintadventures.com has 
//apparently never heard of ID tags, let alone divs. The whole thing is made of 
//nondescript tables. I just had to hunt through the page for anything that looks like a 
//link to the next page. Pray Hussie never implements multiple links on one page like in 
//Bard's Quest.

function key_event(e){
	if(e.keyCode==39){
		var fontList = document.getElementsByTagName('font');
		for(i in fontList){
			if(fontList[i].size=="5"){
				var aList = fontList[i].getElementsByTagName('a');
				for(j in aList){
					if(aList[j].href.indexOf('?s=')>0){
						window.location.href=aList[j].href;
					}
				}
			}
		}
	}
	if(e.keyCode==37){
		var aList = document.getElementsByTagName('a');
		for(i in aList){
			if(aList[i].innerHTML == "Go Back"){
				window.location.href=aList[i].href;
			}
		}
	}
	if(e.keyCode==96 || e.keyCode==45 || e.keyCode==48){
		document.getElementsByTagName('button')[buttonState].click();
		if(buttonState==0){buttonState++;}
		else{buttonState--;}
	}
}

window.addEventListener( 'keydown', key_event, false );
