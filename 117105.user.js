// Ncore Spooky Hunter
// Released under the GPL license
// Copyright (c) 2011, fejese
// http://www.gnu.org/copyleft/gpl.html
//
// Original:
// by nodht: http://userscripts.org/scripts/show/116854
// Copyright (c) 2011, 913SCH
// ==UserScript==
// @name          Ncore Spooky Hunter
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Catches GOOD pumpkins.
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
    	

	    	if(apeEvent=='good') {
			++GoodSpookyCounter;
		    	spookyAjaxSubmit(apeSID, apeSalt);
		    	var output = 'Good spooky submitted. ('+(++SpookyCounter)+' captured, '+GoodSpookyCounter+' good, '+BadSpookyCounter+' bad)';
    			console.log(output);
		    	spookyHunterOutput.innerHTML = output;
    		} else if(apeEvent=='bad'){
			++BadSpookyCounter;
    			var output = 'Questionable spooky NOT submitted. ('+(++SpookyCounter)+' captured, '+GoodSpookyCounter+' good, '+BadSpookyCounter+' bad)';
    			console.log(output);
    			spookyHunterOutput.innerHTML = output;
		}
	}
})