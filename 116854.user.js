// Ncore Spooky Hunter
// Copyright (c) 2011, 913SCH
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          Ncore Spooky Hunter
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Catches all pumpkins.
// @include       https://ncore.cc/*
// ==/UserScript==

SpookyCounter = 0;
BadSpookyCounter = 0;
GoodSpookyCounter = 0;
spookyHunterNcoreCont = document.getElementById("container");
spookyHunterOutput = document.createElement('h1');
document.body.insertBefore(spookyHunterOutput, spookyHunterNcoreCont);

spookyHunterOutput.innerHTML = "Capturing Spookie Events: Enabled. Waiting for event...";

client.addEvent('raw_postmsg', function(raw, pipe){
	if(raw.data.message['type']=='spo0ky'){
		console.log('Spooky!');
		var apeSID = raw.data.message['sid'];
        var apeSalt = raw.data.message['salt'];
        var apeEvent = raw.data.message['event'];
        var apeName = raw.data.message['name'];
    	
    	spookyAjaxSubmit(apeSID, apeSalt);

    	if(apeEvent=='good')++GoodSpookyCounter;
    	else if(apeEvent=='bad') ++BadSpookyCounter;

	if(apeEvent=='good'){
    	var output = 'Good spooky submitted. ('+(++SpookyCounter)+' captured, '+GoodSpookyCounter+' good, '+BadSpookyCounter+' bad)';
    	console.log(output);
    	spookyHunterOutput.innerHTML = output;}
	
	if(apeEvent=='bad'){
    	var output = 'Questionable spooky submitted. ('+(++SpookyCounter)+' captured, '+GoodSpookyCounter+' good, '+BadSpookyCounter+' bad)';
    	console.log(output);
    	spookyHunterOutput.innerHTML = output;}

	}
})