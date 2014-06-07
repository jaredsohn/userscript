// ==UserScript==
// @name Endomondo pace shower
// @namespace bastianmeier
// @version  1.2
// @description    Add "pace min/km" to the Endomondo list of news 
// @include        *endomondo.com/home*
// @include        *endomondo.com/profile/*
// @author         Bastian Meier, Søren L. Nielsen(original author)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==



var version="1.1";
var kmReg = /(\d+\.\d+) km/;
var timeReg = /((\d)h\:)?(\d?\d)m\:(\d?\d)s/;
var newsMessages = document.getElementsByClassName('newsMessage');

//console.log('insgesamt: ' +newsMessages.length);
for (var i = 0; i < newsMessages.length; i++) {
	//console.log(i +':');

	var newsContent = newsMessages[i].getElementsByClassName('pathLink');
	//console.log('  newsContent[0]: ' + newsContent[0]);
	if(typeof newsContent[0]!='undefined' )
	{
		//console.log('  -pathlink found-');
		var content = newsContent[0].innerHTML;
		//console.log('  content: ' + content);
		//Parse the values
		var kmMatch = content.match(kmReg);
		//console.log('    km: ' + kmMatch);
		var timeMatch = content.match(timeReg);
		//console.log('    time: ' + timeMatch);
		if (timeMatch && kmMatch){
			var km = parseFloat( kmMatch[1] );
			var minutes = (timeMatch[2] ? parseFloat(timeMatch[2])*60 : 0 ) + parseFloat(timeMatch[3]) + (parseFloat(timeMatch[4])>0 ? parseFloat( timeMatch[4] )/60.0 : 0);
			//console.log('    minutes: ' + minutes);
			var pace = minutes / km;
			var paceMinutes = Math.round((pace - Math.floor(pace)) * 60);
			var paceFormat = Math.floor(pace) + ":" + (paceMinutes<10 ? "0" : "") + paceMinutes;

			//Add the html and slice off a dot too many.
			newsContent[0].innerHTML = newsContent[0].innerHTML.substr(0, newsContent[0].innerHTML.length - 8) + 
			" (pace " + paceFormat + " min/km).";
		}
	}
	//console.log(' :' + i);
}
