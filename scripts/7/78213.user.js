// ==UserScript==
// @name Endomondo pace shower
// @namespace soerennielsen
// @version  20100603
// @description    Add "pace min/km" to the Endomondo list of news 
// @include        http://www.endomondo.com/home
// @include        http://www.endomondo.com/profile
// @author         Søren L. Nielsen
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

var version="20100603";
var kmReg = /(\d+\.\d+) km/;
var timeReg = /((\d)h\:)?(\d?\d)m\:(\d?\d)s/;
var newsContentDivs = document.getElementsByClassName('newsContent');

for (var i = 0; i < newsContentDivs.length; i++) {
	//run through all the spans and find the right one
	var newsContentSpans = newsContentDivs[i].getElementsByTagName('span');
	for( var j = 0; j< newsContentSpans.length; j++ ){
		//check if we found the right span
		var content = newsContentSpans[j].innerHTML;
		if( kmReg.test(content) && timeReg.test(content) ){
			//Parse the values
			var kmMatch = content.match(kmReg);
			var km = parseFloat( kmMatch[1] );
			var timeMatch = content.match(timeReg);
			var minutes = (timeMatch[2] ? parseFloat(timeMatch[2])*60 : 0 ) + parseFloat(timeMatch[3]) + (parseFloat(timeMatch[4])>0 ? parseFloat( timeMatch[4] )/60.0 : 0);
			var pace = minutes / km;
			var paceMinutes = Math.round((pace - Math.floor(pace)) * 60);
			var paceFormat = Math.floor(pace) + ":" + (paceMinutes<10 ? "0" : "") + paceMinutes;
			//Add the html and slice off a dot too many.
			newsContentSpans[j].innerHTML = newsContentSpans[j].innerHTML.substr(0, newsContentSpans[j].innerHTML.length - 1) + 
				" (pace " + paceFormat + " min/km).";
		}
	}
}

