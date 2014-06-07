// ==UserScript==
// @name        IkariamServeurM
// @namespace   IkariamServeurM
// @include     http://*.ikariam.com*
// @version     1
// ==/UserScript==



var listBalises = document.getElementsByTagName("option");
var regex = /s([0-9]+).([a-zA-Z]+).ikariam.com/i;


for(var i=0; i<listBalises.length; i++){
	if(regex.test(listBalises[i].getAttribute('value'))) {
		var num = regex.exec(listBalises[i].getAttribute('value'));
		listBalises[i].setAttribute('value', "m"+num[1]+"."+num[2]+".ikariam.com");
	}
}
