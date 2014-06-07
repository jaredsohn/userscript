// ==UserScript==
// @name           Lazy Spy Script
// @namespace      Crusader
// @include	http://*animecubed.com/billy/bvs/villagespy.html
// @include     http://www.animecubed.com/billy/bvs/villagespy.html
// @include	http://*animecubed.com/billy/bvs/villagespyattempt.html
// @include     http://www.animecubed.com/billy/bvs/villagespyattempt.html
// ==/UserScript==

//This code is specifically not to be posted on any forums, official or otherwise.
//There's no real punishment for doing so other than I will find out who did it and not
//write any more scripts.

//Note: This script does not conform to the rules of the Greasemonkey Section of the official forums, therefore, it is not allowed to be posted.

/////////////////////////////////////////////
if (/billy.bvs.villagespy\./.test(location.href))
{

var myInputs=document.getElementsByTagName("input");
var mySpies = new Array();

for (var i=0; i<myInputs.length; i++) {
	var myElement = myInputs[i];
	if (myElement.getAttribute("name") == "spycheck") {
		mySpies.push(myElement);
	}
}

var j = 0;
var firstEnabledSpy = mySpies[j];
while(firstEnabledSpy.disabled == true) {
	j++;
	firstEnabledSpy = mySpies[j];
	firstEnabledSpy.checked = true;
}


for (var i=0; i<mySpies.length;i++) {
	var mySpy = mySpies[i];
	if (mySpy.disabled == true) {
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy);
	}
}


}
/////////////////////////////////////////////

function process_event(event) {
	if (event.keyCode==65){	// a
		document.forms.namedItem("lookinto").submit();	}
if (event.keyCode==83){		// s
		document.forms.namedItem("spyatt").submit();	}
if (event.keyCode==68){		// d
		document.forms.namedItem("spy").submit();	}
}
window.addEventListener("keyup", process_event, false);